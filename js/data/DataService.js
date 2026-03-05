/**
 * DataService.js
 * Query layer over DataStore
 * Provides bidirectional relationship queries
 * Supports time range filtering for temporal data
 */

import { dataStore } from './DataStore.js';

// ============================================
// Helper Functions
// ============================================

/**
 * Generic helper to find an entity by ID in a collection
 * @param {string} collection - Name of the collection in dataStore.data
 * @param {string} id - Entity ID to find
 * @returns {Object|undefined} The found entity or undefined
 */
const findById = (collection, id) => {
  if (!id) return undefined;
  const data = dataStore.data?.[collection];
  if (!data || !Array.isArray(data)) return undefined;
  return data.find(item => item && item.id === id);
};

/**
 * Generic helper to resolve related entities from an ID array
 * @param {string} sourceCollection - Name of the source collection
 * @param {string} sourceId - ID of the source entity
 * @param {string} relationField - Field name containing the array of related IDs
 * @param {string} targetCollection - Name of the target collection to resolve IDs from
 * @returns {Array} Array of resolved entities (nulls filtered out)
 */
const resolveRelatedEntities = (sourceCollection, sourceId, relationField, targetCollection) => {
  try {
    const source = findById(sourceCollection, sourceId);
    if (!source) return [];
    const ids = source[relationField];
    if (!ids || !Array.isArray(ids)) return [];
    return ids
      .map(id => findById(targetCollection, id))
      .filter(Boolean);
  } catch (e) {
    console.error(`DataService: Error resolving related entities from ${sourceCollection} to ${targetCollection}:`, e);
    return [];
  }
};

/**
 * Generic helper to find entities that reference a given ID in a specific field
 * @param {string} collection - Name of the collection to search
 * @param {string} field - Field name to check (can be array field or direct field)
 * @param {string} targetId - ID to search for
 * @param {boolean} isArrayField - Whether the field is an array (default: true)
 * @returns {Array} Array of matching entities
 */
const findEntitiesReferencing = (collection, field, targetId, isArrayField = true) => {
  try {
    if (!targetId) return [];
    const data = dataStore.data?.[collection];
    if (!data || !Array.isArray(data)) return [];
    
    if (isArrayField) {
      return data.filter(item => {
        if (!item) return false;
        const fieldValue = item[field];
        return Array.isArray(fieldValue) && fieldValue.includes(targetId);
      });
    }
    return data.filter(item => item && item[field] === targetId);
  } catch (e) {
    console.error(`DataService: Error finding entities referencing ${targetId} in ${collection}.${field}:`, e);
    return [];
  }
};

// ============================================
// Document Scoping Helpers
// ============================================

/**
 * Filter entities to only those that have at least one document in the scope
 * @param {Array} entities - Array of entities to filter
 * @param {string} documentIdField - Field name containing document IDs (e.g., 'documentIds')
 * @param {string[]|null} scopeDocIds - Array of document IDs defining the scope (null = no filter)
 * @returns {Array} Filtered entities
 */
const filterByDocumentScope = (entities, documentIdField, scopeDocIds) => {
  if (!scopeDocIds || !Array.isArray(scopeDocIds) || scopeDocIds.length === 0) {
    return entities;
  }
  const scopeSet = new Set(scopeDocIds);
  return entities.filter(entity => {
    if (!entity) return false;
    const entityDocIds = entity[documentIdField];
    if (!entityDocIds || !Array.isArray(entityDocIds)) return false;
    return entityDocIds.some(docId => scopeSet.has(docId));
  });
};

/**
 * Filter documents to only those in the scope
 * @param {Array} documents - Array of documents to filter
 * @param {string[]|null} scopeDocIds - Array of document IDs defining the scope (null = no filter)
 * @returns {Array} Filtered documents
 */
const filterDocumentsByScope = (documents, scopeDocIds) => {
  if (!scopeDocIds || !Array.isArray(scopeDocIds) || scopeDocIds.length === 0) {
    return documents;
  }
  const scopeSet = new Set(scopeDocIds);
  return documents.filter(doc => doc && scopeSet.has(doc.id));
};

/**
 * Intersect an entity's document IDs with a scope
 * @param {string[]} entityDocIds - Document IDs from an entity
 * @param {string[]|null} scopeDocIds - Scope document IDs (null = no filter)
 * @returns {string[]} Intersected document IDs
 */
const intersectDocumentIds = (entityDocIds, scopeDocIds) => {
  if (!scopeDocIds || !Array.isArray(scopeDocIds) || scopeDocIds.length === 0) {
    return entityDocIds || [];
  }
  if (!entityDocIds || !Array.isArray(entityDocIds)) return [];
  const scopeSet = new Set(scopeDocIds);
  return entityDocIds.filter(docId => scopeSet.has(docId));
};

// ============================================
// Unified Document Scope Matching
// ============================================

/**
 * Match a document against a scope definition.
 * @param {Object} doc - Document to check
 * @param {Object} scope - Scope definition
 * @param {string[]} scope.personIds - Person IDs to match
 * @param {string[]} scope.organizationIds - Organization IDs to match
 * @param {string[]} scope.locationIds - Location IDs to match
 * @param {string[]} scope.eventIds - Event IDs to match
 * @param {string[]} scope.narrativeIds - Narrative IDs to match
 * @param {string[]} scope.themeIds - Theme IDs to match
 * @param {string[]} scope.keywords - Keywords to search in text
 * @param {string} scope.logic - 'AND' | 'OR' (default: 'OR')
 * @returns {boolean} Whether document matches the scope
 */
const matchDocumentToScope = (doc, scope) => {
  if (!doc || !scope) return false;
  
  const logic = scope.logic || 'OR';
  
  // Build array of match results (null = criteria not set)
  const matchResults = [];
  
  // Check person matches
  if (scope.personIds?.length > 0) {
    const match = doc.personIds?.some(id => scope.personIds.includes(id)) || false;
    matchResults.push(match);
  }
  
  // Check organization matches
  if (scope.organizationIds?.length > 0) {
    const match = doc.organizationIds?.some(id => scope.organizationIds.includes(id)) || false;
    matchResults.push(match);
  }
  
  // Check location matches
  if (scope.locationIds?.length > 0) {
    const match = doc.locationIds?.some(id => scope.locationIds.includes(id)) || false;
    matchResults.push(match);
  }
  
  // Check event matches
  if (scope.eventIds?.length > 0) {
    const match = doc.eventIds?.some(id => scope.eventIds.includes(id)) || false;
    matchResults.push(match);
  }
  
  // Check narrative matches
  if (scope.narrativeIds?.length > 0) {
    const match = doc.narrativeIds?.some(id => scope.narrativeIds.includes(id)) || false;
    matchResults.push(match);
  }
  
  // Check theme matches
  if (scope.themeIds?.length > 0) {
    const match = doc.themeIds?.some(id => scope.themeIds.includes(id)) || false;
    matchResults.push(match);
  }
  
  // Check keyword matches (text search in title, excerpt, content)
  if (scope.keywords?.length > 0) {
    const docText = [
      doc.title || '',
      doc.excerpt || '',
      ...(doc.contentBlocks || []).map(b => typeof b.content === 'string' ? b.content : ''),
      doc.transcription || ''
    ].join(' ').toLowerCase();
    
    const match = scope.keywords.some(kw => docText.includes(kw.toLowerCase()));
    matchResults.push(match);
  }
  
  // Check document type matches
  if (scope.documentTypes?.length > 0) {
    const match = scope.documentTypes.includes(doc.documentType);
    matchResults.push(match);
  }
  
  // Check publisher matches
  if (scope.publisherIds?.length > 0) {
    const match = scope.publisherIds.includes(doc.publisherId);
    matchResults.push(match);
  }
  
  // Check author matches
  if (scope.authors?.length > 0) {
    const match = doc.author && scope.authors.some(a => 
      a.toLowerCase() === doc.author.toLowerCase()
    );
    matchResults.push(match);
  }
  
  // Check metadata filter matches (from filter catalog)
  let hasExcludeOnly = false;
  if (scope.metadataFilters && typeof scope.metadataFilters === 'object') {
    const catalog = dataStore.data?.filterCatalog || [];
    for (const [dimensionId, filterVal] of Object.entries(scope.metadataFilters)) {
      if (!filterVal) continue;

      const includeVals = Array.isArray(filterVal) ? filterVal : (filterVal.include || []);
      const excludeVals = Array.isArray(filterVal) ? [] : (filterVal.exclude || []);
      if (includeVals.length === 0 && excludeVals.length === 0) continue;

      const dimension = catalog.find(d => d.id === dimensionId);
      if (!dimension) continue;

      const docMatchesValue = (val) => {
        if (dimension.type === 'mapped' && dimension.docMapping) {
          const mappedDocs = dimension.docMapping[val];
          return mappedDocs && mappedDocs.includes(doc.id);
        } else if (dimension.metadataKey) {
          const docValue = doc.metadata?.[dimension.metadataKey];
          if (Array.isArray(docValue)) return docValue.includes(val);
          if (docValue !== undefined && docValue !== null) return String(docValue) === val;
        }
        return false;
      };

      if (excludeVals.length > 0 && excludeVals.some(v => docMatchesValue(v))) {
        return false;
      }

      if (includeVals.length > 0) {
        matchResults.push(includeVals.some(v => docMatchesValue(v)));
      } else if (excludeVals.length > 0) {
        hasExcludeOnly = true;
      }
    }
  }
  
  // If only exclude filters were set and the doc survived, count as a match
  if (matchResults.length === 0 && hasExcludeOnly) return true;
  if (matchResults.length === 0) return false;
  
  // Apply logic
  if (logic === 'AND') {
    return matchResults.every(m => m === true);
  } else {
    return matchResults.some(m => m === true);
  }
};

/**
 * Get documents matching a scope definition with optional manual overrides.
 * This is the unified method for both Monitors and Workspaces.
 * 
 * @param {Object} scope - Scope definition (see matchDocumentToScope)
 * @param {Object} options - Additional options
 * @param {string[]} options.includedDocIds - Document IDs to always include (manual additions)
 * @param {string[]} options.excludedDocIds - Document IDs to always exclude (manual removals)
 * @param {Object} options.timeRange - { start: Date, end: Date } to filter by date
 * @param {string[]} options.repositoryIds - Filter to specific repositories
 * @returns {Object[]} Matching documents sorted by publishedDate (newest first)
 */
const getDocumentsForScope = (scope, options = {}) => {
  const { includedDocIds = [], excludedDocIds = [], timeRange = null, repositoryIds = [] } = options;
  
  let documents = dataStore.data?.documents || [];
  
  // Apply repository filter if specified
  if (repositoryIds.length > 0) {
    documents = documents.filter(doc => repositoryIds.includes(doc.repositoryId));
  }
  
  // Apply time range filter if specified
  if (timeRange && timeRange.start && timeRange.end) {
    documents = documents.filter(doc => {
      if (!doc.publishedDate) return false;
      const docDate = new Date(doc.publishedDate);
      return docDate >= timeRange.start && docDate <= timeRange.end;
    });
  }
  
  // Build exclusion set
  const excludeSet = new Set(excludedDocIds);
  
  // Build result set starting with manually included docs
  const resultSet = new Set(includedDocIds);
  
  // Check if we have any scope criteria
  const hasScope = scope && (
    scope.personIds?.length > 0 ||
    scope.organizationIds?.length > 0 ||
    scope.locationIds?.length > 0 ||
    scope.eventIds?.length > 0 ||
    scope.narrativeIds?.length > 0 ||
    scope.themeIds?.length > 0 ||
    scope.keywords?.length > 0 ||
    scope.documentTypes?.length > 0 ||
    scope.publisherIds?.length > 0 ||
    scope.authors?.length > 0 ||
    (scope.metadataFilters && Object.values(scope.metadataFilters).some(v => {
      if (Array.isArray(v)) return v.length > 0;
      return (v?.include?.length > 0) || (v?.exclude?.length > 0);
    }))
  );
  
  // If we have scope criteria, match documents against it
  if (hasScope) {
    documents.forEach(doc => {
      if (matchDocumentToScope(doc, scope)) {
        resultSet.add(doc.id);
      }
    });
  }
  
  // Apply exclusions
  excludedDocIds.forEach(id => resultSet.delete(id));
  
  // Resolve to full document objects
  const allDocs = dataStore.data?.documents || [];
  return [...resultSet]
    .map(docId => allDocs.find(d => d.id === docId))
    .filter(doc => doc && !excludeSet.has(doc.id))
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
};

export const DataService = {
  // ============================================
  // Time Range Filtering Utilities
  // ============================================

  /**
   * Check if a date falls within a time range
   * @param {string|Date} date - The date to check
   * @param {Object|null} timeRange - { start: Date, end: Date } or null for no filter
   * @returns {boolean}
   */
  isDateInRange: (date, timeRange) => {
    if (!timeRange || !timeRange.start || !timeRange.end) return true;
    const d = new Date(date);
    return d >= timeRange.start && d <= timeRange.end;
  },

  /**
   * Check if a narrative has activity within a time range
   * @param {Object} narrative - Narrative object with volumeOverTime
   * @param {Object|null} timeRange - { start: Date, end: Date } or null
   * @returns {boolean}
   */
  narrativeHasActivityInRange: (narrative, timeRange) => {
    if (!timeRange) return true;
    // Check documents linked to this narrative
    const volumeOverTime = DataService.getVolumeOverTimeForNarrative(narrative.id);
    if (!volumeOverTime || !volumeOverTime.length) {
      // Check createdAt as fallback
      return DataService.isDateInRange(narrative.createdAt, timeRange);
    }
    return volumeOverTime.some(entry => DataService.isDateInRange(entry.date, timeRange));
  },

  // ============================================
  // Unified Document Scope Methods
  // ============================================

  /**
   * Check if a document matches a scope definition
   * @param {Object} doc - Document to check
   * @param {Object} scope - Scope definition (see getDocumentsForScope)
   * @returns {boolean} Whether document matches the scope
   */
  documentMatchesScope: (doc, scope) => {
    return matchDocumentToScope(doc, scope);
  },

  // ============================================
  // Direct Getters
  // ============================================

  // Missions
  getMissions: () => dataStore.data?.missions ?? [],
  getMission: (id) => findById('missions', id),

  // Narratives - supports mission, time range, and document scope filtering
  getNarratives: (missionId = null, timeRange = null, scopeDocIds = null) => {
    const narratives = dataStore.data?.narratives;
    if (!Array.isArray(narratives)) return [];
    let filtered = narratives;
    
    // Filter by mission
    if (missionId && missionId !== 'all') {
      filtered = filtered.filter(n => n && n.missionId === missionId);
    }
    
    // Filter by time range
    if (timeRange) {
      filtered = filtered.filter(n => n && DataService.narrativeHasActivityInRange(n, timeRange));
    }
    
    // Filter by document scope
    if (scopeDocIds) {
      filtered = filterByDocumentScope(filtered, 'documentIds', scopeDocIds);
    }
    
    return filtered;
  },
  getNarrative: (id) => findById('narratives', id),
  getNarrativeById(id) { return this.getNarrative(id); },  // Alias for getNarrative
  
  // Get narratives by status (with optional time range)
  getNarrativesByStatus: (status, timeRange = null) => {
    let narratives = (dataStore.data?.narratives ?? []).filter(n => (n.status || 'new') === status);
    if (timeRange) {
      narratives = narratives.filter(n => DataService.narrativeHasActivityInRange(n, timeRange));
    }
    return narratives;
  },
  
  // Get status counts (with optional time range)
  getNarrativeStatusCounts: (timeRange = null) => {
    const counts = { new: 0, in_progress: 0, under_investigation: 0, resolved: 0 };
    let narratives = dataStore.data?.narratives ?? [];
    
    if (timeRange) {
      narratives = narratives.filter(n => DataService.narrativeHasActivityInRange(n, timeRange));
    }
    
    narratives.forEach(n => {
      const status = n.status || 'new';
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  },

  // Themes - supports document scope filtering
  getThemes: (scopeDocIds = null) => {
    let themes = dataStore.data?.themes ?? [];
    if (scopeDocIds) {
      themes = filterByDocumentScope(themes, 'documentIds', scopeDocIds);
    }
    return themes;
  },
  getTheme: (id) => findById('themes', id),
  getThemeById(id) { return this.getTheme(id); },  // Alias for getTheme

  // Locations - supports document scope filtering
  getLocations: (scopeDocIds = null) => {
    let locations = dataStore.data?.locations ?? [];
    if (scopeDocIds) {
      locations = filterByDocumentScope(locations, 'documentIds', scopeDocIds);
    }
    return locations;
  },
  getLocation: (id) => findById('locations', id),
  getLocationById(id) { return this.getLocation(id); },  // Alias for getLocation

  // Events - supports document scope filtering
  getEvents: (scopeDocIds = null) => {
    let events = dataStore.data?.events ?? [];
    if (scopeDocIds) {
      events = filterByDocumentScope(events, 'documentIds', scopeDocIds);
    }
    return events;
  },
  getEvent: (id) => findById('events', id),
  getEventById(id) { return this.getEvent(id); },  // Alias for getEvent

  // Persons - supports document scope filtering
  getPersons: (scopeDocIds = null) => {
    let persons = dataStore.data?.persons ?? [];
    if (scopeDocIds) {
      persons = filterByDocumentScope(persons, 'documentIds', scopeDocIds);
    }
    return persons;
  },
  getPerson: (id) => findById('persons', id),
  getPersonById(id) { return this.getPerson(id); },  // Alias for getPerson

  // Organizations - supports document scope filtering
  getOrganizations: (scopeDocIds = null) => {
    let orgs = dataStore.data?.organizations ?? [];
    if (scopeDocIds) {
      orgs = filterByDocumentScope(orgs, 'documentIds', scopeDocIds);
    }
    return orgs;
  },
  getOrganization: (id) => findById('organizations', id),
  getOrganizationById(id) { return this.getOrganization(id); },  // Alias for getOrganization

  // Documents - supports document scope filtering
  getDocuments: (scopeDocIds = null) => {
    let docs = dataStore.data?.documents ?? [];
    if (scopeDocIds) {
      docs = filterDocumentsByScope(docs, scopeDocIds);
    }
    return docs;
  },
  getDocument: (id) => findById('documents', id),
  getDocumentById(id) { return this.getDocument(id); },  // Alias for getDocument

  // Monitors
  getMonitors: () => dataStore.data?.monitors ?? [],
  getMonitor: (id) => findById('monitors', id),
  getActiveMonitors: () => (dataStore.data?.monitors ?? []).filter(m => m.enabled),
  
  // Alerts
  getAlerts: () => dataStore.data?.alerts ?? [],
  getAlert: (id) => findById('alerts', id),
  getAlertsForMonitor: (monitorId) => (dataStore.data?.alerts ?? []).filter(a => a.monitorId === monitorId),

  // Search Filters
  getSearchFilters: () => dataStore.data?.searchFilters ?? [],
  getSearchFilter: (id) => findById('searchFilters', id),

  // Filter Catalog
  getFilterCatalog: () => dataStore.data?.filterCatalog ?? [],

  /**
   * Get filter catalog scoped to a set of document IDs.
   * Only returns dimensions/options that appear in the given documents.
   * @param {string[]|null} docIds - Document IDs to scope to (null = all)
   * @returns {Object[]} Filtered catalog dimensions
   */
  getFilterCatalogForDocuments: (docIds) => {
    const catalog = dataStore.data?.filterCatalog ?? [];
    if (!docIds || docIds.length === 0) return catalog;

    const docIdSet = new Set(docIds);
    const docs = docIds.map(id => findById('documents', id)).filter(Boolean);

    return catalog.map(dim => {
      let relevantOptions;

      if (dim.docMapping) {
        relevantOptions = (dim.options || []).filter(opt =>
          (dim.docMapping[opt] || []).some(id => docIdSet.has(id))
        );
      } else if (dim.metadataKey) {
        const valuesInDocs = new Set();
        for (const doc of docs) {
          const val = doc.metadata?.[dim.metadataKey];
          if (Array.isArray(val)) val.forEach(v => valuesInDocs.add(v));
          else if (val != null) valuesInDocs.add(val);
        }
        relevantOptions = (dim.options || []).filter(opt => valuesInDocs.has(opt));
      } else {
        relevantOptions = dim.options || [];
      }

      if (relevantOptions.length === 0) return null;
      return { ...dim, options: relevantOptions };
    }).filter(Boolean);
  },

  // Topics - supports document scope filtering
  getTopics: (scopeDocIds = null) => {
    let topics = dataStore.data?.topics ?? [];
    if (scopeDocIds) {
      topics = filterByDocumentScope(topics, 'documentIds', scopeDocIds);
    }
    return topics;
  },
  getTopic: (id) => findById('topics', id),
  getTopicById(id) { return this.getTopic(id); },  // Alias for getTopic
  
  // Get topics filtered by time range and optionally by tags
  getTopicsInRange: (timeRange = null, tagFilter = null) => {
    let topics = dataStore.data?.topics ?? [];
    
    // Apply tag filter if provided
    if (tagFilter && tagFilter.length > 0) {
      topics = topics.filter(topic => 
        topic.tagIds && tagFilter.some(tagId => topic.tagIds.includes(tagId))
      );
    }
    
    if (!timeRange) return topics;
    
    return topics.filter(topic => {
      const startDate = new Date(topic.startDate);
      const endDate = topic.endDate ? new Date(topic.endDate) : new Date();
      // Topic overlaps with range if topic starts before range ends AND topic ends after range starts
      return startDate <= timeRange.end && endDate >= timeRange.start;
    });
  },

  // Publishers
  getPublishers: () => {
    return dataStore.data?.publishers ?? [];
  },
  
  getPublisher: (id) => {
    return findById('publishers', id);
  },
  
  // Repositories
  getRepositories: () => {
    return dataStore.data?.repositories ?? [];
  },
  
  getRepository: (id) => {
    return findById('repositories', id);
  },

  // ============================================
  // Narrative Relationships
  // ============================================

  getThemesForNarrative: (narrativeId) =>
    (dataStore.data?.themes ?? []).filter(s => s.parentNarrativeId === narrativeId),

  getPersonsForNarrative: (narrativeId) => 
    resolveRelatedEntities('narratives', narrativeId, 'personIds', 'persons'),

  getOrganizationsForNarrative: (narrativeId) => 
    resolveRelatedEntities('narratives', narrativeId, 'organizationIds', 'organizations'),

  getLocationsForNarrative: (narrativeId) => 
    resolveRelatedEntities('narratives', narrativeId, 'locationIds', 'locations'),

  getEventsForNarrative: (narrativeId) => 
    resolveRelatedEntities('narratives', narrativeId, 'eventIds', 'events'),

  // ============================================
  // Theme Relationships (same as Narrative)
  // ============================================

  getParentNarrative: (themeId) => {
    const sub = findById('themes', themeId);
    if (!sub) return null;
    return findById('narratives', sub.parentNarrativeId);
  },

  // ============================================
  // Location Relationships
  // ============================================

  getNarrativesForLocation: (locationId) => 
    findEntitiesReferencing('narratives', 'locationIds', locationId),

  getEventsForLocation: (locationId) => 
    findEntitiesReferencing('events', 'locationId', locationId, false),

  getPersonsForLocation: (locationId) => 
    findEntitiesReferencing('persons', 'relatedLocationIds', locationId),

  getOrganizationsForLocation: (locationId) => 
    findEntitiesReferencing('organizations', 'relatedLocationIds', locationId),

  // ============================================
  // Event Relationships
  // ============================================

  getSubEventsForEvent: (eventId) => 
    resolveRelatedEntities('events', eventId, 'subEventIds', 'events'),

  getParentEvent: (eventId) => {
    const event = findById('events', eventId);
    if (!event || !event.parentEventId) return null;
    return findById('events', event.parentEventId);
  },

  getLocationForEvent: (eventId) => {
    const event = findById('events', eventId);
    if (!event || !event.locationId) return null;
    return findById('locations', event.locationId);
  },

  getPersonsForEvent: (eventId) => 
    resolveRelatedEntities('events', eventId, 'personIds', 'persons'),

  getOrganizationsForEvent: (eventId) => 
    resolveRelatedEntities('events', eventId, 'organizationIds', 'organizations'),

  getNarrativesForEvent: (eventId) => 
    findEntitiesReferencing('narratives', 'eventIds', eventId),

  // ============================================
  // Person Relationships
  // ============================================

  getNarrativesForPerson: (personId) => 
    findEntitiesReferencing('narratives', 'personIds', personId),

  /**
   * Get related persons by finding other people who appear in the same narratives.
   * Two people are related if they are mentioned together in at least one narrative.
   */
  getRelatedPersons: (personId) => {
    const narratives = dataStore.data.narratives.filter(n =>
      (n.personIds || []).includes(personId)
    );
    
    // Collect all other person IDs from these narratives
    const relatedIds = new Set();
    narratives.forEach(n => {
      (n.personIds || []).forEach(pId => {
        if (pId !== personId) relatedIds.add(pId);
      });
    });
    
    return [...relatedIds]
      .map(pid => dataStore.data.persons.find(p => p.id === pid))
      .filter(Boolean);
  },

  /**
   * Get related organizations by finding orgs that appear in the same narratives as this person.
   */
  getRelatedOrganizationsForPerson: (personId) => {
    const narratives = dataStore.data.narratives.filter(n =>
      (n.personIds || []).includes(personId)
    );
    
    // Collect all organization IDs from these narratives
    const relatedIds = new Set();
    narratives.forEach(n => {
      (n.organizationIds || []).forEach(oId => relatedIds.add(oId));
    });
    
    return [...relatedIds]
      .map(oid => dataStore.data.organizations.find(o => o.id === oid))
      .filter(Boolean);
  },

  getLocationsForPerson: (personId) => 
    resolveRelatedEntities('persons', personId, 'relatedLocationIds', 'locations'),

  getEventsForPerson: (personId) => 
    resolveRelatedEntities('persons', personId, 'relatedEventIds', 'events'),

  // ============================================
  // Organization Relationships
  // ============================================

  getNarrativesForOrganization: (orgId) => 
    findEntitiesReferencing('narratives', 'organizationIds', orgId),

  getThemesForOrganization: (orgId) => 
    findEntitiesReferencing('themes', 'organizationIds', orgId),

  /**
   * Get related persons by finding people who appear in the same narratives as this org.
   */
  getRelatedPersonsForOrganization: (orgId) => {
    const narratives = dataStore.data.narratives.filter(n =>
      (n.organizationIds || []).includes(orgId)
    );
    
    // Collect all person IDs from these narratives
    const relatedIds = new Set();
    narratives.forEach(n => {
      (n.personIds || []).forEach(pId => relatedIds.add(pId));
    });
    
    return [...relatedIds]
      .map(pid => dataStore.data.persons.find(p => p.id === pid))
      .filter(Boolean);
  },

  /**
   * Get related organizations by finding other orgs that appear in the same narratives.
   */
  getRelatedOrganizations: (orgId) => {
    const narratives = dataStore.data.narratives.filter(n =>
      (n.organizationIds || []).includes(orgId)
    );
    
    // Collect all other organization IDs from these narratives
    const relatedIds = new Set();
    narratives.forEach(n => {
      (n.organizationIds || []).forEach(oId => {
        if (oId !== orgId) relatedIds.add(oId);
      });
    });
    
    return [...relatedIds]
      .map(oid => dataStore.data.organizations.find(o => o.id === oid))
      .filter(Boolean);
  },

  getLocationsForOrganization: (orgId) => 
    resolveRelatedEntities('organizations', orgId, 'relatedLocationIds', 'locations'),

  // ============================================
  // Topic Relationships
  // ============================================

  /**
   * Get documents for a topic (optionally scoped)
   * @param {string} topicId - Topic ID
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   */
  getDocumentsForTopic: (topicId, scopeDocIds = null) => {
    const topic = findById('topics', topicId);
    if (!topic) return [];
    const docIds = intersectDocumentIds(topic.documentIds, scopeDocIds);
    return docIds
      .map(did => (dataStore.data?.documents ?? []).find(d => d.id === did))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get topic volume over time filtered by time range
   */
  getTopicVolumeOverTime: (topicId, timeRange = null) => {
    const topic = findById('topics', topicId);
    if (!topic || !topic.volumeOverTime) return [];
    
    if (!timeRange) return topic.volumeOverTime;
    
    return topic.volumeOverTime.filter(entry => 
      DataService.isDateInRange(entry.date, timeRange)
    );
  },

  // ============================================
  // Document Relationships
  // ============================================

  /**
   * Get documents for a narrative (optionally scoped)
   * @param {string} narrativeId - Narrative ID
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   */
  getDocumentsForNarrative: (narrativeId, scopeDocIds = null) => {
    const narrative = dataStore.data.narratives.find(n => n.id === narrativeId);
    if (!narrative) return [];
    const docIds = intersectDocumentIds(narrative.documentIds, scopeDocIds);
    return docIds
      .map(did => (dataStore.data?.documents ?? []).find(d => d.id === did))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for a theme (optionally scoped)
   * @param {string} themeId - Theme ID
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   */
  getDocumentsForTheme: (themeId, scopeDocIds = null) => {
    const theme = dataStore.data.themes.find(s => s.id === themeId);
    if (!theme) return [];
    const docIds = intersectDocumentIds(theme.documentIds, scopeDocIds);
    return docIds
      .map(did => (dataStore.data?.documents ?? []).find(d => d.id === did))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for a person (optionally scoped)
   * @param {string} personId - Person ID
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   */
  getDocumentsForPerson: (personId, scopeDocIds = null) => {
    const person = dataStore.data.persons.find(p => p.id === personId);
    if (!person) return [];
    const docIds = intersectDocumentIds(person.documentIds, scopeDocIds);
    return docIds
      .map(did => (dataStore.data?.documents ?? []).find(d => d.id === did))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for an organization (optionally scoped)
   * @param {string} orgId - Organization ID
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   */
  getDocumentsForOrganization: (orgId, scopeDocIds = null) => {
    const org = dataStore.data.organizations.find(o => o.id === orgId);
    if (!org) return [];
    const docIds = intersectDocumentIds(org.documentIds, scopeDocIds);
    return docIds
      .map(did => (dataStore.data?.documents ?? []).find(d => d.id === did))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for an event (optionally scoped)
   * Prefers event.documentIds if available, falls back to reverse lookup
   * @param {string} eventId - Event ID
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   */
  getDocumentsForEvent: (eventId, scopeDocIds = null) => {
    const documents = dataStore.data?.documents ?? [];
    const events = dataStore.data.events || [];
    const event = events.find(e => e.id === eventId);
    
    let docIds;
    // Use documentIds if available
    if (event && event.documentIds && event.documentIds.length > 0) {
      docIds = intersectDocumentIds(event.documentIds, scopeDocIds);
    } else {
      // Fallback to reverse lookup
      const scopeSet = scopeDocIds ? new Set(scopeDocIds) : null;
      return documents
        .filter(d => {
          if (scopeSet && !scopeSet.has(d.id)) return false;
          return (d.eventIds || []).includes(eventId);
        })
        .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    }
    
    return docIds
      .map(docId => documents.find(d => d.id === docId))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for a location (optionally scoped)
   * Prefers location.documentIds if available, falls back to reverse lookup
   * @param {string} locationId - Location ID
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   */
  getDocumentsForLocation: (locationId, scopeDocIds = null) => {
    const documents = dataStore.data?.documents ?? [];
    const locations = dataStore.data.locations || [];
    const location = locations.find(l => l.id === locationId);
    
    let docIds;
    // Use documentIds if available
    if (location && location.documentIds && location.documentIds.length > 0) {
      docIds = intersectDocumentIds(location.documentIds, scopeDocIds);
    } else {
      // Fallback to reverse lookup
      const scopeSet = scopeDocIds ? new Set(scopeDocIds) : null;
      return documents
        .filter(d => {
          if (scopeSet && !scopeSet.has(d.id)) return false;
          return (d.locationIds || []).includes(locationId);
        })
        .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    }
    
    return docIds
      .map(docId => documents.find(d => d.id === docId))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  // Reverse lookups - get entities for a document

  /**
   * Get narratives mentioned in a document
   */
  getNarrativesForDocument: (documentId) => {
    const doc = (dataStore.data?.documents ?? []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.narrativeIds || [])
      .map(nid => dataStore.data.narratives.find(n => n.id === nid))
      .filter(Boolean);
  },

  /**
   * Get themes mentioned in a document
   */
  getThemesForDocument: (documentId) => {
    const doc = (dataStore.data?.documents ?? []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.themeIds || [])
      .map(sid => dataStore.data.themes.find(s => s.id === sid))
      .filter(Boolean);
  },

  /**
   * Get persons mentioned in a document
   */
  getPersonsForDocument: (documentId) => {
    const doc = (dataStore.data?.documents ?? []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.personIds || [])
      .map(pid => dataStore.data.persons.find(p => p.id === pid))
      .filter(Boolean);
  },

  /**
   * Get organizations mentioned in a document
   */
  getOrganizationsForDocument: (documentId) => {
    const doc = (dataStore.data?.documents ?? []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.organizationIds || [])
      .map(oid => dataStore.data.organizations.find(o => o.id === oid))
      .filter(Boolean);
  },

  /**
   * Get locations mentioned in a document
   */
  getLocationsForDocument: (documentId) => {
    const doc = (dataStore.data?.documents ?? []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.locationIds || [])
      .map(lid => dataStore.data.locations.find(l => l.id === lid))
      .filter(Boolean);
  },

  /**
   * Get events mentioned in a document
   */
  getEventsForDocument: (documentId) => {
    const doc = (dataStore.data?.documents ?? []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.eventIds || [])
      .map(eid => dataStore.data.events.find(e => e.id === eid))
      .filter(Boolean);
  },

  /**
   * Get the publisher for a document
   */
  getPublisherForDocument: (documentId) => {
    const doc = (dataStore.data?.documents ?? []).find(d => d.id === documentId);
    if (!doc || !doc.publisherId) return null;
    
    return DataService.getPublisher(doc.publisherId);
  },

  // ============================================
  // User Methods
  // ============================================

  /**
   * Get the current (logged-in) user
   * @returns {Object|undefined} The current user object
   */
  getCurrentUser: () => {
    return (dataStore.data.users || []).find(u => u.isCurrentUser);
  },

  // ============================================
  // Highlight Methods
  // ============================================

  /**
   * Get all highlights for a document
   * @param {string} documentId - The document ID
   * @returns {Array} Array of highlights with resolved user data
   */
  getHighlightsForDocument: (documentId) => {
    const doc = findById('documents', documentId);
    if (!doc || !doc.highlights) return [];
    
    return doc.highlights.map(highlight => ({
      ...highlight,
      user: findById('users', highlight.userId)
    }));
  },

  // ============================================
  // Comment Methods
  // ============================================

  /**
   * Get all comments for a document
   * @param {string} documentId - The document ID
   * @returns {Array} Array of comments with resolved user data and replies
   */
  getCommentsForDocument: (documentId) => {
    const doc = findById('documents', documentId);
    if (!doc || !doc.comments) return [];
    
    return doc.comments.map(comment => ({
      ...comment,
      user: findById('users', comment.userId),
      replies: (comment.replies || []).map(reply => ({
        ...reply,
        user: findById('users', reply.userId)
      }))
    }));
  },

  /**
   * Get all activity (comments and highlights) across all documents
   * @param {Object} options - Filter options
   * @param {string} options.userId - Filter by specific user (optional)
   * @returns {Array} Array of activity items sorted by createdAt (newest first)
   */
  getAllActivity: (options = {}) => {
    const { userId = null } = options;
    const documents = dataStore.data?.documents ?? [];
    const activity = [];

    documents.forEach(doc => {
      // Collect highlights
      (doc.highlights || []).forEach(highlight => {
        if (!userId || highlight.userId === userId) {
          activity.push({
            type: 'highlight',
            id: highlight.id,
            highlightedText: highlight.highlightedText,
            user: findById('users', highlight.userId),
            userId: highlight.userId,
            createdAt: highlight.createdAt,
            documentId: doc.id,
            documentTitle: doc.title,
            blockIndex: highlight.blockIndex
          });
        }
      });

      // Collect comments
      (doc.comments || []).forEach(comment => {
        if (!userId || comment.userId === userId) {
          activity.push({
            type: 'comment',
            id: comment.id,
            anchorText: comment.anchorText,
            content: comment.content,
            user: findById('users', comment.userId),
            userId: comment.userId,
            createdAt: comment.createdAt,
            documentId: doc.id,
            documentTitle: doc.title,
            blockIndex: comment.blockIndex,
            replyCount: (comment.replies || []).length
          });
        }

        // Collect replies as separate activity items
        (comment.replies || []).forEach(reply => {
          if (!userId || reply.userId === userId) {
            activity.push({
              type: 'reply',
              id: reply.id,
              content: reply.content,
              user: findById('users', reply.userId),
              userId: reply.userId,
              createdAt: reply.createdAt,
              documentId: doc.id,
              documentTitle: doc.title,
              parentCommentId: comment.id,
              parentCommentContent: comment.content
            });
          }
        });
      });
    });

    // Sort by createdAt (newest first)
    return activity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  /**
   * Get unique users who have activity (comments or highlights)
   * @returns {Array} Array of user objects who have activity
   */
  getActiveUsers: () => {
    const documents = dataStore.data?.documents ?? [];
    const userIds = new Set();

    documents.forEach(doc => {
      (doc.highlights || []).forEach(h => {
        if (h.userId) userIds.add(h.userId);
      });
      (doc.comments || []).forEach(c => {
        if (c.userId) userIds.add(c.userId);
        (c.replies || []).forEach(r => {
          if (r.userId) userIds.add(r.userId);
        });
      });
    });

    return Array.from(userIds)
      .map(id => findById('users', id))
      .filter(Boolean)
      .sort((a, b) => (a.displayName || a.name || '').localeCompare(b.displayName || b.name || ''));
  },

  // ============================================
  // Network Graph Builder
  // ============================================

  /**
   * Build network graph by deriving relationships from shared narratives.
   * Two entities are connected if they appear together in at least one narrative.
   * Each link includes the narratives that connect the entities.
   */
  buildNetworkGraph: (personIds, orgIds) => {
    const nodes = [];
    const links = [];
    
    // Validate inputs
    const safePersonIds = Array.isArray(personIds) ? personIds.filter(Boolean) : [];
    const safeOrgIds = Array.isArray(orgIds) ? orgIds.filter(Boolean) : [];
    
    const narratives = dataStore.data?.narratives || [];
    if (!Array.isArray(narratives)) {
      console.error('DataService: narratives is not an array');
      return { nodes, links };
    }

    try {
      // Build index: entityId -> Set of narrative IDs
      const entityToNarratives = new Map();
      narratives.forEach(n => {
        if (!n) return;
        (n.personIds || []).forEach(pId => {
          if (!pId) return;
          if (!entityToNarratives.has(pId)) entityToNarratives.set(pId, new Set());
          entityToNarratives.get(pId).add(n.id);
        });
        (n.organizationIds || []).forEach(oId => {
          if (!oId) return;
          if (!entityToNarratives.has(oId)) entityToNarratives.set(oId, new Set());
          entityToNarratives.get(oId).add(n.id);
        });
      });

      // Helper to find shared narratives between two entities
      const getSharedNarratives = (id1, id2) => {
        const set1 = entityToNarratives.get(id1) || new Set();
        const set2 = entityToNarratives.get(id2) || new Set();
        const sharedIds = [...set1].filter(nId => set2.has(nId));
        return sharedIds.map(nId => narratives.find(n => n && n.id === nId)).filter(Boolean);
      };

      const persons = dataStore.data?.persons || [];
      const organizations = dataStore.data?.organizations || [];

      // Add person nodes
      safePersonIds.forEach(pId => {
        const person = persons.find(p => p && p.id === pId);
        if (person) {
          nodes.push({ id: pId, label: person.name || 'Unknown', type: 'person', data: person });
        }
      });

      // Add organization nodes
      safeOrgIds.forEach(oId => {
        const org = organizations.find(o => o && o.id === oId);
        if (org) {
          nodes.push({ id: oId, label: org.name || 'Unknown', type: 'organization', data: org });
        }
      });

    const nodeIds = new Set(nodes.map(n => n.id));
    const addedLinks = new Set(); // Track links to avoid duplicates

    // Compute person-person links from shared narratives
    for (let i = 0; i < safePersonIds.length; i++) {
      for (let j = i + 1; j < safePersonIds.length; j++) {
        const p1 = safePersonIds[i];
        const p2 = safePersonIds[j];
        const sharedNarratives = getSharedNarratives(p1, p2);
        
        if (sharedNarratives.length > 0) {
          const linkKey = [p1, p2].sort().join('-');
          if (!addedLinks.has(linkKey)) {
            links.push({
              source: p1,
              target: p2,
              type: 'person-person',
              narratives: sharedNarratives,
              strength: sharedNarratives.length
            });
            addedLinks.add(linkKey);
          }
        }
      }
    }

    // Compute org-org links from shared narratives
    for (let i = 0; i < safeOrgIds.length; i++) {
      for (let j = i + 1; j < safeOrgIds.length; j++) {
        const o1 = safeOrgIds[i];
        const o2 = safeOrgIds[j];
        const sharedNarratives = getSharedNarratives(o1, o2);
        
        if (sharedNarratives.length > 0) {
          const linkKey = [o1, o2].sort().join('-');
          if (!addedLinks.has(linkKey)) {
            links.push({
              source: o1,
              target: o2,
              type: 'org-org',
              narratives: sharedNarratives,
              strength: sharedNarratives.length
            });
            addedLinks.add(linkKey);
          }
        }
      }
    }

    // Compute person-org links from shared narratives
    safePersonIds.forEach(pId => {
      safeOrgIds.forEach(oId => {
        const sharedNarratives = getSharedNarratives(pId, oId);
        
        if (sharedNarratives.length > 0) {
          const linkKey = [pId, oId].sort().join('-');
          if (!addedLinks.has(linkKey)) {
            links.push({
              source: pId,
              target: oId,
              type: 'person-org',
              narratives: sharedNarratives,
              strength: sharedNarratives.length
            });
            addedLinks.add(linkKey);
          }
        }
      });
    });

    return { nodes, links };
    } catch (e) {
      console.error('DataService: Error building network graph:', e);
      return { nodes: [], links: [] };
    }
  },

  // Aggregate volume over time across multiple narratives (with time range, status, and scope support)
  // Uses document-based aggregation
  getAggregateVolumeOverTime: (missionId = null, timeRange = null, statusFilter = null, scopeDocIds = null) => {
    let narratives = DataService.getNarratives(missionId, null, scopeDocIds);
    
    // Apply status filter if provided (statusFilter is an array of statuses)
    if (statusFilter && statusFilter.length > 0) {
      narratives = narratives.filter(n => statusFilter.includes(n.status || 'new'));
    }
    
    const publishers = DataService.getPublishers();
    const dateMap = new Map();

    narratives.forEach(n => {
      // Get volume from documents linked to this narrative (scoped)
      const volumeData = DataService.getVolumeOverTimeForNarrative(n.id, timeRange, scopeDocIds);
      volumeData.forEach(entry => {
        if (!dateMap.has(entry.date)) {
          dateMap.set(entry.date, {});
        }
        const dayData = dateMap.get(entry.date);
        Object.entries(entry.publisherVolumes || {}).forEach(([pId, vol]) => {
          dayData[pId] = (dayData[pId] || 0) + vol;
        });
      });
    });

    const dates = [...dateMap.keys()].sort();
    const series = publishers.map(p =>
      dates.map(date => (dateMap.get(date) || {})[p.id] || 0)
    );

    return { dates, series, publishers };
  },

  /**
   * Get narrative duration data for the Duration View.
   * Returns narratives with their start/end dates and total volume, sorted by start date.
   * @param {string} missionId - Optional mission ID filter
   * @param {Object} timeRange - Optional { start, end } date range
   * @param {Array} statusFilter - Optional array of narrative statuses
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   * @returns {Array} [{ id, text, startDate, endDate, totalVolume, sentiment, color }, ...]
   */
  getNarrativeDurations: (missionId = null, timeRange = null, statusFilter = null, scopeDocIds = null) => {
    let narratives = DataService.getNarratives(missionId, timeRange, scopeDocIds);
    
    // Apply status filter if provided
    if (statusFilter && statusFilter.length > 0) {
      narratives = narratives.filter(n => statusFilter.includes(n.status || 'new'));
    }
    
    const durations = narratives.map(n => {
      // Get volume over time for this narrative (scoped)
      const volumeData = DataService.getVolumeOverTimeForNarrative(n.id, timeRange, scopeDocIds);
      
      if (volumeData.length === 0) {
        return null; // No activity data
      }
      
      // Sort by date to find start and end
      const sortedDates = volumeData
        .map(v => v.date)
        .sort((a, b) => new Date(a) - new Date(b));
      
      const startDate = sortedDates[0];
      const endDate = sortedDates[sortedDates.length - 1];
      
      // Calculate total volume across all publishers
      let totalVolume = 0;
      volumeData.forEach(v => {
        Object.values(v.publisherVolumes || {}).forEach(vol => {
          totalVolume += vol;
        });
      });
      
      return {
        id: n.id,
        text: n.text,
        startDate,
        endDate,
        totalVolume,
        sentiment: n.sentiment || 0,
        color: 'var(--accent-primary)'
      };
    }).filter(Boolean);
    
    // Sort by start date (earliest first)
    durations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    
    return durations;
  },

  // ============================================
  // Document-Based Aggregation Methods
  // ============================================
  // These methods compute volume and sentiment from documents (source of truth)
  // rather than from pre-computed values on narratives.

  /**
   * Get volume over time for a narrative from its linked documents.
   * Groups documents by publishedDate and counts per publisher.
   * @param {string} narrativeId - The narrative ID
   * @param {Object} timeRange - Optional { start, end } date range
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   * @returns {Array} [{ date, publisherVolumes }, ...]
   */
  getVolumeOverTimeForNarrative: (narrativeId, timeRange = null, scopeDocIds = null) => {
    const narrative = dataStore.data.narratives.find(n => n.id === narrativeId);
    if (!narrative || !narrative.documentIds) return [];
    
    const docIds = intersectDocumentIds(narrative.documentIds, scopeDocIds);
    let documents = docIds
      .map(id => dataStore.data.documents.find(d => d.id === id))
      .filter(Boolean);
    
    // Apply time range filter if provided
    if (timeRange) {
      documents = documents.filter(doc => 
        doc.publishedDate && DataService.isDateInRange(doc.publishedDate, timeRange)
      );
    }
    
    const dateMap = new Map();
    
    documents.forEach(doc => {
      if (!doc.publishedDate) return;
      // Use full ISO timestamp to preserve time precision
      // This allows the chart to show individual document times when zoomed in
      const timestamp = doc.publishedDate;
      
      if (!dateMap.has(timestamp)) {
        dateMap.set(timestamp, { publisherVolumes: {} });
      }
      const timeData = dateMap.get(timestamp);
      
      // Count toward publisher
      if (doc.publisherId) {
        timeData.publisherVolumes[doc.publisherId] = (timeData.publisherVolumes[doc.publisherId] || 0) + 1;
      }
    });
    
    // Convert to sorted array
    const timestamps = [...dateMap.keys()].sort();
    return timestamps.map(timestamp => ({
      date: timestamp,
      publisherVolumes: dateMap.get(timestamp).publisherVolumes
    }));
  },

  /**
   * Get aggregate publisher volumes for a narrative from its linked documents.
   * @param {string} narrativeId - The narrative ID
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   * @returns {Object} { publisherId: { volume, sentiment }, ... }
   */
  getAggregatePublisherVolumesForNarrative: (narrativeId, scopeDocIds = null) => {
    const narrative = dataStore.data.narratives.find(n => n.id === narrativeId);
    if (!narrative || !narrative.documentIds) return {};
    
    const docIds = intersectDocumentIds(narrative.documentIds, scopeDocIds);
    const documents = docIds
      .map(id => dataStore.data.documents.find(d => d.id === id))
      .filter(Boolean);
    
    const publisherStats = new Map();
    
    documents.forEach(doc => {
      if (!doc.publisherId) return;
      
      if (!publisherStats.has(doc.publisherId)) {
        publisherStats.set(doc.publisherId, { count: 0, sentimentSum: 0, sentimentCount: 0 });
      }
      const stats = publisherStats.get(doc.publisherId);
      stats.count += 1;
      
      // Use document-level sentiment if available
      if (typeof doc.sentiment === 'number') {
        stats.sentimentSum += doc.sentiment;
        stats.sentimentCount += 1;
      }
    });
    
    const result = {};
    publisherStats.forEach((stats, publisherId) => {
      result[publisherId] = {
        volume: stats.count,
        sentiment: stats.sentimentCount > 0 ? stats.sentimentSum / stats.sentimentCount : 0
      };
    });
    
    return result;
  },

  /**
   * UNIFIED: Get volume data for a set of documents.
   * This is the preferred method for getting volume data - works directly from documents.
   * Returns publisher breakdown in the format TimelineVolumeComposite expects.
   * 
   * @param {string[]|null} documentIds - Array of document IDs to aggregate. If null, uses all documents.
   * @param {Object} options - Optional settings
   * @param {Object} options.timeRange - Optional { start, end } date range filter
   * @returns {Object} { 
   *   byPublisher: { dates, series, publishers } | null 
   * }
   */
  getVolumeDataForDocuments: (documentIds = null, options = {}) => {
    const { timeRange } = options;
    
    // Get documents - either scoped or all
    let documents;
    if (documentIds && documentIds.length > 0) {
      documents = documentIds
        .map(id => dataStore.data.documents?.find(d => d.id === id))
        .filter(Boolean);
    } else {
      documents = dataStore.data.documents || [];
    }
    
    // Apply time range filter if provided
    if (timeRange) {
      documents = documents.filter(doc => 
        doc.publishedDate && DataService.isDateInRange(doc.publishedDate, timeRange)
      );
    }
    
    if (documents.length === 0) {
      return { byPublisher: null };
    }
    
    // Aggregate by publisher
    const publisherDateMap = new Map();
    const publisherIds = new Set();
    
    documents.forEach(doc => {
      if (!doc.publishedDate) return;
      const date = doc.publishedDate.split('T')[0];
      
      // Publisher aggregation
      if (doc.publisherId) {
        publisherIds.add(doc.publisherId);
        if (!publisherDateMap.has(date)) {
          publisherDateMap.set(date, {});
        }
        const publisherDayData = publisherDateMap.get(date);
        publisherDayData[doc.publisherId] = (publisherDayData[doc.publisherId] || 0) + 1;
      }
    });
    
    // Build publisher result
    let byPublisher = null;
    if (publisherIds.size > 0) {
      const publisherDates = [...publisherDateMap.keys()].sort();
      const publishers = [...publisherIds]
        .map(id => (dataStore.data.publishers || []).find(p => p.id === id))
        .filter(Boolean);
      const publisherSeries = publishers.map(p =>
        publisherDates.map(date => (publisherDateMap.get(date) || {})[p.id] || 0)
      );
      byPublisher = { dates: publisherDates, series: publisherSeries, publishers };
    }
    
    return { byPublisher };
  },

  /**
   * Get volume over time for a theme from its linked documents.
   * @param {string} themeId - The theme ID
   * @param {Object} timeRange - Optional { start, end } date range
   * @param {string[]|null} scopeDocIds - Optional document ID scope
   * @returns {Array} [{ date, publisherVolumes }, ...]
   */
  getVolumeOverTimeForTheme: (themeId, timeRange = null, scopeDocIds = null) => {
    const theme = dataStore.data.themes.find(t => t.id === themeId);
    if (!theme || !theme.documentIds) return [];
    
    const docIds = intersectDocumentIds(theme.documentIds, scopeDocIds);
    let documents = docIds
      .map(id => dataStore.data.documents.find(d => d.id === id))
      .filter(Boolean);
    
    if (timeRange) {
      documents = documents.filter(doc => 
        doc.publishedDate && DataService.isDateInRange(doc.publishedDate, timeRange)
      );
    }
    
    const dateMap = new Map();
    
    documents.forEach(doc => {
      if (!doc.publishedDate) return;
      const date = doc.publishedDate.split('T')[0];
      
      if (!dateMap.has(date)) {
        dateMap.set(date, { publisherVolumes: {} });
      }
      const dayData = dateMap.get(date);
      
      if (doc.publisherId) {
        dayData.publisherVolumes[doc.publisherId] = (dayData.publisherVolumes[doc.publisherId] || 0) + 1;
      }
    });
    
    const dates = [...dateMap.keys()].sort();
    return dates.map(date => ({
      date,
      publisherVolumes: dateMap.get(date).publisherVolumes
    }));
  },

  // ============================================
  // End of Document-Based Aggregation Methods
  // ============================================

  // Get all locations with related narratives and events (with time range and status support)
  getAllLocationsWithCounts: (timeRange = null, statusFilter = null) => {
    let narratives = timeRange 
      ? dataStore.data.narratives.filter(n => DataService.narrativeHasActivityInRange(n, timeRange))
      : dataStore.data.narratives;
    
    // Apply status filter if provided (statusFilter is an array of statuses)
    if (statusFilter && statusFilter.length > 0) {
      narratives = narratives.filter(n => statusFilter.includes(n.status || 'new'));
    }
    
    let events = timeRange
      ? dataStore.data.events.filter(e => DataService.isDateInRange(e.date, timeRange))
      : dataStore.data.events;
    
    // If status filter is active, only include events linked to filtered narratives
    if (statusFilter) {
      events = events.filter(e => {
        return narratives.some(n => (n.eventIds || []).includes(e.id));
      });
    }

    return dataStore.data.locations.map(loc => {
      const relatedNarratives = narratives.filter(n =>
        (n.locationIds || []).includes(loc.id)
      );
      const relatedEvents = events.filter(e =>
        e.locationId === loc.id
      );
      return {
        ...loc,
        narrativeCount: relatedNarratives.length,
        eventCount: relatedEvents.length,
        narratives: relatedNarratives,
        events: relatedEvents
      };
    });
  },

  // ============================================
  // Publisher Relationships
  // ============================================

  getPublishersForNarrative: (narrativeId) => {
    // Use document-based aggregation
    const publisherVolumes = DataService.getAggregatePublisherVolumesForNarrative(narrativeId);
    if (!publisherVolumes || Object.keys(publisherVolumes).length === 0) return [];
    
    const publishers = dataStore.data?.publishers ?? [];
    return Object.entries(publisherVolumes).map(([publisherId, data]) => {
      const publisher = publishers.find(p => p.id === publisherId);
      return publisher ? { publisher, ...data } : null;
    }).filter(Boolean);
  },

  getPublisherVolumeOverTime: (narrativeId) => {
    // Use document-based aggregation
    const volumeOverTime = DataService.getVolumeOverTimeForNarrative(narrativeId);
    if (!volumeOverTime || volumeOverTime.length === 0) return { dates: [], series: [], publishers: [] };
    
    const publishers = dataStore.data?.publishers ?? [];
    const allPublisherIds = new Set();
    
    // Collect all publisher IDs present in the time series
    volumeOverTime.forEach(entry => {
      Object.keys(entry.publisherVolumes || {}).forEach(id => allPublisherIds.add(id));
    });
    
    const publisherIds = [...allPublisherIds];
    const relevantPublishers = publisherIds.map(id => publishers.find(p => p.id === id)).filter(Boolean);
    
    const dates = volumeOverTime.map(e => e.date);
    const series = relevantPublishers.map(publisher => 
      volumeOverTime.map(entry => (entry.publisherVolumes || {})[publisher.id] || 0)
    );
    
    return { dates, series, publishers: relevantPublishers };
  },

  // Aggregate publisher volumes across multiple narratives (with time range and scope support)
  // Uses document-based aggregation
  getAggregatePublisherVolumes: (missionId = null, timeRange = null, scopeDocIds = null) => {
    const narratives = DataService.getNarratives(missionId, timeRange, scopeDocIds);
    const publishers = dataStore.data?.publishers ?? [];
    const publisherTotals = {};
    
    narratives.forEach(n => {
      // Get volume from documents linked to this narrative (scoped)
      const volumeOverTime = DataService.getVolumeOverTimeForNarrative(n.id, timeRange, scopeDocIds);
      volumeOverTime.forEach(entry => {
        Object.entries(entry.publisherVolumes || {}).forEach(([publisherId, vol]) => {
          if (!publisherTotals[publisherId]) {
            publisherTotals[publisherId] = { volume: 0, sentimentCounts: { positive: 0, neutral: 0, negative: 0 } };
          }
          publisherTotals[publisherId].volume += vol;
        });
      });
    });
    
    return Object.entries(publisherTotals).map(([publisherId, totals]) => {
      const publisher = publishers.find(p => p.id === publisherId);
      return publisher ? { publisher, ...totals } : null;
    }).filter(Boolean).sort((a, b) => b.volume - a.volume);
  },

  // ============================================
  // Monitor Relationships
  // ============================================

  /**
   * Get narratives that match a monitor's scope criteria.
   * Supports AND/OR logic for matching:
   * - OR mode (default): A narrative matches if it references ANY entity in the monitor's scope
   * - AND mode: A narrative matches if it references ALL entities in the monitor's scope
   * 
   * For keyword matching, narratives are derived from documents that match the keywords.
   * This allows monitors with only keywords to display narratives and derived entities.
   */
  getNarrativesForMonitor: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return [];
    
    const scope = monitor.scope || {};
    const logic = scope.logic || 'OR';
    const narratives = dataStore.data.narratives || [];
    
    // If keywords exist, get narrative IDs from keyword-matched documents
    // This allows monitors with only keywords to derive narratives from documents
    let keywordNarrativeIds = new Set();
    if (scope.keywords?.length > 0) {
      const matchedDocs = DataService.getDocumentsForMonitor(monitorId);
      matchedDocs.forEach(doc => {
        (doc.narrativeIds || []).forEach(nId => keywordNarrativeIds.add(nId));
      });
    }
    
    // Helper to check if narrative matches a specific entity type
    const matchesPersons = (narrative, personIds) => {
      if (!personIds || personIds.length === 0) return null; // No criteria
      return personIds.some(pId => (narrative.personIds || []).includes(pId));
    };
    
    const matchesOrganizations = (narrative, orgIds) => {
      if (!orgIds || orgIds.length === 0) return null;
      return orgIds.some(oId => (narrative.organizationIds || []).includes(oId));
    };
    
    const matchesLocations = (narrative, locationIds) => {
      if (!locationIds || locationIds.length === 0) return null;
      return locationIds.some(lId => (narrative.locationIds || []).includes(lId));
    };
    
    const matchesEvents = (narrative, eventIds) => {
      if (!eventIds || eventIds.length === 0) return null;
      return eventIds.some(eId => (narrative.eventIds || []).includes(eId));
    };
    
    const matchesNarrativeIds = (narrative, narrativeIds) => {
      if (!narrativeIds || narrativeIds.length === 0) return null;
      return narrativeIds.includes(narrative.id);
    };
    
    const matchesThemes = (narrative, themeIds) => {
      if (!themeIds || themeIds.length === 0) return null;
      // Check if any of the narrative's themes are in the theme scope
      return themeIds.some(tId => (narrative.themeIds || []).includes(tId));
    };
    
    const matchesKeywords = (narrative, keywords) => {
      if (!keywords || keywords.length === 0) return null;
      // Check if narrative is linked to documents that matched the keyword scope
      return keywordNarrativeIds.has(narrative.id);
    };
    
    return narratives.filter(narrative => {
      // Get match results for each criteria (null means no criteria set)
      const matches = [
        matchesNarrativeIds(narrative, scope.narrativeIds),
        matchesPersons(narrative, scope.personIds),
        matchesOrganizations(narrative, scope.organizationIds),
        matchesLocations(narrative, scope.locationIds),
        matchesEvents(narrative, scope.eventIds),
        matchesThemes(narrative, scope.themeIds),
        matchesKeywords(narrative, scope.keywords)
      ];
      
      // Filter out null values (criteria not set)
      const activeMatches = matches.filter(m => m !== null);
      
      // If no criteria set, return no matches
      if (activeMatches.length === 0) return false;
      
      if (logic === 'AND') {
        // AND mode: narrative must match ALL active criteria
        return activeMatches.every(m => m === true);
      } else {
        // OR mode (default): narrative must match ANY active criteria
        return activeMatches.some(m => m === true);
      }
    });
  },

  /**
   * Get themes (sub-narratives) that match a monitor's scope criteria.
   */
  getThemesForMonitor: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor || monitor.options?.includeThemes === false) return [];
    
    // Get matched narratives first
    const matchedNarratives = DataService.getNarrativesForMonitor(monitorId);
    const matchedNarrativeIds = new Set(matchedNarratives.map(n => n.id));
    
    // Get themes that belong to matched narratives
    return (dataStore.data.themes || []).filter(sub => 
      matchedNarrativeIds.has(sub.parentNarrativeId)
    );
  },

  /**
   * Get events that match a monitor's scope criteria.
   * Supports AND/OR logic for matching:
   * - OR mode (default): An event matches if it references ANY entity in the monitor's scope
   * - AND mode: An event matches if it references ALL non-empty scope criteria
   */
  getEventsForMonitor: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return [];
    
    const scope = monitor.scope || {};
    const logic = scope.logic || 'OR';
    const events = dataStore.data.events || [];
    const includeRelated = monitor.options?.includeRelatedEvents !== false;
    
    // Get events linked to matched narratives (if scope includes narrativeIds)
    const matchedNarratives = DataService.getNarrativesForMonitor(monitorId);
    const narrativeEventIds = new Set();
    matchedNarratives.forEach(n => {
      (n.eventIds || []).forEach(eId => narrativeEventIds.add(eId));
    });
    
    // Helper to check if event matches a specific entity type
    const matchesEventIds = (event, eventIds) => {
      if (!eventIds || eventIds.length === 0) return null;
      return eventIds.includes(event.id);
    };
    
    const matchesPersons = (event, personIds) => {
      if (!personIds || personIds.length === 0) return null;
      return personIds.some(pId => (event.personIds || []).includes(pId));
    };
    
    const matchesOrganizations = (event, orgIds) => {
      if (!orgIds || orgIds.length === 0) return null;
      return orgIds.some(oId => (event.organizationIds || []).includes(oId));
    };
    
    const matchesLocations = (event, locationIds) => {
      if (!locationIds || locationIds.length === 0) return null;
      return locationIds.includes(event.locationId);
    };
    
    return events.filter(event => {
      // Direct event ID match always applies
      const directMatch = matchesEventIds(event, scope.eventIds);
      if (directMatch === true) return true;
      
      // Events linked to matched narratives are included
      if (narrativeEventIds.has(event.id)) return true;
      
      // If not including related events, only match direct event IDs
      if (!includeRelated) return false;
      
      // Get match results for related criteria
      const matches = [
        matchesPersons(event, scope.personIds),
        matchesOrganizations(event, scope.organizationIds),
        matchesLocations(event, scope.locationIds)
      ];
      
      // Filter out null values (criteria not set)
      const activeMatches = matches.filter(m => m !== null);
      
      // If no related criteria set, no match
      if (activeMatches.length === 0) return false;
      
      if (logic === 'AND') {
        // AND mode: event must match ALL active criteria
        return activeMatches.every(m => m === true);
      } else {
        // OR mode (default): event must match ANY active criteria
        return activeMatches.some(m => m === true);
      }
    });
  },

  /**
   * Get sub-events for matched events in a monitor.
   */
  getSubEventsForMonitor: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor || monitor.options?.includeSubEvents === false) return [];
    
    const matchedEvents = DataService.getEventsForMonitor(monitorId);
    const subEventIds = new Set();
    
    matchedEvents.forEach(event => {
      (event.subEventIds || []).forEach(seId => subEventIds.add(seId));
    });
    
    return (dataStore.data.events || []).filter(e => subEventIds.has(e.id));
  },

  /**
   * Get a formatted trigger description for display.
   */
  getMonitorTriggerLabels: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return [];
    
    const triggers = monitor.triggers || {};
    const labels = [];
    
    if (triggers.newNarrative) labels.push('New Narratives');
    if (triggers.newEvent) labels.push('New Events');
    if (triggers.volumeSpike) {
      labels.push(`Volume >${triggers.volumeSpike.threshold}/${triggers.volumeSpike.timeWindow}`);
    }
    if (triggers.sentimentShift) {
      const dir = triggers.sentimentShift.direction === 'any' ? '±' : 
                  triggers.sentimentShift.direction === 'negative' ? '-' : '+';
      labels.push(`Sentiment ${dir}${Math.round(triggers.sentimentShift.threshold * 100)}%`);
    }
    return labels;
  },

  /**
   * Get scope label for a monitor (primary entity being watched).
   */
  getMonitorScopeLabel: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return '';
    
    const scope = monitor.scope || {};
    
    // Return the most specific scope first
    if (scope.personIds?.length === 1) {
      const person = findById('persons', scope.personIds[0]);
      return person?.name || 'Person';
    }
    if (scope.personIds?.length > 1) {
      return `${scope.personIds.length} people`;
    }
    if (scope.organizationIds?.length === 1) {
      const org = findById('organizations', scope.organizationIds[0]);
      return org?.name || 'Organization';
    }
    if (scope.organizationIds?.length > 1) {
      return `${scope.organizationIds.length} organizations`;
    }
    if (scope.narrativeIds?.length) {
      return `${scope.narrativeIds.length} narrative${scope.narrativeIds.length > 1 ? 's' : ''}`;
    }
    if (scope.locationIds?.length) {
      return `${scope.locationIds.length} location${scope.locationIds.length > 1 ? 's' : ''}`;
    }
    
    return 'Custom scope';
  },

  /**
   * Get scope type for a monitor (for icon selection).
   * Returns the first matching scope type in priority order.
   */
  getMonitorScopeType: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return 'custom';
    
    const scope = monitor.scope || {};
    
    // Check in order of priority for display
    if (scope.narrativeIds?.length) return 'narrative';
    if (scope.themeIds?.length) return 'theme';
    if (scope.personIds?.length) return 'person';
    if (scope.organizationIds?.length) return 'organization';
    if (scope.locationIds?.length) return 'location';
    if (scope.eventIds?.length) return 'event';
    
    return 'custom';
  },

  /**
   * Get all persons referenced by narratives matching a monitor's scope.
   */
  getPersonsForMonitor: (monitorId) => {
    const narratives = DataService.getNarrativesForMonitor(monitorId);
    const personIds = new Set();
    
    narratives.forEach(n => {
      (n.personIds || []).forEach(pId => personIds.add(pId));
    });
    
    return [...personIds]
      .map(pId => findById('persons', pId))
      .filter(Boolean);
  },

  /**
   * Get all organizations referenced by narratives matching a monitor's scope.
   */
  getOrganizationsForMonitor: (monitorId) => {
    const narratives = DataService.getNarrativesForMonitor(monitorId);
    const orgIds = new Set();
    
    narratives.forEach(n => {
      (n.organizationIds || []).forEach(oId => orgIds.add(oId));
    });
    
    return [...orgIds]
      .map(oId => findById('organizations', oId))
      .filter(Boolean);
  },

  /**
   * Get all locations referenced by narratives and events matching a monitor's scope.
   */
  getLocationsForMonitor: (monitorId) => {
    const narratives = DataService.getNarrativesForMonitor(monitorId);
    const events = DataService.getEventsForMonitor(monitorId);
    const locationIds = new Set();
    
    // Collect from narratives
    narratives.forEach(n => {
      (n.locationIds || []).forEach(lId => locationIds.add(lId));
    });
    
    // Collect from events
    events.forEach(e => {
      if (e.locationId) locationIds.add(e.locationId);
    });
    
    return [...locationIds]
      .map(lId => findById('locations', lId))
      .filter(Boolean);
  },

  /**
   * Get all documents matching a monitor's scope.
   * Uses unified document scope matching (queries documents directly).
   * Supports manual includedDocIds and excludedDocIds overrides.
   */
  getDocumentsForMonitor: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return [];
    
    const scope = monitor.scope || {};
    
    // Use the unified scope method with manual overrides
    return getDocumentsForScope(scope, {
      includedDocIds: monitor.includedDocIds || [],
      excludedDocIds: monitor.excludedDocIds || []
    });
  },

  /**
   * Get aggregated volume over time for narratives matching a monitor's scope.
   * Groups by publisher for chart display. Uses document-based aggregation.
   */
  getAggregateVolumeForMonitor: (monitorId) => {
    const narratives = DataService.getNarrativesForMonitor(monitorId);
    const dateMap = new Map();
    
    // Aggregate volume from documents linked to each narrative
    narratives.forEach(n => {
      const volumeOverTime = DataService.getVolumeOverTimeForNarrative(n.id);
      volumeOverTime.forEach(entry => {
        if (!dateMap.has(entry.date)) {
          dateMap.set(entry.date, {});
        }
        const dayData = dateMap.get(entry.date);
        Object.entries(entry.publisherVolumes || {}).forEach(([pId, vol]) => {
          dayData[pId] = (dayData[pId] || 0) + vol;
        });
      });
    });
    
    const dates = [...dateMap.keys()].sort();
    
    // Get unique publisher IDs that have volume
    const activePublisherIds = new Set();
    dateMap.forEach(dayData => {
      Object.keys(dayData).forEach(pId => activePublisherIds.add(pId));
    });
    
    const allPublishers = dataStore.data?.publishers || [];
    const relevantPublishers = allPublishers.filter(p => activePublisherIds.has(p.id));
    const series = relevantPublishers.map(p =>
      dates.map(date => (dateMap.get(date) || {})[p.id] || 0)
    );
    
    return { dates, series, publishers: relevantPublishers };
  },

  /**
   * Get topics that are linked to documents from narratives matching a monitor's scope.
   */
  getTopicsForMonitor: (monitorId) => {
    const narratives = DataService.getNarrativesForMonitor(monitorId);
    const topics = dataStore.data?.topics ?? [];
    
    // Collect all document IDs from matched narratives
    const documentIds = new Set();
    narratives.forEach(n => {
      (n.documentIds || []).forEach(dId => documentIds.add(dId));
    });
    
    // Find topics that reference these documents
    return topics.filter(topic => 
      (topic.documentIds || []).some(dId => documentIds.has(dId))
    );
  },

  // ============================================
  // Workspace Methods
  // ============================================

  getWorkspaces: () => dataStore.data?.workspaces ?? [],

  getWorkspace: (id) => findById('workspaces', id),

  // ============================================
  // Project Methods
  // ============================================

  /**
   * Get all projects
   * @returns {Array} All projects
   */
  getProjects: () => dataStore.data?.projects ?? [],

  /**
   * Get a single project by ID
   * @param {string} id - Project ID
   * @returns {Object|undefined} Project object
   */
  getProject: (id) => findById('projects', id),

  /**
   * Get active (non-archived) projects
   * @returns {Array} Active projects
   */
  getActiveProjects: () => 
    (dataStore.data?.projects ?? []).filter(p => p.status !== 'archived'),

  /**
   * Get direct child projects of a parent project
   * @param {string} projectId - Parent project ID
   * @param {boolean} includeArchived - Whether to include archived projects (default: false)
   * @returns {Array} Child projects
   */
  getChildProjects: (projectId, includeArchived = false) => {
    return (dataStore.data?.projects ?? []).filter(p => 
      p.parentProjectId === projectId && (includeArchived || p.status !== 'archived')
    );
  },

  // Search across all entities
  /**
   * Search across all entities
   * @param {string} query - Search query string (optional if scope is provided)
   * @param {Object} options - Optional search options
   * @param {string[]} options.repositoryIds - Filter documents to these repositories (empty = all)
   * @param {Object} options.timeRange - Filter documents to this date range { start: Date, end: Date }
   * @param {Object} options.scope - Filter by entity scope (from search filter)
   * @param {string[]} options.scope.personIds - Filter to documents mentioning these persons
   * @param {string[]} options.scope.organizationIds - Filter to documents mentioning these organizations
   * @param {string[]} options.scope.locationIds - Filter to documents mentioning these locations
   * @param {string[]} options.scope.eventIds - Filter to documents mentioning these events
   * @param {string[]} options.scope.keywords - Additional keyword search terms
   * @returns {Object} Search results by entity type
   */
  search: (query, options = {}) => {
    const results = {
      documents: [],
      narratives: [],
      themes: [],
      topics: [],
      locations: [],
      events: [],
      persons: [],
      organizations: []
    };

    const { repositoryIds = [], timeRange = null, scope = null } = options;
    
    // Need either a query or a scope to search
    const hasQuery = query && typeof query === 'string' && query.trim().length > 0;
    const hasScope = scope && (
      (scope.personIds?.length > 0) ||
      (scope.organizationIds?.length > 0) ||
      (scope.locationIds?.length > 0) ||
      (scope.eventIds?.length > 0) ||
      (scope.keywords?.length > 0) ||
      (scope.documentTypes?.length > 0) ||
      (scope.publisherIds?.length > 0) ||
      (scope.authors?.length > 0) ||
      (scope.metadataFilters && Object.values(scope.metadataFilters).some(v => {
        if (Array.isArray(v)) return v.length > 0;
        return (v?.include?.length > 0) || (v?.exclude?.length > 0);
      }))
    );
    
    if (!hasQuery && !hasScope) {
      return results;
    }

    try {
      const lowerQuery = hasQuery ? query.toLowerCase() : '';
      
      // Search documents by title, excerpt, and content blocks
      let documents = dataStore.data?.documents || [];
      
      // Apply repository filter if specified
      if (repositoryIds.length > 0) {
        documents = documents.filter(doc => repositoryIds.includes(doc.repositoryId));
      }
      
      // Apply time range filter if specified
      if (timeRange && timeRange.start && timeRange.end) {
        documents = documents.filter(doc => {
          if (!doc.publishedDate) return false;
          const docDate = new Date(doc.publishedDate);
          return docDate >= timeRange.start && docDate <= timeRange.end;
        });
      }
      
      // Apply scope filter if specified (OR logic - match any entity)
      if (hasScope) {
        documents = documents.filter(doc => {
          if (!doc) return false;
          
          // Check person matches
          if (scope.personIds?.length > 0) {
            if (doc.personIds?.some(id => scope.personIds.includes(id))) {
              return true;
            }
          }
          
          // Check organization matches
          if (scope.organizationIds?.length > 0) {
            if (doc.organizationIds?.some(id => scope.organizationIds.includes(id))) {
              return true;
            }
          }
          
          // Check location matches
          if (scope.locationIds?.length > 0) {
            if (doc.locationIds?.some(id => scope.locationIds.includes(id))) {
              return true;
            }
          }
          
          // Check event matches
          if (scope.eventIds?.length > 0) {
            if (doc.eventIds?.some(id => scope.eventIds.includes(id))) {
              return true;
            }
          }
          
          // Check keyword matches (text search in title, excerpt, content)
          if (scope.keywords?.length > 0) {
            const docText = [
              doc.title || '',
              doc.excerpt || '',
              ...(doc.contentBlocks || []).map(b => typeof b.content === 'string' ? b.content : ''),
              doc.transcription || ''
            ].join(' ').toLowerCase();
            
            if (scope.keywords.some(kw => docText.includes(kw.toLowerCase()))) {
              return true;
            }
          }
          
          // Check document type matches
          if (scope.documentTypes?.length > 0) {
            if (scope.documentTypes.includes(doc.documentType)) {
              return true;
            }
          }
          
          // Check publisher matches
          if (scope.publisherIds?.length > 0) {
            if (scope.publisherIds.includes(doc.publisherId)) {
              return true;
            }
          }
          
          // Check author matches
          if (scope.authors?.length > 0) {
            if (doc.author && scope.authors.some(a => a.toLowerCase() === doc.author.toLowerCase())) {
              return true;
            }
          }
          
          // Check metadata filters (exclude takes priority)
          if (scope.metadataFilters && typeof scope.metadataFilters === 'object') {
            const catalog = dataStore.data?.filterCatalog || [];
            let hasInclude = false;
            let matchedInclude = false;
            for (const [dimId, filterVal] of Object.entries(scope.metadataFilters)) {
              if (!filterVal) continue;
              const includeVals = Array.isArray(filterVal) ? filterVal : (filterVal.include || []);
              const excludeVals = Array.isArray(filterVal) ? [] : (filterVal.exclude || []);
              if (includeVals.length === 0 && excludeVals.length === 0) continue;
              const dimension = catalog.find(d => d.id === dimId);
              if (!dimension) continue;
              const docMatchesVal = (val) => {
                if (dimension.type === 'mapped' && dimension.docMapping) {
                  return dimension.docMapping[val]?.includes(doc.id);
                } else if (dimension.metadataKey) {
                  const dv = doc.metadata?.[dimension.metadataKey];
                  if (Array.isArray(dv)) return dv.includes(val);
                  if (dv !== undefined && dv !== null) return String(dv) === val;
                }
                return false;
              };
              if (excludeVals.length > 0 && excludeVals.some(v => docMatchesVal(v))) return false;
              if (includeVals.length > 0) {
                hasInclude = true;
                if (includeVals.some(v => docMatchesVal(v))) matchedInclude = true;
              }
            }
            if (hasInclude && matchedInclude) return true;
            if (!hasInclude) return true;
          }
          
          return false;
        });
      }
      
      // Apply text query filter if specified
      if (hasQuery) {
        results.documents = documents.filter(doc => {
          if (!doc) return false;
          const titleMatch = doc.title && doc.title.toLowerCase().includes(lowerQuery);
          const excerptMatch = doc.excerpt && doc.excerpt.toLowerCase().includes(lowerQuery);
          const contentMatch = Array.isArray(doc.contentBlocks) && doc.contentBlocks.some(
            block => block.content && typeof block.content === 'string' && block.content.toLowerCase().includes(lowerQuery)
          );
          const transcriptMatch = doc.transcription && doc.transcription.toLowerCase().includes(lowerQuery);
          return titleMatch || excerptMatch || contentMatch || transcriptMatch;
        }).sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
      } else {
        // No text query, just return scope-filtered documents
        results.documents = documents.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
      }
      
      // Only search other entity types if there's a text query
      if (hasQuery) {
        results.narratives = (dataStore.data?.narratives || []).filter(n =>
          n && n.text && n.text.toLowerCase().includes(lowerQuery)
        );
        results.themes = (dataStore.data?.themes || []).filter(s =>
          s && s.text && s.text.toLowerCase().includes(lowerQuery)
        );
        results.topics = (dataStore.data?.topics || []).filter(t =>
          t && ((t.headline && t.headline.toLowerCase().includes(lowerQuery)) ||
          (Array.isArray(t.bulletPoints) && t.bulletPoints.some(bp => bp && bp.toLowerCase().includes(lowerQuery))))
        );
        results.locations = (dataStore.data?.locations || []).filter(l =>
          l && l.name && l.name.toLowerCase().includes(lowerQuery)
        );
        results.events = (dataStore.data?.events || []).filter(e =>
          e && e.text && e.text.toLowerCase().includes(lowerQuery)
        );
        results.persons = (dataStore.data?.persons || []).filter(p =>
          p && p.name && p.name.toLowerCase().includes(lowerQuery)
        );
        results.organizations = (dataStore.data?.organizations || []).filter(o =>
          o && o.name && o.name.toLowerCase().includes(lowerQuery)
        );
      }
    } catch (e) {
      console.error('DataService: Error during search:', e);
    }

    return results;
  },

  // ============================================
  // TagGroup Methods
  // ============================================

  /**
   * Get all tag groups
   * @returns {Array} All tag groups sorted by sortOrder
   */
  getTagGroups: () => {
    const groups = dataStore.data?.tagGroups || [];
    return [...groups].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  },

  /**
   * Get a single tag group by ID
   * @param {string} groupId - TagGroup ID
   * @returns {Object|undefined} TagGroup object
   */
  getTagGroup: (groupId) => {
    return (dataStore.data?.tagGroups || []).find(g => g.id === groupId);
  },

  /**
   * Get all tags in a specific group
   * @param {string} groupId - TagGroup ID
   * @returns {Array} Tags in the group sorted by sortOrder
   */
  getTagsInGroup: (groupId) => {
    const tags = (dataStore.data?.tags || []).filter(t => t.groupId === groupId);
    return tags.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  },

  /**
   * Get all ungrouped tags (tags without a groupId)
   * @returns {Array} Ungrouped tags sorted by sortOrder
   */
  getUngroupedTags: () => {
    const tags = (dataStore.data?.tags || []).filter(t => !t.groupId);
    return tags.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  },

  /**
   * Get tags organized by group for UI display
   * @returns {Object} { groups: [{group, tags}], ungrouped: [tags] }
   */
  getTagsByGroup: () => {
    const groups = DataService.getTagGroups();
    const result = {
      groups: groups.map(group => ({
        group,
        tags: DataService.getTagsInGroup(group.id)
      })),
      ungrouped: DataService.getUngroupedTags()
    };
    return result;
  },

  /**
   * Get the "Mission" tag group (for backward compatibility with missionId)
   * @returns {Object|undefined} The Mission tag group
   */
  getMissionTagGroup: () => {
    return (dataStore.data?.tagGroups || []).find(g => g.name === 'Mission');
  },

  // ============================================
  // Tag Methods
  // ============================================

  /**
   * Get all tags
   * @returns {Array} All tags
   */
  getTags: () => {
    return dataStore.data?.tags || [];
  },

  /**
   * Get a single tag by ID
   * @param {string} tagId - Tag ID
   * @returns {Object|undefined} Tag object
   */
  getTag: (tagId) => {
    return (dataStore.data?.tags || []).find(t => t.id === tagId);
  },

  /**
   * Get tags for a specific entity
   * @param {string} entityType - Entity type ('narrative', 'person', etc.)
   * @param {string} entityId - Entity ID
   * @returns {Array} Tag objects for the entity
   */
  getTagsForEntity: (entityType, entityId) => {
    const collectionMap = {
      narrative: 'narratives',
      theme: 'themes',
      location: 'locations',
      event: 'events',
      person: 'persons',
      organization: 'organizations',
      document: 'documents',
      topic: 'topics',
      monitor: 'monitors',
      workspace: 'workspaces',
      project: 'projects'
    };
    
    const collection = collectionMap[entityType];
    if (!collection) return [];
    
    const entity = dataStore.findEntity(collection, entityId);
    if (!entity || !entity.tagIds) return [];
    
    const allTags = dataStore.data?.tags || [];
    return entity.tagIds.map(tagId => allTags.find(t => t.id === tagId)).filter(Boolean);
  },

  /**
   * Get count breakdown by entity type for a specific tag
   * @param {string} tagId - Tag ID
   * @returns {Object} Object with counts per entity type
   */
  getTagCountsByEntityType: (tagId) => {
    const counts = {
      narratives: 0,
      themes: 0,
      locations: 0,
      events: 0,
      persons: 0,
      organizations: 0,
      documents: 0,
      topics: 0,
      monitors: 0,
      workspaces: 0
    };
    
    Object.keys(counts).forEach(collection => {
      const items = dataStore.data?.[collection] || [];
      counts[collection] = items.filter(item => 
        item && item.tagIds && item.tagIds.includes(tagId)
      ).length;
    });
    
    return counts;
  },

  /**
   * Create a new tag
   * @param {Object} tag - Tag data { name, color?, description? }
   * @returns {string|null} Created tag ID or null
   */
  createTag: (tag) => {
    return dataStore.createTag(tag);
  },

  /**
   * Add a tag to an entity
   * @param {string} entityType - Entity type ('narrative', 'person', etc.)
   * @param {string} entityId - Entity ID
   * @param {string} tagId - Tag ID
   * @returns {boolean} Whether operation succeeded
   */
  addTagToEntity: (entityType, entityId, tagId) => {
    const collectionMap = {
      narrative: 'narratives',
      theme: 'themes',
      location: 'locations',
      event: 'events',
      person: 'persons',
      organization: 'organizations',
      document: 'documents',
      topic: 'topics',
      monitor: 'monitors',
      workspace: 'workspaces',
      project: 'projects'
    };
    
    const collection = collectionMap[entityType];
    if (!collection) return false;
    
    return dataStore.addTagToEntity(collection, entityId, tagId);
  },

  /**
   * Remove a tag from an entity
   * @param {string} entityType - Entity type
   * @param {string} entityId - Entity ID
   * @param {string} tagId - Tag ID
   * @returns {boolean} Whether operation succeeded
   */
  removeTagFromEntity: (entityType, entityId, tagId) => {
    const collectionMap = {
      narrative: 'narratives',
      theme: 'themes',
      location: 'locations',
      event: 'events',
      person: 'persons',
      organization: 'organizations',
      document: 'documents',
      topic: 'topics',
      monitor: 'monitors',
      workspace: 'workspaces',
      project: 'projects'
    };
    
    const collection = collectionMap[entityType];
    if (!collection) return false;
    
    return dataStore.removeTagFromEntity(collection, entityId, tagId);
  },

  /**
   * Set all tags for an entity (replaces existing tags)
   * @param {string} entityType - Entity type
   * @param {string} entityId - Entity ID
   * @param {Array} tagIds - Array of tag IDs
   * @returns {boolean} Whether operation succeeded
   */
  setEntityTags: (entityType, entityId, tagIds) => {
    const collectionMap = {
      narrative: 'narratives',
      theme: 'themes',
      location: 'locations',
      event: 'events',
      person: 'persons',
      organization: 'organizations',
      document: 'documents',
      topic: 'topics',
      monitor: 'monitors',
      workspace: 'workspaces',
      project: 'projects'
    };
    
    const collection = collectionMap[entityType];
    if (!collection) return false;
    
    return dataStore.updateEntity(collection, entityId, { tagIds: tagIds || [] });
  },

  // ============================================
  // Quote and Activity Aggregation Methods
  // ============================================

  /**
   * Get all quotes by a person, optionally filtered to specific documents
   * @param {string} personId - Person ID
   * @param {Array} documentIds - Optional array of document IDs to filter by
   * @returns {Array} Quotes with document metadata
   */
  getQuotesForPerson: (personId, documentIds = null) => {
    let documents = dataStore.data?.documents || [];
    
    // Filter to specific documents if provided
    if (documentIds && documentIds.length > 0) {
      documents = documents.filter(doc => documentIds.includes(doc.id));
    }
    
    return documents
      .flatMap(doc => (doc.quotes || [])
        .filter(q => q.speakerType === 'person' && q.speakerId === personId)
        .map(q => ({
          ...q,
          documentId: doc.id,
          documentTitle: doc.title,
          publishedDate: doc.publishedDate
        }))
      )
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get all quotes by an organization, optionally filtered to specific documents
   * @param {string} orgId - Organization ID
   * @param {Array} documentIds - Optional array of document IDs to filter by
   * @returns {Array} Quotes with document metadata
   */
  getQuotesForOrganization: (orgId, documentIds = null) => {
    let documents = dataStore.data?.documents || [];
    
    // Filter to specific documents if provided
    if (documentIds && documentIds.length > 0) {
      documents = documents.filter(doc => documentIds.includes(doc.id));
    }
    
    return documents
      .flatMap(doc => (doc.quotes || [])
        .filter(q => q.speakerType === 'organization' && q.speakerId === orgId)
        .map(q => ({
          ...q,
          documentId: doc.id,
          documentTitle: doc.title,
          publishedDate: doc.publishedDate
        }))
      )
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get all activities involving a person (as actor or target), optionally filtered to specific documents
   * @param {string} personId - Person ID
   * @param {Array} documentIds - Optional array of document IDs to filter by
   * @returns {Array} Activities with document metadata and role indicator
   */
  getActivitiesForPerson: (personId, documentIds = null) => {
    let documents = dataStore.data?.documents || [];
    
    // Filter to specific documents if provided
    if (documentIds && documentIds.length > 0) {
      documents = documents.filter(doc => documentIds.includes(doc.id));
    }
    
    return documents
      .flatMap(doc => (doc.activities || [])
        .filter(a => 
          (a.actorType === 'person' && a.actorId === personId) ||
          (a.targetType === 'person' && a.targetId === personId)
        )
        .map(a => ({
          ...a,
          documentId: doc.id,
          documentTitle: doc.title,
          publishedDate: doc.publishedDate,
          role: a.actorId === personId ? 'actor' : 'target'
        }))
      )
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get all activities involving an organization (as actor or target), optionally filtered to specific documents
   * @param {string} orgId - Organization ID
   * @param {Array} documentIds - Optional array of document IDs to filter by
   * @returns {Array} Activities with document metadata and role indicator
   */
  getActivitiesForOrganization: (orgId, documentIds = null) => {
    let documents = dataStore.data?.documents || [];
    
    // Filter to specific documents if provided
    if (documentIds && documentIds.length > 0) {
      documents = documents.filter(doc => documentIds.includes(doc.id));
    }
    
    return documents
      .flatMap(doc => (doc.activities || [])
        .filter(a => 
          (a.actorType === 'organization' && a.actorId === orgId) ||
          (a.targetType === 'organization' && a.targetId === orgId)
        )
        .map(a => ({
          ...a,
          documentId: doc.id,
          documentTitle: doc.title,
          publishedDate: doc.publishedDate,
          role: a.actorId === orgId ? 'actor' : 'target'
        }))
      )
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get all quotes from documents in a specific scope
   * @param {Array} documentIds - Array of document IDs to search
   * @returns {Array} All quotes from those documents
   */
  getQuotesForDocuments: (documentIds) => {
    const documents = (dataStore.data?.documents || []).filter(doc => documentIds.includes(doc.id));
    
    return documents
      .flatMap(doc => (doc.quotes || []).map(q => ({
        ...q,
        documentId: doc.id,
        documentTitle: doc.title,
        publishedDate: doc.publishedDate
      })))
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get all activities from documents in a specific scope
   * @param {Array} documentIds - Array of document IDs to search
   * @returns {Array} All activities from those documents
   */
  getActivitiesForDocuments: (documentIds) => {
    const documents = (dataStore.data?.documents || []).filter(doc => documentIds.includes(doc.id));
    
    return documents
      .flatMap(doc => (doc.activities || []).map(a => ({
        ...a,
        documentId: doc.id,
        documentTitle: doc.title,
        publishedDate: doc.publishedDate
      })))
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  }
};

export default DataService;
