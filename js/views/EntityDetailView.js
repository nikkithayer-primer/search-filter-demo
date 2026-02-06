/**
 * EntityDetailView.js
 * Unified detail view for both Person and Organization entities
 * Consolidates the nearly identical PersonView and OrganizationView
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { StatCards } from '../components/StatCards.js';
import {
  CardManager,
  NetworkGraphCard,
  NarrativeListCard,
  MapCard,
  SentimentChartCard,
  VennDiagramCard,
  TimelineVolumeCompositeCard,
  TopicListCard,
  QuotesTableCard,
  ActivitiesTableCard
} from '../components/CardComponents.js';

export class EntityDetailView extends DetailViewBase {
  /**
   * @param {HTMLElement|string} container - Container element or ID
   * @param {string} entityId - ID of the entity
   * @param {string} entityType - 'person' or 'organization'
   * @param {Object} options - View options
   */
  constructor(container, entityId, entityType, options = {}) {
    super(container, options);
    this.entityId = entityId;
    this.entityType = entityType;
    this.isPerson = entityType === 'person';
    this.cardManager = new CardManager(this);
  }

  async render() {
    // Get entity using appropriate service method
    const entity = this.isPerson
      ? DataService.getPerson(this.entityId)
      : DataService.getOrganization(this.entityId);

    if (!entity) {
      this.container.innerHTML = PageHeader.notFound(this.isPerson ? 'Person' : 'Organization');
      return;
    }

    // Fetch all related data
    const data = this.fetchEntityData(entity);
    
    // Store data for card setup
    this._entityData = { entity, data };
    
    // Determine active tab
    const activeTab = this.getCurrentTab();
    const hasDocuments = data.documents.length > 0;
    
    // Build cards based on active tab
    const prefix = this.isPerson ? 'person' : 'org';
    if (this.isDocumentsTab()) {
      super.setupDocumentsCard(entity, data, prefix);
    } else {
      this.setupDashboardCards(entity, data);
    }
    
    // Generate tabs config - use ID-based routing
    const baseHref = this.buildContextRoute(this.entityId);
    const tabsConfig = hasDocuments ? this.getTabsConfig(baseHref, true) : null;
    
    // Render page
    this.container.innerHTML = `
      ${this.renderHeader(entity, data, tabsConfig, activeTab)}
      <div class="content-area">
        <div class="content-grid">
          ${this.cardManager.getHtml()}
        </div>
      </div>
    `;

    // Initialize stat card dropdowns
    const contextId = this.context?.id || null;
    this.initStatDropdowns(contextId, this.entityId);

    // Initialize card width toggles - first 4 cards default to half-width (dashboard only)
    const defaults = this.isDocumentsTab() ? {} : { 0: 'half', 1: 'half', 2: 'half', 3: 'half' };
    this.initCardWidthToggles(this.entityType, this.entityId, defaults);

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Initialize tag chips
    this.initTagChips(entity, this.entityType, 'entity-tags-container');
  }

  /**
   * Fetch all data related to the entity
   * Uses document scope from context if available
   */
  fetchEntityData(entity) {
    const data = {};
    const scopeDocIds = this.getDocumentScope();

    if (this.isPerson) {
      data.relatedPersons = DataService.getRelatedPersons(this.entityId);
      data.relatedOrgs = DataService.getRelatedOrganizationsForPerson(this.entityId);
      data.affiliatedFactions = DataService.getAffiliatedFactionsForPerson(this.entityId);
      data.locations = DataService.getLocationsForPerson(this.entityId);
      data.events = DataService.getEventsForPerson(this.entityId);
      data.narratives = DataService.getNarrativesForPerson(this.entityId);
      data.documents = DataService.getDocumentsForPerson(this.entityId, scopeDocIds);
    } else {
      data.relatedPersons = DataService.getRelatedPersonsForOrganization(this.entityId);
      data.relatedOrgs = DataService.getRelatedOrganizations(this.entityId);
      data.affiliatedFactions = DataService.getAffiliatedFactionsForOrganization(this.entityId);
      data.locations = DataService.getLocationsForOrganization(this.entityId);
      data.events = []; // Organizations don't have events directly
      data.narratives = DataService.getNarrativesForOrganization(this.entityId);
      data.documents = DataService.getDocumentsForOrganization(this.entityId, scopeDocIds);
    }

    // Build sentiment data - how factions feel about this entity
    data.factionSentimentData = Object.entries(entity.factionSentiment || {})
      .map(([factionId, sentiment]) => {
        const faction = DataService.getFaction(factionId);
        return faction ? { ...faction, sentiment } : null;
      })
      .filter(Boolean);

    // Build person IDs for network graph
    if (this.isPerson) {
      data.networkPersonIds = [this.entityId, ...data.relatedPersons.map(p => p.id)];
      data.networkOrgIds = data.relatedOrgs.map(o => o.id);
    } else {
      data.networkPersonIds = data.relatedPersons.map(p => p.id);
      data.networkOrgIds = [this.entityId, ...data.relatedOrgs.map(o => o.id)];
    }
    data.hasNetwork = data.relatedPersons.length > 0 || data.relatedOrgs.length > 0;

    // Build volume data for the composite chart (scoped to entity's documents)
    const docIds = data.documents.map(d => d.id);
    const volumeResult = DataService.getVolumeDataForDocuments(docIds);
    data.volumeData = volumeResult.byFaction;
    data.publisherData = volumeResult.byPublisher;
    data.hasVolumeData = data.volumeData && data.volumeData.dates.length > 0;
    data.hasPublisherData = data.publisherData && data.publisherData.dates.length > 0;

    // Get events from related narratives
    data.allEvents = data.narratives.flatMap(n => {
      const eventIds = n.eventIds || [];
      return eventIds.map(eid => DataService.getEvent(eid)).filter(Boolean)
        .flatMap(e => [e, ...DataService.getSubEventsForEvent(e.id)]);
    });

    data.hasVolumeTimeline = data.hasPublisherData || data.hasVolumeData || data.allEvents.length > 0;

    // Get topics related to this entity (topics that share documents) - scoped
    const entityDocIds = new Set(data.documents.map(d => d.id));
    const allTopics = DataService.getTopics ? DataService.getTopics(scopeDocIds) : [];
    data.topics = allTopics.filter(topic =>
      (topic.documentIds || []).some(dId => entityDocIds.has(dId))
    );

    // Build factions for Venn diagram from document factionMentions
    const factionMentionMap = new Map();
    data.documents.forEach(doc => {
      if (!doc.factionMentions) return;
      Object.entries(doc.factionMentions).forEach(([factionId, mentions]) => {
        if (!factionMentionMap.has(factionId)) {
          factionMentionMap.set(factionId, { volume: 0, sentiment: 0, count: 0 });
        }
        const entry = factionMentionMap.get(factionId);
        entry.volume += mentions.volume || 1;
        entry.sentiment += mentions.sentiment || 0;
        entry.count += 1;
      });
    });

    data.factions = [...factionMentionMap.entries()].map(([factionId, stats]) => {
      const faction = DataService.getFaction(factionId);
      if (!faction) return null;
      return {
        ...faction,
        volume: stats.volume,
        sentiment: stats.count > 0 ? stats.sentiment / stats.count : 0
      };
    }).filter(Boolean);

    // Combine related persons and orgs as entities for stat cards
    data.entities = [...data.relatedPersons, ...data.relatedOrgs];

    // Get faction overlaps from the factions found
    const factionIdsForOverlaps = data.factions.map(f => f.id);
    data.factionOverlaps = (DataService.getFactionOverlaps ? DataService.getFactionOverlaps() : [])
      .filter(o => o.factionIds.some(fid => factionIdsForOverlaps.includes(fid)));

    // Build map locations from entity locations
    data.mapLocations = data.locations.map(loc => ({
      id: loc.id,
      name: loc.name,
      coordinates: loc.coordinates,
      type: loc.type || 'location'
    })).filter(loc => loc.coordinates);

    // Narrative durations for volume/duration toggle
    data.narrativeDurations = DataService.getNarrativeDurations();

    // Get activity (comments and highlights) for this entity's documents
    const activityDocIds = new Set(data.documents.map(d => d.id));
    const allActivity = DataService.getAllActivity();
    data.activity = allActivity.filter(item => activityDocIds.has(item.documentId));

    // Get quotes and activities for this entity (scoped to document set)
    const docIdsForQuotes = scopeDocIds || null;
    if (this.isPerson) {
      data.quotes = DataService.getQuotesForPerson(this.entityId, docIdsForQuotes);
      data.entityActivities = DataService.getActivitiesForPerson(this.entityId, docIdsForQuotes);
    } else {
      data.quotes = DataService.getQuotesForOrganization(this.entityId, docIdsForQuotes);
      data.entityActivities = DataService.getActivitiesForOrganization(this.entityId, docIdsForQuotes);
    }

    return data;
  }

  /**
   * Set up card components for Dashboard tab (all cards except documents)
   */
  setupDashboardCards(entity, data) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);
    
    const prefix = this.isPerson ? 'person' : 'org';

    // 1. Quotes Table (half-width) - first card
    if (data.quotes && data.quotes.length > 0) {
      this.cardManager.add(new QuotesTableCard(this, `${prefix}-quotes`, {
        title: 'Quotes',
        quotes: data.quotes,
        halfWidth: true
      }));
    }

    // 2. Activities Table (half-width) - second card
    if (data.entityActivities && data.entityActivities.length > 0) {
      this.cardManager.add(new ActivitiesTableCard(this, `${prefix}-activities`, {
        title: 'Activities',
        activities: data.entityActivities,
        halfWidth: true
      }));
    }

    // 3. People & Organizations Network (half-width)
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, `${prefix}-network`, {
        title: 'Related People & Organizations',
        personIds: data.networkPersonIds,
        orgIds: data.networkOrgIds,
        excludeId: this.entityId,
        excludeType: this.entityType,
        halfWidth: true
      }));
    }

    // 2. Faction Sentiment (half-width)
    if (data.factionSentimentData.length > 0) {
      this.cardManager.add(new SentimentChartCard(this, `${prefix}-sentiment`, {
        title: `Faction Sentiment Toward ${entity.name}`,
        factions: data.factionSentimentData,
        halfWidth: true,
        clickRoute: 'faction'
      }));
    }

    // 3. Volume & Events Chart (w/ factions and source) - full-width
    const hasDurationData = data.narrativeDurations?.length > 0;
    if (data.hasVolumeTimeline || hasDurationData) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, `${prefix}-volume-events`, {
        title: 'Volume & Events',
        volumeData: data.volumeData,
        publisherData: data.publisherData,
        events: data.allEvents,
        narrativeDurations: hasDurationData ? data.narrativeDurations : null,
        fullWidth: true,
        height: 450,
        volumeHeight: 180,
        timelineHeight: 180,
        showViewToggle: data.hasVolumeData && data.hasPublisherData
      }));
    }

    // 4. Narratives (half-width)
    if (data.narratives.length > 0) {
      this.cardManager.add(new NarrativeListCard(this, `${prefix}-narratives`, {
        title: 'Related Narratives',
        narratives: data.narratives,
        showCount: true,
        halfWidth: true,
        showDescriptionToggle: true
      }));
    }

    // 5. Topics (half-width)
    if (data.topics.length > 0) {
      this.cardManager.add(new TopicListCard(this, `${prefix}-topics`, {
        title: 'Related Topics',
        topics: data.topics,
        showCount: true,
        halfWidth: true,
        showBulletsToggle: true
      }));
    }

    // 6. Affiliated Factions Venn Diagram (half-width)
    if (data.affiliatedFactions.length >= 1) {
      // Get overlaps between affiliated factions
      const affiliatedFactionIds = data.affiliatedFactions.map(f => f.id);
      const affiliatedOverlaps = (DataService.getFactionOverlaps ? DataService.getFactionOverlaps() : [])
        .filter(o => o.factionIds.every(fid => affiliatedFactionIds.includes(fid)));
      
      this.cardManager.add(new VennDiagramCard(this, `${prefix}-affiliated-factions`, {
        title: 'Affiliated Factions',
        factions: data.affiliatedFactions,
        overlaps: affiliatedOverlaps,
        halfWidth: true,
        height: 300
      }));
    }

    // 7. Related Factions Venn Diagram (half-width) - factions from document mentions
    if (data.factions.length >= 1) {
      this.cardManager.add(new VennDiagramCard(this, `${prefix}-venn`, {
        title: 'Related Factions',
        factions: data.factions,
        overlaps: data.factionOverlaps,
        halfWidth: true,
        height: 300
      }));
    }

    // 8. Locations & Events Map (half-width)
    if (data.locations.length > 0 || data.allEvents.length > 0) {
      this.cardManager.add(new MapCard(this, `${prefix}-map`, {
        title: 'Locations & Events',
        locations: data.locations,
        events: data.allEvents,
        halfWidth: true,
        showViewToggle: true
      }));
    }
  }

  /**
   * Render the page header
   * @param {Object} entity - The entity object
   * @param {Object} data - The fetched entity data (for stats)
   * @param {Array} tabsConfig - Tabs configuration for PageHeader
   * @param {string} activeTab - The currently active tab
   */
  renderHeader(entity, data, tabsConfig = null, activeTab = 'dashboard') {
    const personIcon = `<svg viewBox="0 0 16 16" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25">
      <circle cx="8" cy="4" r="2.5"/>
      <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
    </svg>`;
    const orgIcon = `<svg viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
      <path d="M2.75 2.5C2.61193 2.5 2.5 2.61193 2.5 2.75V3.25C2.5 3.38807 2.61193 3.5 2.75 3.5H3.25C3.38807 3.5 3.5 3.38807 3.5 3.25V2.75C3.5 2.61193 3.38807 2.5 3.25 2.5H2.75Z"/>
      <path d="M4.5 2.75C4.5 2.61193 4.61193 2.5 4.75 2.5H5.25C5.38807 2.5 5.5 2.61193 5.5 2.75V3.25C5.5 3.38807 5.38807 3.5 5.25 3.5H4.75C4.61193 3.5 4.5 3.38807 4.5 3.25V2.75Z"/>
      <path d="M2.75 4.5C2.61193 4.5 2.5 4.61193 2.5 4.75V5.25C2.5 5.38807 2.61193 5.5 2.75 5.5H3.25C3.38807 5.5 3.5 5.38807 3.5 5.25V4.75C3.5 4.61193 3.38807 4.5 3.25 4.5H2.75Z"/>
      <path d="M2.5 6.75C2.5 6.61193 2.61193 6.5 2.75 6.5H3.25C3.38807 6.5 3.5 6.61193 3.5 6.75V7.25C3.5 7.38807 3.38807 7.5 3.25 7.5H2.75C2.61193 7.5 2.5 7.38807 2.5 7.25V6.75Z"/>
      <path d="M2.75 8.5C2.61193 8.5 2.5 8.61193 2.5 8.75V9.25C2.5 9.38807 2.61193 9.5 2.75 9.5H3.25C3.38807 9.5 3.5 9.38807 3.5 9.25V8.75C3.5 8.61193 3.38807 8.5 3.25 8.5H2.75Z"/>
      <path d="M2.5 10.75C2.5 10.6119 2.61193 10.5 2.75 10.5H3.25C3.38807 10.5 3.5 10.6119 3.5 10.75V11.25C3.5 11.3881 3.38807 11.5 3.25 11.5H2.75C2.61193 11.5 2.5 11.3881 2.5 11.25V10.75Z"/>
      <path d="M4.75 4.5C4.61193 4.5 4.5 4.61193 4.5 4.75V5.25C4.5 5.38807 4.61193 5.5 4.75 5.5H5.25C5.38807 5.5 5.5 5.38807 5.5 5.25V4.75C5.5 4.61193 5.38807 4.5 5.25 4.5H4.75Z"/>
      <path d="M4.5 6.75C4.5 6.61193 4.61193 6.5 4.75 6.5H5.25C5.38807 6.5 5.5 6.61193 5.5 6.75V7.25C5.5 7.38807 5.38807 7.5 5.25 7.5H4.75C4.61193 7.5 4.5 7.38807 4.5 7.25V6.75Z"/>
      <path d="M4.75 8.5C4.61193 8.5 4.5 8.61193 4.5 8.75V9.25C4.5 9.38807 4.61193 9.5 4.75 9.5H5.25C5.38807 9.5 5.5 9.38807 5.5 9.25V8.75C5.5 8.61193 5.38807 8.5 5.25 8.5H4.75Z"/>
      <path d="M4.5 10.75C4.5 10.6119 4.61193 10.5 4.75 10.5H5.25C5.38807 10.5 5.5 10.6119 5.5 10.75V11.25C5.5 11.3881 5.38807 11.5 5.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25V10.75Z"/>
      <path d="M6.75 2.5C6.61193 2.5 6.5 2.61193 6.5 2.75V3.25C6.5 3.38807 6.61193 3.5 6.75 3.5H7.25C7.38807 3.5 7.5 3.38807 7.5 3.25V2.75C7.5 2.61193 7.38807 2.5 7.25 2.5H6.75Z"/>
      <path d="M6.5 4.75C6.5 4.61193 6.61193 4.5 6.75 4.5H7.25C7.38807 4.5 7.5 4.61193 7.5 4.75V5.25C7.5 5.38807 7.38807 5.5 7.25 5.5H6.75C6.61193 5.5 6.5 5.38807 6.5 5.25V4.75Z"/>
      <path d="M6.75 6.5C6.61193 6.5 6.5 6.61193 6.5 6.75V7.25C6.5 7.38807 6.61193 7.5 6.75 7.5H7.25C7.38807 7.5 7.5 7.38807 7.5 7.25V6.75C7.5 6.61193 7.38807 6.5 7.25 6.5H6.75Z"/>
      <path d="M6.5 8.75C6.5 8.61193 6.61193 8.5 6.75 8.5H7.25C7.38807 8.5 7.5 8.61193 7.5 8.75V9.25C7.5 9.38807 7.38807 9.5 7.25 9.5H6.75C6.61193 9.5 6.5 9.38807 6.5 9.25V8.75Z"/>
      <path d="M6.75 10.5C6.61193 10.5 6.5 10.6119 6.5 10.75V11.25C6.5 11.3881 6.61193 11.5 6.75 11.5H7.25C7.38807 11.5 7.5 11.3881 7.5 11.25V10.75C7.5 10.6119 7.38807 10.5 7.25 10.5H6.75Z"/>
      <path d="M11.25 6.5C11.1119 6.5 11 6.61193 11 6.75V7.25C11 7.38807 11.1119 7.5 11.25 7.5H11.75C11.8881 7.5 12 7.38807 12 7.25V6.75C12 6.61193 11.8881 6.5 11.75 6.5H11.25Z"/>
      <path d="M11 8.75C11 8.61193 11.1119 8.5 11.25 8.5H11.75C11.8881 8.5 12 8.61193 12 8.75V9.25C12 9.38807 11.8881 9.5 11.75 9.5H11.25C11.1119 9.5 11 9.38807 11 9.25V8.75Z"/>
      <path d="M11.25 10.5C11.1119 10.5 11 10.6119 11 10.75V11.25C11 11.3881 11.1119 11.5 11.25 11.5H11.75C11.8881 11.5 12 11.3881 12 11.25V10.75C12 10.6119 11.8881 10.5 11.75 10.5H11.25Z"/>
      <path d="M11 12.75C11 12.6119 11.1119 12.5 11.25 12.5H11.75C11.8881 12.5 12 12.6119 12 12.75V13.25C12 13.3881 11.8881 13.5 11.75 13.5H11.25C11.1119 13.5 11 13.3881 11 13.25V12.75Z"/>
      <path d="M13.25 6.5C13.1119 6.5 13 6.61193 13 6.75V7.25C13 7.38807 13.1119 7.5 13.25 7.5H13.75C13.8881 7.5 14 7.38807 14 7.25V6.75C14 6.61193 13.8881 6.5 13.75 6.5H13.25Z"/>
      <path d="M13 8.75C13 8.61193 13.1119 8.5 13.25 8.5H13.75C13.8881 8.5 14 8.61193 14 8.75V9.25C14 9.38807 13.8881 9.5 13.75 9.5H13.25C13.1119 9.5 13 9.38807 13 9.25V8.75Z"/>
      <path d="M13.25 10.5C13.1119 10.5 13 10.6119 13 10.75V11.25C13 11.3881 13.1119 11.5 13.25 11.5H13.75C13.8881 11.5 14 11.3881 14 11.25V10.75C14 10.6119 13.8881 10.5 13.75 10.5H13.25Z"/>
      <path d="M13 12.75C13 12.6119 13.1119 12.5 13.25 12.5H13.75C13.8881 12.5 14 12.6119 14 12.75V13.25C14 13.3881 13.8881 13.5 13.75 13.5H13.25C13.1119 13.5 13 13.3881 13 13.25V12.75Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 16H9.5C9.59107 16 9.67646 15.9757 9.75 15.9331C9.82354 15.9757 9.90893 16 10 16H15.5C15.7761 16 16 15.7761 16 15.5V4.5C16 4.22386 15.7761 4 15.5 4H10V0.5C10 0.223858 9.77614 0 9.5 0H0.5C0.223858 0 0 0.223858 0 0.5V15.5C0 15.7761 0.223858 16 0.5 16ZM1 15V1H9V15H7V13C7 12.7239 6.77614 12.5 6.5 12.5H3.5C3.22386 12.5 3 12.7239 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z"/>
    </svg>`;
    const icon = this.isPerson ? personIcon : orgIcon;
    const typeLabel = entity.type 
      ? `Type: ${entity.type}` 
      : (this.isPerson ? 'Person' : 'Organization');

    // Build context-aware breadcrumbs
    const breadcrumbs = this.buildBreadcrumbs([
      entity.name
    ]);

    // Build stats for the header with dropdown support
    const contextId = this.context?.id || null;
    const statsData = StatCards.buildEntityStatsWithItems(data, contextId);

    return PageHeader.render({
      breadcrumbs,
      title: entity.name,
      icon: icon,
      imageUrl: entity.imageUrl || null,
      imageAlt: entity.name,
      subtitle: typeLabel,
      description: entity.description,
      descriptionLink: entity.description 
        ? `<a href="#" class="btn btn-small btn-secondary source-link" data-source-type="${this.entityType}" data-source-id="${entity.id}">View source</a>` 
        : '',
      tagsContainerId: 'entity-tags-container',
      stats: statsData,
      statsMode: 'dropdowns',
      statsContextId: contextId,
      tabs: tabsConfig,
      activeTab: activeTab
    });
  }

}

export default EntityDetailView;
