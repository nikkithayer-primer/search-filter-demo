/**
 * formatters.js
 * Shared formatting utilities for the application
 * Single source of truth for all formatting functions
 */

/**
 * Normalize sentiment value to -1 to 1 range
 * @param {number} sentiment
 * @returns {number} Value between -1 and 1
 */
export function normalizeSentiment(sentiment) {
  if (typeof sentiment === 'string') {
    // Handle numeric strings
    const parsed = parseFloat(sentiment);
    if (!isNaN(parsed)) {
      return Math.max(-1, Math.min(1, parsed));
    }
    return 0;
  }
  if (typeof sentiment !== 'number' || isNaN(sentiment)) {
    return 0;
  }
  return Math.max(-1, Math.min(1, sentiment));
}

/**
 * Get sentiment CSS class based on numeric sentiment value
 * @param {number} sentiment
 * @returns {string} CSS class suffix ('positive', 'neutral', or 'negative')
 */
export function getSentimentClass(sentiment) {
  const value = normalizeSentiment(sentiment);
  if (value < -0.2) return 'negative';
  if (value > 0.2) return 'positive';
  return 'neutral';
}

/**
 * Format sentiment value for display as a label
 * @param {number|string} sentiment
 * @returns {string} Human-readable sentiment label
 */
export function formatSentiment(sentiment) {
  const value = normalizeSentiment(sentiment);
  if (value <= -0.6) return 'Very Negative';
  if (value <= -0.2) return 'Negative';
  if (value < 0.2) return 'Neutral';
  if (value < 0.6) return 'Positive';
  return 'Very Positive';
}

/**
 * Format sentiment value as a number string
 * @param {number|string} sentiment
 * @returns {string} Formatted number (e.g., "+0.75", "-0.25", "0.00")
 */
export function formatSentimentValue(sentiment) {
  const value = normalizeSentiment(sentiment);
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}`;
}

/**
 * Get sentiment color based on numeric sentiment value
 * @param {number} sentiment - Numeric value from -1 to 1
 * @returns {string} CSS color value
 */
export function getSentimentColor(sentiment) {
  const value = normalizeSentiment(sentiment);
  
  // Simple binary: negative = red, positive = green
  if (value < 0) {
    return '#E57373'; // var(--sentiment-negative)
  } else {
    return '#66BB6A'; // var(--sentiment-positive)
  }
}

/**
 * Format number with locale string and abbreviations
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1.2M", "5.3K", "123")
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

/**
 * Format date for display (short: "Jan 15")
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const d = new Date(date);
  return d3.timeFormat('%b %d')(d);
}

/**
 * Format date with year (medium: "Jan 15, 2024")
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string with year
 */
export function formatDateWithYear(date) {
  const d = new Date(date);
  return d3.timeFormat('%b %d, %Y')(d);
}

/**
 * Format date long (full month: "January 15, 2024")
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string with full month and year
 */
export function formatDateLong(date) {
  const d = new Date(date);
  return d3.timeFormat('%B %d, %Y')(d);
}

/**
 * Format date with time ("Jan 15, 14:30")
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string with time
 */
export function formatDateTime(date) {
  const d = new Date(date);
  return d3.timeFormat('%b %d, %H:%M')(d);
}

/**
 * Format date with time long ("January 15, 2024 14:30")
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string with full month, year and time
 */
export function formatDateTimeLong(date) {
  const d = new Date(date);
  return d3.timeFormat('%B %d, %Y %H:%M')(d);
}

/**
 * Format date with full details (uses native JS for localized output)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string with time
 */
export function formatDateFull(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Get d3 time format function for axis ticks
 * Use this when you need the formatter function itself (not the formatted string)
 * @param {string} format - d3 time format string (default: '%b %d')
 * @returns {Function} d3 time format function
 */
export function getTimeFormatter(format = '%b %d') {
  return d3.timeFormat(format);
}

/**
 * Status labels mapping for common statuses
 */
export const STATUS_LABELS = {
  'new': 'New',
  'in_progress': 'In Progress',
  'under_investigation': 'Investigating',
  'resolved': 'Resolved'
};

/**
 * Format a status value for display
 * @param {string} status - Status value (active, paused, archived, draft, etc.)
 * @returns {string} Formatted status string
 */
export function formatStatus(status) {
  if (!status) return 'Unknown';
  
  const statusMap = {
    'active': 'Active',
    'paused': 'Paused',
    'archived': 'Archived',
    'draft': 'Draft',
    'pending': 'Pending',
    'completed': 'Completed',
    'inactive': 'Inactive',
    ...STATUS_LABELS
  };
  
  return statusMap[status.toLowerCase()] || status;
}

/**
 * Truncate text to a maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 40)
 * @returns {string} Truncated text with ellipsis if needed
 */
export function truncateText(text, maxLength = 40) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Format a date as relative time (e.g., "2 hours ago", "3 days ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date) {
  if (!date) return '';
  
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  } else if (diffWeek < 4) {
    return `${diffWeek} week${diffWeek !== 1 ? 's' : ''} ago`;
  } else if (diffMonth < 12) {
    return `${diffMonth} month${diffMonth !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffYear} year${diffYear !== 1 ? 's' : ''} ago`;
  }
}
