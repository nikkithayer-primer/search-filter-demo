/**
 * China Semiconductor dataset
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
import { monitors, alerts } from './monitors.js';
import { topics } from './topics.js';
import { searchFilters } from './searchFilters.js';
import { tagGroups } from './tagGroups.js';
import { tags } from './tags.js';

// Workspaces - saved search results with document collections
export const workspaces = [
  {
    id: 'workspace-001',
    name: 'SMIC Export Controls',
    query: 'SMIC export controls sanctions',
    description: 'Tracking coverage of export restrictions on Chinese semiconductor manufacturers',
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
    filters: {},
    status: 'active',
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-01-25T16:00:00Z'
  },
  {
    id: 'workspace-002',
    name: 'Chip Technology Race',
    query: 'chip technology advancement domestic production',
    description: 'Analysis of China domestic chip capabilities vs foreign technology',
    documentIds: ['doc-005', 'doc-006', 'doc-007'],
    filters: {},
    status: 'active',
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-01-24T14:30:00Z'
  },
  {
    id: 'workspace-003',
    name: 'Taiwan Tensions',
    query: 'Taiwan TSMC supply chain risk',
    description: 'Archived research on Taiwan semiconductor supply chain risks',
    documentIds: ['doc-008', 'doc-009'],
    filters: {},
    status: 'archived',
    createdAt: '2026-01-05T09:00:00Z',
    updatedAt: '2026-01-15T11:00:00Z'
  }
];

// Projects - manually curated document collections for research and reporting
export const projects = [
  {
    id: 'project-001',
    name: 'Export Control Impact Assessment',
    description: 'Evidence base for analyzing effects of US export restrictions on Chinese chip industry',
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-010', 'doc-011'],
    status: 'active',
    createdAt: '2026-01-08T09:00:00Z',
    updatedAt: '2026-01-26T10:30:00Z'
  },
  {
    id: 'project-002',
    name: 'SMIC Technical Capabilities',
    description: 'Technical documentation on SMIC production capabilities and limitations',
    documentIds: ['doc-004', 'doc-005', 'doc-012', 'doc-013'],
    status: 'active',
    createdAt: '2026-01-12T14:00:00Z',
    updatedAt: '2026-01-24T09:00:00Z'
  },
  {
    id: 'project-003',
    name: 'Unsorted',
    description: 'Uncategorized documents pending review and classification',
    documentIds: ['doc-006', 'doc-008', 'doc-014', 'doc-015', 'doc-018'],
    status: 'active',
    createdAt: '2026-01-18T11:00:00Z',
    updatedAt: '2026-01-26T14:00:00Z'
  }
];

export const datasetId = 'china-semiconductor';
export const datasetName = 'China Semiconductor';

// Default settings for this dataset
export const defaultSettings = {
  copEnabled: false,
  defaultStartPage: 'search',
  defaultViewTab: 'documents',
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
  monitors,
  alerts,
  topics,
  workspaces,
  projects,
  searchFilters,
  tagGroups,
  tags
};

export default mockData;
