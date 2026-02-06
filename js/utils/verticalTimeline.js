/**
 * verticalTimeline.js
 * Shared utility for rendering vertical event timelines
 * Used across DashboardView and ListView
 */

import { DataService } from '../data/DataService.js';

/**
 * Render a vertical timeline HTML for an array of events
 * @param {Array} events - Array of event objects with date, text, id, parentEventId
 * @param {Object} options - Configuration options
 * @param {boolean} options.sortNewestFirst - Sort events newest first (default: true)
 * @param {string} options.emptyIcon - Icon to show when no events (default: '📅')
 * @param {string} options.emptyText - Text to show when no events (default: 'No events to display')
 * @returns {string} - HTML string for the vertical timeline
 */
export function renderVerticalTimeline(events, options = {}) {
  const {
    sortNewestFirst = true,
    emptyIcon = '📅',
    emptyText = 'No events to display'
  } = options;

  if (!events || events.length === 0) {
    return `
      <div class="vertical-timeline-empty">
        <div class="vertical-timeline-empty-icon">${emptyIcon}</div>
        <p class="vertical-timeline-empty-text">${emptyText}</p>
      </div>
    `;
  }

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortNewestFirst ? dateB - dateA : dateA - dateB;
  });

  // Group events by month/year for separators
  let currentMonth = null;
  const itemsHtml = sortedEvents.map(event => {
    const date = new Date(event.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const isSubEvent = event.parentEventId != null;
    
    // Format date parts
    const dayStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // Get location if available
    const location = DataService.getLocationForEvent(event.id);
    const locationHtml = location ? `
      <span class="vertical-timeline-location">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
          <circle cx="8" cy="6" r="2"/>
        </svg>
        ${location.name}
      </span>
    ` : '';

    // Check if we need a month separator
    let separatorHtml = '';
    if (monthKey !== currentMonth) {
      currentMonth = monthKey;
      const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      separatorHtml = `
        <div class="vertical-timeline-separator">
          <span class="vertical-timeline-separator-label">${monthLabel}</span>
        </div>
      `;
    }

    return `
      ${separatorHtml}
      <div class="vertical-timeline-item" data-event-id="${event.id}">
        <div class="vertical-timeline-marker ${isSubEvent ? 'sub-event' : ''}"></div>
        <div class="vertical-timeline-date">
          <div class="vertical-timeline-date-day">${dayStr}</div>
          <div class="vertical-timeline-date-time">${timeStr}</div>
        </div>
        <div class="vertical-timeline-content">
          <div class="vertical-timeline-text">${event.text}</div>
          <div class="vertical-timeline-meta">
            ${locationHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `<div class="vertical-timeline">${itemsHtml}</div>`;
}
