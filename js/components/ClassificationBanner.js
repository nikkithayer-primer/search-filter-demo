/**
 * ClassificationBanner.js
 * Displays a classification banner at the top of classified documents
 */

import { BaseComponent } from './BaseComponent.js';
import { 
  CLASSIFICATION_LEVELS, 
  getClassificationLevel 
} from '../utils/classification.js';

export class ClassificationBanner extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      showFullName: true,
      ...options
    });
  }

  render() {
    this.clear();

    if (!this.data || !this.data.classification) {
      return;
    }

    const classification = this.data.classification;
    const level = getClassificationLevel(classification);
    
    if (!level) {
      return;
    }

    const banner = document.createElement('div');
    banner.className = `classification-banner classification-banner-${classification.toLowerCase()}`;
    
    if (this.options.showFullName) {
      banner.textContent = level.fullName;
    } else {
      banner.textContent = level.name;
    }

    // Add ARIA attributes for accessibility
    banner.setAttribute('role', 'banner');
    banner.setAttribute('aria-label', `Document classification: ${level.fullName}`);

    this.container.appendChild(banner);
  }

  /**
   * Update the classification
   * @param {string} classification - Classification code (U, CUI, C, S, TS)
   */
  setClassification(classification) {
    this.update({ classification });
  }
}

/**
 * Render a classification badge (smaller, for use in lists/tables)
 * @param {string} classification - Classification code
 * @returns {string} HTML string
 */
export function renderClassificationBadge(classification) {
  if (!classification) return '';
  
  const level = getClassificationLevel(classification);
  if (!level) return '';

  return `<span class="classification-badge classification-badge-${classification.toLowerCase()}" 
               title="${level.fullName}">${classification}</span>`;
}

/**
 * Render a portion mark
 * @param {Object} portionMark - { classification, handling }
 * @returns {string} HTML string
 */
export function renderPortionMark(portionMark) {
  if (!portionMark || !portionMark.classification) return '';
  
  const { classification, handling } = portionMark;
  const text = handling ? `(${classification}//${handling})` : `(${classification})`;
  
  return `<span class="portion-mark portion-mark-${classification.toLowerCase()}">${text}</span>`;
}

export default ClassificationBanner;
