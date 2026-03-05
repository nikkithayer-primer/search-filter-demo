/**
 * CardComponents.js
 * Higher-level card components that combine CardBuilder with visualization components
 * These handle both HTML generation and component initialization
 */

import { CardBuilder } from '../utils/CardBuilder.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import { getEntityCardModal } from './EntityCardModal.js';
import { NetworkGraph } from './NetworkGraph.js';
import { NarrativeList } from './NarrativeList.js';
import { ThemeList } from './ThemeList.js';
import { TopicList } from './TopicList.js';
import { DocumentTable } from './DocumentTable.js';
import { ColumnFilter } from './ColumnFilter.js';
import { MapView } from './MapView.js';
import { TimelineVolumeComposite } from './TimelineVolumeComposite.js';
import { renderVerticalTimeline } from '../utils/verticalTimeline.js';

// Standard column configuration for document tables
const DOCUMENT_AVAILABLE_COLUMNS = {
  classification: 'Classification',
  documentType: 'Doc Type',
  publisherName: 'Publisher',
  publisherType: 'Publisher Type',
  title: 'Title',
  excerpt: 'Excerpt',
  publishedDate: 'Published',
  narratives: 'Narratives',
  themes: 'Themes',
  events: 'Events',
  locations: 'Locations',
  persons: 'People',
  organizations: 'Organizations',
  topics: 'Topics'
};

const DOCUMENT_DEFAULT_COLUMNS = ['classification', 'documentType', 'publisherName', 'title', 'publishedDate'];

/**
 * Base class for card components
 */
class BaseCardComponent {
  constructor(view, containerId) {
    this.view = view;
    this.containerId = containerId;
    this.component = null;
  }

  /**
   * Get the card HTML - must be implemented by subclass
   */
  getCardHtml() {
    throw new Error('getCardHtml must be implemented');
  }

  /**
   * Initialize the component - must be implemented by subclass
   */
  initialize() {
    throw new Error('initialize must be implemented');
  }

  /**
   * Build an ID-based route for an entity
   * Uses the view's context if available
   * @param {string} entityId - Entity ID (type is inferred from prefix)
   * @returns {string} Hash route
   */
  buildRoute(entityId) {
    if (this.view && this.view.buildContextRoute) {
      return this.view.buildContextRoute(entityId);
    }
    // Fallback to global route if view doesn't have context method
    return `#/${entityId}/`;
  }

  /**
   * Navigate to an entity using ID-based routing
   * @param {string} entityId - Entity ID
   */
  navigateTo(entityId) {
    window.location.hash = this.buildRoute(entityId);
  }

  /**
   * Destroy the component
   */
  destroy() {
    if (this.component && this.component.destroy) {
      this.component.destroy();
    }
    this.component = null;
  }
}

/**
 * Network Graph Card Component
 */
export class NetworkGraphCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.personIds = options.personIds || [];
    this.orgIds = options.orgIds || [];
    this.excludeId = options.excludeId || null;
    this.excludeType = options.excludeType || null;
    this.title = options.title || 'People & Organizations';
    this.height = options.height || 400;
    this.halfWidth = options.halfWidth !== false;
    this.viewMode = options.defaultView || 'graph'; // 'graph' or 'list'
  }

  hasData() {
    return this.personIds.length > 0 || this.orgIds.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    
    // Count entities
    const persons = this.personIds.map(id => DataService.getPerson(id)).filter(Boolean);
    const orgs = this.orgIds.map(id => DataService.getOrganization(id)).filter(Boolean);
    const totalCount = persons.length + orgs.length;
    
    // Build view toggle buttons
    const viewToggleHtml = `
      <div class="view-toggle network-view-toggle" data-container="${this.containerId}">
        <button class="view-toggle-btn ${this.viewMode === 'graph' ? 'active' : ''}" data-view="graph" title="Network Graph">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="8" cy="4" r="2"/>
            <circle cx="4" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <path d="M8 6v2M6 10l-1 1M10 10l1 1"/>
          </svg>
        </button>
        <button class="view-toggle-btn ${this.viewMode === 'list' ? 'active' : ''}" data-view="list" title="List View">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2 4h12M2 8h12M2 12h12"/>
          </svg>
        </button>
      </div>
    `;
    
    return CardBuilder.create(this.title, this.containerId, {
      halfWidth: this.halfWidth,
      count: totalCount,
      actions: viewToggleHtml
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    // Store entities data for both views
    this.persons = this.personIds.map(id => DataService.getPerson(id)).filter(Boolean);
    this.orgs = this.orgIds.map(id => DataService.getOrganization(id)).filter(Boolean);
    this.networkData = DataService.buildNetworkGraph(this.personIds, this.orgIds);

    // Render initial view
    this.renderCurrentView();
    
    // Set up view toggle listeners
    this.setupViewToggleListeners();

    return this.component;
  }

  renderCurrentView() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Destroy existing component
    if (this.component && this.component.destroy) {
      this.component.destroy();
      this.component = null;
    }

    if (this.viewMode === 'graph') {
      this.renderGraphView(container);
    } else {
      this.renderListView(container);
    }
  }

  renderGraphView(container) {
    // Clear container
    container.innerHTML = '';
    
    this.component = new NetworkGraph(this.containerId, {
      height: this.height,
      onNodeClick: (node) => {
        if (this.excludeId && node.id === this.excludeId) return;
        // Navigate to entity detail page on click (ID-based routing)
        this.navigateTo(node.id);
      },
      onNodeHover: (node, element) => {
        if (this.excludeId && node.id === this.excludeId) return;
        getEntityCardModal().show(node.id, node.type, element);
      },
      onNodeHoverEnd: () => {
        getEntityCardModal().scheduleHide();
      },
      onLinkClick: (link) => {
        if (this.view.showConnectingNarrativesModal) {
          this.view.showConnectingNarrativesModal(link);
        }
      }
    });
    this.component.update(this.networkData);
    
    if (this.options.enableAutoResize !== false) {
      this.component.enableAutoResize();
    }
  }

  renderListView(container) {
    // Create list HTML
    const allEntities = [
      ...this.persons.map(p => ({ ...p, _type: 'person' })),
      ...this.orgs.map(o => ({ ...o, _type: 'organization' }))
    ].sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    const listHtml = `
      <ul class="entity-list network-entity-list">
        ${allEntities.map(entity => this.renderEntityItem(entity)).join('')}
      </ul>
    `;

    container.innerHTML = listHtml;

    // Add hover listeners for entity card popover
    container.querySelectorAll('.entity-list-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const id = item.dataset.id;
        const type = item.dataset.type;
        if (this.excludeId && id === this.excludeId) return;
        getEntityCardModal().show(id, type, item);
      });
      
      item.addEventListener('mouseleave', () => {
        getEntityCardModal().scheduleHide();
      });
      
      // Click navigates to entity detail page (ID-based routing)
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        if (this.excludeId && id === this.excludeId) return;
        getEntityCardModal().hide();
        this.navigateTo(id);
      });
    });
  }

  renderEntityItem(entity) {
    const typeLabel = entity._type === 'person' ? 'Person' : 'Organization';
    const subtitle = entity.title || entity.type || typeLabel;
    const isExcluded = this.excludeId && entity.id === this.excludeId;
    
    // Use image if available, otherwise fall back to icon
    let avatarContent;
    if (entity.imageUrl) {
      avatarContent = `<img src="${entity.imageUrl}" alt="${entity.name || ''}" class="entity-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <span class="entity-icon-fallback" style="display:none;">${this.getEntityIcon(entity._type)}</span>`;
    } else {
      avatarContent = this.getEntityIcon(entity._type);
    }

    return `
      <li class="entity-list-item ${isExcluded ? 'excluded' : ''}" data-id="${entity.id}" data-type="${entity._type}">
        <div class="entity-avatar ${entity._type} ${entity.imageUrl ? 'has-image' : ''}">
          ${avatarContent}
        </div>
        <div class="entity-info">
          <div class="entity-name">${entity.name || 'Unknown'}</div>
          <div class="entity-type">${subtitle}</div>
        </div>
      </li>
    `;
  }

  /**
   * Get the SVG icon for an entity type
   */
  getEntityIcon(entityType) {
    if (entityType === 'person') {
      return `<svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.25">
          <circle cx="8" cy="4" r="2.5"/>
          <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
        </svg>`;
    }
    return `<svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 16H9.5C9.59107 16 9.67646 15.9757 9.75 15.9331C9.82354 15.9757 9.90893 16 10 16H15.5C15.7761 16 16 15.7761 16 15.5V4.5C16 4.22386 15.7761 4 15.5 4H10V0.5C10 0.223858 9.77614 0 9.5 0H0.5C0.223858 0 0 0.223858 0 0.5V15.5C0 15.7761 0.223858 16 0.5 16ZM1 15V1H9V15H7V13C7 12.7239 6.77614 12.5 6.5 12.5H3.5C3.22386 12.5 3 12.7239 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z"/>
      </svg>`;
  }

  setupViewToggleListeners() {
    const toggleContainer = document.querySelector(`.network-view-toggle[data-container="${this.containerId}"]`);
    if (!toggleContainer) return;

    toggleContainer.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const newView = btn.dataset.view;
        if (newView !== this.viewMode) {
          this.viewMode = newView;
          
          // Update button states
          toggleContainer.querySelectorAll('.view-toggle-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.view === newView);
          });
          
          // Re-render the view
          this.renderCurrentView();
        }
      });
    });
  }

  destroy() {
    if (this.component && this.component.destroy) {
      this.component.destroy();
    }
    this.component = null;
    this.persons = null;
    this.orgs = null;
    this.networkData = null;
  }
}

/**
 * Narrative List Card Component
 * Supports description toggle for showing/hiding narrative descriptions
 */
export class NarrativeListCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.narratives = options.narratives || [];
    this.title = options.title || 'Related Narratives';
    this.maxItems = options.maxItems || 8;
    this.showCount = options.showCount !== false;
    this.halfWidth = options.halfWidth || false;
    this.fullWidth = options.fullWidth || false;
    // Description toggle options
    this.showDescriptionToggle = options.showDescriptionToggle || false;
    this.defaultShowDescription = options.defaultShowDescription || false;
  }

  hasData() {
    return this.narratives.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    
    // Build description toggle button if enabled
    const actionsHtml = this.showDescriptionToggle 
      ? CardBuilder.descriptionToggle(`${this.containerId}-desc-toggle`)
      : '';
    
    return CardBuilder.create(this.title, this.containerId, {
      count: this.showCount ? this.narratives.length : undefined,
      noPadding: true,
      halfWidth: this.halfWidth,
      fullWidth: this.fullWidth,
      bodyClass: 'card-body-scrollable',
      actions: actionsHtml
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new NarrativeList(this.containerId, {
      maxItems: this.maxItems,
      defaultShowDescription: this.defaultShowDescription,
      onItemClick: (n) => {
        this.navigateTo(n.id);
      }
    });
    this.component.update({ narratives: this.narratives });

    // Set up description toggle if enabled
    if (this.showDescriptionToggle) {
      const toggle = document.getElementById(`${this.containerId}-desc-toggle`);
      if (toggle) {
        // Set initial state if descriptions shown by default
        if (this.defaultShowDescription) {
          toggle.classList.add('active');
        }
        toggle.addEventListener('click', () => {
          const isShowing = this.component.toggleDescription();
          toggle.classList.toggle('active', isShowing);
        });
      }
    }

    return this.component;
  }
}

// Document type labels for display
const DOCUMENT_TYPE_LABELS = {
  news_article: 'News Article',
  social_post: 'Social Post',
  tiktok: 'TikTok',
  internal: 'Internal'
};

/**
 * Document Table Card Component
 */
export class DocumentTableCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.documents = options.documents || [];
    this.title = options.title ?? 'documents';
    this.maxItems = options.maxItems || 10;
    this.showCount = options.showCount !== false;
    this.halfWidth = options.halfWidth || false;
    this.fullWidth = options.fullWidth || false;
    this.enableViewerMode = options.enableViewerMode || false;
    this.enableSelection = options.enableSelection !== false; // Enable by default
    this.showColumnFilter = options.showColumnFilter !== false; // Show filter by default
    this.showTypeFilter = options.showTypeFilter !== false; // Show type filter by default
    this.showExpandData = options.showExpandData !== false; // Show expand data by default
    this.extraActions = options.extraActions || '';
    this.columns = options.columns || [...DOCUMENT_DEFAULT_COLUMNS];
    this.availableColumns = options.availableColumns || DOCUMENT_AVAILABLE_COLUMNS;
    this.columnFilterId = `${containerId}-column-filter`;
    this.typeFilterId = `${containerId}-type-filter`;
    this.columnFilter = null;
    this.documentTypeFilter = 'all';
  }

  hasData() {
    return this.documents.length > 0;
  }

  /**
   * Get document type options from available documents
   */
  getDocumentTypeOptions() {
    const types = new Set(this.documents.map(d => d.documentType).filter(Boolean));
    const options = { all: 'All Types' };
    for (const type of types) {
      options[type] = DOCUMENT_TYPE_LABELS[type] || type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
    return options;
  }

  /**
   * Get filtered documents based on current type filter
   */
  getFilteredDocuments() {
    if (this.documentTypeFilter === 'all') {
      return this.documents;
    }
    return this.documents.filter(doc => {
      const docType = doc.documentType || 'news_article';
      return docType === this.documentTypeFilter;
    });
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    
    // Build type filter dropdown HTML
    const typeOptions = this.getDocumentTypeOptions();
    const typeOptionsHtml = Object.entries(typeOptions).map(([key, label]) => {
      const selected = this.documentTypeFilter === key ? 'selected' : '';
      return `<option value="${key}" ${selected}>${label}</option>`;
    }).join('');
    
    // Build actions HTML with optional expand data button, type filter, and column filter
    let actionsHtml = '';
    
    if (this.showExpandData) {
      actionsHtml += `<button class="btn btn-secondary btn-small" id="${this.containerId}-expand-data-btn">Expand data</button>`;
    }
    
    // Only show type filter if there are multiple types
    if (this.showTypeFilter && Object.keys(typeOptions).length > 2) {
      actionsHtml += `
        <div class="filter-control">
          <label class="filter-label">Type</label>
          <select id="${this.typeFilterId}" class="filter-select">
            ${typeOptionsHtml}
          </select>
        </div>
      `;
    }
    
    if (this.showColumnFilter) {
      actionsHtml += `<div class="filter-control" id="${this.columnFilterId}"></div>`;
    }
    
    const filteredDocs = this.getFilteredDocuments();
    const docCount = filteredDocs.length;
    const titleText = this.showCount ? `${docCount} ${this.title}` : this.title;
    
    return CardBuilder.create(titleText, this.containerId, {
      noPadding: true,
      halfWidth: this.halfWidth,
      fullWidth: this.fullWidth,
      actions: actionsHtml,
      prefixHtml: this.extraActions || '',
      noFullscreen: true
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    // Add class to identify document table cards (to hide resize handle)
    const cardElement = document.getElementById(this.containerId)?.closest('.card');
    if (cardElement) {
      cardElement.classList.add('card-document-table');
    }

    // Check if classification should be shown
    const settings = dataStore.getSettings();
    const showClassification = settings.showClassification;
    
    // Filter available columns based on settings
    let availableColumns = { ...this.availableColumns };
    if (!showClassification) {
      delete availableColumns.classification;
    }
    
    // Filter columns based on settings
    let columns = showClassification 
      ? this.columns 
      : this.columns.filter(col => col !== 'classification');

    // Initialize column filter if enabled
    if (this.showColumnFilter) {
      const filterContainer = document.getElementById(this.columnFilterId);
      if (filterContainer) {
        this.columnFilter = new ColumnFilter(this.columnFilterId, {
          availableColumns: availableColumns,
          defaultColumns: columns,
          requiredColumns: ['title'],
          onChange: (cols) => {
            this.columns = cols;
            if (this.component) {
              this.component.setColumns(cols);
            }
          }
        });
        this.columnFilter.setSelectedColumns(columns);
        this.columnFilter.render();
      }
    }

    // Initialize document table with filtered documents
    // Pass context for context-aware entity navigation
    const filteredDocs = this.getFilteredDocuments();
    this.component = new DocumentTable(this.containerId, {
      columns: columns,
      maxItems: this.maxItems,
      enableViewerMode: this.enableViewerMode,
      enableSelection: this.enableSelection,
      context: this.view?.context || null
    });
    this.component.update({ documents: filteredDocs });

    // Attach type filter listener
    this.attachTypeFilterListener();
    
    if (this.showExpandData) {
      this.attachExpandDataListener();
    }

    return this.component;
  }

  /**
   * Attach event listener for expand data button (placeholder)
   */
  attachExpandDataListener() {
    const expandBtn = document.getElementById(`${this.containerId}-expand-data-btn`);
    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        // Expand data functionality not yet implemented
      });
    }
  }

  /**
   * Attach event listener for type filter dropdown
   */
  attachTypeFilterListener() {
    const typeSelect = document.getElementById(this.typeFilterId);
    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        this.documentTypeFilter = e.target.value;
        const filteredDocs = this.getFilteredDocuments();
        
        // Update document count in card title
        const card = document.getElementById(this.containerId)?.closest('.card');
        if (card) {
          const titleEl = card.querySelector('.card-title');
          if (titleEl) {
            titleEl.textContent = `${filteredDocs.length} ${this.title}`;
          }
        }
        
        // Update table with filtered documents
        if (this.component) {
          this.component.update({ documents: filteredDocs });
        }
      });
    }
  }

  destroy() {
    if (this.columnFilter) {
      this.columnFilter.destroy();
      this.columnFilter = null;
    }
    super.destroy();
  }
}

/**
 * Map Card Component
 * Supports map view and list view (vertical timeline) with toggle
 */
export class MapCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.locations = options.locations || [];
    this.events = options.events || [];
    this.title = options.title || 'Locations';
    this.height = options.height || 350;
    this.halfWidth = options.halfWidth || false;
    this.fullWidth = options.fullWidth || false;
    this.defaultZoom = options.defaultZoom || null;
    this.centerOn = options.centerOn || null;
    this.showLocations = options.showLocations || false; // Show locations without events (checkbox)
    // View toggle options
    this.showViewToggle = options.showViewToggle || false;
    this.viewMode = options.defaultView || 'map'; // 'map' or 'list'
    this.maxListItems = options.maxListItems || 25;
  }

  hasData() {
    return this.locations.length > 0 || this.events.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    
    // Build view toggle buttons if enabled
    let actionsHtml = '';
    if (this.showViewToggle && this.events.length > 0) {
      actionsHtml = `
        <div class="view-toggle map-view-toggle" data-container="${this.containerId}">
          <button class="view-toggle-btn ${this.viewMode === 'map' ? 'active' : ''}" data-view="map" title="Map View">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
              <circle cx="8" cy="6" r="2"/>
            </svg>
          </button>
          <button class="view-toggle-btn ${this.viewMode === 'list' ? 'active' : ''}" data-view="list" title="List View">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M2 4h12M2 8h12M2 12h12"/>
            </svg>
          </button>
        </div>
      `;
    }
    
    return CardBuilder.create(this.title, this.containerId, {
      noPadding: true,
      halfWidth: this.halfWidth,
      fullWidth: this.fullWidth,
      actions: actionsHtml
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    // Render current view
    this.renderCurrentView();
    
    // Set up view toggle listeners if enabled
    if (this.showViewToggle && this.events.length > 0) {
      this.setupViewToggleListeners();
    }

    return this.component;
  }

  renderCurrentView() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Destroy existing map component
    if (this.component && this.component.destroy) {
      this.component.destroy();
      this.component = null;
    }

    if (this.viewMode === 'map') {
      this.renderMapView(container);
    } else {
      this.renderListView(container);
    }
  }

  renderMapView(container) {
    // Remove scrollable class for map view
    container.classList.remove('card-body-scrollable');
    container.innerHTML = '';

    const mapOptions = { 
      height: this.height,
      showLocations: this.showLocations,
      onEventClick: (e) => {
        this.navigateTo(e.id);
      }
    };
    if (this.defaultZoom) mapOptions.defaultZoom = this.defaultZoom;

    this.component = new MapView(this.containerId, mapOptions);
    this.component.update({ 
      locations: this.locations,
      events: this.events
    });

    if (this.centerOn) {
      setTimeout(() => {
        this.component.centerOn(this.centerOn.lat, this.centerOn.lng, this.centerOn.zoom || 12);
      }, 200);
    }
  }

  renderListView(container) {
    // Add scrollable class for list view
    container.classList.add('card-body-scrollable');

    if (this.events.length === 0) {
      container.innerHTML = `
        <div class="vertical-timeline-empty">
          <div class="vertical-timeline-empty-icon">📅</div>
          <p class="vertical-timeline-empty-text">No events to display</p>
        </div>
      `;
      return;
    }

    // Sort events by date (newest first) and limit
    const sortedEvents = [...this.events]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, this.maxListItems);

    // Render vertical timeline
    container.innerHTML = renderVerticalTimeline(sortedEvents, { 
      sortNewestFirst: true,
      emptyText: 'No events to display'
    });

    // Attach click listeners for timeline items (ID-based routing)
    container.querySelectorAll('.vertical-timeline-item').forEach(item => {
      item.addEventListener('click', () => {
        const eventId = item.dataset.eventId;
        this.navigateTo(eventId);
      });
    });
  }

  setupViewToggleListeners() {
    const toggleContainer = document.querySelector(`.map-view-toggle[data-container="${this.containerId}"]`);
    if (!toggleContainer) return;

    toggleContainer.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newMode = btn.dataset.view;
        if (newMode !== this.viewMode) {
          this.viewMode = newMode;
          
          // Update button states
          toggleContainer.querySelectorAll('.view-toggle-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.view === newMode);
          });
          
          // Re-render the view
          this.renderCurrentView();
        }
      });
    });
  }

  destroy() {
    if (this.component && this.component.destroy) {
      this.component.destroy();
    }
    this.component = null;
  }
}

/**
 * Theme List Card Component
 */
export class ThemeListCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.themes = options.themes || [];
    this.title = options.title || 'Themes';
    this.maxItems = options.maxItems || 10;
    this.showCount = options.showCount !== false;
    this.showDescriptionToggle = options.showDescriptionToggle || false;
    this.defaultShowDescription = options.defaultShowDescription || false;
  }

  hasData() {
    return this.themes.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    
    const actionsHtml = this.showDescriptionToggle 
      ? CardBuilder.descriptionToggle(`${this.containerId}-desc-toggle`)
      : '';
    
    return CardBuilder.create(this.title, this.containerId, {
      count: this.showCount ? this.themes.length : undefined,
      noPadding: true,
      fullWidth: this.options.fullWidth || false,
      halfWidth: this.options.halfWidth || false,
      actions: actionsHtml
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new ThemeList(this.containerId, {
      maxItems: this.maxItems,
      defaultShowDescription: this.defaultShowDescription,
      onItemClick: (t) => {
        this.navigateTo(t.id);
      }
    });
    this.component.update({ themes: this.themes });

    // Set up description toggle if enabled
    if (this.showDescriptionToggle) {
      const toggle = document.getElementById(`${this.containerId}-desc-toggle`);
      if (toggle) {
        toggle.addEventListener('click', () => {
          const isShowing = this.component.toggleDescription();
          toggle.classList.toggle('active', isShowing);
        });
      }
    }

    return this.component;
  }
}

/**
 * Topic List Card Component
 */
/**
 * Topic List Card Component
 * Supports bullet points toggle for showing/hiding topic bullet points
 */
export class TopicListCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.topics = options.topics || [];
    this.title = options.title || 'Topics';
    this.maxItems = options.maxItems || 5;
    this.showCount = options.showCount !== false;
    this.showSparkline = options.showSparkline !== false;
    this.showVolume = options.showVolume !== false;
    this.showDuration = options.showDuration !== false;
    // Bullet points toggle options
    this.showBulletsToggle = options.showBulletsToggle || false;
    this.defaultShowBulletPoints = options.defaultShowBulletPoints || false;
  }

  hasData() {
    return this.topics.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    
    // Build bullet points toggle button if enabled
    let actionsHtml = '';
    if (this.showBulletsToggle) {
      actionsHtml = `
        <button class="btn-icon card-action-btn topic-bullets-toggle ${this.defaultShowBulletPoints ? 'active' : ''}" 
                title="Toggle bullet points" 
                id="${this.containerId}-bullets-toggle">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 4h10M3 8h10M3 12h6"/>
          </svg>
        </button>
      `;
    }
    
    return CardBuilder.create(this.title, this.containerId, {
      count: this.showCount ? this.topics.length : undefined,
      noPadding: true,
      fullWidth: this.options.fullWidth || false,
      halfWidth: this.options.halfWidth || false,
      bodyClass: 'card-body-scrollable',
      actions: actionsHtml
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new TopicList(this.containerId, {
      maxItems: this.maxItems,
      showSparkline: this.showSparkline,
      showVolume: this.showVolume,
      showDuration: this.showDuration,
      showBulletPoints: this.defaultShowBulletPoints,
      onItemClick: (t) => {
        this.navigateTo(t.id);
      }
    });
    this.component.update({ topics: this.topics });

    // Set up bullet points toggle if enabled
    if (this.showBulletsToggle) {
      const toggle = document.getElementById(`${this.containerId}-bullets-toggle`);
      if (toggle) {
        toggle.addEventListener('click', () => {
          const isShowing = this.component.toggleBulletPoints();
          toggle.classList.toggle('active', isShowing);
        });
      }
    }

    return this.component;
  }
}

/**
 * Timeline Volume Composite Card Component
 * Combines volume chart with timeline events
 */
export class TimelineVolumeCompositeCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.volumeData = options.volumeData || null;
    this.publisherData = options.publisherData || null;
    this.events = options.events || [];
    this.narrativeDurations = options.narrativeDurations || null;
    this.title = options.title || 'Volume & Events';
    this.height = options.height || 320;
    this.volumeHeight = options.volumeHeight || 140;
    this.timelineHeight = options.timelineHeight || 140;
    this.showViewToggle = options.showViewToggle || false;
    this.displayMode = 'volume'; // 'volume' or 'duration'
  }

  hasData() {
    const hasVolumeData = this.volumeData && this.volumeData.dates && this.volumeData.dates.length > 0;
    const hasPublisherData = this.publisherData && this.publisherData.dates && this.publisherData.dates.length > 0;
    const hasDurationData = this.narrativeDurations && this.narrativeDurations.length > 0;
    return hasVolumeData || hasPublisherData || this.events.length > 0 || hasDurationData;
  }

  hasDurationData() {
    return this.narrativeDurations && this.narrativeDurations.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    
    // Build toggle HTML if duration data exists
    const toggleHtml = this.hasDurationData() ? `
      <div class="view-toggle volume-duration-toggle" data-container="${this.containerId}">
        <button class="view-toggle-btn ${this.displayMode === 'volume' ? 'active' : ''}" data-view="volume" title="Volume View">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2 12V4M6 12V6M10 12V8M14 12V5"/>
          </svg>
        </button>
        <button class="view-toggle-btn ${this.displayMode === 'duration' ? 'active' : ''}" data-view="duration" title="Duration View">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="3" width="8" height="1" rx="0.5"/>
            <rect x="4" y="7" width="10" height="1" rx="0.5"/>
            <rect x="3" y="11" width="6" height="1" rx="0.5"/>
          </svg>
        </button>
      </div>
    ` : '';
    
    return CardBuilder.create(this.title, this.containerId, {
      fullWidth: this.options.fullWidth || false,
      halfWidth: this.options.halfWidth || false,
      actions: toggleHtml
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    this.component = new TimelineVolumeComposite(this.containerId, {
      height: this.height,
      volumeHeight: this.volumeHeight,
      timelineHeight: this.timelineHeight,
      showViewToggle: this.showViewToggle,
      showDisplayToggle: false, // Toggle is in card header
      defaultDisplayMode: this.displayMode,
      onEventClick: (e) => {
        this.navigateTo(e.id);
      },
      onNarrativeClick: (n) => {
        this.navigateTo(n.id);
      }
    });
    this.component.update({
      volumeData: this.volumeData,
      publisherData: this.publisherData,
      events: this.events,
      narrativeDurations: this.narrativeDurations
    });
    
    if (this.options.enableAutoResize !== false) {
      this.component.enableAutoResize();
    }

    // Set up toggle handler if duration data exists
    if (this.hasDurationData()) {
      this.setupDisplayToggle();
    }

    return this.component;
  }

  setupDisplayToggle() {
    const toggleContainer = document.querySelector(`.volume-duration-toggle[data-container="${this.containerId}"]`);
    if (!toggleContainer) return;

    toggleContainer.querySelectorAll('.view-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const newMode = btn.dataset.view;
        if (newMode !== this.displayMode) {
          this.displayMode = newMode;
          
          // Update button states
          toggleContainer.querySelectorAll('.view-toggle-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.view === newMode);
          });
          
          // Update the component
          if (this.component) {
            this.component.displayMode = newMode;
            this.component.render();
          }
        }
      });
    });
  }
}

/**
 * Bullet Points Card Component
 * Displays a list of key points or bullet items
 */
export class BulletPointsCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.bulletPoints = options.bulletPoints || [];
    this.title = options.title || 'Key Points';
    this.sourceType = options.sourceType || null;
    this.sourceId = options.sourceId || null;
  }

  hasData() {
    return this.bulletPoints && this.bulletPoints.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    return CardBuilder.create(this.title, this.containerId, {
      fullWidth: this.options.fullWidth || false,
      halfWidth: this.options.halfWidth || false
    });
  }

  initialize() {
    if (!this.hasData()) return null;

    const container = document.getElementById(this.containerId);
    if (!container) return null;

    // Note: Using imported escapeHtml from htmlUtils.js

    // Build source link HTML if sourceType and sourceId are provided
    const sourceLinkHtml = (this.sourceType && this.sourceId) 
      ? `<a href="#" class="btn btn-small btn-secondary source-link bullet-source-link" data-source-type="${this.sourceType}" data-source-id="${this.sourceId}">View source</a>`
      : '';

    container.innerHTML = `
      <ul class="bullet-points-list">
        ${this.bulletPoints.map(bp => `<li class="bullet-point-item">${escapeHtml(bp)} ${sourceLinkHtml}</li>`).join('')}
      </ul>
    `;

    return null; // No component to return, just rendered HTML
  }
}

/**
 * Card Manager - helps manage multiple card components
 */
export class CardManager {
  constructor(view, options = {}) {
    this.view = view;
    this.cards = [];
  }

  /**
   * Add a card component
   * @param {BaseCardComponent} card - Card component instance
   */
  add(card) {
    this.cards.push(card);
    return this;
  }

  /**
   * Get combined HTML for all cards that have data
   * @returns {string} Combined card HTML
   */
  getHtml() {
    return this.cards
      .filter(card => card.hasData())
      .map(card => card.getCardHtml())
      .join('');
  }

  /**
   * Initialize all card components
   * @returns {Object} Map of containerId to component
   */
  initializeAll() {
    const components = {};
    for (const card of this.cards) {
      if (card.hasData()) {
        const component = card.initialize();
        if (component) {
          components[card.containerId] = component;
        }
      }
    }
    
    return components;
  }

  /**
   * Destroy all card components
   */
  destroyAll() {
    for (const card of this.cards) {
      card.destroy();
    }
    this.cards = [];
  }
}

/**
 * Quotes Table Card Component
 * Displays document quotes in a table format
 */
export class QuotesTableCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.quotes = options.quotes || [];
    this.title = options.title || 'Quotes';
    this.halfWidth = options.halfWidth !== false;
    this.fullWidth = options.fullWidth || false;
  }

  hasData() {
    return this.quotes.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    
    return CardBuilder.create(this.title, this.containerId, {
      count: this.quotes.length,
      noPadding: true,
      halfWidth: this.halfWidth,
      fullWidth: this.fullWidth,
      bodyClass: 'card-body-scrollable'
    });
  }

  /**
   * Get speaker name from ID
   */
  getSpeakerName(speakerId, speakerType) {
    if (!speakerId) return 'Unknown';
    if (speakerType === 'person') {
      const person = DataService.getPerson(speakerId);
      return person ? person.name : speakerId;
    } else if (speakerType === 'organization') {
      const org = DataService.getOrganization(speakerId);
      return org ? org.name : speakerId;
    }
    return speakerId;
  }

  /**
   * Render the quotes table HTML
   */
  renderTable() {
    if (!this.quotes.length) return '<p class="empty-state">No quotes available</p>';

    const rows = this.quotes.map(quote => {
      const speakerName = this.getSpeakerName(quote.speakerId, quote.speakerType);
      const speakerTypeClass = quote.speakerType === 'person' ? 'speaker-person' : 'speaker-org';
      const truncatedText = quote.text.length > 200 ? quote.text.substring(0, 200) + '...' : quote.text;
      
      return `
        <tr class="quotes-table-row" data-speaker-id="${quote.speakerId || ''}" data-speaker-type="${quote.speakerType || ''}">
          <td class="quotes-col-speaker">
            <span class="speaker-name ${speakerTypeClass}">${escapeHtml(speakerName)}</span>
          </td>
          <td class="quotes-col-text">
            <span class="quote-text">"${escapeHtml(truncatedText)}"</span>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="table-container quotes-table-container">
        <table class="table quotes-table">
          <thead>
            <tr>
              <th class="quotes-col-speaker">Speaker</th>
              <th class="quotes-col-text">Quote</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  initialize() {
    if (!this.hasData()) return null;

    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = this.renderTable();
    }
    return null;
  }
}

/**
 * Activities Table Card Component
 * Displays document activities in a table format
 */
export class ActivitiesTableCard extends BaseCardComponent {
  constructor(view, containerId, options = {}) {
    super(view, containerId);
    this.options = options;
    this.activities = options.activities || [];
    this.title = options.title || 'Activities';
    this.halfWidth = options.halfWidth !== false;
    this.fullWidth = options.fullWidth || false;
  }

  hasData() {
    return this.activities.length > 0;
  }

  getCardHtml() {
    if (!this.hasData()) return '';
    
    return CardBuilder.create(this.title, this.containerId, {
      count: this.activities.length,
      noPadding: true,
      halfWidth: this.halfWidth,
      fullWidth: this.fullWidth,
      bodyClass: 'card-body-scrollable'
    });
  }

  /**
   * Get entity name from ID
   */
  getEntityName(entityId, entityType) {
    if (!entityId) return null;
    if (entityType === 'person') {
      const person = DataService.getPerson(entityId);
      return person ? person.name : entityId;
    } else if (entityType === 'organization') {
      const org = DataService.getOrganization(entityId);
      return org ? org.name : entityId;
    }
    return entityId;
  }

  /**
   * Render the activities table HTML
   */
  renderTable() {
    if (!this.activities.length) return '<p class="empty-state">No activities available</p>';

    const rows = this.activities.map(activity => {
      const actorName = this.getEntityName(activity.actorId, activity.actorType) || 'Unknown';
      const actorTypeClass = activity.actorType === 'person' ? 'actor-person' : 'actor-org';
      
      // Target can be an entity or text
      let targetDisplay = activity.targetText || '';
      if (activity.targetId) {
        const targetName = this.getEntityName(activity.targetId, activity.targetType);
        if (targetName) {
          targetDisplay = targetName + (activity.targetText ? ` (${activity.targetText})` : '');
        }
      }
      
      return `
        <tr class="activities-table-row" data-actor-id="${activity.actorId || ''}" data-actor-type="${activity.actorType || ''}">
          <td class="activities-col-actor">
            <span class="actor-name ${actorTypeClass}">${escapeHtml(actorName)}</span>
          </td>
          <td class="activities-col-action">
            <span class="activity-action">${escapeHtml(activity.action || '')}</span>
          </td>
          <td class="activities-col-target">
            <span class="activity-target">${escapeHtml(targetDisplay)}</span>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="table-container activities-table-container">
        <table class="table activities-table">
          <thead>
            <tr>
              <th class="activities-col-actor">Actor</th>
              <th class="activities-col-action">Action</th>
              <th class="activities-col-target">Target</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  initialize() {
    if (!this.hasData()) return null;

    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = this.renderTable();
    }
    return null;
  }
}

export default {
  NetworkGraphCard,
  NarrativeListCard,
  ThemeListCard,
  TopicListCard,
  DocumentTableCard,
  MapCard,
  TimelineVolumeCompositeCard,
  BulletPointsCard,
  QuotesTableCard,
  ActivitiesTableCard,
  CardManager
};
