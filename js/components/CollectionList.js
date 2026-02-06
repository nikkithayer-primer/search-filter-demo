/**
 * CollectionList.js
 * Shared list view component for Workspaces and Projects
 * Renders collections as a list with consistent styling and behavior
 */

import { BaseComponent } from './BaseComponent.js';
import { Dropdown } from './Dropdown.js';
import { CardBuilder } from '../utils/CardBuilder.js';
import { formatRelativeTime } from '../utils/formatters.js';
import { escapeHtml } from '../utils/htmlUtils.js';

/**
 * Configuration for different collection types
 */
const COLLECTION_CONFIGS = {
  workspace: {
    icon: 'workspace',
    editEnabled: true,
    showQuery: true,
    showCollaborators: false,
    emptyIcon: `<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <path d="M8 7h8M8 11h8M8 15h4"/>
    </svg>`,
    emptyTitle: 'No Workspaces Yet',
    emptyDescription: 'Workspaces help you organize search results and track documents related to specific topics.'
  },
  project: {
    icon: 'project',
    editEnabled: false,
    editTitle: 'Edit (coming soon)',
    showQuery: false,
    showCollaborators: true,
    emptyIcon: `<svg viewBox="0 0 16 16" width="48" height="48" fill="var(--text-muted)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 1C1.44771 1 1 1.44772 1 2V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V3.5C15 2.94772 14.5523 2.5 14 2.5H8.26759L7.56446 1.4453C7.37899 1.1671 7.06676 1 6.73241 1H2ZM2 2H6.73241L7.43554 3.0547C7.62101 3.3329 7.93324 3.5 8.26759 3.5H14V4.5H2V2ZM2 5.5V14H14V5.5H2Z"/>
    </svg>`,
    emptyTitle: 'No Projects Yet',
    emptyDescription: 'Projects help you organize curated collections of documents for research and reporting.'
  }
};

/**
 * Hardcoded collaborators for projects (demo data)
 */
const PROJECT_COLLABORATORS = {
  'project-001': [
    { initials: 'JD', name: 'Jane Doe', color: '#6366f1' },
    { initials: 'MS', name: 'Mike Smith', color: '#10b981' },
    { initials: 'AK', name: 'Alex Kim', color: '#f59e0b' }
  ],
  'project-002': [
    { initials: 'JD', name: 'Jane Doe', color: '#6366f1' },
    { initials: 'RJ', name: 'Rachel Jones', color: '#ec4899' }
  ],
  'project-003': [
    { initials: 'MS', name: 'Mike Smith', color: '#10b981' },
    { initials: 'TW', name: 'Tom Wilson', color: '#8b5cf6' },
    { initials: 'LM', name: 'Lisa Martin', color: '#14b8a6' },
    { initials: 'CB', name: 'Chris Brown', color: '#f97316' }
  ],
  // Default collaborators for any other project
  default: [
    { initials: 'JD', name: 'Jane Doe', color: '#6366f1' },
    { initials: 'MS', name: 'Mike Smith', color: '#10b981' }
  ]
};

export class CollectionList extends BaseComponent {
  /**
   * @param {string|HTMLElement} containerId - Container element or ID
   * @param {Object} options - Configuration options
   * @param {string} options.collectionType - 'workspace' or 'project'
   * @param {Function} options.onItemClick - Callback when item is clicked
   * @param {Function} options.onEdit - Callback for edit action
   * @param {Function} options.onArchive - Callback for archive/restore action
   * @param {Function} options.onCreate - Callback for create action
   * @param {boolean} options.createDisabled - Disable create button
   */
  constructor(containerId, options = {}) {
    super(containerId, {
      collectionType: 'workspace',
      onItemClick: null,
      onEdit: null,
      onArchive: null,
      onCreate: null,
      createDisabled: false,
      ...options
    });
    
    this.config = COLLECTION_CONFIGS[this.options.collectionType] || COLLECTION_CONFIGS.workspace;
    this._dropdowns = [];
  }

  /**
   * Get the icon for the collection type
   * @param {Object} item - Optional item to check for special icons
   * @returns {string} SVG icon HTML
   */
  getCollectionIcon(item = null) {
    if (this.options.collectionType === 'workspace') {
      return `<svg class="collection-list-icon" viewBox="0 0 16 16" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.25">
        <rect x="2" y="2" width="12" height="12" rx="1.5"/>
        <path d="M5 5h6M5 8h6M5 11h4"/>
      </svg>`;
    }
    
    // Special inbox icon for Unsorted
    if (item && item.name?.toLowerCase() === 'unsorted') {
      return `<svg class="collection-list-icon" viewBox="0 0 16 16" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.25">
        <path d="M2 6l2-4h8l2 4"/>
        <rect x="1" y="6" width="14" height="8" rx="1"/>
        <path d="M1 6h4l1 2h4l1-2h4"/>
      </svg>`;
    }
    
    // Project folder icon
    return `<svg class="collection-list-icon" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 1C1.44771 1 1 1.44772 1 2V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V3.5C15 2.94772 14.5523 2.5 14 2.5H8.26759L7.56446 1.4453C7.37899 1.1671 7.06676 1 6.73241 1H2ZM2 2H6.73241L7.43554 3.0547C7.62101 3.3329 7.93324 3.5 8.26759 3.5H14V4.5H2V2ZM2 5.5V14H14V5.5H2Z"/>
    </svg>`;
  }

  /**
   * Render the collection list
   */
  /**
   * Sort items with special items (like "Unsorted" inbox) at the top
   * @param {Array} items - Items to sort
   * @returns {Array} Sorted items
   */
  sortItems(items) {
    if (this.options.collectionType !== 'project') {
      return items;
    }
    
    // For projects, put "Unsorted" at the top
    return [...items].sort((a, b) => {
      const aIsUnsorted = a.name?.toLowerCase() === 'unsorted';
      const bIsUnsorted = b.name?.toLowerCase() === 'unsorted';
      
      if (aIsUnsorted && !bIsUnsorted) return -1;
      if (!aIsUnsorted && bIsUnsorted) return 1;
      return 0; // Keep original order for other items
    });
  }

  render() {
    this.clear();
    this.destroyDropdowns();
    
    if (!this.data || !this.data.items || this.data.items.length === 0) {
      this.renderEmptyState();
      return;
    }
    
    const { items } = this.data;
    const activeItems = this.sortItems(items.filter(item => item.status !== 'archived'));
    const archivedItems = items.filter(item => item.status === 'archived');
    
    // Create list container
    const listContainer = document.createElement('div');
    listContainer.className = 'collection-list';
    
    // Render active items
    if (activeItems.length > 0) {
      const activeList = this.renderList(activeItems);
      listContainer.appendChild(activeList);
    }
    
    // Render archived section if there are any
    if (archivedItems.length > 0) {
      const archivedSection = document.createElement('div');
      archivedSection.className = 'collection-list-section collection-list-archived';
      archivedSection.innerHTML = `<h3 class="collection-list-section-title text-muted">Archived</h3>`;
      
      const archivedList = this.renderList(archivedItems);
      archivedSection.appendChild(archivedList);
      listContainer.appendChild(archivedSection);
    }
    
    this.container.appendChild(listContainer);
    
    // Initialize dropdowns
    this._dropdowns = Dropdown.initAll(this.container);
    
    // Setup event handlers
    this.setupEventHandlers();
  }

  /**
   * Render a list of items
   * @param {Array} items - Items to render
   * @returns {HTMLElement} List element
   */
  renderList(items) {
    const list = document.createElement('ul');
    list.className = 'collection-list-items';
    
    items.forEach(item => {
      const listItem = this.renderItem(item);
      list.appendChild(listItem);
    });
    
    return list;
  }

  /**
   * Get collaborators for a project
   * @param {string} projectId - Project ID
   * @returns {Array} Array of collaborator objects
   */
  getCollaborators(projectId) {
    return PROJECT_COLLABORATORS[projectId] || PROJECT_COLLABORATORS.default;
  }

  /**
   * Render collaborator avatars
   * @param {Array} collaborators - Array of collaborator objects
   * @returns {string} HTML string for collaborator avatars
   */
  renderCollaborators(collaborators) {
    if (!collaborators || collaborators.length === 0) return '';
    
    const maxVisible = 3;
    const visible = collaborators.slice(0, maxVisible);
    const remaining = collaborators.length - maxVisible;
    
    const avatarsHtml = visible.map(c => `
      <div class="collection-list-avatar" style="background-color: ${c.color}" title="${escapeHtml(c.name)}">
        ${c.initials}
      </div>
    `).join('');
    
    const overflowHtml = remaining > 0
      ? `<div class="collection-list-avatar collection-list-avatar-overflow" title="${remaining} more collaborator${remaining > 1 ? 's' : ''}">+${remaining}</div>`
      : '';
    
    return `
      <div class="collection-list-collaborators">
        ${avatarsHtml}
        ${overflowHtml}
      </div>
    `;
  }

  /**
   * Render a single list item
   * @param {Object} item - The item to render
   * @returns {HTMLElement} List item element
   */
  renderItem(item) {
    const li = document.createElement('li');
    li.className = 'collection-list-item';
    li.dataset.itemId = item.id;
    
    const docCount = item.documentIds?.length || 0;
    const isArchived = item.status === 'archived';
    const updatedAt = formatRelativeTime(item.updatedAt);
    const collectionType = this.options.collectionType;
    
    // Build action menu
    const actionsHtml = CardBuilder.actionMenu(collectionType, item.id, {
      isArchived,
      editDisabled: !this.config.editEnabled,
      editTitle: this.config.editTitle
    });
    
    // Build query display for workspaces
    const queryHtml = this.config.showQuery && item.query
      ? `<span class="collection-list-query">Search: "${escapeHtml(item.query)}"</span>`
      : '';
    
    // Build description
    const descriptionHtml = item.description
      ? `<span class="collection-list-description">${escapeHtml(item.description)}</span>`
      : '';
    
    // Build collaborators for projects
    const collaboratorsHtml = this.config.showCollaborators
      ? this.renderCollaborators(this.getCollaborators(item.id))
      : '';
    
    li.innerHTML = `
      <div class="collection-list-item-icon${item.name?.toLowerCase() === 'unsorted' ? ' collection-list-item-icon-inbox' : ''}">
        ${this.getCollectionIcon(item)}
      </div>
      <div class="collection-list-item-content">
        <div class="collection-list-item-header">
          <a href="#/${item.id}/" class="collection-list-item-name">${escapeHtml(item.name)}</a>
          <div class="collection-list-item-meta">
            ${collaboratorsHtml}
            <span class="collection-list-item-docs">${docCount} doc${docCount !== 1 ? 's' : ''}</span>
            <span class="collection-list-item-updated">${updatedAt}</span>
          </div>
        </div>
        <div class="collection-list-item-details">
          ${queryHtml}
          ${descriptionHtml}
        </div>
      </div>
      <div class="collection-list-item-actions">
        ${actionsHtml}
      </div>
    `;
    
    return li;
  }

  /**
   * Render empty state
   */
  renderEmptyState() {
    const collectionType = this.options.collectionType;
    const config = this.config;
    const createDisabled = this.options.createDisabled ? 'disabled' : '';
    const createTitle = this.options.createDisabled ? 'title="Coming soon"' : '';
    
    const emptyState = document.createElement('div');
    emptyState.className = 'collection-list-empty';
    emptyState.innerHTML = `
      <div class="collection-list-empty-content">
        ${config.emptyIcon}
        <h2 class="collection-list-empty-title">${config.emptyTitle}</h2>
        <p class="collection-list-empty-description">${config.emptyDescription}</p>
        <button class="btn btn-primary collection-list-create-btn" id="empty-create-btn" ${createDisabled} ${createTitle}>
          Create Your First ${collectionType === 'workspace' ? 'Workspace' : 'Project'}
        </button>
      </div>
    `;
    
    this.container.appendChild(emptyState);
    
    // Setup create button handler
    const createBtn = emptyState.querySelector('#empty-create-btn');
    if (createBtn && this.options.onCreate) {
      createBtn.addEventListener('click', () => {
        if (!this.options.createDisabled) {
          this.options.onCreate();
        }
      });
    }
  }

  /**
   * Setup event handlers for list items
   */
  setupEventHandlers() {
    const collectionType = this.options.collectionType;
    
    // Item click handlers (clicking on the row, not the action menu)
    const items = this.container.querySelectorAll('.collection-list-item');
    items.forEach(item => {
      // Click on the item content (not actions) navigates
      const content = item.querySelector('.collection-list-item-content');
      if (content) {
        content.style.cursor = 'pointer';
        content.addEventListener('click', (e) => {
          // Don't navigate if clicking a link
          if (e.target.closest('a')) return;
          
          const itemId = item.dataset.itemId;
          if (this.options.onItemClick) {
            this.options.onItemClick(itemId);
          } else {
            window.location.hash = `#/${itemId}/`;
          }
        });
      }
    });
    
    // Dropdown action handlers
    this.container.addEventListener('dropdown:select', (e) => {
      const { item: menuItem } = e.detail;
      const action = menuItem.dataset.action;
      const itemId = menuItem.dataset[`${collectionType}Id`];
      
      if (action === 'edit' && !menuItem.disabled && this.options.onEdit) {
        this.options.onEdit(itemId);
      } else if (action === 'archive' && this.options.onArchive) {
        this.options.onArchive(itemId);
      }
    });
  }

  /**
   * Destroy dropdown instances
   */
  destroyDropdowns() {
    if (this._dropdowns) {
      this._dropdowns.forEach(d => d.destroy());
      this._dropdowns = [];
    }
  }

  /**
   * Clean up
   */
  destroy() {
    this.destroyDropdowns();
    super.destroy();
  }
}

export default CollectionList;
