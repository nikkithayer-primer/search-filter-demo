/**
 * Factions and faction overlaps for China Semiconductor dataset
 */

export const factions = [
  {
    id: 'faction-001',
    name: 'Chinese Tech Industry Supporters',
    description: 'A coalition of voices supportive of China\'s semiconductor self-sufficiency efforts, including domestic industry leaders, nationalist commentators, and government-aligned media. This faction emphasizes China\'s technical achievements and frames export controls as unjust attempts to contain China\'s rise.',
    color: '#E15759',
    relatedFactionIds: ['faction-004', 'faction-005', 'faction-011'],
    memberCount: 25000000,
    affiliatedPersonIds: ['person-001', 'person-008', 'person-011'],
    affiliatedOrganizationIds: ['org-001', 'org-010', 'org-007'],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-005', 'doc-006', 'doc-007', 'doc-008', 'doc-009', 'doc-010', 'doc-011', 'doc-012', 'doc-013', 'doc-014', 'doc-015', 'doc-016', 'doc-017', 'doc-018', 'doc-019', 'doc-020', 'doc-021', 'doc-022', 'doc-023', 'doc-024', 'doc-025', 'doc-026', 'doc-027', 'doc-028', 'doc-029', 'doc-030', 'doc-031', 'doc-032', 'doc-033', 'doc-034', 'doc-035', 'doc-040', 'doc-047', 'doc-050', 'doc-054', 'doc-058'],
    tagIds: ['tag-002']
  },
  {
    id: 'faction-002',
    name: 'US Policy Hawks',
    description: 'Policymakers and commentators who advocate for aggressive technology restrictions against China, viewing semiconductor controls as essential to national security. This faction supports expanding export controls and coordinating with allies to limit China\'s access to advanced chip technology.',
    color: '#4E79A7',
    relatedFactionIds: ['faction-013'],
    memberCount: 8000000,
    affiliatedPersonIds: ['person-005', 'person-006'],
    affiliatedOrganizationIds: ['org-005', 'org-006'],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-005', 'doc-006', 'doc-007', 'doc-008', 'doc-009', 'doc-010', 'doc-011', 'doc-012', 'doc-013', 'doc-014', 'doc-015', 'doc-016', 'doc-017', 'doc-018', 'doc-019', 'doc-023', 'doc-024', 'doc-025', 'doc-026', 'doc-027', 'doc-028', 'doc-029', 'doc-031', 'doc-032', 'doc-033', 'doc-034', 'doc-036', 'doc-039', 'doc-040', 'doc-041', 'doc-048', 'doc-049', 'doc-053', 'doc-055', 'doc-058'],
    tagIds: ['tag-003']
  },
  {
    id: 'faction-003',
    name: 'Global Semiconductor Analysts',
    description: 'Independent industry analysts, researchers, and journalists providing technical and market analysis of the semiconductor industry. This faction offers objective assessments of China\'s chip progress and the impact of export controls.',
    color: '#76B7B2',
    relatedFactionIds: ['faction-006', 'faction-008', 'faction-010', 'faction-012'],
    memberCount: 500000,
    affiliatedPersonIds: ['person-003', 'person-014'],
    affiliatedOrganizationIds: ['org-023', 'org-024'],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-009', 'doc-010', 'doc-011', 'doc-012', 'doc-013', 'doc-014', 'doc-015', 'doc-016', 'doc-017', 'doc-023', 'doc-024', 'doc-025', 'doc-026', 'doc-027', 'doc-029', 'doc-031', 'doc-033', 'doc-034', 'doc-037', 'doc-042', 'doc-045', 'doc-051', 'doc-052', 'doc-054'],
    tagIds: ['tag-001']
  },
  {
    id: 'faction-004',
    name: 'Chinese State Media',
    description: 'Official Chinese media outlets including Xinhua and CGTN that promote government narratives about semiconductor self-sufficiency, characterize export controls as unfair containment, and celebrate domestic chip achievements.',
    color: '#F28E2B',
    relatedFactionIds: ['faction-001', 'faction-011'],
    memberCount: 15000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: ['org-025', 'org-026'],
    documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-008', 'doc-026', 'doc-027', 'doc-028', 'doc-032', 'doc-040', 'doc-047']
  },
  {
    id: 'faction-005',
    name: 'US Tech Industry',
    description: 'American semiconductor companies and technology firms balancing compliance with export controls against business interests in China. This faction often advocates for measured restrictions that don\'t harm US competitiveness.',
    color: '#B07AA1',
    relatedFactionIds: ['faction-006', 'faction-007', 'faction-014', 'faction-016'],
    memberCount: 12000000,
    affiliatedPersonIds: ['person-017'],
    affiliatedOrganizationIds: ['org-018', 'org-019', 'org-020'],
    documentIds: ['doc-009', 'doc-010', 'doc-011', 'doc-018', 'doc-019', 'doc-020', 'doc-021', 'doc-022', 'doc-026', 'doc-030', 'doc-033', 'doc-035', 'doc-036', 'doc-037', 'doc-041', 'doc-043', 'doc-044', 'doc-045', 'doc-048', 'doc-051', 'doc-053', 'doc-056', 'doc-057', 'doc-059'],
    tagIds: ['tag-002']
  },
  {
    id: 'faction-006',
    name: 'Supply Chain Watchers',
    description: 'Industry observers, logistics experts, and business journalists focused on semiconductor supply chain dynamics. This faction tracks equipment flows, manufacturing capacity, and the practical impact of geopolitical tensions on chip production.',
    color: '#59A14F',
    relatedFactionIds: ['faction-003', 'faction-005', 'faction-009', 'faction-015'],
    memberCount: 2000000,
    affiliatedPersonIds: ['person-014'],
    affiliatedOrganizationIds: ['org-024'],
    documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-008', 'doc-012', 'doc-013', 'doc-014', 'doc-015', 'doc-016', 'doc-017', 'doc-020', 'doc-021', 'doc-022', 'doc-026', 'doc-027', 'doc-028', 'doc-030', 'doc-032', 'doc-034', 'doc-035', 'doc-036', 'doc-038', 'doc-039', 'doc-043', 'doc-044', 'doc-046', 'doc-049', 'doc-050', 'doc-055', 'doc-056', 'doc-059', 'doc-060'],
    tagIds: ['tag-003']
  },
  {
    id: 'faction-007',
    name: 'Taiwan Tech Defenders',
    description: 'Voices emphasizing Taiwan\'s critical role in the global semiconductor supply chain and advocating for protection of Taiwanese technology interests. This faction highlights TSMC\'s strategic importance and cross-strait technology security concerns.',
    color: '#EDC948',
    relatedFactionIds: ['faction-005'],
    memberCount: 8000000,
    affiliatedPersonIds: ['person-021'],
    affiliatedOrganizationIds: ['org-027'],
    documentIds: []
  },
  {
    id: 'faction-008',
    name: 'Academic Researchers',
    description: 'University researchers and academic institutions studying semiconductor technology, industrial policy, and technology competition. This faction provides scholarly analysis of chip development trends and policy implications.',
    color: '#AF7AA1',
    relatedFactionIds: ['faction-003'],
    memberCount: 2000000,
    affiliatedPersonIds: ['person-022', 'person-028'],
    affiliatedOrganizationIds: ['org-030'],
    documentIds: []
  },
  {
    id: 'faction-009',
    name: 'Investor Community',
    description: 'Financial analysts, institutional investors, and market watchers focused on semiconductor industry investments. This faction analyzes company valuations, market trends, and the financial impact of technology restrictions.',
    color: '#FF9DA7',
    relatedFactionIds: ['faction-005', 'faction-006', 'faction-014'],
    memberCount: 5000000,
    affiliatedPersonIds: ['person-024'],
    affiliatedOrganizationIds: ['org-031'],
    documentIds: []
  },
  {
    id: 'faction-010',
    name: 'European Chip Industry',
    description: 'European semiconductor companies and industry associations navigating US-led export controls while maintaining business relationships. This faction includes ASML stakeholders and EU policymakers addressing chip supply security.',
    color: '#9C755F',
    relatedFactionIds: ['faction-003', 'faction-012', 'faction-016'],
    memberCount: 3000000,
    affiliatedPersonIds: ['person-025'],
    affiliatedOrganizationIds: ['org-029'],
    documentIds: []
  },
  {
    id: 'faction-011',
    name: 'Chinese Nationalists',
    description: 'Patriotic Chinese voices on social media and in public discourse who view semiconductor self-sufficiency as a matter of national pride. This faction celebrates domestic achievements and strongly opposes foreign technology restrictions.',
    color: '#BAB0AC',
    relatedFactionIds: ['faction-001', 'faction-004'],
    memberCount: 50000000,
    affiliatedPersonIds: ['person-020', 'person-029'],
    affiliatedOrganizationIds: ['org-028'],
    documentIds: []
  },
  {
    id: 'faction-012',
    name: 'Free Trade Advocates',
    description: 'Economists, trade policy experts, and business groups who argue that technology export controls harm global economic efficiency and innovation. This faction advocates for reduced barriers and international cooperation.',
    color: '#86BCB6',
    relatedFactionIds: ['faction-003', 'faction-010'],
    memberCount: 4000000,
    affiliatedPersonIds: ['person-026'],
    affiliatedOrganizationIds: ['org-033'],
    documentIds: []
  },
  {
    id: 'faction-013',
    name: 'National Security Hawks',
    description: 'Security-focused policymakers and analysts who prioritize restricting China\'s access to advanced semiconductor technology. This faction advocates for comprehensive export controls and allied coordination on technology restrictions.',
    color: '#D4A6C8',
    relatedFactionIds: ['faction-002'],
    memberCount: 6000000,
    affiliatedPersonIds: ['person-023'],
    affiliatedOrganizationIds: ['org-032'],
    documentIds: []
  },
  {
    id: 'faction-014',
    name: 'AI Industry Leaders',
    description: 'Leaders and stakeholders in the artificial intelligence industry who depend on advanced semiconductors. This faction is particularly concerned about export controls affecting AI chip supply and the competitive landscape.',
    color: '#D37295',
    relatedFactionIds: ['faction-005', 'faction-009'],
    memberCount: 1000000,
    affiliatedPersonIds: ['person-024'],
    affiliatedOrganizationIds: ['org-031'],
    documentIds: []
  },
  {
    id: 'faction-015',
    name: 'Environmental Tech Critics',
    description: 'Environmental advocates and critics who highlight the resource intensity and environmental impact of semiconductor manufacturing. This faction raises concerns about water usage, energy consumption, and chemical waste in chip production.',
    color: '#8CD17D',
    relatedFactionIds: ['faction-006'],
    memberCount: 3000000,
    affiliatedPersonIds: ['person-027'],
    affiliatedOrganizationIds: ['org-034'],
    documentIds: []
  },
  {
    id: 'faction-016',
    name: 'Japanese Tech Industry',
    description: 'Japanese semiconductor companies and equipment makers coordinating with US export controls while maintaining Asian business relationships. This faction includes firms like Tokyo Electron navigating geopolitical technology tensions.',
    color: '#499894',
    relatedFactionIds: ['faction-005', 'faction-010'],
    memberCount: 4000000,
    affiliatedPersonIds: ['person-025'],
    affiliatedOrganizationIds: ['org-029'],
    documentIds: []
  }
];

export const factionOverlaps = [
  {
    factionIds: ['faction-001', 'faction-004'],
    overlapSize: 8000000,
    sharedSentiment: { 'narr-001': 0.72, 'narr-002': -0.78 }
  },
  {
    factionIds: ['faction-003', 'faction-006'],
    overlapSize: 350000,
    sharedSentiment: { 'narr-005': 0.15 }
  },
  {
    factionIds: ['faction-005', 'faction-006'],
    overlapSize: 1500000,
    sharedSentiment: { 'narr-007': -0.52 }
  },
  {
    factionIds: ['faction-011', 'faction-004'],
    overlapSize: 10000000,
    sharedSentiment: { 'narr-001': 0.85, 'narr-003': 0.78 }
  },
  {
    factionIds: ['faction-007', 'faction-005'],
    overlapSize: 500000,
    sharedSentiment: { 'narr-002': -0.65, 'narr-007': -0.45 }
  },
  {
    factionIds: ['faction-014', 'faction-009'],
    overlapSize: 100000,
    sharedSentiment: { 'narr-011': 0.72 }
  }
];
