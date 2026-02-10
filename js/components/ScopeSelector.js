/**
 * ScopeSelector.js
 * Reusable component for selecting entities and keywords to define a scope.
 * Used by MonitorEditorModal and Search. Simple mode only (advanced boolean mode removed).
 */

import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import { getEntityIcon } from '../utils/entityIcons.js';

export class ScopeSelector {
  /**
   * Create a ScopeSelector instance
   * @param {HTMLElement} container - The container element to render into
   * @param {Object} options - Configuration options
   * @param {Function} options.onChange - Callback when scope changes
   * @param {boolean} options.showSaveFilter - Whether to show the save filter button (default: true)
   * @param {boolean} options.showSearchFilters - Whether to show saved search filters accordion (default: true)
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      onChange: options.onChange || (() => {}),
      showSaveFilter: options.showSaveFilter !== false,
      showSearchFilters: options.showSearchFilters !== false
    };
    
    this.scope = {
      personIds: [],
      organizationIds: [],
      locationIds: [],
      keywords: [],
      documentTypes: [],
      publisherIds: [],
      authors: [],
      metadataFilters: {}  // { dimensionId: [selectedValues] }
    };
    
    this.filterText = '';
    this.expandedSections = new Set();
    this.saveDialogOpen = false;
    this.saveFilterName = '';
  }

  /**
   * Get the current scope (always simple mode)
   */
  getScope() {
    return {
      mode: 'simple',
      ...this.scope
    };
  }

  /**
   * Set the scope (for editing existing items). Advanced scopes are treated as empty.
   */
  setScope(scope) {
    if (scope?.mode === 'advanced') {
      this.scope = { personIds: [], organizationIds: [], locationIds: [], keywords: [], documentTypes: [], publisherIds: [], authors: [], metadataFilters: {} };
    } else {
      this.scope = {
        personIds: [...(scope?.personIds || [])],
        organizationIds: [...(scope?.organizationIds || [])],
        locationIds: [...(scope?.locationIds || [])],
        keywords: [...(scope?.keywords || [])],
        documentTypes: [...(scope?.documentTypes || [])],
        publisherIds: [...(scope?.publisherIds || [])],
        authors: [...(scope?.authors || [])],
        metadataFilters: scope?.metadataFilters ? JSON.parse(JSON.stringify(scope.metadataFilters)) : {}
      };
    }
    
    // Expand sections that have items (for simple mode)
    this.expandedSections = new Set();
    if (this.scope.personIds.length > 0) this.expandedSections.add('persons');
    if (this.scope.organizationIds.length > 0) this.expandedSections.add('organizations');
    if (this.scope.locationIds.length > 0) this.expandedSections.add('locations');
    if (this.scope.documentTypes.length > 0) this.expandedSections.add('documentTypes');
    if (this.scope.publisherIds.length > 0) this.expandedSections.add('publishers');
    if (this.scope.authors.length > 0) this.expandedSections.add('authors');
    // Expand catalog sections that have selections
    for (const [dimId, vals] of Object.entries(this.scope.metadataFilters)) {
      if (vals?.length > 0) this.expandedSections.add('catalog_' + dimId);
    }
    
    this.render();
  }

  /**
   * Notify listeners of scope change
   */
  notifyChange() {
    this.options.onChange(this.getScope());
  }

  /**
   * Apply a saved search filter to the current scope
   * @param {string} filterId - The ID of the filter to apply
   */
  applyFilter(filterId) {
    const filter = dataStore.findEntity('searchFilters', filterId);
    if (!filter) {
      console.warn('ScopeSelector: Filter not found:', filterId);
      return;
    }
    
    // Merge the filter's scope into current scope
    const filterScope = filter.scope || {};
    
    // Add entities from filter (avoiding duplicates)
    ['personIds', 'organizationIds', 'locationIds'].forEach(key => {
      const filterIds = filterScope[key] || [];
      filterIds.forEach(id => {
        if (!this.scope[key].includes(id)) {
          this.scope[key].push(id);
        }
      });
    });
    
    // Add keywords (avoiding duplicates)
    (filterScope.keywords || []).forEach(keyword => {
      if (!this.scope.keywords.includes(keyword)) {
        this.scope.keywords.push(keyword);
      }
    });
    
    // Add document types (avoiding duplicates)
    (filterScope.documentTypes || []).forEach(docType => {
      if (!this.scope.documentTypes.includes(docType)) {
        this.scope.documentTypes.push(docType);
      }
    });
    
    // Add publisher IDs (avoiding duplicates)
    (filterScope.publisherIds || []).forEach(publisherId => {
      if (!this.scope.publisherIds.includes(publisherId)) {
        this.scope.publisherIds.push(publisherId);
      }
    });
    
    // Add authors (avoiding duplicates)
    (filterScope.authors || []).forEach(author => {
      if (!this.scope.authors.includes(author)) {
        this.scope.authors.push(author);
      }
    });
    
    // Merge metadata filters from saved filter
    const filterMetadataFilters = filterScope.metadataFilters || {};
    for (const [dimId, vals] of Object.entries(filterMetadataFilters)) {
      if (!this.scope.metadataFilters[dimId]) {
        this.scope.metadataFilters[dimId] = [];
      }
      (vals || []).forEach(v => {
        if (!this.scope.metadataFilters[dimId].includes(v)) {
          this.scope.metadataFilters[dimId].push(v);
        }
      });
    }
    
    // Update expanded sections
    if (this.scope.personIds.length > 0) this.expandedSections.add('persons');
    if (this.scope.organizationIds.length > 0) this.expandedSections.add('organizations');
    if (this.scope.locationIds.length > 0) this.expandedSections.add('locations');
    if (this.scope.documentTypes.length > 0) this.expandedSections.add('documentTypes');
    if (this.scope.publisherIds.length > 0) this.expandedSections.add('publishers');
    if (this.scope.authors.length > 0) this.expandedSections.add('authors');
    for (const [dimId, vals] of Object.entries(this.scope.metadataFilters)) {
      if (vals?.length > 0) this.expandedSections.add('catalog_' + dimId);
    }
    
    this.render();
    this.notifyChange();
  }

  /**
   * Clear the current scope
   */
  clearScope() {
    this.scope = {
      personIds: [],
      organizationIds: [],
      locationIds: [],
      keywords: [],
      documentTypes: [],
      publisherIds: [],
      authors: [],
      metadataFilters: {}
    };
    this.expandedSections = new Set();
    this.render();
    this.notifyChange();
  }

  /**
   * Check if the scope has any items
   */
  hasScope() {
    return Object.keys(this.scope)
      .some(k => {
        if (k === 'metadataFilters') {
          return Object.values(this.scope.metadataFilters || {}).some(v => v?.length > 0);
        }
        return Array.isArray(this.scope[k]) && this.scope[k].length > 0;
      });
  }

  /**
   * Get all entities organized by type
   */
  getAllEntities() {
    return {
      persons: { label: 'Persons', scopeKey: 'personIds', entities: DataService.getPersons() },
      organizations: { label: 'Organizations', scopeKey: 'organizationIds', entities: DataService.getOrganizations() },
      locations: { label: 'Locations', scopeKey: 'locationIds', entities: DataService.getLocations() }
    };
  }

  /**
   * Get available document types for filtering
   */
  getDocumentTypes() {
    return [
      { id: 'news_article', name: 'News Article' },
      { id: 'social_post', name: 'Social Post' },
      { id: 'internal_report', name: 'Internal Report' },
      { id: 'intelligence_report', name: 'Intelligence Report' },
      { id: 'memo', name: 'Memo' },
      { id: 'transcript', name: 'Transcript' },
      { id: 'internal', name: 'Internal' },
      { id: 'corporate_record', name: 'Corporate Record' },
      { id: 'watchlist_match', name: 'Watchlist Match' },
      { id: 'political_finance', name: 'Political Finance' },
      { id: 'event_attendance', name: 'Event Attendance' }
    ];
  }

  /**
   * Get all publishers for filtering
   */
  getPublishers() {
    return DataService.getPublishers() || [];
  }

  /**
   * Get unique authors from documents
   */
  getAuthors() {
    const documents = DataService.getDocuments() || [];
    const authorSet = new Set();
    documents.forEach(doc => {
      if (doc.author && typeof doc.author === 'string' && doc.author.trim()) {
        authorSet.add(doc.author.trim());
      }
    });
    return Array.from(authorSet).sort().map(author => ({ id: author, name: author }));
  }

  /**
   * Get display text for an entity
   */
  getEntityText(entity) {
    return entity.name || entity.text || entity.headline || 'Unnamed';
  }

  /**
   * Render the component
   */
  render() {
    if (!this.container) {
      console.error('ScopeSelector: Container not found');
      return;
    }

    this.container.innerHTML = `
      <div class="scope-selector">
        <div class="scope-mode-panel active" data-panel="simple">
          <!-- Search Input -->
          <div class="scope-search-wrapper">
            <input 
              type="text" 
              class="form-input scope-search-input" 
              placeholder="Search entities or add keyword..."
              value="${this.escapeHtml(this.filterText)}"
            />
          </div>
          
          <!-- Selected Items (chips) with save button -->
          <div class="scope-chips-container">
            <div class="scope-chips">
              ${this.renderSelectedChips()}
            </div>
            ${this.options.showSaveFilter ? `
              <button 
                class="btn-icon scope-save-filter-btn" 
                title="Save as search filter"
                ${this.hasScope() ? '' : 'disabled'}
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 2a1 1 0 00-1 1v11.5l6-3 6 3V3a1 1 0 00-1-1H3z"/>
                  <path d="M8 5v4M6 7h4" stroke-linecap="round"/>
                </svg>
              </button>
            ` : ''}
          </div>
          
          <!-- Entity List -->
          <div class="scope-entity-list">
            ${this.renderEntityGroups()}
          </div>
        </div>
      </div>
      
      ${this.saveDialogOpen ? this.renderSaveDialog() : ''}
    `;

    this.attachEventListeners();
  }

  /**
   * Render selected chips (entities and keywords)
   */
  renderSelectedChips() {
    const chips = [];
    const allEntities = this.getAllEntities();
    
    // Render entity chips
    for (const [type, { scopeKey, entities }] of Object.entries(allEntities)) {
      const selectedIds = this.scope[scopeKey] || [];
      for (const id of selectedIds) {
        const entity = entities.find(e => e.id === id);
        if (entity) {
          chips.push(`
            <span class="scope-chip" data-id="${id}" data-scope-key="${scopeKey}" data-type="${type}">
              <span class="scope-chip-icon">${getEntityIcon(type, 12)}</span>
              <span class="scope-chip-label">${this.escapeHtml(this.getEntityText(entity))}</span>
              <button class="chip-remove" aria-label="Remove">&times;</button>
            </span>
          `);
        }
      }
    }
    
    // Render keyword chips (with quotes)
    for (const keyword of this.scope.keywords || []) {
      chips.push(`
        <span class="scope-chip scope-chip-keyword" data-keyword="${this.escapeHtml(keyword)}">
          <span class="scope-chip-label">"${this.escapeHtml(keyword)}"</span>
          <button class="chip-remove" aria-label="Remove">&times;</button>
        </span>
      `);
    }
    
    // Render document type chips
    const documentTypes = this.getDocumentTypes();
    for (const docTypeId of this.scope.documentTypes || []) {
      const docType = documentTypes.find(dt => dt.id === docTypeId);
      if (docType) {
        chips.push(`
          <span class="scope-chip scope-chip-docattr" data-id="${docTypeId}" data-scope-key="documentTypes" data-type="documentType">
            <span class="scope-chip-icon">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/>
                <path d="M10 2v3h3"/>
              </svg>
            </span>
            <span class="scope-chip-label">${this.escapeHtml(docType.name)}</span>
            <button class="chip-remove" aria-label="Remove">&times;</button>
          </span>
        `);
      }
    }
    
    // Render publisher chips
    const publishers = this.getPublishers();
    for (const publisherId of this.scope.publisherIds || []) {
      const publisher = publishers.find(p => p.id === publisherId);
      if (publisher) {
        chips.push(`
          <span class="scope-chip scope-chip-docattr" data-id="${publisherId}" data-scope-key="publisherIds" data-type="publisher">
            <span class="scope-chip-icon">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="3" width="12" height="10" rx="1"/>
                <path d="M5 6h6M5 9h4"/>
              </svg>
            </span>
            <span class="scope-chip-label">${this.escapeHtml(publisher.name)}</span>
            <button class="chip-remove" aria-label="Remove">&times;</button>
          </span>
        `);
      }
    }
    
    // Render author chips
    for (const author of this.scope.authors || []) {
      chips.push(`
        <span class="scope-chip scope-chip-docattr" data-id="${this.escapeHtml(author)}" data-scope-key="authors" data-type="author">
          <span class="scope-chip-icon">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="8" cy="5" r="3"/>
              <path d="M3 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/>
            </svg>
          </span>
          <span class="scope-chip-label">${this.escapeHtml(author)}</span>
          <button class="chip-remove" aria-label="Remove">&times;</button>
        </span>
      `);
    }
    
    // Render filter catalog chips (metadataFilters)
    const catalog = DataService.getFilterCatalog();
    for (const [dimId, selectedValues] of Object.entries(this.scope.metadataFilters || {})) {
      const dimension = catalog.find(d => d.id === dimId);
      const dimName = dimension?.name || dimId;
      for (const val of selectedValues) {
        chips.push(`
          <span class="scope-chip scope-chip-catalog" data-dimension-id="${this.escapeHtml(dimId)}" data-value="${this.escapeHtml(val)}">
            <span class="scope-chip-icon">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M1 2h14l-5 6v5l-4 2V8L1 2z"/>
              </svg>
            </span>
            <span class="scope-chip-label">${this.escapeHtml(dimName)}: ${this.escapeHtml(val)}</span>
            <button class="chip-remove" aria-label="Remove">&times;</button>
          </span>
        `);
      }
    }
    
    if (chips.length === 0) {
      return '<span class="scope-chips-empty">No items selected</span>';
    }
    
    return chips.join('');
  }

  /**
   * Render entity groups with accordion headers
   */
  renderEntityGroups() {
    const allEntities = this.getAllEntities();
    const filterLower = this.filterText.toLowerCase();
    let hasAnyResults = false;
    
    // Render search filters accordion first (if enabled and filters exist)
    const searchFiltersHtml = this.options.showSearchFilters ? this.renderSearchFiltersAccordion() : '';
    
    // Sort entity groups alphabetically by label
    const sortedEntityEntries = Object.entries(allEntities).sort((a, b) => a[1].label.localeCompare(b[1].label));
    
    const groups = sortedEntityEntries.map(([type, { label, scopeKey, entities }]) => {
      const selectedIds = this.scope[scopeKey] || [];
      
      // Filter entities by search text, exclude already selected
      const filteredEntities = entities.filter(entity => {
        if (selectedIds.includes(entity.id)) return false;
        if (!filterLower) return true;
        return this.getEntityText(entity).toLowerCase().includes(filterLower);
      });
      
      // Sort alphabetically
      filteredEntities.sort((a, b) => 
        this.getEntityText(a).localeCompare(this.getEntityText(b))
      );
      
      // Always show the group header, even if no matches (when filtering)
      const totalAvailable = entities.filter(e => !selectedIds.includes(e.id)).length;
      if (totalAvailable === 0 && !filterLower) {
        return ''; // Hide if all selected and not filtering
      }
      
      hasAnyResults = hasAnyResults || filteredEntities.length > 0;
      
      const isExpanded = this.expandedSections.has(type);
      const matchCount = filteredEntities.length;
      
      // Store filtered IDs for "Add all" functionality
      const filteredIds = filteredEntities.map(e => e.id);
      
      return `
        <div class="scope-entity-group ${isExpanded ? 'expanded' : ''}" data-type="${type}">
          <button class="scope-entity-group-header" data-type="${type}">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">${label}</span>
            <span class="scope-group-count">${matchCount}${filterLower ? ' match' + (matchCount !== 1 ? 'es' : '') : ''}</span>
            ${matchCount >= 1 ? `<span class="scope-add-all" data-scope-key="${scopeKey}" data-ids="${filteredIds.join(',')}">${matchCount === 1 ? 'Add' : 'Add all'}</span>` : ''}
          </button>
          <div class="scope-entity-group-items">
            ${filteredEntities.length > 0 ? filteredEntities.map(entity => `
              <button class="scope-entity-item" 
                      data-id="${entity.id}" 
                      data-scope-key="${scopeKey}"
                      data-type="${type}">
                <span class="scope-entity-item-icon">${getEntityIcon(type, 14)}</span>
                <span class="scope-entity-item-name">${this.escapeHtml(this.getEntityText(entity))}</span>
              </button>
            `).join('') : `<div class="scope-entity-group-empty">No matching ${label.toLowerCase()}</div>`}
          </div>
        </div>
      `;
    }).join('');
    
    // Render document attribute sections
    const documentAttributesHtml = this.renderDocumentAttributeGroups();
    
    const combinedGroups = searchFiltersHtml + groups + documentAttributesHtml;
    
    if (!combinedGroups.trim()) {
      return '<div class="scope-entity-list-empty">All entities have been selected</div>';
    }
    
    if (!hasAnyResults && this.filterText) {
      return combinedGroups + `<div class="scope-entity-list-hint">No matches found. Press Enter to add "${this.escapeHtml(this.filterText)}" as a keyword.</div>`;
    }
    
    return combinedGroups;
  }

  /**
   * Render document attribute filter groups (document types, publishers, authors),
   * sorted alphabetically by label.
   */
  renderDocumentAttributeGroups() {
    const filterLower = this.filterText.toLowerCase();

    // Define attribute sections with consistent structure
    // (Authors and Publishers have been moved into the Metadata accordion)
    const sections = [
      {
        label: 'Document Types',
        sectionType: 'documentTypes',
        scopeKey: 'documentTypes',
        itemType: 'documentType',
        items: this.getDocumentTypes(),
        selected: this.scope.documentTypes || [],
        icon: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M10 2v3h3"/></svg>',
        getId: item => item.id,
        getName: item => item.name
      }
    ];

    // Sort sections alphabetically by label
    sections.sort((a, b) => a.label.localeCompare(b.label));

    let html = '';

    for (const section of sections) {
      const filtered = section.items.filter(item => {
        if (section.selected.includes(section.getId(item))) return false;
        if (!filterLower) return true;
        return section.getName(item).toLowerCase().includes(filterLower);
      });

      // Sort items alphabetically
      filtered.sort((a, b) => section.getName(a).localeCompare(section.getName(b)));

      if (filtered.length === 0 && section.selected.length >= section.items.length) continue;

      const isExpanded = this.expandedSections.has(section.sectionType);
      const filteredIds = filtered.map(item => section.getId(item));

      html += `
        <div class="scope-entity-group ${isExpanded ? 'expanded' : ''}" data-type="${section.sectionType}">
          <button class="scope-entity-group-header" data-type="${section.sectionType}">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">${section.label}</span>
            <span class="scope-group-count">${filtered.length}</span>
            ${filtered.length >= 1 ? `<span class="scope-add-all" data-scope-key="${section.scopeKey}" data-ids="${filteredIds.join(',')}">${filtered.length === 1 ? 'Add' : 'Add all'}</span>` : ''}
          </button>
          <div class="scope-entity-group-items">
            ${filtered.length > 0 ? filtered.map(item => `
              <button class="scope-entity-item scope-docattr-item" 
                      data-id="${this.escapeHtml(section.getId(item))}" 
                      data-scope-key="${section.scopeKey}"
                      data-type="${section.itemType}">
                <span class="scope-entity-item-icon">${section.icon}</span>
                <span class="scope-entity-item-name">${this.escapeHtml(section.getName(item))}</span>
              </button>
            `).join('') : `<div class="scope-entity-group-empty">No matching ${section.label.toLowerCase()}</div>`}
          </div>
        </div>
      `;
    }

    return html;
  }


  /**
   * Check if a filter matches the current search text
   */
  filterMatchesSearch(filter, searchText) {
    if (!searchText) return true;
    
    const searchLower = searchText.toLowerCase();
    
    // Check filter name
    if (filter.name.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Check filter contents
    const contents = this.getFilterContents(filter);
    for (const { items } of contents) {
      for (const item of items) {
        if (item.toLowerCase().includes(searchLower)) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * Render a catalog dimension as an expandable sub-accordion with
   * individually selectable values.
   * @param {Object} dimension - catalog dimension object
   * @param {string} displayName - name to show in the header
   * @param {string} filterLower - lowercase search text
   * @returns {{ sortName: string, html: string } | null}
   */
  renderCatalogDimensionAccordion(dimension, displayName, filterLower) {
    const VISIBLE_LIMIT = 20;
    const dimId = dimension.id;
    const accordionKey = 'catalog_' + dimId;
    const selectedValues = this.scope.metadataFilters?.[dimId] || [];
    const allOptions = dimension.options || [];

    // Filter options: exclude selected, apply search text
    const filteredOptions = allOptions.filter(opt => {
      if (selectedValues.includes(opt)) return false;
      if (!filterLower) return true;
      return opt.toLowerCase().includes(filterLower);
    });

    const totalFiltered = filteredOptions.length;
    if (totalFiltered === 0 && selectedValues.length === 0) return null;

    const isTruncated = totalFiltered > VISIBLE_LIMIT;
    const visibleOptions = isTruncated ? filteredOptions.slice(0, VISIBLE_LIMIT) : filteredOptions;
    const isExpanded = this.expandedSections.has(accordionKey);

    return {
      sortName: displayName,
      html: `
        <div class="scope-entity-group scope-nested-group ${isExpanded ? 'expanded' : ''}" data-type="${accordionKey}">
          <button class="scope-entity-group-header" data-type="${accordionKey}">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">${this.escapeHtml(displayName)}</span>
            <span class="scope-group-count">${totalFiltered}${filterLower ? ' match' + (totalFiltered !== 1 ? 'es' : '') : ''}</span>
          </button>
          <div class="scope-entity-group-items">
            ${visibleOptions.length > 0 ? visibleOptions.map(opt => `
              <button class="scope-entity-item scope-catalog-item"
                      data-dimension-id="${this.escapeHtml(dimId)}"
                      data-value="${this.escapeHtml(opt)}"
                      data-type="${accordionKey}">
                <span class="scope-entity-item-icon">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M1 2h14l-5 6v5l-4 2V8L1 2z"/>
                  </svg>
                </span>
                <span class="scope-entity-item-name">${this.escapeHtml(opt)}</span>
              </button>
            `).join('') : `<div class="scope-entity-group-empty">No matching options</div>`}
            ${isTruncated ? `<div class="scope-entity-group-hint">Showing ${VISIBLE_LIMIT} of ${totalFiltered} — type to narrow results</div>` : ''}
          </div>
        </div>
      `
    };
  }

  /**
   * Render the three filter accordion sections:
   *   1. Search Filters  – saved/curated filters from searchFilters.js
   *   2. Extractions     – catalog dimensions whose name starts with "Extracted"
   *   3. Metadata        – all other catalog dimensions, plus Authors & Publishers
   */
  renderSearchFiltersAccordion() {
    const filterLower = this.filterText.toLowerCase();
    let html = '';

    // ── 1. Search Filters (saved/curated) ──────────────────────────
    const allSavedFilters = dataStore.data.searchFilters || [];
    const matchedSavedFilters = allSavedFilters.filter(f => this.filterMatchesSearch(f, this.filterText));

    if (allSavedFilters.length > 0) {
      const isExpanded = this.expandedSections.has('searchFilters');
      const sortedFilters = [...matchedSavedFilters].sort((a, b) => a.name.localeCompare(b.name));

      const savedContent = sortedFilters.length > 0
        ? sortedFilters.map(filter => {
            const itemCount = this.getFilterItemCount(filter);
            const tooltipHtml = this.getFilterTooltipHtml(filter);
            return `
              <div class="scope-filter-item-wrapper">
                <button class="scope-entity-item scope-filter-item" data-filter-id="${filter.id}">
                  <span class="scope-filter-icon">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M1 2h14l-5 6v5l-4 2V8L1 2z"/>
                    </svg>
                  </span>
                  <span class="scope-entity-item-name">${this.escapeHtml(filter.name)}</span>
                  <span class="scope-filter-count">${itemCount} item${itemCount !== 1 ? 's' : ''}</span>
                  <span class="scope-filter-apply">Add</span>
                </button>
                <div class="scope-filter-tooltip">
                  <div class="scope-filter-tooltip-header">${this.escapeHtml(filter.name)}</div>
                  <div class="scope-filter-tooltip-content">${tooltipHtml}</div>
                </div>
              </div>
            `;
          }).join('')
        : `<div class="scope-entity-group-empty">No matching filters</div>`;

      const countText = this.filterText
        ? `${matchedSavedFilters.length} match${matchedSavedFilters.length !== 1 ? 'es' : ''}`
        : `${allSavedFilters.length} saved`;

      html += `
        <div class="scope-entity-group scope-filter-group ${isExpanded ? 'expanded' : ''}" data-type="searchFilters">
          <button class="scope-entity-group-header" data-type="searchFilters">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">Search Filters</span>
            <span class="scope-group-count">${countText}</span>
          </button>
          <div class="scope-entity-group-items">
            ${savedContent}
          </div>
        </div>
      `;
    }

    // ── 2 & 3. Extractions and Metadata from filterCatalog ─────────
    const catalog = DataService.getFilterCatalog();
    if (!catalog || catalog.length === 0) return html;

    const extractionItems = [];
    const metadataItems = [];

    for (const dimension of catalog) {
      const isExtraction = dimension.name.toLowerCase().startsWith('extracted');
      // Strip "Extracted " prefix for extraction dimensions
      const displayName = isExtraction
        ? dimension.name.replace(/^Extracted\s+/i, '')
        : dimension.name;

      const item = this.renderCatalogDimensionAccordion(dimension, displayName, filterLower);
      if (!item) continue;

      if (isExtraction) {
        extractionItems.push(item);
      } else {
        metadataItems.push(item);
      }
    }

    // Add Authors and Publishers into the Metadata section
    const authors = this.getAuthors();
    const selectedAuthors = this.scope.authors || [];
    const filteredAuthors = authors.filter(a => {
      if (selectedAuthors.includes(a.id)) return false;
      if (!filterLower) return true;
      return a.name.toLowerCase().includes(filterLower);
    }).sort((a, b) => a.name.localeCompare(b.name));

    if (filteredAuthors.length > 0 || selectedAuthors.length < authors.length) {
      const isExpanded = this.expandedSections.has('authors');
      const filteredAuthorIds = filteredAuthors.map(a => a.id);
      metadataItems.push({
        sortName: 'Authors',
        html: `
          <div class="scope-entity-group scope-nested-group ${isExpanded ? 'expanded' : ''}" data-type="authors">
            <button class="scope-entity-group-header" data-type="authors">
              <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 6l4 4 4-4"/>
              </svg>
              <span class="scope-group-label">Authors</span>
              <span class="scope-group-count">${filteredAuthors.length}</span>
              ${filteredAuthors.length >= 1 ? `<span class="scope-add-all" data-scope-key="authors" data-ids="${filteredAuthorIds.join(',')}">${filteredAuthors.length === 1 ? 'Add' : 'Add all'}</span>` : ''}
            </button>
            <div class="scope-entity-group-items">
              ${filteredAuthors.length > 0 ? filteredAuthors.map(author => `
                <button class="scope-entity-item scope-docattr-item"
                        data-id="${this.escapeHtml(author.id)}"
                        data-scope-key="authors"
                        data-type="author">
                  <span class="scope-entity-item-icon">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="8" cy="5" r="3"/>
                      <path d="M3 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/>
                    </svg>
                  </span>
                  <span class="scope-entity-item-name">${this.escapeHtml(author.name)}</span>
                </button>
              `).join('') : `<div class="scope-entity-group-empty">No matching authors</div>`}
            </div>
          </div>
        `
      });
    }

    const publishers = this.getPublishers();
    const selectedPublisherIds = this.scope.publisherIds || [];
    const filteredPublishers = publishers.filter(pub => {
      if (selectedPublisherIds.includes(pub.id)) return false;
      if (!filterLower) return true;
      return pub.name.toLowerCase().includes(filterLower);
    }).sort((a, b) => a.name.localeCompare(b.name));

    if (filteredPublishers.length > 0 || selectedPublisherIds.length < publishers.length) {
      const isExpanded = this.expandedSections.has('publishers');
      const filteredPubIds = filteredPublishers.map(p => p.id);
      metadataItems.push({
        sortName: 'Publishers',
        html: `
          <div class="scope-entity-group scope-nested-group ${isExpanded ? 'expanded' : ''}" data-type="publishers">
            <button class="scope-entity-group-header" data-type="publishers">
              <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 6l4 4 4-4"/>
              </svg>
              <span class="scope-group-label">Publishers</span>
              <span class="scope-group-count">${filteredPublishers.length}</span>
              ${filteredPublishers.length >= 1 ? `<span class="scope-add-all" data-scope-key="publisherIds" data-ids="${filteredPubIds.join(',')}">${filteredPublishers.length === 1 ? 'Add' : 'Add all'}</span>` : ''}
            </button>
            <div class="scope-entity-group-items">
              ${filteredPublishers.length > 0 ? filteredPublishers.map(pub => `
                <button class="scope-entity-item scope-docattr-item"
                        data-id="${pub.id}"
                        data-scope-key="publisherIds"
                        data-type="publisher">
                  <span class="scope-entity-item-icon">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="2" y="3" width="12" height="10" rx="1"/>
                      <path d="M5 6h6M5 9h4"/>
                    </svg>
                  </span>
                  <span class="scope-entity-item-name">${this.escapeHtml(pub.name)}</span>
                </button>
              `).join('') : `<div class="scope-entity-group-empty">No matching publishers</div>`}
            </div>
          </div>
        `
      });
    }

    // Sort each section alphabetically
    extractionItems.sort((a, b) => a.sortName.localeCompare(b.sortName));
    metadataItems.sort((a, b) => a.sortName.localeCompare(b.sortName));

    // Render Extractions accordion
    if (extractionItems.length > 0) {
      const isExpanded = this.expandedSections.has('extractionFilters');
      html += `
        <div class="scope-entity-group scope-filter-group ${isExpanded ? 'expanded' : ''}" data-type="extractionFilters">
          <button class="scope-entity-group-header" data-type="extractionFilters">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">Extractions</span>
            <span class="scope-group-count">${extractionItems.length}</span>
          </button>
          <div class="scope-entity-group-items">
            ${extractionItems.map(item => item.html).join('')}
          </div>
        </div>
      `;
    }

    // Render Metadata accordion
    if (metadataItems.length > 0) {
      const isExpanded = this.expandedSections.has('metadataFilters');
      html += `
        <div class="scope-entity-group scope-filter-group ${isExpanded ? 'expanded' : ''}" data-type="metadataFilters">
          <button class="scope-entity-group-header" data-type="metadataFilters">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">Metadata</span>
            <span class="scope-group-count">${metadataItems.length}</span>
          </button>
          <div class="scope-entity-group-items">
            ${metadataItems.map(item => item.html).join('')}
          </div>
        </div>
      `;
    }

    return html;
  }

  /**
   * Get the total item count for a filter
   */
  getFilterItemCount(filter) {
    const scope = filter.scope || {};
    let count = (scope.personIds?.length || 0) +
           (scope.organizationIds?.length || 0) +
           (scope.locationIds?.length || 0) +
           (scope.keywords?.length || 0) +
           (scope.documentTypes?.length || 0) +
           (scope.publisherIds?.length || 0) +
           (scope.authors?.length || 0);
    for (const vals of Object.values(scope.metadataFilters || {})) {
      count += (vals?.length || 0);
    }
    return count;
  }

  /**
   * Get filter contents as structured data for tooltip display
   */
  getFilterContents(filter) {
    const scope = filter.scope || {};
    const allEntities = this.getAllEntities();
    const contents = [];
    
    // Map scope keys to entity types
    const scopeToType = {
      personIds: 'persons',
      organizationIds: 'organizations',
      locationIds: 'locations'
    };
    
    // Resolve entity IDs to names
    for (const [scopeKey, type] of Object.entries(scopeToType)) {
      const ids = scope[scopeKey] || [];
      if (ids.length > 0) {
        const entities = allEntities[type]?.entities || [];
        const names = ids
          .map(id => {
            const entity = entities.find(e => e.id === id);
            return entity ? this.getEntityText(entity) : null;
          })
          .filter(Boolean);
        
        if (names.length > 0) {
          contents.push({
            label: allEntities[type]?.label || type,
            items: names
          });
        }
      }
    }
    
    // Add keywords
    const keywords = scope.keywords || [];
    if (keywords.length > 0) {
      contents.push({
        label: 'Keywords',
        items: keywords.map(k => `"${k}"`)
      });
    }

    // Add metadata filter dimensions
    const catalog = DataService.getFilterCatalog();
    for (const [dimId, vals] of Object.entries(scope.metadataFilters || {})) {
      if (vals && vals.length > 0) {
        const dimension = catalog.find(d => d.id === dimId);
        const dimName = dimension?.name || dimId;
        contents.push({
          label: dimName,
          items: [...vals]
        });
      }
    }
    
    return contents;
  }

  /**
   * Generate tooltip HTML for a filter
   */
  getFilterTooltipHtml(filter) {
    const contents = this.getFilterContents(filter);
    if (contents.length === 0) {
      return '<div class="filter-tooltip-empty">No items in this filter</div>';
    }
    
    return contents.map(({ label, items }) => {
      const maxItems = 5;
      const displayItems = items.slice(0, maxItems);
      const remaining = items.length - maxItems;
      
      let itemsHtml = displayItems.map(item => 
        `<li>${this.escapeHtml(item)}</li>`
      ).join('');
      
      if (remaining > 0) {
        itemsHtml += `<li class="filter-tooltip-more">+${remaining} more</li>`;
      }
      
      return `
        <div class="filter-tooltip-section">
          <div class="filter-tooltip-label">${this.escapeHtml(label)}</div>
          <ul class="filter-tooltip-items">${itemsHtml}</ul>
        </div>
      `;
    }).join('');
  }

  /**
   * Render the save filter dialog
   */
  renderSaveDialog() {
    const itemCount = this.getScopeItemCount();
    
    return `
      <div class="scope-save-dialog-overlay">
        <div class="scope-save-dialog">
          <div class="scope-save-dialog-header">
            <h4>Save Search Filter</h4>
            <button class="scope-save-dialog-close" aria-label="Close">&times;</button>
          </div>
          <div class="scope-save-dialog-body">
            <p class="scope-save-dialog-description">
              Save your current selection as a reusable filter. You can apply this filter to monitors 
              and other searches throughout the app.
            </p>
            <p class="scope-save-dialog-summary">
              <strong>${itemCount}</strong> item${itemCount !== 1 ? 's' : ''} will be saved in this filter.
            </p>
            <div class="form-group">
              <label class="form-label" for="filter-name">Filter Name <span class="required">*</span></label>
              <input 
                type="text" 
                id="filter-name" 
                class="form-input" 
                placeholder="e.g., Key Executives, China Tech Orgs..."
                value="${this.escapeHtml(this.saveFilterName)}"
                autofocus
              />
            </div>
          </div>
          <div class="scope-save-dialog-footer">
            <button class="btn btn-secondary scope-save-dialog-cancel">Cancel</button>
            <button class="btn btn-primary scope-save-dialog-confirm">Save Filter</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get the total item count in current scope
   */
  getScopeItemCount() {
    let count = (this.scope.personIds?.length || 0) +
           (this.scope.organizationIds?.length || 0) +
           (this.scope.locationIds?.length || 0) +
           (this.scope.keywords?.length || 0) +
           (this.scope.documentTypes?.length || 0) +
           (this.scope.publisherIds?.length || 0) +
           (this.scope.authors?.length || 0);
    // Count metadata filter selections
    for (const vals of Object.values(this.scope.metadataFilters || {})) {
      count += (vals?.length || 0);
    }
    return count;
  }

  /**
   * Toggle section expand/collapse
   */
  toggleSection(type) {
    if (this.expandedSections.has(type)) {
      this.expandedSections.delete(type);
    } else {
      this.expandedSections.add(type);
    }
    
    const group = this.container.querySelector(`.scope-entity-group[data-type="${type}"]`);
    if (group) {
      group.classList.toggle('expanded', this.expandedSections.has(type));
    }
  }

  /**
   * Refresh the chips display
   */
  refreshChips() {
    const chipsContainer = this.container.querySelector('.scope-chips');
    if (chipsContainer) {
      chipsContainer.innerHTML = this.renderSelectedChips();
    }
    
    // Update save button state
    const saveBtn = this.container.querySelector('.scope-save-filter-btn');
    if (saveBtn) {
      saveBtn.disabled = !this.hasScope();
    }
  }

  /**
   * Refresh the entity list
   */
  refreshEntityList() {
    const listContainer = this.container.querySelector('.scope-entity-list');
    if (listContainer) {
      listContainer.innerHTML = this.renderEntityGroups();
    }
  }

  /**
   * Open the save filter dialog
   */
  openSaveDialog() {
    this.saveDialogOpen = true;
    this.saveFilterName = '';
    this.render();
    
    // Focus the name input
    setTimeout(() => {
      const input = this.container.querySelector('#filter-name');
      if (input) input.focus();
    }, 50);
  }

  /**
   * Close the save filter dialog
   */
  closeSaveDialog() {
    this.saveDialogOpen = false;
    this.saveFilterName = '';
    this.render();
  }

  /**
   * Save the current scope as a search filter
   */
  saveAsFilter() {
    const name = this.saveFilterName.trim();
    if (!name) {
      // Focus the input and add error styling
      const input = this.container.querySelector('#filter-name');
      if (input) {
        input.focus();
        input.classList.add('input-error');
        setTimeout(() => input.classList.remove('input-error'), 1000);
      }
      return;
    }
    
    dataStore.createSearchFilter({
      name,
      scope: {
        mode: 'simple',
        personIds: [...this.scope.personIds],
        organizationIds: [...this.scope.organizationIds],
        locationIds: [...this.scope.locationIds],
        keywords: [...this.scope.keywords],
        documentTypes: [...(this.scope.documentTypes || [])],
        publisherIds: [...(this.scope.publisherIds || [])],
        authors: [...(this.scope.authors || [])],
        metadataFilters: JSON.parse(JSON.stringify(this.scope.metadataFilters || {}))
      }
    });
    
    this.closeSaveDialog();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Search input
    const searchInput = this.container.querySelector('.scope-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterText = e.target.value;
        this.refreshEntityList();
      });
      
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const keyword = this.filterText.trim();
          if (keyword && !this.scope.keywords.includes(keyword)) {
            this.scope.keywords.push(keyword);
            this.filterText = '';
            searchInput.value = '';
            this.refreshChips();
            this.refreshEntityList();
            this.notifyChange();
          }
        }
      });
    }
    
    // Save filter button
    const saveBtn = this.container.querySelector('.scope-save-filter-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.openSaveDialog());
    }
    
    // Chip remove clicks
    this.container.querySelector('.scope-chips')?.addEventListener('click', (e) => {
      const chipRemove = e.target.closest('.chip-remove');
      if (chipRemove) {
        e.preventDefault();
        const chip = chipRemove.closest('.scope-chip');
        if (chip) {
          if (chip.dataset.keyword !== undefined) {
            this.scope.keywords = this.scope.keywords.filter(k => k !== chip.dataset.keyword);
          } else if (chip.dataset.dimensionId !== undefined) {
            // Catalog filter chip removal
            const dimId = chip.dataset.dimensionId;
            const val = chip.dataset.value;
            if (this.scope.metadataFilters[dimId]) {
              this.scope.metadataFilters[dimId] = this.scope.metadataFilters[dimId].filter(v => v !== val);
              if (this.scope.metadataFilters[dimId].length === 0) {
                delete this.scope.metadataFilters[dimId];
              }
            }
          } else if (chip.dataset.id && chip.dataset.scopeKey) {
            const scopeKey = chip.dataset.scopeKey;
            // Handle authors specially since they store the actual value, not an ID
            if (scopeKey === 'authors') {
              this.scope.authors = this.scope.authors.filter(a => a !== chip.dataset.id);
            } else {
              this.scope[scopeKey] = this.scope[scopeKey].filter(id => id !== chip.dataset.id);
            }
          }
          this.refreshChips();
          this.refreshEntityList();
          this.notifyChange();
        }
      }
    });
    
    // Filter tooltip positioning
    const entityList = this.container.querySelector('.scope-entity-list');
    if (entityList) {
      entityList.addEventListener('mouseenter', (e) => {
        const wrapper = e.target.closest('.scope-filter-item-wrapper');
        if (wrapper) {
          const tooltip = wrapper.querySelector('.scope-filter-tooltip');
          if (tooltip) {
            const rect = wrapper.getBoundingClientRect();
            const tooltipWidth = 280;
            
            // Position to the right if there's room, otherwise to the left
            let left = rect.right + 8;
            if (left + tooltipWidth > window.innerWidth - 16) {
              left = rect.left - tooltipWidth - 8;
            }
            
            // Keep within vertical bounds
            let top = rect.top;
            const tooltipHeight = tooltip.offsetHeight || 200;
            if (top + tooltipHeight > window.innerHeight - 16) {
              top = window.innerHeight - tooltipHeight - 16;
            }
            
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
          }
        }
      }, true);
    }
    
    // Entity list clicks
    this.container.querySelector('.scope-entity-list')?.addEventListener('click', (e) => {
      // Handle "Add all" click (must be before header check)
      const addAllBtn = e.target.closest('.scope-add-all');
      if (addAllBtn) {
        e.preventDefault();
        e.stopPropagation();
        const { scopeKey, ids } = addAllBtn.dataset;
        if (scopeKey && ids) {
          const idsArray = ids.split(',').filter(id => id);
          for (const id of idsArray) {
            if (!this.scope[scopeKey].includes(id)) {
              this.scope[scopeKey].push(id);
            }
          }
          this.refreshChips();
          this.refreshEntityList();
          this.notifyChange();
        }
        return;
      }
      
      // Handle filter item click
      const filterItem = e.target.closest('.scope-filter-item');
      if (filterItem) {
        e.preventDefault();
        const filterId = filterItem.dataset.filterId;
        if (filterId) {
          this.applyFilter(filterId);
        }
        return;
      }
      
      // Handle accordion header click
      const header = e.target.closest('.scope-entity-group-header');
      if (header) {
        e.preventDefault();
        this.toggleSection(header.dataset.type);
        return;
      }
      
      // Handle catalog filter item click
      const catalogItem = e.target.closest('.scope-catalog-item');
      if (catalogItem) {
        e.preventDefault();
        const dimId = catalogItem.dataset.dimensionId;
        const val = catalogItem.dataset.value;
        if (dimId && val) {
          if (!this.scope.metadataFilters[dimId]) {
            this.scope.metadataFilters[dimId] = [];
          }
          if (!this.scope.metadataFilters[dimId].includes(val)) {
            this.scope.metadataFilters[dimId].push(val);
            this.refreshChips();
            this.refreshEntityList();
            this.notifyChange();
          }
        }
        return;
      }
      
      // Handle entity item click (not filter items, not catalog items)
      const item = e.target.closest('.scope-entity-item:not(.scope-filter-item):not(.scope-catalog-item)');
      if (item) {
        e.preventDefault();
        const { id, scopeKey } = item.dataset;
        if (id && scopeKey) {
          // Initialize array if needed
          if (!this.scope[scopeKey]) {
            this.scope[scopeKey] = [];
          }
          if (!this.scope[scopeKey].includes(id)) {
            this.scope[scopeKey].push(id);
            this.refreshChips();
            this.refreshEntityList();
            this.notifyChange();
          }
        }
      }
    });
    
    // Save dialog event listeners
    if (this.saveDialogOpen) {
      const overlay = this.container.querySelector('.scope-save-dialog-overlay');
      const closeBtn = this.container.querySelector('.scope-save-dialog-close');
      const cancelBtn = this.container.querySelector('.scope-save-dialog-cancel');
      const confirmBtn = this.container.querySelector('.scope-save-dialog-confirm');
      const nameInput = this.container.querySelector('#filter-name');
      
      overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeSaveDialog();
      });
      
      closeBtn?.addEventListener('click', () => this.closeSaveDialog());
      cancelBtn?.addEventListener('click', () => this.closeSaveDialog());
      confirmBtn?.addEventListener('click', () => this.saveAsFilter());
      
      nameInput?.addEventListener('input', (e) => {
        this.saveFilterName = e.target.value;
      });
      
      nameInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.saveAsFilter();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.closeSaveDialog();
        }
      });
    }
  }

  /**
   * Escape HTML for safe rendering
   */
  escapeHtml(text) {
    return escapeHtml(text);
  }

  /**
   * Destroy the component and clean up
   */
  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

export default ScopeSelector;
