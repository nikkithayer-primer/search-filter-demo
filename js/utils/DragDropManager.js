/**
 * DragDropManager.js
 * Manages drag-and-drop functionality for card components
 * Allows users to rearrange cards within a content grid
 */

export class DragDropManager {
  constructor(options = {}) {
    this.containerSelector = options.containerSelector || '.content-grid';
    this.cardSelector = options.cardSelector || '.card';
    this.handleSelector = options.handleSelector || '.card-header';
    this.storageKey = options.storageKey || 'card-order';
    // Elements that should not trigger dragging when clicked
    this.excludeSelectors = 'button, input, select, textarea, a, .view-toggle, .card-header-actions, [data-no-drag]';
    
    this.draggedElement = null;
    this.placeholder = null;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    
    // Bind event handlers
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    
    // Callback for when order changes
    this.onOrderChange = options.onOrderChange || null;
  }

  /**
   * Initialize drag-and-drop on the container
   * @param {HTMLElement|string} container - Container element or selector
   */
  init(container) {
    this.container = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
    
    if (!this.container) {
      console.warn('DragDropManager: Container not found');
      return;
    }
    
    // Add event listeners to handles
    this.container.addEventListener('mousedown', this.handleMouseDown);
    this.container.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    
    // Global listeners for move and end
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    document.addEventListener('touchend', this.handleTouchEnd);
    
    // Restore saved order
    this.restoreOrder();
    
    // Mark container as initialized
    this.container.classList.add('drag-drop-enabled');
  }

  /**
   * Destroy the drag-drop manager and clean up event listeners
   */
  destroy() {
    if (this.container) {
      this.container.removeEventListener('mousedown', this.handleMouseDown);
      this.container.removeEventListener('touchstart', this.handleTouchStart);
      this.container.classList.remove('drag-drop-enabled');
    }
    
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    
    this.cleanup();
  }

  /**
   * Handle mouse down on drag handle (card header)
   */
  handleMouseDown(e) {
    // Don't drag if clicking on interactive elements
    if (e.target.closest(this.excludeSelectors)) return;
    
    const handle = e.target.closest(this.handleSelector);
    if (!handle) return;
    
    const card = handle.closest(this.cardSelector);
    if (!card) return;
    
    e.preventDefault();
    this.startDrag(card, e.clientX, e.clientY);
  }

  /**
   * Handle touch start on drag handle (card header)
   */
  handleTouchStart(e) {
    // Don't drag if touching interactive elements
    if (e.target.closest(this.excludeSelectors)) return;
    
    const handle = e.target.closest(this.handleSelector);
    if (!handle) return;
    
    const card = handle.closest(this.cardSelector);
    if (!card) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    this.startDrag(card, touch.clientX, touch.clientY);
  }

  /**
   * Start dragging a card
   */
  startDrag(card, clientX, clientY) {
    this.draggedElement = card;
    this.isDragging = true;
    
    const rect = card.getBoundingClientRect();
    this.offsetX = clientX - rect.left;
    this.offsetY = clientY - rect.top;
    this.startX = clientX;
    this.startY = clientY;
    
    // Create placeholder
    this.placeholder = document.createElement('div');
    this.placeholder.className = 'card-placeholder';
    this.placeholder.style.width = `${rect.width}px`;
    this.placeholder.style.height = `${rect.height}px`;
    
    // Copy grid column span from original card
    const computedStyle = window.getComputedStyle(card);
    this.placeholder.style.gridColumn = computedStyle.gridColumn;
    
    // Insert placeholder
    card.parentNode.insertBefore(this.placeholder, card);
    
    // Style the dragged element
    card.classList.add('card-dragging');
    card.style.position = 'fixed';
    card.style.width = `${rect.width}px`;
    card.style.height = `${rect.height}px`;
    card.style.left = `${rect.left}px`;
    card.style.top = `${rect.top}px`;
    card.style.zIndex = '1000';
    
    // Add dragging class to container
    this.container.classList.add('is-dragging');
    
    // Add body class to prevent text selection
    document.body.classList.add('dragging-active');
  }

  /**
   * Handle mouse move during drag
   */
  handleMouseMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.updateDrag(e.clientX, e.clientY);
  }

  /**
   * Handle touch move during drag
   */
  handleTouchMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    this.updateDrag(touch.clientX, touch.clientY);
  }

  /**
   * Update dragged element position
   */
  updateDrag(clientX, clientY) {
    if (!this.draggedElement) return;
    
    // Update position
    this.draggedElement.style.left = `${clientX - this.offsetX}px`;
    this.draggedElement.style.top = `${clientY - this.offsetY}px`;
    
    // Find drop target
    const target = this.findDropTarget(clientX, clientY);
    if (target && target !== this.placeholder) {
      const targetRect = target.getBoundingClientRect();
      const targetCenter = targetRect.left + targetRect.width / 2;
      
      if (clientX < targetCenter) {
        target.parentNode.insertBefore(this.placeholder, target);
      } else {
        target.parentNode.insertBefore(this.placeholder, target.nextSibling);
      }
    }
  }

  /**
   * Find the drop target under the cursor
   */
  findDropTarget(clientX, clientY) {
    const cards = this.container.querySelectorAll(`${this.cardSelector}:not(.card-dragging)`);
    
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return card;
      }
    }
    
    return null;
  }

  /**
   * Handle mouse up - end drag
   */
  handleMouseUp(e) {
    if (!this.isDragging) return;
    this.endDrag();
  }

  /**
   * Handle touch end - end drag
   */
  handleTouchEnd(e) {
    if (!this.isDragging) return;
    this.endDrag();
  }

  /**
   * End the drag operation
   */
  endDrag() {
    if (!this.draggedElement || !this.placeholder) return;
    
    // Insert element at placeholder position
    this.placeholder.parentNode.insertBefore(this.draggedElement, this.placeholder);
    
    // Clean up styles
    this.draggedElement.classList.remove('card-dragging');
    this.draggedElement.style.position = '';
    this.draggedElement.style.width = '';
    this.draggedElement.style.height = '';
    this.draggedElement.style.left = '';
    this.draggedElement.style.top = '';
    this.draggedElement.style.zIndex = '';
    
    // Add animation class for smooth transition
    this.draggedElement.classList.add('card-dropped');
    setTimeout(() => {
      this.draggedElement?.classList.remove('card-dropped');
    }, 300);
    
    // Remove placeholder
    this.placeholder.remove();
    
    // Remove container dragging class
    this.container.classList.remove('is-dragging');
    
    // Remove body class
    document.body.classList.remove('dragging-active');
    
    // Save new order
    this.saveOrder();
    
    // Call callback
    if (this.onOrderChange) {
      this.onOrderChange(this.getOrder());
    }
    
    this.cleanup();
  }

  /**
   * Clean up drag state
   */
  cleanup() {
    this.draggedElement = null;
    this.placeholder = null;
    this.isDragging = false;
  }

  /**
   * Get the current order of cards by their IDs
   */
  getOrder() {
    const cards = this.container.querySelectorAll(this.cardSelector);
    const order = [];
    
    cards.forEach(card => {
      // Try to get card ID from data attribute or body container ID
      const bodyContainer = card.querySelector('.card-body');
      if (bodyContainer && bodyContainer.id) {
        order.push(bodyContainer.id);
      } else if (card.dataset.cardId) {
        order.push(card.dataset.cardId);
      }
    });
    
    return order;
  }

  /**
   * Save the current order to localStorage
   */
  saveOrder() {
    const order = this.getOrder();
    const viewKey = this.getViewKey();
    
    if (order.length > 0 && viewKey) {
      try {
        const savedOrders = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        savedOrders[viewKey] = order;
        localStorage.setItem(this.storageKey, JSON.stringify(savedOrders));
      } catch (e) {
        console.warn('DragDropManager: Failed to save order', e);
      }
    }
  }

  /**
   * Restore the saved order from localStorage
   */
  restoreOrder() {
    const viewKey = this.getViewKey();
    if (!viewKey) return;
    
    try {
      const savedOrders = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
      const order = savedOrders[viewKey];
      
      if (!order || !Array.isArray(order)) return;
      
      // Get all cards
      const cards = Array.from(this.container.querySelectorAll(this.cardSelector));
      const cardMap = new Map();
      
      // Map cards by their ID
      cards.forEach(card => {
        const bodyContainer = card.querySelector('.card-body');
        if (bodyContainer && bodyContainer.id) {
          cardMap.set(bodyContainer.id, card);
        } else if (card.dataset.cardId) {
          cardMap.set(card.dataset.cardId, card);
        }
      });
      
      // Reorder cards
      const fragment = document.createDocumentFragment();
      const orderedCards = [];
      const remainingCards = new Set(cards);
      
      // Add cards in saved order
      order.forEach(id => {
        const card = cardMap.get(id);
        if (card) {
          orderedCards.push(card);
          remainingCards.delete(card);
        }
      });
      
      // Add any remaining cards not in saved order
      remainingCards.forEach(card => {
        orderedCards.push(card);
      });
      
      // Append all cards in new order
      orderedCards.forEach(card => {
        fragment.appendChild(card);
      });
      
      this.container.appendChild(fragment);
      
    } catch (e) {
      console.warn('DragDropManager: Failed to restore order', e);
    }
  }

  /**
   * Get a unique key for the current view
   */
  getViewKey() {
    // Use the current hash route as the view key
    return window.location.hash || '#/dashboard';
  }

  /**
   * Reset the order for the current view
   */
  resetOrder() {
    const viewKey = this.getViewKey();
    if (!viewKey) return;
    
    try {
      const savedOrders = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
      delete savedOrders[viewKey];
      localStorage.setItem(this.storageKey, JSON.stringify(savedOrders));
    } catch (e) {
      console.warn('DragDropManager: Failed to reset order', e);
    }
  }
}

export default DragDropManager;
