/**
 * SearchView.js
 * Search documents and create a workspace with matching results
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { TimeRangeFilter } from '../components/TimeRangeFilter.js';
import { ScopeSelector } from '../components/ScopeSelector.js';
import { PageHeader } from '../utils/PageHeader.js';
import { formatDate } from '../utils/formatters.js';

export class SearchView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
    this.searchQuery = '';
    this.matchCount = 0;
    this.debounceTimer = null;
    // All repositories selected by default
    this.selectedRepositories = new Set();
    // Time range filter
    this.timeRange = null;
    this.timeRangeFilter = null;
    // ScopeSelector instance
    this.scopeSelector = null;
    // Filter panel expanded state
    this.filtersExpanded = false;
    // Classification filter (set of selected classifications, empty = all)
    this.selectedClassifications = new Set();
  }

  /**
   * Get available classification levels
   */
  getClassificationLevels() {
    return [
      { id: 'U', name: 'Unclassified', short: 'U' },
      { id: 'CUI', name: 'Controlled Unclassified', short: 'CUI' },
      { id: 'C', name: 'Confidential', short: 'C' },
      { id: 'S', name: 'Secret', short: 'S' },
      { id: 'TS', name: 'Top Secret', short: 'TS' }
    ];
  }

  /**
   * Initialize selected repositories from data
   */
  initializeRepositories() {
    const repositories = DataService.getRepositories();
    // Select all repositories by default
    this.selectedRepositories = new Set(repositories.map(r => r.id));
  }

  /**
   * Get the currently selected repository IDs as an array
   */
  getSelectedRepositoryIds() {
    return Array.from(this.selectedRepositories);
  }

  async render() {
    // Initialize repositories if not already done
    if (this.selectedRepositories.size === 0) {
      this.initializeRepositories();
    }

    // Check if we have scope from ScopeSelector (preserve during re-renders)
    const currentScope = this.scopeSelector?.getScope();
    const hasScope = currentScope && this.hasAnyScope(currentScope);
    const hasQuery = this.searchQuery.trim().length >= 2;
    const canSearch = hasScope || hasQuery;
    const scopeItemCount = hasScope ? this.getScopeItemCount(currentScope) : 0;

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Common Operating Picture', href: '#/cop' },
        'Search'
      ],
      title: 'Search',
      description: 'Search documents to create a workspace'
    });

    this.container.innerHTML = `
      ${headerHtml}
      
      <div class="content-area">
        <div class="search-page-container">
          <!-- Text Search Input -->
          <div class="search-bar-row">
            <div class="search-input-wrapper search-input-large">
              <svg viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="var(--text-muted)" stroke-width="1.5" class="search-icon">
                <circle cx="7" cy="7" r="4.5"/>
                <path d="M10.5 10.5L14 14"/>
              </svg>
              <input 
                type="text" 
                id="search-input"
                class="search-input" 
                placeholder="Search documents..." 
                value="${this.escapeHtml(this.searchQuery)}"
              />
              <button class="btn-icon search-clear-btn ${this.searchQuery ? '' : 'hidden'}" id="search-clear">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 4l8 8M12 4l-8 8"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Filters and Repositories Row -->
          <div class="search-controls-row">
            <!-- Filters Toggle Button -->
            <button class="btn btn-secondary filters-toggle-btn ${this.filtersExpanded ? 'expanded' : ''}" id="filters-toggle">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M2 4h12M4 8h8M6 12h4"/>
              </svg>
              <span>Filters</span>
              ${scopeItemCount > 0 ? `<span class="filters-badge">${scopeItemCount}</span>` : ''}
              <svg class="toggle-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M4 6l4 4 4-4"/>
              </svg>
            </button>
            
            <!-- Classification Dropdown -->
            <div class="filter-dropdown-wrapper">
              <button class="btn btn-secondary filter-dropdown-btn" id="classification-dropdown-toggle">
                <span>${this.getClassificationButtonLabel()}</span>
                <svg class="dropdown-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 6l4 4 4-4"/>
                </svg>
              </button>
              <div class="filter-dropdown-popover" id="classification-dropdown-popover">
                <div class="filter-dropdown-header">
                  <label class="dropdown-option dropdown-select-all">
                    <input type="checkbox" id="classification-select-all" ${this.areAllClassificationsSelected() ? 'checked' : ''} />
                    <span>All Classifications</span>
                  </label>
                </div>
                <div class="filter-dropdown-divider"></div>
                <div class="filter-dropdown-list">
                  ${this.renderClassificationOptions()}
                </div>
              </div>
            </div>
            
            <!-- Repositories Dropdown -->
            <div class="filter-dropdown-wrapper">
              <button class="btn btn-secondary filter-dropdown-btn" id="repo-dropdown-toggle">
                <span>${this.getRepositoryButtonLabel()}</span>
                <svg class="dropdown-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 6l4 4 4-4"/>
                </svg>
              </button>
              <div class="filter-dropdown-popover" id="repo-dropdown-popover">
                <div class="filter-dropdown-header">
                  <label class="dropdown-option dropdown-select-all">
                    <input type="checkbox" id="repo-select-all" ${this.areAllRepositoriesSelected() ? 'checked' : ''} />
                    <span>All Repositories</span>
                  </label>
                </div>
                <div class="filter-dropdown-divider"></div>
                <div class="filter-dropdown-list">
                  ${this.renderRepositoryOptions()}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Collapsible Scope Selector for Filters -->
          <div class="search-scope-section ${this.filtersExpanded ? 'expanded' : ''}" id="filters-panel">
            <div id="search-scope-selector"></div>
          </div>
          
          <!-- Selected Filters Display (shown when panel is collapsed) -->
          <div class="search-selected-filters ${!this.filtersExpanded && hasScope ? '' : 'hidden'}" id="selected-filters-display">
            ${this.renderSelectedScopeChips(currentScope)}
          </div>
          
          <div class="search-time-section">
            <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-xs);">
              <span class="text-secondary text-sm">Date Range:</span>
              <span class="text-sm" id="time-range-label">${this.timeRange ? `${formatDate(this.timeRange.start)} - ${formatDate(this.timeRange.end)}` : 'All Time'}</span>
              <button class="btn-link text-sm ${this.timeRange ? '' : 'hidden'}" id="clear-time-range">Clear</button>
            </div>
            <div id="search-time-filter"></div>
          </div>
          
          <!-- Search Action -->
          <div class="search-action-row">
            <div class="search-match-count ${canSearch ? '' : 'hidden'}" id="match-count">
              ${this.renderMatchCount()}
            </div>
            <button class="btn btn-primary search-execute-btn ${canSearch ? '' : 'hidden'}" id="search-execute">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="7" cy="7" r="4.5"/>
                <path d="M10.5 10.5L14 14"/>
              </svg>
              Create Workspace
            </button>
          </div>
        </div>
      </div>
    `;

    this.setupEventHandlers();
    this.initTimeRangeFilter();
    
    // Only init ScopeSelector if expanded
    if (this.filtersExpanded) {
      this.initScopeSelector(currentScope);
    }
    
    // Focus the search input
    const input = document.getElementById('search-input');
    if (input) input.focus();
  }

  /**
   * Check if a scope has any selected items
   */
  hasAnyScope(scope) {
    if (!scope) return false;
    return (scope.personIds?.length > 0) ||
           (scope.organizationIds?.length > 0) ||
           (scope.factionIds?.length > 0) ||
           (scope.locationIds?.length > 0) ||
           (scope.keywords?.length > 0) ||
           (scope.documentTypes?.length > 0) ||
           (scope.publisherIds?.length > 0) ||
           (scope.authors?.length > 0);
  }

  /**
   * Initialize the ScopeSelector component
   */
  initScopeSelector(previousScope) {
    const container = document.getElementById('search-scope-selector');
    if (!container) return;
    
    // Create ScopeSelector with save filter and search filters enabled
    this.scopeSelector = new ScopeSelector(container, {
      showSaveFilter: true,
      showSearchFilters: true,
      onChange: (scope) => {
        this.onScopeChange(scope);
      }
    });
    
    // Restore previous scope if any, or just render empty
    if (previousScope && this.hasAnyScope(previousScope)) {
      this.scopeSelector.setScope(previousScope);
    } else {
      // Must call render() to show the UI
      this.scopeSelector.render();
    }
  }

  /**
   * Handle scope changes from ScopeSelector
   */
  onScopeChange(scope) {
    this.updateSearchUI();
    this.debounceSearch();
  }

  /**
   * Update search UI elements based on current state
   */
  updateSearchUI() {
    const scope = this.scopeSelector?.getScope();
    const hasScope = this.hasAnyScope(scope);
    const hasQuery = this.searchQuery.trim().length >= 2;
    const canSearch = hasScope || hasQuery;
    
    // Update search button visibility
    const searchBtn = document.getElementById('search-execute');
    if (searchBtn) {
      searchBtn.classList.toggle('hidden', !canSearch);
    }
    
    // Update match count visibility
    const matchCount = document.getElementById('match-count');
    if (matchCount) {
      matchCount.classList.toggle('hidden', !canSearch);
    }
    
    // Update filters badge
    const filtersToggle = document.getElementById('filters-toggle');
    if (filtersToggle) {
      const scopeItemCount = hasScope ? this.getScopeItemCount(scope) : 0;
      let badge = filtersToggle.querySelector('.filters-badge');
      
      if (scopeItemCount > 0) {
        if (!badge) {
          // Insert badge before the chevron
          const chevron = filtersToggle.querySelector('.toggle-chevron');
          badge = document.createElement('span');
          badge.className = 'filters-badge';
          filtersToggle.insertBefore(badge, chevron);
        }
        badge.textContent = scopeItemCount;
      } else if (badge) {
        badge.remove();
      }
    }
  }

  /**
   * Get document volume data for the histogram
   */
  getDocumentVolumeData() {
    const documents = DataService.getDocuments();
    if (!documents || documents.length === 0) return null;
    
    // Group documents by date
    const dateMap = new Map();
    documents.forEach(doc => {
      if (!doc.publishedDate) return;
      const date = doc.publishedDate.split('T')[0];
      dateMap.set(date, (dateMap.get(date) || 0) + 1);
    });
    
    // Sort dates and create arrays
    const dates = [...dateMap.keys()].sort();
    const volumes = dates.map(d => dateMap.get(d));
    
    return { dates, volumes };
  }

  /**
   * Initialize the time range filter histogram
   */
  initTimeRangeFilter() {
    const container = document.getElementById('search-time-filter');
    if (!container) return;
    
    const volumeData = this.getDocumentVolumeData();
    if (!volumeData || !volumeData.dates || volumeData.dates.length === 0) {
      container.innerHTML = '<div class="text-muted text-sm">No date data available</div>';
      return;
    }
    
    // Create time range filter
    this.timeRangeFilter = new TimeRangeFilter('search-time-filter', {
      height: 60,
      onChange: (range) => this.onTimeRangeChanged(range)
    });
    
    this.timeRangeFilter.update(volumeData);
    
    // Restore previous selection if exists
    if (this.timeRange) {
      this.timeRangeFilter.setSelection(this.timeRange.start, this.timeRange.end);
    }
  }

  /**
   * Handle time range selection change
   */
  onTimeRangeChanged(range) {
    this.timeRange = range;
    this.updateTimeRangeLabel();
    this.updateMatchCount();
  }

  /**
   * Update the time range label display
   */
  updateTimeRangeLabel() {
    const label = document.getElementById('time-range-label');
    const clearBtn = document.getElementById('clear-time-range');
    
    if (label) {
      if (this.timeRange) {
        label.textContent = `${formatDate(this.timeRange.start)} - ${formatDate(this.timeRange.end)}`;
      } else {
        label.textContent = 'All Time';
      }
    }
    
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', !this.timeRange);
    }
  }

  /**
   * Get the label for the classification dropdown button
   */
  getClassificationButtonLabel() {
    const levels = this.getClassificationLevels();
    const selectedCount = this.selectedClassifications.size;
    
    if (selectedCount === 0 || selectedCount === levels.length) {
      return 'All Classifications';
    } else if (selectedCount === 1) {
      const selectedId = Array.from(this.selectedClassifications)[0];
      const level = levels.find(l => l.id === selectedId);
      return level ? level.short : '1 classification';
    } else {
      return `${selectedCount} classifications`;
    }
  }

  /**
   * Check if all classifications are selected
   */
  areAllClassificationsSelected() {
    const levels = this.getClassificationLevels();
    return this.selectedClassifications.size === 0 || this.selectedClassifications.size === levels.length;
  }

  /**
   * Get the label for the repository dropdown button
   */
  getRepositoryButtonLabel() {
    const repositories = DataService.getRepositories();
    const totalCount = repositories.length;
    const selectedCount = this.selectedRepositories.size;
    
    if (selectedCount === 0) {
      return 'No repositories';
    } else if (selectedCount === totalCount) {
      return 'All Repositories';
    } else if (selectedCount === 1) {
      const selectedId = Array.from(this.selectedRepositories)[0];
      const repo = repositories.find(r => r.id === selectedId);
      return repo ? repo.code : '1 repository';
    } else {
      return `${selectedCount} repositories`;
    }
  }

  /**
   * Check if all repositories are selected
   */
  areAllRepositoriesSelected() {
    const repositories = DataService.getRepositories();
    return this.selectedRepositories.size === repositories.length;
  }

  /**
   * Render classification options for the dropdown
   */
  renderClassificationOptions() {
    const levels = this.getClassificationLevels();
    return levels.map(level => {
      const isChecked = this.selectedClassifications.size === 0 || this.selectedClassifications.has(level.id);
      return `
        <label class="dropdown-option">
          <input 
            type="checkbox" 
            name="classification-option" 
            value="${level.id}" 
            ${isChecked ? 'checked' : ''}
          />
          <span class="dropdown-option-name">${this.escapeHtml(level.name)}</span>
        </label>
      `;
    }).join('');
  }

  /**
   * Render repository options for the dropdown
   */
  renderRepositoryOptions() {
    const repositories = DataService.getRepositories();
    if (!repositories || repositories.length === 0) {
      return '<div class="dropdown-empty">No repositories available</div>';
    }
    
    return repositories.map(repo => {
      const isChecked = this.selectedRepositories.has(repo.id);
      return `
        <label class="dropdown-option">
          <input 
            type="checkbox" 
            name="repo-option" 
            value="${repo.id}" 
            ${isChecked ? 'checked' : ''}
          />
          <span class="dropdown-option-name">${this.escapeHtml(repo.name)}</span>
        </label>
      `;
    }).join('');
  }

  /**
   * Update the repository dropdown button label
   */
  updateRepositoryButtonLabel() {
    const btn = document.getElementById('repo-dropdown-toggle');
    if (btn) {
      const labelSpan = btn.querySelector('span:not(.dropdown-chevron)');
      if (labelSpan) {
        labelSpan.textContent = this.getRepositoryButtonLabel();
      }
    }
  }

  /**
   * Update the classification dropdown button label
   */
  updateClassificationButtonLabel() {
    const btn = document.getElementById('classification-dropdown-toggle');
    if (btn) {
      const labelSpan = btn.querySelector('span:not(.dropdown-chevron):not(.classification-badge)');
      if (labelSpan) {
        labelSpan.textContent = this.getClassificationButtonLabel();
      }
    }
  }

  /**
   * Render the match count display
   */
  renderMatchCount() {
    if (this.matchCount === 0) {
      return `<span class="match-count-zero">No matches</span>`;
    }
    return `<span class="match-count-number">${this.matchCount}</span> document${this.matchCount !== 1 ? 's' : ''}`;
  }

  /**
   * Render selected scope items as chips (shown when filter panel is collapsed)
   */
  renderSelectedScopeChips(scope) {
    if (!scope) return '';
    
    const chips = [];
    
    // People
    if (scope.personIds?.length > 0) {
      scope.personIds.forEach(id => {
        const person = DataService.getPerson(id);
        if (person) {
          chips.push({
            type: 'person',
            id: id,
            label: person.name,
            icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="8" cy="5" r="3"/>
              <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5"/>
            </svg>`
          });
        }
      });
    }
    
    // Organizations
    if (scope.organizationIds?.length > 0) {
      scope.organizationIds.forEach(id => {
        const org = DataService.getOrganization(id);
        if (org) {
          chips.push({
            type: 'organization',
            id: id,
            label: org.name,
            icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="4" width="12" height="10" rx="1"/>
              <path d="M5 4V2h6v2M5 8h6M5 11h6"/>
            </svg>`
          });
        }
      });
    }
    
    // Factions
    if (scope.factionIds?.length > 0) {
      scope.factionIds.forEach(id => {
        const faction = DataService.getFaction(id);
        if (faction) {
          chips.push({
            type: 'faction',
            id: id,
            label: faction.name,
            icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 13V5l5-3 5 3v8"/>
              <path d="M6 13v-4h4v4"/>
            </svg>`
          });
        }
      });
    }
    
    // Locations
    if (scope.locationIds?.length > 0) {
      scope.locationIds.forEach(id => {
        const location = DataService.getLocation(id);
        if (location) {
          chips.push({
            type: 'location',
            id: id,
            label: location.name,
            icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
              <circle cx="8" cy="6" r="2"/>
            </svg>`
          });
        }
      });
    }
    
    // Keywords
    if (scope.keywords?.length > 0) {
      scope.keywords.forEach(keyword => {
        chips.push({
          type: 'keyword',
          id: keyword,
          label: keyword,
          icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2 5h12M2 8h8M2 11h10"/>
          </svg>`
        });
      });
    }
    
    // Document Types
    if (scope.documentTypes?.length > 0) {
      const docTypeLabels = {
        'news_article': 'News Article',
        'social_post': 'Social Post',
        'internal_report': 'Internal Report',
        'intelligence_report': 'Intelligence Report',
        'memo': 'Memo',
        'transcript': 'Transcript',
        'internal': 'Internal',
        'corporate_record': 'Corporate Record',
        'watchlist_match': 'Watchlist Match',
        'political_finance': 'Political Finance',
        'event_attendance': 'Event Attendance'
      };
      scope.documentTypes.forEach(docType => {
        chips.push({
          type: 'documentType',
          id: docType,
          label: docTypeLabels[docType] || docType,
          icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/>
            <path d="M10 2v3h3"/>
          </svg>`
        });
      });
    }
    
    // Publishers
    if (scope.publisherIds?.length > 0) {
      scope.publisherIds.forEach(publisherId => {
        const publisher = DataService.getPublisher(publisherId);
        if (publisher) {
          chips.push({
            type: 'publisher',
            id: publisherId,
            label: publisher.name,
            icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="3" width="12" height="10" rx="1"/>
              <path d="M5 6h6M5 9h4"/>
            </svg>`
          });
        }
      });
    }
    
    // Authors
    if (scope.authors?.length > 0) {
      scope.authors.forEach(author => {
        chips.push({
          type: 'author',
          id: author,
          label: author,
          icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="8" cy="5" r="3"/>
            <path d="M3 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/>
          </svg>`
        });
      });
    }
    
    if (chips.length === 0) return '';
    
    return `
      <div class="selected-scope-chips">
        ${chips.map(chip => `
          <span class="scope-chip scope-chip-${chip.type}" data-type="${chip.type}" data-id="${this.escapeHtml(chip.id)}">
            ${chip.icon}
            <span class="chip-label">${this.escapeHtml(chip.label)}</span>
            <button class="chip-remove" data-type="${chip.type}" data-id="${this.escapeHtml(chip.id)}" title="Remove">
              <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4l8 8M12 4l-8 8"/>
              </svg>
            </button>
          </span>
        `).join('')}
      </div>
    `;
  }

  /**
   * Update the selected filters display
   */
  updateSelectedFiltersDisplay() {
    const displayContainer = document.getElementById('selected-filters-display');
    if (!displayContainer) return;
    
    const scope = this.scopeSelector?.getScope();
    const hasScope = this.hasAnyScope(scope);
    
    // Show/hide based on panel state and whether we have scope
    displayContainer.classList.toggle('hidden', this.filtersExpanded || !hasScope);
    
    // Update content
    displayContainer.innerHTML = this.renderSelectedScopeChips(scope);
    
    // Attach remove handlers
    this.attachChipRemoveHandlers();
  }

  /**
   * Attach event handlers for chip remove buttons
   */
  attachChipRemoveHandlers() {
    const removeButtons = this.container.querySelectorAll('.selected-scope-chips .chip-remove');
    removeButtons.forEach(btn => {
      this.addListener(btn, 'click', (e) => {
        e.stopPropagation();
        const type = btn.dataset.type;
        const id = btn.dataset.id;
        this.removeFromScope(type, id);
      });
    });
  }

  /**
   * Remove an item from the scope
   */
  removeFromScope(type, id) {
    if (!this.scopeSelector) return;
    
    const scope = this.scopeSelector.getScope();
    
    switch (type) {
      case 'person':
        scope.personIds = scope.personIds.filter(i => i !== id);
        break;
      case 'organization':
        scope.organizationIds = scope.organizationIds.filter(i => i !== id);
        break;
      case 'faction':
        scope.factionIds = scope.factionIds.filter(i => i !== id);
        break;
      case 'location':
        scope.locationIds = scope.locationIds.filter(i => i !== id);
        break;
      case 'keyword':
        scope.keywords = scope.keywords.filter(k => k !== id);
        break;
      case 'documentType':
        scope.documentTypes = (scope.documentTypes || []).filter(dt => dt !== id);
        break;
      case 'publisher':
        scope.publisherIds = (scope.publisherIds || []).filter(p => p !== id);
        break;
      case 'author':
        scope.authors = (scope.authors || []).filter(a => a !== id);
        break;
    }
    
    // Update the ScopeSelector
    this.scopeSelector.setScope(scope);
    
    // Update UI
    this.updateSearchUI();
    this.updateSelectedFiltersDisplay();
    this.updateMatchCount();
  }

  /**
   * Set up event handlers
   */
  setupEventHandlers() {
    const input = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear');
    const searchBtn = document.getElementById('search-execute');

    // Text input handlers
    if (input) {
      this.addListener(input, 'input', (e) => {
        this.searchQuery = e.target.value;
        this.updateClearButton();
        this.updateSearchUI();
        this.debounceSearch();
      });

      this.addListener(input, 'keydown', (e) => {
        if (e.key === 'Escape') {
          this.clearSearch();
        } else if (e.key === 'Enter') {
          // Immediately create workspace and navigate
          if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
          }
          this.createWorkspaceFromSearch();
        }
      });
    }

    // Clear text button
    if (clearBtn) {
      this.addListener(clearBtn, 'click', () => {
        this.clearSearch();
      });
    }
    
    // Search/Create Workspace button
    if (searchBtn) {
      this.addListener(searchBtn, 'click', () => {
        this.createWorkspaceFromSearch();
      });
    }
    
    // Filters toggle button
    const filtersToggle = document.getElementById('filters-toggle');
    const filtersPanel = document.getElementById('filters-panel');
    if (filtersToggle && filtersPanel) {
      this.addListener(filtersToggle, 'click', () => {
        this.filtersExpanded = !this.filtersExpanded;
        filtersToggle.classList.toggle('expanded', this.filtersExpanded);
        filtersPanel.classList.toggle('expanded', this.filtersExpanded);
        
        // Initialize ScopeSelector when first expanded
        if (this.filtersExpanded && !this.scopeSelector) {
          this.initScopeSelector();
        }
        
        // Update the selected filters display when collapsing
        this.updateSelectedFiltersDisplay();
      });
    }

    // Classification dropdown handlers
    const classDropdownToggle = document.getElementById('classification-dropdown-toggle');
    const classDropdownPopover = document.getElementById('classification-dropdown-popover');
    
    if (classDropdownToggle && classDropdownPopover) {
      // Toggle dropdown
      this.addListener(classDropdownToggle, 'click', (e) => {
        e.stopPropagation();
        classDropdownPopover.classList.toggle('open');
        // Close other dropdowns
        document.getElementById('repo-dropdown-popover')?.classList.remove('open');
      });
      
      // Close dropdown when clicking outside
      this.addListener(document, 'click', (e) => {
        if (!e.target.closest('.filter-dropdown-wrapper')) {
          classDropdownPopover.classList.remove('open');
        }
      });
      
      // Select All checkbox
      const selectAllCheckbox = document.getElementById('classification-select-all');
      if (selectAllCheckbox) {
        this.addListener(selectAllCheckbox, 'change', (e) => {
          const levels = this.getClassificationLevels();
          if (e.target.checked) {
            // Select all (empty set means all)
            this.selectedClassifications = new Set();
          } else {
            // Deselect all
            this.selectedClassifications = new Set();
          }
          // Update individual checkboxes
          const classCheckboxes = classDropdownPopover.querySelectorAll('input[name="classification-option"]');
          classCheckboxes.forEach(cb => {
            cb.checked = e.target.checked;
          });
          this.updateClassificationButtonLabel();
          this.updateMatchCount();
        });
      }
      
      // Individual classification checkboxes
      const classCheckboxes = classDropdownPopover.querySelectorAll('input[name="classification-option"]');
      classCheckboxes.forEach(checkbox => {
        this.addListener(checkbox, 'change', (e) => {
          const classId = e.target.value;
          const levels = this.getClassificationLevels();
          
          // If currently "all" (empty set), initialize with all levels first
          if (this.selectedClassifications.size === 0) {
            levels.forEach(l => this.selectedClassifications.add(l.id));
          }
          
          if (e.target.checked) {
            this.selectedClassifications.add(classId);
          } else {
            this.selectedClassifications.delete(classId);
          }
          
          // If all are selected, reset to empty (meaning "all")
          if (this.selectedClassifications.size === levels.length) {
            this.selectedClassifications = new Set();
          }
          
          // Update "Select All" checkbox state
          if (selectAllCheckbox) {
            const allSelected = this.selectedClassifications.size === 0;
            const noneSelected = this.selectedClassifications.size === 0 && !e.target.checked;
            selectAllCheckbox.checked = allSelected;
            selectAllCheckbox.indeterminate = this.selectedClassifications.size > 0 && 
                                               this.selectedClassifications.size < levels.length;
          }
          this.updateClassificationButtonLabel();
          this.updateMatchCount();
        });
      });
    }

    // Repository dropdown handlers
    const repoDropdownToggle = document.getElementById('repo-dropdown-toggle');
    const repoDropdownPopover = document.getElementById('repo-dropdown-popover');
    
    if (repoDropdownToggle && repoDropdownPopover) {
      // Toggle dropdown
      this.addListener(repoDropdownToggle, 'click', (e) => {
        e.stopPropagation();
        repoDropdownPopover.classList.toggle('open');
      });
      
      // Close dropdown when clicking outside
      this.addListener(document, 'click', (e) => {
        if (!e.target.closest('.filter-dropdown-wrapper')) {
          repoDropdownPopover.classList.remove('open');
        }
      });
      
      // Select All checkbox
      const selectAllCheckbox = document.getElementById('repo-select-all');
      if (selectAllCheckbox) {
        this.addListener(selectAllCheckbox, 'change', (e) => {
          const repositories = DataService.getRepositories();
          if (e.target.checked) {
            // Select all
            this.selectedRepositories = new Set(repositories.map(r => r.id));
          } else {
            // Deselect all
            this.selectedRepositories = new Set();
          }
          // Update individual checkboxes
          const repoCheckboxes = repoDropdownPopover.querySelectorAll('input[name="repo-option"]');
          repoCheckboxes.forEach(cb => {
            cb.checked = e.target.checked;
          });
          this.updateRepositoryButtonLabel();
          this.updateMatchCount();
        });
      }
      
      // Individual repository checkboxes
      const repoCheckboxes = repoDropdownPopover.querySelectorAll('input[name="repo-option"]');
      repoCheckboxes.forEach(checkbox => {
        this.addListener(checkbox, 'change', (e) => {
          const repoId = e.target.value;
          if (e.target.checked) {
            this.selectedRepositories.add(repoId);
          } else {
            this.selectedRepositories.delete(repoId);
          }
          // Update "Select All" checkbox state
          const repositories = DataService.getRepositories();
          if (selectAllCheckbox) {
            selectAllCheckbox.checked = this.selectedRepositories.size === repositories.length;
            selectAllCheckbox.indeterminate = this.selectedRepositories.size > 0 && 
                                               this.selectedRepositories.size < repositories.length;
          }
          this.updateRepositoryButtonLabel();
          this.updateMatchCount();
        });
      });
    }
    
    // Clear time range button
    const clearTimeBtn = document.getElementById('clear-time-range');
    if (clearTimeBtn) {
      this.addListener(clearTimeBtn, 'click', () => {
        this.timeRange = null;
        if (this.timeRangeFilter) {
          this.timeRangeFilter.clearSelection();
        }
        this.updateTimeRangeLabel();
        this.updateMatchCount();
      });
    }
  }

  /**
   * Debounce search for updating match count
   */
  debounceSearch() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.updateMatchCount();
    }, 150);
  }

  /**
   * Update the match count display
   */
  updateMatchCount() {
    const query = this.searchQuery.trim();
    const countContainer = document.getElementById('match-count');
    const hasQuery = query.length >= 2;
    const scope = this.scopeSelector?.getScope();
    const hasScope = this.hasAnyScope(scope);
    
    if (!hasQuery && !hasScope) {
      this.matchCount = 0;
      if (countContainer) {
        countContainer.classList.add('hidden');
      }
      return;
    }

    const results = DataService.search(hasQuery ? query : '', {
      repositoryIds: this.getSelectedRepositoryIds(),
      timeRange: this.timeRange,
      scope: hasScope ? scope : null
    });
    
    // Apply classification filter if specific ones are selected
    let documents = results.documents;
    if (this.selectedClassifications.size > 0) {
      documents = documents.filter(doc => {
        const docClassification = doc.classification || 'U';
        return this.selectedClassifications.has(docClassification);
      });
    }
    
    this.matchCount = documents.length;
    
    if (countContainer) {
      countContainer.classList.remove('hidden');
      countContainer.innerHTML = this.renderMatchCount();
    }
  }

  /**
   * Create a workspace from the current search and navigate to it
   */
  createWorkspaceFromSearch() {
    const query = this.searchQuery.trim();
    const hasQuery = query.length >= 2;
    const scope = this.scopeSelector?.getScope();
    const hasScope = this.hasAnyScope(scope);
    
    // Need either a query or scope to create workspace
    if (!hasQuery && !hasScope) return;

    const repositoryIds = this.getSelectedRepositoryIds();
    const results = DataService.search(hasQuery ? query : '', { 
      repositoryIds, 
      timeRange: this.timeRange,
      scope: hasScope ? scope : null
    });
    
    // Apply classification filter if specific ones are selected
    let documents = results.documents;
    if (this.selectedClassifications.size > 0) {
      documents = documents.filter(doc => {
        const docClassification = doc.classification || 'U';
        return this.selectedClassifications.has(docClassification);
      });
    }
    
    const documentIds = documents.map(d => d.id);

    // Build workspace name and description
    const repositories = DataService.getRepositories();
    const selectedRepos = repositories.filter(r => repositoryIds.includes(r.id));
    const repoNames = selectedRepos.map(r => r.code).join(', ');
    
    let workspaceName;
    let description;
    
    // Count items in scope for description
    const scopeItemCount = hasScope ? this.getScopeItemCount(scope) : 0;
    
    if (hasScope && hasQuery) {
      workspaceName = query;
      description = `Search "${query}" with ${scopeItemCount} filter item${scopeItemCount !== 1 ? 's' : ''}`;
    } else if (hasScope) {
      workspaceName = `Filtered Search (${scopeItemCount} items)`;
      description = `Documents matching ${scopeItemCount} filter item${scopeItemCount !== 1 ? 's' : ''}`;
    } else {
      workspaceName = query;
      description = `Search results for "${query}"`;
    }
    
    if (repositoryIds.length !== repositories.length) {
      description += ` in ${repoNames}`;
    }
    if (this.selectedClassifications.size > 0) {
      const levels = this.getClassificationLevels();
      const selectedLevels = levels.filter(l => this.selectedClassifications.has(l.id));
      if (selectedLevels.length === 1) {
        description += `, ${selectedLevels[0].name} only`;
      } else {
        description += `, ${selectedLevels.map(l => l.short).join('/')} classifications`;
      }
    }
    if (this.timeRange) {
      description += ` (${formatDate(this.timeRange.start)} - ${formatDate(this.timeRange.end)})`;
    }

    // Create the workspace (even if no documents match)
    const workspaceId = dataStore.createWorkspace({
      name: workspaceName,
      query: hasQuery ? query : null,
      description: description,
      documentIds: documentIds,
      filters: { 
        repositoryIds, 
        timeRange: this.timeRange,
        scope: hasScope ? scope : null,
        classifications: this.selectedClassifications.size > 0 ? Array.from(this.selectedClassifications) : null
      },
      status: 'active'
    });

    // Navigate to the new workspace
    window.location.hash = `#/${workspaceId}/`;
  }

  /**
   * Get the count of items in a scope
   */
  getScopeItemCount(scope) {
    if (!scope) return 0;
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
   * Clear the search
   */
  clearSearch() {
    this.searchQuery = '';
    this.matchCount = 0;
    
    const input = document.getElementById('search-input');
    if (input) {
      input.value = '';
      input.focus();
    }
    
    this.updateClearButton();
    this.updateSearchUI();
    this.updateMatchCount();
  }

  /**
   * Update clear button visibility
   */
  updateClearButton() {
    const clearBtn = document.getElementById('search-clear');
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', !this.searchQuery);
    }
  }

  /**
   * Clean up resources when view is destroyed
   */
  destroy() {
    if (this.scopeSelector) {
      this.scopeSelector.destroy();
      this.scopeSelector = null;
    }
    if (this.timeRangeFilter) {
      this.timeRangeFilter.destroy();
      this.timeRangeFilter = null;
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    super.destroy();
  }
}

export default SearchView;
