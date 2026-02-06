/**
 * DetailViewBase.js
 * Base class for detail views (entity, narrative, faction, topic, etc.)
 * Provides shared functionality for views that display entity details with cards
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';
import { TagChips } from '../components/TagChips.js';
import { getTagPicker } from '../components/TagPickerModal.js';
import { StatCards } from '../components/StatCards.js';
import {
  CardManager,
  DocumentTableCard
} from '../components/CardComponents.js';

export class DetailViewBase extends BaseView {
  /**
   * @param {HTMLElement|string} container - Container element or ID
   * @param {Object} options - View options
   */
  constructor(container, options = {}) {
    super(container, options);
    this.cardManager = new CardManager(this);
    this._statDropdowns = null;
    this.tagChips = null;
  }

  /**
   * Initialize tag chips component for an entity
   * @param {Object} entity - The entity object (must have id property)
   * @param {string} entityType - The entity type (e.g., 'narrative', 'faction', 'person')
   * @param {string} containerId - The DOM container ID for the tag chips (default: `${entityType}-tags-container`)
   */
  initTagChips(entity, entityType, containerId = null) {
    const tagContainerId = containerId || `${entityType}-tags-container`;
    const tagsContainer = this.container.querySelector(`#${tagContainerId}`);
    
    if (tagsContainer) {
      this.tagChips = new TagChips({
        entityType: entityType,
        entityId: entity.id,
        editable: true,
        onAddClick: () => {
          const picker = getTagPicker();
          picker.open(entityType, entity.id, () => {
            this.tagChips.refresh();
          });
        }
      });
      this.tagChips.render(tagsContainer);
    }
  }

  /**
   * Set up card for Documents tab (full-width document table)
   * @param {Object} entity - The entity object
   * @param {Object} data - The fetched data containing documents array
   * @param {string} prefix - Prefix for the card ID (e.g., 'narrative', 'faction')
   */
  setupDocumentsCard(entity, data, prefix) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    if (data.documents && data.documents.length > 0) {
      this.cardManager.add(new DocumentTableCard(this, `${prefix}-documents`, {
        title: 'Source Documents',
        documents: data.documents,
        showCount: true,
        fullWidth: true,
        maxItems: 50,
        enableViewerMode: true
      }));
    }
  }

  /**
   * Initialize card width toggles for the content grid
   * @param {string} entityType - The entity type for storage key
   * @param {string} entityId - The entity ID for storage key
   * @param {Object} defaults - Optional default width settings by card index
   */
  initCardWidthToggles(entityType, entityId, defaults = {}) {
    const contentGrid = this.container.querySelector('.content-grid');
    if (contentGrid) {
      const tabSuffix = this.isDocumentsTab() ? '-docs' : '';
      initAllCardToggles(contentGrid, `${entityType}-${entityId}${tabSuffix}`, defaults);
    }
  }

  /**
   * Initialize stat card dropdowns
   * @param {string|null} contextId - The parent context ID for the dropdowns
   * @param {string|null} currentEntityId - The current entity ID being viewed (for documents tab route)
   * @returns {Array} Array of dropdown instances
   */
  initStatDropdowns(contextId = null, currentEntityId = null) {
    const ctxId = contextId ?? this.context?.id ?? null;
    this._statDropdowns = StatCards.initDropdowns(this.container, { 
      contextId: ctxId,
      currentEntityId: currentEntityId
    });
    return this._statDropdowns;
  }

  /**
   * Get activity (comments and highlights) for a set of documents
   * @param {Array} documents - Array of document objects with id property
   * @returns {Array} Filtered activity items
   */
  fetchActivityForDocuments(documents) {
    if (!documents || documents.length === 0) {
      return [];
    }
    const docIds = new Set(documents.map(d => d.id));
    const allActivity = DataService.getAllActivity();
    return allActivity.filter(item => docIds.has(item.documentId));
  }

  /**
   * Calculate faction sentiment from documents
   * @param {Array} documents - Array of document objects
   * @returns {Object} Object with factions array and factionOverlaps array
   */
  calculateFactionMentions(documents) {
    const factionMentionMap = new Map();
    
    documents.forEach(doc => {
      if (!doc.factionMentions) return;
      Object.entries(doc.factionMentions).forEach(([factionId, mentions]) => {
        if (!factionMentionMap.has(factionId)) {
          factionMentionMap.set(factionId, { volume: 0, sentiment: 0, count: 0 });
        }
        const entry = factionMentionMap.get(factionId);
        entry.volume += mentions.volume || 1;
        entry.sentiment += mentions.sentiment || 0;
        entry.count += 1;
      });
    });

    const factions = [...factionMentionMap.entries()].map(([factionId, stats]) => {
      const faction = DataService.getFaction(factionId);
      if (!faction) return null;
      return {
        ...faction,
        volume: stats.volume,
        sentiment: stats.count > 0 ? stats.sentiment / stats.count : 0
      };
    }).filter(Boolean);

    // Get overlaps for these factions
    const factionIds = factions.map(f => f.id);
    const factionOverlaps = (DataService.getFactionOverlaps ? DataService.getFactionOverlaps() : [])
      .filter(o => o.factionIds.some(fid => factionIds.includes(fid)));

    return { factions, factionOverlaps };
  }

  /**
   * Get volume data for a set of documents
   * @param {Array} documents - Array of document objects
   * @returns {Object} Object with volumeData, publisherData, and flags
   */
  getVolumeDataForDocuments(documents) {
    const docIds = documents.map(d => d.id);
    const volumeResult = DataService.getVolumeDataForDocuments(docIds);
    
    return {
      volumeData: volumeResult.byFaction,
      publisherData: volumeResult.byPublisher,
      hasVolumeData: volumeResult.byFaction && volumeResult.byFaction.dates.length > 0,
      hasPublisherData: volumeResult.byPublisher && volumeResult.byPublisher.dates.length > 0
    };
  }

  /**
   * Get topics related to a set of documents
   * @param {Array} documents - Array of document objects
   * @param {Array|null} scopeDocIds - Optional scope document IDs
   * @returns {Array} Array of related topics
   */
  getRelatedTopics(documents, scopeDocIds = null) {
    const entityDocIds = new Set(documents.map(d => d.id));
    const allTopics = DataService.getTopics ? DataService.getTopics(scopeDocIds) : [];
    return allTopics.filter(topic =>
      (topic.documentIds || []).some(dId => entityDocIds.has(dId))
    );
  }

  /**
   * Clean up stat dropdowns
   */
  cleanupStatDropdowns() {
    if (this._statDropdowns) {
      this._statDropdowns.forEach(d => d.destroy && d.destroy());
      this._statDropdowns = null;
    }
  }

  /**
   * Clean up resources on view destruction
   */
  destroy() {
    // Clean up stat dropdowns
    this.cleanupStatDropdowns();
    
    // Clean up tag chips
    if (this.tagChips) {
      this.tagChips = null;
    }
    
    // Clean up card manager
    if (this.cardManager) {
      this.cardManager.destroyAll();
    }
    
    super.destroy();
  }
}

export default DetailViewBase;
