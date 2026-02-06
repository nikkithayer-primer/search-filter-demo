/**
 * StatCards.js
 * Reusable stat cards component for displaying counts with icons
 * Used in page headers (Dashboard, Entity details, etc.)
 * 
 * Stat cards are rendered as dropdowns that show entity lists
 * with click-through navigation to detail views.
 */

import { StatCardDropdown } from './StatCardDropdown.js';

/**
 * SVG icons for each stat type
 */
const STAT_ICONS = {
  narratives: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <path d="M2 2h12v12H2z" rx="1"/>
    <path d="M4 5h8M4 8h8M4 11h5"/>
  </svg>`,
  themes: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <path d="M3 3h10v10H3z" rx="1"/>
    <path d="M5 6h6M5 9h4"/>
  </svg>`,
  topics: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <path d="M2 4h12M2 8h8M2 12h10"/>
    <circle cx="13" cy="8" r="2"/>
  </svg>`,
  factions: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <circle cx="8" cy="5" r="2.5"/>
    <circle cx="4" cy="11" r="2"/>
    <circle cx="12" cy="11" r="2"/>
    <path d="M6 6.5L4.5 9M10 6.5l1.5 2.5"/>
  </svg>`,
  locations: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
    <circle cx="8" cy="6" r="2"/>
  </svg>`,
  events: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <rect x="2" y="3" width="12" height="11" rx="1"/>
    <path d="M2 6h12M5 1v3M11 1v3"/>
  </svg>`,
  entities: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <circle cx="8" cy="4" r="2.5"/>
    <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
  </svg>`,
  documents: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <path d="M3 1h7l3 3v11H3V1z"/>
    <path d="M10 1v3h3"/>
    <path d="M5 7h6M5 10h6M5 13h4"/>
  </svg>`,
  persons: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <circle cx="8" cy="4" r="2.5"/>
    <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
  </svg>`,
  organizations: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <rect x="2" y="4" width="12" height="10" rx="1"/>
    <path d="M5 4V2h6v2"/>
    <path d="M2 8h12"/>
  </svg>`,
  activity: `<svg class="stat-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25">
    <path d="M2 2h12v9H6l-3 3v-3H2V2z" rx="1"/>
    <path d="M5 5h6M5 8h4"/>
  </svg>`
};

/**
 * Default routes for each stat type
 */
const STAT_ROUTES = {
  narratives: '#/narratives',
  themes: '#/themes',
  topics: '#/topics',
  factions: '#/factions',
  locations: '#/locations',
  events: '#/events',
  entities: '#/entities',
  documents: '#/documents',
  persons: '#/entities',
  organizations: '#/entities',
  activity: '#/activity'
};

/**
 * Display labels for each stat type (singular)
 */
const STAT_LABELS = {
  narratives: 'Narratives',
  themes: 'Themes',
  topics: 'Topics',
  factions: 'Factions',
  locations: 'Locations',
  events: 'Events',
  entities: 'Entities',
  documents: 'Documents',
  persons: 'People',
  organizations: 'Orgs',
  activity: 'Activity'
};

/**
 * Plural labels for stat types that need special handling
 */
const STAT_LABELS_PLURAL = {
  activity: 'Activities'
};

/**
 * StatCards utility class
 */
export const StatCards = {
  /**
   * Get the icon for a stat type
   * @param {string} type - Stat type (narratives, themes, etc.)
   * @returns {string} SVG icon HTML
   */
  getIcon(type) {
    return STAT_ICONS[type] || STAT_ICONS.entities;
  },

  /**
   * Get the default route for a stat type
   * @param {string} type - Stat type
   * @returns {string} Hash route
   */
  getRoute(type) {
    return STAT_ROUTES[type] || '#/dashboard';
  },

  /**
   * Get the label for a stat type
   * @param {string} type - Stat type
   * @param {number} count - Optional count for pluralization
   * @returns {string} Display label
   */
  getLabel(type, count = 1) {
    // Use plural form if count > 1 and a plural label exists
    if (count > 1 && STAT_LABELS_PLURAL[type]) {
      return STAT_LABELS_PLURAL[type];
    }
    return STAT_LABELS[type] || type;
  },

  /**
   * Build dashboard stats with items for dropdown rendering
   * @param {Object} data - Dashboard data with entity arrays
   * @param {string} contextId - Optional context ID for building routes
   * @returns {Array} Stats array with items for renderDropdowns()
   */
  buildDashboardStatsWithItems(data, contextId = null) {
    const stats = [];
    
    if (data.narratives?.length > 0) {
      stats.push({ 
        type: 'narratives', 
        value: data.narratives.length, 
        items: data.narratives.map(n => ({ 
          id: n.id, 
          name: n.text,
          description: n.description 
        }))
      });
    }
    if (data.topics?.length > 0) {
      stats.push({ 
        type: 'topics', 
        value: data.topics.length,
        items: data.topics.map(t => ({ 
          id: t.id, 
          name: t.headline,
          description: t.description 
        }))
      });
    }
    if (data.factions?.length > 0) {
      stats.push({ 
        type: 'factions', 
        value: data.factions.length,
        items: data.factions.map(f => ({ 
          id: f.id, 
          name: f.name,
          description: f.description 
        }))
      });
    }
    if (data.locations?.length > 0) {
      stats.push({ 
        type: 'locations', 
        value: data.locations.length,
        items: data.locations.map(l => ({ 
          id: l.id, 
          name: l.name,
          description: l.description 
        }))
      });
    }
    if (data.events?.length > 0) {
      stats.push({ 
        type: 'events', 
        value: data.events.length,
        items: data.events.map(e => ({ 
          id: e.id, 
          name: e.text || e.headline || e.name,
          description: e.description 
        }))
      });
    }
    if (data.entities?.length > 0) {
      stats.push({ 
        type: 'entities', 
        value: data.entities.length,
        items: data.entities.map(e => ({ 
          id: e.id, 
          name: e.name,
          description: e.description 
        }))
      });
    }
    if (data.documents?.length > 0) {
      stats.push({ 
        type: 'documents', 
        value: data.documents.length,
        items: data.documents.map(d => ({ 
          id: d.id, 
          name: d.title,
          description: d.excerpt || d.summary 
        }))
      });
    }
    if (data.activity?.length > 0) {
      // Group activity by comments (with their replies)
      const groupedActivity = this._groupActivityItems(data.activity);
      stats.push({ 
        type: 'activity', 
        value: groupedActivity.length,
        items: groupedActivity.map(item => ({ 
          id: item.documentId,  // Link to document
          name: item.type === 'highlight' 
            ? `"${this._truncateText(item.highlightedText, 60)}"` 
            : this._truncateText(item.content, 60),
          description: `${item.type === 'highlight' ? 'Highlight' : 'Comment'}${item.replyCount ? ` (${item.replyCount} replies)` : ''} in ${item.documentTitle}`
        }))
      });
    }
    
    return stats;
  },

  /**
   * Group activity items - excludes replies (they're counted with parent comment)
   * @param {Array} activity - Raw activity from DataService.getAllActivity()
   * @returns {Array} Filtered activity (highlights and comments only, no replies)
   */
  _groupActivityItems(activity) {
    // Filter out replies - they'll be counted with their parent comment
    return activity.filter(item => item.type !== 'reply');
  },

  /**
   * Truncate text to a maximum length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text
   */
  _truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  },

  /**
   * Escape a string for safe use in an HTML attribute
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  _escapeHtmlAttr(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  /**
   * Build entity stats with items for dropdown rendering
   * @param {Object} data - Entity data from fetchEntityData()
   * @param {string} contextId - Optional context ID for building routes
   * @returns {Array} Stats array with items for renderDropdowns()
   */
  buildEntityStatsWithItems(data, contextId = null) {
    const stats = [];
    
    if (data.narratives?.length > 0) {
      stats.push({ 
        type: 'narratives', 
        value: data.narratives.length, 
        items: data.narratives.map(n => ({ 
          id: n.id, 
          name: n.text,
          description: n.description 
        }))
      });
    }
    if (data.topics?.length > 0) {
      stats.push({ 
        type: 'topics', 
        value: data.topics.length,
        items: data.topics.map(t => ({ 
          id: t.id, 
          name: t.headline,
          description: t.description 
        }))
      });
    }
    if (data.documents?.length > 0) {
      stats.push({ 
        type: 'documents', 
        value: data.documents.length,
        items: data.documents.map(d => ({ 
          id: d.id, 
          name: d.title,
          description: d.excerpt || d.summary 
        }))
      });
    }
    if (data.locations?.length > 0) {
      stats.push({ 
        type: 'locations', 
        value: data.locations.length,
        items: data.locations.map(l => ({ 
          id: l.id, 
          name: l.name,
          description: l.description 
        }))
      });
    }
    if (data.allEvents?.length > 0 || data.events?.length > 0) {
      const events = data.allEvents || data.events;
      stats.push({ 
        type: 'events', 
        value: events.length,
        items: events.map(e => ({ 
          id: e.id, 
          name: e.text || e.headline || e.name,  // Events use 'text' field
          description: e.description 
        }))
      });
    }
    if (data.factions?.length > 0) {
      stats.push({ 
        type: 'factions', 
        value: data.factions.length,
        items: data.factions.map(f => ({ 
          id: f.id, 
          name: f.name,
          description: f.description 
        }))
      });
    }
    // Entities can come as combined array or separate persons/organizations
    const entities = data.entities || [
      ...(data.persons || []),
      ...(data.organizations || [])
    ];
    if (entities.length > 0) {
      stats.push({ 
        type: 'entities', 
        value: entities.length,
        items: entities.map(e => ({ 
          id: e.id, 
          name: e.name,
          description: e.description 
        }))
      });
    }
    if (data.activity?.length > 0) {
      // Group activity by comments (with their replies)
      const groupedActivity = this._groupActivityItems(data.activity);
      stats.push({ 
        type: 'activity', 
        value: groupedActivity.length,
        items: groupedActivity.map(item => ({ 
          id: item.documentId,  // Link to document
          name: item.type === 'highlight' 
            ? `"${this._truncateText(item.highlightedText, 60)}"` 
            : this._truncateText(item.content, 60),
          description: `${item.type === 'highlight' ? 'Highlight' : 'Comment'}${item.replyCount ? ` (${item.replyCount} replies)` : ''} in ${item.documentTitle}`
        }))
      });
    }
    
    return stats;
  },

  /**
   * Render stat cards as dropdowns with entity lists
   * @param {Array} stats - Array of stat configs [{type, value, items}]
   * @param {Object} options - Options
   * @param {string} options.contextId - Context ID for building routes
   * @param {Function} options.onNavigate - Callback when navigating
   * @returns {string} HTML string for dropdown containers (requires initDropdowns after DOM insertion)
   */
  renderDropdowns(stats, options = {}) {
    if (!stats || stats.length === 0) return '';

    // Only include stats that have items
    const statsWithItems = stats.filter(stat => stat.items && stat.items.length > 0);
    if (statsWithItems.length === 0) return '';

    // Separate activity from other stats (activity is user-generated, shown separately)
    const regularStats = statsWithItems.filter(stat => stat.type !== 'activity');
    const activityStats = statsWithItems.filter(stat => stat.type === 'activity');

    // Helper to render a stat dropdown container
    const renderStatContainer = (stat, index) => {
      const containerId = `stat-dropdown-${stat.type}-${index}`;
      const itemsJson = this._escapeHtmlAttr(JSON.stringify(stat.items || []));
      return `<div id="${containerId}" class="stat-dropdown-container" 
        data-type="${stat.type}" 
        data-count="${stat.value}"
        data-items='${itemsJson}'
        data-context-id="${options.contextId || ''}"></div>`;
    };

    let innerHtml = '';

    // Render regular stats
    if (regularStats.length > 0) {
      const regularDropdownsHtml = regularStats.map((stat, index) => renderStatContainer(stat, index)).join('');
      innerHtml += `<div class="stats-grid stats-grid-dropdowns">${regularDropdownsHtml}</div>`;
    }

    // Render activity stats on a separate line with distinct styling
    if (activityStats.length > 0) {
      const activityDropdownsHtml = activityStats.map((stat, index) => 
        renderStatContainer(stat, regularStats.length + index)
      ).join('');
      innerHtml += `<div class="stats-grid stats-grid-activity">${activityDropdownsHtml}</div>`;
    }

    // Wrap in a container to ensure proper stacking in flex layouts
    return `<div class="stats-grid-wrapper">${innerHtml}</div>`;
  },

  /**
   * Initialize stat card dropdowns after DOM insertion
   * @param {HTMLElement} container - Parent container
   * @param {Object} options - Options passed to each dropdown
   * @param {string} options.contextId - Parent context ID (e.g., workspace)
   * @param {string} options.currentEntityId - Current entity ID being viewed (for documents tab route)
   * @returns {Array} Array of StatCardDropdown instances
   */
  initDropdowns(container, options = {}) {
    const dropdownContainers = container.querySelectorAll('.stat-dropdown-container');
    const dropdowns = [];

    dropdownContainers.forEach((el) => {
      const type = el.dataset.type;
      const count = parseInt(el.dataset.count, 10) || 0;
      let items = [];
      try {
        items = JSON.parse(el.dataset.items || '[]');
      } catch (e) {
        console.warn('StatCards: Failed to parse items for', type);
      }
      const contextId = el.dataset.contextId || options.contextId || null;

      const dropdown = new StatCardDropdown(el.id, {
        type,
        count,
        items,
        icon: this.getIcon(type),
        label: this.getLabel(type, count),
        contextId,
        currentEntityId: options.currentEntityId || null,
        onNavigate: options.onNavigate,
        maxItems: options.maxItems || 10
      });

      dropdown.render();
      dropdowns.push(dropdown);
    });

    return dropdowns;
  }
};

export default StatCards;
