/**
 * PageHeader.js
 * Utility for generating consistent page headers with breadcrumbs
 */

import { TagChips } from '../components/TagChips.js';
import { StatCards } from '../components/StatCards.js';

export const PageHeader = {
  /**
   * Create a page header HTML string
   * @param {Object} config - Header configuration
   * @param {Array} config.breadcrumbs - Array of breadcrumb items [{label, href}] or strings
   * @param {string} config.title - Page title
   * @param {string} [config.subtitle] - Subtitle text
   * @param {string} [config.icon] - Icon HTML or emoji
   * @param {string} [config.iconColor] - Background color for icon (for colored squares)
   * @param {string} [config.imageUrl] - URL for entity image (takes precedence over icon)
   * @param {string} [config.imageAlt] - Alt text for image
   * @param {string} [config.badge] - Badge HTML
   * @param {string} [config.description] - Description text
   * @param {string} [config.descriptionLink] - Link HTML to append to description
   * @param {Array} [config.tags] - Array of tag objects to display
   * @param {string} [config.tagsContainerId] - ID for tags container (enables interactive editing)
   * @param {Array} [config.stats] - Array of stat configs [{type, value, href?, label?, items?}] for StatCards
   * @param {string} [config.statsMode] - 'cards' (default) or 'dropdowns' for rendering mode
   * @param {string} [config.statsContextId] - Context ID for dropdown routes
   * @param {Array} [config.tabs] - Array of tab items [{id, label, href}]
   * @param {string} [config.activeTab] - ID of the active tab
   * @returns {string} Page header HTML string
   */
  render(config) {
    const {
      breadcrumbs = [],
      title,
      subtitle,
      icon,
      iconColor,
      imageUrl,
      imageAlt,
      badge,
      description,
      descriptionLink,
      tags,
      tagsContainerId,
      stats,
      statsMode = 'cards',
      statsContextId = null,
      actions,
      tabs,
      activeTab
    } = config;

    const hasStats = stats && stats.length > 0;
    const hasTabs = tabs && tabs.length > 0;
    
    const breadcrumbHtml = this.renderBreadcrumbs(breadcrumbs);
    const iconHtml = this.renderIcon(icon, iconColor, imageUrl, imageAlt);
    const titleRowHtml = this.renderTitleRow(title, iconHtml, badge, actions);
    const subtitleHtml = subtitle ? `<p class="subtitle">${subtitle}</p>` : '';
    const descriptionHtml = this.renderDescription(description, descriptionLink);
    const tagsHtml = this.renderTags(tags, tagsContainerId);
    const statsHtml = this.renderStats(stats, statsMode, statsContextId);
    const tabsHtml = this.renderTabs(tabs, activeTab);

    // Build CSS classes
    const classes = ['page-header'];
    if (hasTabs) classes.push('page-header-with-tabs');
    if (hasStats) classes.push('page-header-with-stats');

    // Build content - use wrapper only when stats are present
    const contentHtml = hasStats
      ? `<div class="page-header-main">
          <div class="page-header-content">
            ${titleRowHtml}
            ${subtitleHtml}
            ${descriptionHtml}
            ${tagsHtml}
          </div>
          ${statsHtml}
        </div>`
      : `${titleRowHtml}
        ${subtitleHtml}
        ${descriptionHtml}
        ${tagsHtml}`;

    return `
      <div class="${classes.join(' ')}">
        ${breadcrumbHtml}
        ${contentHtml}
        ${tabsHtml}
      </div>
    `;
  },

  /**
   * Render breadcrumbs HTML
   * @param {Array} breadcrumbs - Array of breadcrumb items
   * @returns {string} Breadcrumbs HTML
   */
  renderBreadcrumbs(breadcrumbs) {
    if (!breadcrumbs.length) return '';

    const items = breadcrumbs.map((crumb, index) => {
      const isLast = index === breadcrumbs.length - 1;
      
      if (typeof crumb === 'string') {
        return isLast ? crumb : `${crumb} <span>/</span>`;
      }
      
      if (crumb.href) {
        return `<a href="${crumb.href}">${crumb.label}</a>${isLast ? '' : ' <span>/</span>'}`;
      }
      
      return `${crumb.label}${isLast ? '' : ' <span>/</span>'}`;
    });

    return `<div class="breadcrumb">${items.join(' ')}</div>`;
  },

  /**
   * Render icon HTML
   * @param {string} icon - Icon content (SVG or emoji)
   * @param {string} iconColor - Background color for icon
   * @param {string} imageUrl - URL for entity image
   * @param {string} imageAlt - Alt text for image
   * @returns {string} Icon HTML
   */
  renderIcon(icon, iconColor, imageUrl, imageAlt) {
    // Image takes precedence
    if (imageUrl) {
      return `<img src="${imageUrl}" alt="${imageAlt || ''}" class="page-header-entity-image" onerror="this.style.display='none';">`;
    }
    
    if (!icon && !iconColor) return '';
    
    if (iconColor) {
      return `<span style="display: inline-block; width: 20px; height: 20px; background: ${iconColor}; border-radius: 4px; margin-right: 12px; vertical-align: middle;"></span>`;
    }
    
    return `<span style="font-size: 1.5rem; margin-right: 12px;">${icon}</span>`;
  },

  /**
   * Render title row with optional badge and actions
   * @param {string} title - Page title
   * @param {string} iconHtml - Icon HTML
   * @param {string} badge - Badge HTML
   * @param {string} actions - Actions HTML (buttons, etc.)
   * @returns {string} Title row HTML
   */
  renderTitleRow(title, iconHtml, badge, actions) {
    if (badge || actions) {
      return `
        <div class="page-title-row">
          <div class="page-title-left">
            <h1>${iconHtml}${title}</h1>
            ${badge || ''}
          </div>
          ${actions ? `<div class="page-title-actions">${actions}</div>` : ''}
        </div>
      `;
    }
    return `<h1>${iconHtml}${title}</h1>`;
  },

  /**
   * Render description with optional link
   * @param {string} description - Description text
   * @param {string} descriptionLink - Link HTML
   * @returns {string} Description HTML
   */
  renderDescription(description, descriptionLink) {
    if (!description) return '';
    
    return `
      <p class="narrative-detail-description header-description">
        ${description}
        ${descriptionLink || ''}
      </p>
    `;
  },

  /**
   * Render tags section
   * @param {Array} tags - Array of tag objects
   * @param {string} containerId - Optional container ID for interactive tags
   * @returns {string} Tags HTML
   */
  renderTags(tags, containerId) {
    // If containerId is provided, render an empty container for JS to populate
    if (containerId) {
      return `<div id="${containerId}" class="page-header-tags"></div>`;
    }
    
    // Otherwise render static read-only tags
    if (!tags || tags.length === 0) return '';
    
    return `
      <div class="page-header-tags">
        ${TagChips.renderReadOnly(tags)}
      </div>
    `;
  },

  /**
   * Create a "not found" page header
   * @param {string} entityType - Type of entity (e.g., "Narrative", "Person")
   * @returns {string} Not found header HTML
   */
  notFound(entityType) {
    return `
      <div class="page-header">
        <div class="breadcrumb">
          <a href="#/dashboard">Dashboard</a> <span>/</span> ${entityType} not found
        </div>
        <h1>${entityType} not found</h1>
      </div>
    `;
  },

  /**
   * Render tab navigation
   * @param {Array} tabs - Array of tab items [{id, label, href}]
   * @param {string} activeTab - ID of the active tab
   * @returns {string} Tabs HTML
   */
  renderTabs(tabs, activeTab) {
    if (!tabs || tabs.length === 0) return '';

    const tabItems = tabs.map(tab => {
      const isActive = tab.id === activeTab;
      return `
        <a href="${tab.href}" 
           class="page-header-tab${isActive ? ' active' : ''}" 
           data-tab-id="${tab.id}">
          ${tab.label}
        </a>
      `;
    }).join('');

    return `
      <div class="page-header-tabs">
        ${tabItems}
      </div>
    `;
  },

  /**
   * Render stats grid using StatCards component (dropdowns only)
   * @param {Array} stats - Array of stat configs [{type, value, items}]
   * @param {string} mode - Ignored, always uses dropdowns
   * @param {string} contextId - Context ID for dropdown routes
   * @returns {string} Stats HTML
   */
  renderStats(stats, mode = 'dropdowns', contextId = null) {
    if (!stats || stats.length === 0) return '';
    
    return StatCards.renderDropdowns(stats, { contextId });
  }
};

export default PageHeader;
