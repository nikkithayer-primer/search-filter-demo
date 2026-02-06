# Route Specification: Context-Scoped Navigation

## Overview

This document specifies the routing architecture for Project Astra, implementing **context-scoped navigation** where all entity views exist within a Workspace, Monitor, or Dashboard context.

### Design Principles

1. **No global entity routes** - Entities are always viewed within a context
2. **Nested path structure** - Context is explicit in the URL hierarchy
3. **Unified scoping model** - Workspaces and Monitors both resolve to a document set
4. **Separate routes for tabs** - Dashboard and Documents views are distinct routes

---

## Route Structure

### Pattern

```
#/{context}[/{contextId}][/{entityType}[/{entityId}][/documents]]
```

| Segment | Description |
|---------|-------------|
| `context` | `workspace` \| `monitor` \| `dashboard` |
| `contextId` | Required for workspace/monitor, absent for dashboard |
| `entityType` | Entity type (singular for detail, plural for list) |
| `entityId` | Specific entity ID (absent for list views) |
| `/documents` | Optional sub-route for documents tab |

---

## Top-Level Routes

Routes for navigation and context selection (not scoped to a context).

| Route | View | Description |
|-------|------|-------------|
| `#/` | Redirect | Redirects to default start page (workspaces or dashboard) |
| `#/workspaces` | WorkspacesView | List all workspaces |
| `#/monitors` | MonitorsView | List all monitors |
| `#/search` | SearchView | Global search (creates workspace from results) |
| `#/projects` | ProjectsView | Project management |
| `#/activity` | ActivityFeedView | Activity feed |
| `#/settings` | SettingsView | Application settings |

---

## Context Entry Points

Each context has a "home" route showing its dashboard/overview.

| Route | View | Description |
|-------|------|-------------|
| `#/workspace/{workspaceId}` | WorkspaceView | Workspace dashboard with cards |
| `#/monitor/{monitorId}` | MonitorView | Monitor dashboard with alerts |
| `#/project/{projectId}` | ProjectView | Project dashboard |
| `#/dashboard` | DashboardView | Global dashboard (all data) |

### Nested Projects

Projects support hierarchical nesting, where projects can contain sub-projects. The URL structure reflects the full path from root to the current project:

```
#/{rootProjectId}/{childProjectId}/{grandchildProjectId}/
```

Examples:
- `#/project-research/` - Top-level project
- `#/project-research/project-q1-analysis/` - Child project within research
- `#/project-research/project-q1-analysis/project-china-focus/` - Grandchild project
- `#/project-research/project-q1-analysis/doc-123/` - Document within nested project

The router validates that the project chain forms a valid parent-child hierarchy. Each project in the URL must be a direct child of the previous project.

**URL Generation:** Use `buildNestedProjectRoute()` from `idUtils.js` or `DataService.getProjectPath()` to generate correct nested URLs:

```javascript
import { buildNestedProjectRoute } from './utils/idUtils.js';
import { DataService } from './data/DataService.js';

// Get full path from root to project (including the project itself)
const projectPath = DataService.getProjectPath(projectId);
const url = buildNestedProjectRoute(projectPath);
// Result: #/project-root/project-child/project-grandchild/

// With additional entity (e.g., document)
const docUrl = buildNestedProjectRoute(projectPath, docId);
// Result: #/project-root/project-child/doc-123/
```

---

## Scoped Entity Routes

All entity routes follow the same pattern within each context.

### Workspace Context

```
#/workspace/{workspaceId}/...
```

| Route | View | Description |
|-------|------|-------------|
| `.../narratives` | ListView | List narratives in workspace scope |
| `.../narrative/{id}` | NarrativeView | Narrative dashboard (scoped) |
| `.../narrative/{id}/documents` | NarrativeView | Narrative documents tab (scoped) |
| `.../themes` | ListView | List themes in workspace scope |
| `.../theme/{id}` | ThemeView | Theme dashboard (scoped) |
| `.../theme/{id}/documents` | ThemeView | Theme documents tab (scoped) |
| `.../factions` | ListView | List factions in workspace scope |
| `.../faction/{id}` | FactionView | Faction dashboard (scoped) |
| `.../faction/{id}/documents` | FactionView | Faction documents tab (scoped) |
| `.../locations` | ListView | List locations in workspace scope |
| `.../location/{id}` | LocationView | Location dashboard (scoped) |
| `.../location/{id}/documents` | LocationView | Location documents tab (scoped) |
| `.../events` | ListView | List events in workspace scope |
| `.../event/{id}` | EventView | Event dashboard (scoped) |
| `.../event/{id}/documents` | EventView | Event documents tab (scoped) |
| `.../entities` | ListView | List people + organizations in scope |
| `.../person/{id}` | PersonView | Person dashboard (scoped) |
| `.../person/{id}/documents` | PersonView | Person documents tab (scoped) |
| `.../organization/{id}` | OrganizationView | Organization dashboard (scoped) |
| `.../organization/{id}/documents` | OrganizationView | Organization documents tab (scoped) |
| `.../topics` | ListView | List topics in workspace scope |
| `.../topic/{id}` | TopicView | Topic dashboard (scoped) |
| `.../topic/{id}/documents` | TopicView | Topic documents tab (scoped) |
| `.../documents` | DocumentsView | List all documents in workspace |
| `.../document/{id}` | DocumentView | Document viewer (scoped navigation) |
| `.../tags` | TagsView | List tags in workspace scope |
| `.../tag/{id}` | TagDetailView | Tag detail (scoped) |

### Monitor Context

Identical sub-routes as workspace:

```
#/monitor/{monitorId}/narratives
#/monitor/{monitorId}/narrative/{id}
#/monitor/{monitorId}/narrative/{id}/documents
... (same pattern as workspace)
```

### Dashboard Context (Global)

No contextId required:

```
#/dashboard/narratives
#/dashboard/narrative/{id}
#/dashboard/narrative/{id}/documents
... (same pattern, scoped to all data)
```

---

## Removed Routes

The following global entity routes are **removed** in favor of context-scoped routes:

| Removed Route | Replacement |
|---------------|-------------|
| `#/narrative/{id}` | `#/{context}/narrative/{id}` |
| `#/narratives` | `#/{context}/narratives` |
| `#/theme/{id}` | `#/{context}/theme/{id}` |
| `#/faction/{id}` | `#/{context}/faction/{id}` |
| `#/factions` | `#/{context}/factions` |
| `#/location/{id}` | `#/{context}/location/{id}` |
| `#/locations` | `#/{context}/locations` |
| `#/event/{id}` | `#/{context}/event/{id}` |
| `#/events` | `#/{context}/events` |
| `#/person/{id}` | `#/{context}/person/{id}` |
| `#/organization/{id}` | `#/{context}/organization/{id}` |
| `#/entities` | `#/{context}/entities` |
| `#/topic/{id}` | `#/{context}/topic/{id}` |
| `#/topics` | `#/{context}/topics` |
| `#/document/{id}` | `#/{context}/document/{id}` |
| `#/documents` | `#/{context}/documents` |
| `#/tag/{id}` | `#/{context}/tag/{id}` |
| `#/tags` | `#/{context}/tags` |

---

## Scoping Model

### Unified Document Scope

Both Workspaces and Monitors resolve to a **document scope** - a set of document IDs that defines what data is visible within that context.

```javascript
// Conceptual interface
interface ScopedContext {
  type: 'workspace' | 'monitor' | 'dashboard';
  id: string | null;  // null for dashboard
  
  // How the document set is defined
  documentSelection: {
    mode: 'all' | 'explicit' | 'search' | 'filter';
    documentIds?: string[];      // For explicit mode
    searchQuery?: string;        // For search mode
    searchFilters?: SearchFilter; // For filter mode
  };
  
  // Resolve to actual document IDs
  getDocumentIds(): string[];
}
```

### Context Behavior

| Context | Document Selection | Typical Use |
|---------|-------------------|-------------|
| Dashboard | `mode: 'all'` | View everything, broad analysis |
| Workspace | `mode: 'explicit'` or `mode: 'search'` | Curated collection for focused analysis |
| Monitor | `mode: 'filter'` | Ongoing watch with alerts |

### Entity Scoping Rules

When viewing an entity within a context:

1. **Documents shown** - Only documents within the context's document set
2. **Aggregate stats** - Computed from scoped documents only
3. **Related entities** - Shown if they appear in scoped documents
4. **Entity metadata** - Always shown (name, description, image) even if entity has minimal presence in scope

---

## Navigation Behavior

### Link Generation

All entity links must include context. Helper function:

```javascript
function getEntityRoute(entityType, entityId, context) {
  const { type, id } = context;
  if (type === 'dashboard') {
    return `#/dashboard/${entityType}/${entityId}`;
  }
  return `#/${type}/${id}/${entityType}/${entityId}`;
}
```

### Breadcrumbs

Breadcrumbs reflect the nested structure:

```
Workspaces > Q1 Analysis > Factions > Pro-Democracy Movement
   ↓            ↓             ↓              ↓
#/workspaces  #/workspace/  .../factions  .../faction/faction-001
              ws-001
```

### Cross-Entity Navigation

When navigating from one entity to another within context:
- Stay in the same context
- Show scoped view of target entity (even if limited data)

Example: In Workspace A, viewing Person X, clicking Organization Y navigates to:
`#/workspace/ws-001/organization/org-123`

---

## Router Implementation Notes

### Route Parsing

The router should parse routes into a structured object:

```javascript
parseRoute(hash) {
  // Returns:
  {
    context: 'workspace' | 'monitor' | 'dashboard' | null,
    contextId: string | null,
    entityType: string | null,      // 'narrative', 'narratives', etc.
    entityId: string | null,
    subRoute: 'documents' | null,
    isListView: boolean             // true if entityType is plural
  }
}
```

### View Instantiation

All entity views receive context information:

```javascript
new FactionView(container, factionId, {
  context: {
    type: 'workspace',
    id: 'ws-001',
    getDocumentIds: () => [...]
  },
  ...otherOptions
});
```

### Backward Compatibility

During migration, old routes could redirect:
- `#/faction/faction-001` → `#/dashboard/faction/faction-001`

This allows bookmarks to continue working while encouraging the new model.

---

## Query Parameters

Query parameters are used for non-navigation state:

| Parameter | Usage | Example |
|-----------|-------|---------|
| `sort` | Sort order for lists | `?sort=date` |
| `page` | Pagination | `?page=2` |
| `filter` | Quick filters | `?filter=high-sentiment` |

**Not used for:**
- Context (use path segments)
- Tabs (use `/documents` sub-route)

---

## Examples

### User Flow: Workspace Analysis

1. User opens workspaces list: `#/workspaces`
2. Clicks "Q1 Campaign Analysis": `#/workspace/ws-001`
3. Clicks faction card: `#/workspace/ws-001/faction/faction-005`
4. Switches to documents tab: `#/workspace/ws-001/faction/faction-005/documents`
5. Opens a document: `#/workspace/ws-001/document/doc-123`
6. Clicks person mentioned: `#/workspace/ws-001/person/person-042`

### User Flow: Global Dashboard

1. User opens dashboard: `#/dashboard`
2. Clicks narratives section: `#/dashboard/narratives`
3. Clicks specific narrative: `#/dashboard/narrative/narr-001`
4. Sees all data across entire dataset (no scope restriction)

---

## Migration Checklist

- [ ] Update Router to parse nested routes
- [ ] Add context parameter to all entity views
- [ ] Update DataService methods to accept document scope
- [ ] Update all link generation (getEntityRoute, hardcoded hrefs)
- [ ] Update breadcrumb generation
- [ ] Update navigation components (sidebar, cards)
- [ ] Add redirects for old global routes
- [ ] Update tests
