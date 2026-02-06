/**
 * Walmart Brand dataset
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
    name: 'Self-Checkout Customer Experience',
    query: 'self checkout detention customer',
    description: 'Tracking viral posts and news about self-checkout issues',
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
    filters: {},
    status: 'active',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-25T14:30:00Z'
  },
  {
    id: 'workspace-002',
    name: 'Legal & Lawsuit Coverage',
    query: 'lawsuit class action legal',
    description: 'Monitoring legal developments and class action news',
    documentIds: ['doc-003', 'doc-010'],
    filters: {},
    status: 'active',
    createdAt: '2026-01-18T09:00:00Z',
    updatedAt: '2026-01-24T11:00:00Z'
  },
  {
    id: 'workspace-003',
    name: 'Competitor Analysis',
    query: 'target costco amazon grocery',
    description: 'Archived research on competitor mentions',
    documentIds: ['doc-005', 'doc-006'],
    filters: {},
    status: 'archived',
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-01-12T16:00:00Z'
  }
];

// Projects - manually curated document collections for research and reporting
export const projects = [
  {
    id: 'project-001',
    name: 'Self-Checkout Crisis Response',
    description: 'Key documents for responding to self-checkout detention viral story',
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-007'],
    status: 'active',
    createdAt: '2026-01-16T08:00:00Z',
    updatedAt: '2026-01-26T15:00:00Z'
  },
  {
    id: 'project-002',
    name: 'Legal Exposure Analysis',
    description: 'Documents related to class action lawsuit and legal risk assessment',
    documentIds: ['doc-003', 'doc-010', 'doc-011'],
    status: 'active',
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-25T09:30:00Z'
  },
  {
    id: 'project-003',
    name: 'Unsorted',
    description: 'Uncategorized documents pending review and classification',
    documentIds: ['doc-005', 'doc-008', 'doc-009', 'doc-012'],
    status: 'active',
    createdAt: '2026-01-22T09:00:00Z',
    updatedAt: '2026-01-26T11:00:00Z'
  }
];

export const datasetId = 'walmart-brand';
export const datasetName = 'Walmart Brand';

// Default settings for this dataset
export const defaultSettings = {
  copEnabled: true,
  defaultStartPage: 'monitors',
  defaultViewTab: 'dashboard',
  showClassification: false
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
