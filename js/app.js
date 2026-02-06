/**
 * app.js
 * Main application entry point
 */

import { dataStore } from './data/DataStore.js';
import { DataService } from './data/DataService.js';
import { validateDataset } from './data/SchemaValidator.js';
import { getMonitorEditor } from './components/MonitorEditorModal.js';
import { getSearchFilterEditor } from './components/SearchFilterEditorModal.js';
import { getTagEditor } from './components/TagEditorModal.js';
import { mockData as americanPoliticsData, datasetId as americanPoliticsId, datasetName as americanPoliticsName, defaultSettings as americanPoliticsSettings } from './data/datasets/american-politics/index.js';
import { mockData as chinaSemiconductorData, datasetId as chinaSemiconductorId, datasetName as chinaSemiconductorName, defaultSettings as chinaSemiconductorSettings } from './data/datasets/china-semiconductor/index.js';
import { mockData as walmartBrandData, datasetId as walmartBrandId, datasetName as walmartBrandName, defaultSettings as walmartBrandSettings } from './data/datasets/walmart-brand/index.js';
import { mockData as singaporeMcoData, datasetId as singaporeMcoId, datasetName as singaporeMcoName, defaultSettings as singaporeMcoSettings } from './data/datasets/singapore-mco/index.js';
import { Router } from './router.js';
import { getSourceViewer } from './components/SourceViewerModal.js';
import { getEntityCardModal } from './components/EntityCardModal.js';
import { getTextSelectionPopover } from './components/TextSelectionPopover.js';
import { escapeHtml } from './utils/htmlUtils.js';
import { ChatService } from './services/ChatService.js';

// Dataset registry
const DATASETS = {
  [americanPoliticsId]: { 
    id: americanPoliticsId,
    name: americanPoliticsName, 
    data: americanPoliticsData,
    defaultSettings: americanPoliticsSettings
  },
  [chinaSemiconductorId]: { 
    id: chinaSemiconductorId,
    name: chinaSemiconductorName, 
    data: chinaSemiconductorData,
    defaultSettings: chinaSemiconductorSettings
  },
  [walmartBrandId]: { 
    id: walmartBrandId,
    name: walmartBrandName, 
    data: walmartBrandData,
    defaultSettings: walmartBrandSettings
  },
  [singaporeMcoId]: { 
    id: singaporeMcoId,
    name: singaporeMcoName, 
    data: singaporeMcoData,
    defaultSettings: singaporeMcoSettings
  }
};

class App {
  constructor() {
    this.router = null;
    this.dataStore = dataStore;
    this.chatOpen = false;
    this.chatService = null;
    this.currentChatContext = null; // Track current chat context for bounded conversations
    this.summarizedPagesInContext = new Set(); // Track pages already summarized in current context
  }

  /**
   * Initialize the application
   */
  async init() {
    // Initialize theme (before other UI to prevent flash)
    this.initTheme();
    
    // Initialize with the currently selected dataset
    this.initializeDataset();
    
    // Initialize dataset switcher
    this.initDatasetSwitcher();

    // Initialize router
    this.router = new Router('app');
    this.router.init();

    // Initialize chat service (requires router for context)
    this.chatService = new ChatService(this.router);

    // Initialize chat
    this.initChat();

    // Initialize dropdown navigation
    this.initDropdowns();
    
    // Populate filters dropdown
    this.populateFiltersDropdown();
    
    // Populate tags dropdown
    this.populateTagsDropdown();
    
    // Initialize settings modal
    this.initSettingsModal();
    
    // Initialize theme toggle
    this.initThemeToggle();
    
    // Initialize delegated source link handler
    this.initSourceLinkHandler();
    
    // Initialize text selection popover for saving snippets to projects
    getTextSelectionPopover();
    
    // Update navigation based on settings
    this.updateNavigationForSettings();

    // Update chat summary on route changes
    window.addEventListener('hashchange', () => this.updatePageSummary());
    
    // Show initial page summary
    setTimeout(() => this.updatePageSummary(), 100);

    // Subscribe to data changes - refresh filters if on dashboard
    this.dataStore.subscribe(() => {
      if (this.router) {
        this.router.refreshTimeFilter();
        // Re-populate mission filter if on dashboard
        if (this.router.currentRoute === 'dashboard') {
          this.router.populateMissionFilter();
        }
      }
      // Update navigation when settings change
      this.updateNavigationForSettings();
      // Refresh filters dropdown
      this.populateFiltersDropdown();
      // Refresh tags dropdown
      this.populateTagsDropdown();
    });
  }

  /**
   * Initialize with the currently selected dataset
   */
  initializeDataset() {
    const currentDatasetId = this.dataStore.getCurrentDataset();
    const dataset = DATASETS[currentDatasetId] || DATASETS['singapore-mco'];
    
    // Load the dataset with its default settings
    this.dataStore.switchDataset(dataset.id, dataset.data, dataset.name, dataset.defaultSettings);
    
    // Validate dataset in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      this.validateCurrentDataset(dataset.name);
    }
  }
  
  /**
   * Validate the current dataset and log results
   * @param {string} datasetName - Name of the dataset for logging
   */
  validateCurrentDataset(datasetName) {
    const results = validateDataset(this.dataStore.data);
    if (results.summary.errors > 0) {
      console.warn(`Dataset '${datasetName}' has ${results.summary.errors} validation errors`);
    }
  }

  /**
   * Switch to a different dataset
   * @param {string} datasetId - The dataset identifier to switch to
   */
  switchDataset(datasetId) {
    const dataset = DATASETS[datasetId];
    if (!dataset) {
      console.error(`Unknown dataset: ${datasetId}`);
      return;
    }

    // Switch the dataset in the store (including the name and default settings)
    this.dataStore.switchDataset(datasetId, dataset.data, dataset.name, dataset.defaultSettings);
    
    // Validate dataset in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      this.validateCurrentDataset(dataset.name);
    }
    
    // Update UI indicators
    this.updateDatasetIndicators(datasetId);
    
    // Reset the mission filter state in router
    if (this.router) {
      this.router.filters.missionId = 'all';
    }
    
    // Navigate to the dataset's default start page
    const settings = this.dataStore.getSettings();
    let defaultPage = settings.defaultStartPage || 'monitors';
    
    // If COP is disabled and was set as start page, fall back to monitors
    if (!settings.copEnabled && (defaultPage === 'cop' || defaultPage === 'dashboard')) {
      defaultPage = 'monitors';
    }
    
    // Navigate to the default page for this dataset
    window.location.hash = `#/${defaultPage}`;
    
    // Update page summary in chat
    this.updatePageSummary();
    
    // Show success notification
    this.showToast(`Switched to ${dataset.name} dataset`, 'success');
  }

  /**
   * Initialize dataset switcher UI and event handlers
   */
  initDatasetSwitcher() {
    const datasetOptions = document.querySelectorAll('.dataset-option');
    
    datasetOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const datasetId = option.dataset.dataset;
        if (datasetId && datasetId !== this.dataStore.getCurrentDataset()) {
          this.switchDataset(datasetId);
        }
        
        // Close the dropdown
        const dropdown = option.closest('.nav-dropdown');
        if (dropdown) {
          dropdown.classList.remove('open');
        }
      });
    });
    
    // Set initial active state
    this.updateDatasetIndicators(this.dataStore.getCurrentDataset());
  }

  /**
   * Update dataset indicator UI elements
   * @param {string} activeDatasetId - The currently active dataset ID
   */
  updateDatasetIndicators(activeDatasetId) {
    const datasetOptions = document.querySelectorAll('.dataset-option');
    
    datasetOptions.forEach(option => {
      const isActive = option.dataset.dataset === activeDatasetId;
      option.classList.toggle('active', isActive);
    });
  }

  /**
   * Get available datasets
   * @returns {Array} Array of dataset objects
   */
  getDatasets() {
    return Object.values(DATASETS);
  }

  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Show modal dialog
   */
  showModal(content, options = {}) {
    const container = document.getElementById('modal-container');
    const modalContent = container.querySelector('.modal-content');
    
    modalContent.innerHTML = content;
    container.classList.remove('hidden');

    // Close on backdrop click
    container.querySelector('.modal-backdrop').onclick = () => {
      if (!options.preventClose) {
        this.closeModal();
      }
    };

    // Close on escape key
    const escHandler = (e) => {
      if (e.key === 'Escape' && !options.preventClose) {
        this.closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  /**
   * Close modal dialog
   */
  closeModal() {
    const container = document.getElementById('modal-container');
    container.classList.add('hidden');
  }

  /**
   * Confirm dialog
   */
  confirm(message, title = 'Confirm') {
    return new Promise((resolve) => {
      this.showModal(`
        <div class="confirm-dialog">
          <div class="confirm-dialog-icon">⚠</div>
          <h3 class="confirm-dialog-title">${title}</h3>
          <p class="confirm-dialog-message">${message}</p>
          <div class="confirm-dialog-actions">
            <button class="btn btn-secondary" id="confirm-cancel">Cancel</button>
            <button class="btn btn-danger" id="confirm-ok">Confirm</button>
          </div>
        </div>
      `);

      document.getElementById('confirm-cancel').onclick = () => {
        this.closeModal();
        resolve(false);
      };

      document.getElementById('confirm-ok').onclick = () => {
        this.closeModal();
        resolve(true);
      };
    });
  }

  /**
   * Initialize settings modal trigger
   */
  initSettingsModal() {
    const settingsBtn = document.getElementById('open-settings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Close the avatar dropdown
        const dropdown = settingsBtn.closest('.nav-dropdown');
        if (dropdown) dropdown.classList.remove('open');
        this.showSettingsModal();
      });
    }
  }

  /**
   * Show the settings modal
   */
  showSettingsModal() {
    const settings = this.dataStore.getSettings();
    
    this.showModal(`
      <div class="modal-header">
        <h2 class="modal-title">Settings</h2>
        <button class="modal-close" onclick="window.app.closeModal()">×</button>
      </div>
      <div class="modal-body settings-modal">
        <div class="settings-section">
          <h3 class="settings-section-title">Navigation</h3>
          
          <div class="settings-row">
            <div class="settings-label">
              <span class="settings-label-text">Enable Common Operating Picture</span>
              <span class="settings-label-description">Show COP in navigation and enable it as a start page option.</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="setting-cop-enabled" ${settings.copEnabled ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="settings-row" id="start-page-row">
            <div class="settings-label">
              <span class="settings-label-text">Default Start Page</span>
              <span class="settings-label-description">Page to show when opening the app</span>
            </div>
            <select id="setting-start-page" class="settings-select">
              <option value="cop" ${settings.defaultStartPage === 'cop' ? 'selected' : ''} ${!settings.copEnabled ? 'disabled' : ''}>Common Operating Picture</option>
              <option value="monitors" ${settings.defaultStartPage === 'monitors' ? 'selected' : ''}>Monitors</option>
              <option value="search" ${settings.defaultStartPage === 'search' ? 'selected' : ''}>Search</option>
            </select>
          </div>
          
          <div class="settings-row">
            <div class="settings-label">
              <span class="settings-label-text">Default View Tab</span>
              <span class="settings-label-description">Tab to show when navigating to detail pages (narratives, factions, etc.)</span>
            </div>
            <select id="setting-default-tab" class="settings-select">
              <option value="dashboard" ${settings.defaultViewTab === 'dashboard' ? 'selected' : ''}>Dashboard</option>
              <option value="documents" ${settings.defaultViewTab === 'documents' ? 'selected' : ''}>Documents</option>
            </select>
          </div>
        </div>
        
        <div class="settings-section">
          <h3 class="settings-section-title">Display</h3>
          
          <div class="settings-row">
            <div class="settings-label">
              <span class="settings-label-text">Show Portion Marks and Classification</span>
              <span class="settings-label-description">Display security classification markings on documents and content</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="setting-show-classification" ${settings.showClassification ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div class="settings-section">
          <h3 class="settings-section-title">AI Assistant</h3>
          
          ${ChatService.isUsingInjectedKey() ? `
          <div class="settings-row">
            <div class="settings-label">
              <span class="settings-label-text">OpenAI API Key</span>
              <span class="settings-label-description">API key is configured for this deployment.</span>
            </div>
            <div class="settings-api-key-status">
              <span class="api-key-badge api-key-configured"><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg> AI enabled</span>
            </div>
          </div>
          ` : `
          <div class="settings-row">
            <div class="settings-label">
              <span class="settings-label-text">OpenAI API Key</span>
              <span class="settings-label-description">Required for AI-powered chat. Your key is stored locally in your browser.</span>
            </div>
            <div class="settings-api-key-status">
              ${ChatService.hasApiKey() 
                ? `<span class="api-key-badge api-key-configured"><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg> Key configured</span>`
                : `<span class="api-key-badge api-key-missing"><svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9-3a1 1 0 11-2 0 1 1 0 012 0zM8 7a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018 7z"/></svg> Not configured</span>`
              }
            </div>
          </div>
          
          <div class="settings-row">
            <div class="settings-label">
              <span class="settings-label-text">${ChatService.hasApiKey() ? 'Update API Key' : 'Enter API Key'}</span>
              <span class="settings-label-description">${ChatService.hasApiKey() ? 'Enter a new key to replace the existing one' : 'Paste your OpenAI API key (starts with sk-)'}</span>
            </div>
            <div class="settings-input-group">
              <input type="password" id="setting-openai-key" class="settings-input" 
                placeholder="sk-proj-..."
                value="">
              <button type="button" class="btn btn-small btn-secondary" id="toggle-key-visibility">Show</button>
            </div>
          </div>
          ${ChatService.hasApiKey() ? `
          <div class="settings-row">
            <div class="settings-label">
              <span class="settings-label-text">Clear API Key</span>
              <span class="settings-label-description">Remove the stored API key and return to placeholder responses</span>
            </div>
            <button type="button" class="btn btn-small btn-danger" id="clear-api-key">Clear Key</button>
          </div>
          ` : ''}
          `}
          
          ${ChatService.hasApiKey() ? `
          <div class="settings-row">
            <div class="settings-label">
              <span class="settings-label-text">Auto-Summarize Pages</span>
              <span class="settings-label-description">Automatically generate an AI summary when navigating to a new page</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="setting-auto-summary" ${settings.autoSummary ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          
          <div class="settings-row">
            <div class="settings-label">
              <span class="settings-label-text">Show Suggested Questions</span>
              <span class="settings-label-description">Display clickable question suggestions in the chat panel</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="setting-suggested-questions" ${settings.suggestedQuestions ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          ` : ''}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.app.closeModal()">Cancel</button>
        <button class="btn btn-primary" id="save-settings">Save Changes</button>
      </div>
    `);
    
    // Handle COP toggle enabling/disabling COP as start page option
    const copToggle = document.getElementById('setting-cop-enabled');
    const startPageSelect = document.getElementById('setting-start-page');
    const copOption = startPageSelect?.querySelector('option[value="cop"]');
    
    copToggle?.addEventListener('change', () => {
      if (copOption) {
        copOption.disabled = !copToggle.checked;
      }
      // If COP was selected but is now disabled, switch to monitors
      if (!copToggle.checked && startPageSelect?.value === 'cop') {
        startPageSelect.value = 'monitors';
      }
    });
    
    // Handle API key visibility toggle
    const apiKeyInput = document.getElementById('setting-openai-key');
    const toggleKeyBtn = document.getElementById('toggle-key-visibility');
    toggleKeyBtn?.addEventListener('click', () => {
      if (apiKeyInput.type === 'password') {
        apiKeyInput.type = 'text';
        toggleKeyBtn.textContent = 'Hide';
      } else {
        apiKeyInput.type = 'password';
        toggleKeyBtn.textContent = 'Show';
      }
    });
    
    // Handle clear API key
    document.getElementById('clear-api-key')?.addEventListener('click', () => {
      ChatService.setApiKey(null);
      this.updateChatStatus();
      this.showToast('API key cleared', 'success');
      this.showSettingsModal(); // Refresh modal
    });
    
    // Handle save
    document.getElementById('save-settings')?.addEventListener('click', () => {
      this.saveSettings();
    });
  }

  /**
   * Save settings from the modal
   */
  saveSettings() {
    const copEnabled = document.getElementById('setting-cop-enabled')?.checked ?? true;
    let defaultStartPage = document.getElementById('setting-start-page')?.value || 'cop';
    const defaultViewTab = document.getElementById('setting-default-tab')?.value || 'dashboard';
    const showClassification = document.getElementById('setting-show-classification')?.checked ?? true;
    const autoSummary = document.getElementById('setting-auto-summary')?.checked ?? false;
    const suggestedQuestions = document.getElementById('setting-suggested-questions')?.checked ?? true;
    
    // If COP is disabled and was selected as start page, fall back to monitors
    if (!copEnabled && defaultStartPage === 'cop') {
      defaultStartPage = 'monitors';
    }
    
    this.dataStore.updateSettings({
      copEnabled,
      defaultStartPage,
      defaultViewTab,
      showClassification,
      autoSummary,
      suggestedQuestions
    });
    
    // Update suggested questions visibility
    this.updateSuggestedQuestions();
    
    // Save API key if provided (stored separately in localStorage, not in dataStore)
    const apiKeyInput = document.getElementById('setting-openai-key');
    const newApiKey = apiKeyInput?.value?.trim();
    let apiKeyMessage = '';
    
    if (newApiKey) {
      if (newApiKey.startsWith('sk-')) {
        ChatService.setApiKey(newApiKey);
        apiKeyMessage = ' API key saved.';
        // Update chat status indicator
        this.updateChatStatus();
      } else {
        this.closeModal();
        this.showToast('Invalid API key format. Key must start with "sk-"', 'error');
        return;
      }
    }
    
    this.closeModal();
    this.showToast('Settings saved.' + apiKeyMessage, 'success');
  }

  /**
   * Update navigation based on settings
   */
  updateNavigationForSettings() {
    const settings = this.dataStore.getSettings();
    const copLink = document.querySelector('.nav-link[href="#/cop/"]');
    
    if (copLink) {
      if (settings.copEnabled) {
        copLink.classList.remove('hidden');
      } else {
        copLink.classList.add('hidden');
      }
    }
  }

  /**
   * Initialize chat functionality
   */
  initChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    if (chatToggle) {
      chatToggle.addEventListener('click', () => this.toggleChat());
    }

    if (chatClose) {
      chatClose.addEventListener('click', () => this.toggleChat(false));
    }

    if (chatInput) {
      // Auto-resize textarea
      chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
      });

      // Send on Enter (without Shift)
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendChatMessage();
        }
      });
    }

    if (chatSend) {
      chatSend.addEventListener('click', () => this.sendChatMessage());
    }

    // Initialize chat panel resize functionality
    this.initChatResize();

    // Restore saved chat width
    const savedWidth = localStorage.getItem('chatPanelWidth');
    if (savedWidth) {
      document.documentElement.style.setProperty('--chat-width', `${savedWidth}px`);
    }
    
    // Update chat status indicator
    this.updateChatStatus();
  }

  /**
   * Update the chat status indicator based on API key configuration
   */
  updateChatStatus() {
    const statusEl = document.getElementById('chat-status');
    if (!statusEl) return;
    
    if (ChatService.hasApiKey()) {
      statusEl.innerHTML = `
        <span class="chat-status-badge chat-status-ai">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>
          AI enabled
        </span>
      `;
      statusEl.classList.remove('chat-status-warning');
    } else {
      // Show demo mode with link to settings for manual key entry
      statusEl.innerHTML = `
        <span class="chat-status-badge chat-status-demo">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9-3a1 1 0 11-2 0 1 1 0 012 0zM8 7a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018 7z"/></svg>
          Demo mode
        </span>
        <a href="#" class="chat-status-link" onclick="window.app.showSettingsModal(); return false;">Configure API key</a>
      `;
      statusEl.classList.add('chat-status-warning');
    }
  }

  /**
   * Initialize chat panel resize functionality
   */
  initChatResize() {
    const chatPanel = document.getElementById('chat-panel');
    const resizeHandle = document.getElementById('chat-resize-handle');
    
    if (!chatPanel || !resizeHandle) return;
    
    let isResizing = false;
    let startX, startWidth;
    
    const minWidth = 350;
    const getMaxWidth = () => window.innerWidth * 0.5; // 50vw
    
    resizeHandle.addEventListener('mousedown', (e) => {
      isResizing = true;
      startX = e.clientX;
      startWidth = chatPanel.offsetWidth;
      resizeHandle.classList.add('dragging');
      chatPanel.classList.add('resizing');
      document.body.classList.add('chat-resizing');
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      
      // Calculate new width (dragging right increases width for left-side panel)
      const newWidth = startWidth + (e.clientX - startX);
      const clampedWidth = Math.max(minWidth, Math.min(getMaxWidth(), newWidth));
      
      // Update CSS variable for both panel and content wrapper
      document.documentElement.style.setProperty('--chat-width', `${clampedWidth}px`);
    });
    
    document.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        resizeHandle.classList.remove('dragging');
        chatPanel.classList.remove('resizing');
        document.body.classList.remove('chat-resizing');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        
        // Save width to localStorage
        const currentWidth = chatPanel.offsetWidth;
        localStorage.setItem('chatPanelWidth', currentWidth);
      }
    });

    // Touch support for mobile
    resizeHandle.addEventListener('touchstart', (e) => {
      isResizing = true;
      startX = e.touches[0].clientX;
      startWidth = chatPanel.offsetWidth;
      resizeHandle.classList.add('dragging');
      chatPanel.classList.add('resizing');
      document.body.classList.add('chat-resizing');
      e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('touchmove', (e) => {
      if (!isResizing) return;
      
      // Calculate new width (dragging right increases width for left-side panel)
      const newWidth = startWidth + (e.touches[0].clientX - startX);
      const clampedWidth = Math.max(minWidth, Math.min(getMaxWidth(), newWidth));
      
      document.documentElement.style.setProperty('--chat-width', `${clampedWidth}px`);
    }, { passive: true });
    
    document.addEventListener('touchend', () => {
      if (isResizing) {
        isResizing = false;
        resizeHandle.classList.remove('dragging');
        chatPanel.classList.remove('resizing');
        document.body.classList.remove('chat-resizing');
        
        const currentWidth = chatPanel.offsetWidth;
        localStorage.setItem('chatPanelWidth', currentWidth);
      }
    });
  }

  /**
   * Initialize dropdown navigation menus
   */
  initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector('.nav-dropdown-trigger, .avatar-trigger');
      
      if (trigger) {
        // Toggle on click
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          
          // Close other dropdowns
          dropdowns.forEach(other => {
            if (other !== dropdown) {
              other.classList.remove('open');
            }
          });
          
          // Toggle this dropdown
          dropdown.classList.toggle('open');
        });
      }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('open');
        });
      }
    });
    
    // Close dropdowns when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('open');
        });
      }
    });
    
    // Close dropdown when a link inside is clicked
    dropdowns.forEach(dropdown => {
      const links = dropdown.querySelectorAll('.nav-dropdown-menu .nav-link');
      links.forEach(link => {
        link.addEventListener('click', () => {
          dropdown.classList.remove('open');
        });
      });
    });
  }

  /**
   * Populate the filters dropdown with search filters
   */
  populateFiltersDropdown() {
    const menu = document.getElementById('filters-dropdown-menu');
    if (!menu) return;

    const filters = DataService.getSearchFilters();
    
    // Always show the "New Filter" button at the top
    const newFilterBtn = `
      <button class="dropdown-action-btn filter-dropdown-new">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M8 3v10M3 8h10"/>
        </svg>
        New Filter
      </button>
    `;
    
    if (filters.length === 0) {
      menu.innerHTML = `
        ${newFilterBtn}
        <div class="dropdown-divider"></div>
        <div class="dropdown-empty-state">
          <span class="text-muted">No saved filters</span>
        </div>
      `;
      this.attachFilterDropdownListeners(menu, []);
      return;
    }

    const filterLinks = filters.map(filter => {
      const scope = filter.scope || {};
      const isAdvanced = scope.mode === 'advanced';
      
      let itemCount;
      if (isAdvanced) {
        // For advanced filters, just show "Boolean" badge
        itemCount = null;
      } else {
        itemCount = (scope.personIds?.length || 0) + 
                    (scope.organizationIds?.length || 0) + 
                    (scope.factionIds?.length || 0) + 
                    (scope.locationIds?.length || 0) + 
                    (scope.eventIds?.length || 0) + 
                    (scope.keywords?.length || 0);
      }
      
      return `
        <div class="filter-dropdown-item ${isAdvanced ? 'filter-advanced' : ''}" data-filter-id="${filter.id}">
          <div class="filter-dropdown-info">
            <span class="filter-dropdown-name">${this.escapeHtml(filter.name)}</span>
            ${isAdvanced 
              ? '<span class="filter-dropdown-badge">Boolean</span>' 
              : `<span class="filter-dropdown-count">${itemCount} item${itemCount !== 1 ? 's' : ''}</span>`}
          </div>
        </div>
      `;
    }).join('');

    menu.innerHTML = `
      ${newFilterBtn}
      <div class="dropdown-divider"></div>
      ${filterLinks}
    `;

    this.attachFilterDropdownListeners(menu, filters);
  }

  /**
   * Attach event listeners for the filters dropdown
   */
  attachFilterDropdownListeners(menu, filters) {
    // New filter button
    const newBtn = menu.querySelector('.filter-dropdown-new');
    if (newBtn) {
      newBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openFilterEditor(null);
        this.closeDropdown(menu);
      });
    }
    
    // Filter item clicks - open filter editor
    menu.querySelectorAll('.filter-dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const filterId = item.dataset.filterId;
        const filter = filters.find(f => f.id === filterId);
        if (filter) {
          this.openFilterEditor(filter);
        }
        this.closeDropdown(menu);
      });
    });
  }

  /**
   * Close a dropdown
   */
  closeDropdown(menu) {
    const dropdown = menu.closest('.nav-dropdown');
    if (dropdown) {
      dropdown.classList.remove('open');
    }
  }

  /**
   * Open the filter editor modal
   */
  openFilterEditor(filter) {
    const editor = getSearchFilterEditor();
    const callback = () => {
      this.populateFiltersDropdown();
      if (this.router) {
        this.router.handleRoute();
      }
    };
    
    if (filter) {
      editor.openEdit(filter, callback);
    } else {
      editor.openCreate(callback);
    }
  }

  /**
   * Populate the tags dropdown with all tags
   */
  populateTagsDropdown() {
    const menu = document.getElementById('tags-dropdown-menu');
    if (!menu) return;

    const tags = DataService.getTags();
    const tagCounts = DataService.getTagCounts();
    
    // Always show the "New Tag" button at the top
    const newTagBtn = `
      <button class="dropdown-action-btn tag-dropdown-new">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M8 3v10M3 8h10"/>
        </svg>
        New Tag
      </button>
    `;
    
    if (tags.length === 0) {
      menu.innerHTML = `
        ${newTagBtn}
        <div class="dropdown-divider"></div>
        <div class="dropdown-empty-state">
          <span class="text-muted">No tags</span>
        </div>
      `;
      this.attachTagDropdownListeners(menu, []);
      return;
    }

    const tagLinks = tags.map(tag => {
      const count = tagCounts[tag.id] || 0;
      return `
        <div class="tag-dropdown-item" data-tag-id="${tag.id}">
          <div class="tag-dropdown-info">
            <span class="tag-dropdown-color" style="background-color: ${tag.color || '#6b7280'}"></span>
            <span class="tag-dropdown-name">${this.escapeHtml(tag.name)}</span>
            <span class="tag-dropdown-count">${count}</span>
          </div>
        </div>
      `;
    }).join('');

    menu.innerHTML = `
      ${newTagBtn}
      <div class="dropdown-divider"></div>
      ${tagLinks}
    `;

    this.attachTagDropdownListeners(menu, tags);
  }

  /**
   * Attach event listeners for the tags dropdown
   */
  attachTagDropdownListeners(menu, tags) {
    // New tag button
    const newBtn = menu.querySelector('.tag-dropdown-new');
    if (newBtn) {
      newBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openTagEditor(null);
        this.closeDropdown(menu);
      });
    }
    
    // Tag item clicks - navigate to tag detail
    menu.querySelectorAll('.tag-dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const tagId = item.dataset.tagId;
        if (tagId) {
          window.location.hash = `#/tag/${tagId}`;
        }
        this.closeDropdown(menu);
      });
    });
  }

  /**
   * Open the tag editor modal
   */
  openTagEditor(tag) {
    const editor = getTagEditor();
    const callback = () => {
      this.populateTagsDropdown();
      if (this.router) {
        this.router.handleRoute();
      }
    };
    
    if (tag) {
      editor.openEdit(tag, callback);
    } else {
      editor.openCreate(callback);
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    return escapeHtml(text);
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Use saved preference
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
    
    // Listen for system theme changes (only if no saved preference)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Initialize theme toggle button
   */
  initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  /**
   * Initialize delegated event listener for source links
   * Handles all .source-link clicks with data-source-type and data-source-id attributes
   */
  initSourceLinkHandler() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.source-link[data-source-type]');
      if (!link) return;
      
      e.preventDefault();
      const type = link.dataset.sourceType;
      const id = link.dataset.sourceId;
      
      if (!type || !id) return;
      
      // Get the entity based on type
      let entity = null;
      switch (type) {
        case 'narrative':
          entity = DataService.getNarrativeById(id);
          break;
        case 'theme':
          entity = DataService.getThemeById(id);
          break;
        case 'topic':
          entity = DataService.getTopicById(id);
          break;
        case 'person':
          entity = DataService.getPerson(id);
          break;
        case 'organization':
          entity = DataService.getOrganization(id);
          break;
        case 'event':
          entity = DataService.getEvent(id);
          break;
        case 'faction':
          entity = DataService.getFaction(id);
          break;
        case 'location':
          entity = DataService.getLocation(id);
          break;
        default:
          console.warn(`Unknown source type: ${type}`);
          return;
      }
      
      if (entity) {
        getSourceViewer().open(entity, type);
      }
    });
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    this.showToast(`Switched to ${newTheme} mode`, 'success');
  }

  /**
   * Get the current theme
   * @returns {string} 'light' or 'dark'
   */
  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  /**
   * Toggle chat panel open/closed
   */
  toggleChat(forceState) {
    const chatPanel = document.getElementById('chat-panel');
    const chatToggle = document.getElementById('chat-toggle');
    
    this.chatOpen = forceState !== undefined ? forceState : !this.chatOpen;

    if (this.chatOpen) {
      chatPanel?.classList.add('open');
      chatToggle?.classList.add('active');
      document.body.classList.add('chat-open');
      
      // Focus input when opening
      setTimeout(() => {
        document.getElementById('chat-input')?.focus();
      }, 250);
    } else {
      chatPanel?.classList.remove('open');
      chatToggle?.classList.remove('active');
      document.body.classList.remove('chat-open');
    }
  }

  /**
   * Get the current chat context key
   * Chat conversations are bounded by context (workspace, monitor, project, cop, dashboard)
   * @returns {string} Context key like "workspace-workspace-001" or "cop"
   */
  getChatContextKey() {
    if (!this.router) return 'default';
    
    const parsed = this.router.getCurrentRoute();
    const { contextType, contextId } = parsed;
    
    // Build context key from type and id
    if (contextId) {
      return `${contextType}-${contextId}`;
    }
    return contextType || 'dashboard';
  }

  /**
   * Check if there are any user messages in the chat
   * @returns {boolean}
   */
  hasUserMessages() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return false;
    return chatMessages.querySelector('.chat-message.user') !== null;
  }

  /**
   * Clear the chat UI (removes user/assistant messages but keeps welcome element)
   */
  clearChatUI() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    // Remove all messages except the welcome element and suggested questions
    const messagesToRemove = chatMessages.querySelectorAll('.chat-message:not(#chat-welcome)');
    messagesToRemove.forEach(msg => msg.remove());
    
    // Show welcome element again
    const welcomeElement = document.getElementById('chat-welcome');
    if (welcomeElement) {
      welcomeElement.style.display = 'block';
    }
  }

  /**
   * Restore chat UI from conversation history
   */
  restoreChatUI() {
    if (!this.chatService) return;
    
    const history = this.chatService.getHistory();
    const chatMessages = document.getElementById('chat-messages');
    const welcomeElement = document.getElementById('chat-welcome');
    
    if (!chatMessages || history.length === 0) return;
    
    // Hide welcome element since we're showing history
    if (welcomeElement) {
      welcomeElement.style.display = 'none';
    }
    
    // Clear any existing non-welcome messages
    const existingMessages = chatMessages.querySelectorAll('.chat-message:not(#chat-welcome)');
    existingMessages.forEach(msg => msg.remove());
    
    // Restore each message
    history.forEach(msg => {
      if (msg.role === 'user') {
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.innerHTML = `<div class="chat-message-content">${this.escapeHtml(msg.content)}</div>`;
        chatMessages.appendChild(userMsg);
      } else if (msg.role === 'assistant') {
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'chat-message assistant';
        assistantMsg.innerHTML = `<div class="chat-message-content">${this.formatAIResponse(msg.content)}</div>`;
        chatMessages.appendChild(assistantMsg);
      }
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * Add a navigation summary as a chat message (for same-context navigation)
   * Uses generateSummaryOnly to avoid polluting conversation history
   */
  async addNavigationSummary(route, id) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages || !this.chatService || !ChatService.hasApiKey()) return;
    
    // Check if we've already summarized this page in this context
    const pageKey = `${route}-${id || 'list'}`;
    if (this.summarizedPagesInContext.has(pageKey)) {
      return; // Skip - already summarized
    }
    
    const prompt = this.getAutoSummaryPrompt(route, id);
    if (!prompt) return;
    
    // Mark as summarized
    this.summarizedPagesInContext.add(pageKey);
    
    // Check sessionStorage cache first
    const cacheKey = `ai_summary_${route}_${id || 'list'}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached) {
      // Use cached summary
      const navMsg = document.createElement('div');
      navMsg.className = 'chat-message assistant chat-navigation-summary';
      navMsg.innerHTML = `
        <div class="chat-message-content">
          <div class="chat-ai-summary">
            <div class="chat-ai-summary-label">Page Summary</div>
            <div class="chat-ai-summary-content">${this.formatAIResponse(cached)}</div>
          </div>
        </div>
      `;
      chatMessages.appendChild(navMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return;
    }
    
    // Create a navigation marker message with loading state
    const navMsg = document.createElement('div');
    navMsg.className = 'chat-message assistant chat-navigation-summary';
    navMsg.innerHTML = `
      <div class="chat-message-content">
        <div class="chat-typing">
          <span class="chat-typing-dot"></span>
          <span class="chat-typing-dot"></span>
          <span class="chat-typing-dot"></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(navMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    try {
      // Use generateSummaryOnly to avoid adding to conversation history
      const response = await this.chatService.generateSummaryOnly(prompt);
      
      // Cache the response
      sessionStorage.setItem(cacheKey, response);
      
      const contentEl = navMsg.querySelector('.chat-message-content');
      contentEl.innerHTML = `
        <div class="chat-ai-summary">
          <div class="chat-ai-summary-label">Page Summary</div>
          <div class="chat-ai-summary-content">${this.formatAIResponse(response)}</div>
        </div>
      `;
    } catch (error) {
      console.error('Navigation summary error:', error);
      navMsg.remove(); // Remove failed message
      this.summarizedPagesInContext.delete(pageKey); // Allow retry
    }
  }

  /**
   * Update the welcome message with a summary of the current page
   * Handles bounded chat contexts - clears on context change, appends on same-context navigation
   */
  updatePageSummary() {
    if (!this.router) return;
    
    const newContextKey = this.getChatContextKey();
    const contextChanged = this.currentChatContext !== newContextKey;
    const previousContext = this.currentChatContext;
    
    // Save history for previous context before switching
    if (contextChanged && previousContext && this.chatService) {
      this.chatService.saveHistoryToStorage(previousContext);
    }
    
    // Update current context
    this.currentChatContext = newContextKey;
    
    const { route, id } = this.router.getCurrentRoute();
    const settings = this.dataStore.getSettings();
    
    if (contextChanged) {
      // Context changed - clear UI and load history for new context
      this.clearChatUI();
      
      // Clear the summarized pages tracker for the new context
      this.summarizedPagesInContext.clear();
      
      if (this.chatService) {
        // Try to restore history for this context
        const hasHistory = this.chatService.loadHistoryFromStorage(newContextKey);
        if (hasHistory) {
          this.restoreChatUI();
        } else {
          this.chatService.clearHistory();
        }
      }
      
      // Show welcome message for new context
      const summary = this.generatePageSummary(route, id);
      const welcomeElement = document.getElementById('chat-welcome');
      if (welcomeElement && summary) {
        welcomeElement.style.display = 'block';
        const contentElement = welcomeElement.querySelector('.chat-message-content');
        if (contentElement) {
          contentElement.innerHTML = summary;
          requestAnimationFrame(() => this.renderChatSparklines(contentElement));
        }
      }
      
      // Update suggested questions
      this.updateSuggestedQuestions();
      
      // Auto-generate AI summary if enabled (for welcome)
      if (settings.autoSummary && ChatService.hasApiKey() && this.chatService) {
        this.generateAISummary(route, id);
      }
    } else if (this.hasUserMessages()) {
      // Same context, but user has interacted - add navigation summary as message
      // Hide the welcome element since we have conversation history
      const welcomeElement = document.getElementById('chat-welcome');
      if (welcomeElement) {
        welcomeElement.style.display = 'none';
      }
      
      this.updateSuggestedQuestions();
      
      if (settings.autoSummary && ChatService.hasApiKey() && this.chatService) {
        this.addNavigationSummary(route, id);
      }
    } else {
      // Same context, no interaction yet - update welcome message
      const summary = this.generatePageSummary(route, id);
      const welcomeElement = document.getElementById('chat-welcome');
      if (welcomeElement && summary) {
        const contentElement = welcomeElement.querySelector('.chat-message-content');
        if (contentElement) {
          contentElement.innerHTML = summary;
          requestAnimationFrame(() => this.renderChatSparklines(contentElement));
        }
      }
      
      // Update suggested questions
      this.updateSuggestedQuestions();
      
      // Auto-generate AI summary if enabled
      if (settings.autoSummary && ChatService.hasApiKey() && this.chatService) {
        this.generateAISummary(route, id);
      }
    }
  }

  /**
   * Generate an AI summary of the current page
   */
  async generateAISummary(route, id) {
    const welcomeElement = document.getElementById('chat-welcome');
    if (!welcomeElement) return;
    
    const contentElement = welcomeElement.querySelector('.chat-message-content');
    if (!contentElement) return;
    
    // Check if this route should have auto-summary
    const prompt = this.getAutoSummaryPrompt(route, id);
    if (!prompt) return; // Skip auto-summary for this route
    
    // Check if we've already summarized this page in this context
    const pageKey = `${route}-${id || 'list'}`;
    if (this.summarizedPagesInContext.has(pageKey)) {
      return; // Skip - already summarized
    }
    
    // Mark as summarized
    this.summarizedPagesInContext.add(pageKey);
    
    // Check sessionStorage cache first
    const cacheKey = `ai_summary_${route}_${id || 'list'}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached) {
      // Use cached summary
      contentElement.innerHTML = `
        <div class="chat-ai-summary">
          <div class="chat-ai-summary-label">AI Summary</div>
          <div class="chat-ai-summary-content">${this.formatAIResponse(cached)}</div>
        </div>
      `;
      return;
    }
    
    // Show loading state (same typing indicator as chat replies)
    const originalContent = contentElement.innerHTML;
    contentElement.innerHTML = `
      <div class="chat-typing">
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
      </div>
    `;
    
    try {
      // Use generateSummaryOnly to avoid polluting conversation history
      const response = await this.chatService.generateSummaryOnly(prompt);
      
      // Cache the response
      sessionStorage.setItem(cacheKey, response);
      
      // Display the AI summary above the original content
      contentElement.innerHTML = `
        <div class="chat-ai-summary">
          <div class="chat-ai-summary-label">AI Summary</div>
          <div class="chat-ai-summary-content">${this.formatAIResponse(response)}</div>
        </div>
      `;
    } catch (error) {
      console.error('Auto-summary error:', error);
      // Restore original content on error
      contentElement.innerHTML = originalContent;
      this.summarizedPagesInContext.delete(pageKey); // Allow retry
    }
  }

  /**
   * Get the prompt for auto-summarizing a page
   */
  getAutoSummaryPrompt(route, id) {
    switch (route) {
      case 'narrative':
        return 'Give me a brief 2-3 sentence summary of this narrative, including key themes and the overall sentiment.';
      case 'theme':
        return 'Briefly summarize this theme and how it relates to its parent narrative.';
      case 'faction':
        return 'Give me a brief summary of this faction, their key narratives, and notable affiliated entities.';
      case 'person':
        return 'Briefly summarize this person, their role, affiliations, and which narratives they appear in.';
      case 'organization':
        return 'Briefly summarize this organization, its type, affiliations, and involvement in narratives.';
      case 'document':
        return 'Summarize the key points of this document and its relevance to tracked narratives.';
      case 'event':
        return 'Briefly summarize this event, when it occurred, and its connection to tracked narratives.';
      case 'dashboard':
      case 'monitor':
        return 'Give me a brief overview of the current activity - what are the top narratives and any notable trends?';
      case 'monitors':
        return 'Give me a brief summary of recent alerts - what requires attention and any patterns in the alerts?';
      case 'workspaces':
      case 'projects':
      case 'search':
        return null; // Skip auto-summary for these views
      default:
        return 'Briefly summarize what I\'m looking at on this page.';
    }
  }

  /**
   * Update suggested questions based on current page
   */
  async updateSuggestedQuestions() {
    const container = document.getElementById('chat-suggested-questions');
    if (!container) return;
    
    const settings = this.dataStore.getSettings();
    
    // Hide if setting is disabled or no API key
    if (!settings.suggestedQuestions || !ChatService.hasApiKey()) {
      container.style.display = 'none';
      return;
    }
    
    container.style.display = 'block';
    
    const { route, id } = this.router.getCurrentRoute();
    
    // Check cache first
    const cacheKey = `suggested_questions_${route}_${id || 'list'}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached) {
      this.renderSuggestedQuestions(container, JSON.parse(cached));
      return;
    }
    
    // Show loading state
    container.innerHTML = `
      <div class="suggested-questions-loading">
        <span class="chat-tool-indicator">Generating questions...</span>
      </div>
    `;
    
    try {
      // Build context for this entity
      const context = this.buildEntityContext(route, id);
      
      // Skip AI generation for certain routes
      if (!context || route === 'workspaces' || route === 'projects' || route === 'search') {
        container.style.display = 'none';
        return;
      }
      
      // Generate AI questions
      const questions = await this.chatService.generateSuggestedQuestions(context);
      
      // Cache the result
      sessionStorage.setItem(cacheKey, JSON.stringify(questions));
      
      this.renderSuggestedQuestions(container, questions);
    } catch (error) {
      console.error('Failed to generate AI questions, using fallback:', error);
      // Fall back to static questions
      const fallbackQuestions = this.getStaticSuggestedQuestions(route, id);
      this.renderSuggestedQuestions(container, fallbackQuestions);
    }
  }

  /**
   * Build entity context for AI question generation
   */
  buildEntityContext(route, id) {
    const context = { type: route };
    
    switch (route) {
      case 'narrative': {
        const narrative = DataService.getNarrative(id);
        if (!narrative) return null;
        context.name = narrative.text;
        context.description = narrative.description;
        context.sentiment = narrative.sentiment;
        context.themeCount = DataService.getThemesForNarrative(id).length;
        context.factionCount = Object.keys(DataService.getAggregateFactionMentionsForNarrative(id) || {}).length;
        context.documentCount = DataService.getDocumentsForNarrative(id).length;
        context.personCount = DataService.getPersonsForNarrative(id).length;
        context.orgCount = DataService.getOrganizationsForNarrative(id).length;
        // Check for recent activity
        const docs = DataService.getDocumentsForNarrative(id);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        context.hasRecentActivity = docs.some(d => new Date(d.publishedDate) > weekAgo);
        break;
      }
      case 'theme': {
        const theme = DataService.getTheme(id);
        if (!theme) return null;
        context.name = theme.text;
        context.sentiment = theme.sentiment;
        const parent = DataService.getNarrative(theme.parentNarrativeId);
        context.parentNarrative = parent?.text;
        context.documentCount = DataService.getDocumentsForTheme(id).length;
        break;
      }
      case 'faction': {
        const faction = DataService.getFaction(id);
        if (!faction) return null;
        context.name = faction.name;
        context.description = faction.description;
        context.narrativeCount = DataService.getNarrativesForFaction(id).length;
        context.personCount = DataService.getPersonsForFaction(id).length;
        context.orgCount = DataService.getOrganizationsForFaction(id).length;
        break;
      }
      case 'person': {
        const person = DataService.getPerson(id);
        if (!person) return null;
        context.name = person.name;
        context.description = person.description;
        context.role = person.role;
        context.narrativeCount = DataService.getNarrativesForPerson(id).length;
        context.documentCount = DataService.getDocumentsForPerson(id).length;
        const factions = DataService.getFactionsForPerson(id);
        context.affiliatedFactions = factions.map(f => f.name);
        break;
      }
      case 'organization': {
        const org = DataService.getOrganization(id);
        if (!org) return null;
        context.name = org.name;
        context.description = org.description;
        context.orgType = org.type;
        context.narrativeCount = DataService.getNarrativesForOrganization(id).length;
        context.documentCount = DataService.getDocumentsForOrganization(id).length;
        const factions = DataService.getFactionsForOrganization(id);
        context.affiliatedFactions = factions.map(f => f.name);
        break;
      }
      case 'document': {
        const doc = DataService.getDocumentById(id);
        if (!doc) return null;
        context.name = doc.title;
        context.description = doc.excerpt;
        context.docType = doc.documentType;
        context.narrativeCount = doc.narrativeIds?.length || 0;
        context.personCount = doc.personIds?.length || 0;
        context.orgCount = doc.organizationIds?.length || 0;
        break;
      }
      case 'event': {
        const event = DataService.getEvent(id);
        if (!event) return null;
        context.name = event.name;
        context.description = event.description;
        context.date = event.date;
        context.documentCount = DataService.getDocumentsForEvent(id).length;
        context.narrativeCount = DataService.getNarrativesForEvent(id).length;
        break;
      }
      case 'dashboard':
      case 'cop':
      case 'monitor':
      case 'monitors': {
        context.type = 'dashboard overview';
        context.narrativeCount = DataService.getNarratives().length;
        context.factionCount = DataService.getFactions().length;
        const alerts = DataService.getAlerts?.() || [];
        context.alertCount = alerts.length;
        break;
      }
      default:
        return null;
    }
    
    return context;
  }

  /**
   * Render suggested questions in the container
   */
  renderSuggestedQuestions(container, questions) {
    container.innerHTML = questions.map(q => `
      <button class="suggested-question-btn" data-question="${this.escapeHtml(q)}">
        ${this.escapeHtml(q)}
      </button>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.suggested-question-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.dataset.question;
        this.askSuggestedQuestion(question);
      });
    });
  }

  /**
   * Get static fallback suggested questions based on current page type
   */
  getStaticSuggestedQuestions(route, id) {
    switch (route) {
      case 'narrative':
        return [
          'What are the main themes in this narrative?',
          'Which factions are most engaged with this narrative?',
          'What are the most recent documents about this?'
        ];
      case 'theme':
        return [
          'How does this theme relate to the parent narrative?',
          'What entities are mentioned in this theme?',
          'What documents support this theme?'
        ];
      case 'faction':
        return [
          'What narratives is this faction most active in?',
          'Who are the key people affiliated with this faction?',
          'How does this faction\'s sentiment compare to others?'
        ];
      case 'person':
        return [
          'What narratives mention this person?',
          'What factions is this person affiliated with?',
          'What are the most recent documents about this person?'
        ];
      case 'organization':
        return [
          'What narratives involve this organization?',
          'Which factions is this organization connected to?',
          'Who are the key people associated with this organization?'
        ];
      case 'document':
        return [
          'What are the key claims in this document?',
          'What narratives is this document linked to?',
          'What entities are mentioned in this document?'
        ];
      case 'dashboard':
      case 'monitor':
        return [
          'What are the top trending narratives?',
          'Which factions have been most active recently?',
          'Are there any emerging themes I should know about?'
        ];
      default:
        return [
          'What should I focus on here?',
          'What are the key insights?',
          'What related information is available?'
        ];
    }
  }

  /**
   * Ask a suggested question
   */
  askSuggestedQuestion(question) {
    // Open chat if not already open
    if (!this.chatOpen) {
      this.toggleChat(true);
    }
    
    // Put the question in the input and send it
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      chatInput.value = question;
      this.sendChatMessage();
    }
  }

  /**
   * Render sparklines in the chat summary
   */
  renderChatSparklines(container) {
    const sparklineElements = container.querySelectorAll('.chat-sparkline');
    sparklineElements.forEach(el => {
      const valuesStr = el.dataset.values;
      const sentiment = parseFloat(el.dataset.sentiment) || 0;
      
      if (!valuesStr) return;
      
      const values = valuesStr.split(',').map(Number);
      if (values.length < 2 || values.every(v => v === 0)) return;
      
      const width = 50;
      const height = 16;
      const padding = 1;
      
      const max = Math.max(...values);
      const min = Math.min(...values);
      const range = max - min || 1;
      
      // Generate points for the polyline
      const points = values.map((v, i) => {
        const x = padding + (i / (values.length - 1)) * (width - padding * 2);
        const y = height - padding - ((v - min) / range) * (height - padding * 2);
        return `${x},${y}`;
      }).join(' ');
      
      // Color based on sentiment
      let color = '#888';
      if (sentiment > 0.2) color = 'var(--sentiment-positive, #66BB6A)';
      else if (sentiment < -0.2) color = 'var(--sentiment-negative, #E57373)';
      
      el.innerHTML = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    });
  }

  /**
   * Generate a contextual summary based on the current route
   */
  generatePageSummary(route, id) {
    switch (route) {
      case 'dashboard':
        return this.getDashboardSummary();
      case 'narrative':
        return id ? this.getNarrativeSummary(id) : this.getNarrativeListSummary();
      case 'narratives':
        return this.getNarrativeListSummary();
      case 'theme':
        return id ? this.getThemeSummary(id) : null;
      case 'faction':
        return id ? this.getFactionSummary(id) : this.getFactionListSummary();
      case 'factions':
        return this.getFactionListSummary();
      case 'location':
        return id ? this.getLocationSummary(id) : this.getLocationListSummary();
      case 'locations':
        return this.getLocationListSummary();
      case 'event':
        return id ? this.getEventSummary(id) : this.getEventListSummary();
      case 'events':
        return this.getEventListSummary();
      case 'person':
        return id ? this.getPersonSummary(id) : this.getEntityListSummary();
      case 'organization':
        return id ? this.getOrganizationSummary(id) : this.getEntityListSummary();
      case 'entities':
        return this.getEntityListSummary();
      case 'document':
        return id ? this.getDocumentSummary(id) : null;
      default:
        return `<strong>${route.charAt(0).toUpperCase() + route.slice(1)}</strong>`;
    }
  }

  /**
   * Generate dashboard summary
   */
  getDashboardSummary() {
    const narratives = DataService.getNarratives();
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    // Filter narratives with activity in the last 24 hours using document-based aggregation
    const recentNarratives = narratives.filter(n => {
      const volumeOverTime = DataService.getVolumeOverTimeForNarrative(n.id);
      if (volumeOverTime && volumeOverTime.length > 0) {
        return volumeOverTime.some(entry => {
          const entryDate = new Date(entry.date);
          return entryDate >= oneDayAgo;
        });
      }
      // Fallback to createdAt
      if (n.createdAt) {
        return new Date(n.createdAt) >= oneDayAgo;
      }
      return false;
    });
    
    // Calculate total volume for each recent narrative using document aggregation
    const narrativesWithVolume = recentNarratives.map(n => {
      const factionMentions = DataService.getAggregateFactionMentionsForNarrative(n.id);
      const volumeOverTime = DataService.getVolumeOverTimeForNarrative(n.id);
      const totalVolume = Object.values(factionMentions)
        .reduce((sum, f) => sum + (f.volume || 0), 0);
      const themes = DataService.getThemesForNarrative(n.id);
      return { ...n, totalVolume, volumeOverTime, themes };
    });
    
    // Sort by volume (highest first)
    narrativesWithVolume.sort((a, b) => b.totalVolume - a.totalVolume);
    
    if (narrativesWithVolume.length === 0) {
      return `<strong>Activity in the last 24 hours:</strong><br><br>` +
        `No narrative activity detected.<br><br>` +
        `Try asking clarifying information about a narrative, related narratives, or trends over time.`;
    }
    
    // Build the narrative list HTML
    let listHtml = `<strong>Activity in the last 24 hours:</strong>`;
    listHtml += `<div class="chat-narrative-list">`;
    
    narrativesWithVolume.forEach((n, index) => {
      const title = this.escapeHtml(n.title || n.text?.substring(0, 80) + '...');
      const volumeDisplay = n.totalVolume.toLocaleString();
      const sparklineData = this.getSparklineData(n.volumeOverTime);
      const isTopNarrative = index === 0;
      
      // Narrative item container
      listHtml += `<div class="chat-narrative-item${isTopNarrative ? ' top-narrative' : ''}">`;
      
      // Narrative title as link
      listHtml += `<a href="#/narrative/${n.id}" class="chat-narrative-title">${title}</a>`;
      
      // Volume and sparkline row
      listHtml += `<div class="chat-narrative-meta">`;
      listHtml += `<span class="chat-narrative-volume">${volumeDisplay} mentions</span>`;
      if (sparklineData.length > 1) {
        listHtml += `<span class="chat-sparkline" data-values="${sparklineData.join(',')}" data-sentiment="${n.sentiment || 0}"></span>`;
      }
      listHtml += `</div>`;
      
      // Themes if any
      if (n.themes && n.themes.length > 0) {
        listHtml += `<div class="chat-themes-list">`;
        n.themes.slice(0, 3).forEach(theme => {
          const themeTitle = this.escapeHtml(theme.title || theme.text?.substring(0, 50) + '...');
          listHtml += `<a href="#/theme/${theme.id}" class="chat-theme-link">`;
          listHtml += `<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 0v12h8"/></svg>`;
          listHtml += `<span>${themeTitle}</span>`;
          listHtml += `</a>`;
        });
        if (n.themes.length > 3) {
          listHtml += `<span class="chat-themes-more">+${n.themes.length - 3} more</span>`;
        }
        listHtml += `</div>`;
      }
      
      listHtml += `</div>`;
    });
    
    listHtml += `</div>`;
    listHtml += `<div class="chat-summary-footer">Try asking clarifying information about a narrative, related narratives, or trends over time.</div>`;
    
    return listHtml;
  }

  /**
   * Extract sparkline data values from volumeOverTime
   */
  getSparklineData(volumeOverTime) {
    if (!volumeOverTime || volumeOverTime.length === 0) {
      return [];
    }
    return volumeOverTime.map(d =>
      Object.values(d.factionVolumes || {}).reduce((a, b) => a + b, 0)
    );
  }

  /**
   * Generate narrative detail summary
   */
  getNarrativeSummary(id) {
    const narrative = DataService.getNarrativeById(id);
    if (!narrative) return null;
    
    const themes = DataService.getThemesForNarrative(id);
    const factions = DataService.getFactionsForNarrative(id);
    const sentiment = narrative.sentiment || 0;
    const sentimentLabel = sentiment > 0.2 ? 'positive' : sentiment < -0.2 ? 'negative' : 'neutral';
    
    return `<strong>Narrative: ${this.escapeHtml(narrative.title || narrative.text?.substring(0, 50) + '...')}</strong><br><br>` +
      `<strong>Status:</strong> ${narrative.status || 'unknown'}<br>` +
      `<strong>Sentiment:</strong> ${sentimentLabel} (${(sentiment * 100).toFixed(0)}%)<br>` +
      `<strong>Themes:</strong> ${themes.length}<br>` +
      `<strong>Factions involved:</strong> ${factions.length}`;
  }

  /**
   * Generate narrative list summary
   */
  getNarrativeListSummary() {
    const narratives = DataService.getNarratives();
    const newCount = narratives.filter(n => n.status === 'new').length;
    
    return `<strong>Narratives List</strong><br><br>` +
      `Viewing <strong>${narratives.length} narratives</strong> total.` +
      `${newCount > 0 ? `<br><strong>${newCount} new narratives</strong> require attention.` : ''}`;
  }

  /**
   * Generate theme summary
   */
  getThemeSummary(id) {
    const theme = DataService.getThemeById(id);
    if (!theme) return null;
    
    const parentNarrative = DataService.getNarrativeById(theme.narrativeId);
    
    return `<strong>Theme: ${this.escapeHtml(theme.title || theme.text?.substring(0, 50) + '...')}</strong>` +
      (parentNarrative ? `<br><br><strong>Parent narrative:</strong> ${this.escapeHtml(parentNarrative.title || 'Untitled')}` : '');
  }

  /**
   * Generate faction detail summary
   */
  getFactionSummary(id) {
    const faction = DataService.getFactionById(id);
    if (!faction) return null;
    
    const narratives = DataService.getNarrativesForFaction(id);
    
    return `<strong>Faction: ${this.escapeHtml(faction.name)}</strong><br><br>` +
      (faction.description ? `${this.escapeHtml(faction.description.substring(0, 150))}...<br><br>` : '') +
      `<strong>Associated narratives:</strong> ${narratives.length}`;
  }

  /**
   * Generate faction list summary
   */
  getFactionListSummary() {
    const factions = DataService.getFactions();
    
    return `<strong>Factions List</strong><br><br>` +
      `Tracking <strong>${factions.length} factions</strong>.<br><br>` +
      `Ask to compare faction activities or identify coordination patterns.`;
  }

  /**
   * Generate location detail summary
   */
  getLocationSummary(id) {
    const location = DataService.getLocationById(id);
    if (!location) return null;
    
    const narratives = DataService.getNarrativesForLocation(id);
    
    return `<strong>Location: ${this.escapeHtml(location.name)}</strong><br><br>` +
      `<strong>Narratives mentioning this location:</strong> ${narratives.length}`;
  }

  /**
   * Generate location list summary
   */
  getLocationListSummary() {
    const locations = DataService.getLocations();
    
    return `<strong>Locations List</strong><br><br>` +
      `Tracking narratives across <strong>${locations.length} locations</strong>.<br><br>` +
      `Ask to identify geographic hotspots or regional patterns.`;
  }

  /**
   * Generate event detail summary
   */
  getEventSummary(id) {
    const event = DataService.getEventById(id);
    if (!event) return null;
    
    const narratives = DataService.getNarrativesForEvent(id);
    
    return `<strong>Event: ${this.escapeHtml(event.title || event.name)}</strong><br><br>` +
      (event.date ? `<strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}<br>` : '') +
      `<strong>Related narratives:</strong> ${narratives.length}`;
  }

  /**
   * Generate event list summary
   */
  getEventListSummary() {
    const events = DataService.getEvents();
    
    return `<strong>Events Timeline</strong><br><br>` +
      `Tracking <strong>${events.length} events</strong>.`;
  }

  /**
   * Generate person summary
   */
  getPersonSummary(id) {
    const person = DataService.getPersonById(id);
    if (!person) return null;
    
    const narratives = DataService.getNarrativesForPerson(id);
    
    return `<strong>Person: ${this.escapeHtml(person.name)}</strong><br><br>` +
      (person.role ? `<strong>Role:</strong> ${this.escapeHtml(person.role)}<br>` : '') +
      `<strong>Mentioned in:</strong> ${narratives.length} narratives`;
  }

  /**
   * Generate organization summary
   */
  getOrganizationSummary(id) {
    const org = DataService.getOrganizationById(id);
    if (!org) return null;
    
    const narratives = DataService.getNarrativesForOrganization(id);
    
    return `<strong>Organization: ${this.escapeHtml(org.name)}</strong><br><br>` +
      (org.type ? `<strong>Type:</strong> ${this.escapeHtml(org.type)}<br>` : '') +
      `<strong>Mentioned in:</strong> ${narratives.length} narratives`;
  }

  /**
   * Generate entity list summary
   */
  getEntityListSummary() {
    const persons = DataService.getPersons();
    const orgs = DataService.getOrganizations();
    
    return `<strong>Entities List</strong><br><br>` +
      `Tracking <strong>${persons.length} people</strong> and <strong>${orgs.length} organizations</strong>.`;
  }

  /**
   * Generate document summary
   */
  getDocumentSummary(id) {
    const doc = DataService.getDocumentById(id);
    if (!doc) return null;
    
    return `<strong>Document: ${this.escapeHtml(doc.title || 'Untitled')}</strong><br><br>` +
      (doc.source ? `<strong>Source:</strong> ${this.escapeHtml(doc.source)}<br>` : '') +
      (doc.date ? `<strong>Date:</strong> ${new Date(doc.date).toLocaleDateString()}` : '');
  }

  /**
   * Send a chat message
   */
  async sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !chatMessages) return;

    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<div class="chat-message-content">${this.escapeHtml(message)}</div>`;
    chatMessages.appendChild(userMsg);

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message assistant';
    typingIndicator.innerHTML = `
      <div class="chat-typing">
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Check if we have an API key for real AI responses
    if (ChatService.hasApiKey() && this.chatService) {
      try {
        // Update typing indicator to show function calls
        const onToolCall = (fnName, args) => {
          const toolIndicator = typingIndicator.querySelector('.chat-typing');
          if (toolIndicator) {
            const friendlyName = this.getFriendlyToolName(fnName);
            toolIndicator.innerHTML = `
              <span class="chat-tool-indicator">${friendlyName}...</span>
            `;
          }
        };
        
        const response = await this.chatService.sendMessage(message, onToolCall);
        typingIndicator.remove();
        this.addAssistantMessage(this.formatAIResponse(response));
      } catch (error) {
        console.error('Chat error:', error);
        typingIndicator.remove();
        this.addAssistantMessage(`<span class="chat-error">Error: ${this.escapeHtml(error.message)}</span>`);
      }
    } else {
      // Fall back to placeholder responses
      setTimeout(() => {
        typingIndicator.remove();
        this.addAssistantMessage(this.getPlaceholderResponse(message));
      }, 1000 + Math.random() * 1000);
    }
  }

  /**
   * Get a friendly name for a tool/function
   */
  getFriendlyToolName(fnName) {
    const nameMap = {
      'get_current_page_context': 'Reading page context',
      'search_documents': 'Searching documents',
      'get_narrative_details': 'Loading narrative',
      'get_theme_details': 'Loading theme',
      'get_narratives_for_entity': 'Finding narratives',
      'get_faction_details': 'Loading faction',
      'get_person_details': 'Loading person',
      'get_organization_details': 'Loading organization',
      'get_related_entities': 'Finding connections',
      'compare_factions': 'Comparing factions',
      'get_volume_trends': 'Analyzing trends',
      'list_all_narratives': 'Listing narratives',
      'list_all_factions': 'Listing factions'
    };
    return nameMap[fnName] || 'Thinking';
  }

  /**
   * Format AI response with markdown-like parsing
   */
  formatAIResponse(text) {
    if (!text) return '';
    
    // Escape HTML first
    let formatted = this.escapeHtml(text);
    
    // Convert markdown-style formatting
    // Bold: **text** or __text__
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    
    // Italic: *text* or _text_
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/_([^_]+)_/g, '<em>$1</em>');
    
    // Convert newlines to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Convert bullet points
    formatted = formatted.replace(/^- (.+)$/gm, '• $1');
    
    // Convert entity IDs to links (narr-xxx, person-xxx, etc.)
    // Include context prefix if we're in a scoped context (workspace, monitor, project)
    const context = this.router?.getContext();
    const contextPrefix = context?.id ? `${context.id}/` : '';
    
    formatted = formatted.replace(/\b(narr-\d+)\b/g, `<a href="#/${contextPrefix}$1/" class="chat-entity-link">$1</a>`);
    formatted = formatted.replace(/\b(sub-\d+)\b/g, `<a href="#/${contextPrefix}$1/" class="chat-entity-link">$1</a>`);
    formatted = formatted.replace(/\b(person-\d+)\b/g, `<a href="#/${contextPrefix}$1/" class="chat-entity-link">$1</a>`);
    formatted = formatted.replace(/\b(org-\d+)\b/g, `<a href="#/${contextPrefix}$1/" class="chat-entity-link">$1</a>`);
    formatted = formatted.replace(/\b(faction-\d+)\b/g, `<a href="#/${contextPrefix}$1/" class="chat-entity-link">$1</a>`);
    formatted = formatted.replace(/\b(doc-\d+)\b/g, `<a href="#/${contextPrefix}$1/" class="chat-entity-link">$1</a>`);
    
    return formatted;
  }

  /**
   * Add an assistant message to the chat
   */
  addAssistantMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const assistantMsg = document.createElement('div');
    assistantMsg.className = 'chat-message assistant';
    assistantMsg.innerHTML = `<div class="chat-message-content">${text}</div>`;
    chatMessages.appendChild(assistantMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * Get a placeholder response based on the user's message
   */
  getPlaceholderResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Context-aware placeholder responses
    if (lowerMessage.includes('narrative') || lowerMessage.includes('story')) {
      return "Several narratives match this query. A full implementation would analyze the narrative database and provide insights on themes, sentiment trends, and faction involvement. Explore narratives using the sidebar navigation.";
    }
    
    if (lowerMessage.includes('faction') || lowerMessage.includes('group')) {
      return "Faction analysis is a key feature of Primer. This would typically include breakdowns of faction activities, associated narratives, and sentiment patterns. Check the Factions view for detailed faction information.";
    }
    
    if (lowerMessage.includes('event') || lowerMessage.includes('timeline')) {
      return "Events are tracked chronologically in the system. This feature can help identify patterns, correlations between events and narrative spikes, or flag significant developments. The Events view shows the full timeline.";
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('map')) {
      return "Geographic analysis helps identify regional narrative patterns. Location-based data reveals hotspots and regional trends. Explore the Locations view for map-based insights.";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
      return "This chat can help analyze disinformation narratives, track faction activities, identify trends, and explore connections in the data. Ask about specific narratives, factions, events, or locations. Note: This is a mockup with placeholder responses.";
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('pattern')) {
      return "Trend analysis shows how narratives evolve over time, identifies emerging themes, and detects coordinated amplification patterns. The dashboard charts provide visual trend information.";
    }

    // Default responses
    const defaultResponses = [
      "Query received: \"" + message.substring(0, 50) + (message.length > 50 ? "..." : "") + "\". In a production environment, this would query the narrative database and provide detailed analysis. Explore the dashboard to find relevant information.",
      "Interesting question. While this is showing placeholder responses, a full implementation would provide AI-powered insights based on the narrative data. Browse the available views for more information.",
      "Query noted. The complete system would analyze patterns across narratives, factions, and events to provide actionable intelligence. The sidebar navigation helps explore different data categories.",
      "Thanks for the question. This mockup demonstrates the chat interface. A production version would integrate with AI models to provide real-time analysis of disinformation narratives and faction activities."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}

// Create and initialize app
const app = new App();

// Make app globally accessible
window.app = app;

// Expose validation utility for console debugging
window.validateCurrentDataset = () => {
  const results = validateDataset(app.dataStore.data, { logToConsole: true });
  return results;
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

export { getEntityCardModal };
export default app;
