/**
 * ActivityFeedView.js
 * View for displaying all comments and highlights across documents
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { formatRelativeTime, formatDate } from '../utils/formatters.js';

export class ActivityFeedView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
    this.selectedUserId = null; // null means "all users"
  }

  async render() {
    const activity = DataService.getAllActivity({ userId: this.selectedUserId });
    const activeUsers = DataService.getActiveUsers();
    
    // Get total counts for stats
    const allActivity = DataService.getAllActivity();
    const highlightCount = allActivity.filter(a => a.type === 'highlight').length;
    const commentCount = allActivity.filter(a => a.type === 'comment').length;
    const replyCount = allActivity.filter(a => a.type === 'reply').length;

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Common Operating Picture', href: '#/cop' },
        'Activity'
      ],
      title: 'Activity Feed',
      subtitle: `${highlightCount} highlight${highlightCount !== 1 ? 's' : ''}, ${commentCount} comment${commentCount !== 1 ? 's' : ''}, ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`
    });

    this.container.innerHTML = `
      ${headerHtml}
      
      <div class="content-area">
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-md);">
            <div style="display: flex; align-items: center; gap: var(--space-md);">
              <label class="form-label" style="margin: 0; white-space: nowrap;">Filter by user:</label>
              <select class="form-select" id="user-filter" style="min-width: 180px;">
                <option value="">All Users</option>
                ${activeUsers.map(user => `
                  <option value="${user.id}" ${this.selectedUserId === user.id ? 'selected' : ''}>
                    ${this.escapeHtml(user.displayName || user.name || user.username)}
                  </option>
                `).join('')}
              </select>
            </div>
            <span class="text-muted text-sm">
              ${activity.length} ${activity.length === 1 ? 'item' : 'items'}${this.selectedUserId ? ' from selected user' : ''}
            </span>
          </div>
          <div class="card-body no-padding">
            ${activity.length === 0 ? this.renderEmptyState() : this.renderActivityList(activity)}
          </div>
        </div>
      </div>
    `;

    this.setupEventHandlers();
  }

  /**
   * Render the activity feed list
   */
  renderActivityList(activity) {
    // Group activities by date
    const groupedByDate = this.groupByDate(activity);
    
    return `
      <div class="activity-feed">
        ${Object.entries(groupedByDate).map(([dateKey, items]) => `
          <div class="activity-date-group">
            <div class="activity-date-header">${dateKey}</div>
            <div class="activity-items">
              ${items.map(item => this.renderActivityItem(item)).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Group activity items by date
   */
  groupByDate(activity) {
    const groups = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    activity.forEach(item => {
      const date = new Date(item.createdAt);
      date.setHours(0, 0, 0, 0);
      
      let dateKey;
      if (date.getTime() === today.getTime()) {
        dateKey = 'Today';
      } else if (date.getTime() === yesterday.getTime()) {
        dateKey = 'Yesterday';
      } else {
        dateKey = formatDate(date);
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });

    return groups;
  }

  /**
   * Render a single activity item
   */
  renderActivityItem(item) {
    const userName = item.user?.displayName || item.user?.name || item.user?.username || 'Unknown User';
    const userInitials = this.getInitials(userName);
    const timeAgo = formatRelativeTime(item.createdAt);
    // Use documents view with doc query param (documents require context)
    const docLink = `<a href="#/documents?doc=${item.documentId}" class="doc-entity-link">${this.escapeHtml(this.truncateText(item.documentTitle, 60))}</a>`;
    
    let icon, actionHtml, contentHtml;
    
    switch (item.type) {
      case 'highlight':
        icon = this.getHighlightIcon();
        actionHtml = `highlighted ${docLink}`;
        contentHtml = `
          <div class="activity-highlight-text">"${this.escapeHtml(this.truncateText(item.highlightedText, 200))}"</div>
        `;
        break;
        
      case 'comment':
        icon = this.getCommentIcon();
        actionHtml = `commented in ${docLink}`;
        contentHtml = `
          ${item.anchorText ? `<div class="activity-anchor-text">"${this.escapeHtml(this.truncateText(item.anchorText, 100))}"</div>` : ''}
          <div class="activity-comment-content">${this.escapeHtml(item.content)}</div>
          ${item.replyCount > 0 ? `<div class="activity-reply-count">${item.replyCount} ${item.replyCount === 1 ? 'reply' : 'replies'}</div>` : ''}
        `;
        break;
        
      case 'reply':
        icon = this.getReplyIcon();
        actionHtml = `replied in ${docLink}`;
        contentHtml = `
          <div class="activity-comment-content">${this.escapeHtml(item.content)}</div>
          ${item.parentCommentContent ? `<div class="activity-parent-comment">In reply to: "${this.escapeHtml(this.truncateText(item.parentCommentContent, 80))}"</div>` : ''}
        `;
        break;
        
      default:
        return '';
    }

    return `
      <div class="activity-item activity-item--${item.type}" data-document-id="${item.documentId}">
        <div class="activity-item-avatar">
          <span class="avatar-initials">${userInitials}</span>
        </div>
        <div class="activity-item-content">
          <div class="activity-item-header">
            <div class="activity-item-header-text">
              <span class="activity-user-name">${this.escapeHtml(userName)}</span>
              <span class="activity-action">${actionHtml}</span>
            </div>
            <span class="activity-time">${timeAgo}</span>
          </div>
          <div class="activity-item-body">
            ${contentHtml}
          </div>
        </div>
        <div class="activity-item-type-icon">
          ${icon}
        </div>
      </div>
    `;
  }

  /**
   * Render empty state
   */
  renderEmptyState() {
    if (this.selectedUserId) {
      const user = DataService.getActiveUsers().find(u => u.id === this.selectedUserId);
      const userName = user?.displayName || user?.name || 'This user';
      return `
        <div class="empty-state" style="padding: var(--space-2xl);">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-bottom: var(--space-md);">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <h3 style="margin-bottom: var(--space-sm);">No Activity</h3>
          <p class="text-muted">${this.escapeHtml(userName)} has no comments or highlights yet.</p>
        </div>
      `;
    }
    
    return `
      <div class="empty-state" style="padding: var(--space-2xl);">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-bottom: var(--space-md);">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <h3 style="margin-bottom: var(--space-sm);">No Activity Yet</h3>
        <p class="text-muted" style="margin-bottom: var(--space-lg);">Comments and highlights on documents will appear here.</p>
      </div>
    `;
  }

  /**
   * Set up event handlers
   */
  setupEventHandlers() {
    // User filter dropdown
    const userFilter = this.container.querySelector('#user-filter');
    if (userFilter) {
      this.addListener(userFilter, 'change', (e) => {
        this.selectedUserId = e.target.value || null;
        this.render();
      });
    }

    // Click on activity items to navigate to document
    const activityItems = this.container.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
      this.addListener(item, 'click', (e) => {
        // Don't navigate if clicking on the document link itself
        if (e.target.closest('.doc-entity-link')) return;
        
        const documentId = item.dataset.documentId;
        if (documentId) {
          // Use documents view with doc query param (documents require context)
          window.location.hash = `#/documents?doc=${documentId}`;
        }
      });
    });
  }

  /**
   * Get user initials from name
   */
  getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  /**
   * Icon SVGs
   */
  getHighlightIcon() {
    return `
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M10.5 1.5l4 4-9 9H1.5v-4l9-9z"/>
        <path d="M8.5 3.5l4 4"/>
      </svg>
    `;
  }

  getCommentIcon() {
    return `
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M14 10a2 2 0 01-2 2H5l-3 3V4a2 2 0 012-2h8a2 2 0 012 2v6z"/>
      </svg>
    `;
  }

  getReplyIcon() {
    return `
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M6 8l-4 4V4l4 4z"/>
        <path d="M6 8h5a3 3 0 003-3V3"/>
      </svg>
    `;
  }
}

export default ActivityFeedView;
