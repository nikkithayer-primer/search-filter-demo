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
