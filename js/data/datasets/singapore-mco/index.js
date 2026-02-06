/**
 * Singapore MCO dataset
 * Assembles all entity files and exports the complete mockData object
 * 
 * Dataset for MINDEF Communications Organisation (MCO) tracking:
 * - NS Sentiment Monitoring
 * - SAF Capability/Readiness Perception
 * - Foreign Influence Detection
 * - Social Cohesion Threats
 * - Regional Relations Monitoring
 * - Total Defence Undermining
 */

import { publishers, publisherCategories } from './publishers.js';
import { repositories } from './repositories.js';
import { users } from './users.js';
import { missions } from './missions.js';
import { narratives } from './narratives.js';
import { themes } from './themes.js';
import { factions, factionOverlaps } from './factions.js';
import { persons, organizations } from './entities.js';
import { locations } from './locations.js';
import { events } from './events.js';
import { documents } from './documents.js';
import { topics } from './topics.js';
import { monitors, alerts } from './monitors.js';
import { searchFilters } from './searchFilters.js';
import { tagGroups } from './tagGroups.js';
import { tags } from './tags.js';

// Workspaces - saved search results with document collections
export const workspaces = [
  {
    id: 'workspace-001',
    name: 'NS Policy Discourse Analysis',
    query: 'NS duration fairness policy review',
    description: 'Tracking narratives around National Service policies, duration debates, and perceived inequities',
    documentIds: ['doc-002', 'doc-004', 'doc-005', 'doc-016', 'doc-017', 'doc-029'],
    filters: {},
    status: 'active',
    createdAt: '2025-09-01T10:00:00+08:00',
    updatedAt: '2025-10-27T09:00:00+08:00'
  },
  {
    id: 'workspace-002',
    name: 'PRC Influence Monitoring',
    query: 'China influence state media coordination',
    description: 'Tracking PRC-linked narratives and potential influence operations targeting Singapore',
    documentIds: ['doc-013', 'doc-014', 'doc-015', 'doc-032', 'doc-033', 'doc-034'],
    filters: {},
    status: 'active',
    createdAt: '2025-10-15T11:00:00+08:00',
    updatedAt: '2026-01-16T15:00:00+08:00'
  },
  {
    id: 'workspace-003',
    name: 'Malaysia Relations Watch',
    query: 'Malaysia water agreement bilateral relations',
    description: 'Monitoring Singapore-Malaysia bilateral issues and Malaysian nationalist narratives',
    documentIds: ['doc-008', 'doc-009', 'doc-010', 'doc-027', 'doc-028', 'doc-035', 'doc-036'],
    filters: {},
    status: 'active',
    createdAt: '2025-09-20T08:00:00+08:00',
    updatedAt: '2026-01-23T12:00:00+08:00'
  },
  {
    id: 'workspace-004',
    name: 'SAF Training Incidents',
    query: 'SAF training safety incident fatality',
    description: 'Archived research on SAF training incidents and safety discourse',
    documentIds: ['doc-001', 'doc-002', 'doc-003'],
    filters: {},
    status: 'archived',
    createdAt: '2025-08-15T08:00:00+08:00',
    updatedAt: '2025-09-15T12:00:00+08:00'
  }
];

// Projects - manually curated document collections for research and reporting
export const projects = [
  {
    id: 'project-001',
    name: 'Q4 2025 Foreign Influence Assessment',
    description: 'Curated documents for the quarterly foreign influence operations assessment report',
    documentIds: ['doc-011', 'doc-012', 'doc-013', 'doc-014', 'doc-015', 'doc-032', 'doc-033', 'doc-034'],
    status: 'active',
    createdAt: '2025-10-01T09:00:00+08:00',
    updatedAt: '2026-01-20T14:30:00+08:00'
  },
  {
    id: 'project-002',
    name: 'NS Narrative Trends Brief',
    description: 'Evidence collection for ongoing coverage of NS policy discourse',
    documentIds: ['doc-002', 'doc-004', 'doc-005', 'doc-016', 'doc-017', 'doc-018', 'doc-019', 'doc-029'],
    status: 'active',
    createdAt: '2025-09-05T08:00:00+08:00',
    updatedAt: '2025-12-18T11:00:00+08:00'
  },
  {
    id: 'project-003',
    name: 'Training Incident Response',
    description: 'Background research on training safety discourse - archived after report completion',
    documentIds: ['doc-001', 'doc-002', 'doc-003'],
    status: 'archived',
    createdAt: '2025-08-15T10:00:00+08:00',
    updatedAt: '2025-09-30T16:00:00+08:00'
  },
  {
    id: 'project-004',
    name: 'Social Cohesion Risk Assessment',
    description: 'Documents tracking racial/religious tension indicators and provocateur activity',
    documentIds: ['doc-020', 'doc-021', 'doc-022', 'doc-023', 'doc-024'],
    status: 'active',
    createdAt: '2025-11-12T09:00:00+08:00',
    updatedAt: '2025-11-29T17:00:00+08:00'
  },
  {
    id: 'project-005',
    name: 'Unsorted',
    description: 'Uncategorized documents pending review and classification',
    documentIds: ['doc-006', 'doc-007', 'doc-025', 'doc-026', 'doc-030', 'doc-031'],
    status: 'active',
    createdAt: '2025-12-01T10:00:00+08:00',
    updatedAt: '2026-01-15T16:00:00+08:00'
  }
];

export const datasetId = 'singapore-mco';
export const datasetName = 'Singapore MCO';

// Default settings for this dataset
export const defaultSettings = {
  copEnabled: true,
  defaultStartPage: 'cop',
  defaultViewTab: 'dashboard',
  showClassification: true
};

export const mockData = {
  publishers,
  publisherCategories,
  repositories,
  users,
  missions,
  narratives,
  themes,
  factions,
  factionOverlaps,
  locations,
  events,
  persons,
  organizations,
  documents,
  topics,
  monitors,
  alerts,
  workspaces,
  projects,
  searchFilters,
  tagGroups,
  tags
};

export default mockData;
