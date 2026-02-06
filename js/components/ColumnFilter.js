/**
 * ColumnFilter.js
 * Reusable column filter dropdown component
 * Allows users to select which columns to display in a table
 */

import { BaseComponent } from './BaseComponent.js';

export class ColumnFilter extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      // Available columns: { key: 'Label', ... }
      availableColumns: {},
      // Default selected columns
      defaultColumns: [],
      // Columns that cannot be deselected
      requiredColumns: ['title'],
      // Callback when columns change
      onChange: null,
      // Label for the dropdown trigger
      triggerLabel: 'Columns',
      // Show reset button
      showReset: true,
      ...options
    });

    this.selectedColumns = [...this.options.defaultColumns];
    this._boundCloseHandler = null;
    this._isOpen = false;
  }

  render() {
    this.clear();

    const { availableColumns, requiredColumns, triggerLabel, showReset } = this.options;

    // Build column checkboxes
    const checkboxesHtml = Object.entries(availableColumns).map(([key, label]) => {
      const checked = this.selectedColumns.includes(key) ? 'checked' : '';
      const disabled = requiredColumns.includes(key) ? 'disabled' : '';
      const disabledClass = requiredColumns.includes(key) ? 'filter-checkbox-disabled' : '';
      return `
        <label class="filter-checkbox-item ${disabledClass}">
          <input type="checkbox" value="${key}" ${checked} ${disabled}>
          <span>${label}</span>
        </label>
      `;
    }).join('');

    // Create the dropdown HTML
    const dropdownHtml = `
      <div class="column-filter-dropdown">
        <button class="filter-dropdown-trigger" type="button">
          <svg class="filter-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M2 4h12M4 8h8M6 12h4"/>
          </svg>
          <span>${triggerLabel}</span>
          <svg class="dropdown-arrow" viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </button>
        <div class="filter-dropdown-menu">
          ${showReset ? `
            <div class="filter-dropdown-header">
              <span>Show Columns</span>
              <button class="filter-reset-btn" type="button">Reset</button>
            </div>
          ` : ''}
          <div class="filter-checkbox-list">
            ${checkboxesHtml}
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = dropdownHtml;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const dropdown = this.container.querySelector('.column-filter-dropdown');
    const trigger = this.container.querySelector('.filter-dropdown-trigger');
    const menu = this.container.querySelector('.filter-dropdown-menu');

    if (!dropdown || !trigger) return;

    // Toggle dropdown on trigger click
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Handle checkbox changes
    const checkboxes = this.container.querySelectorAll('.filter-checkbox-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        this.handleCheckboxChange(checkbox);
      });
    });

    // Handle reset button
    const resetBtn = this.container.querySelector('.filter-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.resetColumns();
      });
    }

    // Prevent clicks inside menu from closing it
    if (menu) {
      menu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Close dropdown when clicking outside
    this._boundCloseHandler = (e) => {
      if (!e.target.closest('.column-filter-dropdown') || 
          !this.container.contains(e.target.closest('.column-filter-dropdown'))) {
        this.closeDropdown();
      }
    };
    document.addEventListener('click', this._boundCloseHandler);
  }

  toggleDropdown() {
    const dropdown = this.container.querySelector('.column-filter-dropdown');
    if (dropdown) {
      this._isOpen = !this._isOpen;
      dropdown.classList.toggle('open', this._isOpen);
    }
  }

  closeDropdown() {
    const dropdown = this.container.querySelector('.column-filter-dropdown');
    if (dropdown && this._isOpen) {
      this._isOpen = false;
      dropdown.classList.remove('open');
    }
  }

  handleCheckboxChange(checkbox) {
    const column = checkbox.value;
    const isChecked = checkbox.checked;

    if (isChecked && !this.selectedColumns.includes(column)) {
      this.selectedColumns.push(column);
    } else if (!isChecked && this.selectedColumns.includes(column)) {
      // Don't allow unchecking required columns
      if (this.options.requiredColumns.includes(column)) {
        checkbox.checked = true;
        return;
      }
      this.selectedColumns = this.selectedColumns.filter(c => c !== column);
    }

    // Maintain column order based on availableColumns order
    const orderedColumns = Object.keys(this.options.availableColumns)
      .filter(col => this.selectedColumns.includes(col));
    this.selectedColumns = orderedColumns;

    this.notifyChange();
  }

  resetColumns() {
    this.selectedColumns = [...this.options.defaultColumns];
    
    // Update checkboxes
    const checkboxes = this.container.querySelectorAll('.filter-checkbox-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.selectedColumns.includes(checkbox.value);
    });

    this.notifyChange();
  }

  notifyChange() {
    if (this.options.onChange) {
      this.options.onChange([...this.selectedColumns]);
    }
  }

  /**
   * Get currently selected columns
   * @returns {string[]}
   */
  getSelectedColumns() {
    return [...this.selectedColumns];
  }

  /**
   * Set selected columns programmatically
   * @param {string[]} columns
   */
  setSelectedColumns(columns) {
    this.selectedColumns = columns.filter(col => 
      Object.keys(this.options.availableColumns).includes(col)
    );
    
    // Ensure required columns are always included
    this.options.requiredColumns.forEach(col => {
      if (!this.selectedColumns.includes(col)) {
        this.selectedColumns.unshift(col);
      }
    });

    // Update checkboxes if rendered
    const checkboxes = this.container.querySelectorAll('.filter-checkbox-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.selectedColumns.includes(checkbox.value);
    });
  }

  destroy() {
    if (this._boundCloseHandler) {
      document.removeEventListener('click', this._boundCloseHandler);
      this._boundCloseHandler = null;
    }
    super.destroy();
  }
}

export default ColumnFilter;
