/**
 * Search filters for China Semiconductor dataset
 */

export const searchFilters = [
  {
    id: 'filter-001',
    name: 'Chinese Chip Makers',
    description: 'Major Chinese semiconductor manufacturers',
    scope: {
      mode: 'simple',
      personIds: ['person-001', 'person-002', 'person-011', 'person-012', 'person-013'],
      organizationIds: ['org-001', 'org-010', 'org-013'],
      factionIds: ['faction-001'],
      locationIds: [],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'filter-002',
    name: 'US Export Controls',
    description: 'US government officials and agencies involved in export restrictions',
    scope: {
      mode: 'simple',
      personIds: ['person-005', 'person-006'],
      organizationIds: ['org-005', 'org-006'],
      factionIds: ['faction-002'],
      locationIds: ['loc-004'],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'filter-003',
    name: 'Equipment Suppliers',
    description: 'Key semiconductor equipment and tool manufacturers',
    scope: {
      mode: 'simple',
      personIds: ['person-004'],
      organizationIds: ['org-002', 'org-003', 'org-011', 'org-012', 'org-018', 'org-019'],
      factionIds: ['faction-005'],
      locationIds: [],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'filter-004',
    name: 'Taiwan Focus',
    description: 'TSMC and Taiwan-related semiconductor coverage',
    scope: {
      mode: 'simple',
      personIds: ['person-017', 'person-018'],
      organizationIds: ['org-020'],
      factionIds: [],
      locationIds: ['loc-010'],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  }
];
