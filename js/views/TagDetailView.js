/**
 * TagDetailView.js
 * View for displaying all entities with a specific tag
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { getEntityIcon } from '../utils/entityIcons.js';
import { getEntityCardModal } from '../components/EntityCardModal.js';

export class TagDetailView extends BaseView {
  constructor(container, tagId, options = {}) {
    super(container, options);
    this.tagId = tagId;
  }

  async render() {
    const tag = DataService.getTag(this.tagId);
    if (!tag) {
      this.renderNotFound('Tag');
      return;
    }

    const entities = DataService.getEntitiesByTag(this.tagId);
    const counts = DataService.getTagCountsByEntityType(this.tagId);
    const totalCount = Object.values(counts).reduce((sum, c) => sum + c, 0);

    // Build sections for each entity type that has entities
    const sections = [];
    
    if (entities.narratives.length > 0) {
      sections.push(this.renderSection('Narratives', entities.narratives, 'narrative', (n) => ({
        title: n.text,
        href: `#/narrative/${n.id}`,
        subtitle: n.description
      })));
    }
    
    if (entities.themes.length > 0) {
      sections.push(this.renderSection('Themes', entities.themes, 'theme', (t) => ({
        title: t.text,
        href: `#/theme/${t.id}`,
        subtitle: t.description
      })));
    }
    
    if (entities.persons.length > 0) {
      sections.push(this.renderSection('People', entities.persons, 'person', (p) => ({
        title: p.name,
        href: `#/person/${p.id}`,
        subtitle: p.type || 'Person',
        imageUrl: p.imageUrl
      })));
    }
    
    if (entities.organizations.length > 0) {
      sections.push(this.renderSection('Organizations', entities.organizations, 'organization', (o) => ({
        title: o.name,
        href: `#/organization/${o.id}`,
        subtitle: o.type || 'Organization',
        imageUrl: o.imageUrl
      })));
    }
    
    if (entities.events.length > 0) {
      sections.push(this.renderSection('Events', entities.events, 'event', (e) => ({
        title: e.text,
        href: `#/event/${e.id}`,
        subtitle: e.date ? this.formatDate(e.date) : ''
      })));
    }
    
    if (entities.locations.length > 0) {
      sections.push(this.renderSection('Locations', entities.locations, 'location', (l) => ({
        title: l.name,
        href: `#/location/${l.id}`,
        subtitle: l.type || 'Location'
      })));
    }
    
    if (entities.factions.length > 0) {
      sections.push(this.renderSection('Factions', entities.factions, 'faction', (f) => ({
        title: f.name,
        href: `#/faction/${f.id}`,
        subtitle: f.description,
        color: f.color
      })));
    }
    
    if (entities.documents.length > 0) {
      sections.push(this.renderSection('Documents', entities.documents.slice(0, 20), 'document', (d) => ({
        title: d.title || 'Untitled Document',
        href: `#/documents?doc=${d.id}`,
        subtitle: d.publishedDate ? this.formatDate(d.publishedDate) : ''
      }), entities.documents.length > 20 ? `+${entities.documents.length - 20} more` : null));
    }
    
    if (entities.topics.length > 0) {
      sections.push(this.renderSection('Topics', entities.topics, 'topic', (t) => ({
        title: t.headline,
        href: `#/topic/${t.id}`,
        subtitle: t.description
      })));
    }
    
    if (entities.monitors.length > 0) {
      sections.push(this.renderSection('Monitors', entities.monitors, 'monitor', (m) => ({
        title: m.name,
        href: `#/${m.id}/`,
        subtitle: m.description
      })));
    }

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'COP', href: '#/cop/' },
        { label: 'Tags', href: '#/tags' },
        tag.name
      ],
      title: tag.name,
      icon: `<span style="display: inline-block; width: 16px; height: 16px; background: ${tag.color}; border-radius: 3px;"></span>`,
      subtitle: `${totalCount} ${totalCount === 1 ? 'entity' : 'entities'}`,
      description: tag.description
    });

    this.container.innerHTML = `
      ${headerHtml}
      <div class="content-area">
        ${sections.length === 0 ? `
          <div class="card">
            <div class="card-body">
              <div class="empty-state">
                <p>No entities have this tag yet.</p>
              </div>
            </div>
          </div>
        ` : sections.join('')}
      </div>
    `;
    
    // Attach hover handlers for entity card popovers
    this.attachEntityHoverHandlers();
  }

  /**
   * Render a section of entities using entity-list pattern
   */
  renderSection(title, items, entityType, mapFn, moreText = null) {
    const icon = getEntityIcon(entityType, 16);
    const listItems = items.map(item => {
      const mapped = mapFn(item);
      return `
        <li class="entity-list-item" data-id="${item.id}" data-type="${entityType}">
          <a href="${mapped.href}" class="entity-list-link">
            <div class="entity-avatar ${entityType}" ${mapped.color ? `style="background: ${mapped.color}20; color: ${mapped.color};"` : ''}>
              ${mapped.imageUrl ? `
                <img src="${mapped.imageUrl}" class="entity-img" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                <span class="entity-icon-fallback" style="display:none;">${icon}</span>
              ` : icon}
            </div>
            <div class="entity-info">
              <div class="entity-name">${this.escapeHtml(mapped.title)}</div>
              ${mapped.subtitle ? `<div class="entity-meta"><span class="entity-subtitle">${this.escapeHtml(mapped.subtitle)}</span></div>` : ''}
            </div>
          </a>
        </li>
      `;
    }).join('');

    return `
      <div class="card" style="margin-bottom: var(--space-lg);">
        <div class="card-header">
          <span class="card-title">${title}</span>
          <span class="badge">${items.length}</span>
        </div>
        <div class="card-body no-padding">
          <ul class="entity-list">
            ${listItems}
          </ul>
          ${moreText ? `<div class="entity-list-more">${moreText}</div>` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Format date for display
   */
  formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  }

  /**
   * Attach hover handlers to entity list items for popover cards
   */
  attachEntityHoverHandlers() {
    // Entity types that support hover cards
    const hoverTypes = ['person', 'organization', 'faction', 'location'];
    
    this.container.querySelectorAll('.entity-list-item').forEach(item => {
      const entityType = item.dataset.type;
      const entityId = item.dataset.id;
      
      if (hoverTypes.includes(entityType)) {
        item.addEventListener('mouseenter', () => {
          getEntityCardModal().show(entityId, entityType, item);
        });
        
        item.addEventListener('mouseleave', () => {
          getEntityCardModal().scheduleHide();
        });
      }
    });
  }
}

export default TagDetailView;
