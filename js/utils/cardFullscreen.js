/**
 * cardFullscreen.js
 * Utility for managing card fullscreen toggle functionality
 */

let currentFullscreenCard = null;
let overlay = null;

/**
 * Create the overlay element
 */
function createOverlay() {
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    overlay.addEventListener('click', exitFullscreen);
  }
  return overlay;
}

/**
 * Enter fullscreen mode for a card
 * @param {HTMLElement} card - The card element
 */
function enterFullscreen(card) {
  // Exit any existing fullscreen first
  if (currentFullscreenCard) {
    exitFullscreen();
  }
  
  // Add overlay before card
  document.body.appendChild(createOverlay());
  document.body.classList.add('has-fullscreen-card');
  
  // Make card fullscreen
  card.classList.add('card-fullscreen');
  currentFullscreenCard = card;
  
  // Dispatch resize for components that need to re-render (charts, graphs, etc.)
  window.dispatchEvent(new Event('resize'));
}

/**
 * Exit fullscreen mode
 */
function exitFullscreen() {
  if (currentFullscreenCard) {
    currentFullscreenCard.classList.remove('card-fullscreen');
    currentFullscreenCard = null;
  }
  
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
  
  document.body.classList.remove('has-fullscreen-card');
  
  // Dispatch resize for components that need to re-render
  window.dispatchEvent(new Event('resize'));
}

/**
 * Toggle fullscreen mode for a card
 * @param {HTMLElement} card - The card element
 */
function toggleFullscreen(card) {
  if (card.classList.contains('card-fullscreen')) {
    exitFullscreen();
  } else {
    enterFullscreen(card);
  }
}

/**
 * Initialize fullscreen toggle for a single card
 * @param {HTMLElement} card - The card element
 */
export function initFullscreenToggle(card) {
  const toggle = card.querySelector('.fullscreen-toggle');
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFullscreen(card);
    });
  }
}

// Handle Escape key to exit fullscreen
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentFullscreenCard) {
    exitFullscreen();
  }
});
