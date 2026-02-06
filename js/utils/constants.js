/**
 * Application-wide constants
 * Centralizes magic numbers, durations, and configuration values
 */

// =============================================================================
// UI Timing Constants (in milliseconds)
// =============================================================================

/**
 * Toast notification display duration before starting fade out
 */
export const TOAST_DISPLAY_DURATION = 3000;

/**
 * Toast fade out animation duration
 */
export const TOAST_FADE_DURATION = 200;

/**
 * Longer toast fade duration for smoother transitions
 */
export const TOAST_FADE_DURATION_LONG = 300;

/**
 * Delay before focusing an input after DOM update
 */
export const INPUT_FOCUS_DELAY = 100;

/**
 * Delay for tooltip removal to allow for smooth transitions
 */
export const TOOLTIP_HIDE_DELAY = 150;

/**
 * Duration to show error state on form inputs
 */
export const INPUT_ERROR_DURATION = 1000;

/**
 * Debounce delay for text selection checks
 */
export const SELECTION_CHECK_DELAY = 10;

// =============================================================================
// LocalStorage Keys
// =============================================================================

/**
 * Key for storing read document IDs
 */
export const STORAGE_KEY_READ_DOCUMENTS = 'primer_read_documents';

/**
 * Key for storing card width preferences
 */
export const STORAGE_KEY_CARD_WIDTHS = 'narrativeos-card-widths';

/**
 * Key for storing chat panel width
 */
export const STORAGE_KEY_CHAT_WIDTH = 'chatPanelWidth';

/**
 * Key for storing current dataset selection
 */
export const STORAGE_KEY_CURRENT_DATASET = 'primer_current_dataset';

/**
 * Key for storing theme preference
 */
export const STORAGE_KEY_THEME = 'primer_theme';

// =============================================================================
// Special Entity Names
// =============================================================================

/**
 * Name of the default unsorted project for documents
 */
export const UNSORTED_PROJECT_NAME = 'Unsorted';

// =============================================================================
// UI Configuration
// =============================================================================

/**
 * Maximum number of projects to show in quick-add dropdowns
 */
export const MAX_QUICK_ADD_PROJECTS = 5;

/**
 * Minimum width for the chat panel in pixels
 */
export const CHAT_PANEL_MIN_WIDTH = 350;

/**
 * Maximum width for the chat panel as a fraction of viewport
 */
export const CHAT_PANEL_MAX_WIDTH_RATIO = 0.5;

// =============================================================================
// Default Export
// =============================================================================

export default {
  // Timing
  TOAST_DISPLAY_DURATION,
  TOAST_FADE_DURATION,
  TOAST_FADE_DURATION_LONG,
  INPUT_FOCUS_DELAY,
  TOOLTIP_HIDE_DELAY,
  INPUT_ERROR_DURATION,
  SELECTION_CHECK_DELAY,
  
  // Storage Keys
  STORAGE_KEY_READ_DOCUMENTS,
  STORAGE_KEY_CARD_WIDTHS,
  STORAGE_KEY_CHAT_WIDTH,
  STORAGE_KEY_CURRENT_DATASET,
  STORAGE_KEY_THEME,
  
  // Entity Names
  UNSORTED_PROJECT_NAME,
  
  // UI Config
  MAX_QUICK_ADD_PROJECTS,
  CHAT_PANEL_MIN_WIDTH,
  CHAT_PANEL_MAX_WIDTH_RATIO
};
