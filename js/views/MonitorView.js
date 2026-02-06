/**
 * MonitorView.js
 * Detail view for a single monitor using the CardManager pattern
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';
import { StatCards } from '../components/StatCards.js';
import {
  CardManager,
  NetworkGraphCard,
  NarrativeListCard,
  TopicListCard,
  SentimentChartCard,
  MapCard,
  TimelineVolumeCompositeCard
} from '../components/CardComponents.js';

/**
 * Helper to format alert descriptions with entity links
 * Links events, narratives, factions, persons, organizations, and locations
 * when their text/name appears in the description
 */
function formatAlertDescriptionWithLinks(alert, DataServiceRef) {
  let description = alert.description || '';
  const DS = DataServiceRef || DataService;
  
  // Build a map of entity names/text to their links
  const entityReplacements = [];
  
  // Process events (use event text)
  if (alert.relatedEventIds && alert.relatedEventIds.length > 0) {
    alert.relatedEventIds.forEach(id => {
      const event = DS.getEvent(id);
      if (event && event.text) {
        entityReplacements.push({
          name: event.text,
          link: `<a href="#/event/${id}">${event.text}</a>`
        });
      }
    });
  }
  
  // Process narratives (use narrative text)
  if (alert.relatedNarrativeIds && alert.relatedNarrativeIds.length > 0) {
    alert.relatedNarrativeIds.forEach(id => {
      const narrative = DS.getNarrative(id);
      if (narrative && narrative.text) {
        entityReplacements.push({
          name: narrative.text,
          link: `<a href="#/narrative/${id}">${narrative.text}</a>`
        });
      }
    });
  }
  
  // Process factions
  if (alert.relatedFactionIds && alert.relatedFactionIds.length > 0) {
    alert.relatedFactionIds.forEach(id => {
      const faction = DS.getFaction(id);
      if (faction) {
        entityReplacements.push({
          name: faction.name,
          link: `<a href="#/faction/${id}">${faction.name}</a>`
        });
      }
    });
  }
  
  // Process persons
  if (alert.relatedPersonIds && alert.relatedPersonIds.length > 0) {
    alert.relatedPersonIds.forEach(id => {
      const person = DS.getPerson(id);
      if (person) {
        entityReplacements.push({
          name: person.name,
          link: `<a href="#/person/${id}">${person.name}</a>`
        });
      }
    });
  }
  
  // Process organizations
  if (alert.relatedOrganizationIds && alert.relatedOrganizationIds.length > 0) {
    alert.relatedOrganizationIds.forEach(id => {
      const org = DS.getOrganization(id);
      if (org) {
        entityReplacements.push({
          name: org.name,
          link: `<a href="#/organization/${id}">${org.name}</a>`
        });
      }
    });
  }
  
  // Process locations
  if (alert.relatedLocationIds && alert.relatedLocationIds.length > 0) {
    alert.relatedLocationIds.forEach(id => {
      const location = DS.getLocation(id);
      if (location) {
        entityReplacements.push({
          name: location.name,
          link: `<a href="#/location/${id}">${location.name}</a>`
        });
      }
    });
  }
  
  // Sort by name length (longest first) to avoid partial replacements
  entityReplacements.sort((a, b) => b.name.length - a.name.length);
  
  // Replace entity names with links (case-insensitive)
  entityReplacements.forEach(({ name, link }) => {
    // Escape special regex characters in the name
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedName, 'gi');
    description = description.replace(regex, link);
  });
  
  return description;
}

// Export for use in other views
export { formatAlertDescriptionWithLinks };

export class MonitorView extends DetailViewBase {
  constructor(container, monitorId, options = {}) {
    super(container, options);
    this.monitorId = monitorId;
    this.cardManager = new CardManager(this);
  }

  async render() {
    const monitor = DataService.getMonitor(this.monitorId);
    if (!monitor) {
      this.renderNotFound('Monitor');
      return;
    }

    // Fetch all data upfront
    const data = this.fetchMonitorData(monitor);
    
    // Store data for card setup
    this._monitorData = { monitor, data };
    
    // Determine active tab
    const activeTab = this.getCurrentTab();
    const hasDocuments = data.documents.length > 0;
    const hasAlerts = data.alerts.length > 0;
    
    // Build cards based on active tab
    if (this.isDocumentsTab()) {
      super.setupDocumentsCard(monitor, data, 'monitor');
    } else if (this.isAlertsTab()) {
      this.setupAlertsCard(monitor, data);
    } else {
      this.setupDashboardCards(monitor, data);
    }
    
    // Generate tabs config - always show tabs for monitors
    const baseHref = `#/${this.monitorId}/`;
    const tabsConfig = this.getMonitorTabsConfig(baseHref, hasAlerts, hasDocuments);

    // Build subtitle with scope info
    const scopeLogic = monitor.scope?.logic || 'OR';
    const scopeLabel = DataService.getMonitorScopeLabel(this.monitorId);
    const matchCount = data.narratives.length;
    
    const subtitleParts = [
      `<span class="logic-badge logic-${scopeLogic.toLowerCase()}">${scopeLogic}</span>`,
      `<span class="match-count">${matchCount} narrative${matchCount !== 1 ? 's' : ''} matched</span>`,
      scopeLabel ? `<span class="text-muted">Scope: ${scopeLabel}</span>` : ''
    ].filter(Boolean).join(' ');

    // Build stats for the header with dropdown support
    const contextId = this.monitorId;
    const statsData = StatCards.buildEntityStatsWithItems(data, contextId);

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Monitors', href: '#/monitors' },
        monitor.name
      ],
      title: monitor.name,
      badge: monitor.enabled 
        ? `<span class="badge badge-status-active">Active</span>` 
        : `<span class="badge badge-status-paused">Paused</span>`,
      subtitle: subtitleParts,
      description: monitor.description,
      stats: statsData,
      statsMode: 'dropdowns',
      statsContextId: contextId,
      tagsContainerId: 'monitor-tags-container',
      tabs: tabsConfig,
      activeTab: activeTab
    });

    // Render page
    this.container.innerHTML = `
      ${headerHtml}
      <div class="content-area">
        <div class="content-grid">
          ${this.cardManager.getHtml()}
          ${this.isAlertsTab() ? this.getAlertsTabHtml(data.alerts) : ''}
        </div>
      </div>
    `;

    // Initialize card width toggles - MonitorView has custom tab suffix for alerts
    const contentGrid = this.container.querySelector('.content-grid');
    if (contentGrid) {
      const tabSuffix = this.isDocumentsTab() ? '-docs' : (this.isAlertsTab() ? '-alerts' : '');
      initAllCardToggles(contentGrid, `monitor-${this.monitorId}${tabSuffix}`);
    }

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Initialize stat card dropdowns
    this.initStatDropdowns(contextId, this.monitorId);

    // Set up description toggle for narratives (Dashboard tab)
    if (this.isDashboardTab()) {
      const descToggle = this.container.querySelector('#narrative-desc-toggle');
      if (descToggle && this.components['monitor-narratives']) {
        this.addListener(descToggle, 'click', () => {
          const isShowing = this.components['monitor-narratives'].toggleDescription();
          descToggle.classList.toggle('active', isShowing);
        });
      }
    }

    // Initialize tag chips
    this.initTagChips(monitor, 'monitor');
  }

  /**
   * Fetch all data related to the monitor
   */
  fetchMonitorData(monitor) {
    // Get matched content using DataService methods
    const narratives = DataService.getNarrativesForMonitor(this.monitorId);
    const events = DataService.getEventsForMonitor(this.monitorId);
    const subEvents = DataService.getSubEventsForMonitor(this.monitorId);
    const allEvents = [...events, ...subEvents];
    const alerts = DataService.getAlertsForMonitor(this.monitorId);
    
    // Get derived entities from matched narratives
    const persons = DataService.getPersonsForMonitor(this.monitorId);
    const organizations = DataService.getOrganizationsForMonitor(this.monitorId);
    const locations = DataService.getLocationsForMonitor(this.monitorId);
    const factions = DataService.getFactionsForMonitor(this.monitorId);
    const documents = DataService.getDocumentsForMonitor(this.monitorId);
    const topics = DataService.getTopicsForMonitor(this.monitorId);
    
    // Get aggregated volume data
    const volumeData = DataService.getAggregateVolumeForMonitor(this.monitorId);
    const hasVolumeData = volumeData.dates.length > 0 && volumeData.factions.length > 0;
    
    // Get narrative durations for duration view
    const narrativeDurations = this.getNarrativeDurationsForMonitor(narratives);
    const hasDurationData = narrativeDurations.length > 0;
    
    const hasVolumeTimeline = hasVolumeData || allEvents.length > 0 || hasDurationData;
    
    // Build map locations (deduplicated)
    const locationMap = new Map();
    locations.forEach(l => {
      if (!locationMap.has(l.id)) {
        locationMap.set(l.id, { ...l, isEvent: false });
      }
    });
    allEvents.filter(e => e.locationId).forEach(e => {
      const loc = DataService.getLocation(e.locationId);
      if (loc && !locationMap.has(loc.id)) {
        locationMap.set(loc.id, { ...loc, isEvent: true, eventText: e.text });
      }
    });
    const mapLocations = [...locationMap.values()];
    
    // Network data
    const personIds = persons.map(p => p.id);
    const orgIds = organizations.map(o => o.id);
    const hasNetwork = personIds.length > 0 || orgIds.length > 0;

    // Combine persons and orgs as entities for stat cards
    const entities = [...persons, ...organizations];

    // Get activity (comments and highlights) for this monitor's documents
    const activityDocIds = new Set(documents.map(d => d.id));
    const allActivity = DataService.getAllActivity();
    const activity = allActivity.filter(item => activityDocIds.has(item.documentId));

    return {
      narratives, events, allEvents, alerts,
      persons, organizations, locations, factions, documents, topics,
      volumeData, hasVolumeData, hasVolumeTimeline,
      narrativeDurations, hasDurationData,
      mapLocations, personIds, orgIds, hasNetwork,
      entities, activity
    };
  }

  /**
   * Get narrative durations for the Duration View from monitor's matched narratives
   */
  getNarrativeDurationsForMonitor(narratives) {
    const durations = narratives.map(n => {
      // Get volume over time for this narrative
      const volumeData = DataService.getVolumeOverTimeForNarrative(n.id);
      
      if (!volumeData || volumeData.length === 0) {
        return null;
      }
      
      // Sort by date to find start and end
      const sortedDates = volumeData
        .map(v => v.date)
        .sort((a, b) => new Date(a) - new Date(b));
      
      const startDate = sortedDates[0];
      const endDate = sortedDates[sortedDates.length - 1];
      
      // Calculate total volume
      let totalVolume = 0;
      const factionVolumes = {};
      volumeData.forEach(v => {
        Object.entries(v.factionVolumes || {}).forEach(([fId, vol]) => {
          totalVolume += vol;
          factionVolumes[fId] = (factionVolumes[fId] || 0) + vol;
        });
      });
      
      // Get primary faction color
      let primaryFactionId = null;
      let maxFactionVolume = 0;
      Object.entries(factionVolumes).forEach(([fId, vol]) => {
        if (vol > maxFactionVolume) {
          maxFactionVolume = vol;
          primaryFactionId = fId;
        }
      });
      
      const primaryFaction = primaryFactionId 
        ? DataService.getFaction(primaryFactionId)
        : null;
      
      return {
        id: n.id,
        text: n.text,
        startDate,
        endDate,
        totalVolume,
        sentiment: n.sentiment || 0,
        color: primaryFaction?.color || 'var(--accent-primary)'
      };
    }).filter(Boolean);
    
    // Sort by start date
    durations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    
    return durations;
  }

  /**
   * Set up card components for Dashboard tab
   */
  setupDashboardCards(monitor, data) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    // Narratives list (full width at top)
    if (data.narratives.length > 0) {
      this.cardManager.add(new NarrativeListCard(this, 'monitor-narratives', {
        title: 'Matched Narratives',
        narratives: data.narratives,
        showCount: true,
        maxItems: 10,
        fullWidth: true,
        showDescriptionToggle: true
      }));
    }

    // Volume & Events Chart (half-width)
    if (data.hasVolumeTimeline) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, 'monitor-volume-events', {
        title: 'Volume & Events',
        volumeData: data.hasVolumeData ? data.volumeData : null,
        publisherData: null,
        events: data.allEvents,
        narrativeDurations: data.hasDurationData ? data.narrativeDurations : null,
        halfWidth: true,
        height: 320,
        volumeHeight: 140,
        timelineHeight: 140,
        showViewToggle: false
      }));
    }

    // Faction Engagement (half-width)
    if (data.factions.length > 0) {
      this.cardManager.add(new SentimentChartCard(this, 'monitor-faction-sentiment', {
        title: 'Faction Engagement',
        factions: data.factions,
        halfWidth: true,
        clickRoute: 'faction'
      }));
    }

    // People & Organizations Network (half-width)
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, 'monitor-network', {
        title: 'People & Organizations',
        personIds: data.personIds,
        orgIds: data.orgIds,
        halfWidth: true,
        height: 400
      }));
    }

    // Related Locations & Events Map (half-width)
    if (data.locations.length > 0 || data.allEvents.length > 0) {
      this.cardManager.add(new MapCard(this, 'monitor-map', {
        title: 'Locations & Events',
        locations: data.locations,
        events: data.allEvents,
        halfWidth: true,
        height: 350,
        showViewToggle: true
      }));
    }

    // Related Topics (half-width)
    if (data.topics.length > 0) {
      this.cardManager.add(new TopicListCard(this, 'monitor-topics', {
        title: 'Related Topics',
        topics: data.topics,
        showCount: true,
        maxItems: 5,
        halfWidth: true,
        showSparkline: true,
        showVolume: true,
        showDuration: true,
        showBulletsToggle: true
      }));
    }
  }

  /**
   * Override getTabsConfig to include Alerts tab for monitors
   */
  getMonitorTabsConfig(baseHref, hasAlerts, hasDocuments) {
    const tabs = [
      { id: 'dashboard', label: 'Dashboard', href: `${baseHref}?tab=dashboard` }
    ];
    
    if (hasAlerts) {
      tabs.push({ id: 'alerts', label: 'Alerts', href: `${baseHref}?tab=alerts` });
    }
    
    if (hasDocuments) {
      tabs.push({ id: 'documents', label: 'Documents', href: `${baseHref}?tab=documents` });
    }
    
    return tabs;
  }

  /**
   * Check if we're on the Alerts tab
   */
  isAlertsTab() {
    return this.getCurrentTab() === 'alerts';
  }

  /**
   * Set up card for Alerts tab
   */
  setupAlertsCard(monitor, data) {
    // Reset card manager - alerts tab uses custom HTML, not cards
    this.cardManager = new CardManager(this);
  }

  /**
   * Get HTML for the Alerts tab content
   * Uses the same styling as the MonitorsView alerts list page
   */
  getAlertsTabHtml(alerts) {
    if (!alerts || alerts.length === 0) {
      return `
        <div class="card full-width">
          <div class="card-header">
            <h3 class="card-title">Alerts</h3>
          </div>
          <div class="card-body">
            <p class="text-muted">No alerts have been triggered for this monitor.</p>
          </div>
        </div>
      `;
    }

    const alertsHtml = alerts.map(alert => {
      const typeClass = this.getAlertTypeClass(alert.type);
      const typeLabel = this.getAlertTypeLabel(alert.type);
      const timeAgo = this.formatRelativeTime(alert.triggeredAt);
      const descriptionWithLinks = formatAlertDescriptionWithLinks(alert);
      
      return `
        <div class="alerts-list-item" data-alert-id="${alert.id}">
          <span class="alert-type-badge ${typeClass}">${typeLabel}</span>
          <span class="alert-description">${descriptionWithLinks}</span>
          <span class="alert-time">${timeAgo}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="card full-width">
        <div class="card-header">
          <h3 class="card-title">Alerts</h3>
          <span class="badge badge-default">${alerts.length} total</span>
        </div>
        <div class="card-body no-padding">
          <div class="alerts-list">
            ${alertsHtml}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get alert type CSS class
   */
  getAlertTypeClass(type) {
    const classes = {
      'volume_spike': 'volume',
      'sentiment_shift': 'sentiment',
      'new_narrative': 'narrative',
      'new_event': 'event',
      'faction_engagement': 'faction'
    };
    return classes[type] || 'default';
  }

  /**
   * Get alert type label
   */
  getAlertTypeLabel(type) {
    const labels = {
      'volume_spike': 'Volume Spike',
      'sentiment_shift': 'Sentiment Shift',
      'new_narrative': 'New Narrative',
      'new_event': 'New Event',
      'faction_engagement': 'Faction Engagement'
    };
    return labels[type] || type;
  }

  /**
   * Format relative time
   */
  formatRelativeTime(isoDate) {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

}

export default MonitorView;
