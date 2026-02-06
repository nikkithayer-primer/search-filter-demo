/**
 * American Politics dataset
 * Assembles all entity files and exports the complete mockData object
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
    name: 'Election Integrity 2024',
    query: 'election fraud voting security',
    description: 'Tracking narratives around election security and voter fraud claims',
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-005'],
    filters: {},
    status: 'active',
    createdAt: '2026-01-08T10:00:00Z',
    updatedAt: '2026-01-26T09:00:00Z'
  },
  {
    id: 'workspace-002',
    name: 'Immigration Policy Debate',
    query: 'immigration border policy reform',
    description: 'Coverage of immigration policy discussions and border security',
    documentIds: ['doc-006', 'doc-007', 'doc-008'],
    filters: {},
    status: 'active',
    createdAt: '2026-01-14T11:00:00Z',
    updatedAt: '2026-01-23T15:00:00Z'
  },
  {
    id: 'workspace-003',
    name: 'Economic Policy Analysis',
    query: 'economy inflation jobs policy',
    description: 'Archived research on economic narratives',
    documentIds: ['doc-009', 'doc-010'],
    filters: {},
    status: 'archived',
    createdAt: '2026-01-02T08:00:00Z',
    updatedAt: '2026-01-10T12:00:00Z'
  }
];

// Projects - manually curated document collections for research and reporting
export const projects = [
  {
    id: 'project-001',
    name: 'Q1 Immigration Policy Brief',
    description: 'Curated documents for the quarterly immigration policy analysis report',
    documentIds: ['doc-006', 'doc-007', 'doc-008', 'doc-020', 'doc-021', 'doc-022'],
    status: 'active',
    createdAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-01-25T14:30:00Z'
  },
  {
    id: 'project-002',
    name: 'Trump Administration Actions',
    description: 'Evidence collection for ongoing coverage of administration policy moves',
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-009', 'doc-010', 'doc-011', 'doc-012'],
    status: 'active',
    createdAt: '2026-01-05T08:00:00Z',
    updatedAt: '2026-01-28T11:00:00Z'
  },
  {
    id: 'project-003',
    name: 'Judicial Safety Research',
    description: 'Background research on threats to judiciary - archived after report completion',
    documentIds: ['doc-030', 'doc-031', 'doc-032'],
    status: 'archived',
    createdAt: '2025-12-15T10:00:00Z',
    updatedAt: '2026-01-08T16:00:00Z'
  },
  {
    id: 'project-004',
    name: 'Unsorted',
    description: 'Uncategorized documents pending review and classification',
    documentIds: ['doc-015', 'doc-018', 'doc-025', 'doc-028', 'doc-035'],
    status: 'active',
    createdAt: '2026-01-20T12:00:00Z',
    updatedAt: '2026-01-28T09:00:00Z'
  }
];

export const datasetId = 'american-politics';
export const datasetName = 'American Politics';

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
