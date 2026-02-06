# Dropdown Component Specification

## Overview

A unified dropdown component system to replace the various dropdown implementations across the app. This provides consistent behavior, styling, and z-index management.

## Decision: When to Use What

| Scenario | Solution |
|----------|----------|
| Simple single-select with few options | Native `<select>` element |
| Action menu (Edit, Archive, etc.) | `Dropdown` component |
| Dropdown with sections/headers | `Dropdown` component with sections |
| Multi-select with checkboxes | `Dropdown` component with checkbox items |
| Complex picker with search | Modal (keep existing pattern) |

---

## API Design

### HTML Structure

```html
<!-- Basic dropdown -->
<div class="dropdown" data-dropdown>
  <button class="dropdown-trigger" data-dropdown-trigger>
    Options
    <svg class="dropdown-arrow">...</svg>
  </button>
  <div class="dropdown-menu" data-dropdown-menu>
    <button class="dropdown-item" data-action="edit">Edit</button>
    <button class="dropdown-item" data-action="archive">Archive</button>
  </div>
</div>

<!-- Dropdown with sections -->
<div class="dropdown" data-dropdown>
  <button class="dropdown-trigger" data-dropdown-trigger>
    Filters
  </button>
  <div class="dropdown-menu" data-dropdown-menu>
    <div class="dropdown-header">Saved Filters</div>
    <button class="dropdown-item">Filter 1</button>
    <button class="dropdown-item">Filter 2</button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item dropdown-item--action">
      <svg>...</svg> New Filter
    </button>
  </div>
</div>

<!-- Multi-select dropdown -->
<div class="dropdown" data-dropdown data-dropdown-multi>
  <button class="dropdown-trigger" data-dropdown-trigger>
    Classifications
  </button>
  <div class="dropdown-menu" data-dropdown-menu>
    <div class="dropdown-header">
      <label class="dropdown-checkbox">
        <input type="checkbox" data-select-all />
        <span>Select All</span>
      </label>
    </div>
    <div class="dropdown-divider"></div>
    <label class="dropdown-checkbox">
      <input type="checkbox" name="class" value="secret" />
      <span>Secret</span>
    </label>
    <label class="dropdown-checkbox">
      <input type="checkbox" name="class" value="confidential" />
      <span>Confidential</span>
    </label>
  </div>
</div>
```

### Configuration Attributes

| Attribute | Description |
|-----------|-------------|
| `data-dropdown` | Marks the container as a dropdown |
| `data-dropdown-trigger` | The element that toggles the dropdown |
| `data-dropdown-menu` | The menu container |
| `data-dropdown-multi` | Enables multi-select mode (don't close on item click) |
| `data-dropdown-align="right"` | Align menu to right edge (default: left) |
| `data-dropdown-direction="up"` | Open upward instead of downward |

### JavaScript API

```javascript
import { Dropdown } from './components/Dropdown.js';

// Initialize all dropdowns on page
Dropdown.initAll(container);

// Initialize single dropdown
const dropdown = new Dropdown(element, {
  align: 'right',        // 'left' | 'right'
  direction: 'down',     // 'down' | 'up'
  closeOnSelect: true,   // Close when item clicked
  closeOnClickOutside: true,
  onOpen: () => {},
  onClose: () => {},
  onSelect: (item) => {}
});

// Programmatic control
dropdown.open();
dropdown.close();
dropdown.toggle();
dropdown.destroy();

// Static method to close all open dropdowns
Dropdown.closeAll();
```

---

## CSS Classes

### Base Classes

```css
.dropdown                    /* Container */
.dropdown.is-open           /* Open state */
.dropdown-trigger           /* Trigger button */
.dropdown-arrow             /* Arrow icon in trigger */
.dropdown-menu              /* Menu container */
.dropdown-item              /* Menu item (button or link) */
.dropdown-item:hover        /* Hover state */
.dropdown-item.is-selected  /* Selected state */
.dropdown-item:disabled     /* Disabled state */
```

### Variant Classes

```css
.dropdown-header            /* Section header text */
.dropdown-divider           /* Horizontal divider */
.dropdown-checkbox          /* Checkbox item wrapper */
.dropdown-item--action      /* Action item with icon (e.g., "New Filter") */
.dropdown-item--danger      /* Destructive action (red) */
```

### Modifier Classes

```css
.dropdown--icon-trigger     /* Trigger is just an icon (like 3-dot menu) */
.dropdown--compact          /* Smaller padding */
.dropdown--wide             /* Wider menu (min-width: 240px) */
```

---

## Z-Index Management

All dropdowns use a consistent z-index scale:

```css
:root {
  --z-dropdown: 100;
  --z-dropdown-nested: 110;
  --z-modal: 200;
  --z-tooltip: 300;
}

.dropdown-menu {
  z-index: var(--z-dropdown);
}
```

---

## Migration Plan

### Phase 1: Create Base Component
1. Create `js/components/Dropdown.js` with core functionality
2. Create unified CSS in `css/dropdown.css`
3. Add to existing CSS bundle

### Phase 2: Migrate Simple Dropdowns
1. Card action menus (Monitor, Workspace, Project cards)
2. Visualization type dropdown in monitors
3. Nav dropdowns (Filters, Data)

### Phase 3: Migrate Complex Dropdowns  
1. Avatar dropdown (uses sections)
2. Column filter dropdowns (multi-select)
3. Search page filter dropdowns (multi-select with select-all)

### Phase 4: Cleanup
1. Remove old dropdown CSS classes
2. Remove redundant JavaScript handlers
3. Update documentation

---

## Usage Examples

### Action Menu (Card)

```javascript
// In CardBuilder.js
actionMenu(entityType, entityId, options = {}) {
  return `
    <div class="dropdown dropdown--icon-trigger" data-dropdown data-dropdown-align="right">
      <button class="dropdown-trigger" data-dropdown-trigger title="More actions">
        <svg><!-- 3-dot icon --></svg>
      </button>
      <div class="dropdown-menu" data-dropdown-menu>
        <button class="dropdown-item" data-action="edit">
          <svg><!-- edit icon --></svg>
          Edit
        </button>
        <button class="dropdown-item" data-action="archive">
          <svg><!-- archive icon --></svg>
          ${options.isArchived ? 'Restore' : 'Archive'}
        </button>
      </div>
    </div>
  `;
}
```

### Filter Dropdown (Multi-select)

```javascript
// In SearchView.js
renderClassificationFilter() {
  return `
    <div class="dropdown" data-dropdown data-dropdown-multi>
      <button class="dropdown-trigger" data-dropdown-trigger>
        Classifications
        <svg class="dropdown-arrow">...</svg>
      </button>
      <div class="dropdown-menu" data-dropdown-menu>
        <div class="dropdown-header">
          <label class="dropdown-checkbox">
            <input type="checkbox" data-select-all />
            <span>All Classifications</span>
          </label>
        </div>
        <div class="dropdown-divider"></div>
        ${this.classifications.map(c => `
          <label class="dropdown-checkbox">
            <input type="checkbox" value="${c.id}" ${c.selected ? 'checked' : ''} />
            <span>${c.name}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;
}
```

---

## Native `<select>` Guidelines

Continue using native `<select>` for:
- Mission dropdown (COP)
- Document type filter
- Entity type filter
- Any simple single-select with < 10 options
- Settings page options

Benefits:
- Accessible by default
- Mobile-friendly
- No JavaScript needed
- Consistent with OS styling

Style with `.form-select` class for consistent appearance.
