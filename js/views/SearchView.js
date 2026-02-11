/**
 * SearchView.js
 * Search documents and create a workspace with matching results
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { SearchScopeModal } from '../components/SearchScopeModal.js';
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
    // Scope (entities/keywords/metadata filters)
    this.searchScope = { personIds: [], organizationIds: [], locationIds: [], keywords: [], documentTypes: [], metadataFilters: {} };
    // Modal for editing filters
    this.filterModal = new SearchScopeModal();
    // Classification filter (set of selected classifications, empty = all)
    this.selectedClassifications = new Set();
  }

  /** Get the current scope */
  getScope() {
    return this.searchScope;
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

    const currentScope = this.getScope();
    const hasScope = this.hasAnyScope(currentScope);
    const hasQuery = this.searchQuery.trim().length >= 2;
    const canSearch = hasScope || hasQuery;
    const scopeItemCount = hasScope ? this.getScopeItemCount(currentScope) : 0;

    const currentUser = DataService.getCurrentUser();
    const userName = currentUser?.displayName || currentUser?.name || 'User';

    this.container.innerHTML = `
      <div class="content-area">
        <div class="search-page-container">
          <!-- Welcome Section -->
          <div class="search-welcome">
            <h1 class="search-welcome-title">Welcome back, ${this.escapeHtml(userName)}</h1>
            <p class="search-welcome-subtitle">Converse naturally to search relevant documents, review cited summaries, and continue exploring.</p>
          </div>

          <!-- Search Card -->
          <div class="search-card">
            <div class="search-card-input-area">
              <input 
                type="text" 
                id="search-input"
                class="search-card-input" 
                placeholder='Ask a question like "What is the role of the B-52 in air operations and strategy?"'
                value="${this.escapeHtml(this.searchQuery)}"
              />
              <button class="btn-icon search-clear-btn ${this.searchQuery ? '' : 'hidden'}" id="search-clear">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 4l8 8M12 4l-8 8"/>
                </svg>
              </button>
            </div>
            <div class="search-card-controls">
              <div class="search-card-buttons">
                <!-- Filters Toggle Button -->
                <button class="search-card-pill" id="filters-toggle">
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.0663409,1.6418284c.1482999-.3866299.51956-.64185.93366-.64185h11.9999599c.4140997,0,.7854004.2552201.9336996.64185.1483002.3866301.0430002.8246701-.2648993,1.1016099l-4.5973005,4.1355503v7.1209898c0,.3830996-.2189398.7326002-.5636702.8998003-.3447294.1672001-.7546797.1226997-1.0555401-.1145l-2.1428494-1.6897001c-.24049-.1896-.3808303-.4790001-.3808303-.7853003v-5.4312897L1.3312209,2.7434384c-.30786-.2769399-.413191-.7149799-.2648799-1.1016099ZM6.9285708,6.4334783v5.8768001l2.1428604,1.6897001v-7.5665002L13.9999609,1.9999784H2.000001l4.9285698,4.4334998Z" stroke-width="0"/>
                  </svg>
                  <span>Filters</span>
                  ${scopeItemCount > 0 ? `<span class="filters-badge">${scopeItemCount}</span>` : ''}
                </button>
              </div>
              
              <!-- Search Button -->
              <button class="search-card-submit ${canSearch ? '' : 'disabled'}" id="search-execute">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="7" cy="7" r="4.5"/>
                  <path d="M10.5 10.5L14 14"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- AI Hint -->
          <div class="search-ai-hint">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" class="search-ai-hint-icon">
              <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5z"/>
            </svg>
            <span>Each query is interpreted by AI, so results may vary slightly.</span>
          </div>
          
          <!-- Selected Filters Display -->
          <div class="search-selected-filters ${hasScope ? '' : 'hidden'}" id="selected-filters-display">
            ${this.renderSelectedScopeChips(currentScope)}
          </div>
          
          <!-- Match Count -->
          <div class="search-match-row ${canSearch ? '' : 'hidden'}" id="match-count-row">
            <div class="search-match-count" id="match-count">
              ${this.renderMatchCount()}
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupEventHandlers();
    
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
           (scope.locationIds?.length > 0) ||
           (scope.keywords?.length > 0) ||
           (scope.documentTypes?.length > 0) ||
           (scope.publisherIds?.length > 0) ||
           (scope.authors?.length > 0) ||
           (scope.metadataFilters && Object.keys(scope.metadataFilters).length > 0);
  }

  /**
   * Open the filters modal
   */
  openFiltersModal() {
    this.filterModal.open({
      scope: { ...this.searchScope },
      scopeParams: {
        repositoryIds: Array.from(this.selectedRepositories),
        classifications: Array.from(this.selectedClassifications),
        timeRange: this.timeRange
      },
      getVolumeData: () => this.getDocumentVolumeData(),
      onApply: (scope, scopeParams) => {
        // Apply scope (entities, keywords, metadataFilters)
        this.searchScope = scope || this.searchScope;
        // Apply scope params (repos, classifications, timeRange)
        if (scopeParams) {
          this.selectedRepositories = new Set(scopeParams.repositoryIds || []);
          this.selectedClassifications = new Set(scopeParams.classifications || []);
          this.timeRange = scopeParams.timeRange ?? null;
        }
        this.updateSearchUI();
        this.updateSelectedFiltersDisplay();
        this.updateMatchCount();
        this.debounceSearch();
      }
    });
  }

  /**
   * Update search UI elements based on current state
   */
  updateSearchUI() {
    const scope = this.getScope();
    const hasScope = this.hasAnyScope(scope);
    const hasQuery = this.searchQuery.trim().length >= 2;
    const canSearch = hasScope || hasQuery;
    
    // Update search button state
    const searchBtn = document.getElementById('search-execute');
    if (searchBtn) {
      searchBtn.classList.toggle('disabled', !canSearch);
    }

    // Update match count visibility
    const matchCountRow = document.getElementById('match-count-row');
    if (matchCountRow) {
      matchCountRow.classList.toggle('hidden', !canSearch);
    }
    
    // Update filters badge
    const filtersToggle = document.getElementById('filters-toggle');
    if (filtersToggle) {
      const scopeItemCount = hasScope ? this.getScopeItemCount(scope) : 0;
      let badge = filtersToggle.querySelector('.filters-badge');
      
      if (scopeItemCount > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'filters-badge';
          filtersToggle.appendChild(badge);
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
    
    const scope = this.getScope();
    const hasScope = this.hasAnyScope(scope);
    
    // Show/hide based on whether we have scope
    displayContainer.classList.toggle('hidden', !hasScope);
    
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
    const scope = this.searchScope;
    
    switch (type) {
      case 'person':
        scope.personIds = scope.personIds.filter(i => i !== id);
        break;
      case 'organization':
        scope.organizationIds = scope.organizationIds.filter(i => i !== id);
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
    
    // Filters toggle button opens the modal
    const filtersToggle = document.getElementById('filters-toggle');
    if (filtersToggle) {
      this.addListener(filtersToggle, 'click', () => {
        this.openFiltersModal();
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
    const scope = this.getScope();
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
    const scope = this.getScope();
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
    if (this.filterModal) {
      this.filterModal.close();
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    super.destroy();
  }
}

export default SearchView;
