/**
 * SearchFilterEditorModal.js
 * Modal component for creating and editing search filters
 * Uses ScopeSelector component for entity/keyword selection
 */

import { BaseModal } from './BaseModal.js';
import { dataStore } from '../data/DataStore.js';
import { ScopeSelector } from './ScopeSelector.js';

export class SearchFilterEditorModal extends BaseModal {
  constructor() {
    super('lg'); // Large size modal for scope selector
    
    // Current filter being edited (null for create mode)
    this.editingFilter = null;
    
    // Form state
    this.formState = {
      name: '',
      description: ''
    };
    
    // ScopeSelector instance
    this.scopeSelector = null;
    
    // Callback for when save/delete completes
    this.onSaveCallback = null;
  }

  /**
   * Open the modal for creating a new filter
   * @param {Function} onSave - Callback when filter is saved
   */
  openCreate(onSave) {
    this.editingFilter = null;
    this.onSaveCallback = onSave;
    this.formState = {
      name: '',
      description: ''
    };
    this.render('Create Search Filter');
    this.attachFormListeners();
    this.show();
    
    // Initialize ScopeSelector with empty scope
    this.initScopeSelector({});
  }

  /**
   * Open the modal for editing an existing filter
   * @param {Object} filter - The filter to edit
   * @param {Function} onSave - Callback when filter is saved/deleted
   */
  openEdit(filter, onSave) {
    this.editingFilter = filter;
    this.onSaveCallback = onSave;
    
    this.formState = {
      name: filter.name || '',
      description: filter.description || ''
    };
    
    this.render('Edit Search Filter');
    this.attachFormListeners();
    this.show();
    
    // Initialize ScopeSelector with filter's scope
    this.initScopeSelector(filter.scope || {});
  }

  /**
   * Initialize the ScopeSelector component
   */
  initScopeSelector(scope) {
    const container = this.modalContent?.querySelector('#scope-selector-container');
    if (!container) {
      console.error('SearchFilterEditorModal: Scope selector container not found');
      return;
    }
    
    // Create ScopeSelector instance - hide save filter option since we're already
    // in the filter editor, but show search filters so users can build on existing ones
    this.scopeSelector = new ScopeSelector(container, {
      showSaveFilter: false,
      showSearchFilters: true,
      onChange: (newScope) => {
        // Scope changes are handled internally by ScopeSelector
      }
    });
    
    // Set initial scope and render
    this.scopeSelector.setScope(scope);
  }

  /**
   * Render the modal content
   */
  render(title) {
    const isEditing = this.editingFilter !== null;

    this.modalContent.innerHTML = `
      ${this.renderHeader(title)}
      <div class="modal-body monitor-editor-body">
        <div class="monitor-editor-form">
          <!-- Filter Name -->
          <div class="form-group">
            <label class="form-label" for="filter-name">Filter Name</label>
            <input 
              type="text" 
              id="filter-name" 
              class="form-input" 
              placeholder="Enter filter name..."
              value="${this.escapeHtml(this.formState.name)}"
            />
          </div>
          
          <!-- Filter Description -->
          <div class="form-group">
            <label class="form-label" for="filter-description">Description <span class="text-muted">(optional)</span></label>
            <input 
              type="text" 
              id="filter-description" 
              class="form-input" 
              placeholder="Brief description of this filter..."
              value="${this.escapeHtml(this.formState.description)}"
            />
          </div>
          
          <!-- Scope Selector -->
          <div class="form-group">
            <label class="form-label">Filter Contents</label>
            <p class="form-help-text">Type to filter entities or press Enter to add as keyword</p>
            <div id="scope-selector-container"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer ${isEditing ? 'modal-footer-space-between' : ''}">
        ${isEditing ? `
          <button class="btn btn-danger" id="filter-delete">Delete Filter</button>
          <div class="modal-footer-actions">
            <button class="btn btn-secondary" id="filter-cancel">Cancel</button>
            <button class="btn btn-primary" id="filter-save">Save Filter</button>
          </div>
        ` : `
          <button class="btn btn-secondary" id="filter-cancel">Cancel</button>
          <button class="btn btn-primary" id="filter-save">Save Filter</button>
        `}
      </div>
    `;
  }

  /**
   * Attach form-specific event listeners
   */
  attachFormListeners() {
    // Close button
    this.attachCloseListener();
    
    // Cancel button
    const cancelBtn = this.modalContent.querySelector('#filter-cancel');
    cancelBtn?.addEventListener('click', () => this.close());
    
    // Save button
    const saveBtn = this.modalContent.querySelector('#filter-save');
    saveBtn?.addEventListener('click', () => this.save());
    
    // Delete button (only in edit mode)
    const deleteBtn = this.modalContent.querySelector('#filter-delete');
    deleteBtn?.addEventListener('click', () => this.delete());
    
    // Name input
    const nameInput = this.modalContent.querySelector('#filter-name');
    nameInput?.addEventListener('input', (e) => {
      this.formState.name = e.target.value;
    });
    
    // Description input
    const descInput = this.modalContent.querySelector('#filter-description');
    descInput?.addEventListener('input', (e) => {
      this.formState.description = e.target.value;
    });
  }

  /**
   * Save the filter
   */
  save() {
    // Validate name
    if (!this.formState.name.trim()) {
      alert('Please enter a filter name');
      const nameInput = this.modalContent.querySelector('#filter-name');
      nameInput?.focus();
      return;
    }
    
    // Get scope from ScopeSelector
    const scope = this.scopeSelector?.getScope() || {};
    
    // Check if filter has content - either entities/keywords (simple) or booleanExpression (advanced)
    const hasEntities = Object.keys(scope)
      .some(k => Array.isArray(scope[k]) && scope[k].length > 0);
    const hasBoolean = scope.mode === 'advanced' && scope.booleanExpression?.trim();
    
    if (!hasEntities && !hasBoolean) {
      alert('Please select at least one entity or keyword, or enter a boolean expression');
      return;
    }
    
    if (this.editingFilter) {
      // Update existing filter
      dataStore.updateSearchFilter(this.editingFilter.id, {
        name: this.formState.name.trim(),
        description: this.formState.description.trim() || undefined,
        scope: scope
      });
    } else {
      // Create new filter
      dataStore.createSearchFilter({
        name: this.formState.name.trim(),
        description: this.formState.description.trim() || undefined,
        scope: scope
      });
    }
    
    const callback = this.onSaveCallback;
    this.close();
    
    if (callback) {
      callback();
    }
  }

  /**
   * Delete the filter
   */
  delete() {
    if (!this.editingFilter) return;
    
    if (confirm(`Are you sure you want to delete "${this.editingFilter.name}"?`)) {
      dataStore.deleteSearchFilter(this.editingFilter.id);
      const callback = this.onSaveCallback;
      this.close();
      
      if (callback) {
        callback();
      }
    }
  }

  /**
   * Cleanup when modal closes
   */
  onClose() {
    // Clean up ScopeSelector
    if (this.scopeSelector) {
      this.scopeSelector.destroy();
      this.scopeSelector = null;
    }
    
    this.editingFilter = null;
    this.onSaveCallback = null;
  }
}

// Singleton instance
let filterEditorInstance = null;

/**
 * Get the singleton SearchFilterEditorModal instance
 * @returns {SearchFilterEditorModal}
 */
export function getSearchFilterEditor() {
  if (!filterEditorInstance) {
    filterEditorInstance = new SearchFilterEditorModal();
  }
  return filterEditorInstance;
}

export default SearchFilterEditorModal;
