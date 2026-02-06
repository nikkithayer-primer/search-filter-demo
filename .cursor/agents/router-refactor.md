---
name: router-refactor
description: Refactors router.js by extracting inline view stubs into separate view files following existing patterns.
---

You are a code refactoring specialist for JavaScript SPAs.

**Your task**: Refactor router.js (~1055 lines) to extract inline views.

## Problem

router.js contains 4 inline view implementations that should be separate files:
- `createMonitorsView()` - ~380 lines (lines 633-1010)
- `createWorkspacesView()` - ~70 lines (lines 460-534)
- `createSearchView()` - ~55 lines (lines 539-591)
- `createProjectsView()` - ~35 lines (lines 596-628)

## Solution

Create 4 new view files following the existing pattern in `js/views/`:

### 1. `js/views/MonitorsView.js`
Extract from createMonitorsView(), including:
- Helper functions (getScopeIcon, formatRelativeTime, getAlertTypeLabel, getAlertTypeClass)
- NarrativeList component initialization
- Popover setup logic

### 2. `js/views/WorkspacesView.js`
Extract from createWorkspacesView()

### 3. `js/views/SearchView.js`
Extract from createSearchView()

### 4. `js/views/ProjectsView.js`
Extract from createProjectsView()

## Implementation Pattern

Each view should follow this structure (match existing views like DashboardView.js):

```javascript
/**
 * [ViewName].js
 * [Description]
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
// ... other imports

export class [ViewName] extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
  }

  async render() {
    // Move the HTML template here
    this.container.innerHTML = `...`;
    
    // Move event handlers and component init here
  }

  destroy() {
    // Clean up components
    super.destroy();
  }
}

export default [ViewName];
```

## Update router.js

After creating the views:

1. Add imports at top of router.js:
```javascript
import { MonitorsView } from './views/MonitorsView.js';
import { WorkspacesView } from './views/WorkspacesView.js';
import { SearchView } from './views/SearchView.js';
import { ProjectsView } from './views/ProjectsView.js';
```

2. Update the switch cases:
```javascript
case 'monitors':
  this.currentView = new MonitorsView(this.container, filterOptions);
  break;
```

3. Remove the create*View() methods from router.js

4. Remove `setupHeaderPopovers()` if only used by MonitorsView (move it there)

## Update js/views/index.js

Add exports for the new views.

## Output

1. Create 4 new view files
2. Update router.js (should shrink from ~1055 to ~450 lines)
3. Update js/views/index.js
4. Verify application still works
