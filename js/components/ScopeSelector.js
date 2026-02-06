/**
 * ScopeSelector.js
 * Reusable component for selecting entities and keywords to define a scope.
 * Used by MonitorEditorModal and can be embedded in other contexts.
 * Includes saved search filter functionality and advanced boolean mode.
 */

import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { BooleanExpressionEditor } from './BooleanExpressionEditor.js';
import { BooleanParser } from '../utils/BooleanParser.js';
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
   * @param {boolean} options.showModeToggle - Whether to show simple/advanced mode toggle (default: true)
   * @param {string} options.defaultMode - Initial mode: 'simple' or 'advanced' (default: 'simple')
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      onChange: options.onChange || (() => {}),
      showSaveFilter: options.showSaveFilter !== false,
      showSearchFilters: options.showSearchFilters !== false,
      showModeToggle: options.showModeToggle !== false,
      defaultMode: options.defaultMode || 'simple'
    };
    
    // Mode state: 'simple' or 'advanced'
    this.mode = this.options.defaultMode;
    
    // Simple mode scope state
    this.scope = {
      personIds: [],
      organizationIds: [],
      factionIds: [],
      locationIds: [],
      keywords: [],
      // Document attribute filters
      documentTypes: [],
      publisherIds: [],
      authors: []
    };
    
    // Advanced mode state
    this.booleanExpression = '';
    this.entityMap = {};
    this.booleanAst = null;
    this.booleanError = null;
    
    // UI state
    this.filterText = '';
    this.expandedSections = new Set();
    
    // Dialog state
    this.saveDialogOpen = false;
    this.saveFilterName = '';
    this.confirmDialogOpen = false;
    
    // View toggle state for advanced mode: 'editor' or 'formatted'
    this.advancedView = 'editor';
    
    // BooleanExpressionEditor instance
    this.booleanEditor = null;
  }

  /**
   * Get the current scope
   * @returns {Object} The current scope object with mode information
   */
  getScope() {
    if (this.mode === 'advanced') {
      return {
        mode: 'advanced',
        booleanExpression: this.booleanExpression,
        entityMap: { ...this.entityMap }
      };
    }
    
    return {
      mode: 'simple',
      ...this.scope
    };
  }

  /**
   * Set the scope (for editing existing items)
   * @param {Object} scope - The scope to set
   */
  setScope(scope) {
    if (scope?.mode === 'advanced') {
      this.mode = 'advanced';
      this.booleanExpression = scope.booleanExpression || '';
      this.entityMap = { ...scope.entityMap };
      this.scope = { personIds: [], organizationIds: [], factionIds: [], locationIds: [], keywords: [], documentTypes: [], publisherIds: [], authors: [] };
    } else {
      this.mode = 'simple';
      this.scope = {
        personIds: [...(scope?.personIds || [])],
        organizationIds: [...(scope?.organizationIds || [])],
        factionIds: [...(scope?.factionIds || [])],
        locationIds: [...(scope?.locationIds || [])],
        keywords: [...(scope?.keywords || [])],
        // Document attribute filters
        documentTypes: [...(scope?.documentTypes || [])],
        publisherIds: [...(scope?.publisherIds || [])],
        authors: [...(scope?.authors || [])]
      };
      this.booleanExpression = '';
      this.entityMap = {};
    }
    
    // Expand sections that have items (for simple mode)
    this.expandedSections = new Set();
    if (this.scope.personIds.length > 0) this.expandedSections.add('persons');
    if (this.scope.organizationIds.length > 0) this.expandedSections.add('organizations');
    if (this.scope.factionIds.length > 0) this.expandedSections.add('factions');
    if (this.scope.locationIds.length > 0) this.expandedSections.add('locations');
    if (this.scope.documentTypes.length > 0) this.expandedSections.add('documentTypes');
    if (this.scope.publisherIds.length > 0) this.expandedSections.add('publishers');
    if (this.scope.authors.length > 0) this.expandedSections.add('authors');
    
    this.render();
  }

  /**
   * Get the current mode
   * @returns {string} 'simple' or 'advanced'
   */
  getMode() {
    return this.mode;
  }

  /**
   * Set the mode with optional confirmation
   * @param {string} newMode - 'simple' or 'advanced'
   * @param {boolean} skipConfirm - Skip confirmation dialog
   */
  setMode(newMode, skipConfirm = false) {
    if (newMode === this.mode) return;
    
    // Switching from advanced to simple requires confirmation if there's content
    if (this.mode === 'advanced' && newMode === 'simple' && this.booleanExpression && !skipConfirm) {
      this.showModeConfirmDialog();
      return;
    }
    
    // Switching from simple to advanced - convert the scope
    if (this.mode === 'simple' && newMode === 'advanced') {
      this.convertSimpleToAdvanced();
    }
    
    this.mode = newMode;
    this.render();
    this.notifyChange();
  }

  /**
   * Convert simple mode scope to advanced mode boolean expression
   */
  convertSimpleToAdvanced() {
    const allEntities = this.getAllEntities();
    const terms = [];
    
    // Build entity references and populate entityMap
    ['personIds', 'organizationIds', 'factionIds', 'locationIds'].forEach(scopeKey => {
      const ids = this.scope[scopeKey] || [];
      const typeConfig = Object.values(allEntities).find(t => t.scopeKey === scopeKey);
      
      ids.forEach(id => {
        const entity = typeConfig?.entities.find(e => e.id === id);
        if (entity) {
          const name = this.getEntityText(entity);
          // Determine entity type from scopeKey
          const type = scopeKey.replace('Ids', '').replace(/s$/, '');
          this.entityMap[id] = { name, type };
          terms.push(`@${id}`);
        }
      });
    });
    
    // Add keywords as quoted strings
    (this.scope.keywords || []).forEach(keyword => {
      terms.push(`"${keyword}"`);
    });
    
    // Join with OR (default simple mode logic)
    this.booleanExpression = terms.join(' OR ');
  }

  /**
   * Show confirmation dialog when switching from advanced to simple
   */
  showModeConfirmDialog() {
    this.confirmDialogOpen = true;
    this.render();
  }

  /**
   * Hide the mode confirmation dialog
   */
  hideModeConfirmDialog() {
    this.confirmDialogOpen = false;
    this.render();
  }

  /**
   * Confirm switching from advanced to simple mode
   */
  confirmModeSwitch() {
    this.mode = 'simple';
    this.booleanExpression = '';
    this.entityMap = {};
    this.booleanAst = null;
    this.booleanError = null;
    this.confirmDialogOpen = false;
    this.render();
    this.notifyChange();
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
    ['personIds', 'organizationIds', 'factionIds', 'locationIds'].forEach(key => {
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
    
    // Update expanded sections
    if (this.scope.personIds.length > 0) this.expandedSections.add('persons');
    if (this.scope.organizationIds.length > 0) this.expandedSections.add('organizations');
    if (this.scope.factionIds.length > 0) this.expandedSections.add('factions');
    if (this.scope.locationIds.length > 0) this.expandedSections.add('locations');
    if (this.scope.documentTypes.length > 0) this.expandedSections.add('documentTypes');
    if (this.scope.publisherIds.length > 0) this.expandedSections.add('publishers');
    if (this.scope.authors.length > 0) this.expandedSections.add('authors');
    
    this.render();
    this.options.onChange(this.scope);
  }

  /**
   * Clear the current scope
   */
  clearScope() {
    this.scope = {
      personIds: [],
      organizationIds: [],
      factionIds: [],
      locationIds: [],
      keywords: [],
      documentTypes: [],
      publisherIds: [],
      authors: []
    };
    this.expandedSections = new Set();
    this.render();
    this.options.onChange(this.scope);
  }

  /**
   * Check if the scope has any items
   * @returns {boolean}
   */
  hasScope() {
    if (this.mode === 'advanced') {
      return this.booleanExpression.trim().length > 0;
    }
    return Object.keys(this.scope)
      .some(k => Array.isArray(this.scope[k]) && this.scope[k].length > 0);
  }

  /**
   * Get all entities organized by type
   */
  getAllEntities() {
    return {
      persons: { label: 'Persons', scopeKey: 'personIds', entities: DataService.getPersons() },
      organizations: { label: 'Organizations', scopeKey: 'organizationIds', entities: DataService.getOrganizations() },
      factions: { label: 'Factions', scopeKey: 'factionIds', entities: DataService.getFactions() },
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

    // Destroy existing boolean editor if switching modes
    if (this.booleanEditor && this.mode !== 'advanced') {
      this.booleanEditor.destroy();
      this.booleanEditor = null;
    }

    this.container.innerHTML = `
      <div class="scope-selector">
        ${this.options.showModeToggle ? `
          <!-- Mode Toggle Row -->
          <div class="scope-mode-toggle-row">
            <div class="scope-mode-toggle">
              <button class="scope-mode-btn ${this.mode === 'simple' ? 'active' : ''}" data-mode="simple">
                Simple
              </button>
              <button class="scope-mode-btn ${this.mode === 'advanced' ? 'active' : ''}" data-mode="advanced">
                Advanced
              </button>
            </div>
            
            ${this.mode === 'advanced' ? `
              <button class="scope-tree-toggle ${this.advancedView === 'formatted' ? 'active' : ''}" title="Toggle tree view">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 2v12M4 8h8M4 13h8"/>
                </svg>
                <span>Format</span>
              </button>
            ` : ''}
          </div>
        ` : ''}
        
        <!-- Simple Mode Panel -->
        <div class="scope-mode-panel ${this.mode === 'simple' ? 'active' : ''}" data-panel="simple">
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
        
        <!-- Advanced Mode Panel -->
        <div class="scope-mode-panel ${this.mode === 'advanced' ? 'active' : ''}" data-panel="advanced">
          <!-- Editor View -->
          <div class="scope-boolean-editor-container ${this.advancedView === 'editor' ? '' : 'hidden'}"></div>
          
          <!-- Formatted View -->
          <div class="boolean-tree-panel ${this.advancedView === 'formatted' ? 'visible' : ''}">
            <div class="boolean-tree">
              ${this.renderBooleanTree()}
            </div>
          </div>
          
          ${this.options.showSaveFilter ? `
            <!-- Save Button for Advanced Mode -->
            <div class="scope-advanced-actions">
              <button 
                class="btn btn-secondary btn-small scope-save-filter-btn-advanced" 
                ${this.booleanExpression?.trim() ? '' : 'disabled'}
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 2a1 1 0 00-1 1v11.5l6-3 6 3V3a1 1 0 00-1-1H3z"/>
                  <path d="M8 5v4M6 7h4" stroke-linecap="round"/>
                </svg>
                Save as Filter
              </button>
            </div>
          ` : ''}
          
          <!-- Entity Browser for Advanced Mode (only in editor view) -->
          <div class="scope-entity-list scope-advanced-entity-list ${this.advancedView === 'editor' ? '' : 'hidden'}" style="margin-top: var(--space-md);">
            <div class="scope-entity-list-header" style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-xs);">
              Click to insert entity into expression
            </div>
            ${this.renderEntityGroupsForAdvanced()}
          </div>
        </div>
      </div>
      
      ${this.saveDialogOpen ? this.renderSaveDialog() : ''}
      ${this.confirmDialogOpen ? this.renderModeConfirmDialog() : ''}
    `;

    this.attachEventListeners();
    
    // Initialize boolean editor for advanced mode
    if (this.mode === 'advanced') {
      this.initBooleanEditor();
    }
  }

  /**
   * Initialize the boolean expression editor
   */
  initBooleanEditor() {
    const container = this.container.querySelector('.scope-boolean-editor-container');
    if (!container) return;
    
    this.booleanEditor = new BooleanExpressionEditor(container, {
      placeholder: 'Type @ to insert entity, "text" for keywords, use AND OR NOT...',
      onChange: (expression, ast, error, entityMap) => {
        this.booleanExpression = expression;
        this.entityMap = entityMap;
        this.booleanAst = ast;
        this.booleanError = error;
        this.notifyChange();
        
        // Update save button state
        const saveBtn = this.container.querySelector('.scope-save-filter-btn-advanced');
        if (saveBtn) {
          saveBtn.disabled = !expression?.trim();
        }
        
        // Update formatted view if visible
        if (this.advancedView === 'formatted') {
          const treeEl = this.container.querySelector('.boolean-tree');
          if (treeEl) {
            treeEl.innerHTML = this.renderBooleanTree();
          }
        }
      }
    });
    
    // Set initial expression if any
    if (this.booleanExpression) {
      this.booleanEditor.setExpression(this.booleanExpression, this.entityMap);
    }
  }

  /**
   * Render the boolean expression as a tree
   */
  renderBooleanTree() {
    if (!this.booleanAst) {
      if (this.booleanExpression?.trim()) {
        // Try to parse the expression
        const parser = new BooleanParser();
        const { ast, error } = parser.parse(this.booleanExpression);
        if (ast) {
          this.booleanAst = ast;
        } else {
          return `<div class="boolean-tree-empty" style="color: var(--accent-danger);">
            ${this.escapeHtml(error?.message || 'Invalid expression')}
          </div>`;
        }
      } else {
        return '<div class="boolean-tree-empty">Enter an expression to see its structure</div>';
      }
    }
    
    return this.renderTreeNode(this.booleanAst, true);
  }

  /**
   * Render a single AST node as HTML
   */
  renderTreeNode(node, isRoot = false) {
    if (!node) return '';
    
    const rootClass = isRoot ? 'tree-root' : '';
    
    switch (node.type) {
      case 'TERM':
        // Show quotes only for quoted terms
        const termDisplay = node.quoted 
          ? `"${this.escapeHtml(node.value)}"` 
          : this.escapeHtml(node.value);
        return `<div class="tree-node ${rootClass}">
          <span class="node-term">${termDisplay}</span>
        </div>`;
      
      case 'ENTITY':
        const entityInfo = this.entityMap[node.id];
        const displayName = entityInfo?.name || node.id;
        return `<div class="tree-node ${rootClass}">
          <span class="node-entity">@${this.escapeHtml(displayName)}</span>
        </div>`;
      
      case 'NOT':
        return `<div class="tree-node ${rootClass}">
          <span class="operator-badge operator-not">NOT</span>
          ${this.renderTreeNode(node.operand, false)}
        </div>`;
      
      case 'AND':
        const andChildren = node.children.map(child => this.renderTreeNode(child, false)).join('');
        return `<div class="tree-node ${rootClass}">
          <span class="operator-badge operator-and">AND</span>
          ${andChildren}
        </div>`;
      
      case 'OR':
        const orChildren = node.children.map(child => this.renderTreeNode(child, false)).join('');
        return `<div class="tree-node ${rootClass}">
          <span class="operator-badge operator-or">OR</span>
          ${orChildren}
        </div>`;
      
      default:
        return '';
    }
  }

  /**
   * Render entity groups for advanced mode (click to insert)
   */
  renderEntityGroupsForAdvanced() {
    const allEntities = this.getAllEntities();
    const filterLower = this.filterText.toLowerCase();
    
    // Render search filters accordion first (if enabled)
    const searchFiltersHtml = this.options.showSearchFilters ? this.renderSearchFiltersAccordionAdvanced() : '';
    
    const groups = Object.entries(allEntities).map(([type, { label, scopeKey, entities }]) => {
      // Filter entities by search text
      const filteredEntities = entities.filter(entity => {
        if (!filterLower) return true;
        return this.getEntityText(entity).toLowerCase().includes(filterLower);
      });
      
      // Sort alphabetically
      filteredEntities.sort((a, b) => 
        this.getEntityText(a).localeCompare(this.getEntityText(b))
      );
      
      if (filteredEntities.length === 0 && filterLower) {
        return '';
      }
      
      const isExpanded = this.expandedSections.has(type);
      const matchCount = filteredEntities.length;
      
      // Determine entity type for chips
      const entityType = scopeKey.replace('Ids', '').replace(/s$/, '');
      
      return `
        <div class="scope-entity-group ${isExpanded ? 'expanded' : ''}" data-type="${type}">
          <button class="scope-entity-group-header" data-type="${type}">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">${label}</span>
            <span class="scope-group-count">${matchCount}</span>
          </button>
          <div class="scope-entity-group-items">
            ${filteredEntities.length > 0 ? filteredEntities.map(entity => `
              <button class="scope-entity-item scope-entity-item-advanced" 
                      data-id="${entity.id}" 
                      data-name="${this.escapeHtml(this.getEntityText(entity))}"
                      data-type="${entityType}">
                <span class="scope-entity-item-icon">${getEntityIcon(entityType, 14)}</span>
                <span class="scope-entity-item-name">${this.escapeHtml(this.getEntityText(entity))}</span>
              </button>
            `).join('') : `<div class="scope-entity-group-empty">No matching ${label.toLowerCase()}</div>`}
          </div>
        </div>
      `;
    }).join('');
    
    return searchFiltersHtml + groups;
  }

  /**
   * Render search filters accordion for advanced mode
   */
  renderSearchFiltersAccordionAdvanced() {
    const allFilters = dataStore.data.searchFilters || [];
    const isExpanded = this.expandedSections.has('searchFilters');
    
    if (allFilters.length === 0) return '';
    
    const filtersContent = allFilters.map(filter => {
      const itemCount = this.getFilterItemCount(filter);
      return `
        <button class="scope-entity-item scope-filter-item-advanced" data-filter-id="${filter.id}">
          <span class="scope-filter-icon">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M1 2h14l-5 6v5l-4 2V8L1 2z"/>
            </svg>
          </span>
          <span class="scope-entity-item-name">${this.escapeHtml(filter.name)}</span>
          <span class="scope-filter-count">${itemCount} item${itemCount !== 1 ? 's' : ''}</span>
        </button>
      `;
    }).join('');
    
    return `
      <div class="scope-entity-group scope-filter-group ${isExpanded ? 'expanded' : ''}" data-type="searchFilters">
        <button class="scope-entity-group-header" data-type="searchFilters">
          <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 6l4 4 4-4"/>
          </svg>
          <span class="scope-group-label">Search Filters</span>
          <span class="scope-group-count">${allFilters.length} saved</span>
        </button>
        <div class="scope-entity-group-items">
          ${filtersContent}
        </div>
      </div>
    `;
  }

  /**
   * Render the mode confirmation dialog
   */
  renderModeConfirmDialog() {
    return `
      <div class="scope-mode-confirm-overlay visible">
        <div class="scope-mode-confirm-dialog">
          <h4>Switch to Simple Mode?</h4>
          <p>This will reset any work you've done in Advanced mode. Your boolean expression will be cleared.</p>
          <div class="scope-mode-confirm-actions">
            <button class="btn btn-secondary scope-confirm-cancel">Cancel</button>
            <button class="btn btn-primary scope-confirm-switch">Switch to Simple</button>
          </div>
        </div>
      </div>
    `;
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
    
    const groups = Object.entries(allEntities).map(([type, { label, scopeKey, entities }]) => {
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
   * Render document attribute filter groups (document types, publishers, authors)
   */
  renderDocumentAttributeGroups() {
    const filterLower = this.filterText.toLowerCase();
    let html = '';
    
    // Document Types section
    const documentTypes = this.getDocumentTypes();
    const selectedDocTypes = this.scope.documentTypes || [];
    const filteredDocTypes = documentTypes.filter(dt => {
      if (selectedDocTypes.includes(dt.id)) return false;
      if (!filterLower) return true;
      return dt.name.toLowerCase().includes(filterLower);
    });
    
    if (filteredDocTypes.length > 0 || selectedDocTypes.length < documentTypes.length) {
      const isExpanded = this.expandedSections.has('documentTypes');
      const filteredDocTypeIds = filteredDocTypes.map(dt => dt.id);
      html += `
        <div class="scope-entity-group ${isExpanded ? 'expanded' : ''}" data-type="documentTypes">
          <button class="scope-entity-group-header" data-type="documentTypes">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">Document Types</span>
            <span class="scope-group-count">${filteredDocTypes.length}</span>
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
      `;
    }
    
    // Publishers section
    const publishers = this.getPublishers();
    const selectedPublisherIds = this.scope.publisherIds || [];
    const filteredPublishers = publishers.filter(pub => {
      if (selectedPublisherIds.includes(pub.id)) return false;
      if (!filterLower) return true;
      return pub.name.toLowerCase().includes(filterLower);
    });
    
    if (filteredPublishers.length > 0 || selectedPublisherIds.length < publishers.length) {
      const isExpanded = this.expandedSections.has('publishers');
      const filteredPublisherIds = filteredPublishers.map(pub => pub.id);
      html += `
        <div class="scope-entity-group ${isExpanded ? 'expanded' : ''}" data-type="publishers">
          <button class="scope-entity-group-header" data-type="publishers">
            <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6l4 4 4-4"/>
            </svg>
            <span class="scope-group-label">Publishers</span>
            <span class="scope-group-count">${filteredPublishers.length}</span>
            ${filteredPublishers.length >= 1 ? `<span class="scope-add-all" data-scope-key="publisherIds" data-ids="${filteredPublisherIds.join(',')}">${filteredPublishers.length === 1 ? 'Add' : 'Add all'}</span>` : ''}
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
      `;
    }
    
    // Authors section
    const authors = this.getAuthors();
    const selectedAuthors = this.scope.authors || [];
    const filteredAuthors = authors.filter(author => {
      if (selectedAuthors.includes(author.id)) return false;
      if (!filterLower) return true;
      return author.name.toLowerCase().includes(filterLower);
    });
    
    if (filteredAuthors.length > 0 || selectedAuthors.length < authors.length) {
      const isExpanded = this.expandedSections.has('authors');
      const filteredAuthorIds = filteredAuthors.map(author => author.id);
      html += `
        <div class="scope-entity-group ${isExpanded ? 'expanded' : ''}" data-type="authors">
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
   * Render the Search Filters accordion
   */
  renderSearchFiltersAccordion() {
    const allFilters = dataStore.data.searchFilters || [];
    const isExpanded = this.expandedSections.has('searchFilters');
    
    // Filter search filters by search text
    const filters = allFilters.filter(filter => this.filterMatchesSearch(filter, this.filterText));
    
    const filtersContent = filters.length > 0 
      ? filters.map(filter => {
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
      : (allFilters.length > 0 
          ? `<div class="scope-entity-group-empty">No matching filters</div>`
          : `<div class="scope-entity-group-empty">No saved filters yet</div>`);
    
    // Show match count when filtering
    const countText = this.filterText 
      ? `${filters.length} match${filters.length !== 1 ? 'es' : ''}`
      : `${allFilters.length} saved`;
    
    return `
      <div class="scope-entity-group scope-filter-group ${isExpanded ? 'expanded' : ''}" data-type="searchFilters">
        <button class="scope-entity-group-header" data-type="searchFilters">
          <svg class="scope-group-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 6l4 4 4-4"/>
          </svg>
          <span class="scope-group-label">Search Filters</span>
          <span class="scope-group-count">${countText}</span>
        </button>
        <div class="scope-entity-group-items">
          ${filtersContent}
        </div>
      </div>
    `;
  }

  /**
   * Get the total item count for a filter
   */
  getFilterItemCount(filter) {
    const scope = filter.scope || {};
    return (scope.personIds?.length || 0) +
           (scope.organizationIds?.length || 0) +
           (scope.factionIds?.length || 0) +
           (scope.locationIds?.length || 0) +
           (scope.keywords?.length || 0) +
           (scope.documentTypes?.length || 0) +
           (scope.publisherIds?.length || 0) +
           (scope.authors?.length || 0);
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
      factionIds: 'factions',
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
    if (this.mode === 'advanced') {
      // Count entities and terms in the boolean expression
      if (this.booleanAst) {
        const terms = BooleanParser.extractTerms(this.booleanAst);
        return terms.entityIds.length + terms.keywords.length;
      }
      return this.booleanExpression ? 1 : 0;
    }
    return (this.scope.personIds?.length || 0) +
           (this.scope.organizationIds?.length || 0) +
           (this.scope.factionIds?.length || 0) +
           (this.scope.locationIds?.length || 0) +
           (this.scope.keywords?.length || 0) +
           (this.scope.documentTypes?.length || 0) +
           (this.scope.publisherIds?.length || 0) +
           (this.scope.authors?.length || 0);
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
    
    // Create the search filter based on mode
    if (this.mode === 'advanced') {
      dataStore.createSearchFilter({
        name,
        scope: {
          mode: 'advanced',
          booleanExpression: this.booleanExpression,
          entityMap: { ...this.entityMap }
        }
      });
    } else {
      dataStore.createSearchFilter({
        name,
        scope: {
          mode: 'simple',
          personIds: [...this.scope.personIds],
          organizationIds: [...this.scope.organizationIds],
          factionIds: [...this.scope.factionIds],
          locationIds: [...this.scope.locationIds],
          keywords: [...this.scope.keywords],
          documentTypes: [...(this.scope.documentTypes || [])],
          publisherIds: [...(this.scope.publisherIds || [])],
          authors: [...(this.scope.authors || [])]
        }
      });
    }
    
    this.closeSaveDialog();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Mode toggle buttons
    this.container.querySelectorAll('.scope-mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const newMode = btn.dataset.mode;
        if (newMode && newMode !== this.mode) {
          this.setMode(newMode);
        }
      });
    });
    
    // Tree view toggle button (advanced mode)
    const treeToggle = this.container.querySelector('.scope-tree-toggle');
    if (treeToggle) {
      treeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const newView = this.advancedView === 'editor' ? 'formatted' : 'editor';
        this.advancedView = newView;
        
        // Toggle visibility of editor and tree
        const editorContainer = this.container.querySelector('.scope-boolean-editor-container');
        const treePanel = this.container.querySelector('.boolean-tree-panel');
        const entityBrowser = this.container.querySelector('.scope-advanced-entity-list');
        
        if (editorContainer) editorContainer.classList.toggle('hidden', newView === 'formatted');
        if (treePanel) {
          treePanel.classList.toggle('visible', newView === 'formatted');
          if (newView === 'formatted') {
            const treeEl = treePanel.querySelector('.boolean-tree');
            if (treeEl) {
              treeEl.innerHTML = this.renderBooleanTree();
            }
          }
        }
        if (entityBrowser) entityBrowser.classList.toggle('hidden', newView === 'formatted');
        
        // Update button state
        treeToggle.classList.toggle('active', newView === 'formatted');
      });
    }
    
    // Search input (simple mode only)
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
    
    // Save filter button (simple mode)
    const saveBtn = this.container.querySelector('.scope-save-filter-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.openSaveDialog());
    }
    
    // Save filter button (advanced mode)
    const saveBtnAdvanced = this.container.querySelector('.scope-save-filter-btn-advanced');
    if (saveBtnAdvanced) {
      saveBtnAdvanced.addEventListener('click', () => this.openSaveDialog());
    }
    
    // Chip remove clicks (simple mode)
    this.container.querySelector('.scope-chips')?.addEventListener('click', (e) => {
      const chipRemove = e.target.closest('.chip-remove');
      if (chipRemove) {
        e.preventDefault();
        const chip = chipRemove.closest('.scope-chip');
        if (chip) {
          if (chip.dataset.keyword !== undefined) {
            this.scope.keywords = this.scope.keywords.filter(k => k !== chip.dataset.keyword);
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
    
    // Filter tooltip positioning (simple mode)
    const entityList = this.container.querySelector('.scope-entity-list:not(.scope-advanced-entity-list)');
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
    
    // Entity list clicks (simple mode)
    this.container.querySelector('.scope-entity-list:not(.scope-advanced-entity-list)')?.addEventListener('click', (e) => {
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
      
      // Handle entity item click (not filter items)
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
    
    // Entity list clicks (advanced mode)
    this.container.querySelector('.scope-advanced-entity-list')?.addEventListener('click', (e) => {
      // Handle accordion header click
      const header = e.target.closest('.scope-entity-group-header');
      if (header) {
        e.preventDefault();
        this.toggleSection(header.dataset.type);
        return;
      }
      
      // Handle filter item click in advanced mode (insert as boolean terms)
      const filterItem = e.target.closest('.scope-filter-item-advanced');
      if (filterItem) {
        e.preventDefault();
        const filterId = filterItem.dataset.filterId;
        if (filterId) {
          this.insertFilterIntoBooleanEditor(filterId);
        }
        return;
      }
      
      // Handle entity item click (insert into boolean editor)
      const item = e.target.closest('.scope-entity-item-advanced');
      if (item) {
        e.preventDefault();
        const { id, name, type } = item.dataset;
        if (id && name && this.booleanEditor) {
          this.booleanEditor.insertEntityAtCursor(id, name, type);
        }
      }
    });
    
    // Mode confirmation dialog
    if (this.confirmDialogOpen) {
      const cancelBtn = this.container.querySelector('.scope-confirm-cancel');
      const confirmBtn = this.container.querySelector('.scope-confirm-switch');
      const overlay = this.container.querySelector('.scope-mode-confirm-overlay');
      
      cancelBtn?.addEventListener('click', () => this.hideModeConfirmDialog());
      confirmBtn?.addEventListener('click', () => this.confirmModeSwitch());
      overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) this.hideModeConfirmDialog();
      });
    }
    
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
   * Insert a saved filter's contents into the boolean editor
   */
  insertFilterIntoBooleanEditor(filterId) {
    const filter = dataStore.findEntity('searchFilters', filterId);
    if (!filter || !this.booleanEditor) return;
    
    const filterScope = filter.scope || {};
    const allEntities = this.getAllEntities();
    
    // Build expression from filter contents
    const terms = [];
    
    ['personIds', 'organizationIds', 'factionIds', 'locationIds'].forEach(scopeKey => {
      const ids = filterScope[scopeKey] || [];
      const typeConfig = Object.values(allEntities).find(t => t.scopeKey === scopeKey);
      const entityType = scopeKey.replace('Ids', '').replace(/s$/, '');
      
      ids.forEach(id => {
        const entity = typeConfig?.entities.find(e => e.id === id);
        if (entity) {
          const name = this.getEntityText(entity);
          this.entityMap[id] = { name, type: entityType };
          terms.push(`@${id}`);
        }
      });
    });
    
    // Add keywords
    (filterScope.keywords || []).forEach(keyword => {
      terms.push(`"${keyword}"`);
    });
    
    if (terms.length === 0) return;
    
    // Insert as grouped expression
    const expression = terms.length > 1 
      ? `(${terms.join(' OR ')})` 
      : terms[0];
    
    // Append to current expression
    const current = this.booleanExpression.trim();
    if (current) {
      this.booleanExpression = `${current} AND ${expression}`;
    } else {
      this.booleanExpression = expression;
    }
    
    this.booleanEditor.setExpression(this.booleanExpression, this.entityMap);
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
    if (this.booleanEditor) {
      this.booleanEditor.destroy();
      this.booleanEditor = null;
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

export default ScopeSelector;
