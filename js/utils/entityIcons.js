/**
 * entityIcons.js
 * Shared SVG icons for all entity types and extracted entity types
 */

/**
 * Get SVG icon for an entity type
 * @param {string} type - Entity type (narratives, locations, events, etc.)
 * @param {number} size - Icon size in pixels (default 16)
 * @returns {string} SVG HTML string
 */
export function getEntityIcon(type, size = 16) {
  const icons = {
    narratives: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M2 2h12v12H2z" rx="1"/>
      <path d="M4 5h8M4 8h8M4 11h5"/>
    </svg>`,
    narrative: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M2 2h12v12H2z" rx="1"/>
      <path d="M4 5h8M4 8h8M4 11h5"/>
    </svg>`,
    themes: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M3 3h10v10H3z" rx="1"/>
      <path d="M5 6h6M5 9h4"/>
    </svg>`,
    theme: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M3 3h10v10H3z" rx="1"/>
      <path d="M5 6h6M5 9h4"/>
    </svg>`,
    locations: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
      <circle cx="8" cy="6" r="2"/>
    </svg>`,
    location: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/>
      <circle cx="8" cy="6" r="2"/>
    </svg>`,
    events: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <rect x="2" y="3" width="12" height="11" rx="1"/>
      <path d="M2 6h12M5 1v3M11 1v3"/>
    </svg>`,
    event: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <rect x="2" y="3" width="12" height="11" rx="1"/>
      <path d="M2 6h12M5 1v3M11 1v3"/>
    </svg>`,
    entities: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <circle cx="8" cy="4" r="2.5"/>
      <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
    </svg>`,
    person: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <circle cx="8" cy="4" r="2.5"/>
      <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
    </svg>`,
    persons: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <circle cx="8" cy="4" r="2.5"/>
      <path d="M3 14c0-3 2.2-5 5-5s5 2 5 5"/>
    </svg>`,
    organization: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="currentColor">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 16H9.5C9.59107 16 9.67646 15.9757 9.75 15.9331C9.82354 15.9757 9.90893 16 10 16H15.5C15.7761 16 16 15.7761 16 15.5V4.5C16 4.22386 15.7761 4 15.5 4H10V0.5C10 0.223858 9.77614 0 9.5 0H0.5C0.223858 0 0 0.223858 0 0.5V15.5C0 15.7761 0.223858 16 0.5 16ZM1 15V1H9V15H7V13C7 12.7239 6.77614 12.5 6.5 12.5H3.5C3.22386 12.5 3 12.7239 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z"/>
    </svg>`,
    organizations: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="currentColor">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 16H9.5C9.59107 16 9.67646 15.9757 9.75 15.9331C9.82354 15.9757 9.90893 16 10 16H15.5C15.7761 16 16 15.7761 16 15.5V4.5C16 4.22386 15.7761 4 15.5 4H10V0.5C10 0.223858 9.77614 0 9.5 0H0.5C0.223858 0 0 0.223858 0 0.5V15.5C0 15.7761 0.223858 16 0.5 16ZM1 15V1H9V15H7V13C7 12.7239 6.77614 12.5 6.5 12.5H3.5C3.22386 12.5 3 12.7239 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z"/>
    </svg>`,
    documents: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <rect x="2" y="1" width="12" height="14" rx="1"/>
      <path d="M5 4h6M5 7h6M5 10h4"/>
    </svg>`,
    document: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <rect x="2" y="1" width="12" height="14" rx="1"/>
      <path d="M5 4h6M5 7h6M5 10h4"/>
    </svg>`,
    topics: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M6 1v14M10 1v14M1 6h14M1 10h14"/>
    </svg>`,
    topic: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M6 1v14M10 1v14M1 6h14M1 10h14"/>
    </svg>`,
    monitors: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <rect x="1" y="2" width="14" height="10" rx="1"/>
      <path d="M5 14h6M8 12v2"/>
    </svg>`,
    monitor: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <rect x="1" y="2" width="14" height="10" rx="1"/>
      <path d="M5 14h6M8 12v2"/>
    </svg>`,
    search: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <circle cx="7" cy="7" r="4"/>
      <path d="M10 10l4 4"/>
    </svg>`,
    tags: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M14 8.5l-5.5 5.5a2 2 0 01-2.8 0L2 10.3V2h8.3L14 5.7a2 2 0 010 2.8z"/>
      <circle cx="5.5" cy="5.5" r="1.5"/>
    </svg>`,
    tag: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <path d="M14 8.5l-5.5 5.5a2 2 0 01-2.8 0L2 10.3V2h8.3L14 5.7a2 2 0 010 2.8z"/>
      <circle cx="5.5" cy="5.5" r="1.5"/>
    </svg>`,
    workspaces: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <rect x="1" y="1" width="14" height="14" rx="1"/>
      <path d="M1 5h14"/>
      <path d="M5 5v10"/>
    </svg>`,
    workspace: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.25">
      <rect x="1" y="1" width="14" height="14" rx="1"/>
      <path d="M1 5h14"/>
      <path d="M5 5v10"/>
    </svg>`,
    projects: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="currentColor">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 1C1.44771 1 1 1.44772 1 2V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V3.5C15 2.94772 14.5523 2.5 14 2.5H8.26759L7.56446 1.4453C7.37899 1.1671 7.06676 1 6.73241 1H2ZM2 2H6.73241L7.43554 3.0547C7.62101 3.3329 7.93324 3.5 8.26759 3.5H14V4.5H2V2ZM2 5.5V14H14V5.5H2Z"/>
    </svg>`,
    project: `<svg class="entity-icon" viewBox="0 0 16 16" width="${size}" height="${size}" fill="currentColor">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 1C1.44771 1 1 1.44772 1 2V14C1 14.5523 1.44771 15 2 15H14C14.5523 15 15 14.5523 15 14V3.5C15 2.94772 14.5523 2.5 14 2.5H8.26759L7.56446 1.4453C7.37899 1.1671 7.06676 1 6.73241 1H2ZM2 2H6.73241L7.43554 3.0547C7.62101 3.3329 7.93324 3.5 8.26759 3.5H14V4.5H2V2ZM2 5.5V14H14V5.5H2Z"/>
    </svg>`
  };
  return icons[type] || icons.narratives;
}

/* ============================================
   Extraction Entity Icons
   ============================================ */

const EXTRACTION_ICONS = {
  organization: `<path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 16H9.5C9.59 16 9.68 15.98 9.75 15.93C9.82 15.98 9.91 16 10 16H15.5C15.78 16 16 15.78 16 15.5V4.5C16 4.22 15.78 4 15.5 4H10V0.5C10 0.22 9.78 0 9.5 0H0.5C0.22 0 0 0.22 0 0.5V15.5C0 15.78 0.22 16 0.5 16ZM1 15V1H9V15H7V13C7 12.72 6.78 12.5 6.5 12.5H3.5C3.22 12.5 3 12.72 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z" fill="currentColor"/>`,
  person: `<circle cx="8" cy="4" r="2.5" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M3 14c0-3 2.2-5 5-5s5 2 5 5" fill="none" stroke="currentColor" stroke-width="1.25"/>`,
  location: `<path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z" fill="none" stroke="currentColor" stroke-width="1.25"/><circle cx="8" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.25"/>`,
  animal: `<circle cx="4.5" cy="3" r="1.8" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="11.5" cy="3" r="1.8" fill="none" stroke="currentColor" stroke-width="1.1"/><ellipse cx="8" cy="9.5" rx="4.5" ry="4" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="6.5" cy="8.5" r="0.7" fill="currentColor"/><circle cx="9.5" cy="8.5" r="0.7" fill="currentColor"/><ellipse cx="8" cy="10.5" rx="1.2" ry="0.8" fill="currentColor"/>`,
  currency: `<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M8 3.5v9M10.2 5.5C10 4.8 9.1 4.2 8 4.2S5.8 4.8 5.8 5.7c0 1.2 4.4 0.8 4.4 2.4 0 1-1 1.7-2.2 1.7s-2.2-.7-2.2-1.7" fill="none" stroke="currentColor" stroke-width="1.1"/>`,
  civilian_vehicle: `<path d="M2 10.5h12M3.5 10.5V12M12.5 10.5V12" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M2.5 10.5L3.5 7h9l1 3.5" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M4.5 7L5.5 4h5l1 3" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="4.5" cy="12" r="1.2" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="11.5" cy="12" r="1.2" fill="none" stroke="currentColor" stroke-width="1.1"/>`,
  communication_device: `<path d="M4 2h8v12H4z" rx="1" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M6 12h4" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M4 10h8" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="8" cy="13" r="0.5" fill="currentColor"/>`,
  disease: `<circle cx="8" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.2 3.2l2.1 2.1M10.7 10.7l2.1 2.1M12.8 3.2l-2.1 2.1M5.3 10.7l-2.1 2.1" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/>`,
  datetime: `<rect x="2" y="2.5" width="12" height="11.5" rx="1" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M2 6h12M5 0.5v3M11 0.5v3" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M7 9l1.5 1.5L11 8" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>`,
  facility: `<path d="M1 15V5l5-3v13M6 5l5-3v13M11 15V6h4v9" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M3 7h1M3 9h1M3 11h1M8 5h1M8 7h1M8 9h1M8 11h1M12.5 8h1M12.5 10h1M12.5 12h1" fill="none" stroke="currentColor" stroke-width="1"/>`,
  fungus: `<path d="M8 10v5" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M5.5 14.5c0-1 1.1-1.5 2.5-1.5s2.5.5 2.5 1.5" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M2 10c0-3.3 2.7-6 6-6s6 2.7 6 10H2z" fill="none" stroke="currentColor" stroke-width="1.25"/><circle cx="6" cy="7" r="0.7" fill="currentColor"/><circle cx="10" cy="8" r="0.7" fill="currentColor"/><circle cx="8" cy="6" r="0.5" fill="currentColor"/>`,
  microbe: `<ellipse cx="8" cy="8" rx="4" ry="3.5" fill="none" stroke="currentColor" stroke-width="1.25"/><circle cx="6.5" cy="7.5" r="1" fill="currentColor"/><circle cx="9.5" cy="8.5" r="0.7" fill="currentColor"/><circle cx="8" cy="6.5" r="0.5" fill="currentColor"/><path d="M4 5.5L2.5 3.5M12 5.5l1.5-2M4 10.5L2 13M12 10.5l2 2.5M8 4.5V2M8 11.5V14" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>`,
  incident: `<path d="M8 1l1.8 4.5L15 6l-3.5 3.8L12.5 15 8 12.2 3.5 15l1-5.2L1 6l5.2-.5z" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M7 7l1 2.5L9.5 8" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>`,
  miscellaneous: `<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M5.5 6c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 1.2-.8 1.8-1.5 2.2-.4.3-.5.5-.5.8v.5" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><circle cx="8" cy="12" r="0.7" fill="currentColor"/>`,
  organism: `<path d="M8 2v12" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M8 4c2 0 4 1 4 3M8 4c-2 0-4 1-4 3M8 7.5c2.5 0 5 1 5 3M8 7.5c-2.5 0-5 1-5 3M8 11c1.5 0 3 .8 3 2M8 11c-1.5 0-3 .8-3 2" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>`,
  substance: `<path d="M6 1.5v4L3 11c-.5 1 .2 3.5 2 3.5h6c1.8 0 2.5-2.5 2-3.5l-3-5.5v-4" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M4.5 1.5h7" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M5 10h6" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="7" cy="12" r="0.7" fill="currentColor"/><circle cx="9.5" cy="11.5" r="0.5" fill="currentColor"/>`,
  vehicle: `<path d="M1 10.5h14M2 10.5V12M14 10.5V12" fill="none" stroke="currentColor" stroke-width="1.1"/><path d="M1.5 10.5L3 6.5h10l1.5 4" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M4 6.5L5 3.5h6l1 3" fill="none" stroke="currentColor" stroke-width="1.1"/><rect x="3.5" y="8" width="3" height="2" rx="0.5" fill="none" stroke="currentColor" stroke-width="0.9"/><rect x="9.5" y="8" width="3" height="2" rx="0.5" fill="none" stroke="currentColor" stroke-width="0.9"/><circle cx="4" cy="12.5" r="1.5" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="12" cy="12.5" r="1.5" fill="none" stroke="currentColor" stroke-width="1.1"/>`,
  weapon: `<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.25"/><path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" stroke-width="1.1"/><circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor" stroke-width="1.1"/>`
};

const EXTRACTION_TYPE_ALIASES = {
  organizations: 'organization',
  persons: 'person',
  locations: 'location',
  animals: 'animal',
  currencies: 'currency',
  civilian_vehicles: 'civilian_vehicle',
  communication_devices: 'communication_device',
  diseases: 'disease',
  date_time_mention: 'datetime',
  date_time_mentions: 'datetime',
  datetime_mention: 'datetime',
  facilities: 'facility',
  fungi: 'fungus',
  microbes: 'microbe',
  incidents: 'incident',
  organisms: 'organism',
  substances: 'substance',
  vehicles: 'vehicle',
  weapons: 'weapon'
};

/**
 * Normalize an extraction type string to a canonical key.
 * Handles "Extracted Foo Bar" prefixed names and various aliases.
 * @param {string} rawType
 * @returns {string} canonical key (e.g. "organization", "datetime")
 */
export function normalizeExtractionType(rawType) {
  let key = rawType
    .replace(/^extracted\s+/i, '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_');
  return EXTRACTION_TYPE_ALIASES[key] || key;
}

/**
 * Get SVG icon for an extracted entity type.
 * @param {string} rawType - Raw extraction type (e.g. "Extracted Locations", "person", "Extracted Date Time Mention")
 * @param {number} size - Icon size in pixels (default 14)
 * @returns {string} SVG HTML string
 */
export function getExtractionIcon(rawType, size = 14) {
  const type = normalizeExtractionType(rawType);
  const paths = EXTRACTION_ICONS[type] || EXTRACTION_ICONS.miscellaneous;
  return `<svg class="extraction-icon" viewBox="0 0 16 16" width="${size}" height="${size}">${paths}</svg>`;
}

/**
 * Get the CSS modifier class for an extraction type's color category.
 * Returns "organization", "person", "location", or empty string for default.
 * @param {string} rawType
 * @returns {string}
 */
export function getExtractionColorClass(rawType) {
  const type = normalizeExtractionType(rawType);
  if (type === 'organization') return 'extraction-chip--organization';
  if (type === 'person') return 'extraction-chip--person';
  if (type === 'location') return 'extraction-chip--location';
  return '';
}

/**
 * Render a complete extraction chip element.
 * @param {string} label - Display text
 * @param {string} extractionType - Raw extraction type (e.g. "Extracted Locations")
 * @param {'colored'|'ghost'|'dashed'} state - Visual state
 * @param {number} iconSize - Icon size (default 14)
 * @returns {string} HTML string
 */
export function renderExtractionChip(label, extractionType, state = 'colored', iconSize = 14) {
  const colorClass = getExtractionColorClass(extractionType);
  const icon = getExtractionIcon(extractionType, iconSize);
  return `<span class="extraction-chip extraction-chip--${state} ${colorClass}">
    <span class="extraction-chip-icon">${icon}</span>
    <span class="extraction-chip-label">${label}</span>
  </span>`;
}
