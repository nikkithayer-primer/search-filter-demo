/**
 * Monitors and alerts for Singapore MCO dataset
 */

export const monitors = [
  {
    id: 'monitor-001',
    name: 'NS Sentiment Tracker',
    description: 'Track narratives and social media discourse around National Service policies, duration, and perceived fairness',
    scope: {
      mode: 'simple',
      organizationIds: ['org-001', 'org-002', 'org-015'], // MINDEF, SAF, NEXUS
      factionIds: ['faction-002'], // NS Policy Critics
      keywords: ['NS unfair', 'reservist', 'deferment', 'two years', 'conscription'],
      logic: 'OR'
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
      factionEngagement: { factionIds: ['faction-002'], threshold: 150 }
    },
    enabled: true,
    createdAt: '2025-01-15T00:00:00Z',
    lastTriggered: '2025-10-25T20:00:00+08:00'
  },
  {
    id: 'monitor-002',
    name: 'SAF Incident Watch',
    description: 'Monitor for training incidents, accidents, and safety concerns affecting SAF personnel',
    scope: {
      mode: 'simple',
      organizationIds: ['org-002', 'org-003', 'org-004', 'org-005'], // SAF and services
      locationIds: ['loc-003'], // Pulau Tekong
      keywords: ['accident', 'death', 'injury', 'training incident', 'safety'],
      logic: 'OR'
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: true,
      volumeSpike: { threshold: 300, timeWindow: '12h' },
      sentimentShift: { threshold: 0.20, direction: 'negative' },
      factionEngagement: null
    },
    enabled: true,
    createdAt: '2025-01-15T00:00:00Z',
    lastTriggered: '2025-08-15T18:30:00+08:00'
  },
  {
    id: 'monitor-003',
    name: 'PRC Influence Detection',
    description: 'Identify narratives and campaigns linked to PRC state actors or amplified by PRC-aligned voices',
    scope: {
      mode: 'simple',
      organizationIds: ['org-017', 'org-018', 'org-019'], // Chinese MFA, Global Times, Xinhua
      factionIds: ['faction-003', 'faction-004'], // PRC-aligned, Foreign State Actors
      personIds: ['person-012', 'person-021'], // Hu Xijin, Zhao Lijian
      keywords: ['US proxy', 'Western bias', 'motherland', 'ancestral homeland'],
      logic: 'OR'
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: true,
      volumeSpike: { threshold: 250, timeWindow: '24h' },
      sentimentShift: { threshold: 0.15, direction: 'any' },
      factionEngagement: { factionIds: ['faction-003', 'faction-004'], threshold: 100 }
    },
    enabled: true,
    createdAt: '2025-01-15T00:00:00Z',
    lastTriggered: '2026-01-15T14:00:00+08:00'
  },
  {
    id: 'monitor-004',
    name: 'Racial Harmony Monitor',
    description: 'Track content that could inflame racial or religious tensions in Singapore',
    scope: {
      mode: 'simple',
      factionIds: ['faction-008'], // Ethno-Religious Provocateurs
      keywords: ['race', 'religion', 'CECA', 'foreign talent', 'PRCs', 'Indians'],
      logic: 'OR'
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
      sentimentShift: { threshold: 0.20, direction: 'negative' },
      factionEngagement: { factionIds: ['faction-008'], threshold: 50 }
    },
    enabled: true,
    createdAt: '2025-01-15T00:00:00Z',
    lastTriggered: '2025-11-28T19:00:00+08:00'
  },
  {
    id: 'monitor-005',
    name: 'Malaysia Relations Watch',
    description: 'Monitor narratives affecting Singapore-Malaysia bilateral relations',
    scope: {
      mode: 'simple',
      personIds: ['person-004', 'person-014'], // Anwar, Johor Sultan
      factionIds: ['faction-005'], // Malaysian Nationalist Voices
      locationIds: ['loc-004', 'loc-005', 'loc-010'], // KL, JB, Pedra Branca
      keywords: ['water agreement', 'airspace', 'Johor', 'RTS Link'],
      logic: 'OR'
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
      sentimentShift: { threshold: 0.15, direction: 'negative' },
      factionEngagement: { factionIds: ['faction-005'], threshold: 80 }
    },
    enabled: true,
    createdAt: '2025-01-15T00:00:00Z',
    lastTriggered: '2026-01-22T18:00:00+08:00'
  },
  {
    id: 'monitor-006',
    name: 'Coordinated Campaign Detection',
    description: 'Detect potential coordinated inauthentic behavior targeting Singapore discourse',
    scope: {
      mode: 'simple',
      factionIds: ['faction-004'], // Foreign State Actors
      keywords: ['coordinated', 'network', 'campaign'],
      logic: 'OR'
    },
    options: {
      includeSubEvents: true,
      includeThemes: true,
      includeRelatedEvents: true
    },
    triggers: {
      newNarrative: true,
      newEvent: false,
      volumeSpike: { threshold: 150, timeWindow: '12h' },
      sentimentShift: null,
      factionEngagement: { factionIds: ['faction-004'], threshold: 30 }
    },
    enabled: true,
    createdAt: '2025-01-15T00:00:00Z',
    lastTriggered: '2025-10-08T14:00:00+08:00'
  }
];

export const alerts = [
  {
    id: 'alert-001',
    monitorId: 'monitor-002',
    type: 'new_event',
    title: 'CRITICAL: NSF fatality during training at Pulau Tekong',
    description: 'A 19-year-old NSF died during training exercise at BMTC. High volume expected.',
    severity: 'critical',
    triggeredAt: '2025-08-15T18:30:00+08:00',
    acknowledged: true,
    relatedNarrativeIds: ['narr-002'],
    relatedThemeIds: ['sub-004'],
    relatedEventIds: ['event-001'],
    relatedSubEventIds: ['event-002'],
    relatedPersonIds: ['person-001', 'person-002'],
    relatedOrganizationIds: ['org-001', 'org-002'],
    relatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-003'],
    metadata: {
      eventId: 'event-001',
      eventText: 'SAF training incident at Pulau Tekong results in NSF fatality'
    }
  },
  {
    id: 'alert-002',
    monitorId: 'monitor-002',
    type: 'volume_spike',
    title: 'Volume spike: SAF training incident discourse',
    description: '685 mentions in 24 hours following training fatality, exceeding threshold of 300',
    severity: 'high',
    triggeredAt: '2025-08-18T12:00:00+08:00',
    acknowledged: true,
    relatedNarrativeIds: ['narr-002'],
    relatedThemeIds: ['sub-004', 'sub-005'],
    relatedEventIds: ['event-001', 'event-002'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: ['faction-002', 'faction-007'],
    relatedLocationIds: [],
    metadata: {
      actualValue: 685,
      threshold: 300,
      timeWindow: '24h',
      percentOver: 128.3
    }
  },
  {
    id: 'alert-003',
    monitorId: 'monitor-001',
    type: 'volume_spike',
    title: 'Volume spike: NS policy debate following viral TikTok',
    description: '485 mentions in 24 hours as viral video triggers NS duration debate',
    severity: 'medium',
    triggeredAt: '2025-09-08T20:00:00+08:00',
    acknowledged: true,
    relatedNarrativeIds: ['narr-001'],
    relatedThemeIds: ['sub-001'],
    relatedEventIds: ['event-003'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: ['faction-002'],
    relatedLocationIds: [],
    metadata: {
      actualValue: 485,
      threshold: 400,
      timeWindow: '24h',
      percentOver: 21.25
    }
  },
  {
    id: 'alert-004',
    monitorId: 'monitor-006',
    type: 'new_narrative',
    title: 'New narrative: Coordinated anti-NS campaign detected',
    description: 'Network analysis identified coordinated inauthentic behavior targeting NS policies',
    severity: 'high',
    triggeredAt: '2025-10-08T14:00:00+08:00',
    acknowledged: true,
    relatedNarrativeIds: ['narr-008'],
    relatedThemeIds: ['sub-016', 'sub-017'],
    relatedEventIds: ['event-006'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-016'],
    relatedFactionIds: ['faction-004'],
    relatedLocationIds: [],
    metadata: {
      narrativeId: 'narr-008',
      narrativeText: 'Coordinated campaign undermines confidence in NS system'
    }
  },
  {
    id: 'alert-005',
    monitorId: 'monitor-003',
    type: 'new_event',
    title: 'New event: Global Times publishes anti-Singapore commentary',
    description: 'Chinese state media article suggests Singapore becoming "US pawn"',
    severity: 'medium',
    triggeredAt: '2025-10-15T08:30:00+08:00',
    acknowledged: true,
    relatedNarrativeIds: ['narr-003'],
    relatedThemeIds: ['sub-006'],
    relatedEventIds: ['event-007'],
    relatedSubEventIds: ['event-008'],
    relatedPersonIds: ['person-012'],
    relatedOrganizationIds: ['org-018'],
    relatedFactionIds: ['faction-003', 'faction-004'],
    relatedLocationIds: ['loc-006'],
    metadata: {
      eventId: 'event-007',
      eventText: 'Global Times publishes article questioning Singapore\'s defence alignment'
    }
  },
  {
    id: 'alert-006',
    monitorId: 'monitor-001',
    type: 'faction_engagement',
    title: 'High faction engagement: NS Critics on HWZ mega-thread',
    description: 'NS Critics faction showing 285 volume on viral HWZ thread',
    severity: 'medium',
    triggeredAt: '2025-10-25T20:00:00+08:00',
    acknowledged: false,
    relatedNarrativeIds: ['narr-001'],
    relatedThemeIds: ['sub-001', 'sub-002', 'sub-003'],
    relatedEventIds: ['event-009'],
    relatedSubEventIds: [],
    relatedPersonIds: ['person-016'],
    relatedOrganizationIds: [],
    relatedFactionIds: ['faction-002'],
    relatedLocationIds: [],
    metadata: {
      factionEngagement: {
        'faction-002': 285
      },
      threshold: 150,
      totalVolume: 285
    }
  },
  {
    id: 'alert-007',
    monitorId: 'monitor-004',
    type: 'new_event',
    title: 'New event: Religious confrontation at Speakers\' Corner',
    description: 'Confrontation between religious groups at Hong Lim Park generating online attention',
    severity: 'high',
    triggeredAt: '2025-11-28T19:00:00+08:00',
    acknowledged: true,
    relatedNarrativeIds: ['narr-007'],
    relatedThemeIds: ['sub-014'],
    relatedEventIds: ['event-013'],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-007'],
    relatedFactionIds: ['faction-008'],
    relatedLocationIds: ['loc-001'],
    metadata: {
      eventId: 'event-013',
      eventText: 'Religious harmony incident at Speakers\' Corner'
    }
  },
  {
    id: 'alert-008',
    monitorId: 'monitor-003',
    type: 'new_event',
    title: 'New event: Chinese embassy criticizes Singapore media',
    description: 'Chinese embassy issues statement calling Singapore media coverage "biased"',
    severity: 'medium',
    triggeredAt: '2026-01-15T10:30:00+08:00',
    acknowledged: false,
    relatedNarrativeIds: ['narr-003'],
    relatedThemeIds: ['sub-007'],
    relatedEventIds: ['event-018'],
    relatedSubEventIds: ['event-019'],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-017'],
    relatedFactionIds: ['faction-003', 'faction-004'],
    relatedLocationIds: ['loc-001'],
    metadata: {
      eventId: 'event-018',
      eventText: 'Chinese embassy issues statement on Singapore media coverage'
    }
  }
];
