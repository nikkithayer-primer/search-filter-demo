/**
 * Application configuration
 * 
 * The OPENAI_API_KEY placeholder is replaced during GitHub Actions deployment.
 * For local development, leave this as-is and enter your key in Settings,
 * or replace the placeholder temporarily (don't commit your real key!).
 */

// This placeholder gets replaced by GitHub Actions during deployment
export const OPENAI_API_KEY = '__OPENAI_API_KEY_PLACEHOLDER__';

// The placeholder string (used for comparison - intentionally split to avoid sed replacement)
const PLACEHOLDER = ['__OPENAI_API_KEY', '_PLACEHOLDER__'].join('');

// Check if we have a build-injected key (not the placeholder)
export function hasInjectedApiKey() {
  return OPENAI_API_KEY && 
         OPENAI_API_KEY !== PLACEHOLDER && 
         OPENAI_API_KEY.startsWith('sk-');
}
