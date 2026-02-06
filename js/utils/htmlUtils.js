/**
 * HTML utility functions for safe text rendering
 */

/**
 * Escape HTML to prevent XSS attacks
 * @param {string|*} text - The text to escape
 * @returns {string} The escaped HTML-safe string
 */
export function escapeHtml(text) {
  if (!text) return '';
  if (typeof text !== 'string') text = String(text);
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export default { escapeHtml };
