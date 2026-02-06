/**
 * DashboardView.js
 * Aggregate overview of all narratives, filtered by mission and time range
 * Uses CardManager pattern for consistent card component management
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';
import { formatDateWithYear } from '../utils/formatters.js';
import { StatCards } from '../components/StatCards.js';
import {
  CardManager,
  NarrativeListCard,
  TopicListCard,
  MapCard,
  TimelineVolumeCompositeCard,
  SentimentChartCard
} from '../components/CardComponents.js';

export class DashboardView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
    // Tag filter: Set of selected tag IDs
    this.selectedTags = new Set();
    // Tag dropdown open state
    this.tagDropdownOpen = false;
    // Card manager for dashboard cards
    this.cardManager = new CardManager(this);
  }

  async render() {
    const tagFilter = this.getSelectedTagIds();
    const stats = DataService.getDashboardStats(this.missionId, this.timeRange, tagFilter.length > 0 ? tagFilter : null);
    const topics = DataService.getTopicsInRange(this.timeRange, tagFilter.length > 0 ? tagFilter : null);
    const mission = this.missionId !== 'all' 
      ? DataService.getMission(this.missionId)
      : null;

    // Get the dataset name for the title
    const datasetName = DataService.getCurrentDatasetName();

    // Build subtitle with filter info
    let subtitle = mission ? `Mission: ${mission.name}` : 'All missions overview';
    if (this.timeRange) {
      subtitle += ` | ${formatDateWithYear(this.timeRange.start)} - ${formatDateWithYear(this.timeRange.end)}`;
    }

    // Fetch data for cards
    const dashboardData = this.fetchDashboardData(stats, topics);
    
    // Set up card components
    this.setupDashboardCards(dashboardData, stats);

    // Get full entity data for stat card dropdowns
    const statsEntityData = this.fetchStatsData(tagFilter);
    const statsData = StatCards.buildDashboardStatsWithItems(statsEntityData);

    this.container.innerHTML = `
      <div class="page-header page-header-with-tabs page-header-with-stats">
        <div class="page-header-top-row">
          <div class="page-header-content">
            <h1>${datasetName}</h1>
            <p class="subtitle">${subtitle}</p>
          </div>
          ${StatCards.renderDropdowns(statsData)}
        </div>
        <div class="page-header-tabs page-header-filters">
          <div class="filter-group mission-filter-group">
            <label for="mission-filter">Mission</label>
            <select id="mission-filter">
              <option value="all">All Missions</option>
            </select>
          </div>
          <div class="filter-group tag-filter-group">
            <label>Tags</label>
            ${this.renderTagFilterDropdown()}
          </div>
          <div class="filter-group time-filter-group">
            <label>Time Range</label>
            <div class="time-filter-wrapper">
              <div id="time-range-filter"></div>
              <span id="time-range-label" class="time-range-label">All Time</span>
              <button id="clear-time-filter" class="btn-icon clear-filter-btn" title="Clear time filter">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4l8 8M12 4l-8 8"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="content-area">
        <div class="content-grid">
          ${this.cardManager.getHtml()}
        </div>
      </div>
    `;

    // Initialize card width toggles
    const contentGrid = this.container.querySelector('.content-grid');
    initAllCardToggles(contentGrid, 'dashboard', {
      0: 'full', // Volume & Timeline Composite - full width
      1: 'half', // Top Narratives - half width
      2: 'half', // Sentiment by Faction - half width
      3: 'half', // Trending Topics - half width
      4: 'half'  // Events & Locations Map - half width
    });

    // Initialize stat card dropdowns
    this._statDropdowns = StatCards.initDropdowns(this.container);

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Set up tag filter handlers
    this.setupTagFilterHandlers();
  }

  /**
   * Fetch all data needed for dashboard cards
   */
  fetchDashboardData(stats, topics) {
    // Volume Over Time data
    const volumeData = DataService.getAggregateVolumeOverTime(this.missionId, this.timeRange);
    const publisherData = DataService.getAggregatePublisherVolumeOverTime(this.missionId, this.timeRange);
    const recentEvents = DataService.getRecentEvents(null, this.timeRange);
    const narrativeDurations = DataService.getNarrativeDurations(this.missionId, this.timeRange);

    // Faction sentiments
    const factionSentiments = DataService.getAggregateFactionSentiments(this.missionId, this.timeRange);

    // Locations for map
    const locations = DataService.getAllLocationsWithCounts(this.timeRange);

    // Sort topics by total volume (descending)
    const sortedTopics = topics && topics.length > 0 
      ? [...topics].sort((a, b) => {
          const volA = (a.volumeOverTime || []).reduce((sum, e) => sum + (e.volume || 0), 0);
          const volB = (b.volumeOverTime || []).reduce((sum, e) => sum + (e.volume || 0), 0);
          return volB - volA;
        })
      : [];

    return {
      narratives: stats.topNarratives || [],
      topics: sortedTopics,
      volumeData,
      publisherData,
      recentEvents,
      narrativeDurations,
      factionSentiments,
      locations
    };
  }

  /**
   * Fetch entity data for stat card dropdowns
   * @param {Array} tagFilter - Optional tag filter
   * @returns {Object} Entity data with arrays for each type
   */
  fetchStatsData(tagFilter) {
    const tagIds = tagFilter?.length > 0 ? tagFilter : null;
    
    // Get narratives (filtered)
    let narratives = DataService.getNarratives(this.missionId, this.timeRange);
    if (tagIds) {
      narratives = narratives.filter(n => n.tagIds && tagIds.some(t => n.tagIds.includes(t)));
    }
    
    // Get topics
    const topics = DataService.getTopicsInRange(this.timeRange, tagIds);
    
    // Get factions
    const factions = DataService.getFactions();
    
    // Get locations
    const locations = DataService.getLocations();
    
    // Get events (filtered by time range)
    let events = DataService.getEvents();
    if (this.timeRange) {
      events = events.filter(e => DataService.isDateInRange(e.date, this.timeRange));
    }
    
    // Get entities (persons + organizations)
    const persons = DataService.getPersons();
    const organizations = DataService.getOrganizations();
    const entities = [...persons, ...organizations];
    
    // Get documents (filtered by time range)
    let documents = DataService.getDocuments();
    if (this.timeRange) {
      documents = documents.filter(d => DataService.isDateInRange(d.publishedDate, this.timeRange));
    }
    
    // Get activity (comments and highlights)
    const activity = DataService.getAllActivity();
    
    return {
      narratives,
      topics,
      factions,
      locations,
      events,
      entities,
      documents,
      activity
    };
  }

  /**
   * Set up card components using CardManager
   */
  setupDashboardCards(data, stats) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    const hasVolumeData = data.volumeData?.dates?.length > 0 && data.volumeData?.factions?.length > 0;
    const hasPublisherData = data.publisherData?.dates?.length > 0 && data.publisherData?.publishers?.length > 0;
    const hasEvents = data.recentEvents?.length > 0;
    const hasDurationData = data.narrativeDurations?.length > 0;

    // 1. Volume Over Time & Events (full width)
    if (hasVolumeData || hasPublisherData || hasEvents || hasDurationData) {
      this.cardManager.add(new TimelineVolumeCompositeCard(this, 'dashboard-volume-timeline', {
        title: 'Volume Over Time & Events',
        volumeData: hasVolumeData ? data.volumeData : null,
        publisherData: hasPublisherData ? data.publisherData : null,
        events: data.recentEvents || [],
        narrativeDurations: hasDurationData ? data.narrativeDurations : null,
        fullWidth: true,
        height: 450,
        volumeHeight: 180,
        timelineHeight: 180,
        showViewToggle: hasVolumeData && hasPublisherData
      }));
    }

    // 2. Top Narratives by Volume (half width)
    if (data.narratives.length > 0) {
      this.cardManager.add(new NarrativeListCard(this, 'dashboard-narrative-list', {
        title: 'Top Narratives by Volume',
        narratives: data.narratives,
        maxItems: 8,
        halfWidth: true,
        showDescriptionToggle: true
      }));
    }

    // 3. Sentiment by Faction (half width)
    if (data.factionSentiments.length > 0) {
      this.cardManager.add(new SentimentChartCard(this, 'dashboard-sentiment-chart', {
        title: 'Sentiment by Faction',
        factions: data.factionSentiments,
        halfWidth: true,
        clickRoute: 'faction'
      }));
    }

    // 4. Trending Topics (half width)
    if (data.topics.length > 0) {
      this.cardManager.add(new TopicListCard(this, 'dashboard-topic-list', {
        title: 'Trending Topics',
        topics: data.topics,
        maxItems: 6,
        halfWidth: true,
        showBulletsToggle: true,
        defaultShowBulletPoints: false
      }));
    }

    // 5. Events & Locations Map (half width with map/list toggle)
    if (data.locations.length > 0 || hasEvents) {
      this.cardManager.add(new MapCard(this, 'dashboard-events-map', {
        title: 'Events & Locations',
        locations: data.locations,
        events: data.recentEvents || [],
        halfWidth: true,
        height: 350,
        showViewToggle: true,
        defaultView: 'map',
        maxListItems: 25
      }));
    }
  }

  setMission(missionId) {
    this.missionId = missionId;
    this.render();
  }

  setTimeRange(timeRange) {
    this.timeRange = timeRange;
    this.render();
  }

  /**
   * Render the tag filter dropdown with grouped tags
   */
  renderTagFilterDropdown() {
    const { groups, ungrouped } = DataService.getTagsByGroup();
    const tags = DataService.getTags();
    const selectedCount = this.selectedTags.size;
    const buttonLabel = selectedCount === 0 
      ? 'All Tags' 
      : selectedCount === 1 
        ? `1 Tag` 
        : `${selectedCount} Tags`;

    // Render a tag option row
    const renderTagOption = (tag, group = null) => {
      const displayColor = tag.color || (group?.color) || '#6b7280';
      return `
        <label class="tag-filter-option" data-tag-id="${tag.id}">
          <input type="checkbox" ${this.selectedTags.has(tag.id) ? 'checked' : ''} />
          <span class="tag-filter-color" style="background-color: ${displayColor}"></span>
          <span class="tag-filter-name">${this.escapeHtml(tag.name)}</span>
        </label>
      `;
    };

    // Render a tag group section
    const renderTagGroup = (group, tags) => `
      <div class="tag-filter-group">
        <div class="tag-filter-group-header">
          <span class="tag-filter-group-name">${this.escapeHtml(group.name)}</span>
          ${group.exclusive ? '<span class="tag-filter-group-badge">one only</span>' : ''}
        </div>
        ${tags.map(tag => renderTagOption(tag, group)).join('')}
      </div>
    `;

    return `
      <div class="tag-filter-dropdown ${this.tagDropdownOpen ? 'open' : ''}" id="tag-filter-dropdown">
        <button class="tag-filter-btn" id="tag-filter-btn" type="button">
          <span class="tag-filter-label">${buttonLabel}</span>
          <svg class="tag-filter-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </button>
        <div class="tag-filter-menu" id="tag-filter-menu">
          ${tags.length === 0 ? `
            <div class="tag-filter-empty">No tags defined</div>
          ` : `
            <div class="tag-filter-options">
              ${groups.map(({ group, tags }) => tags.length > 0 ? renderTagGroup(group, tags) : '').join('')}
              ${ungrouped.length > 0 ? `
                <div class="tag-filter-group">
                  <div class="tag-filter-group-header">
                    <span class="tag-filter-group-name">Other</span>
                  </div>
                  ${ungrouped.map(tag => renderTagOption(tag)).join('')}
                </div>
              ` : ''}
            </div>
            ${selectedCount > 0 ? `
              <div class="tag-filter-footer">
                <button class="tag-filter-clear" id="tag-filter-clear">Clear all</button>
              </div>
            ` : ''}
          `}
        </div>
      </div>
    `;
  }

  /**
   * Set up tag filter event handlers
   */
  setupTagFilterHandlers() {
    const dropdown = this.container.querySelector('#tag-filter-dropdown');
    const btn = this.container.querySelector('#tag-filter-btn');
    const menu = this.container.querySelector('#tag-filter-menu');

    if (!dropdown || !btn) return;

    // Toggle dropdown
    this.addListener(btn, 'click', (e) => {
      e.stopPropagation();
      this.tagDropdownOpen = !this.tagDropdownOpen;
      dropdown.classList.toggle('open', this.tagDropdownOpen);
    });

    // Close on outside click
    this.addListener(document, 'click', (e) => {
      if (this.tagDropdownOpen && !dropdown.contains(e.target)) {
        this.tagDropdownOpen = false;
        dropdown.classList.remove('open');
      }
    });

    // Handle checkbox changes
    const checkboxes = menu?.querySelectorAll('input[type="checkbox"]');
    checkboxes?.forEach(checkbox => {
      this.addListener(checkbox, 'change', (e) => {
        const tagId = e.target.closest('.tag-filter-option').dataset.tagId;
        if (e.target.checked) {
          this.selectedTags.add(tagId);
        } else {
          this.selectedTags.delete(tagId);
        }
        this.applyTagFilter();
      });
    });

    // Clear all button
    const clearBtn = this.container.querySelector('#tag-filter-clear');
    if (clearBtn) {
      this.addListener(clearBtn, 'click', (e) => {
        e.stopPropagation();
        this.selectedTags.clear();
        this.tagDropdownOpen = false;
        this.applyTagFilter();
      });
    }
  }

  /**
   * Apply tag filter and re-render dashboard
   */
  applyTagFilter() {
    // Re-render to apply the filter
    this.render();
  }

  /**
   * Get the selected tag IDs as an array
   */
  getSelectedTagIds() {
    return Array.from(this.selectedTags);
  }

  destroy() {
    // Clean up stat dropdowns
    if (this._statDropdowns) {
      this._statDropdowns.forEach(d => d.destroy && d.destroy());
      this._statDropdowns = null;
    }
    this.cardManager.destroyAll();
    super.destroy();
  }
}

export default DashboardView;
