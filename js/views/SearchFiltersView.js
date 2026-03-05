/**
 * SearchFiltersView.js
 * List view for all saved search filters displayed in a table
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
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
        { label: 'Monitors', href: '#/monitors' },
        'Search Filters'
      ],
      title: 'Search Filters',
      subtitle: `${filters.length} saved filter${filters.length !== 1 ? 's' : ''}`,
      actions: `<a href="#/search-filters/new" class="btn btn-primary btn-small">+ New Filter</a>`
    });

    this.container.innerHTML = `
      ${headerHtml}

      <div class="content-area">
        <div id="filters-table-container">
          ${this.renderTable(filters)}
        </div>
      </div>
    `;

    this.attachListeners(filters);
  }

  renderTable(filters) {
    if (filters.length === 0) {
      return `
        <div class="empty-state" style="padding: var(--space-2xl); text-align: center;">
          <p>No saved search filters yet.</p>
          <p style="margin-top: var(--space-sm);"><a href="#/search-filters/new" class="btn btn-primary btn-small">Create your first filter</a></p>
        </div>
      `;
    }

    const rows = filters.map(filter => {
      const itemCount = getScopeItemCount(filter.scope);
      const description = filter.description || '';
      const created = filter.createdAt ? formatDateLong(filter.createdAt) : '—';
      const updated = filter.updatedAt ? formatDateLong(filter.updatedAt) : '—';

      return `
        <tr class="document-row clickable" data-filter-id="${escapeHtml(filter.id)}">
          <td class="filter-col-name">
            <a href="#/${filter.id}/" class="doc-title-link">${escapeHtml(filter.name)}</a>
          </td>
          <td class="filter-col-description">${escapeHtml(description) || '<span class="doc-empty-cell">—</span>'}</td>
          <td class="filter-col-items">${itemCount} item${itemCount !== 1 ? 's' : ''}</td>
          <td class="filter-col-created">${created}</td>
          <td class="filter-col-updated">${updated}</td>
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
              <th><span class="th-content">Filter Items</span></th>
              <th><span class="th-content">Created</span></th>
              <th><span class="th-content">Updated</span></th>
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
        const filterId = row.dataset.filterId;
        window.location.hash = `#/${filterId}/`;
      });
    });
  }

  destroy() {
    super.destroy();
  }
}

export default SearchFiltersView;
