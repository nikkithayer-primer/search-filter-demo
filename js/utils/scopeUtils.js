/**
 * scopeUtils.js
 * Shared utility functions for working with search scope objects.
 * A scope defines the active filter state: entity IDs, keywords, document types,
 * publisher/author arrays, and metadata dimension filters.
 */

export const DOC_TYPE_LABELS = {
  'news_article': 'News Article',
  'social_post': 'Social Post',
  'internal_report': 'Internal Report',
  'intelligence_report': 'Intelligence Report',
  'memo': 'Memo',
  'transcript': 'Transcript',
  'internal': 'Internal',
  'corporate_record': 'Corporate Record',
  'watchlist_match': 'Watchlist Match',
  'political_finance': 'Political Finance',
  'event_attendance': 'Event Attendance'
};

/**
 * Check whether any filter item is active in a scope.
 * @param {Object|null} scope
 * @returns {boolean}
 */
export function hasAnyScope(scope) {
  if (!scope) return false;
  return (scope.personIds?.length > 0) ||
    (scope.organizationIds?.length > 0) ||
    (scope.locationIds?.length > 0) ||
    (scope.keywords?.length > 0) ||
    (scope.documentTypes?.length > 0) ||
    (scope.publisherIds?.length > 0) ||
    (scope.authors?.length > 0) ||
    (scope.metadataFilters && Object.values(scope.metadataFilters).some(v => {
      if (v?.dateRange?.start && v?.dateRange?.end) return true;
      if (Array.isArray(v)) return v.length > 0;
      return (v?.include?.length > 0) || (v?.exclude?.length > 0);
    }));
}

/**
 * Count the total number of individual filter items in a scope.
 * @param {Object|null} scope
 * @returns {number}
 */
export function getScopeItemCount(scope) {
  if (!scope) return 0;
  let count = (scope.personIds?.length || 0) +
    (scope.organizationIds?.length || 0) +
    (scope.locationIds?.length || 0) +
    (scope.keywords?.length || 0) +
    (scope.documentTypes?.length || 0) +
    (scope.publisherIds?.length || 0) +
    (scope.authors?.length || 0);
  count += countMetadataSelections(scope.metadataFilters);
  return count;
}

/**
 * Count total metadata filter selections (include + exclude + dateRange entries).
 * @param {Object|null} filters
 * @returns {number}
 */
export function countMetadataSelections(filters) {
  let count = 0;
  for (const v of Object.values(filters || {})) {
    if (v?.dateRange?.start && v?.dateRange?.end) { count += 1; continue; }
    if (Array.isArray(v)) { count += v.length; continue; }
    count += (v?.include?.length || 0) + (v?.exclude?.length || 0);
  }
  return count;
}

/**
 * Remove a single item from a scope object (mutates in place).
 * @param {Object} scope - The scope to mutate
 * @param {string} type - Chip type: 'person', 'organization', 'location', 'keyword',
 *                        'documentType', 'publisher', 'author', 'metadata'
 * @param {string} id - Item ID. For metadata, encoded as "dimId::value".
 */
/**
 * Merge items from a source scope into a target scope (mutates target).
 * Avoids duplicates for all array fields.
 * @param {Object} target - Scope to merge into
 * @param {Object} source - Scope to merge from
 */
export function mergeScopeFrom(target, source) {
  if (!source) return;
  ['personIds', 'organizationIds', 'locationIds', 'keywords', 'documentTypes', 'publisherIds', 'authors'].forEach(key => {
    const items = source[key] || [];
    if (!target[key]) target[key] = [];
    items.forEach(item => {
      if (!target[key].includes(item)) target[key].push(item);
    });
  });

  const srcMeta = source.metadataFilters || {};
  if (!target.metadataFilters) target.metadataFilters = {};
  for (const [dimId, val] of Object.entries(srcMeta)) {
    if (val?.dateRange) {
      target.metadataFilters[dimId] = { dateRange: { ...val.dateRange } };
      continue;
    }
    const srcInclude = Array.isArray(val) ? val : (val?.include || []);
    const srcExclude = Array.isArray(val) ? [] : (val?.exclude || []);
    if (!target.metadataFilters[dimId]) {
      target.metadataFilters[dimId] = { include: [], exclude: [] };
    }
    const tgt = target.metadataFilters[dimId];
    if (Array.isArray(tgt)) {
      target.metadataFilters[dimId] = { include: [...tgt], exclude: [] };
    }
    const tgtEntry = target.metadataFilters[dimId];
    if (!tgtEntry.include) tgtEntry.include = [];
    if (!tgtEntry.exclude) tgtEntry.exclude = [];
    srcInclude.forEach(v => { if (!tgtEntry.include.includes(v)) tgtEntry.include.push(v); });
    srcExclude.forEach(v => { if (!tgtEntry.exclude.includes(v)) tgtEntry.exclude.push(v); });
  }
}

export function removeFromScope(scope, type, id) {
  if (!scope) return;
  switch (type) {
    case 'person':
      scope.personIds = (scope.personIds || []).filter(i => i !== id); break;
    case 'organization':
      scope.organizationIds = (scope.organizationIds || []).filter(i => i !== id); break;
    case 'location':
      scope.locationIds = (scope.locationIds || []).filter(i => i !== id); break;
    case 'keyword':
      scope.keywords = (scope.keywords || []).filter(k => k !== id); break;
    case 'documentType':
      scope.documentTypes = (scope.documentTypes || []).filter(dt => dt !== id); break;
    case 'publisher':
      scope.publisherIds = (scope.publisherIds || []).filter(p => p !== id); break;
    case 'author':
      scope.authors = (scope.authors || []).filter(a => a !== id); break;
    case 'metadata': {
      const sep = id.indexOf('::');
      if (sep > 0) {
        const dimId = id.substring(0, sep);
        const val = id.substring(sep + 2);
        const entry = scope.metadataFilters?.[dimId];
        if (entry) {
          if (Array.isArray(entry)) {
            scope.metadataFilters[dimId] = entry.filter(v => v !== val);
            if (scope.metadataFilters[dimId].length === 0) delete scope.metadataFilters[dimId];
          } else {
            entry.include = (entry.include || []).filter(v => v !== val);
            entry.exclude = (entry.exclude || []).filter(v => v !== val);
            if (entry.include.length === 0 && entry.exclude.length === 0) delete scope.metadataFilters[dimId];
          }
        }
      }
      break;
    }
  }
}
