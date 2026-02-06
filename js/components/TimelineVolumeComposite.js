/**
 * TimelineVolumeComposite.js
 * Combined visualization showing volume over time with event timeline
 * Allows correlation between volume spikes and events
 */

import { BaseComponent } from './BaseComponent.js';
import { formatDate, formatDateLong, formatDateTimeLong, getTimeFormatter } from '../utils/formatters.js';
import { getEntityCardModal } from './EntityCardModal.js';

export class TimelineVolumeComposite extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: 450,
      volumeHeight: 180,
      timelineHeight: 180,
      durationHeight: 300,
      axisHeight: 40,
      legendHeight: 50,
      margin: { top: 20, right: 30, bottom: 10, left: 50 },
      minZoom: 0.5,
      maxZoom: 50,
      showViewToggle: options.showViewToggle !== false,
      showDisplayToggle: options.showDisplayToggle !== false,
      ...options
    });
    this.currentTransform = d3.zoomIdentity;
    // Default view will be set in render() based on available data
    this.currentView = options.defaultView || null;
    // Display mode: 'volume' (stacked area + events) or 'duration' (narrative bars)
    this.displayMode = options.defaultDisplayMode || 'volume';
    this.maxEventVolume = 0;
    // Scroll-to-zoom is disabled by default; user must click to activate
    this.isZoomActive = false;
  }

  /**
   * Calculate the volume threshold for event visibility based on zoom level.
   * At zoom 1x, only show events with volume >= 50% of max volume.
   * At zoom 5x+, show all events.
   */
  getVolumeThreshold() {
    const zoomLevel = this.currentTransform.k;
    // Linear interpolation: at zoom 1, threshold = 0.5 * maxVolume; at zoom 5+, threshold = 0
    const thresholdPercent = Math.max(0, 0.5 - (zoomLevel - 1) * 0.125);
    return this.maxEventVolume * thresholdPercent;
  }

  /**
   * Check if an event should be visible at the current zoom level
   */
  isEventVisible(event) {
    const volume = event._docVolume || 0;
    return volume >= this.getVolumeThreshold();
  }

  render() {
    const { volumeData, events, publisherData, narrativeDurations } = this.data || {};
    
    // Check what data is available
    const hasFactionData = volumeData && volumeData.dates && volumeData.dates.length > 0;
    const hasPublisherData = publisherData && publisherData.dates && publisherData.dates.length > 0;
    const hasDurationData = narrativeDurations && narrativeDurations.length > 0;
    
    // Auto-detect currentView based on available data if not set
    if (!this.currentView) {
      this.currentView = hasFactionData ? 'factions' : (hasPublisherData ? 'publishers' : 'factions');
    }
    
    // Need at least volume data, publisher data, events, or duration data to render
    if (!hasFactionData && !hasPublisherData && (!events || !events.length) && !hasDurationData) {
      this.showEmptyState('No data to display');
      return;
    }

    // Calculate max event volume for threshold scaling
    if (events && events.length) {
      this.maxEventVolume = Math.max(...events.map(e => e._docVolume || 0));
    }

    const { width, margin, volumeHeight, timelineHeight, durationHeight, axisHeight, legendHeight, minZoom, maxZoom } = this.options;
    
    // Calculate height based on display mode
    // Duration mode: duration bars (dynamic height based on count) + timeline for events
    const durationBarsHeight = this.displayMode === 'duration' 
      ? Math.max(durationHeight, (narrativeDurations?.length || 0) * 20 + 8) // 16px bar + 4px padding = 20px per row
      : 0;
    const contentHeight = this.displayMode === 'duration' 
      ? durationBarsHeight + timelineHeight  // Duration bars + events timeline
      : volumeHeight + timelineHeight;
    const totalHeight = margin.top + contentHeight + axisHeight + (this.displayMode === 'volume' ? legendHeight : 0) + margin.bottom;
    this.options.height = totalHeight;

    const innerWidth = width - margin.left - margin.right;

    // Store dimensions
    this.innerWidth = innerWidth;
    this.volumeHeight = volumeHeight;
    this.timelineHeight = timelineHeight;
    this.durationBarsHeight = durationBarsHeight;
    this.contentHeight = contentHeight;

    // Calculate time extent from all data sources
    const timeExtent = this.calculateTimeExtent(volumeData, events);
    
    // For duration mode, also include narrative duration dates
    let finalExtent = timeExtent;
    if (hasDurationData) {
      const durationDates = [];
      narrativeDurations.forEach(n => {
        durationDates.push(new Date(n.startDate));
        durationDates.push(new Date(n.endDate));
      });
      const durationExtent = d3.extent(durationDates);
      if (!finalExtent) {
        finalExtent = durationExtent;
      } else {
        finalExtent = [
          new Date(Math.min(finalExtent[0], durationExtent[0])),
          new Date(Math.max(finalExtent[1], durationExtent[1]))
        ];
      }
    }
    
    if (!finalExtent) {
      this.showEmptyState('No valid time data');
      return;
    }

    // Add padding to time extent
    const timePadding = (finalExtent[1] - finalExtent[0]) * 0.05;
    const paddedExtent = [
      new Date(finalExtent[0].getTime() - timePadding),
      new Date(finalExtent[1].getTime() + timePadding)
    ];

    // Create shared time scale
    this.xScale = d3.scaleTime()
      .domain(paddedExtent)
      .range([0, innerWidth]);
    this.xScaleOriginal = this.xScale.copy();

    // Clear and create container
    this.clear();

    // Add controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'composite-controls';
    
    // Determine if we should show view toggle (both faction and publisher data must exist)
    const showViewToggle = this.options.showViewToggle && hasPublisherData && hasFactionData;
    // Determine if we should show display mode toggle (duration data must exist)
    const showDisplayToggle = this.options.showDisplayToggle && hasDurationData && (hasFactionData || hasPublisherData || (events && events.length));
    
    controlsDiv.innerHTML = `
      ${showDisplayToggle ? `
        <div class="view-toggle display-mode-toggle">
          <button class="view-toggle-btn ${this.displayMode === 'volume' ? 'active' : ''}" data-display="volume" title="Volume View">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M2 12V4M6 12V6M10 12V8M14 12V5"/>
            </svg>
          </button>
          <button class="view-toggle-btn ${this.displayMode === 'duration' ? 'active' : ''}" data-display="duration" title="Duration View">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="3" width="8" height="2" rx="0.5"/>
              <rect x="4" y="7" width="10" height="2" rx="0.5"/>
              <rect x="3" y="11" width="6" height="2" rx="0.5"/>
            </svg>
          </button>
        </div>
      ` : ''}
      ${showViewToggle && this.displayMode === 'volume' ? `
        <div class="view-toggle faction-publisher-toggle">
          <button class="view-toggle-btn ${this.currentView === 'factions' ? 'active' : ''}" data-view="factions">By Faction</button>
          <button class="view-toggle-btn ${this.currentView === 'publishers' ? 'active' : ''}" data-view="publishers">By Publisher</button>
        </div>
      ` : ''}
      <div class="zoom-controls">
        <button class="timeline-zoom-btn" data-action="in" title="Zoom In">+</button>
        <button class="timeline-zoom-btn" data-action="out" title="Zoom Out">−</button>
        <button class="timeline-zoom-btn" data-action="reset" title="Reset Zoom">⟲</button>
      </div>
    `;
    this.container.appendChild(controlsDiv);

    // Check if we're in fullscreen mode
    const card = this.container.closest('.card');
    const isFullscreen = card && card.classList.contains('card-fullscreen');

    // Create SVG - in fullscreen mode, use 100% to let CSS control sizing
    const svg = d3.select(this.container)
      .append('svg')
      .attr('width', isFullscreen ? '100%' : width)
      .attr('height', isFullscreen ? '100%' : totalHeight)
      .attr('viewBox', [0, 0, width, totalHeight])
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'composite-svg');

    this.svg = svg;

    // Create clip path for content
    svg.append('defs')
      .append('clipPath')
      .attr('id', `composite-clip-${this.containerId}`)
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', innerWidth)
      .attr('height', contentHeight);

    // Create main content group
    this.mainGroup = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Render based on display mode
    if (this.displayMode === 'duration') {
      // Duration view - render narrative duration bars ABOVE events timeline
      
      // Duration bars group (top panel)
      this.durationGroup = this.mainGroup.append('g')
        .attr('class', 'duration-group')
        .attr('clip-path', `url(#composite-clip-${this.containerId})`);

      // Divider line between duration bars and events timeline
      this.mainGroup.append('line')
        .attr('class', 'chart-divider')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', durationBarsHeight)
        .attr('y2', durationBarsHeight)
        .attr('stroke', 'var(--border-color)')
        .attr('stroke-width', 1);

      // Timeline group (bottom panel - same as volume view)
      this.timelineGroup = this.mainGroup.append('g')
        .attr('class', 'timeline-group')
        .attr('transform', `translate(0, ${durationBarsHeight})`)
        .attr('clip-path', `url(#composite-clip-${this.containerId})`);

      // Shared axis group
      this.axisGroup = this.mainGroup.append('g')
        .attr('class', 'shared-axis')
        .attr('transform', `translate(0, ${contentHeight})`);

      // Render duration bars (top panel)
      this.renderDurationView(narrativeDurations);
      // Render events timeline (bottom panel)
      this.renderTimelineArea(events);
      this.renderSharedAxis();
      this.renderEventMarkers(events);
    } else {
      // Volume view - render stacked area + timeline
      // Volume chart group
      this.volumeGroup = this.mainGroup.append('g')
        .attr('class', 'volume-group')
        .attr('clip-path', `url(#composite-clip-${this.containerId})`);

      // Divider line between charts
      this.mainGroup.append('line')
        .attr('class', 'chart-divider')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', volumeHeight)
        .attr('y2', volumeHeight)
        .attr('stroke', 'var(--border-color)')
        .attr('stroke-width', 1);

      // Timeline group
      this.timelineGroup = this.mainGroup.append('g')
        .attr('class', 'timeline-group')
        .attr('transform', `translate(0, ${volumeHeight})`)
        .attr('clip-path', `url(#composite-clip-${this.containerId})`);

      // Shared axis group
      this.axisGroup = this.mainGroup.append('g')
        .attr('class', 'shared-axis')
        .attr('transform', `translate(0, ${volumeHeight + timelineHeight})`);

      // Legend group (below the axis)
      this.legendGroup = this.mainGroup.append('g')
        .attr('class', 'legend-group')
        .attr('transform', `translate(0, ${volumeHeight + timelineHeight + axisHeight + 10})`);

      // Render volume view components
      this.renderVolumeArea(volumeData);
      this.renderTimelineArea(events);
      this.renderSharedAxis();
      this.renderEventMarkers(events);
      this.renderLegend();
    }

    // Create zoom behavior with filter to require activation for wheel zoom
    this.zoom = d3.zoom()
      .scaleExtent([minZoom, maxZoom])
      .translateExtent([[0, 0], [innerWidth, totalHeight]])
      .extent([[0, 0], [innerWidth, totalHeight]])
      .filter((event) => {
        // For wheel events, only allow zoom if activated (user clicked on chart)
        if (event.type === 'wheel') {
          return this.isZoomActive;
        }
        // Allow other events (programmatic zoom, drag/pan)
        return true;
      })
      .on('zoom', (event) => this.handleZoom(event));

    // Apply zoom to SVG
    svg.call(this.zoom);

    // Click to activate scroll-to-zoom
    svg.on('click.activate', () => {
      this.activateZoom();
    });

    // Deactivate when mouse leaves the container
    this.container.addEventListener('mouseleave', this._handleMouseLeave = () => {
      this.deactivateZoom();
    });

    // Setup tooltip
    this.setupTooltip();

    // Attach control handlers
    controlsDiv.querySelectorAll('.timeline-zoom-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.handleZoomControl(action);
      });
    });

    // Attach display mode toggle handlers
    controlsDiv.querySelectorAll('.display-mode-toggle .view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const display = e.target.closest('.view-toggle-btn').dataset.display;
        if (display && display !== this.displayMode) {
          this.displayMode = display;
          this.render();
        }
      });
    });

    // Attach view toggle handlers (faction/publisher)
    controlsDiv.querySelectorAll('.faction-publisher-toggle .view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.target.dataset.view;
        if (view && view !== this.currentView) {
          this.currentView = view;
          this.render();
        }
      });
    });
  }

  calculateTimeExtent(volumeData, events) {
    const { publisherData } = this.data || {};
    const dates = [];

    if (volumeData && volumeData.dates) {
      volumeData.dates.forEach(d => dates.push(new Date(d)));
    }

    // Include publisherData dates in time extent calculation
    if (publisherData && publisherData.dates) {
      publisherData.dates.forEach(d => dates.push(new Date(d)));
    }

    if (events && events.length) {
      events.forEach(e => dates.push(new Date(e.date)));
    }

    if (dates.length === 0) return null;

    const extent = d3.extent(dates);
    return extent;
  }

  renderVolumeArea(volumeData) {
    // Determine which data to use based on current view
    const { publisherData } = this.data || {};
    const dataToUse = this.currentView === 'publishers' && publisherData 
      ? publisherData 
      : volumeData;

    if (!dataToUse || !dataToUse.dates || !dataToUse.dates.length) {
      // Show placeholder if no volume data
      this.volumeGroup.append('text')
        .attr('x', this.innerWidth / 2)
        .attr('y', this.volumeHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', 'var(--text-muted)')
        .attr('font-size', '12px')
        .attr('font-family', 'var(--font-sans)')
        .text('No volume data available');
      return;
    }

    // Extract the data arrays (factions or publishers)
    const { dates, series } = dataToUse;
    const items = this.currentView === 'publishers' 
      ? dataToUse.publishers 
      : dataToUse.factions;

    if (!items || items.length === 0) {
      this.volumeGroup.append('text')
        .attr('x', this.innerWidth / 2)
        .attr('y', this.volumeHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', 'var(--text-muted)')
        .attr('font-size', '12px')
        .attr('font-family', 'var(--font-sans)')
        .text(`No ${this.currentView} data available`);
      return;
    }

    const innerWidth = this.innerWidth;
    const height = this.volumeHeight - 20; // Leave space for labels

    // Store for later use
    this.volumeData = volumeData;
    this.currentDataItems = items;

    // Prepare data for stacking
    let stackData = dates.map((date, i) => {
      const point = { date: new Date(date) };
      items.forEach((item, fi) => {
        point[item.id] = series[fi] ? series[fi][i] : 0;
      });
      return point;
    });

    // When we have multiple discrete data points (like individual documents),
    // insert zero-value points between them to create distinct spikes instead of a continuous block
    if (stackData.length > 1) {
      const [extentMin, extentMax] = this.xScale.domain();
      const timeRange = extentMax.getTime() - extentMin.getTime();
      
      // Create a zero-value point
      const createZeroPoint = (date) => {
        const point = { date: new Date(date) };
        items.forEach(item => { point[item.id] = 0; });
        return point;
      };
      
      // Calculate gap duration - points need gaps between them to show as spikes
      // Use 2% of the time range or minimum 1 minute
      const gapDuration = Math.max(timeRange * 0.02, 60 * 1000);
      
      // Build new stack data with zeros between each point
      const spikedData = [];
      
      // Add zero at start if needed
      const firstPointTime = stackData[0].date.getTime();
      if (firstPointTime > extentMin.getTime() + gapDuration) {
        spikedData.push(createZeroPoint(extentMin));
      }
      spikedData.push(createZeroPoint(new Date(firstPointTime - gapDuration)));
      
      stackData.forEach((point, i) => {
        spikedData.push(point);
        
        if (i < stackData.length - 1) {
          // Add zeros between this point and the next
          const nextPointTime = stackData[i + 1].date.getTime();
          const currentTime = point.date.getTime();
          
          // Only add gap points if there's enough space between points
          if (nextPointTime - currentTime > gapDuration * 3) {
            spikedData.push(createZeroPoint(new Date(currentTime + gapDuration)));
            spikedData.push(createZeroPoint(new Date(nextPointTime - gapDuration)));
          }
        }
      });
      
      // Add zero after last point if needed
      const lastPointTime = stackData[stackData.length - 1].date.getTime();
      spikedData.push(createZeroPoint(new Date(lastPointTime + gapDuration)));
      if (lastPointTime < extentMax.getTime() - gapDuration) {
        spikedData.push(createZeroPoint(extentMax));
      }
      
      stackData = spikedData;
    }
    
    // Handle single-point data: create a spike pattern so the area is visible
    // Shows zero before, spike at the data point, zero after
    else if (stackData.length === 1) {
      const singlePoint = stackData[0];
      const [extentMin, extentMax] = this.xScale.domain();
      
      // Try to align spike with event times if available
      let effectiveCenter;
      const events = this.data?.events;
      if (events && events.length > 0) {
        // Use average event time as spike center
        const eventTimes = events.map(e => new Date(e.date).getTime());
        const avgTime = eventTimes.reduce((a, b) => a + b, 0) / eventTimes.length;
        effectiveCenter = new Date(avgTime);
      } else {
        // Fall back to center of visible extent
        effectiveCenter = new Date((extentMin.getTime() + extentMax.getTime()) / 2);
      }
      
      // Ensure center is within visible extent
      if (effectiveCenter < extentMin) effectiveCenter = new Date(extentMin.getTime() + (extentMax.getTime() - extentMin.getTime()) * 0.2);
      if (effectiveCenter > extentMax) effectiveCenter = new Date(extentMax.getTime() - (extentMax.getTime() - extentMin.getTime()) * 0.2);
      
      // Create a zero-value point
      const createZeroPoint = (date) => {
        const point = { date: new Date(date) };
        items.forEach(item => { point[item.id] = 0; });
        return point;
      };
      
      // Create a point with the same values as the single point
      const createValuePoint = (date) => {
        const point = { date: new Date(date) };
        items.forEach(item => { point[item.id] = singlePoint[item.id]; });
        return point;
      };
      
      // Calculate spike width (use ~10% of visible range, min 1 hour)
      const timeRange = extentMax.getTime() - extentMin.getTime();
      const spikeHalfWidth = Math.max(timeRange * 0.05, 30 * 60 * 1000); // 5% of range or 30 min
      
      const spikeStart = new Date(effectiveCenter.getTime() - spikeHalfWidth);
      const spikeEnd = new Date(effectiveCenter.getTime() + spikeHalfWidth);
      
      // Build spike pattern: zero → rise → peak → fall → zero
      stackData = [];
      if (extentMin < spikeStart) {
        stackData.push(createZeroPoint(extentMin));
      }
      stackData.push(createZeroPoint(spikeStart));
      stackData.push(createValuePoint(effectiveCenter));
      stackData.push(createZeroPoint(spikeEnd));
      if (extentMax > spikeEnd) {
        stackData.push(createZeroPoint(extentMax));
      }
    }

    this.stackData = stackData;

    // Stack generator
    const stack = d3.stack()
      .keys(items.map(item => item.id))
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData = stack(stackData);
    this.stackedData = stackedData;

    // Y scale for volume
    const maxY = d3.max(stackedData, layer => d3.max(layer, d => d[1])) || 1;
    this.yScale = d3.scaleLinear()
      .domain([0, maxY * 1.1])
      .range([height, 0]);

    // Color scale
    this.colorScale = d3.scaleOrdinal()
      .domain(items.map(item => item.id))
      .range(items.map(item => item.color));

    // Gridlines
    this.volumeGroup.append('g')
      .attr('class', 'volume-grid')
      .call(d3.axisLeft(this.yScale)
        .ticks(4)
        .tickSize(-innerWidth)
        .tickFormat(''))
      .selectAll('line')
      .attr('stroke', 'var(--border-color)')
      .attr('stroke-opacity', 0.3);

    this.volumeGroup.select('.volume-grid path').remove();

    // Y axis - rendered in mainGroup (not volumeGroup) to avoid clip-path clipping
    this.mainGroup.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(this.yScale)
        .ticks(4)
        .tickFormat(d => this.formatNumber(d)))
      .selectAll('text')
      .attr('fill', 'var(--text-muted)')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)');

    this.mainGroup.selectAll('.y-axis path').attr('stroke', 'var(--border-color)');
    this.mainGroup.selectAll('.y-axis line').attr('stroke', 'var(--border-color)');

    // Area generator
    this.areaGenerator = d3.area()
      .x(d => this.xScale(d.data.date))
      .y0(d => this.yScale(d[0]))
      .y1(d => this.yScale(d[1]))
      .curve(d3.curveMonotoneX);

    // Draw areas
    this.volumeLayers = this.volumeGroup.selectAll('.volume-layer')
      .data(stackedData)
      .join('path')
      .attr('class', d => `volume-layer volume-layer-${d.key}`)
      .attr('fill', d => this.colorScale(d.key))
      .attr('fill-opacity', 0.8)
      .attr('d', this.areaGenerator);
  }

  renderTimelineArea(events) {
    if (!events || !events.length) {
      this.timelineGroup.append('text')
        .attr('x', this.innerWidth / 2)
        .attr('y', this.timelineHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', 'var(--text-muted)')
        .attr('font-size', '12px')
        .attr('font-family', 'var(--font-sans)')
        .text('No events available');
      return;
    }

    // Sort events by date
    this.events = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    const height = this.timelineHeight;
    const axisY = height / 2;

    // Main timeline axis line
    this.timelineGroup.append('line')
      .attr('class', 'timeline-axis-line')
      .attr('x1', 0)
      .attr('x2', this.innerWidth)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', 'var(--border-color)')
      .attr('stroke-width', 2);

    // Draw events
    this.eventGroups = this.timelineGroup.selectAll('.timeline-event')
      .data(this.events)
      .join('g')
      .attr('class', d => `timeline-event ${d.parentEventId ? 'sub-event' : 'main-event'}`)
      .attr('transform', d => `translate(${this.xScale(new Date(d.date))}, ${axisY})`)
      .attr('data-event-id', d => d.id)
      .style('cursor', 'pointer')
      .style('opacity', d => this.isEventVisible(d) ? 1 : 0)
      .style('pointer-events', d => this.isEventVisible(d) ? 'auto' : 'none');

    // Event connectors and dots
    this.eventGroups.each((d, i, nodes) => {
      const g = d3.select(nodes[i]);
      const isTop = i % 2 === 0;
      const yOffset = isTop ? -40 : 40;
      const isSubEvent = d.parentEventId != null;

      // Connector line
      g.append('line')
        .attr('class', 'event-connector')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', yOffset)
        .attr('stroke', 'var(--border-color)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', isSubEvent ? '3,3' : 'none');

      // Event dot
      g.append('circle')
        .attr('class', 'event-dot')
        .attr('cy', 0)
        .attr('r', isSubEvent ? 5 : 8)
        .attr('fill', isSubEvent ? 'var(--accent-warning)' : 'var(--accent-primary)')
        .attr('stroke', 'var(--bg-primary)')
        .attr('stroke-width', 2);

      // Event label with background
      const label = g.append('g')
        .attr('class', 'event-label')
        .attr('transform', `translate(0, ${yOffset + (isTop ? -5 : 5)})`);

      // Truncate text
      const displayText = d.text.length > 25 ? d.text.slice(0, 22) + '...' : d.text;
      const dateText = formatDate(d.date);

      // Calculate approximate text width for background
      const textWidth = Math.max(displayText.length * 5.5, 60);
      const bgPadding = 4;
      const bgHeight = 28;
      const bgY = isTop ? -12 : 0;

      // Background rect
      label.append('rect')
        .attr('class', 'event-label-bg')
        .attr('x', -textWidth / 2 - bgPadding)
        .attr('y', bgY)
        .attr('width', textWidth + bgPadding * 2)
        .attr('height', bgHeight)
        .attr('rx', 3)
        .attr('fill', 'var(--bg-secondary)')
        .attr('stroke', 'var(--border-color)')
        .attr('stroke-width', 1);

      label.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', isTop ? 0 : 12)
        .attr('font-size', '10px')
        .attr('fill', 'var(--text-primary)')
        .attr('font-family', 'var(--font-sans)')
        .text(displayText);

      label.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', isTop ? 12 : 24)
        .attr('font-size', '9px')
        .attr('fill', 'var(--text-muted)')
        .attr('font-family', 'var(--font-mono)')
        .text(dateText);
    });

    // Hover effects
    this.eventGroups
      .on('mouseover', (event, d) => {
        const g = d3.select(event.currentTarget);
        const isSubEvent = d.parentEventId != null;
        
        // Raise this event to top (highest z-index in SVG)
        g.raise();
        
        g.select('.event-dot')
          .attr('r', isSubEvent ? 7 : 10)
          .attr('filter', 'brightness(1.2)');
        
        // Highlight the label background
        g.select('.event-label-bg')
          .attr('stroke', 'var(--accent-primary)')
          .attr('stroke-width', 2)
          .attr('fill', 'var(--bg-tertiary)');
        
        // Highlight corresponding marker in volume chart
        this.highlightEventMarker(d.id, true);
        
        this.showEventTooltip(event, d);
      })
      .on('mouseout', (event, d) => {
        const g = d3.select(event.currentTarget);
        const isSubEvent = d.parentEventId != null;
        
        g.select('.event-dot')
          .attr('r', isSubEvent ? 5 : 8)
          .attr('filter', null);
        
        // Reset label background
        g.select('.event-label-bg')
          .attr('stroke', 'var(--border-color)')
          .attr('stroke-width', 1)
          .attr('fill', 'var(--bg-secondary)');
        
        this.highlightEventMarker(d.id, false);
        this.hideTooltip();
      })
      .on('click', (event, d) => {
        if (this.options.onEventClick) {
          this.options.onEventClick(d);
        }
      });
  }

  renderEventMarkers(events) {
    if (!events || !events.length || !this.volumeData) return;

    const height = this.volumeHeight - 20;

    // Create markers group
    this.markersGroup = this.volumeGroup.append('g')
      .attr('class', 'event-markers');

    // Draw vertical lines for each event
    this.eventMarkers = this.markersGroup.selectAll('.event-marker')
      .data(events)
      .join('g')
      .attr('class', 'event-marker')
      .attr('data-event-id', d => d.id)
      .style('opacity', d => this.isEventVisible(d) ? 1 : 0)
      .style('pointer-events', d => this.isEventVisible(d) ? 'auto' : 'none');

    this.eventMarkers.append('line')
      .attr('x1', d => this.xScale(new Date(d.date)))
      .attr('x2', d => this.xScale(new Date(d.date)))
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', 'var(--accent-primary)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')
      .attr('opacity', 0.5);

    // Small diamond marker at top
    this.eventMarkers.append('path')
      .attr('d', d3.symbol().type(d3.symbolDiamond).size(30))
      .attr('transform', d => `translate(${this.xScale(new Date(d.date))}, 8)`)
      .attr('fill', 'var(--accent-primary)')
      .attr('opacity', 0.7);

    // Hover behavior for markers
    this.eventMarkers
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        this.highlightEventMarker(d.id, true);
        this.highlightTimelineEvent(d.id, true);
        this.showEventTooltip(event, d);
      })
      .on('mouseout', (event, d) => {
        this.highlightEventMarker(d.id, false);
        this.highlightTimelineEvent(d.id, false);
        this.hideTooltip();
      })
      .on('click', (event, d) => {
        if (this.options.onEventClick) {
          this.options.onEventClick(d);
        }
      });
  }

  renderSharedAxis() {
    this.axisGroup.selectAll('*').remove();
    
    // Determine time format based on the visible time range
    const [domainMin, domainMax] = this.xScale.domain();
    const rangeMs = domainMax.getTime() - domainMin.getTime();
    const rangeHours = rangeMs / (1000 * 60 * 60);
    const rangeDays = rangeHours / 24;
    
    // Choose format based on range:
    // < 2 days: show time (HH:MM)
    // 2-7 days: show day and time (Mon HH:MM)
    // > 7 days: show date (Mon DD)
    let timeFormat;
    if (rangeDays < 2) {
      timeFormat = '%H:%M'; // Show hours:minutes
    } else if (rangeDays < 7) {
      timeFormat = '%a %H:%M'; // Show day name and time
    } else {
      timeFormat = '%b %d'; // Show month and day
    }
    
    this.axisGroup.call(d3.axisBottom(this.xScale)
      .ticks(Math.min(10, Math.max(5, this.innerWidth / 80)))
      .tickFormat(getTimeFormatter(timeFormat)))
      .selectAll('text')
      .attr('fill', 'var(--text-muted)')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)');

    this.axisGroup.select('.domain').attr('stroke', 'var(--border-color)');
    this.axisGroup.selectAll('.tick line').attr('stroke', 'var(--border-color)');
  }

  renderLegend() {
    if (!this.currentDataItems || this.currentDataItems.length === 0) return;

    const items = this.currentDataItems;
    const innerWidth = this.innerWidth;
    const isFactionView = this.currentView === 'factions';

    // Calculate item width for horizontal layout
    const maxItems = Math.min(items.length, 8);
    const legendItemWidth = Math.min(140, innerWidth / maxItems);

    items.slice(0, maxItems).forEach((item, i) => {
      const legendItem = this.legendGroup.append('g')
        .attr('class', 'legend-item')
        .attr('transform', `translate(${i * legendItemWidth}, 0)`)
        .style('cursor', 'pointer');

      legendItem.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('rx', 2)
        .attr('fill', item.color);

      legendItem.append('text')
        .attr('x', 18)
        .attr('y', 10)
        .text(item.name.length > 15 ? item.name.slice(0, 13) + '...' : item.name)
        .attr('class', 'legend-label')
        .attr('fill', 'var(--text-secondary)')
        .attr('font-size', '11px')
        .attr('font-family', 'var(--font-sans)')
        .append('title')
        .text(item.name);

      // Add click handler for faction navigation
      if (isFactionView && this.options.onFactionClick) {
        legendItem.on('click', () => {
          this.options.onFactionClick(item);
        });
      }

      // Add hover effect to highlight corresponding area and show entity card
      const self = this;
      legendItem
        .on('mouseover', function() {
          d3.select(this).select('text').attr('fill', 'var(--accent-primary)');
          // Highlight the corresponding area, dim others
          if (self.volumeLayers) {
            self.volumeLayers
              .attr('fill-opacity', d => d.key === item.id ? 1 : 0.4)
              .attr('stroke', d => d.key === item.id ? item.color : 'none')
              .attr('stroke-width', d => d.key === item.id ? 2 : 0);
          }
          // Show entity card for factions
          if (isFactionView) {
            getEntityCardModal().show(item.id, 'faction', this);
          }
        })
        .on('mouseout', function() {
          d3.select(this).select('text').attr('fill', 'var(--text-secondary)');
          // Restore all areas to normal opacity
          if (self.volumeLayers) {
            self.volumeLayers
              .attr('fill-opacity', 0.8)
              .attr('stroke', 'none')
              .attr('stroke-width', 0);
          }
          // Hide entity card
          if (isFactionView) {
            getEntityCardModal().scheduleHide();
          }
        });
    });

    // Show "+N more" if there are more items
    if (items.length > maxItems) {
      this.legendGroup.append('text')
        .attr('x', maxItems * legendItemWidth)
        .attr('y', 10)
        .attr('font-size', '11px')
        .attr('fill', 'var(--text-muted)')
        .attr('font-family', 'var(--font-sans)')
        .text(`+${items.length - maxItems} more`);
    }
  }

  /**
   * Render the Duration View - horizontal bars showing narrative lifespans
   * Sorted by start date (earliest first)
   * Bars are aligned with the events timeline x-scale (no left label offset)
   */
  renderDurationView(narrativeDurations) {
    if (!narrativeDurations || !narrativeDurations.length) {
      this.durationGroup.append('text')
        .attr('x', this.innerWidth / 2)
        .attr('y', this.durationBarsHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', 'var(--text-muted)')
        .attr('font-size', '12px')
        .attr('font-family', 'var(--font-sans)')
        .text('No narrative duration data available');
      return;
    }

    // Store for later use (updates, tooltips)
    this.narrativeDurations = narrativeDurations;

    const barHeight = 16;
    const barPadding = 4;
    const rowHeight = barHeight + barPadding;

    // Y scale for narratives - fixed row height
    this.yScale = d3.scaleBand()
      .domain(narrativeDurations.map(n => n.id))
      .range([4, narrativeDurations.length * rowHeight + 4])
      .padding(0);

    // Create rows for each narrative
    const rows = this.durationGroup.selectAll('.duration-row')
      .data(narrativeDurations)
      .join('g')
      .attr('class', 'duration-row')
      .attr('transform', d => `translate(0, ${this.yScale(d.id)})`);

    // Background row highlight on hover (full width)
    rows.append('rect')
      .attr('class', 'duration-row-bg')
      .attr('x', 0)
      .attr('y', -barPadding / 2)
      .attr('width', this.innerWidth)
      .attr('height', this.yScale.bandwidth() + barPadding)
      .attr('fill', 'transparent')
      .attr('rx', 2);

    // Duration bar - aligned with x-scale (no label offset)
    rows.append('rect')
      .attr('class', 'duration-bar')
      .attr('x', d => this.xScale(new Date(d.startDate)))
      .attr('y', 0)
      .attr('width', d => {
        const startX = this.xScale(new Date(d.startDate));
        const endX = this.xScale(new Date(d.endDate));
        return Math.max(4, endX - startX); // Minimum width of 4px for very short durations
      })
      .attr('height', barHeight)
      .attr('fill', d => d.color)
      .attr('fill-opacity', 0.8)
      .attr('rx', 6)
      .style('cursor', 'pointer');

    // Hover effects and click handlers
    const self = this;
    rows
      .on('mouseenter', function(event, d) {
        d3.select(this).select('.duration-row-bg')
          .attr('fill', 'var(--bg-hover)');
        d3.select(this).select('.duration-bar')
          .attr('fill-opacity', 1)
          .attr('stroke', 'var(--accent-primary)')
          .attr('stroke-width', 2);
        self.showDurationTooltip(event, d);
      })
      .on('mouseleave', function(event, d) {
        d3.select(this).select('.duration-row-bg')
          .attr('fill', 'transparent');
        d3.select(this).select('.duration-bar')
          .attr('fill-opacity', 0.8)
          .attr('stroke', 'none')
          .attr('stroke-width', 0);
        self.hideTooltip();
      })
      .on('click', function(event, d) {
        if (self.options.onNarrativeClick) {
          self.options.onNarrativeClick(d);
        } else {
          // Default: navigate to narrative detail
          window.location.hash = `#/narrative/${d.id}`;
        }
      });

    // Store rows reference for zoom updates
    this.durationRows = rows;
  }

  /**
   * Show tooltip for duration bar
   */
  showDurationTooltip(event, d) {
    const startDate = new Date(d.startDate);
    const endDate = new Date(d.endDate);
    const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    const content = `
      <div class="tooltip-header">
        <span class="tooltip-title">${d.text.length > 40 ? d.text.slice(0, 38) + '...' : d.text}</span>
      </div>
      <div class="tooltip-body">
        <div class="tooltip-row">
          <span class="tooltip-label">Duration:</span>
          <span class="tooltip-value">${durationDays} day${durationDays !== 1 ? 's' : ''}</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">Start:</span>
          <span class="tooltip-value">${formatDateLong(startDate)}</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">End:</span>
          <span class="tooltip-value">${formatDateLong(endDate)}</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">Volume:</span>
          <span class="tooltip-value">${this.formatNumber(d.totalVolume)} documents</span>
        </div>
      </div>
    `;

    const containerRect = this.container.getBoundingClientRect();
    const tooltipX = event.clientX - containerRect.left;
    const tooltipY = event.clientY - containerRect.top;

    this.tooltip
      .html(content)
      .style('opacity', 1)
      .style('left', `${tooltipX + 15}px`)
      .style('top', `${tooltipY - 10}px`);
  }

  /**
   * Activate scroll-to-zoom (called when user clicks on the chart)
   */
  activateZoom() {
    this.isZoomActive = true;
    this.container.classList.add('chart-zoom-active');
  }

  /**
   * Deactivate scroll-to-zoom (called when mouse leaves the chart)
   */
  deactivateZoom() {
    this.isZoomActive = false;
    this.container.classList.remove('chart-zoom-active');
  }

  setupTooltip() {
    this.tooltip = d3.select(this.container)
      .append('div')
      .attr('class', 'composite-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('pointer-events', 'none');

    // Setup interactive hover for volume chart with crosshair
    this.setupVolumeHover();
  }

  setupVolumeHover() {
    if (!this.stackData || !this.currentDataItems) return;

    const { margin } = this.options;
    const totalChartHeight = this.volumeHeight + this.timelineHeight;

    // Create a group for hover elements that spans both charts
    const mainGroup = this.svg.select('g');
    
    // Full-height hover line (spans volume + timeline)
    this.hoverLine = mainGroup.append('line')
      .attr('class', 'hover-line')
      .attr('y1', 0)
      .attr('y2', totalChartHeight)
      .attr('stroke', 'var(--text-secondary)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')
      .attr('opacity', 0)
      .attr('pointer-events', 'none');

    // Hover dots for each faction/publisher
    this.hoverDots = mainGroup.append('g')
      .attr('class', 'hover-dots')
      .attr('opacity', 0)
      .attr('pointer-events', 'none');

    this.currentDataItems.forEach(item => {
      this.hoverDots.append('circle')
        .attr('class', `hover-dot-${item.id}`)
        .attr('r', 4)
        .attr('fill', item.color)
        .attr('stroke', 'var(--bg-primary)')
        .attr('stroke-width', 2);
    });

    // Invisible overlay for mouse events on volume area
    const overlay = this.volumeGroup.append('rect')
      .attr('class', 'volume-overlay')
      .attr('width', this.innerWidth)
      .attr('height', this.volumeHeight - 20)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair');

    // Bisector for finding closest data point
    const bisect = d3.bisector(d => d.date).left;

    overlay
      .on('mousemove', (event) => {
        const [mouseX] = d3.pointer(event);
        const x0 = this.xScale.invert(mouseX);
        const i = bisect(this.stackData, x0, 1);
        const d0 = this.stackData[i - 1];
        const d1 = this.stackData[i];
        
        // Find closest data point
        const d = !d1 ? d0 : !d0 ? d1 : (x0 - d0.date > d1.date - x0 ? d1 : d0);
        
        if (!d) return;

        const xPos = this.xScale(d.date);

        // Update hover line
        this.hoverLine
          .attr('x1', xPos)
          .attr('x2', xPos)
          .attr('opacity', 1);

        // Update hover dots
        this.hoverDots.attr('opacity', 1);
        
        // Calculate cumulative values for dot positioning
        let cumulative = 0;
        this.currentDataItems.forEach(item => {
          const value = d[item.id] || 0;
          cumulative += value;
          this.hoverDots.select(`.hover-dot-${item.id}`)
            .attr('cx', xPos)
            .attr('cy', this.yScale(cumulative));
        });

        // Find events near this date
        const nearbyEvents = this.findNearbyEvents(d.date);

        // Show volume tooltip
        this.showVolumeTooltip(event, d, nearbyEvents);
      })
      .on('mouseenter', () => {
        this.hoverLine.attr('opacity', 1);
        this.hoverDots.attr('opacity', 1);
        if (this.volumeLayers) {
          this.volumeLayers.attr('fill-opacity', 0.6);
        }
      })
      .on('mouseleave', () => {
        this.hoverLine.attr('opacity', 0);
        this.hoverDots.attr('opacity', 0);
        this.hideTooltip();
        if (this.volumeLayers) {
          this.volumeLayers.attr('fill-opacity', 0.8);
        }
      });
  }

  findNearbyEvents(date) {
    if (!this.events) return [];
    
    // Find events within 1 day of the hovered date
    const targetTime = date.getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    
    return this.events.filter(e => {
      const eventTime = new Date(e.date).getTime();
      return Math.abs(eventTime - targetTime) < dayMs;
    });
  }

  showVolumeTooltip(event, d, nearbyEvents = []) {
    const items = this.currentDataItems;
    const viewType = this.currentView === 'publishers' ? 'Publisher' : 'Faction';
    
    // Calculate total volume
    const total = items.reduce((sum, item) => sum + (d[item.id] || 0), 0);

    // Build tooltip content - filter out factions with zero documents
    const itemsWithData = items.filter(item => (d[item.id] || 0) > 0);
    
    let tooltipContent = `
      <div class="tooltip-header">
        <span class="tooltip-date">${formatDateLong(d.date)}</span>
        <span class="tooltip-total">${this.formatNumber(total)} total</span>
      </div>
      <div class="tooltip-body">
        ${itemsWithData.map(item => {
          const value = d[item.id] || 0;
          const percent = total > 0 ? Math.round((value / total) * 100) : 0;
          return `
            <div class="tooltip-row">
              <span class="tooltip-color" style="background: ${item.color}"></span>
              <span class="tooltip-faction">${item.name}</span>
              <span class="tooltip-value">${this.formatNumber(value)}</span>
              <span class="tooltip-percent">(${percent}%)</span>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Add nearby events section if any
    if (nearbyEvents.length > 0) {
      tooltipContent += `
        <div class="tooltip-events">
          <div class="tooltip-events-header">Events</div>
          ${nearbyEvents.map(e => `
            <div class="tooltip-event-row">
              <span class="tooltip-event-dot ${e.parentEventId ? 'sub-event' : ''}"></span>
              <span class="tooltip-event-text">${e.text.length > 30 ? e.text.slice(0, 28) + '...' : e.text}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    const containerRect = this.container.getBoundingClientRect();
    const tooltipX = event.clientX - containerRect.left;
    const tooltipY = event.clientY - containerRect.top;

    // Determine if tooltip should be on left or right of line
    const tooltipOnLeft = tooltipX > this.innerWidth / 2;

    this.tooltip
      .html(tooltipContent)
      .style('opacity', 1)
      .style('left', tooltipOnLeft ? `${tooltipX - 200}px` : `${tooltipX + 15}px`)
      .style('top', `${Math.max(10, tooltipY - 50)}px`);
  }

  showEventTooltip(event, d) {
    const content = `
      <div class="tooltip-header">
        <span class="tooltip-title">${d.text}</span>
      </div>
      <div class="tooltip-body">
        <div class="tooltip-row">
          <span class="tooltip-label">Date:</span>
          <span class="tooltip-value">${formatDateTimeLong(d.date)}</span>
        </div>
        ${d.parentEventId ? '<div class="tooltip-row"><span class="tooltip-label">Type:</span><span class="tooltip-value">Sub-event</span></div>' : ''}
      </div>
    `;

    const containerRect = this.container.getBoundingClientRect();
    const tooltipX = event.clientX - containerRect.left;
    const tooltipY = event.clientY - containerRect.top;

    this.tooltip
      .html(content)
      .style('opacity', 1)
      .style('left', `${tooltipX + 15}px`)
      .style('top', `${tooltipY - 10}px`);
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style('opacity', 0);
    }
  }

  highlightEventMarker(eventId, highlight) {
    if (!this.markersGroup) return;

    const marker = this.markersGroup.select(`[data-event-id="${eventId}"]`);
    if (marker.empty()) return;

    marker.select('line')
      .attr('stroke-width', highlight ? 2 : 1)
      .attr('opacity', highlight ? 1 : 0.5);

    marker.select('path')
      .attr('opacity', highlight ? 1 : 0.7)
      .attr('transform', d => {
        const x = this.xScale(new Date(d.date));
        const size = highlight ? 50 : 30;
        return `translate(${x}, 8) scale(${highlight ? 1.3 : 1})`;
      });
  }

  highlightTimelineEvent(eventId, highlight) {
    if (!this.eventGroups) return;

    this.eventGroups.each((d, i, nodes) => {
      if (d.id === eventId) {
        const g = d3.select(nodes[i]);
        const isSubEvent = d.parentEventId != null;
        
        g.select('.event-dot')
          .attr('r', highlight ? (isSubEvent ? 7 : 10) : (isSubEvent ? 5 : 8))
          .attr('filter', highlight ? 'brightness(1.2)' : null);
      }
    });
  }

  handleZoom(event) {
    this.currentTransform = event.transform;
    this.xScale = event.transform.rescaleX(this.xScaleOriginal);
    this.updateVisualization();
  }

  handleZoomControl(action) {
    const svg = this.svg;
    const duration = 300;

    switch (action) {
      case 'in':
        svg.transition().duration(duration)
          .call(this.zoom.scaleBy, 1.5);
        break;
      case 'out':
        svg.transition().duration(duration)
          .call(this.zoom.scaleBy, 0.67);
        break;
      case 'reset':
        svg.transition().duration(duration)
          .call(this.zoom.transform, d3.zoomIdentity);
        break;
    }
  }

  updateVisualization() {
    // Update based on display mode
    if (this.displayMode === 'duration') {
      // Update duration bars (no labelWidth offset - aligned with x-scale)
      if (this.durationRows && this.narrativeDurations) {
        this.durationRows.select('.duration-bar')
          .attr('x', d => this.xScale(new Date(d.startDate)))
          .attr('width', d => {
            const startX = this.xScale(new Date(d.startDate));
            const endX = this.xScale(new Date(d.endDate));
            return Math.max(4, endX - startX);
          });
      }

      // Duration mode also shows events timeline - update those too
      if (this.eventGroups) {
        this.eventGroups.attr('transform', d => 
          `translate(${this.xScale(new Date(d.date))}, ${this.timelineHeight / 2})`
        );
        
        // Update visibility based on zoom level
        this.eventGroups
          .style('opacity', d => this.isEventVisible(d) ? 1 : 0)
          .style('pointer-events', d => this.isEventVisible(d) ? 'auto' : 'none');
      }
    } else {
      // Update volume chart
      if (this.volumeLayers && this.areaGenerator) {
        this.areaGenerator.x(d => this.xScale(d.data.date));
        this.volumeLayers.attr('d', this.areaGenerator);
      }

      // Update event markers positions and visibility
      if (this.eventMarkers) {
        this.eventMarkers.select('line')
          .attr('x1', d => this.xScale(new Date(d.date)))
          .attr('x2', d => this.xScale(new Date(d.date)));

        this.eventMarkers.select('path')
          .attr('transform', d => `translate(${this.xScale(new Date(d.date))}, 8)`);
        
        // Update visibility based on zoom level
        this.eventMarkers
          .style('opacity', d => this.isEventVisible(d) ? 1 : 0)
          .style('pointer-events', d => this.isEventVisible(d) ? 'auto' : 'none');
      }

      // Update timeline events positions and visibility
      if (this.eventGroups) {
        this.eventGroups.attr('transform', d => 
          `translate(${this.xScale(new Date(d.date))}, ${this.timelineHeight / 2})`
        );
        
        // Update visibility based on zoom level
        this.eventGroups
          .style('opacity', d => this.isEventVisible(d) ? 1 : 0)
          .style('pointer-events', d => this.isEventVisible(d) ? 'auto' : 'none');
      }
    }

    // Update shared axis
    this.renderSharedAxis();
  }

  // Public method to highlight an event programmatically
  highlightEvent(eventId) {
    this.highlightEventMarker(eventId, true);
    this.highlightTimelineEvent(eventId, true);
    
    // Auto-reset after delay
    setTimeout(() => {
      this.highlightEventMarker(eventId, false);
      this.highlightTimelineEvent(eventId, false);
    }, 2000);
  }

  // Public method to zoom to a specific time range
  zoomToTimeRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const x0 = this.xScaleOriginal(start);
    const x1 = this.xScaleOriginal(end);
    const width = this.innerWidth;
    
    const scale = width / (x1 - x0);
    const translateX = -x0 * scale;
    
    this.svg.transition().duration(500)
      .call(this.zoom.transform, d3.zoomIdentity.translate(translateX, 0).scale(scale));
  }

  destroy() {
    if (this.svg) {
      this.svg.on('.zoom', null);
    }
    if (this.tooltip) {
      this.tooltip.remove();
    }
    super.destroy();
  }
}

export default TimelineVolumeComposite;
