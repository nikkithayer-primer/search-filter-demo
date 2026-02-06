/**
 * stickyHeader.js
 * Utility to manage sticky header behavior with scroll-based description hiding
 */

let scrollContainer = null;
let lastScrollTop = 0;
let scrollThreshold = 50; // Pixels to scroll before collapsing
let scrollHysteresis = 30; // Buffer zone to prevent flickering
let isInitialized = false;
let isCollapsed = false; // Track current state to apply hysteresis
let isTransitioning = false; // Prevent state changes during CSS transitions
let isForceCollapsed = false; // When true, header stays collapsed regardless of scroll
const transitionDuration = 300; // Match CSS transition duration (0.3s)

/**
 * Get the actual scroll container
 */
function getScrollContainer() {
  // Try .main-content first (when inside content-wrapper)
  const mainContent = document.querySelector('.main-content');
  if (mainContent && mainContent.scrollHeight > mainContent.clientHeight) {
    return mainContent;
  }
  // Fall back to window
  return null;
}

/**
 * Get current scroll position
 */
function getScrollTop() {
  if (scrollContainer) {
    return scrollContainer.scrollTop;
  }
  return window.scrollY;
}

/**
 * Initialize sticky header scroll behavior
 * Call this after rendering a view with a page-header
 * @param {Object} options - Configuration options
 * @param {boolean} options.forceCollapsed - If true, header stays collapsed regardless of scroll
 */
export function initStickyHeader(options = {}) {
  // Set force collapsed state
  isForceCollapsed = options.forceCollapsed || false;
  
  // Determine the scroll container
  scrollContainer = getScrollContainer();
  
  // Remove any existing listeners
  window.removeEventListener('scroll', handleScroll);
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
  } else {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  // Reset scroll state
  lastScrollTop = getScrollTop();
  isCollapsed = isForceCollapsed; // Start collapsed if forced
  isTransitioning = false;
  isInitialized = true;
  
  // Initial check - apply force collapse immediately if needed
  if (isForceCollapsed) {
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      pageHeader.classList.add('scrolled');
    }
  } else {
    updateHeaderState();
  }
}

/**
 * Handle scroll events
 */
function handleScroll() {
  if (!isInitialized) return;
  
  requestAnimationFrame(updateHeaderState);
}

/**
 * Update header state based on scroll position
 * Uses hysteresis to prevent flickering when near the threshold
 */
function updateHeaderState() {
  const currentScrollTop = getScrollTop();
  const pageHeader = document.querySelector('.page-header');
  
  if (!pageHeader) return;
  
  // If force collapsed, always keep header collapsed
  if (isForceCollapsed) {
    if (!pageHeader.classList.contains('scrolled')) {
      pageHeader.classList.add('scrolled');
      isCollapsed = true;
    }
    lastScrollTop = currentScrollTop;
    return;
  }
  
  // Don't change state during CSS transitions to prevent intermediate state flickering
  if (isTransitioning) {
    lastScrollTop = currentScrollTop;
    return;
  }
  
  // Apply hysteresis: use different thresholds for collapsing vs expanding
  // This prevents the flickering caused by layout shifts when the description toggles
  if (!isCollapsed && currentScrollTop > scrollThreshold) {
    // Collapse when scrolling down past threshold
    pageHeader.classList.add('scrolled');
    isCollapsed = true;
    lockDuringTransition();
  } else if (isCollapsed && currentScrollTop < (scrollThreshold - scrollHysteresis)) {
    // Only expand when scrolled back up past the hysteresis buffer
    // This means you need to scroll higher than where you collapsed
    pageHeader.classList.remove('scrolled');
    isCollapsed = false;
    lockDuringTransition();
  }
  
  lastScrollTop = currentScrollTop;
}

/**
 * Lock state changes during CSS transition to prevent flickering
 */
function lockDuringTransition() {
  isTransitioning = true;
  setTimeout(() => {
    isTransitioning = false;
  }, transitionDuration);
}

/**
 * Clean up scroll listener
 */
export function destroyStickyHeader() {
  window.removeEventListener('scroll', handleScroll);
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll);
  }
  scrollContainer = null;
  isInitialized = false;
  isCollapsed = false;
  isTransitioning = false;
}

export default {
  initStickyHeader,
  destroyStickyHeader
};
