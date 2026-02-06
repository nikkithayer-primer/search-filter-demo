/**
 * DocumentContentRenderer.js
 * Renders document content based on document type
 * Supports: social_post, news_article, internal, and structured data types
 * Includes highlight and comment annotations
 */

import { BaseComponent } from './BaseComponent.js';
import { 
  DOCUMENT_TYPES, 
  DOCUMENT_TYPE_INFO,
  PLACEHOLDERS,
  formatPortionMark 
} from '../utils/classification.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import { renderPortionMark } from './ClassificationBanner.js';
import { dataStore } from '../data/DataStore.js';

export class DocumentContentRenderer extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      showPortionMarks: true,
      showAnnotations: true,
      ...options
    });
    this.activeCommentThread = null;
    this._documentClickHandler = null;
  }

  /**
   * Check if portion marks should be shown (respects settings)
   */
  shouldShowPortionMarks() {
    const settings = dataStore.getSettings();
    return this.options.showPortionMarks && settings.showClassification;
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  /**
   * Get user initials from display name
   */
  getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  formatRelativeTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return this.formatDate(dateString);
  }

  render() {
    this.clear();

    if (!this.data || !this.data.document) {
      this.showEmptyState('No document to display');
      return;
    }

    const doc = this.data.document;
    const docType = doc.documentType || 'news_article';
    const highlights = this.data.highlights || [];
    const comments = this.data.comments || [];

    switch (docType) {
      case DOCUMENT_TYPES.SOCIAL_POST:
        this.renderSocialPost(doc, highlights, comments);
        break;
      case DOCUMENT_TYPES.NEWS_ARTICLE:
        this.renderNewsArticle(doc, highlights, comments);
        break;
      case DOCUMENT_TYPES.INTERNAL:
        this.renderInternalDocument(doc, highlights, comments);
        break;
      case DOCUMENT_TYPES.CORPORATE_RECORD:
      case DOCUMENT_TYPES.WATCHLIST_MATCH:
      case DOCUMENT_TYPES.POLITICAL_FINANCE:
      case DOCUMENT_TYPES.EVENT_ATTENDANCE:
        this.renderStructuredDataDocument(doc, highlights, comments);
        break;
      default:
        this.renderNewsArticle(doc, highlights, comments);
    }

    // Bind event listeners for annotations
    this.bindAnnotationEvents();
  }

  bindAnnotationEvents() {
    // Bind highlight hover events
    const highlightElements = this.container.querySelectorAll('.user-highlight');
    highlightElements.forEach(el => {
      el.addEventListener('mouseenter', (e) => this.showHighlightTooltip(e));
      el.addEventListener('mouseleave', (e) => this.hideHighlightTooltip(e));
    });

    // Bind comment marker click events
    const commentMarkers = this.container.querySelectorAll('.comment-marker');
    commentMarkers.forEach(marker => {
      marker.addEventListener('click', (e) => this.toggleCommentThread(e, marker));
    });

    // Remove any existing document click handler before adding a new one
    if (this._documentClickHandler) {
      document.removeEventListener('click', this._documentClickHandler);
    }

    // Close comment thread when clicking outside
    this._documentClickHandler = (e) => {
      if (this.activeCommentThread && 
          !e.target.closest('.comment-thread-popover') && 
          !e.target.closest('.comment-marker')) {
        this.closeCommentThread();
      }
    };
    document.addEventListener('click', this._documentClickHandler);
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    if (this._documentClickHandler) {
      document.removeEventListener('click', this._documentClickHandler);
      this._documentClickHandler = null;
    }
    this.activeCommentThread = null;
    super.destroy();
  }

  showHighlightTooltip(event) {
    // Tooltip is rendered inline, CSS handles visibility
  }

  hideHighlightTooltip(event) {
    // Tooltip is rendered inline, CSS handles visibility
  }

  toggleCommentThread(event, marker) {
    event.stopPropagation();
    const commentId = marker.dataset.commentId;
    const existingPopover = this.container.querySelector('.comment-thread-popover');
    
    if (existingPopover) {
      const isCurrentComment = existingPopover.dataset.commentId === commentId;
      existingPopover.remove();
      this.activeCommentThread = null;
      
      if (isCurrentComment) return; // Close if clicking same marker
    }

    // Find the comment data
    const comments = this.data.comments || [];
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    // Create and show popover
    const popoverHtml = this.renderCommentThreadPopover(comment);
    marker.closest('.content-block-wrapper').insertAdjacentHTML('beforeend', popoverHtml);
    this.activeCommentThread = commentId;

    // Bind close button
    const closeBtn = this.container.querySelector('.comment-thread-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCommentThread());
    }
  }

  closeCommentThread() {
    const popover = this.container.querySelector('.comment-thread-popover');
    if (popover) {
      popover.remove();
    }
    this.activeCommentThread = null;
  }

  renderCommentThreadPopover(comment) {
    const repliesHtml = (comment.replies || []).map(reply => `
      <div class="comment-item comment-reply">
        <div class="comment-avatar">
          <span class="avatar-initials">${this.getInitials(reply.user?.displayName)}</span>
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-author ${reply.user?.isCurrentUser ? 'current-user' : ''}">${reply.user?.displayName || 'Unknown'}</span>
            <span class="comment-time">${this.formatRelativeTime(reply.createdAt)}</span>
          </div>
          <div class="comment-text">${this.escapeHtml(reply.content)}</div>
        </div>
      </div>
    `).join('');

    return `
      <div class="comment-thread-popover" data-comment-id="${comment.id}">
        <div class="comment-thread-header">
          <span>Thread</span>
          <button class="comment-thread-close" aria-label="Close">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        ${comment.anchorText ? `
          <div class="comment-thread-anchor-text">"${this.escapeHtml(comment.anchorText)}"</div>
        ` : ''}
        <div class="comment-thread-body">
          <div class="comment-item">
            <div class="comment-avatar">
              <span class="avatar-initials">${this.getInitials(comment.user?.displayName)}</span>
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-author ${comment.user?.isCurrentUser ? 'current-user' : ''}">${comment.user?.displayName || 'Unknown'}</span>
                <span class="comment-time">${this.formatRelativeTime(comment.createdAt)}</span>
              </div>
              <div class="comment-text">${this.escapeHtml(comment.content)}</div>
            </div>
          </div>
          ${repliesHtml}
        </div>
        <div class="comment-input-container">
          <textarea class="comment-input" placeholder="Reply..." rows="1"></textarea>
          <div class="comment-submit-row">
            <button class="btn btn-small btn-primary">Reply</button>
          </div>
        </div>
      </div>
    `;
  }

  renderSocialPost(doc, highlights = [], comments = []) {
    const media = doc.media || [];
    const video = doc.video;
    const isTikTok = doc.publisherId?.includes('tiktok');

    // Handle TikTok-style video (9:16 aspect ratio) - video player only
    let videoPlayerHtml = '';
    if (video) {
      videoPlayerHtml = `
        <div class="tiktok-video-container">
          <div class="tiktok-video-placeholder">
            <img src="${video.thumbnailUrl || PLACEHOLDERS.video}" alt="Video thumbnail">
          </div>
          <div class="tiktok-play-button">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      `;
    }

    // Transcription (separate from video player for TikToks)
    const transcriptionHtml = doc.transcription ? `
      <div class="tiktok-transcription">
        <div class="tiktok-transcription-label">Transcription</div>
        <div class="tiktok-transcription-text">${this.escapeHtml(doc.transcription)}</div>
      </div>
    ` : '';

    // Handle regular media (images, etc.)
    const mediaHtml = media.length > 0 ? `
      <div class="social-post-media ${media.length === 1 ? 'single-image' : 'multi-image'}">
        ${media.map(m => `
          <div class="social-post-media-item">
            ${m.type === 'video' 
              ? `<img src="${m.url || PLACEHOLDERS.video}" alt="${m.altText || 'Video'}">`
              : `<img src="${m.url || PLACEHOLDERS.image}" alt="${m.altText || 'Image'}">`
            }
          </div>
        `).join('')}
      </div>
    ` : '';

    // Render content blocks
    const contentBlocks = doc.contentBlocks || [];
    const contentHtml = contentBlocks.length > 0 
      ? this.renderContentBlocks(contentBlocks, this.shouldShowPortionMarks(), highlights, comments)
      : (doc.excerpt ? `<p class="social-post-text">${this.escapeHtml(doc.excerpt)}</p>` : '');

    // For TikToks: video → caption → transcription
    // For other social posts: video+transcription → content → media
    const html = isTikTok ? `
      <div class="social-post">
        ${videoPlayerHtml}
        <div class="social-post-content">${contentHtml}</div>
        ${transcriptionHtml}
      </div>
    ` : `
      <div class="social-post">
        ${videoPlayerHtml}
        ${transcriptionHtml}
        <div class="social-post-content">${contentHtml}</div>
        ${mediaHtml}
      </div>
    `;

    this.container.innerHTML = html;
  }

  renderTikTok(doc, highlights = [], comments = []) {
    const video = doc.video || {};

    // Render content blocks
    const contentBlocks = doc.contentBlocks || [];
    const contentHtml = contentBlocks.length > 0 
      ? this.renderContentBlocks(contentBlocks, this.shouldShowPortionMarks(), highlights, comments)
      : (doc.excerpt ? `<p class="social-post-text">${this.escapeHtml(doc.excerpt)}</p>` : '');

    const html = `
      <div class="tiktok-post">
        <div class="tiktok-video-container">
          <div class="tiktok-video-placeholder">
            <img src="${video.thumbnailUrl || PLACEHOLDERS.video}" alt="Video thumbnail">
          </div>
          <div class="tiktok-play-button">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>

        <div class="social-post-content">${contentHtml}</div>

        ${doc.transcription ? `
          <div class="tiktok-transcription">
            <div class="tiktok-transcription-label">Transcription</div>
            <div class="tiktok-transcription-text">${this.escapeHtml(doc.transcription)}</div>
          </div>
        ` : ''}
      </div>
    `;

    this.container.innerHTML = html;
  }

  renderNewsArticle(doc, highlights = [], comments = []) {
    const contentBlocks = doc.contentBlocks || [];
    const headerImage = doc.headerImage;

    const headerImageHtml = headerImage ? `
      <div class="news-article-header-image">
        <img src="${headerImage.url || PLACEHOLDERS.image}" alt="${headerImage.caption || 'Header image'}">
        ${headerImage.caption ? `<div class="news-article-image-caption">${headerImage.caption}</div>` : ''}
      </div>
    ` : '';

    const contentHtml = contentBlocks.length > 0 
      ? this.renderContentBlocks(contentBlocks, this.options.showPortionMarks, highlights, comments)
      : ((doc.excerpt || doc.summary) ? `<p class="news-article-paragraph">${this.escapeHtml(doc.excerpt || doc.summary)}</p>` : '');

    const html = `
      <div class="news-article">
        ${headerImageHtml}
        
        ${doc.author ? `
          <div class="news-article-byline">
            By <span class="news-article-byline-author">${doc.author}</span>
          </div>
        ` : ''}
        
        <div class="news-article-content document-content-wrapper">
          ${contentHtml}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  renderInternalDocument(doc, highlights = [], comments = []) {
    const contentBlocks = doc.contentBlocks || [];

    const contentHtml = contentBlocks.length > 0 
      ? this.renderContentBlocks(contentBlocks, true, highlights, comments)
      : ((doc.excerpt || doc.summary) ? `<p class="internal-document-paragraph">${this.escapeHtml(doc.excerpt || doc.summary)}</p>` : '');

    const html = `
      <div class="internal-document">
        <div class="internal-document-header">
          ${doc.department ? `<div class="internal-document-department">${doc.department}</div>` : ''}
          <div class="internal-document-meta">
            ${doc.author ? `<span>Author: ${doc.author}</span>` : ''}
            ${(doc.publishedDate) ? `<span>${this.formatDate(doc.publishedDate)}</span>` : ''}
          </div>
        </div>
        
        <div class="internal-document-content document-content-wrapper">
          ${contentHtml}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Render structured data documents (corporate_record, watchlist_match, political_finance, event_attendance)
   */
  renderStructuredDataDocument(doc, highlights = [], comments = []) {
    const structuredData = doc.structuredData || {};
    const contentBlocks = doc.contentBlocks || [];
    const typeInfo = DOCUMENT_TYPE_INFO[doc.documentType] || { label: 'Structured Data' };

    // Render the structured data fields
    const fieldsHtml = this.renderStructuredDataFields(structuredData, doc.documentType);

    // Render content blocks (narrative summary)
    const contentHtml = contentBlocks.length > 0 
      ? this.renderContentBlocks(contentBlocks, true, highlights, comments)
      : '';

    const html = `
      <div class="structured-data-document">
        <div class="structured-data-fields">
          ${fieldsHtml}
        </div>
        
        ${contentHtml ? `
          <div class="structured-data-narrative">
            <div class="structured-data-section-label">Summary</div>
            <div class="structured-data-content document-content-wrapper">
              ${contentHtml}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Render structured data fields as key-value pairs
   */
  renderStructuredDataFields(data, documentType) {
    if (!data || Object.keys(data).length === 0) {
      return '<p class="structured-data-empty">No structured data available</p>';
    }

    // Define field display configuration by document type
    const fieldConfig = this.getFieldConfig(documentType);
    
    // Group fields by category
    const groupedFields = this.groupFieldsByCategory(data, fieldConfig);
    
    return Object.entries(groupedFields).map(([category, fields]) => {
      const fieldsHtml = fields.map(({ key, label, value, type }) => {
        const formattedValue = this.formatFieldValue(value, type, key);
        if (formattedValue === null || formattedValue === '') return '';
        
        return `
          <div class="structured-data-field">
            <div class="structured-data-label">${label}</div>
            <div class="structured-data-value ${type === 'flags' ? 'structured-data-flags' : ''}">${formattedValue}</div>
          </div>
        `;
      }).filter(Boolean).join('');

      if (!fieldsHtml) return '';

      return `
        <div class="structured-data-group">
          ${category !== 'main' ? `<div class="structured-data-group-label">${category}</div>` : ''}
          ${fieldsHtml}
        </div>
      `;
    }).filter(Boolean).join('');
  }

  /**
   * Get field configuration based on document type
   */
  getFieldConfig(documentType) {
    const configs = {
      corporate_record: {
        main: [
          { key: 'companyName', label: 'Company Name' },
          { key: 'entityType', label: 'Entity Type' },
          { key: 'status', label: 'Status', type: 'status' },
          { key: 'jurisdiction', label: 'Jurisdiction' },
          { key: 'registrationNumber', label: 'Registration #' },
          { key: 'incorporationDate', label: 'Incorporated', type: 'date' }
        ],
        'Registration Details': [
          { key: 'registeredAddress', label: 'Registered Address' },
          { key: 'source', label: 'Source' }
        ],
        'Ownership & Management': [
          { key: 'beneficialOwners', label: 'Beneficial Owners', type: 'list' },
          { key: 'directors', label: 'Directors', type: 'list' }
        ],
        'Flags': [
          { key: 'flags', label: 'Flags', type: 'flags' }
        ]
      },
      watchlist_match: {
        main: [
          { key: 'matchedName', label: 'Matched Name' },
          { key: 'matchType', label: 'Match Type', type: 'status' },
          { key: 'matchStatus', label: 'Status', type: 'status' },
          { key: 'listName', label: 'List' },
          { key: 'program', label: 'Program' }
        ],
        'Listing Details': [
          { key: 'listingId', label: 'Listing ID' },
          { key: 'dateAdded', label: 'Date Added', type: 'date' },
          { key: 'listingReason', label: 'Reason' },
          { key: 'matchedAliases', label: 'Aliases', type: 'list' }
        ],
        'Sanctions': [
          { key: 'sanctionTypes', label: 'Sanction Types', type: 'list' }
        ],
        'Review': [
          { key: 'reviewedBy', label: 'Reviewed By' },
          { key: 'reviewDate', label: 'Review Date', type: 'date' }
        ]
      },
      political_finance: {
        main: [
          { key: 'filer', label: 'Filer' },
          { key: 'filingType', label: 'Filing Type' },
          { key: 'amount', label: 'Amount', type: 'currency' },
          { key: 'reportingPeriod', label: 'Period' }
        ],
        'Filing Details': [
          { key: 'filingId', label: 'Filing ID' },
          { key: 'source', label: 'Source' },
          { key: 'client', label: 'Client' }
        ],
        'Lobbying Activity': [
          { key: 'issuesLobbied', label: 'Issues', type: 'list' },
          { key: 'agenciesLobbied', label: 'Agencies', type: 'list' },
          { key: 'lobbyists', label: 'Lobbyists', type: 'list' },
          { key: 'recipients', label: 'Recipients', type: 'list' }
        ],
        'Flags': [
          { key: 'flags', label: 'Flags', type: 'flags' }
        ]
      },
      event_attendance: {
        main: [
          { key: 'eventName', label: 'Event' },
          { key: 'eventDate', label: 'Date', type: 'date' },
          { key: 'venue', label: 'Venue' },
          { key: 'confidence', label: 'Confidence', type: 'status' }
        ],
        'Attendee': [
          { key: 'attendee', label: 'Attendee' },
          { key: 'role', label: 'Role' },
          { key: 'representingOrg', label: 'Representing' }
        ],
        'Observations': [
          { key: 'observedWith', label: 'Observed With', type: 'list' },
          { key: 'topics', label: 'Topics', type: 'list' }
        ],
        'Source': [
          { key: 'source', label: 'Source' }
        ]
      }
    };

    return configs[documentType] || { main: [] };
  }

  /**
   * Group fields by category based on config
   */
  groupFieldsByCategory(data, fieldConfig) {
    const grouped = {};
    
    Object.entries(fieldConfig).forEach(([category, fields]) => {
      const categoryFields = fields
        .filter(field => data[field.key] !== undefined && data[field.key] !== null)
        .map(field => ({
          key: field.key,
          label: field.label,
          value: data[field.key],
          type: field.type || 'text'
        }));
      
      if (categoryFields.length > 0) {
        grouped[category] = categoryFields;
      }
    });

    return grouped;
  }

  /**
   * Format field value based on type
   */
  formatFieldValue(value, type, key) {
    if (value === null || value === undefined) return null;
    
    switch (type) {
      case 'date':
        if (!value) return null;
        const date = new Date(value);
        return isNaN(date.getTime()) ? this.escapeHtml(value) : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      
      case 'currency':
        if (typeof value === 'number') {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(value);
        }
        return this.escapeHtml(value);
      
      case 'list':
        if (Array.isArray(value) && value.length > 0) {
          return `<ul class="structured-data-list">${value.map(item => 
            `<li>${this.escapeHtml(String(item))}</li>`
          ).join('')}</ul>`;
        }
        return null;
      
      case 'flags':
        if (Array.isArray(value) && value.length > 0) {
          return value.map(flag => 
            `<span class="structured-data-flag structured-data-flag-${this.escapeHtml(flag)}">${this.formatFlagLabel(flag)}</span>`
          ).join('');
        }
        return null;
      
      case 'status':
        const statusClass = this.getStatusClass(value);
        return `<span class="structured-data-status ${statusClass}">${this.formatStatusLabel(value)}</span>`;
      
      default:
        if (typeof value === 'boolean') {
          return value ? 'Yes' : 'No';
        }
        return this.escapeHtml(String(value));
    }
  }

  /**
   * Format flag label for display
   */
  formatFlagLabel(flag) {
    return flag.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  /**
   * Format status label for display
   */
  formatStatusLabel(status) {
    return String(status).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  /**
   * Get CSS class for status values
   */
  getStatusClass(status) {
    const statusLower = String(status).toLowerCase();
    if (['active', 'confirmed', 'exact', 'approved'].includes(statusLower)) {
      return 'status-positive';
    }
    if (['inactive', 'rejected', 'false_positive', 'expired'].includes(statusLower)) {
      return 'status-negative';
    }
    if (['pending', 'partial', 'review', 'under_investigation'].includes(statusLower)) {
      return 'status-warning';
    }
    return 'status-neutral';
  }

  renderContentBlocks(blocks, showPortionMarks = this.shouldShowPortionMarks(), highlights = [], comments = []) {
    return blocks.map((block, blockIndex) => {
      const portionMarkHtml = showPortionMarks && block.portionMark 
        ? renderPortionMark(block.portionMark) + ' '
        : '';

      // Get highlights and comments for this block
      const blockHighlights = highlights.filter(h => h.blockIndex === blockIndex);
      const blockComments = comments.filter(c => c.blockIndex === blockIndex);
      
      // Check if block has annotations
      const hasAnnotations = blockHighlights.length > 0 || blockComments.length > 0;
      
      // Render comment markers
      const commentMarkersHtml = blockComments.length > 0 ? blockComments.map(comment => `
        <div class="comment-marker" data-comment-id="${comment.id}" title="${comment.user?.displayName || 'Unknown'}: ${this.escapeHtml(comment.content.substring(0, 50))}...">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12z"/>
          </svg>
        </div>
      `).join('') : '';

      switch (block.type) {
        case 'heading':
          return `
            <div class="content-block-wrapper">
              ${commentMarkersHtml}
              <h3 class="news-article-heading">
                ${portionMarkHtml}${this.applyHighlights(this.escapeHtml(block.content), blockHighlights)}
              </h3>
            </div>
          `;
        
        case 'paragraph':
          return `
            <div class="content-block-wrapper">
              ${commentMarkersHtml}
              <p class="content-block-text">${portionMarkHtml}${this.applyHighlights(this.escapeHtml(block.content), blockHighlights)}</p>
            </div>
          `;
        
        case 'image':
          return `
            <div class="news-article-inline-image">
              <img src="${block.imageUrl || PLACEHOLDERS.image}" alt="${block.caption || 'Image'}">
              ${block.caption ? `<div class="news-article-image-caption">${block.caption}</div>` : ''}
            </div>
          `;
        
        case 'quote':
          return `
            <div class="content-block-wrapper">
              ${commentMarkersHtml}
              <blockquote class="news-article-quote">
                ${portionMarkHtml}${this.applyHighlights(this.escapeHtml(block.content), blockHighlights)}
              </blockquote>
            </div>
          `;
        
        case 'list':
          const items = Array.isArray(block.content) ? block.content : block.content.split('\n').filter(item => item.trim());
          return `
            <div class="content-block-wrapper">
              ${commentMarkersHtml}
              <ul class="news-article-list">
                ${items.map(item => `<li>${portionMarkHtml}${this.escapeHtml(item)}</li>`).join('')}
              </ul>
            </div>
          `;
        
        default:
          return `
            <div class="content-block-wrapper">
              ${commentMarkersHtml}
              <p>${portionMarkHtml}${this.applyHighlights(this.escapeHtml(block.content || ''), blockHighlights)}</p>
            </div>
          `;
      }
    }).join('');
  }

  /**
   * Apply highlights to text content
   * @param {string} text - The escaped HTML text
   * @param {Array} highlights - Array of highlight objects for this content
   * @returns {string} HTML with highlight spans applied
   */
  applyHighlights(text, highlights) {
    if (!highlights || highlights.length === 0) return text;
    
    // Sort highlights by start offset (descending) to apply from end to start
    // This prevents offset shifting when inserting HTML
    const sortedHighlights = [...highlights].sort((a, b) => b.startOffset - a.startOffset);
    
    let result = text;
    
    sortedHighlights.forEach(highlight => {
      const { startOffset, endOffset, user, createdAt, id } = highlight;
      
      // Make sure offsets are within bounds
      if (startOffset >= 0 && endOffset <= result.length && startOffset < endOffset) {
        const before = result.substring(0, startOffset);
        const highlighted = result.substring(startOffset, endOffset);
        const after = result.substring(endOffset);
        
        const tooltipHtml = `
          <span class="highlight-tooltip">
            <span class="highlight-tooltip-user">${user?.displayName || 'Unknown'}</span>
            <span class="highlight-tooltip-time">${this.formatRelativeTime(createdAt)}</span>
          </span>
        `;
        
        result = `${before}<span class="user-highlight" data-highlight-id="${id}">${highlighted}${tooltipHtml}</span>${after}`;
      }
    });
    
    return result;
  }

  /**
   * Apply highlights to social post content (single content field, no blockIndex)
   */
  applyContentHighlights(text, highlights) {
    // For social posts, highlights have blockIndex: null
    const contentHighlights = highlights.filter(h => h.blockIndex === null || h.blockIndex === undefined);
    return this.applyHighlights(text, contentHighlights);
  }

  escapeHtml(text) {
    return escapeHtml(text);
  }
}

export default DocumentContentRenderer;
