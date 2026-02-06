/**
 * TagEditorModal.js
 * Standalone modal for creating and editing tags
 */

import { BaseModal } from './BaseModal.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';

// Available tag colors
const TAG_COLORS = [
  '#6b7280', // gray
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#14b8a6', // teal
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#78716c', // stone
];

export class TagEditorModal extends BaseModal {
  constructor() {
    super('sm'); // Small size modal
    
    this.editingTag = null;
    this.selectedColor = TAG_COLORS[0];
    this.onSaveCallback = null;
  }

  /**
   * Open the modal to create a new tag
   * @param {Function} onSave - Callback when tag is saved
   */
  openCreate(onSave) {
    this.editingTag = null;
    this.selectedColor = TAG_COLORS[0];
    this.onSaveCallback = onSave;
    
    this.render();
    this.attachEventListeners();
    this.show();
    
    // Focus name input
    setTimeout(() => {
      const nameInput = this.modalContent.querySelector('#tag-name-input');
      nameInput?.focus();
    }, 100);
  }

  /**
   * Open the modal to edit an existing tag
   * @param {Object} tag - Tag object to edit
   * @param {Function} onSave - Callback when tag is saved
   */
  openEdit(tag, onSave) {
    this.editingTag = tag;
    this.selectedColor = tag.color || TAG_COLORS[0];
    this.onSaveCallback = onSave;
    
    this.render();
    this.attachEventListeners();
    this.show();
    
    // Focus name input
    setTimeout(() => {
      const nameInput = this.modalContent.querySelector('#tag-name-input');
      nameInput?.focus();
    }, 100);
  }

  /**
   * Render the modal content
   */
  render() {
    const isEditing = !!this.editingTag;
    const title = isEditing ? 'Edit Tag' : 'Create Tag';
    const name = this.editingTag?.name || '';
    const description = this.editingTag?.description || '';

    this.modalContent.innerHTML = `
      ${this.renderHeader(title)}
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input 
            type="text" 
            class="form-input" 
            id="tag-name-input" 
            placeholder="Tag name..." 
            value="${this.escapeHtml(name)}"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Color</label>
          <div class="tag-color-picker" id="tag-color-picker">
            ${this.renderColorOptions()}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Description <span class="text-muted">(optional)</span></label>
          <input 
            type="text" 
            class="form-input" 
            id="tag-description-input" 
            placeholder="Brief description..." 
            value="${this.escapeHtml(description)}"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn" id="tag-editor-cancel">Cancel</button>
        <button class="btn btn-primary" id="tag-editor-save">${isEditing ? 'Save Changes' : 'Create Tag'}</button>
      </div>
    `;
  }

  /**
   * Render color picker options
   */
  renderColorOptions() {
    return TAG_COLORS.map(color => `
      <button 
        type="button"
        class="tag-color-option ${this.selectedColor === color ? 'selected' : ''}" 
        data-color="${color}"
        style="background-color: ${color}"
        title="${color}"
      ></button>
    `).join('');
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close button
    this.attachCloseListener();
    
    const cancelBtn = this.modalContent.querySelector('#tag-editor-cancel');
    const saveBtn = this.modalContent.querySelector('#tag-editor-save');
    const nameInput = this.modalContent.querySelector('#tag-name-input');
    const colorPicker = this.modalContent.querySelector('#tag-color-picker');
    
    cancelBtn?.addEventListener('click', () => this.close());
    saveBtn?.addEventListener('click', () => this.save());
    
    // Enter key to save
    nameInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.save();
      }
    });
    
    // Color picker
    colorPicker?.addEventListener('click', (e) => {
      const colorOption = e.target.closest('.tag-color-option');
      if (colorOption) {
        this.selectedColor = colorOption.dataset.color;
        // Update selected state
        colorPicker.querySelectorAll('.tag-color-option').forEach(opt => {
          opt.classList.toggle('selected', opt.dataset.color === this.selectedColor);
        });
      }
    });
  }

  /**
   * Save the tag
   */
  save() {
    const nameInput = this.modalContent.querySelector('#tag-name-input');
    const descriptionInput = this.modalContent.querySelector('#tag-description-input');
    
    const name = nameInput?.value.trim();
    if (!name) {
      nameInput?.focus();
      return;
    }
    
    const tagData = {
      name,
      color: this.selectedColor,
      description: descriptionInput?.value.trim() || ''
    };
    
    let tagId;
    if (this.editingTag) {
      // Update existing tag
      dataStore.updateEntity('tags', this.editingTag.id, tagData);
      tagId = this.editingTag.id;
    } else {
      // Create new tag
      tagId = DataService.createTag(tagData);
    }
    
    if (this.onSaveCallback) {
      this.onSaveCallback(tagId);
    }
    
    this.close();
  }

  /**
   * Cleanup when modal closes
   */
  onClose() {
    this.editingTag = null;
    this.selectedColor = TAG_COLORS[0];
    this.onSaveCallback = null;
  }
}

// Singleton instance
let tagEditorInstance = null;

/**
 * Get the singleton TagEditorModal instance
 * @returns {TagEditorModal}
 */
export function getTagEditor() {
  if (!tagEditorInstance) {
    tagEditorInstance = new TagEditorModal();
  }
  return tagEditorInstance;
}

export default TagEditorModal;
