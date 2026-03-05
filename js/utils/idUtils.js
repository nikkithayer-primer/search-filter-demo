/**
 * idUtils.js
 * Utilities for ID-based routing and entity type resolution
 * 
 * Entity IDs use prefixes to indicate their type, enabling cleaner URLs
 * like #/monitor-001/person-003/ instead of #/monitor/monitor-001/person/person-003
 */

/**
 * Map of ID prefixes to entity types
 */
export const ID_PREFIXES = {
  // Context types (can be first segment in route)
  'monitor-': 'monitor',
  'workspace-': 'workspace',
  'project-': 'project',
  
  // Entity types
  'mission-': 'mission',
  'narr-': 'narrative',
  'sub-': 'theme',
  'loc-': 'location',
  'event-': 'event',
  'person-': 'person',
  'org-': 'organization',
  'topic-': 'topic',
  'doc-': 'document',
  'repo-': 'repository',
  'filter-': 'searchFilter',
  'pub-': 'publisher',
  'alert-': 'alert',
  'user-': 'user',
  'tag-': 'tag'
};

/**
 * Prefixes that indicate a context scope (document filtering)
 */
export const CONTEXT_PREFIXES = ['monitor-', 'workspace-', 'project-'];

/**
 * Entity types that have detail views
 */
export const VIEWABLE_ENTITY_TYPES = [
  'narrative', 'theme', 'location', 'event',
  'person', 'organization', 'topic', 'document', 'tag'
];

/**
 * Get the entity type from an ID based on its prefix
 * @param {string} id - The entity ID (e.g., 'person-003', 'monitor-001')
 * @returns {string|null} The entity type or null if unknown
 */
export function getEntityTypeFromId(id) {
  if (!id || typeof id !== 'string') return null;
  
  for (const [prefix, type] of Object.entries(ID_PREFIXES)) {
    if (id.startsWith(prefix)) {
      return type;
    }
  }
  
  return null;
}

/**
 * Check if an ID represents a context (monitor, workspace, project)
 * @param {string} id - The ID to check
 * @returns {boolean} True if the ID is a context type
 */
export function isContextId(id) {
  if (!id || typeof id !== 'string') return false;
  
  return CONTEXT_PREFIXES.some(prefix => id.startsWith(prefix));
}

/**
 * Build an ID-based route URL
 * @param {string|null} contextId - Optional context ID (monitor-001, workspace-001, etc.)
 * @param {...string} entityIds - Entity IDs to include in the route
 * @returns {string} The hash route URL
 */
export function buildIdRoute(contextId, ...entityIds) {
  const parts = [];
  
  if (contextId) {
    parts.push(contextId);
  }
  
  parts.push(...entityIds.filter(Boolean));
  
  if (parts.length === 0) {
    return '#/monitors';
  }
  
  return `#/${parts.join('/')}/`;
}

export default {
  ID_PREFIXES,
  CONTEXT_PREFIXES,
  VIEWABLE_ENTITY_TYPES,
  getEntityTypeFromId,
  isContextId,
  buildIdRoute
};
