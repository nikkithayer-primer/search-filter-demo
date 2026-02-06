/**
 * SourceViewerModal.js
 * Modal for viewing the aggregated sources that contribute to a narrative/theme
 */

import { BaseModal } from './BaseModal.js';

export class SourceViewerModal extends BaseModal {
  constructor() {
    super('md'); // Medium size modal
  }

  /**
   * Open the source viewer modal for a narrative or theme
   * @param {Object} item - The narrative or theme object
   * @param {string} type - 'narrative' or 'subnarrative'
   */
  open(item, type = 'narrative') {
    const typeLabel = type === 'subnarrative' ? 'Theme' : 'Narrative';

    this.modalContent.innerHTML = `
      ${this.renderHeader('Source Viewer')}
      <div class="modal-body">
        <div class="source-viewer-content">
          <div class="source-viewer-item-info">
            <span class="source-viewer-type">${typeLabel}</span>
            <h4 class="source-viewer-title">${this.escapeHtml(item.text) || 'Untitled'}</h4>
          </div>
          <div class="source-viewer-placeholder">
            <div class="source-viewer-icon">📄</div>
            <p class="source-viewer-message">Source documents will be displayed here.</p>
            <p class="source-viewer-hint">This view aggregates the original documents, articles, and posts that contributed to this ${typeLabel.toLowerCase()}.</p>
          </div>
        </div>
      </div>
      ${this.renderFooter([{ text: 'Close', class: 'btn', id: 'source-viewer-close' }])}
    `;

    // Attach close button listeners
    this.attachCloseListener();
    const footerCloseBtn = this.modalContent.querySelector('#source-viewer-close');
    footerCloseBtn?.addEventListener('click', () => this.close());

    this.show();
  }
}

// Singleton instance
let sourceViewerInstance = null;

/**
 * Get the singleton SourceViewerModal instance
 * @returns {SourceViewerModal}
 */
export function getSourceViewer() {
  if (!sourceViewerInstance) {
    sourceViewerInstance = new SourceViewerModal();
  }
  return sourceViewerInstance;
}

export default SourceViewerModal;
