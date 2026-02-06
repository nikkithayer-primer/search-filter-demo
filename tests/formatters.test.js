import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  formatNumber,
  truncateText,
  getSentimentClass,
  normalizeSentiment,
  formatSentiment,
  formatSentimentValue,
  getSentimentColor,
  formatStatus,
  STATUS_LABELS
} from '../js/utils/formatters.js';

// Mock d3 for date formatting functions
vi.mock('d3', () => ({
  timeFormat: (format) => (date) => {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    const fullMonth = fullMonths[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    if (format === '%b %d') return `${month} ${day}`;
    if (format === '%b %d, %Y') return `${month} ${day}, ${year}`;
    if (format === '%B %d, %Y') return `${fullMonth} ${day}, ${year}`;
    if (format === '%b %d, %H:%M') return `${month} ${day}, ${hours}:${minutes}`;
    if (format === '%B %d, %Y %H:%M') return `${fullMonth} ${day}, ${year} ${hours}:${minutes}`;
    return `${month} ${day}`;
  }
}));

describe('formatters', () => {
  describe('formatNumber', () => {
    it('formats millions with M suffix', () => {
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(2500000)).toBe('2.5M');
      expect(formatNumber(10500000)).toBe('10.5M');
    });

    it('formats thousands with K suffix', () => {
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(25000)).toBe('25.0K');
      expect(formatNumber(999999)).toBe('1000.0K');
    });

    it('returns small numbers formatted with locale string', () => {
      expect(formatNumber(500)).toBe('500');
      expect(formatNumber(999)).toBe('999');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(1)).toBe('1');
    });
  });

  describe('truncateText', () => {
    it('truncates long text with ellipsis', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
      expect(truncateText('This is a very long sentence', 10)).toBe('This is a...');
    });

    it('returns short text unchanged', () => {
      expect(truncateText('Hi', 10)).toBe('Hi');
      expect(truncateText('Hello', 5)).toBe('Hello');
      expect(truncateText('Test', 40)).toBe('Test');
    });

    it('handles null and empty values', () => {
      expect(truncateText(null, 10)).toBe(null);
      expect(truncateText('', 10)).toBe('');
      expect(truncateText(undefined, 10)).toBe(undefined);
    });

    it('uses default maxLength of 40', () => {
      const longText = 'a'.repeat(50);
      expect(truncateText(longText)).toBe('a'.repeat(40) + '...');
    });

    it('trims whitespace before adding ellipsis', () => {
      expect(truncateText('Hello     World', 7)).toBe('Hello...');
    });
  });

  describe('normalizeSentiment', () => {
    it('clamps values to -1 to 1 range', () => {
      expect(normalizeSentiment(0.5)).toBe(0.5);
      expect(normalizeSentiment(-0.5)).toBe(-0.5);
      expect(normalizeSentiment(2)).toBe(1);
      expect(normalizeSentiment(-2)).toBe(-1);
    });

    it('handles string numbers', () => {
      expect(normalizeSentiment('0.5')).toBe(0.5);
      expect(normalizeSentiment('-0.75')).toBe(-0.75);
      expect(normalizeSentiment('1.5')).toBe(1);
    });

    it('returns 0 for invalid inputs', () => {
      expect(normalizeSentiment('not a number')).toBe(0);
      expect(normalizeSentiment(null)).toBe(0);
      expect(normalizeSentiment(undefined)).toBe(0);
      expect(normalizeSentiment(NaN)).toBe(0);
    });

    it('handles edge cases', () => {
      expect(normalizeSentiment(0)).toBe(0);
      expect(normalizeSentiment(1)).toBe(1);
      expect(normalizeSentiment(-1)).toBe(-1);
    });
  });

  describe('getSentimentClass', () => {
    it('returns negative for values below -0.2', () => {
      expect(getSentimentClass(-0.5)).toBe('negative');
      expect(getSentimentClass(-1)).toBe('negative');
      expect(getSentimentClass(-0.21)).toBe('negative');
    });

    it('returns positive for values above 0.2', () => {
      expect(getSentimentClass(0.5)).toBe('positive');
      expect(getSentimentClass(1)).toBe('positive');
      expect(getSentimentClass(0.21)).toBe('positive');
    });

    it('returns neutral for values between -0.2 and 0.2', () => {
      expect(getSentimentClass(0)).toBe('neutral');
      expect(getSentimentClass(0.2)).toBe('neutral');
      expect(getSentimentClass(-0.2)).toBe('neutral');
      expect(getSentimentClass(0.1)).toBe('neutral');
      expect(getSentimentClass(-0.1)).toBe('neutral');
    });

    it('normalizes values before classification', () => {
      expect(getSentimentClass(5)).toBe('positive');
      expect(getSentimentClass(-5)).toBe('negative');
      expect(getSentimentClass('0.5')).toBe('positive');
    });
  });

  describe('formatSentiment', () => {
    it('returns Very Negative for values <= -0.6', () => {
      expect(formatSentiment(-0.6)).toBe('Very Negative');
      expect(formatSentiment(-1)).toBe('Very Negative');
      expect(formatSentiment(-0.8)).toBe('Very Negative');
    });

    it('returns Negative for values <= -0.2', () => {
      expect(formatSentiment(-0.3)).toBe('Negative');
      expect(formatSentiment(-0.5)).toBe('Negative');
      expect(formatSentiment(-0.21)).toBe('Negative');
    });

    it('returns Neutral for values between -0.2 and 0.2', () => {
      expect(formatSentiment(0)).toBe('Neutral');
      expect(formatSentiment(0.1)).toBe('Neutral');
      expect(formatSentiment(-0.1)).toBe('Neutral');
    });

    it('returns Positive for values < 0.6', () => {
      expect(formatSentiment(0.3)).toBe('Positive');
      expect(formatSentiment(0.5)).toBe('Positive');
    });

    it('returns Very Positive for values >= 0.6', () => {
      expect(formatSentiment(0.6)).toBe('Very Positive');
      expect(formatSentiment(1)).toBe('Very Positive');
      expect(formatSentiment(0.8)).toBe('Very Positive');
    });
  });

  describe('formatSentimentValue', () => {
    it('formats positive values with + sign', () => {
      expect(formatSentimentValue(0.5)).toBe('+0.50');
      expect(formatSentimentValue(0.75)).toBe('+0.75');
      expect(formatSentimentValue(1)).toBe('+1.00');
    });

    it('formats negative values without extra sign', () => {
      expect(formatSentimentValue(-0.5)).toBe('-0.50');
      expect(formatSentimentValue(-0.25)).toBe('-0.25');
    });

    it('formats zero without sign', () => {
      expect(formatSentimentValue(0)).toBe('0.00');
    });

    it('handles string inputs', () => {
      expect(formatSentimentValue('0.5')).toBe('+0.50');
      expect(formatSentimentValue('-0.3')).toBe('-0.30');
    });
  });

  describe('getSentimentColor', () => {
    it('returns red for negative sentiment', () => {
      expect(getSentimentColor(-0.5)).toBe('#E57373');
      expect(getSentimentColor(-0.1)).toBe('#E57373');
      expect(getSentimentColor(-1)).toBe('#E57373');
    });

    it('returns green for positive and zero sentiment', () => {
      expect(getSentimentColor(0.5)).toBe('#66BB6A');
      expect(getSentimentColor(0)).toBe('#66BB6A');
      expect(getSentimentColor(1)).toBe('#66BB6A');
    });
  });

  describe('formatStatus', () => {
    it('returns human-readable labels for known statuses', () => {
      expect(formatStatus('new')).toBe('New');
      expect(formatStatus('in_progress')).toBe('In Progress');
      expect(formatStatus('under_investigation')).toBe('Investigating');
      expect(formatStatus('resolved')).toBe('Resolved');
    });

    it('returns the original value for unknown statuses', () => {
      expect(formatStatus('custom_status')).toBe('custom_status');
      expect(formatStatus('unknown')).toBe('unknown');
    });
  });

  describe('STATUS_LABELS', () => {
    it('contains all expected status mappings', () => {
      expect(STATUS_LABELS).toEqual({
        'new': 'New',
        'in_progress': 'In Progress',
        'under_investigation': 'Investigating',
        'resolved': 'Resolved'
      });
    });
  });
});
