/**
 * Monitors and alerts for American Politics dataset
 */

export const monitors = [
  {
    id: 'monitor-001',
    name: 'Immigration Enforcement Activity',
    description: 'Track narratives and events related to DOJ, ICE, and DHS immigration enforcement activities',
    scope: {
      mode: 'simple',
      organizationIds: ['org-010', 'org-011', 'org-017'], // DOJ, ICE, DHS
      personIds: ['person-018'], // Kristi Noem
      locationIds: ['loc-002', 'loc-008'], // Minneapolis, St. Paul
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
      volumeSpike: { threshold: 500, timeWindow: '24h' },
      sentimentShift: { threshold: 0.15, direction: 'any' },
      factionEngagement: null
    },
    enabled: true,
    createdAt: '2026-01-10T00:00:00Z',
    lastTriggered: '2026-01-20T14:30:00Z'
  },
  {
    id: 'monitor-002',
    name: 'Trump Administration Actions',
    description: 'Monitor narratives mentioning President Trump and key administration officials',
    scope: {
      mode: 'simple',
      personIds: ['person-003', 'person-012', 'person-013', 'person-018', 'person-026'], // Trump, Dhillon, Bondi, Noem, RFK Jr
      factionIds: ['faction-001'], // American Right Wing
      logic: 'OR' // Match narratives containing ANY of the above entities
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: false,
      volumeSpike: { threshold: 800, timeWindow: '24h' },
      sentimentShift: { threshold: 0.20, direction: 'any' },
      factionEngagement: { factionIds: ['faction-001', 'faction-002'], threshold: 200 }
    },
    enabled: true,
    createdAt: '2026-01-05T00:00:00Z',
    lastTriggered: '2026-01-20T11:30:00Z'
  },
  {
    id: 'monitor-003',
    name: 'Public Health Policy',
    description: 'Track health-related narratives including dietary guidelines, FDA policy, and food safety',
    scope: {
      mode: 'simple',
      organizationIds: ['org-003', 'org-022', 'org-023'], // FDA, HHS, World Resources Institute
      personIds: ['person-026'], // RFK Jr
      keywords: ['dietary guidelines', 'food preservatives', 'FDA policy', 'food safety'],
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
      sentimentShift: { threshold: 0.15, direction: 'negative' },
      factionEngagement: { factionIds: ['faction-005', 'faction-006'], threshold: 100 }
    },
    enabled: true,
    createdAt: '2026-01-01T00:00:00Z',
    lastTriggered: '2026-01-18T09:00:00Z'
  },
  {
    id: 'monitor-004',
    name: 'Judicial Safety Watch',
    description: 'Monitor threats and incidents targeting judges and court officials',
    scope: {
      mode: 'simple',
      organizationIds: ['org-013', 'org-014', 'org-015'], // Tippecanoe Superior Court, Indiana Supreme Court, Lafayette PD
      personIds: ['person-009', 'person-011'], // Judge Meyer, Chief Justice Rush
      locationIds: ['loc-007'], // Lafayette, Indiana
      logic: 'AND' // Match narratives containing ALL: (any org) AND (any person) AND (location)
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: true,
      volumeSpike: { threshold: 200, timeWindow: '12h' },
      sentimentShift: null,
      factionEngagement: null
    },
    enabled: true,
    createdAt: '2026-01-19T16:00:00Z',
    lastTriggered: '2026-01-20T10:00:00Z'
  },
  {
    id: 'monitor-005',
    name: 'US-European Relations',
    description: 'Track geopolitical tensions between US and European allies, particularly around Greenland',
    scope: {
      mode: 'simple',
      personIds: ['person-004', 'person-005', 'person-006'], // Macron, von der Leyen, Greenland PM
      organizationIds: ['org-008', 'org-009'], // European Commission, World Economic Forum
      locationIds: ['loc-005', 'loc-006'], // Davos, Greenland
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
      volumeSpike: { threshold: 300, timeWindow: '24h' },
      sentimentShift: { threshold: 0.20, direction: 'negative' },
      factionEngagement: null
    },
    enabled: false, // Paused
    createdAt: '2026-01-15T00:00:00Z',
    lastTriggered: '2026-01-20T13:00:00Z'
  }
];

export const alerts = [
  {
    id: 'alert-001',
    monitorId: 'monitor-001',
    type: 'volume_spike',
    title: 'Volume spike: Immigration Enforcement Activity',
    description: '728 mentions detected in 24 hours, exceeding threshold of 500',
    severity: 'high',
    triggeredAt: '2026-01-20T14:30:00Z',
    acknowledged: false,
    relatedNarrativeIds: ['narr-006', 'narr-008', 'narr-009'],
    relatedThemeIds: ['sub-012', 'sub-013', 'sub-018'],
    relatedEventIds: ['event-010', 'event-017'],
    relatedSubEventIds: [],
    metadata: {
      actualValue: 728,
      threshold: 500,
      timeWindow: '24h',
      percentOver: 45.6
    }
  },
  {
    id: 'alert-002',
    monitorId: 'monitor-001',
    type: 'new_event',
    title: 'New event: Church protest targeting ICE pastor',
    description: 'Protesters disrupted Sunday service at Cities Church, targeting ICE official David Easterwood',
    severity: 'medium',
    triggeredAt: '2026-01-19T11:00:00Z',
    acknowledged: true,
    relatedNarrativeIds: ['narr-008'],
    relatedThemeIds: ['sub-018', 'sub-021'],
    relatedEventIds: ['event-017'],
    relatedSubEventIds: ['event-018', 'event-019', 'event-020'],
    metadata: {
      eventId: 'event-017',
      eventText: 'Protesters disrupt Cities Church service targeting ICE official pastor'
    }
  },
  {
    id: 'alert-003',
    monitorId: 'monitor-002',
    type: 'sentiment_shift',
    title: 'Sentiment shift: Trump Administration Actions',
    description: '-23% sentiment change detected following Greenland diplomatic message leak',
    severity: 'medium',
    triggeredAt: '2026-01-20T11:30:00Z',
    acknowledged: false,
    relatedNarrativeIds: ['narr-005'],
    relatedThemeIds: ['sub-010'],
    relatedEventIds: ['event-007'],
    relatedSubEventIds: [],
    metadata: {
      previousSentiment: -0.29,
      currentSentiment: -0.52,
      delta: -0.23,
      direction: 'negative'
    }
  },
  {
    id: 'alert-004',
    monitorId: 'monitor-003',
    type: 'new_narrative',
    title: 'New narrative: RFK Jr dietary guidelines controversy',
    description: 'New meat-heavy dietary guidelines face backlash over environmental and health impacts',
    severity: 'high',
    triggeredAt: '2026-01-18T09:00:00Z',
    acknowledged: true,
    relatedNarrativeIds: ['narr-010'],
    relatedThemeIds: ['sub-025', 'sub-026', 'sub-027'],
    relatedEventIds: ['event-026'],
    relatedSubEventIds: [],
    metadata: {
      narrativeId: 'narr-010',
      narrativeText: "RFK Jr's meat-heavy dietary guidelines face backlash over environmental and health impacts"
    }
  },
  {
    id: 'alert-005',
    monitorId: 'monitor-003',
    type: 'faction_engagement',
    title: 'High faction engagement: Health policy narratives',
    description: 'Health Activists and Vegans factions showing elevated engagement (360+ combined volume)',
    severity: 'medium',
    triggeredAt: '2026-01-20T08:00:00Z',
    acknowledged: false,
    relatedNarrativeIds: ['narr-010', 'narr-003'],
    relatedThemeIds: ['sub-006', 'sub-026'],
    relatedEventIds: [],
    relatedSubEventIds: [],
    metadata: {
      factionEngagement: {
        'faction-005': 195,
        'faction-006': 165
      },
      threshold: 100,
      totalVolume: 360
    }
  },
  {
    id: 'alert-006',
    monitorId: 'monitor-004',
    type: 'new_event',
    title: 'Breaking: Indiana judge shot at home',
    description: 'Tippecanoe Superior Court Judge Steven Meyer and wife shot at their Lafayette home',
    severity: 'critical',
    triggeredAt: '2026-01-19T16:00:00Z',
    acknowledged: true,
    relatedNarrativeIds: ['narr-007'],
    relatedThemeIds: ['sub-016'],
    relatedEventIds: ['event-015'],
    relatedSubEventIds: ['event-016'],
    metadata: {
      eventId: 'event-015',
      eventText: 'Indiana Judge Steven Meyer and wife shot at home'
    }
  },
  {
    id: 'alert-007',
    monitorId: 'monitor-004',
    type: 'volume_spike',
    title: 'Volume spike: Judicial Safety Watch',
    description: '265 mentions in 12 hours following judge shooting, exceeding threshold of 200',
    severity: 'high',
    triggeredAt: '2026-01-20T10:00:00Z',
    acknowledged: false,
    relatedNarrativeIds: ['narr-007'],
    relatedThemeIds: ['sub-016', 'sub-017'],
    relatedEventIds: ['event-015', 'event-016'],
    relatedSubEventIds: [],
    metadata: {
      actualValue: 265,
      threshold: 200,
      timeWindow: '12h',
      percentOver: 32.5
    }
  }
];
