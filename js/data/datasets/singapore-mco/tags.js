/**
 * Tags for the Singapore MCO dataset
 */

export const tags = [
  // Status tags (exclusive group)
  {
    id: 'tag-001',
    groupId: 'tag-group-status',
    name: 'Needs Review',
    description: 'Item requires initial review and assessment by an analyst',
    color: '#f59e0b',
    sortOrder: 0
  },
  {
    id: 'tag-002',
    groupId: 'tag-group-status',
    name: 'In Review',
    description: 'Item is currently being reviewed and analyzed by the team',
    color: '#3b82f6',
    sortOrder: 1
  },
  {
    id: 'tag-003',
    groupId: 'tag-group-status',
    name: 'Completed',
    description: 'Review and analysis has been completed for this item',
    color: '#8b5cf6',
    sortOrder: 2
  },
  // Risk tags (non-exclusive group)
  {
    id: 'tag-004',
    groupId: 'tag-group-risk',
    name: 'High Risk',
    description: 'Critical priority item requiring immediate attention and escalation',
    color: '#ef4444',
    sortOrder: 0
  },
  {
    id: 'tag-005',
    groupId: 'tag-group-risk',
    name: 'Medium Risk',
    description: 'Moderate priority item that should be addressed in the near term',
    color: '#f97316',
    sortOrder: 1
  },
  {
    id: 'tag-006',
    groupId: 'tag-group-risk',
    name: 'Low Risk',
    description: 'Lower priority item for routine monitoring and tracking',
    color: '#22c55e',
    sortOrder: 2
  },
  // Mission tags (exclusive group)
  {
    id: 'tag-mission-001',
    groupId: 'tag-group-mission',
    name: 'NS Sentiment Monitoring',
    description: 'Track narratives affecting National Service perception, enlistment attitudes, and NSman morale',
    color: '#4E79A7',
    sortOrder: 0
  },
  {
    id: 'tag-mission-002',
    groupId: 'tag-group-mission',
    name: 'SAF Capability/Readiness Perception',
    description: 'Monitor discourse on SAF operational readiness, equipment, and capability assessments',
    color: '#E15759',
    sortOrder: 1
  },
  {
    id: 'tag-mission-003',
    groupId: 'tag-group-mission',
    name: 'Foreign Influence Detection',
    description: 'Identify hostile information campaigns and foreign interference',
    color: '#59A14F',
    sortOrder: 2
  },
  {
    id: 'tag-mission-004',
    groupId: 'tag-group-mission',
    name: 'Social Cohesion Threats',
    description: 'Track race, religion, and immigration narratives undermining harmony',
    color: '#F28E2B',
    sortOrder: 3
  },
  {
    id: 'tag-mission-005',
    groupId: 'tag-group-mission',
    name: 'Regional Relations Monitoring',
    description: 'Monitor Malaysia and China relations narratives',
    color: '#B07AA1',
    sortOrder: 4
  },
  {
    id: 'tag-mission-006',
    groupId: 'tag-group-mission',
    name: 'Total Defence Undermining',
    description: 'Track narratives weakening Total Defence pillars',
    color: '#76B7B2',
    sortOrder: 5
  },
  // Origin tags (non-exclusive group)
  {
    id: 'tag-origin-001',
    groupId: 'tag-group-origin',
    name: 'Domestic',
    description: 'Content originating from within Singapore',
    color: '#6366f1',
    sortOrder: 0
  },
  {
    id: 'tag-origin-002',
    groupId: 'tag-group-origin',
    name: 'PRC-linked',
    description: 'Content suspected to be linked to PRC state actors',
    color: '#dc2626',
    sortOrder: 1
  },
  {
    id: 'tag-origin-003',
    groupId: 'tag-group-origin',
    name: 'Malaysia-linked',
    description: 'Content originating from Malaysian sources',
    color: '#0ea5e9',
    sortOrder: 2
  },
  {
    id: 'tag-origin-004',
    groupId: 'tag-group-origin',
    name: 'Unknown Attribution',
    description: 'Content with unclear or unattributed origin',
    color: '#71717a',
    sortOrder: 3
  }
];
