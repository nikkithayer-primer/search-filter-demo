/**
 * DocumentView.js
 * Detail view for a single document using the CardManager pattern
 * Supports multiple document types: social_post, tiktok, news_article, internal
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { ClassificationBanner, renderClassificationBadge } from '../components/ClassificationBanner.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';
import {
  CardManager,
  NarrativeListCard,
  ThemeListCard,
  NetworkGraphCard,
  MapCard,
  QuotesTableCard,
  ActivitiesTableCard
} from '../components/CardComponents.js';
import { 
  DOCUMENT_TYPES, 
  isSocialMedia, 
  hasTitle,
  getDocumentTypeInfo,
  getClassificationLevel
} from '../utils/classification.js';

export class DocumentView extends BaseView {
  constructor(container, documentId, options = {}) {
    super(container, options);
    this.documentId = documentId;
    this.cardManager = new CardManager(this);
  }

  formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  async render() {
    const doc = DataService.getDocument(this.documentId);
    if (!doc) {
      this.renderNotFound('Document');
      return;
    }

    // Fetch all related data
    const data = this.fetchDocumentData(doc);
    
    // Store data for card setup
    this._documentData = { doc, data };

    // Set up cards using CardManager
    this.setupCards(doc, data);

    // Build custom header (documents have a unique header format)
    const headerHtml = this.renderDocumentHeader(doc, data.publisher);

    // Build classification banner HTML
    const classificationBannerHtml = this.renderClassificationBanner(doc);

    // Get cards HTML from CardManager
    const cardsHtml = this.cardManager.getHtml();

    this.container.innerHTML = `
      ${classificationBannerHtml}
      ${headerHtml}
      <div class="content-area">
        <div class="content-grid">
          ${cardsHtml}
        </div>
      </div>
    `;

    // Initialize card width toggles
    const contentGrid = this.container.querySelector('.content-grid');
    if (contentGrid) {
      initAllCardToggles(contentGrid, `doc-${this.documentId}`);
    }

    // Initialize all card components via CardManager
    this.cardManager.initializeAll();
    
    // Set up keyboard navigation
    this.setupKeyboardNavigation();
  }

  /**
   * Set up cards using CardManager
   */
  setupCards(doc, data) {
    const personIds = data.persons.map(p => p.id);
    const orgIds = data.organizations.map(o => o.id);

    // Quotes Table (first card)
    const quotes = doc.quotes || [];
    if (quotes.length > 0) {
      this.cardManager.add(new QuotesTableCard(this, 'doc-quotes', {
        title: 'Quotes',
        quotes: quotes,
        halfWidth: true
      }));
    }

    // Activities Table (second card)
    const activities = doc.activities || [];
    if (activities.length > 0) {
      this.cardManager.add(new ActivitiesTableCard(this, 'doc-activities', {
        title: 'Activities',
        activities: activities,
        halfWidth: true
      }));
    }

    // Related Narratives
    if (data.narratives.length > 0) {
      this.cardManager.add(new NarrativeListCard(this, 'doc-narratives', {
        title: 'Related Narratives',
        narratives: data.narratives,
        maxItems: 10,
        showDescriptionToggle: true
      }));
    }

    // Related Themes
    if (data.themes.length > 0) {
      this.cardManager.add(new ThemeListCard(this, 'doc-themes', {
        title: 'Related Themes',
        themes: data.themes,
        maxItems: 10,
        showDescriptionToggle: true
      }));
    }

    // People & Organizations Network
    if (data.hasNetwork) {
      this.cardManager.add(new NetworkGraphCard(this, 'doc-network', {
        title: 'Mentioned People & Organizations',
        personIds: personIds,
        orgIds: orgIds,
        height: 350
      }));
    }

    // Locations & Events Map
    if (data.locations.length > 0 || data.events.length > 0) {
      this.cardManager.add(new MapCard(this, 'doc-map', {
        title: 'Locations & Events',
        locations: data.locations,
        events: data.events,
        height: 300,
        showViewToggle: data.events.length > 0
      }));
    }
  }

  /**
   * Set up keyboard navigation for document reader
   * Spacebar: next document, Delete/Backspace: previous document
   */
  setupKeyboardNavigation() {
    this.addListener(document, 'keydown', (e) => {
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
      }
    });
  }

  /**
   * Get ordered list of document IDs
   */
  getDocumentIds() {
    const documents = DataService.getDocuments();
    // Sort by publishedDate descending (newest first)
    return documents
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .map(d => d.id);
  }

  /**
   * Navigate to the next document in the list
   */
  navigateToNextDocument() {
    const documentIds = this.getDocumentIds();
    const currentIndex = documentIds.indexOf(this.documentId);
    
    if (currentIndex === -1) return;
    
    // Get next index, wrap around to beginning if at end
    const nextIndex = (currentIndex + 1) % documentIds.length;
    const nextDocId = documentIds[nextIndex];
    
    // Use context-aware routing
    const contextPrefix = this.context?.id ? `${this.context.id}/` : '';
    window.location.hash = `#/${contextPrefix}${nextDocId}/`;
  }

  /**
   * Navigate to the previous document in the list
   */
  navigateToPreviousDocument() {
    const documentIds = this.getDocumentIds();
    const currentIndex = documentIds.indexOf(this.documentId);
    
    if (currentIndex === -1) return;
    
    // Get previous index, wrap around to end if at beginning
    const prevIndex = (currentIndex - 1 + documentIds.length) % documentIds.length;
    const prevDocId = documentIds[prevIndex];
    
    // Use context-aware routing
    const contextPrefix = this.context?.id ? `${this.context.id}/` : '';
    window.location.hash = `#/${contextPrefix}${prevDocId}/`;
  }

  /**
   * Clean up components
   */
  destroy() {
    // Destroy CardManager components
    if (this.cardManager) {
      this.cardManager.destroyAll();
    }
    super.destroy();
  }

  fetchDocumentData(doc) {
    const publisher = DataService.getPublisherForDocument(this.documentId);
    const narratives = DataService.getNarrativesForDocument(this.documentId);
    const themes = DataService.getThemesForDocument(this.documentId);
    const persons = DataService.getPersonsForDocument(this.documentId);
    const organizations = DataService.getOrganizationsForDocument(this.documentId);
    const locations = DataService.getLocationsForDocument(this.documentId);
    const events = DataService.getEventsForDocument(this.documentId);
    const hasNetwork = persons.length > 0 || organizations.length > 0;

    return {
      publisher, narratives, themes, persons, organizations, locations, events, hasNetwork
    };
  }

  renderClassificationBanner(doc) {
    const classification = doc.classification || 'U';
    
    // Only show banner for classified documents (not U)
    if (classification === 'U') {
      return '';
    }

    const level = getClassificationLevel(classification);
    if (!level) return '';

    return `
      <div class="classification-banner classification-banner-${classification.toLowerCase()}">
        ${level.fullName}
      </div>
    `;
  }

  renderDocumentHeader(doc, publisher) {
    const breadcrumbsHtml = PageHeader.renderBreadcrumbs([
      { label: 'Common Operating Picture', href: '#/cop' },
      'Document'
    ]);

    const docType = doc.documentType || 'news_article';
    const typeInfo = getDocumentTypeInfo(docType);
    const showTitle = hasTitle(docType);
    const isSocial = isSocialMedia(docType);
    
    const dateValue = doc.publishedDate;

    // Publisher badge with color (or neutral for internal)
    const publisherHtml = publisher ? `
      <div class="document-publisher-badge" ${publisher.color ? `style="background: ${publisher.color}20; border-color: ${publisher.color}40; color: ${publisher.color}"` : ''}>
        ${publisher.name}
      </div>
    ` : '';

    // Document type label
    const typeBadgeHtml = typeInfo.label;

    // Classification badge (small, in header)
    const classification = doc.classification || 'U';
    const classificationBadgeHtml = renderClassificationBadge(classification);

    // For social posts: show author info instead of title
    const socialHeaderHtml = isSocial && doc.author ? `
      <div class="document-social-author">
        <span class="social-author-name">${doc.author.displayName || 'Unknown'}</span>
        <span class="social-author-username">${doc.author.username || ''}</span>
      </div>
    ` : '';

    // Action button - different for internal docs (no URL)
    const actionButtonHtml = doc.url ? `
      <div class="document-actions">
        <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2h8v8M14 2L6 10"/>
          </svg>
          View Original Source
        </a>
      </div>
    ` : '';

    // Support both excerpt and summary field names
    const excerptValue = doc.excerpt || doc.summary;

    return `
      <div class="page-header">
        ${breadcrumbsHtml}
        <div class="document-detail-header">
          ${publisherHtml}
          ${typeBadgeHtml}
          ${classificationBadgeHtml}
          <span class="document-date-detail">${this.formatDate(dateValue)}</span>
        </div>
        ${showTitle && doc.title ? `<h1>${doc.title}</h1>` : socialHeaderHtml}
        ${showTitle && excerptValue ? `
          <p class="document-excerpt-detail">${excerptValue}</p>
        ` : ''}
        ${actionButtonHtml}
      </div>
    `;
  }
}

export default DocumentView;
