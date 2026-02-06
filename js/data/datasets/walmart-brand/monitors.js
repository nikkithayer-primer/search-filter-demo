/**
 * Monitors and alerts for Walmart Brand dataset
 */

export const monitors = [
  {
    id: 'monitor-001',
    name: 'Self-Checkout Complaints',
    description: 'Track customer complaints about self-checkout experiences, theft accusations, and detention incidents',
    createdAt: '2026-01-01T00:00:00Z',
    createdBy: 'user-001',
    enabled: true,
    lastTriggered: '2026-01-18T10:30:00Z',
    scope: {
      mode: 'simple',
      logic: 'OR',
      keywords: ['self-checkout', 'detained', 'theft', 'receipt check', 'loss prevention']
    },
    triggers: {
      volumeSpike: { threshold: 500, timeWindow: '24h' },
      sentimentShift: { threshold: 0.2, direction: 'negative' },
      newNarrative: true
    },
    options: {
      includeThemes: true,
      includeRelatedEvents: true
    }
  },
  {
    id: 'monitor-002',
    name: 'Product Availability Issues',
    description: 'Monitor reports of out-of-stock items and empty shelves',
    createdAt: '2026-01-01T00:00:00Z',
    createdBy: 'user-001',
    enabled: true,
    lastTriggered: '2026-01-15T13:00:00Z',
    scope: {
      mode: 'simple',
      logic: 'OR',
      keywords: ['empty shelves', 'out of stock', 'can\'t find', 'no inventory', 'bare aisles']
    },
    triggers: {
      volumeSpike: { threshold: 300, timeWindow: '24h' },
      sentimentShift: { threshold: 0.15, direction: 'negative' }
    },
    options: {
      includeThemes: true,
      includeRelatedEvents: true
    }
  },
  {
    id: 'monitor-003',
    name: 'Employee Experience Tracker',
    description: 'Track employee-generated content about working conditions',
    createdAt: '2026-01-01T00:00:00Z',
    createdBy: 'user-003',
    enabled: true,
    lastTriggered: '2026-01-15T12:00:00Z',
    scope: {
      mode: 'simple',
      logic: 'OR',
      keywords: ['walmart worker', 'walmart employee', 'understaffed', '#walmartlife', 'working conditions']
    },
    triggers: {
      volumeSpike: { threshold: 400, timeWindow: '24h' },
      sentimentShift: { threshold: 0.2, direction: 'negative' },
      factionEngagement: true
    },
    options: {
      includeThemes: true,
      includeRelatedEvents: true
    }
  },
  {
    id: 'monitor-004',
    name: 'Product Safety Alerts',
    description: 'Monitor for product recalls, safety issues, and quality concerns',
    createdAt: '2026-01-01T00:00:00Z',
    createdBy: 'user-004',
    enabled: true,
    lastTriggered: '2026-01-18T14:30:00Z',
    scope: {
      mode: 'simple',
      logic: 'OR',
      keywords: ['recall', 'contamination', 'FDA', 'safety', 'great value', 'private label']
    },
    triggers: {
      newNarrative: true,
      newEvent: true,
      volumeSpike: { threshold: 200, timeWindow: '12h' }
    },
    options: {
      includeThemes: true,
      includeRelatedEvents: true
    }
  },
  {
    id: 'monitor-005',
    name: 'Pricing Perception Monitor',
    description: 'Track discussions about Walmart pricing compared to competitors',
    createdAt: '2026-01-01T00:00:00Z',
    createdBy: 'user-002',
    enabled: true,
    lastTriggered: '2026-01-17T16:00:00Z',
    scope: {
      mode: 'simple',
      logic: 'OR',
      keywords: ['walmart prices', 'everyday low prices', 'cheaper at', 'price comparison', 'expensive']
    },
    triggers: {
      volumeSpike: { threshold: 350, timeWindow: '24h' },
      sentimentShift: { threshold: 0.15, direction: 'any' }
    },
    options: {
      includeThemes: true,
      includeRelatedEvents: true
    }
  },
  {
    id: 'monitor-006',
    name: 'Competitor Activity Tracker',
    description: 'Monitor competitor announcements and comparative coverage',
    createdAt: '2026-01-01T00:00:00Z',
    createdBy: 'user-005',
    enabled: true,
    lastTriggered: '2026-01-16T11:00:00Z',
    scope: {
      mode: 'simple',
      logic: 'OR',
      keywords: ['target', 'amazon', 'costco', 'aldi', 'delivery', 'same-day']
    },
    triggers: {
      newNarrative: true,
      newEvent: true
    },
    options: {
      includeThemes: true,
      includeRelatedEvents: true
    }
  },
  {
    id: 'monitor-007',
    name: 'Store Closure Impact',
    description: 'Track community reactions to store closures',
    createdAt: '2026-01-15T00:00:00Z',
    createdBy: 'user-002',
    enabled: true,
    lastTriggered: '2026-01-18T13:00:00Z',
    scope: {
      mode: 'simple',
      logic: 'OR',
      keywords: ['store closing', 'walmart closure', 'food desert', 'rural', 'community impact']
    },
    triggers: {
      volumeSpike: { threshold: 250, timeWindow: '24h' },
      sentimentShift: { threshold: 0.2, direction: 'negative' },
      newEvent: true
    },
    options: {
      includeThemes: true,
      includeRelatedEvents: true
    }
  }
];

export const alerts = [
  {
    id: 'alert-001',
    monitorId: 'monitor-001',
    type: 'volume_spike',
    title: 'Volume spike: Self-checkout detention video',
    description: 'Viral TikTok shows customer detained at self-checkout - 8M+ views with negative sentiment',
    triggeredAt: '2026-01-14T16:00:00Z',
    relatedNarrativeIds: ['narr-001'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-001']
    }
  },
  {
    id: 'alert-002',
    monitorId: 'monitor-001',
    type: 'new_event',
    title: 'New event: Self-checkout class-action lawsuit',
    description: 'Class-action lawsuit filed: 500+ plaintiffs alleging systematic false detention at self-checkout',
    triggeredAt: '2026-01-18T10:30:00Z',
    relatedNarrativeIds: ['narr-001'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-003']
    }
  },
  {
    id: 'alert-003',
    monitorId: 'monitor-002',
    type: 'volume_spike',
    title: 'Volume spike: Empty shelves in Chicago',
    description: 'Viral X post showing empty grocery aisles in Chicago-area stores - 2.5M views',
    triggeredAt: '2026-01-15T13:00:00Z',
    relatedNarrativeIds: ['narr-002'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: [],
    relatedLocationIds: ['loc-004'], // Chicago
    metadata: {
      documentIds: ['doc-005']
    }
  },
  {
    id: 'alert-004',
    monitorId: 'monitor-003',
    type: 'volume_spike',
    title: 'Volume spike: Walmart Employees staffing complaint',
    description: 'Walmart Employees TikTok about working alone in 3 departments goes viral - 5.2M views',
    triggeredAt: '2026-01-13T19:30:00Z',
    relatedNarrativeIds: ['narr-003'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: [],
    relatedFactionIds: ['faction-002'], // Walmart Employees
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-008']
    }
  },
  {
    id: 'alert-005',
    monitorId: 'monitor-003',
    type: 'faction_engagement',
    title: 'High faction engagement: UFCW campaign',
    description: 'United Food and Commercial Workers International Union (UFCW) launches #RespectWalmartWorkers campaign amplifying employee stories',
    triggeredAt: '2026-01-15T12:00:00Z',
    relatedNarrativeIds: ['narr-003'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-005'],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-010']
    }
  },
  {
    id: 'alert-006',
    monitorId: 'monitor-004',
    type: 'new_event',
    title: 'New event: FDA recall announcement',
    description: 'U.S. Food and Drug Administration (FDA) announces Great Value frozen vegetables recall due to Listeria contamination',
    triggeredAt: '2026-01-16T10:30:00Z',
    relatedNarrativeIds: ['narr-004'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-007'],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-012']
    }
  },
  {
    id: 'alert-007',
    monitorId: 'monitor-004',
    type: 'volume_spike',
    title: 'Volume spike: Great Value recall expansion',
    description: 'Great Value recall expanded to 15 products - 3 hospitalizations reported',
    triggeredAt: '2026-01-18T14:30:00Z',
    relatedNarrativeIds: ['narr-004'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-001'], // Walmart (Great Value)
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-013']
    }
  },
  {
    id: 'alert-008',
    monitorId: 'monitor-005',
    type: 'sentiment_shift',
    title: 'Sentiment shift: Price comparison with Aldi',
    description: 'Viral price comparison TikTok shows Walmart losing to Aldi US on most items - 4.8M views',
    triggeredAt: '2026-01-17T16:00:00Z',
    relatedNarrativeIds: ['narr-005'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-010'],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-015']
    }
  },
  {
    id: 'alert-009',
    monitorId: 'monitor-006',
    type: 'new_event',
    title: 'New event: Target delivery announcement',
    description: 'Target Corporation announces industry-leading 98% on-time delivery rates for same-day service',
    triggeredAt: '2026-01-14T09:00:00Z',
    relatedNarrativeIds: ['narr-006'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-003'],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-018']
    }
  },
  {
    id: 'alert-010',
    monitorId: 'monitor-006',
    type: 'new_event',
    title: 'New event: Amazon delivery expansion',
    description: 'Amazon.com Inc. announces sub-24-hour delivery now available to 85% of US households',
    triggeredAt: '2026-01-16T11:00:00Z',
    relatedNarrativeIds: ['narr-006'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-004'],
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-019']
    }
  },
  {
    id: 'alert-011',
    monitorId: 'monitor-007',
    type: 'new_narrative',
    title: 'New narrative: Missouri food desert',
    description: 'Missouri town faces food desert after Walmart closure - community protests emerging',
    triggeredAt: '2026-01-18T13:00:00Z',
    relatedNarrativeIds: ['narr-007'],
    relatedThemeIds: [],
    relatedEventIds: [],
    relatedSubEventIds: [],
    relatedPersonIds: [],
    relatedOrganizationIds: ['org-001'], // Walmart
    relatedFactionIds: [],
    relatedLocationIds: [],
    metadata: {
      documentIds: ['doc-021', 'doc-022']
    }
  }
];
