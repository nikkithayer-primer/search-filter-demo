/**
 * TopicList.js
 * List of topics with sparklines, duration, and bullet point summaries
 * Extends BaseItemList for common list functionality
 */

import { BaseItemList } from './BaseItemList.js';

export class TopicList extends BaseItemList {
  constructor(containerId, options = {}) {
    super(containerId, {
      maxItems: 10,
      showSparkline: true,
      showVolume: true,
      showDuration: true,
      showBulletPoints: false,
      maxBulletPoints: 3,
      ...options
    });
    this.showBullets = this.options.showBulletPoints;
  }

  /**
   * Get items from data
   */
  getItems() {
    return this.data?.topics || [];
  }

  /**
   * Get empty state message
   */
  getEmptyMessage() {
    return 'No topics found';
  }

  /**
   * Get list container CSS class
   */
  getListClass() {
    return 'topic-list';
  }

  /**
   * Get item CSS class
   */
  getItemClass(item) {
    return 'topic-item-wrapper';
  }

  /**
   * Get item title (topics use 'headline' field)
   */
  getItemTitle(item) {
    return item.headline || item.text || '';
  }

  /**
   * Calculate volume from volumeOverTime (different from narrative/subnarrative)
   */
  calculateVolume(item) {
    if (!item.volumeOverTime || !item.volumeOverTime.length) return 0;
    return item.volumeOverTime.reduce((sum, entry) => sum + (entry.volume || 0), 0);
  }

  /**
   * Get sparkline values (different structure from narratives)
   */
  getSparklineValues(item) {
    if (!item.volumeOverTime || !item.volumeOverTime.length) return [];
    return item.volumeOverTime.map(d => d.volume || 0);
  }

  /**
   * Get sparkline color (topics use accent color, not sentiment)
   */
  getSparklineColor(item) {
    return 'var(--accent-primary)';
  }

  /**
   * Toggle bullet points visibility
   */
  toggleBulletPoints() {
    this.showBullets = !this.showBullets;
    this.render();
    return this.showBullets;
  }

  /**
   * Set bullet points visibility
   */
  setShowBulletPoints(show) {
    this.showBullets = show;
    this.render();
  }

  /**
   * Format duration from start to end date
   */
  formatDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 14) return '1 week';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks`;
    return `${Math.floor(diffDays / 30)} months`;
  }

  /**
   * Get status indicator HTML
   */
  getStatusIndicator(topic) {
    const isActive = !topic.endDate || new Date(topic.endDate) >= new Date();
    if (isActive) {
      return `<span class="topic-status topic-status-active" title="Active topic">
        <svg viewBox="0 0 16 16" width="8" height="8" fill="currentColor">
          <circle cx="8" cy="8" r="4"/>
        </svg>
      </span>`;
    }
    return `<span class="topic-status topic-status-ended" title="Topic ended">
      <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="8" cy="8" r="5"/>
        <path d="M5 8l2 2 4-4"/>
      </svg>
    </span>`;
  }

  /**
   * Render a single topic item's content
   */
  renderItemContent(item, sparklineIndex) {
    const totalVolume = this.calculateVolume(item);
    const hasBulletPoints = item.bulletPoints && item.bulletPoints.length > 0;
    const isExpanded = this.isExpanded(item.id);
    const duration = this.formatDuration(item.startDate, item.endDate);
    const dateRange = item.endDate 
      ? `${this.formatDate(item.startDate, { month: 'short', day: 'numeric' })} - ${this.formatDate(item.endDate, { month: 'short', day: 'numeric' })}`
      : `Since ${this.formatDate(item.startDate, { month: 'short', day: 'numeric' })}`;

    return `
      <div class="topic-item${hasBulletPoints && this.showBullets ? ' has-bullets' : ''}${isExpanded ? ' expanded' : ''}" data-id="${item.id}">
        <div class="topic-status-column">
          ${this.getStatusIndicator(item)}
        </div>
        <div class="topic-content">
          <div class="topic-headline">${this.getItemTitle(item)}</div>
          ${this.options.showDuration ? `
            <div class="topic-duration">
              <span class="topic-date-range">${dateRange}</span>
              <span class="topic-duration-badge">${duration}</span>
            </div>
          ` : ''}
          ${hasBulletPoints && this.showBullets ? `
            <ul class="topic-bullets${isExpanded ? ' expanded' : ''}">
              ${item.bulletPoints.slice(0, isExpanded ? undefined : this.options.maxBulletPoints).map(bp => `
                <li class="topic-bullet">${bp}</li>
              `).join('')}
            </ul>
            ${item.bulletPoints.length > this.options.maxBulletPoints && !isExpanded ? `
              <button class="topic-expand-toggle" data-topic-id="${item.id}">
                +${item.bulletPoints.length - this.options.maxBulletPoints} more
              </button>
            ` : ''}
            ${isExpanded && item.bulletPoints.length > this.options.maxBulletPoints ? `
              <button class="topic-expand-toggle" data-topic-id="${item.id}">
                Show less
              </button>
            ` : ''}
          ` : ''}
        </div>
        <div class="topic-meta">
          ${this.options.showVolume ? `
            <span class="topic-volume">${this.formatNumber(totalVolume)}</span>
          ` : ''}
          ${this.options.showSparkline ? `
            <div class="sparkline-container" data-sparkline-index="${sparklineIndex}"></div>
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Set up additional handlers
   */
  setupAdditionalHandlers(element, item) {
    // Handle expand toggle click
    const expandToggle = element.querySelector('.topic-expand-toggle');
    if (expandToggle) {
      expandToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleExpanded(item.id);
      });
    }
  }

}

export default TopicList;
