import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Test suite for Router parseNestedRoute functionality
 * Tests context-scoped routing pattern: #/{context}[/{contextId}][/{entityType}[/{entityId}][/documents]]
 */

// Mock the Router's parseNestedRoute method standalone for testing
const CONTEXT_TYPES = ['workspace', 'monitor', 'dashboard'];

const ENTITY_TYPES = {
  'narrative': { listType: 'narratives' },
  'theme': { listType: 'narratives' },
  'faction': { listType: 'factions' },
  'location': { listType: 'locations' },
  'event': { listType: 'events' },
  'person': { listType: 'entities' },
  'organization': { listType: 'entities' },
  'document': { listType: 'documents' },
  'topic': { listType: 'topics' },
  'tag': { listType: 'tags' },
  'narratives': { listType: 'narratives' },
  'factions': { listType: 'factions' },
  'locations': { listType: 'locations' },
  'events': { listType: 'events' },
  'entities': { listType: 'entities' },
  'documents': { listType: 'documents' },
  'topics': { listType: 'topics' },
  'tags': { listType: 'tags' }
};

function _parseEntitySegments(segments, result) {
  if (segments.length === 0) return;
  
  const entityType = segments[0];
  result.entityType = entityType;
  result.isListView = entityType.endsWith('s') && entityType !== 'status';
  
  if (segments.length >= 2 && segments[1] !== 'documents') {
    result.entityId = segments[1];
    result.isListView = false;
  }
  
  // Check for /documents sub-route
  const lastSegment = segments[segments.length - 1];
  if (lastSegment === 'documents' && segments.length > 1) {
    result.subRoute = 'documents';
  }
}

function parseNestedRoute(hash) {
  const segments = hash.split('/').filter(s => s);
  
  const result = {
    context: null,
    contextId: null,
    entityType: null,
    entityId: null,
    subRoute: null,
    isListView: false,
    isContextHome: false,
    isLegacyRoute: false,
    topLevelRoute: null
  };

  if (segments.length === 0) {
    return result;
  }

  const firstSegment = segments[0];

  // Check for top-level non-context routes
  const topLevelRoutes = ['workspaces', 'monitors', 'search', 'projects', 'activity', 'settings'];
  if (topLevelRoutes.includes(firstSegment)) {
    result.topLevelRoute = firstSegment;
    return result;
  }

  // Check if first segment is a context
  if (CONTEXT_TYPES.includes(firstSegment)) {
    result.context = firstSegment;
    
    if (firstSegment === 'dashboard') {
      if (segments.length === 1) {
        result.isContextHome = true;
      } else {
        _parseEntitySegments(segments.slice(1), result);
      }
    } else {
      if (segments.length >= 2) {
        result.contextId = segments[1];
        
        if (segments.length === 2) {
          result.isContextHome = true;
        } else {
          _parseEntitySegments(segments.slice(2), result);
        }
      }
    }
  } else if (ENTITY_TYPES[firstSegment]) {
    // Legacy global entity route
    result.isLegacyRoute = true;
    result.context = 'dashboard';
    _parseEntitySegments(segments, result);
  } else {
    result.topLevelRoute = firstSegment;
  }

  return result;
}

describe('Router.parseNestedRoute', () => {
  describe('Top-level routes', () => {
    it('parses workspaces list route', () => {
      const result = parseNestedRoute('workspaces');
      expect(result.topLevelRoute).toBe('workspaces');
      expect(result.context).toBe(null);
    });

    it('parses monitors list route', () => {
      const result = parseNestedRoute('monitors');
      expect(result.topLevelRoute).toBe('monitors');
    });

    it('parses search route', () => {
      const result = parseNestedRoute('search');
      expect(result.topLevelRoute).toBe('search');
    });
  });

  describe('Dashboard context routes', () => {
    it('parses dashboard home', () => {
      const result = parseNestedRoute('dashboard');
      expect(result.context).toBe('dashboard');
      expect(result.isContextHome).toBe(true);
      expect(result.entityType).toBe(null);
    });

    it('parses dashboard with entity list', () => {
      const result = parseNestedRoute('dashboard/narratives');
      expect(result.context).toBe('dashboard');
      expect(result.isContextHome).toBe(false);
      expect(result.entityType).toBe('narratives');
      expect(result.isListView).toBe(true);
    });

    it('parses dashboard with entity detail', () => {
      const result = parseNestedRoute('dashboard/narrative/narr-123');
      expect(result.context).toBe('dashboard');
      expect(result.entityType).toBe('narrative');
      expect(result.entityId).toBe('narr-123');
      expect(result.isListView).toBe(false);
    });

    it('parses dashboard with entity documents tab', () => {
      const result = parseNestedRoute('dashboard/narrative/narr-123/documents');
      expect(result.context).toBe('dashboard');
      expect(result.entityType).toBe('narrative');
      expect(result.entityId).toBe('narr-123');
      expect(result.subRoute).toBe('documents');
    });
  });

  describe('Workspace context routes', () => {
    it('parses workspace home', () => {
      const result = parseNestedRoute('workspace/ws-001');
      expect(result.context).toBe('workspace');
      expect(result.contextId).toBe('ws-001');
      expect(result.isContextHome).toBe(true);
    });

    it('parses workspace with entity list', () => {
      const result = parseNestedRoute('workspace/ws-001/factions');
      expect(result.context).toBe('workspace');
      expect(result.contextId).toBe('ws-001');
      expect(result.entityType).toBe('factions');
      expect(result.isListView).toBe(true);
    });

    it('parses workspace with entity detail', () => {
      const result = parseNestedRoute('workspace/ws-001/faction/faction-123');
      expect(result.context).toBe('workspace');
      expect(result.contextId).toBe('ws-001');
      expect(result.entityType).toBe('faction');
      expect(result.entityId).toBe('faction-123');
      expect(result.isListView).toBe(false);
    });

    it('parses workspace entity documents tab', () => {
      const result = parseNestedRoute('workspace/ws-001/faction/faction-123/documents');
      expect(result.context).toBe('workspace');
      expect(result.contextId).toBe('ws-001');
      expect(result.entityType).toBe('faction');
      expect(result.entityId).toBe('faction-123');
      expect(result.subRoute).toBe('documents');
    });
  });

  describe('Monitor context routes', () => {
    it('parses monitor home', () => {
      const result = parseNestedRoute('monitor/mon-001');
      expect(result.context).toBe('monitor');
      expect(result.contextId).toBe('mon-001');
      expect(result.isContextHome).toBe(true);
    });

    it('parses monitor with entity detail', () => {
      const result = parseNestedRoute('monitor/mon-001/person/person-456');
      expect(result.context).toBe('monitor');
      expect(result.contextId).toBe('mon-001');
      expect(result.entityType).toBe('person');
      expect(result.entityId).toBe('person-456');
    });
  });

  describe('Legacy global routes', () => {
    it('marks global entity route as legacy', () => {
      const result = parseNestedRoute('faction/faction-123');
      expect(result.isLegacyRoute).toBe(true);
      expect(result.context).toBe('dashboard');
      expect(result.entityType).toBe('faction');
      expect(result.entityId).toBe('faction-123');
    });

    it('marks global list route as legacy', () => {
      const result = parseNestedRoute('narratives');
      expect(result.isLegacyRoute).toBe(true);
      expect(result.entityType).toBe('narratives');
      expect(result.isListView).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('handles empty hash', () => {
      const result = parseNestedRoute('');
      expect(result.context).toBe(null);
      expect(result.topLevelRoute).toBe(null);
    });

    it('handles unknown routes', () => {
      const result = parseNestedRoute('unknown-route');
      expect(result.topLevelRoute).toBe('unknown-route');
    });
  });
});
