/**
 * AddSnippetToProjectModal.js
 * Modal for adding text snippets to an existing or new project
 * Mirrors the AddToProjectModal UX for consistency
 */

import { BaseModal } from './BaseModal.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';

export class AddSnippetToProjectModal extends BaseModal {
  constructor() {
    super('sm'); // Small modal
    
    // Snippet data to add
    this.snippetText = '';
    this.sourceType = 'document';
    this.sourceDocumentId = null;
    this.sourceId = null;
    this.sourceLabel = null;
    
    // Callback for when operation completes
    this.onComplete = null;
    
    // UI state
    this.selectedProjectId = null;
    this.isCreatingNew = false;
    this.newProjectName = '';
    this.newProjectDescription = '';
  }

  /**
   * Open the modal to add a snippet to a project
   * @param {Object} snippetData - { text, sourceType, sourceDocumentId, sourceId, sourceLabel }
   * @param {Function} onComplete - Callback with result { projectId, projectName, success }
   */
  open(snippetData, onComplete) {
    this.snippetText = snippetData.text || '';
    this.sourceType = snippetData.sourceType || 'document';
    this.sourceDocumentId = snippetData.sourceDocumentId || null;
    this.sourceId = snippetData.sourceId || null;
    this.sourceLabel = snippetData.sourceLabel || null;
    this.onComplete = onComplete;
    this.selectedProjectId = null;
    this.isCreatingNew = false;
    this.newProjectName = '';
    this.newProjectDescription = '';
    
    this.render();
    this.setupEventListeners();
    this.show();
  }

  /**
   * Render the modal content
   */
  render() {
    const projects = DataService.getActiveProjects();
    
    // Truncate snippet preview
    const previewText = this.snippetText.length > 100 
      ? this.snippetText.substring(0, 100) + '...' 
      : this.snippetText;

    const projectListHtml = projects.length > 0 
      ? projects.map(p => this.renderProjectOption(p)).join('')
      : '<p class="text-muted text-sm" style="padding: var(--space-md);">No projects yet</p>';

    this.modalContent.innerHTML = `
      ${this.renderHeader('Add to Project')}
      
      <div class="modal-body">
        <div class="snippet-preview">
          <p class="text-sm text-secondary mb-xs">Adding snippet:</p>
          <blockquote class="snippet-preview-text">"${this.escapeHtml(previewText)}"</blockquote>
        </div>
        
        <div class="project-select-list" id="project-select-list">
          ${projectListHtml}
        </div>
        
        <div class="project-create-new" id="project-create-section">
          <button class="btn btn-small" id="create-new-project-btn">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M8 3v10M3 8h10"/>
            </svg>
            Create New Project
          </button>
          
          <div class="project-create-form hidden" id="project-create-form">
            <div class="form-group">
              <label class="form-label" for="new-project-name">Project Name <span class="text-danger">*</span></label>
              <input 
                type="text" 
                class="form-input" 
                id="new-project-name" 
                placeholder="e.g., Q1 Research Brief"
                maxlength="100"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="new-project-description">Description</label>
              <textarea 
                class="form-input" 
                id="new-project-description" 
                placeholder="What is this project for?"
                rows="2"
                maxlength="500"
              ></textarea>
              <p class="form-hint">Optional notes about this project's purpose</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="modal-confirm-btn" disabled>
          Add to Project
        </button>
      </div>
    `;
    
    // Attach close button listener from BaseModal
    this.attachCloseListener();
  }

  /**
   * Render a single project option
   */
  renderProjectOption(project) {
    const snippetCount = project.snippets?.length || 0;
    const isSelected = this.selectedProjectId === project.id;
    
    return `
      <div class="project-select-option ${isSelected ? 'selected' : ''}" 
           data-project-id="${project.id}">
        <div class="project-select-option-info">
          <span class="project-select-option-name">${this.escapeHtml(project.name)}</span>
          <span class="project-select-option-count">${snippetCount} snippet${snippetCount !== 1 ? 's' : ''}</span>
        </div>
        <div class="project-select-option-check">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 8l4 4 6-7"/>
          </svg>
        </div>
      </div>
    `;
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Cancel button
    const cancelBtn = this.modalContent.querySelector('#modal-cancel-btn');
    cancelBtn?.addEventListener('click', () => this.close());

    // Project option clicks
    const projectOptions = this.modalContent.querySelectorAll('.project-select-option');
    projectOptions.forEach(option => {
      option.addEventListener('click', () => {
        this.selectProject(option.dataset.projectId);
      });
    });

    // Create new project button
    const createBtn = this.modalContent.querySelector('#create-new-project-btn');
    createBtn?.addEventListener('click', () => this.showCreateForm());

    // New project name input
    const nameInput = this.modalContent.querySelector('#new-project-name');
    nameInput?.addEventListener('input', (e) => {
      this.newProjectName = e.target.value.trim();
      this.updateConfirmButton();
    });
    
    // New project description input
    const descInput = this.modalContent.querySelector('#new-project-description');
    descInput?.addEventListener('input', (e) => {
      this.newProjectDescription = e.target.value.trim();
    });

    // Confirm button
    const confirmBtn = this.modalContent.querySelector('#modal-confirm-btn');
    confirmBtn?.addEventListener('click', () => this.confirm());
  }

  /**
   * Select an existing project
   */
  selectProject(projectId) {
    this.selectedProjectId = projectId;
    this.isCreatingNew = false;
    
    // Update UI
    const options = this.modalContent.querySelectorAll('.project-select-option');
    options.forEach(opt => {
      opt.classList.toggle('selected', opt.dataset.projectId === projectId);
    });
    
    // Hide create form if visible
    const createForm = this.modalContent.querySelector('#project-create-form');
    const createBtn = this.modalContent.querySelector('#create-new-project-btn');
    createForm?.classList.add('hidden');
    createBtn?.classList.remove('hidden');
    
    this.updateConfirmButton();
  }

  /**
   * Show the create new project form
   */
  showCreateForm() {
    this.isCreatingNew = true;
    this.selectedProjectId = null;
    
    // Deselect any selected project
    const options = this.modalContent.querySelectorAll('.project-select-option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Show form, hide button
    const createForm = this.modalContent.querySelector('#project-create-form');
    const createBtn = this.modalContent.querySelector('#create-new-project-btn');
    createForm?.classList.remove('hidden');
    createBtn?.classList.add('hidden');
    
    // Focus the input
    const nameInput = this.modalContent.querySelector('#new-project-name');
    nameInput?.focus();
    
    this.updateConfirmButton();
  }

  /**
   * Update the confirm button state
   */
  updateConfirmButton() {
    const confirmBtn = this.modalContent.querySelector('#modal-confirm-btn');
    if (!confirmBtn) return;
    
    const canConfirm = this.selectedProjectId || (this.isCreatingNew && this.newProjectName);
    confirmBtn.disabled = !canConfirm;
    
    // Update button text
    if (this.isCreatingNew && this.newProjectName) {
      confirmBtn.textContent = 'Create & Add';
    } else {
      confirmBtn.textContent = 'Add to Project';
    }
  }

  /**
   * Build the snippet data object for storage
   */
  _buildSnippetData() {
    const currentUser = DataService.getCurrentUser();
    return {
      text: this.snippetText,
      sourceType: this.sourceType,
      sourceDocumentId: this.sourceDocumentId,
      sourceId: this.sourceId,
      sourceLabel: this.sourceLabel,
      createdBy: currentUser?.id || null
    };
  }

  /**
   * Confirm the action (add to existing or create new)
   */
  confirm() {
    const snippetData = this._buildSnippetData();
    
    if (this.isCreatingNew && this.newProjectName) {
      // Create new project first, including the source document if present
      const projectId = dataStore.createProject({
        name: this.newProjectName,
        description: this.newProjectDescription || '',
        documentIds: this.sourceDocumentId ? [this.sourceDocumentId] : []
      });
      
      // Add snippet to the new project
      const result = dataStore.addSnippetToProject(projectId, snippetData);
      
      if (this.onComplete) {
        this.onComplete({
          projectId,
          projectName: this.newProjectName,
          success: result.success,
          isNew: true
        });
      }
      
      this.close();
      
    } else if (this.selectedProjectId) {
      // Add snippet to existing project
      const project = DataService.getProject(this.selectedProjectId);
      const result = dataStore.addSnippetToProject(this.selectedProjectId, snippetData);
      
      // Also add the source document to the project (if document-based)
      if (this.sourceDocumentId) {
        dataStore.addDocumentsToProject(this.selectedProjectId, [this.sourceDocumentId]);
      }
      
      if (this.onComplete) {
        this.onComplete({
          projectId: this.selectedProjectId,
          projectName: project?.name || 'Project',
          success: result.success,
          isNew: false
        });
      }
      
      this.close();
    }
  }
}

// Singleton instance
let modalInstance = null;

/**
 * Get the singleton modal instance
 * @returns {AddSnippetToProjectModal}
 */
export function getAddSnippetToProjectModal() {
  if (!modalInstance) {
    modalInstance = new AddSnippetToProjectModal();
  }
  return modalInstance;
}

export default AddSnippetToProjectModal;
