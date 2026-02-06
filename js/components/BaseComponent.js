/**
 * BaseComponent.js
 * Base class for all visualization components
 * Provides standard lifecycle methods and utilities
 */

import {
  normalizeSentiment,
  getSentimentClass,
  formatSentiment,
  formatSentimentValue,
  getSentimentColor,
  formatNumber,
  formatDate
} from '../utils/formatters.js';
import { escapeHtml } from '../utils/htmlUtils.js';

export class BaseComponent {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.container = typeof containerId === 'string'
      ? document.getElementById(containerId)
      : containerId;

    if (!this.container) {
      console.warn(`Container not found: ${containerId}`);
    }

    this.options = {
      width: options.width || (this.container ? this.container.clientWidth : 400),
      height: options.height || 300,
      margin: options.margin || { top: 20, right: 20, bottom: 30, left: 40 },
      ...options
    };

    this.data = null;
    this.svg = null;
    this._resizeHandler = null;
    this._resizeObserver = null;
    this._resizeTimeout = null;
  }

  /**
   * Render the component - must be implemented by subclass
   */
  render() {
    throw new Error('render() must be implemented by subclass');
  }

  /**
   * Update data and re-render
   */
  update(data) {
    this.data = data;
    if (this.container) {
      try {
        this.render();
      } catch (e) {
        console.error(`${this.constructor.name}: Error during render:`, e);
        this.showErrorState('Failed to render component');
      }
    }
    return this;
  }

  /**
   * Clear the container
   */
  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
    return this;
  }

  /**
   * Handle window resize
   * In fullscreen mode, also updates height to fill available space
   */
  resize() {
    if (this.container) {
      try {
        this.options.width = this.container.clientWidth || this.options.width;
        
        // In fullscreen mode, also update height to fill available space
        // This is safe because fullscreen constrains dimensions via CSS (position: fixed)
        // so reading clientHeight won't cause resize feedback loops
        const card = this.container.closest('.card');
        if (card && card.classList.contains('card-fullscreen')) {
          const containerHeight = this.container.clientHeight;
          if (containerHeight > 0) {
            this.options.height = containerHeight;
          }
        }
        
        if (this.data) {
          this.render();
        }
      } catch (e) {
        console.error(`${this.constructor.name}: Error during resize:`, e);
      }
    }
    return this;
  }

  /**
   * Enable auto-resize on window resize and container resize
   * Uses ResizeObserver for accurate container size detection (handles CSS transitions)
   */
  enableAutoResize() {
    // Use ResizeObserver for container size changes (more accurate, handles CSS transitions)
    if (!this._resizeObserver && this.container) {
      this._resizeObserver = new ResizeObserver((entries) => {
        // Debounce rapid resize events
        if (this._resizeTimeout) {
          clearTimeout(this._resizeTimeout);
        }
        this._resizeTimeout = setTimeout(() => {
          this.resize();
        }, 50);
      });
      this._resizeObserver.observe(this.container);
    }
    
    // Also listen for window resize as fallback
    if (!this._resizeHandler) {
      this._resizeHandler = () => this.resize();
      window.addEventListener('resize', this._resizeHandler);
    }
    return this;
  }

  /**
   * Disable auto-resize
   */
  disableAutoResize() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = null;
    }
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler);
      this._resizeHandler = null;
    }
    return this;
  }

  /**
   * Clean up and destroy the component
   */
  destroy() {
    this.disableAutoResize();
    this.removeTooltip();
    this.clear();
    this.data = null;
    this.svg = null;
  }

  /**
   * Show empty state message
   */
  showEmptyState(message = 'No data available') {
    this.clear();
    if (this.container) {
      this.container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">◇</span>
          <p>${this.escapeHtml(message)}</p>
        </div>
      `;
    }
    return this;
  }

  /**
   * Show error state message
   */
  showErrorState(message = 'An error occurred') {
    this.clear();
    if (this.container) {
      this.container.innerHTML = `
        <div class="empty-state error-state">
          <span class="empty-icon">⚠</span>
          <p>${this.escapeHtml(message)}</p>
        </div>
      `;
    }
    return this;
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    return escapeHtml(text);
  }

  /**
   * Show loading state
   */
  showLoading() {
    this.clear();
    if (this.container) {
      this.container.innerHTML = `
        <div class="loading-state">
          <div class="loader"></div>
          <p>Loading...</p>
        </div>
      `;
    }
    return this;
  }

  /**
   * Check if this component is inside a fullscreen card
   */
  isInFullscreen() {
    if (!this.container) return false;
    const card = this.container.closest('.card');
    return card && card.classList.contains('card-fullscreen');
  }

  /**
   * Create SVG element with proper dimensions
   * In fullscreen mode, uses 100% width/height to let CSS control sizing
   */
  createSvg() {
    const { width, height } = this.options;
    this.clear();

    // Check if D3 is available
    if (typeof d3 === 'undefined') {
      console.error(`${this.constructor.name}: D3 library is not loaded`);
      this.showErrorState('Visualization library not available');
      return null;
    }

    if (!this.container) {
      console.error(`${this.constructor.name}: Container not available`);
      return null;
    }

    try {
      const isFullscreen = this.isInFullscreen();
      
      this.svg = d3.select(this.container)
        .append('svg')
        .attr('width', isFullscreen ? '100%' : width)
        .attr('height', isFullscreen ? '100%' : height)
        .attr('viewBox', [0, 0, width, height])
        .attr('preserveAspectRatio', 'xMidYMid meet');

      return this.svg;
    } catch (e) {
      console.error(`${this.constructor.name}: Error creating SVG:`, e);
      this.showErrorState('Failed to create visualization');
      return null;
    }
  }

  /**
   * Create inner group with margins applied
   */
  createInnerGroup() {
    if (!this.svg) {
      console.error(`${this.constructor.name}: SVG not initialized`);
      return null;
    }
    
    try {
      const { margin } = this.options;
      return this.svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    } catch (e) {
      console.error(`${this.constructor.name}: Error creating inner group:`, e);
      return null;
    }
  }

  /**
   * Get inner dimensions (excluding margins)
   */
  getInnerDimensions() {
    const { width, height, margin } = this.options;
    return {
      width: width - margin.left - margin.right,
      height: height - margin.top - margin.bottom
    };
  }

  /**
   * Format number with locale string
   * Delegates to shared formatters.js
   */
  formatNumber(num) {
    return formatNumber(num);
  }

  /**
   * Format date for display
   * Delegates to shared formatters.js
   */
  formatDate(date) {
    return formatDate(date);
  }

  /**
   * Get sentiment color based on numeric sentiment value
   * Delegates to shared formatters.js
   */
  getSentimentColor(sentiment) {
    return getSentimentColor(sentiment);
  }

  /**
   * Normalize sentiment value to -1 to 1 range
   * Delegates to shared formatters.js
   */
  normalizeSentiment(sentiment) {
    return normalizeSentiment(sentiment);
  }

  /**
   * Format sentiment value for display
   * Delegates to shared formatters.js
   */
  formatSentimentLabel(sentiment) {
    return formatSentiment(sentiment);
  }

  /**
   * Format sentiment value as a number string
   * Delegates to shared formatters.js
   */
  formatSentimentValue(sentiment) {
    return formatSentimentValue(sentiment);
  }

  /**
   * Get sentiment class based on numeric sentiment value
   * Delegates to shared formatters.js
   */
  getSentimentClass(sentiment) {
    return getSentimentClass(sentiment);
  }

  /**
   * Add tooltip behavior to selection
   */
  addTooltip(selection, contentFn) {
    if (typeof d3 === 'undefined') {
      console.warn(`${this.constructor.name}: D3 not available for tooltip`);
      return selection;
    }
    
    if (!selection || !contentFn) {
      console.warn(`${this.constructor.name}: addTooltip requires selection and contentFn`);
      return selection;
    }

    try {
      const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('pointer-events', 'none');

      selection
        .on('mouseover', function(event, d) {
          try {
            tooltip.transition()
              .duration(200)
              .style('opacity', 1);
            tooltip.html(contentFn(d))
              .style('left', (event.pageX + 10) + 'px')
              .style('top', (event.pageY - 10) + 'px');
          } catch (e) {
            console.error('Error in tooltip mouseover:', e);
          }
        })
        .on('mousemove', function(event) {
          tooltip
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function() {
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });

      // Store tooltip reference for cleanup
      this._tooltip = tooltip;
    } catch (e) {
      console.error(`${this.constructor.name}: Error adding tooltip:`, e);
    }
    
    return selection;
  }

  /**
   * Remove tooltip
   */
  removeTooltip() {
    if (this._tooltip) {
      this._tooltip.remove();
      this._tooltip = null;
    }
  }
}

export default BaseComponent;
