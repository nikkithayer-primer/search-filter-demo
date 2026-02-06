/**
 * Search filters for Walmart Brand dataset
 */

export const searchFilters = [
  {
    id: 'filter-001',
    name: 'Walmart Leadership',
    description: 'Walmart corporate executives',
    scope: {
      mode: 'simple',
      personIds: ['person-001', 'person-002', 'person-009'],
      organizationIds: ['org-001'],
      factionIds: [],
      locationIds: [],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'filter-002',
    name: 'Labor Advocates',
    description: 'Worker rights organizations and leaders',
    scope: {
      mode: 'simple',
      personIds: ['person-003', 'person-004', 'person-005'],
      organizationIds: ['org-005', 'org-006'],
      factionIds: [],
      locationIds: [],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'filter-003',
    name: 'Major Competitors',
    description: 'Key retail competitors and their leadership',
    scope: {
      mode: 'simple',
      personIds: ['person-013', 'person-014'],
      organizationIds: ['org-003', 'org-004', 'org-010', 'org-011'],
      factionIds: [],
      locationIds: [],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  }
];
