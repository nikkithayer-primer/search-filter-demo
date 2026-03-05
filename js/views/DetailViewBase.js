/**
 * DetailViewBase.js
 * Base class for detail views (entity, narrative, topic, etc.)
 * Provides shared functionality for views that display entity details with cards
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { initAllCardToggles } from '../utils/cardWidthToggle.js';
import { TagChips } from '../components/TagChips.js';
import { getTagPicker } from '../components/TagPickerModal.js';
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
    this.tagChips = null;
  }

  /**
   * Initialize tag chips component for an entity
   * @param {Object} entity - The entity object (must have id property)
   * @param {string} entityType - The entity type (e.g., 'narrative', 'person')
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
   * @param {string} prefix - Prefix for the card ID (e.g., 'narrative', 'person')
   */
  setupDocumentsCard(entity, data, prefix) {
    // Reset card manager for fresh setup
    this.cardManager = new CardManager(this);

    if (data.documents && data.documents.length > 0) {
      this.cardManager.add(new DocumentTableCard(this, `${prefix}-documents`, {
        title: 'documents',
        documents: data.documents,
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
   * Get volume data for a set of documents
   * @param {Array} documents - Array of document objects
   * @returns {Object} Object with volumeData, publisherData, and flags
   */
  getVolumeDataForDocuments(documents) {
    const docIds = documents.map(d => d.id);
    const volumeResult = DataService.getVolumeDataForDocuments(docIds);
    
    return {
      volumeData: null,
      publisherData: volumeResult.byPublisher,
      hasVolumeData: false,
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
   * Clean up resources on view destruction
   */
  destroy() {
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
