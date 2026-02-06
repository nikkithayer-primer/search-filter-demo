/**
 * ThemeList.js
 * List of themes with sentiment badges and sparklines
 * Extends BaseItemList for common list functionality
 */

import { BaseItemList } from './BaseItemList.js';
import { getSourceViewer } from './SourceViewerModal.js';

export class ThemeList extends BaseItemList {
  constructor(containerId, options = {}) {
    super(containerId, {
      maxItems: 10,
      showSparkline: true,
      showVolume: true,
      defaultShowDescription: false,
      ...options
    });
  }

  /**
   * Get items from data
   */
  getItems() {
    return this.data?.themes || [];
  }

  /**
   * Get empty state message
   */
  getEmptyMessage() {
    return 'No themes found';
  }

  /**
   * Render a single item's content
   */
  renderItemContent(item, sparklineIndex) {
    const volume = this.calculateVolume(item);
    
    return `
      <div class="narrative-item" data-id="${item.id}">
        <div class="narrative-content">
          <div class="narrative-title-row">
            <span class="narrative-text">${this.getItemTitle(item)}</span>
            <span class="badge badge-${this.getSentimentClass(item.sentiment)}">${this.formatSentiment(item.sentiment)}</span>
          </div>
          ${item.description && this.showDescription ? `
            <p class="narrative-description">
              ${item.description}
              <a href="#" class="btn btn-small btn-secondary source-link" data-id="${item.id}" data-type="theme">View source</a>
            </p>
          ` : ''}
        </div>
        <div class="narrative-meta">
          ${this.options.showVolume ? `
            <span class="narrative-volume">${this.formatNumber(volume)}</span>
          ` : ''}
          ${this.options.showSparkline ? `
            <div class="sparkline-container" data-sparkline-index="${sparklineIndex}"></div>
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Set up additional handlers (source link)
   */
  setupAdditionalHandlers(element, item) {
    const sourceLink = element.querySelector('.source-link');
    if (sourceLink) {
      sourceLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        getSourceViewer().open(item, 'theme');
      });
    }
  }

}

export default ThemeList;
