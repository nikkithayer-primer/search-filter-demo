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

const CHIP_ICONS = {
  keyword: `<svg viewBox="0 0 16 16" width="${ICON_SIZE}" height="${ICON_SIZE}" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 5h12M2 8h8M2 11h10"/></svg>`,
  documentType: `<svg viewBox="0 0 16 16" width="${ICON_SIZE}" height="${ICON_SIZE}" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M10 2v3h3"/></svg>`,
  publisher: `<svg viewBox="0 0 16 16" width="${ICON_SIZE}" height="${ICON_SIZE}" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M5 6h6M5 9h4"/></svg>`,
  author: `<svg viewBox="0 0 16 16" width="${ICON_SIZE}" height="${ICON_SIZE}" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3"/><path d="M3 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/></svg>`,
  metadata: `<svg viewBox="0 0 16 16" width="${ICON_SIZE}" height="${ICON_SIZE}" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 2h14l-5 6v5l-4 2V8L1 2z"/></svg>`,
};

const REMOVE_ICON = `<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l8 8M12 4l-8 8"/></svg>`;

/**
 * Get the icon HTML for a chip type. Entity types use getEntityIcon;
 * everything else uses the static CHIP_ICONS map.
 */
function getChipIcon(type) {
  if (type === 'person' || type === 'organization' || type === 'location') {
    return getEntityIcon(type, ICON_SIZE);
  }
  return CHIP_ICONS[type] || CHIP_ICONS.metadata;
}

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
    const icon = chip.icon || getChipIcon(chip.type);
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

  return `<div class="selected-scope-chips">${chipHtml}</div>`;
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
