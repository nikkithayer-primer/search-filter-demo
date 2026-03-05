/**
 * ScopeChips.js
 * Shared component for rendering selected scope items as removable chips.
 * Used by SearchView and WorkspaceView to display active filter selections.
 */

import { DataService } from '../data/DataService.js';
import { escapeHtml } from '../utils/htmlUtils.js';
import { getEntityIcon, getExtractionIcon, getExtractionColorClass } from '../utils/entityIcons.js';
import { DOC_TYPE_LABELS } from '../utils/scopeUtils.js';

const ICON_SIZE = 12;

const REMOVE_ICON = `<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l8 8M12 4l-8 8"/></svg>`;

/**
 * Build an array of chip data objects from a scope.
 * @param {Object} scope
 * @returns {Array<Object>}
 */
export function buildScopeChipData(scope) {
  if (!scope) return [];
  const chips = [];

  if (scope.personIds?.length > 0) {
    for (const id of scope.personIds) {
      const person = DataService.getPerson(id);
      if (person) {
        chips.push({ type: 'person', id, label: person.name, tooltip: 'Person' });
      }
    }
  }

  if (scope.organizationIds?.length > 0) {
    for (const id of scope.organizationIds) {
      const org = DataService.getOrganization(id);
      if (org) {
        chips.push({ type: 'organization', id, label: org.name, tooltip: 'Organization' });
      }
    }
  }

  if (scope.locationIds?.length > 0) {
    for (const id of scope.locationIds) {
      const loc = DataService.getLocation(id);
      if (loc) {
        chips.push({ type: 'location', id, label: loc.name, tooltip: 'Location' });
      }
    }
  }

  if (scope.keywords?.length > 0) {
    for (const keyword of scope.keywords) {
      chips.push({ type: 'keyword', id: keyword, label: keyword, tooltip: 'Keyword' });
    }
  }

  if (scope.documentTypes?.length > 0) {
    for (const docType of scope.documentTypes) {
      chips.push({
        type: 'documentType', id: docType,
        label: DOC_TYPE_LABELS[docType] || docType,
        tooltip: 'Document Type'
      });
    }
  }

  if (scope.publisherIds?.length > 0) {
    for (const publisherId of scope.publisherIds) {
      const publisher = DataService.getPublisher(publisherId);
      if (publisher) {
        chips.push({ type: 'publisher', id: publisherId, label: publisher.name, tooltip: 'Publisher' });
      }
    }
  }

  if (scope.authors?.length > 0) {
    for (const author of scope.authors) {
      chips.push({ type: 'author', id: author, label: author, tooltip: 'Author' });
    }
  }

  const catalog = DataService.getFilterCatalog();
  for (const [dimId, filterVal] of Object.entries(scope.metadataFilters || {})) {
    const dimension = catalog.find(d => d.id === dimId);
    const dimName = dimension?.name || dimId;
    const isExtraction = dimName.toLowerCase().startsWith('extracted');
    const include = Array.isArray(filterVal) ? filterVal : (filterVal?.include || []);
    const exclude = Array.isArray(filterVal) ? [] : (filterVal?.exclude || []);

    for (const val of include) {
      chips.push({
        type: 'metadata', id: `${dimId}::${val}`, label: val,
        tooltip: dimName, mode: 'include', isExtraction,
        icon: isExtraction ? getExtractionIcon(dimName, ICON_SIZE) : null,
        extractionClasses: isExtraction ? `extraction-chip extraction-chip--ghost ${getExtractionColorClass(dimName)}` : ''
      });
    }
    for (const val of exclude) {
      chips.push({
        type: 'metadata', id: `${dimId}::${val}`, label: val,
        tooltip: `Exclude: ${dimName}`, mode: 'exclude', isExtraction,
        icon: isExtraction ? getExtractionIcon(dimName, ICON_SIZE) : null,
        extractionClasses: isExtraction ? `extraction-chip extraction-chip--ghost ${getExtractionColorClass(dimName)}` : ''
      });
    }
  }

  return chips;
}

/**
 * Render selected scope chips as an HTML string.
 * Returns empty string when the scope has no active items.
 * @param {Object} scope
 * @returns {string} HTML
 */
export function renderScopeChips(scope) {
  const chips = buildScopeChipData(scope);
  if (chips.length === 0) return '';

  const chipHtml = chips.map(chip => {
    const icon = chip.icon || getEntityIcon(chip.type, ICON_SIZE);
    const excludedClass = chip.mode === 'exclude' ? ' scope-chip-excluded' : '';
    const extraClasses = chip.extractionClasses ? ` ${chip.extractionClasses}` : '';
    const tooltipAttr = chip.tooltip ? ` data-tooltip="${escapeHtml(chip.tooltip)}"` : '';

    return `
      <span class="scope-chip scope-chip-${chip.type}${excludedClass}${extraClasses}" data-type="${chip.type}" data-id="${escapeHtml(chip.id)}"${tooltipAttr}>
        ${chip.isExtraction ? `<span class="extraction-chip-icon">${icon}</span>` : icon}
        <span class="chip-label${chip.isExtraction ? ' extraction-chip-label' : ''}">${escapeHtml(chip.label)}</span>
        <button class="chip-remove" data-type="${chip.type}" data-id="${escapeHtml(chip.id)}" title="Remove">
          ${REMOVE_ICON}
        </button>
      </span>`;
  }).join('');

  return `<div class="selected-scope-chips">${chipHtml}<button class="btn btn-ghost btn-small scope-clear-all-inline">Clear all</button></div>`;
}

/**
 * Attach click handlers to chip remove buttons within a container.
 * @param {HTMLElement} container - Parent element to search within
 * @param {string} selector - CSS selector for the chips wrapper (e.g. '.selected-scope-chips')
 * @param {Function} onRemove - Callback receiving (type, id) when a chip is removed
 * @param {Function} [addListener] - Optional listener-tracking function (from BaseView)
 */
export function attachScopeChipHandlers(container, selector, onRemove, addListener) {
  const buttons = container.querySelectorAll(`${selector} .chip-remove`);
  buttons.forEach(btn => {
    const handler = (e) => {
      e.stopPropagation();
      onRemove(btn.dataset.type, btn.dataset.id);
    };
    if (addListener) {
      addListener(btn, 'click', handler);
    } else {
      btn.addEventListener('click', handler);
    }
  });
}
