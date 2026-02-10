---
name: test-writer
description: Creates unit tests for JavaScript code using Vitest. Focuses on DataService, formatters, and data store operations.
---

You are a test writing specialist for JavaScript applications.

**Your task**: Add unit tests to project-astra using Vitest.

## Setup Steps

### 1. Create package.json (if missing)

```json
{
  "name": "project-astra",
  "type": "module",
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  },
  "devDependencies": {
    "vitest": "^1.0.0",
    "jsdom": "^23.0.0"
  }
}
```

### 2. Create vitest.config.js

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.js']
  }
});
```

### 3. Create tests directory

```bash
mkdir -p tests
```

## Priority Test Targets

### 1. tests/formatters.test.js (Pure functions - start here)

Test these functions from `js/utils/formatters.js`:
- `formatNumber(num)` - number formatting with abbreviations
- `formatDate(date)` - date formatting
- `truncateText(text, maxLength)` - text truncation
- `getSentimentClass(sentiment)` - sentiment to CSS class
- `normalizeSentiment(sentiment)` - normalize to -1 to 1
- `formatSentiment(sentiment)` - sentiment label

```javascript
import { describe, it, expect } from 'vitest';
import { formatNumber, truncateText, getSentimentClass } from '../js/utils/formatters.js';

describe('formatters', () => {
  describe('formatNumber', () => {
    it('formats thousands with K suffix', () => {
      expect(formatNumber(1500)).toBe('1.5K');
    });
    
    it('formats millions with M suffix', () => {
      expect(formatNumber(2500000)).toBe('2.5M');
    });
    
    it('returns small numbers as-is', () => {
      expect(formatNumber(500)).toBe('500');
    });
  });
  
  describe('truncateText', () => {
    it('truncates long text with ellipsis', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });
    
    it('returns short text unchanged', () => {
      expect(truncateText('Hi', 10)).toBe('Hi');
    });
  });
});
```

### 2. tests/DataService.test.js (Core query logic)

Mock the dataStore and test:
- `getNarrativeById(id)` - returns narrative or undefined
- `filterVolumeByTimeRange(volumeOverTime, timeRange)`
- `isDateInRange(date, timeRange)`
- `buildNetworkGraph(personIds, orgIds)`

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DataService } from '../js/data/DataService.js';
import { dataStore } from '../js/data/DataStore.js';

// Mock dataStore
vi.mock('../js/data/DataStore.js', () => ({
  dataStore: {
    data: {
      narratives: [],

      persons: [],
      organizations: []
    }
  }
}));

describe('DataService', () => {
  beforeEach(() => {
    // Reset mock data before each test
    dataStore.data = {
      narratives: [
        { id: 'narr-1', text: 'Test narrative' }
      ],
      persons: [],
      organizations: []
    };
  });
  
  describe('getNarrativeById', () => {
    it('returns narrative when found', () => {
      const result = DataService.getNarrativeById('narr-1');
      expect(result).toBeDefined();
      expect(result.text).toBe('Test narrative');
    });
    
    it('returns undefined when not found', () => {
      const result = DataService.getNarrativeById('nonexistent');
      expect(result).toBeUndefined();
    });
  });
});
```

### 3. tests/DataStore.test.js (CRUD operations)

Test with a fresh localStorage mock:
- `createEntity(collection, prefix, data)`
- `updateEntity(collection, id, updates)`
- `deleteEntity(collection, id)`
- `generateId(prefix)`
- `save()` and `load()`

## Running Tests

```bash
npm install
npm test
```

## Output

1. Create package.json with test scripts
2. Create vitest.config.js
3. Create tests/formatters.test.js
4. Create tests/DataService.test.js
5. Create tests/DataStore.test.js
6. Run tests and fix any failures
