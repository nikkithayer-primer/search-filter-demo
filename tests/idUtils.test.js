import { describe, it, expect } from 'vitest';
import {
  ID_PREFIXES,
  CONTEXT_PREFIXES,
  VIEWABLE_ENTITY_TYPES,
  getEntityTypeFromId,
  isContextId,
  buildIdRoute
} from '../js/utils/idUtils.js';

describe('idUtils', () => {
  describe('ID_PREFIXES', () => {
    it('contains all expected entity prefixes', () => {
      expect(ID_PREFIXES['monitor-']).toBe('monitor');
      expect(ID_PREFIXES['workspace-']).toBe('workspace');
      expect(ID_PREFIXES['project-']).toBe('project');
      expect(ID_PREFIXES['person-']).toBe('person');
      expect(ID_PREFIXES['org-']).toBe('organization');
      expect(ID_PREFIXES['narr-']).toBe('narrative');
      expect(ID_PREFIXES['doc-']).toBe('document');
      expect(ID_PREFIXES['loc-']).toBe('location');
      expect(ID_PREFIXES['event-']).toBe('event');
      expect(ID_PREFIXES['tag-']).toBe('tag');
    });
  });

  describe('CONTEXT_PREFIXES', () => {
    it('contains monitor, workspace, and project prefixes', () => {
      expect(CONTEXT_PREFIXES).toContain('monitor-');
      expect(CONTEXT_PREFIXES).toContain('workspace-');
      expect(CONTEXT_PREFIXES).toContain('project-');
      expect(CONTEXT_PREFIXES).toHaveLength(3);
    });
  });

  describe('getEntityTypeFromId', () => {
    it('returns correct type for valid IDs', () => {
      expect(getEntityTypeFromId('person-001')).toBe('person');
      expect(getEntityTypeFromId('org-005')).toBe('organization');
      expect(getEntityTypeFromId('monitor-001')).toBe('monitor');
      expect(getEntityTypeFromId('narr-003')).toBe('narrative');
      expect(getEntityTypeFromId('doc-123')).toBe('document');
      expect(getEntityTypeFromId('sub-001')).toBe('theme');
      expect(getEntityTypeFromId('tag-001')).toBe('tag');
    });

    it('returns null for invalid IDs', () => {
      expect(getEntityTypeFromId('invalid-001')).toBe(null);
      expect(getEntityTypeFromId('unknown')).toBe(null);
      expect(getEntityTypeFromId('123')).toBe(null);
    });

    it('handles null and undefined', () => {
      expect(getEntityTypeFromId(null)).toBe(null);
      expect(getEntityTypeFromId(undefined)).toBe(null);
      expect(getEntityTypeFromId('')).toBe(null);
    });

    it('handles non-string values', () => {
      expect(getEntityTypeFromId(123)).toBe(null);
      expect(getEntityTypeFromId({})).toBe(null);
      expect(getEntityTypeFromId([])).toBe(null);
    });
  });

  describe('isContextId', () => {
    it('returns true for context IDs', () => {
      expect(isContextId('monitor-001')).toBe(true);
      expect(isContextId('workspace-002')).toBe(true);
      expect(isContextId('project-003')).toBe(true);
    });

    it('returns false for non-context IDs', () => {
      expect(isContextId('person-001')).toBe(false);
      expect(isContextId('org-002')).toBe(false);
      expect(isContextId('narr-003')).toBe(false);
      expect(isContextId('doc-004')).toBe(false);
    });

    it('handles invalid input', () => {
      expect(isContextId(null)).toBe(false);
      expect(isContextId(undefined)).toBe(false);
      expect(isContextId('')).toBe(false);
      expect(isContextId(123)).toBe(false);
    });
  });

  describe('buildIdRoute', () => {
    it('builds route with context and entity', () => {
      expect(buildIdRoute('monitor-001', 'person-003')).toBe('#/monitor-001/person-003/');
      expect(buildIdRoute('workspace-001', 'narr-002')).toBe('#/workspace-001/narr-002/');
    });

    it('builds route with multiple entities', () => {
      expect(buildIdRoute('monitor-001', 'narr-002', 'person-003')).toBe('#/monitor-001/narr-002/person-003/');
    });

    it('builds route without context', () => {
      expect(buildIdRoute(null, 'person-003')).toBe('#/person-003/');
      expect(buildIdRoute(null, 'narr-001', 'person-002')).toBe('#/narr-001/person-002/');
    });

    it('returns default home (monitors) for empty routes', () => {
      expect(buildIdRoute(null)).toBe('#/monitors');
      expect(buildIdRoute(null, null)).toBe('#/monitors');
      expect(buildIdRoute(null, '')).toBe('#/monitors');
    });

    it('filters out falsy entity IDs', () => {
      expect(buildIdRoute('monitor-001', null, 'person-003', '')).toBe('#/monitor-001/person-003/');
    });
  });

});
