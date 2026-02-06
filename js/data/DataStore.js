/**
 * DataStore.js
 * Persistent data management with localStorage
 * Provides CRUD operations for all entity types
 */

class DataStore {
  constructor() {
    this.storageKey = 'narrativeOS_data';
    this.datasetKey = 'narrativeOS_currentDataset';
    this.datasetNameKey = 'narrativeOS_currentDatasetName';
    this.settingsKey = 'narrativeOS_settings';
    this.listeners = new Set();
    
    // Safely read from localStorage with fallbacks
    try {
      this.currentDataset = localStorage.getItem(this.datasetKey) || 'singapore-mco';
      this.currentDatasetName = localStorage.getItem(this.datasetNameKey) || 'Singapore MCO';
    } catch (e) {
      console.error('DataStore: Failed to read from localStorage:', e);
      this.currentDataset = 'singapore-mco';
      this.currentDatasetName = 'Singapore MCO';
    }
    
    this.data = this.load();
    this.settings = this.loadSettings();
  }

  // ============================================
  // Settings Management
  // ============================================

  /**
   * Load settings from localStorage
   * @returns {Object} Settings object
   */
  loadSettings() {
    try {
      const stored = localStorage.getItem(this.settingsKey);
      if (stored) {
        return { ...this.getDefaultSettings(), ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('DataStore: Failed to load settings:', e);
    }
    return this.getDefaultSettings();
  }

  /**
   * Get default settings
   * @returns {Object} Default settings object
   */
  getDefaultSettings() {
    return {
      copEnabled: true,              // Enable Common Operating Picture (global view)
      defaultStartPage: 'cop',       // 'cop' or 'monitors'
      defaultViewTab: 'dashboard',   // 'dashboard' or 'documents' (view tab, not COP)
      showClassification: true,      // Show portion marks and classification
      autoSummary: false,            // Auto-generate AI summary on page navigation
      suggestedQuestions: true       // Show suggested questions in chat
    };
  }

  /**
   * Get current settings
   * @returns {Object} Current settings
   */
  getSettings() {
    return { ...this.settings };
  }

  /**
   * Update settings
   * @param {Object} updates - Settings to update
   */
  updateSettings(updates) {
    this.settings = { ...this.settings, ...updates };
    try {
      localStorage.setItem(this.settingsKey, JSON.stringify(this.settings));
    } catch (e) {
      console.error('DataStore: Failed to save settings:', e);
    }
    this.notifyListeners();
  }

  // ============================================
  // Dataset Switching
  // ============================================

  /**
   * Get the current dataset ID
   * @returns {string} Current dataset identifier
   */
  getCurrentDataset() {
    return this.currentDataset;
  }

  /**
   * Get the current dataset name
   * @returns {string} Current dataset display name
   */
  getCurrentDatasetName() {
    return this.currentDatasetName;
  }

  /**
   * Set the current dataset name (called from app.js when initializing/switching)
   * @param {string} name - The display name for the dataset
   */
  setCurrentDatasetName(name) {
    this.currentDatasetName = name;
    try {
      localStorage.setItem(this.datasetNameKey, name);
    } catch (e) {
      console.error('DataStore: Failed to save dataset name to localStorage:', e);
    }
  }

  /**
   * Switch to a different dataset
   * @param {string} datasetId - Identifier for the new dataset
   * @param {Object} mockDataModule - The mock data object to load
   * @param {string} datasetName - Optional display name for the dataset
   * @param {Object} defaultSettings - Optional default settings for the dataset
   */
  switchDataset(datasetId, mockDataModule, datasetName = null, defaultSettings = null) {
    if (!datasetId || !mockDataModule) {
      console.error('DataStore: switchDataset requires datasetId and mockDataModule');
      return;
    }
    
    this.currentDataset = datasetId;
    try {
      localStorage.setItem(this.datasetKey, datasetId);
      if (datasetName) {
        this.currentDatasetName = datasetName;
        localStorage.setItem(this.datasetNameKey, datasetName);
      }
    } catch (e) {
      console.error('DataStore: Failed to save dataset info to localStorage:', e);
    }
    this.data = { ...mockDataModule };
    this.save();
    
    // Apply dataset-specific default settings if provided; dataset defaults win over stored
    if (defaultSettings) {
      // Merge: base defaults -> user's stored settings -> dataset defaults (so dataset is respected)
      this.settings = { ...this.getDefaultSettings(), ...this.settings, ...defaultSettings };
      try {
        localStorage.setItem(this.settingsKey, JSON.stringify(this.settings));
      } catch (e) {
        console.error('DataStore: Failed to save settings:', e);
      }
      this.notifyListeners();
    }
  }

  // ============================================
  // Core Data Operations
  // ============================================

  load() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all expected fields exist
        // This handles backward compatibility when new fields are added
        const defaults = this.getDefaultData();
        return { ...defaults, ...parsed };
      } catch (e) {
        console.error('Failed to parse stored data:', e);
      }
    }
    return this.getDefaultData();
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.error('DataStore: Failed to save data to localStorage:', e);
      // Storage quota exceeded or other error - continue with in-memory data
    }
    this.notifyListeners();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => {
      try {
        cb(this.data);
      } catch (e) {
        console.error('DataStore: Error in listener callback:', e);
      }
    });
  }

  generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ============================================
  // Generic CRUD Operations
  // ============================================

  /**
   * Generic create operation for any entity type
   * @param {string} collection - Name of the collection (e.g., 'missions', 'narratives')
   * @param {string} prefix - ID prefix (e.g., 'mission', 'narr')
   * @param {Object} data - Entity data
   * @param {Object} defaults - Default values to merge
   * @returns {string|null} The generated ID or null if creation failed
   */
  createEntity(collection, prefix, data, defaults = {}) {
    // Ensure collection exists
    if (!this.data[collection]) {
      console.warn(`DataStore: Collection '${collection}' does not exist, creating it`);
      this.data[collection] = [];
    }
    
    if (!Array.isArray(this.data[collection])) {
      console.error(`DataStore: Collection '${collection}' is not an array`);
      return null;
    }
    
    const id = this.generateId(prefix);
    try {
      this.data[collection].push({
        id,
        ...defaults,
        ...data,
        createdAt: new Date().toISOString()
      });
      this.save();
      return id;
    } catch (e) {
      console.error(`DataStore: Failed to create entity in '${collection}':`, e);
      return null;
    }
  }

  /**
   * Generic update operation for any entity type
   * @param {string} collection - Name of the collection
   * @param {string} id - Entity ID to update
   * @param {Object} updates - Fields to update
   * @returns {boolean} Whether the update was successful
   */
  updateEntity(collection, id, updates) {
    if (!this.data[collection] || !Array.isArray(this.data[collection])) {
      console.error(`DataStore: Collection '${collection}' does not exist or is not an array`);
      return false;
    }
    
    if (!id) {
      console.error('DataStore: updateEntity requires an id');
      return false;
    }
    
    const idx = this.data[collection].findIndex(item => item && item.id === id);
    if (idx !== -1) {
      try {
        this.data[collection][idx] = {
          ...this.data[collection][idx],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.save();
        return true;
      } catch (e) {
        console.error(`DataStore: Failed to update entity in '${collection}':`, e);
        return false;
      }
    }
    return false;
  }

  /**
   * Generic delete operation for any entity type
   * @param {string} collection - Name of the collection
   * @param {string} id - Entity ID to delete
   * @param {Function} cleanupFn - Optional cleanup function for related data
   * @returns {boolean} Whether the delete was successful
   */
  deleteEntity(collection, id, cleanupFn = null) {
    if (!this.data[collection] || !Array.isArray(this.data[collection])) {
      console.error(`DataStore: Collection '${collection}' does not exist or is not an array`);
      return false;
    }
    
    if (!id) {
      console.error('DataStore: deleteEntity requires an id');
      return false;
    }
    
    const initialLength = this.data[collection].length;
    this.data[collection] = this.data[collection].filter(item => item && item.id !== id);
    
    if (this.data[collection].length < initialLength) {
      if (cleanupFn) {
        try {
          cleanupFn(id);
        } catch (e) {
          console.error(`DataStore: Error in cleanup function for '${collection}':`, e);
        }
      }
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Generic find operation
   * @param {string} collection - Name of the collection
   * @param {string} id - Entity ID to find
   * @returns {Object|undefined} The found entity or undefined
   */
  findEntity(collection, id) {
    if (!this.data[collection] || !Array.isArray(this.data[collection])) {
      return undefined;
    }
    return this.data[collection].find(item => item && item.id === id);
  }

  /**
   * Remove an ID from an array field across all items in a collection
   * @param {string} collection - Name of the collection
   * @param {string} field - Array field name
   * @param {string} idToRemove - ID to remove from the arrays
   */
  removeIdFromArrayField(collection, field, idToRemove) {
    if (!this.data[collection] || !Array.isArray(this.data[collection])) {
      return;
    }
    this.data[collection].forEach(item => {
      if (item && item[field] && Array.isArray(item[field])) {
        item[field] = item[field].filter(id => id !== idToRemove);
      }
    });
  }

  /**
   * Remove a key from an object field across all items in a collection
   * @param {string} collection - Name of the collection
   * @param {string} field - Object field name
   * @param {string} keyToRemove - Key to remove from the objects
   */
  removeKeyFromObjectField(collection, field, keyToRemove) {
    if (!this.data[collection] || !Array.isArray(this.data[collection])) {
      return;
    }
    this.data[collection].forEach(item => {
      if (item && item[field] && typeof item[field] === 'object') {
        delete item[field][keyToRemove];
      }
    });
  }

  // ============================================
  // Mission CRUD
  // ============================================

  createMission(mission) {
    return this.createEntity('missions', 'mission', {
      name: mission.name,
      description: mission.description || '',
      color: mission.color || this.generateColor()
    });
  }

  updateMission(id, updates) {
    this.updateEntity('missions', id, updates);
  }

  deleteMission(id) {
    this.deleteEntity('missions', id, () => {
      // Remove mission reference from narratives
      this.data.narratives.forEach(n => {
        if (n.missionId === id) n.missionId = null;
      });
    });
  }

  // ============================================
  // Narrative CRUD
  // ============================================

  createNarrative(narrative) {
    const id = this.generateId('narr');
    this.data.narratives.push({
      id,
      text: narrative.text,
      missionId: narrative.missionId || null,
      sentiment: narrative.sentiment || 'neutral',
      themeIds: [],
      personIds: narrative.personIds || [],
      organizationIds: narrative.organizationIds || [],
      locationIds: narrative.locationIds || [],
      eventIds: narrative.eventIds || [],
      documentIds: narrative.documentIds || [],  // Source of truth for volume/factions
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  updateNarrative(id, updates) {
    const idx = this.data.narratives.findIndex(n => n.id === id);
    if (idx !== -1) {
      this.data.narratives[idx] = {
        ...this.data.narratives[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteNarrative(id) {
    // Remove associated themes
    this.data.themes = this.data.themes.filter(s => s.parentNarrativeId !== id);
    this.data.narratives = this.data.narratives.filter(n => n.id !== id);
    this.save();
  }

  // ============================================
  // Theme CRUD
  // ============================================

  createTheme(theme) {
    const id = this.generateId('sub');
    this.data.themes.push({
      id,
      text: theme.text,
      parentNarrativeId: theme.parentNarrativeId,
      sentiment: theme.sentiment || 'neutral',
      personIds: theme.personIds || [],
      organizationIds: theme.organizationIds || [],
      locationIds: theme.locationIds || [],
      eventIds: theme.eventIds || [],
      documentIds: theme.documentIds || [],  // Source of truth for volume/factions
      createdAt: new Date().toISOString()
    });

    // Link to parent narrative
    const parentIdx = this.data.narratives.findIndex(n => n.id === theme.parentNarrativeId);
    if (parentIdx !== -1) {
      this.data.narratives[parentIdx].themeIds.push(id);
    }

    this.save();
    return id;
  }

  updateTheme(id, updates) {
    const idx = this.data.themes.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.data.themes[idx] = {
        ...this.data.themes[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteTheme(id) {
    const sub = this.data.themes.find(s => s.id === id);
    if (sub) {
      // Remove from parent's list
      const parentIdx = this.data.narratives.findIndex(n => n.id === sub.parentNarrativeId);
      if (parentIdx !== -1) {
        this.data.narratives[parentIdx].themeIds =
          this.data.narratives[parentIdx].themeIds.filter(sid => sid !== id);
      }
    }
    this.data.themes = this.data.themes.filter(s => s.id !== id);
    this.save();
  }

  // ============================================
  // Faction CRUD
  // ============================================

  createFaction(faction) {
    return this.createEntity('factions', 'faction', {
      name: faction.name,
      color: faction.color || this.generateColor(),
      relatedFactionIds: faction.relatedFactionIds || [],
      memberCount: faction.memberCount || 0,
      affiliatedPersonIds: faction.affiliatedPersonIds || [],
      affiliatedOrganizationIds: faction.affiliatedOrganizationIds || []
    });
  }

  updateFaction(id, updates) {
    this.updateEntity('factions', id, updates);
  }

  deleteFaction(id) {
    this.deleteEntity('factions', id, () => {
      // Clean up references
      this.removeKeyFromObjectField('narratives', 'factionMentions', id);
      this.removeKeyFromObjectField('themes', 'factionMentions', id);
      this.data.factionOverlaps = this.data.factionOverlaps.filter(
        o => !o.factionIds.includes(id)
      );
      this.removeIdFromArrayField('persons', 'affiliatedFactionIds', id);
      this.removeKeyFromObjectField('persons', 'factionSentiment', id);
      this.removeIdFromArrayField('organizations', 'affiliatedFactionIds', id);
      this.removeKeyFromObjectField('organizations', 'factionSentiment', id);
    });
  }

  // ============================================
  // Location CRUD
  // ============================================

  createLocation(location) {
    return this.createEntity('locations', 'loc', {
      name: location.name,
      coordinates: location.coordinates || { lat: 0, lng: 0 },
      type: location.type || 'general'
    });
  }

  updateLocation(id, updates) {
    this.updateEntity('locations', id, updates);
  }

  deleteLocation(id) {
    this.deleteEntity('locations', id, () => {
      // Clean up references
      this.removeIdFromArrayField('narratives', 'locationIds', id);
      this.removeIdFromArrayField('themes', 'locationIds', id);
      this.data.events.forEach(e => {
        if (e.locationId === id) e.locationId = null;
      });
      this.removeIdFromArrayField('persons', 'relatedLocationIds', id);
      this.removeIdFromArrayField('organizations', 'relatedLocationIds', id);
    });
  }

  // ============================================
  // Event CRUD
  // ============================================

  createEvent(event) {
    const id = this.generateId('event');
    this.data.events.push({
      id,
      text: event.text,
      date: event.date || new Date().toISOString(),
      parentEventId: event.parentEventId || null,
      subEventIds: [],
      locationId: event.locationId || null,
      personIds: event.personIds || [],
      organizationIds: event.organizationIds || [],
      createdAt: new Date().toISOString()
    });

    // If this is a sub-event, link to parent
    if (event.parentEventId) {
      const parentIdx = this.data.events.findIndex(e => e.id === event.parentEventId);
      if (parentIdx !== -1) {
        this.data.events[parentIdx].subEventIds.push(id);
      }
    }

    this.save();
    return id;
  }

  updateEvent(id, updates) {
    const idx = this.data.events.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.data.events[idx] = {
        ...this.data.events[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteEvent(id) {
    const event = this.data.events.find(e => e.id === id);
    if (event) {
      // Remove from parent if sub-event
      if (event.parentEventId) {
        const parentIdx = this.data.events.findIndex(e => e.id === event.parentEventId);
        if (parentIdx !== -1) {
          this.data.events[parentIdx].subEventIds =
            this.data.events[parentIdx].subEventIds.filter(eid => eid !== id);
        }
      }
      // Also delete sub-events
      const subEventIds = event.subEventIds || [];
      this.data.events = this.data.events.filter(e => e.id !== id && !subEventIds.includes(e.id));
    }
    // Clean up references
    this.data.narratives.forEach(n => {
      n.eventIds = n.eventIds.filter(eid => eid !== id);
    });
    this.data.themes.forEach(s => {
      s.eventIds = s.eventIds.filter(eid => eid !== id);
    });
    this.data.persons.forEach(p => {
      p.relatedEventIds = (p.relatedEventIds || []).filter(eid => eid !== id);
    });
    this.save();
  }

  // ============================================
  // Person CRUD
  // ============================================

  createPerson(person) {
    return this.createEntity('persons', 'person', {
      name: person.name,
      type: person.type || 'general',
      imageUrl: person.imageUrl || null,
      affiliatedFactionIds: person.affiliatedFactionIds || [],
      relatedLocationIds: person.relatedLocationIds || [],
      relatedEventIds: person.relatedEventIds || [],
      factionSentiment: person.factionSentiment || {}
    });
  }

  updatePerson(id, updates) {
    this.updateEntity('persons', id, updates);
  }

  deletePerson(id) {
    this.deleteEntity('persons', id, () => {
      // Clean up references in narratives, themes, events, and factions
      this.removeIdFromArrayField('narratives', 'personIds', id);
      this.removeIdFromArrayField('themes', 'personIds', id);
      this.removeIdFromArrayField('events', 'personIds', id);
      this.removeIdFromArrayField('factions', 'affiliatedPersonIds', id);
    });
  }

  // ============================================
  // Organization CRUD
  // ============================================

  createOrganization(org) {
    return this.createEntity('organizations', 'org', {
      name: org.name,
      type: org.type || 'general',
      affiliatedFactionIds: org.affiliatedFactionIds || [],
      relatedLocationIds: org.relatedLocationIds || [],
      factionSentiment: org.factionSentiment || {}
    });
  }

  updateOrganization(id, updates) {
    this.updateEntity('organizations', id, updates);
  }

  deleteOrganization(id) {
    this.deleteEntity('organizations', id, () => {
      // Clean up references in narratives, themes, events, and factions
      this.removeIdFromArrayField('narratives', 'organizationIds', id);
      this.removeIdFromArrayField('themes', 'organizationIds', id);
      this.removeIdFromArrayField('events', 'organizationIds', id);
      this.removeIdFromArrayField('factions', 'affiliatedOrganizationIds', id);
    });
  }

  // ============================================
  // Topic CRUD
  // ============================================

  createTopic(topic) {
    return this.createEntity('topics', 'topic', {
      headline: topic.headline,
      bulletPoints: topic.bulletPoints || [],
      documentIds: topic.documentIds || [],
      startDate: topic.startDate || new Date().toISOString().split('T')[0],
      endDate: topic.endDate || null,
      volumeOverTime: topic.volumeOverTime || this.generateInitialTopicVolume()
    });
  }

  updateTopic(id, updates) {
    this.updateEntity('topics', id, updates);
  }

  deleteTopic(id) {
    this.deleteEntity('topics', id);
  }

  // ============================================
  // Monitor CRUD
  // ============================================

  createMonitor(monitor) {
    const scope = monitor.scope || {};
    
    return this.createEntity('monitors', 'monitor', {
      name: monitor.name,
      description: monitor.description || '',
      scope: scope.mode === 'advanced'
        ? {
            mode: 'advanced',
            booleanExpression: scope.booleanExpression,
            entityMap: scope.entityMap
          }
        : {
            mode: 'simple',
            personIds: scope.personIds || [],
            organizationIds: scope.organizationIds || [],
            factionIds: scope.factionIds || [],
            locationIds: scope.locationIds || [],
            eventIds: scope.eventIds || [],
            keywords: scope.keywords || [],
            logic: scope.logic || 'OR'
          },
      options: {
        includeSubEvents: monitor.options?.includeSubEvents ?? true,
        includeThemes: monitor.options?.includeThemes ?? true,
        includeRelatedEvents: monitor.options?.includeRelatedEvents ?? true
      },
      triggers: monitor.triggers || {
        newNarrative: true,
        newEvent: true,
        volumeSpike: { threshold: 500, timeWindow: '24h' },
        sentimentShift: { threshold: 0.15, direction: 'any' },
        factionEngagement: null
      },
      enabled: monitor.enabled ?? true,
      lastTriggered: null
    });
  }

  updateMonitor(id, updates) {
    return this.updateEntity('monitors', id, updates);
  }

  deleteMonitor(id) {
    return this.deleteEntity('monitors', id, () => {
      // Clean up related alerts when monitor is deleted
      if (this.data.alerts) {
        this.data.alerts = this.data.alerts.filter(a => a.monitorId !== id);
      }
    });
  }

  // ============================================
  // Workspace CRUD
  // ============================================

  createWorkspace(workspace) {
    return this.createEntity('workspaces', 'workspace', {
      name: workspace.name,
      query: workspace.query || '',
      description: workspace.description || '',
      documentIds: workspace.documentIds || [],
      filters: workspace.filters || {},
      status: workspace.status || 'active'
    });
  }

  updateWorkspace(id, updates) {
    return this.updateEntity('workspaces', id, updates);
  }

  deleteWorkspace(id) {
    return this.deleteEntity('workspaces', id);
  }

  // ============================================
  // Project CRUD
  // ============================================

  /**
   * Create a new project
   * @param {Object} project - Project data
   * @param {string} project.name - Project name (required)
   * @param {string} project.description - Project description
   * @param {string} project.parentProjectId - Parent project ID (optional, for nested projects)
   * @param {string[]} project.documentIds - Initial document IDs
   * @returns {string} The new project's ID
   */
  createProject(project) {
    const id = this.createEntity('projects', 'project', {
      name: project.name,
      description: project.description || '',
      parentProjectId: project.parentProjectId || null,
      subProjectIds: [],
      documentIds: project.documentIds || [],
      snippets: project.snippets || [],
      tagIds: project.tagIds || [],
      status: project.status || 'active'
    });

    // If this is a sub-project, link to parent
    if (project.parentProjectId) {
      const parentIdx = this.data.projects.findIndex(p => p.id === project.parentProjectId);
      if (parentIdx !== -1) {
        if (!this.data.projects[parentIdx].subProjectIds) {
          this.data.projects[parentIdx].subProjectIds = [];
        }
        this.data.projects[parentIdx].subProjectIds.push(id);
        this.data.projects[parentIdx].updatedAt = new Date().toISOString();
        this.save();
      }
    }

    return id;
  }

  /**
   * Update an existing project
   * @param {string} id - Project ID
   * @param {Object} updates - Fields to update
   * @returns {boolean} Success
   */
  updateProject(id, updates) {
    return this.updateEntity('projects', id, updates);
  }

  /**
   * Delete a project
   * Removes the project and optionally its sub-projects.
   * Sub-projects can be promoted to top-level or deleted with the parent.
   * @param {string} id - Project ID
   * @param {Object} options - Delete options
   * @param {boolean} options.deleteChildren - If true, delete all sub-projects recursively (default: false, promotes children)
   * @returns {boolean} Success
   */
  deleteProject(id, options = {}) {
    const { deleteChildren = false } = options;
    const project = this.data.projects?.find(p => p.id === id);
    
    if (!project) {
      return false;
    }

    // Remove from parent's subProjectIds if this is a sub-project
    if (project.parentProjectId) {
      const parentIdx = this.data.projects.findIndex(p => p.id === project.parentProjectId);
      if (parentIdx !== -1) {
        this.data.projects[parentIdx].subProjectIds = 
          (this.data.projects[parentIdx].subProjectIds || []).filter(pid => pid !== id);
        this.data.projects[parentIdx].updatedAt = new Date().toISOString();
      }
    }

    // Handle sub-projects
    const subProjectIds = project.subProjectIds || [];
    if (subProjectIds.length > 0) {
      if (deleteChildren) {
        // Recursively delete all sub-projects
        subProjectIds.forEach(subId => this.deleteProject(subId, { deleteChildren: true }));
      } else {
        // Promote sub-projects to same level as deleted project (or top-level)
        subProjectIds.forEach(subId => {
          const subProject = this.data.projects.find(p => p.id === subId);
          if (subProject) {
            subProject.parentProjectId = project.parentProjectId || null;
            subProject.updatedAt = new Date().toISOString();
            
            // If promoting to another parent, add to that parent's subProjectIds
            if (project.parentProjectId) {
              const newParentIdx = this.data.projects.findIndex(p => p.id === project.parentProjectId);
              if (newParentIdx !== -1) {
                if (!this.data.projects[newParentIdx].subProjectIds) {
                  this.data.projects[newParentIdx].subProjectIds = [];
                }
                this.data.projects[newParentIdx].subProjectIds.push(subId);
              }
            }
          }
        });
      }
    }

    // Delete the project itself
    return this.deleteEntity('projects', id);
  }

  /**
   * Add documents to a project (deduplicates)
   * @param {string} projectId - Project ID
   * @param {string[]} documentIds - Document IDs to add
   * @returns {Object} Result with added count and new total
   */
  addDocumentsToProject(projectId, documentIds) {
    const projects = this.data.projects || [];
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      console.error(`DataStore: Project ${projectId} not found`);
      return { success: false, added: 0, total: 0 };
    }
    
    const existingIds = new Set(project.documentIds || []);
    const initialCount = existingIds.size;
    
    documentIds.forEach(id => existingIds.add(id));
    
    project.documentIds = [...existingIds];
    project.updatedAt = new Date().toISOString();
    this.save();
    
    const addedCount = existingIds.size - initialCount;
    return { 
      success: true, 
      added: addedCount, 
      total: project.documentIds.length,
      alreadyExisted: documentIds.length - addedCount
    };
  }

  /**
   * Remove documents from a project
   * @param {string} projectId - Project ID
   * @param {string[]} documentIds - Document IDs to remove
   * @returns {Object} Result with removed count
   */
  removeDocumentsFromProject(projectId, documentIds) {
    const projects = this.data.projects || [];
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      console.error(`DataStore: Project ${projectId} not found`);
      return { success: false, removed: 0 };
    }
    
    const removeSet = new Set(documentIds);
    const initialCount = (project.documentIds || []).length;
    
    project.documentIds = (project.documentIds || []).filter(id => !removeSet.has(id));
    project.updatedAt = new Date().toISOString();
    this.save();
    
    return { 
      success: true, 
      removed: initialCount - project.documentIds.length,
      total: project.documentIds.length
    };
  }

  /**
   * Add a snippet to a project
   * @param {string} projectId - Project ID
   * @param {Object} snippet - Snippet data
   * @param {string} snippet.text - The selected text
   * @param {string} snippet.sourceType - Source type: 'document' | 'chat' | 'narrative' | 'activity' | 'table'
   * @param {string} snippet.sourceDocumentId - Optional source document ID
   * @param {string} snippet.sourceId - Optional source entity ID
   * @param {string} snippet.sourceLabel - Optional display label for non-document sources
   * @param {Object} snippet.sourceContext - Optional location context
   * @param {string} snippet.note - Optional user note
   * @returns {Object} Result with snippet ID
   */
  addSnippetToProject(projectId, snippet) {
    const projects = this.data.projects || [];
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      console.error(`DataStore: Project ${projectId} not found`);
      return { success: false, snippetId: null };
    }
    
    // Initialize snippets array if not present
    if (!project.snippets) {
      project.snippets = [];
    }
    
    // Generate snippet ID
    const snippetId = `snippet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newSnippet = {
      id: snippetId,
      text: snippet.text,
      sourceType: snippet.sourceType || 'document',
      sourceDocumentId: snippet.sourceDocumentId || null,
      sourceId: snippet.sourceId || null,
      sourceLabel: snippet.sourceLabel || null,
      sourceContext: snippet.sourceContext || null,
      note: snippet.note || '',
      createdAt: new Date().toISOString(),
      createdBy: snippet.createdBy || null
    };
    
    project.snippets.push(newSnippet);
    project.updatedAt = new Date().toISOString();
    this.save();
    
    return { 
      success: true, 
      snippetId: snippetId,
      total: project.snippets.length
    };
  }

  /**
   * Update a snippet in a project
   * @param {string} projectId - Project ID
   * @param {string} snippetId - Snippet ID
   * @param {Object} updates - Fields to update (note, etc.)
   * @returns {boolean} Success
   */
  updateSnippetInProject(projectId, snippetId, updates) {
    const projects = this.data.projects || [];
    const project = projects.find(p => p.id === projectId);
    
    if (!project || !project.snippets) {
      return false;
    }
    
    const snippet = project.snippets.find(s => s.id === snippetId);
    if (!snippet) {
      return false;
    }
    
    // Only allow updating note field
    if (updates.note !== undefined) {
      snippet.note = updates.note;
    }
    
    project.updatedAt = new Date().toISOString();
    this.save();
    return true;
  }

  /**
   * Remove a snippet from a project
   * @param {string} projectId - Project ID
   * @param {string} snippetId - Snippet ID to remove
   * @returns {Object} Result
   */
  removeSnippetFromProject(projectId, snippetId) {
    const projects = this.data.projects || [];
    const project = projects.find(p => p.id === projectId);
    
    if (!project || !project.snippets) {
      return { success: false, removed: 0 };
    }
    
    const initialCount = project.snippets.length;
    project.snippets = project.snippets.filter(s => s.id !== snippetId);
    project.updatedAt = new Date().toISOString();
    this.save();
    
    return { 
      success: true, 
      removed: initialCount - project.snippets.length,
      total: project.snippets.length
    };
  }

  /**
   * Get all snippets for a project
   * @param {string} projectId - Project ID
   * @returns {Array} Array of snippets
   */
  getSnippetsForProject(projectId) {
    const projects = this.data.projects || [];
    const project = projects.find(p => p.id === projectId);
    return project?.snippets || [];
  }

  // ============================================
  // Project Hierarchy & Movement
  // ============================================

  /**
   * Get the full ancestry chain for a project (parent, grandparent, etc.)
   * Returns array from root to immediate parent (not including the project itself)
   * @param {string} projectId - Project ID
   * @returns {Array} Array of ancestor projects, from root to immediate parent
   */
  getProjectAncestry(projectId) {
    const ancestry = [];
    let current = this.data.projects?.find(p => p.id === projectId);
    
    while (current && current.parentProjectId) {
      const parent = this.data.projects.find(p => p.id === current.parentProjectId);
      if (parent) {
        ancestry.unshift(parent); // Add to front so order is root -> immediate parent
        current = parent;
      } else {
        break;
      }
    }
    
    return ancestry;
  }

  /**
   * Check if a project is an ancestor of another project
   * Used to prevent circular references when moving projects
   * @param {string} potentialAncestorId - ID of potential ancestor
   * @param {string} projectId - ID of project to check ancestry for
   * @returns {boolean} True if potentialAncestorId is an ancestor of projectId
   */
  isProjectAncestor(potentialAncestorId, projectId) {
    const ancestry = this.getProjectAncestry(projectId);
    return ancestry.some(p => p.id === potentialAncestorId);
  }

  /**
   * Move a project under a new parent (or to top-level if newParentId is null)
   * @param {string} projectId - Project ID to move
   * @param {string|null} newParentId - New parent project ID, or null for top-level
   * @returns {Object} Result with success status
   */
  moveProjectToParent(projectId, newParentId) {
    const project = this.data.projects?.find(p => p.id === projectId);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }

    // Prevent moving to self
    if (newParentId === projectId) {
      return { success: false, error: 'Cannot move project into itself' };
    }

    // Prevent circular references - can't move a project into its own descendant
    if (newParentId) {
      const newParent = this.data.projects.find(p => p.id === newParentId);
      if (!newParent) {
        return { success: false, error: 'Target parent project not found' };
      }
      
      // Check if projectId is an ancestor of newParentId
      if (this.isProjectAncestor(projectId, newParentId) || projectId === newParentId) {
        return { success: false, error: 'Cannot move project into its own descendant' };
      }
    }

    // Remove from old parent's subProjectIds
    if (project.parentProjectId) {
      const oldParent = this.data.projects.find(p => p.id === project.parentProjectId);
      if (oldParent) {
        oldParent.subProjectIds = (oldParent.subProjectIds || []).filter(id => id !== projectId);
        oldParent.updatedAt = new Date().toISOString();
      }
    }

    // Add to new parent's subProjectIds
    if (newParentId) {
      const newParent = this.data.projects.find(p => p.id === newParentId);
      if (newParent) {
        if (!newParent.subProjectIds) {
          newParent.subProjectIds = [];
        }
        newParent.subProjectIds.push(projectId);
        newParent.updatedAt = new Date().toISOString();
      }
    }

    // Update project's parentProjectId
    project.parentProjectId = newParentId;
    project.updatedAt = new Date().toISOString();
    this.save();

    return { success: true };
  }

  /**
   * Move documents from one project to another
   * @param {string} sourceProjectId - Project to move documents from
   * @param {string} targetProjectId - Project to move documents to
   * @param {string[]} documentIds - Document IDs to move
   * @returns {Object} Result with counts
   */
  moveDocumentsBetweenProjects(sourceProjectId, targetProjectId, documentIds) {
    const source = this.data.projects?.find(p => p.id === sourceProjectId);
    const target = this.data.projects?.find(p => p.id === targetProjectId);

    if (!source) {
      return { success: false, error: 'Source project not found', moved: 0 };
    }
    if (!target) {
      return { success: false, error: 'Target project not found', moved: 0 };
    }
    if (sourceProjectId === targetProjectId) {
      return { success: false, error: 'Source and target are the same project', moved: 0 };
    }

    const sourceSet = new Set(source.documentIds || []);
    const targetSet = new Set(target.documentIds || []);
    let moved = 0;

    documentIds.forEach(docId => {
      if (sourceSet.has(docId)) {
        sourceSet.delete(docId);
        targetSet.add(docId);
        moved++;
      }
    });

    if (moved > 0) {
      source.documentIds = [...sourceSet];
      target.documentIds = [...targetSet];
      source.updatedAt = target.updatedAt = new Date().toISOString();
      this.save();
    }

    return {
      success: true,
      moved,
      sourceTotal: source.documentIds.length,
      targetTotal: target.documentIds.length
    };
  }

  /**
   * Copy documents from one project to another (keeps in source, adds to target)
   * @param {string} sourceProjectId - Project to copy documents from
   * @param {string} targetProjectId - Project to copy documents to
   * @param {string[]} documentIds - Document IDs to copy
   * @returns {Object} Result with counts
   */
  copyDocumentsBetweenProjects(sourceProjectId, targetProjectId, documentIds) {
    const source = this.data.projects?.find(p => p.id === sourceProjectId);
    const target = this.data.projects?.find(p => p.id === targetProjectId);

    if (!source) {
      return { success: false, error: 'Source project not found', copied: 0 };
    }
    if (!target) {
      return { success: false, error: 'Target project not found', copied: 0 };
    }

    const sourceSet = new Set(source.documentIds || []);
    const targetSet = new Set(target.documentIds || []);
    const initialTargetSize = targetSet.size;

    documentIds.forEach(docId => {
      if (sourceSet.has(docId)) {
        targetSet.add(docId);
      }
    });

    const copied = targetSet.size - initialTargetSize;

    if (copied > 0) {
      target.documentIds = [...targetSet];
      target.updatedAt = new Date().toISOString();
      this.save();
    }

    return {
      success: true,
      copied,
      alreadyExisted: documentIds.length - copied,
      targetTotal: target.documentIds.length
    };
  }

  /**
   * Move snippets from one project to another
   * @param {string} sourceProjectId - Project to move snippets from
   * @param {string} targetProjectId - Project to move snippets to
   * @param {string[]} snippetIds - Snippet IDs to move
   * @returns {Object} Result with counts
   */
  moveSnippetsBetweenProjects(sourceProjectId, targetProjectId, snippetIds) {
    const source = this.data.projects?.find(p => p.id === sourceProjectId);
    const target = this.data.projects?.find(p => p.id === targetProjectId);

    if (!source) {
      return { success: false, error: 'Source project not found', moved: 0 };
    }
    if (!target) {
      return { success: false, error: 'Target project not found', moved: 0 };
    }
    if (sourceProjectId === targetProjectId) {
      return { success: false, error: 'Source and target are the same project', moved: 0 };
    }

    const snippetIdSet = new Set(snippetIds);
    const snippetsToMove = (source.snippets || []).filter(s => snippetIdSet.has(s.id));
    
    if (snippetsToMove.length === 0) {
      return { success: true, moved: 0, sourceTotal: (source.snippets || []).length, targetTotal: (target.snippets || []).length };
    }

    // Remove from source
    source.snippets = (source.snippets || []).filter(s => !snippetIdSet.has(s.id));
    
    // Add to target
    if (!target.snippets) {
      target.snippets = [];
    }
    target.snippets.push(...snippetsToMove);

    source.updatedAt = target.updatedAt = new Date().toISOString();
    this.save();

    return {
      success: true,
      moved: snippetsToMove.length,
      sourceTotal: source.snippets.length,
      targetTotal: target.snippets.length
    };
  }

  /**
   * Copy snippets from one project to another (keeps in source, adds to target with new IDs)
   * @param {string} sourceProjectId - Project to copy snippets from
   * @param {string} targetProjectId - Project to copy snippets to
   * @param {string[]} snippetIds - Snippet IDs to copy
   * @returns {Object} Result with counts
   */
  copySnippetsBetweenProjects(sourceProjectId, targetProjectId, snippetIds) {
    const source = this.data.projects?.find(p => p.id === sourceProjectId);
    const target = this.data.projects?.find(p => p.id === targetProjectId);

    if (!source) {
      return { success: false, error: 'Source project not found', copied: 0 };
    }
    if (!target) {
      return { success: false, error: 'Target project not found', copied: 0 };
    }

    const snippetIdSet = new Set(snippetIds);
    const snippetsToCopy = (source.snippets || []).filter(s => snippetIdSet.has(s.id));
    
    if (snippetsToCopy.length === 0) {
      return { success: true, copied: 0, targetTotal: (target.snippets || []).length };
    }

    // Create copies with new IDs
    const copiedSnippets = snippetsToCopy.map(snippet => ({
      ...snippet,
      id: `snippet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }));

    // Add to target
    if (!target.snippets) {
      target.snippets = [];
    }
    target.snippets.push(...copiedSnippets);

    target.updatedAt = new Date().toISOString();
    this.save();

    return {
      success: true,
      copied: copiedSnippets.length,
      targetTotal: target.snippets.length
    };
  }

  // ============================================
  // SearchFilter CRUD
  // ============================================

  createSearchFilter(filter) {
    const scope = filter.scope || {};
    
    return this.createEntity('searchFilters', 'filter', {
      name: filter.name,
      description: filter.description || '',
      scope: scope.mode === 'advanced' 
        ? {
            mode: 'advanced',
            booleanExpression: scope.booleanExpression,
            entityMap: scope.entityMap
          }
        : {
            mode: 'simple',
            personIds: scope.personIds || [],
            organizationIds: scope.organizationIds || [],
            factionIds: scope.factionIds || [],
            locationIds: scope.locationIds || [],
            eventIds: scope.eventIds || [],
            keywords: scope.keywords || []
          }
    });
  }

  updateSearchFilter(id, updates) {
    return this.updateEntity('searchFilters', id, updates);
  }

  deleteSearchFilter(id) {
    return this.deleteEntity('searchFilters', id);
  }

  // ============================================
  // TagGroup CRUD
  // ============================================

  createTagGroup(tagGroup) {
    return this.createEntity('tagGroups', 'tag-group', {
      name: tagGroup.name,
      description: tagGroup.description || '',
      exclusive: tagGroup.exclusive || false,
      color: tagGroup.color || this.generateColor(),
      sortOrder: tagGroup.sortOrder ?? 0
    });
  }

  updateTagGroup(id, updates) {
    return this.updateEntity('tagGroups', id, updates);
  }

  deleteTagGroup(id) {
    return this.deleteEntity('tagGroups', id, () => {
      // Remove groupId from all tags in this group (make them ungrouped)
      if (this.data.tags) {
        this.data.tags.forEach(tag => {
          if (tag.groupId === id) {
            tag.groupId = null;
            tag.updatedAt = new Date().toISOString();
          }
        });
      }
    });
  }

  // ============================================
  // Tag CRUD
  // ============================================

  createTag(tag) {
    return this.createEntity('tags', 'tag', {
      name: tag.name,
      groupId: tag.groupId || null,
      color: tag.color || this.generateColor(),
      description: tag.description || '',
      sortOrder: tag.sortOrder ?? 0
    });
  }

  updateTag(id, updates) {
    return this.updateEntity('tags', id, updates);
  }

  deleteTag(id) {
    return this.deleteEntity('tags', id, () => {
      // Remove tag from all entity types that can have tags
      const collectionsWithTags = [
        'narratives', 'themes', 'factions', 'locations', 'events',
        'persons', 'organizations', 'documents', 'topics', 'monitors'
      ];
      collectionsWithTags.forEach(collection => {
        this.removeIdFromArrayField(collection, 'tagIds', id);
      });
    });
  }

  /**
   * Add a tag to an entity
   * @param {string} collection - Collection name (e.g., 'narratives', 'persons')
   * @param {string} entityId - The entity ID
   * @param {string} tagId - The tag ID to add
   * @returns {boolean} Whether the operation succeeded
   */
  addTagToEntity(collection, entityId, tagId) {
    const entity = this.findEntity(collection, entityId);
    if (!entity) return false;
    
    const tagIds = entity.tagIds || [];
    if (!tagIds.includes(tagId)) {
      tagIds.push(tagId);
      return this.updateEntity(collection, entityId, { tagIds });
    }
    return true; // Already has tag
  }

  /**
   * Remove a tag from an entity
   * @param {string} collection - Collection name
   * @param {string} entityId - The entity ID
   * @param {string} tagId - The tag ID to remove
   * @returns {boolean} Whether the operation succeeded
   */
  removeTagFromEntity(collection, entityId, tagId) {
    const entity = this.findEntity(collection, entityId);
    if (!entity) return false;
    
    const tagIds = (entity.tagIds || []).filter(id => id !== tagId);
    return this.updateEntity(collection, entityId, { tagIds });
  }

  generateInitialTopicVolume() {
    const days = 7;
    const data = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        volume: 0
      });
    }
    return data;
  }

  // ============================================
  // Faction Overlaps
  // ============================================

  createFactionOverlap(overlap) {
    this.data.factionOverlaps.push({
      factionIds: overlap.factionIds,
      overlapSize: overlap.overlapSize || 0,
      sharedSentiment: overlap.sharedSentiment || {}
    });
    this.save();
  }

  updateFactionOverlap(factionIds, updates) {
    const idx = this.data.factionOverlaps.findIndex(o =>
      o.factionIds.length === factionIds.length &&
      o.factionIds.every(id => factionIds.includes(id))
    );
    if (idx !== -1) {
      this.data.factionOverlaps[idx] = {
        ...this.data.factionOverlaps[idx],
        ...updates
      };
      this.save();
    }
  }

  deleteFactionOverlap(factionIds) {
    this.data.factionOverlaps = this.data.factionOverlaps.filter(o =>
      !(o.factionIds.length === factionIds.length &&
        o.factionIds.every(id => factionIds.includes(id)))
    );
    this.save();
  }

  // ============================================
  // Document CRUD
  // ============================================

  createDocument(doc) {
    const id = this.generateId('doc');
    this.data.documents = this.data.documents || [];
    this.data.documents.push({
      id,
      type: doc.type || 'social_post',
      publisherId: doc.publisherId || '',
      content: doc.content || '',
      sentiment: doc.sentiment || 'neutral',
      narrativeIds: doc.narrativeIds || [],
      factionId: doc.factionId || null,
      date: doc.date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  // ============================================
  // Repository CRUD
  // ============================================

  createRepository(repo) {
    const id = repo.id || this.generateId('repo');
    this.data.repositories = this.data.repositories || [];
    this.data.repositories.push({
      id,
      code: repo.code || '',
      name: repo.name || '',
      description: repo.description || '',
      color: repo.color || this.generateColor(),
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  updateRepository(id, updates) {
    return this.updateEntity('repositories', id, updates);
  }

  deleteRepository(id) {
    return this.deleteEntity('repositories', id);
  }

  // ============================================
  // Helpers
  // ============================================

  // generateInitialVolume removed - volume is now computed from documents

  generateColor() {
    // Cohesive data visualization palette - optimized for charts and stacked areas
    const colors = [
      '#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F',
      '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC',
      '#5B8FA8', '#FFAB5E', '#D4A5A5', '#8CD17D', '#A0CBE8',
      '#F1CE63', '#D37295', '#86BCB6', '#B6992D', '#6B8E8E'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Reset to default data
  reset() {
    this.data = this.getDefaultData();
    this.save();
  }

  // Export data as JSON
  export() {
    return JSON.stringify(this.data, null, 2);
  }

  // Import data from JSON
  import(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      this.data = data;
      this.save();
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }

  // ============================================
  // Default Data
  // ============================================

  getDefaultData() {
    return {
      missions: [],
      narratives: [],
      themes: [],
      factions: [],
      factionOverlaps: [],
      locations: [],
      events: [],
      persons: [],
      organizations: [],
      documents: [],
      topics: [],
      publishers: [],
      publisherCategories: [],
      repositories: [],
      monitors: [],
      alerts: [],
      users: [],
      workspaces: [],
      projects: [],
      searchFilters: [],
      tagGroups: [],
      tags: []
    };
  }
}

// Export singleton instance
export const dataStore = new DataStore();
export default DataStore;
