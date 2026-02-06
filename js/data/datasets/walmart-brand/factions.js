/**
 * Factions and faction overlaps for Walmart Brand dataset
 */

export const factions = [
  {
    id: 'faction-001',
    name: 'Disgruntled Customers',
    description: 'A growing segment of Walmart shoppers frustrated with self-checkout policies, out-of-stock items, delivery failures, and perceived declining customer service. This faction has been vocal on social media and has driven viral content criticizing the retailer\'s practices.',
    color: '#E15759',
    relatedFactionIds: ['faction-004', 'faction-014', 'faction-016'],
    tagIds: ['tag-002'],
    memberCount: 15000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: [],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-005', 'doc-006', 'doc-007', 'doc-012', 'doc-013', 'doc-015', 'doc-016', 'doc-017', 'doc-020', 'doc-021', 'doc-022', 'doc-023', 'doc-029', 'doc-030', 'doc-031', 'doc-036', 'doc-037', 'doc-038', 'doc-039', 'doc-040', 'doc-041', 'doc-042', 'doc-044', 'doc-045']
  },
  {
    id: 'faction-002',
    name: 'Walmart Employees',
    description: 'Current Walmart associates and workers who share experiences about working conditions through social media and participate in organizing efforts. This faction has driven viral content about understaffing and supported unionization campaigns.',
    color: '#4E79A7',
    relatedFactionIds: ['faction-003', 'faction-011'],
    tagIds: ['tag-002'],
    memberCount: 2300000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: ['org-005'],
    documentIds: ['doc-008', 'doc-009', 'doc-010', 'doc-011', 'doc-027', 'doc-028', 'doc-032', 'doc-033', 'doc-034', 'doc-035', 'doc-046', 'doc-047', 'doc-048']
  },
  {
    id: 'faction-003',
    name: 'Labor Rights Advocates',
    description: 'A coalition of unions, worker advocacy groups, and activists pushing for improved labor conditions at Walmart. This faction has achieved a historic victory with the unionization of an Atlanta fulfillment center and continues to campaign for higher wages and better working conditions.',
    color: '#B07AA1',
    relatedFactionIds: ['faction-002', 'faction-008', 'faction-009', 'faction-011'],
    tagIds: ['tag-001'],
    memberCount: 5000000,
    affiliatedPersonIds: ['person-003', 'person-004'],
    affiliatedOrganizationIds: ['org-005', 'org-006'],
    documentIds: ['doc-008', 'doc-009', 'doc-010', 'doc-024', 'doc-025', 'doc-027', 'doc-028', 'doc-032', 'doc-033', 'doc-034', 'doc-035', 'doc-046', 'doc-047', 'doc-048']
  },
  {
    id: 'faction-004',
    name: 'Consumer Safety Advocates',
    description: 'Organizations and individuals focused on protecting consumer safety and advocating for product quality standards. This faction has been active in demanding accountability for the Great Value contamination recall and stricter private-label oversight.',
    color: '#F28E2B',
    relatedFactionIds: ['faction-001', 'faction-013', 'faction-014'],
    tagIds: ['tag-002'],
    memberCount: 3000000,
    affiliatedPersonIds: ['person-007', 'person-011'],
    affiliatedOrganizationIds: ['org-008', 'org-009'],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-012', 'doc-013', 'doc-014', 'doc-024', 'doc-026', 'doc-029', 'doc-030', 'doc-031', 'doc-036', 'doc-037', 'doc-042']
  },
  {
    id: 'faction-005',
    name: 'Retail Industry Analysts',
    description: 'Professional analysts, financial experts, and business journalists who provide objective coverage and analysis of Walmart\'s operations, competitive positioning, and market performance.',
    color: '#76B7B2',
    relatedFactionIds: ['faction-010'],
    memberCount: 50000,
    affiliatedPersonIds: ['person-010', 'person-012'],
    affiliatedOrganizationIds: ['org-014', 'org-015'],
    documentIds: ['doc-007', 'doc-011', 'doc-017', 'doc-018', 'doc-019', 'doc-025', 'doc-026', 'doc-029', 'doc-034', 'doc-038', 'doc-040', 'doc-043', 'doc-044', 'doc-047']
  },
  {
    id: 'faction-006',
    name: 'Competitor Supporters',
    description: 'Consumers and stakeholders who prefer Walmart\'s competitors such as Target, Amazon, Costco, and Aldi. This faction highlights alternatives to Walmart and amplifies favorable comparisons for competing retailers.',
    color: '#59A14F',
    relatedFactionIds: ['faction-007', 'faction-016'],
    tagIds: ['tag-003'],
    memberCount: 25000000,
    affiliatedPersonIds: [],
    affiliatedOrganizationIds: ['org-003', 'org-004'],
    documentIds: ['doc-015', 'doc-016', 'doc-018', 'doc-019', 'doc-020', 'doc-038', 'doc-043']
  },
  {
    id: 'faction-007',
    name: 'Small Business Advocates',
    description: 'Advocates for local businesses and small retailers who argue that Walmart\'s market power has harmed Main Street shops and local economies. This faction raises concerns about monopoly power and community economic impact.',
    color: '#EDC948',
    relatedFactionIds: ['faction-006', 'faction-009', 'faction-015'],
    memberCount: 8000000,
    affiliatedPersonIds: ['person-018'],
    affiliatedOrganizationIds: ['org-016'],
    documentIds: []
  },
  {
    id: 'faction-008',
    name: 'Environmental Activists',
    description: 'Environmental advocates concerned about Walmart\'s environmental impact, including supply chain sustainability, packaging waste, and the carbon footprint of e-commerce delivery operations.',
    color: '#AF7AA1',
    relatedFactionIds: ['faction-003'],
    memberCount: 6000000,
    affiliatedPersonIds: ['person-019'],
    affiliatedOrganizationIds: ['org-017'],
    documentIds: []
  },
  {
    id: 'faction-009',
    name: 'Community Organizers',
    description: 'Grassroots organizers working in communities affected by Walmart\'s business decisions, including store closures, labor practices, and community development impacts. This faction mobilizes local opposition to corporate practices.',
    color: '#FF9DA7',
    relatedFactionIds: ['faction-003', 'faction-007', 'faction-012', 'faction-015'],
    memberCount: 4000000,
    affiliatedPersonIds: ['person-020'],
    affiliatedOrganizationIds: ['org-018'],
    documentIds: []
  },
  {
    id: 'faction-010',
    name: 'Shareholder Activists',
    description: 'Investors and shareholder advocacy groups who push for changes in Walmart\'s corporate governance, executive compensation, and social responsibility practices through proxy votes and shareholder resolutions.',
    color: '#9C755F',
    relatedFactionIds: ['faction-005'],
    memberCount: 500000,
    affiliatedPersonIds: ['person-021'],
    affiliatedOrganizationIds: ['org-019'],
    documentIds: []
  },
  {
    id: 'faction-011',
    name: 'Supply Chain Workers',
    description: 'Workers throughout Walmart\'s supply chain including warehouse employees, drivers, and fulfillment center staff. This faction increasingly aligns with labor organizing efforts and shares common concerns with retail store employees.',
    color: '#BAB0AC',
    relatedFactionIds: ['faction-002', 'faction-003'],
    memberCount: 3000000,
    affiliatedPersonIds: ['person-019', 'person-027'],
    affiliatedOrganizationIds: ['org-020'],
    documentIds: []
  },
  {
    id: 'faction-012',
    name: 'Local Government Officials',
    description: 'Elected officials and government administrators in communities where Walmart operates, particularly those affected by store closures or seeking to attract or retain Walmart facilities and services.',
    color: '#86BCB6',
    relatedFactionIds: ['faction-009'],
    memberCount: 100000,
    affiliatedPersonIds: ['person-022'],
    affiliatedOrganizationIds: ['org-021'],
    documentIds: []
  },
  {
    id: 'faction-013',
    name: 'Healthcare Advocates',
    description: 'Advocates focused on healthcare access and affordability who view Walmart Health\'s clinic expansion as either a positive development in underserved areas or a concerning corporatization of healthcare services.',
    color: '#D4A6C8',
    relatedFactionIds: ['faction-004'],
    memberCount: 2000000,
    affiliatedPersonIds: ['person-023'],
    affiliatedOrganizationIds: ['org-022'],
    documentIds: []
  },
  {
    id: 'faction-014',
    name: 'Tech Privacy Critics',
    description: 'Privacy advocates and critics concerned about Walmart\'s use of surveillance technology in stores, including self-checkout monitoring systems, facial recognition, and data collection from customer apps.',
    color: '#D37295',
    relatedFactionIds: ['faction-001', 'faction-004'],
    memberCount: 5000000,
    affiliatedPersonIds: ['person-024'],
    affiliatedOrganizationIds: ['org-023'],
    documentIds: []
  },
  {
    id: 'faction-015',
    name: 'Rural Community Representatives',
    description: 'Residents and leaders of rural communities dependent on Walmart for essential goods and services. This faction is particularly concerned about store closures that can leave communities as food deserts.',
    color: '#8CD17D',
    relatedFactionIds: ['faction-007', 'faction-009'],
    tagIds: ['tag-001'],
    memberCount: 10000000,
    affiliatedPersonIds: ['person-020', 'person-025'],
    affiliatedOrganizationIds: ['org-018'],
    documentIds: []
  },
  {
    id: 'faction-016',
    name: 'Budget-Conscious Consumers',
    description: 'Price-sensitive shoppers who rely on Walmart for affordable goods but have become frustrated with perceived price increases and declining value proposition compared to discount competitors like Aldi.',
    color: '#499894',
    relatedFactionIds: ['faction-001', 'faction-006'],
    memberCount: 30000000,
    affiliatedPersonIds: ['person-026'],
    affiliatedOrganizationIds: ['org-023'],
    documentIds: []
  }
];

export const factionOverlaps = [
  {
    factionIds: ['faction-001', 'faction-004'],
    overlapSize: 2500000,
    sharedSentiment: { 'narr-004': -0.78 }
  },
  {
    factionIds: ['faction-002', 'faction-003'],
    overlapSize: 500000,
    sharedSentiment: { 'narr-003': -0.75 }
  },
  {
    factionIds: ['faction-001', 'faction-006'],
    overlapSize: 8000000,
    sharedSentiment: { 'narr-005': -0.55 }
  },
  {
    factionIds: ['faction-011', 'faction-002'],
    overlapSize: 800000,
    sharedSentiment: { 'narr-003': -0.68, 'narr-009': -0.72 }
  },
  {
    factionIds: ['faction-009', 'faction-015'],
    overlapSize: 500000,
    sharedSentiment: { 'narr-007': -0.82, 'narr-010': 0.45 }
  },
  {
    factionIds: ['faction-016', 'faction-001'],
    overlapSize: 5000000,
    sharedSentiment: { 'narr-005': -0.65, 'narr-006': -0.58 }
  }
];
