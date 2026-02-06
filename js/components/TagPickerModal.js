/**
 * TagPickerModal.js
 * Modal for selecting tags to apply to an entity
 * Supports multi-select and inline tag creation
 */

import { BaseModal } from './BaseModal.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';

export class TagPickerModal extends BaseModal {
  constructor() {
    super('sm'); // Small size modal for tag picker
    
    // Current entity being edited
    this.entityType = null;
    this.entityId = null;
    
    // Selected tag IDs (working copy)
    this.selectedTagIds = new Set();
    
    // Search filter
    this.searchQuery = '';
    
    // Callbacks
    this.onSaveCallback = null;
  }

  /**
   * Open the tag picker for an entity
   * @param {string} entityType - Entity type ('narrative', 'person', etc.)
   * @param {string} entityId - Entity ID
   * @param {Function} onSave - Callback when tags are saved
   */
  open(entityType, entityId, onSave) {
    this.entityType = entityType;
    this.entityId = entityId;
    this.onSaveCallback = onSave;
    this.searchQuery = '';
    
    // Get current tags for the entity
    const currentTags = DataService.getTagsForEntity(entityType, entityId);
    this.selectedTagIds = new Set(currentTags.map(t => t.id));
    
    this.render();
    this.attachEventListeners();
    this.show();
    
    // Focus search input
    setTimeout(() => {
      const searchInput = this.modalContent.querySelector('#tag-search');
      searchInput?.focus();
    }, 100);
  }

  /**
   * Render the modal
   */
  render() {
    const { groups, ungrouped } = DataService.getTagsByGroup();
    const allTags = DataService.getTags();
    
    // Filter by search query
    const filterTags = (tags) => {
      if (!this.searchQuery) return tags;
      return tags.filter(t => t.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    };
    
    const filteredGroups = groups.map(g => ({
      group: g.group,
      tags: filterTags(g.tags)
    })).filter(g => g.tags.length > 0);
    
    const filteredUngrouped = filterTags(ungrouped);
    const totalFilteredTags = filteredGroups.reduce((sum, g) => sum + g.tags.length, 0) + filteredUngrouped.length;

    this.modalContent.innerHTML = `
      ${this.renderHeader('Manage Tags')}
      <div class="modal-body tag-picker-body">
        <div class="tag-picker-search">
          <input 
            type="text" 
            class="form-input" 
            id="tag-search" 
            placeholder="Search tags or type to create..."
            value="${this.escapeHtml(this.searchQuery)}"
          />
        </div>
        
        <div class="tag-picker-list">
          ${totalFilteredTags === 0 && !this.searchQuery ? `
            <div class="tag-picker-empty">
              <p>No tags exist yet.</p>
              <p class="text-muted">Type a name above and press Enter to create one.</p>
            </div>
          ` : totalFilteredTags === 0 ? `
            <div class="tag-picker-empty">
              <p>No tags match "${this.escapeHtml(this.searchQuery)}"</p>
              <button class="btn btn-small btn-primary" id="create-tag-btn">
                Create "${this.escapeHtml(this.searchQuery)}"
              </button>
            </div>
          ` : `
            ${filteredGroups.map(({ group, tags }) => this.renderTagGroup(group, tags)).join('')}
            ${filteredUngrouped.length > 0 ? `
              <div class="tag-picker-group">
                <div class="tag-picker-group-header">
                  <span class="tag-picker-group-name">Other Tags</span>
                </div>
                <div class="tag-picker-group-tags">
                  ${filteredUngrouped.map(tag => this.renderTagRow(tag)).join('')}
                </div>
              </div>
            ` : ''}
          `}
        </div>
        
        ${this.searchQuery && totalFilteredTags > 0 && !allTags.some(t => t.name.toLowerCase() === this.searchQuery.toLowerCase()) ? `
          <div class="tag-picker-create">
            <button class="btn btn-small btn-secondary" id="create-tag-btn">
              Create new tag "${this.escapeHtml(this.searchQuery)}"
            </button>
          </div>
        ` : ''}
      </div>
      <div class="modal-footer">
        <button class="btn" id="tag-picker-cancel">Cancel</button>
        <button class="btn btn-primary" id="tag-picker-save">Apply Tags</button>
      </div>
    `;
  }

  /**
   * Render a tag group with its tags
   */
  renderTagGroup(group, tags) {
    const exclusiveLabel = group.exclusive ? ' (select one)' : '';
    return `
      <div class="tag-picker-group" data-group-id="${group.id}" data-exclusive="${group.exclusive}">
        <div class="tag-picker-group-header">
          <span class="tag-picker-group-name">${this.escapeHtml(group.name)}</span>
          ${group.exclusive ? '<span class="tag-picker-group-exclusive">exclusive</span>' : ''}
        </div>
        <div class="tag-picker-group-tags">
          ${tags.map(tag => this.renderTagRow(tag, group.exclusive)).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render a single tag row with checkbox or radio button
   * @param {Object} tag - Tag object
   * @param {boolean} exclusive - Whether this tag is in an exclusive group
   */
  renderTagRow(tag, exclusive = false) {
    const isSelected = this.selectedTagIds.has(tag.id);
    const counts = DataService.getTagCountsByEntityType(tag.id);
    const totalCount = Object.values(counts).reduce((sum, c) => sum + c, 0);
    const inputType = exclusive ? 'radio' : 'checkbox';
    const groupId = tag.groupId || 'ungrouped';
    
    return `
      <label class="tag-picker-row ${isSelected ? 'selected' : ''}" data-tag-id="${tag.id}">
        <input 
          type="${inputType}" 
          class="tag-picker-checkbox" 
          name="tag-group-${groupId}"
          ${isSelected ? 'checked' : ''}
          data-tag-id="${tag.id}"
          data-group-id="${groupId}"
          data-exclusive="${exclusive}"
        />
        <span class="tag-picker-color" style="background-color: ${tag.color || '#6b7280'}"></span>
        <span class="tag-picker-name">${this.escapeHtml(tag.name)}</span>
        <span class="tag-picker-count">${totalCount}</span>
      </label>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close button
    this.attachCloseListener();
    
    const cancelBtn = this.modalContent.querySelector('#tag-picker-cancel');
    const saveBtn = this.modalContent.querySelector('#tag-picker-save');
    
    cancelBtn?.addEventListener('click', () => this.close());
    saveBtn?.addEventListener('click', () => this.save());
    
    // Search input
    const searchInput = this.modalContent.querySelector('#tag-search');
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.updateList();
    });
    
    searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.searchQuery.trim()) {
        e.preventDefault();
        this.createTag(this.searchQuery.trim());
      }
    });
    
    // Create tag button
    const createBtn = this.modalContent.querySelector('#create-tag-btn');
    createBtn?.addEventListener('click', () => {
      if (this.searchQuery.trim()) {
        this.createTag(this.searchQuery.trim());
      }
    });
    
    // Checkbox/radio changes
    this.modalContent.addEventListener('change', (e) => {
      if (e.target.classList.contains('tag-picker-checkbox')) {
        const tagId = e.target.dataset.tagId;
        const groupId = e.target.dataset.groupId;
        const isExclusive = e.target.dataset.exclusive === 'true';
        
        if (isExclusive && e.target.checked) {
          // For exclusive groups, remove any other selected tags from this group
          const groupTags = DataService.getTagsInGroup(groupId);
          groupTags.forEach(t => {
            if (t.id !== tagId) {
              this.selectedTagIds.delete(t.id);
              // Update visual state of other rows in group
              const otherRow = this.modalContent.querySelector(`.tag-picker-row[data-tag-id="${t.id}"]`);
              otherRow?.classList.remove('selected');
            }
          });
        }
        
        if (e.target.checked) {
          this.selectedTagIds.add(tagId);
        } else {
          this.selectedTagIds.delete(tagId);
        }
        
        // Update row visual state
        const row = e.target.closest('.tag-picker-row');
        row?.classList.toggle('selected', e.target.checked);
      }
    });
  }

  /**
   * Update the tag list (preserving selections)
   */
  updateList() {
    const listContainer = this.modalContent.querySelector('.tag-picker-list');
    const createContainer = this.modalContent.querySelector('.tag-picker-create');
    
    const { groups, ungrouped } = DataService.getTagsByGroup();
    const allTags = DataService.getTags();
    
    // Filter by search query
    const filterTags = (tags) => {
      if (!this.searchQuery) return tags;
      return tags.filter(t => t.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    };
    
    const filteredGroups = groups.map(g => ({
      group: g.group,
      tags: filterTags(g.tags)
    })).filter(g => g.tags.length > 0);
    
    const filteredUngrouped = filterTags(ungrouped);
    const totalFilteredTags = filteredGroups.reduce((sum, g) => sum + g.tags.length, 0) + filteredUngrouped.length;

    if (listContainer) {
      if (totalFilteredTags === 0 && !this.searchQuery) {
        listContainer.innerHTML = `
          <div class="tag-picker-empty">
            <p>No tags exist yet.</p>
            <p class="text-muted">Type a name above and press Enter to create one.</p>
          </div>
        `;
      } else if (totalFilteredTags === 0) {
        listContainer.innerHTML = `
          <div class="tag-picker-empty">
            <p>No tags match "${this.escapeHtml(this.searchQuery)}"</p>
            <button class="btn btn-small btn-primary" id="create-tag-btn">
              Create "${this.escapeHtml(this.searchQuery)}"
            </button>
          </div>
        `;
        // Re-attach create button listener
        const createBtn = listContainer.querySelector('#create-tag-btn');
        createBtn?.addEventListener('click', () => {
          if (this.searchQuery.trim()) {
            this.createTag(this.searchQuery.trim());
          }
        });
      } else {
        let html = filteredGroups.map(({ group, tags }) => this.renderTagGroup(group, tags)).join('');
        if (filteredUngrouped.length > 0) {
          html += `
            <div class="tag-picker-group">
              <div class="tag-picker-group-header">
                <span class="tag-picker-group-name">Other Tags</span>
              </div>
              <div class="tag-picker-group-tags">
                ${filteredUngrouped.map(tag => this.renderTagRow(tag)).join('')}
              </div>
            </div>
          `;
        }
        listContainer.innerHTML = html;
      }
    }

    // Update or add create section
    if (createContainer) {
      if (this.searchQuery && totalFilteredTags > 0 && !allTags.some(t => t.name.toLowerCase() === this.searchQuery.toLowerCase())) {
        createContainer.innerHTML = `
          <button class="btn btn-small btn-secondary" id="create-tag-btn">
            Create new tag "${this.escapeHtml(this.searchQuery)}"
          </button>
        `;
        const createBtn = createContainer.querySelector('#create-tag-btn');
        createBtn?.addEventListener('click', () => {
          if (this.searchQuery.trim()) {
            this.createTag(this.searchQuery.trim());
          }
        });
      } else {
        createContainer.innerHTML = '';
      }
    }
  }

  /**
   * Create a new tag and select it
   */
  createTag(name) {
    const tagId = DataService.createTag({ name });
    if (tagId) {
      this.selectedTagIds.add(tagId);
      this.searchQuery = '';
      const searchInput = this.modalContent.querySelector('#tag-search');
      if (searchInput) searchInput.value = '';
      this.updateList();
    }
  }

  /**
   * Save the tag selections
   */
  save() {
    const tagIds = Array.from(this.selectedTagIds);
    const success = DataService.setEntityTags(this.entityType, this.entityId, tagIds);
    
    if (success && this.onSaveCallback) {
      this.onSaveCallback(tagIds);
    }
    
    this.close();
  }

  /**
   * Cleanup when modal closes
   */
  onClose() {
    // Reset state
    this.entityType = null;
    this.entityId = null;
    this.selectedTagIds.clear();
    this.searchQuery = '';
    this.onSaveCallback = null;
  }
}

// Singleton instance
let tagPickerInstance = null;

/**
 * Get the singleton TagPickerModal instance
 * @returns {TagPickerModal}
 */
export function getTagPicker() {
  if (!tagPickerInstance) {
    tagPickerInstance = new TagPickerModal();
  }
  return tagPickerInstance;
}

export default TagPickerModal;
