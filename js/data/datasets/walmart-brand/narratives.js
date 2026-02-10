/**
 * Narratives for Walmart Brand dataset
 */

export const narratives = [
  {
    id: 'narr-001',
    text: 'Self-checkout frustrations spark viral complaints about theft accusations and customer treatment',
    description: 'A wave of customer complaints has gone viral on social media after multiple incidents where Walmart customers were stopped, searched, or accused of theft at self-checkout stations. Videos show confrontations between customers and loss prevention staff, with many customers claiming they were humiliated despite having receipts. The controversy intensified after a class-action lawsuit was filed in Texas alleging systematic false detention of customers. Walmart has defended its loss prevention practices while announcing plans to add more staffed checkout lanes in select stores.',
    missionId: 'mission-001',
    sentiment: -0.68,
    tagIds: ['tag-002'],
    themeIds: ['sub-001', 'sub-002', 'sub-003'],
    publisherVolumes: {
      'pub-tiktok': { volume: 385, sentiment: -0.75 },
      'pub-x': { volume: 295, sentiment: -0.68 },
      'pub-reddit': { volume: 185, sentiment: -0.72 },
      'pub-facebook': { volume: 145, sentiment: -0.65 },
      'pub-trustpilot': { volume: 95, sentiment: -0.78 },
      'pub-localnews': { volume: 65, sentiment: -0.45 },
      'pub-usatoday': { volume: 42, sentiment: -0.38 }
    },
    personIds: ['person-001', 'person-002', 'person-008'],
    organizationIds: ['org-001', 'org-002'],
    locationIds: ['loc-002', 'loc-003'],
    eventIds: ['event-001', 'event-002', 'event-003'],
    volumeOverTime: [
      { date: '2026-01-14', publisherVolumes: { 'pub-tiktok': 72, 'pub-x': 55, 'pub-reddit': 35, 'pub-facebook': 28 } },
      { date: '2026-01-15', publisherVolumes: { 'pub-tiktok': 115, 'pub-x': 85, 'pub-reddit': 55, 'pub-facebook': 42 } },
      { date: '2026-01-16', publisherVolumes: { 'pub-tiktok': 165, 'pub-x': 125, 'pub-reddit': 78, 'pub-facebook': 62 } },
      { date: '2026-01-17', publisherVolumes: { 'pub-tiktok': 245, 'pub-x': 185, 'pub-reddit': 115, 'pub-facebook': 92 } },
      { date: '2026-01-18', publisherVolumes: { 'pub-tiktok': 315, 'pub-x': 235, 'pub-reddit': 148, 'pub-facebook': 118 } },
      { date: '2026-01-19', publisherVolumes: { 'pub-tiktok': 358, 'pub-x': 272, 'pub-reddit': 168, 'pub-facebook': 135 } },
      { date: '2026-01-20', publisherVolumes: { 'pub-tiktok': 385, 'pub-x': 295, 'pub-reddit': 185, 'pub-facebook': 145 } }
    ],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
    createdAt: '2026-01-14T00:00:00Z'
  },
  {
    id: 'narr-002',
    text: 'Widespread reports of empty shelves and out-of-stock items frustrate Walmart shoppers',
    description: 'Customers across multiple states are reporting persistent empty shelves and out-of-stock items at Walmart stores, particularly in grocery and household essentials. Social media posts show bare aisles, with some customers driving to multiple locations without finding needed products. Walmart has attributed the issues to supply chain disruptions and regional distribution challenges, but retail analysts note the company\'s inventory management system may need significant upgrades. The complaints come as competitors like Target report improved in-stock rates.',
    missionId: 'mission-002',
    sentiment: -0.55,
    tagIds: ['tag-001'],
    themeIds: ['sub-004', 'sub-005'],
    publisherVolumes: {
      'pub-x': { volume: 225, sentiment: -0.62 },
      'pub-facebook': { volume: 185, sentiment: -0.68 },
      'pub-reddit': { volume: 145, sentiment: -0.58 },
      'pub-trustpilot': { volume: 85, sentiment: -0.75 },
      'pub-yelp': { volume: 72, sentiment: -0.72 },
      'pub-retaildive': { volume: 45, sentiment: -0.28 },
      'pub-wsj': { volume: 38, sentiment: -0.22 }
    },
    personIds: ['person-001', 'person-009', 'person-010'],
    organizationIds: ['org-001', 'org-003', 'org-004'],
    locationIds: ['loc-001', 'loc-004', 'loc-005'],
    eventIds: ['event-004', 'event-005'],
    volumeOverTime: [
      { date: '2026-01-15', publisherVolumes: { 'pub-x': 78, 'pub-facebook': 62, 'pub-reddit': 48 } },
      { date: '2026-01-16', publisherVolumes: { 'pub-x': 118, 'pub-facebook': 95, 'pub-reddit': 75 } },
      { date: '2026-01-17', publisherVolumes: { 'pub-x': 158, 'pub-facebook': 128, 'pub-reddit': 102 } },
      { date: '2026-01-18', publisherVolumes: { 'pub-x': 192, 'pub-facebook': 155, 'pub-reddit': 125 } },
      { date: '2026-01-19', publisherVolumes: { 'pub-x': 225, 'pub-facebook': 185, 'pub-reddit': 145 } }
    ],
    documentIds: ['doc-005', 'doc-006', 'doc-007'],
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'narr-003',
    text: 'Walmart workers share stories of understaffing and poor working conditions on social media',
    description: 'Current and former Walmart employees are sharing videos and posts detailing challenging working conditions, including understaffing, mandatory overtime, and inconsistent scheduling. The hashtag #WalmartWorkers has gained traction on TikTok with over 50 million views. Workers describe being responsible for multiple departments simultaneously while customers complain about lack of assistance. Labor advocates are amplifying these stories, calling for improved wages and working conditions. Walmart has responded by highlighting its $14 minimum wage and associate benefits.',
    missionId: 'mission-001',
    sentiment: -0.62,
    tagIds: ['tag-002'],
    themeIds: ['sub-006', 'sub-007', 'sub-008'],
    publisherVolumes: {
      'pub-tiktok': { volume: 345, sentiment: -0.72 },
      'pub-reddit': { volume: 285, sentiment: -0.75 },
      'pub-x': { volume: 195, sentiment: -0.65 },
      'pub-facebook': { volume: 125, sentiment: -0.58 },
      'pub-bloomberg': { volume: 55, sentiment: -0.35 },
      'pub-wsj': { volume: 48, sentiment: -0.28 },
      'pub-reuters': { volume: 42, sentiment: -0.22 }
    },
    personIds: ['person-003', 'person-004', 'person-005'],
    organizationIds: ['org-001', 'org-005', 'org-006'],
    locationIds: ['loc-001', 'loc-006'],
    eventIds: ['event-006', 'event-007'],
    volumeOverTime: [
      { date: '2026-01-13', publisherVolumes: { 'pub-tiktok': 92, 'pub-reddit': 75, 'pub-x': 52 } },
      { date: '2026-01-14', publisherVolumes: { 'pub-tiktok': 145, 'pub-reddit': 118, 'pub-x': 82 } },
      { date: '2026-01-15', publisherVolumes: { 'pub-tiktok': 198, 'pub-reddit': 165, 'pub-x': 115 } },
      { date: '2026-01-16', publisherVolumes: { 'pub-tiktok': 252, 'pub-reddit': 208, 'pub-x': 145 } },
      { date: '2026-01-17', publisherVolumes: { 'pub-tiktok': 302, 'pub-reddit': 248, 'pub-x': 172 } },
      { date: '2026-01-18', publisherVolumes: { 'pub-tiktok': 345, 'pub-reddit': 285, 'pub-x': 195 } }
    ],
    documentIds: ['doc-008', 'doc-009', 'doc-010', 'doc-011'],
    createdAt: '2026-01-13T00:00:00Z'
  },
  {
    id: 'narr-004',
    text: 'Great Value brand recall expands after contamination found in multiple products',
    description: 'The FDA has expanded a recall of Walmart\'s Great Value brand products after discovering potential Listeria contamination in frozen vegetables and salad mixes. The recall now covers 15 product SKUs sold across all 50 states. Three hospitalizations have been linked to the contamination, though no deaths have been reported. Consumer advocacy groups are calling for stricter quality controls on private-label products. Walmart has issued refunds and launched an internal investigation into its supplier network.',
    missionId: 'mission-003',
    sentiment: -0.72,
    tagIds: ['tag-002'],
    themeIds: ['sub-009', 'sub-010'],
    publisherVolumes: {
      'pub-localnews': { volume: 185, sentiment: -0.68 },
      'pub-usatoday': { volume: 125, sentiment: -0.62 },
      'pub-reuters': { volume: 98, sentiment: -0.55 },
      'pub-ap': { volume: 88, sentiment: -0.52 },
      'pub-x': { volume: 165, sentiment: -0.72 },
      'pub-facebook': { volume: 145, sentiment: -0.75 },
      'pub-consumeraffairs': { volume: 95, sentiment: -0.82 }
    },
    personIds: ['person-006', 'person-007', 'person-011'],
    organizationIds: ['org-001', 'org-007', 'org-008', 'org-009'],
    locationIds: ['loc-001', 'loc-007'],
    eventIds: ['event-008', 'event-009', 'event-010'],
    volumeOverTime: [
      { date: '2026-01-16', publisherVolumes: { 'pub-localnews': 45, 'pub-usatoday': 32, 'pub-x': 42 } },
      { date: '2026-01-17', publisherVolumes: { 'pub-localnews': 92, 'pub-usatoday': 65, 'pub-x': 85, 'pub-reuters': 48 } },
      { date: '2026-01-18', publisherVolumes: { 'pub-localnews': 142, 'pub-usatoday': 98, 'pub-x': 128, 'pub-reuters': 75 } },
      { date: '2026-01-19', publisherVolumes: { 'pub-localnews': 168, 'pub-usatoday': 115, 'pub-x': 152, 'pub-reuters': 88 } },
      { date: '2026-01-20', publisherVolumes: { 'pub-localnews': 185, 'pub-usatoday': 125, 'pub-x': 165, 'pub-reuters': 98 } }
    ],
    documentIds: ['doc-012', 'doc-013', 'doc-014'],
    createdAt: '2026-01-16T00:00:00Z'
  },
  {
    id: 'narr-005',
    text: 'Customers complain Walmart prices no longer competitive as inflation pricing sticks',
    description: 'Social media discussions and consumer surveys indicate growing perception that Walmart\'s prices are no longer significantly lower than competitors. Analysis shows Walmart retained pandemic-era price increases on many items even as wholesale costs declined. The narrative has intensified after viral TikTok videos showed price comparisons between Walmart, Aldi, and Amazon showing Walmart losing on several staple items. Retail analysts note this threatens Walmart\'s core brand promise of "Everyday Low Prices."',
    missionId: 'mission-002',
    sentiment: -0.58,
    tagIds: ['tag-001'],
    themeIds: ['sub-011', 'sub-012'],
    publisherVolumes: {
      'pub-tiktok': { volume: 225, sentiment: -0.65 },
      'pub-x': { volume: 185, sentiment: -0.58 },
      'pub-reddit': { volume: 145, sentiment: -0.62 },
      'pub-facebook': { volume: 95, sentiment: -0.55 },
      'pub-wsj': { volume: 52, sentiment: -0.35 },
      'pub-bloomberg': { volume: 45, sentiment: -0.32 },
      'pub-retaildive': { volume: 38, sentiment: -0.28 }
    },
    personIds: ['person-001', 'person-010', 'person-012'],
    organizationIds: ['org-001', 'org-010', 'org-011'],
    locationIds: ['loc-001'],
    eventIds: ['event-011'],
    volumeOverTime: [
      { date: '2026-01-17', publisherVolumes: { 'pub-tiktok': 75, 'pub-x': 62, 'pub-reddit': 48 } },
      { date: '2026-01-18', publisherVolumes: { 'pub-tiktok': 138, 'pub-x': 115, 'pub-reddit': 92 } },
      { date: '2026-01-19', publisherVolumes: { 'pub-tiktok': 185, 'pub-x': 155, 'pub-reddit': 122 } },
      { date: '2026-01-20', publisherVolumes: { 'pub-tiktok': 225, 'pub-x': 185, 'pub-reddit': 145 } }
    ],
    documentIds: ['doc-015', 'doc-016', 'doc-017'],
    createdAt: '2026-01-17T00:00:00Z'
  },
  {
    id: 'narr-006',
    text: 'Target and Amazon gain ground with faster delivery, putting pressure on Walmart',
    description: 'Retail analysts report Target\'s same-day delivery service has achieved 98% on-time delivery rates, while Amazon continues expanding its sub-24-hour delivery coverage. Walmart\'s delivery service has faced criticism for delays, substitutions, and quality issues with grocery items. Consumer sentiment surveys show a 12-point swing toward competitors for online grocery orders. Walmart has announced a $1.5 billion investment in delivery infrastructure, but analysts question if it\'s enough to close the gap.',
    missionId: 'mission-004',
    sentiment: -0.42,
    tagIds: ['tag-003'],
    themeIds: ['sub-013', 'sub-014'],
    publisherVolumes: {
      'pub-retaildive': { volume: 125, sentiment: -0.28 },
      'pub-modernretail': { volume: 98, sentiment: -0.32 },
      'pub-wsj': { volume: 85, sentiment: -0.25 },
      'pub-bloomberg': { volume: 78, sentiment: -0.22 },
      'pub-x': { volume: 165, sentiment: -0.45 },
      'pub-reddit': { volume: 125, sentiment: 0.38 },
      'pub-tiktok': { volume: 95, sentiment: 0.42 }
    },
    personIds: ['person-001', 'person-013', 'person-014', 'person-015'],
    organizationIds: ['org-001', 'org-003', 'org-004', 'org-012'],
    locationIds: ['loc-001', 'loc-008'],
    eventIds: ['event-012', 'event-013'],
    volumeOverTime: [
      { date: '2026-01-14', publisherVolumes: { 'pub-retaildive': 42, 'pub-x': 55, 'pub-reddit': 42 } },
      { date: '2026-01-15', publisherVolumes: { 'pub-retaildive': 68, 'pub-x': 85, 'pub-reddit': 65 } },
      { date: '2026-01-16', publisherVolumes: { 'pub-retaildive': 92, 'pub-x': 115, 'pub-reddit': 88 } },
      { date: '2026-01-17', publisherVolumes: { 'pub-retaildive': 112, 'pub-x': 142, 'pub-reddit': 108 } },
      { date: '2026-01-18', publisherVolumes: { 'pub-retaildive': 125, 'pub-x': 165, 'pub-reddit': 125 } }
    ],
    documentIds: ['doc-018', 'doc-019', 'doc-020'],
    createdAt: '2026-01-14T00:00:00Z'
  },
  {
    id: 'narr-007',
    text: 'Rural community protests Walmart store closure, citing economic devastation',
    description: 'Residents of several small towns across the Midwest and South are protesting Walmart\'s decision to close underperforming stores, arguing the closures will devastate local economies. In many of these communities, Walmart had previously driven out local retailers, leaving residents with no nearby shopping options. Local politicians are calling for Walmart to maintain stores as community obligations. The narrative intersects with broader discussions about corporate responsibility to rural America.',
    missionId: 'mission-001',
    sentiment: -0.65,
    tagIds: ['tag-001'],
    themeIds: ['sub-015', 'sub-016'],
    publisherVolumes: {
      'pub-localnews': { volume: 225, sentiment: -0.65 },
      'pub-facebook': { volume: 185, sentiment: -0.72 },
      'pub-x': { volume: 125, sentiment: -0.58 },
      'pub-usatoday': { volume: 65, sentiment: -0.45 },
      'pub-wsj': { volume: 42, sentiment: -0.28 },
      'pub-ap': { volume: 38, sentiment: -0.32 }
    },
    personIds: ['person-001', 'person-016', 'person-017'],
    organizationIds: ['org-001', 'org-013'],
    locationIds: ['loc-009', 'loc-010'],
    eventIds: ['event-014'],
    volumeOverTime: [
      { date: '2026-01-18', publisherVolumes: { 'pub-localnews': 75, 'pub-facebook': 62, 'pub-x': 42 } },
      { date: '2026-01-19', publisherVolumes: { 'pub-localnews': 148, 'pub-facebook': 122, 'pub-x': 82 } },
      { date: '2026-01-20', publisherVolumes: { 'pub-localnews': 225, 'pub-facebook': 185, 'pub-x': 125 } }
    ],
    documentIds: ['doc-021', 'doc-022', 'doc-023'],
    createdAt: '2026-01-18T00:00:00Z'
  },
  {
    id: 'narr-008',
    text: 'Walmart faces scrutiny over Great Value supplier practices',
    description: 'An investigation reveals labor and safety violations at suppliers producing Walmart\'s Great Value private-label products. The FTC opens an inquiry into Walmart\'s supply chain oversight, while consumer advocacy groups call for greater transparency. Walmart pledges to audit suppliers and improve monitoring, but critics argue the company\'s price pressures create conditions for worker exploitation.',
    missionId: 'mission-003',
    sentiment: -0.58,
    tagIds: ['tag-002'],
    themeIds: ['sub-017', 'sub-018'],
    publisherVolumes: {
      'pub-reuters': { volume: 85, sentiment: -0.52 },
      'pub-wsj': { volume: 72, sentiment: -0.48 },
      'pub-bloomberg': { volume: 65, sentiment: -0.45 },
      'pub-x': { volume: 115, sentiment: -0.62 }
    },
    personIds: ['person-022'],
    organizationIds: ['org-001', 'org-018'],
    locationIds: ['loc-006'],
    eventIds: ['event-015', 'event-016'],
    volumeOverTime: [
      { date: '2025-06-15', publisherVolumes: { 'pub-reuters': 25, 'pub-x': 35 } },
      { date: '2025-06-22', publisherVolumes: { 'pub-reuters': 45, 'pub-wsj': 38, 'pub-x': 62 } },
      { date: '2025-07-01', publisherVolumes: { 'pub-reuters': 68, 'pub-wsj': 58, 'pub-bloomberg': 52, 'pub-x': 92 } },
      { date: '2025-07-15', publisherVolumes: { 'pub-reuters': 85, 'pub-wsj': 72, 'pub-bloomberg': 65, 'pub-x': 115 } }
    ],
    documentIds: ['doc-024', 'doc-025', 'doc-026'],
    createdAt: '2025-06-15T00:00:00Z'
  },
  {
    id: 'narr-009',
    text: 'E-commerce fulfillment center workers push for unionization',
    description: 'Workers at Walmart\'s e-commerce fulfillment centers launch organizing campaigns, seeking union representation. A Dallas facility votes on unionization in September 2025 but falls short, while an Atlanta center succeeds in January 2026 - marking the first successful Walmart warehouse union. Labor advocates celebrate the breakthrough while Walmart announces new worker benefits in response.',
    missionId: 'mission-001',
    sentiment: 0.35,
    tagIds: ['tag-003'],
    themeIds: ['sub-019', 'sub-020'],
    publisherVolumes: {
      'pub-reuters': { volume: 95, sentiment: 0.35 },
      'pub-ap': { volume: 85, sentiment: 0.32 },
      'pub-usatoday': { volume: 75, sentiment: 0.28 },
      'pub-wsj': { volume: 68, sentiment: -0.25 },
      'pub-x': { volume: 145, sentiment: 0.55 },
      'pub-tiktok': { volume: 125, sentiment: 0.65 }
    },
    personIds: ['person-020', 'person-021', 'person-025'],
    organizationIds: ['org-001', 'org-016', 'org-017', 'org-006'],
    locationIds: ['loc-011', 'loc-003'],
    eventIds: ['event-017', 'event-019', 'event-020', 'event-026'],
    volumeOverTime: [
      { date: '2025-07-20', publisherVolumes: { 'pub-ap': 25, 'pub-x': 42 } },
      { date: '2025-09-15', publisherVolumes: { 'pub-reuters': 52, 'pub-ap': 48, 'pub-x': 85 } },
      { date: '2025-10-01', publisherVolumes: { 'pub-reuters': 72, 'pub-ap': 65, 'pub-usatoday': 52, 'pub-x': 115 } },
      { date: '2026-01-10', publisherVolumes: { 'pub-reuters': 95, 'pub-ap': 85, 'pub-usatoday': 75, 'pub-wsj': 68, 'pub-x': 145 } }
    ],
    documentIds: ['doc-027', 'doc-028', 'doc-032', 'doc-033', 'doc-034', 'doc-035', 'doc-046', 'doc-047', 'doc-048'],
    createdAt: '2025-07-20T00:00:00Z'
  },
  {
    id: 'narr-010',
    text: 'Walmart expands healthcare services amid rural hospital closures',
    description: 'As rural hospitals continue to close across America, Walmart Health expands its clinic network into underserved communities. The company opens 15 new clinics in October 2025, offering primary care, dental, and mental health services. Supporters praise the expansion as filling a critical gap, while critics worry about corporate healthcare replacing community institutions.',
    missionId: 'mission-001',
    sentiment: 0.35,
    tagIds: ['tag-003'],
    themeIds: ['sub-021', 'sub-022'],
    publisherVolumes: {
      'pub-localnews': { volume: 145, sentiment: 0.48 },
      'pub-wsj': { volume: 75, sentiment: 0.42 },
      'pub-ap': { volume: 65, sentiment: 0.38 },
      'pub-consumeraffairs': { volume: 55, sentiment: 0.25 },
      'pub-x': { volume: 95, sentiment: 0.52 }
    },
    personIds: ['person-023'],
    organizationIds: ['org-001', 'org-019', 'org-021'],
    locationIds: ['loc-001', 'loc-009', 'loc-010'],
    eventIds: ['event-018', 'event-021'],
    volumeOverTime: [
      { date: '2025-08-05', publisherVolumes: { 'pub-wsj': 25, 'pub-localnews': 42 } },
      { date: '2025-08-25', publisherVolumes: { 'pub-wsj': 42, 'pub-localnews': 72, 'pub-consumeraffairs': 32 } },
      { date: '2025-10-15', publisherVolumes: { 'pub-wsj': 58, 'pub-localnews': 108, 'pub-ap': 48, 'pub-x': 72 } },
      { date: '2025-10-25', publisherVolumes: { 'pub-wsj': 75, 'pub-localnews': 145, 'pub-ap': 65, 'pub-x': 95 } }
    ],
    documentIds: ['doc-029', 'doc-030', 'doc-031', 'doc-036', 'doc-037'],
    createdAt: '2025-08-05T00:00:00Z'
  },
  {
    id: 'narr-011',
    text: 'Holiday season delivery failures damage Walmart reputation',
    description: 'Walmart\'s delivery system fails during the critical Black Friday to Christmas period, leaving thousands of customers without their holiday orders. The company apologizes and announces a $500 million infrastructure investment, but damage to its reputation lingers. Consumer groups file FTC complaints, and competitors gain ground as customers switch to more reliable alternatives.',
    missionId: 'mission-004',
    sentiment: -0.65,
    tagIds: ['tag-002'],
    themeIds: ['sub-023', 'sub-024'],
    publisherVolumes: {
      'pub-wsj': { volume: 95, sentiment: -0.55 },
      'pub-reuters': { volume: 85, sentiment: -0.48 },
      'pub-bloomberg': { volume: 78, sentiment: -0.52 },
      'pub-retaildive': { volume: 72, sentiment: -0.45 },
      'pub-x': { volume: 245, sentiment: -0.72 },
      'pub-tiktok': { volume: 185, sentiment: -0.78 },
      'pub-consumeraffairs': { volume: 95, sentiment: -0.82 }
    },
    personIds: ['person-001', 'person-018', 'person-019', 'person-007'],
    organizationIds: ['org-001', 'org-008', 'org-018', 'org-022'],
    locationIds: ['loc-001', 'loc-006'],
    eventIds: ['event-022', 'event-023', 'event-024', 'event-025'],
    volumeOverTime: [
      { date: '2025-11-29', publisherVolumes: { 'pub-wsj': 32, 'pub-x': 85, 'pub-tiktok': 62 } },
      { date: '2025-12-05', publisherVolumes: { 'pub-wsj': 62, 'pub-reuters': 52, 'pub-x': 165, 'pub-tiktok': 125 } },
      { date: '2025-12-15', publisherVolumes: { 'pub-wsj': 78, 'pub-reuters': 72, 'pub-consumeraffairs': 78, 'pub-x': 205, 'pub-tiktok': 155 } },
      { date: '2025-12-28', publisherVolumes: { 'pub-wsj': 88, 'pub-reuters': 82, 'pub-bloomberg': 72, 'pub-x': 235, 'pub-tiktok': 175 } },
      { date: '2026-01-02', publisherVolumes: { 'pub-wsj': 95, 'pub-reuters': 85, 'pub-bloomberg': 78, 'pub-x': 245, 'pub-tiktok': 185 } }
    ],
    documentIds: ['doc-038', 'doc-039', 'doc-040', 'doc-041', 'doc-042', 'doc-043', 'doc-044', 'doc-045'],
    createdAt: '2025-11-29T00:00:00Z'
  }
];
