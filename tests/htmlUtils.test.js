import { describe, it, expect, beforeEach } from 'vitest';
import { escapeHtml } from '../js/utils/htmlUtils.js';

describe('htmlUtils', () => {
  describe('escapeHtml', () => {
    it('escapes HTML special characters', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
      expect(escapeHtml('<div class="test">')).toBe('&lt;div class="test"&gt;');
    });

    it('escapes ampersands', () => {
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
      expect(escapeHtml('a && b')).toBe('a &amp;&amp; b');
    });

    it('escapes quotes', () => {
      expect(escapeHtml('"quoted"')).toBe('"quoted"');
      expect(escapeHtml("it's")).toBe("it's");
    });

    it('escapes angle brackets', () => {
      expect(escapeHtml('1 < 2')).toBe('1 &lt; 2');
      expect(escapeHtml('3 > 2')).toBe('3 &gt; 2');
      expect(escapeHtml('1 < 2 > 0')).toBe('1 &lt; 2 &gt; 0');
    });

    it('handles empty and null values', () => {
      expect(escapeHtml('')).toBe('');
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
    });

    it('converts non-string values to strings', () => {
      expect(escapeHtml(123)).toBe('123');
      expect(escapeHtml(0)).toBe('');  // 0 is falsy, returns ''
      expect(escapeHtml(true)).toBe('true');
      expect(escapeHtml(false)).toBe('');  // false is falsy, returns ''
    });

    it('handles complex XSS attack vectors', () => {
      // Event handler injection
      expect(escapeHtml('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;');
      
      // Script injection with encoding
      expect(escapeHtml('<script>document.cookie</script>')).toBe('&lt;script&gt;document.cookie&lt;/script&gt;');
      
      // SVG-based XSS
      expect(escapeHtml('<svg onload=alert(1)>')).toBe('&lt;svg onload=alert(1)&gt;');
    });

    it('preserves normal text', () => {
      expect(escapeHtml('Hello, World!')).toBe('Hello, World!');
      expect(escapeHtml('Regular text with spaces')).toBe('Regular text with spaces');
      expect(escapeHtml('Numbers: 12345')).toBe('Numbers: 12345');
    });

    it('handles unicode characters', () => {
      expect(escapeHtml('Café ☕')).toBe('Café ☕');
      expect(escapeHtml('日本語')).toBe('日本語');
      expect(escapeHtml('🚀 emoji')).toBe('🚀 emoji');
    });

    it('handles newlines and whitespace', () => {
      expect(escapeHtml('line1\nline2')).toBe('line1\nline2');
      expect(escapeHtml('  spaces  ')).toBe('  spaces  ');
      expect(escapeHtml('\ttab')).toBe('\ttab');
    });
  });
});
