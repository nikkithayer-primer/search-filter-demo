/**
 * WorkspaceView.js
 * Detail view for a single workspace using the CardManager pattern
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { StatCards } from '../components/StatCards.js';
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

export class WorkspaceView extends DetailViewBase {
  constructor(container, workspaceId, options = {}) {
    super(container, options);
    this.workspaceId = workspaceId;
    this.cardManager = new CardManager(this);
  }

  async render() {
    const workspace = DataService.getWorkspace(this.workspaceId);
    if (!workspace) {
      this.renderNotFound('Workspace');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchWorkspaceData(workspace);
    
    // Store data for card setup
    this._workspaceData = { workspace, data };
    
    // Determine active tab
    const activeTab = this.getCurrentTab();
    const hasDocuments = data.documents.length > 0;
    
    // Build cards based on active tab
    if (this.isDocumentsTab()) {
      super.setupDocumentsCard(workspace, data, 'workspace');
    } else {
      this.setupDashboardCards(workspace, data);
    }
    
    // Generate tabs config
    const baseHref = `#/${this.workspaceId}/`;
    const tabsConfig = hasDocuments ? this.getTabsConfig(baseHref, true) : null;

    // Build subtitle with stats
    const docCount = data.documents.length;
    const entityCount = data.persons.length + data.organizations.length;
    const subtitleParts = [
      `<span class="text-muted">Query:</span> "${this.escapeHtml(workspace.query)}"`,
      `<span class="badge">${docCount} document${docCount !== 1 ? 's' : ''}</span>`,
      entityCount > 0 ? `<span class="badge">${entityCount} entit${entityCount !== 1 ? 'ies' : 'y'}</span>` : ''
    ].filter(Boolean).join(' ');

    // Status badge
    const isArchived = workspace.status === 'archived';
    const statusBadge = isArchived
      ? '<span class="badge badge-status-paused">Archived</span>'
      : '<span class="badge badge-status-active">Active</span>';

    // Build stats for the header with dropdown support
    const contextId = this.workspaceId;
    const statsData = StatCards.buildEntityStatsWithItems(data, contextId);

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Workspaces', href: '#/workspaces' },
        workspace.name
      ],
      title: workspace.name,
      badge: statusBadge,
      subtitle: subtitleParts,
      description: workspace.description,
      stats: statsData,
      statsMode: 'dropdowns',
      statsContextId: contextId,
      tagsContainerId: 'workspace-tags-container',
      tabs: tabsConfig,
      activeTab: activeTab
    });

    // Render page
    this.container.innerHTML = `
      ${headerHtml}
      <div class="content-area">
        <div class="content-grid">
          ${this.cardManager.getHtml()}
        </div>
      </div>
    `;

    // Initialize card width toggles
    this.initCardWidthToggles('workspace', this.workspaceId);

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Initialize stat card dropdowns
    this.initStatDropdowns(contextId, this.workspaceId);

    // Initialize tag chips
    this.initTagChips(workspace, 'workspace');
  }

  /**
   * Fetch all data for the workspace
   */
  fetchWorkspaceData(workspace) {
    // Get all documents in the workspace
    const documents = (workspace.documentIds || [])
      .map(id => DataService.getDocument(id))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    // Aggregate all entity IDs from documents
    const personIds = new Set();
    const organizationIds = new Set();
    const narrativeIds = new Set();
    const themeIds = new Set();
    const locationIds = new Set();
    const eventIds = new Set();
    const factionIds = new Set();
    const topicIds = new Set();

    documents.forEach(doc => {
      (doc.personIds || []).forEach(id => personIds.add(id));
      (doc.organizationIds || []).forEach(id => organizationIds.add(id));
      (doc.narrativeIds || []).forEach(id => narrativeIds.add(id));
      (doc.themeIds || []).forEach(id => themeIds.add(id));
      (doc.locationIds || []).forEach(id => locationIds.add(id));
      (doc.eventIds || []).forEach(id => eventIds.add(id));
      (doc.topicIds || []).forEach(id => topicIds.add(id));
    });

    // Resolve entities from IDs
    const persons = [...personIds].map(id => DataService.getPerson(id)).filter(Boolean);
    const organizations = [...organizationIds].map(id => DataService.getOrganization(id)).filter(Boolean);
    const narratives = [...narrativeIds].map(id => DataService.getNarrative(id)).filter(Boolean);
    const themes = [...themeIds].map(id => DataService.getTheme(id)).filter(Boolean);
    const locations = [...locationIds].map(id => DataService.getLocation(id)).filter(Boolean);
    const events = [...eventIds].map(id => DataService.getEvent(id)).filter(Boolean);
    const topics = [...topicIds].map(id => DataService.getTopic(id)).filter(Boolean);

    // Get factions from narratives using document-based aggregation
    narratives.forEach(n => {
      const factionMentions = DataService.getAggregateFactionMentionsForNarrative(n.id);
      Object.keys(factionMentions).forEach(fId => factionIds.add(fId));
    });
    const factions = this.calculateFactionSentiment(narratives, [...factionIds]);

    // Get faction overlaps for Venn diagram
    const factionOverlaps = DataService.getFactionOverlaps();

    // Build network graph data
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    // Get volume data for timeline (scoped to workspace documents)
    const scopeDocIds = workspace.documentIds || null;
    const volumeResult = DataService.getVolumeDataForDocuments(scopeDocIds);
    const volumeData = volumeResult.byFaction;
    const publisherData = volumeResult.byPublisher;
    
    // Get narrative durations for duration view toggle (scoped to workspace documents)
    const narrativeDurations = DataService.getNarrativeDurations(null, null, null, scopeDocIds);

    // Combine persons and orgs as entities for stat cards
    const entities = [...persons, ...organizations];

    // Get activity (comments and highlights) for this workspace's documents
    const activityDocIds = new Set(documents.map(d => d.id));
    const allActivity = DataService.getAllActivity();
    const activity = allActivity.filter(item => activityDocIds.has(item.documentId));

    return {
      documents,
      persons, organizations,
      narratives, themes, topics,
      locations, events, factions,
      factionOverlaps,
      personIds: [...personIds],
      orgIds: [...organizationIds],
      hasNetwork,
      volumeData,
      publisherData,
      narrativeDurations,
      entities, activity
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
  setupDashboardCards(workspace, data) {
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
    const hasPublisherData = data.publisherData?.dates?.length > 0;
    const hasDurationData = data.narrativeDurations?.length > 0;
    if (hasVolumeData || hasPublisherData || data.events.length > 0 || hasDurationData) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, 'workspace-volume-timeline', {
        title: 'Volume Over Time & Events',
        volumeData: hasVolumeData ? data.volumeData : null,
        publisherData: hasPublisherData ? data.publisherData : null,
        events: data.events,
        narrativeDurations: hasDurationData ? data.narrativeDurations : null,
        fullWidth: true,
        height: 400,
        volumeHeight: 160,
        timelineHeight: 160,
        showViewToggle: hasVolumeData && hasPublisherData
      }));
    }

    // 2. People & Organizations Network (half-width)
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, 'workspace-network', {
        title: 'People & Organizations',
        personIds: data.personIds,
        orgIds: data.orgIds,
        halfWidth: true,
        height: 350
      }));
    }

    // 3. Narratives (half-width)
    if (data.narratives.length > 0) {
      this.cardManager.add(new NarrativeListCard(this, 'workspace-narratives', {
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
      this.cardManager.add(new TopicListCard(this, 'workspace-topics', {
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
      this.cardManager.add(new MapCard(this, 'workspace-map', {
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
      this.cardManager.add(new SentimentChartCard(this, 'workspace-factions', {
        title: 'Faction Sentiment',
        factions: data.factions,
        halfWidth: true,
        clickRoute: 'faction'
      }));
    }

    // 7. Faction Overlaps (half-width)
    if (data.factions.length > 1 && data.factionOverlaps) {
      this.cardManager.add(new VennDiagramCard(this, 'workspace-faction-overlaps', {
        title: 'Faction Overlaps',
        factions: data.factions,
        overlaps: data.factionOverlaps,
        halfWidth: true,
        height: 280
      }));
    }
  }

}

export default WorkspaceView;
