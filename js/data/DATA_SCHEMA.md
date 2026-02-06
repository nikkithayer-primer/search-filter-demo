# Project Astra Data Schema Reference

This document defines the complete data model for the Primer Intelligence Dashboard.
When creating or modifying data types, use this schema reference to ensure correct field names, types, and relationships.

---

## Data Architecture: Document-Centric Model

This system follows an **ingest-first, document-centric** architecture that mirrors a real intelligence pipeline:

```
Documents (ingested, each has extracted entities + factions)
    ↓ aggregation
Narratives, Themes, Topics (derived from document clusters)
```

**Key principle:** Documents are the atomic unit of measurement. Faction volume, sentiment, and publisher breakdowns are **computed by aggregating across documents**, not stored as hand-crafted values on narratives.

### What Gets Extracted Per Document (Ingest)
- People, Organizations, Locations, Events mentioned
- Factions detected and their sentiment in this document
- Publisher source

### What Gets Computed (Aggregation via DataService)
- Narrative/Theme faction data → count docs per faction, average sentiment
- Volume over time → group docs by date, count per faction/publisher
- Faction sources → group by (faction, publisher), count docs

See **DataService Aggregation Methods** section below for implementation details.

---

## Entity ID Conventions

Each entity type uses a specific ID prefix. IDs are generated as `{prefix}-{timestamp}-{random}`.

| Entity | Prefix | Example |
|--------|--------|---------|
| Mission | `mission-` | `mission-1706234567890-abc123def` |
| Narrative | `narr-` | `narr-1706234567890-abc123def` |
| Theme | `sub-` | `sub-1706234567890-abc123def` |
| Faction | `faction-` | `faction-1706234567890-abc123def` |
| Location | `loc-` | `loc-1706234567890-abc123def` |
| Event | `event-` | `event-1706234567890-abc123def` |
| Person | `person-` | `person-1706234567890-abc123def` |
| Organization | `org-` | `org-1706234567890-abc123def` |
| Topic | `topic-` | `topic-1706234567890-abc123def` |
| Document | `doc-` | `doc-1706234567890-abc123def` |
| Repository | `repo-` | `repo-news`, `repo-osint`, `repo-edl` |
| Monitor | `monitor-` | `monitor-1706234567890-abc123def` |
| SearchFilter | `filter-` | `filter-1706234567890-abc123def` |
| Workspace | `workspace-` | `workspace-1706234567890-abc123def` |
| Publisher | `pub-` | `pub-facebook`, `pub-nat-cnn` |
| User | `user-` | `user-001` |
| Alert | `alert-` | `alert-001` |
| Tag | `tag-` | `tag-1706234567890-abc123def` |

---

## Core Intelligence Model

### Mission (DEPRECATED)

> **Note:** Mission is being replaced by the TagGroup system. Missions are now represented as tags in the "Mission" tag group. The `narrative.missionId` field is deprecated in favor of `narrative.tagIds` containing mission tags.

```javascript
{
  id: string,              // Required. Prefix: 'mission-'
  name: string,            // Required. Mission name
  description: string,     // Optional. Mission details
  color: string,           // Optional. Hex color for UI (auto-generated if not provided)
  createdAt: datetime,     // Auto-generated
  updatedAt: datetime      // Auto-updated
}
```

### Narrative

Disinformation or propaganda narrative being tracked. Faction engagement data is **computed from linked documents**, not stored on the narrative.

```javascript
{
  id: string,              // Required. Prefix: 'narr-'
  missionId: string,       // DEPRECATED. Use tagIds with Mission group tags instead
  text: string,            // Required. Short title identifying the narrative
  description: string,     // Optional. Detailed description
  sentiment: number,       // Optional. -1.0 to 1.0 (editorial/manual assessment)
  tagIds: string[],        // Optional. FKs to Tag (includes Mission tags)
  themeIds: string[],      // Auto-managed. FKs to Theme
  personIds: string[],         // Optional. FKs to Person
  organizationIds: string[],   // Optional. FKs to Organization
  locationIds: string[],       // Optional. FKs to Location
  eventIds: string[],          // Optional. FKs to Event
  documentIds: string[],       // Required. FKs to Document (source of truth for volume)
  createdAt: datetime,
  updatedAt: datetime
}
```

**Computed via DataService** (not stored on narrative):
- `factionMentions` → `DataService.getAggregateFactionMentionsForNarrative(narrativeId)`
- `publisherVolumes` → `DataService.getAggregatePublisherVolumesForNarrative(narrativeId)`
- `factionSources` → `DataService.getFactionSourcesForNarrative(narrativeId)`
- `volumeOverTime` → `DataService.getVolumeOverTimeForNarrative(narrativeId)`

### Theme

Sub-components or variations of a parent narrative. Like narratives, faction data is **computed from linked documents**.

```javascript
{
  id: string,              // Required. Prefix: 'sub-'
  parentNarrativeId: string, // Required. FK to Narrative
  text: string,            // Required. Theme title
  sentiment: number,       // Optional. -1.0 to 1.0 (editorial/manual assessment)
  personIds: string[],
  organizationIds: string[],
  locationIds: string[],
  eventIds: string[],
  documentIds: string[],   // Required. FKs to Document (source of truth for volume)
  createdAt: datetime,
  updatedAt: datetime
}
```

**Computed via DataService** (same pattern as Narrative):
- `factionMentions` → `DataService.getAggregateFactionMentionsForTheme(themeId)`
- `volumeOverTime` → `DataService.getVolumeOverTimeForTheme(themeId)`

### Faction

Groups pushing specific narratives or viewpoints.

```javascript
{
  id: string,              // Required. Prefix: 'faction-'
  name: string,            // Required. Faction name
  description: string,     // Optional. Detailed description
  color: string,           // Optional. Hex color (auto-generated)
  relatedFactionIds: string[], // Optional. FKs to related Factions
  memberCount: number,     // Optional. Estimated members
  affiliatedPersonIds: string[],       // Optional. FKs to Person
  affiliatedOrganizationIds: string[], // Optional. FKs to Organization
  documentIds: string[],   // Optional. FKs to Document (source of truth for volume)
  createdAt: datetime,
  updatedAt: datetime
}
```

### FactionOverlap

Represents overlapping membership between factions. No ID prefix (identified by factionIds tuple).

```javascript
{
  factionIds: string[],    // Required. Two faction IDs
  overlapSize: number,     // Optional. Shared member count
  sharedSentiment: {       // Optional. Shared sentiment by narrative
    [narrativeId]: number  // -1.0 to 1.0
  }
}
```

### Location

Geographic locations referenced in narratives.

```javascript
{
  id: string,              // Required. Prefix: 'loc-'
  name: string,            // Required. Location name
  description: string,     // Optional. Detailed description
  type: enum,              // Optional. 'country' | 'region' | 'city' | 'facility' | 'headquarters' | 'landmark' | 'virtual' | 'general'
  coordinates: {           // Optional.
    lat: number,
    lng: number
  },
  documentIds: string[],   // Optional. FKs to Document (source of truth for volume)
  createdAt: datetime,
  updatedAt: datetime
}
```

### Event

Significant events referenced by narratives.

```javascript
{
  id: string,              // Required. Prefix: 'event-'
  text: string,            // Required. Event title/description
  description: string,     // Optional. Detailed description
  date: datetime,          // Required. ISO 8601 timestamp
  parentEventId: string,   // Optional. FK to parent Event (for sub-events)
  subEventIds: string[],   // Auto-managed. FKs to child Events
  locationId: string,      // Optional. FK to Location
  personIds: string[],     // Optional. FKs to Person
  organizationIds: string[], // Optional. FKs to Organization
  documentIds: string[],   // Optional. FKs to Document (source of truth for volume)
  createdAt: datetime,
  updatedAt: datetime
}
```

### Person

Individuals mentioned in narratives.

```javascript
{
  id: string,              // Required. Prefix: 'person-'
  name: string,            // Required. Person's name
  description: string,     // Optional. Detailed description/bio
  type: enum,              // Optional. 'politician' | 'executive' | 'government_official' | 
                           //           'judge' | 'analyst' | 'journalist' | 'activist' | 
                           //           'labor_leader' | 'civilian' | 'employee' | 'legal_professional' | 'general'
  imageUrl: string,        // Optional. Path to profile image
  affiliatedOrganizationId: string, // Optional. FK to primary Organization
  affiliatedFactionIds: string[],   // Optional. FKs to Faction
  relatedLocationIds: string[],     // Optional. FKs to Location
  relatedEventIds: string[],        // Optional. FKs to Event
  documentIds: string[],            // Optional. FKs to Document
  factionSentiment: {      // Optional. How factions view this person
    [factionId]: number    // -1.0 (negative) to 1.0 (positive)
  },
  createdAt: datetime,
  updatedAt: datetime
}
```

### Organization

Organizations mentioned in narratives.

```javascript
{
  id: string,              // Required. Prefix: 'org-'
  name: string,            // Required. Organization name
  description: string,     // Optional. Detailed description
  type: enum,              // Optional. 'corporation' | 'government' | 'political' | 'judicial' | 
                           //           'nonprofit' | 'union' | 'media' | 'research' | 'religious' | 
                           //           'financial' | 'law_enforcement' | 'military' | 'general'
  imageUrl: string,        // Optional. Path to logo
  affiliatedFactionIds: string[],   // Optional. FKs to Faction
  relatedLocationIds: string[],     // Optional. FKs to Location
  documentIds: string[],            // Optional. FKs to Document
  factionSentiment: {      // Optional. How factions view this org
    [factionId]: number    // -1.0 to 1.0
  },
  createdAt: datetime,
  updatedAt: datetime
}
```

---

## Document & Collaboration Model

### Topic

Aggregated story clusters from documents.

```javascript
{
  id: string,              // Required. Prefix: 'topic-'
  headline: string,        // Required. Main headline
  description: string,     // Optional. Detailed description/summary
  bulletPoints: string[],  // Optional. Key summary points (one-sentence debriefs)
  documentIds: string[],   // Optional. FKs to Document
  startDate: string,       // Optional. ISO date 'YYYY-MM-DD'
  endDate: string,         // Optional. ISO date (null if ongoing)
  volumeOverTime: [        // Optional. Daily volume
    { date: string, volume: number }
  ],
  createdAt: datetime,
  updatedAt: datetime
}
```

### Document

Source documents (news articles, social posts, internal reports). **Documents are the source of truth for faction volume and sentiment.**

```javascript
{
  id: string,              // Required. Prefix: 'doc-'
  documentType: enum,      // Required. 'news_article' | 'social_post' | 'internal_report' | 
                           //           'intelligence_report' | 'memo' | 'transcript' | 'internal' |
                           //           'corporate_record' | 'watchlist_match' | 'political_finance' | 'event_attendance'
  repositoryId: string,    // Required. FK to Repository (e.g., 'repo-news', 'repo-osint', 'repo-edl')
  classification: string,  // Optional. 'U' | 'C' | 'S' | 'TS'
  title: string,           // Required. Document title
  url: string,             // Recommended. Source URL (external articles) or repository link (internal docs)
  publishedDate: datetime, // Required. When published (used for volume over time)
  publisherId: string,     // Required. FK to Publisher (used for publisher volume)
  author: string,          // Optional. Author name
  excerpt: string,         // Optional. Short excerpt
  headerImage: {           // Optional.
    url: string,
    caption: string
  },
  contentBlocks: [         // Optional. Structured content
    {
      type: 'paragraph' | 'heading' | 'blockquote' | 'image' | 'list',
      content: string,
      imageUrl?: string,
      caption?: string,
      portionMark?: {
        classification: string,
        handling: string
      },
      entityMentions?: [     // Optional. Inline entity links within this block
        {
          startOffset: number,   // Character offset where mention starts
          endOffset: number,     // Character offset where mention ends
          entityType: string,    // 'person' | 'organization' | 'location' | 'event'
          entityId: string       // FK to the referenced entity
        }
      ]
    }
  ],
  
  // Extracted quotes and activities
  quotes: [                  // Optional. Attributed statements from this document
    {
      id: string,            // Required. Unique ID within document
      speakerId: string,     // Required. FK to Person or Organization
      speakerType: string,   // Required. 'person' | 'organization'
      text: string           // Required. The quoted text
    }
  ],
  activities: [              // Optional. Actor-action-target relationships
    {
      id: string,            // Required. Unique ID within document
      actorId: string,       // Required. FK to Person or Organization
      actorType: string,     // Required. 'person' | 'organization'
      action: string,        // Required. The action verb (e.g., 'criticized', 'praised', 'met with')
      targetId: string,      // Optional. FK to Person, Organization, Location, or Event
      targetType: string,    // Optional. 'person' | 'organization' | 'location' | 'event'
      targetText: string     // Required. Original phrasing of target for display
    }
  ],
  
  // Entity extractions (from ingest)
  narrativeIds: string[],      // Optional. FKs to Narrative
  themeIds: string[],          // Optional. FKs to Theme
  topicIds: string[],          // Optional. FKs to Topic
  personIds: string[],         // Optional. FKs to Person
  organizationIds: string[],   // Optional. FKs to Organization
  locationIds: string[],       // Optional. FKs to Location
  eventIds: string[],          // Optional. FKs to Event
  
  // Faction extraction (from ingest) - SOURCE OF TRUTH for volume/sentiment
  factionMentions: {           // Required. Which factions this document relates to
    [factionId]: {
      sentiment: number        // -1.0 to 1.0, how this doc portrays this faction
    }
  },
  
  metrics: {               // Optional.
    shares: number
  },
  highlights: [            // Optional. User highlights
    {
      id: string,
      userId: string,
      blockIndex: number,
      startOffset: number,
      endOffset: number,
      highlightedText: string,
      createdAt: datetime
    }
  ],
  comments: [              // Optional. User comments
    {
      id: string,
      userId: string,
      blockIndex: number,
      anchorStartOffset: number,
      anchorEndOffset: number,
      anchorText: string,
      content: string,
      createdAt: datetime,
      replies: [
        {
          id: string,
          userId: string,
          content: string,
          createdAt: datetime
        }
      ]
    }
  ],
  createdAt: datetime
}
```

**Volume = document count.** Each document mentioning a faction counts as 1 unit of volume for that faction on that date.

### Publisher

Sources that publish documents. All documents have a publisher, including internal documents (which use department names as publishers).

```javascript
{
  id: string,              // Required. Prefix: 'pub-'
  name: string             // Required. Publisher name
}
```

### Repository

Data repositories that store documents. Each document belongs to exactly one repository. Repositories represent different data sources or collection systems.

```javascript
{
  id: string,              // Required. Prefix: 'repo-'
  code: string,            // Required. Short uppercase code (e.g., 'NEWS', 'OSINT', 'EDL')
  name: string,            // Required. Display name
  description: string,     // Optional. What this repository contains
  color: string            // Optional. Hex color for UI
}
```

**Default Repositories:**
- `repo-news` (NEWS) - News articles from external media sources
- `repo-osint` (OSINT) - Social media posts and open-source intelligence
- `repo-edl` (EDL) - Internal reports and intelligence documents

### User

System users for collaboration features.

```javascript
{
  id: string,              // Required. Prefix: 'user-'
  displayName: string,     // Required. Display name
  username: string,        // Optional. Username/handle
  role: string,            // Optional. User role
  department: string,      // Optional. Department
  avatarUrl: string,       // Optional. Profile image
  isCurrentUser: boolean   // Optional. Whether this is the current user
}
```

---

## Monitor & Alert System

### Monitor

Automated tracking configuration for entities and conditions. Monitors query documents directly based on scope criteria and support manual curation via includedDocIds/excludedDocIds.

```javascript
{
  id: string,              // Required. Prefix: 'monitor-'
  name: string,            // Required. Monitor name
  description: string,     // Optional. What this monitor tracks
  scope: {                 // Required. What entities/keywords to watch
    personIds: string[],
    organizationIds: string[],
    factionIds: string[],
    locationIds: string[],
    eventIds: string[],
    narrativeIds: string[],  // Directly filter by narrative
    themeIds: string[],      // Directly filter by theme
    keywords: string[],    // Free-text keywords/phrases to match
    logic: 'AND' | 'OR'    // How to combine scope conditions
  },
  includedDocIds: string[], // Optional. FKs to Document. Always include these documents
  excludedDocIds: string[], // Optional. FKs to Document. Always exclude these documents
  options: {               // Optional. Additional settings
    includeSubEvents: boolean,
    includeThemes: boolean,
    includeRelatedEvents: boolean
  },
  triggers: {              // Optional. What conditions generate alerts
    newNarrative: boolean,
    newEvent: boolean,
    volumeSpike: {
      threshold: number,
      timeWindow: string   // e.g. '24h', '12h'
    },
    sentimentShift: {
      threshold: number,
      direction: 'positive' | 'negative' | 'any'
    },
    factionEngagement: {
      factionIds: string[],
      threshold: number
    }
  },
  enabled: boolean,        // Required. Is monitor active?
  lastTriggered: datetime, // Auto-managed.
  createdAt: datetime,
  updatedAt: datetime
}
```

### Alert

Generated when monitor conditions are met.

```javascript
{
  id: string,              // Required. Prefix: 'alert-'
  monitorId: string,       // Required. FK to Monitor
  type: enum,              // Required. 'volume_spike' | 'new_event' | 'new_narrative' | 
                           //           'sentiment_shift' | 'faction_engagement'
  title: string,           // Required. Alert title
  description: string,     // Optional. Alert details (supports entity linking)
  triggeredAt: datetime,   // Required. When alert was generated
  
  // Related intelligence entities
  relatedNarrativeIds: string[],  // FKs to Narrative
  relatedThemeIds: string[],      // FKs to Theme
  relatedEventIds: string[],      // FKs to Event
  relatedSubEventIds: string[],   // FKs to sub-events
  
  // Entity references for linking in description
  relatedPersonIds: string[],        // FKs to Person - for entity linking
  relatedOrganizationIds: string[],  // FKs to Organization - for entity linking
  relatedFactionIds: string[],       // FKs to Faction - for entity linking
  relatedLocationIds: string[],      // FKs to Location - for entity linking
  
  metadata: object         // Type-specific data (threshold, actualValue, etc.)
}
```

### Workspace

User-defined collections for focused analysis. Workspaces support three document sourcing modes:
1. **Explicit only** (legacy): Documents listed in documentIds
2. **Scope-based**: Documents matching scope criteria (like monitors)
3. **Hybrid**: Scope matching + manual includedDocIds/excludedDocIds overrides

```javascript
{
  id: string,              // Required. Prefix: 'workspace-'
  name: string,            // Required. Workspace name
  query: string,           // Optional. Search query (for display/reference)
  description: string,     // Optional. Workspace purpose
  documentIds: string[],   // Optional. FKs to Document (legacy explicit mode)
  scope: {                 // Optional. Dynamic document matching criteria
    personIds: string[],
    organizationIds: string[],
    factionIds: string[],
    locationIds: string[],
    eventIds: string[],
    narrativeIds: string[],
    themeIds: string[],
    keywords: string[],
    logic: 'AND' | 'OR'
  },
  includedDocIds: string[], // Optional. FKs to Document. Always include these documents
  excludedDocIds: string[], // Optional. FKs to Document. Always exclude these documents
  filters: object,         // Optional. Saved filter state
  tagIds: string[],        // Optional. FKs to Tag
  status: enum,            // Optional. 'active' | 'archived'
  createdAt: datetime,
  updatedAt: datetime
}
```

**Document Resolution:** If both `scope` and `documentIds` are present, documents are resolved as: (scope matches ∪ documentIds ∪ includedDocIds) − excludedDocIds

### Project

Manually curated document collections for research and reporting. Unlike Monitors (automatic) and Workspaces (search-driven), Projects are purely manual - documents are added explicitly by the user. Projects can be nested within other projects to create hierarchical organization (similar to folders).

```javascript
{
  id: string,              // Required. Prefix: 'project-'
  name: string,            // Required. Project name
  description: string,     // Optional. Project purpose/notes
  parentProjectId: string, // Optional. FK to parent Project (null for top-level)
  subProjectIds: string[], // Auto-managed. FKs to child Projects
  documentIds: string[],   // Required. FKs to Document (manually curated)
  snippets: [              // Optional. Saved text selections from various sources
    {
      id: string,          // Required. Prefix: 'snippet-'
      text: string,        // Required. The selected text
      sourceType: enum,    // Required. 'document' | 'chat' | 'narrative' | 'activity' | 'table'
      sourceDocumentId: string,  // Optional. FK to Document (for document/table/activity sources)
      sourceId: string,    // Optional. Source entity ID (narrative ID, etc.)
      sourceLabel: string, // Optional. Display label when no document link available
      sourceContext: {     // Optional. Location in source document
        blockIndex: number,
        startOffset: number,
        endOffset: number
      },
      note: string,        // Optional. User annotation/note
      createdAt: datetime,
      createdBy: string    // Optional. FK to User who created the snippet
    }
  ],
  tagIds: string[],        // Optional. FKs to Tag
  status: enum,            // Optional. 'active' | 'archived'. Default: 'active'
  createdAt: datetime,
  updatedAt: datetime
}
```

**Key Distinction:** Projects have no `scope` or dynamic matching. The `documentIds` array is the complete, manually-managed document set. All entity views within a project are derived from these documents.

**Nesting:** Projects can be nested via `parentProjectId`. When a project has a parent, it appears as a sub-project. URLs reflect the hierarchy: `#/project-parent/project-child/`. Documents and snippets belong to individual projects and can be moved between projects (including between parent and child).

**Snippets:** Text snippets can be saved to projects via text selection in document views. Snippets preserve a reference to the source document and optional context for navigation back to the original location.

### SearchFilter

Reusable entity/keyword selections that can be applied across monitors and other searches.

```javascript
{
  id: string,              // Required. Prefix: 'filter-'
  name: string,            // Required. User-provided filter name
  description: string,     // Optional. Filter description
  scope: {                 // Required. What entities/keywords are in this filter
    // Entity filters
    personIds: string[],
    organizationIds: string[],
    factionIds: string[],
    locationIds: string[],
    eventIds: string[],
    keywords: string[],
    // Document attribute filters
    documentTypes: string[],   // 'news_article' | 'social_post' | 'internal_report' | 
                               // 'intelligence_report' | 'memo' | 'transcript' | 'internal' |
                               // 'corporate_record' | 'watchlist_match' | 'political_finance' | 'event_attendance'
    publisherIds: string[],    // FKs to Publisher
    authors: string[]          // Author names (exact match)
    // Note: No 'logic' field - logic is determined by the consumer (e.g., Monitor)
  },
  createdAt: datetime,
  updatedAt: datetime
}
```

**Usage:** SearchFilters are created from the ScopeSelector component and can be applied to monitors or other scope-based features. When applied, the filter's entities, keywords, and document attributes are merged into the current selection.

### TagGroup

Organizational categories for tags. Groups can enforce exclusivity (only one tag from the group can be applied) and provide visual organization.

```javascript
{
  id: string,              // Required. Prefix: 'tag-group-'
  name: string,            // Required. Group display name (e.g., 'Status', 'Risk', 'Mission')
  description: string,     // Optional. Group description
  exclusive: boolean,      // Optional. If true, only one tag from group can be applied. Default: false
  color: string,           // Optional. Default color for tags in this group
  sortOrder: number,       // Optional. Display order (lower = first). Default: 0
  createdAt: datetime,
  updatedAt: datetime
}
```

**Built-in Groups:**
- **Status** (exclusive): Workflow states like 'Needs Review', 'In Review', 'Completed'
- **Risk** (non-exclusive): Risk levels like 'High Risk', 'Medium Risk', 'Low Risk'
- **Mission** (exclusive): Analysis missions (replaces the legacy Mission entity)

### Tag

User-defined labels for organizing and filtering entities. Tags can be organized into groups for better management.

```javascript
{
  id: string,              // Required. Prefix: 'tag-'
  groupId: string,         // Optional. FK to TagGroup (null for ungrouped tags)
  name: string,            // Required. Tag display name
  color: string,           // Optional. Hex color (inherits from group if not set)
  description: string,     // Optional. Tag description
  sortOrder: number,       // Optional. Display order within group. Default: 0
  createdAt: datetime,
  updatedAt: datetime
}
```

**Taggable entities:** Narratives, Themes, Factions, Locations, Events, Persons, Organizations, Documents, Topics, Monitors, Workspaces, Projects. Each taggable entity has an optional `tagIds: string[]` field containing FKs to Tags.

**Usage:**
- Tags are managed via the Tags list view (`#/tags`)
- Tags can be added/removed from entities via the tag picker modal
- View all entities with a specific tag via `#/tag/{tagId}`
- Filter by tag group in views that support it (e.g., Dashboard filters by Mission group)

---

## Relationship Map

### One-to-Many (FK on child)
- TagGroup → Tags (`tag.groupId`)
- Narrative → Themes (`theme.parentNarrativeId`)
- Event → SubEvents (`subEvent.parentEventId`)
- Project → SubProjects (`project.parentProjectId`)
- Event → Location (`event.locationId`)
- Repository → Documents (`document.repositoryId`)
- Publisher → Documents (`document.publisherId`)
- Monitor → Alerts (`alert.monitorId`)

### Many-to-Many (Array fields)
- Narrative ↔ Person (`narrative.personIds`, `person.documentIds`)
- Narrative ↔ Organization (`narrative.organizationIds`)
- Narrative ↔ Location (`narrative.locationIds`)
- Narrative ↔ Event (`narrative.eventIds`)
- Narrative ↔ Document (`narrative.documentIds`, `document.narrativeIds`)
- Theme ↔ Person/Organization/Location/Event (same pattern)
- Event ↔ Person (`event.personIds`)
- Event ↔ Organization (`event.organizationIds`)
- Person ↔ Faction (`person.affiliatedFactionIds`, `faction.affiliatedPersonIds`)
- Person ↔ Location (`person.relatedLocationIds`)
- Organization ↔ Faction (`organization.affiliatedFactionIds`, `faction.affiliatedOrganizationIds`)
- Organization ↔ Location (`organization.relatedLocationIds`)
- Topic ↔ Document (`topic.documentIds`)
- Monitor → Person/Organization/Faction/Location/Event (via `scope`)

---

## DataStore Methods

CRUD operations are available in `js/data/DataStore.js`:

```javascript
// Generic methods
dataStore.createEntity(collection, prefix, data, defaults)
dataStore.updateEntity(collection, id, updates)
dataStore.deleteEntity(collection, id, cleanupFn)
dataStore.findEntity(collection, id)

// Entity-specific methods
dataStore.createMission(mission)
dataStore.createNarrative(narrative)
dataStore.createTheme(theme)
dataStore.createFaction(faction)
dataStore.createLocation(location)
dataStore.createEvent(event)
dataStore.createPerson(person)
dataStore.createOrganization(org)
dataStore.createTopic(topic)
dataStore.createDocument(doc)
dataStore.createMonitor(monitor)
dataStore.createWorkspace(workspace)
dataStore.createSearchFilter(filter)

// Update and delete follow pattern: updateX(id, updates), deleteX(id)
```

---

## DataService Aggregation Methods

Faction volume, sentiment, and breakdowns are computed from documents:

```javascript
import { DataService } from './js/data/DataService.js';

// Get faction volume + sentiment for a narrative (aggregated from docs)
const factionMentions = DataService.getAggregateFactionMentionsForNarrative(narrativeId);
// Returns: { 'faction-001': { volume: 16, sentiment: 0.58 }, ... }

// Get volume over time (docs grouped by date)
const volumeOverTime = DataService.getVolumeOverTimeForNarrative(narrativeId);
// Returns: [{ date: '2026-01-20', factionVolumes: { 'faction-001': 8 }, publisherVolumes: { 'pub-x': 6 } }, ...]

// Get which publishers each faction appears in
const factionSources = DataService.getFactionSourcesForNarrative(narrativeId);
// Returns: { 'faction-001': { 'pub-x': 8, 'pub-facebook': 4 }, ... }

// Get publisher volume breakdown
const publisherVolumes = DataService.getAggregatePublisherVolumesForNarrative(narrativeId);
// Returns: { 'pub-x': { volume: 12, sentiment: -0.35 }, ... }

// Aggregate across mission or all narratives
const missionVolume = DataService.getAggregateVolumeOverTime(missionId);
const allVolume = DataService.getAggregateVolumeOverTime(); // all missions
```

### Aggregation Logic

**Volume** = count of documents per faction/publisher per time period

**Sentiment** = average of document sentiments, weighted equally:
```javascript
sentiment = sum(doc.factionMentions[factionId].sentiment) / count
```

### Quote and Activity Aggregation

Quotes and activities are aggregated from documents for Person/Organization detail views:

```javascript
// Get all quotes by a person (optionally filtered to specific documents)
const quotes = DataService.getQuotesForPerson(personId, documentIds);
// Returns: [{ id, speakerId, speakerType, text, documentId, documentTitle, publishedDate }, ...]

// Get all quotes by an organization
const quotes = DataService.getQuotesForOrganization(orgId, documentIds);

// Get all activities involving a person (as actor or target)
const activities = DataService.getActivitiesForPerson(personId, documentIds);
// Returns: [{ id, actorId, actorType, action, targetId, targetType, targetText, documentId, role: 'actor'|'target' }, ...]

// Get all activities involving an organization
const activities = DataService.getActivitiesForOrganization(orgId, documentIds);
```

When `documentIds` is provided (e.g., from a workspace scope), results are filtered to only those documents.

---

## Sample Data Location

Dataset files are in `js/data/datasets/{dataset-name}/`:
- `entities.js` - Persons and Organizations
- `narratives.js` - Narratives
- `themes.js` - Themes
- `factions.js` - Factions and FactionOverlaps
- `locations.js` - Locations
- `events.js` - Events
- `documents.js` - **Source of truth for faction volume/sentiment**
- `publishers.js` - Publishers and PublisherCategories
- `monitors.js` - Monitors and Alerts
- `missions.js` - Missions
- `topics.js` - Topics
- `users.js` - Users
