/**
 * TagChips.js
 * Component for displaying and managing tag chips on entities
 */

import { DataService } from '../data/DataService.js';
import { escapeHtml } from '../utils/htmlUtils.js';

export class TagChips {
  /**
   * @param {Object} options
   * @param {string} options.entityType - Entity type ('narrative', 'person', etc.)
   * @param {string} options.entityId - Entity ID
   * @param {boolean} options.editable - Whether tags can be added/removed (default: true)
   * @param {Function} options.onTagsChanged - Callback when tags change
   * @param {Function} options.onAddClick - Callback when add button is clicked (opens picker)
   */
  constructor(options = {}) {
    this.entityType = options.entityType;
    this.entityId = options.entityId;
    this.editable = options.editable !== false;
    this.onTagsChanged = options.onTagsChanged || null;
    this.onAddClick = options.onAddClick || null;
    this.container = null;
  }

  /**
   * Render tag chips into a container
   * @param {HTMLElement|string} container - Container element or ID
   * @returns {TagChips} this for chaining
   */
  render(container) {
    this.container = typeof container === 'string'
      ? document.getElementById(container)
      : container;

    if (!this.container) {
      console.warn('TagChips: Container not found');
      return this;
    }

    const tags = DataService.getTagsForEntity(this.entityType, this.entityId);
    this.container.innerHTML = this.getHtml(tags);
    this.attachEventListeners();
    return this;
  }

  /**
   * Get HTML for tag chips
   * @param {Array} tags - Array of tag objects
   * @returns {string} HTML string
   */
  getHtml(tags = []) {
    const chipsHtml = tags.map(tag => this.getChipHtml(tag)).join('');
    
    const addButtonHtml = this.editable ? `
      <button class="tag-chip tag-chip-add" data-action="add-tag" title="Add tag">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3v10M3 8h10"/>
        </svg>
      </button>
    ` : '';

    return `
      <div class="tag-chips-container">
        ${chipsHtml}
        ${addButtonHtml}
      </div>
    `;
  }

  /**
   * Get HTML for a single tag chip
   * @param {Object} tag - Tag object
   * @returns {string} HTML string
   */
  getChipHtml(tag) {
    const removeBtn = this.editable ? `
      <button class="tag-chip-remove" data-action="remove-tag" data-tag-id="${tag.id}" title="Remove tag">
        <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4l8 8M12 4l-8 8"/>
        </svg>
      </button>
    ` : '';

    return `
      <span class="tag-chip" style="--tag-color: ${tag.color || '#6b7280'}">
        <span class="tag-chip-dot" style="background-color: ${tag.color || '#6b7280'}"></span>
        <a href="#/tag/${tag.id}" class="tag-chip-name">${this.escapeHtml(tag.name)}</a>
        ${removeBtn}
      </span>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    if (!this.container || !this.editable) return;

    // Add tag button
    const addBtn = this.container.querySelector('[data-action="add-tag"]');
    if (addBtn && this.onAddClick) {
      addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.onAddClick();
      });
    }

    // Remove tag buttons
    const removeBtns = this.container.querySelectorAll('[data-action="remove-tag"]');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const tagId = btn.dataset.tagId;
        this.removeTag(tagId);
      });
    });
  }

  /**
   * Remove a tag from the entity
   * @param {string} tagId - Tag ID to remove
   */
  removeTag(tagId) {
    const success = DataService.removeTagFromEntity(this.entityType, this.entityId, tagId);
    if (success) {
      this.render(this.container);
      if (this.onTagsChanged) {
        this.onTagsChanged(DataService.getTagsForEntity(this.entityType, this.entityId));
      }
    }
  }

  /**
   * Add a tag to the entity
   * @param {string} tagId - Tag ID to add
   */
  addTag(tagId) {
    const success = DataService.addTagToEntity(this.entityType, this.entityId, tagId);
    if (success) {
      this.render(this.container);
      if (this.onTagsChanged) {
        this.onTagsChanged(DataService.getTagsForEntity(this.entityType, this.entityId));
      }
    }
  }

  /**
   * Refresh the display
   */
  refresh() {
    if (this.container) {
      this.render(this.container);
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    return escapeHtml(text);
  }

  /**
   * Static method to render read-only tag chips
   * @param {Array} tags - Array of tag objects
   * @returns {string} HTML string
   */
  static renderReadOnly(tags = []) {
    if (!tags || tags.length === 0) return '';

    const chipsHtml = tags.map(tag => `
      <span class="tag-chip" style="--tag-color: ${tag.color || '#6b7280'}">
        <span class="tag-chip-dot" style="background-color: ${tag.color || '#6b7280'}"></span>
        <a href="#/tag/${tag.id}" class="tag-chip-name">${escapeHtml(tag.name)}</a>
      </span>
    `).join('');

    return `<div class="tag-chips-container tag-chips-readonly">${chipsHtml}</div>`;
  }
}

export default TagChips;
