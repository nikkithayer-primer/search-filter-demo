/**
 * SearchScopeModal.js
 * Modal that shows the ScopeSelector for choosing search filters.
 * Used on the Search page instead of an inline panel.
 */

import { BaseModal } from './BaseModal.js';
import { ScopeSelector } from './ScopeSelector.js';

export class SearchScopeModal extends BaseModal {
  constructor() {
    super('lg');
    this.scopeSelector = null;
    this.onApplyCallback = null;
  }

  /**
   * Open the modal with the given scope and scope params.
   * @param {Object} opts
   * @param {Object} opts.scope - Current filter scope (entities, keywords, metadata)
   * @param {Object} opts.scopeParams - { repositoryIds, classifications, timeRange }
   * @param {Function} opts.getVolumeData - Returns volume data for date histogram
   * @param {Function} opts.onApply - (scope, scopeParams) => void
   */
  open(opts = {}) {
    this.onApplyCallback = opts.onApply || (() => {});
    this._initialScope = opts.scope || {};
    this._initialScopeParams = opts.scopeParams || { repositoryIds: [], classifications: [], timeRange: null };
    this._getVolumeData = opts.getVolumeData || null;

    this.renderModal();
    this.attachListeners();
    this.show();
    // Defer ScopeSelector init so the modal container has real dimensions
    // (needed for the D3 TimeRangeFilter histogram to measure its width)
    requestAnimationFrame(() => this.initScopeSelector());
  }

  initScopeSelector() {
    const container = this.modalContent?.querySelector('#scope-selector-container');
    if (!container) return;

    this.scopeSelector = new ScopeSelector(container, {
      showSaveFilter: true,
      showSearchFilters: true,
      showScopeSection: true,
      showDateInScope: true,
      initialScopeParams: this._initialScopeParams,
      onScopeParamsChange: () => {},
      getVolumeData: this._getVolumeData,
      onChange: () => {}
    });
    this.scopeSelector.setScope(this._initialScope);
  }

  renderModal() {
    this.modalContent.innerHTML = `
      ${this.renderHeader('Filters')}
      <div class="modal-body monitor-editor-body">
        <div class="monitor-editor-form">
          <div class="form-group">
            <p class="form-help-text">Type to filter entities or press Enter to add as keyword</p>
            <div id="scope-selector-container"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="scope-modal-cancel">Cancel</button>
        <button class="btn btn-primary" id="scope-modal-apply">Apply</button>
      </div>
    `;
  }

  attachListeners() {
    this.attachCloseListener();
    this.modalContent?.querySelector('#scope-modal-cancel')?.addEventListener('click', () => this.close());
    this.modalContent?.querySelector('#scope-modal-apply')?.addEventListener('click', () => this.handleApply());
  }

  handleApply() {
    if (this.scopeSelector && this.onApplyCallback) {
      const scope = this.scopeSelector.getScope();
      const scopeParams = this.scopeSelector.getScopeParams();
      this.onApplyCallback(scope, scopeParams);
    }
    this.close();
  }

  onClose() {
    if (this.scopeSelector) {
      this.scopeSelector.destroy();
      this.scopeSelector = null;
    }
    this.onApplyCallback = null;
  }
}
