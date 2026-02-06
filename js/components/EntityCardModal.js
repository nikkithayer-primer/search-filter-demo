/**
 * EntityCardPopover.js
 * "Baseball card" style hover popover for quick entity preview
 * Shows entity name, image, summary, type, and related entity counts
 * Supports: person, organization, faction, location
 */

import { DataService } from '../data/DataService.js';
import { getEntityIcon } from '../utils/entityRenderer.js';
import { escapeHtml } from '../utils/htmlUtils.js';

// Icons for different entity types
const ENTITY_ICONS = {
  faction: `<svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
  </svg>`,
  location: `<svg class="entity-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
  </svg>`
};

// Singleton instance
let instance = null;

// Timing constants
const SHOW_DELAY = 300;  // ms before showing popover
const HIDE_DELAY = 200;  // ms before hiding popover

export class EntityCardPopover {
  constructor() {
    this.popoverEl = null;
    this.showTimeout = null;
    this.hideTimeout = null;
    this.currentEntityId = null;
    this.currentAnchor = null;
    
    // Bind methods
    this.handlePopoverMouseEnter = this.handlePopoverMouseEnter.bind(this);
    this.handlePopoverMouseLeave = this.handlePopoverMouseLeave.bind(this);
  }

  /**
   * Show the entity card popover on hover
   * @param {string} entityId - The entity ID
   * @param {string} entityType - 'person' or 'organization'
   * @param {HTMLElement} anchorEl - Element to position near
   */
  show(entityId, entityType, anchorEl) {
    // Clear any pending hide
    this.clearHideTimeout();
    
    // If already showing this entity, do nothing
    if (this.currentEntityId === entityId && this.popoverEl) {
      return;
    }
    
    // Clear any pending show for different entity
    this.clearShowTimeout();
    
    // Delay showing to avoid flicker on quick mouse movements
    this.showTimeout = setTimeout(() => {
      this.renderAndShow(entityId, entityType, anchorEl);
    }, SHOW_DELAY);
  }

  /**
   * Schedule hiding the popover
   */
  scheduleHide() {
    this.clearShowTimeout();
    this.clearHideTimeout();
    
    this.hideTimeout = setTimeout(() => {
      this.hide();
    }, HIDE_DELAY);
  }

  /**
   * Immediately hide the popover
   */
  hide() {
    this.clearShowTimeout();
    this.clearHideTimeout();
    
    if (this.popoverEl) {
      this.popoverEl.remove();
      this.popoverEl = null;
    }
    this.currentEntityId = null;
    this.currentAnchor = null;
  }

  /**
   * Get entity by type
   */
  getEntity(entityId, entityType) {
    switch (entityType) {
      case 'person': return DataService.getPerson(entityId);
      case 'organization': return DataService.getOrganization(entityId);
      case 'faction': return DataService.getFaction(entityId);
      case 'location': return DataService.getLocation(entityId);
      default: return null;
    }
  }

  /**
   * Render and display the popover
   */
  renderAndShow(entityId, entityType, anchorEl) {
    const entity = this.getEntity(entityId, entityType);
    
    if (!entity) {
      console.warn('EntityCardPopover: Entity not found', entityId, entityType);
      return;
    }
    
    // Remove existing popover
    if (this.popoverEl) {
      this.popoverEl.remove();
    }
    
    this.currentEntityId = entityId;
    this.currentAnchor = anchorEl;
    
    const relatedCounts = this.getRelatedCounts(entityId, entityType);
    const typeLabel = this.getTypeLabel(entity, entityType);
    const stats = this.getStatsConfig(entityType, relatedCounts);
    
    // Create popover element
    this.popoverEl = document.createElement('div');
    this.popoverEl.className = 'entity-card-popover';
    this.popoverEl.innerHTML = `
      <div class="entity-card entity-card--${entityType}">
        <div class="entity-card-header">
          ${this.renderAvatar(entity, entityType)}
          <div class="entity-card-title">
            <h3 class="entity-card-name">${escapeHtml(entity.name)}</h3>
            <span class="entity-card-type">${escapeHtml(typeLabel)}</span>
          </div>
        </div>
        <div class="entity-card-body">
          <p class="entity-card-description">${this.getDescription(entity)}</p>
        </div>
        <div class="entity-card-stats">
          ${stats.map(s => this.renderStatItem(s.label, s.count)).join('')}
        </div>
        <div class="entity-card-footer">
          <a href="#/${entityType}/${entityId}" class="entity-card-link">View full profile →</a>
        </div>
      </div>
    `;
    
    // Add event listeners to keep popover open when hovering it
    this.popoverEl.addEventListener('mouseenter', this.handlePopoverMouseEnter);
    this.popoverEl.addEventListener('mouseleave', this.handlePopoverMouseLeave);
    
    document.body.appendChild(this.popoverEl);
    this.positionPopover(anchorEl);
  }

  /**
   * Get stats configuration based on entity type
   */
  getStatsConfig(entityType, counts) {
    switch (entityType) {
      case 'person':
      case 'organization':
        return [
          { label: 'People', count: counts.persons },
          { label: 'Orgs', count: counts.organizations },
          { label: 'Narratives', count: counts.narratives }
        ];
      case 'faction':
        return [
          { label: 'People', count: counts.persons },
          { label: 'Orgs', count: counts.organizations },
          { label: 'Narratives', count: counts.narratives }
        ];
      case 'location':
        return [
          { label: 'People', count: counts.persons },
          { label: 'Orgs', count: counts.organizations },
          { label: 'Events', count: counts.events }
        ];
      default:
        return [];
    }
  }

  /**
   * Position the popover near the anchor element
   */
  positionPopover(anchorEl) {
    if (!this.popoverEl || !anchorEl) return;
    
    // Get anchor bounding rect - works for both HTML and SVG elements
    let anchorRect;
    
    // For SVG elements, we need to handle them specially
    if (anchorEl instanceof SVGElement) {
      // Use the SVG element's bounding box in screen coordinates
      const svgRect = anchorEl.getBoundingClientRect();
      anchorRect = {
        left: svgRect.left,
        right: svgRect.right,
        top: svgRect.top,
        bottom: svgRect.bottom,
        width: svgRect.width,
        height: svgRect.height
      };
    } else {
      anchorRect = anchorEl.getBoundingClientRect();
    }
    
    const popoverRect = this.popoverEl.getBoundingClientRect();
    const padding = 12;
    
    // Try to position to the right of the anchor
    let left = anchorRect.right + padding;
    let top = anchorRect.top + (anchorRect.height / 2) - (popoverRect.height / 2);
    
    // If it would overflow right edge, position to the left
    if (left + popoverRect.width > window.innerWidth - padding) {
      left = anchorRect.left - popoverRect.width - padding;
    }
    
    // If it would overflow left edge, position below the anchor
    if (left < padding) {
      left = Math.max(padding, anchorRect.left + (anchorRect.width / 2) - (popoverRect.width / 2));
      top = anchorRect.bottom + padding;
    }
    
    // Ensure it doesn't overflow bottom
    if (top + popoverRect.height > window.innerHeight - padding) {
      top = window.innerHeight - popoverRect.height - padding;
    }
    
    // Ensure it doesn't overflow top
    if (top < padding) {
      top = padding;
    }
    
    // Ensure left doesn't overflow
    if (left < padding) {
      left = padding;
    }
    if (left + popoverRect.width > window.innerWidth - padding) {
      left = window.innerWidth - popoverRect.width - padding;
    }
    
    this.popoverEl.style.left = `${left}px`;
    this.popoverEl.style.top = `${top}px`;
  }

  handlePopoverMouseEnter() {
    this.clearHideTimeout();
  }

  handlePopoverMouseLeave() {
    this.scheduleHide();
  }

  clearShowTimeout() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }

  clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  /**
   * Get related entity counts
   * @param {string} entityId - The entity ID
   * @param {string} entityType - 'person', 'organization', 'faction', or 'location'
   * @returns {Object} Counts of related entities
   */
  getRelatedCounts(entityId, entityType) {
    switch (entityType) {
      case 'person':
        return {
          persons: DataService.getRelatedPersons(entityId).length,
          organizations: DataService.getRelatedOrganizationsForPerson(entityId).length,
          narratives: DataService.getNarrativesForPerson(entityId).length
        };
      case 'organization':
        return {
          persons: DataService.getRelatedPersonsForOrganization(entityId).length,
          organizations: DataService.getRelatedOrganizations(entityId).length,
          narratives: DataService.getNarrativesForOrganization(entityId).length
        };
      case 'faction':
        return {
          persons: DataService.getAffiliatedPersonsForFaction(entityId).length,
          organizations: DataService.getAffiliatedOrganizationsForFaction(entityId).length,
          narratives: DataService.getNarrativesForFaction(entityId).length
        };
      case 'location':
        return {
          persons: DataService.getPersonsForLocation(entityId).length,
          organizations: DataService.getOrganizationsForLocation(entityId).length,
          events: DataService.getEventsForLocation(entityId).length
        };
      default:
        return { persons: 0, organizations: 0, narratives: 0 };
    }
  }

  /**
   * Get the display type label for an entity
   * @param {Object} entity - The entity object
   * @param {string} entityType - 'person', 'organization', 'faction', or 'location'
   * @returns {string} Human-readable type label
   */
  getTypeLabel(entity, entityType) {
    // Use the entity's specific type if available
    if (entity.type) {
      return this.formatTypeLabel(entity.type);
    }
    // Fall back to generic labels
    const defaultLabels = {
      person: 'Person',
      organization: 'Organization',
      faction: 'Faction',
      location: 'Location'
    };
    return defaultLabels[entityType] || entityType;
  }

  /**
   * Format a type string into a human-readable label
   * @param {string} type - Type string like 'government_official'
   * @returns {string} Formatted label like 'Government Official'
   */
  formatTypeLabel(type) {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Get the description text, truncated if needed
   * @param {Object} entity - The entity object
   * @returns {string} Description text (escaped HTML)
   */
  getDescription(entity) {
    const description = entity.description || 'No description available.';
    const maxLength = 200;
    
    if (description.length <= maxLength) {
      return escapeHtml(description);
    }
    
    const truncated = description.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    const finalText = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
    
    return escapeHtml(finalText) + '...';
  }

  /**
   * Get icon for entity type
   */
  getIcon(entityType) {
    if (entityType === 'person' || entityType === 'organization') {
      return getEntityIcon(entityType);
    }
    return ENTITY_ICONS[entityType] || ENTITY_ICONS.location;
  }

  /**
   * Render the entity avatar
   * @param {Object} entity - The entity object
   * @param {string} entityType - 'person', 'organization', 'faction', or 'location'
   * @returns {string} HTML for avatar
   */
  renderAvatar(entity, entityType) {
    const icon = this.getIcon(entityType);
    
    // Factions use their color
    if (entityType === 'faction' && entity.color) {
      return `
        <div class="entity-card-avatar ${entityType}" style="background: ${entity.color}; border-color: ${entity.color};">
          ${icon}
        </div>
      `;
    }
    
    // Person/org with image
    if (entity.imageUrl) {
      return `
        <div class="entity-card-avatar ${entityType} has-image">
          <img src="${entity.imageUrl}" alt="${escapeHtml(entity.name)}" 
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
          <span class="entity-icon-fallback" style="display:none;">${icon}</span>
        </div>
      `;
    }
    
    return `
      <div class="entity-card-avatar ${entityType}">
        ${icon}
      </div>
    `;
  }

  /**
   * Render a single stat item
   * @param {string} label - Stat label
   * @param {number} count - Count value
   * @returns {string} HTML for stat item
   */
  renderStatItem(label, count) {
    return `
      <div class="entity-card-stat">
        <span class="entity-card-stat-value">${count}</span>
        <span class="entity-card-stat-label">${label}</span>
      </div>
    `;
  }
}

/**
 * Get the singleton EntityCardPopover instance
 * @returns {EntityCardPopover}
 */
export function getEntityCardModal() {
  if (!instance) {
    instance = new EntityCardPopover();
  }
  return instance;
}

// Also export with the new name for clarity
export { getEntityCardModal as getEntityCardPopover };

export default EntityCardPopover;
