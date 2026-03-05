/**
 * SearchFiltersView.js
 * List view for all saved search filters displayed in a table
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { Dropdown } from '../components/Dropdown.js';
import { PageHeader } from '../utils/PageHeader.js';
import { formatDateLong } from '../utils/formatters.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import { getScopeItemCount } from '../utils/scopeUtils.js';

export class SearchFiltersView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
  }

  async render() {
    const filters = DataService.getSearchFilters();

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: '← All Filters', href: '#/search-filters' }
      ],
      title: 'Saved Filters',
      subtitle: `${filters.length} saved filter${filters.length !== 1 ? 's' : ''}`,
      actions: `<a href="#/search-filters/new" class="btn btn-primary">+ New Filter</a>`
    });

    this.container.innerHTML = `
      <div style="max-width: 1520px; margin: 0 auto;">
        ${headerHtml}

        <div class="content-area">
          <div id="filters-table-container">
            ${this.renderTable(filters)}
          </div>
        </div>
      </div>
    `;

    this.attachListeners(filters);
  }

  renderTable(filters) {
    if (filters.length === 0) {
      return `
        <div class="empty-state" style="padding: var(--space-2xl); text-align: center;">
          <p>No saved filters yet.</p>
          <p style="margin-top: var(--space-sm);"><a href="#/search-filters/new" class="btn btn-primary btn-small">Create your first filter</a></p>
        </div>
      `;
    }

    const allDocs = DataService.getDocuments();

    const rows = filters.map(filter => {
      const itemCount = getScopeItemCount(filter.scope);
      const description = filter.description || '';
      const created = filter.createdAt ? formatDateLong(filter.createdAt) : '—';
      const updated = filter.updatedAt ? formatDateLong(filter.updatedAt) : '—';
      const docCount = filter.scope
        ? allDocs.filter(doc => DataService.documentMatchesScope(doc, filter.scope)).length
        : 0;

      return `
        <tr class="document-row clickable" data-filter-id="${escapeHtml(filter.id)}">
          <td class="filter-col-name">
            <a href="#/${filter.id}/" class="doc-title-link">${escapeHtml(filter.name)}</a>
          </td>
          <td class="filter-col-description">${escapeHtml(description) || '<span class="doc-empty-cell">—</span>'}</td>
          <td class="filter-col-items">${itemCount} item${itemCount !== 1 ? 's' : ''}</td>
          <td class="filter-col-docs">${docCount} doc${docCount !== 1 ? 's' : ''}</td>
          <td class="filter-col-default">
            <input type="checkbox" class="filter-default-checkbox" data-filter-id="${escapeHtml(filter.id)}" ${filter.onByDefault ? 'checked' : ''} />
          </td>
          <td class="filter-col-created">${created}</td>
          <td class="filter-col-updated">${updated}</td>
          <td class="filter-col-actions">
            <div class="dropdown dropdown--icon-trigger" data-dropdown data-dropdown-align="right">
              <button class="dropdown-trigger" data-dropdown-trigger aria-label="Actions">
                <svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg>
              </button>
              <div class="dropdown-menu" data-dropdown-menu aria-hidden="true">
                <button class="dropdown-item" data-action="rename" data-filter-id="${escapeHtml(filter.id)}">Rename</button>
                <button class="dropdown-item" data-action="duplicate" data-filter-id="${escapeHtml(filter.id)}">Duplicate</button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item dropdown-item--danger" data-action="delete" data-filter-id="${escapeHtml(filter.id)}">Delete</button>
              </div>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="table-container document-table-container">
        <table class="table document-table">
          <thead>
            <tr>
              <th><span class="th-content">Name</span></th>
              <th><span class="th-content">Description</span></th>
              <th><span class="th-content">Filter Count</span></th>
              <th><span class="th-content">Indexed documents</span></th>
              <th><span class="th-content">On by default</span></th>
              <th><span class="th-content">Created</span></th>
              <th><span class="th-content">Updated</span></th>
              <th><span class="th-content">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  attachListeners(filters) {
    const rows = this.container.querySelectorAll('.document-row[data-filter-id]');
    rows.forEach(row => {
      this.addListener(row, 'click', (e) => {
        if (e.target.closest('a')) return;
        if (e.target.closest('[data-dropdown]')) return;
        if (e.target.closest('.filter-default-checkbox')) return;
        const filterId = row.dataset.filterId;
        window.location.hash = `#/${filterId}/`;
      });
    });

    const checkboxes = this.container.querySelectorAll('.filter-default-checkbox');
    checkboxes.forEach(cb => {
      this.addListener(cb, 'change', (e) => {
        const filterId = cb.dataset.filterId;
        dataStore.updateSearchFilter(filterId, { onByDefault: cb.checked });
      });
    });

    this.dropdowns = Dropdown.initAll(this.container);

    this.container.addEventListener('dropdown:select', (e) => {
      const item = e.detail.item;
      const action = item.dataset.action;
      const filterId = item.dataset.filterId;
      if (!action || !filterId) return;

      const filter = filters.find(f => f.id === filterId);
      if (!filter) return;

      switch (action) {
        case 'rename':
          this.renameFilter(filter);
          break;
        case 'duplicate':
          this.duplicateFilter(filter);
          break;
        case 'delete':
          this.deleteFilter(filter);
          break;
      }
    });
  }

  renameFilter(filter) {
    const newName = prompt('Rename filter:', filter.name);
    if (newName && newName.trim() && newName.trim() !== filter.name) {
      dataStore.updateSearchFilter(filter.id, { name: newName.trim() });
      this.render();
    }
  }

  duplicateFilter(filter) {
    dataStore.createSearchFilter({
      name: `${filter.name} (copy)`,
      description: filter.description || '',
      scope: JSON.parse(JSON.stringify(filter.scope || {}))
    });
    this.render();
  }

  deleteFilter(filter) {
    if (confirm(`Are you sure you want to delete "${filter.name}"?`)) {
      dataStore.deleteSearchFilter(filter.id);
      this.render();
    }
  }

  destroy() {
    if (this.dropdowns) {
      this.dropdowns.forEach(d => d.destroy());
    }
    super.destroy();
  }
}

export default SearchFiltersView;
