/**
 * SentimentChart.js
 * Horizontal bar chart showing sentiment by faction
 */

import { BaseComponent } from './BaseComponent.js';
import { getEntityCardModal } from './EntityCardModal.js';

export class SentimentChart extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: 200,
      margin: { top: 20, right: 20, bottom: 20, left: 160 },
      barHeight: 28,
      ...options
    });
  }

  render() {
    if (!this.data || !this.data.factions || !this.data.factions.length) {
      this.showEmptyState('No sentiment data');
      return;
    }

    const { width, margin, barHeight } = this.options;
    const factions = this.data.factions;
    const height = Math.max(200, factions.length * (barHeight + 12) + margin.top + margin.bottom);

    const innerWidth = width - margin.left - margin.right;

    this.clear();
    this.options.height = height;

    const svg = this.createSvg();
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale: -1 to 1
    const x = d3.scaleLinear()
      .domain([-1, 1])
      .range([0, innerWidth]);

    // Center line (neutral)
    g.append('line')
      .attr('x1', x(0))
      .attr('x2', x(0))
      .attr('y1', -10)
      .attr('y2', factions.length * (barHeight + 12))
      .attr('stroke', 'var(--text-muted)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4');

    // Labels for scale
    g.append('text')
      .attr('x', x(-1))
      .attr('y', -5)
      .attr('text-anchor', 'start')
      .attr('fill', 'var(--accent-danger)')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)')
      .text('Negative');

    g.append('text')
      .attr('x', x(0))
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--text-muted)')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)')
      .text('Neutral');

    g.append('text')
      .attr('x', x(1))
      .attr('y', -5)
      .attr('text-anchor', 'end')
      .attr('fill', 'var(--accent-success)')
      .attr('font-size', '10px')
      .attr('font-family', 'var(--font-sans)')
      .text('Positive');

    // Draw bars
    factions.forEach((faction, i) => {
      const y = i * (barHeight + 12) + 10;
      const value = this.normalizeSentiment(faction.sentiment);
      const barStart = x(Math.min(0, value));
      const barWidth = Math.abs(x(value) - x(0));

      const group = g.append('g')
        .attr('class', 'sentiment-bar-group')
        .attr('transform', `translate(0, ${y})`);

      // Faction label (outside left) - clickable link to faction page
      const factionLabel = svg.append('text')
        .attr('x', margin.left - 10)
        .attr('y', margin.top + y + barHeight / 2 + 4)
        .attr('text-anchor', 'end')
        .attr('fill', 'var(--text-secondary)')
        .attr('font-size', '12px')
        .attr('font-family', 'var(--font-sans)')
        .text(faction.name.length > 22 ? faction.name.slice(0, 20) + '...' : faction.name);
      
      // Make faction label interactive
      factionLabel
        .style('cursor', 'pointer')
        .on('mouseenter', function() {
          d3.select(this).attr('fill', 'var(--accent-primary)');
          getEntityCardModal().show(faction.id, 'faction', this);
        })
        .on('mouseleave', function() {
          d3.select(this).attr('fill', 'var(--text-secondary)');
          getEntityCardModal().scheduleHide();
        })
        .on('click', () => {
          if (this.options.onFactionClick) {
            this.options.onFactionClick(faction);
          }
        });

      // Background bar
      group.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', innerWidth)
        .attr('height', barHeight)
        .attr('fill', 'var(--bg-tertiary)')
        .attr('rx', 4);

      // Sentiment bar
      group.append('rect')
        .attr('class', 'sentiment-bar')
        .attr('x', barStart)
        .attr('y', 4)
        .attr('width', barWidth)
        .attr('height', barHeight - 8)
        .attr('fill', this.getSentimentColor(faction.sentiment))
        .attr('rx', 3);

      // Sentiment value label (inside the bar)
      // Position label inside the bar, offset from the end
      const minBarWidthForLabel = 35; // Minimum bar width to show label inside
      const labelOffset = 8;
      let labelX, textAnchor;
      
      if (barWidth >= minBarWidthForLabel) {
        // Label inside the bar
        if (value >= 0) {
          labelX = barStart + barWidth - labelOffset;
          textAnchor = 'end';
        } else {
          labelX = barStart + labelOffset;
          textAnchor = 'start';
        }
      } else {
        // Bar too small, place label at center of bar area
        labelX = x(0) + (value >= 0 ? 8 : -8);
        textAnchor = value >= 0 ? 'start' : 'end';
      }
      
      group.append('text')
        .attr('x', labelX)
        .attr('y', barHeight / 2 + 4)
        .attr('text-anchor', textAnchor)
        .attr('fill', barWidth >= minBarWidthForLabel ? 'var(--bg-primary)' : 'var(--text-secondary)')
        .attr('font-size', '10px')
        .attr('font-weight', '600')
        .attr('font-family', 'var(--font-sans)')
        .text(this.formatSentimentValue(faction.sentiment));

      // Faction color indicator at the value position
      group.append('circle')
        .attr('cx', x(value))
        .attr('cy', barHeight / 2)
        .attr('r', 6)
        .attr('fill', faction.color || 'var(--accent-primary)')
        .attr('stroke', 'var(--bg-primary)')
        .attr('stroke-width', 2);

      // Click and hover handlers for the bar group
      group.style('cursor', 'pointer')
        .on('mouseenter', function() {
          getEntityCardModal().show(faction.id, 'faction', this);
        })
        .on('mouseleave', function() {
          getEntityCardModal().scheduleHide();
        })
        .on('click', () => {
          if (this.options.onFactionClick) {
            this.options.onFactionClick(faction);
          }
        });
    });
  }
}

export default SentimentChart;
