/**
 * ThemeView.js
 * Detail view for a theme using the CardManager pattern
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import {
  CardManager,
  NetworkGraphCard,
  MapCard,
  SentimentChartCard,
  VennDiagramCard,
  TimelineVolumeCompositeCard,
  TopicListCard
} from '../components/CardComponents.js';

export class ThemeView extends DetailViewBase {
  constructor(container, themeId, options = {}) {
    super(container, options);
    this.themeId = themeId;
    this.cardManager = new CardManager(this);
  }

  async render() {
    const theme = DataService.getTheme(this.themeId);
    if (!theme) {
      this.renderNotFound('Theme');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchThemeData(theme);
    
    // Store data for card setup
    this._themeData = { theme, data };
    
    // Determine active tab
    const activeTab = this.getCurrentTab();
    const hasDocuments = data.documents.length > 0;
    
    // Build cards based on active tab
    if (this.isDocumentsTab()) {
      super.setupDocumentsCard(theme, data, 'theme');
    } else {
      this.setupDashboardCards(theme, data);
    }
    
    // Generate tabs config - use ID-based routing
    const baseHref = this.buildContextRoute(this.themeId);
    const tabsConfig = hasDocuments ? this.getTabsConfig(baseHref, true) : null;
    
    // Build context-aware breadcrumbs with optional parent narrative
    const breadcrumbItems = [];
    if (data.parentNarrative) {
      breadcrumbItems.push({ label: this.truncateText(data.parentNarrative.text, 30), href: this.buildContextRoute(data.parentNarrative.id) });
    }
    breadcrumbItems.push(this.truncateText(theme.text, 50));
    const breadcrumbs = this.buildBreadcrumbs(breadcrumbItems);

    // Build page header
    const headerHtml = PageHeader.render({
      breadcrumbs,
      title: theme.text,
      subtitle: `<span class="badge badge-${this.getSentimentClass(theme.sentiment)}">${this.formatSentiment(theme.sentiment)}</span>`,
      description: theme.description,
      descriptionLink: theme.description 
        ? `<a href="#" class="btn btn-small btn-secondary source-link" data-source-type="theme" data-source-id="${theme.id}">View source</a>` 
        : '',
      tagsContainerId: 'theme-tags-container',
      tabs: tabsConfig,
      activeTab: activeTab
    });

    // Build parent link HTML if applicable (only on dashboard tab) - ID-based
    const parentRoute = data.parentNarrative ? this.buildContextRoute(data.parentNarrative.id) : '';
    const parentLinkHtml = data.parentNarrative && this.isDashboardTab() ? `
      <div class="parent-link" onclick="window.location.hash='${parentRoute}'">
        <span class="parent-link-icon">↑</span>
        <span class="parent-link-text">${data.parentNarrative.text}</span>
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

    // Initialize card width toggles
    this.initCardWidthToggles('theme', this.themeId);

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Initialize tag chips
    this.initTagChips(theme, 'theme');
  }

  /**
   * Fetch all data related to the theme
   * Uses document scope from context if available
   */
  fetchThemeData(theme) {
    const scopeDocIds = this.getDocumentScope();
    const parentNarrative = DataService.getParentNarrative(this.themeId);
    const factionData = DataService.getFactionsForTheme(theme.id);
    const factions = factionData.map(f => f.faction).filter(Boolean);
    const factionOverlaps = factions.length > 1
      ? DataService.getFactionOverlapsFor(factions[0]?.id).filter(o =>
          o.factionIds.every(fid => factions.some(f => f.id === fid))
        )
      : [];

    // Check data availability for each section - use document-based aggregation (scoped)
    const volumeOverTime = DataService.getVolumeOverTimeForTheme(theme.id, null, scopeDocIds);
    const hasVolumeData = volumeOverTime.length > 0 && factions.length > 0;
    const locations = (theme.locationIds || []).map(lid => DataService.getLocation(lid)).filter(Boolean);
    const events = (theme.eventIds || []).map(eid => DataService.getEvent(eid)).filter(Boolean);
    const allEvents = events.flatMap(e => [e, ...DataService.getSubEventsForEvent(e.id)]);
    const personIds = theme.personIds || [];
    const orgIds = theme.organizationIds || [];
    const hasNetwork = personIds.length > 0 || orgIds.length > 0;

    // Get documents for the theme (scoped)
    const documents = DataService.getDocumentsForTheme(this.themeId, scopeDocIds);

    // Prepare volume data for the composite chart (by faction)
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

    // Prepare publisher volume data for the composite chart (scoped to theme's documents)
    const docIds = documents.map(d => d.id);
    const volumeResult = DataService.getVolumeDataForDocuments(docIds);
    const publisherData = volumeResult.byPublisher;
    const hasPublisherData = publisherData && publisherData.dates.length > 0;
    const hasVolumeTimeline = hasVolumeData || hasPublisherData || allEvents.length > 0;

    // Build sentiment data for the sentiment chart
    const sentimentFactions = factionData.map(fd => ({
      ...fd.faction,
      sentiment: fd.sentiment
    }));

    // Get related topics (topics that share documents with this theme's documents) - scoped
    const themeDocIds = new Set(documents.map(d => d.id));
    const allTopics = DataService.getTopics ? DataService.getTopics(scopeDocIds) : [];
    const topics = allTopics.filter(topic =>
      (topic.documentIds || []).some(dId => themeDocIds.has(dId))
    );

    // Build map locations including events
    const mapLocations = [
      ...locations.map(l => ({ ...l, isEvent: false })),
      ...events.filter(e => e.locationId).map(e => {
        const loc = DataService.getLocation(e.locationId);
        return loc ? { ...loc, isEvent: true, eventText: e.text } : null;
      }).filter(Boolean)
    ];

    // Narrative durations for volume/duration toggle (scoped)
    const narrativeDurations = DataService.getNarrativeDurations(null, null, null, scopeDocIds);

    return {
      parentNarrative, factionData, factions, factionOverlaps,
      volumeOverTime, hasVolumeData, volumeData, publisherData, hasPublisherData,
      hasVolumeTimeline, locations, mapLocations, events, allEvents,
      personIds, orgIds, hasNetwork, documents, sentimentFactions, topics,
      narrativeDurations
    };
  }

  /**
   * Set up card components for Dashboard tab
   */
  setupDashboardCards(theme, data) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    // 1. Volume & Events Chart (full-width)
    const hasDurationData = data.narrativeDurations?.length > 0;
    if (data.hasVolumeTimeline || hasDurationData) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, 'theme-volume-events', {
        title: 'Volume & Events',
        volumeData: data.volumeData,
        publisherData: data.publisherData,
        events: data.allEvents,
        narrativeDurations: hasDurationData ? data.narrativeDurations : null,
        fullWidth: true,
        height: 450,
        volumeHeight: 180,
        timelineHeight: 180,
        showViewToggle: !!(data.volumeData && data.hasPublisherData)
      }));
    }

    // 2. Sentiment by Faction (half-width)
    if (data.sentimentFactions.length > 0) {
      this.cardManager.add(new SentimentChartCard(this, 'theme-sentiment-chart', {
        title: 'Sentiment by Faction',
        factions: data.sentimentFactions,
        halfWidth: true,
        clickRoute: 'faction'
      }));
    }

    // 3. Faction Overlaps Venn Diagram (half-width)
    if (data.factions.length >= 2) {
      this.cardManager.add(new VennDiagramCard(this, 'theme-venn', {
        title: 'Faction Overlaps',
        factions: data.factions,
        overlaps: data.factionOverlaps,
        halfWidth: true,
        height: 300
      }));
    }

    // 4. People & Organizations Network (half-width)
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, 'theme-network', {
        title: 'People & Organizations',
        personIds: data.personIds,
        orgIds: data.orgIds,
        halfWidth: true,
        height: 400
      }));
    }

    // 5. Locations & Events Map (half-width)
    if (data.locations.length > 0 || data.allEvents.length > 0) {
      this.cardManager.add(new MapCard(this, 'theme-map', {
        title: 'Locations & Events',
        locations: data.locations,
        events: data.allEvents,
        halfWidth: true,
        height: 350,
        showViewToggle: true
      }));
    }

    // 6. Related Topics (half-width)
    if (data.topics.length > 0) {
      this.cardManager.add(new TopicListCard(this, 'theme-topics', {
        title: 'Related Topics',
        topics: data.topics,
        halfWidth: true,
        showCount: true,
        showBulletsToggle: true
      }));
    }
  }

}

export default ThemeView;
