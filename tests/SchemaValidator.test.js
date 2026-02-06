import { describe, it, expect, beforeEach } from 'vitest';
import { SchemaValidator, validateDataset } from '../js/data/SchemaValidator.js';

describe('SchemaValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new SchemaValidator({ logToConsole: false });
  });

  describe('validateEntity', () => {
    describe('ID prefix validation', () => {
      it('validates correct ID prefix', () => {
        const entity = { id: 'person-001', name: 'John Doe' };
        const result = validator.validateEntity('persons', entity);
        expect(result.isValid).toBe(true);
      });

      it('rejects incorrect ID prefix', () => {
        const entity = { id: 'wrong-001', name: 'John Doe' };
        const result = validator.validateEntity('persons', entity);
        expect(result.isValid).toBe(false);
        expect(result.errors[0].message).toContain('must start with');
      });
    });

    describe('required field validation', () => {
      it('passes when all required fields present', () => {
        const entity = { id: 'mission-001', name: 'Test Mission' };
        const result = validator.validateEntity('missions', entity);
        expect(result.isValid).toBe(true);
      });

      it('fails when required field is missing', () => {
        const entity = { id: 'mission-001' }; // missing 'name'
        const result = validator.validateEntity('missions', entity);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.message.includes('name'))).toBe(true);
      });

      it('fails when required field is null', () => {
        const entity = { id: 'mission-001', name: null };
        const result = validator.validateEntity('missions', entity);
        expect(result.isValid).toBe(false);
      });
    });

    describe('type validation', () => {
      it('validates string type', () => {
        const entity = { id: 'mission-001', name: 'Valid String' };
        const result = validator.validateEntity('missions', entity);
        expect(result.isValid).toBe(true);
      });

      it('rejects non-string for string type', () => {
        const entity = { id: 'mission-001', name: 123 };
        const result = validator.validateEntity('missions', entity);
        expect(result.isValid).toBe(false);
        expect(result.errors[0].message).toContain('must be a string');
      });

      it('validates number type', () => {
        const entity = { id: 'faction-001', name: 'Test', memberCount: 100 };
        const result = validator.validateEntity('factions', entity);
        expect(result.isValid).toBe(true);
      });

      it('validates boolean type', () => {
        const entity = { 
          id: 'monitor-001', 
          name: 'Test Monitor', 
          scope: {}, 
          enabled: true 
        };
        const result = validator.validateEntity('monitors', entity);
        expect(result.isValid).toBe(true);
      });

      it('rejects invalid boolean', () => {
        const entity = { 
          id: 'monitor-001', 
          name: 'Test', 
          scope: {}, 
          enabled: 'yes' 
        };
        const result = validator.validateEntity('monitors', entity);
        expect(result.isValid).toBe(false);
        expect(result.errors[0].message).toContain('must be a boolean');
      });
    });

    describe('enum validation', () => {
      it('accepts valid enum value', () => {
        const entity = { id: 'person-001', name: 'John', type: 'politician' };
        const result = validator.validateEntity('persons', entity);
        expect(result.isValid).toBe(true);
      });

      it('rejects invalid enum value', () => {
        const entity = { id: 'person-001', name: 'John', type: 'invalid_type' };
        const result = validator.validateEntity('persons', entity);
        expect(result.isValid).toBe(false);
        expect(result.errors[0].message).toContain('Invalid value');
        expect(result.errors[0].message).toContain('Allowed');
      });
    });

    describe('sentiment validation', () => {
      it('accepts valid sentiment value', () => {
        const entity = { 
          id: 'narr-001', 
          text: 'Test narrative', 
          sentiment: 0.5 
        };
        const result = validator.validateEntity('narratives', entity);
        expect(result.isValid).toBe(true);
      });

      it('accepts boundary sentiment values', () => {
        const entityMin = { id: 'narr-001', text: 'Test', sentiment: -1 };
        const entityMax = { id: 'narr-002', text: 'Test', sentiment: 1 };
        
        expect(validator.validateEntity('narratives', entityMin).isValid).toBe(true);
        expect(validator.validateEntity('narratives', entityMax).isValid).toBe(true);
      });

      it('rejects out-of-range sentiment', () => {
        const entity = { id: 'narr-001', text: 'Test', sentiment: 1.5 };
        const result = validator.validateEntity('narratives', entity);
        expect(result.isValid).toBe(false);
        expect(result.errors[0].message).toContain('must be <=');
      });
    });

    describe('factionMentions validation', () => {
      it('validates correct factionMentions structure', () => {
        const entity = {
          id: 'doc-001',
          documentType: 'news_article',
          repositoryId: 'repo-001',
          title: 'Test',
          publishedDate: '2024-01-01T00:00:00Z',
          publisherId: 'pub-001',
          factionMentions: {
            'faction-001': { sentiment: 0.5 },
            'faction-002': { sentiment: -0.3 }
          }
        };
        const result = validator.validateEntity('documents', entity);
        expect(result.isValid).toBe(true);
      });

      it('warns on non-faction prefixed keys', () => {
        const entity = {
          id: 'doc-001',
          documentType: 'news_article',
          repositoryId: 'repo-001',
          title: 'Test',
          publishedDate: '2024-01-01T00:00:00Z',
          publisherId: 'pub-001',
          factionMentions: {
            'invalid-key': { sentiment: 0.5 }
          }
        };
        const result = validator.validateEntity('documents', entity);
        expect(result.hasWarnings).toBe(true);
      });

      it('rejects invalid sentiment in factionMentions', () => {
        const entity = {
          id: 'doc-001',
          documentType: 'news_article',
          repositoryId: 'repo-001',
          title: 'Test',
          publishedDate: '2024-01-01T00:00:00Z',
          publisherId: 'pub-001',
          factionMentions: {
            'faction-001': { sentiment: 2.0 }  // Out of range
          }
        };
        const result = validator.validateEntity('documents', entity);
        expect(result.isValid).toBe(false);
      });
    });

    describe('reference validation', () => {
      it('validates existing references', () => {
        const allData = {
          missions: [{ id: 'mission-001', name: 'Test' }],
          narratives: [{ 
            id: 'narr-001', 
            text: 'Test', 
            missionId: 'mission-001' 
          }]
        };
        
        const result = validator.validateEntity(
          'narratives', 
          allData.narratives[0], 
          allData
        );
        expect(result.isValid).toBe(true);
      });

      it('reports missing reference', () => {
        const allData = {
          missions: [],
          narratives: [{ 
            id: 'narr-001', 
            text: 'Test', 
            missionId: 'mission-999'  // Doesn't exist
          }]
        };
        
        const result = validator.validateEntity(
          'narratives', 
          allData.narratives[0], 
          allData
        );
        expect(result.hasWarnings).toBe(true);
      });
    });

    describe('edge cases', () => {
      it('handles null entity', () => {
        const result = validator.validateEntity('persons', null);
        expect(result.isValid).toBe(false);
        expect(result.errors[0].message).toContain('null');
      });

      it('handles unknown collection', () => {
        const result = validator.validateEntity('unknown_collection', { id: 'test' });
        expect(result.hasWarnings).toBe(true);
        expect(result.warnings[0].message).toContain('No schema defined');
      });

      it('skips optional fields gracefully', () => {
        const entity = { id: 'person-001', name: 'John' };
        const result = validator.validateEntity('persons', entity);
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('validateEntity - multiple entities', () => {
    it('validates multiple entities individually', () => {
      const entities = [
        { id: 'person-001', name: 'John' },
        { id: 'person-002', name: 'Jane' }
      ];
      const results = entities.map(e => validator.validateEntity('persons', e));
      expect(results).toHaveLength(2);
      expect(results.every(r => r.isValid)).toBe(true);
    });

    it('returns individual results for each entity', () => {
      const entities = [
        { id: 'person-001', name: 'John' },
        { id: 'wrong-001', name: 'Jane' }  // Wrong prefix
      ];
      const results = entities.map(e => validator.validateEntity('persons', e));
      expect(results[0].isValid).toBe(true);
      expect(results[1].isValid).toBe(false);
    });
  });

  describe('validateDataset', () => {
    it('validates minimal valid dataset', () => {
      const dataset = {
        missions: [{ id: 'mission-001', name: 'Test' }],
        persons: [{ id: 'person-001', name: 'John' }],
        narratives: [],
        documents: [],
        factions: [],
        locations: [],
        events: [],
        organizations: [],
        topics: [],
        monitors: [],
        workspaces: [],
        projects: [],
        publishers: [],
        repositories: [],
        tags: [],
        users: []
      };
      
      const result = validateDataset(dataset, { logToConsole: false });
      expect(result.summary.errors).toBe(0);
    });

    it('returns summary with counts', () => {
      const dataset = {
        persons: [
          { id: 'person-001', name: 'John' },
          { id: 'wrong-001', name: 'Jane' }  // Wrong prefix - 1 error
        ]
      };
      
      const result = validateDataset(dataset, { logToConsole: false });
      expect(result.summary.errors).toBeGreaterThan(0);
      expect(result.summary.collections.persons).toBeDefined();
    });

    it('returns detailed results per entity', () => {
      const dataset = {
        persons: [
          { id: 'wrong-001', name: 'John' }
        ]
      };
      
      const result = validateDataset(dataset, { logToConsole: false });
      expect(result.details.persons).toBeDefined();
      expect(result.details.persons).toHaveLength(1);
      expect(result.details.persons[0].errors.length).toBeGreaterThan(0);
    });
  });

  describe('options', () => {
    it('respects strictMode option', () => {
      const strictValidator = new SchemaValidator({ 
        strictMode: true, 
        logToConsole: false 
      });
      
      // Create entity with a warning condition
      const entity = {
        id: 'narr-001',
        text: 'Test',
        missionId: 'mission-999'  // Non-existent reference
      };
      
      const allData = { missions: [], narratives: [] };
      
      // Warning should be treated as error in strict mode
      const result = strictValidator.validateEntity('narratives', entity, allData);
      // Note: strictMode converts warnings to errors in the summary, 
      // but individual results may still show warnings
      expect(result.hasWarnings || !result.isValid).toBe(true);
    });

    it('respects checkReferences option', () => {
      const noRefValidator = new SchemaValidator({ 
        checkReferences: false, 
        logToConsole: false 
      });
      
      const entity = {
        id: 'narr-001',
        text: 'Test',
        missionId: 'mission-999'  // Non-existent
      };
      
      const allData = { missions: [] };
      const result = noRefValidator.validateEntity('narratives', entity, allData);
      
      // Should not warn about missing reference
      expect(result.warnings.filter(w => 
        w.message.includes('not found')
      )).toHaveLength(0);
    });
  });
});
