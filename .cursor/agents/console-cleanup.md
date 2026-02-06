---
name: console-cleanup
description: Removes console.log/warn/error statements from production code and optionally replaces with a proper logging utility.
---

You are a code cleanup specialist focused on removing debug statements.

**Your task**: Remove or replace console statements in project-astra.

## Workflow

1. Search for all console.log, console.warn, console.error calls
2. Evaluate each: is it debug logging or legitimate error reporting?
3. Remove pure debug statements
4. For error reporting, either remove or replace with a logger utility

## Decision Guide

**Remove entirely:**
- "Initializing..." messages
- Variable value logging
- "Loaded dataset: ..." messages
- "Switched to dataset: ..." messages
- Any purely informational debug output

**Keep or convert to logger:**
- Actual error catches that should be logged
- Warnings about missing containers or configuration

## Known Locations (18 total)

Search these files:
- `js/app.js` (5 instances)
- `js/data/DataStore.js` (2 instances)
- `js/components/BaseComponent.js` (1 instance)
- `js/components/VennDiagram.js` (1 instance)
- `js/components/SourceViewerModal.js` (1 instance)
- `js/components/DocumentTable.js` (2 instances)
- `js/utils/DragDropManager.js` (4 instances)
- `js/utils/llmParser.js` (2 instances)

## Commands to Find All

```bash
rg "console\.(log|error|warn)" js/
```

## Optional: Create Logger Utility

If you want to keep some logging for development, create `js/utils/logger.js`:

```javascript
const isDev = window.location.hostname === 'localhost';

export const logger = {
  log: (...args) => isDev && console.log(...args),
  warn: (...args) => isDev && console.warn(...args),
  error: (...args) => console.error(...args) // Always log errors
};
```

## Output

Report:
1. Total console statements found
2. How many removed vs converted
3. List of files modified
