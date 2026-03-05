/**
 * ScopeSelector.js
 * Reusable component for selecting entities and keywords to define a scope.
 * Used by MonitorEditorModal and Search. Simple mode only (advanced boolean mode removed).
 */

import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import { getEntityIcon, getExtractionIcon, getExtractionColorClass } from '../utils/entityIcons.js';
import { formatDate } from '../utils/formatters.js';
import { TimeRangeFilter } from './TimeRangeFilter.js';
import { countMetadataSelections, getScopeItemCount as _getScopeItemCount } from '../utils/scopeUtils.js';

export class ScopeSelector {
  /**
   * Create a ScopeSelector instance
   * @param {HTMLElement} container - The container element to render into
   * @param {Object} options - Configuration options
   * @param {Function} options.onChange - Callback when scope changes
   * @param {boolean} options.showSaveFilter - Whether to show the save filter button (default: true)
   * @param {boolean} options.showSearchFilters - Whether to show saved search filters accordion (default: true)
   * @param {string[]|null} options.contextDocIds - Document IDs to scope the filter catalog to (null = all)
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      onChange: options.onChange || (() => {}),
      showSaveFilter: options.showSaveFilter !== false,
      showSearchFilters: options.showSearchFilters !== false,
      contextDocIds: options.contextDocIds || null
    };
    
    this.scope = {
      personIds: [],
      organizationIds: [],
      locationIds: [],
      keywords: [],
      documentTypes: [],
      metadataFilters: {},  // { dimensionId: { include: [], exclude: [] } }
      logic: 'OR'
    };
    
    this.filterText = '';
    this.expandedSections = new Set();
    this.saveDialogOpen = false;
    this.saveFilterName = '';
    this.dateHistogramInstances = {};
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
      this.scope = { personIds: [], organizationIds: [], locationIds: [], keywords: [], documentTypes: [], metadataFilters: {}, logic: 'OR' };
    } else {
      this.scope = {
        personIds: [...(scope?.personIds || [])],
        organizationIds: [...(scope?.organizationIds || [])],
        locationIds: [...(scope?.locationIds || [])],
        keywords: [...(scope?.keywords || [])],
        documentTypes: [...(scope?.documentTypes || [])],
        metadataFilters: scope?.metadataFilters ? JSON.parse(JSON.stringify(scope.metadataFilters)) : {},
        logic: scope?.logic || 'OR'
      };
    }
    
    this.expandedSections = new Set();
    if (this.scope.personIds.length > 0) this.expandedSections.add('persons');
    if (this.scope.organizationIds.length > 0) this.expandedSections.add('organizations');
    if (this.scope.locationIds.length > 0) this.expandedSections.add('locations');
    if (this.scope.documentTypes.length > 0) this.expandedSections.add('documentTypes');
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
    
    // Merge metadata filters from saved filter
    const filterMetadataFilters = filterScope.metadataFilters || {};
    for (const [dimId, filterVal] of Object.entries(filterMetadataFilters)) {
      // Date range filters replace rather than merge
      if (filterVal?.dateRange) {
        this.scope.metadataFilters[dimId] = { dateRange: { ...filterVal.dateRange } };
        continue;
      }
      const target = this.getDimFilter(dimId);
      // Normalize saved filter (may be old array format)
      const srcInclude = Array.isArray(filterVal) ? filterVal : (filterVal?.include || []);
      const srcExclude = Array.isArray(filterVal) ? [] : (filterVal?.exclude || []);
      srcInclude.forEach(v => {
        if (!target.include.includes(v) && !target.exclude.includes(v)) target.include.push(v);
      });
      srcExclude.forEach(v => {
        if (!target.include.includes(v) && !target.exclude.includes(v)) target.exclude.push(v);
      });
      if (target.include.length === 0 && target.exclude.length === 0) delete this.scope.metadataFilters[dimId];
    }
    
    // Update expanded sections
    if (this.scope.personIds.length > 0) this.expandedSections.add('persons');
    if (this.scope.organizationIds.length > 0) this.expandedSections.add('organizations');
    if (this.scope.locationIds.length > 0) this.expandedSections.add('locations');
    if (this.scope.documentTypes.length > 0) this.expandedSections.add('documentTypes');
    for (const [dimId] of Object.entries(this.scope.metadataFilters)) {
      if (this.dimHasSelections(dimId)) this.expandedSections.add('catalog_' + dimId);
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
      metadataFilters: {},
      logic: 'OR'
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
          return Object.values(this.scope.metadataFilters || {}).some(v => {
            if (v?.dateRange?.start && v?.dateRange?.end) return true;
            if (Array.isArray(v)) return v.length > 0;
            return (v?.include?.length > 0) || (v?.exclude?.length > 0);
          });
        }
        return Array.isArray(this.scope[k]) && this.scope[k].length > 0;
      });
  }

  /** Get the { include, exclude } entry for a dimension, creating if needed */
  getDimFilter(dimId) {
    if (!this.scope.metadataFilters[dimId]) {
      this.scope.metadataFilters[dimId] = { include: [], exclude: [] };
    }
    const entry = this.scope.metadataFilters[dimId];
    // Normalize legacy array format
    if (Array.isArray(entry)) {
      this.scope.metadataFilters[dimId] = { include: entry, exclude: [] };
      return this.scope.metadataFilters[dimId];
    }
    if (!entry.include) entry.include = [];
    if (!entry.exclude) entry.exclude = [];
    return entry;
  }

  /** Check if a value is already selected (include or exclude) for a dimension */
  isDimValueSelected(dimId, val) {
    const f = this.scope.metadataFilters[dimId];
    if (!f) return false;
    if (Array.isArray(f)) return f.includes(val);
    return f.include?.includes(val) || f.exclude?.includes(val);
  }

  /** Get the filter catalog, scoped to context documents if provided */
  getCatalog() {
    return this.options.contextDocIds
      ? DataService.getFilterCatalogForDocuments(this.options.contextDocIds)
      : DataService.getFilterCatalog();
  }

  /** Count total metadata filter selections */
  countMetadataSelections(filters) {
    return countMetadataSelections(filters);
  }

  /** Check if a dimension has any selections */
  dimHasSelections(dimId) {
    const f = this.scope.metadataFilters[dimId];
    if (!f) return false;
    if (f.dateRange) return !!(f.dateRange.start && f.dateRange.end);
    if (Array.isArray(f)) return f.length > 0;
    return (f.include?.length > 0) || (f.exclude?.length > 0);
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
            <svg class="scope-search-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="6.5" cy="6.5" r="5"/>
              <path d="M10.5 10.5L14 14" stroke-linecap="round"/>
            </svg>
            <input 
              type="text" 
              class="form-input scope-search-input" 
              placeholder="Search for keys or values..."
              value="${this.escapeHtml(this.filterText)}"
            />
            <button class="scope-search-clear ${this.filterText ? '' : 'hidden'}" aria-label="Clear search">&times;</button>
          </div>
          <p class="scope-search-hint">Type to filter entities or press Enter to add as keyword</p>
          
          <!-- Selected Items (chips) with logic toggle -->
          <div class="scope-chips-container">
            <div class="scope-chips">
              ${this.renderSelectedChips()}
            </div>
            <div class="scope-logic-segmented ${this.getScopeItemCount() > 1 ? '' : 'hidden'}" id="scope-logic-toggle">
              <button class="scope-logic-btn ${(this.scope.logic || 'OR') === 'OR' ? 'active' : ''}" data-logic="OR">OR</button>
              <button class="scope-logic-btn ${this.scope.logic === 'AND' ? 'active' : ''}" data-logic="AND">AND</button>
            </div>
          </div>
          ${this.options.showSaveFilter ? `
            <div class="scope-save-filter-row">
              <button 
                class="btn btn-ghost btn-small scope-save-filter-btn" 
                ${this.hasScope() ? '' : 'disabled'}
              >Save Filter</button>
            </div>
          ` : ''}
          
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
    for (const [type, { label: typeLabel, scopeKey, entities }] of Object.entries(allEntities)) {
      const selectedIds = this.scope[scopeKey] || [];
      for (const id of selectedIds) {
        const entity = entities.find(e => e.id === id);
        if (entity) {
          chips.push(`
            <span class="scope-chip" data-id="${id}" data-scope-key="${scopeKey}" data-type="${type}" data-tooltip="${this.escapeHtml(typeLabel)}">
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
        <span class="scope-chip scope-chip-keyword" data-keyword="${this.escapeHtml(keyword)}" data-tooltip="Keyword">
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
          <span class="scope-chip scope-chip-docattr" data-id="${docTypeId}" data-scope-key="documentTypes" data-type="documentType" data-tooltip="Document Type">
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
    
    // Render filter catalog chips (metadataFilters)
    const catalog = DataService.getFilterCatalog();
    for (const [dimId, filterVal] of Object.entries(this.scope.metadataFilters || {})) {
      const dimension = catalog.find(d => d.id === dimId);
      const dimName = dimension?.name || dimId;
      const isExtraction = dimName.toLowerCase().startsWith('extracted');

      // Date range chip
      if (filterVal?.dateRange?.start && filterVal?.dateRange?.end) {
        const rangeText = `${formatDate(filterVal.dateRange.start)} – ${formatDate(filterVal.dateRange.end)}`;
        chips.push(`
          <span class="scope-chip scope-chip-catalog scope-chip-date" data-dimension-id="${this.escapeHtml(dimId)}" data-filter-mode="dateRange" data-tooltip="${this.escapeHtml(dimName)}">
            <span class="scope-chip-icon">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="2.5" width="12" height="11.5" rx="1"/>
                <path d="M2 6h12M5 0.5v3M11 0.5v3"/>
              </svg>
            </span>
            <span class="scope-chip-label">${this.escapeHtml(rangeText)}</span>
            <button class="chip-remove" aria-label="Remove">&times;</button>
          </span>
        `);
        continue;
      }

      // Normalize legacy array format
      const include = Array.isArray(filterVal) ? filterVal : (filterVal?.include || []);
      const exclude = Array.isArray(filterVal) ? [] : (filterVal?.exclude || []);
      for (const val of include) {
        if (isExtraction) {
          const colorClass = getExtractionColorClass(dimName);
          chips.push(`
            <span class="scope-chip scope-chip-catalog extraction-chip extraction-chip--ghost ${colorClass}" data-dimension-id="${this.escapeHtml(dimId)}" data-value="${this.escapeHtml(val)}" data-filter-mode="include" data-tooltip="${this.escapeHtml(dimName)}">
              <span class="scope-chip-icon extraction-chip-icon">${getExtractionIcon(dimName, 12)}</span>
              <span class="scope-chip-label extraction-chip-label">${this.escapeHtml(val)}</span>
              <button class="chip-remove" aria-label="Remove">&times;</button>
            </span>
          `);
        } else {
          chips.push(`
            <span class="scope-chip scope-chip-catalog" data-dimension-id="${this.escapeHtml(dimId)}" data-value="${this.escapeHtml(val)}" data-filter-mode="include" data-tooltip="${this.escapeHtml(dimName)}">
              <span class="scope-chip-icon">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M1 2h14l-5 6v5l-4 2V8L1 2z"/>
                </svg>
              </span>
              <span class="scope-chip-label">${this.escapeHtml(val)}</span>
              <button class="chip-remove" aria-label="Remove">&times;</button>
            </span>
          `);
        }
      }
      for (const val of exclude) {
        if (isExtraction) {
          const colorClass = getExtractionColorClass(dimName);
          chips.push(`
            <span class="scope-chip scope-chip-catalog scope-chip-excluded extraction-chip extraction-chip--ghost ${colorClass}" data-dimension-id="${this.escapeHtml(dimId)}" data-value="${this.escapeHtml(val)}" data-filter-mode="exclude" data-tooltip="Exclude: ${this.escapeHtml(dimName)}">
              <span class="scope-chip-icon extraction-chip-icon">${getExtractionIcon(dimName, 12)}</span>
              <span class="scope-chip-label extraction-chip-label">${this.escapeHtml(val)}</span>
              <button class="chip-remove" aria-label="Remove">&times;</button>
            </span>
          `);
        } else {
          chips.push(`
            <span class="scope-chip scope-chip-catalog scope-chip-excluded" data-dimension-id="${this.escapeHtml(dimId)}" data-value="${this.escapeHtml(val)}" data-filter-mode="exclude" data-tooltip="Exclude: ${this.escapeHtml(dimName)}">
              <span class="scope-chip-icon">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 8h10"/>
                </svg>
              </span>
              <span class="scope-chip-label">${this.escapeHtml(val)}</span>
              <button class="chip-remove" aria-label="Remove">&times;</button>
            </span>
          `);
        }
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
    // Render the three filter accordion sections (Search Filters, Extractions, Metadata)
    // Entity groups (Persons, Organizations, Locations) are now handled via the filter catalog.
    const searchFiltersHtml = this.options.showSearchFilters ? this.renderSearchFiltersAccordion() : '';
    
    if (!searchFiltersHtml.trim()) {
      return '<div class="scope-entity-list-empty">No filter dimensions available</div>';
    }
    
    if (this.filterText) {
      // Check if anything matched
      const hasContent = searchFiltersHtml.includes('scope-entity-item') || 
                         searchFiltersHtml.includes('scope-filter-item') ||
                         searchFiltersHtml.includes('scope-catalog-row');
      if (!hasContent) {
        return searchFiltersHtml + `<div class="scope-entity-list-hint">No matches found. Press Enter to add "${this.escapeHtml(this.filterText)}" as a keyword.</div>`;
      }
    }
    
    return searchFiltersHtml;
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
    const allOptions = dimension.options || [];
    const isExtraction = dimension.name.toLowerCase().startsWith('extracted');

    const nameMatches = filterLower && displayName.toLowerCase().includes(filterLower);

    const filteredOptions = allOptions.filter(opt => {
      if (this.isDimValueSelected(dimId, opt)) return false;
      if (!filterLower || nameMatches) return true;
      return opt.toLowerCase().includes(filterLower);
    });

    const totalFiltered = filteredOptions.length;
    if (totalFiltered === 0 && !nameMatches && !this.dimHasSelections(dimId)) return null;

    const isTruncated = totalFiltered > VISIBLE_LIMIT;
    const visibleOptions = isTruncated ? filteredOptions.slice(0, VISIBLE_LIMIT) : filteredOptions;
    const hasValueMatches = filterLower && !nameMatches && totalFiltered > 0;
    const isExpanded = this.expandedSections.has(accordionKey) || hasValueMatches;

    const extractionColorClass = isExtraction ? getExtractionColorClass(dimension.name) : '';

    const renderRowLabel = (opt) => {
      if (isExtraction) {
        return `<span class="scope-catalog-row-label scope-catalog-row-label--extraction">
          <span class="extraction-chip extraction-chip--ghost ${extractionColorClass}">
            <span class="extraction-chip-icon">${getExtractionIcon(dimension.name, 12)}</span>
            <span class="extraction-chip-label">${this.escapeHtml(opt)}</span>
          </span>
        </span>`;
      }
      return `<span class="scope-catalog-row-label">${this.escapeHtml(opt)}</span>`;
    };

    // Compute filtered document count from docMapping when available
    const isFiltering = filterLower && !nameMatches;
    let filteredDocCount = dimension.documentCount || 0;
    if (isFiltering && dimension.docMapping) {
      const docIdSet = new Set();
      for (const opt of filteredOptions) {
        (dimension.docMapping[opt] || []).forEach(id => docIdSet.add(id));
      }
      filteredDocCount = docIdSet.size;
    }

    const totalCount = allOptions.length;
    const countLabel = isFiltering
      ? `${totalFiltered} of ${totalCount} value${totalCount !== 1 ? 's' : ''}`
      : `${totalCount} value${totalCount !== 1 ? 's' : ''}`;
    const tooltipText = isFiltering
      ? `${totalFiltered} matching value${totalFiltered !== 1 ? 's' : ''} of ${totalCount} total · ${filteredDocCount} document${filteredDocCount !== 1 ? 's' : ''}`
      : `${totalCount} filterable value${totalCount !== 1 ? 's' : ''} indexing ${dimension.documentCount || 0} document${(dimension.documentCount || 0) !== 1 ? 's' : ''}`;

    return {
      sortName: displayName,
      totalOptions: allOptions.length,
      filteredValues: totalFiltered,
      filteredDocCount,
      html: `
        <div class="scope-entity-group scope-nested-group ${isExpanded ? 'expanded' : ''}" data-type="${accordionKey}">
          <button class="scope-entity-group-header" data-type="${accordionKey}">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">${this.escapeHtml(displayName)}</span>
            <span class="scope-group-count" data-tooltip="${tooltipText}">${countLabel}</span>
          </button>
          <div class="scope-entity-group-items">
            ${visibleOptions.length > 0 ? visibleOptions.map(opt => `
              <div class="scope-catalog-row"
                   data-dimension-id="${this.escapeHtml(dimId)}"
                   data-value="${this.escapeHtml(opt)}">
                ${renderRowLabel(opt)}
                <span class="scope-catalog-row-actions">
                  <button class="scope-catalog-or scope-filter-apply" title="Include (OR)" data-dimension-id="${this.escapeHtml(dimId)}" data-value="${this.escapeHtml(opt)}"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v10M3 8h10"/></svg> Add</button>
                  <button class="scope-catalog-not scope-filter-apply scope-filter-exclude" title="Exclude (NOT)" data-dimension-id="${this.escapeHtml(dimId)}" data-value="${this.escapeHtml(opt)}"><svg viewBox="0 0 16 16" width="12" height="12" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.97853 13.2672C0.746592 11.86 0 10.0172 0 8C0 3.58172 3.58172 0 8 0C10.0172 0 11.86 0.746592 13.2672 1.97853L13.2797 1.96602L14.034 2.72026L14.0215 2.73277C15.2534 4.13997 16 5.9828 16 8C16 12.4183 12.4183 16 8 16C5.9828 16 4.13997 15.2534 2.73277 14.0215L2.72027 14.034L2.34925 13.6629C2.34518 13.6589 2.34111 13.6548 2.33705 13.6508L1.96602 13.2797L1.97853 13.2672ZM3.48895 13.2653C4.7015 14.3051 6.27739 14.9333 8 14.9333C11.8292 14.9333 14.9333 11.8292 14.9333 8C14.9333 6.27739 14.3051 4.7015 13.2653 3.48895L3.48895 13.2653ZM12.511 2.7347L2.7347 12.511C1.69488 11.2985 1.06667 9.72261 1.06667 8C1.06667 4.17083 4.17083 1.06667 8 1.06667C9.72261 1.06667 11.2985 1.69488 12.511 2.7347Z" fill="currentColor"/></svg> Exclude</button>
                </span>
              </div>
            `).join('') : `<div class="scope-entity-group-empty">No matching options</div>`}
            ${isTruncated ? `<div class="scope-entity-group-hint">Showing ${VISIBLE_LIMIT} of ${totalFiltered} — type to narrow results</div>` : ''}
          </div>
        </div>
      `
    };
  }

  /**
   * Render a date-type catalog dimension as an accordion with an inline histogram date picker.
   * @param {Object} dimension - catalog dimension object with dateHistogram
   * @param {string} displayName - name to show in the header
   * @param {string} filterLower - lowercase search text
   * @returns {{ sortName: string, html: string } | null}
   */
  renderDateDimensionAccordion(dimension, displayName, filterLower) {
    const dimId = dimension.id;
    const accordionKey = 'catalog_' + dimId;

    if (filterLower && !displayName.toLowerCase().includes(filterLower)) return null;

    const isExpanded = this.expandedSections.has(accordionKey) || this.dimHasSelections(dimId);
    const currentRange = this.scope.metadataFilters[dimId]?.dateRange;
    const rangeLabel = currentRange?.start && currentRange?.end
      ? `${formatDate(currentRange.start)} – ${formatDate(currentRange.end)}`
      : 'All time';

    return {
      sortName: displayName,
      totalOptions: 0,
      html: `
        <div class="scope-entity-group scope-nested-group ${isExpanded ? 'expanded' : ''}" data-type="${accordionKey}">
          <button class="scope-entity-group-header" data-type="${accordionKey}">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">${this.escapeHtml(displayName)}</span>
            <span class="scope-group-count">${this.escapeHtml(rangeLabel)}</span>
          </button>
          <div class="scope-entity-group-items">
            <div class="scope-date-histogram-wrapper">
              <div class="scope-date-histogram" data-dimension-id="${this.escapeHtml(dimId)}"></div>
              <div class="scope-date-range-footer">
                <span class="scope-date-range-label" data-dimension-id="${this.escapeHtml(dimId)}">${this.escapeHtml(rangeLabel)}</span>
                ${currentRange?.start ? `<button class="scope-date-clear" data-dimension-id="${this.escapeHtml(dimId)}">Clear</button>` : ''}
              </div>
            </div>
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
      const hasSearchMatches = filterLower && matchedSavedFilters.length > 0;
      const isExpanded = this.expandedSections.has('searchFilters') || hasSearchMatches;
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

      const countText = filterLower && matchedSavedFilters.length !== allSavedFilters.length
        ? `${matchedSavedFilters.length} of ${allSavedFilters.length} saved filter${allSavedFilters.length !== 1 ? 's' : ''}`
        : `${allSavedFilters.length} saved filter${allSavedFilters.length !== 1 ? 's' : ''}`;

      html += `
        <div class="scope-entity-group scope-filter-group ${isExpanded ? 'expanded' : ''}" data-type="searchFilters">
          <button class="scope-entity-group-header" data-type="searchFilters">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">Saved Filters</span>
            <span class="scope-group-count">${countText}</span>
          </button>
          <div class="scope-entity-group-items">
            ${savedContent}
          </div>
        </div>
      `;
    }

    // ── 2 & 3. Extractions and Metadata from filterCatalog ─────────
    const catalog = this.getCatalog();
    if (!catalog || catalog.length === 0) return html;

    const extractionItems = [];
    const metadataItems = [];
    let extractionTotalValues = 0;
    let extractionTotalDocs = 0;
    let extractionFilteredValues = 0;
    let extractionFilteredDocs = 0;

    for (const dimension of catalog) {
      const isExtraction = dimension.name.toLowerCase().startsWith('extracted');
      // Strip "Extracted " prefix for extraction dimensions
      const displayName = isExtraction
        ? dimension.name.replace(/^Extracted\s+/i, '')
        : dimension.name;

      if (isExtraction) {
        extractionTotalValues += (dimension.options || []).length;
        extractionTotalDocs += (dimension.documentCount || 0);
      }

      // Route date dimensions to the histogram renderer
      const item = dimension.type === 'date'
        ? this.renderDateDimensionAccordion(dimension, displayName, filterLower)
        : this.renderCatalogDimensionAccordion(dimension, displayName, filterLower);
      if (!item) continue;

      if (isExtraction) {
        extractionFilteredValues += (item.filteredValues ?? item.totalOptions ?? 0);
        extractionFilteredDocs += (item.filteredDocCount ?? 0);
        extractionItems.push(item);
      } else {
        metadataItems.push(item);
      }
    }

    // Add Document Types into the Metadata section
    const documentTypes = this.getDocumentTypes();
    const selectedDocTypes = this.scope.documentTypes || [];
    const filteredDocTypes = documentTypes.filter(dt => {
      if (selectedDocTypes.includes(dt.id)) return false;
      if (!filterLower) return true;
      return dt.name.toLowerCase().includes(filterLower);
    }).sort((a, b) => a.name.localeCompare(b.name));

    if (filteredDocTypes.length > 0 || selectedDocTypes.length < documentTypes.length) {
      const isExpanded = this.expandedSections.has('documentTypes');
      const filteredDocTypeIds = filteredDocTypes.map(dt => dt.id);
      const dtTotal = documentTypes.length;
      const dtFiltered = filteredDocTypes.length;
      const dtCountLabel = filterLower
        ? `${dtFiltered} of ${dtTotal} value${dtTotal !== 1 ? 's' : ''}`
        : `${dtTotal} value${dtTotal !== 1 ? 's' : ''}`;
      metadataItems.push({
        sortName: 'Document Types',
        html: `
          <div class="scope-entity-group scope-nested-group ${isExpanded ? 'expanded' : ''}" data-type="documentTypes">
            <button class="scope-entity-group-header" data-type="documentTypes">
              <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 6l4 4 4-4"/>
              </svg>
              <span class="scope-group-label">Document Types</span>
              <span class="scope-group-count">${dtCountLabel}</span>
              ${filteredDocTypes.length >= 1 ? `<span class="scope-add-all" data-scope-key="documentTypes" data-ids="${filteredDocTypeIds.join(',')}">${filteredDocTypes.length === 1 ? 'Add' : 'Add all'}</span>` : ''}
            </button>
            <div class="scope-entity-group-items">
              ${filteredDocTypes.length > 0 ? filteredDocTypes.map(dt => `
                <button class="scope-entity-item scope-docattr-item"
                        data-id="${dt.id}"
                        data-scope-key="documentTypes"
                        data-type="documentType">
                  <span class="scope-entity-item-icon">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/>
                      <path d="M10 2v3h3"/>
                    </svg>
                  </span>
                  <span class="scope-entity-item-name">${this.escapeHtml(dt.name)}</span>
                </button>
              `).join('') : `<div class="scope-entity-group-empty">No matching document types</div>`}
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
      const hasChildValueMatches = filterLower && extractionItems.some(item => item.html.includes('class="scope-entity-group scope-nested-group expanded"'));
      const isExpanded = this.expandedSections.has('extractionFilters') || hasChildValueMatches;

      const isFiltering = !!filterLower;
      const extCountLabel = isFiltering
        ? `${extractionFilteredValues} of ${extractionTotalValues} value${extractionTotalValues !== 1 ? 's' : ''}`
        : `${extractionTotalValues} value${extractionTotalValues !== 1 ? 's' : ''}`;
      const extTooltip = isFiltering
        ? `${extractionFilteredValues} matching value${extractionFilteredValues !== 1 ? 's' : ''} of ${extractionTotalValues} total · ${extractionFilteredDocs} document${extractionFilteredDocs !== 1 ? 's' : ''}`
        : `${extractionTotalValues} filterable value${extractionTotalValues !== 1 ? 's' : ''} indexing ${extractionTotalDocs} document${extractionTotalDocs !== 1 ? 's' : ''}`;

      html += `
        <div class="scope-entity-group scope-filter-group ${isExpanded ? 'expanded' : ''}" data-type="extractionFilters">
          <button class="scope-entity-group-header" data-type="extractionFilters">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">Extractions</span>
            <span class="scope-group-count" data-tooltip="${extTooltip}">${extCountLabel}</span>
          </button>
          <div class="scope-entity-group-items">
            ${extractionItems.map(item => item.html).join('')}
          </div>
        </div>
      `;
    }

    // Render Metadata items directly at top level (no parent wrapper)
    if (metadataItems.length > 0) {
      html += metadataItems.map(item => item.html).join('');
    }

    return html;
  }

  /**
   * Get the total item count for a filter
   */
  getFilterItemCount(filter) {
    return _getScopeItemCount(filter.scope);
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
    for (const [dimId, filterVal] of Object.entries(scope.metadataFilters || {})) {
      const dimension = catalog.find(d => d.id === dimId);
      const dimName = dimension?.name || dimId;
      // Handle date range entries
      if (filterVal?.dateRange?.start && filterVal?.dateRange?.end) {
        const rangeText = `${formatDate(filterVal.dateRange.start)} – ${formatDate(filterVal.dateRange.end)}`;
        contents.push({ label: dimName, items: [rangeText] });
        continue;
      }
      const include = Array.isArray(filterVal) ? filterVal : (filterVal?.include || []);
      const exclude = Array.isArray(filterVal) ? [] : (filterVal?.exclude || []);
      if (include.length > 0) {
        contents.push({ label: dimName, items: [...include] });
      }
      if (exclude.length > 0) {
        contents.push({ label: `NOT ${dimName}`, items: [...exclude] });
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
    return _getScopeItemCount(this.scope);
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

    // When expanding a date histogram accordion, the container transitions from
    // display:none to visible. Re-render the histogram after layout completes.
    if (this.expandedSections.has(type) && type.startsWith('catalog_')) {
      const dimId = type.replace('catalog_', '');
      const instance = this.dateHistogramInstances[dimId];
      if (instance) {
        requestAnimationFrame(() => instance.resize());
      }
    }
  }

  _showTooltip(target) {
    this._hideTooltip();
    const text = target.getAttribute('data-tooltip');
    if (!text) return;
    const el = document.createElement('div');
    el.className = 'data-tooltip-popup';
    el.textContent = text;
    document.body.appendChild(el);
    this._tooltipEl = el;

    const rect = target.getBoundingClientRect();
    const pad = 4;
    let left = rect.left + rect.width / 2 - el.offsetWidth / 2;
    left = Math.max(pad, Math.min(left, window.innerWidth - el.offsetWidth - pad));
    el.style.left = `${left}px`;
    el.style.top = `${rect.bottom + 6}px`;
  }

  _hideTooltip() {
    if (this._tooltipEl) {
      this._tooltipEl.remove();
      this._tooltipEl = null;
    }
  }

  /**
   * Initialize TimeRangeFilter instances for all date-type histogram containers in the DOM.
   * Must be called after the entity list HTML is in the document.
   */
  initDateHistograms() {
    const containers = this.container.querySelectorAll('.scope-date-histogram[data-dimension-id]');
    const catalog = this.getCatalog();

    for (const el of containers) {
      const dimId = el.dataset.dimensionId;
      const dimension = catalog.find(d => d.id === dimId);
      if (!dimension?.dateHistogram) continue;

      const filter = new TimeRangeFilter(el, {
        height: 56,
        margin: { top: 2, right: 8, bottom: 16, left: 8 },
        barColor: 'var(--accent-primary)',
        barOpacity: 0.5,
        onChange: (range) => {
          if (range) {
            this.scope.metadataFilters[dimId] = {
              dateRange: { start: range.start.toISOString(), end: range.end.toISOString() }
            };
          } else {
            delete this.scope.metadataFilters[dimId];
          }
          this.refreshChips();
          this.updateDateRangeUI(dimId);
          this.notifyChange();
        }
      });

      filter.update(dimension.dateHistogram);

      // If the container is currently visible (accordion expanded), the render
      // may still have gotten 0 width if layout hasn't flushed. Schedule a
      // follow-up resize so it draws once the browser has laid out the element.
      requestAnimationFrame(() => {
        if (el.clientWidth > 0) {
          filter.resize();
        }
      });

      // Restore previous selection
      const saved = this.scope.metadataFilters[dimId]?.dateRange;
      if (saved?.start && saved?.end) {
        requestAnimationFrame(() => filter.setSelection(saved.start, saved.end));
      }

      this.dateHistogramInstances[dimId] = filter;
    }
  }

  /**
   * Destroy all date histogram instances and clean up DOM references.
   */
  destroyDateHistograms() {
    for (const [dimId, instance] of Object.entries(this.dateHistogramInstances)) {
      instance.destroy();
    }
    this.dateHistogramInstances = {};
  }

  /**
   * Update the date range label and clear button for a dimension after brush change.
   */
  updateDateRangeUI(dimId) {
    const range = this.scope.metadataFilters[dimId]?.dateRange;
    const label = this.container.querySelector(`.scope-date-range-label[data-dimension-id="${dimId}"]`);
    const countEl = this.container.querySelector(`.scope-entity-group[data-type="catalog_${dimId}"] .scope-group-count`);
    if (label) {
      label.textContent = range?.start ? `${formatDate(range.start)} – ${formatDate(range.end)}` : 'All time';
    }
    if (countEl) {
      countEl.textContent = range?.start ? `${formatDate(range.start)} – ${formatDate(range.end)}` : 'All time';
    }
    // Toggle clear button visibility
    const footer = label?.closest('.scope-date-range-footer');
    if (footer) {
      const existing = footer.querySelector('.scope-date-clear');
      if (range?.start && !existing) {
        const btn = document.createElement('button');
        btn.className = 'scope-date-clear';
        btn.dataset.dimensionId = dimId;
        btn.textContent = 'Clear';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.clearDateSelection(dimId);
        });
        footer.appendChild(btn);
      } else if (!range?.start && existing) {
        existing.remove();
      }
    }
  }

  /**
   * Clear the date range selection for a dimension.
   */
  clearDateSelection(dimId) {
    const instance = this.dateHistogramInstances[dimId];
    if (instance) instance.clearSelection();
    delete this.scope.metadataFilters[dimId];
    this.refreshChips();
    this.updateDateRangeUI(dimId);
    this.notifyChange();
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

    // Show/hide logic toggle based on item count
    const logicToggle = this.container.querySelector('#scope-logic-toggle');
    if (logicToggle) {
      logicToggle.classList.toggle('hidden', this.getScopeItemCount() < 2);
    }
  }

  /**
   * Refresh the entity list
   */
  refreshEntityList() {
    this.destroyDateHistograms();
    const listContainer = this.container.querySelector('.scope-entity-list');
    if (listContainer) {
      listContainer.innerHTML = this.renderEntityGroups();
    }
    this.initDateHistograms();
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
      const clearBtn = this.container.querySelector('.scope-search-clear');
      searchInput.addEventListener('input', (e) => {
        this.filterText = e.target.value;
        clearBtn?.classList.toggle('hidden', !this.filterText);
        this.refreshEntityList();
      });
      clearBtn?.addEventListener('click', () => {
        this.filterText = '';
        searchInput.value = '';
        clearBtn.classList.add('hidden');
        searchInput.focus();
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
      searchInput.focus();
    }
    
    // Save filter button
    const saveBtn = this.container.querySelector('.scope-save-filter-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.openSaveDialog());
    }

    // Logic toggle (AND/OR)
    const logicToggle = this.container.querySelector('#scope-logic-toggle');
    if (logicToggle) {
      logicToggle.addEventListener('click', (e) => {
        const btn = e.target.closest('.scope-logic-btn');
        if (!btn) return;
        this.scope.logic = btn.dataset.logic;
        logicToggle.querySelectorAll('.scope-logic-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.logic === this.scope.logic);
        });
        this.notifyChange();
      });
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
            const dimId = chip.dataset.dimensionId;
            // Handle date range chip removal
            if (chip.dataset.filterMode === 'dateRange') {
              this.clearDateSelection(dimId);
              this.refreshChips();
              this.refreshEntityList();
              this.notifyChange();
              return;
            }
            const val = chip.dataset.value;
            const entry = this.scope.metadataFilters[dimId];
            if (entry) {
              if (Array.isArray(entry)) {
                this.scope.metadataFilters[dimId] = entry.filter(v => v !== val);
                if (this.scope.metadataFilters[dimId].length === 0) delete this.scope.metadataFilters[dimId];
              } else {
                entry.include = (entry.include || []).filter(v => v !== val);
                entry.exclude = (entry.exclude || []).filter(v => v !== val);
                if (entry.include.length === 0 && entry.exclude.length === 0) delete this.scope.metadataFilters[dimId];
              }
            }
          } else if (chip.dataset.id && chip.dataset.scopeKey) {
            const scopeKey = chip.dataset.scopeKey;
            if (this.scope[scopeKey]) {
              this.scope[scopeKey] = this.scope[scopeKey].filter(id => id !== chip.dataset.id);
            }
          }
          this.refreshChips();
          this.refreshEntityList();
          this.notifyChange();
        }
      }
    });
    
    // data-tooltip hover popup (fixed position, escapes overflow)
    this._tooltipEl = null;
    const entityList = this.container.querySelector('.scope-entity-list');
    if (entityList) {
      entityList.addEventListener('mouseenter', (e) => {
        const target = e.target.closest('[data-tooltip]');
        if (!target || !entityList.contains(target)) return;
        this._showTooltip(target);
      }, true);
      entityList.addEventListener('mouseleave', (e) => {
        const target = e.target.closest('[data-tooltip]');
        if (target) this._hideTooltip();
      }, true);
    }

    // Filter tooltip positioning
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
      // Handle date histogram clear button
      const dateClearBtn = e.target.closest('.scope-date-clear');
      if (dateClearBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.clearDateSelection(dateClearBtn.dataset.dimensionId);
        return;
      }

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
      
      // Handle catalog OR (include) button click
      const orBtn = e.target.closest('.scope-catalog-or');
      if (orBtn) {
        e.preventDefault();
        e.stopPropagation();
        const dimId = orBtn.dataset.dimensionId;
        const val = orBtn.dataset.value;
        if (dimId && val && !this.isDimValueSelected(dimId, val)) {
          this.getDimFilter(dimId).include.push(val);
          this.refreshChips();
          this.refreshEntityList();
          this.notifyChange();
        }
        return;
      }

      // Handle catalog NOT (exclude) button click
      const notBtn = e.target.closest('.scope-catalog-not');
      if (notBtn) {
        e.preventDefault();
        e.stopPropagation();
        const dimId = notBtn.dataset.dimensionId;
        const val = notBtn.dataset.value;
        if (dimId && val && !this.isDimValueSelected(dimId, val)) {
          this.getDimFilter(dimId).exclude.push(val);
          this.refreshChips();
          this.refreshEntityList();
          this.notifyChange();
        }
        return;
      }
      
      // Handle entity item click (not filter items, not catalog rows)
      const item = e.target.closest('.scope-entity-item:not(.scope-filter-item)');
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

    // Initialize date histogram pickers
    this.destroyDateHistograms();
    this.initDateHistograms();
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
    this.destroyDateHistograms();
    this._hideTooltip();
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

export default ScopeSelector;
