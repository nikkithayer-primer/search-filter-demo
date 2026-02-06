/**
 * Factions and faction overlaps for American Politics dataset
 */

export const factions = [
  {
    id: 'faction-001',
    name: 'American Right Wing',
    description: 'A broad coalition of conservative political actors supporting the Trump administration\'s policies on immigration enforcement, territorial expansion, and challenges to the administrative state. This faction strongly supports aggressive federal enforcement actions and views opposition as obstructing lawful government operations.',
    color: '#E15759',
    relatedFactionIds: ['faction-004', 'faction-007', 'faction-009', 'faction-012', 'faction-014'],
    memberCount: 15000000,
    affiliatedPersonIds: ['person-003'],
    affiliatedOrganizationIds: ['org-005'],
    tagIds: ['tag-002'],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-005', 'doc-006', 'doc-007', 'doc-008', 'doc-009', 'doc-010', 'doc-011', 'doc-012', 'doc-013', 'doc-014', 'doc-015', 'doc-016', 'doc-017', 'doc-018', 'doc-019', 'doc-020', 'doc-024', 'doc-025', 'doc-026', 'doc-027', 'doc-028', 'doc-032', 'doc-033', 'doc-034', 'doc-037', 'doc-038', 'doc-040', 'doc-041', 'doc-042', 'doc-043', 'doc-044', 'doc-045', 'doc-046', 'doc-047', 'doc-049', 'doc-050', 'doc-052', 'doc-054', 'doc-055', 'doc-056']
  },
  {
    id: 'faction-002',
    name: 'Democratic Socialists of America',
    description: 'A progressive political organization that has been actively opposing the Trump administration\'s immigration policies. Members have organized protests, provided support to affected communities, and advocated for systemic changes to immigration enforcement practices.',
    color: '#4E79A7',
    relatedFactionIds: ['faction-003', 'faction-008', 'faction-016'],
    memberCount: 500000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: ['org-006'],
    tagIds: ['tag-003'],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-005', 'doc-006', 'doc-007', 'doc-008', 'doc-009', 'doc-010', 'doc-011', 'doc-012', 'doc-013', 'doc-014', 'doc-015', 'doc-016', 'doc-017', 'doc-024', 'doc-025', 'doc-026', 'doc-027', 'doc-031', 'doc-032', 'doc-033', 'doc-034', 'doc-037', 'doc-038', 'doc-040', 'doc-041', 'doc-042', 'doc-043', 'doc-044', 'doc-045', 'doc-046', 'doc-047', 'doc-049', 'doc-050', 'doc-052', 'doc-054', 'doc-055', 'doc-056']
  },
  {
    id: 'faction-003',
    name: 'BLM Supporters',
    description: 'Supporters of the Black Lives Matter movement who have connected racial justice issues to immigration enforcement concerns. This faction has been prominent in protests against federal enforcement actions and has drawn attention to civil rights implications of current policies.',
    color: '#B07AA1',
    relatedFactionIds: ['faction-002', 'faction-008', 'faction-013'],
    memberCount: 8000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    tagIds: ['tag-001'],
    documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-008', 'doc-009', 'doc-010', 'doc-011', 'doc-012', 'doc-015', 'doc-016', 'doc-017', 'doc-024', 'doc-025', 'doc-026', 'doc-031', 'doc-033', 'doc-049']
  },
  {
    id: 'faction-004',
    name: 'Law Enforcement Supporters',
    description: 'A coalition supporting law enforcement agencies and their officers, including ICE and local police. This faction backs aggressive enforcement tactics and views criticism of police and immigration agents as dangerous anti-law enforcement sentiment.',
    color: '#59A14F',
    relatedFactionIds: ['faction-001', 'faction-009', 'faction-012'],
    memberCount: 12000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: ['org-002'],
    tagIds: ['tag-002'],
    documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-008', 'doc-009', 'doc-010', 'doc-011', 'doc-012', 'doc-013', 'doc-014', 'doc-015', 'doc-016', 'doc-017', 'doc-024', 'doc-025', 'doc-026', 'doc-028', 'doc-029', 'doc-047', 'doc-048', 'doc-051', 'doc-055']
  },
  {
    id: 'faction-005',
    name: 'Health Activists',
    description: 'Advocates for public health policies including nutrition, preventive care, and evidence-based medicine. This faction has been critical of RFK Jr.\'s dietary guidelines and other health policy changes under the current administration.',
    color: '#76B7B2',
    relatedFactionIds: ['faction-006', 'faction-011'],
    memberCount: 5000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    tagIds: ['tag-003'],
    documentIds: ['doc-018', 'doc-019', 'doc-020', 'doc-021', 'doc-022', 'doc-023', 'doc-030', 'doc-035', 'doc-036', 'doc-039', 'doc-053']
  },
  {
    id: 'faction-006',
    name: 'Vegans',
    description: 'Advocates for plant-based diets who have strongly opposed the administration\'s meat-heavy dietary guidelines. This faction has used social media platforms, particularly TikTok, to critique government health recommendations and promote alternative nutrition approaches.',
    color: '#F28E2B',
    relatedFactionIds: ['faction-005', 'faction-011'],
    memberCount: 8000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: ['org-004'],
    documentIds: ['doc-018', 'doc-019', 'doc-020', 'doc-021', 'doc-022', 'doc-023', 'doc-030', 'doc-035', 'doc-036', 'doc-039', 'doc-053']
  },
  {
    id: 'faction-007',
    name: 'Libertarian Movement',
    description: 'Advocates for limited government and individual liberty who have mixed views on the administration\'s policies. While supporting deregulation efforts, some libertarians have expressed concern about expanded federal enforcement powers and executive authority.',
    color: '#EDC948',
    relatedFactionIds: ['faction-001', 'faction-010'],
    memberCount: 4000000,
    affiliatedPersonIds: ['person-036'],
    affiliatedOrganizationIds: ['org-031'],
    documentIds: []
  },
  {
    id: 'faction-008',
    name: 'Progressive Democrats',
    description: 'The left wing of the Democratic Party, pushing for comprehensive immigration reform and opposing aggressive enforcement. Progressive Democrats have been prominent in protests and have advocated for defunding ICE and creating pathways to citizenship.',
    color: '#AF7AA1',
    relatedFactionIds: ['faction-002', 'faction-003', 'faction-016'],
    memberCount: 12000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    documentIds: []
  },
  {
    id: 'faction-009',
    name: 'MAGA Movement',
    description: 'The core political movement supporting President Trump and his agenda. MAGA supporters champion aggressive immigration enforcement, America First policies, and view opposition to the administration as obstructionism or worse.',
    color: '#FF9DA7',
    relatedFactionIds: ['faction-001', 'faction-004'],
    memberCount: 25000000,
    affiliatedPersonIds: ['person-003', 'person-027', 'person-028', 'person-032'],
    affiliatedOrganizationIds: ['org-024', 'org-029'],
    tagIds: ['tag-002'],
    documentIds: []
  },
  {
    id: 'faction-010',
    name: 'Traditional Conservatives',
    description: 'Conservatives who emphasize constitutional principles, limited government, and institutional norms. Some traditional conservatives have expressed concern about executive overreach while generally supporting the administration\'s policy goals.',
    color: '#9C755F',
    relatedFactionIds: ['faction-007', 'faction-014'],
    memberCount: 18000000,
    affiliatedPersonIds: ['person-031', 'person-033', 'person-036'],
    affiliatedOrganizationIds: ['org-027', 'org-030'],
    tagIds: ['tag-001'],
    documentIds: []
  },
  {
    id: 'faction-011',
    name: 'Environmental Activists',
    description: 'Advocates for environmental protection and climate action who have opposed the administration\'s rollback of regulations. This faction intersects with health and vegan movements on sustainable food policy advocacy.',
    color: '#BAB0AC',
    relatedFactionIds: ['faction-005', 'faction-006'],
    memberCount: 6000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    documentIds: []
  },
  {
    id: 'faction-012',
    name: 'Second Amendment Advocates',
    description: 'Supporters of gun rights who generally align with the administration on law enforcement issues. This faction has expressed concern about violence against judges while defending citizens\' rights to armed self-defense.',
    color: '#86BCB6',
    relatedFactionIds: ['faction-001', 'faction-004'],
    memberCount: 10000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    documentIds: []
  },
  {
    id: 'faction-013',
    name: 'Immigration Reform Advocates',
    description: 'A diverse group with varying positions on immigration, from those supporting stricter enforcement to those advocating for immigrant protections. Governors from both parties have taken positions on immigration that align with their broader political orientations.',
    color: '#D4A6C8',
    relatedFactionIds: ['faction-008', 'faction-003'],
    memberCount: 7000000,
    affiliatedPersonIds: ['person-027', 'person-028', 'person-029', 'person-030'],
    affiliatedOrganizationIds: ['org-024', 'org-025', 'org-026'],
    documentIds: []
  },
  {
    id: 'faction-014',
    name: 'Religious Conservatives',
    description: 'Faith-based conservatives who have supported the administration on issues like religious freedom while condemning the Cities Church protest disruption. This faction views DOJ\'s FACE Act enforcement as protecting religious liberty.',
    color: '#D37295',
    relatedFactionIds: ['faction-010', 'faction-001'],
    memberCount: 20000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    documentIds: []
  },
  {
    id: 'faction-015',
    name: 'Tech Industry Lobbyists',
    description: 'Representatives of technology companies navigating the complex regulatory environment. This faction has interests in immigration policy related to skilled worker visas and has taken varying positions on platform regulation issues.',
    color: '#8CD17D',
    relatedFactionIds: ['faction-007'],
    memberCount: 500000,
    affiliatedPersonIds: ['person-031'],
    affiliatedOrganizationIds: ['org-027', 'org-030'],
    documentIds: []
  },
  {
    id: 'faction-016',
    name: 'Labor Unions',
    description: 'Organized labor representing workers across various industries, with complex views on immigration policy. Unions have advocated for worker protections while taking diverse positions on enforcement depending on impacts on their members.',
    color: '#499894',
    relatedFactionIds: ['faction-002', 'faction-008'],
    memberCount: 14000000,
    affiliatedPersonIds: ['person-034', 'person-035'],
    affiliatedOrganizationIds: ['org-028'],
    documentIds: []
  }
];

export const factionOverlaps = [
  {
    factionIds: ['faction-005', 'faction-006'],
    overlapSize: 3000000,
    sharedSentiment: { 'narr-003': -0.48 }
  },
  {
    factionIds: ['faction-009', 'faction-001'],
    overlapSize: 5000000,
    sharedSentiment: { 'narr-005': 0.82, 'narr-009': 0.75 }
  },
  {
    factionIds: ['faction-008', 'faction-002'],
    overlapSize: 200000,
    sharedSentiment: { 'narr-006': -0.65 }
  },
  {
    factionIds: ['faction-011', 'faction-006'],
    overlapSize: 2000000,
    sharedSentiment: { 'narr-003': -0.55, 'narr-010': -0.72 }
  },
  {
    factionIds: ['faction-013', 'faction-003'],
    overlapSize: 1000000,
    sharedSentiment: { 'narr-006': -0.58, 'narr-008': -0.62 }
  }
];
