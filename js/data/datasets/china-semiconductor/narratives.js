/**
 * Narratives for China Semiconductor dataset
 */

export const narratives = [
  {
    id: 'narr-001',
    text: 'SMIC achieves 5nm chip production using DUV lithography workaround',
    description: 'Semiconductor Manufacturing International Corporation (SMIC) has reportedly achieved 5nm chip production despite lacking access to ASML\'s extreme ultraviolet (EUV) lithography machines. Industry analysts confirm SMIC is using multi-patterning techniques with older deep ultraviolet (DUV) equipment, though at significantly lower yields and higher costs than competitors. The breakthrough raises questions about the effectiveness of export controls and demonstrates Chinese determination to achieve semiconductor self-sufficiency.',
    missionId: 'mission-003',
    sentiment: 0.42,
    themeIds: ['sub-001', 'sub-002', 'sub-003'],
    factionMentions: {
      'faction-001': { volume: 520, sentiment: 0.78 },
      'faction-002': { volume: 380, sentiment: -0.65 },
      'faction-003': { volume: 290, sentiment: 0.15 }
    },
    publisherVolumes: {
      'pub-semiengi': { volume: 85, sentiment: 0.12 },
      'pub-eetimes': { volume: 72, sentiment: 0.08 },
      'pub-scmp': { volume: 145, sentiment: 0.55 },
      'pub-xinhua': { volume: 120, sentiment: 0.82 },
      'pub-bloomberg': { volume: 95, sentiment: -0.15 },
      'pub-reuters': { volume: 88, sentiment: -0.08 },
      'pub-x': { volume: 185, sentiment: 0.25 },
      'pub-linkedin': { volume: 65, sentiment: 0.18 }
    },
    factionSources: {
      'faction-001': { 'pub-xinhua': 110, 'pub-scmp': 95, 'pub-cgtn': 85, 'pub-weibo': 120, 'pub-x': 75, 'pub-globaltimes': 35 },
      'faction-002': { 'pub-wsj': 65, 'pub-bloomberg': 80, 'pub-x': 95, 'pub-reuters': 55, 'pub-ft': 45, 'pub-linkedin': 40 },
      'faction-003': { 'pub-semiengi': 75, 'pub-eetimes': 68, 'pub-anandtech': 52, 'pub-bloomberg': 45, 'pub-linkedin': 50 }
    },
    personIds: ['person-001', 'person-002', 'person-003'],
    organizationIds: ['org-001', 'org-002', 'org-003'],
    locationIds: ['loc-001', 'loc-002'],
    eventIds: ['event-001', 'event-002'],
    volumeOverTime: [
      { date: '2026-01-14', factionVolumes: { 'faction-001': 85, 'faction-002': 62, 'faction-003': 48 }, publisherVolumes: { 'pub-xinhua': 25, 'pub-scmp': 28, 'pub-bloomberg': 18, 'pub-x': 35, 'pub-semiengi': 15 } },
      { date: '2026-01-15', factionVolumes: { 'faction-001': 120, 'faction-002': 95, 'faction-003': 72 }, publisherVolumes: { 'pub-xinhua': 35, 'pub-scmp': 42, 'pub-bloomberg': 28, 'pub-x': 55, 'pub-semiengi': 22 } },
      { date: '2026-01-16', factionVolumes: { 'faction-001': 185, 'faction-002': 145, 'faction-003': 98 }, publisherVolumes: { 'pub-xinhua': 52, 'pub-scmp': 58, 'pub-bloomberg': 42, 'pub-x': 82, 'pub-semiengi': 35 } },
      { date: '2026-01-17', factionVolumes: { 'faction-001': 265, 'faction-002': 198, 'faction-003': 135 }, publisherVolumes: { 'pub-xinhua': 72, 'pub-scmp': 78, 'pub-bloomberg': 55, 'pub-x': 105, 'pub-semiengi': 48 } },
      { date: '2026-01-18', factionVolumes: { 'faction-001': 345, 'faction-002': 265, 'faction-003': 185 }, publisherVolumes: { 'pub-xinhua': 88, 'pub-scmp': 98, 'pub-bloomberg': 68, 'pub-x': 135, 'pub-semiengi': 62 } },
      { date: '2026-01-19', factionVolumes: { 'faction-001': 425, 'faction-002': 315, 'faction-003': 235 }, publisherVolumes: { 'pub-xinhua': 102, 'pub-scmp': 118, 'pub-bloomberg': 78, 'pub-x': 158, 'pub-semiengi': 72 } },
      { date: '2026-01-20', factionVolumes: { 'faction-001': 520, 'faction-002': 380, 'faction-003': 290 }, publisherVolumes: { 'pub-xinhua': 120, 'pub-scmp': 145, 'pub-bloomberg': 95, 'pub-x': 185, 'pub-semiengi': 85 } }
    ],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
    tagIds: ['tag-002'],
    createdAt: '2026-01-14T00:00:00Z'
  },
  {
    id: 'narr-002',
    text: 'US tightens ASML export restrictions, blocking all advanced lithography to China',
    description: 'The Biden administration has pressured the Netherlands to expand export controls on ASML, now blocking shipments of not just EUV but also advanced DUV lithography systems to China. ASML reported the restrictions will reduce their China revenue by $2.5 billion annually. The Dutch government acquiesced after months of negotiations, with Chinese officials condemning the move as "technological hegemony." Industry analysts warn the restrictions may accelerate Chinese efforts to develop indigenous lithography equipment.',
    missionId: 'mission-002',
    sentiment: -0.48,
    themeIds: ['sub-004', 'sub-005', 'sub-006'],
    factionMentions: {
      'faction-001': { volume: 385, sentiment: -0.82 },
      'faction-002': { volume: 445, sentiment: 0.72 },
      'faction-004': { volume: 220, sentiment: -0.68 },
      'faction-006': { volume: 165, sentiment: -0.45 }
    },
    publisherVolumes: {
      'pub-bloomberg': { volume: 125, sentiment: -0.22 },
      'pub-reuters': { volume: 115, sentiment: -0.18 },
      'pub-wsj': { volume: 98, sentiment: 0.35 },
      'pub-ft': { volume: 88, sentiment: -0.12 },
      'pub-xinhua': { volume: 165, sentiment: -0.85 },
      'pub-globaltimes': { volume: 142, sentiment: -0.92 },
      'pub-x': { volume: 245, sentiment: -0.35 },
      'pub-linkedin': { volume: 78, sentiment: -0.25 }
    },
    factionSources: {
      'faction-001': { 'pub-xinhua': 145, 'pub-globaltimes': 125, 'pub-cgtn': 85, 'pub-weibo': 95, 'pub-x': 65 },
      'faction-002': { 'pub-wsj': 85, 'pub-bloomberg': 75, 'pub-x': 125, 'pub-reuters': 65, 'pub-ft': 55 },
      'faction-004': { 'pub-xinhua': 45, 'pub-cgtn': 38, 'pub-globaltimes': 52, 'pub-scmp': 48, 'pub-x': 37 },
      'faction-006': { 'pub-bloomberg': 55, 'pub-reuters': 48, 'pub-nikkei': 35, 'pub-ft': 27 }
    },
    personIds: ['person-004', 'person-005', 'person-006', 'person-007'],
    organizationIds: ['org-002', 'org-004', 'org-005', 'org-006'],
    locationIds: ['loc-003', 'loc-004', 'loc-005'],
    eventIds: ['event-003', 'event-004', 'event-005'],
    volumeOverTime: [
      { date: '2026-01-12', factionVolumes: { 'faction-001': 95, 'faction-002': 125, 'faction-004': 55, 'faction-006': 42 }, publisherVolumes: { 'pub-bloomberg': 32, 'pub-reuters': 28, 'pub-xinhua': 42, 'pub-x': 62 } },
      { date: '2026-01-13', factionVolumes: { 'faction-001': 145, 'faction-002': 185, 'faction-004': 85, 'faction-006': 68 }, publisherVolumes: { 'pub-bloomberg': 48, 'pub-reuters': 42, 'pub-xinhua': 65, 'pub-x': 95 } },
      { date: '2026-01-14', factionVolumes: { 'faction-001': 215, 'faction-002': 265, 'faction-004': 125, 'faction-006': 98 }, publisherVolumes: { 'pub-bloomberg': 68, 'pub-reuters': 62, 'pub-xinhua': 95, 'pub-x': 138 } },
      { date: '2026-01-15', factionVolumes: { 'faction-001': 285, 'faction-002': 345, 'faction-004': 165, 'faction-006': 128 }, publisherVolumes: { 'pub-bloomberg': 88, 'pub-reuters': 82, 'pub-xinhua': 125, 'pub-x': 178 } },
      { date: '2026-01-16', factionVolumes: { 'faction-001': 345, 'faction-002': 405, 'faction-004': 195, 'faction-006': 148 }, publisherVolumes: { 'pub-bloomberg': 108, 'pub-reuters': 98, 'pub-xinhua': 148, 'pub-x': 218 } },
      { date: '2026-01-17', factionVolumes: { 'faction-001': 385, 'faction-002': 445, 'faction-004': 220, 'faction-006': 165 }, publisherVolumes: { 'pub-bloomberg': 125, 'pub-reuters': 115, 'pub-xinhua': 165, 'pub-x': 245 } }
    ],
    documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-008'],
    tagIds: ['tag-003'],
    createdAt: '2026-01-12T00:00:00Z'
  },
  {
    id: 'narr-003',
    text: 'China announces $47 billion semiconductor investment fund, third phase of "Big Fund"',
    description: 'China has launched the third phase of its National Integrated Circuit Industry Investment Fund, commonly known as the "Big Fund," with 340 billion yuan ($47 billion) in new capital. This is the largest tranche yet, exceeding the combined total of the first two phases. The fund will prioritize advanced packaging, chipmaking equipment, and EDA software development. Major state-owned enterprises and regional governments are contributing, signaling intensified commitment to semiconductor self-sufficiency amid US export controls.',
    missionId: 'mission-001',
    sentiment: 0.35,
    themeIds: ['sub-007', 'sub-008', 'sub-009'],
    factionMentions: {
      'faction-001': { volume: 425, sentiment: 0.85 },
      'faction-002': { volume: 285, sentiment: -0.55 },
      'faction-003': { volume: 195, sentiment: 0.22 },
      'faction-005': { volume: 145, sentiment: 0.65 }
    },
    publisherVolumes: {
      'pub-xinhua': { volume: 185, sentiment: 0.92 },
      'pub-caixin': { volume: 145, sentiment: 0.75 },
      'pub-scmp': { volume: 125, sentiment: 0.58 },
      'pub-bloomberg': { volume: 115, sentiment: -0.25 },
      'pub-reuters': { volume: 98, sentiment: -0.18 },
      'pub-ft': { volume: 85, sentiment: -0.22 },
      'pub-x': { volume: 165, sentiment: 0.28 },
      'pub-weibo': { volume: 142, sentiment: 0.82 }
    },
    factionSources: {
      'faction-001': { 'pub-xinhua': 165, 'pub-caixin': 125, 'pub-cgtn': 95, 'pub-weibo': 135, 'pub-scmp': 85 },
      'faction-002': { 'pub-wsj': 72, 'pub-bloomberg': 85, 'pub-x': 78, 'pub-reuters': 50 },
      'faction-003': { 'pub-semiengi': 52, 'pub-eetimes': 45, 'pub-bloomberg': 48, 'pub-ft': 50 },
      'faction-005': { 'pub-caixin': 55, 'pub-scmp': 48, 'pub-bloomberg': 42 }
    },
    personIds: ['person-008', 'person-009', 'person-010'],
    organizationIds: ['org-007', 'org-008', 'org-009'],
    locationIds: ['loc-002', 'loc-006'],
    eventIds: ['event-006', 'event-007'],
    volumeOverTime: [
      { date: '2026-01-17', factionVolumes: { 'faction-001': 145, 'faction-002': 98, 'faction-003': 65, 'faction-005': 48 }, publisherVolumes: { 'pub-xinhua': 62, 'pub-caixin': 48, 'pub-bloomberg': 38, 'pub-x': 55 } },
      { date: '2026-01-18', factionVolumes: { 'faction-001': 265, 'faction-002': 175, 'faction-003': 125, 'faction-005': 92 }, publisherVolumes: { 'pub-xinhua': 115, 'pub-caixin': 92, 'pub-bloomberg': 72, 'pub-x': 105 } },
      { date: '2026-01-19', factionVolumes: { 'faction-001': 345, 'faction-002': 235, 'faction-003': 165, 'faction-005': 125 }, publisherVolumes: { 'pub-xinhua': 152, 'pub-caixin': 125, 'pub-bloomberg': 95, 'pub-x': 138 } },
      { date: '2026-01-20', factionVolumes: { 'faction-001': 425, 'faction-002': 285, 'faction-003': 195, 'faction-005': 145 }, publisherVolumes: { 'pub-xinhua': 185, 'pub-caixin': 145, 'pub-bloomberg': 115, 'pub-x': 165 } }
    ],
    documentIds: ['doc-009', 'doc-010', 'doc-011'],
    tagIds: ['tag-001'],
    createdAt: '2026-01-17T00:00:00Z'
  },
  {
    id: 'narr-004',
    text: 'Huawei stockpiles semiconductor equipment ahead of expanded US sanctions',
    description: 'Multiple reports indicate Huawei has been aggressively stockpiling semiconductor manufacturing equipment and components in anticipation of expanded US export controls. Sources cite warehouses in Shenzhen containing billions of dollars worth of equipment from ASML, Applied Materials, and Lam Research purchased before restrictions took effect. US officials are investigating whether sanctions were circumvented through third-party intermediaries. Huawei denies any improper conduct.',
    missionId: 'mission-002',
    sentiment: -0.52,
    themeIds: ['sub-010', 'sub-011'],
    factionMentions: {
      'faction-001': { volume: 285, sentiment: -0.72 },
      'faction-002': { volume: 365, sentiment: 0.68 },
      'faction-003': { volume: 165, sentiment: -0.15 },
      'faction-006': { volume: 125, sentiment: -0.48 }
    },
    publisherVolumes: {
      'pub-bloomberg': { volume: 145, sentiment: -0.35 },
      'pub-wsj': { volume: 132, sentiment: 0.42 },
      'pub-reuters': { volume: 115, sentiment: -0.22 },
      'pub-xinhua': { volume: 95, sentiment: -0.78 },
      'pub-scmp': { volume: 88, sentiment: -0.45 },
      'pub-x': { volume: 178, sentiment: -0.38 },
      'pub-linkedin': { volume: 65, sentiment: -0.28 }
    },
    factionSources: {
      'faction-001': { 'pub-xinhua': 85, 'pub-scmp': 72, 'pub-cgtn': 58, 'pub-weibo': 70 },
      'faction-002': { 'pub-wsj': 115, 'pub-bloomberg': 95, 'pub-x': 105, 'pub-reuters': 50 },
      'faction-003': { 'pub-semiengi': 48, 'pub-eetimes': 42, 'pub-bloomberg': 45, 'pub-linkedin': 30 },
      'faction-006': { 'pub-bloomberg': 42, 'pub-reuters': 38, 'pub-nikkei': 28, 'pub-ft': 17 }
    },
    personIds: ['person-011', 'person-012', 'person-005'],
    organizationIds: ['org-010', 'org-002', 'org-011', 'org-012'],
    locationIds: ['loc-001', 'loc-004'],
    eventIds: ['event-008', 'event-009'],
    volumeOverTime: [
      { date: '2026-01-15', factionVolumes: { 'faction-001': 95, 'faction-002': 125, 'faction-003': 55, 'faction-006': 42 }, publisherVolumes: { 'pub-bloomberg': 48, 'pub-wsj': 45, 'pub-xinhua': 32, 'pub-x': 58 } },
      { date: '2026-01-16', factionVolumes: { 'faction-001': 145, 'faction-002': 195, 'faction-003': 85, 'faction-006': 65 }, publisherVolumes: { 'pub-bloomberg': 75, 'pub-wsj': 72, 'pub-xinhua': 48, 'pub-x': 92 } },
      { date: '2026-01-17', factionVolumes: { 'faction-001': 195, 'faction-002': 265, 'faction-003': 115, 'faction-006': 88 }, publisherVolumes: { 'pub-bloomberg': 105, 'pub-wsj': 98, 'pub-xinhua': 68, 'pub-x': 128 } },
      { date: '2026-01-18', factionVolumes: { 'faction-001': 245, 'faction-002': 325, 'faction-003': 145, 'faction-006': 108 }, publisherVolumes: { 'pub-bloomberg': 128, 'pub-wsj': 118, 'pub-xinhua': 82, 'pub-x': 158 } },
      { date: '2026-01-19', factionVolumes: { 'faction-001': 285, 'faction-002': 365, 'faction-003': 165, 'faction-006': 125 }, publisherVolumes: { 'pub-bloomberg': 145, 'pub-wsj': 132, 'pub-xinhua': 95, 'pub-x': 178 } }
    ],
    documentIds: ['doc-012', 'doc-013', 'doc-014'],
    tagIds: ['tag-002'],
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'narr-005',
    text: 'YMTC flash memory chips found in consumer devices despite US blacklist',
    description: 'Researchers have discovered flash memory chips manufactured by Yangtze Memory Technologies Co. (YMTC) in consumer electronics sold globally, despite the company being placed on the US Entity List in late 2022. The chips were found in products from multiple brands through supply chain analysis. YMTC\'s 232-layer NAND technology has proven competitive with Samsung and SK Hynix offerings. The discovery has reignited debates about the enforcement and effectiveness of semiconductor export controls.',
    missionId: 'mission-003',
    sentiment: -0.38,
    themeIds: ['sub-012', 'sub-013'],
    factionMentions: {
      'faction-001': { volume: 195, sentiment: 0.55 },
      'faction-002': { volume: 275, sentiment: -0.72 },
      'faction-003': { volume: 185, sentiment: 0.25 },
      'faction-006': { volume: 145, sentiment: -0.55 }
    },
    publisherVolumes: {
      'pub-semiengi': { volume: 95, sentiment: 0.18 },
      'pub-eetimes': { volume: 85, sentiment: 0.12 },
      'pub-bloomberg': { volume: 115, sentiment: -0.45 },
      'pub-wsj': { volume: 98, sentiment: -0.52 },
      'pub-scmp': { volume: 78, sentiment: 0.35 },
      'pub-x': { volume: 165, sentiment: -0.28 },
      'pub-reddit': { volume: 88, sentiment: 0.22 }
    },
    factionSources: {
      'faction-001': { 'pub-scmp': 65, 'pub-xinhua': 55, 'pub-weibo': 75 },
      'faction-002': { 'pub-wsj': 85, 'pub-bloomberg': 78, 'pub-x': 82, 'pub-reuters': 30 },
      'faction-003': { 'pub-semiengi': 82, 'pub-eetimes': 72, 'pub-anandtech': 31 },
      'faction-006': { 'pub-bloomberg': 52, 'pub-nikkei': 45, 'pub-reuters': 48 }
    },
    personIds: ['person-013', 'person-014'],
    organizationIds: ['org-013', 'org-014', 'org-015'],
    locationIds: ['loc-007', 'loc-004'],
    eventIds: ['event-010', 'event-011'],
    volumeOverTime: [
      { date: '2026-01-16', factionVolumes: { 'faction-001': 65, 'faction-002': 92, 'faction-003': 62, 'faction-006': 48 }, publisherVolumes: { 'pub-semiengi': 32, 'pub-bloomberg': 38, 'pub-x': 55 } },
      { date: '2026-01-17', factionVolumes: { 'faction-001': 115, 'faction-002': 165, 'faction-003': 115, 'faction-006': 88 }, publisherVolumes: { 'pub-semiengi': 58, 'pub-bloomberg': 72, 'pub-x': 98 } },
      { date: '2026-01-18', factionVolumes: { 'faction-001': 155, 'faction-002': 225, 'faction-003': 152, 'faction-006': 118 }, publisherVolumes: { 'pub-semiengi': 78, 'pub-bloomberg': 95, 'pub-x': 135 } },
      { date: '2026-01-19', factionVolumes: { 'faction-001': 195, 'faction-002': 275, 'faction-003': 185, 'faction-006': 145 }, publisherVolumes: { 'pub-semiengi': 95, 'pub-bloomberg': 115, 'pub-x': 165 } }
    ],
    documentIds: ['doc-015', 'doc-016', 'doc-017'],
    tagIds: ['tag-003'],
    createdAt: '2026-01-16T00:00:00Z'
  },
  {
    id: 'narr-006',
    text: 'Chinese companies develop alternatives to US EDA software tools',
    description: 'A consortium of Chinese technology companies has announced significant progress in developing indigenous electronic design automation (EDA) software to replace tools from US firms Cadence, Synopsys, and Mentor Graphics. Empyrean Technology and Huada Jiutian are leading the effort with government backing. While current tools lag behind US offerings, the companies claim their software can now handle designs up to 14nm, with 7nm capability expected within two years.',
    missionId: 'mission-003',
    sentiment: 0.28,
    themeIds: ['sub-014', 'sub-015'],
    factionMentions: {
      'faction-001': { volume: 245, sentiment: 0.82 },
      'faction-002': { volume: 165, sentiment: -0.48 },
      'faction-003': { volume: 215, sentiment: 0.35 },
      'faction-005': { volume: 125, sentiment: 0.72 }
    },
    publisherVolumes: {
      'pub-semiengi': { volume: 115, sentiment: 0.28 },
      'pub-eetimes': { volume: 98, sentiment: 0.22 },
      'pub-xinhua': { volume: 135, sentiment: 0.85 },
      'pub-caixin': { volume: 95, sentiment: 0.68 },
      'pub-scmp': { volume: 78, sentiment: 0.52 },
      'pub-x': { volume: 145, sentiment: 0.32 },
      'pub-linkedin': { volume: 72, sentiment: 0.42 }
    },
    factionSources: {
      'faction-001': { 'pub-xinhua': 115, 'pub-caixin': 82, 'pub-scmp': 65, 'pub-weibo': 85 },
      'faction-002': { 'pub-wsj': 55, 'pub-bloomberg': 48, 'pub-x': 62 },
      'faction-003': { 'pub-semiengi': 95, 'pub-eetimes': 82, 'pub-linkedin': 38 },
      'faction-005': { 'pub-caixin': 45, 'pub-scmp': 38, 'pub-xinhua': 42 }
    },
    personIds: ['person-015', 'person-016'],
    organizationIds: ['org-016', 'org-017', 'org-018', 'org-019'],
    locationIds: ['loc-002', 'loc-008'],
    eventIds: ['event-012'],
    volumeOverTime: [
      { date: '2026-01-18', factionVolumes: { 'faction-001': 85, 'faction-002': 58, 'faction-003': 75, 'faction-005': 42 }, publisherVolumes: { 'pub-semiengi': 38, 'pub-xinhua': 45, 'pub-x': 48 } },
      { date: '2026-01-19', factionVolumes: { 'faction-001': 165, 'faction-002': 115, 'faction-003': 148, 'faction-005': 85 }, publisherVolumes: { 'pub-semiengi': 78, 'pub-xinhua': 92, 'pub-x': 98 } },
      { date: '2026-01-20', factionVolumes: { 'faction-001': 245, 'faction-002': 165, 'faction-003': 215, 'faction-005': 125 }, publisherVolumes: { 'pub-semiengi': 115, 'pub-xinhua': 135, 'pub-x': 145 } }
    ],
    documentIds: ['doc-018', 'doc-019'],
    tagIds: ['tag-001'],
    createdAt: '2026-01-18T00:00:00Z'
  },
  {
    id: 'narr-007',
    text: 'TSMC Arizona fab faces delays and cost overruns amid worker disputes',
    description: 'Taiwan Semiconductor Manufacturing Company\'s $40 billion Arizona fabrication facility faces mounting challenges including construction delays, cost overruns, and conflicts between Taiwanese and American workers. Local unions have criticized TSMC\'s management practices, while company officials have expressed frustration with US worker productivity. The plant, initially planned to begin production in 2024, is now targeting late 2025 for 4nm chips. The setbacks raise questions about the feasibility of reshoring advanced semiconductor manufacturing to the US.',
    missionId: 'mission-002',
    sentiment: -0.42,
    themeIds: ['sub-016', 'sub-017'],
    factionMentions: {
      'faction-001': { volume: 145, sentiment: 0.45 },
      'faction-002': { volume: 225, sentiment: -0.35 },
      'faction-005': { volume: 185, sentiment: -0.58 },
      'faction-006': { volume: 165, sentiment: -0.48 }
    },
    publisherVolumes: {
      'pub-bloomberg': { volume: 135, sentiment: -0.38 },
      'pub-reuters': { volume: 118, sentiment: -0.32 },
      'pub-wsj': { volume: 105, sentiment: -0.28 },
      'pub-ft': { volume: 88, sentiment: -0.35 },
      'pub-nikkei': { volume: 95, sentiment: -0.42 },
      'pub-scmp': { volume: 72, sentiment: 0.38 },
      'pub-x': { volume: 185, sentiment: -0.45 },
      'pub-linkedin': { volume: 78, sentiment: -0.32 }
    },
    factionSources: {
      'faction-001': { 'pub-scmp': 65, 'pub-globaltimes': 48, 'pub-x': 32 },
      'faction-002': { 'pub-wsj': 75, 'pub-bloomberg': 82, 'pub-x': 68 },
      'faction-005': { 'pub-bloomberg': 62, 'pub-nikkei': 78, 'pub-ft': 45 },
      'faction-006': { 'pub-bloomberg': 55, 'pub-reuters': 62, 'pub-nikkei': 48 }
    },
    personIds: ['person-017', 'person-018', 'person-019'],
    organizationIds: ['org-020', 'org-021'],
    locationIds: ['loc-009', 'loc-010'],
    eventIds: ['event-013', 'event-014'],
    volumeOverTime: [
      { date: '2026-01-14', factionVolumes: { 'faction-001': 48, 'faction-002': 75, 'faction-005': 62, 'faction-006': 55 }, publisherVolumes: { 'pub-bloomberg': 45, 'pub-wsj': 35, 'pub-x': 62 } },
      { date: '2026-01-15', factionVolumes: { 'faction-001': 72, 'faction-002': 115, 'faction-005': 95, 'faction-006': 85 }, publisherVolumes: { 'pub-bloomberg': 68, 'pub-wsj': 55, 'pub-x': 95 } },
      { date: '2026-01-16', factionVolumes: { 'faction-001': 98, 'faction-002': 155, 'faction-005': 128, 'faction-006': 115 }, publisherVolumes: { 'pub-bloomberg': 92, 'pub-wsj': 72, 'pub-x': 128 } },
      { date: '2026-01-17', factionVolumes: { 'faction-001': 125, 'faction-002': 192, 'faction-005': 158, 'faction-006': 142 }, publisherVolumes: { 'pub-bloomberg': 115, 'pub-wsj': 88, 'pub-x': 158 } },
      { date: '2026-01-18', factionVolumes: { 'faction-001': 145, 'faction-002': 225, 'faction-005': 185, 'faction-006': 165 }, publisherVolumes: { 'pub-bloomberg': 135, 'pub-wsj': 105, 'pub-x': 185 } }
    ],
    documentIds: ['doc-020', 'doc-021', 'doc-022'],
    tagIds: ['tag-002'],
    createdAt: '2026-01-14T00:00:00Z'
  },
  {
    id: 'narr-008',
    text: 'Intel struggles to compete as foundry business falters',
    description: 'Intel Corporation faces mounting challenges as its foundry business fails to gain traction against TSMC and Samsung. A major restructuring in June 2025 results in 15,000 layoffs, and a September quarterly loss sends the stock plunging. However, the company secures $8.5 billion in CHIPS Act funding in December, providing a lifeline for its US manufacturing ambitions. Industry analysts question whether Intel can execute its turnaround strategy.',
    missionId: 'mission-002',
    sentiment: -0.45,
    themeIds: ['sub-018', 'sub-019'],
    factionMentions: {
      'faction-002': { volume: 165, sentiment: -0.38 },
      'faction-005': { volume: 285, sentiment: -0.55 },
      'faction-006': { volume: 145, sentiment: 0.35 }
    },
    publisherVolumes: {
      'pub-bloomberg': { volume: 125, sentiment: -0.48 },
      'pub-wsj': { volume: 108, sentiment: -0.42 },
      'pub-semiengi': { volume: 95, sentiment: -0.35 },
      'pub-eetimes': { volume: 85, sentiment: -0.32 },
      'pub-x': { volume: 145, sentiment: -0.52 }
    },
    factionSources: {
      'faction-002': { 'pub-wsj': 72, 'pub-bloomberg': 58, 'pub-x': 35 },
      'faction-005': { 'pub-bloomberg': 95, 'pub-semiengi': 82, 'pub-eetimes': 68, 'pub-x': 85 },
      'faction-006': { 'pub-bloomberg': 55, 'pub-semiengi': 48, 'pub-x': 42 }
    },
    personIds: ['person-020'],
    organizationIds: ['org-027', 'org-005'],
    locationIds: ['loc-012', 'loc-004'],
    eventIds: ['event-015', 'event-020', 'event-026'],
    volumeOverTime: [
      { date: '2025-06-20', factionVolumes: { 'faction-002': 55, 'faction-005': 95, 'faction-006': 48 }, publisherVolumes: { 'pub-bloomberg': 42, 'pub-wsj': 35, 'pub-semiengi': 32 } },
      { date: '2025-09-15', factionVolumes: { 'faction-002': 115, 'faction-005': 195, 'faction-006': 98 }, publisherVolumes: { 'pub-bloomberg': 85, 'pub-wsj': 72, 'pub-semiengi': 65 } },
      { date: '2025-12-10', factionVolumes: { 'faction-002': 165, 'faction-005': 285, 'faction-006': 145 }, publisherVolumes: { 'pub-bloomberg': 125, 'pub-wsj': 108, 'pub-semiengi': 95 } }
    ],
    documentIds: ['doc-036', 'doc-037', 'doc-043', 'doc-053', 'doc-057'],
    tagIds: ['tag-003'],
    createdAt: '2025-06-20T00:00:00Z'
  },
  {
    id: 'narr-009',
    text: 'South Korea semiconductor subsidies spark trade tensions',
    description: 'South Korea\'s announcement of $17 billion in semiconductor subsidies triggers trade tensions with the United States. The US objects at the WTO, arguing the subsidies distort global competition. Samsung and SK Hynix defend the investments as essential for maintaining technological leadership, while Korean government officials push back against US criticism. The dispute highlights challenges in allied efforts to counter China\'s chip ambitions.',
    missionId: 'mission-002',
    sentiment: -0.38,
    themeIds: ['sub-020', 'sub-021'],
    factionMentions: {
      'faction-002': { volume: 175, sentiment: -0.42 },
      'faction-006': { volume: 225, sentiment: 0.55 }
    },
    publisherVolumes: {
      'pub-reuters': { volume: 95, sentiment: -0.28 },
      'pub-ft': { volume: 85, sentiment: -0.35 },
      'pub-wsj': { volume: 78, sentiment: -0.42 },
      'pub-semiengi': { volume: 65, sentiment: 0.25 },
      'pub-x': { volume: 125, sentiment: -0.32 }
    },
    factionSources: {
      'faction-002': { 'pub-wsj': 68, 'pub-reuters': 52, 'pub-ft': 55 },
      'faction-006': { 'pub-reuters': 72, 'pub-semiengi': 58, 'pub-ft': 48, 'pub-x': 85 }
    },
    personIds: ['person-022', 'person-023'],
    organizationIds: ['org-014', 'org-029', 'org-032', 'org-005'],
    locationIds: ['loc-011', 'loc-004'],
    eventIds: ['event-016', 'event-017', 'event-022'],
    volumeOverTime: [
      { date: '2025-07-05', factionVolumes: { 'faction-002': 55, 'faction-006': 85 }, publisherVolumes: { 'pub-reuters': 32, 'pub-ft': 28, 'pub-x': 42 } },
      { date: '2025-07-25', factionVolumes: { 'faction-002': 115, 'faction-006': 145 }, publisherVolumes: { 'pub-reuters': 62, 'pub-wsj': 52, 'pub-ft': 48, 'pub-x': 85 } },
      { date: '2025-10-25', factionVolumes: { 'faction-002': 155, 'faction-006': 195 }, publisherVolumes: { 'pub-reuters': 82, 'pub-wsj': 68, 'pub-ft': 72, 'pub-x': 108 } },
      { date: '2025-12-28', factionVolumes: { 'faction-002': 175, 'faction-006': 225 }, publisherVolumes: { 'pub-reuters': 95, 'pub-wsj': 78, 'pub-ft': 85, 'pub-x': 125 } }
    ],
    documentIds: ['doc-038', 'doc-039', 'doc-046', 'doc-049', 'doc-055', 'doc-060'],
    tagIds: ['tag-001'],
    createdAt: '2025-07-05T00:00:00Z'
  },
  {
    id: 'narr-010',
    text: 'China rare earth export restrictions tighten chip supply chain',
    description: 'China announces rare earth export quotas in August 2025, followed by tighter controls on gallium and germanium in October. The restrictions target materials essential for semiconductor manufacturing, raising supply chain concerns among US and allied chipmakers. Industry leaders warn of potential shortages, while China defends the measures as resource conservation. The moves are widely seen as retaliation for Western export controls on chip equipment.',
    missionId: 'mission-002',
    sentiment: -0.55,
    themeIds: ['sub-022', 'sub-023'],
    factionMentions: {
      'faction-001': { volume: 285, sentiment: 0.72 },
      'faction-002': { volume: 245, sentiment: -0.68 },
      'faction-004': { volume: 195, sentiment: 0.78 }
    },
    publisherVolumes: {
      'pub-xinhua': { volume: 145, sentiment: 0.82 },
      'pub-bloomberg': { volume: 125, sentiment: -0.55 },
      'pub-scmp': { volume: 95, sentiment: 0.45 },
      'pub-eetimes': { volume: 75, sentiment: -0.38 },
      'pub-x': { volume: 165, sentiment: -0.42 }
    },
    factionSources: {
      'faction-001': { 'pub-xinhua': 125, 'pub-scmp': 78, 'pub-x': 82 },
      'faction-002': { 'pub-bloomberg': 95, 'pub-eetimes': 62, 'pub-x': 88 },
      'faction-004': { 'pub-xinhua': 98, 'pub-scmp': 55, 'pub-x': 42 }
    },
    personIds: ['person-024', 'person-025'],
    organizationIds: ['org-030', 'org-005', 'org-006', 'org-009'],
    locationIds: ['loc-006', 'loc-004'],
    eventIds: ['event-018', 'event-019', 'event-023'],
    volumeOverTime: [
      { date: '2025-08-10', factionVolumes: { 'faction-001': 95, 'faction-002': 82, 'faction-004': 65 }, publisherVolumes: { 'pub-xinhua': 48, 'pub-bloomberg': 42, 'pub-x': 55 } },
      { date: '2025-08-25', factionVolumes: { 'faction-001': 165, 'faction-002': 145, 'faction-004': 115 }, publisherVolumes: { 'pub-xinhua': 85, 'pub-bloomberg': 75, 'pub-x': 98 } },
      { date: '2025-10-15', factionVolumes: { 'faction-001': 235, 'faction-002': 205, 'faction-004': 165 }, publisherVolumes: { 'pub-xinhua': 118, 'pub-bloomberg': 105, 'pub-x': 135 } },
      { date: '2026-01-08', factionVolumes: { 'faction-001': 285, 'faction-002': 245, 'faction-004': 195 }, publisherVolumes: { 'pub-xinhua': 145, 'pub-bloomberg': 125, 'pub-x': 165 } }
    ],
    documentIds: ['doc-040', 'doc-041', 'doc-042', 'doc-047', 'doc-048', 'doc-058'],
    tagIds: ['tag-002'],
    createdAt: '2025-08-10T00:00:00Z'
  },
  {
    id: 'narr-011',
    text: 'Nvidia AI chip demand outpaces production capacity',
    description: 'Nvidia reports record demand for its AI chips, with customers waiting months for deliveries. The shortage intensifies competition in the AI accelerator market, with AMD and Intel racing to offer alternatives. SK Hynix ramps up HBM production to meet demand, while industry analysts debate whether the AI chip boom is sustainable or a bubble.',
    missionId: 'mission-003',
    sentiment: 0.42,
    themeIds: ['sub-024', 'sub-025'],
    factionMentions: {
      'faction-002': { volume: 145, sentiment: 0.55 },
      'faction-003': { volume: 185, sentiment: 0.62 },
      'faction-005': { volume: 265, sentiment: 0.72 },
      'faction-006': { volume: 195, sentiment: 0.65 }
    },
    publisherVolumes: {
      'pub-bloomberg': { volume: 145, sentiment: 0.58 },
      'pub-wsj': { volume: 125, sentiment: 0.52 },
      'pub-semiengi': { volume: 115, sentiment: 0.65 },
      'pub-eetimes': { volume: 98, sentiment: 0.58 },
      'pub-x': { volume: 185, sentiment: 0.48 }
    },
    factionSources: {
      'faction-002': { 'pub-wsj': 62, 'pub-bloomberg': 55, 'pub-x': 28 },
      'faction-003': { 'pub-semiengi': 95, 'pub-eetimes': 82, 'pub-x': 58 },
      'faction-005': { 'pub-bloomberg': 105, 'pub-wsj': 85, 'pub-semiengi': 75 },
      'faction-006': { 'pub-bloomberg': 72, 'pub-semiengi': 65, 'pub-x': 58 }
    },
    personIds: ['person-021', 'person-023', 'person-026'],
    organizationIds: ['org-028', 'org-029', 'org-031'],
    locationIds: ['loc-012', 'loc-011'],
    eventIds: ['event-021', 'event-022', 'event-025'],
    volumeOverTime: [
      { date: '2025-09-20', factionVolumes: { 'faction-002': 55, 'faction-003': 72, 'faction-005': 105, 'faction-006': 78 }, publisherVolumes: { 'pub-bloomberg': 55, 'pub-wsj': 48, 'pub-semiengi': 42 } },
      { date: '2025-10-01', factionVolumes: { 'faction-002': 85, 'faction-003': 108, 'faction-005': 158, 'faction-006': 118 }, publisherVolumes: { 'pub-bloomberg': 85, 'pub-wsj': 72, 'pub-semiengi': 68 } },
      { date: '2025-11-20', factionVolumes: { 'faction-002': 115, 'faction-003': 145, 'faction-005': 215, 'faction-006': 158 }, publisherVolumes: { 'pub-bloomberg': 115, 'pub-wsj': 98, 'pub-semiengi': 92 } },
      { date: '2026-01-10', factionVolumes: { 'faction-002': 145, 'faction-003': 185, 'faction-005': 265, 'faction-006': 195 }, publisherVolumes: { 'pub-bloomberg': 145, 'pub-wsj': 125, 'pub-semiengi': 115 } }
    ],
    documentIds: ['doc-044', 'doc-045', 'doc-046', 'doc-051', 'doc-052', 'doc-056', 'doc-059'],
    tagIds: ['tag-003'],
    createdAt: '2025-09-20T00:00:00Z'
  }
];
