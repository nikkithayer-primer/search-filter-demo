/**
 * Persons and organizations for China Semiconductor dataset
 */

export const persons = [
  {
    id: 'person-001',
    name: 'Zhao Haijun',
    description: 'Co-CEO of Semiconductor Manufacturing International Corporation (SMIC), China\'s largest chip foundry. Zhao has led SMIC\'s efforts to develop advanced semiconductor manufacturing capabilities despite US export controls, achieving notable progress in producing chips at 5nm process nodes without EUV lithography.',
    type: 'executive',
    affiliatedOrganizationId: 'org-001',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-002'],
    relatedEventIds: ['event-001'],
    documentIds: ['doc-001', 'doc-002'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-002': -0.55,
      'faction-003': 0.25
    }
  },
  {
    id: 'person-002',
    name: 'Liang Mong Song',
    description: 'Co-CEO of SMIC and renowned semiconductor engineer who previously worked at TSMC and Samsung. Known for his expertise in advanced process node development, Liang has been instrumental in pushing SMIC\'s manufacturing capabilities toward cutting-edge nodes despite equipment restrictions.',
    type: 'executive',
    affiliatedOrganizationId: 'org-001',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-001'],
    documentIds: ['doc-001', 'doc-003'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-002': -0.62,
      'faction-003': 0.35
    }
  },
  {
    id: 'person-003',
    name: 'Dylan Patel',
    description: 'Chief analyst at SemiAnalysis, a leading semiconductor industry research firm. Patel is known for his in-depth technical analysis of chip manufacturing processes and has published influential reports on China\'s semiconductor progress and the effectiveness of export controls.',
    type: 'analyst',
    affiliatedOrganizationId: 'org-023',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-004'],
    relatedEventIds: [],
    documentIds: ['doc-003', 'doc-004'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.15,
      'faction-002': 0.12,
      'faction-003': 0.72
    }
  },
  {
    id: 'person-004',
    name: 'Peter Wennink',
    description: 'Former CEO of ASML, the Dutch company that holds a monopoly on extreme ultraviolet (EUV) lithography machines essential for advanced chip manufacturing. Wennink navigated complex geopolitical pressures as the Netherlands restricted EUV exports to China.',
    type: 'executive',
    affiliatedOrganizationId: 'org-002',
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-003'],
    relatedEventIds: ['event-003', 'event-004'],
    documentIds: ['doc-005', 'doc-006'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-003': 0.55,
      'faction-006': 0.48
    }
  },
  {
    id: 'person-005',
    name: 'Gina Raimondo',
    description: 'U.S. Secretary of Commerce who has been instrumental in implementing and expanding export controls on semiconductor technology to China. Raimondo has coordinated with allies including the Netherlands and Japan to create a unified approach to restricting China\'s access to advanced chip-making equipment.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-005',
    imageUrl: 'img/entities/china/person-005.jpg',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-004'],
    relatedEventIds: ['event-009'],
    documentIds: ['doc-007', 'doc-008'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': -0.75,
      'faction-002': 0.72,
      'faction-005': 0.35
    }
  },
  {
    id: 'person-006',
    name: 'Jake Sullivan',
    description: 'U.S. National Security Advisor who has been a key architect of the Biden administration\'s technology policy toward China. Sullivan articulated the strategy of maintaining "as large a lead as possible" in foundational technologies including semiconductors.',
    type: 'government_official',
    affiliatedOrganizationId: null,
    imageUrl: 'img/entities/china/person-006.png',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-004'],
    relatedEventIds: [],
    documentIds: ['doc-007'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.78,
      'faction-002': 0.68
    }
  },
  {
    id: 'person-007',
    name: 'Liesje Schreinemacher',
    description: 'Former Dutch Minister for Foreign Trade and Development Cooperation who oversaw the implementation of export restrictions on semiconductor equipment to China, coordinating with the US on controls affecting ASML\'s lithography machines.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-004',
    imageUrl: 'img/entities/china/person-007.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-005'],
    relatedEventIds: ['event-003'],
    documentIds: ['doc-005'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.42,
      'faction-002': 0.55
    }
  },
  {
    id: 'person-008',
    name: 'Liu He',
    description: 'Former Vice Premier of China and key economic policymaker who oversaw China\'s semiconductor self-sufficiency initiatives. Liu played a central role in directing state investment through the National IC Fund and coordinating industrial policy.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-009',
    imageUrl: 'img/entities/china/person-008.jpg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: ['event-005', 'event-006'],
    documentIds: ['doc-009', 'doc-010'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.85,
      'faction-002': -0.65
    }
  },
  {
    id: 'person-009',
    name: 'Ding Wenwu',
    description: 'Former president of the China National Integrated Circuit Industry Investment Fund (Big Fund). Ding led the massive state investment initiative to develop China\'s semiconductor industry before being investigated for corruption in 2022.',
    type: 'executive',
    affiliatedOrganizationId: 'org-007',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-005'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: ['event-006'],
    documentIds: ['doc-009'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-005': 0.65
    }
  },
  {
    id: 'person-010',
    name: 'He Lifeng',
    description: 'Vice Premier of China responsible for economic affairs and financial policy. He oversees industrial policy initiatives including semiconductor development and has engaged in high-level economic dialogues with US officials.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-009',
    imageUrl: 'img/entities/china/person-010.jpg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: ['event-007'],
    documentIds: ['doc-010'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.82
    }
  },
  {
    id: 'person-011',
    name: 'Ren Zhengfei',
    description: 'Founder and CEO of Huawei Technologies, China\'s largest telecommunications equipment manufacturer. Ren has led Huawei\'s efforts to develop indigenous semiconductor capabilities after the company was placed on the US Entity List.',
    type: 'executive',
    affiliatedOrganizationId: 'org-010',
    imageUrl: 'img/entities/china/person-011.jpg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-002', 'event-008'],
    documentIds: ['doc-012', 'doc-013'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.88,
      'faction-002': -0.78,
      'faction-004': 0.72
    }
  },
  {
    id: 'person-012',
    name: 'Meng Wanzhou',
    description: 'CFO and rotating chairwoman of Huawei Technologies, daughter of founder Ren Zhengfei. Meng was detained in Canada in 2018 on US fraud charges related to sanctions violations before returning to China in 2021 as part of a deferred prosecution agreement.',
    type: 'executive',
    affiliatedOrganizationId: 'org-010',
    imageUrl: 'img/entities/china/person-012.jpg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-008'],
    documentIds: ['doc-012'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-002': -0.72
    }
  },
  {
    id: 'person-013',
    name: 'Chen Nanxiang',
    description: 'CEO of Yangtze Memory Technologies Co. (YMTC), China\'s leading NAND flash memory manufacturer. Chen has led YMTC\'s development of competitive 3D NAND technology, though the company has faced significant challenges from US export controls.',
    type: 'executive',
    affiliatedOrganizationId: 'org-013',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-007'],
    relatedEventIds: ['event-010'],
    documentIds: ['doc-015', 'doc-016'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.75,
      'faction-003': 0.42
    }
  },
  {
    id: 'person-014',
    name: 'Dan Hutcheson',
    description: 'Vice Chairman of TechInsights and veteran semiconductor industry analyst with over 40 years of experience. Hutcheson provides expert analysis on chip manufacturing technology, industry economics, and the impact of geopolitical tensions on the semiconductor supply chain.',
    type: 'analyst',
    affiliatedOrganizationId: 'org-024',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003', 'faction-006'],
    relatedLocationIds: ['loc-004'],
    relatedEventIds: ['event-011'],
    documentIds: ['doc-016', 'doc-017'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-003': 0.68,
      'faction-006': 0.62
    }
  },
  {
    id: 'person-015',
    name: 'Dai Weimin',
    description: 'CEO of Empyrean Technology, a leading Chinese electronic design automation (EDA) software company. Dai leads efforts to develop domestic alternatives to US EDA tools as China seeks to reduce dependence on foreign semiconductor design software.',
    type: 'executive',
    affiliatedOrganizationId: 'org-016',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-005'],
    relatedLocationIds: ['loc-002'],
    relatedEventIds: ['event-012'],
    documentIds: ['doc-018'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-005': 0.72
    }
  },
  {
    id: 'person-016',
    name: 'Liu Zhiyong',
    description: 'CEO of Huada Jiutian (Cellibrium), one of China\'s top three EDA software companies. Liu has led the company\'s efforts to develop comprehensive chip design tools as part of China\'s push for semiconductor self-sufficiency.',
    type: 'executive',
    affiliatedOrganizationId: 'org-017',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-008'],
    relatedEventIds: [],
    documentIds: ['doc-019'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.78
    }
  },
  {
    id: 'person-017',
    name: 'C.C. Wei',
    description: 'CEO of Taiwan Semiconductor Manufacturing Company (TSMC), the world\'s largest contract chip manufacturer. Wei oversees TSMC\'s dominant position in advanced chip manufacturing and its expansion into the US with new fabrication facilities.',
    type: 'executive',
    affiliatedOrganizationId: 'org-020',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: ['loc-010', 'loc-009'],
    relatedEventIds: ['event-013'],
    documentIds: ['doc-020', 'doc-021'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-005': 0.72,
      'faction-006': 0.55
    }
  },
  {
    id: 'person-018',
    name: 'Mark Liu',
    description: 'Chairman of TSMC and influential figure in the global semiconductor industry. Liu has navigated TSMC through complex geopolitical tensions while maintaining the company\'s technology leadership in advanced chip manufacturing.',
    type: 'executive',
    affiliatedOrganizationId: 'org-020',
    imageUrl: 'img/entities/china/person-018.jpg',
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: ['loc-010'],
    relatedEventIds: ['event-013'],
    documentIds: ['doc-020'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-005': 0.68
    }
  },
  {
    id: 'person-019',
    name: 'Rick Bloomingdale',
    description: 'President of the Arizona Building and Construction Trades Council representing construction workers. Bloomingdale has been vocal about labor concerns related to TSMC\'s Arizona fab construction, including disputes over the use of foreign workers.',
    type: 'labor_leader',
    affiliatedOrganizationId: 'org-021',
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-009'],
    relatedEventIds: ['event-014'],
    documentIds: ['doc-022'],
    factionSentiment: {
      'faction-005': -0.42
    }
  },
  {
    id: 'person-020',
    name: 'Pat Gelsinger',
    description: 'CEO of Intel Corporation who has led the company\'s ambitious turnaround strategy including significant investments in US-based manufacturing. Gelsinger has been a vocal advocate for domestic chip production and government subsidies through the CHIPS Act.',
    type: 'executive',
    affiliatedOrganizationId: 'org-027',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-011'],
    relatedLocationIds: ['loc-012'],
    relatedEventIds: ['event-015', 'event-020', 'event-026'],
    documentIds: ['doc-036', 'doc-037', 'doc-043', 'doc-053', 'doc-057'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-002': 0.35,
      'faction-005': 0.58,
      'faction-006': 0.42
    }
  },
  {
    id: 'person-021',
    name: 'Jensen Huang',
    description: 'CEO and co-founder of Nvidia, the world\'s leading designer of graphics processing units (GPUs) and AI accelerator chips. Huang has navigated complex export control restrictions on advanced AI chips while maintaining Nvidia\'s dominant market position.',
    type: 'executive',
    affiliatedOrganizationId: 'org-028',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-007'],
    relatedLocationIds: ['loc-012'],
    relatedEventIds: ['event-021'],
    documentIds: ['doc-044', 'doc-045', 'doc-056'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-005': 0.85,
      'faction-006': 0.72
    }
  },
  {
    id: 'person-022',
    name: 'Lee Jae-yong',
    description: 'Executive Chairman of Samsung Electronics and de facto leader of the Samsung Group conglomerate. Lee oversees Samsung\'s massive semiconductor business including memory chips and foundry services, navigating US-China tensions and competition with TSMC.',
    type: 'executive',
    affiliatedOrganizationId: 'org-014',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006', 'faction-008'],
    relatedLocationIds: ['loc-011'],
    relatedEventIds: ['event-016'],
    documentIds: ['doc-038', 'doc-060'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-006': 0.78
    }
  },
  {
    id: 'person-023',
    name: 'Kwon Young-soo',
    description: 'CEO of SK Hynix, the world\'s second-largest memory chip manufacturer. Kwon leads the company through geopolitical challenges including managing operations in China while complying with US export restrictions on advanced memory technology.',
    type: 'executive',
    affiliatedOrganizationId: 'org-029',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006', 'faction-013'],
    relatedLocationIds: ['loc-011'],
    relatedEventIds: ['event-022'],
    documentIds: ['doc-046', 'doc-060'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-006': 0.75
    }
  },
  {
    id: 'person-024',
    name: 'Alan Estevez',
    description: 'Under Secretary of Commerce for Industry and Security, leading the Bureau of Industry and Security (BIS). Estevez oversees the implementation of export controls on semiconductor technology and equipment to China, including the October 2022 rules.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-006',
    imageUrl: null,
    affiliatedFactionIds: ['faction-002', 'faction-009', 'faction-014'],
    relatedLocationIds: ['loc-004'],
    relatedEventIds: ['event-019'],
    documentIds: ['doc-041', 'doc-048'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': -0.72,
      'faction-002': 0.75
    }
  },
  {
    id: 'person-025',
    name: 'Wang Wentao',
    description: 'Minister of Commerce of China responsible for trade policy and negotiations. Wang has led China\'s responses to US semiconductor export controls, including retaliatory measures and filing complaints with the World Trade Organization.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-030',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-004', 'faction-010', 'faction-016'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: ['event-018', 'event-023'],
    documentIds: ['doc-040', 'doc-047'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-002': -0.78,
      'faction-004': 0.85
    }
  },
  {
    id: 'person-026',
    name: 'Lisa Su',
    description: 'CEO of Advanced Micro Devices (AMD), leading the company\'s resurgence in the CPU and GPU markets. Su has positioned AMD as a major player in data center and AI chips while navigating export restrictions on advanced semiconductors to China.',
    type: 'executive',
    affiliatedOrganizationId: 'org-031',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-012'],
    relatedLocationIds: ['loc-012'],
    relatedEventIds: ['event-025'],
    documentIds: ['doc-051', 'doc-052'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-005': 0.78,
      'faction-006': 0.65
    }
  },
  {
    id: 'person-027',
    name: 'Lip-Bu Tan',
    description: 'Executive Chairman of Cadence Design Systems and prominent semiconductor industry investor. Tan is known for his deep expertise in EDA tools and has been influential in shaping the chip design ecosystem through his leadership and venture investments.',
    type: 'executive',
    affiliatedOrganizationId: 'org-019',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-015'],
    relatedLocationIds: ['loc-012'],
    relatedEventIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-005': 0.72
    }
  },
  {
    id: 'person-028',
    name: 'Christophe Fouquet',
    description: 'CEO of ASML, succeeding Peter Wennink in leading the Dutch company that maintains a global monopoly on EUV lithography systems. Fouquet continues to navigate export control pressures while managing ASML\'s critical role in advanced chip manufacturing.',
    type: 'executive',
    affiliatedOrganizationId: 'org-002',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006', 'faction-008'],
    relatedLocationIds: ['loc-003'],
    relatedEventIds: ['event-024'],
    documentIds: ['doc-050'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.55,
      'faction-006': 0.68
    }
  },
  {
    id: 'person-029',
    name: 'Gary Dickerson',
    description: 'CEO of Applied Materials, the world\'s largest semiconductor equipment manufacturer. Dickerson has led the company through export control restrictions while investing in advanced technologies for next-generation chip manufacturing.',
    type: 'executive',
    affiliatedOrganizationId: 'org-003',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-011'],
    relatedLocationIds: ['loc-012'],
    relatedEventIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-002': 0.42,
      'faction-005': 0.68
    }
  }
];

export const organizations = [
  {
    id: 'org-001',
    name: 'SMIC',
    description: 'Semiconductor Manufacturing International Corporation, China\'s largest and most advanced chip foundry. SMIC has made significant progress in developing advanced manufacturing processes despite US export controls limiting access to EUV lithography equipment.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-001.png',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-002'],
    documentIds: ['doc-001', 'doc-002', 'doc-003'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.85,
      'faction-002': -0.68,
      'faction-003': 0.32
    }
  },
  {
    id: 'org-002',
    name: 'ASML',
    description: 'Dutch semiconductor equipment company with a global monopoly on extreme ultraviolet (EUV) lithography machines essential for manufacturing the most advanced chips. ASML\'s export restrictions to China are a key element of Western technology controls.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-002.png',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-003'],
    documentIds: ['doc-005', 'doc-006'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.55,
      'faction-003': 0.58,
      'faction-006': 0.52
    }
  },
  {
    id: 'org-003',
    name: 'Applied Materials',
    description: 'American corporation and the world\'s largest supplier of semiconductor manufacturing equipment. Applied Materials provides deposition, etching, and inspection tools critical to chip fabrication and is subject to US export control regulations.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-003.png',
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-013'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-002': 0.45,
      'faction-005': 0.62
    }
  },
  {
    id: 'org-004',
    name: 'Dutch Government',
    description: 'Government of the Netherlands which exercises regulatory authority over ASML\'s exports. The Dutch government has coordinated with the US and Japan on restricting semiconductor equipment exports to China.',
    type: 'government',
    imageUrl: 'img/entities/china/org-004.png',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-005'],
    documentIds: ['doc-005'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.52,
      'faction-002': 0.65
    }
  },
  {
    id: 'org-005',
    name: 'US Commerce Department',
    description: 'United States Department of Commerce responsible for administering export controls on sensitive technology. The Commerce Department has implemented sweeping restrictions on semiconductor exports to China through the Bureau of Industry and Security.',
    type: 'government',
    imageUrl: 'img/entities/china/org-005.jpg',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-007', 'doc-008', 'doc-014'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.78,
      'faction-002': 0.75
    }
  },
  {
    id: 'org-006',
    name: 'Bureau of Industry and Security',
    description: 'Agency within the US Commerce Department responsible for export control policy and enforcement. BIS implemented the October 2022 semiconductor export controls targeting China\'s advanced chip capabilities and has continued to expand restrictions.',
    type: 'government',
    imageUrl: 'img/entities/china/org-006.png',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-008'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': -0.82,
      'faction-002': 0.72
    }
  },
  {
    id: 'org-007',
    name: 'China National IC Fund',
    description: 'Also known as the "Big Fund," a state-backed investment vehicle established to accelerate China\'s semiconductor industry development. The fund has invested over $50 billion in domestic chip companies but has faced corruption investigations affecting several executives.',
    type: 'financial',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-006'],
    documentIds: ['doc-009', 'doc-010', 'doc-011'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.88,
      'faction-002': -0.58
    }
  },
  {
    id: 'org-008',
    name: 'China Development Bank',
    description: 'One of China\'s three policy banks, providing financing for national strategic initiatives including semiconductor industry development. CDB has provided substantial loans to domestic chip companies as part of China\'s technology self-sufficiency push.',
    type: 'financial',
    imageUrl: 'img/entities/china/org-008.svg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-006'],
    documentIds: ['doc-010'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.72
    }
  },
  {
    id: 'org-009',
    name: 'State Council of China',
    description: 'The chief administrative authority of the People\'s Republic of China, responsible for implementing national economic policy including semiconductor industry development plans and responses to foreign technology restrictions.',
    type: 'government',
    imageUrl: 'img/entities/china/org-009.jpg',
    affiliatedFactionIds: ['faction-001', 'faction-004'],
    relatedLocationIds: ['loc-006'],
    documentIds: ['doc-010'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.85,
      'faction-004': 0.82
    }
  },
  {
    id: 'org-010',
    name: 'Huawei',
    description: 'China\'s largest telecommunications equipment manufacturer and a major player in smartphones and enterprise technology. Subject to extensive US sanctions since 2019, Huawei has invested heavily in developing indigenous semiconductor capabilities through its HiSilicon subsidiary.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-010.png',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    documentIds: ['doc-012', 'doc-013', 'doc-014'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.88,
      'faction-002': -0.82,
      'faction-004': 0.78
    }
  },
  {
    id: 'org-011',
    name: 'Lam Research',
    description: 'American semiconductor equipment company specializing in wafer fabrication equipment used in etching and deposition processes. Lam Research is a key supplier affected by US export controls on advanced chip manufacturing technology to China.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-011.svg',
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-013'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-002': 0.48,
      'faction-005': 0.58
    }
  },
  {
    id: 'org-012',
    name: 'KLA Corporation',
    description: 'American company providing process control and yield management equipment for semiconductor manufacturing. KLA\'s metrology and inspection systems are essential for advanced chip production and subject to US export restrictions.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-012.png',
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-014'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-002': 0.45,
      'faction-005': 0.55
    }
  },
  {
    id: 'org-013',
    name: 'YMTC',
    description: 'Yangtze Memory Technologies Co., China\'s leading NAND flash memory manufacturer based in Wuhan. YMTC has developed competitive 3D NAND technology but faces significant challenges from US export controls targeting its access to manufacturing equipment.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-013.jpg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-007'],
    documentIds: ['doc-015', 'doc-016', 'doc-017'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-002': -0.72,
      'faction-003': 0.35
    }
  },
  {
    id: 'org-014',
    name: 'Samsung Electronics',
    description: 'South Korean multinational and one of the world\'s largest semiconductor manufacturers, producing both memory chips and foundry services. Samsung competes with TSMC in advanced chip manufacturing while navigating US-China technology tensions.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-014.png',
    affiliatedFactionIds: [],
    relatedLocationIds: [],
    documentIds: ['doc-016'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-003': 0.52,
      'faction-006': 0.48
    }
  },
  {
    id: 'org-015',
    name: 'TechInsights',
    description: 'Technology analysis and intellectual property services company specializing in semiconductor reverse engineering and competitive analysis. TechInsights provides detailed technical assessments of chip capabilities and manufacturing processes.',
    type: 'research',
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-016', 'doc-017'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-003': 0.72,
      'faction-006': 0.68
    }
  },
  {
    id: 'org-016',
    name: 'Empyrean Technology',
    description: 'Leading Chinese electronic design automation (EDA) software company developing tools for integrated circuit design. Empyrean is part of China\'s effort to reduce dependence on US EDA providers like Cadence and Synopsys.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-016.png',
    affiliatedFactionIds: ['faction-001', 'faction-005'],
    relatedLocationIds: ['loc-002'],
    documentIds: ['doc-018'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-005': 0.72
    }
  },
  {
    id: 'org-017',
    name: 'Huada Jiutian',
    description: 'Chinese EDA software company also known as Cellibrium, developing chip design tools for the domestic semiconductor industry. Huada Jiutian is one of China\'s top three EDA providers working to build indigenous design capabilities.',
    type: 'corporation',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-008'],
    documentIds: ['doc-019'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.78
    }
  },
  {
    id: 'org-018',
    name: 'Cadence Design Systems',
    description: 'American multinational providing electronic design automation software and engineering services for semiconductor and electronics design. Cadence is one of three major EDA companies whose tools are essential for advanced chip development.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-018.svg',
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-018'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-002': 0.52,
      'faction-005': 0.75
    }
  },
  {
    id: 'org-019',
    name: 'Synopsys',
    description: 'American company providing electronic design automation software for semiconductor design and verification. Synopsys is the largest EDA company by revenue and its tools are critical for designing advanced chips, making it a focus of export control discussions.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-019.png',
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-018'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-002': 0.48,
      'faction-005': 0.72
    }
  },
  {
    id: 'org-020',
    name: 'TSMC',
    description: 'Taiwan Semiconductor Manufacturing Company, the world\'s largest contract chip manufacturer producing over 90% of the most advanced semiconductors. TSMC\'s dominance in leading-edge manufacturing makes it a critical player in global technology supply chains.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-020.png',
    affiliatedFactionIds: ['faction-005', 'faction-006'],
    relatedLocationIds: ['loc-010', 'loc-009'],
    documentIds: ['doc-020', 'doc-021', 'doc-022'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-005': 0.68,
      'faction-006': 0.62
    }
  },
  {
    id: 'org-021',
    name: 'Arizona Building and Construction Trades Council',
    description: 'Labor organization representing construction workers in Arizona. The council has been involved in disputes over TSMC\'s Arizona fab construction, particularly regarding the use of foreign workers and labor practices.',
    type: 'union',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-009'],
    documentIds: ['doc-022'],
    factionSentiment: {
      'faction-005': -0.38
    }
  },
  {
    id: 'org-022',
    name: 'SMEE',
    description: 'Shanghai Micro Electronics Equipment, China\'s primary domestic lithography equipment manufacturer. SMEE is developing DUV lithography systems as China seeks to reduce dependence on ASML, though its technology lags significantly behind leading-edge capabilities.',
    type: 'corporation',
    imageUrl: 'img/entities/china/org-022.png',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-002'],
    documentIds: [],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.75
    }
  },
  {
    id: 'org-023',
    name: 'SemiAnalysis',
    description: 'Independent semiconductor industry research and analysis firm providing detailed technical and market insights. Known for in-depth coverage of chip manufacturing technology, supply chain dynamics, and the impact of geopolitical developments on the semiconductor industry.',
    type: 'research',
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-003', 'doc-004'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-003': 0.75
    }
  },
  {
    id: 'org-024',
    name: 'VLSI Research',
    description: 'Semiconductor industry market research firm providing analysis of chip manufacturing equipment markets and technology trends. VLSI Research tracks equipment spending, market share, and technology roadmaps across the semiconductor supply chain.',
    type: 'research',
    affiliatedFactionIds: ['faction-003', 'faction-006'],
    relatedLocationIds: ['loc-004'],
    documentIds: ['doc-017'],
    factionSentiment: {
      'faction-003': 0.72,
      'faction-006': 0.68
    }
  },
  {
    id: 'org-025',
    name: 'Xinhua News Agency',
    description: 'Official state news agency of the People\'s Republic of China and the largest news agency in China. Xinhua serves as the primary channel for official government communications on technology policy and responses to foreign restrictions.',
    type: 'media',
    imageUrl: 'img/entities/china/org-025.png',
    affiliatedFactionIds: ['faction-004'],
    relatedLocationIds: ['loc-006'],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.85,
      'faction-004': 0.92
    }
  },
  {
    id: 'org-026',
    name: 'CGTN',
    description: 'China Global Television Network, a Chinese state-owned international media organization. CGTN provides English-language coverage of China\'s semiconductor industry developments and official perspectives on technology competition with the West.',
    type: 'media',
    imageUrl: 'img/entities/china/org-026.png',
    affiliatedFactionIds: ['faction-004'],
    relatedLocationIds: ['loc-006'],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-004': 0.88
    }
  },
  {
    id: 'org-027',
    name: 'Intel Corporation',
    description: 'American multinational technology company and major semiconductor manufacturer. Intel is investing heavily in US-based manufacturing capacity and pursuing an ambitious turnaround strategy to regain technology leadership in advanced chip production.',
    type: 'corporation',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-007'],
    relatedLocationIds: ['loc-012'],
    documentIds: ['doc-036', 'doc-037', 'doc-043', 'doc-053', 'doc-057'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-002': 0.42,
      'faction-005': 0.55,
      'faction-006': 0.35
    }
  },
  {
    id: 'org-028',
    name: 'Nvidia Corporation',
    description: 'American multinational technology company and dominant player in graphics processing units (GPUs) and AI accelerator chips. Nvidia\'s advanced AI chips are subject to US export controls restricting sales to China, significantly impacting the company\'s market.',
    type: 'corporation',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-011'],
    relatedLocationIds: ['loc-012'],
    documentIds: ['doc-044', 'doc-045', 'doc-046', 'doc-051', 'doc-052', 'doc-056'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-005': 0.85,
      'faction-006': 0.78
    }
  },
  {
    id: 'org-029',
    name: 'SK Hynix',
    description: 'South Korean semiconductor company and the world\'s second-largest memory chip manufacturer after Samsung. SK Hynix operates significant manufacturing facilities in China and must navigate complex export control restrictions on advanced memory technology.',
    type: 'corporation',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006', 'faction-010', 'faction-016'],
    relatedLocationIds: ['loc-011'],
    documentIds: ['doc-046', 'doc-060'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-006': 0.75
    }
  },
  {
    id: 'org-030',
    name: 'Ministry of Commerce of China (MOFCOM)',
    description: 'Chinese government ministry responsible for domestic and foreign trade policy. MOFCOM leads China\'s responses to US semiconductor export controls, including retaliatory measures and trade dispute resolution efforts.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-004', 'faction-008'],
    relatedLocationIds: ['loc-006'],
    documentIds: ['doc-040', 'doc-047'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.85,
      'faction-002': -0.78,
      'faction-004': 0.88
    }
  },
  {
    id: 'org-031',
    name: 'Advanced Micro Devices (AMD)',
    description: 'American semiconductor company producing CPUs, GPUs, and other processors. AMD competes with Intel and Nvidia while navigating export restrictions on advanced chips to China, developing compliant products for the Chinese market.',
    type: 'corporation',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-009', 'faction-014'],
    relatedLocationIds: ['loc-012'],
    documentIds: ['doc-051', 'doc-052'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-005': 0.72,
      'faction-006': 0.62
    }
  },
  {
    id: 'org-032',
    name: 'Korea Ministry of Trade',
    description: 'South Korean government ministry responsible for trade policy and industrial development. The ministry coordinates with the US on semiconductor export controls while protecting the interests of Korean chipmakers Samsung and SK Hynix.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006', 'faction-013'],
    relatedLocationIds: ['loc-011'],
    documentIds: ['doc-039', 'doc-049', 'doc-055'],
    factionSentiment: {
      'faction-002': -0.35,
      'faction-006': 0.72
    }
  },
  {
    id: 'org-033',
    name: 'Taiwan Ministry of Economic Affairs',
    description: 'Taiwan government ministry overseeing economic policy including the critical semiconductor industry. The ministry manages policies affecting TSMC and other Taiwanese chip companies amid cross-strait tensions and US-China technology competition.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-012'],
    relatedLocationIds: ['loc-010'],
    documentIds: ['doc-059'],
    factionSentiment: {
      'faction-005': 0.68
    }
  },
  {
    id: 'org-034',
    name: 'Arm Holdings',
    description: 'British semiconductor and software design company whose processor architectures are used in most mobile devices and increasingly in data centers. Arm\'s licensing model makes it a critical player in the global chip ecosystem, including restrictions on licensing to Chinese companies.',
    type: 'corporation',
    imageUrl: null,
    affiliatedFactionIds: ['faction-005', 'faction-006', 'faction-015'],
    relatedLocationIds: [],
    documentIds: [],
    factionSentiment: {
      'faction-005': 0.62,
      'faction-006': 0.58
    }
  }
];
