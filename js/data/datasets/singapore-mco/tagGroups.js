/**
 * Tag Groups for the Singapore MCO dataset
 */

export const tagGroups = [
  {
    id: 'tag-group-status',
    name: 'Status',
    description: 'Workflow status for tracking review progress',
    exclusive: true,
    color: '#3b82f6',
    sortOrder: 0
  },
  {
    id: 'tag-group-risk',
    name: 'Risk',
    description: 'Risk assessment levels for prioritization',
    exclusive: false,
    color: '#ef4444',
    sortOrder: 1
  },
  {
    id: 'tag-group-mission',
    name: 'Mission',
    description: 'Analysis missions grouping related narratives',
    exclusive: true,
    color: '#8b5cf6',
    sortOrder: 2
  },
  {
    id: 'tag-group-origin',
    name: 'Origin',
    description: 'Suspected origin or attribution of information',
    exclusive: false,
    color: '#f97316',
    sortOrder: 3
  }
];
