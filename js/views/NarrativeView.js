/**
 * NarrativeView.js
 * Detail view for a single narrative using the CardManager pattern
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { StatCards } from '../components/StatCards.js';
// Source viewer handled by delegated event listener in app.js
import {
  CardManager,
  NetworkGraphCard,
  MapCard,
  SentimentChartCard,
  VennDiagramCard,
  ThemeListCard,
  TimelineVolumeCompositeCard
} from '../components/CardComponents.js';

export class NarrativeView extends DetailViewBase {
  constructor(container, narrativeId, options = {}) {
    super(container, options);
    this.narrativeId = narrativeId;
    this.cardManager = new CardManager(this);
  }

  async render() {
    const narrative = DataService.getNarrative(this.narrativeId);
    if (!narrative) {
      this.renderNotFound('Narrative');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchNarrativeData(narrative);
    
    // Store data for card setup
    this._narrativeData = { narrative, data };
    
    // Determine active tab
    const activeTab = this.getCurrentTab();
    const hasDocuments = data.documents.length > 0;
    
    // Build cards based on active tab
    if (this.isDocumentsTab()) {
      super.setupDocumentsCard(narrative, data, 'narrative');
    } else {
      this.setupDashboardCards(narrative, data);
    }
    
    // Generate tabs config - use ID-based routing
    const baseHref = this.buildContextRoute(this.narrativeId);
    const tabsConfig = hasDocuments ? this.getTabsConfig(baseHref, true) : null;

    // Build page header with tabs
    const mission = narrative.missionId 
      ? DataService.getMission(narrative.missionId) 
      : null;
    
    const subtitleParts = [
      `<span class="badge badge-${this.getSentimentClass(narrative.sentiment)}">${this.formatSentiment(narrative.sentiment)}</span>`,
      mission ? `<span class="text-muted ml-2">Mission: ${mission.name}</span>` : ''
    ].filter(Boolean).join('');

    // Build context-aware breadcrumbs
    const breadcrumbs = this.buildBreadcrumbs([
      this.truncateText(narrative.text, 50)
    ]);

    // Build stats for the header with dropdown support
    const contextId = this.context?.id || null;
    const statsData = StatCards.buildEntityStatsWithItems(data, contextId);

    const headerHtml = PageHeader.render({
      breadcrumbs,
      title: narrative.text,
      subtitle: subtitleParts,
      description: narrative.description,
      descriptionLink: narrative.description 
        ? `<a href="#" class="btn btn-small btn-secondary source-link" data-source-type="narrative" data-source-id="${narrative.id}">View source</a>` 
        : '',
      tagsContainerId: 'narrative-tags-container',
      stats: statsData,
      statsMode: 'dropdowns',
      statsContextId: contextId,
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

    // Initialize stat card dropdowns
    this.initStatDropdowns(contextId, this.narrativeId);

    // Initialize card width toggles
    this.initCardWidthToggles('narrative', this.narrativeId);

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Initialize tag chips
    this.initTagChips(narrative, 'narrative');
  }

  /**
   * Fetch all data related to the narrative
   * Uses document scope from context if available
   */
  fetchNarrativeData(narrative) {
    // Get document scope for context-aware data fetching
    const scopeDocIds = this.getDocumentScope();
    
    const themes = DataService.getThemesForNarrative(narrative.id);
    const factionData = DataService.getFactionsForNarrative(narrative.id);
    const factions = factionData.map(f => f.faction).filter(Boolean);
    const factionOverlaps = factions.length > 1 
      ? DataService.getFactionOverlapsFor(factions[0]?.id).filter(o =>
          o.factionIds.every(fid => factions.some(f => f.id === fid))
        )
      : [];

    // Volume/Timeline data - computed from documents (scoped)
    const events = DataService.getEventsForNarrative(narrative.id);
    const allEvents = events.flatMap(e => [e, ...DataService.getSubEventsForEvent(e.id)]);
    const volumeOverTime = DataService.getVolumeOverTimeForNarrative(narrative.id, null, scopeDocIds);
    const hasVolumeData = volumeOverTime.length > 0 && factions.length > 0;
    const publisherVolumeTime = DataService.getPublisherVolumeOverTime(narrative.id);
    const hasPublisherData = publisherVolumeTime.dates.length > 0 && publisherVolumeTime.publishers.length > 0;
    const hasVolumeTimeline = hasVolumeData || hasPublisherData || allEvents.length > 0;

    // Prepare volume data for the composite chart
    let volumeData = null;
    if (hasVolumeData) {
      volumeData = {
        dates: volumeOverTime.map(d => d.date),
        series: factions.map(f =>
          volumeOverTime.map(d => (d.factionVolumes || {})[f.id] || 0)
        ),
        factions: factions
      };
    }

    // Map data
    const locations = DataService.getLocationsForNarrative(narrative.id);
    const mapLocations = [
      ...locations.map(l => ({ ...l, isEvent: false })),
      ...events.filter(e => e.locationId).map(e => {
        const loc = DataService.getLocation(e.locationId);
        return loc ? { ...loc, isEvent: true, eventText: e.text } : null;
      }).filter(Boolean)
    ];

    // Network data
    const personIds = narrative.personIds || [];
    const orgIds = narrative.organizationIds || [];
    const hasNetwork = personIds.length > 0 || orgIds.length > 0;

    // Get actual person and organization entities for stat cards
    const persons = personIds.map(id => DataService.getPerson(id)).filter(Boolean);
    const organizations = orgIds.map(id => DataService.getOrganization(id)).filter(Boolean);
    const entities = [...persons, ...organizations];

    // Documents data (scoped)
    const documents = DataService.getDocumentsForNarrative(narrative.id, scopeDocIds);

    // Get topics related to this narrative (share documents)
    const narrativeDocIds = new Set(documents.map(d => d.id));
    const allTopics = DataService.getTopics ? DataService.getTopics(scopeDocIds) : [];
    const topics = allTopics.filter(topic =>
      (topic.documentIds || []).some(dId => narrativeDocIds.has(dId))
    );

    // Build sentiment data for the sentiment chart
    const sentimentFactions = factionData.map(fd => ({
      ...fd.faction,
      sentiment: fd.sentiment
    }));

    // Narrative durations for volume/duration toggle (scoped)
    const narrativeDurations = DataService.getNarrativeDurations(null, null, null, scopeDocIds);

    // Get activity (comments and highlights) for this narrative's documents
    const docIds = new Set(documents.map(d => d.id));
    const allActivity = DataService.getAllActivity();
    const activity = allActivity.filter(item => docIds.has(item.documentId));

    return {
      themes, factionData, factions, factionOverlaps,
      events, allEvents, volumeOverTime, hasVolumeData, volumeData,
      publisherVolumeTime, hasPublisherData, hasVolumeTimeline,
      locations, mapLocations, personIds, orgIds, hasNetwork,
      persons, organizations, entities, topics,
      documents, sentimentFactions, narrativeDurations, activity
    };
  }

  /**
   * Set up card components for Dashboard tab
   */
  setupDashboardCards(narrative, data) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    // Themes List (full width at top)
    if (data.themes.length > 0) {
      this.cardManager.add(new ThemeListCard(this, 'narrative-themes', {
        title: 'Themes',
        themes: data.themes,
        fullWidth: true,
        showDescriptionToggle: true,
        defaultShowDescription: false
      }));
    }

    // Volume & Events Chart (half-width)
    const hasDurationData = data.narrativeDurations?.length > 0;
    if (data.hasVolumeTimeline || hasDurationData) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, 'narrative-volume-events', {
        title: 'Volume & Events',
        volumeData: data.volumeData,
        publisherData: data.hasPublisherData ? data.publisherVolumeTime : null,
        events: data.allEvents,
        narrativeDurations: hasDurationData ? data.narrativeDurations : null,
        halfWidth: true,
        height: 320,
        volumeHeight: 140,
        timelineHeight: 140,
        showViewToggle: !!(data.volumeData && data.hasPublisherData)
      }));
    }

    // Sentiment by Faction (half-width)
    if (data.sentimentFactions.length > 0) {
      this.cardManager.add(new SentimentChartCard(this, 'narrative-sentiment-chart', {
        title: 'Sentiment by Faction',
        factions: data.sentimentFactions,
        halfWidth: true,
        clickRoute: 'faction'
      }));
    }

    // Faction Overlaps Venn Diagram (half-width)
    if (data.factions.length >= 2) {
      this.cardManager.add(new VennDiagramCard(this, 'narrative-venn', {
        title: 'Faction Overlaps',
        factions: data.factions,
        overlaps: data.factionOverlaps,
        halfWidth: true,
        height: 300
      }));
    }

    // People & Organizations Network (half-width)
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, 'narrative-network', {
        title: 'People & Organizations',
        personIds: data.personIds,
        orgIds: data.orgIds,
        halfWidth: true,
        height: 400
      }));
    }

    // Related Locations Map (half-width)
    if (data.locations.length > 0 || data.allEvents.length > 0) {
      this.cardManager.add(new MapCard(this, 'narrative-map', {
        title: 'Related Locations & Events',
        locations: data.locations,
        events: data.allEvents,
        halfWidth: true,
        height: 350,
        showViewToggle: true
      }));
    }
  }

}

export default NarrativeView;
