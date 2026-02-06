/**
 * Factions and faction overlaps for Singapore MCO dataset
 */

export const factions = [
  {
    id: 'faction-001',
    name: 'Pro-Defence Community',
    description: 'Citizens, NSmen, veterans, and groups supporting SAF and National Service. This faction actively defends NS policies, promotes SAF achievements, and counters negative narratives about military readiness. Includes defence-related social media accounts and veteran associations.',
    color: '#4E79A7',
    relatedFactionIds: ['faction-007'],
    memberCount: 850000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: ['org-001', 'org-002', 'org-003'],
    tagIds: ['tag-006'],
    documentIds: []
  },
  {
    id: 'faction-002',
    name: 'NS Policy Critics',
    description: 'Groups and individuals questioning NS policies including duration, deferment rules, reservist obligations, and perceived inequities. This faction raises concerns about career disruption, fairness of the system, and comparisons with other countries\' conscription models.',
    color: '#E15759',
    relatedFactionIds: ['faction-006'],
    memberCount: 120000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    tagIds: ['tag-005'],
    documentIds: []
  },
  {
    id: 'faction-003',
    name: 'PRC-aligned Voices',
    description: 'Accounts and media outlets promoting PRC narratives, CCP talking points, and Chinese nationalist perspectives. This faction amplifies positive coverage of China while criticizing Singapore\'s relationships with Western nations and questioning ASEAN unity.',
    color: '#DE2910',
    relatedFactionIds: ['faction-004'],
    memberCount: 45000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: ['org-018', 'org-019'],
    tagIds: ['tag-004', 'tag-origin-002'],
    documentIds: []
  },
  {
    id: 'faction-004',
    name: 'Foreign State Actors',
    description: 'Identified state-linked information operations including coordinated inauthentic behavior networks, state media amplification campaigns, and suspected influence operations targeting Singapore. Includes both PRC and other foreign state actors.',
    color: '#8B5CF6',
    relatedFactionIds: ['faction-003'],
    memberCount: 5000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    tagIds: ['tag-004'],
    documentIds: []
  },
  {
    id: 'faction-005',
    name: 'Malaysian Nationalist Voices',
    description: 'Voices amplifying Malaysian territorial claims, water agreement disputes, and nationalist sentiments regarding Singapore. This faction includes accounts promoting Johor-centric narratives and those critical of Singapore\'s policies affecting Malaysia.',
    color: '#003087',
    relatedFactionIds: [],
    memberCount: 75000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    tagIds: ['tag-005', 'tag-origin-003'],
    documentIds: []
  },
  {
    id: 'faction-006',
    name: 'Anti-Establishment Critics',
    description: 'Local critics of PAP governance, government policies, and institutional practices. This faction spans from moderate opposition supporters to more radical voices questioning Singapore\'s political system and defence priorities.',
    color: '#F28E2B',
    relatedFactionIds: ['faction-002'],
    memberCount: 95000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    tagIds: ['tag-005'],
    documentIds: []
  },
  {
    id: 'faction-007',
    name: 'Mainstream Singaporeans',
    description: 'General Singaporean public discourse representing moderate, mainstream views. This faction includes everyday citizens discussing defence and social issues without strong ideological alignment.',
    color: '#76B7B2',
    relatedFactionIds: ['faction-001'],
    memberCount: 2500000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    tagIds: ['tag-006', 'tag-origin-001'],
    documentIds: []
  },
  {
    id: 'faction-008',
    name: 'Ethno-Religious Provocateurs',
    description: 'Accounts deliberately stoking racial or religious tensions in Singapore. This faction exploits sensitive issues around race, religion, and immigration to undermine social cohesion, often using anonymous or pseudonymous accounts.',
    color: '#FF6B6B',
    relatedFactionIds: [],
    memberCount: 8000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    tagIds: ['tag-004'],
    documentIds: []
  }
];

export const factionOverlaps = [
  {
    factionIds: ['faction-001', 'faction-007'],
    overlapSize: 450000,
    sharedSentiment: { 'narr-001': 0.65, 'narr-002': 0.72 }
  },
  {
    factionIds: ['faction-002', 'faction-006'],
    overlapSize: 35000,
    sharedSentiment: { 'narr-001': -0.55, 'narr-003': -0.48 }
  },
  {
    factionIds: ['faction-003', 'faction-004'],
    overlapSize: 3500,
    sharedSentiment: { 'narr-005': 0.78, 'narr-006': 0.82 }
  }
];
