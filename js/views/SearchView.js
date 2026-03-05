/**
 * SearchView.js
 * Search documents and create a workspace with matching results
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { SearchInput } from '../components/SearchInput.js';
import { formatDate, formatDateTime } from '../utils/formatters.js';

export class SearchView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
    this.searchQuery = '';
    this.matchCount = 0;
    this.debounceTimer = null;
    this.searchInput = null;
    // Classification filter (set of selected classifications, empty = all)
    this.selectedClassifications = new Set();
  }

  /** Get the current scope */
  getScope() {
    return this.searchInput?.searchScope || { personIds: [], organizationIds: [], locationIds: [], keywords: [], documentTypes: [], metadataFilters: {} };
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
   * Get the currently selected repository IDs as an array
   */
  getSelectedRepositoryIds() {
    return this.searchInput ? Array.from(this.searchInput.selectedRepositories) : [];
  }

  async render() {
    const currentScope = this.getScope();
    const hasScope = this.hasAnyScope(currentScope);
    const hasQuery = this.searchQuery.trim().length >= 2;
    const canSearch = hasScope || hasQuery;

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

          <!-- Search Card (mounted by SearchInput component) -->
          <div id="search-card-mount"></div>

          <!-- AI Hint -->
          <div class="search-ai-hint">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" class="search-ai-hint-icon">
              <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5z"/>
            </svg>
            <span>Each query is interpreted by AI, so results may vary slightly.</span>
          </div>

          ${this.renderRecentWorkspaces()}
          
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

    // Mount the shared SearchInput component
    const mount = document.getElementById('search-card-mount');
    if (mount) {
      if (this.searchInput) {
        this.searchInput.destroy();
      }
      this.searchInput = new SearchInput({
        container: mount,
        variant: 'full',
        placeholder: 'Ask a question like "What is the role of the B-52 in air operations and strategy?"',
        multiline: false,
        showFilters: true,
        onSubmit: () => this.createWorkspaceFromSearch(),
        onInput: (query) => {
          this.searchQuery = query;
          this.updateSearchUI();
          this.debounceSearch();
        },
        onScopeChange: () => {
          this.updateSearchUI();
          this.updateSelectedFiltersDisplay();
          this.updateMatchCount();
          this.debounceSearch();
        }
      });
      // Restore query if we had one
      if (this.searchQuery) {
        this.searchInput.setQuery(this.searchQuery);
      }
      this.searchInput.render();
    }

    // Attach chip remove handlers for the initially rendered chips
    this.attachChipRemoveHandlers();
    
    // Focus the search input
    if (this.searchInput) this.searchInput.focus();
  }

  /**
   * Render the recent workspaces section
   */
  renderRecentWorkspaces() {
    const workspaces = DataService.getWorkspaces();
    const recent = workspaces
      .slice()
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 1);

    if (recent.length === 0) return '';

    const items = recent.map(ws => `
      <div class="search-recent-workspace-item">
        <svg class="search-recent-workspace-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="8" cy="8" r="6.5"/>
          <path d="M8 4.5V8l2.5 1.5"/>
        </svg>
        <div class="search-recent-workspace-info">
          <span class="search-recent-workspace-name">${this.escapeHtml(ws.name || 'Untitled')}</span>
          <span class="search-recent-workspace-date">${ws.createdAt ? formatDateTime(ws.createdAt) : ''}</span>
        </div>
      </div>
    `).join('');

    return `
      <div class="search-recent-section">
        <h3 class="search-recent-heading">Recent Workspaces</h3>
        <div class="search-recent-list">${items}</div>
        <div class="search-recent-footer">
          <a href="#/workspaces" class="search-recent-link">View Workspaces</a>
          <span class="search-recent-arrow">&rarr;</span>
        </div>
      </div>
    `;
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
           (scope.metadataFilters && Object.values(scope.metadataFilters).some(v => {
             if (Array.isArray(v)) return v.length > 0;
             return (v?.include?.length > 0) || (v?.exclude?.length > 0);
           }));
  }

  /**
   * Update search UI elements based on current state
   */
  updateSearchUI() {
    const scope = this.getScope();
    const hasScope = this.hasAnyScope(scope);
    const hasQuery = this.searchQuery.trim().length >= 2;
    const canSearch = hasScope || hasQuery;

    // Update match count visibility
    const matchCountRow = document.getElementById('match-count-row');
    if (matchCountRow) {
      matchCountRow.classList.toggle('hidden', !canSearch);
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
            tooltip: 'Person',
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
            tooltip: 'Organization',
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
            tooltip: 'Location',
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
          tooltip: 'Keyword',
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
          tooltip: 'Document Type',
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
            tooltip: 'Publisher',
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
          tooltip: 'Author',
          icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="8" cy="5" r="3"/>
            <path d="M3 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/>
          </svg>`
        });
      });
    }

    // Metadata filters (include + exclude)
    const catalog = DataService.getFilterCatalog();
    for (const [dimId, filterVal] of Object.entries(scope.metadataFilters || {})) {
      const dimension = catalog.find(d => d.id === dimId);
      const dimName = dimension?.name || dimId;
      const include = Array.isArray(filterVal) ? filterVal : (filterVal?.include || []);
      const exclude = Array.isArray(filterVal) ? [] : (filterVal?.exclude || []);
      const filterIcon = `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 2h14l-5 6v5l-4 2V8L1 2z"/></svg>`;
      include.forEach(val => {
        chips.push({ type: 'metadata', id: `${dimId}::${val}`, label: val, tooltip: dimName, icon: filterIcon, mode: 'include' });
      });
      exclude.forEach(val => {
        chips.push({ type: 'metadata', id: `${dimId}::${val}`, label: val, tooltip: `Exclude: ${dimName}`, icon: filterIcon, mode: 'exclude' });
      });
    }
    
    if (chips.length === 0) return '';
    
    return `
      <div class="selected-scope-chips">
        ${chips.map(chip => `
          <span class="scope-chip scope-chip-${chip.type}${chip.mode === 'exclude' ? ' scope-chip-excluded' : ''}" data-type="${chip.type}" data-id="${this.escapeHtml(chip.id)}"${chip.tooltip ? ` data-tooltip="${this.escapeHtml(chip.tooltip)}"` : ''}>
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
    const scope = this.searchInput?.searchScope;
    if (!scope) return;
    
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
      case 'metadata': {
        // id format: "dimId::value"
        const sep = id.indexOf('::');
        if (sep > 0) {
          const dimId = id.substring(0, sep);
          const val = id.substring(sep + 2);
          const entry = scope.metadataFilters?.[dimId];
          if (entry) {
            if (Array.isArray(entry)) {
              scope.metadataFilters[dimId] = entry.filter(v => v !== val);
              if (scope.metadataFilters[dimId].length === 0) delete scope.metadataFilters[dimId];
            } else {
              entry.include = (entry.include || []).filter(v => v !== val);
              entry.exclude = (entry.exclude || []).filter(v => v !== val);
              if (entry.include.length === 0 && entry.exclude.length === 0) delete scope.metadataFilters[dimId];
            }
          }
        }
        break;
      }
    }
    
    // Update UI (sync the component's badge, then update external elements)
    if (this.searchInput) this.searchInput._updateFiltersBadge();
    this.updateSearchUI();
    this.updateSelectedFiltersDisplay();
    this.updateMatchCount();
  }

  // Event handlers are managed by the SearchInput component.
  // Chip remove handlers are attached in attachChipRemoveHandlers().

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

    const timeRange = this.searchInput?.timeRange || null;
    const results = DataService.search(hasQuery ? query : '', {
      repositoryIds: this.getSelectedRepositoryIds(),
      timeRange,
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
    const timeRange = this.searchInput?.timeRange || null;
    const results = DataService.search(hasQuery ? query : '', { 
      repositoryIds, 
      timeRange,
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
    if (timeRange) {
      description += ` (${formatDate(timeRange.start)} - ${formatDate(timeRange.end)})`;
    }

    // Create the workspace (even if no documents match)
    const workspaceId = dataStore.createWorkspace({
      name: workspaceName,
      query: hasQuery ? query : null,
      description: description,
      documentIds: documentIds,
      filters: { 
        repositoryIds, 
        timeRange,
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
    let count = (scope.personIds?.length || 0) +
           (scope.organizationIds?.length || 0) +
           (scope.locationIds?.length || 0) +
           (scope.keywords?.length || 0) +
           (scope.documentTypes?.length || 0) +
           (scope.publisherIds?.length || 0) +
           (scope.authors?.length || 0);
    for (const v of Object.values(scope.metadataFilters || {})) {
      if (Array.isArray(v)) { count += v.length; continue; }
      count += (v?.include?.length || 0) + (v?.exclude?.length || 0);
    }
    return count;
  }

  /**
   * Clear the search
   */
  clearSearch() {
    this.searchQuery = '';
    this.matchCount = 0;
    if (this.searchInput) {
      this.searchInput.clearQuery();
    }
    this.updateSearchUI();
    this.updateMatchCount();
  }

  /**
   * Clean up resources when view is destroyed
   */
  destroy() {
    if (this.searchInput) {
      this.searchInput.destroy();
      this.searchInput = null;
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    super.destroy();
  }
}

export default SearchView;
