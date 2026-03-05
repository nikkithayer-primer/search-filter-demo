import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage before importing DataStore
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; })
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

// Import after localStorage mock is set up
const { default: DataStore, dataStore } = await import('../js/data/DataStore.js');

describe('DataStore', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    // Reset the dataStore data
    dataStore.data = dataStore.getDefaultData();
  });

  describe('generateId', () => {
    it('generates unique IDs with given prefix', () => {
      const id1 = dataStore.generateId('test');
      const id2 = dataStore.generateId('test');
      
      expect(id1).toMatch(/^test-\d+-[a-z0-9]+$/);
      expect(id2).toMatch(/^test-\d+-[a-z0-9]+$/);
      expect(id1).not.toBe(id2);
    });

    it('uses correct prefix for different entity types', () => {
      expect(dataStore.generateId('narr')).toMatch(/^narr-/);
      expect(dataStore.generateId('person')).toMatch(/^person-/);
      expect(dataStore.generateId('org')).toMatch(/^org-/);
    });
  });

  describe('createEntity', () => {
    it('creates entity with generated ID', () => {
      const id = dataStore.createEntity('persons', 'person', { name: 'Test Person' });
      
      expect(id).toMatch(/^person-/);
      expect(dataStore.data.persons.length).toBe(1);
      expect(dataStore.data.persons[0].name).toBe('Test Person');
    });

    it('adds createdAt timestamp', () => {
      const before = new Date().toISOString();
      dataStore.createEntity('persons', 'person', { name: 'Test' });
      const after = new Date().toISOString();
      
      const createdAt = dataStore.data.persons[0].createdAt;
      expect(createdAt >= before).toBe(true);
      expect(createdAt <= after).toBe(true);
    });

    it('merges defaults with provided data', () => {
      dataStore.createEntity('persons', 'person', 
        { name: 'Test' }, 
        { type: 'default_type', extra: 'value' }
      );
      
      const person = dataStore.data.persons[0];
      expect(person.name).toBe('Test');
      expect(person.type).toBe('default_type');
      expect(person.extra).toBe('value');
    });

    it('creates collection if it does not exist', () => {
      const id = dataStore.createEntity('newCollection', 'new', { name: 'Test' });
      
      expect(dataStore.data.newCollection).toBeDefined();
      expect(dataStore.data.newCollection.length).toBe(1);
    });

    it('calls save after creating entity', () => {
      const saveSpy = vi.spyOn(dataStore, 'save');
      dataStore.createEntity('persons', 'person', { name: 'Test' });
      
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe('updateEntity', () => {
    beforeEach(() => {
      dataStore.data.persons = [
        { id: 'person-1', name: 'Original Name', type: 'general' }
      ];
    });

    it('updates existing entity', () => {
      const result = dataStore.updateEntity('persons', 'person-1', { name: 'Updated Name' });
      
      expect(result).toBe(true);
      expect(dataStore.data.persons[0].name).toBe('Updated Name');
    });

    it('preserves fields not in updates', () => {
      dataStore.updateEntity('persons', 'person-1', { name: 'New Name' });
      
      expect(dataStore.data.persons[0].type).toBe('general');
    });

    it('adds updatedAt timestamp', () => {
      dataStore.updateEntity('persons', 'person-1', { name: 'New' });
      
      expect(dataStore.data.persons[0].updatedAt).toBeDefined();
    });

    it('returns false for nonexistent entity', () => {
      const result = dataStore.updateEntity('persons', 'nonexistent', { name: 'Test' });
      expect(result).toBe(false);
    });

    it('returns false for nonexistent collection', () => {
      const result = dataStore.updateEntity('nonexistent', 'id', { name: 'Test' });
      expect(result).toBe(false);
    });

    it('returns false for null id', () => {
      const result = dataStore.updateEntity('persons', null, { name: 'Test' });
      expect(result).toBe(false);
    });
  });

  describe('deleteEntity', () => {
    beforeEach(() => {
      dataStore.data.persons = [
        { id: 'person-1', name: 'Person 1' },
        { id: 'person-2', name: 'Person 2' }
      ];
    });

    it('removes entity from collection', () => {
      const result = dataStore.deleteEntity('persons', 'person-1');
      
      expect(result).toBe(true);
      expect(dataStore.data.persons.length).toBe(1);
      expect(dataStore.data.persons[0].id).toBe('person-2');
    });

    it('calls cleanup function if provided', () => {
      const cleanup = vi.fn();
      dataStore.deleteEntity('persons', 'person-1', cleanup);
      
      expect(cleanup).toHaveBeenCalledWith('person-1');
    });

    it('returns false for nonexistent entity', () => {
      const result = dataStore.deleteEntity('persons', 'nonexistent');
      expect(result).toBe(false);
    });

    it('returns false for null id', () => {
      const result = dataStore.deleteEntity('persons', null);
      expect(result).toBe(false);
    });
  });

  describe('findEntity', () => {
    beforeEach(() => {
      dataStore.data.persons = [
        { id: 'person-1', name: 'Person 1' }
      ];
    });

    it('finds entity by id', () => {
      const result = dataStore.findEntity('persons', 'person-1');
      expect(result).toBeDefined();
      expect(result.name).toBe('Person 1');
    });

    it('returns undefined for nonexistent entity', () => {
      const result = dataStore.findEntity('persons', 'nonexistent');
      expect(result).toBeUndefined();
    });

    it('returns undefined for nonexistent collection', () => {
      const result = dataStore.findEntity('nonexistent', 'id');
      expect(result).toBeUndefined();
    });
  });

  describe('removeIdFromArrayField', () => {
    it('removes id from array fields in all items', () => {
      dataStore.data.narratives = [
        { id: 'n1', personIds: ['p1', 'p2', 'p3'] },
        { id: 'n2', personIds: ['p2', 'p4'] }
      ];
      
      dataStore.removeIdFromArrayField('narratives', 'personIds', 'p2');
      
      expect(dataStore.data.narratives[0].personIds).toEqual(['p1', 'p3']);
      expect(dataStore.data.narratives[1].personIds).toEqual(['p4']);
    });

    it('handles items without the field', () => {
      dataStore.data.narratives = [
        { id: 'n1' },
        { id: 'n2', personIds: ['p1'] }
      ];
      
      // Should not throw
      dataStore.removeIdFromArrayField('narratives', 'personIds', 'p1');
      expect(dataStore.data.narratives[1].personIds).toEqual([]);
    });
  });

  describe('save and load', () => {
    it('saves data to localStorage', () => {
      dataStore.data.persons = [{ id: 'p1', name: 'Test' }];
      dataStore.save();
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'narrativeOS_data',
        expect.any(String)
      );
    });

    it('notifies listeners on save', () => {
      const listener = vi.fn();
      dataStore.subscribe(listener);
      
      dataStore.save();
      
      expect(listener).toHaveBeenCalledWith(dataStore.data);
    });
  });

  describe('subscribe', () => {
    it('adds listener and returns unsubscribe function', () => {
      const listener = vi.fn();
      const unsubscribe = dataStore.subscribe(listener);
      
      dataStore.notifyListeners();
      expect(listener).toHaveBeenCalledTimes(1);
      
      unsubscribe();
      dataStore.notifyListeners();
      expect(listener).toHaveBeenCalledTimes(1); // Still 1, not called again
    });
  });


  describe('generateColor', () => {
    it('returns a valid hex color', () => {
      const color = dataStore.generateColor();
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  // generateInitialVolume tests removed - volume is now computed from documents

  describe('export and import', () => {
    it('exports data as JSON string', () => {
      dataStore.data.persons = [{ id: 'p1', name: 'Test' }];
      const exported = dataStore.export();
      
      expect(typeof exported).toBe('string');
      const parsed = JSON.parse(exported);
      expect(parsed.persons[0].name).toBe('Test');
    });

    it('imports data from JSON string', () => {
      const importData = JSON.stringify({
        ...dataStore.getDefaultData(),
        persons: [{ id: 'imported', name: 'Imported Person' }]
      });
      
      const result = dataStore.import(importData);
      
      expect(result).toBe(true);
      expect(dataStore.data.persons[0].name).toBe('Imported Person');
    });

    it('returns false for invalid JSON', () => {
      const result = dataStore.import('not valid json');
      expect(result).toBe(false);
    });
  });

  describe('reset', () => {
    it('resets data to defaults', () => {
      dataStore.data.persons = [{ id: 'p1', name: 'Test' }];
      dataStore.reset();
      
      expect(dataStore.data.persons).toEqual([]);
    });
  });

  describe('getDefaultData', () => {
    it('returns object with all expected collections', () => {
      const defaults = dataStore.getDefaultData();
      
      expect(defaults).toHaveProperty('missions');
      expect(defaults).toHaveProperty('narratives');
      expect(defaults).toHaveProperty('themes');
      expect(defaults).toHaveProperty('persons');
      expect(defaults).toHaveProperty('organizations');
      expect(defaults).toHaveProperty('locations');
      expect(defaults).toHaveProperty('events');
      expect(defaults).toHaveProperty('documents');
      expect(defaults).toHaveProperty('monitors');
      expect(defaults).toHaveProperty('alerts');
    });
  });
});
