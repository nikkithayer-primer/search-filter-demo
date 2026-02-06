/**
 * BaseItemList.js
 * Base class for list components with sparklines and common functionality
 * Extended by NarrativeList, ThemeList, and TopicList
 */

import { BaseComponent } from './BaseComponent.js';
import { Sparkline } from './Sparkline.js';
import { DataService } from '../data/DataService.js';

export class BaseItemList extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      maxItems: 10,
      showSparkline: true,
      showVolume: true,
      defaultShowDescription: false,
      ...options
    });
    this.sparklines = [];
    this.showDescription = this.options.defaultShowDescription;
    this.expandedItems = new Set();
  }

  /**
   * Toggle description visibility
   * @returns {boolean} Current state after toggle
   */
  toggleDescription() {
    this.showDescription = !this.showDescription;
    this.render();
    return this.showDescription;
  }

  /**
   * Set description visibility
   * @param {boolean} show - Whether to show descriptions
   */
  setShowDescription(show) {
    this.showDescription = show;
    this.render();
  }

  /**
   * Toggle expanded state for an item
   * @param {string} itemId - The item ID to toggle
   */
  toggleExpanded(itemId) {
    if (this.expandedItems.has(itemId)) {
      this.expandedItems.delete(itemId);
    } else {
      this.expandedItems.add(itemId);
    }
    this.render();
  }

  /**
   * Check if an item is expanded
   * @param {string} itemId - The item ID to check
   * @returns {boolean}
   */
  isExpanded(itemId) {
    return this.expandedItems.has(itemId);
  }

  /**
   * Format a date string for display
   * @param {string} dateString - ISO date string
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string}
   */
  formatDate(dateString, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  /**
   * Format sentiment value to human-readable string
   * @param {number} sentiment - Sentiment value (-1 to 1)
   * @returns {string}
   */
  formatSentiment(sentiment) {
    const value = typeof sentiment === 'number' ? sentiment : 0;
    if (value <= -0.6) return 'Very Negative';
    if (value <= -0.2) return 'Negative';
    if (value < 0.2) return 'Neutral';
    if (value < 0.6) return 'Positive';
    return 'Very Positive';
  }

  /**
   * Calculate total volume from documents (or legacy factionMentions)
   * Override in subclass if volume is calculated differently
   * @param {Object} item - The data item
   * @returns {number}
   */
  calculateVolume(item) {
    // Use document-based aggregation for narratives/themes
    if (item.id?.startsWith('narr-')) {
      const factionMentions = DataService.getAggregateFactionMentionsForNarrative(item.id);
      return Object.values(factionMentions)
        .reduce((sum, f) => sum + (f.volume || 0), 0);
    }
    if (item.id?.startsWith('sub-')) {
      const factionMentions = DataService.getAggregateFactionMentionsForTheme(item.id);
      return Object.values(factionMentions)
        .reduce((sum, f) => sum + (f.volume || 0), 0);
    }
    // Fallback for legacy data or other item types
    return Object.values(item.factionMentions || {})
      .reduce((sum, f) => sum + (f.volume || 0), 0);
  }

  /**
   * Get sparkline values from documents (or legacy volumeOverTime)
   * Override in subclass if data structure is different
   * @param {Object} item - The data item
   * @returns {number[]}
   */
  getSparklineValues(item) {
    // Use document-based aggregation for narratives/themes
    if (item.id?.startsWith('narr-')) {
      const volumeOverTime = DataService.getVolumeOverTimeForNarrative(item.id);
      return volumeOverTime.map(d =>
        Object.values(d.factionVolumes || {}).reduce((a, b) => a + b, 0)
      );
    }
    if (item.id?.startsWith('sub-')) {
      const volumeOverTime = DataService.getVolumeOverTimeForTheme(item.id);
      return volumeOverTime.map(d =>
        Object.values(d.factionVolumes || {}).reduce((a, b) => a + b, 0)
      );
    }
    // Fallback for legacy data or other item types
    if (!item.volumeOverTime || !item.volumeOverTime.length) return [];
    return item.volumeOverTime.map(d =>
      Object.values(d.factionVolumes || {}).reduce((a, b) => a + b, 0)
    );
  }

  /**
   * Get sparkline color for an item
   * Override in subclass for custom coloring
   * @param {Object} item - The data item
   * @returns {string}
   */
  getSparklineColor(item) {
    return this.getSentimentColor(item.sentiment);
  }

  /**
   * Get the display title for an item
   * Override in subclass if using different field
   * @param {Object} item - The data item
   * @returns {string}
   */
  getItemTitle(item) {
    return item.text || item.headline || item.name || '';
  }

  /**
   * Get the items array from data
   * Override in subclass to specify data key
   * @returns {Array}
   */
  getItems() {
    return this.data?.items || [];
  }

  /**
   * Get empty state message
   * Override in subclass for custom message
   * @returns {string}
   */
  getEmptyMessage() {
    return 'No items found';
  }

  /**
   * Get the CSS class for the list container
   * Override in subclass for custom styling
   * @returns {string}
   */
  getListClass() {
    return 'narrative-list';
  }

  /**
   * Get the CSS class for a list item wrapper (the <li> element)
   * The actual styling should be on the inner content element rendered by renderItemContent
   * @param {Object} item - The data item
   * @returns {string}
   */
  getItemClass(item) {
    return '';
  }

  /**
   * Render a single list item's content
   * Must be implemented by subclass
   * @param {Object} item - The data item
   * @param {number} index - Item index
   * @returns {string} HTML string
   */
  renderItemContent(item, index) {
    throw new Error('renderItemContent must be implemented by subclass');
  }

  /**
   * Render the meta section (volume + sparkline)
   * @param {Object} item - The data item
   * @param {number} index - Sparkline index
   * @returns {string} HTML string
   */
  renderItemMeta(item, index) {
    const volume = this.calculateVolume(item);
    return `
      <div class="narrative-meta">
        ${this.options.showVolume ? `
          <span class="narrative-volume">${this.formatNumber(volume)}</span>
        ` : ''}
        ${this.options.showSparkline ? `
          <div class="sparkline-container" data-sparkline-index="${index}"></div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Set up click handler for an item
   * Override in subclass for custom behavior
   * @param {HTMLElement} element - The DOM element
   * @param {Object} item - The data item
   */
  setupItemClickHandler(element, item) {
    element.addEventListener('click', (e) => {
      // Don't navigate if clicking interactive elements
      if (e.target.closest('.source-link') || 
          e.target.closest('button') ||
          e.target.closest('a')) {
        return;
      }
      this.onItemClick(item);
    });
  }

  /**
   * Handle item click
   * Override in subclass or use options.onItemClick
   * @param {Object} item - The clicked item
   */
  onItemClick(item) {
    if (this.options.onItemClick) {
      this.options.onItemClick(item);
    }
  }

  /**
   * Main render method
   */
  render() {
    this.clear();
    this.cleanupSparklines();

    const items = this.getItems();
    if (!items || !items.length) {
      this.showEmptyState(this.getEmptyMessage());
      return;
    }

    const list = document.createElement('ul');
    list.className = this.getListClass();

    const displayItems = items.slice(0, this.options.maxItems);
    let sparklineIndex = 0;

    displayItems.forEach((item, i) => {
      const li = document.createElement('li');
      li.className = this.getItemClass(item);
      li.dataset.id = item.id;

      // Get current sparkline index for this item
      const itemSparklineIndex = sparklineIndex;
      
      // Render item content (implemented by subclass)
      li.innerHTML = this.renderItemContent(item, itemSparklineIndex);
      
      // Increment sparkline index
      sparklineIndex = this.getNextSparklineIndex(item, sparklineIndex);

      // Set up click handler
      const clickTarget = li.querySelector('.narrative-item, .topic-item, .subnarrative-item') || li;
      this.setupItemClickHandler(clickTarget, item);

      // Set up any additional handlers (implemented by subclass)
      this.setupAdditionalHandlers(li, item);

      list.appendChild(li);
    });

    this.container.appendChild(list);

    // Render sparklines after DOM update
    if (this.options.showSparkline) {
      this.renderSparklines(displayItems);
    }
  }

  /**
   * Get the next sparkline index after rendering an item
   * Override if item can have multiple sparklines (e.g., nested items)
   * @param {Object} item - The data item
   * @param {number} currentIndex - Current sparkline index
   * @returns {number} Next sparkline index
   */
  getNextSparklineIndex(item, currentIndex) {
    return currentIndex + 1;
  }

  /**
   * Set up additional event handlers for an item
   * Override in subclass for custom handlers
   * @param {HTMLElement} element - The list item element
   * @param {Object} item - The data item
   */
  setupAdditionalHandlers(element, item) {
    // Override in subclass
  }

  /**
   * Render sparklines for all items
   * @param {Array} items - The items to render sparklines for
   */
  renderSparklines(items) {
    requestAnimationFrame(() => {
      const containers = this.container.querySelectorAll('.sparkline-container');
      const sparklineData = this.getSparklineData(items);

      containers.forEach((container, idx) => {
        const data = sparklineData[idx];
        if (data && data.values && data.values.length) {
          const sparkline = new Sparkline(container, {
            width: 80,
            height: 24,
            color: data.color,
            sentiment: data.sentiment
          });
          sparkline.update(data.values);
          this.sparklines.push(sparkline);
        }
      });
    });
  }

  /**
   * Get sparkline data for all items
   * Override if items have nested sparklines
   * @param {Array} items - The items
   * @returns {Array} Array of { values, color, sentiment }
   */
  getSparklineData(items) {
    return items.map(item => ({
      values: this.getSparklineValues(item),
      color: this.getSparklineColor(item),
      sentiment: item.sentiment
    }));
  }

  /**
   * Clean up sparkline instances
   */
  cleanupSparklines() {
    this.sparklines.forEach(s => s.destroy());
    this.sparklines = [];
  }

  /**
   * Destroy the component
   */
  destroy() {
    this.cleanupSparklines();
    super.destroy();
  }
}

export default BaseItemList;
