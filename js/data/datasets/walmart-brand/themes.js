/**
 * Themes for Walmart Brand dataset
 * Note: factionMentions and volumeOverTime are computed from documentIds via DataService
 */

export const themes = [
  // Self-checkout narrative sub-narratives
  {
    id: 'sub-001',
    text: 'TikTok videos show customers detained and searched after honest self-checkout mistakes',
    description: 'Viral TikTok content showing Walmart customers being stopped, questioned, and searched by loss prevention staff after self-checkout, even when they have receipts. Videos depict humiliating confrontations that have sparked widespread outrage.',
    parentNarrativeId: 'narr-001',
    sentiment: -0.82,
    tagIds: ['tag-004'],
    personIds: ['person-001', 'person-002'],
    organizationIds: ['org-001'],
    locationIds: ['loc-002'],
    eventIds: ['event-001'],
    documentIds: ['doc-001', 'doc-002']
  },
  {
    id: 'sub-002',
    text: 'Class-action lawsuit filed alleging systematic false detention of customers',
    description: 'A Texas law firm has filed a class-action lawsuit against Walmart alleging a pattern of falsely detaining customers at self-checkout stations. The suit claims Walmart employees are incentivized to make stops regardless of evidence.',
    parentNarrativeId: 'narr-001',
    sentiment: -0.75,
    tagIds: ['tag-004'],
    personIds: ['person-008'],
    organizationIds: ['org-002'],
    locationIds: ['loc-003'],
    eventIds: ['event-002'],
    documentIds: ['doc-003']
  },
  {
    id: 'sub-003',
    text: 'Walmart announces plan to increase staffed checkout lanes in response to complaints',
    description: 'In response to mounting criticism, Walmart announced plans to add staffed checkout lanes in 500 stores. The company framed this as a customer service improvement, though critics note it follows pressure from viral complaints.',
    parentNarrativeId: 'narr-001',
    sentiment: 0.35,
    tagIds: ['tag-003'],
    personIds: ['person-001'],
    organizationIds: ['org-001'],
    locationIds: ['loc-002'],
    eventIds: ['event-003'],
    documentIds: ['doc-004']
  },

  // Empty shelves narrative sub-narratives
  {
    id: 'sub-004',
    text: 'Viral photos show barren grocery aisles, especially in household essentials',
    description: 'Social media users are sharing photos of empty Walmart shelves across multiple states, particularly in grocery and household essentials sections. Some customers report driving to multiple stores without finding needed items.',
    parentNarrativeId: 'narr-002',
    sentiment: -0.72,
    tagIds: ['tag-005'],
    personIds: ['person-009'],
    organizationIds: ['org-001', 'org-003'],
    locationIds: ['loc-001', 'loc-004'],
    eventIds: ['event-004'],
    documentIds: ['doc-005', 'doc-006']
  },
  {
    id: 'sub-005',
    text: 'Retail analysts question Walmart\'s inventory management technology',
    description: 'Industry analysts are questioning whether Walmart\'s inventory management systems need significant upgrades. Reports suggest the company\'s technology stack may be struggling to handle current supply chain complexity.',
    parentNarrativeId: 'narr-002',
    sentiment: -0.45,
    tagIds: ['tag-001'],
    personIds: ['person-010'],
    organizationIds: ['org-004'],
    locationIds: ['loc-005'],
    eventIds: ['event-005'],
    documentIds: ['doc-007']
  },

  // Worker conditions narrative sub-narratives
  {
    id: 'sub-006',
    text: 'Employees share videos of being alone in departments meant for multiple workers',
    description: 'Current Walmart employees are posting TikTok videos showing them working alone in departments typically staffed by multiple people. Videos often show long lines of waiting customers while single workers struggle to keep up.',
    parentNarrativeId: 'narr-003',
    sentiment: -0.78,
    tagIds: ['tag-004'],
    personIds: ['person-003', 'person-004'],
    organizationIds: ['org-001'],
    locationIds: ['loc-001', 'loc-006'],
    eventIds: ['event-006'],
    documentIds: ['doc-008', 'doc-009']
  },
  {
    id: 'sub-007',
    text: 'UFCW launches #RespectWalmartWorkers campaign amplifying employee stories',
    description: 'The United Food and Commercial Workers union has launched a coordinated campaign amplifying worker stories under the hashtag #RespectWalmartWorkers. The campaign is gaining traction as it connects with broader labor movement messaging.',
    parentNarrativeId: 'narr-003',
    sentiment: -0.72,
    tagIds: ['tag-002'],
    personIds: ['person-005'],
    organizationIds: ['org-005', 'org-006'],
    locationIds: ['loc-007'],
    eventIds: ['event-007'],
    documentIds: ['doc-010']
  },
  {
    id: 'sub-008',
    text: 'Walmart responds highlighting $14 minimum wage and associate benefits',
    description: 'Walmart corporate communications has responded to worker complaints by highlighting its $14 minimum wage, associate stock purchase program, and healthcare benefits. Industry analysts view this as a defensive PR move.',
    parentNarrativeId: 'narr-003',
    sentiment: 0.25,
    tagIds: ['tag-003'],
    personIds: ['person-001'],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: ['event-008'],
    documentIds: ['doc-011', 'doc-048']
  },

  // Great Value recall sub-narratives
  {
    id: 'sub-009',
    text: 'FDA expands Great Value recall to 15 products across multiple categories',
    description: 'The FDA has expanded its recall of Walmart\'s Great Value brand products to include 15 items across frozen vegetables, canned goods, and dairy. Testing revealed potential bacterial contamination at a supplier facility.',
    parentNarrativeId: 'narr-004',
    sentiment: -0.85,
    tagIds: ['tag-004'],
    personIds: ['person-006', 'person-007'],
    organizationIds: ['org-001', 'org-007'],
    locationIds: ['loc-008'],
    eventIds: ['event-009'],
    documentIds: ['doc-012', 'doc-013']
  },
  {
    id: 'sub-010',
    text: 'Consumer Reports demands stricter quality controls on private-label products',
    description: 'Consumer Reports has published an editorial demanding stricter quality controls on private-label store brands, citing the Great Value recall as evidence of systemic issues in cost-cutting measures by major retailers.',
    parentNarrativeId: 'narr-004',
    sentiment: -0.68,
    tagIds: ['tag-002'],
    personIds: [],
    organizationIds: ['org-008'],
    locationIds: [],
    eventIds: ['event-010'],
    documentIds: ['doc-014']
  },

  // Pricing narrative sub-narratives
  {
    id: 'sub-011',
    text: 'TikTok price comparison videos show Walmart losing to Aldi on staples',
    description: 'A trend of TikTok price comparison videos shows Walmart losing to discount competitors like Aldi on everyday staples. Creators document item-by-item comparisons showing 15-25% price differences on common groceries.',
    parentNarrativeId: 'narr-005',
    sentiment: -0.65,
    tagIds: ['tag-005'],
    personIds: ['person-011'],
    organizationIds: ['org-001', 'org-009'],
    locationIds: ['loc-009'],
    eventIds: [],
    documentIds: ['doc-015', 'doc-016']
  },
  {
    id: 'sub-012',
    text: 'WSJ analysis shows Walmart retained pandemic-era price increases',
    description: 'A Wall Street Journal analysis found Walmart has retained many pandemic-era price increases despite supply chain normalization and declining wholesale costs. The report suggests margins have expanded while consumer prices remain elevated.',
    parentNarrativeId: 'narr-005',
    sentiment: -0.55,
    tagIds: ['tag-001'],
    personIds: [],
    organizationIds: ['org-001', 'org-010'],
    locationIds: [],
    eventIds: [],
    documentIds: ['doc-017']
  },

  // Competitor pressure sub-narratives
  {
    id: 'sub-013',
    text: 'Target achieves 98% on-time delivery rate, leading industry metrics',
    description: 'Target reported achieving a 98% on-time delivery rate for online orders, significantly outperforming Walmart\'s reported 89% rate. Analysts credit Target\'s investments in local fulfillment infrastructure.',
    parentNarrativeId: 'narr-006',
    sentiment: 0.45,
    tagIds: ['tag-006'],
    personIds: ['person-012'],
    organizationIds: ['org-003'],
    locationIds: [],
    eventIds: ['event-011'],
    documentIds: ['doc-018']
  },
  {
    id: 'sub-014',
    text: 'Amazon expands sub-24-hour delivery to 85% of US households',
    description: 'Amazon announced expansion of its sub-24-hour delivery service to cover 85% of US households, putting pressure on Walmart\'s same-day delivery capabilities. The expansion leverages Amazon\'s growing network of regional fulfillment centers.',
    parentNarrativeId: 'narr-006',
    sentiment: 0.52,
    tagIds: ['tag-006'],
    personIds: ['person-013'],
    organizationIds: ['org-004'],
    locationIds: [],
    eventIds: ['event-012'],
    documentIds: ['doc-019', 'doc-020']
  },

  // Rural closure sub-narratives
  {
    id: 'sub-015',
    text: 'Missouri town faces "food desert" designation after Walmart closure announcement',
    description: 'A rural Missouri town faces potential USDA "food desert" designation following Walmart\'s announcement to close its only store within 25 miles. Local officials warn residents will need to travel over an hour for fresh groceries.',
    parentNarrativeId: 'narr-007',
    sentiment: -0.78,
    tagIds: ['tag-004'],
    personIds: ['person-014'],
    organizationIds: ['org-001'],
    locationIds: ['loc-010'],
    eventIds: ['event-013'],
    documentIds: ['doc-021', 'doc-022']
  },
  {
    id: 'sub-016',
    text: 'Local politicians call on Walmart to maintain stores as community obligation',
    description: 'Local and state politicians are calling on Walmart to maintain rural stores as a "community obligation," arguing the company benefited from tax incentives and drove out competitors when opening these locations.',
    parentNarrativeId: 'narr-007',
    sentiment: -0.58,
    tagIds: ['tag-001'],
    personIds: ['person-014'],
    organizationIds: ['org-011'],
    locationIds: ['loc-010', 'loc-011'],
    eventIds: ['event-014'],
    documentIds: ['doc-023']
  },
  {
    id: 'sub-017',
    text: 'Great Value supplier labor and safety violations exposed',
    description: 'Investigation reveals unsafe working conditions and labor violations at factories producing Walmart\'s Great Value private-label products. Workers describe long hours, inadequate safety equipment, and pressure to meet production quotas.',
    parentNarrativeId: 'narr-008',
    sentiment: -0.68,
    tagIds: ['tag-004'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-006'],
    eventIds: ['event-015'],
    documentIds: ['doc-024', 'doc-025']
  },
  {
    id: 'sub-018',
    text: 'FTC investigates retail supply chain practices',
    description: 'The Federal Trade Commission opens an inquiry into Walmart\'s supply chain practices, examining whether the company\'s price pressures contribute to supplier labor violations. Consumer advocacy groups call for greater transparency in private-label sourcing.',
    parentNarrativeId: 'narr-008',
    sentiment: -0.45,
    tagIds: ['tag-002'],
    personIds: ['person-022'],
    organizationIds: ['org-018', 'org-001'],
    locationIds: ['loc-006'],
    eventIds: ['event-016'],
    documentIds: ['doc-025', 'doc-026']
  },
  {
    id: 'sub-019',
    text: 'Fulfillment center workers organize for union representation',
    description: 'Workers at Walmart e-commerce fulfillment centers in Texas and Georgia file for union elections, citing concerns about working conditions, scheduling, and wages. Labor organizers from RWDSU provide support and training.',
    parentNarrativeId: 'narr-009',
    sentiment: 0.55,
    tagIds: ['tag-003'],
    personIds: ['person-020', 'person-025'],
    organizationIds: ['org-016', 'org-006'],
    locationIds: ['loc-011', 'loc-003'],
    eventIds: ['event-017', 'event-020', 'event-026'],
    documentIds: ['doc-027', 'doc-028', 'doc-033', 'doc-035', 'doc-046', 'doc-048']
  },
  {
    id: 'sub-020',
    text: 'Walmart responds to union organizing efforts',
    description: 'Walmart deploys its traditional anti-union playbook, holding mandatory meetings and warning workers about union dues. A Dallas facility votes against unionization in September, but an Atlanta center succeeds in January 2026. Walmart announces new worker benefits in response.',
    parentNarrativeId: 'narr-009',
    sentiment: -0.42,
    tagIds: ['tag-005'],
    personIds: ['person-020'],
    organizationIds: ['org-001', 'org-016'],
    locationIds: ['loc-011', 'loc-003'],
    eventIds: ['event-019'],
    documentIds: ['doc-028', 'doc-032', 'doc-034', 'doc-047']
  },
  {
    id: 'sub-021',
    text: 'Walmart Health expands into underserved rural communities',
    description: 'Walmart Health opens 15 new clinics in rural communities that have lost hospitals or lack adequate healthcare access. The clinics offer primary care, dental, and mental health services at prices 40% below market rates.',
    parentNarrativeId: 'narr-010',
    sentiment: 0.52,
    tagIds: ['tag-003'],
    personIds: ['person-023'],
    organizationIds: ['org-019'],
    locationIds: ['loc-009', 'loc-010'],
    eventIds: ['event-018', 'event-021'],
    documentIds: ['doc-029', 'doc-030', 'doc-036', 'doc-037']
  },
  {
    id: 'sub-022',
    text: 'Debate over corporate healthcare in rural America',
    description: 'The expansion of Walmart Health sparks debate about corporate healthcare replacing community institutions. Supporters argue any healthcare is better than none, while critics worry about profit motives and the erosion of public health infrastructure.',
    parentNarrativeId: 'narr-010',
    sentiment: 0.15,
    tagIds: ['tag-005'],
    personIds: [],
    organizationIds: ['org-019', 'org-021'],
    locationIds: ['loc-009'],
    eventIds: [],
    documentIds: ['doc-030', 'doc-031', 'doc-037']
  },
  {
    id: 'sub-023',
    text: 'Holiday season delivery system failures',
    description: 'Walmart\'s delivery system buckles under Black Friday demand, leaving thousands of customers without their holiday orders. Social media fills with complaints about late deliveries, lost packages, and poor customer service responses.',
    parentNarrativeId: 'narr-011',
    sentiment: -0.72,
    tagIds: ['tag-004'],
    personIds: ['person-018', 'person-019'],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    eventIds: ['event-022', 'event-023'],
    documentIds: ['doc-038', 'doc-039', 'doc-040', 'doc-041', 'doc-043', 'doc-045']
  },
  {
    id: 'sub-024',
    text: 'Consumer backlash and regulatory scrutiny over delivery promises',
    description: 'Consumer advocacy groups file FTC complaints alleging Walmart made delivery promises it couldn\'t keep. The company announces a $500 million infrastructure investment, but analysts question whether it can restore customer trust.',
    parentNarrativeId: 'narr-011',
    sentiment: -0.55,
    tagIds: ['tag-002'],
    personIds: ['person-007', 'person-022'],
    organizationIds: ['org-008', 'org-018'],
    locationIds: ['loc-006'],
    eventIds: ['event-024', 'event-025'],
    documentIds: ['doc-040', 'doc-042', 'doc-043', 'doc-044']
  }
];
