/**
 * ListView.js
 * Generic list view for browsing all entities of a type
 * Supports entity type filtering for people/organizations
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { NarrativeList } from '../components/NarrativeList.js';
import { MapView } from '../components/MapView.js';
import { renderVerticalTimeline } from '../utils/verticalTimeline.js';
import { getEntityIcon } from '../utils/entityIcons.js';
import { getEntityCardModal } from '../components/EntityCardModal.js';
import { PageHeader } from '../utils/PageHeader.js';

// Entity types with labels (used for people/orgs filter - mirrors DocumentsView pattern)
const ENTITY_TYPES = {
  all: 'All Entities',
  person: 'People Only',
  organization: 'Organizations Only'
};

export class ListView extends BaseView {
  constructor(container, entityType, options = {}) {
    super(container, options);
    this.entityType = entityType;
    this.searchQuery = '';
    this.narrativeList = null;
    this.eventsMap = null;
    this.eventsViewMode = 'map'; // 'map' or 'list'
    
    // Filter state for entities view (matches DocumentsView pattern)
    this.entityTypeFilter = 'all';
  }

  async render() {
    const config = this.getConfig();
    const items = this.getItems();
    const filteredItems = this.filterItems(items);

    // Use NarrativeList component for narratives
    if (this.entityType === 'narratives') {
      // Build breadcrumbs array
      const breadcrumbs = this.options.statusFilter
        ? [
            { label: 'Common Operating Picture', href: '#/cop' },
            { label: 'Narratives', href: '#/narratives' },
            config.title
          ]
        : [
            { label: 'Common Operating Picture', href: '#/cop' },
            config.title
          ];

      const headerHtml = PageHeader.render({
        breadcrumbs,
        title: config.title,
        subtitle: `${filteredItems.length} ${config.itemName}${filteredItems.length !== 1 ? 's' : ''}`
      });

      this.container.innerHTML = `
        ${headerHtml}

        <div class="content-area">
          <div class="card">
            <div class="card-header">
              <div class="search-input-wrapper" style="max-width: 300px;">
                <span class="search-icon">${getEntityIcon('search', 14)}</span>
                <input 
                  type="text" 
                  class="search-input" 
                  placeholder="Search ${config.itemName}s..." 
                  id="list-search"
                  value="${this.searchQuery}"
                />
              </div>
            </div>
            <div class="card-body no-padding" id="narrative-list-container"></div>
          </div>
        </div>
      `;

      // Initialize NarrativeList component
      this.narrativeList = new NarrativeList('narrative-list-container', {
        maxItems: 100,
        showStatus: true,
        showSparkline: true,
        showVolume: true,
        onItemClick: (narrative) => {
          window.location.hash = `#/narrative/${narrative.id}`;
        }
      });
      this.narrativeList.update({ narratives: filteredItems });

      // Attach search listener
      const searchInput = document.getElementById('list-search');
      if (searchInput) {
        this.addListener(searchInput, 'input', (e) => {
          this.searchQuery = e.target.value;
          this.updateFilteredList();
        });
      }
      return;
    }

    // Special handling for events - show on map or list with toggle
    if (this.entityType === 'events') {
      // Get locations for the map
      const locations = DataService.getAllLocationsWithCounts(this.timeRange);
      
      // Build breadcrumbs array
      const breadcrumbs = this.options.statusFilter
        ? [
            { label: 'Common Operating Picture', href: '#/cop' },
            { label: 'Events', href: '#/events' },
            config.title
          ]
        : [
            { label: 'Common Operating Picture', href: '#/cop' },
            config.title
          ];

      const headerHtml = PageHeader.render({
        breadcrumbs,
        title: config.title,
        subtitle: `${filteredItems.length} ${config.itemName}${filteredItems.length !== 1 ? 's' : ''}`
      });

      this.container.innerHTML = `
        ${headerHtml}

        <div class="content-area">
          <div class="card">
            <div class="card-header">
              <div class="search-input-wrapper" style="max-width: 300px;">
                <span class="search-icon">${getEntityIcon('search', 14)}</span>
                <input 
                  type="text" 
                  class="search-input" 
                  placeholder="Search ${config.itemName}s..." 
                  id="list-search"
                  value="${this.searchQuery}"
                />
              </div>
              <div class="view-toggle events-view-toggle">
                <button class="view-toggle-btn ${this.eventsViewMode === 'map' ? 'active' : ''}" data-view="map" title="Map View">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
                    <circle cx="8" cy="6" r="2"/>
                  </svg>
                </button>
                <button class="view-toggle-btn ${this.eventsViewMode === 'list' ? 'active' : ''}" data-view="list" title="List View">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M2 4h12M2 8h12M2 12h12"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="card-body no-padding ${this.eventsViewMode === 'list' ? 'card-body-scrollable' : ''}" id="events-content"></div>
          </div>
        </div>
      `;

      // Store data for view switching
      this._eventsData = { events: filteredItems, locations };

      // Attach search listener and view toggle
      this.attachEventListeners(config);
      this.attachEventsViewToggle();

      // Render current view (map or list)
      this.renderEventsView();
      return;
    }

    // Build entity type filter options (mirrors DocumentsView publisherTypeFilter pattern)
    const entityTypeFilterHtml = this.entityType === 'entities' 
      ? `<div class="filter-control">
          <label class="filter-label">Type</label>
          <select id="entity-type-filter" class="filter-select">
            ${Object.entries(ENTITY_TYPES).map(([key, label]) => {
              const selected = this.entityTypeFilter === key ? 'selected' : '';
              return `<option value="${key}" ${selected}>${label}</option>`;
            }).join('')}
          </select>
        </div>`
      : '';

    // Build breadcrumbs array
    const breadcrumbs = this.options.statusFilter
      ? [
          { label: 'Common Operating Picture', href: '#/cop' },
          { label: config.title, href: `#/${this.entityType}` },
          config.title
        ]
      : [
          { label: 'Common Operating Picture', href: '#/cop' },
          config.title
        ];

    const headerHtml = PageHeader.render({
      breadcrumbs,
      title: config.title,
      subtitle: `${filteredItems.length} ${filteredItems.length !== 1 ? (config.itemNamePlural || config.itemName + 's') : config.itemName}`
    });

    // Default rendering for other entity types
    this.container.innerHTML = `
      ${headerHtml}

      <div class="content-area">
        <div class="card">
          <div class="card-header">
            <div class="search-input-wrapper" style="max-width: 300px;">
              <span class="search-icon">${getEntityIcon('search', 14)}</span>
              <input 
                type="text" 
                class="search-input" 
                placeholder="Search ${config.itemNamePlural || config.itemName + 's'}..." 
                id="list-search"
                value="${this.searchQuery}"
              />
            </div>
            ${entityTypeFilterHtml ? `<div class="card-header-actions">${entityTypeFilterHtml}</div>` : ''}
          </div>
          <div class="card-body no-padding">
            <ul class="entity-list" id="entity-list">
              ${filteredItems.map(item => this.renderItem(item, config)).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners(config);
  }

  getConfig() {
    const configs = {
      narratives: {
        title: 'Narratives',
        itemName: 'narrative',
        iconType: 'narratives',
        route: 'narrative',
        getSubtitle: (item) => {
          const factionMentions = DataService.getAggregateFactionMentionsForNarrative(item.id);
          const volume = Object.values(factionMentions)
            .reduce((sum, f) => sum + (f.volume || 0), 0);
          return `${volume.toLocaleString()} mentions`;
        },
        getStatus: null
      },
      factions: {
        title: 'Factions',
        itemName: 'faction',
        iconType: 'factions',
        route: 'faction',
        getSubtitle: (item) => `${item.memberCount ? item.memberCount.toLocaleString() + ' members' : 'No member data'}`,
        getColor: (item) => item.color
      },
      locations: {
        title: 'Locations',
        itemName: 'location',
        iconType: 'locations',
        route: 'location',
        getSubtitle: (item) => item.type || 'Location'
      },
      events: {
        title: 'Events',
        itemName: 'event',
        iconType: 'events',
        route: 'event',
        getSubtitle: (item) => {
          const date = new Date(item.date);
          return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          });
        }
      },
      entities: {
        // Dynamic title/names based on entity type filter
        title: this.entityTypeFilter === 'person' 
          ? 'People' 
          : this.entityTypeFilter === 'organization' 
            ? 'Organizations' 
            : 'People & Organizations',
        itemName: this.entityTypeFilter === 'person' 
          ? 'person' 
          : this.entityTypeFilter === 'organization' 
            ? 'organization' 
            : 'entit',
        itemNamePlural: this.entityTypeFilter === 'person' 
          ? 'people' 
          : this.entityTypeFilter === 'organization' 
            ? 'organizations' 
            : 'entities',
        iconType: 'entities',
        route: null, // Special handling
        getSubtitle: (item) => item.type || (item._entityType === 'person' ? 'Person' : 'Organization')
      },
      topics: {
        title: 'Topics',
        itemName: 'topic',
        iconType: 'narratives', // Reuse narratives icon for topics
        route: 'topic',
        getSubtitle: (item) => {
          // Show date range and volume
          const startDate = item.startDate ? new Date(item.startDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          }) : '';
          const totalVolume = (item.volumeOverTime || []).reduce((sum, v) => sum + (v.volume || 0), 0);
          const parts = [];
          if (startDate) parts.push(`Started ${startDate}`);
          if (totalVolume > 0) parts.push(`${totalVolume.toLocaleString()} mentions`);
          return parts.join(' · ') || 'Topic';
        }
      }
    };

    return configs[this.entityType] || configs.narratives;
  }

  getItems() {
    let items;
    switch (this.entityType) {
      case 'narratives':
        // Apply mission and time range filters
        items = DataService.getNarratives(this.missionId, this.timeRange);
        // Apply status filter if provided
        if (this.options.statusFilter) {
          items = items.filter(n => (n.status || 'new') === this.options.statusFilter);
        }
        return items;
      case 'factions':
        return DataService.getFactions();
      case 'locations':
        return DataService.getLocations();
      case 'events':
        let events = DataService.getEvents().filter(e => !e.parentEventId); // Only top-level events
        // Apply time range filter to events
        if (this.timeRange) {
          events = events.filter(e => DataService.isDateInRange(e.date, this.timeRange));
        }
        return events;
      case 'entities':
        // Apply entity type filter (mirrors DocumentsView publisherTypeFilter pattern)
        if (this.entityTypeFilter === 'person') {
          return DataService.getPersons().map(p => ({ ...p, _entityType: 'person' }));
        } else if (this.entityTypeFilter === 'organization') {
          return DataService.getOrganizations().map(o => ({ ...o, _entityType: 'organization' }));
        }
        // Default: return all entities
        return [
          ...DataService.getPersons().map(p => ({ ...p, _entityType: 'person' })),
          ...DataService.getOrganizations().map(o => ({ ...o, _entityType: 'organization' }))
        ];
      case 'topics':
        let topics = DataService.getTopics();
        // Apply time range filter to topics
        if (this.timeRange) {
          topics = DataService.getTopicsInRange(this.timeRange);
        }
        // Map headline to text for consistent display
        return topics.map(t => ({ ...t, text: t.headline }));
      default:
        return [];
    }
  }

  filterItems(items) {
    if (!this.searchQuery) return items;
    const query = this.searchQuery.toLowerCase();
    return items.filter(item => {
      const searchText = (item.text || item.name || '').toLowerCase();
      return searchText.includes(query);
    });
  }

  /**
   * Update only the filtered list content without re-rendering the whole page
   * This prevents the search input from losing focus
   */
  updateFilteredList() {
    const config = this.getConfig();
    const items = this.getItems();
    const filteredItems = this.filterItems(items);

    // Update subtitle count (use itemNamePlural for correct pluralization)
    const subtitle = this.container.querySelector('.subtitle');
    if (subtitle) {
      subtitle.textContent = `${filteredItems.length} ${filteredItems.length !== 1 ? (config.itemNamePlural || config.itemName + 's') : config.itemName}`;
    }

    // Update content based on entity type
    if (this.entityType === 'narratives' && this.narrativeList) {
      this.narrativeList.update({ narratives: filteredItems });
    } else if (this.entityType === 'events') {
      // Update stored data and re-render current view
      const locations = DataService.getAllLocationsWithCounts(this.timeRange);
      this._eventsData = { events: filteredItems, locations };
      this.renderEventsView();
    } else {
      // Update the entity list for events (list view) and other entity types
      const entityList = document.getElementById('entity-list');
      if (entityList) {
        entityList.innerHTML = filteredItems.map(item => this.renderItem(item, config)).join('');
        // Re-attach click listeners for the new items
        this.attachItemClickListeners(config);
      }
    }
  }

  /**
   * Render the events view (map or list) based on current mode
   */
  renderEventsView() {
    if (this.eventsViewMode === 'map') {
      this.renderEventsMap();
    } else {
      this.renderEventsList();
    }
  }

  /**
   * Render events as a map
   */
  renderEventsMap() {
    // Clean up existing map
    if (this.eventsMap) {
      this.eventsMap.destroy();
      this.eventsMap = null;
    }

    const container = document.getElementById('events-content');
    if (!container || !this._eventsData) return;

    // Remove scrollable class for map view
    container.classList.remove('card-body-scrollable');

    const { events, locations } = this._eventsData;

    if (events.length === 0 && locations.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 60px 20px;">
          <div class="empty-state-icon">📍</div>
          <p class="empty-state-text">No events with location data to display</p>
        </div>
      `;
      return;
    }

    // Clear container and add map container
    container.innerHTML = '<div id="events-map-container" style="height: 500px;"></div>';

    this.eventsMap = new MapView('events-map-container', {
      height: 500,
      onEventClick: (event) => {
        window.location.hash = `#/event/${event.id}`;
      }
    });
    this.eventsMap.update({ locations, events });
  }

  /**
   * Render events as a list
   */
  renderEventsList() {
    // Clean up existing map
    if (this.eventsMap) {
      this.eventsMap.destroy();
      this.eventsMap = null;
    }

    const container = document.getElementById('events-content');
    if (!container || !this._eventsData) return;

    // Add scrollable class for list view
    container.classList.add('card-body-scrollable');

    const { events } = this._eventsData;

    if (events.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 60px 20px;">
          <div class="empty-state-icon">📅</div>
          <p class="empty-state-text">No events to display</p>
        </div>
      `;
      return;
    }

    // Render vertical timeline
    container.innerHTML = renderVerticalTimeline(events, { sortNewestFirst: true });

    // Attach click listeners for timeline items
    container.querySelectorAll('.vertical-timeline-item').forEach(item => {
      this.addListener(item, 'click', () => {
        const eventId = item.dataset.eventId;
        window.location.hash = `#/event/${eventId}`;
      });
    });
  }

  /**
   * Attach view toggle listeners for events map/list
   */
  attachEventsViewToggle() {
    const toggleContainer = this.container.querySelector('.events-view-toggle');
    if (!toggleContainer) return;

    toggleContainer.querySelectorAll('.view-toggle-btn').forEach(btn => {
      this.addListener(btn, 'click', () => {
        const newMode = btn.dataset.view;
        if (newMode !== this.eventsViewMode) {
          this.eventsViewMode = newMode;
          
          // Update button states
          toggleContainer.querySelectorAll('.view-toggle-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.view === newMode);
          });
          
          // Re-render the view
          this.renderEventsView();
        }
      });
    });
  }

  /**
   * Attach click listeners to entity list items
   */
  attachItemClickListeners(config) {
    // Entity types that support hover cards
    const hoverTypes = ['person', 'organization', 'faction', 'location'];
    
    const items = document.querySelectorAll('.entity-list-item');
    items.forEach(item => {
      const id = item.dataset.id;
      const type = item.dataset.type;
      
      // Add click handler for navigation
      this.addListener(item, 'click', () => {
        if (this.entityType === 'entities') {
          window.location.hash = `#/${type}/${id}`;
        } else {
          window.location.hash = `#/${config.route}/${id}`;
        }
      });
      
      // Add hover handlers for entity card popover
      const entityType = this.entityType === 'entities' ? type : config.route;
      if (hoverTypes.includes(entityType)) {
        this.addListener(item, 'mouseenter', () => {
          getEntityCardModal().show(id, entityType, item);
        });
        
        this.addListener(item, 'mouseleave', () => {
          getEntityCardModal().scheduleHide();
        });
      }
    });
  }

  renderItem(item, config) {
    const title = item.text || item.name;
    const subtitle = config.getSubtitle ? config.getSubtitle(item) : '';
    const color = config.getColor ? config.getColor(item) : null;
    const status = config.getStatus ? config.getStatus(item) : null;
    const iconType = item._entityType || config.iconType;
    const icon = getEntityIcon(iconType, 16);

    return `
      <li class="entity-list-item" data-id="${item.id}" data-type="${item._entityType || this.entityType}">
        <div class="entity-avatar ${item._entityType || ''}" ${color ? `style="background: ${color}20; color: ${color};"` : ''}>
          ${icon}
        </div>
        <div class="entity-info">
          <div class="entity-name">${title.length > 60 ? title.slice(0, 58) + '...' : title}</div>
          <div class="entity-meta">
            ${subtitle ? `<span class="entity-subtitle">${subtitle}</span>` : ''}
            ${status ? `<span class="badge badge-status-${status.key}">${status.label}</span>` : ''}
          </div>
        </div>
      </li>
    `;
  }

  attachEventListeners(config) {
    // Search input
    const searchInput = document.getElementById('list-search');
    if (searchInput) {
      this.addListener(searchInput, 'input', (e) => {
        this.searchQuery = e.target.value;
        this.updateFilteredList();
      });
    }

    // Entity type filter (mirrors DocumentsView publisherTypeFilter pattern)
    const entityTypeSelect = document.getElementById('entity-type-filter');
    if (entityTypeSelect) {
      this.addListener(entityTypeSelect, 'change', (e) => {
        this.entityTypeFilter = e.target.value;
        this.render();
      });
    }

    // Item clicks (list view)
    this.attachItemClickListeners(config);
  }

  destroy() {
    if (this.narrativeList) {
      this.narrativeList.destroy();
      this.narrativeList = null;
    }
    if (this.eventsMap) {
      this.eventsMap.destroy();
      this.eventsMap = null;
    }
    super.destroy();
  }
}

export default ListView;
