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

// =============================================================================
// LocalStorage Keys
// =============================================================================

/**
 * Key for storing read document IDs
 */
export const STORAGE_KEY_READ_DOCUMENTS = 'primer_read_documents';

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

// =============================================================================
// Default Export
// =============================================================================

export default {
  TOAST_DISPLAY_DURATION,
  TOAST_FADE_DURATION,
  STORAGE_KEY_READ_DOCUMENTS,
  UNSORTED_PROJECT_NAME,
  MAX_QUICK_ADD_PROJECTS
};
