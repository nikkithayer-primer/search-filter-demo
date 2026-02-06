/**
 * classification.js
 * Classification levels, document types, and related utilities
 */

// Classification levels ordered by sensitivity (lowest to highest)
export const CLASSIFICATION_LEVELS = {
  U: {
    code: 'U',
    name: 'Unclassified',
    fullName: 'Uncontrolled Unclassified',
    order: 0,
    color: '#22c55e',      // Green
    bgColor: '#22c55e',
    textColor: '#ffffff'
  },
  CUI: {
    code: 'CUI',
    name: 'CUI',
    fullName: 'Controlled Unclassified Information',
    order: 1,
    color: '#7c3aed',      // Purple
    bgColor: '#7c3aed',
    textColor: '#ffffff'
  },
  C: {
    code: 'C',
    name: 'Confidential',
    fullName: 'Confidential',
    order: 2,
    color: '#3b82f6',      // Blue
    bgColor: '#3b82f6',
    textColor: '#ffffff'
  },
  S: {
    code: 'S',
    name: 'Secret',
    fullName: 'Secret',
    order: 3,
    color: '#ef4444',      // Red
    bgColor: '#ef4444',
    textColor: '#ffffff'
  },
  TS: {
    code: 'TS',
    name: 'Top Secret',
    fullName: 'Top Secret',
    order: 4,
    color: '#f97316',      // Orange
    bgColor: '#f97316',
    textColor: '#ffffff'
  }
};

// Document types
export const DOCUMENT_TYPES = {
  SOCIAL_POST: 'social_post',
  NEWS_ARTICLE: 'news_article',
  INTERNAL: 'internal',
  // Structured data types
  CORPORATE_RECORD: 'corporate_record',
  WATCHLIST_MATCH: 'watchlist_match',
  POLITICAL_FINANCE: 'political_finance',
  EVENT_ATTENDANCE: 'event_attendance'
};

// Document type display info
export const DOCUMENT_TYPE_INFO = {
  social_post: {
    label: 'Social Post',
    icon: 'social',
    description: 'Social media posts from X, Facebook, Instagram, Reddit, TikTok'
  },
  news_article: {
    label: 'News Article',
    icon: 'news',
    description: 'News articles from media outlets'
  },
  internal: {
    label: 'Internal',
    icon: 'document',
    description: 'Internal documents and reports'
  },
  // Structured data types
  corporate_record: {
    label: 'Corporate Record',
    icon: 'building',
    description: 'Corporate filings, ownership records, and registry data'
  },
  watchlist_match: {
    label: 'Watchlist Match',
    icon: 'alert',
    description: 'Sanctions list and watchlist screening matches'
  },
  political_finance: {
    label: 'Political Finance',
    icon: 'finance',
    description: 'Campaign finance, lobbying disclosures, and FARA filings'
  },
  event_attendance: {
    label: 'Event Attendance',
    icon: 'calendar',
    description: 'Event participation and attendance records'
  }
};

// Placeholder asset paths
export const PLACEHOLDERS = {
  avatar: 'img/placeholders/avatar-default.svg',
  image: 'img/placeholders/image-placeholder.svg',
  video: 'img/placeholders/video-thumbnail.svg'
};

/**
 * Get classification level object by code
 * @param {string} code - Classification code (U, CUI, C, S, TS)
 * @returns {Object|null} Classification level object
 */
export function getClassificationLevel(code) {
  return CLASSIFICATION_LEVELS[code] || null;
}

/**
 * Get classification color by code
 * @param {string} code - Classification code
 * @returns {string} Color hex value
 */
export function getClassificationColor(code) {
  const level = CLASSIFICATION_LEVELS[code];
  return level ? level.color : '#6b7280';
}

/**
 * Get classification background color by code
 * @param {string} code - Classification code
 * @returns {string} Background color hex value
 */
export function getClassificationBgColor(code) {
  const level = CLASSIFICATION_LEVELS[code];
  return level ? level.bgColor : '#6b7280';
}

/**
 * Format a portion mark for display
 * @param {string} classification - Classification code (U, CUI, C, S, TS)
 * @param {string} handling - Handling instructions (e.g., "FOUO", "NOFORN", "REL TO USA")
 * @returns {string} Formatted portion mark like "(S//NOFORN)"
 */
export function formatPortionMark(classification, handling = '') {
  if (!classification) return '';
  if (handling) {
    return `(${classification}//${handling})`;
  }
  return `(${classification})`;
}

/**
 * Parse a portion mark string
 * @param {string} portionMark - Portion mark string like "(S//NOFORN)"
 * @returns {Object} { classification, handling }
 */
export function parsePortionMark(portionMark) {
  if (!portionMark) return { classification: null, handling: null };
  
  // Match pattern like (TS//NOFORN) or (U)
  const match = portionMark.match(/^\(([A-Z]+)(?:\/\/(.+))?\)$/);
  if (!match) return { classification: null, handling: null };
  
  return {
    classification: match[1],
    handling: match[2] || null
  };
}

/**
 * Calculate the highest classification level from an array of portion marks
 * @param {Array} portionMarks - Array of { classification, handling } objects or strings
 * @returns {string} Highest classification code
 */
export function calculateDocumentClassification(portionMarks) {
  if (!portionMarks || !portionMarks.length) return 'U';
  
  let highestOrder = -1;
  let highestCode = 'U';
  
  portionMarks.forEach(mark => {
    // Handle both object and string formats
    const code = typeof mark === 'string' 
      ? parsePortionMark(mark).classification 
      : mark.classification;
    
    const level = CLASSIFICATION_LEVELS[code];
    if (level && level.order > highestOrder) {
      highestOrder = level.order;
      highestCode = code;
    }
  });
  
  return highestCode;
}

/**
 * Check if a document type is social media
 * @param {string} documentType - Document type
 * @returns {boolean}
 */
export function isSocialMedia(documentType) {
  return documentType === DOCUMENT_TYPES.SOCIAL_POST;
}

/**
 * Check if a document type should have a title
 * @param {string} documentType - Document type
 * @returns {boolean}
 */
export function hasTitle(documentType) {
  return documentType === DOCUMENT_TYPES.NEWS_ARTICLE || 
         documentType === DOCUMENT_TYPES.INTERNAL ||
         documentType === DOCUMENT_TYPES.CORPORATE_RECORD ||
         documentType === DOCUMENT_TYPES.WATCHLIST_MATCH ||
         documentType === DOCUMENT_TYPES.POLITICAL_FINANCE ||
         documentType === DOCUMENT_TYPES.EVENT_ATTENDANCE;
}

/**
 * Get document type info
 * @param {string} documentType - Document type
 * @returns {Object} Document type info
 */
export function getDocumentTypeInfo(documentType) {
  return DOCUMENT_TYPE_INFO[documentType] || {
    label: 'Document',
    icon: 'document',
    description: 'Document'
  };
}

/**
 * Determine document type from publisher type
 * @param {string} publisherType - Publisher type (social, national_news, international_news, internal)
 * @returns {string} Document type
 */
export function getDocumentTypeFromPublisher(publisherType) {
  if (publisherType === 'internal') {
    return DOCUMENT_TYPES.INTERNAL;
  }
  if (publisherType === 'social') {
    return DOCUMENT_TYPES.SOCIAL_POST;
  }
  if (publisherType === 'national_news' || publisherType === 'international_news') {
    return DOCUMENT_TYPES.NEWS_ARTICLE;
  }
  return DOCUMENT_TYPES.NEWS_ARTICLE; // Default
}

export default {
  CLASSIFICATION_LEVELS,
  DOCUMENT_TYPES,
  DOCUMENT_TYPE_INFO,
  PLACEHOLDERS,
  getClassificationLevel,
  getClassificationColor,
  getClassificationBgColor,
  formatPortionMark,
  parsePortionMark,
  calculateDocumentClassification,
  isSocialMedia,
  hasTitle,
  getDocumentTypeInfo,
  getDocumentTypeFromPublisher
};
