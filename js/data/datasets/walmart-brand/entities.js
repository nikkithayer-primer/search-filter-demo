/**
 * Persons and organizations for Walmart Brand dataset
 */

export const persons = [
  // Walmart Leadership
  {
    id: 'person-001',
    name: 'Doug McMillon',
    description: 'President and CEO of Walmart Inc. since 2014, Doug McMillon has led the company through its e-commerce transformation and faces mounting criticism over self-checkout policies, labor practices, and holiday delivery failures. He has publicly apologized for service disruptions while defending the company\'s operational decisions.',
    type: 'executive',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/walmart/person-001.png',
    tagIds: ['tag-004'],
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-003'],
    documentIds: ['doc-004', 'doc-011', 'doc-023'],
    factionSentiment: {
      'faction-001': -0.72,
      'faction-002': -0.45,
      'faction-003': -0.68,
      'faction-004': -0.35,
      'faction-005': 0.42,
      'faction-006': -0.25
    }
  },
  {
    id: 'person-002',
    name: 'John Furner',
    description: 'President and CEO of Walmart U.S., overseeing the company\'s domestic retail operations including over 4,700 stores. Furner has been central to decisions on self-checkout expansion, staffing levels, and the response to customer complaints.',
    type: 'executive',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/walmart/person-002.jpg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-003'],
    documentIds: ['doc-004'],
    factionSentiment: {
      'faction-001': -0.55,
      'faction-002': -0.38,
      'faction-003': -0.52,
      'faction-004': -0.28,
      'faction-005': 0.35,
      'faction-006': -0.18
    }
  },

  // Labor Advocates
  {
    id: 'person-003',
    name: 'Marc Perrone',
    description: 'International President of the United Food and Commercial Workers (UFCW), Marc Perrone has been a leading voice in the campaign to organize Walmart workers. He has spearheaded the #RespectWalmartWorkers campaign and advocated for improved wages, benefits, and working conditions at the retail giant.',
    type: 'labor_leader',
    affiliatedOrganizationId: 'org-005',
    imageUrl: 'img/entities/walmart/person-003.jpg',
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: ['event-007'],
    documentIds: ['doc-010'],
    factionSentiment: {
      'faction-001': 0.25,
      'faction-002': 0.85,
      'faction-003': 0.92,
      'faction-004': 0.45,
      'faction-005': 0.15,
      'faction-006': 0.10
    }
  },
  {
    id: 'person-004',
    name: 'Bianca Agustin',
    description: 'Corporate Accountability Director at United for Respect, a worker advocacy organization. Agustin has been instrumental in amplifying Walmart worker stories and coordinating campaigns for improved working conditions at the retail giant.',
    type: 'activist',
    affiliatedOrganizationId: 'org-006',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: ['event-007'],
    documentIds: ['doc-010'],
    factionSentiment: {
      'faction-001': 0.35,
      'faction-002': 0.78,
      'faction-003': 0.88,
      'faction-004': 0.55,
      'faction-005': 0.08,
      'faction-006': 0.12
    }
  },
  {
    id: 'person-005',
    name: 'Anonymous Walmart Associate',
    description: 'A current Walmart employee whose viral TikTok video showing understaffed store conditions garnered over 5 million views, sparking widespread discussion about working conditions at the company.',
    type: 'employee',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: [],
    relatedEventIds: ['event-006'],
    documentIds: ['doc-008'],
    factionSentiment: {
      'faction-001': 0.55,
      'faction-002': 0.95,
      'faction-003': 0.72,
      'faction-004': 0.35,
      'faction-005': -0.05,
      'faction-006': 0.15
    }
  },

  // Regulators
  {
    id: 'person-006',
    name: 'Robert Califf',
    description: 'Commissioner of the U.S. Food and Drug Administration (FDA). Califf has overseen the agency\'s response to the Great Value product recall and called for stricter quality controls on private-label food products.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-007',
    imageUrl: 'img/entities/walmart/person-006.jpg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-007'],
    relatedEventIds: ['event-008', 'event-009'],
    documentIds: ['doc-012', 'doc-013'],
    factionSentiment: {
      'faction-001': 0.15,
      'faction-002': 0.10,
      'faction-003': 0.05,
      'faction-004': 0.68,
      'faction-005': 0.25,
      'faction-006': 0.02
    }
  },

  // Consumer Advocates
  {
    id: 'person-007',
    name: 'Marta Tellado',
    description: 'President and CEO of Consumer Reports, the influential nonprofit consumer advocacy organization. Tellado has led calls for stricter quality standards for private-label products following the Great Value recall.',
    type: 'activist',
    affiliatedOrganizationId: 'org-008',
    imageUrl: 'img/entities/walmart/person-007.jpg',
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-004'],
    relatedLocationIds: [],
    relatedEventIds: ['event-010'],
    documentIds: ['doc-014'],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-002': 0.45,
      'faction-003': 0.58,
      'faction-004': 0.95,
      'faction-005': 0.32,
      'faction-006': 0.18
    }
  },
  {
    id: 'person-008',
    name: 'Thomas Merton',
    description: 'Lead attorney at Merton & Associates representing plaintiffs in the class-action lawsuit against Walmart over self-checkout detention practices. Merton has filed suit on behalf of over 500 customers.',
    type: 'legal_professional',
    affiliatedOrganizationId: 'org-002',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-002', 'loc-003'],
    relatedEventIds: ['event-002'],
    documentIds: ['doc-003'],
    factionSentiment: {
      'faction-001': 0.88,
      'faction-002': 0.35,
      'faction-003': 0.42,
      'faction-004': 0.65,
      'faction-005': 0.22,
      'faction-006': 0.08
    }
  },

  // Corporate/Other
  {
    id: 'person-009',
    name: 'Judith McKenna',
    description: 'Former President and CEO of Walmart International, responsible for the company\'s operations outside the United States including supply chain and international retail strategy.',
    type: 'executive',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/walmart/person-009.png',
    tagIds: ['tag-006'],
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-001': -0.48,
      'faction-002': -0.32,
      'faction-003': -0.45,
      'faction-004': -0.22,
      'faction-005': 0.38,
      'faction-006': -0.15
    }
  },

  // Analysts
  {
    id: 'person-010',
    name: 'Oliver Chen',
    description: 'Senior equity analyst at TD Cowen covering retail and e-commerce. Chen has published influential research on Walmart\'s inventory management challenges and competitive positioning.',
    type: 'analyst',
    affiliatedOrganizationId: 'org-014',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: [],
    relatedEventIds: ['event-005'],
    documentIds: ['doc-007'],
    factionSentiment: {
      'faction-001': 0.10,
      'faction-002': 0.08,
      'faction-003': 0.05,
      'faction-004': 0.12,
      'faction-005': 0.85,
      'faction-006': 0.15
    }
  },
  {
    id: 'person-011',
    name: 'William Wallace',
    description: 'Policy advocate at Consumer Reports focused on product safety and retail accountability. Wallace has been outspoken about the need for stronger oversight of private-label food products.',
    type: 'activist',
    affiliatedOrganizationId: 'org-008',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-004'],
    relatedLocationIds: [],
    relatedEventIds: ['event-010'],
    documentIds: ['doc-014'],
    factionSentiment: {
      'faction-001': 0.65,
      'faction-002': 0.38,
      'faction-003': 0.48,
      'faction-004': 0.92,
      'faction-005': 0.28,
      'faction-006': 0.12
    }
  },
  {
    id: 'person-012',
    name: 'Sarah Nassauer',
    description: 'Senior reporter at The Wall Street Journal covering retail and Walmart. Nassauer has written extensively about Walmart\'s pricing strategies, delivery challenges, and competitive pressures.',
    type: 'journalist',
    affiliatedOrganizationId: null,
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: [],
    relatedEventIds: ['event-011'],
    documentIds: ['doc-017'],
    factionSentiment: {
      'faction-001': 0.15,
      'faction-002': 0.12,
      'faction-003': 0.08,
      'faction-004': 0.18,
      'faction-005': 0.78,
      'faction-006': 0.10
    }
  },

  // Competitors
  {
    id: 'person-013',
    name: 'Brian Cornell',
    description: 'Chairman and CEO of Target Corporation. Cornell has positioned Target as a strong competitor to Walmart through investments in same-day delivery and store experience, achieving industry-leading delivery metrics.',
    type: 'executive',
    affiliatedOrganizationId: 'org-003',
    imageUrl: 'img/entities/walmart/person-013.jpg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: [],
    relatedEventIds: ['event-012'],
    documentIds: ['doc-018'],
    factionSentiment: {
      'faction-001': 0.05,
      'faction-002': -0.02,
      'faction-003': 0.02,
      'faction-004': 0.08,
      'faction-005': 0.45,
      'faction-006': 0.82
    }
  },
  {
    id: 'person-014',
    name: 'Andy Jassy',
    description: 'President and CEO of Amazon. Jassy has continued Amazon\'s aggressive expansion of delivery capabilities, putting competitive pressure on Walmart\'s e-commerce and logistics operations.',
    type: 'executive',
    affiliatedOrganizationId: 'org-004',
    imageUrl: 'img/entities/walmart/person-014.jpg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-008'],
    relatedEventIds: ['event-013'],
    documentIds: ['doc-019'],
    factionSentiment: {
      'faction-001': 0.08,
      'faction-002': -0.05,
      'faction-003': 0.00,
      'faction-004': 0.05,
      'faction-005': 0.52,
      'faction-006': 0.88
    }
  },
  {
    id: 'person-015',
    name: 'Jason Buechel',
    description: 'CEO of Whole Foods Market. Buechel leads the Amazon-owned grocery chain that competes with Walmart in the premium grocery segment.',
    type: 'executive',
    affiliatedOrganizationId: 'org-012',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: [],
    relatedEventIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.02,
      'faction-002': 0.00,
      'faction-003': 0.05,
      'faction-004': 0.12,
      'faction-005': 0.38,
      'faction-006': 0.75
    }
  },

  // Rural Community
  {
    id: 'person-016',
    name: 'Mary Johnson',
    description: 'Mayor of a rural Missouri town facing a Walmart store closure. Johnson has been a vocal advocate for the community, arguing that Walmart has a moral obligation to maintain stores in areas where it previously displaced local retailers.',
    type: 'politician',
    affiliatedOrganizationId: 'org-013',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-009'],
    relatedEventIds: ['event-014'],
    documentIds: ['doc-021', 'doc-023'],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-002': 0.55,
      'faction-003': 0.48,
      'faction-004': 0.42,
      'faction-005': 0.18,
      'faction-006': 0.10
    }
  },
  {
    id: 'person-017',
    name: 'Robert Williams',
    description: 'Community organizer and resident activist who has organized protests against Walmart store closures in rural Missouri, highlighting the impact on elderly and low-income residents who lack transportation alternatives.',
    type: 'activist',
    affiliatedOrganizationId: null,
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-009'],
    relatedEventIds: ['event-014'],
    documentIds: ['doc-022'],
    factionSentiment: {
      'faction-001': 0.85,
      'faction-002': 0.42,
      'faction-003': 0.38,
      'faction-004': 0.35,
      'faction-005': 0.12,
      'faction-006': 0.05
    }
  },
  {
    id: 'person-018',
    name: 'Cedric Clark',
    description: 'Executive Vice President of Fulfillment at Walmart, responsible for the company\'s e-commerce fulfillment operations. Clark has faced scrutiny over the holiday delivery failures that left customers without their orders.',
    type: 'executive',
    affiliatedOrganizationId: 'org-001',
    imageUrl: null,
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-007'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-022', 'event-023'],
    documentIds: ['doc-038', 'doc-040'],
    factionSentiment: {
      'faction-001': -0.55,
      'faction-005': 0.42
    }
  },
  {
    id: 'person-019',
    name: 'Tom Ward',
    description: 'Executive Vice President and Chief E-commerce Officer at Walmart. Ward oversees the company\'s online operations and has led the response to delivery system failures, including the $500 million infrastructure investment.',
    type: 'executive',
    affiliatedOrganizationId: 'org-001',
    imageUrl: null,
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-008', 'faction-011'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-022', 'event-025'],
    documentIds: ['doc-038', 'doc-044'],
    factionSentiment: {
      'faction-001': -0.48,
      'faction-005': 0.45
    }
  },
  {
    id: 'person-020',
    name: 'Stuart Appelbaum',
    description: 'President of the Retail, Wholesale and Department Store Union (RWDSU). Appelbaum has led efforts to organize Walmart fulfillment center workers, celebrating the historic unionization victory in Atlanta.',
    type: 'labor_leader',
    affiliatedOrganizationId: 'org-016',
    imageUrl: null,
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-002', 'faction-003', 'faction-009', 'faction-015'],
    relatedLocationIds: ['loc-011', 'loc-012'],
    relatedEventIds: ['event-017', 'event-019', 'event-020', 'event-026'],
    documentIds: ['doc-027', 'doc-032', 'doc-035', 'doc-046'],
    factionSentiment: {
      'faction-002': 0.85,
      'faction-003': 0.88
    }
  },
  {
    id: 'person-021',
    name: 'Chris Smalls',
    description: 'President of the Amazon Labor Union and prominent labor activist. Smalls has supported Walmart unionization efforts and represents the growing momentum for organizing workers in retail and logistics.',
    type: 'activist',
    affiliatedOrganizationId: 'org-017',
    imageUrl: null,
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-003', 'faction-010'],
    relatedLocationIds: ['loc-012'],
    relatedEventIds: [],
    documentIds: ['doc-028'],
    factionSentiment: {
      'faction-002': 0.78,
      'faction-003': 0.85
    }
  },
  {
    id: 'person-022',
    name: 'Lina Khan',
    description: 'Chair of the Federal Trade Commission. Khan has opened investigations into Walmart\'s supplier practices and delivery advertising claims, taking an aggressive approach to retail sector oversight.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-018',
    imageUrl: null,
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-004', 'faction-012'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: ['event-016', 'event-024'],
    documentIds: ['doc-026', 'doc-042'],
    factionSentiment: {
      'faction-001': 0.52,
      'faction-004': 0.82,
      'faction-005': -0.38
    }
  },
  {
    id: 'person-023',
    name: 'Ron Wahlen',
    description: 'Executive leading Walmart Health, the company\'s healthcare clinic initiative. Wahlen has overseen the expansion of clinics into rural communities, offering primary care, dental, and mental health services.',
    type: 'executive',
    affiliatedOrganizationId: 'org-019',
    imageUrl: null,
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-013'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-018', 'event-021'],
    documentIds: ['doc-029', 'doc-036', 'doc-037'],
    factionSentiment: {
      'faction-001': 0.45,
      'faction-004': 0.52
    }
  },
  {
    id: 'person-024',
    name: 'John Rainey',
    description: 'Executive Vice President and Chief Financial Officer of Walmart. Rainey oversees the company\'s financial strategy and has been involved in decisions about infrastructure investments and store profitability.',
    type: 'executive',
    affiliatedOrganizationId: 'org-001',
    imageUrl: null,
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-005', 'faction-014'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-005': 0.65
    }
  },
  {
    id: 'person-025',
    name: 'Kelvin Buncum',
    description: 'Organizer at United for Respect who has been instrumental in supporting Walmart fulfillment center workers during unionization campaigns in Dallas and Atlanta.',
    type: 'activist',
    affiliatedOrganizationId: 'org-006',
    imageUrl: null,
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-003', 'faction-015'],
    relatedLocationIds: ['loc-011', 'loc-012'],
    relatedEventIds: ['event-020', 'event-026'],
    documentIds: ['doc-035', 'doc-046'],
    factionSentiment: {
      'faction-002': 0.78,
      'faction-003': 0.85
    }
  },
  {
    id: 'person-026',
    name: 'Chris Kirkpatrick',
    description: 'Retail industry journalist covering logistics and e-commerce fulfillment. Kirkpatrick has written extensively about Walmart\'s delivery infrastructure challenges and competitive positioning.',
    type: 'journalist',
    affiliatedOrganizationId: null,
    imageUrl: null,
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-005', 'faction-016'],
    relatedLocationIds: [],
    relatedEventIds: [],
    documentIds: ['doc-043'],
    factionSentiment: {
      'faction-005': 0.72
    }
  },
  {
    id: 'person-027',
    name: 'Craig Jelinek',
    description: 'CEO of Costco Wholesale. Jelinek leads a competitor known for treating employees well and maintaining customer loyalty, often contrasted favorably with Walmart\'s labor practices.',
    type: 'executive',
    affiliatedOrganizationId: 'org-011',
    imageUrl: null,
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-006', 'faction-011'],
    relatedLocationIds: [],
    relatedEventIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-006': 0.72
    }
  }
];

export const organizations = [
  // Walmart
  {
    id: 'org-001',
    name: 'Walmart Inc.',
    description: 'The world\'s largest retailer by revenue, operating over 10,500 stores globally and employing approximately 2.3 million people. Walmart faces mounting criticism over self-checkout policies, labor practices, delivery failures, and rural store closures.',
    type: 'corporation',
    imageUrl: 'img/entities/walmart/org-001.svg',
    tagIds: ['tag-004'],
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001', 'loc-002', 'loc-003', 'loc-004', 'loc-005'],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-005', 'doc-006', 'doc-008', 'doc-011', 'doc-012', 'doc-015', 'doc-017', 'doc-021'],
    factionSentiment: {
      'faction-001': -0.75,
      'faction-002': -0.68,
      'faction-003': -0.72,
      'faction-004': -0.58,
      'faction-005': 0.35,
      'faction-006': -0.42
    }
  },

  // Legal
  {
    id: 'org-002',
    name: 'Merton & Associates',
    description: 'Texas-based law firm leading the class-action lawsuit against Walmart over self-checkout detention practices. The firm represents over 500 plaintiffs who allege they were wrongfully detained at Walmart stores.',
    type: 'corporation',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-002', 'loc-003'],
    documentIds: ['doc-003'],
    factionSentiment: {
      'faction-001': 0.65,
      'faction-004': 0.48
    }
  },

  // Competitors
  {
    id: 'org-003',
    name: 'Target Corporation',
    description: 'Major retail competitor to Walmart with a focus on urban and suburban markets. Target has invested heavily in same-day delivery infrastructure, achieving a 98% on-time delivery rate that outperforms Walmart.',
    type: 'corporation',
    imageUrl: 'img/entities/walmart/org-003.png',
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: [],
    documentIds: ['doc-018'],
    factionSentiment: {
      'faction-001': 0.15,
      'faction-005': 0.52,
      'faction-006': 0.68
    }
  },
  {
    id: 'org-004',
    name: 'Amazon.com Inc.',
    description: 'E-commerce and technology giant that competes with Walmart in online retail and grocery. Amazon\'s sub-24-hour delivery service now reaches 85% of US households, putting pressure on Walmart\'s logistics capabilities.',
    type: 'corporation',
    imageUrl: 'img/entities/walmart/org-004.png',
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-008'],
    documentIds: ['doc-019', 'doc-020'],
    factionSentiment: {
      'faction-001': 0.12,
      'faction-005': 0.48,
      'faction-006': 0.72
    }
  },

  // Labor
  {
    id: 'org-005',
    name: 'United Food and Commercial Workers International Union (UFCW)',
    description: 'One of the largest private sector unions in North America representing retail and food workers. UFCW has led the #RespectWalmartWorkers campaign and advocates for improved wages and working conditions at Walmart.',
    type: 'union',
    imageUrl: 'img/entities/walmart/org-005.svg',
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-002', 'faction-003'],
    relatedLocationIds: ['loc-006'],
    documentIds: ['doc-009', 'doc-010'],
    factionSentiment: {
      'faction-001': 0.25,
      'faction-002': 0.82,
      'faction-003': 0.88,
      'faction-004': 0.35
    }
  },
  {
    id: 'org-006',
    name: 'United for Respect',
    description: 'Nonprofit worker advocacy organization that amplifies the voices of retail workers. United for Respect has been instrumental in organizing Walmart worker campaigns and supporting fulfillment center unionization efforts.',
    type: 'nonprofit',
    imageUrl: 'img/entities/walmart/org-006.png',
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-006'],
    documentIds: ['doc-010'],
    factionSentiment: {
      'faction-002': 0.75,
      'faction-003': 0.85,
      'faction-004': 0.42
    }
  },

  // Regulators
  {
    id: 'org-007',
    name: 'U.S. Food and Drug Administration (FDA)',
    description: 'Federal agency responsible for protecting public health through food safety oversight. The FDA has expanded the recall of Walmart\'s Great Value brand products following contamination concerns.',
    type: 'government',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-007'],
    documentIds: ['doc-012', 'doc-013'],
    factionSentiment: {
      'faction-001': -0.15,
      'faction-004': 0.55
    }
  },

  // Consumer Advocacy
  {
    id: 'org-008',
    name: 'Consumer Reports',
    description: 'Nonprofit organization providing independent product testing and consumer advocacy. Consumer Reports has called for stricter quality controls on private-label products following the Great Value recall.',
    type: 'nonprofit',
    imageUrl: 'img/entities/walmart/org-008.png',
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-004'],
    relatedLocationIds: [],
    documentIds: ['doc-014'],
    factionSentiment: {
      'faction-001': 0.55,
      'faction-004': 0.85,
      'faction-005': 0.42
    }
  },
  {
    id: 'org-009',
    name: 'Center for Science in the Public Interest',
    description: 'Consumer advocacy organization focused on food safety and nutrition policy. CSPI has been critical of retail industry self-regulation on food quality standards.',
    type: 'nonprofit',
    imageUrl: 'img/entities/walmart/org-009.svg',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-004'],
    relatedLocationIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.48,
      'faction-004': 0.78
    }
  },

  // Competitors (additional)
  {
    id: 'org-010',
    name: 'Aldi US',
    description: 'German discount grocery chain that has rapidly expanded in the US market. Aldi\'s aggressive pricing has been highlighted in viral comparison videos showing it beating Walmart on many staple items.',
    type: 'corporation',
    imageUrl: 'img/entities/walmart/org-010.png',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-009'],
    documentIds: ['doc-015', 'doc-016'],
    factionSentiment: {
      'faction-001': 0.22,
      'faction-006': 0.62
    }
  },
  {
    id: 'org-011',
    name: 'Costco Wholesale',
    description: 'Membership warehouse club known for competitive pricing and above-average employee wages and benefits. Costco is often cited as a positive contrast to Walmart\'s labor practices.',
    type: 'corporation',
    imageUrl: 'img/entities/walmart/org-011.png',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.18,
      'faction-006': 0.58
    }
  },
  {
    id: 'org-012',
    name: 'Whole Foods Market',
    description: 'Premium grocery chain owned by Amazon, competing with Walmart in the organic and natural foods segment. Whole Foods represents an alternative grocery model focused on quality over price.',
    type: 'corporation',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-006': 0.52
    }
  },

  // Local Government
  {
    id: 'org-013',
    name: 'Rural Missouri Municipal Government',
    description: 'Local government body representing communities affected by Walmart store closures. Officials have advocated for Walmart to maintain stores in areas where it previously displaced local retailers.',
    type: 'government',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-005'],
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-010'],
    documentIds: ['doc-021', 'doc-022', 'doc-023'],
    factionSentiment: {
      'faction-001': 0.35,
      'faction-004': 0.42
    }
  },

  // Financial/Analysis
  {
    id: 'org-014',
    name: 'TD Cowen',
    description: 'Investment bank and financial services company with a retail research division. TD Cowen analysts provide influential coverage of Walmart and the retail sector.',
    type: 'corporation',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-005': 0.65
    }
  },
  {
    id: 'org-015',
    name: 'Retail Dive',
    description: 'Industry news publication covering retail business and operations. Retail Dive has published analysis of Walmart\'s inventory management issues and competitive challenges.',
    type: 'media',
    imageUrl: 'img/placeholders/avatar-default.svg',
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: [],
    documentIds: ['doc-007'],
    factionSentiment: {
      'faction-005': 0.58
    }
  },

  // Labor Organizations (New)
  {
    id: 'org-016',
    name: 'Retail, Wholesale and Department Store Union (RWDSU)',
    description: 'Labor union representing workers in retail, grocery, and distribution. RWDSU has led organizing efforts at Walmart fulfillment centers, achieving a historic victory with the unionization of the Atlanta facility.',
    type: 'union',
    imageUrl: null,
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-002', 'faction-003', 'faction-007'],
    relatedLocationIds: ['loc-011', 'loc-012'],
    documentIds: ['doc-027', 'doc-032', 'doc-033', 'doc-035', 'doc-046', 'doc-047'],
    factionSentiment: {
      'faction-002': 0.85,
      'faction-003': 0.88
    }
  },
  {
    id: 'org-017',
    name: 'Amazon Labor Union',
    description: 'Independent labor union founded by Amazon warehouse workers that achieved the first successful union election at an Amazon facility. ALU has supported organizing efforts at other retailers including Walmart.',
    type: 'union',
    imageUrl: null,
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-003', 'faction-008'],
    relatedLocationIds: [],
    documentIds: ['doc-028'],
    factionSentiment: {
      'faction-002': 0.72,
      'faction-003': 0.82
    }
  },

  // Government (New)
  {
    id: 'org-018',
    name: 'Federal Trade Commission',
    description: 'Federal agency responsible for protecting consumers and competition. Under Chair Lina Khan, the FTC has opened inquiries into Walmart\'s supplier practices and delivery advertising claims.',
    type: 'government',
    imageUrl: null,
    tagIds: ['tag-004'],
    affiliatedFactionIds: ['faction-004', 'faction-009', 'faction-015'],
    relatedLocationIds: ['loc-006'],
    documentIds: ['doc-026', 'doc-042'],
    factionSentiment: {
      'faction-001': 0.48,
      'faction-004': 0.78,
      'faction-005': -0.32
    }
  },

  // Healthcare (New)
  {
    id: 'org-019',
    name: 'Walmart Health',
    description: 'Walmart\'s healthcare division operating clinics that offer primary care, dental, and mental health services. Walmart Health has expanded into rural communities where hospital closures have created healthcare deserts.',
    type: 'corporation',
    imageUrl: null,
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-010'],
    relatedLocationIds: ['loc-001', 'loc-009', 'loc-010'],
    documentIds: ['doc-029', 'doc-030', 'doc-031', 'doc-036', 'doc-037'],
    factionSentiment: {
      'faction-001': 0.55,
      'faction-004': 0.48
    }
  },

  // Additional Competitors (New)
  {
    id: 'org-020',
    name: 'Dollar General',
    description: 'Discount retailer with a strong presence in rural communities, often competing with Walmart for the same customers. Dollar General has expanded rapidly in areas where Walmart has closed stores.',
    type: 'corporation',
    imageUrl: null,
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-006', 'faction-011'],
    relatedLocationIds: ['loc-009', 'loc-010'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.35,
      'faction-006': 0.58
    }
  },
  {
    id: 'org-021',
    name: 'CVS Health',
    description: 'Healthcare and pharmacy company that competes with Walmart Health in the retail healthcare space. CVS operates MinuteClinic locations and has expanded healthcare services in its pharmacy network.',
    type: 'corporation',
    imageUrl: null,
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-012'],
    relatedLocationIds: [],
    documentIds: ['doc-031'],
    factionSentiment: {
      'faction-004': 0.45
    }
  },
  {
    id: 'org-022',
    name: 'Instacart',
    description: 'Grocery delivery platform that partners with multiple retailers. Instacart\'s delivery infrastructure has been cited in comparisons with Walmart\'s proprietary delivery service.',
    type: 'corporation',
    imageUrl: null,
    tagIds: ['tag-006'],
    affiliatedFactionIds: ['faction-006', 'faction-013'],
    relatedLocationIds: [],
    documentIds: ['doc-043'],
    factionSentiment: {
      'faction-006': 0.62
    }
  },
  {
    id: 'org-023',
    name: 'Kroger',
    description: 'One of the largest grocery chains in the United States, competing with Walmart in grocery retail. Kroger\'s proposed merger with Albertsons would create a significant competitor to Walmart\'s grocery dominance.',
    type: 'corporation',
    imageUrl: null,
    tagIds: ['tag-005'],
    affiliatedFactionIds: ['faction-006', 'faction-014', 'faction-016'],
    relatedLocationIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-006': 0.58
    }
  }
];
