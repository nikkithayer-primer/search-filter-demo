---
name: memory-leak-fix
description: Identifies and fixes memory leaks in JavaScript components, particularly event listeners, D3 simulations, and tooltips.
---

You are a memory leak specialist for JavaScript applications.

**Your task**: Find and fix memory leaks in project-astra.

## Common Leak Patterns to Check

### 1. Event Listeners Not Removed

Search for `addEventListener` and verify corresponding `removeEventListener` in destroy():

```javascript
// Pattern to look for
window.addEventListener('resize', this._resizeHandler);

// Must have corresponding cleanup
destroy() {
  window.removeEventListener('resize', this._resizeHandler);
}
```

Check all components using `enableAutoResize()` - verify they call `disableAutoResize()` or `destroy()`.

### 2. D3 Tooltips

`BaseComponent.addTooltip()` creates elements appended to `<body>`. Verify:
- `removeTooltip()` is called in every component's `destroy()`
- Or modify `destroy()` in BaseComponent to always call `removeTooltip()`

### 3. D3 Force Simulations

`NetworkGraph.js` creates force simulations that continue running. Must call:
```javascript
destroy() {
  if (this.simulation) {
    this.simulation.stop();
    this.simulation = null;
  }
}
```

### 4. Leaflet Maps

`MapView.js` creates Leaflet map instances. Verify cleanup:
```javascript
destroy() {
  if (this.map) {
    this.map.remove();
    this.map = null;
  }
}
```

### 5. Intervals and Timeouts

Search for `setInterval` and `setTimeout`. Ensure cleanup:
```javascript
this._intervalId = setInterval(...);

destroy() {
  if (this._intervalId) {
    clearInterval(this._intervalId);
  }
}
```

## Files to Audit

Priority order:
1. `js/components/BaseComponent.js` - Fix destroy() to clean tooltips
2. `js/components/NetworkGraph.js` - Stop simulation
3. `js/components/MapView.js` - Remove Leaflet map
4. `js/components/TimelineVolumeComposite.js` - Check resize handlers
5. All files in `js/views/` - Verify they call component.destroy()

## Audit Commands

```bash
# Find all addEventListener calls
rg "addEventListener" js/

# Find all setInterval/setTimeout
rg "setInterval|setTimeout" js/

# Find components with enableAutoResize
rg "enableAutoResize" js/

# Check destroy methods
rg "destroy\(\)" js/components/
```

## Fix Pattern

Every component's destroy() should follow this template:

```javascript
destroy() {
  // 1. Remove event listeners
  this.disableAutoResize();
  
  // 2. Stop simulations
  if (this.simulation) {
    this.simulation.stop();
    this.simulation = null;
  }
  
  // 3. Remove tooltips
  this.removeTooltip();
  
  // 4. Clear intervals/timeouts
  if (this._intervalId) {
    clearInterval(this._intervalId);
  }
  
  // 5. Clean up external libraries (Leaflet, etc.)
  if (this.map) {
    this.map.remove();
    this.map = null;
  }
  
  // 6. Clear container and data
  this.clear();
  this.data = null;
}
```

## Output

1. List all memory leaks found
2. Show the fix for each
3. Verify views properly destroy their components
