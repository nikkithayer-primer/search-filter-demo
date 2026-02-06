/**
 * MonitorsView.js
 * Track entities and narratives with custom alert thresholds
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { dataStore } from '../data/DataStore.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { TopicList } from '../components/TopicList.js';
import { StackedAreaChart } from '../components/StackedAreaChart.js';
import { TimelineVolumeComposite } from '../components/TimelineVolumeComposite.js';
import { VennDiagram } from '../components/VennDiagram.js';
import { SentimentChart } from '../components/SentimentChart.js';
import { NetworkGraph } from '../components/NetworkGraph.js';
import { getEntityCardModal } from '../components/EntityCardModal.js';
import { DocumentTable } from '../components/DocumentTable.js';
import { ColumnFilter } from '../components/ColumnFilter.js';
import { MapView } from '../components/MapView.js';
import { CardBuilder } from '../utils/CardBuilder.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';
import { getMonitorEditor } from '../components/MonitorEditorModal.js';
import { formatAlertDescriptionWithLinks } from './MonitorView.js';
import { PageHeader } from '../utils/PageHeader.js';
import { Dropdown } from '../components/Dropdown.js';

// Available visualization types for monitors
const VISUALIZATION_TYPES = [
  { id: 'narratives', label: 'Narratives' },
  { id: 'volume', label: 'Narrative volume over time' },
  { id: 'volume_events', label: 'Volume over time with events' },
  { id: 'topics', label: 'Topics' },
  { id: 'locations', label: 'Locations' },
  { id: 'faction_overlaps', label: 'Faction overlaps' },
  { id: 'faction_sentiment', label: 'Faction sentiment' },
  { id: 'network_graph', label: 'People & orgs network graph' },
  { id: 'documents', label: 'Documents' }
];

// Default visualization type for each monitor (by name)
const DEFAULT_MONITOR_VISUALIZATIONS = {
  'Immigration Enforcement Activity': 'volume_events',
  'Public Health Policy': 'narratives',
  'Trump Administration Actions': 'faction_sentiment',
  'Judicial Safety Watch': 'topics',
  'US-European Orgs': 'network_graph',
  'SMIC Technology Progress': 'faction_overlaps',
  'Chinese Investment Watch': 'volume_events',
  'Export Controls Impact': 'faction_sentiment',
  'Huawei Sanctions Monitoring': 'narratives',
  'Supply Chain and Manufacturing': 'topics',
  'Store Closure Impact': 'locations',
  'Pricing Perception Monitor': 'faction_sentiment',
  'Employee Experience Tracker': 'documents',
  'Self Checkout Complaints': 'volume',
  'Product Availability Issues': 'volume',
  'Product Safety Alerts': 'narratives',
  'Competitor Activity Tracker': 'topics',
  // Singapore MCO dataset
  'NS Sentiment Tracker': 'faction_sentiment',
  'PRC Influence Detection': 'narratives',
  'Malaysia Relations Watch': 'volume',
  'SAF Incident Watch': 'locations',
  'Racial Harmony Monitor': 'faction_sentiment',
  'Coordinated Campaign Detection': 'faction_overlaps'
};

export class MonitorsView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
    // Note: MonitorsView uses a different component storage pattern than other views.
    // Instead of this.components (inherited from BaseView), we use visualizationComponents
    // because we need to track which monitor each component belongs to for proper cleanup
    // when individual monitors are re-rendered or the view is destroyed.
    this.visualizationComponents = []; // Array of { monitorId, component, type }
    this.descriptionToggles = new Map(); // Map of monitorId -> NarrativeList/TopicList
    this.monitorEditor = null;
    this.monitorVisualizationTypes = new Map(); // Map of monitorId -> selected visualization type
  }

  // ============================================
  // Tab Navigation (overrides BaseView defaults)
  // ============================================

  /**
   * Get the current active tab from options
   * Defaults to 'monitors' instead of 'dashboard'
   * @returns {string} Current tab ID
   */
  getCurrentTab() {
    return this.options.tab || 'monitors';
  }

  /**
   * Generate tabs configuration for this view
   * @returns {Array} Tabs configuration
   */
  getMonitorsTabsConfig() {
    return [
      { id: 'monitors', label: 'Monitors', href: '#/monitors?tab=monitors' },
      { id: 'alerts', label: 'Alerts', href: '#/monitors?tab=alerts' }
    ];
  }

  /**
   * Check if we're on the monitors tab
   * @returns {boolean}
   */
  isMonitorsTab() {
    return this.getCurrentTab() === 'monitors';
  }

  /**
   * Check if we're on the alerts tab
   * @returns {boolean}
   */
  isAlertsTab() {
    return this.getCurrentTab() === 'alerts';
  }

  /**
   * Helper to get scope icon based on scope type
   */
  getScopeIcon(scopeType) {
    const icons = {
      narrative: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
        <path d="M2 2h12v12H2z" rx="1"/>
        <path d="M4 5h8M4 8h8M4 11h5"/>
      </svg>`,
      theme: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
        <path d="M2 2h12v12H2z" rx="1"/>
        <path d="M4 5h8M4 8h6M4 11h4"/>
      </svg>`,
      faction: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
        <circle cx="8" cy="5" r="2.5"/>
        <circle cx="4" cy="11" r="2"/>
        <circle cx="12" cy="11" r="2"/>
        <path d="M6 6.5L4.5 9M10 6.5l1.5 2.5"/>
      </svg>`,
      person: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
        <circle cx="8" cy="4" r="2.5"/>
        <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
      </svg>`,
      organization: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 16H9.5C9.59107 16 9.67646 15.9757 9.75 15.9331C9.82354 15.9757 9.90893 16 10 16H15.5C15.7761 16 16 15.7761 16 15.5V4.5C16 4.22386 15.7761 4 15.5 4H10V0.5C10 0.223858 9.77614 0 9.5 0H0.5C0.223858 0 0 0.223858 0 0.5V15.5C0 15.7761 0.223858 16 0.5 16ZM1 15V1H9V15H7V13C7 12.7239 6.77614 12.5 6.5 12.5H3.5C3.22386 12.5 3 12.7239 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z"/>
      </svg>`,
      location: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
        <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
        <circle cx="8" cy="6" r="2"/>
      </svg>`,
      event: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
        <rect x="2" y="3" width="12" height="11" rx="1"/>
        <path d="M2 6h12M5 1v3M11 1v3"/>
      </svg>`,
      custom: `<svg class="scope-entity-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.25">
        <circle cx="8" cy="8" r="6"/>
        <path d="M8 5v6M5 8h6"/>
      </svg>`
    };
    return icons[scopeType] || icons.custom;
  }

  /**
   * Helper to format relative time
   */
  formatRelativeTime(isoDate) {
    if (!isoDate) return null;
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  }

  /**
   * Helper to get alert type label
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
   * Helper to get alert type CSS class
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
   * Get all scope entity names for a monitor (not condensed)
   * Returns an array of entity names
   */
  getScopeEntityNames(monitor) {
    const scope = monitor.scope || {};
    const entities = [];
    
    // Collect all entity names from the scope
    if (scope.personIds?.length) {
      scope.personIds.forEach(id => {
        const person = DataService.getPerson(id);
        if (person) entities.push(person.name);
      });
    }
    if (scope.organizationIds?.length) {
      scope.organizationIds.forEach(id => {
        const org = DataService.getOrganization(id);
        if (org) entities.push(org.name);
      });
    }
    if (scope.factionIds?.length) {
      scope.factionIds.forEach(id => {
        const faction = DataService.getFaction(id);
        if (faction) entities.push(faction.name);
      });
    }
    if (scope.narrativeIds?.length) {
      scope.narrativeIds.forEach(id => {
        const narrative = DataService.getNarrative(id);
        if (narrative) entities.push(narrative.text);
      });
    }
    if (scope.locationIds?.length) {
      scope.locationIds.forEach(id => {
        const location = DataService.getLocation(id);
        if (location) entities.push(location.name);
      });
    }
    
    return entities;
  }

  /**
   * Build the visualization type dropdown HTML
   */
  buildVisualizationDropdown(monitorId) {
    const currentType = this.monitorVisualizationTypes.get(monitorId) || 'narratives';
    const currentLabel = VISUALIZATION_TYPES.find(v => v.id === currentType)?.label || 'Narratives';
    
    const optionsHtml = VISUALIZATION_TYPES.map(v => `
      <div class="viz-dropdown-option${v.id === currentType ? ' active' : ''}" data-viz-type="${v.id}">
        ${v.label}
      </div>
    `).join('');
    
    return `
      <div class="monitor-viz-dropdown" data-monitor-id="${monitorId}">
        <button class="monitor-viz-dropdown-trigger">
          <span class="viz-dropdown-label">${currentLabel}</span>
          <svg class="viz-dropdown-arrow" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </button>
        <div class="monitor-viz-dropdown-menu">
          ${optionsHtml}
        </div>
      </div>
    `;
  }

  async render() {
    const activeTab = this.getCurrentTab();
    const allAlerts = DataService.getAlerts();
    
    // Render the page header with tabs and action button
    const headerHtml = PageHeader.render({
      title: 'Monitors',
      subtitle: 'Track entities and narratives with custom alert thresholds',
      tabs: this.getMonitorsTabsConfig(),
      activeTab: activeTab,
      actions: '<button class="btn btn-small btn-primary" id="new-monitor-btn">+ New Monitor</button>'
    });
    
    // Render content based on active tab
    if (this.isAlertsTab()) {
      this.renderAlertsTab(headerHtml, allAlerts);
    } else {
      this.renderMonitorsTab(headerHtml);
    }
  }

  /**
   * Render the Monitors tab (grid of monitor cards)
   */
  renderMonitorsTab(headerHtml) {
    // Load monitors from DataService and split into active/archived
    const allMonitors = DataService.getMonitors();
    const activeMonitors = allMonitors.filter(m => m.enabled !== false);
    const archivedMonitors = allMonitors.filter(m => m.enabled === false);
    
    // Initialize default visualization types for monitors (only if not already set)
    allMonitors.forEach(monitor => {
      if (!this.monitorVisualizationTypes.has(monitor.id)) {
        const defaultViz = DEFAULT_MONITOR_VISUALIZATIONS[monitor.name] || 'narratives';
        this.monitorVisualizationTypes.set(monitor.id, defaultViz);
      }
    });
    
    // Helper to enrich a monitor with computed fields
    const enrichMonitor = (monitor) => {
      const scopeType = DataService.getMonitorScopeType(monitor.id);
      const scopeLabel = DataService.getMonitorScopeLabel(monitor.id);
      const triggerLabels = DataService.getMonitorTriggerLabels(monitor.id);
      const matchedNarratives = DataService.getNarrativesForMonitor(monitor.id);
      const matchedEvents = DataService.getEventsForMonitor(monitor.id);
      const alerts = DataService.getAlertsForMonitor(monitor.id);
      const containerId = `monitor-viz-${monitor.id}`;
      const scopeLogic = monitor.scope?.logic || 'OR';
      
      // Get all scope entity names (not condensed)
      const scopeEntities = this.getScopeEntityNames(monitor);
      
      return {
        ...monitor,
        scopeType,
        scopeLabel,
        scopeEntities,
        scopeIcon: this.getScopeIcon(scopeType),
        triggerLabels,
        matchedNarratives,
        matchedEvents,
        alerts,
        containerId,
        scopeLogic,
        lastTriggeredFormatted: this.formatRelativeTime(monitor.lastTriggered)
      };
    };
    
    // Build enriched monitor data for active and archived
    const enrichedActiveMonitors = activeMonitors.map(enrichMonitor);
    const enrichedArchivedMonitors = archivedMonitors.map(enrichMonitor);
    const enrichedMonitors = [...enrichedActiveMonitors, ...enrichedArchivedMonitors];
    
    // Build monitor cards HTML using CardBuilder
    // Helper to build card HTML for a monitor
    const buildMonitorCard = (monitor) => {
      // Build alerts HTML
      const alertsHtml = monitor.alerts && monitor.alerts.length > 0 
        ? monitor.alerts.slice(0, 3).map(alert => `
            <div class="monitor-alert-item">
              <span class="alert-type-badge ${this.getAlertTypeClass(alert.type)}">${this.getAlertTypeLabel(alert.type)}</span>
              <span class="alert-description">${formatAlertDescriptionWithLinks(alert, DataService)}</span>
              <span class="alert-time">${this.formatRelativeTime(alert.triggeredAt)}</span>
            </div>
          `).join('')
        : '<div class="monitor-no-alerts">No recent alerts</div>';
      
      // Build tooltip content with monitor metadata
      const logicBadge = `<span class="logic-badge logic-${monitor.scopeLogic.toLowerCase()}">${monitor.scopeLogic}</span>`;
      const lastTriggeredText = monitor.enabled && monitor.lastTriggeredFormatted
        ? monitor.lastTriggeredFormatted
        : !monitor.enabled ? 'Paused' : 'Never';
      
      // Build scope entities list or show "All" if empty
      const scopeEntitiesHtml = monitor.scopeEntities.length > 0
        ? `<ul class="card-title-tooltip-list">${monitor.scopeEntities.map(name => `<li>${name}</li>`).join('')}</ul>`
        : 'All';
      
      const tooltipHtml = `
        <div class="card-title-tooltip">
          <div class="card-title-tooltip-row">
            <span class="card-title-tooltip-label">Logic</span>
            <span class="card-title-tooltip-value">${logicBadge}</span>
          </div>
          <div class="card-title-tooltip-row">
            <span class="card-title-tooltip-label">Matches</span>
            <span class="card-title-tooltip-value">${monitor.matchedNarratives.length}</span>
          </div>
          <div class="card-title-tooltip-row card-title-tooltip-row-scope">
            <span class="card-title-tooltip-label">Scope</span>
            <span class="card-title-tooltip-value">${scopeEntitiesHtml}</span>
          </div>
          <div class="card-title-tooltip-row">
            <span class="card-title-tooltip-label">Last triggered</span>
            <span class="card-title-tooltip-value">${lastTriggeredText}</span>
          </div>
        </div>
      `;
      
      // Build actions HTML with visualization dropdown, description toggle, and action menu
      const descToggleId = `desc-toggle-${monitor.id}`;
      const isArchived = monitor.enabled === false;
      const currentVizType = this.monitorVisualizationTypes.get(monitor.id) || 'narratives';
      const showDescToggle = currentVizType === 'narratives' || currentVizType === 'topics';
      
      // Wrap description toggle in a container with visibility control
      const descToggleHtml = `<span class="desc-toggle-wrapper" data-monitor-id="${monitor.id}" style="${showDescToggle ? '' : 'display: none;'}">${CardBuilder.descriptionToggle(descToggleId)}</span>`;
      const actionMenuHtml = CardBuilder.actionMenu('monitor', monitor.id, { isArchived });
      const actionsHtml = this.buildVisualizationDropdown(monitor.id) + descToggleHtml;
      
      // Content for the card body
      const cardBodyContent = `
        <div class="monitor-alerts-section">
          <div class="monitor-section-header">
            <span class="monitor-section-title">Recent Alerts</span>
            ${monitor.alerts && monitor.alerts.length > 0 ? `<span class="alert-count">${monitor.alerts.length}</span>` : ''}
          </div>
          <div class="monitor-alerts-list">
            ${alertsHtml}
          </div>
        </div>
        <div class="monitor-viz-container" id="${monitor.containerId}"></div>
      `;
      
      // Use CardBuilder to create the card (no subtitle - moved to tooltip)
      let cardHtml = CardBuilder.create(monitor.name, `monitor-body-${monitor.id}`, {
        noPadding: true,
        halfWidth: true,
        actions: actionsHtml,
        actionMenuHtml: actionMenuHtml
      });
      
      // Wrap the title with tooltip container
      cardHtml = cardHtml.replace(
        `<h2 class="card-title">${monitor.name}</h2>`,
        `<h2 class="card-title"><span class="card-title-with-tooltip"><a href="#/${monitor.id}/" class="card-title-link">${monitor.name}</a>${tooltipHtml}</span></h2>`
      );
      
      // Insert the card body content into the generated card
      // We need to replace the empty body with our content
      return cardHtml.replace(
        `id="monitor-body-${monitor.id}"></div>`,
        `id="monitor-body-${monitor.id}">${cardBodyContent}</div>`
      );
    };

    // Build card HTML for active and archived monitors
    const activeCardsHtml = enrichedActiveMonitors.map(buildMonitorCard).join('');
    const archivedCardsHtml = enrichedArchivedMonitors.map(buildMonitorCard).join('');
    
    // Build archived section if there are any
    const archivedSectionHtml = enrichedArchivedMonitors.length > 0 ? `
      <div class="content-section archived-section">
        <div class="section-divider"></div>
        <h3 class="section-title text-muted">Archived</h3>
        <div class="content-grid monitors-grid monitors-grid-archived">
          ${archivedCardsHtml}
        </div>
      </div>
    ` : '';
    
    this.container.innerHTML = `
      ${headerHtml}
      
      <div class="content-area">
        <div class="content-grid monitors-grid">
          ${activeCardsHtml}
        </div>
        ${archivedSectionHtml}
      </div>
    `;
    
    // Setup popover toggle handlers
    this.setupHeaderPopovers();
    
    // Setup create/edit monitor handlers
    this.setupMonitorEditorHandlers(enrichedMonitors);
    
    // Setup visualization dropdown handlers
    this.setupVisualizationDropdowns(enrichedMonitors);
    
    // Initialize card width toggles for active monitor cards (default to half width)
    const activeGrid = this.container.querySelector('.monitors-grid:not(.monitors-grid-archived)');
    if (activeGrid) {
      const activeWidths = {};
      enrichedActiveMonitors.forEach((_, index) => {
        activeWidths[index] = 'half';
      });
      initAllCardToggles(activeGrid, 'monitors-active', activeWidths);
    }
    
    // Initialize card width toggles for archived monitor cards
    const archivedGrid = this.container.querySelector('.monitors-grid-archived');
    if (archivedGrid) {
      const archivedWidths = {};
      enrichedArchivedMonitors.forEach((_, index) => {
        archivedWidths[index] = 'half';
      });
      initAllCardToggles(archivedGrid, 'monitors-archived', archivedWidths);
    }
    
    // Store enriched monitors for later use
    this.enrichedMonitors = enrichedMonitors;
    
    // Initialize visualizations for each monitor
    enrichedMonitors.forEach(monitor => {
      this.renderMonitorVisualization(monitor);
    });
  }

  /**
   * Render the Alerts tab (list view of all alerts)
   */
  renderAlertsTab(headerHtml, allAlerts) {
    // Get monitors for linking
    const monitors = DataService.getMonitors();
    const monitorsMap = new Map(monitors.map(m => [m.id, m]));
    
    // Sort alerts by triggered date (most recent first)
    const sortedAlerts = [...allAlerts].sort((a, b) => 
      new Date(b.triggeredAt) - new Date(a.triggeredAt)
    );
    
    // Build alerts list using same format as monitor card alerts
    const alertsListHtml = sortedAlerts.length > 0
      ? sortedAlerts.map(alert => {
          const monitor = monitorsMap.get(alert.monitorId);
          const monitorName = monitor ? monitor.name : 'Unknown Monitor';
          
          return `
            <div class="alerts-list-item" data-alert-id="${alert.id}">
              <span class="alert-type-badge ${this.getAlertTypeClass(alert.type)}">${this.getAlertTypeLabel(alert.type)}</span>
              <a href="#/${alert.monitorId}/" class="alert-monitor-link">${this.escapeHtml(monitorName)}</a>
              <span class="alert-description">${formatAlertDescriptionWithLinks(alert, DataService)}</span>
              <span class="alert-time">${this.formatRelativeTime(alert.triggeredAt)}</span>
            </div>
          `;
        }).join('')
      : `<div class="alerts-list-empty">No alerts found</div>`;
    
    this.container.innerHTML = `
      ${headerHtml}
      
      <div class="content-area">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">All Alerts</h2>
            <span class="badge badge-default">${sortedAlerts.length} total</span>
          </div>
          <div class="card-body no-padding">
            <div class="alerts-list">
              ${alertsListHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render the visualization for a specific monitor based on selected type
   */
  renderMonitorVisualization(monitor) {
    const vizType = this.monitorVisualizationTypes.get(monitor.id) || 'narratives';
    const container = document.getElementById(monitor.containerId);
    
    if (!container) return;
    
    // Clear existing content and destroy old component
    container.innerHTML = '';
    this.destroyMonitorVisualization(monitor.id);
    
    switch (vizType) {
      case 'narratives':
        this.renderNarrativesVisualization(monitor, container);
        break;
      case 'volume':
        this.renderVolumeVisualization(monitor, container);
        break;
      case 'volume_events':
        this.renderVolumeEventsVisualization(monitor, container);
        break;
      case 'topics':
        this.renderTopicsVisualization(monitor, container);
        break;
      case 'locations':
        this.renderLocationsVisualization(monitor, container);
        break;
      case 'faction_overlaps':
        this.renderFactionOverlapsVisualization(monitor, container);
        break;
      case 'faction_sentiment':
        this.renderFactionSentimentVisualization(monitor, container);
        break;
      case 'network_graph':
        this.renderNetworkGraphVisualization(monitor, container);
        break;
      case 'documents':
        this.renderDocumentsVisualization(monitor, container);
        break;
      default:
        this.renderNarrativesVisualization(monitor, container);
    }
  }

  /**
   * Render Narratives visualization (default)
   */
  renderNarrativesVisualization(monitor, container) {
    if (monitor.matchedNarratives && monitor.matchedNarratives.length > 0) {
      const narrativeList = new NarrativeList(container, {
        maxItems: 5,
        showSentiment: true,
        showStatus: true,
        showSparkline: true,
        showVolume: true,
        showThemes: true,
        maxThemes: 3,
        defaultShowDescription: false,
        onItemClick: (n) => {
          window.location.hash = `#/narrative/${n.id}`;
        }
      });
      narrativeList.update({ narratives: monitor.matchedNarratives });
      this.visualizationComponents.push({ monitorId: monitor.id, component: narrativeList, type: 'narratives' });
      
      // Store reference for description toggle
      this.descriptionToggles.set(monitor.id, narrativeList);
      
      // Set up description toggle handler
      const descToggle = document.getElementById(`desc-toggle-${monitor.id}`);
      if (descToggle) {
        this.addListener(descToggle, 'click', () => {
          const isShowing = narrativeList.toggleDescription();
          descToggle.classList.toggle('active', isShowing);
        });
      }
    } else {
      this.showEmptyVisualization(container, 'No matching narratives');
    }
  }

  /**
   * Render Narrative Volume Over Time visualization
   */
  renderVolumeVisualization(monitor, container) {
    const narratives = monitor.matchedNarratives;
    
    if (narratives && narratives.length > 0) {
      // Aggregate volume data from matched narratives
      const volumeData = this.aggregateVolumeData(narratives);
      
      if (volumeData.dates.length > 0) {
        const chart = new StackedAreaChart(container, {
          height: 280,
          onFactionClick: (f) => {
            window.location.hash = `#/faction/${f.id}`;
          }
        });
        chart.update(volumeData);
        this.visualizationComponents.push({ monitorId: monitor.id, component: chart, type: 'volume' });
      } else {
        this.showEmptyVisualization(container, 'No volume data available');
      }
    } else {
      this.showEmptyVisualization(container, 'No narrative data for volume chart');
    }
  }

  /**
   * Render Volume Over Time with Events visualization
   */
  renderVolumeEventsVisualization(monitor, container) {
    const narratives = monitor.matchedNarratives;
    const events = monitor.matchedEvents || DataService.getEventsForMonitor(monitor.id);
    
    if ((narratives && narratives.length > 0) || (events && events.length > 0)) {
      const volumeData = this.aggregateVolumeData(narratives || []);
      
      const composite = new TimelineVolumeComposite(container, {
        height: 400,
        showViewToggle: false,
        onEventClick: (e) => {
          window.location.hash = `#/event/${e.id}`;
        },
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      composite.update({ volumeData, events: events || [] });
      this.visualizationComponents.push({ monitorId: monitor.id, component: composite, type: 'volume_events' });
    } else {
      this.showEmptyVisualization(container, 'No data for volume/events chart');
    }
  }

  /**
   * Render Topics visualization
   */
  renderTopicsVisualization(monitor, container) {
    // Get topics related to matched narratives
    const topics = DataService.getTopics();
    
    if (topics && topics.length > 0) {
      const topicList = new TopicList(container, {
        maxItems: 8,
        showSparkline: true,
        showVolume: true,
        showDuration: true,
        showBulletPoints: false,
        onItemClick: (t) => {
          window.location.hash = `#/topic/${t.id}`;
        }
      });
      topicList.update({ topics });
      this.visualizationComponents.push({ monitorId: monitor.id, component: topicList, type: 'topics' });
      
      // Store reference for description toggle (bullet points)
      this.descriptionToggles.set(monitor.id, topicList);
      
      // Set up description toggle handler for topics
      const descToggle = document.getElementById(`desc-toggle-${monitor.id}`);
      if (descToggle) {
        this.addListener(descToggle, 'click', () => {
          const isShowing = topicList.toggleBulletPoints();
          descToggle.classList.toggle('active', isShowing);
        });
      }
    } else {
      this.showEmptyVisualization(container, 'No topics found');
    }
  }

  /**
   * Render Locations visualization (map)
   */
  renderLocationsVisualization(monitor, container) {
    const narratives = monitor.matchedNarratives;
    
    // Collect all locations from matched narratives
    const locationIds = new Set();
    narratives.forEach(n => {
      (n.locationIds || []).forEach(id => locationIds.add(id));
    });
    
    // Get location objects with their related data
    const locations = [...locationIds]
      .map(id => {
        const location = DataService.getLocation(id);
        if (!location) return null;
        
        // Get narratives and events for this location
        const relatedNarratives = DataService.getNarrativesForLocation(id);
        const relatedEvents = DataService.getEventsForLocation(id);
        
        return {
          ...location,
          narratives: relatedNarratives,
          events: relatedEvents
        };
      })
      .filter(loc => loc && loc.coordinates);
    
    if (locations.length > 0) {
      const mapView = new MapView(container, {
        height: 350,
        onMarkerClick: (loc) => {
          // Optional: handle marker click
        }
      });
      mapView.update({ locations });
      this.visualizationComponents.push({ monitorId: monitor.id, component: mapView, type: 'locations' });
    } else {
      this.showEmptyVisualization(container, 'No locations with coordinates found');
    }
  }

  /**
   * Render Faction Overlaps visualization
   * Uses document-based aggregation to identify involved factions
   */
  renderFactionOverlapsVisualization(monitor, container) {
    const narratives = monitor.matchedNarratives;
    
    // Get factions involved in the matched narratives from document aggregation
    const factionIds = new Set();
    narratives.forEach(n => {
      const factionMentions = DataService.getAggregateFactionMentionsForNarrative(n.id);
      Object.keys(factionMentions).forEach(fId => factionIds.add(fId));
    });
    
    const factions = [...factionIds].map(id => DataService.getFaction(id)).filter(Boolean);
    // Only include overlaps where ALL factions are present in our set
    // (venn.js requires all sets in an overlap to be defined)
    const overlaps = DataService.getFactionOverlaps().filter(o => 
      o.factionIds.every(fId => factionIds.has(fId))
    );
    
    if (factions.length >= 2) {
      const venn = new VennDiagram(container, {
        height: 300,
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      venn.update({ sets: factions, overlaps });
      this.visualizationComponents.push({ monitorId: monitor.id, component: venn, type: 'faction_overlaps' });
    } else {
      this.showEmptyVisualization(container, 'Need at least 2 factions for overlap visualization');
    }
  }

  /**
   * Render Faction Sentiment visualization
   * Uses document-based aggregation for volume and sentiment
   */
  renderFactionSentimentVisualization(monitor, container) {
    const narratives = monitor.matchedNarratives;
    
    // Aggregate faction sentiments from documents linked to matched narratives
    const factionStats = new Map();
    narratives.forEach(n => {
      const factionMentions = DataService.getAggregateFactionMentionsForNarrative(n.id);
      Object.entries(factionMentions).forEach(([factionId, data]) => {
        if (!factionStats.has(factionId)) {
          factionStats.set(factionId, { totalVolume: 0, weightedSentiment: 0 });
        }
        const stats = factionStats.get(factionId);
        if (data.volume && typeof data.sentiment === 'number') {
          stats.totalVolume += data.volume;
          stats.weightedSentiment += data.sentiment * data.volume;
        }
      });
    });
    
    const factions = [...factionStats.entries()]
      .map(([factionId, stats]) => {
        const faction = DataService.getFaction(factionId);
        if (!faction || stats.totalVolume === 0) return null;
        return {
          ...faction,
          sentiment: stats.weightedSentiment / stats.totalVolume,
          volume: stats.totalVolume
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.volume - a.volume);
    
    if (factions.length > 0) {
      const chart = new SentimentChart(container, {
        height: Math.max(200, factions.length * 40 + 60),
        onFactionClick: (f) => {
          window.location.hash = `#/faction/${f.id}`;
        }
      });
      chart.update({ factions });
      this.visualizationComponents.push({ monitorId: monitor.id, component: chart, type: 'faction_sentiment' });
    } else {
      this.showEmptyVisualization(container, 'No faction sentiment data available');
    }
  }

  /**
   * Render Network Graph visualization
   */
  renderNetworkGraphVisualization(monitor, container) {
    const narratives = monitor.matchedNarratives;
    
    // Collect all persons and organizations from matched narratives
    const personIds = new Set();
    const orgIds = new Set();
    
    narratives.forEach(n => {
      (n.personIds || []).forEach(id => personIds.add(id));
      (n.organizationIds || []).forEach(id => orgIds.add(id));
    });
    
    if (personIds.size + orgIds.size >= 2) {
      const graphData = DataService.buildNetworkGraph([...personIds], [...orgIds]);
      
      if (graphData.nodes.length >= 2) {
        const graph = new NetworkGraph(container, {
          height: 350,
          onNodeClick: (node) => {
            window.location.hash = `#/${node.type}/${node.id}`;
          },
          onNodeHover: (node, element) => {
            getEntityCardModal().show(node.id, node.type, element);
          },
          onNodeHoverEnd: () => {
            getEntityCardModal().scheduleHide();
          }
        });
        graph.update(graphData);
        this.visualizationComponents.push({ monitorId: monitor.id, component: graph, type: 'network_graph' });
      } else {
        this.showEmptyVisualization(container, 'Not enough connections for network graph');
      }
    } else {
      this.showEmptyVisualization(container, 'Need at least 2 people/organizations');
    }
  }

  /**
   * Render Documents visualization
   */
  renderDocumentsVisualization(monitor, container) {
    const narratives = monitor.matchedNarratives;
    
    // Collect documents from matched narratives
    const documentIds = new Set();
    narratives.forEach(n => {
      (n.documentIds || []).forEach(id => documentIds.add(id));
    });
    
    const documents = [...documentIds]
      .map(id => DataService.getDocument(id))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    
    if (documents.length > 0) {
      // Check if classification should be shown
      const settings = dataStore.getSettings();
      const showClassification = settings.showClassification;
      
      // Build columns based on classification setting
      const defaultColumns = showClassification
        ? ['classification', 'publisherName', 'title', 'excerpt', 'publishedDate']
        : ['publisherName', 'title', 'excerpt', 'publishedDate'];
      
      // Build document type filter options
      const types = new Set(documents.map(d => d.documentType).filter(Boolean));
      const typeOptionsHtml = ['<option value="all" selected>All Types</option>']
        .concat([...types].map(type => {
          const label = type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          return `<option value="${type}">${label}</option>`;
        })).join('');
      
      // Create header with controls
      const headerId = `monitor-docs-header-${monitor.id}`;
      const typeFilterId = `monitor-docs-type-${monitor.id}`;
      const columnFilterId = `monitor-docs-columns-${monitor.id}`;
      const tableContainerId = `monitor-docs-table-${monitor.id}`;
      
      container.innerHTML = `
        <div class="document-table-header" id="${headerId}">
          <button class="btn btn-secondary btn-small" id="${headerId}-expand-btn">Expand data</button>
          <div class="filter-control">
            <label class="filter-label">Type</label>
            <select id="${typeFilterId}" class="filter-select">
              ${typeOptionsHtml}
            </select>
          </div>
          <div class="filter-control" id="${columnFilterId}"></div>
        </div>
        <div id="${tableContainerId}"></div>
      `;
      
      // Initialize column filter
      const availableColumns = showClassification 
        ? { classification: 'Classification', publisherName: 'Publisher', title: 'Title', excerpt: 'Excerpt', publishedDate: 'Published' }
        : { publisherName: 'Publisher', title: 'Title', excerpt: 'Excerpt', publishedDate: 'Published' };
      
      let currentColumns = [...defaultColumns];
      const columnFilter = new ColumnFilter(columnFilterId, {
        availableColumns: availableColumns,
        defaultColumns: defaultColumns,
        requiredColumns: ['title'],
        onChange: (cols) => {
          currentColumns = cols;
          if (docTable) {
            docTable.setColumns(cols);
          }
        }
      });
      columnFilter.setSelectedColumns(currentColumns);
      columnFilter.render();
      
      // Initialize document table
      const docTable = new DocumentTable(tableContainerId, {
        columns: currentColumns,
        maxItems: 8,
        enableViewerMode: true
      });
      
      let filteredDocs = documents;
      docTable.update({ documents: filteredDocs });
      this.visualizationComponents.push({ monitorId: monitor.id, component: docTable, type: 'documents', columnFilter });
      
      // Attach expand data button handler (placeholder)
      const expandBtn = document.getElementById(`${headerId}-expand-btn`);
      if (expandBtn) {
        expandBtn.addEventListener('click', () => {
          // Expand data functionality not yet implemented
        });
      }
      
      // Attach type filter handler
      const typeSelect = document.getElementById(typeFilterId);
      if (typeSelect) {
        typeSelect.addEventListener('change', (e) => {
          const filterValue = e.target.value;
          filteredDocs = filterValue === 'all' 
            ? documents 
            : documents.filter(doc => (doc.documentType || 'news_article') === filterValue);
          docTable.update({ documents: filteredDocs });
        });
      }
    } else {
      this.showEmptyVisualization(container, 'No documents found');
    }
  }

  /**
   * Show empty state in visualization container
   */
  showEmptyVisualization(container, message) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 24px;">
        <div class="empty-state-icon">📋</div>
        <p class="empty-state-text">${message}</p>
      </div>
    `;
  }

  /**
   * Aggregate volume data from multiple narratives using document-based aggregation
   */
  aggregateVolumeData(narratives) {
    const factions = DataService.getFactions();
    const dateMap = new Map();
    
    // Aggregate volume over time from each narrative's documents
    narratives.forEach(n => {
      const volumeOverTime = DataService.getVolumeOverTimeForNarrative(n.id);
      volumeOverTime.forEach(entry => {
        if (!dateMap.has(entry.date)) {
          dateMap.set(entry.date, {});
        }
        const dayData = dateMap.get(entry.date);
        Object.entries(entry.factionVolumes || {}).forEach(([fId, vol]) => {
          dayData[fId] = (dayData[fId] || 0) + vol;
        });
      });
    });
    
    const dates = [...dateMap.keys()].sort();
    const series = factions.map(f =>
      dates.map(date => (dateMap.get(date) || {})[f.id] || 0)
    );
    
    return { dates, series, factions };
  }

  /**
   * Destroy visualization component for a specific monitor
   */
  destroyMonitorVisualization(monitorId) {
    const index = this.visualizationComponents.findIndex(c => c.monitorId === monitorId);
    if (index !== -1) {
      const { component, columnFilter } = this.visualizationComponents[index];
      if (component && typeof component.destroy === 'function') {
        component.destroy();
      }
      if (columnFilter && typeof columnFilter.destroy === 'function') {
        columnFilter.destroy();
      }
      this.visualizationComponents.splice(index, 1);
    }
    this.descriptionToggles.delete(monitorId);
  }

  /**
   * Setup visualization dropdown handlers
   */
  setupVisualizationDropdowns(enrichedMonitors) {
    const dropdowns = this.container.querySelectorAll('.monitor-viz-dropdown');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.monitor-viz-dropdown-trigger');
      const menu = dropdown.querySelector('.monitor-viz-dropdown-menu');
      const monitorId = dropdown.dataset.monitorId;
      
      if (trigger && menu) {
        this.addListener(trigger, 'click', (e) => {
          e.stopPropagation();
          
          // Close other open dropdowns
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('open');
            }
          });
          
          // Toggle this dropdown
          dropdown.classList.toggle('open');
        });
        
        // Handle option selection
        menu.querySelectorAll('.viz-dropdown-option').forEach(option => {
          this.addListener(option, 'click', (e) => {
            e.stopPropagation();
            const vizType = option.dataset.vizType;
            
            // Update selection
            this.monitorVisualizationTypes.set(monitorId, vizType);
            
            // Update dropdown label
            const label = VISUALIZATION_TYPES.find(v => v.id === vizType)?.label;
            trigger.querySelector('.viz-dropdown-label').textContent = label;
            
            // Update active state
            menu.querySelectorAll('.viz-dropdown-option').forEach(opt => {
              opt.classList.toggle('active', opt.dataset.vizType === vizType);
            });
            
            // Show/hide description toggle based on visualization type
            const descToggleWrapper = this.container.querySelector(`.desc-toggle-wrapper[data-monitor-id="${monitorId}"]`);
            if (descToggleWrapper) {
              const showToggle = vizType === 'narratives' || vizType === 'topics';
              descToggleWrapper.style.display = showToggle ? '' : 'none';
            }
            
            // Close dropdown
            dropdown.classList.remove('open');
            
            // Re-render visualization
            const monitor = enrichedMonitors.find(m => m.id === monitorId);
            if (monitor) {
              this.renderMonitorVisualization(monitor);
            }
          });
        });
      }
    });
    
    // Close dropdowns when clicking outside
    this.addListener(document, 'click', (e) => {
      if (!e.target.closest('.monitor-viz-dropdown')) {
        dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
      }
    });
  }

  /**
   * Setup dropdown toggle handlers for Monitors view
   * Uses the same pattern as the header nav-dropdowns
   */
  setupHeaderPopovers() {
    const dropdowns = this.container.querySelectorAll('.nav-dropdown.monitor-dropdown');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      
      if (trigger) {
        this.addListener(trigger, 'click', (e) => {
          e.stopPropagation();
          
          // Close other open dropdowns
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('open');
            }
          });
          
          // Toggle this dropdown
          dropdown.classList.toggle('open');
        });
      }
    });
    
    // Close dropdowns when clicking outside
    this.addListener(document, 'click', (e) => {
      if (!e.target.closest('.nav-dropdown.monitor-dropdown')) {
        dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
      }
    });
  }

  /**
   * Setup handlers for creating and editing monitors
   */
  setupMonitorEditorHandlers(enrichedMonitors) {
    // Get the monitor editor instance
    this.monitorEditor = getMonitorEditor();
    
    // Handle "New Monitor" button click
    const newMonitorBtn = document.getElementById('new-monitor-btn');
    if (newMonitorBtn) {
      this.addListener(newMonitorBtn, 'click', () => {
        this.monitorEditor.openCreate(() => {
          // Re-render the view after save
          this.render();
        });
      });
    }

    // Setup action menu dropdowns
    this.setupActionMenus(enrichedMonitors);
  }

  /**
   * Setup action menu dropdown handlers
   */
  setupActionMenus(enrichedMonitors) {
    // Initialize all dropdowns using the Dropdown component
    this._actionDropdowns = Dropdown.initAll(this.container);
    
    // Listen for dropdown select events using event delegation
    this.addListener(this.container, 'dropdown:select', (e) => {
      const { item } = e.detail;
      const action = item.dataset.action;
      const monitorId = item.dataset.monitorId;
      const monitor = enrichedMonitors.find(m => m.id === monitorId);
      
      if (!monitor) return;
      
      if (action === 'edit' && !item.disabled) {
        this.monitorEditor.openEdit(monitor, () => {
          this.render();
        });
      } else if (action === 'archive') {
        const newEnabled = monitor.enabled === false ? true : false;
        dataStore.updateMonitor(monitorId, { enabled: newEnabled });
        this.render();
      }
    });
  }

  destroy() {
    // Clean up visualization components
    this.visualizationComponents.forEach(c => {
      if (c.component && typeof c.component.destroy === 'function') {
        c.component.destroy();
      }
    });
    this.visualizationComponents = [];
    
    // Clean up action dropdowns
    if (this._actionDropdowns) {
      this._actionDropdowns.forEach(d => d.destroy());
      this._actionDropdowns = null;
    }
    
    // Clear description toggles map
    this.descriptionToggles.clear();
    
    // Clear visualization types map
    this.monitorVisualizationTypes.clear();
    
    // Event listeners are cleaned up by BaseView.destroy()
    super.destroy();
  }
}

export default MonitorsView;
