/**
 * Sparkline.js
 * Mini trend visualization for inline display
 */

import { BaseComponent } from './BaseComponent.js';

export class Sparkline extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      width: 100,
      height: 30,
      margin: { top: 2, right: 2, bottom: 2, left: 2 },
      color: 'var(--accent-primary)',
      strokeWidth: 1.5,
      showDot: true,
      showArea: false,
      sentiment: null,
      ...options
    });
    this.tooltip = null;
  }

  render() {
    if (!this.data || !this.data.length || !this.container) return;

    const { width, height, margin, color, strokeWidth, showDot, showArea, sentiment } = this.options;

    this.clear();
    this.removeTooltip();

    const svg = d3.select(this.container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'sparkline')
      .style('cursor', sentiment !== null ? 'pointer' : 'default');

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain([0, this.data.length - 1])
      .range([margin.left, width - margin.right]);

    const maxVal = Math.max(...this.data);
    const y = d3.scaleLinear()
      .domain([0, maxVal || 1])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveMonotoneX);

    // Optional area fill
    if (showArea) {
      const area = d3.area()
        .x((d, i) => x(i))
        .y0(height - margin.bottom)
        .y1(d => y(d))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(this.data)
        .attr('fill', color)
        .attr('fill-opacity', 0.1)
        .attr('d', area);
    }

    // Line
    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', strokeWidth)
      .attr('d', line);

    // End dot
    if (showDot && this.data.length > 0) {
      const lastIndex = this.data.length - 1;
      svg.append('circle')
        .attr('cx', x(lastIndex))
        .attr('cy', y(this.data[lastIndex]))
        .attr('r', 2.5)
        .attr('fill', color);
    }

    // Add tooltip for sentiment if provided
    if (sentiment !== null) {
      this.addSentimentTooltip(svg, sentiment);
    }
  }

  addSentimentTooltip(svg, sentiment) {
    const sentimentValue = typeof sentiment === 'number' ? sentiment : 0;
    const sign = sentimentValue > 0 ? '+' : '';
    const label = this.getSentimentLabel(sentimentValue);
    const tooltipText = `Sentiment: ${sign}${sentimentValue.toFixed(2)} (${label})`;

    svg
      .on('mouseenter', (event) => {
        this.showTooltip(event, tooltipText);
      })
      .on('mousemove', (event) => {
        this.updateTooltipPosition(event);
      })
      .on('mouseleave', () => {
        this.hideTooltip();
      });
  }

  getSentimentLabel(value) {
    if (value <= -0.6) return 'Very Negative';
    if (value <= -0.2) return 'Negative';
    if (value < 0.2) return 'Neutral';
    if (value < 0.6) return 'Positive';
    return 'Very Positive';
  }

  showTooltip(event, text) {
    this.removeTooltip();
    
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'sparkline-tooltip';
    this.tooltip.textContent = text;
    document.body.appendChild(this.tooltip);
    
    this.updateTooltipPosition(event);
  }

  updateTooltipPosition(event) {
    if (!this.tooltip) return;
    
    const offset = 10;
    this.tooltip.style.left = `${event.pageX + offset}px`;
    this.tooltip.style.top = `${event.pageY - offset - this.tooltip.offsetHeight}px`;
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style.opacity = '0';
      setTimeout(() => this.removeTooltip(), 150);
    }
  }

  removeTooltip() {
    if (this.tooltip && this.tooltip.parentNode) {
      this.tooltip.parentNode.removeChild(this.tooltip);
      this.tooltip = null;
    }
  }

  destroy() {
    this.removeTooltip();
    super.destroy();
  }
}

export default Sparkline;
