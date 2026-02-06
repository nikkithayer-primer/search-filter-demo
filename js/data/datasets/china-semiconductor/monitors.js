/**
 * Monitors and alerts for China Semiconductor dataset
 */

export const monitors = [
  {
    id: 'monitor-001',
    name: 'SMIC Technology Progress',
    description: 'Track breakthroughs and developments at SMIC, China\'s leading chip manufacturer',
    scope: {
      mode: 'simple',
      organizationIds: ['org-001'], // SMIC
      personIds: ['person-001', 'person-002', 'person-003'], // SMIC leadership
      keywords: ['SMIC', '5nm', 'chip breakthrough', 'semiconductor manufacturing'],
      logic: 'OR' // Match narratives containing ANY of the above entities
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: true,
      volumeSpike: { threshold: 400, timeWindow: '24h' },
      sentimentShift: { threshold: 0.20, direction: 'any' },
      factionEngagement: { factionIds: ['faction-001', 'faction-002'], threshold: 200 }
    },
    enabled: true,
    createdAt: '2026-01-01T00:00:00Z',
    lastTriggered: '2026-01-20T09:30:00Z'
  },
  {
    id: 'monitor-002',
    name: 'Export Controls Impact',
    description: 'Monitor narratives around US/Dutch export controls and their effects on Chinese chip industry',
    scope: {
      mode: 'simple',
      organizationIds: ['org-002', 'org-004', 'org-005'], // ASML, US Commerce Dept, Dutch Govt
      personIds: ['person-004', 'person-005', 'person-006'], // Policy figures
      keywords: ['ASML', 'export controls', 'lithography', 'chip restrictions']
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: true,
      volumeSpike: { threshold: 500, timeWindow: '24h' },
      sentimentShift: { threshold: 0.15, direction: 'negative' },
      factionEngagement: null
    },
    enabled: true,
    createdAt: '2026-01-01T00:00:00Z',
    lastTriggered: '2026-01-17T14:00:00Z'
  },
  {
    id: 'monitor-003',
    name: 'Chinese Investment Watch',
    description: 'Track government funding, Big Fund allocations, and investment trends in Chinese semiconductors',
    scope: {
      mode: 'simple',
      organizationIds: ['org-007', 'org-008', 'org-009'], // Big Fund, Ministry of Finance, MIIT
      personIds: ['person-008', 'person-009', 'person-010'], // Investment figures
      keywords: ['Big Fund', 'semiconductor investment', 'China chip funding']
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: false,
      volumeSpike: { threshold: 300, timeWindow: '24h' },
      sentimentShift: null,
      factionEngagement: { factionIds: ['faction-001', 'faction-005'], threshold: 150 }
    },
    enabled: true,
    createdAt: '2026-01-15T00:00:00Z',
    lastTriggered: '2026-01-20T11:00:00Z'
  },
  {
    id: 'monitor-004',
    name: 'Huawei Sanctions Monitoring',
    description: 'Track Huawei\'s efforts to circumvent sanctions and develop indigenous chip capabilities',
    scope: {
      mode: 'simple',
      organizationIds: ['org-010'], // Huawei
      personIds: ['person-011', 'person-012'], // Huawei leadership
      keywords: ['Huawei', 'sanctions', 'chip stockpiling', 'HiSilicon']
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: true,
      volumeSpike: { threshold: 350, timeWindow: '24h' },
      sentimentShift: { threshold: 0.20, direction: 'any' },
      factionEngagement: null
    },
    enabled: true,
    createdAt: '2026-01-01T00:00:00Z',
    lastTriggered: '2026-01-19T16:30:00Z'
  },
  {
    id: 'monitor-005',
    name: 'Supply Chain & Manufacturing',
    description: 'Monitor TSMC Arizona, YMTC, and global semiconductor supply chain developments',
    scope: {
      mode: 'simple',
      organizationIds: ['org-013', 'org-020'], // YMTC, TSMC
      locationIds: ['loc-009', 'loc-010'], // Arizona locations
      keywords: ['YMTC', 'TSMC Arizona', 'chip supply chain', 'fab construction']
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: true,
      volumeSpike: { threshold: 400, timeWindow: '24h' },
      sentimentShift: { threshold: 0.15, direction: 'negative' },
      factionEngagement: null
    },
    enabled: false, // Paused
    createdAt: '2026-01-10T00:00:00Z',
    lastTriggered: '2026-01-18T10:00:00Z'
  }
];

export const alerts = [
  {
    id: 'alert-001',
    monitorId: 'monitor-001',
    type: 'volume_spike',
    title: 'Volume spike: SMIC 5nm breakthrough coverage',
    description: '520 mentions from Chinese State Media in 24 hours, exceeding threshold of 400',
    triggeredAt: '2026-01-20T09:30:00Z',
    relatedNarrativeIds: ['narr-001'],
    relatedThemeIds: ['sub-001', 'sub-002'],
    relatedEventIds: ['event-001', 'event-002'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: ['faction-004'], // Chinese State Media
    relatedLocationIds: [],
    metadata: {
      actualValue: 520,
      threshold: 400,
      timeWindow: '24h',
      percentOver: 30
    }
  },
  {
    id: 'alert-002',
    monitorId: 'monitor-001',
    type: 'faction_engagement',
    title: 'High faction engagement: SMIC narrative',
    description: 'Chinese Tech Industry Supporters (520) and US Policy Hawks (380) showing significant engagement',
    triggeredAt: '2026-01-19T14:00:00Z',
    relatedNarrativeIds: ['narr-001'],
    relatedThemeIds: ['sub-001', 'sub-003'],
    relatedEventIds: ['event-001'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: ['faction-001', 'faction-002'], // Chinese Tech Industry Supporters, US Policy Hawks
    relatedLocationIds: [],
    metadata: {
      factionEngagement: {
        'faction-001': 520,
        'faction-002': 380
      },
      threshold: 200,
      totalVolume: 900
    }
  },
  {
    id: 'alert-003',
    monitorId: 'monitor-002',
    type: 'sentiment_shift',
    title: 'Sentiment shift: Export controls narrative',
    description: '-18% sentiment change following expanded ASML restrictions announcement',
    triggeredAt: '2026-01-17T14:00:00Z',
    relatedNarrativeIds: ['narr-002'],
    relatedThemeIds: ['sub-004', 'sub-005'],
    relatedEventIds: ['event-003', 'event-004'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-002'], // ASML
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      previousSentiment: -0.30,
      currentSentiment: -0.48,
      delta: -0.18,
      direction: 'negative'
    }
  },
  {
    id: 'alert-004',
    monitorId: 'monitor-002',
    type: 'new_event',
    title: 'New event: Netherlands expands ASML export ban',
    description: 'Netherlands announces expanded ASML export restrictions',
    triggeredAt: '2026-01-14T10:00:00Z',
    relatedNarrativeIds: ['narr-002'],
    relatedThemeIds: ['sub-004'],
    relatedEventIds: ['event-003'],
    relatedSubEventIds: ['event-004', 'event-005'],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      eventId: 'event-003',
      eventText: 'Netherlands announces expanded ASML export restrictions'
    }
  },
  {
    id: 'alert-005',
    monitorId: 'monitor-003',
    type: 'new_narrative',
    title: 'New narrative: Big Fund Phase III announced',
    description: 'China announces $47 billion semiconductor investment fund, third phase of "Big Fund"',
    triggeredAt: '2026-01-17T08:00:00Z',
    relatedNarrativeIds: ['narr-003'],
    relatedThemeIds: ['sub-007', 'sub-008', 'sub-009'],
    relatedEventIds: ['event-006', 'event-007'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      narrativeId: 'narr-003',
      narrativeText: 'China announces $47 billion semiconductor investment fund, third phase of "Big Fund"'
    }
  },
  {
    id: 'alert-006',
    monitorId: 'monitor-003',
    type: 'volume_spike',
    title: 'Volume spike: Big Fund coverage',
    description: '425 mentions in 24 hours as markets react to Big Fund announcement',
    triggeredAt: '2026-01-20T11:00:00Z',
    relatedNarrativeIds: ['narr-003'],
    relatedThemeIds: ['sub-007', 'sub-009'],
    relatedEventIds: ['event-006'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-007'], // Big Fund
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      actualValue: 425,
      threshold: 300,
      timeWindow: '24h',
      percentOver: 41.7
    }
  },
  {
    id: 'alert-007',
    monitorId: 'monitor-004',
    type: 'new_narrative',
    title: 'New narrative: Huawei equipment stockpiling investigation',
    description: 'Huawei stockpiles semiconductor equipment ahead of expanded US sanctions',
    triggeredAt: '2026-01-15T12:00:00Z',
    relatedNarrativeIds: ['narr-004'],
    relatedThemeIds: ['sub-010', 'sub-011'],
    relatedEventIds: ['event-008', 'event-009'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      narrativeId: 'narr-004',
      narrativeText: 'Huawei stockpiles semiconductor equipment ahead of expanded US sanctions'
    }
  },
  {
    id: 'alert-008',
    monitorId: 'monitor-004',
    type: 'volume_spike',
    title: 'Volume spike: Huawei sanctions coverage',
    description: '365 mentions from US Policy Hawks in 24 hours',
    triggeredAt: '2026-01-19T16:30:00Z',
    relatedNarrativeIds: ['narr-004'],
    relatedThemeIds: ['sub-010'],
    relatedEventIds: ['event-009'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: ['faction-002'], // US Policy Hawks
    relatedLocationIds: [],
    metadata: {
      actualValue: 365,
      threshold: 350,
      timeWindow: '24h',
      percentOver: 4.3
    }
  }
];
