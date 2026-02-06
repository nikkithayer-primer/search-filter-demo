/**
 * entityRenderer.js
 * Shared utilities for rendering entity items (persons/organizations) consistently
 */

/**
 * Get the SVG icon for an entity type
 * @param {string} entityType - 'person' or 'organization'
 * @returns {string} SVG HTML
 */
export function getEntityIcon(entityType) {
  if (entityType === 'person') {
    return `<svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.25">
      <circle cx="8" cy="4" r="2.5"/>
      <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
    </svg>`;
  }
  return `<svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 16H9.5C9.59107 16 9.67646 15.9757 9.75 15.9331C9.82354 15.9757 9.90893 16 10 16H15.5C15.7761 16 16 15.7761 16 15.5V4.5C16 4.22386 15.7761 4 15.5 4H10V0.5C10 0.223858 9.77614 0 9.5 0H0.5C0.223858 0 0 0.223858 0 0.5V15.5C0 15.7761 0.223858 16 0.5 16ZM1 15V1H9V15H7V13C7 12.7239 6.77614 12.5 6.5 12.5H3.5C3.22386 12.5 3 12.7239 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z"/>
  </svg>`;
}

/**
 * Get the avatar content for an entity (image or icon)
 * @param {Object} entity - Entity object with _type and optionally imageUrl
 * @returns {string} HTML for avatar content
 */
export function getEntityAvatarContent(entity) {
  if (entity.imageUrl) {
    const icon = getEntityIcon(entity._type);
    return `<img src="${entity.imageUrl}" alt="${entity.name || ''}" class="entity-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
      <span class="entity-icon-fallback" style="display:none;">${icon}</span>`;
  }
  return getEntityIcon(entity._type);
}

/**
 * Render a single entity list item
 * @param {Object} entity - Entity object with id, name, _type, type, imageUrl
 * @param {Object} options - Options { excludeId }
 * @returns {string} HTML for the entity list item
 */
export function renderEntityListItem(entity, options = {}) {
  const { excludeId } = options;
  const typeLabel = entity._type === 'person' ? 'Person' : 'Organization';
  const subtitle = entity.title || entity.type || typeLabel;
  const isExcluded = excludeId && entity.id === excludeId;
  const avatarContent = getEntityAvatarContent(entity);

  return `
    <li class="entity-list-item ${isExcluded ? 'excluded' : ''}" data-id="${entity.id}" data-type="${entity._type}">
      <div class="entity-avatar ${entity._type} ${entity.imageUrl ? 'has-image' : ''}">
        ${avatarContent}
      </div>
      <div class="entity-info">
        <div class="entity-name">${entity.name || 'Unknown'}</div>
        <div class="entity-type">${subtitle}</div>
      </div>
    </li>
  `;
}

/**
 * Render a list of entities
 * @param {Array} entities - Array of entity objects
 * @param {Object} options - Options { excludeId, sortByName }
 * @returns {string} HTML for the entity list
 */
export function renderEntityList(entities, options = {}) {
  const { sortByName = true, excludeId } = options;
  
  let sortedEntities = [...entities];
  if (sortByName) {
    sortedEntities.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  return `
    <ul class="entity-list network-entity-list">
      ${sortedEntities.map(entity => renderEntityListItem(entity, { excludeId })).join('')}
    </ul>
  `;
}

export default {
  getEntityIcon,
  getEntityAvatarContent,
  renderEntityListItem,
  renderEntityList
};
