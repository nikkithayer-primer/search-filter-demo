/**
 * Tags for the American Politics dataset
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
  // Mission tags (exclusive group - converted from missions)
  {
    id: 'tag-mission-001',
    groupId: 'tag-group-mission',
    name: 'Understand sentiment towards the American military',
    description: 'Track narratives related to US military operations, personnel, and public perception',
    color: '#4E79A7',
    sortOrder: 0
  },
  {
    id: 'tag-mission-002',
    groupId: 'tag-group-mission',
    name: 'Understand narratives around American health',
    description: 'Monitor health-related narratives including diet, healthcare policy, and wellness trends',
    color: '#59A14F',
    sortOrder: 1
  },
  {
    id: 'tag-mission-003',
    groupId: 'tag-group-mission',
    name: 'Monitor political discourse',
    description: 'Track political narratives across the spectrum',
    color: '#E15759',
    sortOrder: 2
  }
];
