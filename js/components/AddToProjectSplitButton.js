/**
 * AddToProjectSplitButton.js
 * Reusable split button component for adding documents to projects.
 * Provides Add to Project (default: Unsorted) + dropdown for project selection.
 */

import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { getAddToProjectModal } from './AddToProjectModal.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import { 
  UNSORTED_PROJECT_NAME, 
  MAX_QUICK_ADD_PROJECTS,
  TOAST_DISPLAY_DURATION,
  TOAST_FADE_DURATION 
} from '../utils/constants.js';

/**
 * Creates and manages a split button for adding documents to projects
 */
export class AddToProjectSplitButton {
  /**
   * @param {Object} options
   * @param {Function} options.getDocumentIds - Function that returns array of document IDs to add
   * @param {Function} options.onSuccess - Callback after successful add (receives { projectId, projectName, added, isNew })
   * @param {string} options.size - Button size: 'small' or 'default'
   */
  constructor(options = {}) {
    this.getDocumentIds = options.getDocumentIds || (() => []);
    this.onSuccess = options.onSuccess || (() => {});
    this.size = options.size || 'small';
    
    this.container = null;
    this.dropdown = null;
    this.dropdownOpen = false;
    
    this._boundOutsideClick = this._handleOutsideClick.bind(this);
  }

  /**
   * Render the split button and return the container element
   * @returns {HTMLElement}
   */
  render() {
    // Create container
    this.container = document.createElement('div');
    this.container.className = 'add-to-project-split-btn';
    
    const btnClass = this.size === 'small' ? 'btn btn-small btn-secondary' : 'btn btn-secondary';
    
    this.container.innerHTML = `
      <button class="${btnClass} split-btn-main" data-action="quick-save" title="Save to Unsorted">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
          <path fill-rule="evenodd" d="M2 1C1.44771 1 1 1.44772 1 2V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V3.5C15 2.94772 14.5523 2.5 14 2.5H8.26759L7.56446 1.4453C7.37899 1.1671 7.06676 1 6.73241 1H2ZM2 2H6.73241L7.43554 3.0547C7.62101 3.3329 7.93324 3.5 8.26759 3.5H14V4.5H2V2ZM2 5.5V14H14V5.5H2Z"/>
        </svg>
        <span>Add to Project</span>
      </button>
      <button class="${btnClass} split-btn-dropdown" data-action="toggle-dropdown" title="Choose project">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
          <path d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 6H4.604a.25.25 0 00-.177.427z"/>
        </svg>
      </button>
    `;

    // Create dropdown (appended to body for positioning)
    this._createDropdown();

    // Event listeners
    this.container.addEventListener('click', (e) => this._handleClick(e));

    return this.container;
  }

  /**
   * Create the dropdown element
   */
  _createDropdown() {
    this.dropdown = document.createElement('div');
    this.dropdown.className = 'add-to-project-dropdown';
    this.dropdown.style.display = 'none';
    document.body.appendChild(this.dropdown);

    this.dropdown.addEventListener('click', (e) => this._handleDropdownClick(e));
  }

  /**
   * Get the Unsorted project
   */
  _getUnsortedProject() {
    const projects = DataService.getActiveProjects();
    return projects.find(p => p.name === UNSORTED_PROJECT_NAME) || null;
  }

  /**
   * Render dropdown content
   */
  _renderDropdownContent() {
    const projects = DataService.getActiveProjects();
    const unsortedProject = this._getUnsortedProject();
    const otherProjects = projects.filter(p => p.name !== UNSORTED_PROJECT_NAME).slice(0, MAX_QUICK_ADD_PROJECTS);

    let html = '';

    // Unsorted at top
    if (unsortedProject) {
      const docCount = unsortedProject.documentIds?.length || 0;
      html += `
        <div class="dropdown-item dropdown-item-default" data-project-id="${unsortedProject.id}">
          <svg class="dropdown-item-check" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"/>
          </svg>
          <span>Unsorted</span>
          <span class="dropdown-item-hint">default</span>
        </div>
      `;
    }

    // Other projects
    if (otherProjects.length > 0) {
      html += '<div class="dropdown-divider"></div>';
      
      otherProjects.forEach(project => {
        const docCount = project.documentIds?.length || 0;
        html += `
          <div class="dropdown-item" data-project-id="${project.id}">
            <span class="dropdown-item-name">${escapeHtml(project.name)}</span>
            ${docCount > 0 ? `<span class="dropdown-item-count">${docCount}</span>` : ''}
          </div>
        `;
      });
    }

    // "Choose Project..." to open modal
    html += `
      <div class="dropdown-divider"></div>
      <div class="dropdown-item dropdown-item-more" data-action="open-modal">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M8 3v10M3 8h10"/>
        </svg>
        <span>Choose Project...</span>
      </div>
    `;

    this.dropdown.innerHTML = html;
  }

  /**
   * Handle button clicks
   */
  _handleClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    e.stopPropagation();
    const action = btn.dataset.action;

    if (action === 'quick-save') {
      this._quickSave();
    } else if (action === 'toggle-dropdown') {
      this._toggleDropdown();
    }
  }

  /**
   * Handle dropdown item clicks
   */
  _handleDropdownClick(e) {
    const item = e.target.closest('.dropdown-item');
    if (!item) return;

    e.stopPropagation();

    if (item.dataset.action === 'open-modal') {
      this._hideDropdown();
      this._openModal();
      return;
    }

    const projectId = item.dataset.projectId;
    if (projectId) {
      this._hideDropdown();
      this._addToProject(projectId);
    }
  }

  /**
   * Quick save to Unsorted
   */
  _quickSave() {
    const unsortedProject = this._getUnsortedProject();
    if (!unsortedProject) {
      this._openModal();
      return;
    }
    this._addToProject(unsortedProject.id);
  }

  /**
   * Add documents to a specific project
   */
  _addToProject(projectId) {
    const documentIds = this.getDocumentIds();
    if (!documentIds || documentIds.length === 0) return;

    const project = DataService.getProject(projectId);
    if (!project) return;

    const result = dataStore.addDocumentsToProject(projectId, documentIds);

    if (result.success) {
      this.onSuccess({
        projectId,
        projectName: project.name,
        added: result.added,
        total: result.total,
        isNew: false
      });
    }
  }

  /**
   * Open the full modal
   */
  _openModal() {
    const documentIds = this.getDocumentIds();
    if (!documentIds || documentIds.length === 0) return;

    const modal = getAddToProjectModal();
    modal.open(documentIds, (result) => {
      this.onSuccess({
        projectId: result.projectId,
        projectName: result.projectName,
        added: result.added,
        total: result.total,
        isNew: result.isNew
      });
    });
  }

  /**
   * Toggle dropdown visibility
   */
  _toggleDropdown() {
    if (this.dropdownOpen) {
      this._hideDropdown();
    } else {
      this._showDropdown();
    }
  }

  /**
   * Show the dropdown
   */
  _showDropdown() {
    this._renderDropdownContent();

    // Position relative to the container
    const btnRect = this.container.getBoundingClientRect();
    
    this.dropdown.style.display = 'block';
    this.dropdown.style.visibility = 'hidden';

    const dropdownRect = this.dropdown.getBoundingClientRect();

    let left = btnRect.left;
    let top = btnRect.bottom + 4;

    // Adjust if too far right
    if (left + dropdownRect.width > window.innerWidth - 16) {
      left = btnRect.right - dropdownRect.width;
    }

    // Adjust if too far down
    if (top + dropdownRect.height > window.innerHeight - 16) {
      top = btnRect.top - dropdownRect.height - 4;
    }

    this.dropdown.style.left = `${left}px`;
    this.dropdown.style.top = `${top}px`;
    this.dropdown.style.visibility = 'visible';

    this.dropdownOpen = true;

    // Listen for outside clicks
    setTimeout(() => {
      document.addEventListener('mousedown', this._boundOutsideClick);
    }, 0);
  }

  /**
   * Hide the dropdown
   */
  _hideDropdown() {
    this.dropdown.style.display = 'none';
    this.dropdownOpen = false;
    document.removeEventListener('mousedown', this._boundOutsideClick);
  }

  /**
   * Handle clicks outside the dropdown
   */
  _handleOutsideClick(e) {
    if (!this.container.contains(e.target) && !this.dropdown.contains(e.target)) {
      this._hideDropdown();
    }
  }

  /**
   * Clean up
   */
  destroy() {
    document.removeEventListener('mousedown', this._boundOutsideClick);
    this.dropdown?.remove();
    this.container?.remove();
  }
}

/**
 * Helper to show a toast notification for add-to-project success
 */
export function showAddToProjectToast(projectId, projectName, count, isNew = false) {
  const actionText = isNew ? 'created and added to' : 'added to';
  const docText = count === 1 ? 'Document' : `${count} documents`;
  
  const toast = document.createElement('div');
  toast.className = 'snippet-toast';
  toast.innerHTML = `
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
      <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z"/>
    </svg>
    <span>${docText} ${actionText} <strong>${escapeHtml(projectName)}</strong></span>
    <a href="#/${projectId}?tab=documents" class="toast-link">View</a>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), TOAST_FADE_DURATION);
  }, TOAST_DISPLAY_DURATION);
}

export default AddToProjectSplitButton;
