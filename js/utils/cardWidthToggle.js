/**
 * cardWidthToggle.js
 * Utility for managing card half/full width toggle with localStorage persistence
 * Uses a corner resize handle for intuitive resizing
 */

import { initFullscreenToggle } from './cardFullscreen.js';

const STORAGE_KEY = 'narrativeos-card-widths';

// SVG icons for the resize handle
const ICONS = {
  // Diagonal resize icon (used for both states, tooltip indicates action)
  resize: `<svg viewBox="0 0 12 12" fill="currentColor">
    <path d="M10 2L2 10M10 6L6 10M10 10L10 10"/>
    <circle cx="10" cy="2" r="1.5"/>
    <circle cx="6" cy="6" r="1.5"/>
    <circle cx="2" cy="10" r="1.5"/>
    <circle cx="10" cy="6" r="1.5"/>
    <circle cx="6" cy="10" r="1.5"/>
    <circle cx="10" cy="10" r="1.5"/>
  </svg>`
};

/**
 * Get stored card width preferences
 */
function getStoredWidths() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    return {};
  }
}

/**
 * Store card width preference
 */
function storeWidth(cardId, isHalf) {
  try {
    const widths = getStoredWidths();
    widths[cardId] = isHalf ? 'half' : 'full';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widths));
  } catch (e) {
    // localStorage not available
  }
}

/**
 * Get initial width for a card (from storage or default)
 * @param {string} cardId - Unique identifier for the card
 * @param {string} defaultWidth - 'half' or 'full'
 */
function getInitialWidth(cardId, defaultWidth = 'full') {
  const stored = getStoredWidths();
  return stored[cardId] || defaultWidth;
}

/**
 * Create a resize handle element for the card corner
 * @param {boolean} isHalf - Current state (true = half width)
 */
function createResizeHandle(isHalf) {
  const handle = document.createElement('button');
  handle.className = 'card-resize-handle';
  handle.type = 'button';
  handle.title = isHalf ? 'Expand to full width' : 'Collapse to half width';
  handle.setAttribute('aria-label', handle.title);
  handle.innerHTML = ICONS.resize;
  return handle;
}

/**
 * Toggle card width and update UI
 * @param {HTMLElement} card - The card element
 * @param {HTMLElement} handle - The resize handle
 * @param {string} cardId - Unique identifier for storage
 */
function toggleCardWidth(card, handle, cardId) {
  const isCurrentlyHalf = card.classList.contains('card-half') || card.classList.contains('card-half-width');
  
  // Remove all width classes to prevent conflicts
  card.classList.remove('card-half', 'card-half-width', 'card-full', 'card-full-width');
  
  if (isCurrentlyHalf) {
    // Expand to full
    card.classList.add('card-full');
    handle.title = 'Collapse to half width';
    handle.setAttribute('aria-label', handle.title);
    storeWidth(cardId, false);
  } else {
    // Collapse to half
    card.classList.add('card-half');
    handle.title = 'Expand to full width';
    handle.setAttribute('aria-label', handle.title);
    storeWidth(cardId, true);
  }
  
  // Dispatch resize event for components that need to re-render
  window.dispatchEvent(new Event('resize'));
}

/**
 * Initialize a card with width toggle functionality using a corner resize handle
 * @param {HTMLElement} card - The card element
 * @param {string} cardId - Unique identifier for the card (for storage)
 * @param {string} defaultWidth - Default width: 'half' or 'full'
 */
export function initCardWidthToggle(card, cardId, defaultWidth = 'full') {
  if (!card) return;
  
  // Check if card has a pre-set width class (e.g., card-half-width from HTML)
  const hasPresetHalf = card.classList.contains('card-half-width');
  const hasPresetFull = card.classList.contains('card-full-width');
  
  // Determine the actual default based on preset classes or provided default
  let actualDefault = defaultWidth;
  if (hasPresetHalf) actualDefault = 'half';
  else if (hasPresetFull) actualDefault = 'full';
  
  // Get initial width preference (stored preference takes precedence)
  const initialWidth = getInitialWidth(cardId, actualDefault);
  const isHalf = initialWidth === 'half';
  
  // Remove all width classes to prevent conflicts
  card.classList.remove('card-half', 'card-half-width', 'card-full', 'card-full-width');
  card.classList.add(isHalf ? 'card-half' : 'card-full');
  
  // Create resize handle and append to card (not header)
  const handle = createResizeHandle(isHalf);
  card.appendChild(handle);
  
  // Add click handler
  handle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleCardWidth(card, handle, cardId);
  });
  
  // Initialize fullscreen toggle if present
  initFullscreenToggle(card);
  
  return handle;
}

/**
 * Initialize all cards within a container
 * @param {HTMLElement} container - The container element (e.g., .content-grid)
 * @param {string} viewPrefix - Prefix for card IDs (e.g., 'dashboard')
 * @param {Object} defaultWidths - Map of card index to default width
 */
export function initAllCardToggles(container, viewPrefix, defaultWidths = {}) {
  if (!container) return;
  
  const cards = container.querySelectorAll('.card');
  cards.forEach((card, index) => {
    const cardId = `${viewPrefix}-card-${index}`;
    const defaultWidth = defaultWidths[index] || 'full';
    initCardWidthToggle(card, cardId, defaultWidth);
  });
}

export default {
  initCardWidthToggle,
  initAllCardToggles
};
