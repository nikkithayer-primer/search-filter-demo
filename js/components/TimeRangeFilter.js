/**
 * TimeRangeFilter.js
 * Histogram with brush for selecting time range
 * Designed for compact header placement
 */

import { BaseComponent } from './BaseComponent.js';
import { formatDate, getTimeFormatter } from '../utils/formatters.js';

export class TimeRangeFilter extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: 48,
      margin: { top: 2, right: 12, bottom: 16, left: 12 },
      barColor: 'var(--accent-primary)',
      barOpacity: 0.6,
      selectionColor: 'var(--accent-primary)',
      selectionOpacity: 0.3,
      ...options
    });
    
    this.brushSelection = null;
    this.onChangeCallback = options.onChange || null;
  }

  /**
   * Set the change callback
   */
  onChange(callback) {
    this.onChangeCallback = callback;
    return this;
  }

  /**
   * Get the current time extent from data
   */
  getTimeExtent() {
    if (!this.data || !this.data.dates || !this.data.dates.length) {
      return null;
    }
    const dates = this.data.dates.map(d => new Date(d));
    return d3.extent(dates);
  }

  /**
   * Get the currently selected range
   */
  getSelection() {
    return this.brushSelection;
  }

  /**
   * Set the selection programmatically
   */
  setSelection(start, end) {
    if (!this.xScale || !this.brush || !this.brushGroup) return;
    
    if (start === null || end === null) {
      this.brushGroup.call(this.brush.move, null);
      this.brushSelection = null;
    } else {
      const x0 = this.xScale(new Date(start));
      const x1 = this.xScale(new Date(end));
      this.brushGroup.call(this.brush.move, [x0, x1]);
    }
  }

  /**
   * Clear the selection
   */
  clearSelection() {
    this.setSelection(null, null);
  }

  render() {
    if (!this.data || !this.data.dates || !this.data.dates.length) {
      this.showEmptyState('No time data');
      return;
    }

    const { width, height, margin, barColor, barOpacity, selectionColor, selectionOpacity } = this.options;
    const { dates, volumes } = this.data;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    this.clear();

    // Create SVG
    const svg = d3.select(this.container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'time-range-filter');

    this.svg = svg;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse dates and create data points
    const dataPoints = dates.map((date, i) => ({
      date: new Date(date),
      volume: volumes[i] || 0
    }));

    // X scale (time)
    const xExtent = d3.extent(dataPoints, d => d.date);
    const xScale = d3.scaleTime()
      .domain(xExtent)
      .range([0, innerWidth]);

    this.xScale = xScale;

    // Calculate bar width based on data density
    const barWidth = Math.max(2, Math.min(8, innerWidth / dataPoints.length - 1));

    // Y scale (volume)
    const maxVolume = d3.max(dataPoints, d => d.volume) || 1;
    const yScale = d3.scaleLinear()
      .domain([0, maxVolume])
      .range([innerHeight, 0]);

    // Draw histogram bars
    g.selectAll('.histogram-bar')
      .data(dataPoints)
      .join('rect')
      .attr('class', 'histogram-bar')
      .attr('x', d => xScale(d.date) - barWidth / 2)
      .attr('y', d => yScale(d.volume))
      .attr('width', barWidth)
      .attr('height', d => innerHeight - yScale(d.volume))
      .attr('fill', barColor)
      .attr('fill-opacity', barOpacity)
      .attr('rx', 1);

    // X axis (simplified, just endpoints)
    const axisGroup = g.append('g')
      .attr('class', 'time-axis')
      .attr('transform', `translate(0,${innerHeight})`);

    // Start date label
    axisGroup.append('text')
      .attr('x', 0)
      .attr('y', 14)
      .attr('text-anchor', 'start')
      .attr('fill', 'var(--text-muted)')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-mono)')
      .text(formatDate(xExtent[0]));

    // End date label
    axisGroup.append('text')
      .attr('x', innerWidth)
      .attr('y', 14)
      .attr('text-anchor', 'end')
      .attr('fill', 'var(--text-muted)')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-mono)')
      .text(formatDate(xExtent[1]));

    // Create brush
    const brush = d3.brushX()
      .extent([[0, 0], [innerWidth, innerHeight]])
      .on('brush', (event) => this.handleBrush(event))
      .on('end', (event) => this.handleBrushEnd(event));

    this.brush = brush;

    // Add brush group
    const brushGroup = g.append('g')
      .attr('class', 'brush')
      .call(brush);

    this.brushGroup = brushGroup;

    // Style brush
    brushGroup.selectAll('.selection')
      .attr('fill', selectionColor)
      .attr('fill-opacity', selectionOpacity)
      .attr('stroke', 'var(--accent-primary)')
      .attr('stroke-width', 1);

    brushGroup.selectAll('.handle')
      .attr('fill', 'var(--accent-primary)')
      .attr('rx', 2);

    // Restore previous selection if exists
    if (this.brushSelection) {
      const { start, end } = this.brushSelection;
      const x0 = xScale(new Date(start));
      const x1 = xScale(new Date(end));
      brushGroup.call(brush.move, [x0, x1]);
    }
  }

  handleBrush(event) {
    if (!event.selection) return;
    
    const [x0, x1] = event.selection;
    const start = this.xScale.invert(x0);
    const end = this.xScale.invert(x1);

    // Update range label if it exists
    this.updateRangeLabel(start, end);
  }

  handleBrushEnd(event) {
    if (!event.selection) {
      // Brush was cleared
      this.brushSelection = null;
      this.updateRangeLabel(null, null);
      if (this.onChangeCallback) {
        this.onChangeCallback(null);
      }
      return;
    }

    const [x0, x1] = event.selection;
    const start = this.xScale.invert(x0);
    const end = this.xScale.invert(x1);

    this.brushSelection = { start, end };

    if (this.onChangeCallback) {
      this.onChangeCallback({ start, end });
    }
  }

  updateRangeLabel(start, end) {
    const label = document.getElementById('time-range-label');
    if (!label) return;

    if (!start || !end) {
      label.textContent = 'All Time';
      return;
    }

    label.textContent = `${formatDate(start)} - ${formatDate(end)}`;
  }

  /**
   * Update with new data while preserving selection
   */
  updateData(data) {
    const previousSelection = this.brushSelection;
    this.data = data;
    
    if (this.container) {
      this.render();
      
      // Restore selection if it's still valid
      if (previousSelection) {
        const extent = this.getTimeExtent();
        if (extent) {
          const [minDate, maxDate] = extent;
          const start = new Date(previousSelection.start);
          const end = new Date(previousSelection.end);
          
          // Clamp selection to new data range
          if (start >= minDate && end <= maxDate) {
            this.setSelection(start, end);
          }
        }
      }
    }
    return this;
  }

  destroy() {
    if (this.brushGroup) {
      this.brushGroup.on('.brush', null);
    }
    super.destroy();
  }
}

export default TimeRangeFilter;
