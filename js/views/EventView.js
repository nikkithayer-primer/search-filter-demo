/**
 * EventView.js
 * Detail view for an event using the CardManager pattern
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { aggregateFactionSentiment } from '../utils/volumeDataUtils.js';
import { StatCards } from '../components/StatCards.js';
import {
  CardManager,
  NetworkGraphCard,
  NarrativeListCard,
  MapCard,
  TimelineVolumeCompositeCard,
  TopicListCard,
  SentimentChartCard,
  VennDiagramCard,
  QuotesTableCard,
  ActivitiesTableCard
} from '../components/CardComponents.js';

export class EventView extends DetailViewBase {
  constructor(container, eventId, options = {}) {
    super(container, options);
    this.eventId = eventId;
    this.cardManager = new CardManager(this);
  }

  async render() {
    const event = DataService.getEvent(this.eventId);
    if (!event) {
      this.renderNotFound('Event');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchEventData(event);
    
    // Store data for card setup
    this._eventData = { event, data };
    
    // Determine active tab
    const activeTab = this.getCurrentTab();
    const hasDocuments = data.documents.length > 0;
    
    // Build cards based on active tab
    if (this.isDocumentsTab()) {
      super.setupDocumentsCard(event, data, 'event');
    } else {
      this.setupDashboardCards(event, data);
    }
    
    // Generate tabs config - use ID-based routing
    const baseHref = this.buildContextRoute(this.eventId);
    const tabsConfig = hasDocuments ? this.getTabsConfig(baseHref, true) : null;

    // Format date for subtitle
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const subtitleParts = [
      formattedDate,
      data.location ? data.location.name : ''
    ].filter(Boolean).join(' • ');

    // Build context-aware breadcrumbs
    const breadcrumbItems = [];
    if (data.parentEvent) {
      breadcrumbItems.push({ label: this.truncateText(data.parentEvent.text, 30), id: data.parentEvent.id });
    }
    breadcrumbItems.push(this.truncateText(event.text, 40));
    const breadcrumbs = this.buildBreadcrumbs(breadcrumbItems);

    // Build stats for the header with dropdown support
    const contextId = this.context?.id || null;
    const statsData = StatCards.buildEntityStatsWithItems(data, contextId);

    // Build page header with tabs
    const headerHtml = PageHeader.render({
      breadcrumbs,
      title: event.text,
      subtitle: subtitleParts,
      description: event.description,
      descriptionLink: event.description 
        ? `<a href="#" class="btn btn-small btn-secondary source-link" data-source-type="event" data-source-id="${event.id}">View source</a>` 
        : '',
      tagsContainerId: 'event-tags-container',
      stats: statsData,
      statsMode: 'dropdowns',
      statsContextId: contextId,
      tabs: tabsConfig,
      activeTab: activeTab
    });

    // Build parent link HTML if applicable (only on dashboard tab)
    const parentLinkRoute = data.parentEvent ? this.buildContextRoute(data.parentEvent.id) : '';
    const parentLinkHtml = data.parentEvent && this.isDashboardTab() ? `
      <div class="parent-link" onclick="window.location.hash='${parentLinkRoute}'">
        <span class="parent-link-icon">↑</span>
        <span class="parent-link-text">${data.parentEvent.text}</span>
      </div>
    ` : '';

    // Render page
    this.container.innerHTML = `
      ${headerHtml}
      <div class="content-area">
        ${parentLinkHtml}
        <div class="content-grid">
          ${this.cardManager.getHtml()}
        </div>
      </div>
    `;

    // Initialize stat card dropdowns
    this.initStatDropdowns(contextId, this.eventId);

    // Initialize card width toggles
    this.initCardWidthToggles('event', this.eventId);

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Initialize tag chips
    this.initTagChips(event, 'event');
  }

  /**
   * Fetch all data related to the event
   */
  fetchEventData(event) {
    const parentEvent = DataService.getParentEvent(this.eventId);
    const subEvents = DataService.getSubEventsForEvent(this.eventId);
    const location = DataService.getLocationForEvent(this.eventId);
    const persons = DataService.getPersonsForEvent(this.eventId);
    const organizations = DataService.getOrganizationsForEvent(this.eventId);
    const narratives = DataService.getNarrativesForEvent(this.eventId);
    const documents = DataService.getDocumentsForEvent(this.eventId);
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    // Get person/org IDs for network graph
    const personIds = persons.map(p => p.id);
    const orgIds = organizations.map(o => o.id);

    // All events including this one and sub-events for timeline
    const allEvents = [event, ...subEvents];

    // Prepare volume data for the composite chart (scoped to event's documents)
    const docIds = documents.map(d => d.id);
    const volumeResult = DataService.getVolumeDataForDocuments(docIds);
    const publisherData = volumeResult.byPublisher;
    const hasPublisherData = publisherData && publisherData.dates.length > 0;
    const hasVolumeTimeline = hasPublisherData || allEvents.length > 0;

    // Get topics related to this event (topics that share documents)
    const eventDocIds = new Set(documents.map(d => d.id));
    const allTopics = DataService.getTopics ? DataService.getTopics() : [];
    const topics = allTopics.filter(topic =>
      (topic.documentIds || []).some(dId => eventDocIds.has(dId))
    );

    // Get factions from documents and compute sentiment
    const sentimentFactions = aggregateFactionSentiment(documents);
    const factions = sentimentFactions.map(sf => DataService.getFaction(sf.id)).filter(Boolean);

    // Get faction overlaps
    const factionOverlaps = factions.length > 1
      ? DataService.getFactionOverlapsFor(factions[0]?.id).filter(o =>
          o.factionIds.every(fid => factions.some(f => f.id === fid))
        )
      : [];

    // Build map locations
    const mapLocations = location ? [{ ...location, isEvent: true, eventText: event.text }] : [];

    // Narrative durations for volume/duration toggle
    const narrativeDurations = DataService.getNarrativeDurations();

    // Combine persons and organizations as entities for stat cards
    const entities = [...persons, ...organizations];
    
    // Locations as array for stat cards
    const locations = location ? [location] : [];

    // Get activity (comments and highlights) for this event's documents
    const docIdSet = new Set(documents.map(d => d.id));
    const allActivityData = DataService.getAllActivity();
    const activity = allActivityData.filter(item => docIdSet.has(item.documentId));

    // Get quotes and activities from this event's documents
    const quotes = DataService.getQuotesForDocuments(docIds);
    const entityActivities = DataService.getActivitiesForDocuments(docIds);

    return { 
      parentEvent, subEvents, location, persons, organizations, 
      narratives, documents, hasNetwork, personIds, orgIds, allEvents,
      events: allEvents,
      publisherData, hasPublisherData, hasVolumeTimeline, topics,
      factions, sentimentFactions, factionOverlaps, mapLocations,
      narrativeDurations, entities, locations, activity,
      quotes, entityActivities
    };
  }

  /**
   * Set up card components for Dashboard tab
   */
  setupDashboardCards(event, data) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    // 1. Quotes Table (half-width)
    if (data.quotes && data.quotes.length > 0) {
      this.cardManager.add(new QuotesTableCard(this, 'event-quotes', {
        title: 'Quotes',
        quotes: data.quotes,
        halfWidth: true
      }));
    }

    // 2. Activities Table (half-width)
    if (data.entityActivities && data.entityActivities.length > 0) {
      this.cardManager.add(new ActivitiesTableCard(this, 'event-activities', {
        title: 'Activities',
        activities: data.entityActivities,
        halfWidth: true
      }));
    }

    // 3. Volume & Events Chart (full-width)
    const hasDurationData = data.narrativeDurations?.length > 0;
    if (data.hasVolumeTimeline || hasDurationData) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, 'event-volume-events', {
        title: 'Volume & Events',
        publisherData: data.publisherData,
        events: data.allEvents,
        narrativeDurations: hasDurationData ? data.narrativeDurations : null,
        fullWidth: true,
        height: 450,
        volumeHeight: 180,
        timelineHeight: 180,
        showViewToggle: false
      }));
    }

    // 4. Related Narratives (half-width)
    if (data.narratives.length > 0) {
      this.cardManager.add(new NarrativeListCard(this, 'event-narratives', {
        title: 'Narratives',
        narratives: data.narratives,
        halfWidth: true,
        showCount: true,
        maxItems: 8,
        showDescriptionToggle: true
      }));
    }

    // 5. Topics (half-width)
    if (data.topics.length > 0) {
      this.cardManager.add(new TopicListCard(this, 'event-topics', {
        title: 'Topics',
        topics: data.topics,
        halfWidth: true,
        showCount: true,
        showBulletsToggle: true
      }));
    }

    // 6. People & Organizations Network (half-width)
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, 'event-network', {
        title: 'People & Orgs',
        personIds: data.personIds,
        orgIds: data.orgIds,
        halfWidth: true,
        height: 350
      }));
    }

    // 7. Faction Sentiment (half-width)
    if (data.sentimentFactions.length > 0) {
      this.cardManager.add(new SentimentChartCard(this, 'event-sentiment', {
        title: 'Faction Sentiment',
        factions: data.sentimentFactions,
        halfWidth: true,
        clickRoute: 'faction'
      }));
    }

    // 8. Faction Overlaps Venn Diagram (half-width)
    if (data.factions.length >= 2) {
      this.cardManager.add(new VennDiagramCard(this, 'event-venn', {
        title: 'Faction Overlaps',
        factions: data.factions,
        overlaps: data.factionOverlaps,
        halfWidth: true,
        height: 300
      }));
    }

    // 9. Location Map (half-width)
    if (data.mapLocations.length > 0) {
      this.cardManager.add(new MapCard(this, 'event-map', {
        title: 'Locations',
        locations: data.mapLocations,
        halfWidth: true,
        height: 350,
        defaultZoom: 12,
        showViewToggle: true
      }));
    }
  }

}

export default EventView;
