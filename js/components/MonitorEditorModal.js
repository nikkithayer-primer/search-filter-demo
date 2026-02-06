/**
 * MonitorEditorModal.js
 * Modal component for creating and editing monitors
 * Uses ScopeSelector component for entity/keyword selection
 */

import { BaseModal } from './BaseModal.js';
import { dataStore } from '../data/DataStore.js';
import { ScopeSelector } from './ScopeSelector.js';

export class MonitorEditorModal extends BaseModal {
  constructor() {
    super('lg'); // Large size modal for scope selector
    
    // Current monitor being edited (null for create mode)
    this.editingMonitor = null;
    
    // Form state (name and logic only - scope managed by ScopeSelector)
    this.formState = {
      name: '',
      logic: 'OR'
    };
    
    // ScopeSelector instance
    this.scopeSelector = null;
    
    // Callback for when save completes
    this.onSaveCallback = null;
  }

  /**
   * Open the modal for creating a new monitor
   * @param {Function} onSave - Callback when monitor is saved
   * @param {Object} initialScope - Optional initial scope to pre-populate
   */
  openCreate(onSave, initialScope = {}) {
    this.editingMonitor = null;
    this.onSaveCallback = onSave;
    this.formState = {
      name: '',
      logic: 'OR'
    };
    this.render('Create Monitor');
    this.attachFormListeners();
    this.show();
    
    // Initialize ScopeSelector with initial scope (empty or from filter)
    this.initScopeSelector(initialScope);
  }

  /**
   * Open the modal for editing an existing monitor
   * @param {Object} monitor - The monitor to edit
   * @param {Function} onSave - Callback when monitor is saved
   */
  openEdit(monitor, onSave) {
    this.editingMonitor = monitor;
    this.onSaveCallback = onSave;
    
    this.formState = {
      name: monitor.name || '',
      logic: monitor.scope?.logic || 'OR'
    };
    
    this.render('Edit Monitor');
    this.attachFormListeners();
    this.show();
    
    // Initialize ScopeSelector with monitor's scope
    this.initScopeSelector(monitor.scope || {});
  }

  /**
   * Initialize the ScopeSelector component
   */
  initScopeSelector(scope) {
    const container = this.modalContent?.querySelector('#scope-selector-container');
    if (!container) {
      console.error('MonitorEditorModal: Scope selector container not found');
      return;
    }
    
    // Create ScopeSelector instance
    this.scopeSelector = new ScopeSelector(container, {
      showSaveFilter: true,
      showSearchFilters: true,
      onChange: (newScope) => {
        // Scope changes are handled internally by ScopeSelector
        // We just need to get the scope when saving
      }
    });
    
    // Set initial scope and render
    this.scopeSelector.setScope(scope);
  }

  /**
   * Render the modal content
   */
  render(title) {
    this.modalContent.innerHTML = `
      ${this.renderHeader(title)}
      <div class="modal-body monitor-editor-body">
        <div class="monitor-editor-form">
          <!-- Monitor Name -->
          <div class="form-group">
            <label class="form-label" for="monitor-name">Monitor Name</label>
            <input 
              type="text" 
              id="monitor-name" 
              class="form-input" 
              placeholder="Enter monitor name..."
              value="${this.escapeHtml(this.formState.name)}"
            />
          </div>
          
          <!-- Scope Logic -->
          <div class="form-group">
            <label class="form-label">Scope Logic</label>
            <div class="scope-logic-toggle">
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="scope-logic" 
                  value="OR" 
                  ${this.formState.logic === 'OR' ? 'checked' : ''}
                />
                <span class="radio-text">
                  <strong>OR</strong>
                  <span class="radio-desc">Match any selected item</span>
                </span>
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="scope-logic" 
                  value="AND" 
                  ${this.formState.logic === 'AND' ? 'checked' : ''}
                />
                <span class="radio-text">
                  <strong>AND</strong>
                  <span class="radio-desc">Match all selected items</span>
                </span>
              </label>
            </div>
          </div>
          
          <!-- Scope Selector -->
          <div class="form-group">
            <label class="form-label">Scope</label>
            <p class="form-help-text">Type to filter entities or press Enter to add as keyword</p>
            <div id="scope-selector-container"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="monitor-cancel">Cancel</button>
        <button class="btn btn-primary" id="monitor-save">Save Monitor</button>
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
    const cancelBtn = this.modalContent.querySelector('#monitor-cancel');
    cancelBtn?.addEventListener('click', () => this.close());
    
    // Save button
    const saveBtn = this.modalContent.querySelector('#monitor-save');
    saveBtn?.addEventListener('click', () => this.save());
    
    // Monitor name input
    const nameInput = this.modalContent.querySelector('#monitor-name');
    nameInput?.addEventListener('input', (e) => {
      this.formState.name = e.target.value;
    });
    
    // Scope logic radio buttons
    const logicRadios = this.modalContent.querySelectorAll('input[name="scope-logic"]');
    logicRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.formState.logic = e.target.value;
      });
    });
  }

  /**
   * Save the monitor
   */
  save() {
    // Validate name
    if (!this.formState.name.trim()) {
      alert('Please enter a monitor name');
      return;
    }
    
    // Get scope from ScopeSelector
    const scope = this.scopeSelector?.getScope() || {};
    
    // Check if at least one entity or keyword is selected
    const hasEntities = Object.keys(scope)
      .some(k => Array.isArray(scope[k]) && scope[k].length > 0);
    
    if (!hasEntities) {
      alert('Please select at least one entity or keyword to monitor');
      return;
    }
    
    // Build the full scope with logic
    const fullScope = {
      ...scope,
      logic: this.formState.logic
    };
    
    if (this.editingMonitor) {
      // Update existing monitor
      dataStore.updateMonitor(this.editingMonitor.id, {
        name: this.formState.name.trim(),
        scope: fullScope
      });
    } else {
      // Create new monitor
      dataStore.createMonitor({
        name: this.formState.name.trim(),
        scope: fullScope
      });
    }
    
    const callback = this.onSaveCallback;
    this.close();
    
    if (callback) {
      callback();
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
    
    this.editingMonitor = null;
    this.onSaveCallback = null;
  }
}

// Singleton instance
let monitorEditorInstance = null;

/**
 * Get the singleton MonitorEditorModal instance
 * @returns {MonitorEditorModal}
 */
export function getMonitorEditor() {
  if (!monitorEditorInstance) {
    monitorEditorInstance = new MonitorEditorModal();
  }
  return monitorEditorInstance;
}

export default MonitorEditorModal;
