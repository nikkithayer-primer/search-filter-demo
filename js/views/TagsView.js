/**
 * TagsView.js
 * View for listing and managing tags
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { getEntityIcon, ENTITY_TYPE_CONFIG, getEntityTitle, getEntityRoute } from '../utils/entityIcons.js';
import { PageHeader } from '../utils/PageHeader.js';

export class TagsView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
    this.searchQuery = '';
    this.editingTagId = null;
    this.expandedTags = new Set(); // Track which tags are expanded
  }

  async render() {
    const tags = DataService.getTags();
    const tagCounts = DataService.getTagCounts();
    const { groups, ungrouped } = DataService.getTagsByGroup();
    
    // Filter by search query
    const filterTags = (tagList) => {
      if (!this.searchQuery) return tagList;
      return tagList.filter(t => t.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    };
    
    const filteredGroups = groups.map(g => ({
      group: g.group,
      tags: filterTags(g.tags)
    })).filter(g => g.tags.length > 0);
    
    const filteredUngrouped = filterTags(ungrouped);
    const totalFilteredTags = filteredGroups.reduce((sum, g) => sum + g.tags.length, 0) + filteredUngrouped.length;

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Common Operating Picture', href: '#/cop' },
        'Tags'
      ],
      title: 'Tags',
      subtitle: `${tags.length} tag${tags.length !== 1 ? 's' : ''} in ${groups.length} group${groups.length !== 1 ? 's' : ''}`
    });

    this.container.innerHTML = `
      ${headerHtml}
      
      <div class="content-area">
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div class="search-input-wrapper" style="max-width: 300px;">
              <span class="search-icon">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
                  <circle cx="7" cy="7" r="4"/>
                  <path d="M10 10l4 4"/>
                </svg>
              </span>
              <input 
                type="text" 
                class="search-input" 
                placeholder="Search tags..." 
                id="tag-search"
                value="${this.escapeHtml(this.searchQuery)}"
              />
            </div>
            <button class="btn btn-small btn-primary" id="create-tag-btn">+ New Tag</button>
          </div>
          <div class="card-body no-padding">
            ${totalFilteredTags === 0 ? this.renderEmptyState() : this.renderGroupedTagList(filteredGroups, filteredUngrouped, tagCounts)}
          </div>
        </div>
      </div>
      
      <!-- Inline tag editor (hidden by default) -->
      <div id="tag-editor-overlay" class="tag-editor-overlay hidden">
        <div class="tag-editor-panel">
          <div class="tag-editor-header">
            <h3 id="tag-editor-title">Create Tag</h3>
            <button class="tag-editor-close" id="tag-editor-close">&times;</button>
          </div>
          <div class="tag-editor-body">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text" class="form-input" id="tag-name-input" placeholder="Tag name..." />
            </div>
            <div class="form-group">
              <label class="form-label">Color</label>
              <div class="tag-color-picker" id="tag-color-picker">
                ${this.renderColorOptions()}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Description <span class="text-muted">(optional)</span></label>
              <input type="text" class="form-input" id="tag-description-input" placeholder="Brief description..." />
            </div>
          </div>
          <div class="tag-editor-footer">
            <button class="btn" id="tag-editor-cancel">Cancel</button>
            <button class="btn btn-primary" id="tag-editor-save">Save</button>
          </div>
        </div>
      </div>
    `;

    this.setupEventHandlers();
  }

  /**
   * Render the grouped list of tags
   */
  renderGroupedTagList(groups, ungrouped, tagCounts) {
    let html = '<div class="tags-list">';
    
    // Render each group
    groups.forEach(({ group, tags }) => {
      html += this.renderTagGroupSection(group, tags, tagCounts);
    });
    
    // Render ungrouped tags
    if (ungrouped.length > 0) {
      html += `
        <div class="tag-group-section">
          <div class="tag-group-header">
            <span class="tag-group-name">Other Tags</span>
            <span class="tag-group-count">${ungrouped.length}</span>
          </div>
          <div class="tag-group-content">
            ${ungrouped.map(tag => this.renderTagRow(tag, tagCounts[tag.id] || 0)).join('')}
          </div>
        </div>
      `;
    }
    
    html += '</div>';
    return html;
  }

  /**
   * Render a tag group section with its tags
   */
  renderTagGroupSection(group, tags, tagCounts) {
    return `
      <div class="tag-group-section" data-group-id="${group.id}">
        <div class="tag-group-header">
          <span class="tag-group-color" style="background-color: ${group.color || '#6b7280'}"></span>
          <span class="tag-group-name">${this.escapeHtml(group.name)}</span>
          ${group.exclusive ? '<span class="tag-group-badge">exclusive</span>' : ''}
          <span class="tag-group-count">${tags.length}</span>
          ${group.description ? `<span class="tag-group-description text-muted">${this.escapeHtml(group.description)}</span>` : ''}
        </div>
        <div class="tag-group-content">
          ${tags.map(tag => this.renderTagRow(tag, tagCounts[tag.id] || 0, group)).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render the list of tags (legacy - kept for compatibility)
   */
  renderTagList(tags, tagCounts) {
    return `
      <div class="tags-list">
        ${tags.map(tag => this.renderTagRow(tag, tagCounts[tag.id] || 0)).join('')}
      </div>
    `;
  }

  /**
   * Render a single tag row as an accordion
   * @param {Object} tag - Tag object
   * @param {number} count - Number of entities with this tag
   * @param {Object} group - Optional tag group
   */
  renderTagRow(tag, count, group = null) {
    const isExpanded = this.expandedTags.has(tag.id);
    const entities = isExpanded ? DataService.getEntitiesByTag(tag.id) : null;
    // Use tag color, or inherit from group
    const displayColor = tag.color || (group?.color) || '#6b7280';
    
    return `
      <div class="tag-accordion ${isExpanded ? 'expanded' : ''}" data-tag-id="${tag.id}">
        <div class="tag-accordion-header">
          <button class="tag-accordion-toggle" data-tag-id="${tag.id}" title="${isExpanded ? 'Collapse' : 'Expand'}">
            <svg class="tag-accordion-arrow" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 4l4 4-4 4"/>
            </svg>
          </button>
          <span class="tag-accordion-chip" style="--tag-color: ${displayColor}">
            <span class="tag-list-color" style="background-color: ${displayColor}"></span>
            <span class="tag-accordion-name">${this.escapeHtml(tag.name)}</span>
          </span>
          ${tag.description ? `<span class="tag-list-description text-muted">${this.escapeHtml(tag.description)}</span>` : ''}
          <div class="tag-list-actions">
            <span class="tag-list-count">${count} ${count === 1 ? 'entity' : 'entities'}</span>
            <button class="btn btn-icon btn-small tag-edit-btn" data-tag-id="${tag.id}" title="Edit tag">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z"/>
              </svg>
            </button>
            <button class="btn btn-icon btn-small tag-delete-btn" data-tag-id="${tag.id}" title="Delete tag">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 4h10l-1 10H4L3 4zM6 4V2h4v2M2 4h12"/>
              </svg>
            </button>
          </div>
        </div>
        ${isExpanded ? this.renderTagEntities(tag, entities) : ''}
      </div>
    `;
  }

  /**
   * Render the entities for an expanded tag using entity-list pattern
   */
  renderTagEntities(tag, entities) {
    const sections = [];
    
    // Entity type order and config
    const entityTypes = [
      { key: 'narratives', type: 'narrative' },
      { key: 'themes', type: 'theme' },
      { key: 'persons', type: 'person' },
      { key: 'organizations', type: 'organization' },
      { key: 'events', type: 'event' },
      { key: 'locations', type: 'location' },
      { key: 'factions', type: 'faction' },
      { key: 'documents', type: 'document' },
      { key: 'topics', type: 'topic' },
      { key: 'monitors', type: 'monitor' },
      { key: 'workspaces', type: 'workspace' }
    ];

    entityTypes.forEach(({ key, type }) => {
      const items = entities[key];
      if (!items || items.length === 0) return;

      const config = ENTITY_TYPE_CONFIG[type];
      const maxDisplay = type === 'documents' ? 10 : items.length;
      const displayItems = items.slice(0, maxDisplay);
      const hasMore = items.length > maxDisplay;

      sections.push({
        label: config.label,
        count: items.length,
        type,
        items: displayItems,
        hasMore,
        moreCount: items.length - maxDisplay
      });
    });

    if (sections.length === 0) {
      return `
        <div class="tag-accordion-content">
          <div class="tag-entities-empty">No entities have this tag yet.</div>
        </div>
      `;
    }

    return `
      <div class="tag-accordion-content">
        ${sections.map(section => `
          <div class="tag-entity-section">
            <div class="tag-entity-section-header">
              <span class="tag-entity-section-label">${section.label}</span>
              <span class="tag-entity-section-count">${section.count}</span>
            </div>
            <ul class="entity-list">
              ${section.items.map(item => this.renderEntityListItem(item, section.type)).join('')}
              ${section.hasMore ? `
                <li class="entity-list-more">
                  <a href="#/tag/${tag.id}">+${section.moreCount} more ${section.label.toLowerCase()}</a>
                </li>
              ` : ''}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Render a single entity list item (matches ListView pattern)
   */
  renderEntityListItem(item, entityType) {
    const config = ENTITY_TYPE_CONFIG[entityType];
    const title = getEntityTitle(item, entityType);
    const href = getEntityRoute(item, entityType);
    const icon = getEntityIcon(entityType, 16);
    
    // Get subtitle based on entity type
    let subtitle = '';
    if (entityType === 'location') {
      subtitle = item.type || 'Location';
    } else if (entityType === 'event') {
      const date = item.date ? new Date(item.date) : null;
      subtitle = date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
    } else if (entityType === 'person' || entityType === 'organization') {
      subtitle = item.title || item.type || config.singular;
    } else if (entityType === 'document') {
      subtitle = item.publisherName || 'Document';
    } else if (entityType === 'topic') {
      const totalVolume = (item.volumeOverTime || []).reduce((sum, v) => sum + (v.volume || 0), 0);
      subtitle = totalVolume > 0 ? `${totalVolume.toLocaleString()} mentions` : 'Topic';
    }
    
    // Get color for factions
    const color = entityType === 'faction' ? item.color : null;

    return `
      <li class="entity-list-item" data-id="${item.id}" data-type="${entityType}">
        <a href="${href}" class="entity-list-link">
          <div class="entity-avatar ${entityType}" ${color ? `style="background: ${color}20; color: ${color};"` : ''}>
            ${icon}
          </div>
          <div class="entity-info">
            <div class="entity-name">${this.escapeHtml(title.length > 60 ? title.slice(0, 58) + '...' : title)}</div>
            ${subtitle ? `<div class="entity-meta"><span class="entity-subtitle">${this.escapeHtml(subtitle)}</span></div>` : ''}
          </div>
        </a>
      </li>
    `;
  }

  /**
   * Render empty state
   */
  renderEmptyState() {
    if (this.searchQuery) {
      return `
        <div class="empty-state" style="padding: var(--space-xl);">
          <p>No tags match "${this.escapeHtml(this.searchQuery)}"</p>
        </div>
      `;
    }
    
    return `
      <div class="empty-state" style="padding: var(--space-2xl);">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-bottom: var(--space-md);">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <circle cx="7" cy="7" r="1.5" fill="var(--text-muted)"/>
        </svg>
        <h3 style="margin-bottom: var(--space-sm);">No Tags Yet</h3>
        <p class="text-muted" style="margin-bottom: var(--space-lg);">Tags help you organize and filter entities across your workspace.</p>
        <button class="btn btn-primary" id="empty-create-btn">Create Your First Tag</button>
      </div>
    `;
  }

  /**
   * Render color picker options
   */
  renderColorOptions() {
    const colors = [
      '#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F',
      '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC',
      '#5B8FA8', '#FFAB5E', '#D4A5A5', '#8CD17D', '#A0CBE8'
    ];
    
    return colors.map((color, i) => `
      <label class="tag-color-option ${i === 0 ? 'selected' : ''}">
        <input type="radio" name="tag-color" value="${color}" ${i === 0 ? 'checked' : ''} />
        <span class="tag-color-swatch" style="background-color: ${color}"></span>
      </label>
    `).join('');
  }

  /**
   * Set up event handlers
   */
  setupEventHandlers() {
    // Search input
    const searchInput = this.container.querySelector('#tag-search');
    if (searchInput) {
      this.addListener(searchInput, 'input', (e) => {
        this.searchQuery = e.target.value;
        this.render();
      });
    }

    // Create tag button
    const createBtn = this.container.querySelector('#create-tag-btn');
    if (createBtn) {
      this.addListener(createBtn, 'click', () => this.openEditor(null));
    }

    // Empty state create button
    const emptyCreateBtn = this.container.querySelector('#empty-create-btn');
    if (emptyCreateBtn) {
      this.addListener(emptyCreateBtn, 'click', () => this.openEditor(null));
    }

    // Accordion toggle buttons
    const toggleBtns = this.container.querySelectorAll('.tag-accordion-toggle');
    toggleBtns.forEach(btn => {
      this.addListener(btn, 'click', (e) => {
        e.stopPropagation();
        const tagId = btn.dataset.tagId;
        this.toggleAccordion(tagId);
      });
    });

    // Also allow clicking on the header (excluding action buttons) to toggle
    const accordionHeaders = this.container.querySelectorAll('.tag-accordion-header');
    accordionHeaders.forEach(header => {
      this.addListener(header, 'click', (e) => {
        // Don't toggle if clicking on action buttons
        if (e.target.closest('.tag-list-actions')) return;
        const tagId = header.closest('.tag-accordion').dataset.tagId;
        this.toggleAccordion(tagId);
      });
    });

    // Edit buttons
    const editBtns = this.container.querySelectorAll('.tag-edit-btn');
    editBtns.forEach(btn => {
      this.addListener(btn, 'click', (e) => {
        e.stopPropagation();
        const tagId = btn.dataset.tagId;
        const tag = DataService.getTag(tagId);
        if (tag) this.openEditor(tag);
      });
    });

    // Delete buttons
    const deleteBtns = this.container.querySelectorAll('.tag-delete-btn');
    deleteBtns.forEach(btn => {
      this.addListener(btn, 'click', (e) => {
        e.stopPropagation();
        const tagId = btn.dataset.tagId;
        this.handleDelete(tagId);
      });
    });

    // Editor event handlers
    this.setupEditorHandlers();
  }

  /**
   * Toggle accordion expansion for a tag
   */
  toggleAccordion(tagId) {
    if (this.expandedTags.has(tagId)) {
      this.expandedTags.delete(tagId);
    } else {
      this.expandedTags.add(tagId);
    }
    this.render();
  }

  /**
   * Set up editor panel handlers
   */
  setupEditorHandlers() {
    const overlay = this.container.querySelector('#tag-editor-overlay');
    const closeBtn = this.container.querySelector('#tag-editor-close');
    const cancelBtn = this.container.querySelector('#tag-editor-cancel');
    const saveBtn = this.container.querySelector('#tag-editor-save');
    const colorOptions = this.container.querySelectorAll('.tag-color-option');

    if (overlay) {
      this.addListener(overlay, 'click', (e) => {
        if (e.target === overlay) this.closeEditor();
      });
    }

    if (closeBtn) {
      this.addListener(closeBtn, 'click', () => this.closeEditor());
    }

    if (cancelBtn) {
      this.addListener(cancelBtn, 'click', () => this.closeEditor());
    }

    if (saveBtn) {
      this.addListener(saveBtn, 'click', () => this.handleSave());
    }

    // Color picker selection
    colorOptions.forEach(option => {
      this.addListener(option, 'click', () => {
        colorOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
      });
    });

    // Enter key in name input
    const nameInput = this.container.querySelector('#tag-name-input');
    if (nameInput) {
      this.addListener(nameInput, 'keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSave();
        }
      });
    }

    // Escape key to close
    this.addListener(document, 'keydown', (e) => {
      if (e.key === 'Escape') {
        const overlay = this.container.querySelector('#tag-editor-overlay');
        if (overlay && !overlay.classList.contains('hidden')) {
          this.closeEditor();
        }
      }
    });
  }

  /**
   * Open the editor for creating or editing a tag
   */
  openEditor(tag) {
    this.editingTagId = tag?.id || null;
    
    const overlay = this.container.querySelector('#tag-editor-overlay');
    const title = this.container.querySelector('#tag-editor-title');
    const nameInput = this.container.querySelector('#tag-name-input');
    const descInput = this.container.querySelector('#tag-description-input');
    const colorOptions = this.container.querySelectorAll('.tag-color-option input');
    
    if (title) {
      title.textContent = tag ? 'Edit Tag' : 'Create Tag';
    }
    
    if (nameInput) {
      nameInput.value = tag?.name || '';
    }
    
    if (descInput) {
      descInput.value = tag?.description || '';
    }
    
    // Set color
    if (colorOptions.length > 0) {
      const targetColor = tag?.color || colorOptions[0].value;
      colorOptions.forEach(input => {
        const isSelected = input.value === targetColor;
        input.checked = isSelected;
        input.closest('.tag-color-option')?.classList.toggle('selected', isSelected);
      });
    }
    
    overlay?.classList.remove('hidden');
    
    // Focus name input
    setTimeout(() => nameInput?.focus(), 100);
  }

  /**
   * Close the editor
   */
  closeEditor() {
    const overlay = this.container.querySelector('#tag-editor-overlay');
    overlay?.classList.add('hidden');
    this.editingTagId = null;
  }

  /**
   * Handle save
   */
  handleSave() {
    const nameInput = this.container.querySelector('#tag-name-input');
    const descInput = this.container.querySelector('#tag-description-input');
    const selectedColor = this.container.querySelector('.tag-color-option.selected input');
    
    const name = nameInput?.value?.trim();
    if (!name) {
      nameInput?.focus();
      return;
    }
    
    const tagData = {
      name,
      description: descInput?.value?.trim() || '',
      color: selectedColor?.value || '#4E79A7'
    };
    
    if (this.editingTagId) {
      // Update existing tag
      DataService.updateTag(this.editingTagId, tagData);
    } else {
      // Create new tag
      DataService.createTag(tagData);
    }
    
    this.closeEditor();
    this.render();
  }

  /**
   * Handle delete
   */
  handleDelete(tagId) {
    const tag = DataService.getTag(tagId);
    if (!tag) return;
    
    const counts = DataService.getTagCountsByEntityType(tagId);
    const totalCount = Object.values(counts).reduce((sum, c) => sum + c, 0);
    
    const confirmMsg = totalCount > 0
      ? `Delete tag "${tag.name}"? It will be removed from ${totalCount} ${totalCount === 1 ? 'entity' : 'entities'}.`
      : `Delete tag "${tag.name}"?`;
    
    if (confirm(confirmMsg)) {
      DataService.deleteTag(tagId);
      this.render();
    }
  }
}

export default TagsView;
