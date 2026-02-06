/**
 * Locations for American Politics dataset
 */

export const locations = [
  {
    id: 'loc-001',
    name: 'White House, Washington D.C.',
    description: 'The official residence and workplace of the President of the United States. Under the current administration, the White House has been the source of major policy announcements on immigration, foreign affairs, and executive actions that have shaped national discourse.',
    coordinates: { lat: 38.8977, lng: -77.0365 },
    type: 'landmark',
    tagIds: ['tag-004'],
    documentIds: ['doc-002', 'doc-009', 'doc-011', 'doc-017', 'doc-018', 'doc-027', 'doc-035', 'doc-036', 'doc-038', 'doc-044', 'doc-045', 'doc-046', 'doc-050', 'doc-053']
  },
  {
    id: 'loc-002',
    name: '9th and Hennepin, Minneapolis',
    description: 'A downtown Minneapolis intersection that became the focal point of anti-ICE protests and federal enforcement activities. This location witnessed the fatal shooting of protester Renee Good and subsequent confrontations between federal agents and demonstrators.',
    coordinates: { lat: 44.9778, lng: -93.2750 },
    type: 'general',
    tagIds: ['tag-004'],
    documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-016', 'doc-025', 'doc-026', 'doc-028', 'doc-031']
  },
  {
    id: 'loc-004',
    name: 'Capitol Building, Washington D.C.',
    description: 'The seat of the United States Congress, where legislative battles over immigration policy and funding have led to government shutdowns and partisan gridlock over the administration\'s enforcement priorities.',
    coordinates: { lat: 38.8899, lng: -77.0091 },
    type: 'landmark',
    documentIds: ['doc-041', 'doc-042', 'doc-043', 'doc-048', 'doc-051', 'doc-055', 'doc-056']
  },
  {
    id: 'loc-005',
    name: 'Davos, Switzerland',
    description: 'A Swiss resort town that hosts the annual World Economic Forum. The 2026 forum became a platform for European leaders to publicly criticize Trump\'s foreign policy and territorial ambitions regarding Greenland.',
    coordinates: { lat: 46.8027, lng: 9.8360 },
    type: 'city',
    documentIds: ['doc-001', 'doc-003', 'doc-027']
  },
  {
    id: 'loc-006',
    name: 'Greenland',
    description: 'An autonomous territory within the Kingdom of Denmark that has become the subject of territorial acquisition ambitions by the Trump administration. Greenland\'s strategic location and natural resources have made it a flashpoint in US-European relations.',
    coordinates: { lat: 71.7069, lng: -42.6043 },
    type: 'region',
    documentIds: ['doc-004', 'doc-027']
  },
  {
    id: 'loc-007',
    name: 'Lafayette, Indiana',
    description: 'A city in Indiana where Judge Steven Meyer and his wife were shot at their home, highlighting growing concerns about violence against the judiciary and prompting statewide security reviews for judges.',
    coordinates: { lat: 40.4167, lng: -86.8753 },
    type: 'city',
    tagIds: ['tag-004'],
    documentIds: ['doc-013', 'doc-014', 'doc-029']
  },
  {
    id: 'loc-008',
    name: 'St. Paul, Minnesota',
    description: 'Minnesota\'s capital city and location of Cities Church, where protesters disrupted a service targeting ICE official David Easterwood. The incident led to DOJ investigations and debates about religious freedom and protest rights.',
    coordinates: { lat: 44.9537, lng: -93.0900 },
    type: 'city',
    tagIds: ['tag-005'],
    documentIds: ['doc-008', 'doc-010', 'doc-012', 'doc-024', 'doc-026']
  },
  {
    id: 'loc-009',
    name: 'Washington, D.C.',
    description: 'The nation\'s capital and seat of the federal government. The city has been the site of major policy announcements, court rulings, and congressional actions related to the ongoing federal-state tensions over immigration.',
    coordinates: { lat: 38.9072, lng: -77.0369 },
    type: 'city',
    documentIds: ['doc-015', 'doc-028', 'doc-037', 'doc-039', 'doc-047', 'doc-049', 'doc-052']
  },
  {
    id: 'loc-010',
    name: 'Austin, Texas',
    description: 'The capital of Texas and site of Governor Abbott\'s border security initiatives. Austin has hosted summits of Republican governors coordinating on immigration enforcement and border security measures.',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    type: 'city',
    tagIds: ['tag-005'],
    documentIds: ['doc-032', 'doc-040']
  },
  {
    id: 'loc-011',
    name: 'Eagle Pass, Texas',
    description: 'A border city in Texas that has become a focal point for Texas National Guard deployments and federal-state coordination on border security. The area has seen significant enforcement activity under Operation Lone Star.',
    coordinates: { lat: 28.7091, lng: -100.4995 },
    type: 'city',
    tagIds: ['tag-004'],
    documentIds: ['doc-032', 'doc-033', 'doc-054']
  }
];
