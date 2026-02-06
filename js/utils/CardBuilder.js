/**
 * CardBuilder.js
 * Utility for generating consistent card HTML across all views
 */

export const CardBuilder = {
  /**
   * Create a card HTML string
   * @param {string} title - Card title
   * @param {string} containerId - ID for the card body container
   * @param {Object} options - Configuration options
   * @param {number} [options.count] - Optional count to display in title
   * @param {boolean} [options.noPadding] - Remove padding from card body
   * @param {boolean} [options.halfWidth] - Make card half-width
   * @param {boolean} [options.fullWidth] - Make card full-width
   * @param {string} [options.actions] - HTML for card header actions
   * @param {string} [options.actionMenuHtml] - HTML for action menu (placed at far right)
   * @param {string} [options.bodyClass] - Additional classes for card body
   * @param {string} [options.subtitle] - Optional subtitle text (e.g., "Triggered 6 days ago")
   * @param {string} [options.content] - Optional HTML content to insert into card body
   * @param {boolean} [options.noFullscreen] - Disable fullscreen toggle button
   * @returns {string} Card HTML string
   */
  create(title, containerId, options = {}) {
    const countLabel = options.count !== undefined ? ` (${options.count})` : '';
    
    const bodyClasses = [
      'card-body',
      options.noPadding ? 'no-padding' : '',
      options.bodyClass || ''
    ].filter(Boolean).join(' ');
    
    const cardClasses = [
      'card',
      options.halfWidth ? 'card-half-width' : '',
      options.fullWidth ? 'card-full-width' : ''
    ].filter(Boolean).join(' ');
    
    const subtitleHtml = options.subtitle ? `<span class="card-subtitle">${options.subtitle}</span>` : '';
    const bodyContent = options.content || '';
    
    // Build actions: custom actions + fullscreen toggle + action menu (at far right)
    const fullscreenToggleHtml = options.noFullscreen ? '' : this.fullscreenToggle(containerId);
    const actionMenuHtml = options.actionMenuHtml || '';
    const allActions = (options.actions || '') + fullscreenToggleHtml + actionMenuHtml;
    
    return `
      <div class="${cardClasses}" data-card-id="${containerId}">
        <div class="card-header">
          <h2 class="card-title">${title}${countLabel}</h2>
          ${subtitleHtml}
          <div class="card-header-actions">${allActions}</div>
        </div>
        <div class="${bodyClasses}" id="${containerId}">${bodyContent}</div>
      </div>
    `;
  },

  /**
   * Create description toggle button HTML
   * @param {string} id - Button ID
   * @returns {string} Button HTML
   */
  descriptionToggle(id) {
    return `
      <button class="btn-icon card-action-btn description-toggle" title="Toggle descriptions" id="${id}">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 4h10M3 8h10M3 12h6"/>
        </svg>
      </button>
    `;
  },

  /**
   * Create fullscreen toggle button HTML
   * @param {string} containerId - Container ID for the card
   * @returns {string} Button HTML
   */
  fullscreenToggle(containerId) {
    return `
      <button class="btn-icon card-action-btn fullscreen-toggle" 
              title="Toggle fullscreen" 
              data-card-container="${containerId}">
        <svg class="fullscreen-expand-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"/>
        </svg>
        <svg class="fullscreen-collapse-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4"/>
        </svg>
      </button>
    `;
  },

  /**
   * Create multiple cards from a configuration array
   * @param {Array} configs - Array of card configurations
   * @returns {string} Combined card HTML
   */
  createMultiple(configs) {
    return configs
      .filter(config => config.condition !== false)
      .map(config => {
        const options = { ...config.options };
        if (config.content) {
          options.content = config.content;
        }
        return this.create(config.title, config.id, options);
      })
      .join('');
  },

  /**
   * Create action menu dropdown with Edit and Archive options
   * @param {string} entityType - 'monitor', 'workspace', or 'project'
   * @param {string} entityId - The entity ID
   * @param {Object} options - { isArchived: boolean, editDisabled: boolean, editTitle: string }
   * @returns {string} Dropdown HTML
   */
  actionMenu(entityType, entityId, options = {}) {
    const { isArchived = false, editDisabled = false, editTitle } = options;
    const archiveLabel = isArchived ? 'Restore' : 'Archive';
    const editLabel = editTitle || 'Edit';
    const editDisabledClass = editDisabled ? ' disabled' : '';
    const editDisabledAttr = editDisabled ? ' disabled' : '';
    
    return `
      <div class="dropdown dropdown--icon-trigger" data-dropdown data-dropdown-align="right" data-${entityType}-id="${entityId}">
        <button class="dropdown-trigger" data-dropdown-trigger title="More actions">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path fill="currentColor" d="M8 12C8.85 12 9.5 12.65 9.5 13.5C9.5 14.35 8.85 15 8 15C7.15 15 6.5 14.35 6.5 13.5C6.5 12.65 7.15 12 8 12Z"/>
            <path fill="currentColor" d="M8 6.5C8.85 6.5 9.5 7.15 9.5 8C9.5 8.85 8.85 9.5 8 9.5C7.15 9.5 6.5 8.85 6.5 8C6.5 7.15 7.15 6.5 8 6.5Z"/>
            <path fill="currentColor" d="M9.5 2.5C9.5 1.65 8.85 1 8 1C7.15 1 6.5 1.65 6.5 2.5C6.5 3.35 7.15 4 8 4C8.85 4 9.5 3.35 9.5 2.5Z"/>
          </svg>
        </button>
        <div class="dropdown-menu" data-dropdown-menu>
          <button class="dropdown-item ${entityType}-edit-btn${editDisabledClass}" 
                  data-${entityType}-id="${entityId}" data-action="edit"${editDisabledAttr}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M11.5 2.5l2 2M2 11l-.5 3.5L5 14l9-9-2-2-10 10z"/>
            </svg>
            ${editLabel}
          </button>
          <button class="dropdown-item ${entityType}-archive-btn" data-${entityType}-id="${entityId}" data-action="archive">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              ${isArchived 
                ? '<path d="M3 3h10v10H3z"/><path d="M8 10V5M5.5 7L8 4.5 10.5 7"/>' 
                : '<path d="M3 3h10v10H3z"/><path d="M8 6v5M5.5 9L8 11.5 10.5 9"/>'}
            </svg>
            ${archiveLabel}
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Create edit button HTML for card actions (standalone)
   * @param {string} entityType - 'monitor', 'workspace', or 'project'
   * @param {string} entityId - The entity ID
   * @param {Object} options - { disabled: boolean, title: string }
   * @returns {string} Button HTML
   */
  editButton(entityType, entityId, options = {}) {
    const title = options.title || `Edit ${entityType}`;
    const disabled = options.disabled ? ' disabled' : '';
    return `
      <button class="btn-icon card-action-btn ${entityType}-edit-btn" 
              data-${entityType}-id="${entityId}" 
              title="${title}"${disabled}>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M11.5 2.5l2 2M2 11l-.5 3.5L5 14l9-9-2-2-10 10z"/>
        </svg>
      </button>
    `;
  },

  /**
   * Create archive/restore button HTML for card actions (standalone)
   * @param {string} entityType - 'monitor', 'workspace', or 'project'
   * @param {string} entityId - The entity ID
   * @param {boolean} isArchived - Current archive state
   * @returns {string} Button HTML
   */
  archiveButton(entityType, entityId, isArchived) {
    const title = isArchived ? `Restore ${entityType}` : `Archive ${entityType}`;
    const icon = isArchived
      ? '<path d="M3 3h10v10H3z"/><path d="M8 10V5M5.5 7L8 4.5 10.5 7"/>'  // Restore: box with up arrow
      : '<path d="M3 3h10v10H3z"/><path d="M8 6v5M5.5 9L8 11.5 10.5 9"/>';  // Archive: box with down arrow
    return `
      <button class="btn-icon card-action-btn ${entityType}-archive-btn" 
              data-${entityType}-id="${entityId}" 
              title="${title}">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
          ${icon}
        </svg>
      </button>
    `;
  }
};

export default CardBuilder;
