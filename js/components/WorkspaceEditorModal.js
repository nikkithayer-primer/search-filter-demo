/**
 * WorkspaceEditorModal.js
 * Modal component for creating and editing workspaces
 */

import { BaseModal } from './BaseModal.js';
import { dataStore } from '../data/DataStore.js';

export class WorkspaceEditorModal extends BaseModal {
  constructor() {
    super('md'); // Medium size modal
    
    // Current workspace being edited (null for create mode)
    this.editingWorkspace = null;
    
    // Form state
    this.formState = {
      name: '',
      query: '',
      description: '',
      documentIds: [],
      tagIds: []
    };
    
    // Callback for when save completes
    this.onSaveCallback = null;
  }

  /**
   * Get all available tags from the data store
   */
  getAvailableTags() {
    return dataStore.data.tags || [];
  }

  /**
   * Open the modal for creating a new workspace
   * @param {Function} onSave - Callback when workspace is saved
   * @param {Object} initialData - Optional initial data (e.g., from search)
   */
  openCreate(onSave, initialData = {}) {
    this.editingWorkspace = null;
    this.onSaveCallback = onSave;
    this.formState = {
      name: initialData.name || '',
      query: initialData.query || '',
      description: initialData.description || '',
      documentIds: initialData.documentIds || [],
      tagIds: initialData.tagIds || []
    };
    this.render('Create Workspace');
    this.setupFormListeners();
    this.show();
    
    // Focus the name input after a short delay
    setTimeout(() => {
      const nameInput = document.getElementById('workspace-name');
      if (nameInput) nameInput.focus();
    }, 50);
  }

  /**
   * Open the modal for editing an existing workspace
   * @param {Object} workspace - The workspace to edit
   * @param {Function} onSave - Callback when workspace is saved
   */
  openEdit(workspace, onSave) {
    this.editingWorkspace = workspace;
    this.onSaveCallback = onSave;
    
    this.formState = {
      name: workspace.name || '',
      query: workspace.query || '',
      description: workspace.description || '',
      documentIds: [...(workspace.documentIds || [])],
      tagIds: [...(workspace.tagIds || [])]
    };
    
    this.render('Edit Workspace');
    this.setupFormListeners();
    this.show();
    
    // Focus the name input after a short delay
    setTimeout(() => {
      const nameInput = document.getElementById('workspace-name');
      if (nameInput) nameInput.focus();
    }, 50);
  }

  /**
   * Render the modal content
   */
  render(title) {
    const docCount = this.formState.documentIds.length;
    const docCountText = docCount > 0 
      ? `<span class="badge">${docCount} document${docCount !== 1 ? 's' : ''} selected</span>`
      : '';
    const isEditMode = !!this.editingWorkspace;

    // Search Query field only shown in create mode
    const queryFieldHtml = !isEditMode ? `
      <div class="form-group">
        <label class="form-label" for="workspace-query">Search Query</label>
        <input 
          type="text" 
          id="workspace-query" 
          class="form-input" 
          placeholder="e.g., pricing controversy customer complaints"
          value="${this.escapeHtml(this.formState.query)}"
        />
        <p class="form-hint">Keywords used to find relevant documents</p>
      </div>
    ` : '';

    // Tags selector
    const tags = this.getAvailableTags();
    const tagsHtml = tags.length > 0 ? `
      <div class="form-group">
        <label class="form-label">Tags</label>
        <div class="tag-selector" id="workspace-tags">
          ${tags.map(tag => {
            const isSelected = this.formState.tagIds.includes(tag.id);
            return `
              <label class="tag-selector-item ${isSelected ? 'selected' : ''}" data-tag-id="${tag.id}">
                <input 
                  type="checkbox" 
                  class="tag-selector-checkbox"
                  value="${tag.id}"
                  ${isSelected ? 'checked' : ''}
                />
                <span class="tag-selector-color" style="background-color: ${tag.color || '#6b7280'}"></span>
                <span class="tag-selector-name">${this.escapeHtml(tag.name)}</span>
              </label>
            `;
          }).join('')}
        </div>
        <p class="form-hint">Select tags to organize this workspace</p>
      </div>
    ` : '';

    this.modalContent.innerHTML = `
      ${this.renderHeader(title)}
      <div class="modal-body workspace-editor-body">
        <div class="workspace-editor-form">
          <!-- Workspace Name -->
          <div class="form-group">
            <label class="form-label" for="workspace-name">Workspace Name <span class="text-danger">*</span></label>
            <input 
              type="text" 
              id="workspace-name" 
              class="form-input" 
              placeholder="e.g., Q1 Campaign Analysis"
              value="${this.escapeHtml(this.formState.name)}"
            />
          </div>
          
          ${queryFieldHtml}
          
          <!-- Description -->
          <div class="form-group">
            <label class="form-label" for="workspace-description">Description</label>
            <textarea 
              id="workspace-description" 
              class="form-input form-textarea" 
              placeholder="What is this workspace for?"
              rows="3"
            >${this.escapeHtml(this.formState.description)}</textarea>
          </div>
          
          ${tagsHtml}
          
          ${docCountText ? `
            <div class="form-group">
              <label class="form-label">Documents</label>
              ${docCountText}
            </div>
          ` : ''}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="workspace-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="workspace-save-btn">
          ${this.editingWorkspace ? 'Save Changes' : 'Create Workspace'}
        </button>
      </div>
    `;

    // Blur any currently focused element to prevent autofocus conflicts
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }

  /**
   * Set up form-specific event listeners
   */
  setupFormListeners() {
    // Close button
    this.attachCloseListener();

    // Cancel button
    const cancelBtn = document.getElementById('workspace-cancel-btn');
    cancelBtn?.addEventListener('click', () => this.close());

    // Save button
    const saveBtn = document.getElementById('workspace-save-btn');
    saveBtn?.addEventListener('click', () => this.save());

    // Form inputs - update state on change
    const nameInput = document.getElementById('workspace-name');
    const queryInput = document.getElementById('workspace-query');
    const descInput = document.getElementById('workspace-description');

    nameInput?.addEventListener('input', (e) => {
      this.formState.name = e.target.value;
    });

    queryInput?.addEventListener('input', (e) => {
      this.formState.query = e.target.value;
    });

    descInput?.addEventListener('input', (e) => {
      this.formState.description = e.target.value;
    });

    // Tag selector
    const tagsContainer = document.getElementById('workspace-tags');
    if (tagsContainer) {
      tagsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('tag-selector-checkbox')) {
          const tagId = e.target.value;
          const item = e.target.closest('.tag-selector-item');
          
          if (e.target.checked) {
            if (!this.formState.tagIds.includes(tagId)) {
              this.formState.tagIds.push(tagId);
            }
            item?.classList.add('selected');
          } else {
            this.formState.tagIds = this.formState.tagIds.filter(id => id !== tagId);
            item?.classList.remove('selected');
          }
        }
      });
    }

    // Enter key to submit (in single-line inputs)
    nameInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.save();
      }
    });

    queryInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.save();
      }
    });
  }

  /**
   * Validate and save the workspace
   */
  save() {
    // Validate required fields
    const name = this.formState.name.trim();
    if (!name) {
      this.showError('Please enter a workspace name');
      const nameInput = document.getElementById('workspace-name');
      nameInput?.focus();
      return;
    }

    try {
      let workspaceId;
      
      if (this.editingWorkspace) {
        // Update existing workspace
        dataStore.updateWorkspace(this.editingWorkspace.id, {
          name: name,
          query: this.formState.query.trim(),
          description: this.formState.description.trim(),
          documentIds: this.formState.documentIds,
          tagIds: this.formState.tagIds
        });
        workspaceId = this.editingWorkspace.id;
      } else {
        // Create new workspace - returns the ID
        workspaceId = dataStore.createWorkspace({
          name: name,
          query: this.formState.query.trim(),
          description: this.formState.description.trim(),
          documentIds: this.formState.documentIds,
          tagIds: this.formState.tagIds,
          status: 'active'
        });
      }

      // Save callback reference before closing (close() resets it to null)
      const callback = this.onSaveCallback;

      // Close modal
      this.close();

      // Call success callback with workspace object
      if (callback && workspaceId) {
        // Fetch the full workspace to pass to callback
        const workspace = (dataStore.data.workspaces || []).find(w => w.id === workspaceId);
        callback(workspace || { id: workspaceId });
      }
    } catch (error) {
      console.error('Error saving workspace:', error);
      this.showError('Failed to save workspace. Please try again.');
    }
  }

  /**
   * Show an error message in the modal
   */
  showError(message) {
    // Remove existing error
    const existingError = this.modalContent.querySelector('.form-error-message');
    if (existingError) existingError.remove();

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.innerHTML = `
      <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 10.5a.75.75 0 110-1.5.75.75 0 010 1.5zm.75-3a.75.75 0 01-1.5 0V5a.75.75 0 011.5 0v3.5z"/>
      </svg>
      ${this.escapeHtml(message)}
    `;
    
    const modalBody = this.modalContent.querySelector('.modal-body');
    if (modalBody) {
      modalBody.insertBefore(errorDiv, modalBody.firstChild);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) errorDiv.remove();
    }, 5000);
  }

  /**
   * Cleanup when modal closes
   */
  onClose() {
    this.editingWorkspace = null;
    this.onSaveCallback = null;
  }
}

// Singleton instance
let workspaceEditorInstance = null;

/**
 * Get the singleton workspace editor instance
 * @returns {WorkspaceEditorModal}
 */
export function getWorkspaceEditor() {
  if (!workspaceEditorInstance) {
    workspaceEditorInstance = new WorkspaceEditorModal();
  }
  return workspaceEditorInstance;
}
