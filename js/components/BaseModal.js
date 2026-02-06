/**
 * BaseModal.js
 * Base class for modal dialogs providing shared functionality
 * 
 * Provides:
 * - DOM element references (modalContainer, modalContent, backdrop)
 * - Event handling (backdrop click, escape key)
 * - Open/close lifecycle with proper cleanup
 * - Standard size variants (sm, md, lg)
 * - escapeHtml utility delegation
 * 
 * Usage:
 *   class MyModal extends BaseModal {
 *     constructor() {
 *       super('md'); // size: 'sm' | 'md' | 'lg'
 *     }
 *     
 *     open() {
 *       // Set up content
 *       this.modalContent.innerHTML = `...`;
 *       this.show();
 *     }
 *   }
 */

import { escapeHtml } from '../utils/htmlUtils.js';

// Size class mappings
const SIZE_CLASSES = {
  sm: 'modal-sm',   // 400px - confirmations, simple forms
  md: 'modal-md',   // 500px - standard forms
  lg: 'modal-lg'    // 640px - complex editors with sidebars
};

export class BaseModal {
  /**
   * @param {string} size - Modal size: 'sm' | 'md' | 'lg'
   */
  constructor(size = 'md') {
    this.modalContainer = document.getElementById('modal-container');
    this.modalContent = this.modalContainer?.querySelector('.modal-content');
    this.backdrop = this.modalContainer?.querySelector('.modal-backdrop');
    
    this.size = size;
    this.sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
    
    // Bind handlers to preserve context
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Show the modal - call after setting up content
   * Adds size class, shows container, attaches event listeners
   */
  show() {
    if (!this.modalContainer || !this.modalContent) {
      console.error('BaseModal: Modal container not found');
      return;
    }

    // Add size class
    this.modalContent.classList.add(this.sizeClass);
    
    // Show modal
    this.modalContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Attach event listeners
    this.backdrop?.addEventListener('click', this.handleBackdropClick);
    document.addEventListener('keydown', this.handleKeyDown);
    
    // Focus first focusable element
    this.focusFirst();
  }

  /**
   * Close the modal and clean up
   * Removes size class, hides container, removes event listeners
   */
  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.add('hidden');
    }
    
    if (this.modalContent) {
      this.modalContent.classList.remove(this.sizeClass);
    }
    
    document.body.style.overflow = '';

    // Remove event listeners
    this.backdrop?.removeEventListener('click', this.handleBackdropClick);
    document.removeEventListener('keydown', this.handleKeyDown);
    
    // Call cleanup hook for subclasses
    this.onClose();
  }

  /**
   * Hook for subclasses to perform cleanup on close
   * Override in subclass if needed
   */
  onClose() {
    // Override in subclass for custom cleanup
  }

  /**
   * Handle backdrop click - close if clicking the backdrop itself
   */
  handleBackdropClick(e) {
    if (e.target === this.backdrop) {
      this.close();
    }
  }

  /**
   * Handle keydown - close on Escape
   */
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  /**
   * Focus the first focusable element in the modal
   */
  focusFirst() {
    const focusable = this.modalContent?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }

  /**
   * Escape HTML to prevent XSS
   * Delegates to centralized utility
   */
  escapeHtml(text) {
    return escapeHtml(text);
  }

  /**
   * Render standard modal header
   * @param {string} title - Modal title
   * @param {boolean} showClose - Whether to show close button (default: true)
   */
  renderHeader(title, showClose = true) {
    return `
      <div class="modal-header">
        <h3 class="modal-title">${this.escapeHtml(title)}</h3>
        ${showClose ? '<button class="modal-close" aria-label="Close">&times;</button>' : ''}
      </div>
    `;
  }

  /**
   * Render standard modal footer with buttons
   * @param {Array} buttons - Array of button configs: { text, class, id, type }
   */
  renderFooter(buttons = []) {
    const buttonHtml = buttons.map(btn => {
      const btnClass = btn.class || 'btn';
      const btnType = btn.type || 'button';
      const btnId = btn.id ? `id="${btn.id}"` : '';
      return `<button type="${btnType}" class="${btnClass}" ${btnId}>${this.escapeHtml(btn.text)}</button>`;
    }).join('');
    
    return `<div class="modal-footer">${buttonHtml}</div>`;
  }

  /**
   * Attach close button listener after rendering
   * Call this after setting innerHTML if using renderHeader
   */
  attachCloseListener() {
    const closeBtn = this.modalContent?.querySelector('.modal-close');
    closeBtn?.addEventListener('click', () => this.close());
  }
}

export default BaseModal;
