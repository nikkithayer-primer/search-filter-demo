/**
 * Dropdown.js
 * Unified dropdown component for consistent behavior across the app
 * 
 * Usage:
 *   HTML: <div class="dropdown" data-dropdown data-dropdown-align="right">
 *           <button class="dropdown-trigger" data-dropdown-trigger>Menu</button>
 *           <div class="dropdown-menu" data-dropdown-menu>
 *             <button class="dropdown-item">Item 1</button>
 *           </div>
 *         </div>
 * 
 *   JS:   Dropdown.initAll(container);
 *         // or
 *         new Dropdown(element, options);
 */

export class Dropdown {
  // Track all active dropdown instances for global management
  static instances = new Set();
  static globalListenerAttached = false;

  /**
   * Initialize all dropdowns within a container
   * @param {HTMLElement} container - Container to search for dropdowns
   * @returns {Dropdown[]} Array of initialized Dropdown instances
   */
  static initAll(container = document) {
    const dropdowns = container.querySelectorAll('[data-dropdown]');
    return Array.from(dropdowns).map(el => {
      // Skip if already initialized
      if (el._dropdownInstance) return el._dropdownInstance;
      return new Dropdown(el);
    });
  }

  /**
   * Close all open dropdowns
   * @param {Dropdown} [except] - Optional dropdown to keep open
   */
  static closeAll(except = null) {
    Dropdown.instances.forEach(dropdown => {
      if (dropdown !== except && dropdown.isOpen) {
        dropdown.close();
      }
    });
  }

  /**
   * Create a dropdown instance
   * @param {HTMLElement} element - The dropdown container element
   * @param {Object} options - Configuration options
   */
  constructor(element, options = {}) {
    this.element = element;
    this.trigger = element.querySelector('[data-dropdown-trigger]');
    this.menu = element.querySelector('[data-dropdown-menu]');
    
    if (!this.trigger || !this.menu) {
      console.warn('Dropdown: Missing trigger or menu element', element);
      return;
    }

    // Parse options from data attributes and constructor options
    this.options = {
      align: element.dataset.dropdownAlign || options.align || 'left',
      direction: element.dataset.dropdownDirection || options.direction || 'down',
      closeOnSelect: element.dataset.dropdownMulti === undefined ? true : false,
      closeOnClickOutside: options.closeOnClickOutside !== false,
      onOpen: options.onOpen || null,
      onClose: options.onClose || null,
      onSelect: options.onSelect || null,
      ...options
    };

    // Override closeOnSelect if explicitly set in options
    if (options.closeOnSelect !== undefined) {
      this.options.closeOnSelect = options.closeOnSelect;
    }

    this.isOpen = false;
    this._boundHandlers = {};

    // Store instance reference on element
    element._dropdownInstance = this;
    Dropdown.instances.add(this);

    this._attachEventListeners();
    this._attachGlobalListener();
  }

  /**
   * Attach event listeners to dropdown elements
   */
  _attachEventListeners() {
    // Trigger click
    this._boundHandlers.triggerClick = (e) => {
      e.stopPropagation();
      this.toggle();
    };
    this.trigger.addEventListener('click', this._boundHandlers.triggerClick);

    // Item clicks
    this._boundHandlers.menuClick = (e) => {
      const item = e.target.closest('.dropdown-item');
      if (item && !item.disabled && !item.classList.contains('disabled')) {
        e.stopPropagation();
        
        // Fire onSelect callback
        if (this.options.onSelect) {
          this.options.onSelect(item, e);
        }

        // Dispatch custom event
        this.element.dispatchEvent(new CustomEvent('dropdown:select', {
          bubbles: true,
          detail: { item, dropdown: this }
        }));

        // Close if not multi-select
        if (this.options.closeOnSelect) {
          this.close();
        }
      }
    };
    this.menu.addEventListener('click', this._boundHandlers.menuClick);

    // Prevent clicks inside menu from closing (for multi-select)
    this._boundHandlers.menuClickStop = (e) => {
      // Only stop propagation for checkbox labels and inputs
      if (e.target.closest('.dropdown-checkbox') || e.target.type === 'checkbox') {
        e.stopPropagation();
      }
    };
    this.menu.addEventListener('click', this._boundHandlers.menuClickStop);

    // Keyboard navigation
    this._boundHandlers.keydown = (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.close();
          this.trigger.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this._focusNextItem(1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          this._focusNextItem(-1);
          break;
        case 'Tab':
          // Close on tab out
          this.close();
          break;
      }
    };
    this.element.addEventListener('keydown', this._boundHandlers.keydown);
  }

  /**
   * Attach global click listener (once) to close dropdowns on outside click
   */
  _attachGlobalListener() {
    if (Dropdown.globalListenerAttached) return;
    
    document.addEventListener('click', (e) => {
      // Close all dropdowns when clicking outside
      Dropdown.instances.forEach(dropdown => {
        if (dropdown.isOpen && 
            dropdown.options.closeOnClickOutside &&
            !dropdown.element.contains(e.target)) {
          dropdown.close();
        }
      });
    });

    Dropdown.globalListenerAttached = true;
  }

  /**
   * Focus next/previous focusable item in the menu
   * @param {number} direction - 1 for next, -1 for previous
   */
  _focusNextItem(direction) {
    const items = Array.from(this.menu.querySelectorAll(
      '.dropdown-item:not([disabled]):not(.disabled), .dropdown-checkbox input'
    ));
    
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement);
    let nextIndex;

    if (currentIndex === -1) {
      nextIndex = direction === 1 ? 0 : items.length - 1;
    } else {
      nextIndex = currentIndex + direction;
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
    }

    items[nextIndex]?.focus();
  }

  /**
   * Open the dropdown
   */
  open() {
    if (this.isOpen) return;

    // Close other dropdowns
    Dropdown.closeAll(this);

    this.isOpen = true;
    this.element.classList.add('is-open');
    this.trigger.setAttribute('aria-expanded', 'true');
    this.menu.setAttribute('aria-hidden', 'false');

    // Position the menu
    this._positionMenu();

    // Fire callback
    if (this.options.onOpen) {
      this.options.onOpen(this);
    }

    // Dispatch event
    this.element.dispatchEvent(new CustomEvent('dropdown:open', {
      bubbles: true,
      detail: { dropdown: this }
    }));
  }

  /**
   * Close the dropdown
   */
  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.element.classList.remove('is-open');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.menu.setAttribute('aria-hidden', 'true');

    // Fire callback
    if (this.options.onClose) {
      this.options.onClose(this);
    }

    // Dispatch event
    this.element.dispatchEvent(new CustomEvent('dropdown:close', {
      bubbles: true,
      detail: { dropdown: this }
    }));
  }

  /**
   * Toggle the dropdown open/closed
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Position the menu based on configuration and available space
   */
  _positionMenu() {
    // Reset any inline styles
    this.menu.style.left = '';
    this.menu.style.right = '';
    this.menu.style.top = '';
    this.menu.style.bottom = '';

    // Apply alignment class
    if (this.options.align === 'right') {
      this.menu.style.right = '0';
      this.menu.style.left = 'auto';
    } else {
      this.menu.style.left = '0';
      this.menu.style.right = 'auto';
    }

    // Apply direction
    if (this.options.direction === 'up') {
      this.menu.style.bottom = '100%';
      this.menu.style.top = 'auto';
    }

    // Check if menu overflows viewport and adjust if needed
    const menuRect = this.menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Horizontal overflow check
    if (menuRect.right > viewportWidth) {
      this.menu.style.right = '0';
      this.menu.style.left = 'auto';
    } else if (menuRect.left < 0) {
      this.menu.style.left = '0';
      this.menu.style.right = 'auto';
    }

    // Vertical overflow check
    if (menuRect.bottom > viewportHeight && this.options.direction !== 'up') {
      this.menu.style.bottom = '100%';
      this.menu.style.top = 'auto';
    }
  }

  /**
   * Destroy the dropdown instance and clean up
   */
  destroy() {
    // Remove event listeners
    this.trigger.removeEventListener('click', this._boundHandlers.triggerClick);
    this.menu.removeEventListener('click', this._boundHandlers.menuClick);
    this.menu.removeEventListener('click', this._boundHandlers.menuClickStop);
    this.element.removeEventListener('keydown', this._boundHandlers.keydown);

    // Remove from instances
    Dropdown.instances.delete(this);
    delete this.element._dropdownInstance;

    // Close if open
    this.close();
  }
}

export default Dropdown;
