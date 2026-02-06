import { describe, it, expect } from 'vitest';
import { BooleanParser } from '../js/utils/BooleanParser.js';

describe('BooleanParser', () => {
  let parser;

  beforeEach(() => {
    parser = new BooleanParser();
  });

  describe('parse', () => {
    describe('empty and null input', () => {
      it('returns null AST for empty string', () => {
        const result = parser.parse('');
        expect(result.ast).toBe(null);
        expect(result.error).toBe(null);
      });

      it('returns null AST for whitespace-only string', () => {
        const result = parser.parse('   ');
        expect(result.ast).toBe(null);
        expect(result.error).toBe(null);
      });

      it('returns null AST for null/undefined', () => {
        expect(parser.parse(null).ast).toBe(null);
        expect(parser.parse(undefined).ast).toBe(null);
      });
    });

    describe('simple terms', () => {
      it('parses single unquoted term', () => {
        const result = parser.parse('NVIDIA');
        expect(result.ast).toEqual({ type: 'TERM', value: 'NVIDIA', quoted: false });
        expect(result.error).toBe(null);
      });

      it('parses single quoted term', () => {
        const result = parser.parse('"Intel Corporation"');
        expect(result.ast).toEqual({ type: 'TERM', value: 'Intel Corporation', quoted: true });
      });

      it('handles escaped quotes in quoted terms', () => {
        const result = parser.parse('"say \\"hello\\""');
        expect(result.ast).toEqual({ type: 'TERM', value: 'say "hello"', quoted: true });
      });
    });

    describe('entity references', () => {
      it('parses entity reference with @', () => {
        const result = parser.parse('@org-005');
        expect(result.ast).toEqual({ type: 'ENTITY', id: 'org-005', raw: '@org-005' });
      });

      it('parses entity reference with underscore', () => {
        const result = parser.parse('@person_001');
        expect(result.ast).toEqual({ type: 'ENTITY', id: 'person_001', raw: '@person_001' });
      });

      it('returns error for @ without ID', () => {
        const result = parser.parse('@');
        expect(result.error).not.toBe(null);
        expect(result.error.message).toContain('Expected entity ID after @');
      });
    });

    describe('AND operator', () => {
      it('parses simple AND expression', () => {
        const result = parser.parse('NVIDIA AND TSMC');
        expect(result.ast).toEqual({
          type: 'AND',
          children: [
            { type: 'TERM', value: 'NVIDIA', quoted: false },
            { type: 'TERM', value: 'TSMC', quoted: false }
          ]
        });
      });

      it('flattens multiple AND operations', () => {
        const result = parser.parse('A AND B AND C');
        expect(result.ast).toEqual({
          type: 'AND',
          children: [
            { type: 'TERM', value: 'A', quoted: false },
            { type: 'TERM', value: 'B', quoted: false },
            { type: 'TERM', value: 'C', quoted: false }
          ]
        });
      });

      it('is case-insensitive', () => {
        const result = parser.parse('A and B');
        expect(result.ast.type).toBe('AND');
      });
    });

    describe('OR operator', () => {
      it('parses simple OR expression', () => {
        const result = parser.parse('NVIDIA OR Intel');
        expect(result.ast).toEqual({
          type: 'OR',
          children: [
            { type: 'TERM', value: 'NVIDIA', quoted: false },
            { type: 'TERM', value: 'Intel', quoted: false }
          ]
        });
      });

      it('flattens multiple OR operations', () => {
        const result = parser.parse('A OR B OR C');
        expect(result.ast).toEqual({
          type: 'OR',
          children: [
            { type: 'TERM', value: 'A', quoted: false },
            { type: 'TERM', value: 'B', quoted: false },
            { type: 'TERM', value: 'C', quoted: false }
          ]
        });
      });
    });

    describe('NOT operator', () => {
      it('parses NOT expression', () => {
        const result = parser.parse('NOT Intel');
        expect(result.ast).toEqual({
          type: 'NOT',
          operand: { type: 'TERM', value: 'Intel', quoted: false }
        });
      });

      it('parses double NOT', () => {
        const result = parser.parse('NOT NOT Intel');
        expect(result.ast).toEqual({
          type: 'NOT',
          operand: {
            type: 'NOT',
            operand: { type: 'TERM', value: 'Intel', quoted: false }
          }
        });
      });
    });

    describe('operator precedence', () => {
      it('AND has higher precedence than OR', () => {
        const result = parser.parse('A OR B AND C');
        // Should be parsed as: A OR (B AND C)
        expect(result.ast).toEqual({
          type: 'OR',
          children: [
            { type: 'TERM', value: 'A', quoted: false },
            {
              type: 'AND',
              children: [
                { type: 'TERM', value: 'B', quoted: false },
                { type: 'TERM', value: 'C', quoted: false }
              ]
            }
          ]
        });
      });

      it('NOT has highest precedence', () => {
        const result = parser.parse('NOT A AND B');
        // Should be parsed as: (NOT A) AND B
        expect(result.ast).toEqual({
          type: 'AND',
          children: [
            {
              type: 'NOT',
              operand: { type: 'TERM', value: 'A', quoted: false }
            },
            { type: 'TERM', value: 'B', quoted: false }
          ]
        });
      });
    });

    describe('parentheses', () => {
      it('overrides operator precedence', () => {
        const result = parser.parse('(A OR B) AND C');
        expect(result.ast).toEqual({
          type: 'AND',
          children: [
            {
              type: 'OR',
              children: [
                { type: 'TERM', value: 'A', quoted: false },
                { type: 'TERM', value: 'B', quoted: false }
              ]
            },
            { type: 'TERM', value: 'C', quoted: false }
          ]
        });
      });

      it('handles nested parentheses', () => {
        const result = parser.parse('((A OR B) AND C)');
        expect(result.ast.type).toBe('AND');
        expect(result.ast.children[0].type).toBe('OR');
      });

      it('returns error for missing closing parenthesis', () => {
        const result = parser.parse('(A OR B');
        expect(result.error).not.toBe(null);
        expect(result.error.message).toContain('Missing closing parenthesis');
      });
    });

    describe('complex expressions', () => {
      it('parses complex mixed expression', () => {
        const result = parser.parse('(NVIDIA OR TSMC) AND NOT Intel');
        expect(result.ast).toEqual({
          type: 'AND',
          children: [
            {
              type: 'OR',
              children: [
                { type: 'TERM', value: 'NVIDIA', quoted: false },
                { type: 'TERM', value: 'TSMC', quoted: false }
              ]
            },
            {
              type: 'NOT',
              operand: { type: 'TERM', value: 'Intel', quoted: false }
            }
          ]
        });
      });

      it('parses expression with entities and keywords', () => {
        const result = parser.parse('@org-001 AND "chip shortage" OR @person-005');
        expect(result.error).toBe(null);
        expect(result.ast.type).toBe('OR');
      });
    });

    describe('error handling', () => {
      it('returns error for unterminated quoted string', () => {
        const result = parser.parse('"unclosed');
        expect(result.error).not.toBe(null);
        expect(result.error.message).toContain('Unterminated quoted string');
      });

      it('returns error for unexpected keyword in term position', () => {
        const result = parser.parse('A AND AND B');
        expect(result.error).not.toBe(null);
        expect(result.error.message).toContain('Unexpected keyword');
      });

      it('returns error for trailing operator', () => {
        const result = parser.parse('A AND');
        expect(result.error).not.toBe(null);
      });
    });

    describe('words containing operator substrings', () => {
      it('allows words containing AND as substring', () => {
        const result = parser.parse('ANDROID');
        expect(result.ast).toEqual({ type: 'TERM', value: 'ANDROID', quoted: false });
      });

      it('allows words containing OR as substring', () => {
        const result = parser.parse('CORPORATION');
        expect(result.ast).toEqual({ type: 'TERM', value: 'CORPORATION', quoted: false });
      });

      it('allows words containing NOT as substring', () => {
        const result = parser.parse('CANNOT');
        expect(result.ast).toEqual({ type: 'TERM', value: 'CANNOT', quoted: false });
      });
    });
  });

  describe('stringify', () => {
    it('stringifies simple term', () => {
      const ast = { type: 'TERM', value: 'NVIDIA', quoted: false };
      expect(BooleanParser.stringify(ast)).toBe('NVIDIA');
    });

    it('stringifies quoted term with quotes', () => {
      const ast = { type: 'TERM', value: 'Intel Corporation', quoted: true };
      expect(BooleanParser.stringify(ast)).toBe('"Intel Corporation"');
    });

    it('stringifies entity reference', () => {
      const ast = { type: 'ENTITY', id: 'org-005' };
      expect(BooleanParser.stringify(ast)).toBe('@org-005');
    });

    it('stringifies entity with name mapping', () => {
      const ast = { type: 'ENTITY', id: 'org-005' };
      const entityMap = { 'org-005': { name: 'NVIDIA' } };
      expect(BooleanParser.stringify(ast, entityMap)).toBe('@NVIDIA');
    });

    it('stringifies AND expression', () => {
      const ast = {
        type: 'AND',
        children: [
          { type: 'TERM', value: 'A', quoted: false },
          { type: 'TERM', value: 'B', quoted: false }
        ]
      };
      expect(BooleanParser.stringify(ast)).toBe('A AND B');
    });

    it('stringifies OR expression', () => {
      const ast = {
        type: 'OR',
        children: [
          { type: 'TERM', value: 'A', quoted: false },
          { type: 'TERM', value: 'B', quoted: false }
        ]
      };
      expect(BooleanParser.stringify(ast)).toBe('A OR B');
    });

    it('stringifies NOT expression', () => {
      const ast = {
        type: 'NOT',
        operand: { type: 'TERM', value: 'Intel', quoted: false }
      };
      expect(BooleanParser.stringify(ast)).toBe('NOT Intel');
    });

    it('returns empty string for null/undefined', () => {
      expect(BooleanParser.stringify(null)).toBe('');
      expect(BooleanParser.stringify(undefined)).toBe('');
    });
  });

  describe('scopeToExpression', () => {
    it('converts scope with entities to expression', () => {
      const scope = {
        personIds: ['person-001', 'person-002'],
        organizationIds: ['org-001']
      };
      const result = BooleanParser.scopeToExpression(scope, 'OR');
      expect(result).toBe('@person-001 OR @person-002 OR @org-001');
    });

    it('converts scope with keywords to expression', () => {
      const scope = {
        keywords: ['chip shortage', 'semiconductor']
      };
      const result = BooleanParser.scopeToExpression(scope, 'AND');
      expect(result).toBe('"chip shortage" AND "semiconductor"');
    });

    it('converts mixed scope', () => {
      const scope = {
        personIds: ['person-001'],
        keywords: ['chips']
      };
      const result = BooleanParser.scopeToExpression(scope, 'OR');
      expect(result).toBe('@person-001 OR "chips"');
    });

    it('returns empty string for empty scope', () => {
      expect(BooleanParser.scopeToExpression({})).toBe('');
      expect(BooleanParser.scopeToExpression({ personIds: [] })).toBe('');
    });

    it('returns single term without operator', () => {
      const scope = { personIds: ['person-001'] };
      expect(BooleanParser.scopeToExpression(scope)).toBe('@person-001');
    });

    it('defaults to OR logic', () => {
      const scope = { personIds: ['person-001', 'person-002'] };
      expect(BooleanParser.scopeToExpression(scope)).toBe('@person-001 OR @person-002');
    });
  });

  describe('extractTerms', () => {
    it('extracts entity IDs from AST', () => {
      const ast = {
        type: 'AND',
        children: [
          { type: 'ENTITY', id: 'org-001' },
          { type: 'ENTITY', id: 'person-001' }
        ]
      };
      const result = BooleanParser.extractTerms(ast);
      expect(result.entityIds).toEqual(['org-001', 'person-001']);
      expect(result.keywords).toEqual([]);
    });

    it('extracts keywords from AST', () => {
      const ast = {
        type: 'OR',
        children: [
          { type: 'TERM', value: 'chip', quoted: false },
          { type: 'TERM', value: 'semiconductor', quoted: true }
        ]
      };
      const result = BooleanParser.extractTerms(ast);
      expect(result.entityIds).toEqual([]);
      expect(result.keywords).toEqual(['chip', 'semiconductor']);
    });

    it('extracts from nested NOT expressions', () => {
      const ast = {
        type: 'NOT',
        operand: { type: 'ENTITY', id: 'org-001' }
      };
      const result = BooleanParser.extractTerms(ast);
      expect(result.entityIds).toEqual(['org-001']);
    });

    it('extracts from complex nested expressions', () => {
      const ast = {
        type: 'AND',
        children: [
          {
            type: 'OR',
            children: [
              { type: 'ENTITY', id: 'org-001' },
              { type: 'TERM', value: 'NVIDIA', quoted: false }
            ]
          },
          {
            type: 'NOT',
            operand: { type: 'ENTITY', id: 'person-001' }
          }
        ]
      };
      const result = BooleanParser.extractTerms(ast);
      expect(result.entityIds).toEqual(['org-001', 'person-001']);
      expect(result.keywords).toEqual(['NVIDIA']);
    });

    it('returns empty arrays for null AST', () => {
      const result = BooleanParser.extractTerms(null);
      expect(result.entityIds).toEqual([]);
      expect(result.keywords).toEqual([]);
    });
  });
});
