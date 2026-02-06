import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DataService } from '../js/data/DataService.js';
import { dataStore } from '../js/data/DataStore.js';

// Mock dataStore
vi.mock('../js/data/DataStore.js', () => ({
  dataStore: {
    data: {
      narratives: [],
      themes: [],
      factions: [],
      factionOverlaps: [],
      locations: [],
      events: [],
      persons: [],
      organizations: [],
      documents: [],
      topics: [],
      publishers: [],
      publisherCategories: [],
      monitors: [],
      alerts: [],
      users: [],
      missions: []
    },
    getCurrentDatasetName: vi.fn(() => 'Test Dataset'),
    getCurrentDataset: vi.fn(() => 'test-dataset')
  }
}));

describe('DataService', () => {
  beforeEach(() => {
    // Reset mock data before each test
    dataStore.data = {
      narratives: [
        {
          id: 'narr-1',
          text: 'Test narrative one',
          missionId: 'mission-1',
          status: 'new',
          documentIds: ['doc-1', 'doc-2'],
          personIds: ['person-1', 'person-2'],
          organizationIds: ['org-1'],
          locationIds: ['loc-1'],
          eventIds: ['event-1'],
          createdAt: '2024-01-01T10:00:00Z'
        },
        {
          id: 'narr-2',
          text: 'Test narrative two',
          missionId: 'mission-1',
          status: 'in_progress',
          documentIds: ['doc-3'],
          personIds: ['person-2', 'person-3'],
          organizationIds: ['org-1', 'org-2'],
          locationIds: ['loc-2'],
          eventIds: ['event-2'],
          createdAt: '2024-01-02T10:00:00Z'
        }
      ],
      themes: [
        {
          id: 'sub-1',
          text: 'Theme one',
          parentNarrativeId: 'narr-1',
          factionMentions: { 'faction-1': { volume: 30, sentiment: 0.2 } }
        }
      ],
      factions: [
        { id: 'faction-1', name: 'Faction One', color: '#FF0000', relatedFactionIds: ['faction-2'] },
        { id: 'faction-2', name: 'Faction Two', color: '#00FF00', relatedFactionIds: [] }
      ],
      factionOverlaps: [
        { factionIds: ['faction-1', 'faction-2'], overlapSize: 50 }
      ],
      locations: [
        { id: 'loc-1', name: 'Location One', coordinates: { lat: 40.7, lng: -74.0 } },
        { id: 'loc-2', name: 'Location Two', coordinates: { lat: 34.0, lng: -118.2 } }
      ],
      events: [
        { id: 'event-1', text: 'Event one', date: '2024-01-01', locationId: 'loc-1', personIds: ['person-1'] },
        { id: 'event-2', text: 'Event two', date: '2024-01-05', locationId: 'loc-2', personIds: ['person-2'] }
      ],
      persons: [
        { id: 'person-1', name: 'Person One', affiliatedFactionIds: ['faction-1'], relatedLocationIds: ['loc-1'] },
        { id: 'person-2', name: 'Person Two', affiliatedFactionIds: ['faction-2'], relatedLocationIds: ['loc-2'] },
        { id: 'person-3', name: 'Person Three', affiliatedFactionIds: [], relatedLocationIds: [] }
      ],
      organizations: [
        { id: 'org-1', name: 'Organization One', affiliatedFactionIds: ['faction-1'] },
        { id: 'org-2', name: 'Organization Two', affiliatedFactionIds: ['faction-2'] }
      ],
      documents: [
        { 
          id: 'doc-1', 
          title: 'Document One', 
          publisherId: 'pub-1', 
          publishedDate: '2024-01-01',
          narrativeIds: ['narr-1'],
          factionMentions: {
            'faction-1': { sentiment: 0.5 },
            'faction-2': { sentiment: -0.3 }
          }
        },
        { 
          id: 'doc-2', 
          title: 'Document Two', 
          publisherId: 'pub-1', 
          publishedDate: '2024-01-02',
          narrativeIds: ['narr-1'],
          factionMentions: {
            'faction-1': { sentiment: 0.6 },
            'faction-2': { sentiment: -0.2 }
          }
        },
        { 
          id: 'doc-3', 
          title: 'Document Three', 
          publisherId: 'pub-1', 
          publishedDate: '2024-01-03',
          narrativeIds: ['narr-2'],
          factionMentions: {
            'faction-1': { sentiment: -0.2 }
          }
        }
      ],
      topics: [
        { id: 'topic-1', headline: 'Topic One', startDate: '2024-01-01', volumeOverTime: [{ date: '2024-01-01', volume: 100 }] }
      ],
      publishers: [
        { id: 'pub-1', name: 'Publisher One', type: 'news' }
      ],
      publisherCategories: [],
      monitors: [
        { id: 'monitor-1', name: 'Test Monitor', enabled: true, scope: { personIds: ['person-1'] }, triggers: { newNarrative: true } }
      ],
      alerts: [
        { id: 'alert-1', monitorId: 'monitor-1', acknowledged: false, triggeredAt: '2024-01-01T12:00:00Z' }
      ],
      users: [
        { id: 'user-1', name: 'Test User', isCurrentUser: true }
      ],
      missions: [
        { id: 'mission-1', name: 'Test Mission' }
      ]
    };
  });

  describe('getNarrativeById', () => {
    it('returns narrative when found', () => {
      const result = DataService.getNarrativeById('narr-1');
      expect(result).toBeDefined();
      expect(result.text).toBe('Test narrative one');
    });

    it('returns undefined when not found', () => {
      const result = DataService.getNarrativeById('nonexistent');
      expect(result).toBeUndefined();
    });

    it('returns undefined for null/empty id', () => {
      expect(DataService.getNarrativeById(null)).toBeUndefined();
      expect(DataService.getNarrativeById('')).toBeUndefined();
      expect(DataService.getNarrativeById(undefined)).toBeUndefined();
    });
  });

  describe('getNarratives', () => {
    it('returns all narratives when no filter', () => {
      const result = DataService.getNarratives();
      expect(result.length).toBe(2);
    });

    it('filters by missionId', () => {
      const result = DataService.getNarratives('mission-1');
      expect(result.length).toBe(2);
    });

    it('returns empty array for non-matching missionId', () => {
      const result = DataService.getNarratives('mission-nonexistent');
      expect(result.length).toBe(0);
    });

    it('filters by time range', () => {
      const timeRange = {
        start: new Date('2024-01-01'),
        end: new Date('2024-01-02')
      };
      const result = DataService.getNarratives(null, timeRange);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('narr-1');
    });
  });

  describe('getFactionsForNarrative', () => {
    it('returns factions with volume and sentiment data', () => {
      const result = DataService.getFactionsForNarrative('narr-1');
      expect(result.length).toBe(2);
      expect(result[0].faction).toBeDefined();
      expect(result[0].volume).toBeDefined();
      expect(result[0].sentiment).toBeDefined();
    });

    it('returns empty array for narrative without factions', () => {
      dataStore.data.narratives.push({
        id: 'narr-3',
        text: 'No factions',
        factionMentions: {}
      });
      const result = DataService.getFactionsForNarrative('narr-3');
      expect(result.length).toBe(0);
    });

    it('returns empty array for nonexistent narrative', () => {
      const result = DataService.getFactionsForNarrative('nonexistent');
      expect(result.length).toBe(0);
    });
  });

  describe('isDateInRange', () => {
    const timeRange = {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31')
    };

    it('returns true when date is within range', () => {
      expect(DataService.isDateInRange('2024-01-15', timeRange)).toBe(true);
      expect(DataService.isDateInRange('2024-01-01', timeRange)).toBe(true);
      expect(DataService.isDateInRange('2024-01-31', timeRange)).toBe(true);
    });

    it('returns false when date is outside range', () => {
      expect(DataService.isDateInRange('2023-12-31', timeRange)).toBe(false);
      expect(DataService.isDateInRange('2024-02-01', timeRange)).toBe(false);
    });

    it('returns true when no timeRange provided', () => {
      expect(DataService.isDateInRange('2024-01-15', null)).toBe(true);
      expect(DataService.isDateInRange('2024-01-15', {})).toBe(true);
    });
  });

  describe('filterVolumeByTimeRange', () => {
    it('filters volume data by time range', () => {
      const volumeOverTime = [
        { date: '2024-01-01', factionVolumes: { 'f1': 10 } },
        { date: '2024-01-02', factionVolumes: { 'f1': 15 } },
        { date: '2024-01-03', factionVolumes: { 'f1': 20 } }
      ];
      const timeRange = {
        start: new Date('2024-01-01'),
        end: new Date('2024-01-02')
      };
      
      const result = DataService.filterVolumeByTimeRange(volumeOverTime, timeRange);
      expect(result.length).toBe(2);
    });

    it('returns all data when no time range', () => {
      const volumeOverTime = [
        { date: '2024-01-01', factionVolumes: {} },
        { date: '2024-01-02', factionVolumes: {} }
      ];
      
      const result = DataService.filterVolumeByTimeRange(volumeOverTime, null);
      expect(result.length).toBe(2);
    });

    it('handles empty volume array', () => {
      expect(DataService.filterVolumeByTimeRange([], null)).toEqual([]);
      expect(DataService.filterVolumeByTimeRange(null, null)).toEqual([]);
    });
  });

  describe('buildNetworkGraph', () => {
    it('builds nodes for persons and organizations', () => {
      const result = DataService.buildNetworkGraph(['person-1', 'person-2'], ['org-1']);
      
      expect(result.nodes.length).toBe(3);
      expect(result.nodes.filter(n => n.type === 'person').length).toBe(2);
      expect(result.nodes.filter(n => n.type === 'organization').length).toBe(1);
    });

    it('creates links between entities sharing narratives', () => {
      const result = DataService.buildNetworkGraph(['person-1', 'person-2'], ['org-1']);
      
      // person-1 and person-2 share narr-1, person-2 and org-1 share narr-1 and narr-2
      expect(result.links.length).toBeGreaterThan(0);
      expect(result.links.every(l => l.narratives && l.narratives.length > 0)).toBe(true);
    });

    it('handles empty inputs', () => {
      const result = DataService.buildNetworkGraph([], []);
      expect(result.nodes).toEqual([]);
      expect(result.links).toEqual([]);
    });

    it('handles null inputs gracefully', () => {
      const result = DataService.buildNetworkGraph(null, null);
      expect(result.nodes).toEqual([]);
      expect(result.links).toEqual([]);
    });
  });

  describe('getPersonsForNarrative', () => {
    it('returns persons linked to the narrative', () => {
      const result = DataService.getPersonsForNarrative('narr-1');
      expect(result.length).toBe(2);
      expect(result.map(p => p.id)).toContain('person-1');
      expect(result.map(p => p.id)).toContain('person-2');
    });

    it('returns empty array for nonexistent narrative', () => {
      const result = DataService.getPersonsForNarrative('nonexistent');
      expect(result).toEqual([]);
    });
  });

  describe('getOrganizationsForNarrative', () => {
    it('returns organizations linked to the narrative', () => {
      const result = DataService.getOrganizationsForNarrative('narr-1');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('org-1');
    });
  });

  describe('getNarrativesForPerson', () => {
    it('returns narratives that mention the person', () => {
      const result = DataService.getNarrativesForPerson('person-2');
      expect(result.length).toBe(2);
    });

    it('returns empty array for person with no narratives', () => {
      const result = DataService.getNarrativesForPerson('nonexistent');
      expect(result).toEqual([]);
    });
  });

  describe('getRelatedPersons', () => {
    it('returns persons who appear in same narratives', () => {
      const result = DataService.getRelatedPersons('person-1');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('person-2');
    });

    it('returns empty array for person with no narrative overlap', () => {
      dataStore.data.persons.push({ id: 'person-isolated', name: 'Isolated' });
      const result = DataService.getRelatedPersons('person-isolated');
      expect(result).toEqual([]);
    });
  });

  describe('search', () => {
    it('searches narratives by text', () => {
      const result = DataService.search('Test narrative');
      expect(result.narratives.length).toBe(2);
    });

    it('searches persons by name', () => {
      const result = DataService.search('Person One');
      expect(result.persons.length).toBe(1);
      expect(result.persons[0].name).toBe('Person One');
    });

    it('searches case-insensitively', () => {
      const result = DataService.search('person one');
      expect(result.persons.length).toBe(1);
    });

    it('returns empty results for no match', () => {
      const result = DataService.search('xyz123nonexistent');
      expect(result.narratives.length).toBe(0);
      expect(result.persons.length).toBe(0);
      expect(result.organizations.length).toBe(0);
    });

    it('handles empty/null query', () => {
      expect(DataService.search('')).toEqual({
        narratives: [],
        themes: [],
        topics: [],
        factions: [],
        locations: [],
        events: [],
        persons: [],
        organizations: [],
        documents: []
      });
      expect(DataService.search(null)).toEqual({
        narratives: [],
        themes: [],
        topics: [],
        factions: [],
        locations: [],
        events: [],
        persons: [],
        organizations: [],
        documents: []
      });
    });
  });

  describe('getNarrativesByStatus', () => {
    it('filters narratives by status', () => {
      const newNarratives = DataService.getNarrativesByStatus('new');
      expect(newNarratives.length).toBe(1);
      expect(newNarratives[0].id).toBe('narr-1');

      const inProgressNarratives = DataService.getNarrativesByStatus('in_progress');
      expect(inProgressNarratives.length).toBe(1);
      expect(inProgressNarratives[0].id).toBe('narr-2');
    });
  });

  describe('getNarrativeStatusCounts', () => {
    it('returns counts for each status', () => {
      const counts = DataService.getNarrativeStatusCounts();
      expect(counts.new).toBe(1);
      expect(counts.in_progress).toBe(1);
      expect(counts.resolved).toBe(0);
    });
  });

  describe('getThemesForNarrative', () => {
    it('returns themes for a parent narrative', () => {
      const result = DataService.getThemesForNarrative('narr-1');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('sub-1');
    });

    it('returns empty array for narrative without themes', () => {
      const result = DataService.getThemesForNarrative('narr-2');
      expect(result.length).toBe(0);
    });
  });

  describe('getCurrentUser', () => {
    it('returns the current user', () => {
      const user = DataService.getCurrentUser();
      expect(user).toBeDefined();
      expect(user.isCurrentUser).toBe(true);
      expect(user.name).toBe('Test User');
    });
  });

  describe('getActiveMonitors', () => {
    it('returns only enabled monitors', () => {
      dataStore.data.monitors.push({ id: 'monitor-2', enabled: false });
      const active = DataService.getActiveMonitors();
      expect(active.length).toBe(1);
      expect(active[0].id).toBe('monitor-1');
    });
  });

  describe('getUnacknowledgedAlerts', () => {
    it('returns alerts that are not acknowledged', () => {
      const alerts = DataService.getUnacknowledgedAlerts();
      expect(alerts.length).toBe(1);
    });
  });
});
