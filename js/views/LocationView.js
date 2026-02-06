/**
 * LocationView.js
 * Detail view for a location using the CardManager pattern
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
  MapCard,
  VennDiagramCard,
  TimelineVolumeCompositeCard
} from '../components/CardComponents.js';

export class LocationView extends DetailViewBase {
  constructor(container, locationId, options = {}) {
    super(container, options);
    this.locationId = locationId;
    this.cardManager = new CardManager(this);
  }

  async render() {
    const location = DataService.getLocation(this.locationId);
    if (!location) {
      this.renderNotFound('Location');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchLocationData(location);
    
    // Store data for card setup
    this._locationData = { location, data };
    
    // Determine active tab
    const activeTab = this.getCurrentTab();
    const hasDocuments = data.documents.length > 0;
    
    // Build cards based on active tab
    if (this.isDocumentsTab()) {
      super.setupDocumentsCard(location, data, 'location');
    } else {
      this.setupDashboardCards(location, data);
    }
    
    // Generate tabs config - use ID-based routing
    const baseHref = this.buildContextRoute(this.locationId);
    const tabsConfig = hasDocuments ? this.getTabsConfig(baseHref, true) : null;

    // Build subtitle
    const subtitleParts = [
      location.type ? `Type: ${location.type}` : '',
      location.coordinates ? `Coordinates: ${location.coordinates.lat.toFixed(4)}, ${location.coordinates.lng.toFixed(4)}` : ''
    ].filter(Boolean).join(' • ');

    // Build context-aware breadcrumbs
    const breadcrumbs = this.buildBreadcrumbs([
      location.name
    ]);

    // Build stats for the header with dropdown support
    const contextId = this.context?.id || null;
    const statsData = StatCards.buildEntityStatsWithItems(data, contextId);

    // Build page header with tabs
    const headerHtml = PageHeader.render({
      breadcrumbs,
      title: location.name,
      subtitle: subtitleParts,
      description: location.description,
      descriptionLink: location.description 
        ? `<a href="#" class="btn btn-small btn-secondary source-link" data-source-type="location" data-source-id="${location.id}">View source</a>` 
        : '',
      tagsContainerId: 'location-tags-container',
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
    this.initStatDropdowns(contextId, this.locationId);

    // Initialize card width toggles
    this.initCardWidthToggles('location', this.locationId);

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Initialize tag chips
    this.initTagChips(location, 'location');
  }

  /**
   * Fetch all data related to the location
   */
  fetchLocationData(location) {
    const narratives = DataService.getNarrativesForLocation(this.locationId);
    const events = DataService.getEventsForLocation(this.locationId);
    const allEvents = events.flatMap(e => [e, ...DataService.getSubEventsForEvent(e.id)]);
    const persons = DataService.getPersonsForLocation(this.locationId);
    const organizations = DataService.getOrganizationsForLocation(this.locationId);
    const documents = DataService.getDocumentsForLocation(this.locationId);
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    // Get person/org IDs for network graph
    const personIds = persons.map(p => p.id);
    const orgIds = organizations.map(o => o.id);

    // Prepare volume data for the composite chart (scoped to location's documents)
    const docIds = documents.map(d => d.id);
    const volumeResult = DataService.getVolumeDataForDocuments(docIds);
    const publisherData = volumeResult.byPublisher;
    const hasPublisherData = publisherData && publisherData.dates.length > 0;
    const hasVolumeTimeline = hasPublisherData || allEvents.length > 0;

    // Get related topics (topics that share documents with this location's documents)
    const locationDocIds = new Set(documents.map(d => d.id));
    const allTopics = DataService.getTopics ? DataService.getTopics() : [];
    const topics = allTopics.filter(topic =>
      (topic.documentIds || []).some(dId => locationDocIds.has(dId))
    );

    // Get factions from documents and compute overlaps
    // Note: factionMentions is an object with factionId keys, not an array
    const factionIdSet = new Set();
    documents.forEach(doc => {
      Object.keys(doc.factionMentions || {}).forEach(factionId => {
        factionIdSet.add(factionId);
      });
    });
    const factions = [...factionIdSet].map(id => DataService.getFaction(id)).filter(Boolean);
    const factionOverlaps = factions.length >= 2
      ? DataService.getFactionOverlapsFor(factions[0]?.id).filter(o =>
          o.factionIds.every(fid => factions.some(f => f.id === fid))
        )
      : [];

    // Narrative durations for volume/duration toggle
    const narrativeDurations = DataService.getNarrativeDurations();

    // Combine persons and organizations as entities for stat cards
    const entities = [...persons, ...organizations];

    // Get activity (comments and highlights) for this location's documents
    const docIdSet = new Set(documents.map(d => d.id));
    const allActivityData = DataService.getAllActivity();
    const activity = allActivityData.filter(item => docIdSet.has(item.documentId));

    return {
      narratives, events, allEvents, persons, organizations, documents,
      hasNetwork, personIds, orgIds, publisherData, hasPublisherData,
      hasVolumeTimeline, topics, factions, factionOverlaps, narrativeDurations, entities, activity
    };
  }

  /**
   * Set up card components for Dashboard tab
   */
  setupDashboardCards(location, data) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    // Volume & Events Chart (full-width)
    const hasDurationData = data.narrativeDurations?.length > 0;
    if (data.hasVolumeTimeline || hasDurationData) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, 'location-volume-events', {
        title: 'Volume & Events',
        volumeData: null, // No faction data for locations
        publisherData: data.publisherData,
        events: data.allEvents,
        narrativeDurations: hasDurationData ? data.narrativeDurations : null,
        fullWidth: true,
        height: 450,
        volumeHeight: 180,
        timelineHeight: 180,
        showViewToggle: false // Only show by publisher for locations
      }));
    }

    // Location Map (full width) - shows location and events at this location
    if (location.coordinates) {
      this.cardManager.add(new MapCard(this, 'location-map', {
        title: 'Location & Events',
        locations: [location],
        events: data.allEvents,
        fullWidth: true,
        height: 400,
        defaultZoom: 12,
        centerOn: { lat: location.coordinates.lat, lng: location.coordinates.lng, zoom: 12 },
        showViewToggle: true
      }));
    }

    // People & Organizations Network (half-width)
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, 'location-network', {
        title: 'People & Organizations',
        personIds: data.personIds,
        orgIds: data.orgIds,
        halfWidth: true,
        height: 350
      }));
    }

    // Related Narratives (half-width)
    if (data.narratives.length > 0) {
      this.cardManager.add(new NarrativeListCard(this, 'location-narratives', {
        title: 'Related Narratives',
        narratives: data.narratives,
        showCount: true,
        maxItems: 8,
        halfWidth: true,
        showDescriptionToggle: true
      }));
    }

    // Related Topics (half-width)
    if (data.topics.length > 0) {
      this.cardManager.add(new TopicListCard(this, 'location-topics', {
        title: 'Related Topics',
        topics: data.topics,
        halfWidth: true,
        showCount: true,
        showBulletsToggle: true
      }));
    }

    // Faction Overlaps Venn Diagram (half-width)
    if (data.factions.length >= 2) {
      this.cardManager.add(new VennDiagramCard(this, 'location-venn', {
        title: 'Faction Overlaps',
        factions: data.factions,
        overlaps: data.factionOverlaps,
        halfWidth: true,
        height: 300
      }));
    }
  }

}

export default LocationView;
