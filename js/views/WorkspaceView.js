/**
 * WorkspaceView.js
 * Detail view for a single workspace using the CardManager pattern
 */

import { DetailViewBase } from './DetailViewBase.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { CardManager, DocumentTableCard } from '../components/CardComponents.js';
import { SearchScopeModal } from '../components/SearchScopeModal.js';

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

    const hasScope = this.hasAnyScope(this.searchScope);

    // Render page
    this.container.innerHTML = `
      <div class="content-area">
        <div class="search-selected-filters ${hasScope ? '' : 'hidden'}" id="workspace-selected-filters">
          ${this.renderSelectedScopeChips(this.searchScope)}
        </div>
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
  }

  /**
   * Set up documents card with Filters button, without Expand data or Type filter
   */
  setupWorkspaceDocumentsCard(workspace, data) {
    this.cardManager = new CardManager(this);

    if (data.documents && data.documents.length > 0) {
      const scopeItemCount = this.hasAnyScope(this.searchScope) ? this.getScopeItemCount(this.searchScope) : 0;
      const filtersButtonHtml = `
        <button class="search-card-pill" id="workspace-filters-toggle">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.0663409,1.6418284c.1482999-.3866299.51956-.64185.93366-.64185h11.9999599c.4140997,0,.7854004.2552201.9336996.64185.1483002.3866301.0430002.8246701-.2648993,1.1016099l-4.5973005,4.1355503v7.1209898c0,.3830996-.2189398.7326002-.5636702.8998003-.3447294.1672001-.7546797.1226997-1.0555401-.1145l-2.1428494-1.6897001c-.24049-.1896-.3808303-.4790001-.3808303-.7853003v-5.4312897L1.3312209,2.7434384c-.30786-.2769399-.413191-.7149799-.2648799-1.1016099ZM6.9285708,6.4334783v5.8768001l2.1428604,1.6897001v-7.5665002L13.9999609,1.9999784H2.000001l4.9285698,4.4334998Z" stroke-width="0"/>
          </svg>
          <span>Filters</span>
          ${scopeItemCount > 0 ? `<span class="filters-badge">${scopeItemCount}</span>` : ''}
        </button>
      `;

      this._docTableCard = new DocumentTableCard(this, 'workspace-documents', {
        title: 'documents',
        documents: data.documents,
        showCount: true,
        fullWidth: true,
        maxItems: 50,
        enableViewerMode: true,
        showExpandData: false,
        showTypeFilter: false,
        extraActions: filtersButtonHtml
      });
      this.cardManager.add(this._docTableCard);
    }
  }

  /**
   * Set up filter button and chip remove handlers
   */
  setupFilterHandlers() {
    const filtersToggle = this.container.querySelector('#workspace-filters-toggle');
    if (filtersToggle) {
      this.addListener(filtersToggle, 'click', () => this.openFiltersModal());
    }
    this.attachChipRemoveHandlers();
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

    const hasScope = this.hasAnyScope(this.searchScope);
    let filtered = data.documents;

    if (hasScope) {
      filtered = filtered.filter(doc => DataService.documentMatchesScope(doc, this.searchScope));
    }

    // Update the document table
    if (this._docTableCard?.component) {
      this._docTableCard.component.update({ documents: filtered });
      const card = document.getElementById('workspace-documents')?.closest('.card');
      if (card) {
        const countEl = card.querySelector('.card-count');
        if (countEl) countEl.textContent = filtered.length;
      }
    }

    this.updateFiltersUI();
    this.updateSelectedFiltersDisplay();
  }

  /**
   * Update the Filters button badge
   */
  updateFiltersUI() {
    const filtersToggle = this.container.querySelector('#workspace-filters-toggle');
    if (!filtersToggle) return;

    const hasScope = this.hasAnyScope(this.searchScope);
    const scopeItemCount = hasScope ? this.getScopeItemCount(this.searchScope) : 0;
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
  }

  /**
   * Update the selected filters chip display
   */
  updateSelectedFiltersDisplay() {
    const displayContainer = this.container.querySelector('#workspace-selected-filters');
    if (!displayContainer) return;

    const hasScope = this.hasAnyScope(this.searchScope);
    displayContainer.classList.toggle('hidden', !hasScope);
    displayContainer.innerHTML = this.renderSelectedScopeChips(this.searchScope);
    this.attachChipRemoveHandlers();
  }

  /**
   * Check if a scope has any selected items
   */
  hasAnyScope(scope) {
    if (!scope) return false;
    return (scope.personIds?.length > 0) ||
           (scope.organizationIds?.length > 0) ||
           (scope.locationIds?.length > 0) ||
           (scope.keywords?.length > 0) ||
           (scope.documentTypes?.length > 0) ||
           (scope.publisherIds?.length > 0) ||
           (scope.authors?.length > 0) ||
           (scope.metadataFilters && Object.values(scope.metadataFilters).some(v => {
             if (Array.isArray(v)) return v.length > 0;
             return (v?.include?.length > 0) || (v?.exclude?.length > 0);
           }));
  }

  /**
   * Get count of items in a scope
   */
  getScopeItemCount(scope) {
    if (!scope) return 0;
    let count = (scope.personIds?.length || 0) +
           (scope.organizationIds?.length || 0) +
           (scope.locationIds?.length || 0) +
           (scope.keywords?.length || 0) +
           (scope.documentTypes?.length || 0) +
           (scope.publisherIds?.length || 0) +
           (scope.authors?.length || 0);
    for (const v of Object.values(scope.metadataFilters || {})) {
      if (Array.isArray(v)) { count += v.length; continue; }
      count += (v?.include?.length || 0) + (v?.exclude?.length || 0);
    }
    return count;
  }

  /**
   * Render selected scope items as removable chips
   */
  renderSelectedScopeChips(scope) {
    if (!scope) return '';
    
    const chips = [];
    
    if (scope.personIds?.length > 0) {
      scope.personIds.forEach(id => {
        const person = DataService.getPerson(id);
        if (person) {
          chips.push({
            type: 'person', id,
            label: person.name,
            tooltip: 'Person',
            icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3 2.5-5 6-5s6 2 6 5"/></svg>`
          });
        }
      });
    }
    
    if (scope.organizationIds?.length > 0) {
      scope.organizationIds.forEach(id => {
        const org = DataService.getOrganization(id);
        if (org) {
          chips.push({
            type: 'organization', id,
            label: org.name,
            tooltip: 'Organization',
            icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="12" height="10" rx="1"/><path d="M5 4V2h6v2M5 8h6M5 11h6"/></svg>`
          });
        }
      });
    }
    
    if (scope.locationIds?.length > 0) {
      scope.locationIds.forEach(id => {
        const location = DataService.getLocation(id);
        if (location) {
          chips.push({
            type: 'location', id,
            label: location.name,
            tooltip: 'Location',
            icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/><circle cx="8" cy="6" r="2"/></svg>`
          });
        }
      });
    }
    
    if (scope.keywords?.length > 0) {
      scope.keywords.forEach(keyword => {
        chips.push({
          type: 'keyword', id: keyword,
          label: keyword,
          tooltip: 'Keyword',
          icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 5h12M2 8h8M2 11h10"/></svg>`
        });
      });
    }
    
    if (scope.documentTypes?.length > 0) {
      const docTypeLabels = {
        'news_article': 'News Article', 'social_post': 'Social Post',
        'internal_report': 'Internal Report', 'intelligence_report': 'Intelligence Report',
        'memo': 'Memo', 'transcript': 'Transcript', 'internal': 'Internal',
        'corporate_record': 'Corporate Record', 'watchlist_match': 'Watchlist Match',
        'political_finance': 'Political Finance', 'event_attendance': 'Event Attendance'
      };
      scope.documentTypes.forEach(docType => {
        chips.push({
          type: 'documentType', id: docType,
          label: docTypeLabels[docType] || docType,
          tooltip: 'Document Type',
          icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M10 2v3h3"/></svg>`
        });
      });
    }
    
    if (scope.publisherIds?.length > 0) {
      scope.publisherIds.forEach(publisherId => {
        const publisher = DataService.getPublisher(publisherId);
        if (publisher) {
          chips.push({
            type: 'publisher', id: publisherId,
            label: publisher.name,
            tooltip: 'Publisher',
            icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M5 6h6M5 9h4"/></svg>`
          });
        }
      });
    }
    
    if (scope.authors?.length > 0) {
      scope.authors.forEach(author => {
        chips.push({
          type: 'author', id: author,
          label: author,
          tooltip: 'Author',
          icon: `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M3 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/></svg>`
        });
      });
    }

    const catalog = DataService.getFilterCatalog();
    for (const [dimId, filterVal] of Object.entries(scope.metadataFilters || {})) {
      const dimension = catalog.find(d => d.id === dimId);
      const dimName = dimension?.name || dimId;
      const include = Array.isArray(filterVal) ? filterVal : (filterVal?.include || []);
      const exclude = Array.isArray(filterVal) ? [] : (filterVal?.exclude || []);
      const filterIcon = `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 2h14l-5 6v5l-4 2V8L1 2z"/></svg>`;
      include.forEach(val => {
        chips.push({ type: 'metadata', id: `${dimId}::${val}`, label: val, tooltip: dimName, icon: filterIcon, mode: 'include' });
      });
      exclude.forEach(val => {
        chips.push({ type: 'metadata', id: `${dimId}::${val}`, label: val, tooltip: `Exclude: ${dimName}`, icon: filterIcon, mode: 'exclude' });
      });
    }
    
    if (chips.length === 0) return '';
    
    return `
      <div class="selected-scope-chips">
        ${chips.map(chip => `
          <span class="scope-chip scope-chip-${chip.type}${chip.mode === 'exclude' ? ' scope-chip-excluded' : ''}" data-type="${chip.type}" data-id="${this.escapeHtml(chip.id)}"${chip.tooltip ? ` data-tooltip="${this.escapeHtml(chip.tooltip)}"` : ''}>
            ${chip.icon}
            <span class="chip-label">${this.escapeHtml(chip.label)}</span>
            <button class="chip-remove" data-type="${chip.type}" data-id="${this.escapeHtml(chip.id)}" title="Remove">
              <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4l8 8M12 4l-8 8"/>
              </svg>
            </button>
          </span>
        `).join('')}
      </div>
    `;
  }

  /**
   * Attach event handlers for chip remove buttons
   */
  attachChipRemoveHandlers() {
    const removeButtons = this.container.querySelectorAll('#workspace-selected-filters .chip-remove');
    removeButtons.forEach(btn => {
      this.addListener(btn, 'click', (e) => {
        e.stopPropagation();
        this.removeFromScope(btn.dataset.type, btn.dataset.id);
      });
    });
  }

  /**
   * Remove an item from the scope and re-apply filters
   */
  removeFromScope(type, id) {
    const scope = this.searchScope;
    switch (type) {
      case 'person':
        scope.personIds = scope.personIds.filter(i => i !== id); break;
      case 'organization':
        scope.organizationIds = scope.organizationIds.filter(i => i !== id); break;
      case 'location':
        scope.locationIds = scope.locationIds.filter(i => i !== id); break;
      case 'keyword':
        scope.keywords = scope.keywords.filter(k => k !== id); break;
      case 'documentType':
        scope.documentTypes = (scope.documentTypes || []).filter(dt => dt !== id); break;
      case 'publisher':
        scope.publisherIds = (scope.publisherIds || []).filter(p => p !== id); break;
      case 'author':
        scope.authors = (scope.authors || []).filter(a => a !== id); break;
      case 'metadata': {
        const sep = id.indexOf('::');
        if (sep > 0) {
          const dimId = id.substring(0, sep);
          const val = id.substring(sep + 2);
          const entry = scope.metadataFilters?.[dimId];
          if (entry) {
            if (Array.isArray(entry)) {
              scope.metadataFilters[dimId] = entry.filter(v => v !== val);
              if (scope.metadataFilters[dimId].length === 0) delete scope.metadataFilters[dimId];
            } else {
              entry.include = (entry.include || []).filter(v => v !== val);
              entry.exclude = (entry.exclude || []).filter(v => v !== val);
              if (entry.include.length === 0 && entry.exclude.length === 0) delete scope.metadataFilters[dimId];
            }
          }
        }
        break;
      }
    }
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
