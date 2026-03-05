/**
 * SearchView.js
 * Search documents and create a workspace with matching results
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { SearchInput } from '../components/SearchInput.js';
import { formatDate, formatDateTime } from '../utils/formatters.js';
import { hasAnyScope, getScopeItemCount, removeFromScope } from '../utils/scopeUtils.js';
import { renderScopeChips, attachScopeChipHandlers } from '../components/ScopeChips.js';

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
    const hasScope = hasAnyScope(currentScope);
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
            ${renderScopeChips(currentScope)}
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
    attachScopeChipHandlers(this.container, '.selected-scope-chips', (type, id) => this.removeFromScope(type, id), (el, evt, fn) => this.addListener(el, evt, fn));

    const initialClearBtn = this.container.querySelector('.scope-clear-all-inline');
    if (initialClearBtn) {
      this.addListener(initialClearBtn, 'click', () => {
        if (this.searchInput) {
          this.searchInput.searchScope = { personIds: [], organizationIds: [], locationIds: [], keywords: [], documentTypes: [], metadataFilters: {} };
          this.searchInput._updateFiltersBadge();
        }
        this.updateSearchUI();
        this.updateSelectedFiltersDisplay();
        this.updateMatchCount();
      });
    }

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
      <a href="#/${ws.id}/" class="search-recent-workspace-item">
        <svg class="search-recent-workspace-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="8" cy="8" r="6.5"/>
          <path d="M8 4.5V8l2.5 1.5"/>
        </svg>
        <div class="search-recent-workspace-info">
          <span class="search-recent-workspace-name">${this.escapeHtml(ws.name || 'Untitled')}</span>
          <span class="search-recent-workspace-date">${ws.createdAt ? formatDateTime(ws.createdAt) : ''}</span>
        </div>
      </a>
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
   * Update search UI elements based on current state
   */
  updateSearchUI() {
    const scope = this.getScope();
    const hasScope = hasAnyScope(scope);
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
   * Update the selected filters display
   */
  updateSelectedFiltersDisplay() {
    const displayContainer = document.getElementById('selected-filters-display');
    if (!displayContainer) return;
    
    const scope = this.getScope();
    const active = hasAnyScope(scope);
    
    displayContainer.classList.toggle('hidden', !active);
    displayContainer.innerHTML = renderScopeChips(scope);
    attachScopeChipHandlers(this.container, '.selected-scope-chips', (type, id) => this.removeFromScope(type, id), (el, evt, fn) => this.addListener(el, evt, fn));

    const clearBtn = displayContainer.querySelector('.scope-clear-all-inline');
    if (clearBtn) {
      this.addListener(clearBtn, 'click', () => {
        if (this.searchInput) {
          this.searchInput.searchScope = { personIds: [], organizationIds: [], locationIds: [], keywords: [], documentTypes: [], metadataFilters: {} };
          this.searchInput._updateFiltersBadge();
        }
        this.updateSearchUI();
        this.updateSelectedFiltersDisplay();
        this.updateMatchCount();
      });
    }
  }

  /**
   * Remove an item from the scope
   */
  removeFromScope(type, id) {
    const scope = this.searchInput?.searchScope;
    if (!scope) return;
    
    removeFromScope(scope, type, id);
    
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
    const hasScope = hasAnyScope(scope);
    
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
    const hasScope = hasAnyScope(scope);
    
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
    const scopeItemCount = hasScope ? getScopeItemCount(scope) : 0;
    
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
