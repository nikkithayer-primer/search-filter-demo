/**
 * TopicView.js
 * Detail view for a topic using the CardManager pattern
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { StatCards } from '../components/StatCards.js';
import {
  CardManager,
  BulletPointsCard,
  NetworkGraphCard,
  VennDiagramCard,
  MapCard,
  NarrativeListCard,
  SentimentChartCard,
  TimelineVolumeCompositeCard
} from '../components/CardComponents.js';

export class TopicView extends DetailViewBase {
  constructor(container, topicId, options = {}) {
    super(container, options);
    this.topicId = topicId;
    this.cardManager = new CardManager(this);
  }

  async render() {
    const topic = DataService.getTopicById(this.topicId);
    if (!topic) {
      this.renderNotFound('Topic');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchTopicData(topic);
    
    // Store data for card setup
    this._topicData = { topic, data };
    
    // Determine active tab
    const activeTab = this.getCurrentTab();
    const hasDocuments = data.documents.length > 0;
    
    // Build cards based on active tab
    if (this.isDocumentsTab()) {
      super.setupDocumentsCard(topic, data, 'topic');
    } else {
      this.setupDashboardCards(topic, data);
    }
    
    // Generate tabs config - use ID-based routing
    const baseHref = this.buildContextRoute(this.topicId);
    const tabsConfig = hasDocuments ? this.getTabsConfig(baseHref, true) : null;

    // Format date range for subtitle
    const dateRange = this.formatDateRange(topic.startDate, topic.endDate);
    const duration = this.formatDuration(topic.startDate, topic.endDate);
    const isActive = !topic.endDate || new Date(topic.endDate) >= new Date();
    const statusBadge = isActive 
      ? '<span class="status-badge status-active">Active</span>'
      : '<span class="status-badge status-ended">Ended</span>';

    // Build context-aware breadcrumbs
    const breadcrumbs = this.buildBreadcrumbs([
      topic.headline
    ]);

    // Build stats for the header with dropdown support
    const contextId = this.context?.id || null;
    const statsData = StatCards.buildEntityStatsWithItems(data, contextId);

    // Build page header with tabs
    const headerHtml = PageHeader.render({
      breadcrumbs,
      title: topic.headline,
      subtitle: `${dateRange} · ${duration} ${statusBadge}`,
      description: topic.description,
      descriptionLink: topic.description 
        ? `<a href="#" class="btn btn-small btn-secondary source-link" data-source-type="topic" data-source-id="${topic.id}">View source</a>` 
        : '',
      tagsContainerId: 'topic-tags-container',
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
    this.initStatDropdowns(contextId, this.topicId);

    // Initialize card width toggles
    this.initCardWidthToggles('topic', this.topicId);

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Initialize tag chips
    this.initTagChips(topic, 'topic');
  }

  /**
   * Fetch all data related to the topic
   * Uses document scope from context if available
   */
  fetchTopicData(topic) {
    const scopeDocIds = this.getDocumentScope();
    const documents = DataService.getDocumentsForTopic(this.topicId, scopeDocIds);

    // Prepare volume data for the composite chart (scoped to topic's documents)
    const docIds = documents.map(d => d.id);
    const volumeResult = DataService.getVolumeDataForDocuments(docIds);
    const publisherData = volumeResult.byPublisher;
    const hasPublisherData = publisherData && publisherData.dates.length > 0;

    // Get related narratives (narratives that share documents with this topic) - scoped
    const topicDocIds = new Set(documents.map(d => d.id));
    const allNarratives = DataService.getNarratives ? DataService.getNarratives(null, null, scopeDocIds) : [];
    const narratives = allNarratives.filter(narr =>
      (narr.documentIds || []).some(dId => topicDocIds.has(dId))
    );

    // Get events from related narratives
    const eventIds = new Set();
    narratives.forEach(n => {
      (n.eventIds || []).forEach(eId => eventIds.add(eId));
    });
    const events = [...eventIds].map(id => DataService.getEvent(id)).filter(Boolean);
    const allEvents = events.flatMap(e => [e, ...DataService.getSubEventsForEvent(e.id)]);

    const hasVolumeTimeline = hasPublisherData || allEvents.length > 0;

    // Collect person and org IDs from documents and narratives
    const personIds = new Set();
    const orgIds = new Set();
    documents.forEach(doc => {
      (doc.personIds || []).forEach(id => personIds.add(id));
      (doc.organizationIds || []).forEach(id => orgIds.add(id));
    });
    narratives.forEach(narr => {
      (narr.personIds || []).forEach(id => personIds.add(id));
      (narr.organizationIds || []).forEach(id => orgIds.add(id));
    });
    const hasNetwork = personIds.size > 0 || orgIds.size > 0;

    // Get factions and sentiment from documents
    const factionSentimentMap = new Map();
    documents.forEach(doc => {
      Object.entries(doc.factionMentions || {}).forEach(([factionId, data]) => {
        if (!factionSentimentMap.has(factionId)) {
          factionSentimentMap.set(factionId, { sum: 0, count: 0 });
        }
        const entry = factionSentimentMap.get(factionId);
        if (data.sentiment !== undefined) {
          entry.sum += data.sentiment;
          entry.count += 1;
        }
      });
    });

    const factions = [...factionSentimentMap.keys()].map(id => DataService.getFaction(id)).filter(Boolean);
    const sentimentFactions = factions.map(f => {
      const entry = factionSentimentMap.get(f.id);
      return {
        ...f,
        sentiment: entry.count > 0 ? entry.sum / entry.count : 0
      };
    });

    // Compute faction overlaps
    const factionOverlaps = factions.length >= 2
      ? DataService.getFactionOverlapsFor(factions[0]?.id).filter(o =>
          o.factionIds.every(fid => factions.some(f => f.id === fid))
        )
      : [];

    // Get locations from documents and events
    const locationIds = new Set();
    documents.forEach(doc => {
      (doc.locationIds || []).forEach(id => locationIds.add(id));
    });
    events.forEach(e => {
      if (e.locationId) locationIds.add(e.locationId);
    });
    const locations = [...locationIds].map(id => DataService.getLocation(id)).filter(Boolean);
    const mapLocations = [
      ...locations.map(l => ({ ...l, isEvent: false })),
      ...events.filter(e => e.locationId).map(e => {
        const loc = DataService.getLocation(e.locationId);
        return loc ? { ...loc, isEvent: true, eventText: e.text } : null;
      }).filter(Boolean)
    ];

    // Narrative durations for volume/duration toggle
    const narrativeDurations = DataService.getNarrativeDurations();

    // Get actual person and org entities for stat cards
    const persons = [...personIds].map(id => DataService.getPerson(id)).filter(Boolean);
    const organizations = [...orgIds].map(id => DataService.getOrganization(id)).filter(Boolean);
    const entities = [...persons, ...organizations];

    // Get activity (comments and highlights) for this topic's documents
    const docIdSet = new Set(documents.map(d => d.id));
    const allActivityData = DataService.getAllActivity();
    const activity = allActivityData.filter(item => docIdSet.has(item.documentId));

    return {
      documents,
      publisherData,
      hasPublisherData,
      hasVolumeTimeline,
      allEvents,
      events: allEvents,
      narratives,
      personIds: [...personIds],
      orgIds: [...orgIds],
      hasNetwork,
      factions,
      narrativeDurations,
      sentimentFactions,
      factionOverlaps,
      locations,
      mapLocations,
      entities,
      activity
    };
  }

  /**
   * Format duration from start to end date
   */
  formatDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 14) return '1 week';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks`;
    return `${Math.floor(diffDays / 30)} months`;
  }

  /**
   * Format date range for display
   */
  formatDateRange(startDate, endDate) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const start = new Date(startDate).toLocaleDateString('en-US', options);
    if (!endDate) {
      return `Since ${start}`;
    }
    const end = new Date(endDate).toLocaleDateString('en-US', options);
    return `${start} – ${end}`;
  }

  /**
   * Set up card components for Dashboard tab
   */
  setupDashboardCards(topic, data) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    // 1. Volume & Events Chart (by source) - full-width
    const hasDurationData = data.narrativeDurations?.length > 0;
    if (data.hasVolumeTimeline || hasDurationData) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, 'topic-volume-events', {
        title: 'Volume & Events',
        volumeData: null, // No faction data for topics
        publisherData: data.publisherData,
        events: data.allEvents,
        narrativeDurations: hasDurationData ? data.narrativeDurations : null,
        fullWidth: true,
        height: 450,
        volumeHeight: 180,
        timelineHeight: 180,
        showViewToggle: false // Only show by publisher for topics
      }));
    }

    // 2. Key Points (bullet points) - half-width
    if (topic.bulletPoints && topic.bulletPoints.length > 0) {
      this.cardManager.add(new BulletPointsCard(this, 'topic-bullets', {
        title: 'Key Points',
        bulletPoints: topic.bulletPoints,
        halfWidth: true,
        sourceType: 'topic',
        sourceId: topic.id
      }));
    }

    // 3. People & Organizations Network - half-width
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, 'topic-network', {
        title: 'People & Organizations',
        personIds: data.personIds,
        orgIds: data.orgIds,
        halfWidth: true,
        height: 400
      }));
    }

    // 4. Faction Overlaps Venn Diagram - half-width
    if (data.factions.length >= 2) {
      this.cardManager.add(new VennDiagramCard(this, 'topic-venn', {
        title: 'Faction Overlaps',
        factions: data.factions,
        overlaps: data.factionOverlaps,
        halfWidth: true,
        height: 300
      }));
    }

    // 5. Locations & Events Map - half-width
    if (data.locations.length > 0 || data.allEvents.length > 0) {
      this.cardManager.add(new MapCard(this, 'topic-map', {
        title: 'Locations & Events',
        locations: data.locations,
        events: data.allEvents,
        halfWidth: true,
        height: 350,
        showViewToggle: true
      }));
    }

    // 6. Related Narratives - half-width
    if (data.narratives.length > 0) {
      this.cardManager.add(new NarrativeListCard(this, 'topic-narratives', {
        title: 'Related Narratives',
        narratives: data.narratives,
        halfWidth: true,
        showCount: true,
        showDescriptionToggle: true
      }));
    }

    // 7. Sentiment by Faction - half-width
    if (data.sentimentFactions.length > 0) {
      this.cardManager.add(new SentimentChartCard(this, 'topic-sentiment', {
        title: 'Sentiment by Faction',
        factions: data.sentimentFactions,
        halfWidth: true,
        clickRoute: 'faction'
      }));
    }
  }

}

export default TopicView;
