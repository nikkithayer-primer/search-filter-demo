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
   * Open the modal with the given scope.
   * @param {Object} opts
   * @param {Object} opts.scope - Current filter scope (entities, keywords, metadata)
   * @param {Function} opts.onApply - (scope) => void
   * @param {string[]|null} opts.contextDocIds - Document IDs to scope the filter catalog to
   */
  open(opts = {}) {
    this.onApplyCallback = opts.onApply || (() => {});
    this._initialScope = opts.scope || {};
    this._contextDocIds = opts.contextDocIds || null;

    this.renderModal();
    this.attachListeners();
    this.show();
    requestAnimationFrame(() => this.initScopeSelector());
  }

  initScopeSelector() {
    const container = this.modalContent?.querySelector('#scope-selector-container');
    if (!container) return;

    this.scopeSelector = new ScopeSelector(container, {
      showSaveFilter: true,
      showSearchFilters: true,
      contextDocIds: this._contextDocIds,
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
            <div id="scope-selector-container"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer scope-modal-footer">
        <button class="btn btn-ghost btn-lg" id="scope-modal-reset">Reset</button>
        <button class="btn btn-primary btn-lg" id="scope-modal-apply">Apply</button>
      </div>
    `;
  }

  attachListeners() {
    this.attachCloseListener();
    this.modalContent?.querySelector('#scope-modal-reset')?.addEventListener('click', () => this.handleReset());
    this.modalContent?.querySelector('#scope-modal-apply')?.addEventListener('click', () => this.handleApply());
  }

  handleReset() {
    if (this.scopeSelector) {
      this.scopeSelector.clearScope();
    }
  }

  handleApply() {
    if (this.scopeSelector && this.onApplyCallback) {
      const scope = this.scopeSelector.getScope();
      this.onApplyCallback(scope);
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
