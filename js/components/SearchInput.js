/**
 * SearchInput.js
 * Shared search/chat input component with card styling, filters pill, and submit button.
 * Used in both the main Search page and the Chat sidebar.
 */

import { SearchScopeModal } from './SearchScopeModal.js';
import { DataService } from '../data/DataService.js';
import { escapeHtml } from '../utils/htmlUtils.js';

export class SearchInput {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.container - DOM element to render into
   * @param {'full'|'sidebar'} [options.variant='full'] - 'full' for search page, 'sidebar' for chat
   * @param {string} [options.placeholder] - Input placeholder text
   * @param {boolean} [options.multiline=false] - Use textarea instead of input
   * @param {boolean} [options.showFilters=true] - Show the Filters pill button
   * @param {function} [options.onSubmit] - Called with (query, scope) on submit
   * @param {function} [options.onInput] - Called with (query) on text input
   * @param {function} [options.onScopeChange] - Called with (scope) when filters change
   */
  constructor(options = {}) {
    this.container = options.container;
    this.variant = options.variant || 'full';
    this.placeholder = options.placeholder || 'Ask a question...';
    this.multiline = options.multiline ?? (this.variant === 'sidebar');
    this.showFilters = options.showFilters ?? true;
    this.onSubmit = options.onSubmit || null;
    this.onInput = options.onInput || null;
    this.onScopeChange = options.onScopeChange || null;

    this.query = '';
    this.searchScope = { personIds: [], organizationIds: [], locationIds: [], keywords: [], documentTypes: [], metadataFilters: {} };
    this.selectedRepositories = new Set();
    this.selectedClassifications = new Set();
    this.timeRange = null;
    this.filterModal = new SearchScopeModal();

    this._listeners = [];

    this.initializeRepositories();
  }

  initializeRepositories() {
    const repositories = DataService.getRepositories();
    this.selectedRepositories = new Set(repositories.map(r => r.id));
  }

  /** Total count of active scope filter items */
  getScopeItemCount() {
    const scope = this.searchScope;
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

  hasAnyScope() {
    const scope = this.searchScope;
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

  /** Render into the container element */
  render() {
    if (!this.container) return;

    const isSidebar = this.variant === 'sidebar';
    const scopeCount = this.getScopeItemCount();
    const hasQuery = this.query.trim().length >= 2;
    const hasScope = this.hasAnyScope();
    const canSubmit = hasScope || hasQuery;

    const inputEl = this.multiline
      ? `<textarea class="search-card-input" id="si-input" placeholder="${escapeHtml(this.placeholder)}" rows="1">${escapeHtml(this.query)}</textarea>`
      : `<input type="text" class="search-card-input" id="si-input" placeholder="${escapeHtml(this.placeholder)}" value="${escapeHtml(this.query)}" />`;

    this.container.innerHTML = `
      <div class="search-card ${isSidebar ? 'search-card--sidebar' : ''}">
        <div class="search-card-input-area">
          ${inputEl}
          <button class="btn-icon search-clear-btn ${this.query ? '' : 'hidden'}" id="si-clear">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 4l8 8M12 4l-8 8"/>
            </svg>
          </button>
        </div>
        <div class="search-card-controls">
          <div class="search-card-buttons">
            <div class="search-mode-dropdown" id="si-mode-dropdown">
              <button class="search-card-pill" id="si-mode-btn">
                <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/>
                </svg>
                <span id="si-mode-label">Search</span>
                <svg class="search-mode-chevron" viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 6l4 4 4-4"/>
                </svg>
              </button>
              <div class="search-mode-menu" id="si-mode-menu">
                <button class="search-mode-option" data-mode="search">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/>
                  </svg>
                  <span class="search-mode-option-label">Search</span>
                  <span class="search-mode-option-count">1,000+ docs</span>
                </button>
                <button class="search-mode-option" data-mode="ask">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M2 3h12v8H5l-3 3V3z"/>
                  </svg>
                  <span class="search-mode-option-label">Ask</span>
                  <span class="search-mode-option-count">1,000 docs</span>
                </button>
                <button class="search-mode-option" data-mode="focus">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M1.0663409,1.6418284c.1482999-.3866299.51956-.64185.93366-.64185h11.9999599c.4140997,0,.7854004.2552201.9336996.64185.1483002.3866301.0430002.8246701-.2648993,1.1016099l-4.5973005,4.1355503v7.1209898c0,.3830996-.2189398.7326002-.5636702.8998003-.3447294.1672001-.7546797.1226997-1.0555401-.1145l-2.1428494-1.6897001c-.24049-.1896-.3808303-.4790001-.3808303-.7853003v-5.4312897L1.3312209,2.7434384c-.30786-.2769399-.413191-.7149799-.2648799-1.1016099Z" fill="currentColor" stroke="none"/>
                  </svg>
                  <span class="search-mode-option-label">Focus</span>
                  <span class="search-mode-option-count">1,000 docs</span>
                </button>
              </div>
            </div>
            ${this.showFilters ? `
            <button class="search-card-pill" id="si-filters">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.0663409,1.6418284c.1482999-.3866299.51956-.64185.93366-.64185h11.9999599c.4140997,0,.7854004.2552201.9336996.64185.1483002.3866301.0430002.8246701-.2648993,1.1016099l-4.5973005,4.1355503v7.1209898c0,.3830996-.2189398.7326002-.5636702.8998003-.3447294.1672001-.7546797.1226997-1.0555401-.1145l-2.1428494-1.6897001c-.24049-.1896-.3808303-.4790001-.3808303-.7853003v-5.4312897L1.3312209,2.7434384c-.30786-.2769399-.413191-.7149799-.2648799-1.1016099ZM6.9285708,6.4334783v5.8768001l2.1428604,1.6897001v-7.5665002L13.9999609,1.9999784H2.000001l4.9285698,4.4334998Z" stroke-width="0"/>
              </svg>
              <span>Search Filters</span>
              ${scopeCount > 0 ? `<span class="filters-badge">${scopeCount}</span>` : ''}
            </button>
            ` : ''}
            <button class="btn btn-ghost search-advanced-btn" id="si-advanced">
              <svg height="1em" role="presentation" viewBox="0 0 16 16" width="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3,1c-1.1,0-2,.9-2,2v2.5c0,.3000002.2.5.5.5s.5-.1999998.5-.5v-2.5c0-.5999999.4000001-1,1-1h2.5c.3000002,0,.5-.2.5-.5s-.1999998-.5-.5-.5h-2.5ZM13.8999996,13.1000004l-2.6999998-2.6999998c.5-.6000004.8000002-1.500001.8000002-2.4000006,0-2.1999998-1.8000002-4-4-4s-4,1.8000002-4,4,1.8000002,4,4,4c.8999996,0,1.8000002-.3000002,2.5-.8000002l2.6999998,2.6999998c.1999998.1999998.5.1999998.6999998,0s.1000004-.5999994,0-.7999992ZM8,11c-1.6999998,0-3-1.3000002-3-3s1.3000002-3,3-3,3,1.3000002,3,3-1.3000002,3-3,3ZM3,15c-1.1,0-2-.8999996-2-2v-2.5c0-.3000002.2-.5.5-.5s.5.1999998.5.5v2.5c0,.6000004.4000001,1,1,1h2.5c.3000002,0,.5.1999998.5.5s-.1999998.5-.5.5h-2.5ZM15,3c0-1.1-.8999996-2-2-2h-2.5c-.3000002,0-.5.2-.5.5s.1999998.5.5.5h2.5c.6000004,0,1,.4000001,1,1v2.5c0,.3000002.1999998.5.5.5s.5-.1999998.5-.5v-2.5Z" stroke-width="0"/>
              </svg>
              <span>Advanced Search</span>
            </button>
          </div>
          <button class="search-card-submit ${canSubmit ? '' : 'disabled'}" id="si-submit">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="7" cy="7" r="4.5"/>
              <path d="M10.5 10.5L14 14"/>
            </svg>
          </button>
        </div>
      </div>${isSidebar ? `
      <div class="search-card-disclaimer">AI output may be inaccurate or partial. Verify with cited sources.</div>` : ''}
    `;

    this._bindEvents();
  }

  /** Wire up DOM event handlers */
  _bindEvents() {
    this._removeListeners();

    const input = this.container.querySelector('#si-input');
    const clearBtn = this.container.querySelector('#si-clear');
    const submitBtn = this.container.querySelector('#si-submit');
    const filtersBtn = this.container.querySelector('#si-filters');

    if (input) {
      this._addListener(input, 'input', () => {
        this.query = input.value || input.innerText || '';
        this._updateClearBtn();
        this._updateSubmitBtn();
        if (this.onInput) this.onInput(this.query);

        if (this.multiline) {
          input.style.height = 'auto';
          input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        }
      });

      this._addListener(input, 'keydown', (e) => {
        if (e.key === 'Enter' && (!this.multiline || !e.shiftKey)) {
          e.preventDefault();
          this._handleSubmit();
        }
        if (e.key === 'Escape') {
          this.clearQuery();
        }
      });
    }

    if (clearBtn) {
      this._addListener(clearBtn, 'click', () => this.clearQuery());
    }

    if (submitBtn) {
      this._addListener(submitBtn, 'click', () => this._handleSubmit());
    }

    if (filtersBtn) {
      this._addListener(filtersBtn, 'click', () => this._openFiltersModal());
    }

    const modeBtn = this.container.querySelector('#si-mode-btn');
    const modeMenu = this.container.querySelector('#si-mode-menu');
    const modeDropdown = this.container.querySelector('#si-mode-dropdown');

    if (modeBtn && modeMenu) {
      this._addListener(modeBtn, 'click', (e) => {
        e.stopPropagation();
        modeDropdown.classList.toggle('open');
      });

      modeMenu.querySelectorAll('.search-mode-option').forEach(opt => {
        this._addListener(opt, 'click', () => {
          const mode = opt.dataset.mode;
          const label = opt.querySelector('.search-mode-option-label')?.textContent || mode;
          const labelEl = this.container.querySelector('#si-mode-label');
          if (labelEl) labelEl.textContent = label;
          modeDropdown.classList.remove('open');
        });
      });

      this._addListener(document, 'click', (e) => {
        if (!modeDropdown.contains(e.target)) {
          modeDropdown.classList.remove('open');
        }
      });
    }
  }

  _handleSubmit() {
    const q = this.query.trim();
    const hasScope = this.hasAnyScope();
    if (!q && !hasScope) return;
    if (this.onSubmit) {
      this.onSubmit(q, this.searchScope);
    }
  }

  _openFiltersModal() {
    this.filterModal.open({
      scope: { ...this.searchScope },
      onApply: (scope) => {
        this.searchScope = scope || this.searchScope;
        this._updateFiltersBadge();
        this._updateSubmitBtn();
        if (this.onScopeChange) this.onScopeChange(this.searchScope);
      }
    });
  }

  _getDocumentVolumeData() {
    const documents = DataService.getDocuments();
    if (!documents || documents.length === 0) return null;
    const dateMap = new Map();
    documents.forEach(doc => {
      if (!doc.publishedDate) return;
      const date = doc.publishedDate.split('T')[0];
      dateMap.set(date, (dateMap.get(date) || 0) + 1);
    });
    const dates = [...dateMap.keys()].sort();
    const volumes = dates.map(d => dateMap.get(d));
    return { dates, volumes };
  }

  /** Clear the text query and reset input */
  clearQuery() {
    this.query = '';
    const input = this.container?.querySelector('#si-input');
    if (input) {
      input.value = '';
      if (this.multiline) input.style.height = 'auto';
      input.focus();
    }
    this._updateClearBtn();
    this._updateSubmitBtn();
    if (this.onInput) this.onInput('');
  }

  /** Get the current query text */
  getQuery() {
    return this.query;
  }

  /** Set the query text programmatically */
  setQuery(text) {
    this.query = text;
    const input = this.container?.querySelector('#si-input');
    if (input) input.value = text;
    this._updateClearBtn();
    this._updateSubmitBtn();
  }

  /** Focus the input element */
  focus() {
    const input = this.container?.querySelector('#si-input');
    if (input) input.focus();
  }

  // -- Private UI updaters --

  _updateClearBtn() {
    const btn = this.container?.querySelector('#si-clear');
    if (btn) btn.classList.toggle('hidden', !this.query);
  }

  _updateSubmitBtn() {
    const btn = this.container?.querySelector('#si-submit');
    if (!btn) return;
    const canSubmit = this.query.trim().length >= 2 || this.hasAnyScope();
    btn.classList.toggle('disabled', !canSubmit);
  }

  _updateFiltersBadge() {
    const filtersBtn = this.container?.querySelector('#si-filters');
    if (!filtersBtn) return;
    const count = this.getScopeItemCount();
    let badge = filtersBtn.querySelector('.filters-badge');
    if (count > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'filters-badge';
        filtersBtn.appendChild(badge);
      }
      badge.textContent = count;
    } else if (badge) {
      badge.remove();
    }
  }

  // -- Listener management --

  _addListener(el, event, handler, options) {
    if (!el) return;
    el.addEventListener(event, handler, options);
    this._listeners.push({ el, event, handler, options });
  }

  _removeListeners() {
    this._listeners.forEach(({ el, event, handler, options }) => {
      try { el.removeEventListener(event, handler, options); } catch (_) {}
    });
    this._listeners = [];
  }

  /** Clean up resources */
  destroy() {
    this._removeListeners();
    if (this.filterModal) {
      this.filterModal.close();
    }
  }
}

export default SearchInput;
