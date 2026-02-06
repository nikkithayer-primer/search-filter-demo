/**
 * Search Filters for Singapore MCO dataset
 */

export const searchFilters = [
  {
    id: 'filter-001',
    name: 'PRC State Media Sources',
    description: 'Filter for content from Chinese state-affiliated media outlets',
    scope: {
      publisherIds: ['pub-reg-globaltimes', 'pub-reg-xinhua'],
      organizationIds: ['org-017', 'org-018', 'org-019']
    },
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 'filter-002',
    name: 'Malaysian News Sources',
    description: 'Filter for content from Malaysian news outlets',
    scope: {
      publisherIds: ['pub-reg-thestar', 'pub-reg-nst', 'pub-reg-bernama']
    },
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 'filter-003',
    name: 'Chinese Social Platforms',
    description: 'Filter for content from WeChat and Weibo',
    scope: {
      publisherIds: ['pub-wechat', 'pub-weibo']
    },
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 'filter-004',
    name: 'Local Forums',
    description: 'Filter for content from Singapore forums including HardwareZone and Reddit r/singapore',
    scope: {
      publisherIds: ['pub-hwz', 'pub-reddit']
    },
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 'filter-005',
    name: 'NS-related Keywords',
    description: 'Filter for content containing NS-related keywords',
    scope: {
      keywords: ['NS', 'National Service', 'NSF', 'NSman', 'reservist', 'ICT', 'enlistment', 'ORD', 'BMT', 'conscription']
    },
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 'filter-006',
    name: 'Foreign Influence Indicators',
    description: 'Filter for content with potential foreign influence indicators',
    scope: {
      factionIds: ['faction-003', 'faction-004'],
      keywords: ['US proxy', 'Western bias', 'motherland', 'ancestral homeland', 'colonial']
    },
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 'filter-007',
    name: 'Internal Intelligence Reports',
    description: 'Filter for classified internal reports and assessments',
    scope: {
      documentTypes: ['intelligence_report', 'internal_report', 'memo'],
      publisherIds: ['pub-dept-mco', 'pub-dept-mindef', 'pub-dept-mci', 'pub-dept-mha']
    },
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 'filter-008',
    name: 'Social Cohesion Keywords',
    description: 'Filter for content related to racial and religious harmony issues',
    scope: {
      keywords: ['race', 'religion', 'CECA', 'foreign talent', 'discrimination', 'xenophobia', 'harmony']
    },
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  }
];
