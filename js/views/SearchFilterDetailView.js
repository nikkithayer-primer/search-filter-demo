/**
 * SearchFilterDetailView.js
 * Detail view for creating/editing a search filter inline (not in a modal).
 * Renders the ScopeSelector on the page with name, description, and CRUD actions.
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { ScopeSelector } from '../components/ScopeSelector.js';
import { PageHeader } from '../utils/PageHeader.js';
import { escapeHtml } from '../utils/htmlUtils.js';

export class SearchFilterDetailView extends BaseView {
  /**
   * @param {HTMLElement} container
   * @param {string} filterId - The filter ID or 'new' for creation
   * @param {Object} options
   */
  constructor(container, filterId, options = {}) {
    super(container, options);
    this.filterId = filterId;
    this.filter = null;
    this.isNewFilter = false;
    this.scopeSelector = null;

    this.formState = {
      name: '',
      description: ''
    };
  }

  async render() {
    if (this.filterId === 'new') {
      this.isNewFilter = true;
      this.filter = null;
      this.formState = { name: '', description: '' };
    } else {
      this.filter = DataService.getSearchFilter(this.filterId);
      if (!this.filter) {
        this.renderNotFound('Search Filter');
        return;
      }
      this.formState = {
        name: this.filter.name || '',
        description: this.filter.description || ''
      };
    }

    const title = this.isNewFilter ? 'New Search Filter' : this.filter.name;
    const breadcrumbs = [
      { label: 'Search Filters', href: '#/search-filters' },
      this.isNewFilter ? 'New Filter' : this.filter.name
    ];

    const actionsHtml = `
      <div class="search-filter-detail-actions">
        ${!this.isNewFilter ? `
          <button class="btn btn-danger btn-small" id="filter-delete-btn">Delete</button>
        ` : ''}
        <a href="#/search-filters" class="btn btn-secondary btn-small">Cancel</a>
        <button class="btn btn-primary btn-small" id="filter-save-btn">
          ${this.isNewFilter ? 'Create Filter' : 'Save'}
        </button>
      </div>
    `;

    const headerHtml = PageHeader.render({
      breadcrumbs,
      title,
      actions: actionsHtml
    });

    this.container.innerHTML = `
      ${headerHtml}

      <div class="content-area" style="max-width: 920px; margin: 0 auto;">
        <div class="monitor-editor-form">
          <div class="form-group">
            <label class="form-label" for="filter-name">Filter Name</label>
            <input
              type="text"
              id="filter-name"
              class="form-input"
              placeholder="Enter filter name..."
              value="${escapeHtml(this.formState.name)}"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="filter-description">Description <span class="text-muted">(optional)</span></label>
            <input
              type="text"
              id="filter-description"
              class="form-input"
              placeholder="Brief description of this filter..."
              value="${escapeHtml(this.formState.description)}"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Filter Contents</label>
            <p class="form-help-text">Type to filter entities or press Enter to add as keyword</p>
            <div id="scope-selector-container"></div>
          </div>
        </div>
      </div>
    `;

    this.initScopeSelector();
    this.attachFormListeners();
  }

  initScopeSelector() {
    const container = this.container.querySelector('#scope-selector-container');
    if (!container) return;

    this.scopeSelector = new ScopeSelector(container, {
      showSaveFilter: false,
      showSearchFilters: true,
      onChange: () => {}
    });

    const scope = this.isNewFilter ? {} : (this.filter.scope || {});
    this.scopeSelector.setScope(scope);
  }

  attachFormListeners() {
    const nameInput = this.container.querySelector('#filter-name');
    if (nameInput) {
      this.addListener(nameInput, 'input', (e) => {
        this.formState.name = e.target.value;
      });
    }

    const descInput = this.container.querySelector('#filter-description');
    if (descInput) {
      this.addListener(descInput, 'input', (e) => {
        this.formState.description = e.target.value;
      });
    }

    const saveBtn = this.container.querySelector('#filter-save-btn');
    if (saveBtn) {
      this.addListener(saveBtn, 'click', () => this.save());
    }

    const deleteBtn = this.container.querySelector('#filter-delete-btn');
    if (deleteBtn) {
      this.addListener(deleteBtn, 'click', () => this.deleteFilter());
    }
  }

  save() {
    if (!this.formState.name.trim()) {
      alert('Please enter a filter name');
      this.container.querySelector('#filter-name')?.focus();
      return;
    }

    const scope = this.scopeSelector?.getScope() || {};

    const hasEntities = Object.keys(scope)
      .filter(k => k !== 'mode')
      .some(k => Array.isArray(scope[k]) && scope[k].length > 0);
    if (!hasEntities) {
      alert('Please select at least one entity or keyword.');
      return;
    }

    if (this.isNewFilter) {
      const newFilter = dataStore.createSearchFilter({
        name: this.formState.name.trim(),
        description: this.formState.description.trim() || undefined,
        scope: scope
      });
      window.location.hash = '#/search-filters';
    } else {
      dataStore.updateSearchFilter(this.filterId, {
        name: this.formState.name.trim(),
        description: this.formState.description.trim() || undefined,
        scope: scope
      });
      window.location.hash = '#/search-filters';
    }
  }

  deleteFilter() {
    if (!this.filter) return;

    if (confirm(`Are you sure you want to delete "${this.filter.name}"?`)) {
      dataStore.deleteSearchFilter(this.filterId);
      window.location.hash = '#/search-filters';
    }
  }

  destroy() {
    if (this.scopeSelector) {
      this.scopeSelector.destroy();
      this.scopeSelector = null;
    }
    super.destroy();
  }
}

export default SearchFilterDetailView;
