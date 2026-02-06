/**
 * ProjectView.js
 * Detail view for a single project using the CardManager pattern
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { PageHeader } from '../utils/PageHeader.js';
import { StatCards } from '../components/StatCards.js';
import { formatRelativeTime } from '../utils/formatters.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import {
  CardManager,
  NetworkGraphCard,
  NarrativeListCard,
  TopicListCard,
  SentimentChartCard,
  VennDiagramCard,
  MapCard,
  TimelineVolumeCompositeCard
} from '../components/CardComponents.js';

export class ProjectView extends DetailViewBase {
  constructor(container, projectId, options = {}) {
    super(container, options);
    this.projectId = projectId;
    this.cardManager = new CardManager(this);
  }

  async render() {
    const project = DataService.getProject(this.projectId);
    if (!project) {
      this.renderNotFound('Project');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchProjectData(project);
    
    // Store data for card setup
    this._projectData = { project, data };
    
    // Determine active tab
    const activeTab = this.getCurrentTab();
    const hasDocuments = data.documents.length > 0;
    const snippetCount = data.snippets.length;
    
    // Build cards based on active tab
    if (this.isDocumentsTab()) {
      super.setupDocumentsCard(project, data, 'project');
    } else if (this.isSnippetsTab()) {
      // Snippets tab - handled via direct HTML render below
      this.cardManager = new CardManager(this); // Empty card manager
    } else {
      this.setupDashboardCards(project, data);
    }
    
    // Generate tabs config (always show tabs, including Snippets)
    const baseHref = `#/${this.projectId}/`;
    const tabsConfig = this.getProjectTabsConfig(baseHref, hasDocuments, snippetCount);

    // Build subtitle with stats
    const docCount = data.documents.length;
    const entityCount = data.persons.length + data.organizations.length;
    const subtitleParts = [
      `<span class="badge">${docCount} document${docCount !== 1 ? 's' : ''}</span>`,
      entityCount > 0 ? `<span class="badge">${entityCount} entit${entityCount !== 1 ? 'ies' : 'y'}</span>` : ''
    ].filter(Boolean).join(' ');

    // Status badge
    const isArchived = project.status === 'archived';
    const statusBadge = isArchived
      ? '<span class="badge badge-status-paused">Archived</span>'
      : '<span class="badge badge-status-active">Active</span>';

    // Build stats for the header with dropdown support
    const contextId = this.projectId;
    const statsData = StatCards.buildEntityStatsWithItems(data, contextId);

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Projects', href: '#/projects' },
        project.name
      ],
      title: project.name,
      badge: statusBadge,
      subtitle: subtitleParts,
      description: project.description,
      stats: statsData,
      statsMode: 'dropdowns',
      statsContextId: contextId,
      tagsContainerId: 'project-tags-container',
      tabs: tabsConfig,
      activeTab: activeTab
    });

    // Render page content based on tab
    const contentHtml = this.isSnippetsTab() 
      ? this.renderSnippetsContent(data.snippets)
      : `<div class="content-grid">${this.cardManager.getHtml()}</div>`;

    this.container.innerHTML = `
      ${headerHtml}
      <div class="content-area">
        ${contentHtml}
      </div>
    `;

    // Initialize card width toggles (skip for snippets tab)
    if (!this.isSnippetsTab()) {
      this.initCardWidthToggles('project', this.projectId);

      // Initialize all card components
      const components = this.cardManager.initializeAll();
      Object.assign(this.components, components);
    } else {
      // Initialize snippet event handlers
      this.initSnippetHandlers();
    }

    // Initialize stat card dropdowns
    this.initStatDropdowns(contextId, this.projectId);

    // Initialize tag chips
    this.initTagChips(project, 'project');
  }

  /**
   * Check if we're on the Snippets tab
   */
  isSnippetsTab() {
    return this.getCurrentTab() === 'snippets';
  }

  /**
   * Generate tabs configuration including Snippets tab
   */
  getProjectTabsConfig(baseHref, hasDocuments, snippetCount) {
    // Remove trailing slash from baseHref for consistent URL format
    const cleanHref = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;
    
    const tabs = [
      { id: 'dashboard', label: 'Dashboard', href: `${cleanHref}?tab=dashboard` }
    ];

    if (hasDocuments) {
      tabs.push({ id: 'documents', label: 'Documents', href: `${cleanHref}?tab=documents` });
    }

    // Always show Snippets tab (count if has snippets)
    const snippetsLabel = snippetCount > 0 ? `Snippets (${snippetCount})` : 'Snippets';
    tabs.push({ id: 'snippets', label: snippetsLabel, href: `${cleanHref}?tab=snippets` });

    return tabs;
  }

  /**
   * Render the snippets tab content
   */
  renderSnippetsContent(snippets) {
    if (!snippets || snippets.length === 0) {
      return `
        <div class="card">
          <div class="card-body">
            <div class="snippet-empty-state">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
              <h3>No Snippets Yet</h3>
              <p>Select text in any document and click "Send to Project" to save snippets here for easy reference.</p>
            </div>
          </div>
        </div>
      `;
    }

    // Sort snippets by creation date (newest first)
    const sortedSnippets = [...snippets].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    return `
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Snippets</h2>
          <span class="badge">${snippets.length}</span>
        </div>
        <div class="card-body">
          <div class="snippet-list">
            ${sortedSnippets.map(snippet => this.renderSnippetItem(snippet)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render a single snippet item
   */
  renderSnippetItem(snippet) {
    const createdAt = formatRelativeTime(snippet.createdAt);
    
    // Truncate very long snippets for display
    const displayText = snippet.text.length > 500 
      ? snippet.text.substring(0, 500) + '...' 
      : snippet.text;

    // Build source display based on source type
    const sourceHtml = this._renderSnippetSource(snippet);

    return `
      <div class="snippet-item" data-snippet-id="${snippet.id}">
        <blockquote class="snippet-text">"${escapeHtml(displayText)}"</blockquote>
        <div class="snippet-meta">
          ${sourceHtml}
          <span>• ${createdAt}</span>
        </div>
        ${snippet.note ? `<p class="snippet-note">${escapeHtml(snippet.note)}</p>` : ''}
        <div class="snippet-actions">
          <button class="btn btn-small btn-ghost snippet-remove" data-snippet-id="${snippet.id}" title="Remove snippet">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
              <path fill-rule="evenodd" d="M5.75 1a.75.75 0 0 0-.75.75v.5H2.25a.75.75 0 0 0 0 1.5h.5v9.5a2 2 0 0 0 2 2h6.5a2 2 0 0 0 2-2v-9.5h.5a.75.75 0 0 0 0-1.5H11v-.5A.75.75 0 0 0 10.25 1h-4.5zm-.5 2.25v-.5h5.5v.5h-5.5zm-1.5 1.5v9.5a.5.5 0 0 0 .5.5h6.5a.5.5 0 0 0 .5-.5v-9.5h-7.5z"/>
            </svg>
            Remove
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render the source attribution for a snippet based on its type
   */
  _renderSnippetSource(snippet) {
    const sourceType = snippet.sourceType || 'document';
    const sourceDoc = snippet.sourceDocument;
    
    // For document-based sources (document, table, activity with doc)
    if (sourceDoc && (sourceType === 'document' || sourceType === 'table' || sourceType === 'activity')) {
      const docTitle = sourceDoc.title || 'Unknown document';
      const docLink = `#/${this.projectId}/${sourceDoc.id}/`;
      return `<a href="${docLink}" class="snippet-source" title="${escapeHtml(docTitle)}">${escapeHtml(docTitle)}</a>`;
    }
    
    // For non-document sources, use the label
    if (snippet.sourceLabel) {
      // Truncate long labels
      const label = snippet.sourceLabel.length > 50 
        ? snippet.sourceLabel.substring(0, 50) + '...' 
        : snippet.sourceLabel;
      return `<span class="snippet-source snippet-source--${sourceType}" title="${escapeHtml(snippet.sourceLabel)}">${escapeHtml(label)}</span>`;
    }
    
    // Fallback labels by type
    const typeLabels = {
      'chat': 'Chat response',
      'narrative': 'Narrative',
      'activity': 'Activity',
      'table': 'Document table',
      'summary': 'Summary'
    };
    
    return `<span class="snippet-source snippet-source--${sourceType}">${typeLabels[sourceType] || 'Unknown source'}</span>`;
  }

  /**
   * Initialize event handlers for snippet actions
   */
  initSnippetHandlers() {
    // Remove snippet buttons
    const removeButtons = this.container.querySelectorAll('.snippet-remove');
    removeButtons.forEach(btn => {
      this.addListener(btn, 'click', (e) => {
        e.preventDefault();
        const snippetId = btn.dataset.snippetId;
        this.removeSnippet(snippetId);
      });
    });
  }

  /**
   * Remove a snippet from this project
   */
  removeSnippet(snippetId) {
    const result = dataStore.removeSnippetFromProject(this.projectId, snippetId);
    if (result.success) {
      // Re-render to update the view
      this.render();
    }
  }

  /**
   * Fetch all data for the project
   */
  fetchProjectData(project) {
    // Get all documents in the project
    const documents = DataService.getDocumentsForProject(this.projectId);

    // Get snippets for this project
    const snippets = DataService.getSnippetsForProject(this.projectId);

    // Get derived entities
    const entities = DataService.getEntitiesForProject(this.projectId);

    // Calculate factions with sentiment
    const factionIds = [...new Set(documents.flatMap(doc => 
      Object.keys(doc.factionMentions || {})
    ))];
    const factions = this.calculateFactionSentiment(entities.narratives, factionIds);

    // Get faction overlaps for Venn diagram
    const factionOverlaps = DataService.getFactionOverlaps();

    // Build network graph data
    const hasNetwork = entities.persons.length > 0 || entities.organizations.length > 0;

    // Get volume data for timeline (from project documents)
    const scopeDocIds = documents.map(d => d.id);
    const volumeResult = DataService.getVolumeDataForDocuments(scopeDocIds);
    const volumeData = volumeResult.byFaction;
    
    // Get narrative durations for duration view toggle (scoped to project documents)
    const narrativeDurations = DataService.getNarrativeDurations(null, null, null, scopeDocIds);

    // Combine persons and orgs as entities for stat cards (named 'combinedEntities' to avoid shadowing)
    const combinedEntities = [...entities.persons, ...entities.organizations];

    // Get activity (comments and highlights) for this project's documents
    const activityDocIds = new Set(documents.map(d => d.id));
    const allActivity = DataService.getAllActivity();
    const activity = allActivity.filter(item => activityDocIds.has(item.documentId));

    return {
      documents,
      snippets,
      persons: entities.persons,
      organizations: entities.organizations,
      narratives: entities.narratives,
      themes: entities.themes,
      topics: entities.topics,
      locations: entities.locations,
      events: entities.events,
      factions,
      factionOverlaps,
      personIds: entities.persons.map(p => p.id),
      orgIds: entities.organizations.map(o => o.id),
      hasNetwork,
      volumeData,
      narrativeDurations,
      entities: combinedEntities,
      activity
    };
  }

  /**
   * Calculate aggregated faction sentiment from narratives using document-based aggregation
   */
  calculateFactionSentiment(narratives, factionIds) {
    const factionStats = new Map();
    
    // Initialize stats for each faction
    factionIds.forEach(fId => {
      factionStats.set(fId, { totalVolume: 0, weightedSentiment: 0 });
    });
    
    // Aggregate volume and sentiment across narratives using document data
    narratives.forEach(n => {
      const factionMentions = DataService.getAggregateFactionMentionsForNarrative(n.id);
      Object.entries(factionMentions).forEach(([factionId, data]) => {
        const stats = factionStats.get(factionId);
        if (stats && data.volume && typeof data.sentiment === 'number') {
          stats.totalVolume += data.volume;
          stats.weightedSentiment += data.sentiment * data.volume;
        }
      });
    });
    
    // Calculate weighted average sentiment and return factions with data
    return factionIds
      .map(fId => {
        const faction = DataService.getFaction(fId);
        if (!faction) return null;
        
        const stats = factionStats.get(fId);
        if (!stats || stats.totalVolume === 0) {
          return { ...faction, sentiment: 0, volume: 0 };
        }
        
        return {
          ...faction,
          sentiment: stats.weightedSentiment / stats.totalVolume,
          volume: stats.totalVolume
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.volume - a.volume);
  }

  /**
   * Set up card components for Dashboard tab
   */
  setupDashboardCards(project, data) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    // Show empty state if no related data
    if (data.narratives.length === 0 && data.topics.length === 0 && 
        !data.hasNetwork && data.factions.length === 0 && 
        data.locations.length === 0 && data.events.length === 0) {
      return; // CardManager will have no cards, view will show empty
    }

    // 1. Volume Over Time x Events (full width)
    const hasVolumeData = data.volumeData?.dates?.length > 0;
    const hasDurationData = data.narrativeDurations?.length > 0;
    if (hasVolumeData || data.events.length > 0 || hasDurationData) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, 'project-volume-timeline', {
        title: 'Volume Over Time & Events',
        volumeData: hasVolumeData ? data.volumeData : null,
        events: data.events,
        narrativeDurations: hasDurationData ? data.narrativeDurations : null,
        fullWidth: true,
        height: 400,
        volumeHeight: 160,
        timelineHeight: 160
      }));
    }

    // 2. People & Organizations Network (half-width)
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, 'project-network', {
        title: 'People & Organizations',
        personIds: data.personIds,
        orgIds: data.orgIds,
        halfWidth: true,
        height: 350
      }));
    }

    // 3. Narratives (half-width)
    if (data.narratives.length > 0) {
      this.cardManager.add(new NarrativeListCard(this, 'project-narratives', {
        title: 'Narratives',
        narratives: data.narratives,
        showCount: true,
        maxItems: 8,
        halfWidth: true,
        showDescriptionToggle: true
      }));
    }

    // 4. Topics (half-width)
    if (data.topics.length > 0) {
      this.cardManager.add(new TopicListCard(this, 'project-topics', {
        title: 'Topics',
        topics: data.topics,
        showCount: true,
        maxItems: 6,
        halfWidth: true,
        showBulletsToggle: true
      }));
    }

    // 5. Map with Events & Locations (half-width)
    if (data.locations.length > 0 || data.events.length > 0) {
      this.cardManager.add(new MapCard(this, 'project-map', {
        title: 'Events & Locations',
        locations: data.locations,
        events: data.events,
        halfWidth: true,
        height: 300,
        showViewToggle: true
      }));
    }

    // 6. Faction Sentiment (half-width)
    if (data.factions.length > 0) {
      this.cardManager.add(new SentimentChartCard(this, 'project-factions', {
        title: 'Faction Sentiment',
        factions: data.factions,
        halfWidth: true,
        clickRoute: 'faction'
      }));
    }

    // 7. Faction Overlaps (half-width)
    if (data.factions.length > 1 && data.factionOverlaps) {
      this.cardManager.add(new VennDiagramCard(this, 'project-faction-overlaps', {
        title: 'Faction Overlaps',
        factions: data.factions,
        overlaps: data.factionOverlaps,
        halfWidth: true,
        height: 280
      }));
    }
  }

}

export default ProjectView;
