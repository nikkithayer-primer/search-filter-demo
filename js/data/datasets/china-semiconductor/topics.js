/**
 * Topics for China Semiconductor dataset
 */

export const topics = [
  {
    id: 'topic-001',
    headline: 'SMIC Achieves 5nm Chip Production Using DUV Multi-Patterning',
    description: 'China\'s Semiconductor Manufacturing International Corporation has achieved mass production of 5nm chips without access to EUV lithography, using complex multi-patterning techniques that, while costly and low-yield, demonstrate significant progress in China\'s semiconductor self-sufficiency efforts.',
    bulletPoints: [
      'SMIC has confirmed it is now mass-producing 5nm chips without access to ASML\'s extreme ultraviolet lithography systems, marking a significant technical milestone.',
      'The multi-patterning approach SMIC is using results in manufacturing costs 2-3 times higher and yields of only 20-35% compared to industry standards achieved with EUV.',
      'Huawei\'s flagship Mate 70 smartphone has been confirmed to use the SMIC-manufactured Kirin 9100 processor, demonstrating real-world application of the domestically produced chips.',
      'The achievement has raised questions among US policymakers about the effectiveness of export controls designed to limit China\'s advanced semiconductor capabilities.'
    ],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004', 'doc-023', 'doc-024', 'doc-025', 'doc-029', 'doc-031'],
    tagIds: ['tag-002'],
    startDate: '2026-01-14',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-14', volume: 195 },
      { date: '2026-01-15', volume: 287 },
      { date: '2026-01-16', volume: 428 },
      { date: '2026-01-17', volume: 598 },
      { date: '2026-01-18', volume: 725 },
      { date: '2026-01-19', volume: 875 },
      { date: '2026-01-20', volume: 1090 }
    ],
    createdAt: '2026-01-14T10:00:00Z'
  },
  {
    id: 'topic-002',
    headline: 'Netherlands Expands ASML Export Restrictions to Block DUV Systems',
    description: 'The Dutch government has significantly expanded export controls on ASML semiconductor equipment to include advanced deep ultraviolet lithography systems, a move that will substantially impact ASML\'s revenue while further constraining China\'s chip manufacturing capabilities.',
    bulletPoints: [
      'The Dutch government has expanded export controls to include advanced DUV lithography systems, closing a loophole that allowed some sophisticated equipment to reach Chinese manufacturers.',
      'ASML has warned investors that the expanded restrictions will reduce the company\'s annual revenue by approximately $2.5 billion as it loses access to the Chinese market.',
      'US Commerce Secretary Gina Raimondo defended the coordinated controls as essential for national security, emphasizing the need for allied cooperation on technology restrictions.',
      'Chinese Foreign Ministry officials condemned the expanded restrictions as "technological hegemony" and warned of countermeasures against Dutch economic interests.'
    ],
    documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-008', 'doc-026', 'doc-027', 'doc-028', 'doc-032'],
    tagIds: ['tag-003'],
    startDate: '2026-01-12',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-12', volume: 317 },
      { date: '2026-01-13', volume: 413 },
      { date: '2026-01-14', volume: 603 },
      { date: '2026-01-15', volume: 723 },
      { date: '2026-01-16', volume: 843 },
      { date: '2026-01-17', volume: 1015 }
    ],
    createdAt: '2026-01-12T16:00:00Z'
  },
  {
    id: 'topic-003',
    headline: 'China Launches $47 Billion Big Fund III for Semiconductor Self-Sufficiency',
    description: 'China has launched the third and largest phase of its National Integrated Circuit Industry Investment Fund, with 340 billion yuan ($47 billion) earmarked for critical areas including advanced packaging, semiconductor equipment, and EDA software development.',
    bulletPoints: [
      'The third phase of China\'s National IC Fund totals 340 billion yuan ($47 billion), making it the largest single investment tranche in China\'s semiconductor self-sufficiency program.',
      'Big Fund III priorities include advanced packaging technologies, domestic semiconductor equipment manufacturing, and electronic design automation software development.',
      'State-owned enterprises are providing the majority of capital for the fund, with participation from major banks and provincial governments across China.',
      'Industry analysts question whether even this massive investment can overcome the fundamental equipment access barriers created by Western export controls.'
    ],
    documentIds: ['doc-009', 'doc-010', 'doc-011', 'doc-033'],
    startDate: '2026-01-17',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-17', volume: 598 },
      { date: '2026-01-18', volume: 755 },
      { date: '2026-01-19', volume: 805 },
      { date: '2026-01-20', volume: 725 }
    ],
    createdAt: '2026-01-17T12:00:00Z'
  },
  {
    id: 'topic-004',
    headline: 'US Investigates Huawei Equipment Stockpiling Ahead of Sanctions',
    description: 'The US Commerce Department has opened an investigation into reports that Huawei accumulated billions of dollars worth of semiconductor manufacturing equipment through third-party intermediaries ahead of sanctions implementation, potentially circumventing export controls.',
    bulletPoints: [
      'Huawei has reportedly accumulated between $5 and $8 billion worth of semiconductor manufacturing equipment in the period before and during the implementation of US sanctions.',
      'The Commerce Department\'s Bureau of Industry and Security has opened a formal investigation into potential sanctions circumvention and violations of export control regulations.',
      'Equipment was allegedly acquired through a network of third-party intermediaries in countries not subject to the same export restrictions as the United States.',
      'Huawei has issued a statement denying any violations of sanctions regimes and dismissing the reports as "speculation without factual basis."'
    ],
    documentIds: ['doc-012', 'doc-013', 'doc-014', 'doc-032'],
    tagIds: ['tag-001'],
    startDate: '2026-01-15',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-15', volume: 245 },
      { date: '2026-01-16', volume: 312 },
      { date: '2026-01-17', volume: 478 },
      { date: '2026-01-18', volume: 565 },
      { date: '2026-01-19', volume: 680 }
    ],
    createdAt: '2026-01-15T13:00:00Z'
  },
  {
    id: 'topic-005',
    headline: 'YMTC Memory Chips Found in Global Products Despite Entity List',
    description: 'Yangtze Memory Technologies\' advanced 232-layer NAND flash chips have been discovered in consumer electronics products worldwide despite the company\'s placement on the US Entity List, raising concerns about enforcement effectiveness and supply chain tracking.',
    bulletPoints: [
      'Technology analysis firm TechInsights has confirmed the presence of YMTC\'s 232-layer NAND chips in multiple consumer electronics devices available in Western markets.',
      'The YMTC chips demonstrate performance characteristics that match or exceed those of Samsung and SK Hynix products in key industry benchmarks.',
      'The chips are reportedly reaching global markets through assembly operations in Southeast Asia and relabeling by intermediary companies that obscure their origin.',
      'The discovery raises serious questions about the effectiveness of Entity List enforcement and the ability to track components through complex global supply chains.'
    ],
    documentIds: ['doc-015', 'doc-016', 'doc-017', 'doc-034'],
    startDate: '2026-01-16',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-16', volume: 178 },
      { date: '2026-01-17', volume: 256 },
      { date: '2026-01-18', volume: 398 },
      { date: '2026-01-19', volume: 512 },
      { date: '2026-01-20', volume: 478 }
    ],
    createdAt: '2026-01-16T12:00:00Z'
  },
  {
    id: 'topic-006',
    headline: 'Chinese EDA Firms Accelerate Development to Reduce Western Dependency',
    description: 'Chinese electronic design automation companies are rapidly advancing their capabilities with significant government backing, aiming to reduce the industry\'s near-total dependence on Western EDA tools from Cadence and Synopsys.',
    bulletPoints: [
      'Empyrean Technology has announced EDA tools capable of supporting chip designs at 14nm process nodes, representing significant progress in domestic capability development.',
      'Competitor Huada Jiutian has publicly stated its goal to achieve 7nm EDA tool capability within two years, targeting parity with Western tools at advanced nodes.',
      'The Big Fund III investment program has designated EDA software development as a priority area, allocating substantial resources to accelerate domestic tool maturation.',
      'The Chinese semiconductor industry\'s goal is to substantially reduce its dependency on Cadence and Synopsys, whose tools currently dominate the global EDA market.'
    ],
    documentIds: ['doc-018', 'doc-019', 'doc-033'],
    startDate: '2026-01-19',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-19', volume: 145 },
      { date: '2026-01-20', volume: 234 }
    ],
    createdAt: '2026-01-19T11:00:00Z'
  },
  {
    id: 'topic-007',
    headline: 'TSMC Arizona Fab Faces Delays and Workforce Culture Clashes',
    description: 'TSMC\'s $40 billion Arizona fabrication facility has encountered significant delays and workforce tensions, with production starts pushed back and unions filing grievances, while Chinese state media amplifies the narrative of US manufacturing challenges.',
    bulletPoints: [
      'The $40 billion TSMC Arizona fab has delayed its production start to late 2025, missing the originally announced 2024 target by approximately one year.',
      'Arizona construction unions have filed formal grievances citing concerns about TSMC management practices and alleged violations of local labor standards.',
      'TSMC CEO C.C. Wei publicly acknowledged "different work culture" challenges in adapting the company\'s Taiwan-based management approach to the American workforce.',
      'Chinese state media outlets have extensively covered the delays and labor disputes, amplifying narratives about the decline of American manufacturing capabilities.'
    ],
    documentIds: ['doc-020', 'doc-021', 'doc-022', 'doc-030', 'doc-035'],
    tagIds: ['tag-002'],
    startDate: '2026-01-14',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-14', volume: 302 },
      { date: '2026-01-15', volume: 368 },
      { date: '2026-01-16', volume: 471 },
      { date: '2026-01-17', volume: 598 },
      { date: '2026-01-18', volume: 575 }
    ],
    createdAt: '2026-01-14T09:00:00Z'
  },
  {
    id: 'topic-008',
    headline: 'Intel Struggles While Nvidia Soars in Chip Wars',
    description: 'The semiconductor industry is witnessing a dramatic divergence in fortunes, with Intel announcing major layoffs and reporting significant losses while Nvidia posts record earnings driven by unprecedented AI chip demand, and CHIPS Act funding attempts to stabilize the American chipmaker.',
    bulletPoints: [
      'Intel has announced plans to lay off 15,000 employees as part of a major corporate restructuring aimed at reducing costs and refocusing on core competencies.',
      'The company reported a $1.6 billion quarterly loss, causing Intel stock to plunge 15% in a single trading session as investors reassessed its competitive position.',
      'Nvidia has crushed earnings expectations on the back of record demand for its AI chips, with data center revenue growing over 400% year-over-year.',
      'Intel has secured $8.5 billion in CHIPS Act funding, which analysts describe as a critical lifeline for the company\'s foundry ambitions and domestic manufacturing expansion.',
      'AMD and other competitors are racing to challenge Nvidia\'s dominance in the AI chip market, introducing competing products targeting the same data center workloads.'
    ],
    documentIds: ['doc-036', 'doc-037', 'doc-043', 'doc-053', 'doc-057'],
    tagIds: ['tag-003'],
    startDate: '2025-06-20',
    endDate: null,
    volumeOverTime: [
      { date: '2025-06-20', volume: 285 },
      { date: '2025-09-15', volume: 425 },
      { date: '2025-09-20', volume: 512 },
      { date: '2025-12-10', volume: 365 },
      { date: '2026-01-06', volume: 295 }
    ],
    createdAt: '2025-06-20T09:00:00Z'
  },
  {
    id: 'topic-009',
    headline: 'China Rare Earth Controls Disrupt Chip Supply Chain',
    description: 'China has imposed export quotas on critical rare earth elements used in semiconductor manufacturing as apparent retaliation for Western technology controls, prompting US firms to scramble for alternative sources while drawing on existing stockpiles.',
    bulletPoints: [
      'China has imposed strict export quotas on rare earth elements essential for semiconductor manufacturing in what officials describe as retaliation for Western technology restrictions.',
      'Export restrictions on gallium and germanium, two elements critical for chip production, were tightened further in October 2025, reducing available quotas by an additional 30%.',
      'The Semiconductor Industry Association has warned that continued restrictions could cause significant production disruptions within 12-18 months if alternative sources are not secured.',
      'US semiconductor firms are scrambling to identify alternative sources and develop recycling technologies to reduce dependence on Chinese rare earth supplies.',
      'The impact of the restrictions has remained limited so far as major companies continue to draw on strategic stockpiles accumulated before the quotas took effect.'
    ],
    documentIds: ['doc-040', 'doc-041', 'doc-042', 'doc-047', 'doc-048', 'doc-058'],
    startDate: '2025-08-10',
    endDate: null,
    volumeOverTime: [
      { date: '2025-08-10', volume: 245 },
      { date: '2025-08-25', volume: 385 },
      { date: '2025-10-15', volume: 465 },
      { date: '2025-10-20', volume: 325 },
      { date: '2026-01-08', volume: 185 }
    ],
    createdAt: '2025-08-10T11:00:00Z'
  },
  {
    id: 'topic-010',
    headline: 'AI Chip Shortage Intensifies Global Competition',
    description: 'Unprecedented demand for AI processing capabilities has created severe shortages of specialized chips, with Nvidia reporting extended lead times while competitors race to introduce alternatives and memory manufacturers form unusual alliances to meet high-bandwidth memory requirements.',
    bulletPoints: [
      'Nvidia has reported record demand for its AI chips with lead times extending beyond six months, creating significant constraints for customers seeking to build AI infrastructure.',
      'SK Hynix and Samsung are both aggressively ramping production of high-bandwidth memory (HBM) chips essential for AI accelerators, investing billions in capacity expansion.',
      'AMD has launched its MI300 series as a direct competitor to Nvidia\'s H100, targeting the same data center AI workloads with competitive performance claims.',
      'TSMC has raised its capital expenditure guidance substantially to meet surging AI chip demand, prioritizing advanced node capacity for AI processor manufacturing.',
      'In a surprising development, Korean rivals SK Hynix and Samsung have announced a production alliance for HBM chips to address the supply shortage more rapidly.'
    ],
    documentIds: ['doc-044', 'doc-045', 'doc-046', 'doc-051', 'doc-052', 'doc-056', 'doc-059', 'doc-060'],
    startDate: '2025-09-20',
    endDate: null,
    volumeOverTime: [
      { date: '2025-09-20', volume: 325 },
      { date: '2025-10-01', volume: 412 },
      { date: '2025-11-20', volume: 485 },
      { date: '2026-01-05', volume: 545 },
      { date: '2026-01-12', volume: 425 }
    ],
    createdAt: '2025-09-20T16:00:00Z'
  }
];
