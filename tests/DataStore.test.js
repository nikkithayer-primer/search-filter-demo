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

  describe('removeKeyFromObjectField', () => {
    it('removes key from object fields in all items', () => {
      dataStore.data.narratives = [
        { id: 'n1', factionMentions: { f1: { volume: 10 }, f2: { volume: 20 } } },
        { id: 'n2', factionMentions: { f1: { volume: 5 } } }
      ];
      
      dataStore.removeKeyFromObjectField('narratives', 'factionMentions', 'f1');
      
      expect(dataStore.data.narratives[0].factionMentions).toEqual({ f2: { volume: 20 } });
      expect(dataStore.data.narratives[1].factionMentions).toEqual({});
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

  describe('Narrative CRUD', () => {
    it('creates narrative with all fields', () => {
      const id = dataStore.createNarrative({
        text: 'Test narrative',
        missionId: 'mission-1',
        sentiment: 'positive',
        factionMentions: { f1: { volume: 100 } }
      });
      
      expect(id).toMatch(/^narr-/);
      const narrative = dataStore.data.narratives[0];
      expect(narrative.text).toBe('Test narrative');
      expect(narrative.missionId).toBe('mission-1');
      expect(narrative.themeIds).toEqual([]);
    });

    it('updates narrative', () => {
      dataStore.createNarrative({ text: 'Original' });
      const id = dataStore.data.narratives[0].id;
      
      dataStore.updateNarrative(id, { text: 'Updated' });
      
      expect(dataStore.data.narratives[0].text).toBe('Updated');
    });

    it('deletes narrative and associated themes', () => {
      const narrId = dataStore.createNarrative({ text: 'Test' });
      dataStore.createTheme({ text: 'Theme', parentNarrativeId: narrId });
      
      expect(dataStore.data.themes.length).toBe(1);
      
      dataStore.deleteNarrative(narrId);
      
      expect(dataStore.data.narratives.length).toBe(0);
      expect(dataStore.data.themes.length).toBe(0);
    });
  });

  describe('Theme CRUD', () => {
    beforeEach(() => {
      dataStore.createNarrative({ text: 'Parent narrative' });
    });

    it('creates theme and links to parent', () => {
      const parentId = dataStore.data.narratives[0].id;
      const themeId = dataStore.createTheme({
        text: 'Theme',
        parentNarrativeId: parentId
      });
      
      expect(themeId).toMatch(/^sub-/);
      expect(dataStore.data.narratives[0].themeIds).toContain(themeId);
    });

    it('deletes theme and removes from parent', () => {
      const parentId = dataStore.data.narratives[0].id;
      const themeId = dataStore.createTheme({
        text: 'Theme',
        parentNarrativeId: parentId
      });
      
      dataStore.deleteTheme(themeId);
      
      expect(dataStore.data.themes.length).toBe(0);
      expect(dataStore.data.narratives[0].themeIds).not.toContain(themeId);
    });
  });

  describe('Person CRUD', () => {
    it('creates person with default fields', () => {
      const id = dataStore.createPerson({ name: 'Test Person' });
      
      const person = dataStore.data.persons[0];
      expect(person.name).toBe('Test Person');
      expect(person.affiliatedFactionIds).toEqual([]);
      expect(person.relatedLocationIds).toEqual([]);
    });

    it('deletes person and cleans up references', () => {
      const personId = dataStore.createPerson({ name: 'Test' });
      dataStore.data.narratives = [{ id: 'n1', personIds: [personId] }];
      dataStore.data.factions = [{ id: 'f1', affiliatedPersonIds: [personId] }];
      
      dataStore.deletePerson(personId);
      
      expect(dataStore.data.narratives[0].personIds).not.toContain(personId);
      expect(dataStore.data.factions[0].affiliatedPersonIds).not.toContain(personId);
    });
  });

  describe('Organization CRUD', () => {
    it('creates organization with default fields', () => {
      const id = dataStore.createOrganization({ name: 'Test Org' });
      
      const org = dataStore.data.organizations[0];
      expect(org.name).toBe('Test Org');
      expect(org.affiliatedFactionIds).toEqual([]);
    });
  });

  describe('Faction CRUD', () => {
    it('creates faction', () => {
      const id = dataStore.createFaction({ name: 'Test Faction' });
      
      expect(id).toMatch(/^faction-/);
      expect(dataStore.data.factions[0].name).toBe('Test Faction');
    });

    it('deletes faction and cleans up mentions', () => {
      const factionId = dataStore.createFaction({ name: 'Test' });
      dataStore.data.narratives = [{ 
        id: 'n1', 
        factionMentions: { [factionId]: { volume: 100 } } 
      }];
      dataStore.data.factionOverlaps = [{ factionIds: [factionId, 'other'] }];
      
      dataStore.deleteFaction(factionId);
      
      expect(dataStore.data.narratives[0].factionMentions[factionId]).toBeUndefined();
      expect(dataStore.data.factionOverlaps.length).toBe(0);
    });
  });

  describe('Location CRUD', () => {
    it('creates location with coordinates', () => {
      const id = dataStore.createLocation({
        name: 'Test Location',
        coordinates: { lat: 40.7, lng: -74.0 }
      });
      
      const loc = dataStore.data.locations[0];
      expect(loc.name).toBe('Test Location');
      expect(loc.coordinates.lat).toBe(40.7);
    });
  });

  describe('Event CRUD', () => {
    it('creates event', () => {
      const id = dataStore.createEvent({ text: 'Test event' });
      
      expect(id).toMatch(/^event-/);
      expect(dataStore.data.events[0].text).toBe('Test event');
    });

    it('creates sub-event and links to parent', () => {
      const parentId = dataStore.createEvent({ text: 'Parent event' });
      const subId = dataStore.createEvent({ 
        text: 'Sub event',
        parentEventId: parentId
      });
      
      expect(dataStore.data.events[0].subEventIds).toContain(subId);
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
      expect(defaults).toHaveProperty('factions');
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
