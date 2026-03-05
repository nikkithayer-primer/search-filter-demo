/**
 * WorkspaceView.js
 * Detail view for a single workspace using the CardManager pattern
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { CardManager, DocumentTableCard } from '../components/CardComponents.js';
import { SearchScopeModal } from '../components/SearchScopeModal.js';
import { hasAnyScope, getScopeItemCount, removeFromScope } from '../utils/scopeUtils.js';
import { renderScopeChips, attachScopeChipHandlers } from '../components/ScopeChips.js';

export class WorkspaceView extends DetailViewBase {
  constructor(container, workspaceId, options = {}) {
    super(container, options);
    this.workspaceId = workspaceId;
    this.cardManager = new CardManager(this);
    this.filterModal = new SearchScopeModal();
    this.searchScope = { personIds: [], organizationIds: [], locationIds: [], keywords: [], documentTypes: [], metadataFilters: {} };
    this.selectedRepositories = new Set();
    this.selectedClassifications = new Set();
    this.timeRange = null;
    this._docTableCard = null;
    this.filtersChipsVisible = false;
  }

  async render() {
    const workspace = DataService.getWorkspace(this.workspaceId);
    if (!workspace) {
      this.renderNotFound('Workspace');
      return;
    }

    // Restore filters from workspace if present
    if (workspace.filters?.scope) {
      this.searchScope = { ...this.searchScope, ...workspace.filters.scope };
    }
    if (workspace.filters?.repositoryIds) {
      this.selectedRepositories = new Set(workspace.filters.repositoryIds);
    }
    if (workspace.filters?.classifications) {
      this.selectedClassifications = new Set(workspace.filters.classifications);
    }
    if (workspace.filters?.timeRange) {
      this.timeRange = workspace.filters.timeRange;
    }

    // Fetch all data upfront
    const data = this.fetchWorkspaceData(workspace);
    
    // Store data for card setup
    this._workspaceData = { workspace, data };
    
    // Set up documents card with Filters button, no Expand data or Type filter
    this.setupWorkspaceDocumentsCard(workspace, data);

    const actionsHtml = `
      <button class="btn btn-ghost">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3v10M3 8h10"/></svg>
        New Workspace
      </button>
      <button class="btn btn-ghost">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" stroke-width="0"><path d="M12,9.5c-.7985229,0-1.5095825.3743896-1.9672852.9572144l-3.6176147-1.8087769c.0553589-.2067871.0848999-.4241943.0848999-.6484375,0-.2243042-.029541-.4417725-.0849609-.6486206l3.6175537-1.8087769c.4575806.5829468,1.1688232.9573975,1.9674072.9573975,1.3806763,0,2.5-1.1192627,2.5-2.5s-1.1193237-2.5-2.5-2.5-2.5,1.1192627-2.5,2.5c0,.2242432.029541.4416504.0848999.6484375l-3.6175537,1.8087769c-.4577026-.5828247-1.1688232-.9572144-1.9673462-.9572144-1.3807373,0-2.5,1.1192627-2.5,2.5s1.1192627,2.5,2.5,2.5c.798584,0,1.5097656-.3745117,1.9674683-.9573975l3.6174927,1.8087769c-.0554199.2068481-.0849609.4243164-.0849609.6486206,0,1.3806763,1.1193237,2.5,2.5,2.5s2.5-1.1193237,2.5-2.5-1.1193237-2.5-2.5-2.5ZM12,2.5c.8284302,0,1.5.6715698,1.5,1.5s-.6715698,1.5-1.5,1.5c-.8283691,0-1.5-.6715698-1.5-1.5s.6716309-1.5,1.5-1.5ZM4,9.5c-.8284302,0-1.5-.6715698-1.5-1.5s.6715698-1.5,1.5-1.5,1.5.6715698,1.5,1.5-.6715698,1.5-1.5,1.5ZM12,13.5c-.8283691,0-1.5-.6716309-1.5-1.5,0-.8284302.6716309-1.5,1.5-1.5.8284302,0,1.5.6715698,1.5,1.5,0,.8283691-.6715698,1.5-1.5,1.5Z"/></svg>
        Open Investigation
      </button>
      <button class="btn btn-ghost">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" stroke-width="0"><path d="M3.4500008,5c0-.3000002.2-.5.5-.5h8c.3000002,0,.5.1999998.5.5s-.1999998.5-.5.5H3.9500008c-.3,0-.5-.1999998-.5-.5ZM3.9500008,7.5c-.3,0-.5.1999998-.5.5s.2.5.5.5h8c.3000002,0,.5-.1999998.5-.5s-.1999998-.5-.5-.5H3.9500008ZM15.9500008,3.5c0-1.4000001-1.1000004-2.5-2.5-2.5H2.4500008C1.0500008,1-.0499992,2.0999999-.0499992,3.5v6c0,1.3999996,1.1,2.5,2.5,2.5h6v2.5c0,.1999998.1000004.3999996.3000002.5.1999998,0,.3999996,0,.5999994-.1000004l2.8999996-2.8999996h1.3000002c1.3999996,0,2.499999-1.1000004,2.499999-2.5V3.5h-.0999985ZM13.4500008,2c.8000002,0,1.5.7,1.5,1.5v6c0,.8000002-.6999998,1.5-1.5,1.5h-1.5c-.1000004,0-.3000002.1000004-.3999996.1000004l-2.1000004,2.1000004v-1.8000002c0-.2000008-.1999998-.4000006-.5-.4000006H2.4500008c-.8,0-1.5-.6999998-1.5-1.5V3.5c0-.8.7-1.5,1.5-1.5h11Z"/></svg>
        Comment
      </button>
      <button class="btn btn-ghost btn-icon" title="More options">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>
      </button>
    `;

    const headerHtml = PageHeader.render({
      title: workspace.name,
      actions: actionsHtml
    });

    // Render header into full-width slot above chat
    const headerSlot = document.getElementById('page-header-slot');
    if (headerSlot) headerSlot.innerHTML = headerHtml;

    // Render page
    this.container.innerHTML = `
      <div class="content-area">
        ${this.getWorkspaceToolbarHtml()}
        <div class="workspace-filters-bar" id="workspace-filters-bar">
          <div class="search-selected-filters hidden" id="workspace-selected-filters"></div>
        </div>
        <nav class="workspace-tabs" role="tablist">
          <button class="workspace-tab active" data-tab="documents" role="tab" aria-selected="true">Documents</button>
          <button class="workspace-tab" data-tab="narratives" role="tab" aria-selected="false">Narratives</button>
          <button class="workspace-tab" data-tab="topics" role="tab" aria-selected="false">+ Topics</button>
          <button class="workspace-tab" data-tab="events" role="tab" aria-selected="false">+ Events</button>
          <button class="workspace-tab" data-tab="people-orgs" role="tab" aria-selected="false">+ People &amp; Organizations</button>
          <button class="workspace-tab" data-tab="map" role="tab" aria-selected="false">+ Map</button>
        </nav>
        <div class="content-grid">
          ${this.cardManager.getHtml()}
        </div>
      </div>
    `;

    // Initialize card width toggles
    this.initCardWidthToggles('workspace', this.workspaceId);

    // Initialize all card components
    const components = this.cardManager.initializeAll();
    Object.assign(this.components, components);

    // Set up filter button handler
    this.setupFilterHandlers();

    // Sync initial scope to the chat sidebar so both badges match
    window.app?.syncScopeFromCurrentView(this.searchScope);
  }

  /**
   * Set up documents card with Filters button, without Expand data or Type filter
   */
  setupWorkspaceDocumentsCard(workspace, data) {
    this.cardManager = new CardManager(this);

    if (data.documents && data.documents.length > 0) {
      this._docCount = data.documents.length;

      this._docTableCard = new DocumentTableCard(this, 'workspace-documents', {
        title: '',
        documents: data.documents,
        showCount: false,
        fullWidth: true,
        maxItems: 50,
        enableViewerMode: true,
        showExpandData: false,
        showTypeFilter: false
      });
      this.cardManager.add(this._docTableCard);
    }
  }

  getWorkspaceToolbarHtml() {
    const docCount = this._docCount || 0;
    const scopeItemCount = hasAnyScope(this.searchScope) ? getScopeItemCount(this.searchScope) : 0;
    return `
      <div class="workspace-toolbar">
        <button class="search-card-pill" id="workspace-filters-toggle">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.0663409,1.6418284c.1482999-.3866299.51956-.64185.93366-.64185h11.9999599c.4140997,0,.7854004.2552201.9336996.64185.1483002.3866301.0430002.8246701-.2648993,1.1016099l-4.5973005,4.1355503v7.1209898c0,.3830996-.2189398.7326002-.5636702.8998003-.3447294.1672001-.7546797.1226997-1.0555401-.1145l-2.1428494-1.6897001c-.24049-.1896-.3808303-.4790001-.3808303-.7853003v-5.4312897L1.3312209,2.7434384c-.30786-.2769399-.413191-.7149799-.2648799-1.1016099ZM6.9285708,6.4334783v5.8768001l2.1428604,1.6897001v-7.5665002L13.9999609,1.9999784H2.000001l4.9285698,4.4334998Z" stroke-width="0"/>
          </svg>
          <span>Filters</span>
          ${scopeItemCount > 0 ? `<span class="filters-badge">${scopeItemCount}</span>` : ''}
        </button>
        <span class="workspace-doc-count">${docCount} documents</span>
        <button class="btn btn-ghost btn-small filters-show-toggle ${scopeItemCount > 0 ? '' : 'hidden'}" id="workspace-filters-show-toggle">
          <span>Show Filters</span>
        </button>
      </div>
    `;
  }

  /**
   * Set up filter button and chip remove handlers
   */
  setupFilterHandlers() {
    const filtersToggle = this.container.querySelector('#workspace-filters-toggle');
    if (filtersToggle) {
      this.addListener(filtersToggle, 'click', () => this.openFiltersModal());
    }

    const showToggle = this.container.querySelector('#workspace-filters-show-toggle');
    if (showToggle) {
      this.addListener(showToggle, 'click', () => this.toggleFiltersChips());
    }

    const chipsContainer = this.container.querySelector('#workspace-selected-filters');
    if (chipsContainer) {
      chipsContainer.innerHTML = renderScopeChips(this.searchScope);
    }

    attachScopeChipHandlers(this.container, '#workspace-selected-filters', (type, id) => this.removeFromScope(type, id), (el, evt, fn) => this.addListener(el, evt, fn));
  }

  toggleFiltersChips() {
    this.filtersChipsVisible = !this.filtersChipsVisible;
    this.updateSelectedFiltersDisplay();
    this.updateShowToggleButton();
  }

  updateShowToggleButton() {
    const btn = this.container.querySelector('#workspace-filters-show-toggle');
    if (!btn) return;

    const hasScope = hasAnyScope(this.searchScope);
    btn.classList.toggle('hidden', !hasScope);
    btn.classList.toggle('active', this.filtersChipsVisible);

    const label = btn.querySelector('span');
    if (label) label.textContent = this.filtersChipsVisible ? 'Hide Filters' : 'Show Filters';
  }

  /**
   * Open the filters modal with current scope
   */
  openFiltersModal() {
    const docIds = this._workspaceData?.workspace?.documentIds || null;
    this.filterModal.open({
      scope: { ...this.searchScope },
      contextDocIds: docIds,
      onApply: (scope) => {
        this.searchScope = scope || this.searchScope;
        this.applyFilters();
      }
    });
  }

  /**
   * Apply current filters to the document table
   */
  applyFilters() {
    const data = this._workspaceData?.data;
    if (!data?.documents) return;

    const hasScope = hasAnyScope(this.searchScope);
    let filtered = data.documents;

    if (hasScope) {
      filtered = filtered.filter(doc => DataService.documentMatchesScope(doc, this.searchScope));
    }

    // Update the document table
    if (this._docTableCard?.component) {
      this._docTableCard.component.update({ documents: filtered });
    }

    const docCountEl = this.container.querySelector('.workspace-doc-count');
    if (docCountEl) docCountEl.textContent = `${filtered.length} documents`;

    this.updateFiltersUI();
    this.updateSelectedFiltersDisplay();

    // Sync filters back to the chat sidebar
    window.app?.syncScopeFromCurrentView(this.searchScope);
  }

  /**
   * Update the Filters button badge
   */
  updateFiltersUI() {
    const filtersToggle = this.container.querySelector('#workspace-filters-toggle');
    if (!filtersToggle) return;

    const hasScope = hasAnyScope(this.searchScope);
    const scopeItemCount = hasScope ? getScopeItemCount(this.searchScope) : 0;
    let badge = filtersToggle.querySelector('.filters-badge');

    if (scopeItemCount > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'filters-badge';
        filtersToggle.appendChild(badge);
      }
      badge.textContent = scopeItemCount;
    } else if (badge) {
      badge.remove();
    }

    if (!hasScope) this.filtersChipsVisible = false;
    this.updateShowToggleButton();
  }

  /**
   * Update the selected filters chip display
   */
  updateSelectedFiltersDisplay() {
    const displayContainer = this.container.querySelector('#workspace-selected-filters');
    if (!displayContainer) return;

    const hasScope = hasAnyScope(this.searchScope);
    const visible = hasScope && this.filtersChipsVisible;
    displayContainer.classList.toggle('hidden', !visible);
    displayContainer.innerHTML = renderScopeChips(this.searchScope);
    attachScopeChipHandlers(this.container, '#workspace-selected-filters', (type, id) => this.removeFromScope(type, id), (el, evt, fn) => this.addListener(el, evt, fn));

    const clearBtn = displayContainer.querySelector('.scope-clear-all-inline');
    if (clearBtn) {
      this.addListener(clearBtn, 'click', () => {
        this.searchScope = { personIds: [], organizationIds: [], locationIds: [], keywords: [], documentTypes: [], metadataFilters: {} };
        this.applyFilters();
      });
    }
  }

  /**
   * Remove an item from the scope and re-apply filters
   */
  removeFromScope(type, id) {
    removeFromScope(this.searchScope, type, id);
    this.applyFilters();
  }

  /**
   * Fetch all data for the workspace
   */
  fetchWorkspaceData(workspace) {
    // Get all documents in the workspace
    const documents = (workspace.documentIds || [])
      .map(id => DataService.getDocument(id))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    // Aggregate all entity IDs from documents
    const personIds = new Set();
    const organizationIds = new Set();
    const narrativeIds = new Set();
    const themeIds = new Set();
    const locationIds = new Set();
    const eventIds = new Set();
    const topicIds = new Set();

    documents.forEach(doc => {
      (doc.personIds || []).forEach(id => personIds.add(id));
      (doc.organizationIds || []).forEach(id => organizationIds.add(id));
      (doc.narrativeIds || []).forEach(id => narrativeIds.add(id));
      (doc.themeIds || []).forEach(id => themeIds.add(id));
      (doc.locationIds || []).forEach(id => locationIds.add(id));
      (doc.eventIds || []).forEach(id => eventIds.add(id));
      (doc.topicIds || []).forEach(id => topicIds.add(id));
    });

    // Resolve entities from IDs
    const persons = [...personIds].map(id => DataService.getPerson(id)).filter(Boolean);
    const organizations = [...organizationIds].map(id => DataService.getOrganization(id)).filter(Boolean);
    const narratives = [...narrativeIds].map(id => DataService.getNarrative(id)).filter(Boolean);
    const themes = [...themeIds].map(id => DataService.getTheme(id)).filter(Boolean);
    const locations = [...locationIds].map(id => DataService.getLocation(id)).filter(Boolean);
    const events = [...eventIds].map(id => DataService.getEvent(id)).filter(Boolean);
    const topics = [...topicIds].map(id => DataService.getTopic(id)).filter(Boolean);

    // Build network graph data
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    // Get volume data for timeline (scoped to workspace documents)
    const scopeDocIds = workspace.documentIds || null;
    const volumeResult = DataService.getVolumeDataForDocuments(scopeDocIds);
    const publisherData = volumeResult.byPublisher;
    
    // Get narrative durations for duration view toggle (scoped to workspace documents)
    const narrativeDurations = DataService.getNarrativeDurations(null, null, null, scopeDocIds);

    // Combine persons and orgs as entities for stat cards
    const entities = [...persons, ...organizations];

    // Get activity (comments and highlights) for this workspace's documents
    const activityDocIds = new Set(documents.map(d => d.id));
    const allActivity = DataService.getAllActivity();
    const activity = allActivity.filter(item => activityDocIds.has(item.documentId));

    return {
      documents,
      persons, organizations,
      narratives, themes, topics,
      locations, events,
      personIds: [...personIds],
      orgIds: [...organizationIds],
      hasNetwork,
      publisherData,
      narrativeDurations,
      entities, activity
    };
  }

  destroy() {
    if (this.filterModal) {
      this.filterModal.close();
    }
    super.destroy();
  }
}

export default WorkspaceView;
