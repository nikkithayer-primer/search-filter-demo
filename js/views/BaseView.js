/**
 * BaseView.js
 * Base class for all view components
 * Provides shared functionality and reduces code duplication across views
 */

import {
  getSentimentClass,
  formatSentiment,
  formatNumber,
  formatStatus,
  truncateText
} from '../utils/formatters.js';
import { PageHeader } from '../utils/PageHeader.js';
import { DragDropManager } from '../utils/DragDropManager.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import { dataStore } from '../data/DataStore.js';

export class BaseView {
  /**
   * @param {HTMLElement|string} container - Container element or ID
   * @param {Object} options - View options including missionId, timeRange, and context
   */
  constructor(container, options = {}) {
    this.container = typeof container === 'string'
      ? document.getElementById(container)
      : container;
    
    if (!this.container) {
      console.error(`${this.constructor.name}: Container not found`);
    }
    
    this.options = options || {};
    this.components = {};
    this.missionId = options.missionId || 'all';
    this.timeRange = options.timeRange || null;
    
    // Context for scoped routing (workspace/monitor/dashboard)
    // Contains: { type: string, id: string|null, documentIds: string[]|null, getName: () => string }
    this.context = options.context || null;
    
    // Centralized event listener tracking for automatic cleanup
    this._listeners = [];
  }

  /**
   * Get the document IDs for the current scope
   * Returns null for dashboard (global) scope or if no context
   * @returns {string[]|null} Array of document IDs or null for global scope
   */
  getDocumentScope() {
    return this.context?.documentIds || null;
  }

  /**
   * Get the context type (workspace/monitor/dashboard)
   * @returns {string|null} Context type or null if not set
   */
  getContextType() {
    return this.context?.type || null;
  }

  /**
   * Get the context ID (workspace ID or monitor ID)
   * @returns {string|null} Context ID or null if dashboard or not set
   */
  getContextId() {
    return this.context?.id || null;
  }

  /**
   * Get the display name of the current context
   * @returns {string} Context display name
   */
  getContextName() {
    if (this.context && this.context.getName) {
      return this.context.getName();
    }
    return this.context?.type || 'Dashboard';
  }

  /**
   * Build an ID-based route URL within the current context
   * @param {...string} entityIds - Entity IDs to include in the route
   * @returns {string} Full hash URL
   */
  buildContextRoute(...entityIds) {
    const ctx = this.context;
    const parts = [];
    
    // Add context ID if we have one (for scoped navigation)
    if (ctx && ctx.id) {
      parts.push(ctx.id);
    }
    
    // Add entity IDs
    parts.push(...entityIds.filter(Boolean));
    
    if (parts.length === 0) {
      return '#/cop/';
    }
    
    return `#/${parts.join('/')}/`;
  }

  /**
   * Build context-aware breadcrumbs using ID-based routing
   * @param {Array} items - Array of breadcrumb items. Each can be:
   *   - string: Label only (no link, typically the last item)
   *   - { label: string, id?: string, href?: string }: Object with optional id/href
   * @returns {Array} Array of breadcrumb objects for PageHeader
   */
  buildBreadcrumbs(items) {
    const ctx = this.context;
    const breadcrumbs = [];
    
    // Add context root as first breadcrumb
    if (ctx) {
      if (ctx.type === 'workspace') {
        breadcrumbs.push({ label: 'Workspaces', href: '#/workspaces' });
        breadcrumbs.push({ label: ctx.getName(), href: `#/${ctx.id}/` });
      } else if (ctx.type === 'monitor') {
        breadcrumbs.push({ label: 'Monitors', href: '#/monitors' });
        breadcrumbs.push({ label: ctx.getName(), href: `#/${ctx.id}/` });
      } else if (ctx.type === 'project') {
        breadcrumbs.push({ label: 'Projects', href: '#/projects' });
        breadcrumbs.push({ label: ctx.getName(), href: `#/${ctx.id}/` });
      } else {
        breadcrumbs.push({ label: 'Common Operating Picture', href: '#/cop/' });
      }
    } else {
      breadcrumbs.push({ label: 'Common Operating Picture', href: '#/cop/' });
    }
    
    // Add remaining items
    items.forEach(item => {
      if (typeof item === 'string') {
        breadcrumbs.push(item);
      } else if (item.href) {
        breadcrumbs.push({ label: item.label, href: item.href });
      } else if (item.id) {
        // ID-based routing
        breadcrumbs.push({ label: item.label, href: this.buildContextRoute(item.id) });
      } else if (item.route) {
        // Legacy support: route is now treated as an ID
        breadcrumbs.push({ label: item.label, href: this.buildContextRoute(item.route) });
      } else {
        breadcrumbs.push(item.label || item);
      }
    });
    
    return breadcrumbs;
  }

  /**
   * Add an event listener with automatic tracking for cleanup
   * @param {EventTarget} element - The element to attach the listener to
   * @param {string} event - The event type (e.g., 'click', 'input')
   * @param {Function} handler - The event handler function
   * @param {Object} options - Optional event listener options
   */
  addListener(element, event, handler, options) {
    if (!element) return;
    element.addEventListener(event, handler, options);
    this._listeners.push({ element, event, handler, options });
  }

  /**
   * Remove all tracked event listeners
   * Called automatically by destroy()
   */
  removeAllListeners() {
    this._listeners.forEach(({ element, event, handler, options }) => {
      try {
        element.removeEventListener(event, handler, options);
      } catch (e) {
        // Element may have been removed from DOM
      }
    });
    this._listeners = [];
  }

  /**
   * Render the view - must be implemented by subclass
   */
  async render() {
    throw new Error('render() must be implemented by subclass');
  }

  /**
   * Clean up components and release resources
   */
  destroy() {
    try {
      // Remove all tracked event listeners
      this.removeAllListeners();
      
      // Destroy drag-drop manager if present
      if (this.dragDropManager) {
        this.dragDropManager.destroy();
        this.dragDropManager = null;
      }
      
      Object.values(this.components).forEach(c => {
        try {
          if (c && c.destroy) c.destroy();
        } catch (e) {
          console.error(`${this.constructor.name}: Error destroying component:`, e);
        }
      });
      this.components = {};
    } catch (e) {
      console.error(`${this.constructor.name}: Error during view destruction:`, e);
    }
  }

  /**
   * Initialize drag-and-drop functionality for cards in a content grid
   * @param {string} containerSelector - CSS selector for the content grid (default: '.content-grid')
   */
  initDragDrop(containerSelector = '.content-grid') {
    // Use setTimeout to ensure DOM is ready after rendering
    setTimeout(() => {
      try {
        if (!this.container) return;
        
        const container = this.container.querySelector(containerSelector);
        if (container) {
          this.dragDropManager = new DragDropManager({
            containerSelector: containerSelector,
            onOrderChange: (order) => {
              // Optional callback when card order changes
              if (this.onCardOrderChange) {
                try {
                  this.onCardOrderChange(order);
                } catch (e) {
                  console.error(`${this.constructor.name}: Error in onCardOrderChange callback:`, e);
                }
              }
            }
          });
          this.dragDropManager.init(container);
        }
      } catch (e) {
        console.error(`${this.constructor.name}: Error initializing drag-drop:`, e);
      }
    }, 0);
  }

  /**
   * Get sentiment CSS class
   * @param {number|string} sentiment
   * @returns {string} CSS class suffix
   */
  getSentimentClass(sentiment) {
    return getSentimentClass(sentiment);
  }

  /**
   * Format sentiment for display
   * @param {number|string} sentiment
   * @returns {string} Human-readable sentiment label
   */
  formatSentiment(sentiment) {
    return formatSentiment(sentiment);
  }

  /**
   * Format number with abbreviations
   * @param {number} num
   * @returns {string} Formatted number
   */
  formatNumber(num) {
    return formatNumber(num);
  }

  /**
   * Format status for display
   * @param {string} status
   * @returns {string} Human-readable status label
   */
  formatStatus(status) {
    return formatStatus(status);
  }

  /**
   * Truncate text to max length
   * @param {string} text
   * @param {number} maxLength
   * @returns {string} Truncated text
   */
  truncateText(text, maxLength = 40) {
    return truncateText(text, maxLength);
  }

  /**
   * Show modal with narratives connecting two entities
   * Used by views that display network graphs
   * @param {Object} link - Link object with source, target, and narratives
   */
  showConnectingNarrativesModal(link) {
    if (!link) {
      console.error(`${this.constructor.name}: showConnectingNarrativesModal requires a link object`);
      return;
    }

    try {
      const sourceNode = typeof link.source === 'object' ? link.source : { id: link.source };
      const targetNode = typeof link.target === 'object' ? link.target : { id: link.target };
      
      const sourceLabel = this.escapeHtml(sourceNode.label || sourceNode.id || 'Unknown');
      const targetLabel = this.escapeHtml(targetNode.label || targetNode.id || 'Unknown');
      
      const narratives = Array.isArray(link.narratives) ? link.narratives : [];
      const narrativesList = narratives.map(n => {
        if (!n) return '';
        return `
          <li class="narrative-link-item" data-id="${this.escapeHtml(n.id || '')}">
            <div class="narrative-link-text">${this.escapeHtml(n.text || 'Untitled narrative')}</div>
            <div class="narrative-link-meta">
              <span class="badge badge-${this.getSentimentClass(n.sentiment)}">${this.formatSentiment(n.sentiment)}</span>
            </div>
          </li>
        `;
      }).join('');

      if (window.app && window.app.showModal) {
        window.app.showModal(`
          <div class="modal-header">
            <div class="modal-title-row">
              <span class="modal-icon">🔗</span>
              <h2 class="modal-title">Connecting Narratives</h2>
            </div>
            <button class="modal-close" onclick="window.app.closeModal()">×</button>
          </div>
          <div class="modal-body">
            <p class="connection-description">
              <strong>${sourceLabel}</strong> and <strong>${targetLabel}</strong> 
              appear together in ${narratives.length} narrative${narratives.length !== 1 ? 's' : ''}:
            </p>
            <ul class="connecting-narratives-list">
              ${narrativesList}
            </ul>
          </div>
        `);

        // Add click handlers for narrative items
        document.querySelectorAll('.narrative-link-item').forEach(item => {
          this.addListener(item, 'click', () => {
            const narrativeId = item.dataset.id;
            if (window.app && window.app.closeModal) {
              window.app.closeModal();
            }
            window.location.hash = `#/narrative/${narrativeId}`;
          });
        });
      } else {
        console.error(`${this.constructor.name}: window.app.showModal not available`);
      }
    } catch (e) {
      console.error(`${this.constructor.name}: Error showing connecting narratives modal:`, e);
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    return escapeHtml(text);
  }

  /**
   * Render a "not found" page using PageHeader utility
   * @param {string} entityType - Type of entity (e.g., "Narrative", "Person")
   */
  renderNotFound(entityType) {
    if (!this.container) {
      console.error(`${this.constructor.name}: Cannot render not found - container not available`);
      return;
    }
    try {
      this.container.innerHTML = PageHeader.notFound(entityType || 'Item');
    } catch (e) {
      console.error(`${this.constructor.name}: Error rendering not found page:`, e);
      this.container.innerHTML = `<div class="empty-state"><p>${entityType || 'Item'} not found</p></div>`;
    }
  }

  /**
   * Create a page header using PageHeader utility
   * @param {Object} config - Header configuration
   * @returns {string} Header HTML
   */
  createPageHeader(config) {
    return PageHeader.render(config);
  }

  // ============================================
  // Tab Navigation Helpers
  // ============================================

  /**
   * Get the current active tab from options
   * @returns {string} Current tab ID (defaults to 'dashboard')
   */
  getCurrentTab() {
    return this.options.tab || 'dashboard';
  }

  /**
   * Set the current tab by updating the URL
   * @param {string} tabName - Tab ID to switch to
   */
  setTab(tabName) {
    const hash = window.location.hash;
    const baseHash = hash.split('?')[0];
    
    // Build new URL with tab parameter
    if (tabName === 'dashboard') {
      // Default tab - no need to include in URL
      window.location.hash = baseHash;
    } else {
      window.location.hash = `${baseHash}?tab=${encodeURIComponent(tabName)}`;
    }
  }

  /**
   * Generate tabs configuration for PageHeader
   * @param {string} baseHref - Base href for the tabs (e.g., '#/narrative/123')
   * @param {boolean} hasDocuments - Whether this view has documents to show
   * @returns {Array|null} Tabs configuration or null if no tabs needed
   */
  getTabsConfig(baseHref, hasDocuments = true) {
    if (!hasDocuments) return null;
    
    const settings = dataStore.getSettings();
    const dashboardTab = { id: 'dashboard', label: 'Dashboard', href: `${baseHref}?tab=dashboard` };
    const documentsTab = { id: 'documents', label: 'Documents', href: `${baseHref}?tab=documents` };
    
    // Order tabs with default tab first (leftmost)
    if (settings.defaultViewTab === 'documents') {
      return [documentsTab, dashboardTab];
    }
    return [dashboardTab, documentsTab];
  }

  /**
   * Check if we should show the documents tab content
   * @returns {boolean}
   */
  isDocumentsTab() {
    return this.getCurrentTab() === 'documents';
  }

  /**
   * Check if we should show the dashboard tab content
   * @returns {boolean}
   */
  isDashboardTab() {
    return this.getCurrentTab() === 'dashboard';
  }
}

export default BaseView;
