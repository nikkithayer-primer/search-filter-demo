/**
 * router.js
 * Hash-based routing for single-page navigation
 * Uses ID-based routing where entity types are inferred from ID prefixes
 * Manages global filter state (mission + time range)
 * 
 * Route Pattern: #/{contextId?}/{entityId}/
 * Examples:
 *   - #/monitor-001/person-003/ (person within monitor scope)
 *   - #/workspace-001/narr-005/ (narrative within workspace scope)  
 *   - #/person-003/ (person in COP/global scope)
 *   - #/cop/ (COP home)
 * 
 * See docs/ROUTING.md for full specification
 */

import { DashboardView } from './views/DashboardView.js';
import { NarrativeView } from './views/NarrativeView.js';
import { escapeHtml } from './utils/htmlUtils.js';
import { ThemeView } from './views/ThemeView.js';
import { FactionView } from './views/FactionView.js';
import { LocationView } from './views/LocationView.js';
import { EventView } from './views/EventView.js';
import { PersonView } from './views/PersonView.js';
import { OrganizationView } from './views/OrganizationView.js';
import { DocumentView } from './views/DocumentView.js';
import { DocumentsView } from './views/DocumentsView.js';
import { ListView } from './views/ListView.js';
import { MonitorsView } from './views/MonitorsView.js';
import { MonitorView } from './views/MonitorView.js';
import { WorkspacesView } from './views/WorkspacesView.js';
import { WorkspaceView } from './views/WorkspaceView.js';
import { SearchView } from './views/SearchView.js';
import { ProjectsView } from './views/ProjectsView.js';
import { ProjectView } from './views/ProjectView.js';
import { TopicView } from './views/TopicView.js';
import { TagsView } from './views/TagsView.js';
import { TagDetailView } from './views/TagDetailView.js';
import { ActivityFeedView } from './views/ActivityFeedView.js';
import { initStickyHeader, destroyStickyHeader } from './utils/stickyHeader.js';
import { TimeRangeFilter } from './components/TimeRangeFilter.js';
import { DataService } from './data/DataService.js';
import { dataStore } from './data/DataStore.js';
import { formatDate } from './utils/formatters.js';
import { 
  getEntityTypeFromId, 
  isContextId, 
  parseIdRoute,
  getEntityTypeDisplayName 
} from './utils/idUtils.js';

// View classes mapped by entity type (derived from ID prefix)
const ENTITY_VIEW_MAP = {
  'narrative': { view: NarrativeView, listType: 'narratives' },
  'theme': { view: ThemeView, listType: 'narratives' },
  'faction': { view: FactionView, listType: 'factions' },
  'location': { view: LocationView, listType: 'locations' },
  'event': { view: EventView, listType: 'events' },
  'person': { view: PersonView, listType: 'entities' },
  'organization': { view: OrganizationView, listType: 'entities' },
  'document': { view: DocumentView, listType: 'documents' },
  'topic': { view: TopicView, listType: 'topics' },
  'tag': { view: TagDetailView, listType: 'tags' },
  'monitor': { view: MonitorView, listType: 'monitors' },
  'workspace': { view: WorkspaceView, listType: 'workspaces' },
  'project': { view: ProjectView, listType: 'projects' }
};

// Top-level routes that don't follow the ID-based pattern
const TOP_LEVEL_ROUTES = ['workspaces', 'monitors', 'search', 'projects', 'activity', 'documents', 'settings', 'data-model', 'component-demos', 'status', 'cop'];

export class Router {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Router: Container element '${containerId}' not found`);
    }
    
    this.currentView = null;
    this.timeRangeFilter = null;
    
    // Global filter state
    this.filters = {
      missionId: 'all',
      timeRange: null // { start: Date, end: Date } or null for all time
    };
    
    // Track dashboard filter listeners for cleanup
    this._dashboardListeners = [];

    // Bind hash change handler with error handling
    window.addEventListener('hashchange', () => {
      try {
        this.handleRoute();
      } catch (e) {
        console.error('Router: Error handling route change:', e);
        this.showErrorPage('Navigation Error', 'An error occurred while loading this page.');
      }
    });
  }
  
  /**
   * Add a dashboard filter listener with tracking for cleanup
   */
  _addDashboardListener(element, event, handler) {
    if (!element) return;
    element.addEventListener(event, handler);
    this._dashboardListeners.push({ element, event, handler });
  }
  
  /**
   * Remove all tracked dashboard filter listeners
   */
  _removeDashboardListeners() {
    this._dashboardListeners.forEach(({ element, event, handler }) => {
      try {
        element.removeEventListener(event, handler);
      } catch (e) {
        // Element may have been removed from DOM
      }
    });
    this._dashboardListeners = [];
  }
  
  /**
   * Clean up dashboard-specific resources when navigating away
   */
  cleanupDashboardFilters() {
    this._removeDashboardListeners();
    
    if (this.timeRangeFilter && this.timeRangeFilter.destroy) {
      try {
        this.timeRangeFilter.destroy();
      } catch (e) {
        console.error('Router: Error destroying time range filter:', e);
      }
      this.timeRangeFilter = null;
    }
  }

  /**
   * Show an error page when something goes wrong
   */
  showErrorPage(title = 'Error', message = 'An unexpected error occurred.') {
    if (this.container) {
      this.container.innerHTML = `
        <div class="view-header">
          <div>
            <h1 class="view-title">${this.escapeHtml(title)}</h1>
            <p class="view-subtitle">${this.escapeHtml(message)}</p>
          </div>
        </div>
        <div class="content-area">
          <div class="card">
            <div class="card-body" style="padding: var(--space-2xl); text-align: center;">
              <p>Try <a href="#/cop/">returning to the Common Operating Picture</a> or refreshing the page.</p>
            </div>
          </div>
        </div>
      `;
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    return escapeHtml(text);
  }

  /**
   * Initialize router and navigate to current hash
   */
  init() {
    try {
      // Get default page from settings
      const settings = dataStore.getSettings();
      let defaultPage = settings.defaultStartPage || 'monitors';
      
      // If COP is disabled and was set as start page, fall back to monitors
      if (!settings.copEnabled && (defaultPage === 'cop' || defaultPage === 'dashboard')) {
        defaultPage = 'monitors';
      }
      
      // Navigate to current hash or default based on settings
      if (!window.location.hash || window.location.hash === '#/') {
        window.location.hash = `#/${defaultPage}`;
      } else {
        this.handleRoute();
      }
    } catch (e) {
      console.error('Router: Error during initialization:', e);
      // Try to at least show monitors as fallback
      window.location.hash = '#/monitors';
    }
  }

  /**
   * Initialize dashboard filters (called after dashboard renders)
   */
  initDashboardFilters() {
    // Set up mission filter listener
    this.initMissionFilter();
    
    // Populate mission filter options
    this.populateMissionFilter();
    
    // Set up time range filter
    this.initTimeRangeFilter();
    
    // Set up clear time filter button
    this.initClearTimeFilterButton();
    
    // Update time range label based on current state
    this.updateTimeRangeLabel(this.filters.timeRange);
  }

  /**
   * Populate mission filter dropdown with available missions
   */
  populateMissionFilter() {
    const select = document.getElementById('mission-filter');
    if (!select) return;

    const missions = DataService.getMissions();
    const currentValue = this.filters.missionId || 'all';

    select.innerHTML = `
      <option value="all">All Missions</option>
      ${missions.map(m => `
        <option value="${m.id}" ${currentValue === m.id ? 'selected' : ''}>
          ${m.name}
        </option>
      `).join('')}
    `;
  }

  /**
   * Initialize mission filter dropdown
   */
  initMissionFilter() {
    try {
      const missionSelect = document.getElementById('mission-filter');
      if (missionSelect) {
        this._addDashboardListener(missionSelect, 'change', (e) => {
          this.filters.missionId = e.target.value || 'all';
          this.onFiltersChanged();
        });
      }
    } catch (e) {
      console.error('Router: Error initializing mission filter:', e);
    }
  }

  /**
   * Initialize time range filter component
   */
  initTimeRangeFilter() {
    try {
      const container = document.getElementById('time-range-filter');
      if (!container) return;

      // Get aggregate volume data for the histogram
      const volumeData = this.getTimeFilterData();
      
      if (!volumeData || !volumeData.dates || !volumeData.dates.length) {
        container.innerHTML = '<div class="empty-state text-xs">No time data</div>';
        return;
      }

      // Create time range filter component
      this.timeRangeFilter = new TimeRangeFilter('time-range-filter', {
        height: 44,
        onChange: (range) => this.onTimeRangeChanged(range)
      });

      // Update with data
      this.timeRangeFilter.update(volumeData);
    } catch (e) {
      console.error('Router: Error initializing time range filter:', e);
      const container = document.getElementById('time-range-filter');
      if (container) {
        container.innerHTML = '<div class="empty-state text-xs">Filter unavailable</div>';
      }
    }
  }

  /**
   * Get aggregated volume data for the time filter histogram
   */
  getTimeFilterData() {
    try {
      // Get volume data aggregated across all missions (for consistent histogram)
      const volumeData = DataService.getAggregateVolumeOverTime('all');
      
      if (!volumeData || !volumeData.dates || !volumeData.dates.length) {
        return null;
      }

      // Ensure series is an array
      const series = Array.isArray(volumeData.series) ? volumeData.series : [];

      // Calculate total volume per date (sum all factions)
      const volumes = volumeData.dates.map((date, i) => {
        return series.reduce((sum, s) => {
          const val = Array.isArray(s) ? (s[i] || 0) : 0;
          return sum + val;
        }, 0);
      });

      return {
        dates: volumeData.dates,
        volumes
      };
    } catch (e) {
      console.error('Router: Error getting time filter data:', e);
      return null;
    }
  }

  /**
   * Initialize clear time filter button
   */
  initClearTimeFilterButton() {
    const clearBtn = document.getElementById('clear-time-filter');
    if (clearBtn) {
      this._addDashboardListener(clearBtn, 'click', () => {
        if (this.timeRangeFilter) {
          this.timeRangeFilter.clearSelection();
        }
        this.filters.timeRange = null;
        this.updateTimeRangeLabel(null);
        this.onFiltersChanged();
      });
    }
  }

  /**
   * Handle time range filter change
   */
  onTimeRangeChanged(range) {
    this.filters.timeRange = range;
    this.updateTimeRangeLabel(range);
    this.onFiltersChanged();
  }

  /**
   * Update the time range label display
   */
  updateTimeRangeLabel(range) {
    const label = document.getElementById('time-range-label');
    if (!label) return;

    if (!range || !range.start || !range.end) {
      label.textContent = 'All Time';
      return;
    }

    label.textContent = `${formatDate(range.start)} - ${formatDate(range.end)}`;
  }

  /**
   * Called when any filter changes - re-render current view
   */
  onFiltersChanged() {
    // Re-render the current view with new filters
    this.handleRoute();
  }

  /**
   * Get current filters
   */
  getFilters() {
    return { ...this.filters };
  }

  /**
   * Parse query parameters from a hash string
   * @param {string} hash - The hash string (without #/)
   * @returns {Object} Query parameters as key-value pairs
   */
  parseQueryParams(hash) {
    const queryIndex = hash.indexOf('?');
    if (queryIndex === -1) return {};
    
    const queryString = hash.slice(queryIndex + 1);
    const params = {};
    
    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
    });
    
    return params;
  }

  /**
   * Parse ID-based route structure
   * 
   * Routes use entity ID prefixes to determine types:
   *   - #/monitor-001/person-003/ (person within monitor scope)
   *   - #/workspace-001/narr-005/ (narrative within workspace scope)
   *   - #/project-parent/project-child/ (nested project view)
   *   - #/project-parent/project-child/doc-123/ (document within nested project)
   *   - #/person-003/ (person in COP scope)
   *   - #/cop/ (COP home)
   *   - #/workspaces (top-level list)
   * 
   * @param {string} hash - The hash path without #/ and query string
   * @returns {Object} Parsed route info
   */
  parseIdBasedRoute(hash) {
    const segments = hash.split('/').filter(s => s);
    
    // Default result structure
    const result = {
      contextId: null,         // ID of context (monitor-001, workspace-001, etc.) - for projects, this is the deepest project
      contextType: null,       // 'monitor' | 'workspace' | 'project' | 'cop'
      projectChain: [],        // For nested projects: array of project IDs from root to deepest
      entityId: null,          // Primary entity ID being viewed
      entityType: null,        // Entity type derived from ID prefix
      entityChain: [],         // Full chain of entity IDs for nested navigation
      subRoute: null,          // 'documents' for documents tab
      isContextHome: false,    // true if viewing context home (no entity)
      isCopHome: false,        // true if viewing COP home
      is404: false,            // true if route is invalid
      topLevelRoute: null      // For non-context routes like 'workspaces', 'search'
    };

    if (segments.length === 0) {
      // Empty hash - default to COP home
      result.isCopHome = true;
      result.contextType = 'cop';
      return result;
    }

    const firstSegment = segments[0];

    // Check for top-level non-context routes
    if (TOP_LEVEL_ROUTES.includes(firstSegment)) {
      if (firstSegment === 'cop') {
        result.contextType = 'cop';
        if (segments.length === 1) {
          result.isCopHome = true;
        } else {
          // COP with entity chain
          this._parseEntityChain(segments.slice(1), result);
        }
      } else {
        result.topLevelRoute = firstSegment;
      }
      return result;
    }

    // Check if first segment is a context ID (monitor-, workspace-, project-)
    if (isContextId(firstSegment)) {
      result.contextType = getEntityTypeFromId(firstSegment);
      
      // For projects, check for nested project chain (multiple consecutive project- IDs)
      if (result.contextType === 'project') {
        const projectChain = [];
        let i = 0;
        
        // Collect consecutive project IDs
        while (i < segments.length && segments[i].startsWith('project-')) {
          projectChain.push(segments[i]);
          i++;
        }
        
        result.projectChain = projectChain;
        result.contextId = projectChain[projectChain.length - 1]; // Deepest project is the context
        
        if (i === segments.length) {
          // Only project IDs in URL - viewing the deepest project's home
          result.isContextHome = true;
        } else {
          // Parse remaining segments as entity chain
          this._parseEntityChain(segments.slice(i), result);
        }
      } else {
        // Non-project context (monitor, workspace)
        result.contextId = firstSegment;
        
        if (segments.length === 1) {
          result.isContextHome = true;
        } else {
          // Parse remaining segments as entity chain
          this._parseEntityChain(segments.slice(1), result);
        }
      }
    } else {
      // No context prefix - treat as COP-scoped
      result.contextType = 'cop';
      // Parse all segments as entity chain
      this._parseEntityChain(segments, result);
    }

    return result;
  }

  /**
   * Helper to parse entity chain from route segments
   * @param {string[]} segments - Array of entity IDs
   * @param {Object} result - Result object to populate
   */
  _parseEntityChain(segments, result) {
    if (segments.length === 0) return;
    
    // Check for /documents sub-route at the end
    const lastSegment = segments[segments.length - 1];
    if (lastSegment === 'documents') {
      result.subRoute = 'documents';
      segments = segments.slice(0, -1);
    }
    
    // Store full entity chain
    result.entityChain = segments.filter(s => s && s !== 'documents');
    
    // Primary entity is the last one in the chain
    if (result.entityChain.length > 0) {
      result.entityId = result.entityChain[result.entityChain.length - 1];
      result.entityType = getEntityTypeFromId(result.entityId);
    }
  }

  /**
   * Resolve context to a scope object with document IDs
   * Now accepts a context ID directly and derives type from prefix
   * @param {string} contextId - Context ID (e.g., 'monitor-001') or null for COP
   * @param {string[]} projectChain - Optional array of project IDs for nested projects
   * @returns {Object} Scope object with type, id, and documentIds
   */
  resolveContextScope(contextId, projectChain = []) {
    if (!contextId) {
      return { 
        type: 'cop', 
        id: null, 
        documentIds: null,
        getName: () => 'Common Operating Picture'
      };
    }
    
    const contextType = getEntityTypeFromId(contextId);
    
    if (contextType === 'workspace') {
      const workspace = DataService.getWorkspace(contextId);
      if (!workspace) {
        console.warn(`Router: Workspace ${contextId} not found`);
        return null;
      }
      return { 
        type: 'workspace', 
        id: contextId, 
        documentIds: workspace.documentIds || [],
        getName: () => workspace.name || 'Workspace'
      };
    }
    
    if (contextType === 'monitor') {
      const monitor = DataService.getMonitor(contextId);
      if (!monitor) {
        console.warn(`Router: Monitor ${contextId} not found`);
        return null;
      }
      // Resolve monitor's search filters to document IDs
      const docs = DataService.getDocumentsForMonitor(contextId);
      return { 
        type: 'monitor', 
        id: contextId, 
        documentIds: docs.map(d => d.id),
        getName: () => monitor.name || 'Monitor'
      };
    }
    
    if (contextType === 'project') {
      const project = DataService.getProject(contextId);
      if (!project) {
        console.warn(`Router: Project ${contextId} not found`);
        return null;
      }
      
      // For nested projects, validate the chain and include ancestry info
      let ancestry = [];
      let isValidChain = true;
      
      if (projectChain.length > 1) {
        // Validate that the project chain forms a valid parent-child hierarchy
        for (let i = 1; i < projectChain.length; i++) {
          const childProject = DataService.getProject(projectChain[i]);
          if (!childProject || childProject.parentProjectId !== projectChain[i - 1]) {
            console.warn(`Router: Invalid project hierarchy in URL - ${projectChain[i]} is not a child of ${projectChain[i - 1]}`);
            isValidChain = false;
            break;
          }
        }
        
        if (isValidChain) {
          // Build ancestry array (all projects except the current one)
          ancestry = projectChain.slice(0, -1).map(id => DataService.getProject(id)).filter(Boolean);
        }
      }
      
      return { 
        type: 'project', 
        id: contextId, 
        documentIds: project.documentIds || [],
        projectChain: projectChain,
        ancestry: ancestry,
        isValidChain: isValidChain,
        getName: () => project.name || 'Project'
      };
    }

    return null;
  }

  /**
   * Build an ID-based route URL
   * @param {string} contextId - Context ID (e.g., 'monitor-001') or null for COP
   * @param {...string} entityIds - Entity IDs to include in the route
   * @returns {string} Full hash URL
   */
  buildIdRoute(contextId, ...entityIds) {
    const parts = [];
    
    if (contextId) {
      parts.push(contextId);
    }
    
    parts.push(...entityIds.filter(Boolean));
    
    if (parts.length === 0) {
      return '#/cop/';
    }
    
    return `#/${parts.join('/')}/`;
  }

  /**
   * Parse current hash and route to appropriate view
   * Uses ID-based routing where types are derived from ID prefixes
   */
  handleRoute() {
    const rawHash = (window.location.hash.slice(2) || '').trim();
    const settings = dataStore.getSettings();

    // No hash or empty path: redirect to dataset's default start page
    if (!rawHash || rawHash === '/') {
      let defaultPage = settings.defaultStartPage || 'monitors';
      if (!settings.copEnabled && defaultPage === 'cop') {
        defaultPage = 'monitors';
      }
      window.location.hash = `#/${defaultPage}`;
      return;
    }

    const fullHash = rawHash;

    // Separate path from query string
    const queryIndex = fullHash.indexOf('?');
    const hash = queryIndex === -1 ? fullHash : fullHash.slice(0, queryIndex);
    const queryParams = this.parseQueryParams(fullHash);
    
    // Parse the route using ID-based parser
    const parsed = this.parseIdBasedRoute(hash);

    // Check for COP disabled with COP-scoped route
    if (parsed.contextType === 'cop' && !parsed.topLevelRoute && !settings.copEnabled) {
      // COP is disabled and route requires COP - show 404 or redirect
      window.location.hash = '#/monitors';
      return;
    }

    // Determine the primary route for nav link highlighting
    this.currentRoute = parsed.topLevelRoute || parsed.contextType || 'cop';
    this.currentContext = this.resolveContextScope(parsed.contextId, parsed.projectChain || []);

    // Destroy current view and clean up sticky header
    try {
      destroyStickyHeader();
    } catch (e) {
      console.error('Router: Error destroying sticky header:', e);
    }
    
    // Clean up COP filters if navigating away from COP
    this.cleanupDashboardFilters();
    
    if (this.currentView && this.currentView.destroy) {
      try {
        this.currentView.destroy();
      } catch (e) {
        console.error('Router: Error destroying previous view:', e);
      }
    }
    this.currentView = null;

    // Update active nav link
    try {
      this.updateNavLinks(this.currentRoute);
    } catch (e) {
      console.error('Router: Error updating nav links:', e);
    }
    
    // Determine tab based on sub-route or query params
    let tab = 'dashboard';
    if (parsed.subRoute === 'documents') {
      tab = 'documents';
    } else if (queryParams.tab) {
      tab = queryParams.tab;
    } else if (settings.defaultViewTab) {
      tab = settings.defaultViewTab;
    }
    
    // Common options with filters and context
    const filterOptions = {
      missionId: this.filters.missionId || 'all',
      timeRange: this.filters.timeRange,
      tab: tab,
      context: this.currentContext // Pass context scope to views
    };

    // Track if this is the COP home for filter initialization
    let isCopHome = false;

    // Route based on parsed structure
    if (parsed.topLevelRoute) {
      // Handle top-level routes (workspaces, monitors, search, etc.)
      this._handleTopLevelRoute(parsed.topLevelRoute, filterOptions, settings);
    } else if (parsed.isCopHome || parsed.isContextHome || parsed.entityId) {
      // Handle ID-based routes
      this._handleIdBasedRoute(parsed, filterOptions, settings);
      isCopHome = parsed.isCopHome;
    } else {
      // No recognized route - redirect to default
      let defaultPage = settings.defaultStartPage || 'monitors';
      if (!settings.copEnabled && defaultPage === 'cop') {
        defaultPage = 'monitors';
      }
      window.location.hash = `#/${defaultPage}`;
      return;
    }

    // Render the view
    if (this.currentView && this.currentView.render) {
      try {
        this.currentView.render();
        
        // Initialize COP filters after render (only for COP home)
        if (isCopHome) {
          this.initDashboardFilters();
        }
      } catch (e) {
        console.error(`Router: Error rendering view:`, e);
        this.showErrorPage('Page Error', `An error occurred while loading this page.`);
        return;
      }
    }

    // Initialize sticky header behavior
    // Force collapsed on Documents tab to maximize space for document viewer
    try {
      const isDocumentsTab = filterOptions.tab === 'documents';
      initStickyHeader({ forceCollapsed: isDocumentsTab });
    } catch (e) {
      console.error('Router: Error initializing sticky header:', e);
    }

    // Scroll to top
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      // Scroll errors are non-critical
    }
  }

  /**
   * Handle top-level routes (not scoped to a context)
   */
  _handleTopLevelRoute(route, filterOptions, settings) {
    // Auto-close chat for workspaces and projects list views
    if (route === 'workspaces' || route === 'projects') {
      window.app?.toggleChat(false);
    }
    
    switch (route) {
      case 'workspaces':
        this.currentView = new WorkspacesView(this.container, filterOptions);
        break;
        
      case 'monitors':
        this.currentView = new MonitorsView(this.container, filterOptions);
        break;
        
      case 'search':
        this.currentView = new SearchView(this.container, filterOptions);
        break;
        
      case 'projects':
        this.currentView = new ProjectsView(this.container, filterOptions);
        break;
        
      case 'activity':
        this.currentView = new ActivityFeedView(this.container, filterOptions);
        break;
        
      case 'documents':
        this.currentView = new DocumentsView(this.container, filterOptions);
        break;
        
      case 'data-model':
        window.location.href = 'data-model.html';
        return;
        
      case 'component-demos':
        window.location.href = 'component-demos.html';
        return;
        
      case 'status':
        // Redirect to COP
        window.location.hash = '#/cop/';
        return;
        
      default:
        // Unknown top-level route - redirect to default
        let defaultPage = settings.defaultStartPage || 'monitors';
        if (!settings.copEnabled && defaultPage === 'cop') {
          defaultPage = 'monitors';
        }
        window.location.hash = `#/${defaultPage}`;
    }
  }

  /**
   * Handle ID-based routes (context homes and entity detail views)
   * Routes are determined by ID prefixes, not explicit type segments
   */
  _handleIdBasedRoute(parsed, filterOptions, settings) {
    const { contextId, contextType, entityId, entityType, isCopHome, isContextHome } = parsed;
    
    // COP home
    if (isCopHome) {
      if (!settings.copEnabled) {
        window.location.hash = '#/monitors';
        return;
      }
      this.currentView = new DashboardView(this.container, filterOptions);
      return;
    }
    
    // Context home (monitor-001, workspace-001, project-001 without further entity)
    if (isContextHome && contextId) {
      const viewConfig = ENTITY_VIEW_MAP[contextType];
      if (viewConfig) {
        this.currentView = new viewConfig.view(this.container, contextId, filterOptions);
        
        // Auto-open chat for individual workspace, project, and monitor views
        if (['workspace', 'project', 'monitor'].includes(contextType)) {
          window.app?.toggleChat(true);
        }
      } else {
        this.showErrorPage('Not Found', `Unknown context type: ${contextType}`);
      }
      return;
    }
    
    // Entity detail view
    if (entityId && entityType) {
      // Documents require a context - redirect context-less document routes to documents view
      if (entityType === 'document' && !contextId) {
        window.location.hash = `#/documents?doc=${entityId}`;
        return;
      }
      
      const viewConfig = ENTITY_VIEW_MAP[entityType];
      
      if (!viewConfig) {
        console.warn(`Router: Unknown entity type '${entityType}' from ID '${entityId}'`);
        this.showErrorPage('Not Found', `Unknown entity type: ${entityType}`);
        return;
      }
      
      this.currentView = new viewConfig.view(this.container, entityId, filterOptions);
    }
  }

  /**
   * Update active state on navigation links
   * Handles both top-level routes and context-scoped routes
   */
  updateNavLinks(route) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkRoute = link.getAttribute('href')?.replace('#/', '') || '';
      
      // Check if this link matches the current route/context
      const matches = 
        linkRoute === route ||
        linkRoute === 'cop' && route === 'cop' ||
        linkRoute === 'cop/' && route === 'cop' ||
        linkRoute === 'monitors' && (route === 'monitors' || route === 'monitor') ||
        linkRoute === 'workspaces' && (route === 'workspaces' || route === 'workspace') ||
        linkRoute === 'projects' && (route === 'projects' || route === 'project');
      
      if (matches) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Navigate programmatically using ID-based routing
   * @param {string} entityId - Entity ID to navigate to
   * @param {Object} context - Optional context object (contains context ID)
   */
  navigate(entityId, context = null) {
    let hash;
    
    if (context && context.id) {
      // Context-scoped navigation
      hash = `#/${context.id}/${entityId}/`;
    } else {
      // COP-scoped navigation
      hash = `#/${entityId}/`;
    }
    
    window.location.hash = hash;
  }

  /**
   * Get current route info (parsed structure)
   * @returns {Object} Parsed route with context, entityType, entityId, etc.
   */
  getCurrentRoute() {
    const fullHash = window.location.hash.slice(2) || 'cop';
    const queryIndex = fullHash.indexOf('?');
    const hash = queryIndex === -1 ? fullHash : fullHash.slice(0, queryIndex);
    const queryParams = this.parseQueryParams(fullHash);
    const parsed = this.parseIdBasedRoute(hash);
    
    return {
      ...parsed,
      queryParams,
      // Legacy compatibility
      route: parsed.topLevelRoute || parsed.contextType || parsed.entityType,
      id: parsed.contextId || parsed.entityId
    };
  }

  /**
   * Get the current context scope (if any)
   * @returns {Object|null} Current context scope with documentIds
   */
  getContext() {
    return this.currentContext || null;
  }

  /**
   * Build a URL with the current route and updated query params
   * @param {Object} params - Query params to set/update
   * @returns {string} The full hash URL
   */
  buildUrl(params = {}) {
    const fullHash = window.location.hash.slice(2) || 'cop';
    const queryIndex = fullHash.indexOf('?');
    const basePath = queryIndex === -1 ? `#/${fullHash}` : `#/${fullHash.slice(0, queryIndex)}`;
    
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    return queryString ? `${basePath}?${queryString}` : basePath;
  }

  /**
   * Refresh the time filter data (e.g., after data import)
   */
  refreshTimeFilter() {
    try {
      if (this.timeRangeFilter && this.timeRangeFilter.updateData) {
        const volumeData = this.getTimeFilterData();
        if (volumeData) {
          this.timeRangeFilter.updateData(volumeData);
        }
      }
    } catch (e) {
      console.error('Router: Error refreshing time filter:', e);
    }
  }
}

export default Router;
