/**
 * DocumentsView.js
 * List view for all documents with document viewer
 * Uses DocumentTable component with viewer mode enabled
 * Supports column filtering and publisher type filtering
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { DocumentTable } from '../components/DocumentTable.js';
import { ColumnFilter } from '../components/ColumnFilter.js';
import { PageHeader } from '../utils/PageHeader.js';
import { dataStore } from '../data/DataStore.js';

// All available columns with labels
const AVAILABLE_COLUMNS = {
  classification: 'Classification',
  documentType: 'Doc Type',
  publisherName: 'Publisher',
  publisherType: 'Publisher Type',
  title: 'Title',
  excerpt: 'Excerpt',
  publishedDate: 'Published',
  narratives: 'Narratives',
  themes: 'Themes',
  events: 'Events',
  locations: 'Locations',
  persons: 'People',
  organizations: 'Organizations',
  factions: 'Factions',
  topics: 'Topics'
};

// Default columns to show
const DEFAULT_COLUMNS = ['classification', 'documentType', 'publisherName', 'title', 'publishedDate', 'narratives', 'persons'];

// Document type labels for display (matches what's shown in the Type column)
const DOCUMENT_TYPE_LABELS = {
  news_article: 'News Article',
  social_post: 'Social Post',
  tiktok: 'TikTok',
  internal: 'Internal'
};

/**
 * Get document type options dynamically from actual data
 * @returns {Object} Map of type keys to labels
 */
function getDocumentTypeOptions() {
  const documents = DataService.getDocuments();
  const types = new Set(documents.map(d => d.documentType).filter(Boolean));
  
  const options = { all: 'All Types' };
  for (const type of types) {
    options[type] = DOCUMENT_TYPE_LABELS[type] || type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  return options;
}

export class DocumentsView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
    this.documentTable = null;
    this.columnFilter = null;
    
    // Default columns
    this.selectedColumns = [...DEFAULT_COLUMNS];
    
    // Filter state - filter by document type (matches Type column)
    this.documentTypeFilter = 'all';
  }

  async render() {
    let documents = DataService.getDocuments();
    
    // Apply document type filter (matches what's shown in the Type column)
    if (this.documentTypeFilter !== 'all') {
      documents = documents.filter(doc => {
        const docType = doc.documentType || 'news_article';
        return docType === this.documentTypeFilter;
      });
    }
    
    // Sort by published date descending by default (support both field names)
    documents.sort((a, b) => {
      const dateA = new Date(a.publishedDate);
      const dateB = new Date(b.publishedDate);
      return dateB - dateA;
    });

    // Build document type options dynamically from actual data
    const documentTypeOptions = getDocumentTypeOptions();
    const documentTypeOptionsHtml = Object.entries(documentTypeOptions).map(([key, label]) => {
      const selected = this.documentTypeFilter === key ? 'selected' : '';
      return `<option value="${key}" ${selected}>${label}</option>`;
    }).join('');

    // Build page header using shared utility
    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Common Operating Picture', href: '#/cop' },
        'Documents'
      ],
      title: 'Documents',
      subtitle: `${documents.length} document${documents.length !== 1 ? 's' : ''}`
    });

    this.container.innerHTML = `
      ${headerHtml}

      <div class="content-area">
        <div class="card card-document-table">
          <div class="card-header">
            <span class="card-title">All Documents</span>
            <div class="card-header-actions">
              <!-- Expand Data Button -->
              <button class="btn btn-secondary btn-small" id="expand-data-btn">Expand data</button>
              
              <!-- Document Type Filter -->
              <div class="filter-control">
                <label class="filter-label">Type</label>
                <select id="document-type-filter" class="filter-select">
                  ${documentTypeOptionsHtml}
                </select>
              </div>
              
              <!-- Column Filter -->
              <div class="filter-control" id="column-filter-container"></div>
            </div>
          </div>
          <div class="card-body no-padding" id="documents-table-container"></div>
        </div>
      </div>
    `;

    // Check if classification should be shown
    const settings = dataStore.getSettings();
    const showClassification = settings.showClassification;
    
    // Filter available columns based on settings
    const availableColumns = { ...AVAILABLE_COLUMNS };
    if (!showClassification) {
      delete availableColumns.classification;
    }
    
    // Filter default columns based on settings
    const defaultColumns = showClassification 
      ? DEFAULT_COLUMNS 
      : DEFAULT_COLUMNS.filter(col => col !== 'classification');
    
    // Filter selected columns if classification is now hidden
    if (!showClassification && this.selectedColumns.includes('classification')) {
      this.selectedColumns = this.selectedColumns.filter(col => col !== 'classification');
    }
    
    // Initialize Column Filter component
    this.columnFilter = new ColumnFilter('column-filter-container', {
      availableColumns: availableColumns,
      defaultColumns: defaultColumns,
      requiredColumns: ['title'],
      onChange: (columns) => {
        this.selectedColumns = columns;
        if (this.documentTable) {
          this.documentTable.setColumns(columns);
        }
      }
    });
    this.columnFilter.setSelectedColumns(this.selectedColumns);
    this.columnFilter.render();

    // Initialize DocumentTable component with viewer mode
    this.documentTable = new DocumentTable('documents-table-container', {
      maxItems: 100,
      columns: this.selectedColumns,
      sortable: true,
      defaultSort: 'publishedDate',
      defaultSortDir: 'desc',
      enableViewerMode: true
    });

    this.documentTable.update({ documents });
    
    // Check for persisted viewer state in URL (e.g., #/documents?doc=doc-123)
    const hashParts = window.location.hash.split('?');
    if (hashParts[1]) {
      const urlParams = new URLSearchParams(hashParts[1]);
      const docId = urlParams.get('doc');
      if (docId) {
        const doc = documents.find(d => d.id === docId);
        if (doc) {
          // Open viewer without updating URL (it's already set)
          this.documentTable.openViewer(doc, false);
        }
      }
    }
    
    // Attach publisher type filter listener
    this.attachFilterListeners();
  }

  attachFilterListeners() {
    // Expand data button (placeholder)
    const expandDataBtn = document.getElementById('expand-data-btn');
    if (expandDataBtn) {
      this.addListener(expandDataBtn, 'click', () => {
        // Expand data functionality not yet implemented
      });
    }
    
    // Document type filter
    const documentTypeSelect = document.getElementById('document-type-filter');
    if (documentTypeSelect) {
      this.addListener(documentTypeSelect, 'change', (e) => {
        this.documentTypeFilter = e.target.value;
        this.render();
      });
    }
  }

  destroy() {
    if (this.columnFilter) {
      this.columnFilter.destroy();
      this.columnFilter = null;
    }
    
    if (this.documentTable) {
      this.documentTable.destroy();
      this.documentTable = null;
    }
    super.destroy();
  }
}

export default DocumentsView;
