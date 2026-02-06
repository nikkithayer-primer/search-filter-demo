/**
 * BooleanExpressionEditor.js
 * A contenteditable-based editor for building boolean expressions
 * Supports entity chips via @mentions, quoted strings, and boolean operators
 * 
 * Usage:
 *   const editor = new BooleanExpressionEditor(containerEl, {
 *     onChange: (expression, ast, error) => { ... },
 *     getEntities: () => [...] // Function that returns available entities
 *   });
 *   editor.setExpression('@org-001 AND "keyword"');
 *   const expr = editor.getExpression();
 */

import { BooleanParser } from '../utils/BooleanParser.js';
import { DataService } from '../data/DataService.js';
import { escapeHtml } from '../utils/htmlUtils.js';

// SVG icons for entity types
const ENTITY_ICONS = {
  person: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="8" cy="5" r="2.5"/>
    <path d="M3 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/>
  </svg>`,
  organization: `<svg viewBox="0 0 16 16" fill="currentColor">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 16H9.5C9.59107 16 9.67646 15.9757 9.75 15.9331C9.82354 15.9757 9.90893 16 10 16H15.5C15.7761 16 16 15.7761 16 15.5V4.5C16 4.22386 15.7761 4 15.5 4H10V0.5C10 0.223858 9.77614 0 9.5 0H0.5C0.223858 0 0 0.223858 0 0.5V15.5C0 15.7761 0.223858 16 0.5 16ZM1 15V1H9V15H7V13C7 12.7239 6.77614 12.5 6.5 12.5H3.5C3.22386 12.5 3 12.7239 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z"/>
  </svg>`,
  faction: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M3 13V5l5-3 5 3v8"/>
    <path d="M6 13v-4h4v4"/>
  </svg>`,
  location: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
    <circle cx="8" cy="6" r="2"/>
  </svg>`,
  event: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
    <rect x="2" y="3" width="12" height="11" rx="1"/>
    <path d="M5 1v3M11 1v3M2 7h12"/>
  </svg>`,
  keyword: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M4 6h8M4 10h6"/>
  </svg>`
};

// Entity type configurations
const ENTITY_TYPES = [
  { key: 'persons', label: 'People', type: 'person', idPrefix: 'person-', getter: () => DataService.getPersons() },
  { key: 'organizations', label: 'Organizations', type: 'organization', idPrefix: 'org-', getter: () => DataService.getOrganizations() },
  { key: 'factions', label: 'Factions', type: 'faction', idPrefix: 'faction-', getter: () => DataService.getFactions() },
  { key: 'locations', label: 'Locations', type: 'location', idPrefix: 'loc-', getter: () => DataService.getLocations() },
  { key: 'events', label: 'Events', type: 'event', idPrefix: 'event-', getter: () => DataService.getEvents() }
];

export class BooleanExpressionEditor {
  /**
   * Create a BooleanExpressionEditor instance
   * @param {HTMLElement} container - The container element to render into
   * @param {Object} options - Configuration options
   * @param {Function} options.onChange - Callback when expression changes: (expression, ast, error) => void
   * @param {string} options.placeholder - Placeholder text for empty editor
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      onChange: options.onChange || (() => {}),
      placeholder: options.placeholder || 'Type @ to insert entity, or enter text...'
    };
    
    // Parser instance
    this.parser = new BooleanParser();
    
    // UI state
    this.typeahead = {
      visible: false,
      query: '',
      items: [],
      selectedIndex: 0,
      searchStart: 0
    };
    
    // Entity map for display (id -> { name, type })
    this.entityMap = {};
    
    // DOM references
    this.editorEl = null;
    this.typeaheadEl = null;
    this.statusEl = null;
    
    // Bind methods
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    
    this.render();
  }

  /**
   * Render the editor component
   */
  render() {
    this.container.innerHTML = `
      <div class="boolean-editor-wrapper">
        <div class="boolean-editor" 
             contenteditable="true" 
             data-placeholder="${this.escapeHtml(this.options.placeholder)}"
             spellcheck="false"></div>
        
        <div class="boolean-editor-typeahead" style="display: none;">
          <div class="typeahead-header">
            <span class="typeahead-query"></span>
            <span class="typeahead-hint">Enter to select</span>
          </div>
          <div class="typeahead-results"></div>
        </div>
        
        <div class="boolean-editor-hints">
          <span class="editor-hint"><span class="hint-key">@</span> entity</span>
          <span class="editor-hint"><span class="hint-key">"..."</span> keyword</span>
          <span class="editor-hint"><span class="hint-key">()</span> group</span>
          <span class="editor-hint"><span class="hint-key">AND OR NOT</span> operators</span>
        </div>
        
        <div class="boolean-editor-status"></div>
      </div>
    `;
    
    // Get DOM references
    this.editorEl = this.container.querySelector('.boolean-editor');
    this.typeaheadEl = this.container.querySelector('.boolean-editor-typeahead');
    this.statusEl = this.container.querySelector('.boolean-editor-status');
    
    // Attach event listeners
    this.editorEl.addEventListener('input', this.handleInput);
    this.editorEl.addEventListener('keydown', this.handleKeyDown);
    this.editorEl.addEventListener('blur', this.handleBlur);
    this.editorEl.addEventListener('paste', this.handlePaste);
    
    // Typeahead click handler
    this.typeaheadEl.addEventListener('click', (e) => {
      const item = e.target.closest('.typeahead-item');
      if (item) {
        const id = item.dataset.id;
        const name = item.dataset.name;
        const type = item.dataset.type;
        this.insertEntityAtCursor(id, name, type);
      }
    });
  }

  /**
   * Handle input events on the editor
   */
  handleInput(e) {
    const text = this.editorEl.innerText;
    
    // Check for @ trigger
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const textBeforeCursor = this.getTextBeforeCursor(range);
      
      // Find @ symbol before cursor
      const atMatch = textBeforeCursor.match(/@([a-zA-Z0-9_-]*)$/);
      if (atMatch) {
        this.typeahead.query = atMatch[1];
        this.typeahead.searchStart = textBeforeCursor.length - atMatch[0].length;
        this.showTypeahead(atMatch[1]);
        return;
      }
    }
    
    this.hideTypeahead();
    this.parseAndNotify();
  }

  /**
   * Handle keydown events
   */
  handleKeyDown(e) {
    // Handle typeahead navigation
    if (this.typeahead.visible) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.typeahead.selectedIndex = Math.min(
          this.typeahead.selectedIndex + 1,
          this.typeahead.items.length - 1
        );
        this.updateTypeaheadSelection();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.typeahead.selectedIndex = Math.max(this.typeahead.selectedIndex - 1, 0);
        this.updateTypeaheadSelection();
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        const selected = this.typeahead.items[this.typeahead.selectedIndex];
        if (selected) {
          this.insertEntityAtCursor(selected.id, selected.name, selected.type);
        }
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        this.hideTypeahead();
        return;
      }
    }
    
    // Prevent enter from creating new lines (unless shift is held)
    if (e.key === 'Enter' && !e.shiftKey && !this.typeahead.visible) {
      e.preventDefault();
    }
  }

  /**
   * Handle blur events
   */
  handleBlur(e) {
    // Delay hiding typeahead to allow clicks to register
    setTimeout(() => {
      if (!this.container.contains(document.activeElement)) {
        this.hideTypeahead();
      }
    }, 150);
  }

  /**
   * Handle paste events - ensure only plain text is pasted
   */
  handlePaste(e) {
    e.preventDefault();
    
    // Get plain text from clipboard
    const text = e.clipboardData?.getData('text/plain') || '';
    
    // Insert as plain text at cursor position
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      
      // Create a text node with the pasted content
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);
      
      // Move cursor to end of pasted text
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    // Trigger input handling
    this.hideTypeahead();
    this.parseAndNotify();
  }

  /**
   * Get text content before cursor position
   */
  getTextBeforeCursor(range) {
    const preRange = range.cloneRange();
    preRange.selectNodeContents(this.editorEl);
    preRange.setEnd(range.startContainer, range.startOffset);
    return preRange.toString();
  }

  /**
   * Show the entity typeahead popup
   */
  showTypeahead(query) {
    const queryLower = query.toLowerCase();
    const results = [];
    
    // Search all entity types
    ENTITY_TYPES.forEach(({ label, type, getter }) => {
      const entities = getter();
      const matches = entities.filter(e => {
        const name = e.name || e.text || e.headline || '';
        return name.toLowerCase().includes(queryLower);
      }).slice(0, 5);
      
      if (matches.length > 0) {
        results.push({
          label,
          type,
          items: matches.map(e => ({
            id: e.id,
            name: e.name || e.text || e.headline || 'Unnamed',
            type
          }))
        });
      }
    });
    
    // Flatten items for selection
    this.typeahead.items = results.flatMap(g => g.items);
    this.typeahead.selectedIndex = 0;
    this.typeahead.visible = true;
    
    // Render typeahead
    const resultsHtml = results.map(group => `
      <div class="typeahead-section">
        <div class="typeahead-section-label">${group.label}</div>
        ${group.items.map((item, i) => {
          const globalIndex = this.typeahead.items.findIndex(t => t.id === item.id);
          return `
            <div class="typeahead-item ${globalIndex === 0 ? 'selected' : ''}" 
                 data-id="${item.id}" 
                 data-name="${this.escapeHtml(item.name)}"
                 data-type="${item.type}"
                 data-index="${globalIndex}">
              ${ENTITY_ICONS[item.type] || ''}
              <span>${this.escapeHtml(item.name)}</span>
            </div>
          `;
        }).join('')}
      </div>
    `).join('');
    
    const queryEl = this.typeaheadEl.querySelector('.typeahead-query');
    const resultsEl = this.typeaheadEl.querySelector('.typeahead-results');
    
    queryEl.innerHTML = query ? `Searching: <strong>${this.escapeHtml(query)}</strong>` : 'All entities';
    resultsEl.innerHTML = resultsHtml || '<div class="typeahead-empty">No matches found</div>';
    
    this.typeaheadEl.style.display = 'block';
  }

  /**
   * Hide the typeahead popup
   */
  hideTypeahead() {
    this.typeahead.visible = false;
    this.typeahead.items = [];
    this.typeaheadEl.style.display = 'none';
  }

  /**
   * Update typeahead selection highlighting
   */
  updateTypeaheadSelection() {
    const items = this.typeaheadEl.querySelectorAll('.typeahead-item');
    items.forEach((item, i) => {
      const index = parseInt(item.dataset.index, 10);
      item.classList.toggle('selected', index === this.typeahead.selectedIndex);
    });
  }

  /**
   * Insert an entity chip at the current cursor position
   */
  insertEntityAtCursor(id, name, type) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    
    // Find and remove the @query text
    const textBeforeCursor = this.getTextBeforeCursor(range);
    const atMatch = textBeforeCursor.match(/@([a-zA-Z0-9_-]*)$/);
    
    if (atMatch) {
      // Delete the @query text
      const deleteRange = document.createRange();
      deleteRange.setStart(range.startContainer, range.startOffset - atMatch[0].length);
      deleteRange.setEnd(range.startContainer, range.startOffset);
      deleteRange.deleteContents();
    }
    
    // Create entity chip
    const chip = this.createEntityChip(id, name, type);
    
    // Insert chip
    const newRange = selection.getRangeAt(0);
    newRange.insertNode(chip);
    
    // Add space after chip
    const space = document.createTextNode(' ');
    chip.after(space);
    
    // Move cursor after space
    const cursorRange = document.createRange();
    cursorRange.setStartAfter(space);
    cursorRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(cursorRange);
    
    // Store entity in map for display purposes
    this.entityMap[id] = { name, type };
    
    this.hideTypeahead();
    this.editorEl.focus();
    this.parseAndNotify();
  }

  /**
   * Create an entity chip DOM element
   */
  createEntityChip(id, name, type) {
    const chip = document.createElement('span');
    chip.className = `entity-chip entity-chip-${type}`;
    chip.contentEditable = 'false';
    chip.dataset.entityId = id;
    chip.dataset.entityName = name;
    chip.dataset.entityType = type;
    chip.innerHTML = `${ENTITY_ICONS[type] || ''}${this.escapeHtml(name)}`;
    return chip;
  }

  /**
   * Get the current expression string (with entity IDs)
   * Also returns a position map for error highlighting
   */
  getExpression() {
    const result = { expression: '', entityMap: {}, positionMap: [] };
    let text = '';
    
    const traverse = (node) => {
      if (!node) return;
      
      if (node.nodeType === Node.TEXT_NODE) {
        const content = node.textContent;
        for (let i = 0; i < content.length; i++) {
          result.positionMap.push({ node, offset: i, isChip: false });
        }
        text += content;
        return;
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Entity chip
        if (node.classList?.contains('entity-chip')) {
          const id = node.dataset.entityId;
          const name = node.dataset.entityName;
          const type = node.dataset.entityType;
          result.entityMap[id] = { name, type };
          const entityRef = `@${id}`;
          // Map all positions in entity reference to the chip node
          for (let i = 0; i < entityRef.length; i++) {
            result.positionMap.push({ node, offset: i, isChip: true });
          }
          text += entityRef;
          return;
        }
        
        // Error marker - skip
        if (node.classList?.contains('error-marker')) {
          return;
        }
        
        // Recurse into children
        node.childNodes.forEach(child => traverse(child));
      }
    };
    
    traverse(this.editorEl);
    
    // Trim and adjust position map
    const trimmedText = text.replace(/\u00A0/g, ' ').trim();
    const startTrim = text.replace(/\u00A0/g, ' ').length - text.replace(/\u00A0/g, ' ').trimStart().length;
    
    result.expression = trimmedText;
    result.positionMap = result.positionMap.slice(startTrim);
    
    return result;
  }

  /**
   * Set the expression (with entity chips)
   * @param {string} expression - The boolean expression with @entity-ids
   * @param {Object} entityMap - Map of entity IDs to {name, type}
   */
  setExpression(expression, entityMap = {}) {
    this.entityMap = { ...entityMap };
    
    if (!expression) {
      this.editorEl.innerHTML = '';
      this.parseAndNotify();
      return;
    }
    
    // Parse and rebuild with chips
    let html = '';
    let pos = 0;
    const entityRegex = /@([a-zA-Z0-9_-]+)/g;
    let match;
    
    while ((match = entityRegex.exec(expression)) !== null) {
      // Add text before this entity
      html += this.escapeHtml(expression.slice(pos, match.index));
      
      const id = match[1];
      const entityInfo = entityMap[id] || this.lookupEntity(id);
      
      if (entityInfo) {
        const chip = this.createEntityChip(id, entityInfo.name, entityInfo.type);
        html += chip.outerHTML;
        this.entityMap[id] = entityInfo;
      } else {
        // Unknown entity - keep as text
        html += this.escapeHtml(match[0]);
      }
      
      pos = match.index + match[0].length;
    }
    
    // Add remaining text
    html += this.escapeHtml(expression.slice(pos));
    
    this.editorEl.innerHTML = html;
    this.parseAndNotify();
  }

  /**
   * Look up an entity by ID from DataService
   */
  lookupEntity(id) {
    // Try to determine type from ID prefix
    for (const { type, idPrefix, getter } of ENTITY_TYPES) {
      if (id.startsWith(idPrefix)) {
        const entities = getter();
        const entity = entities.find(e => e.id === id);
        if (entity) {
          return {
            name: entity.name || entity.text || entity.headline || 'Unnamed',
            type
          };
        }
      }
    }
    return null;
  }

  /**
   * Parse the current expression and notify listeners
   */
  parseAndNotify() {
    const { expression, entityMap, positionMap } = this.getExpression();
    const { ast, error } = this.parser.parse(expression);
    
    // Update status display
    this.updateStatus(error);
    
    // Clear any existing error markers
    this.clearErrorMarkers();
    
    // Add error marker if there's an error
    if (error && typeof error.position === 'number') {
      this.insertErrorMarker(positionMap, error.position);
    }
    
    // Notify listeners
    this.options.onChange(expression, ast, error, entityMap);
  }

  /**
   * Update the status display
   */
  updateStatus(error) {
    if (error) {
      this.statusEl.className = 'boolean-editor-status error';
      this.statusEl.innerHTML = `
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="8" cy="8" r="6"/>
          <path d="M8 5v3M8 10v1"/>
        </svg>
        <span>${this.escapeHtml(error.message)}</span>
      `;
    } else {
      const { expression } = this.getExpression();
      if (expression) {
        this.statusEl.className = 'boolean-editor-status valid';
        this.statusEl.innerHTML = `
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="8" cy="8" r="6"/>
            <path d="M5 8l2 2 4-4"/>
          </svg>
          <span>Valid expression</span>
        `;
      } else {
        this.statusEl.className = 'boolean-editor-status';
        this.statusEl.innerHTML = '';
      }
    }
  }

  /**
   * Clear error markers from the editor
   */
  clearErrorMarkers() {
    const markers = this.editorEl.querySelectorAll('.error-marker');
    markers.forEach(m => m.remove());
  }

  /**
   * Insert an error marker at a position using the position map
   */
  insertErrorMarker(positionMap, errorPos) {
    if (!positionMap || positionMap.length === 0) return;
    
    // Find the position in the map (clamp to valid range)
    const mapIndex = Math.min(errorPos, positionMap.length - 1);
    const posInfo = positionMap[mapIndex];
    
    if (!posInfo) return;
    
    // Create the error marker
    const marker = document.createElement('span');
    marker.className = 'error-marker';
    marker.title = 'Error here';
    
    if (posInfo.isChip) {
      // Insert after the chip
      posInfo.node.after(marker);
    } else if (posInfo.node.nodeType === Node.TEXT_NODE) {
      // Split the text node and insert marker
      const textNode = posInfo.node;
      const offset = posInfo.offset;
      
      if (offset < textNode.textContent.length) {
        // Split at the error position
        const afterText = textNode.splitText(offset);
        afterText.parentNode.insertBefore(marker, afterText);
      } else {
        // Insert at end
        textNode.parentNode.insertBefore(marker, textNode.nextSibling);
      }
    }
  }

  /**
   * Clear the editor
   */
  clear() {
    this.editorEl.innerHTML = '';
    this.entityMap = {};
    this.hideTypeahead();
    this.parseAndNotify();
  }

  /**
   * Focus the editor
   */
  focus() {
    this.editorEl.focus();
  }

  /**
   * Escape HTML for safe rendering
   */
  escapeHtml(text) {
    return escapeHtml(text);
  }

  /**
   * Destroy the component
   */
  destroy() {
    if (this.editorEl) {
      this.editorEl.removeEventListener('input', this.handleInput);
      this.editorEl.removeEventListener('keydown', this.handleKeyDown);
      this.editorEl.removeEventListener('blur', this.handleBlur);
      this.editorEl.removeEventListener('paste', this.handlePaste);
    }
    this.container.innerHTML = '';
  }
}

export default BooleanExpressionEditor;
