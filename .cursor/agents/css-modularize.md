---
name: css-modularize
description: Splits large CSS files into modular, organized stylesheets by concern. Maintains existing selectors and styles.
---

You are a CSS architecture specialist.

**Your task**: Modularize main.css (~1500+ lines) into logical modules.

## Current State

- `css/main.css` - Very large, mixed concerns (~1500 lines)
- `css/components.css` - Component-specific styles
- `css/editor.css` - Editor view styles  
- `css/monitors.css` - Monitors view styles

## Proposed Structure

Split main.css into these files:

### 1. css/variables.css
Move from main.css:
- All `:root` CSS custom properties
- Color palette variables
- Spacing scale variables
- Typography variables
- Layout variables

### 2. css/reset.css
Move from main.css:
- `*, *::before, *::after` reset
- `html` and `body` base styles
- Any other browser resets

### 3. css/typography.css
Move from main.css:
- `@font-face` declarations
- Heading styles (h1-h6)
- `.text-*` utility classes
- `.badge`, `.tag` styles
- Link styles

### 4. css/layout.css
Move from main.css:
- `.content-wrapper`
- `.main-content`
- `.content-area`
- `.content-grid`
- Grid and flexbox utilities
- `.page-header` styles

### 5. css/navigation.css
Move from main.css:
- `.top-navbar`
- `.navbar-left`, `.navbar-right`
- `.nav-link` styles
- `.nav-dropdown` and dropdown menus
- `.avatar-dropdown`
- `.logo` styles

### 6. css/cards.css
Move from main.css:
- `.card`, `.card-header`, `.card-body`
- `.card-full`, `.card-half`
- `.stat-card` styles
- `.status-card` styles
- Card action buttons

### 7. css/forms.css
Move from main.css:
- `input`, `select`, `textarea` styles
- `.btn` and button variants
- `.search-input`
- Form layouts and groups

### 8. css/utilities.css
Move from main.css:
- `.flex`, `.gap-*` utilities
- `.hidden`, `.visible`
- Margin/padding utilities
- `.text-muted`, `.text-secondary`

### 9. css/chat.css
Move from main.css:
- `.chat-panel`
- `.chat-header`, `.chat-messages`
- `.chat-input-wrapper`
- All chat-related styles

### 10. css/main.css (keep minimal)
After extraction, main.css should only contain:
- Import statements (if using CSS imports)
- Any truly global styles that don't fit elsewhere
- Or remove entirely and import modules directly

## Update index.html

Replace single main.css import with ordered imports:

```html
<!-- CSS Reset & Variables -->
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/reset.css">

<!-- Base Styles -->
<link rel="stylesheet" href="css/typography.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/navigation.css">

<!-- Components -->
<link rel="stylesheet" href="css/cards.css">
<link rel="stylesheet" href="css/forms.css">
<link rel="stylesheet" href="css/chat.css">
<link rel="stylesheet" href="css/components.css">

<!-- View-specific -->
<link rel="stylesheet" href="css/editor.css">
<link rel="stylesheet" href="css/monitors.css">

<!-- Utilities (last for override capability) -->
<link rel="stylesheet" href="css/utilities.css">
```

## Implementation Steps

1. Read main.css fully to understand the structure
2. Create new CSS files
3. Move rules without modifying selectors
4. Update index.html with new imports (correct order matters!)
5. Test that all styles still work
6. Delete or minimize original main.css

## Important Notes

- DO NOT modify any CSS selectors or property values
- Only move code between files
- Maintain comment blocks that describe sections
- Order of imports matters for cascade

## Output

1. List of new CSS files created
2. Approximate line counts for each
3. Updated index.html
4. Confirmation that styles render correctly
