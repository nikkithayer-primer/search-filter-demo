/**
 * DocumentTable.js
 * Flexible table view for documents with customizable columns
 * Supports related entities: narratives, events, locations, persons, organizations, factions, topics
 * Supports classification and document type display
 * Supports viewer mode: clicking title shows document content in split view
 */

import { BaseComponent } from './BaseComponent.js';
import { DataService } from '../data/DataService.js';
import { renderClassificationBadge } from './ClassificationBanner.js';
import { DocumentContentRenderer } from './DocumentContentRenderer.js';
import { NarrativeList } from './NarrativeList.js';
import { ThemeList } from './ThemeList.js';
import { MapView } from './MapView.js';
import { NetworkGraph } from './NetworkGraph.js';
import { CardBuilder } from '../utils/CardBuilder.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';
import { 
  CLASSIFICATION_LEVELS, 
  DOCUMENT_TYPES,
  DOCUMENT_TYPE_INFO,
  PLACEHOLDERS,
  getDocumentTypeInfo,
  isSocialMedia
} from '../utils/classification.js';
import { dataStore } from '../data/DataStore.js';
import { getAddToProjectModal } from './AddToProjectModal.js';
import { AddToProjectSplitButton, showAddToProjectToast } from './AddToProjectSplitButton.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import { 
  STORAGE_KEY_READ_DOCUMENTS,
  TOAST_DISPLAY_DURATION,
  TOAST_FADE_DURATION 
} from '../utils/constants.js';

// Column configuration
const COLUMN_CONFIG = {
  classification: {
    label: 'Class',
    width: '45px',
    minWidth: '40px',
    sortable: true,
    getValue: (doc) => {
      const level = CLASSIFICATION_LEVELS[doc.classification || 'U'];
      return level ? level.order : 0;
    }
  },
  documentType: {
    label: 'Type',
    width: '100px',
    minWidth: '80px',
    sortable: true,
    getValue: (doc) => doc.documentType || 'news_article'
  },
  publisherName: {
    label: 'Publisher',
    width: '130px',
    minWidth: '100px',
    sortable: true,
    getValue: (doc, self) => self.getPublisherName(self.getDocPublisherId(doc)).toLowerCase()
  },
  publisherType: {
    label: 'Type',
    width: '80px',
    minWidth: '70px',
    sortable: true,
    getValue: (doc, self) => self.getPublisherType(self.getDocPublisherId(doc))
  },
  title: {
    label: 'Title',
    width: 'auto',
    minWidth: '200px',
    sortable: true,
    getValue: (doc) => (doc.title || '').toLowerCase()
  },
  excerpt: {
    label: 'Excerpt',
    width: '400px',
    minWidth: '280px',
    sortable: false,
    getValue: () => ''
  },
  publishedDate: {
    label: 'Published',
    width: '120px',
    minWidth: '110px',
    sortable: true,
    getValue: (doc) => {
      const dateValue = doc.publishedDate;
      return dateValue ? new Date(dateValue).getTime() : 0;
    }
  },
  narratives: {
    label: 'Narratives',
    width: '180px',
    minWidth: '140px',
    sortable: true,
    idField: 'narrativeIds',
    getValue: (doc) => (doc.narrativeIds || []).length,
    getEntities: (doc) => (doc.narrativeIds || []).map(id => DataService.getNarrative(id)).filter(Boolean),
    route: 'narrative',
    displayField: 'text'
  },
  themes: {
    label: 'Themes',
    width: '180px',
    minWidth: '140px',
    sortable: true,
    idField: 'themeIds',
    getValue: (doc) => (doc.themeIds || []).length,
    getEntities: (doc) => (doc.themeIds || []).map(id => DataService.getTheme(id)).filter(Boolean),
    route: 'theme',
    displayField: 'text'
  },
  events: {
    label: 'Events',
    width: '180px',
    minWidth: '140px',
    sortable: true,
    idField: 'eventIds',
    getValue: (doc) => (doc.eventIds || []).length,
    getEntities: (doc) => (doc.eventIds || []).map(id => DataService.getEvent(id)).filter(Boolean),
    route: 'event',
    displayField: 'text'
  },
  locations: {
    label: 'Locations',
    width: '160px',
    minWidth: '120px',
    sortable: true,
    idField: 'locationIds',
    getValue: (doc) => (doc.locationIds || []).length,
    getEntities: (doc) => (doc.locationIds || []).map(id => DataService.getLocation(id)).filter(Boolean),
    route: 'location',
    displayField: 'name'
  },
  persons: {
    label: 'People',
    width: '160px',
    minWidth: '120px',
    sortable: true,
    idField: 'personIds',
    getValue: (doc) => (doc.personIds || []).length,
    getEntities: (doc) => (doc.personIds || []).map(id => DataService.getPerson(id)).filter(Boolean),
    route: 'person',
    displayField: 'name'
  },
  organizations: {
    label: 'Organizations',
    width: '160px',
    minWidth: '120px',
    sortable: true,
    idField: 'organizationIds',
    getValue: (doc) => (doc.organizationIds || []).length,
    getEntities: (doc) => (doc.organizationIds || []).map(id => DataService.getOrganization(id)).filter(Boolean),
    route: 'organization',
    displayField: 'name'
  },
  factions: {
    label: 'Factions',
    width: '160px',
    minWidth: '120px',
    sortable: true,
    idField: 'factionIds',
    getValue: (doc) => (doc.factionIds || []).length,
    getEntities: (doc) => (doc.factionIds || []).map(id => DataService.getFaction(id)).filter(Boolean),
    route: 'faction',
    displayField: 'name'
  },
  topics: {
    label: 'Topics',
    width: '180px',
    minWidth: '140px',
    sortable: true,
    idField: 'topicIds',
    getValue: (doc) => (doc.topicIds || []).length,
    getEntities: (doc) => {
      // Topics store documentIds, so we need reverse lookup
      const topics = DataService.getTopics() || [];
      return topics.filter(t => (t.documentIds || []).includes(doc.id));
    },
    route: 'topic',
    displayField: 'headline'
  }
};

// Storage key for read documents (imported from constants)
const READ_DOCS_STORAGE_KEY = STORAGE_KEY_READ_DOCUMENTS;

export class DocumentTable extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      maxItems: 50,
      // Define which columns to show (in order)
      columns: ['publisherName', 'publisherType', 'title', 'excerpt', 'publishedDate', 'narratives'],
      sortable: true,
      defaultSort: 'publishedDate',
      defaultSortDir: 'desc',
      // Max items to show per entity cell before "+X more"
      maxEntitiesPerCell: 2,
      // Truncate length for entity display text
      truncateLength: 40,
      // Click handler for entity links
      onEntityClick: null,
      // Enable viewer mode (click title to view document content)
      enableViewerMode: true,
      // Show read/unread indicator
      showReadIndicator: true,
      // Context for scoped routing (from view)
      context: null,
      // Enable document selection (checkboxes)
      enableSelection: false,
      // Callback when selection changes
      onSelectionChange: null,
      ...options
    });
    
    this.sortColumn = this.options.defaultSort;
    this.sortDirection = this.options.defaultSortDir;
    
    // Viewer mode state
    this.viewerMode = false;
    this.selectedDocument = null;
    this.contentRenderer = null;
    this.detailsPanelOpen = false; // Sliding details panel state
    this._keydownHandler = null;
    
    // Selection state
    this.selectedDocIds = new Set();
  }

  /**
   * Build a context-aware route for an entity
   * @param {string} entityType - Entity type
   * @param {string} entityId - Entity ID
   * @returns {string} Hash route
   */
  /**
   * Build an ID-based route for an entity
   * @param {string} entityId - Entity ID (type is inferred from prefix)
   * @returns {string} Hash route
   */
  buildRoute(entityId) {
    const ctx = this.options.context;
    if (ctx && ctx.id) {
      return `#/${ctx.id}/${entityId}/`;
    }
    return `#/${entityId}/`;
  }

  /**
   * Navigate to an entity using ID-based routing
   * @param {string} entityId - Entity ID
   */
  navigateTo(entityId) {
    window.location.hash = this.buildRoute(entityId);
  }

  /**
   * Check if classification markings should be shown
   * @returns {boolean}
   */
  shouldShowClassification() {
    const settings = dataStore.getSettings();
    return settings.showClassification;
  }

  /**
   * Check if a document has been read
   * @param {string} docId - Document ID
   * @returns {boolean}
   */
  static isDocumentRead(docId) {
    try {
      const readDocs = JSON.parse(localStorage.getItem(READ_DOCS_STORAGE_KEY) || '[]');
      return readDocs.includes(docId);
    } catch (e) {
      return false;
    }
  }

  /**
   * Mark a document as read
   * @param {string} docId - Document ID
   */
  static markDocumentAsRead(docId) {
    try {
      const readDocs = JSON.parse(localStorage.getItem(READ_DOCS_STORAGE_KEY) || '[]');
      if (!readDocs.includes(docId)) {
        readDocs.push(docId);
        localStorage.setItem(READ_DOCS_STORAGE_KEY, JSON.stringify(readDocs));
      }
    } catch (e) {
      console.warn('Could not save read state to localStorage:', e);
    }
  }

  /**
   * Mark a document as unread
   * @param {string} docId - Document ID
   */
  static markDocumentAsUnread(docId) {
    try {
      const readDocs = JSON.parse(localStorage.getItem(READ_DOCS_STORAGE_KEY) || '[]');
      const index = readDocs.indexOf(docId);
      if (index > -1) {
        readDocs.splice(index, 1);
        localStorage.setItem(READ_DOCS_STORAGE_KEY, JSON.stringify(readDocs));
      }
    } catch (e) {
      console.warn('Could not save read state to localStorage:', e);
    }
  }

  /**
   * Get the unread indicator HTML
   * @param {string} docId - Document ID
   * @returns {string} HTML string for unread indicator or empty string
   */
  getUnreadIndicator(docId) {
    if (!this.options.showReadIndicator) return '';
    if (DocumentTable.isDocumentRead(docId)) return '';
    return '<span class="doc-unread-indicator" title="Unread"></span>';
  }

  formatDate(dateString) {
    if (!dateString) return { date: '', time: '' };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      })
    };
  }

  /**
   * Get the publisher ID from a document
   * @param {Object} doc - The document object
   * @returns {string|null} The publisher ID
   */
  getDocPublisherId(doc) {
    return doc?.publisherId || null;
  }

  getPublisherName(publisherId) {
    if (!publisherId) return '';
    const publisher = DataService.getPublisher(publisherId);
    return publisher ? publisher.name : '';
  }

  getPublisherColor(publisherId) {
    if (!publisherId) return null;
    const publisher = DataService.getPublisher(publisherId);
    return publisher ? publisher.color : null;
  }

  getPublisherType(publisherId) {
    if (!publisherId) return '';
    const publisher = DataService.getPublisher(publisherId);
    return publisher ? publisher.type : '';
  }

  getPublisherTypeLabel(type) {
    const labels = {
      'social': 'Social',
      'national_news': 'National',
      'international_news': 'Int\'l',
      'internal': 'Internal'
    };
    return labels[type] || type;
  }

  sortDocuments(documents) {
    const sorted = [...documents];
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    const config = COLUMN_CONFIG[this.sortColumn];

    if (!config) return sorted;

    sorted.sort((a, b) => {
      const valA = config.getValue(a, this);
      const valB = config.getValue(b, this);

      if (typeof valA === 'string') {
        return dir * valA.localeCompare(valB);
      }
      return dir * (valA - valB);
    });

    return sorted;
  }

  toggleSort(column) {
    const config = COLUMN_CONFIG[column];
    if (!config || !config.sortable) return;

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      // Default to desc for dates and counts, asc for text
      this.sortDirection = (column === 'publishedDate' || config.idField) ? 'desc' : 'asc';
    }
    this.render();
  }

  getSortIcon(column) {
    const config = COLUMN_CONFIG[column];
    if (!config || !config.sortable) return '';

    if (this.sortColumn !== column) {
      return `<svg class="sort-icon sort-icon-inactive" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
        <path d="M8 4l4 4H4l4-4zM8 12l-4-4h8l-4 4z"/>
      </svg>`;
    }
    
    if (this.sortDirection === 'asc') {
      return `<svg class="sort-icon sort-icon-active" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
        <path d="M8 4l4 4H4l4-4z"/>
      </svg>`;
    }
    
    return `<svg class="sort-icon sort-icon-active" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
      <path d="M8 12l-4-4h8l-4 4z"/>
    </svg>`;
  }

  truncateText(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '…';
  }

  renderHeaderCell(column) {
    const config = COLUMN_CONFIG[column];
    if (!config) return '';

    const sortable = this.options.sortable && config.sortable;
    return `
      <th class="doc-col-${column} ${sortable ? 'sortable' : ''}" data-column="${column}">
        <span class="th-content">
          ${config.label}
          ${sortable ? this.getSortIcon(column) : ''}
        </span>
      </th>
    `;
  }

  renderPublisherNameCell(doc) {
    const publisherName = this.getPublisherName(this.getDocPublisherId(doc));

    return `
      <td class="doc-col-publisherName">
        <span class="doc-publisher-name">${publisherName}</span>
      </td>
    `;
  }

  renderPublisherTypeCell(doc) {
    const publisherType = this.getPublisherType(this.getDocPublisherId(doc));
    const label = this.getPublisherTypeLabel(publisherType);

    return `
      <td class="doc-col-publisherType">
        <span class="doc-publisher-type-badge doc-publisher-type-${publisherType.replace('_', '-')}">${label}</span>
      </td>
    `;
  }

  renderTitleCell(doc) {
    // For social posts, show username if no title
    let displayTitle = doc.title;
    if (isSocialMedia(doc.documentType) && !doc.title && doc.author) {
      const username = doc.author.username || doc.author.displayName || 'Unknown';
      const contentPreview = doc.content 
        ? doc.content.substring(0, 60) + (doc.content.length > 60 ? '...' : '')
        : '';
      displayTitle = `${username}: "${contentPreview}"`;
    }
    displayTitle = displayTitle || 'Untitled';
    
    // Get unread indicator
    const unreadIndicator = this.getUnreadIndicator(doc.id);

    // When viewer mode is enabled, make title clickable to open viewer
    if (this.options.enableViewerMode) {
      return `
        <td class="doc-col-title">
          ${unreadIndicator}
          <button class="doc-title-btn" data-doc-id="${doc.id}">
            ${displayTitle}
          </button>
        </td>
      `;
    }

    // Internal documents may not have URLs
    if (!doc.url) {
      return `
        <td class="doc-col-title">
          ${unreadIndicator}
          <span class="doc-title-internal">${displayTitle}</span>
        </td>
      `;
    }

    return `
      <td class="doc-col-title">
        ${unreadIndicator}
        <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="doc-title-link">
          ${displayTitle}
          <svg class="doc-external-icon" viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2h8v8M14 2L6 10"/>
          </svg>
        </a>
      </td>
    `;
  }

  renderExcerptCell(doc) {
    const excerptValue = doc.excerpt || doc.summary;
    return `
      <td class="doc-col-excerpt">
        ${excerptValue ? `<span class="doc-excerpt-text">${this.truncateText(excerptValue, 150)}</span>` : '<span class="doc-empty-cell">—</span>'}
      </td>
    `;
  }

  renderClassificationCell(doc) {
    const settings = dataStore.getSettings();
    if (!settings.showClassification) {
      return '<td class="doc-col-classification"></td>';
    }
    const classification = doc.classification || 'U';
    return `
      <td class="doc-col-classification">
        ${renderClassificationBadge(classification)}
      </td>
    `;
  }

  renderDocumentTypeCell(doc) {
    const docType = doc.documentType || 'news_article';
    const typeInfo = getDocumentTypeInfo(docType);
    return `
      <td class="doc-col-documentType">${typeInfo.label}</td>
    `;
  }

  renderDateCell(doc) {
    const dateValue = doc.publishedDate;
    const formatted = this.formatDate(dateValue);
    return `
      <td class="doc-col-publishedDate">
        <span class="doc-date">${formatted.date}</span>
        <span class="doc-time">${formatted.time}</span>
      </td>
    `;
  }

  renderEntityCell(doc, column) {
    const config = COLUMN_CONFIG[column];
    if (!config || !config.getEntities) return '<td>—</td>';

    const entities = config.getEntities(doc);
    const maxItems = this.options.maxEntitiesPerCell;
    const truncateLen = this.options.truncateLength;

    if (entities.length === 0) {
      return `<td class="doc-col-${column}"><span class="doc-empty-cell">—</span></td>`;
    }

    const displayEntities = entities.slice(0, maxItems);
    const remaining = entities.length - maxItems;

    const links = displayEntities.map(entity => {
      const displayText = entity[config.displayField] || entity.name || entity.text || entity.id;
      return `
        <a href="#/${config.route}/${entity.id}" 
           class="doc-entity-link" 
           data-entity-type="${column}" 
           data-entity-id="${entity.id}" 
           title="${displayText}">
          ${this.truncateText(displayText, truncateLen)}
        </a>
      `;
    }).join('');

    return `
      <td class="doc-col-${column}">
        <div class="doc-entity-list">
          ${links}
          ${remaining > 0 ? `<span class="doc-entity-more">+${remaining} more</span>` : ''}
        </div>
      </td>
    `;
  }

  renderCell(doc, column) {
    switch (column) {
      case 'classification':
        return this.renderClassificationCell(doc);
      case 'documentType':
        return this.renderDocumentTypeCell(doc);
      case 'publisherName':
        return this.renderPublisherNameCell(doc);
      case 'publisherType':
        return this.renderPublisherTypeCell(doc);
      case 'title':
        return this.renderTitleCell(doc);
      case 'excerpt':
        return this.renderExcerptCell(doc);
      case 'publishedDate':
        return this.renderDateCell(doc);
      default:
        // Entity columns (narratives, events, locations, persons, organizations, factions, topics, themes)
        return this.renderEntityCell(doc, column);
    }
  }

  render() {
    this.clear();

    if (!this.data || !this.data.documents || !this.data.documents.length) {
      this.showEmptyState('No documents found');
      return;
    }

    // Check if we're in viewer mode
    if (this.viewerMode && this.selectedDocument) {
      this.renderViewerMode();
      return;
    }

    // Filter out classification column if showClassification setting is disabled
    const showClassification = this.shouldShowClassification();
    const columns = this.options.columns.filter(col => {
      if (!COLUMN_CONFIG[col]) return false;
      if (col === 'classification' && !showClassification) return false;
      return true;
    });

    // Sort and limit documents
    const sortedDocs = this.sortDocuments(this.data.documents);
    const documents = sortedDocs.slice(0, this.options.maxItems);

    // Create selection toolbar if selection is enabled
    if (this.options.enableSelection) {
      const toolbar = this.renderSelectionToolbar(documents);
      this.container.appendChild(toolbar);
    }

    // Create table container
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container document-table-container';

    // Create table
    const table = document.createElement('table');
    table.className = 'table document-table';

    // Build header with optional checkbox column
    const thead = document.createElement('thead');
    const selectHeaderCell = this.options.enableSelection 
      ? `<th class="doc-col-select">
           <input type="checkbox" class="doc-select-header" title="Select all" />
         </th>` 
      : '';
    thead.innerHTML = `<tr>${selectHeaderCell}${columns.map(col => this.renderHeaderCell(col)).join('')}</tr>`;
    table.appendChild(thead);

    // Build body
    const tbody = document.createElement('tbody');

    documents.forEach((doc) => {
      const row = document.createElement('tr');
      row.className = 'document-row';
      row.dataset.id = doc.id;
      
      const selectCell = this.options.enableSelection 
        ? `<td class="doc-col-select">
             <input type="checkbox" class="doc-select-checkbox" data-doc-id="${doc.id}" 
                    ${this.selectedDocIds.has(doc.id) ? 'checked' : ''} />
           </td>` 
        : '';
      row.innerHTML = selectCell + columns.map(col => this.renderCell(doc, col)).join('');

      // Handle checkbox changes
      if (this.options.enableSelection) {
        const checkbox = row.querySelector('.doc-select-checkbox');
        if (checkbox) {
          checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            this.toggleDocumentSelection(doc.id, e.target.checked);
          });
        }
      }

      // Handle title button clicks for viewer mode
      if (this.options.enableViewerMode) {
        const titleBtn = row.querySelector('.doc-title-btn');
        if (titleBtn) {
          titleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openViewer(doc);
          });
        }
      }

      // Handle entity link clicks
      const entityLinks = row.querySelectorAll('.doc-entity-link');
      entityLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const entityType = link.dataset.entityType;
          const entityId = link.dataset.entityId;
          
          if (this.options.onEntityClick) {
            this.options.onEntityClick(entityType, entityId);
          } else {
            // ID-based routing - type is inferred from ID prefix
            this.navigateTo(entityId);
          }
        });
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
    this.container.appendChild(tableContainer);

    // Add select-all checkbox handler
    if (this.options.enableSelection) {
      const selectAllCheckbox = thead.querySelector('.doc-select-header');
      if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', (e) => {
          this.toggleSelectAll(documents, e.target.checked);
        });
        // Update select-all state based on current selection
        this.updateSelectAllState(documents, selectAllCheckbox);
      }
    }

    // Add sort click handlers
    if (this.options.sortable) {
      const sortableHeaders = thead.querySelectorAll('.sortable');
      sortableHeaders.forEach(th => {
        th.addEventListener('click', () => {
          this.toggleSort(th.dataset.column);
        });
      });
    }

    // Show count indicator
    if (this.data.documents.length > this.options.maxItems) {
      const countIndicator = document.createElement('div');
      countIndicator.className = 'document-table-count';
      countIndicator.textContent = `Showing ${documents.length} of ${this.data.documents.length} documents`;
      this.container.appendChild(countIndicator);
    }
  }

  /**
   * Open viewer mode with the specified document
   * @param {Object} doc - The document to display
   * @param {boolean} updateUrl - Whether to update the URL (default: true)
   */
  openViewer(doc, updateUrl = true) {
    // Mark document as read
    DocumentTable.markDocumentAsRead(doc.id);
    
    this.viewerMode = true;
    this.selectedDocument = doc;
    
    // Update URL with doc ID for persistence across page refresh
    if (updateUrl) {
      const currentHash = window.location.hash.split('?')[0];
      window.history.replaceState(null, '', `${currentHash}?doc=${doc.id}`);
    }
    
    this.render();
    this.setupKeyboardNavigation();
  }

  /**
   * Close viewer mode and return to table view
   */
  closeViewer() {
    this.removeKeyboardNavigation();
    this.viewerMode = false;
    this.selectedDocument = null;
    
    // Remove doc ID from URL
    const currentHash = window.location.hash.split('?')[0];
    window.history.replaceState(null, '', currentHash);
    
    this.render();
  }

  /**
   * Set up keyboard navigation for document viewer
   * Spacebar: next document, Delete/Backspace: previous document
   */
  setupKeyboardNavigation() {
    // Remove any existing handler first
    this.removeKeyboardNavigation();
    
    this._keydownHandler = (e) => {
      // Don't navigate if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }
      
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        this.navigateToNextDocument();
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        this.navigateToPreviousDocument();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.closeViewer();
      }
    };
    
    document.addEventListener('keydown', this._keydownHandler);
  }

  /**
   * Remove keyboard navigation listener
   */
  removeKeyboardNavigation() {
    if (this._keydownHandler) {
      document.removeEventListener('keydown', this._keydownHandler);
      this._keydownHandler = null;
    }
  }

  /**
   * Get the sorted list of documents
   * @returns {Array} Sorted documents array
   */
  getSortedDocuments() {
    if (!this.data || !this.data.documents) return [];
    return this.sortDocuments(this.data.documents).slice(0, this.options.maxItems);
  }

  /**
   * Navigate to the next document in the list
   */
  navigateToNextDocument() {
    const documents = this.getSortedDocuments();
    if (documents.length === 0 || !this.selectedDocument) return;
    
    const currentIndex = documents.findIndex(d => d.id === this.selectedDocument.id);
    if (currentIndex === -1) return;
    
    // Get next index, wrap around to beginning if at end
    const nextIndex = (currentIndex + 1) % documents.length;
    const nextDoc = documents[nextIndex];
    
    // Mark as read and update selection
    DocumentTable.markDocumentAsRead(nextDoc.id);
    this.selectedDocument = nextDoc;
    
    // Update URL with new doc ID
    const currentHash = window.location.hash.split('?')[0];
    window.history.replaceState(null, '', `${currentHash}?doc=${nextDoc.id}`);
    
    this.render();
    this.setupKeyboardNavigation(); // Re-attach after render
  }

  /**
   * Navigate to the previous document in the list
   */
  navigateToPreviousDocument() {
    const documents = this.getSortedDocuments();
    if (documents.length === 0 || !this.selectedDocument) return;
    
    const currentIndex = documents.findIndex(d => d.id === this.selectedDocument.id);
    if (currentIndex === -1) return;
    
    // Get previous index, wrap around to end if at beginning
    const prevIndex = (currentIndex - 1 + documents.length) % documents.length;
    const prevDoc = documents[prevIndex];
    
    // Mark as read and update selection
    DocumentTable.markDocumentAsRead(prevDoc.id);
    this.selectedDocument = prevDoc;
    
    // Update URL with new doc ID
    const currentHash = window.location.hash.split('?')[0];
    window.history.replaceState(null, '', `${currentHash}?doc=${prevDoc.id}`);
    
    this.render();
    this.setupKeyboardNavigation(); // Re-attach after render
  }

  /**
   * Filter documents in the viewer sidebar
   * @param {HTMLElement} docList - The document list element
   * @param {Array} documents - All documents
   * @param {string} query - Search query
   */
  filterViewerDocuments(docList, documents, query) {
    const items = docList.querySelectorAll('.document-viewer-list-item');
    let visibleCount = 0;
    
    items.forEach((item, index) => {
      const doc = documents[index];
      if (!doc) return;
      
      // Search in title, publisher name, and content
      const title = (doc.title || '').toLowerCase();
      const publisherName = this.getPublisherName(this.getDocPublisherId(doc)).toLowerCase();
      const content = (doc.content || '').toLowerCase();
      
      const matches = !query || 
        title.includes(query) || 
        publisherName.includes(query) ||
        content.includes(query);
      
      item.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    // Update count in sidebar header
    const titleEl = this.container.querySelector('.document-viewer-sidebar-title');
    if (titleEl) {
      titleEl.textContent = query 
        ? `Documents (${visibleCount} of ${documents.length})`
        : `Documents (${documents.length})`;
    }
  }

  /**
   * Render the viewer mode layout with sidebar and content area
   */
  renderViewerMode() {
    const sortedDocs = this.sortDocuments(this.data.documents);
    const documents = sortedDocs.slice(0, this.options.maxItems);

    // Create viewer container
    const viewerContainer = document.createElement('div');
    viewerContainer.className = 'document-viewer-container';

    // Create sidebar with document list
    const sidebar = document.createElement('div');
    sidebar.className = `document-viewer-sidebar${this.detailsPanelOpen ? ' hidden' : ''}`;

    // Sidebar header with close button
    const sidebarHeader = document.createElement('div');
    sidebarHeader.className = 'document-viewer-sidebar-header';
    sidebarHeader.innerHTML = `
      <span class="document-viewer-sidebar-title">Documents (${documents.length})</span>
      <button class="btn-icon document-viewer-close-btn" title="Close viewer">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4l8 8M12 4l-8 8"/>
        </svg>
      </button>
    `;
    sidebar.appendChild(sidebarHeader);

    // Sidebar filter bar
    const filterBar = document.createElement('div');
    filterBar.className = 'document-viewer-sidebar-filters';
    filterBar.innerHTML = `
      <input type="text" 
             class="document-viewer-search" 
             placeholder="Search documents..." 
             id="viewer-doc-search">
    `;
    sidebar.appendChild(filterBar);

    // Document list
    const docList = document.createElement('ul');
    docList.className = 'document-viewer-list';

    documents.forEach((doc) => {
      const listItem = document.createElement('li');
      listItem.className = 'document-viewer-list-item';
      if (doc.id === this.selectedDocument.id) {
        listItem.classList.add('active');
      }
      listItem.dataset.docId = doc.id;

      const publisherName = this.getPublisherName(this.getDocPublisherId(doc));
      const formatted = this.formatDate(doc.publishedDate);
      const docType = doc.documentType || 'news_article';
      const typeInfo = getDocumentTypeInfo(docType);
      
      // Get display title
      let displayTitle = doc.title;
      if (isSocialMedia(doc.documentType) && !doc.title && doc.author) {
        const username = doc.author.username || doc.author.displayName || 'Unknown';
        const contentPreview = doc.content 
          ? doc.content.substring(0, 40) + (doc.content.length > 40 ? '...' : '')
          : '';
        displayTitle = `${username}: "${contentPreview}"`;
      }
      displayTitle = displayTitle || 'Untitled';

      // Get unread indicator for sidebar
      const unreadIndicator = this.getUnreadIndicator(doc.id);
      
      listItem.innerHTML = `
        <div class="document-viewer-list-item-header">
          ${unreadIndicator}
          <div class="document-viewer-list-item-title">${this.truncateText(displayTitle, 55)}</div>
        </div>
        <div class="document-viewer-list-item-meta">
          <span class="document-viewer-list-item-publisher">
            ${publisherName}
          </span>
          <span class="document-viewer-list-item-date">${formatted.date}</span>
        </div>
      `;

      listItem.addEventListener('click', () => {
        // Mark document as read when clicked in sidebar
        DocumentTable.markDocumentAsRead(doc.id);
        this.selectedDocument = doc;
        
        // Update URL with new doc ID
        const currentHash = window.location.hash.split('?')[0];
        window.history.replaceState(null, '', `${currentHash}?doc=${doc.id}`);
        
        this.render();
      });

      docList.appendChild(listItem);
    });

    sidebar.appendChild(docList);

    // Show count if truncated
    if (this.data.documents.length > this.options.maxItems) {
      const countIndicator = document.createElement('div');
      countIndicator.className = 'document-viewer-list-count';
      countIndicator.textContent = `Showing ${documents.length} of ${this.data.documents.length}`;
      sidebar.appendChild(countIndicator);
    }

    viewerContainer.appendChild(sidebar);

    // Get document type for styling
    const docType = this.selectedDocument.documentType || 'news_article';
    const docTypeClass = `document-viewer-type-${docType.replace('_', '-')}`;

    // Create main content wrapper
    const mainContent = document.createElement('div');
    mainContent.className = 'document-viewer-main';

    // Create content area with type-specific class (always show document content)
    const contentArea = document.createElement('div');
    contentArea.className = `document-viewer-content ${docTypeClass}`;
    contentArea.tabIndex = 0; // Make focusable for keyboard navigation (Page Up/Down)

    // Document header - type-specific
    const docHeader = document.createElement('div');
    docHeader.className = 'document-viewer-content-header';
    docHeader.innerHTML = this.renderViewerHeader(this.selectedDocument);
    contentArea.appendChild(docHeader);

    // Document body (rendered content)
    const docBody = document.createElement('div');
    docBody.className = 'document-viewer-content-body';
    docBody.id = 'document-viewer-content-body';
    docBody.dataset.documentId = this.selectedDocument.id; // For text selection popover
    contentArea.appendChild(docBody);

    mainContent.appendChild(contentArea);

    // Create sliding details panel
    const detailsPanel = document.createElement('div');
    detailsPanel.className = `document-viewer-details-panel ${this.detailsPanelOpen ? 'open' : ''}`;
    detailsPanel.innerHTML = `
      <div class="details-panel-header">
        <span class="details-panel-title">Document Details</span>
        <button class="btn-icon details-panel-close" title="Close details">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 4l8 8M12 4l-8 8"/>
          </svg>
        </button>
      </div>
      <div class="details-panel-content">
        ${this.renderDetailsView(this.selectedDocument)}
      </div>
    `;
    mainContent.appendChild(detailsPanel);

    viewerContainer.appendChild(mainContent);
    this.container.appendChild(viewerContainer);

    // Always render document content using DocumentContentRenderer
    const highlights = DataService.getHighlightsForDocument(this.selectedDocument.id);
    const comments = DataService.getCommentsForDocument(this.selectedDocument.id);
    
    this.contentRenderer = new DocumentContentRenderer('document-viewer-content-body');
    this.contentRenderer.update({ 
      document: this.selectedDocument,
      highlights: highlights || [],
      comments: comments || []
    });

    // Initialize details components if panel is open
    if (this.detailsPanelOpen) {
      this.initializeDetailsComponents(this.selectedDocument);
    }

    // Add close button handler
    const closeBtn = sidebarHeader.querySelector('.document-viewer-close-btn');
    closeBtn.addEventListener('click', () => this.closeViewer());

    // Add search filter handler
    const searchInput = filterBar.querySelector('#viewer-doc-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.filterViewerDocuments(docList, documents, query);
      });
    }

    // Add details panel toggle handler (from header buttons)
    const detailsToggleBtn = contentArea.querySelector('#viewer-toggle-details');
    if (detailsToggleBtn) {
      detailsToggleBtn.addEventListener('click', () => this.toggleDetailsPanel());
    }

    // Add details panel close handler
    const detailsCloseBtn = detailsPanel.querySelector('.details-panel-close');
    if (detailsCloseBtn) {
      detailsCloseBtn.addEventListener('click', () => this.closeDetailsPanel());
    }

    // Initialize Add to Project split button
    const addToProjectContainer = contentArea.querySelector('#viewer-add-to-project-container');
    if (addToProjectContainer) {
      // Clean up previous instance if exists
      if (this._viewerAddToProjectBtn) {
        this._viewerAddToProjectBtn.destroy();
      }
      
      this._viewerAddToProjectBtn = new AddToProjectSplitButton({
        getDocumentIds: () => this.selectedDocument ? [this.selectedDocument.id] : [],
        onSuccess: (result) => {
          showAddToProjectToast(result.projectId, result.projectName, result.added, result.isNew);
        },
        size: 'small'
      });
      
      addToProjectContainer.appendChild(this._viewerAddToProjectBtn.render());
    }

    // Focus content area for keyboard navigation (Page Up/Down)
    contentArea.focus();
  }

  /**
   * Toggle the details panel open/closed
   */
  toggleDetailsPanel() {
    this.detailsPanelOpen = !this.detailsPanelOpen;
    const panel = this.container.querySelector('.document-viewer-details-panel');
    const toggleBtn = this.container.querySelector('#viewer-toggle-details');
    const sidebar = this.container.querySelector('.document-viewer-sidebar');
    
    if (panel) {
      panel.classList.toggle('open', this.detailsPanelOpen);
    }
    if (toggleBtn) {
      toggleBtn.classList.toggle('active', this.detailsPanelOpen);
    }
    // Hide sidebar when details panel is open
    if (sidebar) {
      sidebar.classList.toggle('hidden', this.detailsPanelOpen);
    }
    
    // Initialize details components when first opened
    if (this.detailsPanelOpen && this.selectedDocument) {
      this.initializeDetailsComponents(this.selectedDocument);
    }
  }

  /**
   * Close the details panel
   */
  closeDetailsPanel() {
    this.detailsPanelOpen = false;
    const panel = this.container.querySelector('.document-viewer-details-panel');
    const toggleBtn = this.container.querySelector('#viewer-toggle-details');
    const sidebar = this.container.querySelector('.document-viewer-sidebar');
    
    if (panel) {
      panel.classList.remove('open');
    }
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
    }
    // Show sidebar when details panel is closed
    if (sidebar) {
      sidebar.classList.remove('hidden');
    }
  }

  /**
   * Open Add to Project modal for a single document (viewer mode)
   * @param {string} docId - Document ID
   */
  openAddToProjectModalForDocument(docId) {
    const modal = getAddToProjectModal();
    modal.open([docId], (result) => {
      this.showAddToProjectFeedback(result);
    });
  }

  /**
   * Render the details view showing related entities
   * @param {Object} doc - The document
   * @returns {string} HTML string
   */
  renderDetailsView(doc) {
    const quotes = doc.quotes || [];
    const activities = doc.activities || [];
    const narratives = DataService.getNarrativesForDocument(doc.id);
    const themes = DataService.getThemesForDocument(doc.id);
    const persons = DataService.getPersonsForDocument(doc.id);
    const organizations = DataService.getOrganizationsForDocument(doc.id);
    const locations = DataService.getLocationsForDocument(doc.id);
    const events = DataService.getEventsForDocument(doc.id);
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    // Build cards using CardBuilder with full width for sliding panel
    // Note: This panel uses list-only views (no map/graph toggles) due to narrow width
    const cards = CardBuilder.createMultiple([
      {
        condition: quotes.length > 0,
        title: 'Quotes',
        id: 'doc-details-quotes',
        options: { 
          count: quotes.length, 
          noPadding: true
        }
      },
      {
        condition: activities.length > 0,
        title: 'Activities',
        id: 'doc-details-activities',
        options: { 
          count: activities.length, 
          noPadding: true
        }
      },
      {
        condition: narratives.length > 0,
        title: 'Related Narratives',
        id: 'doc-details-narratives',
        options: { 
          count: narratives.length, 
          noPadding: true,
          actions: CardBuilder.descriptionToggle('doc-narrative-desc-toggle')
        }
      },
      {
        condition: themes.length > 0,
        title: 'Related Themes',
        id: 'doc-details-themes',
        options: { 
          count: themes.length, 
          noPadding: true,
          actions: CardBuilder.descriptionToggle('doc-theme-desc-toggle')
        }
      },
      {
        condition: hasNetwork,
        title: 'People & Organizations',
        id: 'doc-details-network',
        options: { 
          count: persons.length + organizations.length,
          noPadding: true
        }
      },
      {
        condition: locations.length > 0 || events.length > 0,
        title: 'Locations & Events',
        id: 'doc-details-map',
        options: { 
          noPadding: true
        }
      }
    ]);

    // If no related data, show empty state
    if (!cards) {
      return `
        <div class="content-area">
          <div class="document-details-empty">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16v1"/>
            </svg>
            <p>No related entities found for this document.</p>
          </div>
        </div>
      `;
    }

    return `<div class="content-area"><div class="content-grid">${cards}</div></div>`;
  }

  /**
   * Initialize components for the details view
   * @param {Object} doc - The document
   */
  initializeDetailsComponents(doc) {
    const quotes = doc.quotes || [];
    const activities = doc.activities || [];
    const narratives = DataService.getNarrativesForDocument(doc.id);
    const themes = DataService.getThemesForDocument(doc.id);
    const persons = DataService.getPersonsForDocument(doc.id);
    const organizations = DataService.getOrganizationsForDocument(doc.id);
    const locations = DataService.getLocationsForDocument(doc.id);
    const events = DataService.getEventsForDocument(doc.id);
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    // Store data for list rendering
    this._detailsData = {
      persons,
      organizations,
      locations,
      events,
      personIds: persons.map(p => p.id),
      orgIds: organizations.map(o => o.id)
    };

    // Initialize Quotes Table
    if (quotes.length > 0 && document.getElementById('doc-details-quotes')) {
      this.renderDetailsQuotesTable(quotes);
    }

    // Initialize Activities Table
    if (activities.length > 0 && document.getElementById('doc-details-activities')) {
      this.renderDetailsActivitiesTable(activities);
    }

    // Initialize Narrative List
    if (narratives.length > 0 && document.getElementById('doc-details-narratives')) {
      this.detailsNarrativeList = new NarrativeList('doc-details-narratives', {
        maxItems: 10,
        showSparkline: false,
        showVolume: false,
        onItemClick: (n) => {
          this.navigateTo(n.id);
        }
      });
      this.detailsNarrativeList.update({ narratives });
    }

    // Initialize Theme List
    if (themes.length > 0 && document.getElementById('doc-details-themes')) {
      this.detailsThemeList = new ThemeList('doc-details-themes', {
        maxItems: 10,
        onItemClick: (s) => {
          this.navigateTo(s.id);
        }
      });
      this.detailsThemeList.update({ themes });
    }

    // Initialize People & Organizations list
    if (hasNetwork && document.getElementById('doc-details-network')) {
      this.renderDetailsEntityList();
    }

    // Initialize Locations & Events list
    if ((locations.length > 0 || events.length > 0) && document.getElementById('doc-details-map')) {
      this.renderDetailsLocationEventList();
    }

    // Initialize card width toggles (resize buttons)
    const contentGrid = this.container.querySelector('.content-grid');
    if (contentGrid) {
      initAllCardToggles(contentGrid, `doc-details-${doc.id}`);
    }

    // Initialize description toggle for narratives
    const narrativeDescToggle = document.getElementById('doc-narrative-desc-toggle');
    if (narrativeDescToggle && this.detailsNarrativeList) {
      narrativeDescToggle.addEventListener('click', () => {
        const isShowing = this.detailsNarrativeList.toggleDescription();
        narrativeDescToggle.classList.toggle('active', isShowing);
      });
    }

    // Initialize description toggle for themes
    const themeDescToggle = document.getElementById('doc-theme-desc-toggle');
    if (themeDescToggle && this.detailsThemeList) {
      themeDescToggle.addEventListener('click', () => {
        const isShowing = this.detailsThemeList.toggleDescription();
        themeDescToggle.classList.toggle('active', isShowing);
      });
    }
  }

  /**
   * Render entity list for details panel (people & organizations)
   */
  renderDetailsEntityList() {
    const container = document.getElementById('doc-details-network');
    if (!container || !this._detailsData) return;

    const allEntities = [
      ...this._detailsData.persons.map(p => ({ ...p, _type: 'person' })),
      ...this._detailsData.organizations.map(o => ({ ...o, _type: 'organization' }))
    ].sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    container.innerHTML = `
      <ul class="entity-list network-entity-list">
        ${allEntities.map(e => this.renderNetworkEntityItem(e)).join('')}
      </ul>
    `;

    // Add click handlers - ID-based routing
    container.querySelectorAll('.entity-list-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        this.navigateTo(id);
      });
    });
  }

  /**
   * Render a single entity item for network list view
   */
  renderNetworkEntityItem(entity) {
    const typeLabel = entity._type === 'person' ? 'Person' : 'Organization';
    const subtitle = entity.title || entity.type || typeLabel;
    const icon = entity._type === 'person' 
      ? `<svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.25">
          <circle cx="8" cy="4" r="2.5"/>
          <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
        </svg>`
      : `<svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 16H9.5C9.59107 16 9.67646 15.9757 9.75 15.9331C9.82354 15.9757 9.90893 16 10 16H15.5C15.7761 16 16 15.7761 16 15.5V4.5C16 4.22386 15.7761 4 15.5 4H10V0.5C10 0.223858 9.77614 0 9.5 0H0.5C0.223858 0 0 0.223858 0 0.5V15.5C0 15.7761 0.223858 16 0.5 16ZM1 15V1H9V15H7V13C7 12.7239 6.77614 12.5 6.5 12.5H3.5C3.22386 12.5 3 12.7239 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z"/>
        </svg>`;

    return `
      <li class="entity-list-item" data-id="${entity.id}" data-type="${entity._type}">
        <div class="entity-avatar ${entity._type}">
          ${icon}
        </div>
        <div class="entity-info">
          <div class="entity-name">${entity.name || 'Unknown'}</div>
          <div class="entity-type">${subtitle}</div>
        </div>
      </li>
    `;
  }

  /**
   * Render location and event list for details panel
   */
  renderDetailsLocationEventList() {
    const container = document.getElementById('doc-details-map');
    if (!container || !this._detailsData) return;

    const locations = this._detailsData.locations || [];
    const events = this._detailsData.events || [];

    // Build combined list - locations first, then events sorted by date
    const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

    let listHtml = '<ul class="entity-list details-location-event-list">';

    // Add locations
    locations.forEach(loc => {
      listHtml += `
        <li class="entity-list-item" data-id="${loc.id}" data-type="location">
          <div class="entity-avatar location">
            <svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.25">
              <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
              <circle cx="8" cy="6" r="2"/>
            </svg>
          </div>
          <div class="entity-info">
            <div class="entity-name">${loc.name || 'Unknown Location'}</div>
            <div class="entity-type">${loc.type || 'Location'}</div>
          </div>
        </li>
      `;
    });

    // Add events
    sortedEvents.forEach(event => {
      const date = new Date(event.date);
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });

      listHtml += `
        <li class="entity-list-item" data-id="${event.id}" data-type="event">
          <div class="entity-avatar event">
            <svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.25">
              <rect x="2" y="3" width="12" height="11" rx="1"/>
              <path d="M5 1v3M11 1v3M2 7h12"/>
            </svg>
          </div>
          <div class="entity-info">
            <div class="entity-name">${event.text || 'Unknown Event'}</div>
            <div class="entity-type">${formattedDate}</div>
          </div>
        </li>
      `;
    });

    listHtml += '</ul>';

    if (locations.length === 0 && events.length === 0) {
      container.innerHTML = `
        <div class="empty-state-small">
          <p>No locations or events</p>
        </div>
      `;
      return;
    }

    container.innerHTML = listHtml;

    // Add click handlers - ID-based routing
    container.querySelectorAll('.entity-list-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        this.navigateTo(id);
      });
    });
  }

  /**
   * Get entity name from ID for quotes/activities tables
   */
  getEntityNameForTable(entityId, entityType) {
    if (!entityId) return 'Unknown';
    if (entityType === 'person') {
      const person = DataService.getPerson(entityId);
      return person ? person.name : entityId;
    } else if (entityType === 'organization') {
      const org = DataService.getOrganization(entityId);
      return org ? org.name : entityId;
    }
    return entityId;
  }

  /**
   * Render quotes table for details panel
   */
  renderDetailsQuotesTable(quotes) {
    const container = document.getElementById('doc-details-quotes');
    if (!container || !quotes.length) return;

    const rows = quotes.map(quote => {
      const speakerName = this.getEntityNameForTable(quote.speakerId, quote.speakerType);
      const speakerTypeClass = quote.speakerType === 'person' ? 'speaker-person' : 'speaker-org';
      const truncatedText = quote.text.length > 200 ? quote.text.substring(0, 200) + '...' : quote.text;
      
      return `
        <tr class="quotes-table-row">
          <td class="quotes-col-speaker">
            <span class="speaker-name ${speakerTypeClass}">${escapeHtml(speakerName)}</span>
          </td>
          <td class="quotes-col-text">
            <span class="quote-text">"${escapeHtml(truncatedText)}"</span>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="table-container quotes-table-container">
        <table class="table quotes-table">
          <thead>
            <tr>
              <th class="quotes-col-speaker">Speaker</th>
              <th class="quotes-col-text">Quote</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Render activities table for details panel
   */
  renderDetailsActivitiesTable(activities) {
    const container = document.getElementById('doc-details-activities');
    if (!container || !activities.length) return;

    const rows = activities.map(activity => {
      const actorName = this.getEntityNameForTable(activity.actorId, activity.actorType);
      const actorTypeClass = activity.actorType === 'person' ? 'actor-person' : 'actor-org';
      
      // Target can be an entity or text
      let targetDisplay = activity.targetText || '';
      if (activity.targetId) {
        const targetName = this.getEntityNameForTable(activity.targetId, activity.targetType);
        if (targetName && targetName !== activity.targetId) {
          targetDisplay = targetName + (activity.targetText ? ` (${activity.targetText})` : '');
        }
      }
      
      return `
        <tr class="activities-table-row">
          <td class="activities-col-actor">
            <span class="actor-name ${actorTypeClass}">${escapeHtml(actorName)}</span>
          </td>
          <td class="activities-col-action">
            <span class="activity-action">${escapeHtml(activity.action || '')}</span>
          </td>
          <td class="activities-col-target">
            <span class="activity-target">${escapeHtml(targetDisplay)}</span>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="table-container activities-table-container">
        <table class="table activities-table">
          <thead>
            <tr>
              <th class="activities-col-actor">Actor</th>
              <th class="activities-col-action">Action</th>
              <th class="activities-col-target">Target</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Render the standardized toolbar row for all document types
   * @param {Object} doc - The document
   * @returns {string} HTML string for toolbar
   */
  renderHeaderToolbar(doc) {
    // Get repository info
    const repository = DataService.getRepository(doc.repositoryId);
    const repoName = repository?.name || 'Unknown Repository';
    
    // Get classification
    const classification = doc.classification || 'U';
    const showClassification = this.shouldShowClassification();
    
    // Get comments and highlights counts
    const highlights = DataService.getHighlightsForDocument(doc.id) || [];
    const comments = DataService.getCommentsForDocument(doc.id) || [];

    return `
      <div class="viewer-header-toolbar">
        <div class="viewer-toolbar-left">
          <span class="viewer-toolbar-repo">${repoName}</span>
          ${showClassification ? renderClassificationBadge(classification) : ''}
        </div>
        <div class="viewer-toolbar-right">
          <div id="viewer-add-to-project-container"></div>
          <span class="viewer-toolbar-stat" title="Comments">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 10c0 .6-.4 1-1 1H5l-3 3V3c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v7z"/>
            </svg>
            ${comments.length}
          </span>
          <span class="viewer-toolbar-stat" title="Highlights">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 12h10M3 8h10M5 4h6"/>
            </svg>
            ${highlights.length}
          </span>
          <button class="btn btn-small btn-secondary ${this.detailsPanelOpen ? 'active' : ''}" id="viewer-toggle-details" title="Toggle Details">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="1" y="2" width="14" height="12" rx="1"/>
              <path d="M10 2v12"/>
            </svg>
            Show Details
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Get portion mark display from first content block
   * @param {Object} doc - The document
   * @returns {string} HTML for portion mark or empty string
   */
  getPortionMarkHtml(doc) {
    const showClassification = this.shouldShowClassification();
    if (!showClassification) return '';
    
    const firstBlock = doc.contentBlocks?.[0];
    if (firstBlock?.portionMark) {
      const pm = firstBlock.portionMark;
      const pmClass = pm.classification?.toLowerCase() || 'u';
      const pmText = pm.handling ? `${pm.classification}//${pm.handling}` : pm.classification;
      return `<span class="viewer-portion-mark portion-mark-${pmClass}">(${pmText})</span>`;
    }
    return '';
  }

  /**
   * Render external link button
   * @param {Object} doc - The document
   * @param {string} label - Button label
   * @returns {string} HTML for link or empty string
   */
  renderExternalLink(doc, label = 'View Source') {
    if (!doc.url) return '';
    return `
      <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="viewer-external-link">
        ${label}
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2h8v8M14 2L6 10"/>
        </svg>
      </a>
    `;
  }

  /**
   * Render type-specific header for the viewer
   * @param {Object} doc - The document to render header for
   * @returns {string} HTML string for the header
   */
  renderViewerHeader(doc) {
    const docType = doc.documentType || 'news_article';
    const toolbar = this.renderHeaderToolbar(doc);
    
    let content;
    switch (docType) {
      case DOCUMENT_TYPES.SOCIAL_POST:
        // Use TikTok header for TikTok posts (identified by publisher)
        const publisherId = this.getDocPublisherId(doc);
        if (publisherId && publisherId.includes('tiktok')) {
          content = this.renderTikTokHeader(doc);
        } else {
          content = this.renderSocialHeader(doc);
        }
        break;
      case DOCUMENT_TYPES.NEWS_ARTICLE:
        content = this.renderNewsHeader(doc);
        break;
      case DOCUMENT_TYPES.INTERNAL:
        content = this.renderInternalHeader(doc);
        break;
      default:
        content = this.renderNewsHeader(doc);
    }
    
    return toolbar + content;
  }

  /**
   * Render header for social media posts (X, Facebook, Instagram, Reddit, LinkedIn)
   */
  renderSocialHeader(doc) {
    const author = doc.author || {};
    const metrics = doc.metrics || {};
    const publisherName = this.getPublisherName(this.getDocPublisherId(doc));
    const formatted = this.formatDate(doc.publishedDate);
    const title = doc.title || '';
    const portionMark = this.getPortionMarkHtml(doc);
    const isLinkedIn = publisherName.toLowerCase().includes('linkedin');

    // Header image if available
    const headerImageHtml = doc.headerImage?.url ? `
      <div class="viewer-header-image">
        <img src="${doc.headerImage.url}" alt="${doc.headerImage.caption || 'Post image'}">
        ${doc.headerImage.caption ? `<span class="viewer-header-image-caption">${doc.headerImage.caption}</span>` : ''}
      </div>
    ` : '';

    return `
      <div class="document-viewer-header-social">
        <div class="viewer-social-author">
          <div class="viewer-social-avatar">
            <img src="${author.avatarUrl || PLACEHOLDERS.avatar}" alt="${author.displayName || 'User'}">
          </div>
          <div class="viewer-social-author-info">
            <span class="viewer-social-displayname">${author.displayName || 'Unknown'}</span>
            <span class="viewer-social-username">${author.username || ''}</span>
          </div>
        </div>

        ${!isLinkedIn && title ? `
          <div class="viewer-social-headline">
            ${portionMark}
            <span class="viewer-social-title">${title}</span>
          </div>
        ` : ''}

        <div class="viewer-social-meta">
          <span class="viewer-social-publisher">${publisherName}</span>
          <span class="viewer-social-date">${formatted.date} ${formatted.time}</span>
        </div>

        ${headerImageHtml}

        <div class="viewer-social-footer">
          <div class="viewer-social-engagement">
            <div class="viewer-social-stat" title="Comments">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <span>${this.formatEngagement(metrics.comments || 0)}</span>
            </div>
            <div class="viewer-social-stat" title="Likes">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>${this.formatEngagement(metrics.likes || 0)}</span>
            </div>
            <div class="viewer-social-stat" title="Shares">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
              <span>${this.formatEngagement(metrics.shares || 0)}</span>
            </div>
          </div>
          ${this.renderExternalLink(doc, `View on ${publisherName}`)}
        </div>
      </div>
    `;
  }

  /**
   * Render header for TikTok posts
   */
  renderTikTokHeader(doc) {
    const author = doc.author || {};
    const metrics = doc.metrics || {};
    const formatted = this.formatDate(doc.publishedDate);
    const title = doc.title || '';
    const portionMark = this.getPortionMarkHtml(doc);

    return `
      <div class="document-viewer-header-social">
        <div class="viewer-social-author">
          <div class="viewer-social-avatar">
            <img src="${author.avatarUrl || PLACEHOLDERS.avatar}" alt="${author.displayName || 'User'}">
          </div>
          <div class="viewer-social-author-info">
            <span class="viewer-social-displayname">${author.displayName || 'Unknown'}</span>
            <span class="viewer-social-username">${author.username || ''}</span>
          </div>
        </div>

        ${title ? `
          <div class="viewer-social-headline">
            ${portionMark}
            <span class="viewer-social-title">${title}</span>
          </div>
        ` : ''}

        <div class="viewer-social-meta">
          <span class="viewer-social-publisher">TikTok</span>
          <span class="viewer-social-date">${formatted.date} ${formatted.time}</span>
        </div>

        <div class="viewer-social-footer">
          <div class="viewer-social-engagement">
            <div class="viewer-social-stat" title="Comments">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <span>${this.formatEngagement(metrics.comments || 0)}</span>
            </div>
            <div class="viewer-social-stat" title="Likes">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>${this.formatEngagement(metrics.likes || 0)}</span>
            </div>
            <div class="viewer-social-stat" title="Shares">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
              <span>${this.formatEngagement(metrics.shares || 0)}</span>
            </div>
          </div>
          ${this.renderExternalLink(doc, 'View on TikTok')}
        </div>
      </div>
    `;
  }

  /**
   * Render header for news articles
   */
  renderNewsHeader(doc) {
    const publisherName = this.getPublisherName(this.getDocPublisherId(doc));
    const formatted = this.formatDate(doc.publishedDate);
    const title = doc.title || 'Untitled Article';
    const portionMark = this.getPortionMarkHtml(doc);

    return `
      <div class="document-viewer-header-standard">
        <div class="viewer-standard-headline">
          ${portionMark}
          <h2 class="viewer-standard-title">${title}</h2>
        </div>

        <div class="viewer-standard-meta">
          <span class="viewer-standard-publisher">${publisherName}</span>
          ${doc.author ? `<span class="viewer-standard-author">${doc.author}</span>` : ''}
          <span class="viewer-standard-date">${formatted.date} ${formatted.time}</span>
        </div>

        ${this.renderExternalLink(doc, 'View Source')}
      </div>
    `;
  }

  /**
   * Render header for internal documents
   */
  renderInternalHeader(doc) {
    const publisherName = this.getPublisherName(this.getDocPublisherId(doc));
    const formatted = this.formatDate(doc.publishedDate);
    const title = doc.title || 'Untitled Document';
    const portionMark = this.getPortionMarkHtml(doc);

    return `
      <div class="document-viewer-header-standard">
        <div class="viewer-standard-headline">
          ${portionMark}
          <h2 class="viewer-standard-title">${title}</h2>
        </div>

        <div class="viewer-standard-meta">
          <span class="viewer-standard-publisher">${publisherName}</span>
          ${doc.author ? `<span class="viewer-standard-author">${doc.author}</span>` : ''}
          <span class="viewer-standard-date">${formatted.date} ${formatted.time}</span>
        </div>

        ${this.renderExternalLink(doc, 'View in Repository')}
      </div>
    `;
  }

  /**
   * Format engagement numbers (1000 -> 1K, 1000000 -> 1M)
   */
  formatEngagement(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  /**
   * Get icon SVG for document type
   */
  getTypeIcon(docType) {
    switch (docType) {
      case DOCUMENT_TYPES.SOCIAL_POST:
        return `<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>`;
      case DOCUMENT_TYPES.NEWS_ARTICLE:
        return `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="1" width="12" height="14" rx="1"/>
          <path d="M5 4h6M5 7h6M5 10h4"/>
        </svg>`;
      case DOCUMENT_TYPES.INTERNAL:
        return `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="1" width="12" height="14" rx="1"/>
          <path d="M5 4h6M5 7h6M5 10h6M5 13h3"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>`;
      default:
        return `<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="1" width="12" height="14" rx="1"/>
          <path d="M5 4h6M5 7h6M5 10h4"/>
        </svg>`;
    }
  }

  /**
   * Update columns dynamically
   * @param {string[]} columns - Array of column names to display
   */
  setColumns(columns) {
    this.options.columns = columns;
    if (this.data) {
      this.render();
    }
  }

  /**
   * Get available column names
   * @returns {string[]}
   */
  static getAvailableColumns() {
    return Object.keys(COLUMN_CONFIG);
  }

  // ============================================
  // Selection Methods
  // ============================================

  /**
   * Render the selection toolbar
   * @param {Array} documents - Current document list
   * @returns {HTMLElement}
   */
  renderSelectionToolbar(documents) {
    const toolbar = document.createElement('div');
    toolbar.className = 'document-selection-toolbar';
    toolbar.id = 'doc-selection-toolbar';
    
    const selectedCount = this.selectedDocIds.size;
    const hasSelection = selectedCount > 0;
    
    if (!hasSelection) {
      toolbar.classList.add('hidden');
    }
    
    toolbar.innerHTML = `
      <div class="document-selection-info">
        <span class="document-selection-count">${selectedCount} selected</span>
        <button class="document-selection-clear">Clear selection</button>
      </div>
      <div class="document-selection-actions" id="selection-add-to-project-container">
      </div>
    `;
    
    // Clear selection handler
    const clearBtn = toolbar.querySelector('.document-selection-clear');
    clearBtn?.addEventListener('click', () => this.clearSelection());
    
    // Initialize Add to Project split button
    const addToProjectContainer = toolbar.querySelector('#selection-add-to-project-container');
    if (addToProjectContainer) {
      // Clean up previous instance if exists
      if (this._selectionAddToProjectBtn) {
        this._selectionAddToProjectBtn.destroy();
      }
      
      this._selectionAddToProjectBtn = new AddToProjectSplitButton({
        getDocumentIds: () => this.getSelectedDocumentIds(),
        onSuccess: (result) => {
          showAddToProjectToast(result.projectId, result.projectName, result.added, result.isNew);
          // Clear selection after adding
          this.clearSelection();
        },
        size: 'small'
      });
      
      addToProjectContainer.appendChild(this._selectionAddToProjectBtn.render());
    }
    
    return toolbar;
  }

  /**
   * Toggle selection for a single document
   * @param {string} docId - Document ID
   * @param {boolean} selected - Whether to select or deselect
   */
  toggleDocumentSelection(docId, selected) {
    if (selected) {
      this.selectedDocIds.add(docId);
    } else {
      this.selectedDocIds.delete(docId);
    }
    
    this.updateSelectionUI();
    
    // Notify callback
    if (this.options.onSelectionChange) {
      this.options.onSelectionChange([...this.selectedDocIds]);
    }
  }

  /**
   * Toggle select all documents
   * @param {Array} documents - Current document list
   * @param {boolean} selected - Whether to select or deselect all
   */
  toggleSelectAll(documents, selected) {
    if (selected) {
      documents.forEach(doc => this.selectedDocIds.add(doc.id));
    } else {
      this.selectedDocIds.clear();
    }
    
    // Update all checkboxes
    const checkboxes = this.container.querySelectorAll('.doc-select-checkbox');
    checkboxes.forEach(cb => {
      cb.checked = selected;
    });
    
    this.updateSelectionUI();
    
    // Notify callback
    if (this.options.onSelectionChange) {
      this.options.onSelectionChange([...this.selectedDocIds]);
    }
  }

  /**
   * Update the select-all checkbox state
   * @param {Array} documents - Current document list
   * @param {HTMLInputElement} checkbox - Select all checkbox element
   */
  updateSelectAllState(documents, checkbox) {
    const allSelected = documents.length > 0 && documents.every(doc => this.selectedDocIds.has(doc.id));
    const someSelected = documents.some(doc => this.selectedDocIds.has(doc.id));
    
    checkbox.checked = allSelected;
    checkbox.indeterminate = someSelected && !allSelected;
  }

  /**
   * Update selection UI (toolbar visibility and count)
   */
  updateSelectionUI() {
    const toolbar = this.container.querySelector('#doc-selection-toolbar');
    if (!toolbar) return;
    
    const selectedCount = this.selectedDocIds.size;
    const hasSelection = selectedCount > 0;
    
    toolbar.classList.toggle('hidden', !hasSelection);
    
    const countEl = toolbar.querySelector('.document-selection-count');
    if (countEl) {
      countEl.textContent = `${selectedCount} selected`;
    }
    
    // Update select-all checkbox
    const selectAllCheckbox = this.container.querySelector('.doc-select-header');
    if (selectAllCheckbox && this.data?.documents) {
      const documents = this.data.documents.slice(0, this.options.maxItems);
      this.updateSelectAllState(documents, selectAllCheckbox);
    }
  }

  /**
   * Clear all selections
   */
  clearSelection() {
    this.selectedDocIds.clear();
    
    // Uncheck all checkboxes
    const checkboxes = this.container.querySelectorAll('.doc-select-checkbox');
    checkboxes.forEach(cb => {
      cb.checked = false;
    });
    
    // Update select-all checkbox
    const selectAllCheckbox = this.container.querySelector('.doc-select-header');
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
    }
    
    this.updateSelectionUI();
    
    // Notify callback
    if (this.options.onSelectionChange) {
      this.options.onSelectionChange([]);
    }
  }

  /**
   * Get currently selected document IDs
   * @returns {string[]}
   */
  getSelectedDocumentIds() {
    return [...this.selectedDocIds];
  }

  /**
   * Open the Add to Project modal
   */
  openAddToProjectModal() {
    const selectedIds = this.getSelectedDocumentIds();
    if (selectedIds.length === 0) return;
    
    const modal = getAddToProjectModal();
    modal.open(selectedIds, (result) => {
      // Clear selection after adding
      this.clearSelection();
      
      // Show toast notification
      this.showAddToProjectFeedback(result);
    });
  }

  /**
   * Show feedback after adding to project
   * @param {Object} result - Result from modal
   */
  showAddToProjectFeedback(result) {
    // Create a temporary toast notification
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      background: var(--accent-success, #22c55e);
      color: white;
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.2s ease-out;
    `;
    
    if (result.isNew) {
      toast.textContent = `Created "${result.projectName}" with ${result.added} documents`;
    } else if (result.alreadyExisted > 0) {
      toast.textContent = `Added ${result.added} new documents to "${result.projectName}" (${result.alreadyExisted} already existed)`;
    } else {
      toast.textContent = `Added ${result.added} documents to "${result.projectName}"`;
    }
    
    document.body.appendChild(toast);
    
    // Remove after display duration
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = `opacity ${TOAST_FADE_DURATION}ms`;
      setTimeout(() => toast.remove(), TOAST_FADE_DURATION);
    }, TOAST_DISPLAY_DURATION);
  }

  /**
   * Clean up and destroy the component
   */
  destroy() {
    this.removeKeyboardNavigation();
    if (this.contentRenderer) {
      this.contentRenderer.destroy?.();
      this.contentRenderer = null;
    }
    super.destroy();
  }
}

export default DocumentTable;
