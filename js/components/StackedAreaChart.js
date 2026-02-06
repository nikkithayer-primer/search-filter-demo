/**
 * StackedAreaChart.js
 * Volume over time by faction visualization with interactive tooltip
 */

import { BaseComponent } from './BaseComponent.js';
import { formatDateLong, getTimeFormatter } from '../utils/formatters.js';
import { getEntityCardModal } from './EntityCardModal.js';

export class StackedAreaChart extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: 280,
      margin: { top: 20, right: 20, bottom: 50, left: 50 },
      ...options
    });
  }

  render() {
    if (!this.data || !this.data.dates || !this.data.dates.length) {
      this.showEmptyState('No time series data');
      return;
    }

    const { width, height, margin } = this.options;
    const { dates, series, factions } = this.data;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom - 30; // Space for legend

    const svg = this.createSvg();
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Prepare data for stacking
    const stackData = dates.map((date, i) => {
      const point = { date: new Date(date) };
      factions.forEach((f, fi) => {
        point[f.id] = series[fi] ? series[fi][i] : 0;
      });
      return point;
    });

    // Store for tooltip access
    this.stackData = stackData;
    this.factions = factions;

    // Stack generator
    const stack = d3.stack()
      .keys(factions.map(f => f.id))
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData = stack(stackData);

    // Scales
    const x = d3.scaleTime()
      .domain(d3.extent(stackData, d => d.date))
      .range([0, innerWidth]);

    const maxY = d3.max(stackedData, layer => d3.max(layer, d => d[1])) || 1;
    const y = d3.scaleLinear()
      .domain([0, maxY * 1.1])
      .range([innerHeight, 0]);

    const color = d3.scaleOrdinal()
      .domain(factions.map(f => f.id))
      .range(factions.map(f => f.color));

    // Store scales for tooltip
    this.xScale = x;
    this.yScale = y;
    this.colorScale = color;
    this.innerHeight = innerHeight;

    // Area generator
    const area = d3.area()
      .x(d => x(d.data.date))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))
      .curve(d3.curveMonotoneX);

    // Gridlines
    g.append('g')
      .attr('class', 'chart-grid')
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-innerWidth)
        .tickFormat(''))
      .selectAll('line')
      .attr('stroke', 'var(--border-color)')
      .attr('stroke-opacity', 0.3);

    g.select('.chart-grid path').remove();

    // Draw areas
    const layers = g.selectAll('.chart-layer')
      .data(stackedData)
      .join('path')
      .attr('class', d => `chart-layer chart-layer-${d.key}`)
      .attr('fill', d => color(d.key))
      .attr('fill-opacity', 0.8)
      .attr('d', area);
    
    // Store layers reference for legend hover
    this.layers = layers;

    // X axis
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x)
        .ticks(Math.min(dates.length, 7))
        .tickFormat(getTimeFormatter('%b %d')))
      .selectAll('text')
      .attr('fill', 'var(--text-muted)')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)');

    // Y axis
    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickFormat(d => this.formatNumber(d)))
      .selectAll('text')
      .attr('fill', 'var(--text-muted)')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)');

    // Style axis lines
    g.selectAll('.x-axis path, .y-axis path').attr('stroke', 'var(--border-color)');
    g.selectAll('.x-axis line, .y-axis line').attr('stroke', 'var(--border-color)');

    // ============================================
    // Interactive Tooltip
    // ============================================

    // Hover line
    const hoverLine = g.append('line')
      .attr('class', 'hover-line')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', 'var(--text-secondary)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')
      .attr('opacity', 0)
      .attr('pointer-events', 'none');

    // Hover dots for each faction
    const hoverDots = g.append('g')
      .attr('class', 'hover-dots')
      .attr('opacity', 0)
      .attr('pointer-events', 'none');

    factions.forEach(faction => {
      hoverDots.append('circle')
        .attr('class', `hover-dot-${faction.id}`)
        .attr('r', 4)
        .attr('fill', faction.color)
        .attr('stroke', 'var(--bg-primary)')
        .attr('stroke-width', 2);
    });

    // Tooltip
    const tooltip = d3.select(this.container)
      .append('div')
      .attr('class', 'chart-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('pointer-events', 'none');

    // Invisible overlay for mouse events
    const overlay = g.append('rect')
      .attr('class', 'chart-overlay')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair');

    // Bisector for finding closest data point
    const bisect = d3.bisector(d => d.date).left;

    overlay
      .on('mousemove', (event) => {
        const [mouseX] = d3.pointer(event);
        const x0 = x.invert(mouseX);
        const i = bisect(stackData, x0, 1);
        const d0 = stackData[i - 1];
        const d1 = stackData[i];
        
        // Find closest data point
        const d = !d1 ? d0 : !d0 ? d1 : (x0 - d0.date > d1.date - x0 ? d1 : d0);
        
        if (!d) return;

        const xPos = x(d.date);

        // Update hover line
        hoverLine
          .attr('x1', xPos)
          .attr('x2', xPos)
          .attr('opacity', 1);

        // Update hover dots
        hoverDots.attr('opacity', 1);
        
        // Calculate cumulative values for dot positioning
        let cumulative = 0;
        factions.forEach(faction => {
          const value = d[faction.id] || 0;
          cumulative += value;
          hoverDots.select(`.hover-dot-${faction.id}`)
            .attr('cx', xPos)
            .attr('cy', y(cumulative));
        });

        // Calculate total volume
        const total = factions.reduce((sum, f) => sum + (d[f.id] || 0), 0);

        // Build tooltip content
        const tooltipContent = `
          <div class="tooltip-header">
            <span class="tooltip-date">${formatDateLong(d.date)}</span>
            <span class="tooltip-total">${this.formatNumber(total)} total</span>
          </div>
          <div class="tooltip-body">
            ${factions.map(faction => {
              const value = d[faction.id] || 0;
              const percent = total > 0 ? Math.round((value / total) * 100) : 0;
              return `
                <div class="tooltip-row">
                  <span class="tooltip-color" style="background: ${faction.color}"></span>
                  <span class="tooltip-faction">${faction.name}</span>
                  <span class="tooltip-value">${this.formatNumber(value)}</span>
                  <span class="tooltip-percent">(${percent}%)</span>
                </div>
              `;
            }).join('')}
          </div>
        `;

        // Position tooltip
        const containerRect = this.container.getBoundingClientRect();
        const tooltipX = xPos + margin.left;
        const tooltipY = event.offsetY;

        // Determine if tooltip should be on left or right of line
        const tooltipOnLeft = tooltipX > innerWidth / 2;

        tooltip
          .html(tooltipContent)
          .style('opacity', 1)
          .style('left', tooltipOnLeft ? `${tooltipX - 180}px` : `${tooltipX + 15}px`)
          .style('top', `${Math.max(10, tooltipY - 50)}px`);
      })
      .on('mouseenter', () => {
        hoverLine.attr('opacity', 1);
        hoverDots.attr('opacity', 1);
        tooltip.style('opacity', 1);
        layers.attr('fill-opacity', 0.6);
      })
      .on('mouseleave', () => {
        hoverLine.attr('opacity', 0);
        hoverDots.attr('opacity', 0);
        tooltip.style('opacity', 0);
        layers.attr('fill-opacity', 0.8);
      });

    // Legend
    const legend = svg.append('g')
      .attr('class', 'chart-legend')
      .attr('transform', `translate(${margin.left}, ${height - 25})`);

    const legendItemWidth = Math.min(140, innerWidth / factions.length);

    factions.forEach((faction, i) => {
      const legendItem = legend.append('g')
        .attr('class', 'legend-item')
        .attr('transform', `translate(${i * legendItemWidth}, 0)`)
        .style('cursor', 'pointer');

      legendItem.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('rx', 2)
        .attr('fill', faction.color);

      legendItem.append('text')
        .attr('x', 18)
        .attr('y', 10)
        .text(faction.name.length > 15 ? faction.name.slice(0, 13) + '...' : faction.name)
        .attr('class', 'legend-label')
        .attr('fill', 'var(--text-secondary)')
        .attr('font-size', '11px')
        .attr('font-family', 'var(--font-sans)')
        .append('title')
        .text(faction.name);

      // Add click handler for faction navigation
      if (this.options.onFactionClick) {
        legendItem.on('click', () => {
          this.options.onFactionClick(faction);
        });
      }

      // Add hover effect to highlight corresponding area and show entity card
      const self = this;
      legendItem
        .style('cursor', 'pointer')
        .on('mouseover', function() {
          d3.select(this).select('text').attr('fill', 'var(--accent-primary)');
          // Highlight the corresponding area, dim others
          self.layers
            .attr('fill-opacity', d => d.key === faction.id ? 1 : 0.4)
            .attr('stroke', d => d.key === faction.id ? faction.color : 'none')
            .attr('stroke-width', d => d.key === faction.id ? 2 : 0);
          // Show entity card
          getEntityCardModal().show(faction.id, 'faction', this);
        })
        .on('mouseout', function() {
          d3.select(this).select('text').attr('fill', 'var(--text-secondary)');
          // Restore all areas to normal opacity
          self.layers
            .attr('fill-opacity', 0.8)
            .attr('stroke', 'none')
            .attr('stroke-width', 0);
          // Hide entity card
          getEntityCardModal().scheduleHide();
        });
    });
  }

  destroy() {
    // Remove tooltip on destroy
    if (this.container) {
      const tooltip = this.container.querySelector('.chart-tooltip');
      if (tooltip) tooltip.remove();
    }
    super.destroy();
  }
}

export default StackedAreaChart;
