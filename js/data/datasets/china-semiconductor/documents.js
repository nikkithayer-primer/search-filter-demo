/**
 * Documents for China Semiconductor dataset
 * Includes news articles, social posts, and internal documents
 */

export const documents = [
  // News Article - SMIC breakthrough
  {
    id: 'doc-001',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'SMIC confirms 5nm chip mass production using DUV multi-patterning',
    url: 'https://semiengi.com/smic-5nm-duv-breakthrough-2026',
    publishedDate: '2026-01-15T08:30:00Z',
    publisherId: 'pub-semiengi',
    author: 'Mark Liu',
    excerpt: 'SMIC has confirmed it is mass producing 5nm chips using advanced multi-patterning techniques with DUV lithography, marking a significant milestone for Chinese semiconductor manufacturing.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/27',
      caption: 'SMIC semiconductor fabrication facility'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'SHANGHAI — Semiconductor Manufacturing International Corporation has confirmed it is now mass-producing 5-nanometer chips using deep ultraviolet lithography, a breakthrough that industry analysts say demonstrates China\'s ability to advance its semiconductor capabilities despite sweeping U.S. export restrictions.',
        entityMentions: [
          { startOffset: 11, endOffset: 62, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"This achievement proves that innovation cannot be contained by arbitrary trade barriers," said Zhao Haijun, co-CEO of SMIC, in a statement released Wednesday. "We have developed proprietary multi-patterning techniques that allow us to push the boundaries of what DUV lithography can achieve."',
        entityMentions: [
          { startOffset: 95, endOffset: 106, entityType: 'person', entityId: 'person-001' },
          { startOffset: 119, endOffset: 123, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The announcement marks a significant milestone in China\'s quest for semiconductor self-sufficiency. Since 2022, the United States has blocked Chinese companies from purchasing extreme ultraviolet lithography machines from ASML, the Dutch firm that holds a monopoly on the advanced equipment.',
        entityMentions: [
          { startOffset: 221, endOffset: 225, entityType: 'organization', entityId: 'org-002' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Technical achievement with limitations',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Industry experts caution that SMIC\'s approach, while impressive, comes with significant tradeoffs. Dylan Patel, chief analyst at SemiAnalysis, estimates that SMIC\'s multi-patterning process requires three to four times as many lithography steps as EUV-based production.',
        entityMentions: [
          { startOffset: 30, endOffset: 34, entityType: 'organization', entityId: 'org-001' },
          { startOffset: 93, endOffset: 104, entityType: 'person', entityId: 'person-003' },
          { startOffset: 128, endOffset: 140, entityType: 'organization', entityId: 'org-023' },
          { startOffset: 157, endOffset: 161, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"The yields are going to be substantially lower, probably in the 30-40% range compared to 80%+ for TSMC\'s EUV process," Patel told SemiEngineering. "That means higher costs per chip and limited ability to scale production volume."',
        entityMentions: [
          { startOffset: 99, endOffset: 103, entityType: 'organization', entityId: 'org-020' },
          { startOffset: 120, endOffset: 125, entityType: 'person', entityId: 'person-003' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Liang Mong Song, SMIC\'s co-CEO and the architect of its advanced process development, has been credited with driving the technical breakthrough. Liang, who previously worked at TSMC and Samsung, joined SMIC in 2017.',
        entityMentions: [
          { startOffset: 0, endOffset: 14, entityType: 'person', entityId: 'person-002' },
          { startOffset: 17, endOffset: 21, entityType: 'organization', entityId: 'org-001' },
          { startOffset: 145, endOffset: 150, entityType: 'person', entityId: 'person-002' },
          { startOffset: 178, endOffset: 182, entityType: 'organization', entityId: 'org-020' },
          { startOffset: 187, endOffset: 194, entityType: 'organization', entityId: 'org-014' },
          { startOffset: 203, endOffset: 207, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Washington response',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The U.S. Commerce Department declined to comment directly on SMIC\'s announcement but reiterated its commitment to preventing China from acquiring advanced semiconductor manufacturing capabilities.',
        entityMentions: [
          { startOffset: 4, endOffset: 27, entityType: 'organization', entityId: 'org-005' },
          { startOffset: 61, endOffset: 65, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We continue to monitor technological developments in China and will take additional action as needed to protect U.S. national security interests," a department spokesperson said.',
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-001-01',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'This achievement proves that innovation cannot be contained by arbitrary trade barriers.'
      },
      {
        id: 'quote-001-02',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'We have developed proprietary multi-patterning techniques that allow us to push the boundaries of what DUV lithography can achieve.'
      },
      {
        id: 'quote-001-03',
        speakerId: 'person-003',
        speakerType: 'person',
        text: 'The yields are going to be substantially lower, probably in the 30-40% range compared to 80%+ for TSMC\'s EUV process. That means higher costs per chip and limited ability to scale production volume.'
      }
    ],
    activities: [
      {
        id: 'activity-001-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'achieved',
        targetId: null,
        targetType: null,
        targetText: 'mass production of 5nm chips using DUV lithography'
      },
      {
        id: 'activity-001-02',
        actorId: 'person-001',
        actorType: 'person',
        action: 'criticized',
        targetId: 'org-005',
        targetType: 'organization',
        targetText: 'U.S. trade barriers'
      },
      {
        id: 'activity-001-03',
        actorId: 'person-003',
        actorType: 'person',
        action: 'cautioned about',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'SMIC\'s yield and cost limitations'
      }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001'],
    topicIds: ['topic-001'],
    personIds: ['person-001', 'person-002', 'person-003'],
    organizationIds: ['org-001', 'org-002', 'org-005', 'org-020', 'org-023'],
    locationIds: ['loc-001'],
    eventIds: ['event-001'],
    factionMentions: {
      'faction-001': { sentiment: 0.75 },
      'faction-002': { sentiment: -0.58 },
      'faction-003': { sentiment: 0.12 },
      'faction-011': { sentiment: 0.85 }
    },
    tagIds: ['tag-002'],
    highlights: [
      {
        id: 'highlight-101',
        userId: 'user-001',
        blockIndex: 0,
        startOffset: 11,
        endOffset: 62,
        highlightedText: 'Semiconductor Manufacturing International Corporation',
        createdAt: '2026-01-15T10:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-101',
        userId: 'user-001',
        blockIndex: 0,
        anchorStartOffset: 11,
        anchorEndOffset: 62,
        anchorText: 'Semiconductor Manufacturing International Corporation',
        content: 'Key development. This confirms the rumors we\'ve been tracking for months.',
        createdAt: '2026-01-15T10:15:00Z',
        replies: [
          {
            id: 'reply-101',
            userId: 'user-002',
            content: 'Agreed. Need to validate with our technical sources.',
            createdAt: '2026-01-15T10:45:00Z'
          }
        ]
      }
    ]
  },
  // News Article - SCMP report
  {
    id: 'doc-002',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'China\'s SMIC achieves advanced chip production without EUV machines',
    url: 'https://scmp.com/tech/smic-5nm-no-euv-2026',
    publishedDate: '2026-01-16T06:00:00Z',
    publisherId: 'pub-scmp',
    author: 'Che Pan',
    excerpt: 'In a major breakthrough, SMIC has demonstrated the ability to produce 5nm chips without access to ASML\'s extreme ultraviolet lithography systems, though at lower yields.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/28',
      caption: 'SMIC chip production line'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'China\'s largest chip maker has achieved a technological feat that many in the industry thought impossible: mass producing advanced 5-nanometer semiconductors without access to the world\'s most sophisticated lithography equipment.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Semiconductor Manufacturing International Corporation, better known as SMIC, announced Wednesday that it has begun volume production of 5nm chips at its Shanghai facility, relying entirely on deep ultraviolet lithography systems rather than the extreme ultraviolet machines that have been blocked from export to China.',
        entityMentions: [
          { startOffset: 0, endOffset: 52, entityType: 'organization', entityId: 'org-001' },
          { startOffset: 71, endOffset: 75, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We have been working on this for years, and today we can say that sanctions have failed to stop Chinese innovation," Zhao Haijun, co-chief executive of SMIC, said in a rare public appearance at an industry conference in Shanghai.',
        entityMentions: [
          { startOffset: 118, endOffset: 129, entityType: 'person', entityId: 'person-001' },
          { startOffset: 153, endOffset: 157, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The breakthrough represents a significant escalation in the technological race between China and the United States. Washington has spent the past three years building an increasingly tight web of export controls designed to keep Beijing at least two generations behind in chipmaking technology.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Questions remain about viability',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Western analysts remain skeptical about the commercial viability of SMIC\'s achievement. The company\'s multi-patterning approach requires significantly more processing steps than EUV-based manufacturing, driving up costs and reducing throughput.',
        entityMentions: [
          { startOffset: 68, endOffset: 72, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"It\'s an impressive technical achievement, but whether they can make it economically competitive is another question entirely," said Peter Wennink, chief executive of ASML, when asked about SMIC\'s announcement during an investor call.',
        entityMentions: [
          { startOffset: 131, endOffset: 144, entityType: 'person', entityId: 'person-004' },
          { startOffset: 167, endOffset: 171, entityType: 'organization', entityId: 'org-002' },
          { startOffset: 191, endOffset: 195, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'SMIC has not disclosed yield rates or production volumes, metrics that would help analysts assess the true scale and sustainability of its 5nm production.',
        entityMentions: [
          { startOffset: 0, endOffset: 4, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-002-01',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'We have been working on this for years, and today we can say that sanctions have failed to stop Chinese innovation.'
      },
      {
        id: 'quote-002-02',
        speakerId: 'person-004',
        speakerType: 'person',
        text: 'It\'s an impressive technical achievement, but whether they can make it economically competitive is another question entirely.'
      }
    ],
    activities: [
      {
        id: 'activity-002-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'volume production of 5nm chips'
      },
      {
        id: 'activity-002-02',
        actorId: 'person-001',
        actorType: 'person',
        action: 'declared victory over',
        targetId: 'org-005',
        targetType: 'organization',
        targetText: 'U.S. sanctions'
      },
      {
        id: 'activity-002-03',
        actorId: 'person-004',
        actorType: 'person',
        action: 'questioned',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'SMIC\'s economic viability'
      }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001'],
    topicIds: ['topic-001'],
    personIds: ['person-001', 'person-004'],
    organizationIds: ['org-001', 'org-002'],
    locationIds: ['loc-001'],
    eventIds: ['event-001'],
    factionMentions: {
      'faction-001': { sentiment: 0.72 },
      'faction-002': { sentiment: -0.55 },
      'faction-003': { sentiment: 0.18 },
      'faction-011': { sentiment: 0.85 }
    },
    tagIds: ['tag-003'],
    highlights: [],
    comments: []
  },
  // News Article - SemiAnalysis
  {
    id: 'doc-003',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Analysis: SMIC\'s 5nm achievement and what it means for export controls',
    url: 'https://semianalysis.com/smic-5nm-analysis',
    publishedDate: '2026-01-17T10:00:00Z',
    publisherId: 'pub-semiengi',
    author: 'Dylan Patel',
    excerpt: 'SemiAnalysis deep-dive into SMIC\'s technical approach reveals innovative multi-patterning but significant cost and yield penalties compared to EUV-based production.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/29',
      caption: 'Semiconductor wafer analysis'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'The semiconductor industry has been buzzing this week following SMIC\'s announcement that it has achieved mass production of 5nm chips using only DUV lithography. Our team at SemiAnalysis has spent the past 48 hours analyzing the available technical data, and our conclusions are nuanced.',
        entityMentions: [
          { startOffset: 64, endOffset: 68, entityType: 'organization', entityId: 'org-001' },
          { startOffset: 175, endOffset: 187, entityType: 'organization', entityId: 'org-023' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'First, the achievement is real. Based on die shots we\'ve obtained and cross-referenced with industry sources, SMIC is indeed producing functional 5nm silicon. The company appears to be using a sophisticated multi-patterning approach involving at least four separate DUV exposures for critical layers.',
        entityMentions: [
          { startOffset: 110, endOffset: 114, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'The cost problem',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'However, this comes at enormous cost. Our models suggest SMIC\'s per-wafer cost for 5nm production is approximately 2.5 to 3 times higher than TSMC\'s EUV-based process. Additionally, yields appear to be in the 30-40% range, compared to 80%+ for mature EUV nodes at TSMC and Samsung.',
        entityMentions: [
          { startOffset: 57, endOffset: 61, entityType: 'organization', entityId: 'org-001' },
          { startOffset: 143, endOffset: 147, entityType: 'organization', entityId: 'org-020' },
          { startOffset: 265, endOffset: 269, entityType: 'organization', entityId: 'org-020' },
          { startOffset: 274, endOffset: 281, entityType: 'organization', entityId: 'org-014' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"What SMIC has done is technically impressive, but the economics don\'t work for high-volume consumer products," I said during a webinar hosted by VLSI Research this week. "They can make chips for Huawei\'s premium phones, but they can\'t compete on cost for mass-market applications."',
        entityMentions: [
          { startOffset: 6, endOffset: 10, entityType: 'organization', entityId: 'org-001' },
          { startOffset: 146, endOffset: 159, entityType: 'organization', entityId: 'org-024' },
          { startOffset: 197, endOffset: 203, entityType: 'organization', entityId: 'org-010' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Implications for export controls',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The bigger question is what this means for U.S. policy. The Biden administration\'s export controls were designed to keep China at least "two generations behind" in semiconductor manufacturing. By that measure, they have failed—SMIC is now producing chips at the same node as the leading edge from just three years ago.',
        entityMentions: [
          { startOffset: 227, endOffset: 231, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Dan Hutcheson, chairman of VLSI Research, put it bluntly: "The controls have slowed China down, but they haven\'t stopped them. And now Beijing has even more motivation to achieve complete self-sufficiency."',
        entityMentions: [
          { startOffset: 0, endOffset: 13, entityType: 'person', entityId: 'person-014' },
          { startOffset: 27, endOffset: 40, entityType: 'organization', entityId: 'org-024' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-003-01',
        speakerId: 'person-003',
        speakerType: 'person',
        text: 'What SMIC has done is technically impressive, but the economics don\'t work for high-volume consumer products. They can make chips for Huawei\'s premium phones, but they can\'t compete on cost for mass-market applications.'
      },
      {
        id: 'quote-003-02',
        speakerId: 'person-014',
        speakerType: 'person',
        text: 'The controls have slowed China down, but they haven\'t stopped them. And now Beijing has even more motivation to achieve complete self-sufficiency.'
      }
    ],
    activities: [
      {
        id: 'activity-003-01',
        actorId: 'org-023',
        actorType: 'organization',
        action: 'analyzed',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'SMIC\'s 5nm technical approach'
      },
      {
        id: 'activity-003-02',
        actorId: 'person-003',
        actorType: 'person',
        action: 'criticized',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'SMIC\'s cost competitiveness'
      },
      {
        id: 'activity-003-03',
        actorId: 'person-014',
        actorType: 'person',
        action: 'criticized',
        targetId: 'org-005',
        targetType: 'organization',
        targetText: 'U.S. export control effectiveness'
      }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001', 'sub-003'],
    topicIds: ['topic-001'],
    personIds: ['person-003', 'person-014'],
    organizationIds: ['org-001', 'org-010', 'org-014', 'org-020', 'org-023', 'org-024'],
    locationIds: [],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.77 },
      'faction-002': { sentiment: -0.62 },
      'faction-003': { sentiment: 0.15 },
      'faction-011': { sentiment: 0.85 }
    },
    tagIds: ['tag-001'],
    highlights: [
      {
        id: 'highlight-102',
        userId: 'user-003',
        blockIndex: 0,
        startOffset: 64,
        endOffset: 68,
        highlightedText: 'SMIC',
        createdAt: '2026-01-17T12:00:00Z'
      }
    ],
    comments: []
  },
  // News Article - Bloomberg
  {
    id: 'doc-004',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'SMIC breakthrough raises questions about US chip strategy',
    url: 'https://bloomberg.com/smic-breakthrough-us-strategy',
    publishedDate: '2026-01-18T14:00:00Z',
    publisherId: 'pub-bloomberg',
    author: 'Ian King',
    excerpt: 'SMIC\'s unexpected advancement has sparked debate in Washington about the efficacy of semiconductor export controls and whether they are achieving their intended goals.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/30',
      caption: 'US Capitol building'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'WASHINGTON — China\'s surprise advancement in semiconductor manufacturing is prompting a rethink of U.S. export control strategy, with some lawmakers questioning whether the current approach is achieving its intended goals.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'SMIC\'s announcement this week that it has achieved mass production of 5-nanometer chips—without access to the extreme ultraviolet lithography machines that Washington has blocked—has sent shock waves through policy circles.',
        entityMentions: [
          { startOffset: 0, endOffset: 4, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"This is exactly what we were trying to prevent," said Senator Mark Warner, the Virginia Democrat who chairs the Senate Intelligence Committee. "We need to understand how this happened and whether our controls are actually working."',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Commerce Secretary Gina Raimondo, who has led the administration\'s efforts to restrict China\'s semiconductor capabilities, pushed back on criticism. "Our controls have absolutely slowed China\'s progress," she said at a press briefing Thursday. "Without them, they would be much further along."',
        entityMentions: [
          { startOffset: 20, endOffset: 32, entityType: 'person', entityId: 'person-005' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Debate over effectiveness',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Industry analysts are divided on the implications of SMIC\'s achievement. Dylan Patel, chief analyst at SemiAnalysis, noted that the Chinese company\'s process likely involves significant cost and yield penalties.',
        entityMentions: [
          { startOffset: 53, endOffset: 57, entityType: 'organization', entityId: 'org-001' },
          { startOffset: 73, endOffset: 84, entityType: 'person', entityId: 'person-003' },
          { startOffset: 103, endOffset: 115, entityType: 'organization', entityId: 'org-023' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"They\'ve shown they can make the chips, but can they make them economically?" Patel said. "The export controls have definitely made their path harder and more expensive."',
        entityMentions: [
          { startOffset: 78, endOffset: 83, entityType: 'person', entityId: 'person-003' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The Biden administration is already considering additional measures, including restrictions on equipment maintenance services that U.S. companies provide to Chinese chip makers.',
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-004-01',
        speakerId: 'person-005',
        speakerType: 'person',
        text: 'Our controls have absolutely slowed China\'s progress. Without them, they would be much further along.'
      },
      {
        id: 'quote-004-02',
        speakerId: 'person-003',
        speakerType: 'person',
        text: 'They\'ve shown they can make the chips, but can they make them economically? The export controls have definitely made their path harder and more expensive.'
      }
    ],
    activities: [
      {
        id: 'activity-004-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'undermined',
        targetId: 'org-005',
        targetType: 'organization',
        targetText: 'U.S. export control strategy'
      },
      {
        id: 'activity-004-02',
        actorId: 'person-005',
        actorType: 'person',
        action: 'defended',
        targetId: null,
        targetType: null,
        targetText: 'U.S. semiconductor export controls'
      }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-003'],
    topicIds: ['topic-001'],
    personIds: ['person-003', 'person-005'],
    organizationIds: ['org-001', 'org-005', 'org-023'],
    locationIds: ['loc-004'],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.74 },
      'faction-002': { sentiment: -0.59 },
      'faction-003': { sentiment: 0.16 },
      'faction-011': { sentiment: 0.85 }
    },
    tagIds: ['tag-002'],
    highlights: [],
    comments: []
  },
  // News Article - Reuters ASML
  {
    id: 'doc-005',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Netherlands expands ASML export restrictions to advanced DUV systems',
    url: 'https://reuters.com/netherlands-asml-duv-restrictions',
    publishedDate: '2026-01-12T15:00:00Z',
    publisherId: 'pub-reuters',
    author: 'Toby Sterling',
    excerpt: 'The Dutch government has announced expanded export controls blocking ASML from shipping advanced deep ultraviolet lithography systems to China.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/31',
      caption: 'ASML headquarters in Veldhoven, Netherlands'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'THE HAGUE — The Dutch government announced Friday that it will expand export controls on semiconductor manufacturing equipment, blocking ASML Holding NV from shipping its most advanced deep ultraviolet lithography systems to China.',
        entityMentions: [
          { startOffset: 85, endOffset: 93, entityType: 'organization', entityId: 'org-004' },
          { startOffset: 136, endOffset: 151, entityType: 'organization', entityId: 'org-002' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The restrictions, which take effect March 1, go beyond the EUV ban already in place and represent a significant escalation in Western efforts to contain China\'s semiconductor ambitions.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"These measures are necessary to protect our national security interests and those of our allies," said Liesje Schreinemacher, the Dutch minister for foreign trade, in a statement.',
        entityMentions: [
          { startOffset: 103, endOffset: 124, entityType: 'person', entityId: 'person-007' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'ASML, which dominates the global market for advanced lithography equipment, said it was "disappointed" by the decision but would comply with the new regulations.',
        entityMentions: [
          { startOffset: 0, endOffset: 4, entityType: 'organization', entityId: 'org-002' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We understand the geopolitical realities, but these restrictions will have a significant impact on our business," said Peter Wennink, ASML\'s chief executive. "We are evaluating the full implications."',
        entityMentions: [
          { startOffset: 118, endOffset: 131, entityType: 'person', entityId: 'person-004' },
          { startOffset: 133, endOffset: 137, entityType: 'organization', entityId: 'org-002' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'China denounces move',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Beijing swiftly condemned the announcement. A spokesperson for the Chinese Ministry of Commerce called it "a blatant act of technological bullying" that would "harm global supply chains and ultimately backfire on the perpetrators."',
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-005-01',
        speakerId: 'person-007',
        speakerType: 'person',
        text: 'These measures are necessary to protect our national security interests and those of our allies.'
      },
      {
        id: 'quote-005-02',
        speakerId: 'person-004',
        speakerType: 'person',
        text: 'We understand the geopolitical realities, but these restrictions will have a significant impact on our business. We are evaluating the full implications.'
      }
    ],
    activities: [
      {
        id: 'activity-005-01',
        actorId: 'org-004',
        actorType: 'organization',
        action: 'expanded restrictions on',
        targetId: 'org-002',
        targetType: 'organization',
        targetText: 'ASML exports to China'
      },
      {
        id: 'activity-005-02',
        actorId: 'person-004',
        actorType: 'person',
        action: 'criticized',
        targetId: 'org-004',
        targetType: 'organization',
        targetText: 'Dutch export control expansion'
      }
    ],
    narrativeIds: ['narr-002'],
    themeIds: ['sub-004'],
    topicIds: ['topic-002'],
    personIds: ['person-007', 'person-004'],
    organizationIds: ['org-002', 'org-004'],
    locationIds: ['loc-005'],
    eventIds: ['event-003'],
    factionMentions: {
      'faction-001': { sentiment: -0.82 },
      'faction-002': { sentiment: 0.71 },
      'faction-004': { sentiment: -0.68 },
      'faction-006': { sentiment: -0.45 },
      'faction-007': { sentiment: -0.52 },
      'faction-013': { sentiment: -0.68 }
    },
    tagIds: ['tag-003'],
    highlights: [
      {
        id: 'highlight-103',
        userId: 'user-002',
        blockIndex: 0,
        startOffset: 85,
        endOffset: 93,
        highlightedText: 'Dutch government',
        createdAt: '2026-01-12T17:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-102',
        userId: 'user-002',
        blockIndex: 0,
        anchorStartOffset: 85,
        anchorEndOffset: 151,
        anchorText: 'Dutch government announced Friday that it will expand export controls on semiconductor manufacturing equipment, blocking ASML',
        content: 'This expands restrictions beyond EUV to include advanced DUV. Significant escalation.',
        createdAt: '2026-01-12T17:30:00Z',
        replies: []
      }
    ]
  },
  // News Article - FT ASML
  {
    id: 'doc-006',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'ASML warns China restrictions will cut $2.5B from annual revenue',
    url: 'https://ft.com/asml-china-revenue-warning',
    publishedDate: '2026-01-15T17:00:00Z',
    publisherId: 'pub-ft',
    author: 'Peggy Hollinger',
    excerpt: 'ASML CEO Peter Wennink told investors that expanded China export restrictions will reduce the company\'s annual revenue by approximately $2.5 billion.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/32',
      caption: 'ASML CEO Peter Wennink at investor meeting'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'VELDHOVEN, Netherlands — ASML Holding NV warned investors Wednesday that expanded export restrictions on China will slash approximately $2.5 billion from its annual revenue, the most concrete assessment yet of the financial impact of Western containment efforts.',
        entityMentions: [
          { startOffset: 25, endOffset: 40, entityType: 'organization', entityId: 'org-002' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We had a significant business in China, and a large part of that is now going away," Peter Wennink, chief executive, told analysts on the company\'s quarterly earnings call. "This is not something we can easily replace in the short term."',
        entityMentions: [
          { startOffset: 85, endOffset: 98, entityType: 'person', entityId: 'person-004' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'ASML shares fell 4.2% following the announcement, reflecting investor concerns about the company\'s growth trajectory as geopolitical tensions reshape the semiconductor industry.',
        entityMentions: [
          { startOffset: 0, endOffset: 4, entityType: 'organization', entityId: 'org-002' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Searching for alternatives',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Wennink said the company is working to redirect equipment to other markets, particularly as chip makers in the United States, Europe, and Japan ramp up capacity with government support.',
        entityMentions: [
          { startOffset: 0, endOffset: 7, entityType: 'person', entityId: 'person-004' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"The global semiconductor industry is fundamentally restructuring," he said. "Our customers outside China are investing heavily, and we expect strong demand from those regions to partially offset the China losses over the medium term."',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Analysts noted that ASML\'s monopoly on EUV lithography systems gives it pricing power that smaller equipment makers lack, potentially cushioning the blow from lost China sales.',
        entityMentions: [
          { startOffset: 20, endOffset: 24, entityType: 'organization', entityId: 'org-002' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-006-01',
        speakerId: 'person-004',
        speakerType: 'person',
        text: 'We had a significant business in China, and a large part of that is now going away. This is not something we can easily replace in the short term.'
      },
      {
        id: 'quote-006-02',
        speakerId: 'person-004',
        speakerType: 'person',
        text: 'The global semiconductor industry is fundamentally restructuring. Our customers outside China are investing heavily, and we expect strong demand from those regions to partially offset the China losses over the medium term.'
      }
    ],
    activities: [
      {
        id: 'activity-006-01',
        actorId: 'org-002',
        actorType: 'organization',
        action: 'warned about',
        targetId: null,
        targetType: null,
        targetText: '$2.5 billion revenue loss from China restrictions'
      },
      {
        id: 'activity-006-02',
        actorId: 'person-004',
        actorType: 'person',
        action: 'reassured',
        targetId: null,
        targetType: null,
        targetText: 'investors about alternative markets'
      }
    ],
    narrativeIds: ['narr-002'],
    themeIds: ['sub-005'],
    topicIds: ['topic-002'],
    personIds: ['person-004'],
    organizationIds: ['org-002'],
    locationIds: ['loc-003'],
    eventIds: ['event-004'],
    factionMentions: {
      'faction-001': { sentiment: -0.79 },
      'faction-002': { sentiment: 0.73 },
      'faction-004': { sentiment: -0.65 },
      'faction-006': { sentiment: -0.44 },
      'faction-007': { sentiment: -0.52 },
      'faction-013': { sentiment: -0.68 }
    },
    tagIds: ['tag-001'],
    highlights: [],
    comments: []
  },
  // News Article - WSJ Raimondo
  {
    id: 'doc-007',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Raimondo defends expanded chip controls as necessary for national security',
    url: 'https://wsj.com/raimondo-chip-controls-defense',
    publishedDate: '2026-01-14T12:00:00Z',
    publisherId: 'pub-wsj',
    author: 'Yuka Hayashi',
    excerpt: 'Commerce Secretary Gina Raimondo defended the administration\'s expanded semiconductor export controls, calling them essential to maintaining US technological leadership.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/33',
      caption: 'Commerce Secretary Gina Raimondo at press briefing'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'WASHINGTON — Commerce Secretary Gina Raimondo on Tuesday defended the Biden administration\'s aggressive expansion of semiconductor export controls, pushing back against critics who argue the measures are hurting American companies without achieving their strategic objectives.',
        entityMentions: [
          { startOffset: 14, endOffset: 44, entityType: 'person', entityId: 'person-005' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"Let me be clear: these controls are working," Raimondo said at a press conference at the Commerce Department. "China would be years ahead of where they are now if we hadn\'t acted. We have slowed their progress significantly."',
        entityMentions: [
          { startOffset: 47, endOffset: 55, entityType: 'person', entityId: 'person-005' },
          { startOffset: 89, endOffset: 108, entityType: 'organization', entityId: 'org-005' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The secretary acknowledged that some American firms have lost sales but argued that national security must take precedence. "Our companies understand that some sacrifices are necessary to protect our technological edge," she said.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Industry pushback',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The Semiconductor Industry Association has repeatedly warned that overly broad export controls risk accelerating China\'s push for self-sufficiency while damaging U.S. competitiveness.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'National Security Advisor Jake Sullivan, who has championed the "small yard, high fence" approach to technology restrictions, joined Raimondo at the briefing. "We are not trying to hurt China\'s economy," Sullivan said. "We are trying to prevent China from developing capabilities that could threaten our security."',
        entityMentions: [
          { startOffset: 26, endOffset: 38, entityType: 'person', entityId: 'person-006' },
          { startOffset: 132, endOffset: 140, entityType: 'person', entityId: 'person-005' },
          { startOffset: 193, endOffset: 201, entityType: 'person', entityId: 'person-006' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-007-01',
        speakerId: 'person-005',
        speakerType: 'person',
        text: 'Let me be clear: these controls are working. China would be years ahead of where they are now if we hadn\'t acted. We have slowed their progress significantly.'
      },
      {
        id: 'quote-007-02',
        speakerId: 'person-005',
        speakerType: 'person',
        text: 'Our companies understand that some sacrifices are necessary to protect our technological edge.'
      },
      {
        id: 'quote-007-03',
        speakerId: 'person-006',
        speakerType: 'person',
        text: 'We are not trying to hurt China\'s economy. We are trying to prevent China from developing capabilities that could threaten our security.'
      }
    ],
    activities: [
      {
        id: 'activity-007-01',
        actorId: 'person-005',
        actorType: 'person',
        action: 'defended',
        targetId: null,
        targetType: null,
        targetText: 'U.S. semiconductor export controls'
      },
      {
        id: 'activity-007-02',
        actorId: 'person-006',
        actorType: 'person',
        action: 'supported',
        targetId: 'person-005',
        targetType: 'person',
        targetText: 'Raimondo\'s export control policy'
      }
    ],
    narrativeIds: ['narr-002'],
    themeIds: ['sub-004'],
    topicIds: ['topic-002'],
    personIds: ['person-005', 'person-006'],
    organizationIds: ['org-005'],
    locationIds: ['loc-004'],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: -0.84 },
      'faction-002': { sentiment: 0.69 },
      'faction-004': { sentiment: -0.71 },
      'faction-006': { sentiment: -0.47 },
      'faction-007': { sentiment: -0.52 },
      'faction-013': { sentiment: -0.68 }
    },
    tagIds: ['tag-002'],
    highlights: [],
    comments: []
  },
  // News Article - BIS Entity List
  {
    id: 'doc-008',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'BIS updates Entity List with new Chinese semiconductor firms',
    url: 'https://commerce.gov/bis-entity-list-update-jan-2026',
    publishedDate: '2026-01-13T10:00:00Z',
    publisherId: 'pub-reuters',
    author: 'Reuters Staff',
    excerpt: 'The Bureau of Industry and Security has added 15 new Chinese companies to the Entity List, expanding restrictions on semiconductor technology transfers.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/34',
      caption: 'US Department of Commerce building'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'WASHINGTON — The Bureau of Industry and Security announced Monday that it has added 15 Chinese companies to the Entity List, the trade restriction registry that prohibits U.S. firms from doing business with designated entities without special licenses.',
        entityMentions: [
          { startOffset: 14, endOffset: 47, entityType: 'organization', entityId: 'org-006' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The additions include several semiconductor equipment makers, chip designers, and artificial intelligence companies that the Commerce Department says pose risks to U.S. national security.',
        entityMentions: [
          { startOffset: 125, endOffset: 144, entityType: 'organization', entityId: 'org-005' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"These entities have been determined to be acting contrary to the national security or foreign policy interests of the United States," Alan Estevez, Under Secretary for Industry and Security, said in a statement.',
        entityMentions: [
          { startOffset: 134, endOffset: 146, entityType: 'person', entityId: 'person-024' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Among the newly listed companies are several that were found to be supplying equipment or technology to SMIC, China\'s largest chip foundry, which is already under heavy restrictions.',
        entityMentions: [
          { startOffset: 103, endOffset: 107, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Beijing condemns action',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'China\'s Ministry of Commerce swiftly condemned the action. Commerce Minister Wang Wentao called it "another example of America\'s abuse of export controls for political purposes."',
        entityMentions: [
          { startOffset: 0, endOffset: 28, entityType: 'organization', entityId: 'org-030' },
          { startOffset: 58, endOffset: 82, entityType: 'person', entityId: 'person-025' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"China will take all necessary measures to safeguard the legitimate rights and interests of Chinese enterprises," Wang said, adding that Beijing reserves the right to retaliate.',
        entityMentions: [
          { startOffset: 112, endOffset: 116, entityType: 'person', entityId: 'person-025' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-008-01',
        speakerId: 'person-024',
        speakerType: 'person',
        text: 'These entities have been determined to be acting contrary to the national security or foreign policy interests of the United States.'
      },
      {
        id: 'quote-008-02',
        speakerId: 'person-025',
        speakerType: 'person',
        text: 'China will take all necessary measures to safeguard the legitimate rights and interests of Chinese enterprises.'
      }
    ],
    activities: [
      {
        id: 'activity-008-01',
        actorId: 'org-006',
        actorType: 'organization',
        action: 'added to Entity List',
        targetId: null,
        targetType: null,
        targetText: '15 Chinese semiconductor companies'
      },
      {
        id: 'activity-008-02',
        actorId: 'person-025',
        actorType: 'person',
        action: 'condemned',
        targetId: 'org-006',
        targetType: 'organization',
        targetText: 'U.S. Entity List expansion'
      },
      {
        id: 'activity-008-03',
        actorId: 'person-025',
        actorType: 'person',
        action: 'threatened retaliation against',
        targetId: 'org-005',
        targetType: 'organization',
        targetText: 'the United States'
      }
    ],
    narrativeIds: ['narr-002'],
    themeIds: [],
    topicIds: ['topic-002'],
    personIds: ['person-005'],
    organizationIds: ['org-005', 'org-006'],
    locationIds: ['loc-004'],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: -0.81 },
      'faction-002': { sentiment: 0.74 },
      'faction-004': { sentiment: -0.66 },
      'faction-006': { sentiment: -0.43 },
      'faction-007': { sentiment: -0.52 },
      'faction-013': { sentiment: -0.68 }
    },
    tagIds: ['tag-003'],
    highlights: [],
    comments: []
  },
  // News Article - Big Fund III
  {
    id: 'doc-009',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'China launches $47 billion semiconductor fund in biggest push yet',
    url: 'https://bloomberg.com/china-big-fund-iii-47-billion',
    publishedDate: '2026-01-17T11:00:00Z',
    publisherId: 'pub-bloomberg',
    author: 'Debby Wu',
    excerpt: 'China has unveiled the third phase of its National IC Fund with 340 billion yuan ($47 billion), the largest semiconductor investment tranche in its history.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/35',
      caption: 'China semiconductor investment announcement'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'BEIJING — China has launched the third and largest phase of its National Integrated Circuit Industry Investment Fund, committing 340 billion yuan ($47 billion) to accelerate development of domestic semiconductor capabilities.',
        entityMentions: [
          { startOffset: 59, endOffset: 112, entityType: 'organization', entityId: 'org-007' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The fund, commonly known as the "Big Fund," represents Beijing\'s most aggressive response yet to U.S. export controls that have sought to limit China\'s access to advanced chip-making technology.',
        entityMentions: [
          { startOffset: 33, endOffset: 41, entityType: 'organization', entityId: 'org-007' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"This investment demonstrates our unwavering commitment to achieving semiconductor self-reliance," Vice Premier Liu He said at the launch ceremony in Beijing. "No amount of external pressure will deter us from this path."',
        entityMentions: [
          { startOffset: 68, endOffset: 102, entityType: 'person', entityId: 'person-008' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Focus areas and strategy',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'According to Ding Wenwu, president of the China National IC Fund, the new investment will prioritize equipment manufacturing, advanced packaging, and electronic design automation software—areas where China remains most dependent on foreign technology.',
        entityMentions: [
          { startOffset: 13, endOffset: 23, entityType: 'person', entityId: 'person-009' },
          { startOffset: 42, endOffset: 63, entityType: 'organization', entityId: 'org-007' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We have learned from the mistakes of our previous funds," Ding told reporters. "This time, we will focus on building true technological capabilities rather than simply expanding capacity at mature nodes."',
        entityMentions: [
          { startOffset: 59, endOffset: 63, entityType: 'person', entityId: 'person-009' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The announcement comes as SMIC, China\'s largest chip maker, reported progress in producing advanced 5nm chips without EUV lithography equipment, suggesting that Chinese companies are finding workarounds to Western restrictions.',
        entityMentions: [
          { startOffset: 26, endOffset: 30, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-009-01',
        speakerId: 'person-008',
        speakerType: 'person',
        text: 'This investment demonstrates our unwavering commitment to achieving semiconductor self-reliance. No amount of external pressure will deter us from this path.'
      },
      {
        id: 'quote-009-02',
        speakerId: 'person-009',
        speakerType: 'person',
        text: 'We have learned from the mistakes of our previous funds. This time, we will focus on building true technological capabilities rather than simply expanding capacity at mature nodes.'
      }
    ],
    activities: [
      {
        id: 'activity-009-01',
        actorId: 'org-007',
        actorType: 'organization',
        action: 'launched',
        targetId: null,
        targetType: null,
        targetText: '$47 billion semiconductor investment fund'
      },
      {
        id: 'activity-009-02',
        actorId: 'person-008',
        actorType: 'person',
        action: 'defied',
        targetId: 'org-005',
        targetType: 'organization',
        targetText: 'U.S. export control pressure'
      }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-007', 'sub-008'],
    topicIds: ['topic-003'],
    personIds: ['person-008', 'person-009'],
    organizationIds: ['org-001', 'org-007'],
    locationIds: ['loc-006'],
    eventIds: ['event-006'],
    factionMentions: {
      'faction-001': { sentiment: 0.76 },
      'faction-002': { sentiment: -0.48 },
      'faction-003': { sentiment: 0.25 },
      'faction-005': { sentiment: 0.68 },
      'faction-011': { sentiment: 0.82 }
    },
    highlights: [
      {
        id: 'highlight-104',
        userId: 'user-001',
        blockIndex: 0,
        startOffset: 59,
        endOffset: 112,
        highlightedText: 'National Integrated Circuit Industry Investment Fund',
        createdAt: '2026-01-17T13:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-103',
        userId: 'user-001',
        blockIndex: 0,
        anchorStartOffset: 59,
        anchorEndOffset: 112,
        anchorText: 'National Integrated Circuit Industry Investment Fund',
        content: 'This dwarfs our CHIPS Act funding. Scale of commitment is notable.',
        createdAt: '2026-01-17T13:30:00Z',
        replies: []
      }
    ]
  },
  // News Article - Caixin State Council
  {
    id: 'doc-010',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'State Council approves Big Fund III priorities: packaging, equipment, EDA',
    url: 'https://caixin.com/big-fund-iii-state-council-approval',
    publishedDate: '2026-01-18T16:00:00Z',
    publisherId: 'pub-caixin',
    author: 'Caixin Tech',
    excerpt: 'China\'s State Council has approved investment guidelines for the Big Fund III, prioritizing advanced packaging, semiconductor equipment, and EDA software development.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/36',
      caption: 'China State Council meeting hall'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'China\'s State Council has formally approved investment guidelines for the Big Fund III, directing the 340 billion yuan fund toward three priority areas: advanced chip packaging, semiconductor manufacturing equipment, and electronic design automation software.',
        entityMentions: [
          { startOffset: 8, endOffset: 21, entityType: 'organization', entityId: 'org-009' },
          { startOffset: 73, endOffset: 85, entityType: 'organization', entityId: 'org-007' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The guidelines, finalized at an executive meeting chaired by He Lifeng, executive vice premier of the State Council, reflect lessons learned from the first two phases of the fund, which were criticized for wasteful investments and corruption.',
        entityMentions: [
          { startOffset: 60, endOffset: 68, entityType: 'person', entityId: 'person-010' },
          { startOffset: 102, endOffset: 115, entityType: 'organization', entityId: 'org-009' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We must ensure every yuan delivers results," He said, according to a readout from the meeting. "The era of easy money with no accountability is over."',
        entityMentions: [
          { startOffset: 46, endOffset: 48, entityType: 'person', entityId: 'person-010' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The China Development Bank and other state financial institutions will provide co-investment support, effectively doubling the firepower available for strategic projects.',
        entityMentions: [
          { startOffset: 4, endOffset: 26, entityType: 'organization', entityId: 'org-008' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-010-01',
        speakerId: 'person-010',
        speakerType: 'person',
        text: 'We must ensure every yuan delivers results. The era of easy money with no accountability is over.'
      }
    ],
    activities: [
      {
        id: 'activity-010-01',
        actorId: 'org-009',
        actorType: 'organization',
        action: 'approved guidelines for',
        targetId: 'org-007',
        targetType: 'organization',
        targetText: 'Big Fund III investment priorities'
      }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-007', 'sub-008'],
    topicIds: ['topic-003'],
    personIds: ['person-010', 'person-008'],
    organizationIds: ['org-007', 'org-008', 'org-009'],
    locationIds: ['loc-006'],
    eventIds: ['event-007'],
    factionMentions: {
      'faction-001': { sentiment: 0.73 },
      'faction-002': { sentiment: -0.51 },
      'faction-003': { sentiment: 0.24 },
      'faction-005': { sentiment: 0.70 },
      'faction-011': { sentiment: 0.82 }
    },
    tagIds: ['tag-001'],
    highlights: [],
    comments: []
  },
  // News Article - FT Big Fund analysis
  {
    id: 'doc-011',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Analysis: Can China\'s Big Fund III overcome export control barriers?',
    url: 'https://ft.com/china-big-fund-analysis',
    publishedDate: '2026-01-19T09:00:00Z',
    publisherId: 'pub-ft',
    author: 'Kathrin Hille',
    excerpt: 'Analysts debate whether China\'s massive new semiconductor investment fund can achieve technological breakthroughs without access to cutting-edge foreign equipment.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/37',
      caption: 'China semiconductor manufacturing facility'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'Can $47 billion buy semiconductor independence? That is the question facing China\'s newly launched Big Fund III, and the answer may determine whether Western export controls succeed in their strategic objective of keeping Beijing permanently behind in chip technology.',
        entityMentions: [
          { startOffset: 99, endOffset: 111, entityType: 'organization', entityId: 'org-007' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Skeptics point to the fund\'s predecessors, which poured hundreds of billions of yuan into the semiconductor industry with mixed results. Despite massive investment, China remains years behind in cutting-edge logic chips and almost entirely dependent on foreign equipment for advanced manufacturing.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"Money alone cannot solve the fundamental problem," said Dan Hutcheson, chairman of VLSI Research. "China lacks access to the tacit knowledge and accumulated expertise that companies like ASML and TSMC have built over decades."',
        entityMentions: [
          { startOffset: 52, endOffset: 65, entityType: 'person', entityId: 'person-014' },
          { startOffset: 81, endOffset: 94, entityType: 'organization', entityId: 'org-024' },
          { startOffset: 186, endOffset: 190, entityType: 'organization', entityId: 'org-002' },
          { startOffset: 195, endOffset: 199, entityType: 'organization', entityId: 'org-020' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Yet SMIC\'s recent 5nm achievement suggests that China may be finding workarounds that Western policymakers did not anticipate. If Beijing can continue making progress without EUV lithography, the entire premise of the export control regime may need reassessment.',
        entityMentions: [
          { startOffset: 4, endOffset: 8, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-011-01',
        speakerId: 'person-014',
        speakerType: 'person',
        text: 'Money alone cannot solve the fundamental problem. China lacks access to the tacit knowledge and accumulated expertise that companies like ASML and TSMC have built over decades.'
      }
    ],
    activities: [
      {
        id: 'activity-011-01',
        actorId: 'person-014',
        actorType: 'person',
        action: 'questioned effectiveness of',
        targetId: 'org-007',
        targetType: 'organization',
        targetText: 'Big Fund III strategy'
      }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-009'],
    topicIds: ['topic-003'],
    personIds: ['person-014'],
    organizationIds: ['org-001', 'org-002', 'org-007', 'org-020', 'org-024'],
    locationIds: [],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.78 },
      'faction-002': { sentiment: -0.46 },
      'faction-003': { sentiment: 0.27 },
      'faction-005': { sentiment: 0.66 },
      'faction-011': { sentiment: 0.82 }
    },
    tagIds: ['tag-002'],
    highlights: [],
    comments: []
  },
  // News Article - Huawei stockpile
  {
    id: 'doc-012',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Huawei stockpiles billions in chip equipment ahead of sanctions',
    url: 'https://bloomberg.com/huawei-equipment-stockpile-sanctions',
    publishedDate: '2026-01-15T12:30:00Z',
    publisherId: 'pub-bloomberg',
    author: 'Debby Wu',
    excerpt: 'Huawei has accumulated billions of dollars worth of semiconductor manufacturing equipment in warehouses across China, anticipating expanded US export restrictions.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/38',
      caption: 'Huawei corporate headquarters'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'SHENZHEN, China — Huawei Technologies Co. has quietly accumulated billions of dollars worth of semiconductor manufacturing equipment in warehouses across China, racing to build stockpiles before expected expansions to U.S. export controls, according to people familiar with the matter.',
        entityMentions: [
          { startOffset: 18, endOffset: 41, entityType: 'organization', entityId: 'org-010' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The Chinese telecommunications giant has purchased equipment from suppliers in Japan, South Korea, and Europe in recent months, often paying premium prices for expedited delivery, the people said.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We are preparing for every eventuality," Ren Zhengfei, Huawei\'s founder, told employees at an internal meeting last month, according to a transcript seen by Bloomberg. "If the Americans cut us off completely, we must be able to survive."',
        entityMentions: [
          { startOffset: 42, endOffset: 54, entityType: 'person', entityId: 'person-011' },
          { startOffset: 56, endOffset: 62, entityType: 'organization', entityId: 'org-010' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'CFO Meng Wanzhou, who returned to the company after a highly publicized extradition case, has been instrumental in restructuring Huawei\'s supply chain to reduce dependence on American technology.',
        entityMentions: [
          { startOffset: 4, endOffset: 16, entityType: 'person', entityId: 'person-012' },
          { startOffset: 129, endOffset: 135, entityType: 'organization', entityId: 'org-010' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Analysts estimate Huawei has accumulated enough equipment to maintain production for 18-24 months even if all foreign supplies are cut off.',
        entityMentions: [
          { startOffset: 18, endOffset: 24, entityType: 'organization', entityId: 'org-010' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-012-01',
        speakerId: 'person-011',
        speakerType: 'person',
        text: 'We are preparing for every eventuality. If the Americans cut us off completely, we must be able to survive.'
      }
    ],
    activities: [
      {
        id: 'activity-012-01',
        actorId: 'org-010',
        actorType: 'organization',
        action: 'stockpiled',
        targetId: null,
        targetType: null,
        targetText: 'billions in semiconductor equipment'
      },
      {
        id: 'activity-012-02',
        actorId: 'person-011',
        actorType: 'person',
        action: 'warned about',
        targetId: 'org-005',
        targetType: 'organization',
        targetText: 'potential complete U.S. cutoff'
      }
    ],
    narrativeIds: ['narr-004'],
    themeIds: ['sub-010'],
    topicIds: ['topic-004'],
    personIds: ['person-011', 'person-012'],
    organizationIds: ['org-010'],
    locationIds: ['loc-001'],
    eventIds: ['event-008'],
    factionMentions: {
      'faction-001': { sentiment: -0.68 },
      'faction-002': { sentiment: 0.75 },
      'faction-003': { sentiment: -0.18 },
      'faction-006': { sentiment: -0.55 },
      'faction-011': { sentiment: 0.75 },
      'faction-013': { sentiment: -0.68 }
    },
    tagIds: ['tag-003'],
    highlights: [
      {
        id: 'highlight-105',
        userId: 'user-002',
        blockIndex: 0,
        startOffset: 18,
        endOffset: 41,
        highlightedText: 'Huawei Technologies Co.',
        createdAt: '2026-01-15T14:00:00Z'
      }
    ],
    comments: []
  },
  // News Article - WSJ Huawei investigation
  {
    id: 'doc-013',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'US probes whether Huawei used intermediaries to evade chip controls',
    url: 'https://wsj.com/huawei-intermediaries-investigation',
    publishedDate: '2026-01-17T14:30:00Z',
    publisherId: 'pub-wsj',
    author: 'Kate O\'Keeffe',
    excerpt: 'US Commerce Department has opened an investigation into whether Huawei circumvented export controls by acquiring equipment through third-party intermediaries.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/39',
      caption: 'Commerce Department investigation files'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'WASHINGTON — The Commerce Department has opened a criminal investigation into whether Huawei Technologies circumvented U.S. export controls by acquiring restricted semiconductor equipment through shell companies and third-party intermediaries, according to people familiar with the probe.',
        entityMentions: [
          { startOffset: 14, endOffset: 33, entityType: 'organization', entityId: 'org-005' },
          { startOffset: 86, endOffset: 106, entityType: 'organization', entityId: 'org-010' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The investigation, which involves the FBI and Commerce\'s Bureau of Industry and Security, focuses on transactions involving equipment from Applied Materials, Lam Research, and KLA Corporation, the people said.',
        entityMentions: [
          { startOffset: 55, endOffset: 84, entityType: 'organization', entityId: 'org-006' },
          { startOffset: 138, endOffset: 155, entityType: 'organization', entityId: 'org-003' },
          { startOffset: 157, endOffset: 169, entityType: 'organization', entityId: 'org-011' },
          { startOffset: 175, endOffset: 190, entityType: 'organization', entityId: 'org-012' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Commerce Secretary Gina Raimondo declined to comment on the specific investigation but warned that violations of export controls would be "vigorously prosecuted."',
        entityMentions: [
          { startOffset: 0, endOffset: 31, entityType: 'person', entityId: 'person-005' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"If companies think they can help sanctioned entities evade our controls, they are mistaken," Raimondo said at a press conference. "We will find them, and there will be consequences."',
        entityMentions: [
          { startOffset: 93, endOffset: 101, entityType: 'person', entityId: 'person-005' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Huawei denied any wrongdoing. "We operate in full compliance with all applicable laws and regulations," a company spokesperson said in a statement.',
        entityMentions: [
          { startOffset: 0, endOffset: 6, entityType: 'organization', entityId: 'org-010' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-013-01',
        speakerId: 'person-005',
        speakerType: 'person',
        text: 'If companies think they can help sanctioned entities evade our controls, they are mistaken. We will find them, and there will be consequences.'
      },
      {
        id: 'quote-013-02',
        speakerId: 'org-010',
        speakerType: 'organization',
        text: 'We operate in full compliance with all applicable laws and regulations.'
      }
    ],
    activities: [
      {
        id: 'activity-013-01',
        actorId: 'org-005',
        actorType: 'organization',
        action: 'launched investigation into',
        targetId: 'org-010',
        targetType: 'organization',
        targetText: 'Huawei for potential export control evasion'
      },
      {
        id: 'activity-013-02',
        actorId: 'person-005',
        actorType: 'person',
        action: 'threatened',
        targetId: null,
        targetType: null,
        targetText: 'companies helping evade export controls'
      }
    ],
    narrativeIds: ['narr-004'],
    themeIds: ['sub-010', 'sub-011'],
    topicIds: ['topic-004'],
    personIds: ['person-005', 'person-011'],
    organizationIds: ['org-003', 'org-005', 'org-006', 'org-010', 'org-011', 'org-012'],
    locationIds: ['loc-004', 'loc-001'],
    eventIds: ['event-009'],
    factionMentions: {
      'faction-001': { sentiment: -0.71 },
      'faction-002': { sentiment: 0.73 },
      'faction-003': { sentiment: -0.21 },
      'faction-006': { sentiment: -0.53 },
      'faction-011': { sentiment: 0.75 },
      'faction-013': { sentiment: -0.68 }
    },
    tagIds: ['tag-001'],
    highlights: [],
    comments: []
  },
  // News Article - SCMP Huawei response
  {
    id: 'doc-014',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Huawei denies sanctions violations, calls reports "speculation"',
    url: 'https://scmp.com/huawei-denies-sanctions-violations',
    publishedDate: '2026-01-18T08:00:00Z',
    publisherId: 'pub-scmp',
    author: 'Iris Deng',
    excerpt: 'Huawei has issued a statement denying any violations of US export controls, dismissing reports of stockpiling as "speculation and conjecture."',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/40',
      caption: 'Huawei press release statement'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Huawei has issued a statement denying any violations of US export controls, dismissing reports of stockpiling as "speculation and conjecture."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-004'],
    themeIds: ['sub-011'],
    topicIds: ['topic-004'],
    personIds: ['person-011'],
    organizationIds: ['org-010', 'org-005', 'org-012'],
    locationIds: ['loc-001'],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: -0.66 },
      'faction-002': { sentiment: 0.77 },
      'faction-003': { sentiment: -0.16 },
      'faction-006': { sentiment: -0.57 },
      'faction-011': { sentiment: 0.75 },
      'faction-013': { sentiment: -0.68 }
    },
    tagIds: ['tag-002'],
    highlights: [],
    comments: []
  },
  // News Article - YMTC benchmark
  {
    id: 'doc-015',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'YMTC 232-layer NAND matches Samsung in performance tests',
    url: 'https://anandtech.com/ymtc-232-layer-nand-benchmark',
    publishedDate: '2026-01-16T11:30:00Z',
    publisherId: 'pub-anandtech',
    author: 'Ryan Smith',
    excerpt: 'Independent testing reveals YMTC\'s 232-layer 3D NAND flash memory delivers performance comparable to Samsung\'s latest offerings in key metrics.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/41',
      caption: 'YMTC 3D NAND chip close-up'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'In what industry experts are calling a watershed moment for China\'s semiconductor ambitions, Yangtze Memory Technologies Co. has produced a 232-layer 3D NAND flash memory chip that matches—and in some cases exceeds—the performance of Samsung\'s latest offerings.',
        entityMentions: [
          { startOffset: 93, endOffset: 124, entityType: 'organization', entityId: 'org-013' },
          { startOffset: 228, endOffset: 235, entityType: 'organization', entityId: 'org-014' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Our testing, conducted on samples obtained through third-party channels, reveals that YMTC\'s X3-9070 delivers sequential read speeds of 7,400 MB/s and write speeds of 6,900 MB/s—comparable to Samsung\'s 990 Pro and SK Hynix\'s Platinum P41.',
        entityMentions: [
          { startOffset: 85, endOffset: 89, entityType: 'organization', entityId: 'org-013' },
          { startOffset: 192, endOffset: 199, entityType: 'organization', entityId: 'org-014' },
          { startOffset: 217, endOffset: 225, entityType: 'organization', entityId: 'org-029' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"This is genuinely impressive engineering," said Chen Nanxiang, president of YMTC, in a rare interview with foreign media. "We have achieved parity with the world\'s best in NAND technology, despite facing unprecedented restrictions on equipment and materials."',
        entityMentions: [
          { startOffset: 45, endOffset: 58, entityType: 'person', entityId: 'person-013' },
          { startOffset: 77, endOffset: 81, entityType: 'organization', entityId: 'org-013' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The achievement is particularly significant given that YMTC was added to the U.S. Entity List in December 2022, cutting it off from American equipment and design software.',
        entityMentions: [
          { startOffset: 55, endOffset: 59, entityType: 'organization', entityId: 'org-013' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-015-01',
        speakerId: 'person-013',
        speakerType: 'person',
        text: 'This is genuinely impressive engineering. We have achieved parity with the world\'s best in NAND technology, despite facing unprecedented restrictions on equipment and materials.'
      }
    ],
    activities: [
      {
        id: 'activity-015-01',
        actorId: 'org-013',
        actorType: 'organization',
        action: 'matched performance of',
        targetId: 'org-014',
        targetType: 'organization',
        targetText: 'Samsung in 232-layer NAND'
      }
    ],
    narrativeIds: ['narr-005'],
    themeIds: ['sub-012'],
    topicIds: ['topic-005'],
    personIds: ['person-013'],
    organizationIds: ['org-013', 'org-014', 'org-029'],
    locationIds: ['loc-007'],
    eventIds: ['event-010'],
    factionMentions: {
      'faction-001': { sentiment: -0.75 },
      'faction-002': { sentiment: 0.71 },
      'faction-003': { sentiment: -0.22 },
      'faction-006': { sentiment: -0.48 },
      'faction-013': { sentiment: -0.68 }
    },
    tagIds: ['tag-003'],
    highlights: [],
    comments: []
  },
  // News Article - TechInsights YMTC
  {
    id: 'doc-016',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'TechInsights finds YMTC chips in consumer devices despite blacklist',
    url: 'https://techinsights.com/ymtc-chips-consumer-devices',
    publishedDate: '2026-01-18T09:30:00Z',
    publisherId: 'pub-semiengi',
    author: 'Dan Hutcheson',
    excerpt: 'Research firm TechInsights has identified YMTC memory chips in consumer electronics from multiple brands, raising questions about Entity List enforcement.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/42',
      caption: 'TechInsights chip analysis lab'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'Semiconductor research firm TechInsights has discovered that memory chips manufactured by YMTC, a Chinese company on the U.S. Entity List, are appearing in consumer electronics sold globally—including products from American and European brands.',
        entityMentions: [
          { startOffset: 27, endOffset: 39, entityType: 'organization', entityId: 'org-015' },
          { startOffset: 90, endOffset: 94, entityType: 'organization', entityId: 'org-013' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We\'ve found YMTC flash memory in SSDs, portable drives, and even some smartphone models," said Dan Hutcheson, chairman of VLSI Research and an advisor to TechInsights on this investigation. "The supply chain is far more porous than regulators realize."',
        entityMentions: [
          { startOffset: 13, endOffset: 17, entityType: 'organization', entityId: 'org-013' },
          { startOffset: 91, endOffset: 104, entityType: 'person', entityId: 'person-014' },
          { startOffset: 118, endOffset: 131, entityType: 'organization', entityId: 'org-024' },
          { startOffset: 152, endOffset: 164, entityType: 'organization', entityId: 'org-015' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'Enforcement challenges',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The findings underscore the challenges facing U.S. regulators seeking to enforce export controls on Chinese semiconductor companies. YMTC was added to the Entity List in December 2022, which prohibits U.S. companies from supplying it with technology or components.',
        entityMentions: [
          { startOffset: 133, endOffset: 137, entityType: 'organization', entityId: 'org-013' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'However, the restrictions do not prevent YMTC from selling its products through intermediary channels, and tracking the origin of components once they enter complex global supply chains remains difficult.',
        entityMentions: [
          { startOffset: 41, endOffset: 45, entityType: 'organization', entityId: 'org-013' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'YMTC president Chen Nanxiang has previously stated that the company operates "fully within the bounds of international trade law" and that its products "meet all applicable quality and compliance standards."',
        entityMentions: [
          { startOffset: 0, endOffset: 4, entityType: 'organization', entityId: 'org-013' },
          { startOffset: 15, endOffset: 28, entityType: 'person', entityId: 'person-013' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-016-01',
        speakerId: 'person-014',
        speakerType: 'person',
        text: 'We\'ve found YMTC flash memory in SSDs, portable drives, and even some smartphone models. The supply chain is far more porous than regulators realize.'
      }
    ],
    activities: [
      {
        id: 'activity-016-01',
        actorId: 'org-015',
        actorType: 'organization',
        action: 'discovered',
        targetId: 'org-013',
        targetType: 'organization',
        targetText: 'YMTC chips in global consumer products'
      }
    ],
    narrativeIds: ['narr-005'],
    themeIds: ['sub-012', 'sub-013'],
    topicIds: ['topic-005'],
    personIds: ['person-013', 'person-014'],
    organizationIds: ['org-013', 'org-015', 'org-024'],
    locationIds: ['loc-007', 'loc-004'],
    eventIds: ['event-010', 'event-011'],
    factionMentions: {
      'faction-001': { sentiment: -0.77 },
      'faction-002': { sentiment: 0.69 },
      'faction-003': { sentiment: -0.24 },
      'faction-006': { sentiment: -0.51 },
      'faction-013': { sentiment: -0.68 }
    },
    highlights: [
      {
        id: 'highlight-106',
        userId: 'user-003',
        blockIndex: 0,
        startOffset: 27,
        endOffset: 39,
        highlightedText: 'TechInsights',
        createdAt: '2026-01-18T11:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-104',
        userId: 'user-003',
        blockIndex: 0,
        anchorStartOffset: 27,
        anchorEndOffset: 94,
        anchorText: 'TechInsights has discovered that memory chips manufactured by YMTC',
        content: 'This highlights enforcement gaps. YMTC chips are reaching global markets despite restrictions.',
        createdAt: '2026-01-18T11:30:00Z',
        replies: []
      }
    ]
  },
  // News Article - YMTC supply chain
  {
    id: 'doc-017',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'How YMTC chips are reaching global markets despite US sanctions',
    url: 'https://bloomberg.com/ymtc-global-supply-chain-analysis',
    publishedDate: '2026-01-19T13:00:00Z',
    publisherId: 'pub-bloomberg',
    author: 'Vlad Savov',
    excerpt: 'Analysis reveals YMTC memory chips are entering global supply chains through complex networks that make end-to-end tracking difficult for regulators.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/43',
      caption: 'Global semiconductor supply chain map'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'HONG KONG — Memory chips manufactured by Yangtze Memory Technologies Co. are finding their way into consumer electronics sold worldwide, despite the Chinese company\'s presence on the U.S. Entity List, according to supply chain analysts and company documents reviewed by Bloomberg.',
        entityMentions: [
          { startOffset: 41, endOffset: 72, entityType: 'organization', entityId: 'org-013' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The revelations highlight the difficulty of enforcing technology restrictions in an era of deeply interconnected global supply chains, and raise questions about whether the current export control framework can achieve its stated goals.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"This is a game of whack-a-mole," said Dan Hutcheson, chairman of VLSI Research. "You block one channel, and the product finds another route to market. The complexity of modern supply chains makes comprehensive enforcement nearly impossible."',
        entityMentions: [
          { startOffset: 35, endOffset: 48, entityType: 'person', entityId: 'person-014' },
          { startOffset: 62, endOffset: 75, entityType: 'organization', entityId: 'org-024' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'heading', 
        content: 'The distribution network',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'YMTC sells its chips through a network of distributors based in Hong Kong, Singapore, and other Asian markets. These intermediaries then supply component makers who assemble products for global brands—often with limited visibility into the origin of individual components.',
        entityMentions: [
          { startOffset: 0, endOffset: 4, entityType: 'organization', entityId: 'org-013' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-017-01',
        speakerId: 'person-014',
        speakerType: 'person',
        text: 'This is a game of whack-a-mole. You block one channel, and the product finds another route to market. The complexity of modern supply chains makes comprehensive enforcement nearly impossible.'
      }
    ],
    activities: [
      {
        id: 'activity-017-01',
        actorId: 'org-013',
        actorType: 'organization',
        action: 'circumvented',
        targetId: 'org-006',
        targetType: 'organization',
        targetText: 'U.S. export controls through distribution networks'
      }
    ],
    narrativeIds: ['narr-005'],
    themeIds: ['sub-013'],
    topicIds: ['topic-005'],
    personIds: ['person-014'],
    organizationIds: ['org-013', 'org-024'],
    locationIds: ['loc-004'],
    eventIds: ['event-011'],
    factionMentions: {
      'faction-001': { sentiment: -0.73 },
      'faction-002': { sentiment: 0.74 },
      'faction-003': { sentiment: -0.19 },
      'faction-006': { sentiment: -0.46 },
      'faction-013': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  // News Article - Xinhua Empyrean
  {
    id: 'doc-018',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Empyrean announces EDA tools supporting 14nm chip design',
    url: 'https://xinhua.com/empyrean-eda-14nm-announcement',
    publishedDate: '2026-01-19T10:30:00Z',
    publisherId: 'pub-xinhua',
    author: 'Xinhua Staff',
    excerpt: 'Empyrean Technology has announced its EDA software suite now fully supports 14nm chip design, marking significant progress in Chinese design tool development.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/44',
      caption: 'Empyrean Technology EDA software interface'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'BEIJING — Empyrean Technology Co., one of China\'s leading domestic electronic design automation software developers, has announced that its chip design tools now fully support 14-nanometer process nodes, a milestone in the nation\'s push to reduce dependence on American EDA providers.',
        entityMentions: [
          { startOffset: 11, endOffset: 33, entityType: 'organization', entityId: 'org-016' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"This represents years of dedicated research and development by our engineers," said Dai Weimin, president of Empyrean. "We have demonstrated that Chinese technology can meet the needs of advanced semiconductor design."',
        entityMentions: [
          { startOffset: 85, endOffset: 95, entityType: 'person', entityId: 'person-015' },
          { startOffset: 109, endOffset: 117, entityType: 'organization', entityId: 'org-016' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The EDA market has historically been dominated by three American companies—Synopsys, Cadence Design Systems, and Mentor Graphics—which together control more than 90% of the global market. U.S. export restrictions have blocked Chinese chip designers from accessing the latest versions of their tools.',
        entityMentions: [
          { startOffset: 75, endOffset: 83, entityType: 'organization', entityId: 'org-019' },
          { startOffset: 85, endOffset: 108, entityType: 'organization', entityId: 'org-018' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Empyrean\'s achievement, while still trailing the leading-edge capabilities of Western tools, represents significant progress in closing the gap.',
        entityMentions: [
          { startOffset: 0, endOffset: 8, entityType: 'organization', entityId: 'org-016' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-018-01',
        speakerId: 'person-015',
        speakerType: 'person',
        text: 'This represents years of dedicated research and development by our engineers. We have demonstrated that Chinese technology can meet the needs of advanced semiconductor design.'
      }
    ],
    activities: [
      {
        id: 'activity-018-01',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'achieved',
        targetId: null,
        targetType: null,
        targetText: '14nm EDA tool capability'
      }
    ],
    narrativeIds: ['narr-006'],
    themeIds: ['sub-014'],
    topicIds: ['topic-006'],
    personIds: ['person-015'],
    organizationIds: ['org-016', 'org-018', 'org-019'],
    locationIds: ['loc-002'],
    eventIds: ['event-012'],
    factionMentions: {
      'faction-001': { sentiment: 0.78 },
      'faction-002': { sentiment: -0.68 },
      'faction-005': { sentiment: 0.62 },
      'faction-008': { sentiment: 0.15 },
      'faction-011': { sentiment: 0.75 }
    },
    highlights: [],
    comments: []
  },
  // News Article - Huada Jiutian
  {
    id: 'doc-019',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Huada Jiutian targets 7nm EDA capability within two years',
    url: 'https://caixin.com/huada-jiutian-7nm-roadmap',
    publishedDate: '2026-01-20T08:00:00Z',
    publisherId: 'pub-caixin',
    author: 'Caixin Tech',
    excerpt: 'Huada Jiutian has outlined an aggressive roadmap to develop EDA tools capable of supporting 7nm chip design within the next two years.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/45',
      caption: 'Huada Jiutian corporate campus'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'Chinese EDA software company Huada Jiutian has unveiled an ambitious roadmap to develop chip design tools supporting 7-nanometer process nodes within the next two years, part of a broader national push to achieve independence from Western technology providers.',
        entityMentions: [
          { startOffset: 29, endOffset: 42, entityType: 'organization', entityId: 'org-017' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We are accelerating our development timeline in response to the strategic needs of our customers and our nation," said Liu Zhiyong, CEO of Huada Jiutian, at an industry conference in Beijing.',
        entityMentions: [
          { startOffset: 117, endOffset: 127, entityType: 'person', entityId: 'person-016' },
          { startOffset: 136, endOffset: 149, entityType: 'organization', entityId: 'org-017' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The company has received significant support from the Big Fund III initiative, with sources indicating that Huada Jiutian may receive up to 5 billion yuan ($700 million) in the current funding round.',
        entityMentions: [
          { startOffset: 54, endOffset: 66, entityType: 'organization', entityId: 'org-007' },
          { startOffset: 108, endOffset: 121, entityType: 'organization', entityId: 'org-017' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-019-01',
        speakerId: 'person-016',
        speakerType: 'person',
        text: 'We are accelerating our development timeline in response to the strategic needs of our customers and our nation.'
      }
    ],
    activities: [
      {
        id: 'activity-019-01',
        actorId: 'org-017',
        actorType: 'organization',
        action: 'announced roadmap for',
        targetId: null,
        targetType: null,
        targetText: '7nm EDA capability within two years'
      }
    ],
    narrativeIds: ['narr-006'],
    themeIds: ['sub-014', 'sub-015'],
    topicIds: ['topic-006'],
    personIds: ['person-016'],
    organizationIds: ['org-007', 'org-017'],
    locationIds: ['loc-008'],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.81 },
      'faction-002': { sentiment: -0.66 },
      'faction-005': { sentiment: 0.59 },
      'faction-008': { sentiment: 0.15 },
      'faction-011': { sentiment: 0.75 }
    },
    highlights: [],
    comments: []
  },
  // News Article - TSMC delays
  {
    id: 'doc-020',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'TSMC Arizona fab delays push production start to late 2025',
    url: 'https://reuters.com/tsmc-arizona-delay-2025',
    publishedDate: '2026-01-14T08:30:00Z',
    publisherId: 'pub-reuters',
    author: 'Yimou Lee',
    excerpt: 'TSMC has confirmed its Arizona fabrication facility will not begin production until late 2025, a significant delay from the original 2024 target.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/46',
      caption: 'TSMC Arizona fab construction site'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'TAIPEI — Taiwan Semiconductor Manufacturing Co. has confirmed that its flagship Arizona fabrication facility will not begin production until late 2025, a significant delay from the original 2024 target that raises questions about U.S. efforts to reshore advanced chip manufacturing.',
        entityMentions: [
          { startOffset: 9, endOffset: 47, entityType: 'organization', entityId: 'org-020' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"We have encountered challenges that have required adjustments to our timeline," CEO C.C. Wei told investors on the company\'s quarterly earnings call. "The Arizona project remains on track, but production will begin later than originally anticipated."',
        entityMentions: [
          { startOffset: 80, endOffset: 88, entityType: 'person', entityId: 'person-017' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The Taiwanese chip giant cited several factors contributing to the delay, including difficulties recruiting experienced chip manufacturing technicians in the United States and supply chain complications for specialized construction materials.',
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Chairman Mark Liu added that the company remains committed to the Arizona investment despite the challenges. "This is a long-term strategic decision, not a short-term business calculation," he said.',
        entityMentions: [
          { startOffset: 9, endOffset: 17, entityType: 'person', entityId: 'person-018' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-020-01',
        speakerId: 'person-017',
        speakerType: 'person',
        text: 'We have encountered challenges that have required adjustments to our timeline. The Arizona project remains on track, but production will begin later than originally anticipated.'
      },
      {
        id: 'quote-020-02',
        speakerId: 'person-018',
        speakerType: 'person',
        text: 'This is a long-term strategic decision, not a short-term business calculation.'
      }
    ],
    activities: [
      {
        id: 'activity-020-01',
        actorId: 'org-020',
        actorType: 'organization',
        action: 'delayed',
        targetId: null,
        targetType: null,
        targetText: 'Arizona fab production start to late 2025'
      }
    ],
    narrativeIds: ['narr-007'],
    themeIds: ['sub-016'],
    topicIds: ['topic-007'],
    personIds: ['person-017', 'person-018'],
    organizationIds: ['org-020'],
    locationIds: ['loc-009'],
    eventIds: ['event-013'],
    factionMentions: {
      'faction-001': { sentiment: -0.45 },
      'faction-005': { sentiment: 0.58 },
      'faction-006': { sentiment: -0.38 },
      'faction-007': { sentiment: -0.52 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [
      {
        id: 'highlight-107',
        userId: 'user-004',
        blockIndex: 0,
        startOffset: 9,
        endOffset: 47,
        highlightedText: 'Taiwan Semiconductor Manufacturing Co.',
        createdAt: '2026-01-14T10:00:00Z'
      }
    ],
    comments: []
  },
  // News Article - Nikkei TSMC culture
  {
    id: 'doc-021',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'TSMC CEO addresses Arizona challenges: "Different work culture"',
    url: 'https://nikkei.com/tsmc-arizona-work-culture',
    publishedDate: '2026-01-16T07:00:00Z',
    publisherId: 'pub-nikkei',
    author: 'Cheng Ting-Fang',
    excerpt: 'TSMC CEO C.C. Wei acknowledged challenges at the Arizona fab, citing differences in work culture and the need to adapt management approaches.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/47',
      caption: 'TSMC CEO C.C. Wei at investor conference'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'HSINCHU, Taiwan — In a candid acknowledgment of the difficulties facing its U.S. expansion, TSMC chief executive C.C. Wei said the company has had to adapt its management approach to accommodate "different work culture expectations" at its Arizona fabrication facility.',
        entityMentions: [
          { startOffset: 92, endOffset: 96, entityType: 'organization', entityId: 'org-020' },
          { startOffset: 113, endOffset: 121, entityType: 'person', entityId: 'person-017' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"In Taiwan, our engineers work extremely hard—weekends, holidays, whatever it takes to meet production targets," Wei said at a press conference in Hsinchu. "We are finding that expectations are different in Arizona, and we need to adjust our management style accordingly."',
        entityMentions: [
          { startOffset: 101, endOffset: 104, entityType: 'person', entityId: 'person-017' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The comments sparked criticism from U.S. labor advocates, who argued that TSMC was failing to adapt to American workplace norms and expectations around work-life balance.',
        entityMentions: [
          { startOffset: 74, endOffset: 78, entityType: 'organization', entityId: 'org-020' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Wei later clarified that TSMC "deeply respects American workers" and is committed to creating a positive work environment at the Arizona facility.',
        entityMentions: [
          { startOffset: 0, endOffset: 3, entityType: 'person', entityId: 'person-017' },
          { startOffset: 25, endOffset: 29, entityType: 'organization', entityId: 'org-020' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-021-01',
        speakerId: 'person-017',
        speakerType: 'person',
        text: 'In Taiwan, our engineers work extremely hard—weekends, holidays, whatever it takes to meet production targets. We are finding that expectations are different in Arizona, and we need to adjust our management style accordingly.'
      }
    ],
    activities: [
      {
        id: 'activity-021-01',
        actorId: 'person-017',
        actorType: 'person',
        action: 'criticized',
        targetId: null,
        targetType: null,
        targetText: 'U.S. work culture expectations'
      }
    ],
    narrativeIds: ['narr-007'],
    themeIds: ['sub-016', 'sub-017'],
    topicIds: ['topic-007'],
    personIds: ['person-017'],
    organizationIds: ['org-020'],
    locationIds: ['loc-009', 'loc-010'],
    eventIds: ['event-013'],
    factionMentions: {
      'faction-001': { sentiment: -0.43 },
      'faction-005': { sentiment: 0.61 },
      'faction-006': { sentiment: -0.36 },
      'faction-007': { sentiment: -0.52 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [],
    comments: []
  },
  // News Article - Arizona unions
  {
    id: 'doc-022',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Arizona unions file grievances against TSMC management practices',
    url: 'https://bloomberg.com/tsmc-arizona-union-grievances',
    publishedDate: '2026-01-17T11:00:00Z',
    publisherId: 'pub-bloomberg',
    author: 'Ian King',
    excerpt: 'The Arizona Building and Construction Trades Council has filed formal grievances against TSMC, citing concerns about management practices and worker treatment.',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/48',
      caption: 'Arizona construction workers at TSMC site'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'PHOENIX — The Arizona Building and Construction Trades Council has filed formal grievances against TSMC, alleging that the Taiwanese chip maker\'s management practices at its Phoenix-area fabrication facility violate workplace safety standards and labor agreements.',
        entityMentions: [
          { startOffset: 11, endOffset: 58, entityType: 'organization', entityId: 'org-021' },
          { startOffset: 99, endOffset: 103, entityType: 'organization', entityId: 'org-020' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: '"Workers have reported excessive pressure to work overtime, inadequate safety training, and a dismissive attitude toward American workplace standards," said Rick Bloomingdale, president of the Arizona AFL-CIO, in a statement supporting the grievances.',
        entityMentions: [
          { startOffset: 153, endOffset: 170, entityType: 'person', entityId: 'person-019' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'TSMC denied the allegations. "We are fully committed to maintaining the highest safety and workplace standards at all our facilities, including in Arizona," a company spokesperson said.',
        entityMentions: [
          { startOffset: 0, endOffset: 4, entityType: 'organization', entityId: 'org-020' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'The dispute adds to the challenges facing TSMC\'s Arizona expansion, which has already faced significant delays and cost overruns.',
        entityMentions: [
          { startOffset: 42, endOffset: 46, entityType: 'organization', entityId: 'org-020' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [
      {
        id: 'quote-022-01',
        speakerId: 'person-019',
        speakerType: 'person',
        text: 'Workers have reported excessive pressure to work overtime, inadequate safety training, and a dismissive attitude toward American workplace standards.'
      },
      {
        id: 'quote-022-02',
        speakerId: 'org-020',
        speakerType: 'organization',
        text: 'We are fully committed to maintaining the highest safety and workplace standards at all our facilities, including in Arizona.'
      }
    ],
    activities: [
      {
        id: 'activity-022-01',
        actorId: 'org-021',
        actorType: 'organization',
        action: 'filed grievances against',
        targetId: 'org-020',
        targetType: 'organization',
        targetText: 'TSMC for workplace violations'
      },
      {
        id: 'activity-022-02',
        actorId: 'person-019',
        actorType: 'person',
        action: 'criticized',
        targetId: 'org-020',
        targetType: 'organization',
        targetText: 'TSMC management practices'
      }
    ],
    narrativeIds: ['narr-007'],
    themeIds: ['sub-017'],
    topicIds: ['topic-007'],
    personIds: ['person-019'],
    organizationIds: ['org-020', 'org-021'],
    locationIds: ['loc-009'],
    eventIds: ['event-014'],
    factionMentions: {
      'faction-001': { sentiment: -0.47 },
      'faction-005': { sentiment: 0.56 },
      'faction-006': { sentiment: -0.41 },
      'faction-007': { sentiment: -0.52 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [],
    comments: []
  },
  // X/Twitter - Tech analyst thread on SMIC
  {
    id: 'doc-023',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'X thread: Tech analyst breaks down SMIC 5nm achievement',
    excerpt: 'Thread analyzing SMIC\'s 5nm breakthrough, noting impressive engineering but questioning economic viability vs TSMC\'s EUV process.',
    url: 'https://x.com/chipcuriosity/status/1881234567890123',
    publishedDate: '2026-01-16T14:22:00Z',
    publisherId: 'pub-x',
    author: {
      username: '@chipcuriosity',
      displayName: 'Chip Curiosity',
      avatarUrl: 'https://i.pravatar.cc/150?u=chipcuriosity'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: 'Thread: Let\'s talk about SMIC\'s 5nm "breakthrough" 🧵\n\n1/ Yes, they achieved 5nm using DUV multi-patterning. But context matters.\n\n2/ Cost per wafer is ~3x higher than TSMC\'s EUV process\n\n3/ Yields appear to be 20-30%, vs 80%+ for TSMC\n\n4/ This is impressive engineering, but it\'s not economically competitive for high-volume production\n\n5/ Export controls haven\'t stopped progress - they\'ve just made it expensive. Is that the goal?',
        entityMentions: [
          { startOffset: 26, endOffset: 30, entityType: 'organization', entityId: 'org-001' },
          { startOffset: 164, endOffset: 168, entityType: 'organization', entityId: 'org-020' },
          { startOffset: 225, endOffset: 229, entityType: 'organization', entityId: 'org-020' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [],
    activities: [
      {
        id: 'activity-023-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'achieved',
        targetId: null,
        targetType: null,
        targetText: '5nm production using DUV multi-patterning'
      }
    ],
    metrics: {
      comments: 847,
      likes: 5234,
      shares: 1892,
      platform: 'x'
    },
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001', 'sub-003'],
    topicIds: ['topic-001'],
    personIds: [],
    organizationIds: ['org-001', 'org-020'],
    locationIds: [],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.73 },
      'faction-002': { sentiment: -0.61 },
      'faction-003': { sentiment: 0.14 },
      'faction-011': { sentiment: 0.85 }
    },
    highlights: [],
    comments: []
  },
  // LinkedIn - Industry executive post
  {
    id: 'doc-024',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'LinkedIn post: Industry executive reflects on SMIC achievement',
    excerpt: 'Semiconductor executive shares balanced perspective on SMIC\'s 5nm announcement, recognizing technical achievement while questioning economics and policy effectiveness.',
    url: 'https://linkedin.com/posts/semiconductorexec_smic-china-semiconductor-activity',
    publishedDate: '2026-01-17T09:15:00Z',
    publisherId: 'pub-linkedin',
    author: {
      username: 'michael-chen-semiconductor',
      displayName: 'Michael Chen',
      avatarUrl: 'https://i.pravatar.cc/150?u=michael-chen-semiconductor'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: '📊 Reflections on SMIC\'s 5nm Achievement\n\nAs someone who has spent 25 years in semiconductor manufacturing, I want to share some thoughts on what SMIC\'s announcement really means for our industry.\n\nThe technical achievement is real. Multi-patterning at this scale requires extraordinary process control and engineering discipline. Their teams deserve recognition.\n\nHowever, we should be clear-eyed about the economics:\n• Cost disadvantage: 2-3x vs EUV-based production\n• Yield challenges: Significantly lower than industry leaders\n• Scalability questions: Multi-patterning complexity increases exponentially at smaller nodes\n\nThe bigger question for policymakers: Are export controls achieving their stated goals, or are they accelerating China\'s push for complete self-sufficiency?\n\nI\'d love to hear perspectives from others in the industry. What are you seeing in your supply chains?\n\n#Semiconductors #Manufacturing #China #Technology #ExportControls',
        entityMentions: [
          { startOffset: 18, endOffset: 22, entityType: 'organization', entityId: 'org-001' },
          { startOffset: 147, endOffset: 151, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [],
    activities: [
      {
        id: 'activity-024-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'achieved',
        targetId: null,
        targetType: null,
        targetText: '5nm chip production milestone'
      }
    ],
    metrics: {
      comments: 234,
      likes: 1847,
      shares: 312,
      platform: 'linkedin'
    },
    narrativeIds: ['narr-001'],
    themeIds: ['sub-003'],
    topicIds: ['topic-001'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.76 },
      'faction-011': { sentiment: 0.85 },
      'faction-002': { sentiment: -0.57 },
      'faction-003': { sentiment: 0.17 }
    },
    highlights: [],
    comments: []
  },
  // Weibo - Chinese tech celebration post
  {
    id: 'doc-025',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Weibo post: Chinese tech blogger celebrates SMIC 5nm success',
    excerpt: 'Viral Weibo post celebrating SMIC\'s 5nm achievement as proof of Chinese technological self-reliance in face of Western restrictions.',
    url: 'https://weibo.com/u/7234567890/post/12345678',
    publishedDate: '2026-01-15T19:45:00Z',
    publisherId: 'pub-weibo',
    author: {
      username: '科技前沿观察',
      displayName: 'Tech Frontier Observer',
      avatarUrl: 'https://i.pravatar.cc/150?u=TechFrontierObserver'
    },
    contentBlocks: [
      { type: 'paragraph', content: '🎉 重磅消息！中芯国际5纳米芯片量产成功！\n\n没有EUV光刻机，我们照样能行！这是中国半导体工程师的智慧和毅力的结晶。\n\n西方封锁只会让我们更强大。自主创新才是出路！\n\n华为Mate 70搭载的芯片就是中芯国际生产的。这才是真正的中国力量！💪🇨🇳\n\n#中芯国际 #半导体 #自主创新 #华为 #中国制造', portionMark: { classification: 'U', handling: '' } }
    ],
    metrics: {
      comments: 28947,
      likes: 184521,
      shares: 42156,
      platform: 'weibo'
    },
    narrativeIds: ['narr-001'],
    themeIds: ['sub-002'],
    topicIds: ['topic-001'],
    personIds: [],
    organizationIds: ['org-001', 'org-010'],
    locationIds: ['loc-001'],
    eventIds: ['event-002'],
    factionMentions: {
      'faction-001': { sentiment: 0.78 },
      'faction-002': { sentiment: -0.56 },
      'faction-003': { sentiment: 0.13 },
      'faction-011': { sentiment: 0.85 }
    },
    highlights: [],
    comments: []
  },
  // Reddit - Export controls discussion
  {
    id: 'doc-026',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Reddit discussion: Are US chip export controls backfiring?',
    excerpt: 'Reddit thread questioning effectiveness of US export controls, citing SMIC, YMTC, and massive Chinese investment as potential evidence of unintended acceleration.',
    url: 'https://reddit.com/r/hardware/comments/xyz789/export_controls_backfiring',
    publishedDate: '2026-01-18T22:30:00Z',
    publisherId: 'pub-reddit',
    author: {
      username: 'u/silicon_skeptic',
      displayName: 'silicon_skeptic',
      avatarUrl: 'https://i.pravatar.cc/150?u=silicon_skeptic'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**Are US chip export controls backfiring?**\n\nBetween SMIC\'s 5nm, YMTC\'s 232-layer NAND, and China\'s $47B new investment fund, I\'m starting to wonder if the export controls are doing what they\'re supposed to.\n\nBefore the restrictions:\n- China was heavily dependent on US/Western tech\n- Companies like Huawei bought most components from US suppliers\n- Little incentive for massive domestic investment\n\nAfter the restrictions:\n- $100B+ committed to semiconductor self-sufficiency\n- SMIC achieving nodes previously thought impossible without EUV\n- Huawei reportedly stockpiled billions in equipment\n- YMTC chips appearing in devices globally despite Entity List\n\nThe goal was to slow China\'s progress. Did we instead light a fire under them?\n\nCurious what others think. Not trying to make a political statement, just looking at the data.', portionMark: { classification: 'U', handling: '' } }
    ],
    metrics: {
      comments: 1847,
      likes: 4521,
      shares: 234,
      platform: 'reddit'
    },
    narrativeIds: ['narr-001', 'narr-002', 'narr-003'],
    themeIds: ['sub-003'],
    topicIds: ['topic-002'],
    personIds: [],
    organizationIds: ['org-001', 'org-005'],
    locationIds: [],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.24 },
      'faction-002': { sentiment: -0.12 },
      'faction-003': { sentiment: 0.21 },
      'faction-004': { sentiment: -0.65 },
      'faction-005': { sentiment: 0.67 },
      'faction-006': { sentiment: -0.44 },
      'faction-007': { sentiment: -0.52 },
      'faction-011': { sentiment: 0.85 },
      'faction-013': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  // X/Twitter - Policy hawk perspective
  {
    id: 'doc-027',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'X post: National security analyst defends export controls',
    excerpt: 'Policy hawk argues SMIC\'s 5nm achievement doesn\'t undermine export controls, citing cost and yield disadvantages that make Chinese chips uncompetitive.',
    url: 'https://x.com/nationalsecuritywatch/status/1881345678901234',
    publishedDate: '2026-01-19T11:42:00Z',
    publisherId: 'pub-x',
    author: {
      username: '@nationalsecuritywatch',
      displayName: 'National Security Watch',
      avatarUrl: 'https://i.pravatar.cc/150?u=nationalsecuritywatch'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Don\'t be fooled by headlines about SMIC\'s "5nm breakthrough."\n\nYes, they made a chip. But:\n\n❌ Costs 3x more to produce\n❌ Yields far below competitive levels\n❌ Can\'t scale for high-volume manufacturing\n❌ Years behind on next-gen 3nm/2nm\n\nExport controls are working. The goal was never to completely stop progress—it was to maintain our lead.\n\nChina is burning through resources on brute-force engineering that won\'t be economically viable.\n\nStay the course.', portionMark: { classification: 'U', handling: '' } }
    ],
    metrics: {
      comments: 523,
      likes: 2847,
      shares: 892,
      platform: 'x'
    },
    narrativeIds: ['narr-001', 'narr-002'],
    themeIds: ['sub-003'],
    topicIds: ['topic-002'],
    personIds: [],
    organizationIds: ['org-005'],
    locationIds: ['loc-004'],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: -0.02 },
      'faction-002': { sentiment: 0.06 },
      'faction-003': { sentiment: 0.14 },
      'faction-004': { sentiment: -0.68 },
      'faction-006': { sentiment: -0.46 },
      'faction-007': { sentiment: -0.52 },
      'faction-011': { sentiment: 0.85 },
      'faction-013': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  // LinkedIn - ASML impact discussion
  {
    id: 'doc-028',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'LinkedIn post: ASML\'s $2.5B China revenue hit analyzed',
    excerpt: 'Financial analyst breaks down ASML\'s Q4 guidance update and the impact of expanded China export restrictions on semiconductor equipment market.',
    url: 'https://linkedin.com/posts/semiconductor-analyst_asml-china-exportcontrols-activity',
    publishedDate: '2026-01-16T08:30:00Z',
    publisherId: 'pub-linkedin',
    author: {
      username: 'jennifer-williams-analyst',
      displayName: 'Jennifer Williams, CFA',
      avatarUrl: 'https://i.pravatar.cc/150?u=jennifer-williams-analyst'
    },
    contentBlocks: [
      { type: 'paragraph', content: '💰 ASML\'s $2.5B China Problem\n\nASML\'s Q4 guidance update is a wake-up call for investors in the semiconductor equipment space.\n\nKey takeaways:\n\n📉 $2.5B annual revenue hit from expanded China restrictions\n📊 That\'s roughly 10% of total revenue\n📈 Stock down 8% on the news\n\nThe bigger picture:\n\nChina was ASML\'s fastest-growing market. Now it\'s effectively closed.\n\nBut here\'s what\'s not in the headlines: ASML\'s backlog remains at record levels. The question is whether demand from other regions can offset the China loss.\n\nMy take: Short-term pain, but ASML\'s monopoly on EUV gives them pricing power. Watching closely.\n\n#ASML #Semiconductors #InvestmentAnalysis #ExportControls', portionMark: { classification: 'U', handling: '' } }
    ],
    metrics: {
      comments: 156,
      likes: 923,
      shares: 187,
      platform: 'linkedin'
    },
    narrativeIds: ['narr-002'],
    themeIds: ['sub-005'],
    topicIds: ['topic-002'],
    personIds: ['person-004'],
    organizationIds: ['org-002'],
    locationIds: ['loc-003'],
    eventIds: ['event-004'],
    factionMentions: {
      'faction-001': { sentiment: -0.83 },
      'faction-002': { sentiment: 0.72 },
      'faction-004': { sentiment: -0.69 },
      'faction-006': { sentiment: -0.46 },
      'faction-007': { sentiment: -0.52 },
      'faction-013': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  // X/Twitter - Huawei Mate 70 teardown
  {
    id: 'doc-029',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'X post: Huawei Mate 70 teardown confirms SMIC 5nm chip',
    excerpt: 'Tech analyst shares teardown photos confirming Kirin 9100 chip manufactured by SMIC using 5nm process inside Huawei\'s latest flagship.',
    url: 'https://x.com/techanalyst_cn/status/1881456789012345',
    publishedDate: '2026-01-18T16:20:00Z',
    publisherId: 'pub-x',
    author: {
      username: '@techanalyst_cn',
      displayName: 'CN Tech Analysis',
      avatarUrl: 'https://i.pravatar.cc/150?u=techanalyst_cn'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Just finished teardown of Huawei Mate 70. Confirmed: Kirin 9100 chip inside.\n\nDie marking shows SMIC 5nm process. This is real.\n\nKey observations:\n• Performance ~15% below A18 Bionic\n• Power efficiency noticeably worse\n• But it WORKS. And it\'s 100% China-made.\n\nPhotos and full analysis thread below 👇\n\n📸 [image]\n📸 [image]\n📸 [image]', portionMark: { classification: 'U', handling: '' } }
    ],
    metrics: {
      comments: 1234,
      likes: 8921,
      shares: 3456,
      platform: 'x'
    },
    narrativeIds: ['narr-001'],
    themeIds: ['sub-002'],
    topicIds: ['topic-001'],
    personIds: [],
    organizationIds: ['org-001', 'org-010'],
    locationIds: [],
    eventIds: ['event-002'],
    factionMentions: {
      'faction-001': { sentiment: 0.75 },
      'faction-002': { sentiment: -0.63 },
      'faction-003': { sentiment: 0.16 },
      'faction-011': { sentiment: 0.85 }
    },
    highlights: [],
    comments: []
  },
  // Reddit - TSMC Arizona worker perspective
  {
    id: 'doc-030',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Reddit AMA: TSMC Arizona worker shares insider perspective',
    excerpt: 'TSMC Arizona employee offers candid view of fab construction challenges, cultural clashes, and morale in Reddit AMA.',
    url: 'https://reddit.com/r/semiconductors/comments/abc123/tsmc_arizona_worker_ama',
    publishedDate: '2026-01-17T19:00:00Z',
    publisherId: 'pub-reddit',
    author: {
      username: 'u/az_chipworker',
      displayName: 'az_chipworker',
      avatarUrl: 'https://i.pravatar.cc/150?u=az_chipworker'
    },
    contentBlocks: [
      { 
        type: 'paragraph', 
        content: '**I work at TSMC Arizona. AMA about what\'s really happening**\n\nSeen a lot of misinformation about the Arizona fab. Thought I\'d offer some perspective as someone actually on the ground.\n\nBackground: Been in semiconductor manufacturing for 12 years. Joined TSMC Arizona 18 months ago.\n\nSome quick context:\n\n1. Yes, there are culture clashes. Taiwan teams work differently than American teams. That\'s real.\n\n2. The delays are mostly about equipment installation and qualification, not "lazy American workers" like some reports suggest.\n\n3. Morale is... complicated. Good pay, interesting work, but lots of frustration with management style.\n\n4. We\'re all learning. First fab of this scale ever built in the US. Growing pains are expected.\n\nHappy to answer what I can without violating my NDA.',
        entityMentions: [
          { startOffset: 12, endOffset: 16, entityType: 'organization', entityId: 'org-020' },
          { startOffset: 256, endOffset: 260, entityType: 'organization', entityId: 'org-020' }
        ],
        portionMark: { classification: 'U', handling: '' } 
      }
    ],
    quotes: [],
    activities: [
      {
        id: 'activity-030-01',
        actorId: 'org-020',
        actorType: 'organization',
        action: 'faced challenges at',
        targetId: null,
        targetType: null,
        targetText: 'Arizona fab construction'
      }
    ],
    metrics: {
      comments: 2847,
      likes: 5621,
      shares: 456,
      platform: 'reddit'
    },
    narrativeIds: ['narr-007'],
    themeIds: ['sub-016', 'sub-017'],
    topicIds: ['topic-007'],
    personIds: [],
    organizationIds: ['org-020'],
    locationIds: ['loc-009'],
    eventIds: ['event-013'],
    factionMentions: {
      'faction-001': { sentiment: -0.44 },
      'faction-005': { sentiment: 0.59 },
      'faction-006': { sentiment: -0.39 },
      'faction-007': { sentiment: -0.52 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [],
    comments: []
  },

  // ============================================
  // INTERNAL DOCUMENTS
  // ============================================

  // Internal Document - SMIC Technical Observation Report (SECRET)
  {
    id: 'doc-031',
    documentType: 'internal_report',
    repositoryId: 'repo-edl',
    classification: 'S',
    url: 'https://edl.intel.gov/documents/doc-031',
    publishedDate: '2026-01-16T08:00:00Z',
    publisherId: 'pub-dept-intel',
    title: 'TECHINT OBSERVATION: SMIC Fab 18 5nm Production Line',
    author: 'Technical Collection Unit',
    department: 'Technical Intelligence',
    contentBlocks: [
      { 
        type: 'heading', 
        content: 'COLLECTION SUMMARY', 
        portionMark: { classification: 'S', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'COLLECTION DATE: 2026-01-14/15\nCOLLECTION METHOD: Product teardown analysis, commercial satellite imagery\nTARGET: SMIC Shanghai Fab 18 (31.2294°N, 121.5006°E)',
        entityMentions: [
          { startOffset: 96, endOffset: 100, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'S', handling: 'NOFORN' } 
      },
      { 
        type: 'heading', 
        content: 'TEARDOWN FINDINGS', 
        portionMark: { classification: 'S', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Subject device: Huawei Mate 70 Pro (model HMA-AN00), purchased Hong Kong 2026-01-10\nProcessor: Kirin 9100 (die marking: K9100-SMIC-N5-2601)\nDie size: 107.8mm² (measured)\nTransistor density: 134M/mm² (calculated from feature measurements)\nPackaging: CoWoS-style 2.5D integration, SMIC branding visible on interposer',
        entityMentions: [
          { startOffset: 17, endOffset: 23, entityType: 'organization', entityId: 'org-010' },
          { startOffset: 85, endOffset: 89, entityType: 'organization', entityId: 'org-001' }
        ],
        portionMark: { classification: 'S', handling: 'NOFORN' } 
      },
      { 
        type: 'paragraph', 
        content: 'Process node verification: Gate pitch 48nm, metal pitch 28nm (M1-M4 layers). Multi-patterning artifacts visible—quadruple patterning signatures on critical layers. Edge placement error consistent with DUV self-aligned double patterning (SADP) techniques.',
        portionMark: { classification: 'S', handling: 'NOFORN' } 
      },
      { 
        type: 'heading', 
        content: 'IMAGERY OBSERVATIONS', 
        portionMark: { classification: 'S', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Fab 18 facility status as of 2026-01-15 0823 local:\n- Lithography hall expansion visible (Building C, under construction)\n- 47 truck movements logged 0600-1800 (chemical/gas delivery patterns)\n- Cleanroom exhaust activity consistent with 24/7 production operations\n- New ASML NXT:2050i system shipping container observed at loading dock (cross-ref with ASML service logs pending)',
        entityMentions: [
          { startOffset: 322, endOffset: 326, entityType: 'organization', entityId: 'org-002' }
        ],
        portionMark: { classification: 'S', handling: 'NOFORN' } 
      },
      { 
        type: 'heading', 
        content: 'RAW DATA ATTACHMENTS', 
        portionMark: { classification: 'S', handling: '' } 
      },
      { 
        type: 'paragraph', 
        content: 'Attachment A: High-resolution die photographs (12 images, 50nm resolution)\nAttachment B: SEM cross-section images (4 images)\nAttachment C: Satellite imagery sequence (6 images, 30cm resolution)\nAttachment D: X-ray diffraction analysis results',
        portionMark: { classification: 'S', handling: 'NOFORN' } 
      }
    ],
    quotes: [
      {
        id: 'quote-031-01',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'Fab 18 is now producing at volume. The multi-patterning team has exceeded all targets.'
      }
    ],
    activities: [
      {
        id: 'activity-031-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'commenced volume production of',
        targetId: null,
        targetType: null,
        targetText: '5nm chips at Fab 18'
      }
    ],
    excerpt: 'Technical observation report on SMIC Fab 18 5nm production capabilities based on product teardowns and imagery collection.',
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001', 'sub-002', 'sub-003'],
    topicIds: ['topic-001'],
    personIds: ['person-001', 'person-002'],
    organizationIds: ['org-001', 'org-002', 'org-010'],
    locationIds: ['loc-001', 'loc-002'],
    eventIds: ['event-001', 'event-002'],
    factionMentions: {
      'faction-001': { sentiment: 0.08 },
      'faction-002': { sentiment: -0.12 },
      'faction-003': { sentiment: 0.05 },
      'faction-011': { sentiment: 0.85 }
    },
    highlights: [
      {
        id: 'highlight-001',
        userId: 'user-001',
        blockIndex: 3,
        startOffset: 17,
        endOffset: 23,
        highlightedText: 'Huawei',
        createdAt: '2026-01-16T09:30:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-001',
        userId: 'user-001',
        blockIndex: 3,
        anchorStartOffset: 17,
        anchorEndOffset: 89,
        anchorText: 'Huawei Mate 70 Pro (model HMA-AN00), purchased Hong Kong 2026-01-10\nProcessor: Kirin 9100',
        content: 'First confirmed commercial device with SMIC 5nm silicon. Need additional samples to validate production consistency.',
        createdAt: '2026-01-16T10:15:00Z',
        replies: [
          {
            id: 'reply-001',
            userId: 'user-005',
            content: 'Procurement has 3 more units incoming from different retail channels.',
            createdAt: '2026-01-16T10:45:00Z'
          }
        ]
      }
    ]
  },

  // Internal Document - Export Controls Effectiveness Review (SECRET)
  {
    id: 'doc-032',
    documentType: 'internal_report',
    repositoryId: 'repo-edl',
    classification: 'S',
    url: 'https://edl.intel.gov/documents/doc-032',
    publishedDate: '2026-01-18T14:00:00Z',
    publisherId: 'pub-dept-intel',
    title: 'Export Controls Effectiveness Review: Semiconductor Equipment Restrictions',
    author: 'Policy Analysis Division',
    department: 'Policy Analysis',
    contentBlocks: [
      { type: 'heading', content: 'Assessment Scope', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'This review assesses the effectiveness of US and allied export controls on semiconductor manufacturing equipment to China, focusing on the period following expanded ASML DUV restrictions announced January 12, 2026.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Key Findings', portionMark: { classification: 'S', handling: '' } },
      { type: 'paragraph', content: 'Export controls have successfully prevented Chinese access to EUV lithography, maintaining a 2-3 generation gap in leading-edge production capability. However, controls have not prevented advancement through alternative approaches (DUV multi-patterning) nor deterred massive domestic investment ($47B Big Fund III).', portionMark: { classification: 'S', handling: 'NOFORN' } },
      { type: 'heading', content: 'Stockpiling Concerns', portionMark: { classification: 'S', handling: '' } },
      { type: 'paragraph', content: 'Intelligence indicates Huawei accumulated $5-8 billion in semiconductor equipment prior to expanded restrictions. Commerce Department investigation ongoing into potential sanctions circumvention through third-party intermediaries. Pattern suggests systematic preparation for prolonged restrictions.', portionMark: { classification: 'S', handling: 'NOFORN' } },
      { type: 'heading', content: 'ASML Impact Analysis', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'ASML projects $2.5B annual revenue loss from China restrictions. Company stock declined 8% following announcement. Dutch government concerns about economic impact may affect long-term compliance. Peter Wennink (person-004) expressed frustration in earnings call.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Recommendations', portionMark: { classification: 'S', handling: '' } },
      { type: 'list', content: ['Expand Entity List enforcement monitoring for YMTC chips in consumer devices', 'Coordinate with allies on closing third-party intermediary loopholes', 'Assess viability of extending controls to mature node equipment', 'Monitor SMEE lithography development for potential future restrictions'], portionMark: { classification: 'S', handling: 'NOFORN' } }
    ],
    excerpt: 'Review of semiconductor export controls effectiveness, including stockpiling concerns and recommendations for enhanced enforcement.',
    narrativeIds: ['narr-002', 'narr-004'],
    themeIds: ['sub-004', 'sub-005', 'sub-006', 'sub-010', 'sub-011'],
    topicIds: ['topic-002', 'topic-004'],
    personIds: ['person-004', 'person-005', 'person-006', 'person-007', 'person-011', 'person-012'],
    organizationIds: ['org-002', 'org-004', 'org-005', 'org-006', 'org-010'],
    locationIds: ['loc-003', 'loc-004', 'loc-005'],
    eventIds: ['event-003', 'event-004', 'event-005', 'event-008', 'event-009'],
    quotes: [],
    activities: [
      {
        id: 'activity-032-01',
        actorId: 'org-002',
        actorType: 'organization',
        action: 'stockpiled',
        targetId: null,
        targetType: null,
        targetText: '$5-8 billion in semiconductor equipment'
      },
      {
        id: 'activity-032-02',
        actorId: 'org-002',
        actorType: 'organization',
        action: 'circumvented sanctions via',
        targetId: null,
        targetType: null,
        targetText: 'third-party intermediaries'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.14 },
      'faction-002': { sentiment: 0.11 },
      'faction-004': { sentiment: -0.08 },
      'faction-006': { sentiment: -0.06 },
      'faction-007': { sentiment: -0.52 },
      'faction-011': { sentiment: 0.75 },
      'faction-013': { sentiment: -0.68 }
    },
    highlights: [
      {
        id: 'highlight-004',
        userId: 'user-004',
        blockIndex: 3,
        startOffset: 0,
        endOffset: 168,
        highlightedText: 'Export controls have successfully prevented Chinese access to EUV lithography, maintaining a 2-3 generation gap in leading-edge production capability. However, controls',
        createdAt: '2026-01-18T15:00:00Z'
      },
      {
        id: 'highlight-005',
        userId: 'user-002',
        blockIndex: 5,
        startOffset: 0,
        endOffset: 143,
        highlightedText: 'Intelligence indicates Huawei accumulated $5-8 billion in semiconductor equipment prior to expanded restrictions. Commerce Department investigation',
        createdAt: '2026-01-18T15:30:00Z'
      },
      {
        id: 'highlight-006',
        userId: 'user-006',
        blockIndex: 7,
        startOffset: 0,
        endOffset: 119,
        highlightedText: 'ASML projects $2.5B annual revenue loss from China restrictions. Company stock declined 8% following announcement. Dutch',
        createdAt: '2026-01-18T16:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-003',
        userId: 'user-002',
        blockIndex: 5,
        anchorStartOffset: 0,
        anchorEndOffset: 143,
        anchorText: 'Intelligence indicates Huawei accumulated $5-8 billion in semiconductor equipment prior to expanded restrictions. Commerce Department investigation',
        content: 'The stockpiling strategy was sophisticated. They anticipated the restrictions and prepared accordingly. We need better lead-time indicators.',
        createdAt: '2026-01-18T15:45:00Z',
        replies: [
          {
            id: 'reply-004',
            userId: 'user-003',
            content: 'Supply chain team is building a tracking model for future equipment purchases by Chinese firms. Should have baseline by Q2.',
            createdAt: '2026-01-18T16:15:00Z'
          }
        ]
      },
      {
        id: 'comment-004',
        userId: 'user-004',
        blockIndex: 7,
        anchorStartOffset: 119,
        anchorEndOffset: 216,
        anchorText: 'Dutch government concerns about economic impact may affect long-term compliance. Peter Wennink (person-004) expressed frustration',
        content: 'Allied alignment is fragile. We should flag this for the policy team—Dutch compliance is essential.',
        createdAt: '2026-01-18T16:30:00Z',
        replies: [
          {
            id: 'reply-005',
            userId: 'user-006',
            content: 'State is aware. There\'s a ministerial meeting next month to discuss continued coordination.',
            createdAt: '2026-01-18T17:00:00Z'
          }
        ]
      }
    ]
  },

  // Internal Document - Big Fund III Investment Analysis
  {
    id: 'doc-033',
    documentType: 'internal_report',
    repositoryId: 'repo-edl',
    classification: 'U',
    url: 'https://edl.intel.gov/documents/doc-033',
    publishedDate: '2026-01-19T10:00:00Z',
    publisherId: 'pub-dept-econ',
    title: 'Investment Analysis: China National IC Fund Phase III',
    author: 'Economic Analysis Division',
    department: 'Economic Intelligence',
    contentBlocks: [
      { type: 'heading', content: 'Fund Overview', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'China has launched the third phase of its National Integrated Circuit Industry Investment Fund ("Big Fund III") with 340 billion yuan ($47 billion). This exceeds the combined total of Phase I ($21B) and Phase II ($29B), representing a significant escalation of state-directed semiconductor investment.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Investment Priorities', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'State Council guidelines prioritize: (1) Advanced packaging technologies including chiplets and 2.5D/3D stacking, (2) Semiconductor manufacturing equipment with focus on lithography, (3) EDA software development to reduce Cadence/Synopsys dependency. Notably absent: direct investment in leading-edge logic fabs.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Key Recipients', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Expected major beneficiaries include: SMEE (lithography equipment), Empyrean Technology (EDA), Huada Jiutian (EDA), AMEC (etch equipment), Naura (deposition equipment). State-owned enterprises providing majority of capital, signaling deepening government control over sector.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Historical Context', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Big Fund has mixed track record. Phase I investments in YMTC and CXMT showed technology progress but corruption scandals led to arrests of senior officials. Western analysts question whether capital injection can overcome equipment access barriers.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Market Implications', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Fund announcement drove Chinese semiconductor stocks up 8-12%. Global equipment makers (ASML, Applied Materials, Lam Research) showed mixed reaction—Chinese domestic equipment push represents both lost opportunity and potential long-term competitive threat.', portionMark: { classification: 'U', handling: 'FOUO' } }
    ],
    excerpt: 'Analysis of China\'s $47 billion Big Fund III semiconductor investment, including priorities, recipients, and market implications.',
    narrativeIds: ['narr-003'],
    themeIds: ['sub-007', 'sub-008', 'sub-009'],
    topicIds: ['topic-003', 'topic-006'],
    personIds: ['person-008', 'person-009', 'person-010'],
    organizationIds: ['org-007', 'org-008', 'org-009', 'org-016', 'org-017', 'org-022'],
    locationIds: ['loc-002', 'loc-006'],
    eventIds: ['event-006', 'event-007'],
    quotes: [],
    activities: [
      {
        id: 'activity-033-01',
        actorId: 'org-007',
        actorType: 'organization',
        action: 'launched',
        targetId: null,
        targetType: null,
        targetText: 'Big Fund III with $47 billion'
      },
      {
        id: 'activity-033-02',
        actorId: 'org-007',
        actorType: 'organization',
        action: 'prioritized investment in',
        targetId: null,
        targetType: null,
        targetText: 'advanced packaging, equipment, and EDA software'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.12 },
      'faction-002': { sentiment: -0.09 },
      'faction-003': { sentiment: 0.06 },
      'faction-005': { sentiment: 0.14 },
      'faction-011': { sentiment: 0.82 }
    },
    highlights: [
      {
        id: 'highlight-007',
        userId: 'user-002',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 175,
        highlightedText: 'China has launched the third phase of its National Integrated Circuit Industry Investment Fund ("Big Fund III") with 340 billion yuan ($47 billion). This exceeds the combined',
        createdAt: '2026-01-19T11:00:00Z'
      },
      {
        id: 'highlight-008',
        userId: 'user-001',
        blockIndex: 3,
        startOffset: 0,
        endOffset: 196,
        highlightedText: 'State Council guidelines prioritize: (1) Advanced packaging technologies including chiplets and 2.5D/3D stacking, (2) Semiconductor manufacturing equipment with focus on lithography, (3) EDA software',
        createdAt: '2026-01-19T11:30:00Z'
      },
      {
        id: 'highlight-009',
        userId: 'user-006',
        blockIndex: 7,
        startOffset: 0,
        endOffset: 155,
        highlightedText: 'Big Fund has mixed track record. Phase I investments in YMTC and CXMT showed technology progress but corruption scandals led to arrests of senior officials.',
        createdAt: '2026-01-19T12:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-005',
        userId: 'user-002',
        blockIndex: 1,
        anchorStartOffset: 175,
        anchorEndOffset: 292,
        anchorText: 'This exceeds the combined total of Phase I ($21B) and Phase II ($29B), representing a significant escalation of state-directed semiconductor investment.',
        content: 'The scale signals strategic priority at the highest levels. This isn\'t incremental—it\'s a whole-of-government commitment.',
        createdAt: '2026-01-19T11:15:00Z',
        replies: [
          {
            id: 'reply-006',
            userId: 'user-006',
            content: 'Agreed. Include this in the weekly strategic assessment. NSC will want to see the comparison with our CHIPS Act funding.',
            createdAt: '2026-01-19T11:45:00Z'
          }
        ]
      },
      {
        id: 'comment-006',
        userId: 'user-001',
        blockIndex: 3,
        anchorStartOffset: 196,
        anchorEndOffset: 274,
        anchorText: 'Notably absent: direct investment in leading-edge logic fabs.',
        content: 'This is interesting. They may be recognizing that logic fab investment has diminishing returns without EUV access.',
        createdAt: '2026-01-19T12:00:00Z',
        replies: [
          {
            id: 'reply-007',
            userId: 'user-005',
            content: 'Or pivoting to areas where they can achieve self-sufficiency faster. Equipment and EDA are strategic bottlenecks.',
            createdAt: '2026-01-19T12:30:00Z'
          }
        ]
      }
    ]
  },

  // Internal Document - YMTC Supply Chain Analysis (SECRET)
  {
    id: 'doc-034',
    documentType: 'internal_report',
    repositoryId: 'repo-edl',
    classification: 'S',
    url: 'https://edl.intel.gov/documents/doc-034',
    publishedDate: '2026-01-19T16:00:00Z',
    publisherId: 'pub-dept-intel',
    title: 'Supply Chain Analysis: YMTC Memory Chips in Global Consumer Electronics',
    author: 'Supply Chain Intelligence Division',
    department: 'Supply Chain Analysis',
    contentBlocks: [
      { type: 'heading', content: 'Investigation Summary', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'This analysis examines the presence of YMTC-manufactured NAND flash memory in consumer electronics despite the company\'s placement on the US Entity List in December 2022.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Product Identification', portionMark: { classification: 'S', handling: '' } },
      { type: 'paragraph', content: 'TechInsights teardown analysis has confirmed YMTC 232-layer 3D NAND chips in: smartphones from 3 Chinese brands, SSDs from 2 Taiwanese ODMs, and USB drives from multiple white-label manufacturers. Chip markings indicate YMTC Fab 1 and Fab 2 production in Wuhan.', portionMark: { classification: 'S', handling: 'NOFORN' } },
      { type: 'heading', content: 'Supply Chain Pathways', portionMark: { classification: 'S', handling: '' } },
      { type: 'paragraph', content: 'Analysis indicates chips are reaching global markets through: (1) Direct integration by Chinese OEMs not subject to US jurisdiction, (2) Module assembly in Southeast Asia obscuring chip origin, (3) Relabeling through intermediary distributors. End-to-end tracking proves difficult without physical teardowns.', portionMark: { classification: 'S', handling: 'NOFORN' } },
      { type: 'heading', content: 'Technology Assessment', portionMark: { classification: 'S', handling: '' } },
      { type: 'paragraph', content: 'YMTC 232-layer NAND demonstrates competitive performance with Samsung and SK Hynix offerings in sequential read/write and random IOPS. Power efficiency approximately 8% lower. Technology gap has narrowed significantly from 2022 baseline despite export restrictions.', portionMark: { classification: 'S', handling: 'NOFORN' } },
      { type: 'heading', content: 'Enforcement Recommendations', portionMark: { classification: 'S', handling: '' } },
      { type: 'list', content: ['Expand Entity List to include known intermediary distributors', 'Require country-of-origin disclosure for memory components in US-bound electronics', 'Coordinate with Taiwanese authorities on ODM compliance', 'Consider secondary sanctions for companies knowingly sourcing YMTC chips'], portionMark: { classification: 'S', handling: 'NOFORN' } }
    ],
    excerpt: 'Analysis of YMTC memory chip presence in global supply chains despite Entity List restrictions, including pathways and enforcement recommendations.',
    narrativeIds: ['narr-005'],
    themeIds: ['sub-012', 'sub-013'],
    topicIds: ['topic-005'],
    personIds: ['person-013', 'person-014'],
    organizationIds: ['org-013', 'org-014', 'org-015', 'org-005'],
    locationIds: ['loc-007', 'loc-004'],
    eventIds: ['event-010', 'event-011'],
    quotes: [],
    activities: [
      {
        id: 'activity-034-01',
        actorId: 'org-013',
        actorType: 'organization',
        action: 'supplied chips to',
        targetId: null,
        targetType: null,
        targetText: 'global consumer electronics despite Entity List'
      },
      {
        id: 'activity-034-02',
        actorId: 'org-013',
        actorType: 'organization',
        action: 'achieved',
        targetId: null,
        targetType: null,
        targetText: 'competitive performance with Samsung and SK Hynix'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.11 },
      'faction-002': { sentiment: 0.08 },
      'faction-003': { sentiment: -0.05 },
      'faction-006': { sentiment: -0.13 },
      'faction-013': { sentiment: -0.68 }
    },
    highlights: [
      {
        id: 'highlight-010',
        userId: 'user-003',
        blockIndex: 3,
        startOffset: 0,
        endOffset: 178,
        highlightedText: 'TechInsights teardown analysis has confirmed YMTC 232-layer 3D NAND chips in: smartphones from 3 Chinese brands, SSDs from 2 Taiwanese ODMs, and USB drives from multiple white-label',
        createdAt: '2026-01-19T17:00:00Z'
      },
      {
        id: 'highlight-011',
        userId: 'user-004',
        blockIndex: 5,
        startOffset: 0,
        endOffset: 199,
        highlightedText: 'Analysis indicates chips are reaching global markets through: (1) Direct integration by Chinese OEMs not subject to US jurisdiction, (2) Module assembly in Southeast Asia obscuring chip origin, (3)',
        createdAt: '2026-01-19T17:30:00Z'
      },
      {
        id: 'highlight-012',
        userId: 'user-001',
        blockIndex: 7,
        startOffset: 0,
        endOffset: 157,
        highlightedText: 'YMTC 232-layer NAND demonstrates competitive performance with Samsung and SK Hynix offerings in sequential read/write and random IOPS. Power efficiency approximately',
        createdAt: '2026-01-19T18:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-007',
        userId: 'user-003',
        blockIndex: 5,
        anchorStartOffset: 0,
        anchorEndOffset: 199,
        anchorText: 'Analysis indicates chips are reaching global markets through: (1) Direct integration by Chinese OEMs not subject to US jurisdiction, (2) Module assembly in Southeast Asia obscuring chip origin, (3)',
        content: 'The Southeast Asia module assembly pathway is the hardest to track. We need better visibility into Vietnamese and Malaysian assembly operations.',
        createdAt: '2026-01-19T17:45:00Z',
        replies: [
          {
            id: 'reply-008',
            userId: 'user-006',
            content: 'Commerce is aware but enforcement resources are limited. Prioritize the highest-volume pathways.',
            createdAt: '2026-01-19T18:15:00Z'
          }
        ]
      },
      {
        id: 'comment-008',
        userId: 'user-001',
        blockIndex: 7,
        anchorStartOffset: 0,
        anchorEndOffset: 157,
        anchorText: 'YMTC 232-layer NAND demonstrates competitive performance with Samsung and SK Hynix offerings in sequential read/write and random IOPS. Power efficiency approximately',
        content: 'The technology gap is narrowing faster than expected. Two years ago they were 3 generations behind. Now it\'s less than one.',
        createdAt: '2026-01-19T18:30:00Z',
        replies: [
          {
            id: 'reply-009',
            userId: 'user-005',
            content: 'Memory is a different story than logic. More commoditized and easier to reverse-engineer. But still concerning.',
            createdAt: '2026-01-19T19:00:00Z'
          }
        ]
      }
    ]
  },

  // Internal Document - TSMC Arizona Operations Assessment
  {
    id: 'doc-035',
    documentType: 'internal_report',
    repositoryId: 'repo-edl',
    classification: 'U',
    url: 'https://edl.intel.gov/documents/doc-035',
    publishedDate: '2026-01-17T15:00:00Z',
    publisherId: 'pub-dept-ops',
    title: 'Operations Assessment: TSMC Arizona Fab Construction and Workforce Challenges',
    author: 'Industrial Analysis Division',
    department: 'Industrial Intelligence',
    contentBlocks: [
      { type: 'heading', content: 'Project Status', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'TSMC\'s $40 billion Arizona fabrication facility faces significant delays. Original 2024 production target has slipped to late 2025 for 4nm chips. Cost overruns estimated at 15-20% above initial projections. Second fab (3nm) timeline uncertain.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Workforce Dynamics', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Cultural tensions between Taiwanese management and American workforce well-documented. Arizona Building and Construction Trades Council (org-021) filed formal grievances citing management practices. TSMC CEO C.C. Wei acknowledged "different work culture" in public remarks.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'paragraph', content: 'Key friction points include: expectations around overtime and weekend work, communication styles, decision-making hierarchy, and training approaches. TSMC has brought approximately 500 Taiwanese engineers to Arizona, creating perception of two-tier workforce.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Strategic Implications', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Delays undermine CHIPS Act goal of domestic semiconductor manufacturing. Intel and Samsung facing similar challenges at US facilities. Questions emerging about viability of reshoring advanced chip production without fundamental changes to work culture expectations.', portionMark: { classification: 'U', handling: 'FOUO' } },
      { type: 'heading', content: 'Chinese Media Response', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Chinese Tech Industry Supporters faction (faction-001) amplifying TSMC Arizona difficulties. Narrative framing: US manufacturing decline vs. Chinese industrial capability. Global Times and CGTN coverage emphasizes "American workers can\'t match Asian discipline."', portionMark: { classification: 'U', handling: 'FOUO' } }
    ],
    excerpt: 'Assessment of TSMC Arizona fab challenges including workforce dynamics, delays, and strategic implications for US semiconductor manufacturing.',
    narrativeIds: ['narr-007'],
    themeIds: ['sub-016', 'sub-017'],
    topicIds: ['topic-007'],
    personIds: ['person-017', 'person-018', 'person-019'],
    organizationIds: ['org-020', 'org-021'],
    locationIds: ['loc-009', 'loc-010'],
    eventIds: ['event-013', 'event-014'],
    quotes: [],
    activities: [
      {
        id: 'activity-035-01',
        actorId: 'org-020',
        actorType: 'organization',
        action: 'faced delays at',
        targetId: null,
        targetType: null,
        targetText: 'Arizona fab construction'
      },
      {
        id: 'activity-035-02',
        actorId: 'org-021',
        actorType: 'organization',
        action: 'filed grievances against',
        targetId: 'org-020',
        targetType: 'organization',
        targetText: 'TSMC management practices'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.07 },
      'faction-005': { sentiment: 0.10 },
      'faction-006': { sentiment: -0.04 },
      'faction-007': { sentiment: -0.52 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [
      {
        id: 'highlight-013',
        userId: 'user-001',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 151,
        highlightedText: 'TSMC\'s $40 billion Arizona fabrication facility faces significant delays. Original 2024 production target has slipped to late 2025 for 4nm chips. Cost',
        createdAt: '2026-01-17T16:00:00Z'
      },
      {
        id: 'highlight-014',
        userId: 'user-004',
        blockIndex: 3,
        startOffset: 0,
        endOffset: 163,
        highlightedText: 'Cultural tensions between Taiwanese management and American workforce well-documented. Arizona Building and Construction Trades Council (org-021) filed formal grievances',
        createdAt: '2026-01-17T16:30:00Z'
      },
      {
        id: 'highlight-015',
        userId: 'user-006',
        blockIndex: 6,
        startOffset: 0,
        endOffset: 144,
        highlightedText: 'Delays undermine CHIPS Act goal of domestic semiconductor manufacturing. Intel and Samsung facing similar challenges at US facilities. Questions',
        createdAt: '2026-01-17T17:00:00Z'
      },
      {
        id: 'highlight-016',
        userId: 'user-002',
        blockIndex: 8,
        startOffset: 0,
        endOffset: 142,
        highlightedText: 'Chinese Tech Industry Supporters faction (faction-001) amplifying TSMC Arizona difficulties. Narrative framing: US manufacturing decline vs.',
        createdAt: '2026-01-17T17:30:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-009',
        userId: 'user-004',
        blockIndex: 4,
        anchorStartOffset: 0,
        anchorEndOffset: 200,
        anchorText: 'Key friction points include: expectations around overtime and weekend work, communication styles, decision-making hierarchy, and training approaches. TSMC has brought approximately 500 Taiwanese engineers',
        content: 'The cultural integration challenges were predictable. We flagged this in the CHIPS Act implementation assessment last year.',
        createdAt: '2026-01-17T16:45:00Z',
        replies: [
          {
            id: 'reply-010',
            userId: 'user-001',
            content: 'True, but the depth of the issues is worse than expected. This affects all reshoring efforts, not just TSMC.',
            createdAt: '2026-01-17T17:15:00Z'
          }
        ]
      },
      {
        id: 'comment-010',
        userId: 'user-006',
        blockIndex: 6,
        anchorStartOffset: 144,
        anchorEndOffset: 285,
        anchorText: 'Questions emerging about viability of reshoring advanced chip production without fundamental changes to work culture expectations.',
        content: 'This is the hard question nobody wants to address. Do we adapt American work culture or accept that leading-edge fabs will always be in Asia?',
        createdAt: '2026-01-17T17:45:00Z',
        replies: [
          {
            id: 'reply-011',
            userId: 'user-002',
            content: 'Worth noting that Intel and GlobalFoundries have operated US fabs successfully. The issue may be specific to leading-edge processes.',
            createdAt: '2026-01-17T18:00:00Z'
          },
          {
            id: 'reply-012',
            userId: 'user-006',
            content: 'Good point. Intel\'s new Ohio fab will be an important test case. Different company, different approach.',
            createdAt: '2026-01-17T18:30:00Z'
          }
        ]
      },
      {
        id: 'comment-011',
        userId: 'user-002',
        blockIndex: 8,
        anchorStartOffset: 142,
        anchorEndOffset: 261,
        anchorText: 'Narrative framing: US manufacturing decline vs. Chinese industrial capability. Global Times and CGTN coverage emphasizes "American workers can\'t match Asian discipline."',
        content: 'This narrative is gaining traction internationally. We should prepare counter-messaging emphasizing different metrics of success.',
        createdAt: '2026-01-17T18:15:00Z',
        replies: []
      }
    ]
  },

  // Historical documents: Intel Struggles & Rare Earth Controls (June 2025 - January 2026)
  {
    id: 'doc-036',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.bloomberg.com/news/articles/intel-announces-15000-layoffs',
    publishedDate: '2025-06-20T09:00:00Z',
    publisherId: 'pub-bloomberg',
    title: 'Intel Announces 15,000 Layoffs in Major Restructuring',
    author: 'Ian King',
    contentBlocks: [
      { type: 'paragraph', content: 'Intel Corporation announced Monday it will cut 15,000 jobs as part of a major restructuring effort to stem losses in its foundry business.' },
      { type: 'paragraph', content: 'CEO Pat Gelsinger called the cuts "painful but necessary" as the company struggles to compete with TSMC and Samsung in the contract chip manufacturing market.' }
    ],
    excerpt: 'Intel announces 15,000 layoffs amid struggles to compete in foundry business.',
    narrativeIds: ['narr-008'],
    themeIds: ['sub-018'],
    topicIds: ['topic-008'],
    personIds: ['person-020'],
    organizationIds: ['org-027'],
    locationIds: ['loc-012'],
    eventIds: ['event-015'],
    quotes: [
      {
        id: 'quote-036-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'These cuts are painful but necessary as we work to restructure our operations and return to profitability in our foundry business.'
      }
    ],
    activities: [
      {
        id: 'activity-036-01',
        actorId: 'org-027',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: '15,000 job cuts as part of major restructuring'
      },
      {
        id: 'activity-036-02',
        actorId: 'person-020',
        actorType: 'person',
        action: 'defended',
        targetId: 'org-027',
        targetType: 'organization',
        targetText: 'restructuring efforts amid foundry business struggles'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: -0.55 },
      'faction-005': { sentiment: -0.72 },
      'faction-006': { sentiment: 0.35 },
      'faction-008': { sentiment: 0.15 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-037',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.semiengineering.com/intel-foundry-survival',
    publishedDate: '2025-06-25T10:00:00Z',
    publisherId: 'pub-semiengi',
    title: 'Can Intel Survive the Foundry Wars?',
    author: 'Mark Lapedus',
    contentBlocks: [
      { type: 'paragraph', content: 'Intel\'s foundry ambitions face their toughest test yet. With TSMC commanding over 50% of the global foundry market and Samsung investing heavily, Intel must execute flawlessly to remain relevant.' },
      { type: 'paragraph', content: 'Industry analysts are divided on whether Intel can close the technology gap.' }
    ],
    excerpt: 'Analysis: Intel\'s foundry business faces existential challenges.',
    narrativeIds: ['narr-008'],
    themeIds: ['sub-018', 'sub-019'],
    topicIds: ['topic-008'],
    personIds: ['person-020'],
    organizationIds: ['org-027'],
    locationIds: ['loc-012'],
    eventIds: ['event-015'],
    quotes: [
      {
        id: 'quote-037-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'We are committed to executing our IDM 2.0 strategy despite the headwinds. Intel has faced challenges before and emerged stronger.'
      }
    ],
    activities: [
      {
        id: 'activity-037-01',
        actorId: 'org-027',
        actorType: 'organization',
        action: 'struggles to compete with',
        targetId: null,
        targetType: null,
        targetText: 'TSMC and Samsung in global foundry market'
      },
      {
        id: 'activity-037-02',
        actorId: 'person-020',
        actorType: 'person',
        action: 'leads',
        targetId: 'org-027',
        targetType: 'organization',
        targetText: 'turnaround efforts amid existential challenges'
      }
    ],
    factionMentions: {
      'faction-003': { sentiment: -0.42 },
      'faction-005': { sentiment: -0.65 },
      'faction-008': { sentiment: 0.15 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-038',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.reuters.com/technology/samsung-17-billion-chip-investment',
    publishedDate: '2025-07-05T08:00:00Z',
    publisherId: 'pub-reuters',
    title: 'Samsung Pledges $17 Billion Chip Investment in Korea',
    author: 'Heekyong Yang',
    contentBlocks: [
      { type: 'paragraph', content: 'Samsung Electronics announced a $17 billion investment in new semiconductor facilities in South Korea, backed by government subsidies.' },
      { type: 'paragraph', content: 'The investment will expand production of advanced memory chips and establish new logic chip manufacturing lines.' }
    ],
    excerpt: 'Samsung announces $17 billion chip investment with Korean government support.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-020'],
    personIds: ['person-022'],
    organizationIds: ['org-014', 'org-032'],
    locationIds: ['loc-011'],
    eventIds: ['event-016'],
    quotes: [
      {
        id: 'quote-038-01',
        speakerId: 'person-022',
        speakerType: 'person',
        text: 'This investment will ensure Samsung remains at the forefront of semiconductor technology and strengthens Korea\'s position in the global chip supply chain.'
      },
      {
        id: 'quote-038-02',
        speakerId: 'org-032',
        speakerType: 'organization',
        text: 'The government is committed to supporting our semiconductor industry as a matter of national strategic importance.'
      }
    ],
    activities: [
      {
        id: 'activity-038-01',
        actorId: 'org-014',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: '$17 billion investment in new semiconductor facilities'
      },
      {
        id: 'activity-038-02',
        actorId: 'org-032',
        actorType: 'organization',
        action: 'provided subsidies to',
        targetId: 'org-014',
        targetType: 'organization',
        targetText: 'semiconductor manufacturing expansion'
      },
      {
        id: 'activity-038-03',
        actorId: 'person-022',
        actorType: 'person',
        action: 'led',
        targetId: 'org-014',
        targetType: 'organization',
        targetText: 'major chip investment initiative'
      }
    ],
    factionMentions: {
      'faction-006': { sentiment: 0.72 },
      'faction-010': { sentiment: -0.35 },
      'faction-012': { sentiment: -0.42 },
      'faction-016': { sentiment: 0.32 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-039',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.wsj.com/business/us-concerns-korean-semiconductor-subsidies',
    publishedDate: '2025-07-25T14:00:00Z',
    publisherId: 'pub-wsj',
    title: 'US Raises Concerns Over Korean Semiconductor Subsidies',
    author: 'Jiyoung Sohn',
    contentBlocks: [
      { type: 'paragraph', content: 'The United States has raised concerns at the World Trade Organization over South Korea\'s semiconductor subsidies, arguing they distort global competition.' },
      { type: 'paragraph', content: 'The move strains the technology alliance between the countries at a sensitive time for chip supply chain efforts.' }
    ],
    excerpt: 'US objects to Korean chip subsidies at WTO, straining alliance.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-020', 'sub-021'],
    personIds: [],
    organizationIds: ['org-005', 'org-032'],
    locationIds: ['loc-004', 'loc-011'],
    eventIds: ['event-017'],
    quotes: [
      {
        id: 'quote-039-01',
        speakerId: 'org-005',
        speakerType: 'organization',
        text: 'We are concerned that these subsidies may distort global competition in the semiconductor market and undermine fair trade principles.'
      },
      {
        id: 'quote-039-02',
        speakerId: 'org-032',
        speakerType: 'organization',
        text: 'Our semiconductor support programs are consistent with WTO rules and essential for maintaining competitive supply chains.'
      }
    ],
    activities: [
      {
        id: 'activity-039-01',
        actorId: 'org-005',
        actorType: 'organization',
        action: 'raised concerns at WTO over',
        targetId: 'org-032',
        targetType: 'organization',
        targetText: 'South Korean semiconductor subsidies'
      },
      {
        id: 'activity-039-02',
        actorId: 'org-032',
        actorType: 'organization',
        action: 'defended',
        targetId: null,
        targetType: null,
        targetText: 'semiconductor subsidy programs'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.58 },
      'faction-006': { sentiment: -0.45 },
      'faction-010': { sentiment: -0.35 },
      'faction-012': { sentiment: -0.42 },
      'faction-016': { sentiment: 0.32 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-040',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.scmp.com/tech/china-rare-earth-export-quotas',
    publishedDate: '2025-08-10T11:00:00Z',
    publisherId: 'pub-scmp',
    title: 'China Imposes Rare Earth Export Quotas in Escalation of Tech Tensions',
    author: 'Che Pan',
    contentBlocks: [
      { type: 'paragraph', content: 'China announced new export quotas on rare earth materials essential for semiconductor manufacturing, in what analysts see as retaliation for Western chip export controls.' },
      { type: 'paragraph', content: 'The Ministry of Commerce cited resource conservation and environmental protection as reasons for the restrictions.' }
    ],
    excerpt: 'China imposes rare earth export quotas amid escalating tech tensions.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-022'],
    topicIds: ['topic-009'],
    personIds: ['person-025'],
    organizationIds: ['org-030'],
    locationIds: ['loc-006'],
    eventIds: ['event-018'],
    quotes: [
      {
        id: 'quote-040-01',
        speakerId: 'person-025',
        speakerType: 'person',
        text: 'These measures are necessary to protect our strategic resources and ensure sustainable development of critical materials.'
      },
      {
        id: 'quote-040-02',
        speakerId: 'org-030',
        speakerType: 'organization',
        text: 'China has a responsibility to conserve its rare earth resources for future generations while promoting environmental protection.'
      }
    ],
    activities: [
      {
        id: 'activity-040-01',
        actorId: 'org-030',
        actorType: 'organization',
        action: 'imposed',
        targetId: null,
        targetType: null,
        targetText: 'export quotas on rare earth materials for semiconductors'
      },
      {
        id: 'activity-040-02',
        actorId: 'person-025',
        actorType: 'person',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'new rare earth export restrictions'
      },
      {
        id: 'activity-040-03',
        actorId: 'org-030',
        actorType: 'organization',
        action: 'retaliated against',
        targetId: null,
        targetType: null,
        targetText: 'Western chip export controls'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.75 },
      'faction-002': { sentiment: -0.78 },
      'faction-004': { sentiment: 0.82 },
      'faction-015': { sentiment: -0.48 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-041',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.bloomberg.com/chip-industry-rare-earth-alarm',
    publishedDate: '2025-08-25T09:00:00Z',
    publisherId: 'pub-bloomberg',
    title: 'Chip Industry Sounds Alarm on Rare Earth Restrictions',
    author: 'Debby Wu',
    contentBlocks: [
      { type: 'paragraph', content: 'The semiconductor industry is warning that China\'s new rare earth export controls could disrupt production of advanced chips.' },
      { type: 'paragraph', content: 'Industry executives are calling for emergency stockpiling and development of alternative sources.' }
    ],
    excerpt: 'Chip industry warns of disruptions from China rare earth restrictions.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-022', 'sub-023'],
    topicIds: ['topic-009'],
    personIds: ['person-024'],
    organizationIds: ['org-005', 'org-006'],
    locationIds: ['loc-004'],
    eventIds: ['event-019'],
    quotes: [
      {
        id: 'quote-041-01',
        speakerId: 'person-024',
        speakerType: 'person',
        text: 'We are monitoring the situation closely and working with industry partners to assess the impact on critical supply chains.'
      },
      {
        id: 'quote-041-02',
        speakerId: 'org-006',
        speakerType: 'organization',
        text: 'Industry should begin emergency stockpiling and accelerate development of alternative rare earth sources.'
      }
    ],
    activities: [
      {
        id: 'activity-041-01',
        actorId: 'org-005',
        actorType: 'organization',
        action: 'warned about',
        targetId: null,
        targetType: null,
        targetText: 'disruptions from China rare earth export controls'
      },
      {
        id: 'activity-041-02',
        actorId: 'person-024',
        actorType: 'person',
        action: 'called for',
        targetId: null,
        targetType: null,
        targetText: 'emergency stockpiling of critical materials'
      },
      {
        id: 'activity-041-03',
        actorId: 'org-006',
        actorType: 'organization',
        action: 'urged',
        targetId: null,
        targetType: null,
        targetText: 'development of alternative rare earth sources'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: -0.65 },
      'faction-005': { sentiment: -0.58 },
      'faction-015': { sentiment: -0.48 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-042',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.eetimes.com/china-rare-earth-supply-chain-analysis',
    publishedDate: '2025-08-30T10:00:00Z',
    publisherId: 'pub-eetimes',
    title: 'Analysis: How China\'s Rare Earth Controls Reshape Chip Supply Chains',
    author: 'Ann Steffora Mutschler',
    contentBlocks: [
      { type: 'paragraph', content: 'China\'s rare earth export controls are forcing semiconductor companies to rethink their supply chains. Materials critical for chip production have limited alternative sources.' },
      { type: 'paragraph', content: 'Companies are exploring recycling programs and investments in non-Chinese mining operations.' }
    ],
    excerpt: 'Analysis of how China\'s rare earth controls are reshaping chip supply chains.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-023'],
    topicIds: ['topic-009'],
    personIds: [],
    organizationIds: [],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-003': { sentiment: -0.35 },
      'faction-015': { sentiment: -0.48 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-043',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.reuters.com/technology/intel-quarterly-loss',
    publishedDate: '2025-09-15T17:00:00Z',
    publisherId: 'pub-reuters',
    title: 'Intel Reports $1.6B Quarterly Loss, Stock Plunges',
    author: 'Jane Lee',
    contentBlocks: [
      { type: 'paragraph', content: 'Intel reported a $1.6 billion quarterly loss as its foundry business continues to struggle, sending shares down over 15% in after-hours trading.' },
      { type: 'paragraph', content: 'CEO Pat Gelsinger defended the company\'s turnaround strategy but acknowledged the path to profitability will take longer than expected.' }
    ],
    excerpt: 'Intel reports $1.6B quarterly loss, stock plunges 15%.',
    narrativeIds: ['narr-008'],
    themeIds: ['sub-018'],
    topicIds: ['topic-008'],
    personIds: ['person-020'],
    organizationIds: ['org-027'],
    locationIds: ['loc-012'],
    eventIds: ['event-020'],
    quotes: [
      {
        id: 'quote-043-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'While these results are disappointing, we remain confident in our long-term strategy. The path to profitability will take longer than we initially expected, but we are making progress.'
      }
    ],
    activities: [
      {
        id: 'activity-043-01',
        actorId: 'org-027',
        actorType: 'organization',
        action: 'reported',
        targetId: null,
        targetType: null,
        targetText: '$1.6 billion quarterly loss in foundry business'
      },
      {
        id: 'activity-043-02',
        actorId: 'person-020',
        actorType: 'person',
        action: 'defended',
        targetId: 'org-027',
        targetType: 'organization',
        targetText: 'turnaround strategy amid mounting losses'
      },
      {
        id: 'activity-043-03',
        actorId: 'org-027',
        actorType: 'organization',
        action: 'saw stock plunge',
        targetId: null,
        targetType: null,
        targetText: '15% in after-hours trading'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: -0.68 },
      'faction-006': { sentiment: 0.42 },
      'faction-008': { sentiment: 0.15 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-044',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.bloomberg.com/nvidia-earnings-ai-demand',
    publishedDate: '2025-09-20T16:00:00Z',
    publisherId: 'pub-bloomberg',
    title: 'Nvidia Crushes Earnings Expectations on AI Chip Demand',
    author: 'Ian King',
    contentBlocks: [
      { type: 'paragraph', content: 'Nvidia reported record quarterly revenue driven by insatiable demand for its AI chips, beating analyst expectations by a wide margin.' },
      { type: 'paragraph', content: 'CEO Jensen Huang said customers are waiting months for deliveries as AI applications continue to expand across industries.' }
    ],
    excerpt: 'Nvidia reports record revenue driven by AI chip demand.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-024'],
    topicIds: ['topic-010'],
    personIds: ['person-021'],
    organizationIds: ['org-028'],
    locationIds: ['loc-012'],
    eventIds: ['event-021'],
    quotes: [
      {
        id: 'quote-044-01',
        speakerId: 'person-021',
        speakerType: 'person',
        text: 'Demand for AI computing is insatiable. Our customers are transforming every industry, and they are waiting months for our products because the opportunity is so significant.'
      },
      {
        id: 'quote-044-02',
        speakerId: 'org-028',
        speakerType: 'organization',
        text: 'We are working around the clock to scale production and meet the unprecedented demand we are seeing across all customer segments.'
      }
    ],
    activities: [
      {
        id: 'activity-044-01',
        actorId: 'org-028',
        actorType: 'organization',
        action: 'reported',
        targetId: null,
        targetType: null,
        targetText: 'record quarterly revenue driven by AI chip demand'
      },
      {
        id: 'activity-044-02',
        actorId: 'person-021',
        actorType: 'person',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'earnings exceeding analyst expectations'
      },
      {
        id: 'activity-044-03',
        actorId: 'org-028',
        actorType: 'organization',
        action: 'expanded',
        targetId: null,
        targetType: null,
        targetText: 'AI chip production to meet surging demand'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: 0.85 },
      'faction-006': { sentiment: 0.72 },
      'faction-009': { sentiment: 0.22 },
      'faction-014': { sentiment: 0.55 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-045',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.wsj.com/tech/ai-chip-shortage-getting-worse',
    publishedDate: '2025-09-25T10:00:00Z',
    publisherId: 'pub-wsj',
    title: 'The AI Chip Shortage Is Getting Worse',
    author: 'Asa Fitch',
    contentBlocks: [
      { type: 'paragraph', content: 'The global shortage of AI chips is intensifying as demand from tech companies and enterprises far outpaces production capacity.' },
      { type: 'paragraph', content: 'Nvidia\'s H100 chips remain in short supply, with lead times exceeding six months for most customers.' }
    ],
    excerpt: 'AI chip shortage intensifies as demand outpaces production.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-024', 'sub-025'],
    topicIds: ['topic-010'],
    personIds: [],
    organizationIds: ['org-028'],
    locationIds: [],
    eventIds: [],
    quotes: [
      {
        id: 'quote-045-01',
        speakerId: 'org-028',
        speakerType: 'organization',
        text: 'We understand the urgency our customers feel. The AI transformation is happening faster than anyone anticipated, and supply chain constraints are a global challenge.'
      }
    ],
    activities: [
      {
        id: 'activity-045-01',
        actorId: 'org-028',
        actorType: 'organization',
        action: 'faces',
        targetId: null,
        targetType: null,
        targetText: 'intensifying global AI chip shortage'
      },
      {
        id: 'activity-045-02',
        actorId: 'org-028',
        actorType: 'organization',
        action: 'struggles to meet',
        targetId: null,
        targetType: null,
        targetText: 'demand with lead times exceeding six months'
      }
    ],
    factionMentions: {
      'faction-003': { sentiment: -0.38 },
      'faction-005': { sentiment: 0.55 },
      'faction-009': { sentiment: 0.22 },
      'faction-014': { sentiment: 0.55 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-046',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.semiengineering.com/sk-hynix-hbm-expansion',
    publishedDate: '2025-10-01T09:00:00Z',
    publisherId: 'pub-semiengi',
    title: 'SK Hynix Ramps HBM Production to Meet AI Demand',
    author: 'Ed Sperling',
    contentBlocks: [
      { type: 'paragraph', content: 'SK Hynix announced a major expansion of its High Bandwidth Memory production to meet surging demand from AI chip manufacturers.' },
      { type: 'paragraph', content: 'The company is investing $5 billion in new production lines to keep pace with Nvidia and AMD requirements.' }
    ],
    excerpt: 'SK Hynix expands HBM production for AI chip demand.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-024'],
    topicIds: ['topic-010'],
    personIds: ['person-023'],
    organizationIds: ['org-029'],
    locationIds: ['loc-011'],
    eventIds: ['event-022'],
    quotes: [
      {
        id: 'quote-046-01',
        speakerId: 'person-023',
        speakerType: 'person',
        text: 'High Bandwidth Memory is the critical enabler for AI computing. We are investing aggressively to ensure we can meet the needs of our partners at Nvidia and AMD.'
      },
      {
        id: 'quote-046-02',
        speakerId: 'org-029',
        speakerType: 'organization',
        text: 'Our $5 billion investment reflects our commitment to maintaining technology leadership in advanced memory solutions.'
      }
    ],
    activities: [
      {
        id: 'activity-046-01',
        actorId: 'org-029',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'major expansion of HBM production capacity'
      },
      {
        id: 'activity-046-02',
        actorId: 'person-023',
        actorType: 'person',
        action: 'committed',
        targetId: null,
        targetType: null,
        targetText: '$5 billion investment in new HBM production lines'
      },
      {
        id: 'activity-046-03',
        actorId: 'org-029',
        actorType: 'organization',
        action: 'supplies',
        targetId: null,
        targetType: null,
        targetText: 'HBM to Nvidia and AMD for AI chips'
      }
    ],
    factionMentions: {
      'faction-006': { sentiment: 0.78 },
      'faction-009': { sentiment: 0.22 },
      'faction-014': { sentiment: 0.55 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-047',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'http://www.xinhuanet.com/english/china-gallium-germanium-controls',
    publishedDate: '2025-10-15T08:00:00Z',
    publisherId: 'pub-xinhua',
    title: 'China Further Restricts Gallium and Germanium Exports',
    author: 'Xinhua Staff',
    contentBlocks: [
      { type: 'paragraph', content: 'China announced tighter export controls on gallium and germanium, critical materials for semiconductor production, effective immediately.' },
      { type: 'paragraph', content: 'The Ministry of Commerce said the measures are necessary to protect strategic resources and promote sustainable development.' }
    ],
    excerpt: 'China tightens gallium and germanium export controls.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-022'],
    topicIds: ['topic-009'],
    personIds: ['person-025'],
    organizationIds: ['org-030', 'org-009'],
    locationIds: ['loc-006'],
    eventIds: ['event-023'],
    quotes: [
      {
        id: 'quote-047-01',
        speakerId: 'person-025',
        speakerType: 'person',
        text: 'China must protect its strategic resources. These controls on gallium and germanium are necessary for sustainable development and national security.'
      },
      {
        id: 'quote-047-02',
        speakerId: 'org-030',
        speakerType: 'organization',
        text: 'We are taking measured steps to ensure responsible management of critical mineral resources essential for advanced technology.'
      }
    ],
    activities: [
      {
        id: 'activity-047-01',
        actorId: 'org-030',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'tighter export controls on gallium and germanium'
      },
      {
        id: 'activity-047-02',
        actorId: 'person-025',
        actorType: 'person',
        action: 'justified',
        targetId: null,
        targetType: null,
        targetText: 'restrictions citing resource conservation'
      },
      {
        id: 'activity-047-03',
        actorId: 'org-009',
        actorType: 'organization',
        action: 'approved',
        targetId: null,
        targetType: null,
        targetText: 'expanded critical materials export restrictions'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.82 },
      'faction-004': { sentiment: 0.85 },
      'faction-015': { sentiment: -0.48 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-048',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.bloomberg.com/us-firms-rare-earth-alternatives',
    publishedDate: '2025-10-20T11:00:00Z',
    publisherId: 'pub-bloomberg',
    title: 'US Firms Scramble for Rare Earth Alternatives',
    author: 'Eddie Spence',
    contentBlocks: [
      { type: 'paragraph', content: 'American semiconductor companies are scrambling to secure alternative sources of rare earth materials following China\'s export restrictions.' },
      { type: 'paragraph', content: 'Companies are exploring partnerships with Australian and Canadian mining operations and investing in recycling technology.' }
    ],
    excerpt: 'US chip firms seek rare earth alternatives amid China restrictions.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-023'],
    topicIds: ['topic-009'],
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-004'],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.52 },
      'faction-005': { sentiment: -0.48 },
      'faction-015': { sentiment: -0.48 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-049',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.ft.com/korea-us-chip-subsidy-tensions',
    publishedDate: '2025-10-25T14:00:00Z',
    publisherId: 'pub-ft',
    title: 'Korea-US Tensions Rise Over Chip Subsidies',
    author: 'Song Jung-a',
    contentBlocks: [
      { type: 'paragraph', content: 'Tensions between South Korea and the United States over semiconductor subsidies have reached a new high, complicating efforts to coordinate against China.' },
      { type: 'paragraph', content: 'Korean officials argue US objections undermine the alliance\'s stated goal of securing chip supply chains.' }
    ],
    excerpt: 'US-Korea chip subsidy dispute strains technology alliance.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-021'],
    personIds: [],
    organizationIds: ['org-005', 'org-032'],
    locationIds: ['loc-004', 'loc-011'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-049-01',
        speakerId: 'org-005',
        speakerType: 'organization',
        text: 'We remain committed to working with our allies, but we must ensure that subsidy programs do not undermine fair competition in global markets.'
      },
      {
        id: 'quote-049-02',
        speakerId: 'org-032',
        speakerType: 'organization',
        text: 'The US objections undermine our shared goal of securing semiconductor supply chains against potential disruptions from China.'
      }
    ],
    activities: [
      {
        id: 'activity-049-01',
        actorId: 'org-005',
        actorType: 'organization',
        action: 'escalated tensions with',
        targetId: 'org-032',
        targetType: 'organization',
        targetText: 'over semiconductor subsidies'
      },
      {
        id: 'activity-049-02',
        actorId: 'org-032',
        actorType: 'organization',
        action: 'criticized',
        targetId: 'org-005',
        targetType: 'organization',
        targetText: 'for undermining technology alliance coordination'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: -0.42 },
      'faction-006': { sentiment: -0.55 },
      'faction-010': { sentiment: -0.35 },
      'faction-012': { sentiment: -0.42 },
      'faction-016': { sentiment: 0.32 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-050',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.reuters.com/technology/asml-ceo-china-restrictions',
    publishedDate: '2025-11-05T10:00:00Z',
    publisherId: 'pub-reuters',
    title: 'ASML CEO: China Restrictions Will Persist for Years',
    author: 'Toby Sterling',
    contentBlocks: [
      { type: 'paragraph', content: 'ASML CEO Christophe Fouquet warned that restrictions on selling advanced chip-making equipment to China will likely persist for years.' },
      { type: 'paragraph', content: 'The Dutch company has seen its China sales decline significantly since export controls were expanded.' }
    ],
    excerpt: 'ASML CEO warns China chip equipment restrictions will last years.',
    narrativeIds: ['narr-002'],
    themeIds: ['sub-006'],
    personIds: ['person-028'],
    organizationIds: ['org-002'],
    locationIds: ['loc-003'],
    eventIds: ['event-024'],
    quotes: [
      {
        id: 'quote-050-01',
        speakerId: 'person-028',
        speakerType: 'person',
        text: 'We must be realistic. These restrictions on selling advanced equipment to China will likely persist for years, perhaps decades. This is the new normal for our industry.'
      },
      {
        id: 'quote-050-02',
        speakerId: 'org-002',
        speakerType: 'organization',
        text: 'While China was once our largest growth market, we are adapting our business strategy to focus on opportunities in other regions.'
      }
    ],
    activities: [
      {
        id: 'activity-050-01',
        actorId: 'person-028',
        actorType: 'person',
        action: 'warned',
        targetId: null,
        targetType: null,
        targetText: 'China equipment restrictions will persist for years'
      },
      {
        id: 'activity-050-02',
        actorId: 'org-002',
        actorType: 'organization',
        action: 'saw decline in',
        targetId: null,
        targetType: null,
        targetText: 'China sales due to export controls'
      },
      {
        id: 'activity-050-03',
        actorId: 'org-002',
        actorType: 'organization',
        action: 'adapted strategy to',
        targetId: null,
        targetType: null,
        targetText: 'reduced China market access'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.62 },
      'faction-006': { sentiment: -0.48 },
      'faction-007': { sentiment: -0.52 },
      'faction-013': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-051',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.eetimes.com/amd-ai-chip-nvidia-challenge',
    publishedDate: '2025-11-20T10:00:00Z',
    publisherId: 'pub-eetimes',
    title: 'AMD Launches New AI Chip to Challenge Nvidia Dominance',
    author: 'Rick Merritt',
    contentBlocks: [
      { type: 'paragraph', content: 'AMD unveiled its latest AI accelerator chip, positioning it as a cost-effective alternative to Nvidia\'s dominant H100 and upcoming B200.' },
      { type: 'paragraph', content: 'CEO Lisa Su said the new chip offers competitive performance at a lower price point, appealing to cost-conscious enterprise customers.' }
    ],
    excerpt: 'AMD unveils new AI chip to challenge Nvidia\'s market dominance.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-025'],
    topicIds: ['topic-010'],
    personIds: ['person-026'],
    organizationIds: ['org-031'],
    locationIds: ['loc-012'],
    eventIds: ['event-025'],
    quotes: [
      {
        id: 'quote-051-01',
        speakerId: 'person-026',
        speakerType: 'person',
        text: 'Our new MI400 accelerator delivers exceptional performance at a compelling price point. Customers want choice, and we are delivering a competitive alternative to Nvidia.'
      },
      {
        id: 'quote-051-02',
        speakerId: 'org-031',
        speakerType: 'organization',
        text: 'AMD is committed to democratizing AI computing by offering high-performance solutions that make AI accessible to more organizations.'
      }
    ],
    activities: [
      {
        id: 'activity-051-01',
        actorId: 'org-031',
        actorType: 'organization',
        action: 'unveiled',
        targetId: null,
        targetType: null,
        targetText: 'new AI accelerator chip to challenge Nvidia'
      },
      {
        id: 'activity-051-02',
        actorId: 'person-026',
        actorType: 'person',
        action: 'positioned',
        targetId: 'org-031',
        targetType: 'organization',
        targetText: 'as cost-effective Nvidia alternative'
      },
      {
        id: 'activity-051-03',
        actorId: 'org-031',
        actorType: 'organization',
        action: 'targeted',
        targetId: null,
        targetType: null,
        targetText: 'cost-conscious enterprise customers'
      }
    ],
    factionMentions: {
      'faction-003': { sentiment: 0.55 },
      'faction-005': { sentiment: 0.62 },
      'faction-009': { sentiment: 0.22 },
      'faction-014': { sentiment: 0.55 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-052',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.semiengineering.com/can-anyone-catch-nvidia',
    publishedDate: '2025-11-25T09:00:00Z',
    publisherId: 'pub-semiengi',
    title: 'Analysis: Can Anyone Catch Nvidia in AI Chips?',
    author: 'Ann Steffora Mutschler',
    contentBlocks: [
      { type: 'paragraph', content: 'With AMD, Intel, and a host of startups racing to challenge Nvidia\'s dominance in AI chips, analysts are debating whether any competitor can meaningfully close the gap.' },
      { type: 'paragraph', content: 'Nvidia\'s CUDA software ecosystem presents a formidable barrier to entry that hardware performance alone cannot overcome.' }
    ],
    excerpt: 'Analysis: Challenges facing Nvidia competitors in AI chip market.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-024', 'sub-025'],
    topicIds: ['topic-010'],
    personIds: [],
    organizationIds: ['org-028', 'org-031', 'org-027'],
    locationIds: [],
    eventIds: [],
    quotes: [
      {
        id: 'quote-052-01',
        speakerId: 'org-031',
        speakerType: 'organization',
        text: 'We believe there is room for multiple players in the AI chip market, and we are focused on delivering value to customers who need alternatives.'
      },
      {
        id: 'quote-052-02',
        speakerId: 'org-028',
        speakerType: 'organization',
        text: 'Our CUDA ecosystem represents years of investment and deep integration with the AI research community. Hardware alone cannot close that gap.'
      }
    ],
    activities: [
      {
        id: 'activity-052-01',
        actorId: 'org-031',
        actorType: 'organization',
        action: 'challenges',
        targetId: 'org-028',
        targetType: 'organization',
        targetText: 'dominance in AI chip market'
      },
      {
        id: 'activity-052-02',
        actorId: 'org-027',
        actorType: 'organization',
        action: 'competes with',
        targetId: 'org-028',
        targetType: 'organization',
        targetText: 'in AI accelerator market'
      },
      {
        id: 'activity-052-03',
        actorId: 'org-028',
        actorType: 'organization',
        action: 'maintains',
        targetId: null,
        targetType: null,
        targetText: 'market dominance through CUDA software ecosystem'
      }
    ],
    factionMentions: {
      'faction-003': { sentiment: 0.42 },
      'faction-009': { sentiment: 0.22 },
      'faction-014': { sentiment: 0.55 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-053',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.wsj.com/tech/intel-chips-act-funding',
    publishedDate: '2025-12-10T10:00:00Z',
    publisherId: 'pub-wsj',
    title: 'Intel Secures $8.5B in CHIPS Act Funding',
    author: 'Asa Fitch',
    contentBlocks: [
      { type: 'paragraph', content: 'Intel has secured $8.5 billion in CHIPS Act funding, providing a lifeline for its struggling US manufacturing ambitions.' },
      { type: 'paragraph', content: 'The funding will support construction of new fabs in Ohio and Arizona and research into next-generation chip technology.' }
    ],
    excerpt: 'Intel receives $8.5B CHIPS Act funding for US manufacturing.',
    narrativeIds: ['narr-008'],
    themeIds: ['sub-019'],
    topicIds: ['topic-008'],
    personIds: ['person-020'],
    organizationIds: ['org-027', 'org-005'],
    locationIds: ['loc-004'],
    eventIds: ['event-026'],
    quotes: [
      {
        id: 'quote-053-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'This funding is a vote of confidence in American manufacturing and Intel\'s central role in rebuilding domestic semiconductor production capacity.'
      },
      {
        id: 'quote-053-02',
        speakerId: 'org-005',
        speakerType: 'organization',
        text: 'Intel\'s investment in US manufacturing is critical to our national security and economic competitiveness. This funding will help ensure America leads in semiconductor technology.'
      }
    ],
    activities: [
      {
        id: 'activity-053-01',
        actorId: 'org-027',
        actorType: 'organization',
        action: 'secured',
        targetId: null,
        targetType: null,
        targetText: '$8.5 billion in CHIPS Act funding'
      },
      {
        id: 'activity-053-02',
        actorId: 'org-005',
        actorType: 'organization',
        action: 'awarded funding to',
        targetId: 'org-027',
        targetType: 'organization',
        targetText: 'for US semiconductor manufacturing'
      },
      {
        id: 'activity-053-03',
        actorId: 'person-020',
        actorType: 'person',
        action: 'announced plans for',
        targetId: null,
        targetType: null,
        targetText: 'new fabs in Ohio and Arizona'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.65 },
      'faction-005': { sentiment: 0.72 },
      'faction-008': { sentiment: 0.15 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-054',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.scmp.com/tech/china-semiconductor-progress-2025',
    publishedDate: '2025-12-20T09:00:00Z',
    publisherId: 'pub-scmp',
    title: 'Year in Review: China Semiconductor Progress Exceeds Expectations',
    author: 'Che Pan',
    contentBlocks: [
      { type: 'paragraph', content: 'China\'s domestic semiconductor industry made significant progress in 2025 despite expanded Western export controls, with SMIC and other firms advancing their technology.' },
      { type: 'paragraph', content: 'Industry watchers note that China has defied predictions of stagnation, though still lags behind leading-edge Western technology.' }
    ],
    excerpt: 'China semiconductor industry defies expectations in 2025.',
    narrativeIds: ['narr-001'],
    themeIds: ['sub-002'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-001', 'loc-006'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-054-01',
        speakerId: 'org-001',
        speakerType: 'organization',
        text: 'Despite the challenges posed by export controls, China\'s semiconductor industry has made remarkable progress through indigenous innovation and determination.'
      }
    ],
    activities: [
      {
        id: 'activity-054-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'advanced',
        targetId: null,
        targetType: null,
        targetText: 'technology despite Western export controls'
      },
      {
        id: 'activity-054-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'defied',
        targetId: null,
        targetType: null,
        targetText: 'predictions of stagnation in 2025'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.78 },
      'faction-003': { sentiment: 0.45 },
      'faction-011': { sentiment: 0.85 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-055',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.reuters.com/technology/us-korea-chip-wto',
    publishedDate: '2025-12-28T14:00:00Z',
    publisherId: 'pub-reuters',
    title: 'US-Korea Chip Subsidy Dispute Heads to WTO',
    author: 'David Lawder',
    contentBlocks: [
      { type: 'paragraph', content: 'The United States formally escalated its dispute with South Korea over semiconductor subsidies to a WTO panel.' },
      { type: 'paragraph', content: 'The move marks a significant escalation that could take years to resolve and further strains the technology alliance.' }
    ],
    excerpt: 'US escalates Korea chip subsidy dispute to WTO panel.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-021'],
    personIds: [],
    organizationIds: ['org-005', 'org-032'],
    locationIds: ['loc-004'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-055-01',
        speakerId: 'org-005',
        speakerType: 'organization',
        text: 'We have exhausted bilateral options and must now seek resolution through the WTO dispute mechanism to ensure fair treatment in global semiconductor markets.'
      },
      {
        id: 'quote-055-02',
        speakerId: 'org-032',
        speakerType: 'organization',
        text: 'We are disappointed by this escalation, which will take years to resolve and damages our partnership at a critical time for supply chain security.'
      }
    ],
    activities: [
      {
        id: 'activity-055-01',
        actorId: 'org-005',
        actorType: 'organization',
        action: 'escalated',
        targetId: 'org-032',
        targetType: 'organization',
        targetText: 'chip subsidy dispute to WTO panel'
      },
      {
        id: 'activity-055-02',
        actorId: 'org-032',
        actorType: 'organization',
        action: 'expressed disappointment over',
        targetId: 'org-005',
        targetType: 'organization',
        targetText: 'WTO escalation of subsidy dispute'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: -0.35 },
      'faction-006': { sentiment: -0.42 },
      'faction-010': { sentiment: -0.35 },
      'faction-012': { sentiment: -0.42 },
      'faction-016': { sentiment: 0.32 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-056',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.bloomberg.com/nvidia-ces-next-gen-ai-chip',
    publishedDate: '2026-01-05T09:00:00Z',
    publisherId: 'pub-bloomberg',
    title: 'Nvidia Announces Next-Gen AI Chip at CES',
    author: 'Ian King',
    contentBlocks: [
      { type: 'paragraph', content: 'Nvidia CEO Jensen Huang unveiled the company\'s next-generation AI chip at CES, promising significant performance improvements over current offerings.' },
      { type: 'paragraph', content: 'The announcement reinforced Nvidia\'s dominant position in the AI chip market as competitors struggle to catch up.' }
    ],
    excerpt: 'Nvidia unveils next-gen AI chip at CES, extending market lead.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-024'],
    topicIds: ['topic-010'],
    personIds: ['person-021'],
    organizationIds: ['org-028'],
    locationIds: ['loc-012'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-056-01',
        speakerId: 'person-021',
        speakerType: 'person',
        text: 'Today we unveil the most significant leap forward in AI computing. Our next-generation architecture will enable breakthroughs that seemed impossible just a year ago.'
      },
      {
        id: 'quote-056-02',
        speakerId: 'org-028',
        speakerType: 'organization',
        text: 'We are committed to maintaining our technology leadership and delivering the computing power the world needs to realize the full potential of AI.'
      }
    ],
    activities: [
      {
        id: 'activity-056-01',
        actorId: 'person-021',
        actorType: 'person',
        action: 'unveiled',
        targetId: null,
        targetType: null,
        targetText: 'next-generation AI chip at CES'
      },
      {
        id: 'activity-056-02',
        actorId: 'org-028',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'significant performance improvements in new AI chip'
      },
      {
        id: 'activity-056-03',
        actorId: 'org-028',
        actorType: 'organization',
        action: 'extended',
        targetId: null,
        targetType: null,
        targetText: 'market lead over competitors'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: 0.82 },
      'faction-006': { sentiment: 0.68 },
      'faction-009': { sentiment: 0.22 },
      'faction-014': { sentiment: 0.55 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-057',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.eetimes.com/intel-ceo-ces-turnaround',
    publishedDate: '2026-01-06T11:00:00Z',
    publisherId: 'pub-eetimes',
    title: 'Intel CEO Outlines Turnaround Strategy at CES',
    author: 'Rick Merritt',
    contentBlocks: [
      { type: 'paragraph', content: 'Intel CEO Pat Gelsinger outlined an updated turnaround strategy at CES, emphasizing the company\'s progress on process technology and new customer wins.' },
      { type: 'paragraph', content: 'Analysts remain skeptical, noting the company still faces significant execution challenges.' }
    ],
    excerpt: 'Intel CEO presents updated turnaround strategy at CES.',
    narrativeIds: ['narr-008'],
    themeIds: ['sub-019'],
    topicIds: ['topic-008'],
    personIds: ['person-020'],
    organizationIds: ['org-027'],
    locationIds: ['loc-012'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-057-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'Our process technology is catching up faster than the skeptics predicted. We have secured new foundry customers and are on track with our 18A node development.'
      },
      {
        id: 'quote-057-02',
        speakerId: 'org-027',
        speakerType: 'organization',
        text: 'Intel is committed to regaining process leadership. The investments we are making today will define the future of American semiconductor manufacturing.'
      }
    ],
    activities: [
      {
        id: 'activity-057-01',
        actorId: 'person-020',
        actorType: 'person',
        action: 'outlined',
        targetId: null,
        targetType: null,
        targetText: 'updated turnaround strategy at CES'
      },
      {
        id: 'activity-057-02',
        actorId: 'org-027',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'progress on process technology and new customer wins'
      },
      {
        id: 'activity-057-03',
        actorId: 'person-020',
        actorType: 'person',
        action: 'faced skepticism over',
        targetId: 'org-027',
        targetType: 'organization',
        targetText: 'execution challenges from analysts'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: 0.45 },
      'faction-008': { sentiment: 0.15 },
      'faction-009': { sentiment: 0.22 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-058',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.ft.com/china-rare-earth-limited-impact',
    publishedDate: '2026-01-08T10:00:00Z',
    publisherId: 'pub-ft',
    title: 'China Rare Earth Restrictions Show Limited Impact So Far',
    author: 'Demetri Sevastopulo',
    contentBlocks: [
      { type: 'paragraph', content: 'China\'s rare earth export restrictions have had limited impact on global semiconductor production so far, as companies have drawn on stockpiles and alternative sources.' },
      { type: 'paragraph', content: 'However, analysts warn that longer-term effects could be more severe if restrictions persist.' }
    ],
    excerpt: 'China rare earth restrictions show limited impact to date.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-023'],
    topicIds: ['topic-009'],
    personIds: [],
    organizationIds: [],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.35 },
      'faction-002': { sentiment: 0.42 },
      'faction-015': { sentiment: -0.48 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-059',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.reuters.com/technology/tsmc-q4-ai-demand',
    publishedDate: '2026-01-10T08:00:00Z',
    publisherId: 'pub-reuters',
    title: 'TSMC Reports Strong Q4 Driven by AI Chip Demand',
    author: 'Yimou Lee',
    contentBlocks: [
      { type: 'paragraph', content: 'TSMC reported strong fourth-quarter results driven by surging demand for AI chips, with revenue exceeding analyst expectations.' },
      { type: 'paragraph', content: 'The company raised its 2026 capital expenditure guidance to meet expected demand growth.' }
    ],
    excerpt: 'TSMC reports strong Q4 on AI chip demand, raises capex guidance.',
    narrativeIds: ['narr-007', 'narr-011'],
    themeIds: ['sub-016', 'sub-024'],
    topicIds: ['topic-010'],
    personIds: [],
    organizationIds: ['org-020'],
    locationIds: ['loc-010'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-059-01',
        speakerId: 'org-020',
        speakerType: 'organization',
        text: 'AI demand continues to drive unprecedented growth. We are raising our capital expenditure guidance to ensure we can meet customer needs in this critical technology transition.'
      }
    ],
    activities: [
      {
        id: 'activity-059-01',
        actorId: 'org-020',
        actorType: 'organization',
        action: 'reported',
        targetId: null,
        targetType: null,
        targetText: 'strong Q4 results driven by AI chip demand'
      },
      {
        id: 'activity-059-02',
        actorId: 'org-020',
        actorType: 'organization',
        action: 'raised',
        targetId: null,
        targetType: null,
        targetText: '2026 capital expenditure guidance'
      },
      {
        id: 'activity-059-03',
        actorId: 'org-020',
        actorType: 'organization',
        action: 'exceeded',
        targetId: null,
        targetType: null,
        targetText: 'analyst revenue expectations'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: 0.72 },
      'faction-006': { sentiment: 0.65 },
      'faction-007': { sentiment: -0.52 },
      'faction-009': { sentiment: 0.22 },
      'faction-014': { sentiment: 0.55 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-060',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.semiengineering.com/samsung-sk-hynix-hbm-alliance',
    publishedDate: '2026-01-12T10:00:00Z',
    publisherId: 'pub-semiengi',
    title: 'Samsung and SK Hynix Announce HBM Production Alliance',
    author: 'Ed Sperling',
    contentBlocks: [
      { type: 'paragraph', content: 'Samsung and SK Hynix announced a surprising alliance to coordinate HBM production, aiming to better meet surging AI chip demand.' },
      { type: 'paragraph', content: 'The agreement allows the Korean rivals to share capacity information and coordinate supply to major customers.' }
    ],
    excerpt: 'Korean rivals Samsung and SK Hynix form HBM production alliance.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-020'],
    topicIds: ['topic-010'],
    personIds: ['person-022', 'person-023'],
    organizationIds: ['org-014', 'org-029'],
    locationIds: ['loc-011'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-060-01',
        speakerId: 'person-022',
        speakerType: 'person',
        text: 'By coordinating production with SK Hynix, we can better serve our customers and ensure stable supply of critical HBM for the AI industry.'
      },
      {
        id: 'quote-060-02',
        speakerId: 'person-023',
        speakerType: 'person',
        text: 'This alliance demonstrates that Korean semiconductor companies can collaborate when the stakes are high enough. Together we will lead the HBM market.'
      },
      {
        id: 'quote-060-03',
        speakerId: 'org-014',
        speakerType: 'organization',
        text: 'The alliance allows us to share capacity information and coordinate supply to major customers without compromising our competitive positions.'
      }
    ],
    activities: [
      {
        id: 'activity-060-01',
        actorId: 'org-014',
        actorType: 'organization',
        action: 'announced alliance with',
        targetId: 'org-029',
        targetType: 'organization',
        targetText: 'to coordinate HBM production'
      },
      {
        id: 'activity-060-02',
        actorId: 'org-029',
        actorType: 'organization',
        action: 'partnered with',
        targetId: 'org-014',
        targetType: 'organization',
        targetText: 'rival Samsung for HBM coordination'
      },
      {
        id: 'activity-060-03',
        actorId: 'person-022',
        actorType: 'person',
        action: 'led',
        targetId: 'org-014',
        targetType: 'organization',
        targetText: 'in surprising alliance with competitor'
      },
      {
        id: 'activity-060-04',
        actorId: 'person-023',
        actorType: 'person',
        action: 'negotiated',
        targetId: 'org-029',
        targetType: 'organization',
        targetText: 'HBM production coordination agreement'
      }
    ],
    factionMentions: {
      'faction-006': { sentiment: 0.75 },
      'faction-010': { sentiment: -0.35 },
      'faction-012': { sentiment: -0.42 },
      'faction-016': { sentiment: 0.32 }
    },
    highlights: [],
    comments: []
  },
  // New social media documents (doc-061 to doc-070)
  {
    id: 'doc-061',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://reddit.com/r/hardware/comments/smic_analysis',
    publishedDate: '2025-07-08T15:00:00Z',
    publisherId: 'pub-reddit',
    title: 'Reddit: Technical analysis of SMIC 5nm yield rates',
    author: {
      username: 'u/semiconductor_eng',
      displayName: 'semiconductor_eng',
      avatarUrl: 'https://i.pravatar.cc/150?u=semiconductor_eng'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**Deep dive: SMIC 5nm yield analysis based on publicly available data**\n\nI\'ve been crunching numbers on SMIC\'s likely yield rates. Based on their quarterly reports and industry estimates:\n\n- DUV multi-patterning at 5nm likely yields 20-30%\n- Compare to TSMC EUV at 80%+\n- Cost per wafer is 3x higher\n\nThis is impressive engineering but not economically viable for high-volume production. Thoughts?' }
    ],
    excerpt: 'Reddit technical analysis of SMIC 5nm chip yield rates and economics.',
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001', 'sub-002'],
    personIds: ['person-001'],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    eventIds: [],
    factionMentions: {
      'faction-003': { sentiment: 0.45 },
      'faction-006': { sentiment: 0.35 }
    },
    metrics: { likes: 4850, comments: 892, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-062',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/chip_industry/status/asml_restrictions',
    publishedDate: '2025-08-15T10:30:00Z',
    publisherId: 'pub-x',
    title: 'X thread: Impact of expanded ASML restrictions',
    author: {
      username: '@chip_industry',
      displayName: 'Semiconductor Industry Watch',
      avatarUrl: 'https://i.pravatar.cc/150?u=chip_industry'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'BREAKING: Netherlands confirms expanded ASML export controls 🧵\n\n1/ Not just EUV anymore - advanced DUV systems also restricted\n2/ ASML estimates $2.5B annual revenue impact\n3/ China\'s domestic lithography efforts will accelerate\n4/ This could backfire spectacularly\n\nThe semiconductor cold war just escalated.' }
    ],
    excerpt: 'X thread analyzing expanded ASML lithography export restrictions to China.',
    narrativeIds: ['narr-002'],
    themeIds: ['sub-004', 'sub-005'],
    personIds: [],
    organizationIds: ['org-003', 'org-004'],
    locationIds: ['loc-003'],
    eventIds: [],
    factionMentions: {
      'faction-002': { sentiment: 0.55 },
      'faction-001': { sentiment: -0.62 }
    },
    metrics: { likes: 8920, comments: 1450, shares: 3200, platform: 'x' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-063',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://weibo.com/techwatch/bigfund_announcement',
    publishedDate: '2025-09-10T08:00:00Z',
    publisherId: 'pub-weibo',
    title: 'Weibo: Reaction to Big Fund III announcement',
    author: {
      username: '@科技观察者',
      displayName: 'Tech Observer China',
      avatarUrl: 'https://i.pravatar.cc/150?u=TechObserverChina'
    },
    contentBlocks: [
      { type: 'paragraph', content: '大基金三期340亿美元！这是国家对半导体产业最强有力的支持。西方封锁只会让我们更强大。自主创新是唯一出路。🇨🇳\n\n[Translation: Big Fund III $34B! This is the strongest national support for semiconductor industry. Western blockade will only make us stronger. Independent innovation is the only way forward.]' }
    ],
    excerpt: 'Weibo post celebrating Big Fund III semiconductor investment announcement.',
    narrativeIds: ['narr-003'],
    themeIds: ['sub-006', 'sub-007'],
    personIds: [],
    organizationIds: ['org-001', 'org-010'],
    locationIds: ['loc-001'],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.85 },
      'faction-004': { sentiment: 0.78 }
    },
    metrics: { likes: 125000, comments: 8500, shares: 32000, platform: 'weibo' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-064',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://tiktok.com/@tech_explained/video/chips_act',
    publishedDate: '2025-10-05T14:00:00Z',
    publisherId: 'pub-tiktok',
    title: 'TikTok: Explainer on CHIPS Act progress',
    author: {
      username: '@tech_explained',
      displayName: 'Tech Explained Simply',
      avatarUrl: 'https://i.pravatar.cc/150?u=tech_explained'
    },
    contentBlocks: [
      { type: 'paragraph', content: '$52 billion for chip factories but where are they?? 🤔 CHIPS Act explained #chips #technology #manufacturing #chipsact #techexplained', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 89
    },
    transcription: 'So the US gave fifty-two billion dollars to build chip factories here. But where are they? Let\'s look at what\'s actually happening with the CHIPS Act money and why it\'s taking so long. Spoiler: building fabs is HARD. Intel\'s getting billions but their Ohio factory is delayed. TSMC\'s Arizona plant? Also delayed. Samsung? You guessed it, delayed. Turns out you can\'t just throw money at a problem and expect it to solve itself overnight. These factories take years to build and we\'re competing with decades of Asian manufacturing expertise. The money is flowing but the chips? They\'re still a few years away.',
    excerpt: 'TikTok explainer on CHIPS Act implementation progress and challenges.',
    narrativeIds: ['narr-007'],
    themeIds: ['sub-013', 'sub-014'],
    personIds: [],
    organizationIds: ['org-005', 'org-006'],
    locationIds: ['loc-012'],
    eventIds: [],
    factionMentions: {
      'faction-006': { sentiment: 0.45 },
      'faction-003': { sentiment: 0.32 }
    },
    metrics: { views: 2800000, likes: 185000, shares: 72000, comments: 24000, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-065',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://reddit.com/r/stocks/comments/intel_struggles',
    publishedDate: '2025-10-20T18:00:00Z',
    publisherId: 'pub-reddit',
    title: 'Reddit: Discussion on Intel restructuring and layoffs',
    author: {
      username: 'u/chip_investor',
      displayName: 'chip_investor',
      avatarUrl: 'https://i.pravatar.cc/150?u=chip_investor'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**Intel announces 15,000 layoffs - what does this mean for US chip manufacturing?**\n\nIntel stock is down 25% this week after the restructuring announcement. As someone who\'s been long INTC for years, this is painful.\n\nBut the bigger question: can the US actually compete in advanced manufacturing without Intel? TSMC Arizona is struggling. Samsung Taylor is delayed.\n\nAre we putting all our eggs in a basket that might not work?' }
    ],
    excerpt: 'Reddit discussion on Intel layoffs and US semiconductor manufacturing viability.',
    narrativeIds: ['narr-008'],
    themeIds: ['sub-015', 'sub-016'],
    personIds: ['person-009'],
    organizationIds: ['org-006'],
    locationIds: ['loc-012'],
    eventIds: [],
    factionMentions: {
      'faction-006': { sentiment: -0.55 },
      'faction-003': { sentiment: 0.25 }
    },
    metrics: { likes: 6720, comments: 1850, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-066',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/supply_chain_analyst/status/huawei_stockpile',
    publishedDate: '2025-11-12T09:00:00Z',
    publisherId: 'pub-x',
    title: 'X thread: Investigation into Huawei equipment stockpiling',
    author: {
      username: '@supply_chain_analyst',
      displayName: 'Supply Chain Intelligence',
      avatarUrl: 'https://i.pravatar.cc/150?u=supply_chain_analyst'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'THREAD: Sources say Huawei has stockpiled billions in semiconductor equipment in Shenzhen warehouses 🧵\n\n1/ Equipment from ASML, Applied Materials, Lam Research\n2/ Purchased before restrictions took effect\n3/ US investigating potential sanctions circumvention\n4/ Huawei denies wrongdoing\n\nThis is the shadow supply chain everyone suspected.' }
    ],
    excerpt: 'X thread investigating reports of Huawei semiconductor equipment stockpiling.',
    narrativeIds: ['narr-004'],
    themeIds: ['sub-008', 'sub-009'],
    personIds: ['person-004'],
    organizationIds: ['org-002'],
    locationIds: ['loc-002'],
    eventIds: [],
    factionMentions: {
      'faction-002': { sentiment: 0.65 },
      'faction-001': { sentiment: -0.72 }
    },
    metrics: { likes: 12400, comments: 2850, shares: 5600, platform: 'x' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-067',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://weibo.com/huawei_fan/mate70_launch',
    publishedDate: '2025-12-08T12:00:00Z',
    publisherId: 'pub-weibo',
    title: 'Weibo: Consumer excitement over Huawei Mate 70 with domestic chip',
    author: {
      username: '@华为粉丝圈',
      displayName: 'Huawei Fan Community',
      avatarUrl: 'https://i.pravatar.cc/150?u=HuaweiFanCommunity'
    },
    contentBlocks: [
      { type: 'paragraph', content: '华为Mate 70发布！麒麟9100芯片，完全国产5nm工艺！西方说我们做不到，我们做到了！预购量已突破500万！这就是中国科技的力量！💪🇨🇳\n\n[Translation: Huawei Mate 70 released! Kirin 9100 chip, fully domestic 5nm process! The West said we couldn\'t do it, we did it! Pre-orders exceed 5 million! This is the power of Chinese technology!]' }
    ],
    excerpt: 'Weibo post celebrating Huawei Mate 70 launch with domestic 5nm chip.',
    narrativeIds: ['narr-001', 'narr-004'],
    themeIds: ['sub-001', 'sub-008'],
    personIds: [],
    organizationIds: ['org-002', 'org-001'],
    locationIds: ['loc-002'],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.92 },
      'faction-004': { sentiment: 0.85 }
    },
    metrics: { likes: 285000, comments: 42000, shares: 95000, platform: 'weibo' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-068',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://tiktok.com/@nvidia_stan/video/gpu_shortage',
    publishedDate: '2025-12-22T16:00:00Z',
    publisherId: 'pub-tiktok',
    title: 'TikTok: AI developer frustration with Nvidia GPU shortage',
    author: {
      username: '@nvidia_stan',
      displayName: 'AI Dev Life',
      avatarUrl: 'https://i.pravatar.cc/150?u=nvidia_stan'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Me waiting 6 months for my H100s while competitors got theirs last year 🤡 #ai #nvidia #gpu #startuplife #h100 #aidev', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 45
    },
    transcription: 'Me waiting six months for my H100 GPUs to arrive. Meanwhile my competitors got theirs last year. Nvidia please, I\'m begging. The shortage is killing startups. We can\'t train our models. We can\'t compete. The big players bought up all the inventory and the rest of us are left fighting over scraps. This is what the AI gold rush looks like for small companies. We have the ideas, we have the talent, but we don\'t have the hardware. And without hardware, we\'re dead in the water.',
    excerpt: 'TikTok expressing AI developer frustration with Nvidia GPU shortages.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-022', 'sub-023'],
    personIds: [],
    organizationIds: ['org-020'],
    locationIds: ['loc-012'],
    eventIds: [],
    factionMentions: {
      'faction-006': { sentiment: -0.45 },
      'faction-003': { sentiment: 0.35 }
    },
    metrics: { views: 3200000, likes: 245000, shares: 85000, comments: 32000, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-069',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://reddit.com/r/semiconductors/comments/ymtc_found',
    publishedDate: '2026-01-02T20:00:00Z',
    publisherId: 'pub-reddit',
    title: 'Reddit: Discussion of YMTC chips found in consumer devices',
    author: {
      username: 'u/teardown_specialist',
      displayName: 'teardown_specialist',
      avatarUrl: 'https://i.pravatar.cc/150?u=teardown_specialist'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**Found YMTC NAND in my new SSD despite Entity List status**\n\nDid a teardown of a new consumer SSD from a major brand. Found YMTC 232-layer NAND inside.\n\nHow is this possible when YMTC is on the Entity List? Supply chain laundering? Third-party intermediaries?\n\nPhotos in comments. This is a significant sanctions compliance issue.' }
    ],
    excerpt: 'Reddit post documenting YMTC chips found in consumer devices despite sanctions.',
    narrativeIds: ['narr-005'],
    themeIds: ['sub-010', 'sub-011'],
    personIds: [],
    organizationIds: ['org-011'],
    locationIds: [],
    eventIds: [],
    factionMentions: {
      'faction-002': { sentiment: 0.72 },
      'faction-003': { sentiment: 0.45 }
    },
    metrics: { likes: 8450, comments: 2120, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-070',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/korea_chip_news/status/subsidy_dispute',
    publishedDate: '2026-01-08T11:00:00Z',
    publisherId: 'pub-x',
    title: 'X post: Breaking news on US-Korea semiconductor subsidy dispute',
    author: {
      username: '@korea_chip_news',
      displayName: 'Korea Semiconductor News',
      avatarUrl: 'https://i.pravatar.cc/150?u=korea_chip_news'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'BREAKING: US files WTO complaint against Korea\'s $17B semiconductor subsidies 🇺🇸🇰🇷\n\nThis is awkward timing given:\n- US just gave billions in CHIPS Act subsidies\n- Korea is a key ally against China\n- Samsung/SK Hynix supply critical chips to US\n\nThe semiconductor alliance is showing cracks.' }
    ],
    excerpt: 'X post reporting US WTO complaint against Korean semiconductor subsidies.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-019', 'sub-020'],
    personIds: [],
    organizationIds: ['org-014', 'org-029'],
    locationIds: ['loc-011'],
    eventIds: [],
    factionMentions: {
      'faction-006': { sentiment: -0.55 },
      'faction-002': { sentiment: 0.35 }
    },
    metrics: { likes: 7850, comments: 1650, shares: 3200, platform: 'x' },
    highlights: [],
    comments: []
  },

  // ============================================
  // Structured Data - Corporate Records
  // ============================================
  {
    id: 'doc-071',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'SMIC - Hong Kong Stock Exchange Annual Filing',
    publishedDate: '2025-12-20T00:00:00Z',
    publisherId: 'pub-china-registry',
    excerpt: 'Annual corporate filing for Semiconductor Manufacturing International Corporation showing ownership and board composition.',
    personIds: ['person-001', 'person-002'],
    organizationIds: ['org-001', 'org-007', 'org-008'],
    locationIds: ['loc-002'],
    narrativeIds: ['narr-001'],
    eventIds: ['event-001'],
    factionMentions: {
      'faction-001': { sentiment: 0.7 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'HKEX',
      companyName: 'Semiconductor Manufacturing International Corporation',
      jurisdiction: 'Cayman Islands (HK Listed)',
      registrationNumber: 'HKEX-0981',
      incorporationDate: '2000-04-03',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: '18 Zhangjiang Road, Pudong, Shanghai, China 201203',
      beneficialOwners: ['China National IC Fund (11%)', 'Datang Telecom (17%)', 'Public Float (72%)'],
      directors: ['Zhao Haijun (Co-CEO)', 'Liang Mong Song (Co-CEO)', 'Gao Yonggang (CFO)'],
      flags: ['state_affiliated', 'export_controlled']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'SMIC annual filing shows continued state investment through China National IC Fund and Datang Telecom holdings. The company is subject to US export restrictions limiting access to advanced manufacturing equipment.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-072',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'ASML Holding N.V. - SEC 20-F Filing',
    publishedDate: '2026-01-10T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'Annual report for ASML showing revenue breakdown and export control compliance disclosures.',
    personIds: ['person-004', 'person-028'],
    organizationIds: ['org-002', 'org-004'],
    locationIds: ['loc-003', 'loc-005'],
    narrativeIds: ['narr-002'],
    eventIds: ['event-003', 'event-004'],
    factionMentions: {
      'faction-002': { sentiment: 0.5 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'ASML Holding N.V.',
      jurisdiction: 'Netherlands',
      registrationNumber: '0001164680',
      incorporationDate: '1984-01-01',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: 'De Run 6501, 5504 DR Veldhoven, Netherlands',
      beneficialOwners: ['Public Float (100%)'],
      directors: ['Christophe Fouquet (CEO)', 'Peter Wennink (Former CEO)'],
      flags: ['export_controlled', 'critical_technology']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'ASML 20-F filing discloses significant revenue impact from China export restrictions. The company has ceased EUV system sales to China and faces restrictions on DUV equipment servicing. China revenue declined 35% year-over-year.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-073',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Huawei Technologies - Corporate Structure Analysis',
    publishedDate: '2025-11-15T00:00:00Z',
    publisherId: 'pub-opencorp',
    excerpt: 'Analysis of Huawei ownership structure through employee shareholding scheme.',
    personIds: ['person-011', 'person-012'],
    organizationIds: ['org-010'],
    locationIds: ['loc-001'],
    narrativeIds: ['narr-004'],
    eventIds: ['event-002', 'event-008'],
    factionMentions: {
      'faction-001': { sentiment: 0.6 },
      'faction-004': { sentiment: 0.7 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'Corporate Intelligence',
      companyName: 'Huawei Technologies Co., Ltd.',
      jurisdiction: 'China',
      registrationNumber: 'CN-91440300708461136T',
      incorporationDate: '1987-09-15',
      status: 'active',
      entityType: 'private_enterprise',
      registeredAddress: 'Bantian, Longgang District, Shenzhen, Guangdong, China',
      beneficialOwners: ['Employee Shareholding (99%)', 'Ren Zhengfei (1%)'],
      directors: ['Ren Zhengfei (Founder)', 'Meng Wanzhou (CFO)', 'Guo Ping (Rotating Chairman)'],
      flags: ['sanctioned', 'export_controlled', 'entity_list']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Huawei remains on US Entity List, restricting access to American technology. The company\'s ownership structure through employee shareholding makes beneficial ownership analysis complex. Meng Wanzhou returned to CFO role after Canada detention resolution.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-074',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'YMTC - Yangtze Memory Technologies Filing',
    publishedDate: '2025-10-30T00:00:00Z',
    publisherId: 'pub-china-registry',
    excerpt: 'Corporate registration for YMTC showing state ownership and technology development status.',
    personIds: ['person-013'],
    organizationIds: ['org-013', 'org-007'],
    locationIds: ['loc-007'],
    narrativeIds: ['narr-005'],
    eventIds: ['event-010'],
    factionMentions: {
      'faction-001': { sentiment: 0.65 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'China State Administration for Market Regulation',
      companyName: 'Yangtze Memory Technologies Co., Ltd.',
      jurisdiction: 'China',
      registrationNumber: 'CN-91420100MA4KNXNG2F',
      incorporationDate: '2016-07-26',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: 'No. 88 Gaoxin 4th Road, Wuhan, Hubei, China',
      beneficialOwners: ['Tsinghua Unigroup (24%)', 'China National IC Fund (24%)', 'Hubei Province (38%)'],
      directors: ['Chen Nanxiang (CEO)'],
      flags: ['state_owned', 'entity_list', 'memory_chip']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'YMTC filing shows substantial state ownership through IC Fund and provincial government. The company achieved 232-layer NAND production, placing it near parity with global leaders despite export restrictions limiting equipment access.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-075',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Intel Corporation - CHIPS Act Recipient Filing',
    publishedDate: '2026-01-05T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'SEC filing detailing Intel CHIPS Act funding agreement and manufacturing commitments.',
    personIds: ['person-020'],
    organizationIds: ['org-027', 'org-005'],
    locationIds: ['loc-009', 'loc-012'],
    narrativeIds: ['narr-008'],
    eventIds: ['event-015', 'event-026'],
    factionMentions: {
      'faction-005': { sentiment: 0.6 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'Intel Corporation',
      jurisdiction: 'Delaware',
      registrationNumber: '0000050863',
      incorporationDate: '1968-07-18',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: '2200 Mission College Blvd, Santa Clara, CA 95054',
      beneficialOwners: ['Public Float (100%)'],
      directors: ['Pat Gelsinger (CEO)', 'Frank Yeary (Chairman)'],
      flags: ['chips_act_recipient', 'domestic_manufacturing']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Intel filing discloses $8.5B in CHIPS Act funding for domestic semiconductor manufacturing expansion. Commitments include new fabs in Arizona and Ohio. Filing notes restructuring challenges and competition from TSMC foundry services.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-076',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'TSMC - Taiwan Semiconductor Manufacturing Company',
    publishedDate: '2025-12-15T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'Annual filing for TSMC covering Arizona fab progress and geopolitical risk disclosures.',
    personIds: ['person-017', 'person-018'],
    organizationIds: ['org-020', 'org-033'],
    locationIds: ['loc-010', 'loc-009'],
    narrativeIds: ['narr-007'],
    eventIds: ['event-013'],
    factionMentions: {
      'faction-005': { sentiment: 0.5 },
      'faction-006': { sentiment: 0.4 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'Taiwan Semiconductor Manufacturing Company Limited',
      jurisdiction: 'Taiwan',
      registrationNumber: 'ADR 0000-1046179',
      incorporationDate: '1987-02-21',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: 'No. 8, Li-Hsin Rd. 6, Hsinchu Science Park, Hsinchu, Taiwan',
      beneficialOwners: ['Public Float (100%)'],
      directors: ['C.C. Wei (CEO)', 'Mark Liu (Chairman)'],
      flags: ['critical_supplier', 'geopolitical_risk']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'TSMC filing addresses Arizona fab construction delays and cost overruns. The company discloses geopolitical risks related to Taiwan Strait tensions and discusses customer concentration with Apple and Nvidia accounting for significant revenue share.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-077',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Nvidia Corporation - AI Chip Export Compliance',
    publishedDate: '2026-01-08T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'Nvidia quarterly filing addressing China export restrictions and AI chip demand.',
    personIds: ['person-021'],
    organizationIds: ['org-028', 'org-006'],
    locationIds: ['loc-012'],
    narrativeIds: ['narr-011'],
    eventIds: ['event-021'],
    factionMentions: {
      'faction-005': { sentiment: 0.7 },
      'faction-009': { sentiment: 0.4 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'Nvidia Corporation',
      jurisdiction: 'Delaware',
      registrationNumber: '0001045810',
      incorporationDate: '1993-01-01',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: '2788 San Tomas Expressway, Santa Clara, CA 95051',
      beneficialOwners: ['Public Float (100%)'],
      directors: ['Jensen Huang (CEO)', 'Mark Stevens'],
      flags: ['export_controlled', 'ai_technology']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Nvidia filing discloses development of China-specific chips compliant with export controls. The company reports record demand for AI training chips, with data center revenue exceeding gaming. China restrictions estimated to impact 10-15% of potential revenue.' }
    ],
    highlights: [],
    comments: []
  },

  // ============================================
  // Structured Data - Political Finance
  // ============================================
  {
    id: 'doc-078',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Semiconductor Industry Association - Lobbying Disclosure',
    publishedDate: '2026-01-10T00:00:00Z',
    publisherId: 'pub-bis',
    excerpt: 'SIA lobbying on CHIPS Act implementation and export control policy.',
    personIds: [],
    organizationIds: ['org-027', 'org-028', 'org-020'],
    locationIds: ['loc-004'],
    narrativeIds: ['narr-008'],
    eventIds: [],
    factionMentions: {
      'faction-005': { sentiment: 0.6 }
    },
    structuredData: {
      recordType: 'political_finance',
      source: 'Senate LDA',
      filingId: 'LDA-2025-Q4-SIA',
      filingType: 'lobbying_report',
      reportingPeriod: '2025-Q4',
      filer: 'Semiconductor Industry Association',
      client: 'SIA (self)',
      amount: 1850000,
      currency: 'USD',
      issuesLobbied: ['CHIPS Act Implementation', 'Export Controls', 'R&D Tax Credits'],
      agenciesLobbied: ['Commerce', 'BIS', 'Senate Commerce', 'House Science'],
      lobbyists: ['John Neuffer', 'Jimmy Goodrich'],
      flags: ['industry_association']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'SIA Q4 2025 lobbying focused on CHIPS Act implementation and export control calibration. The association advocated for clearer guidance on China restrictions while supporting domestic manufacturing incentives. Members include Intel, Nvidia, and other major US chipmakers.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-079',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Intel Corporation PAC - Q4 2025 Filing',
    publishedDate: '2026-01-08T00:00:00Z',
    publisherId: 'pub-bis',
    excerpt: 'Intel PAC contributions to legislators involved in semiconductor policy.',
    personIds: ['person-020'],
    organizationIds: ['org-027'],
    locationIds: ['loc-004'],
    narrativeIds: [],
    eventIds: [],
    factionMentions: {},
    structuredData: {
      recordType: 'political_finance',
      source: 'FEC',
      filingId: 'FEC-2025-Q4-INTC-PAC',
      filingType: 'pac_quarterly',
      reportingPeriod: '2025-Q4',
      filer: 'Intel Corporation PAC',
      amount: 425000,
      currency: 'USD',
      recipients: ['Senate Commerce Committee Members', 'House Science Committee Members'],
      issuesLobbied: [],
      flags: []
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Intel PAC contributed $425K to Congressional candidates in Q4 2025, focusing on members with oversight of semiconductor policy. Contributions were bipartisan, targeting legislators supportive of CHIPS Act funding.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-080',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'China-US Exchange Foundation - FARA Filing',
    publishedDate: '2025-12-15T00:00:00Z',
    publisherId: 'pub-mofcom',
    excerpt: 'FARA registration for organization promoting China-US business relations.',
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-004', 'loc-006'],
    narrativeIds: [],
    eventIds: [],
    factionMentions: {
      'faction-001': { sentiment: 0.3 }
    },
    structuredData: {
      recordType: 'political_finance',
      source: 'DOJ FARA',
      filingId: 'FARA-6825',
      filingType: 'fara_report',
      reportingPeriod: '2025-H2',
      filer: 'China-US Exchange Foundation',
      client: 'CUSEF (Hong Kong)',
      amount: 2400000,
      currency: 'USD',
      issuesLobbied: ['US-China Relations', 'Trade Policy', 'Technology Cooperation'],
      agenciesLobbied: ['State Department', 'Commerce', 'Congress'],
      lobbyists: [],
      flags: ['fara_registered', 'foreign_principal']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'CUSEF FARA filing shows $2.4M in activities promoting US-China business engagement. The organization funds exchange programs and policy dialogues, though activities have decreased amid bilateral tensions over technology restrictions.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-081',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'ASML US Government Affairs - Lobbying Disclosure',
    publishedDate: '2026-01-05T00:00:00Z',
    publisherId: 'pub-bis',
    excerpt: 'ASML lobbying on export control implementation affecting equipment sales.',
    personIds: [],
    organizationIds: ['org-002', 'org-004', 'org-006'],
    locationIds: ['loc-004'],
    narrativeIds: ['narr-002'],
    eventIds: [],
    factionMentions: {},
    structuredData: {
      recordType: 'political_finance',
      source: 'Senate LDA',
      filingId: 'LDA-2025-Q4-ASML',
      filingType: 'lobbying_report',
      reportingPeriod: '2025-Q4',
      filer: 'ASML US Inc.',
      client: 'ASML Holding N.V.',
      amount: 680000,
      currency: 'USD',
      issuesLobbied: ['Export Controls', 'Technology Transfer', 'Semiconductor Equipment'],
      agenciesLobbied: ['BIS', 'Commerce', 'State', 'Senate Banking'],
      lobbyists: ['David Camp', 'Lisa Curtis'],
      flags: ['foreign_company']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'ASML US lobbying focused on export control implementation and service restrictions. The company seeks clarity on maintenance and support provisions for existing China installations while complying with new EUV and DUV restrictions.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-082',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Samsung Electronics America - Lobbying Disclosure',
    publishedDate: '2025-12-20T00:00:00Z',
    publisherId: 'pub-bis',
    excerpt: 'Samsung lobbying on semiconductor subsidies and WTO trade disputes.',
    personIds: ['person-022'],
    organizationIds: ['org-014', 'org-032'],
    locationIds: ['loc-004', 'loc-011'],
    narrativeIds: ['narr-009'],
    eventIds: ['event-016', 'event-017'],
    factionMentions: {
      'faction-006': { sentiment: 0.4 }
    },
    structuredData: {
      recordType: 'political_finance',
      source: 'Senate LDA',
      filingId: 'LDA-2025-Q4-SAMSUNG',
      filingType: 'lobbying_report',
      reportingPeriod: '2025-Q4',
      filer: 'Samsung Electronics America',
      client: 'Samsung Electronics Co., Ltd.',
      amount: 920000,
      currency: 'USD',
      issuesLobbied: ['Semiconductor Subsidies', 'Trade Policy', 'WTO Compliance'],
      agenciesLobbied: ['USTR', 'Commerce', 'Senate Finance'],
      lobbyists: ['Marc Ostfield', 'Jennifer Park'],
      flags: ['foreign_company', 'us_manufacturing']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Samsung lobbying addressed US concerns over Korean semiconductor subsidies while advocating for Texas fab investment support. The company operates major manufacturing facilities in Austin and seeks CHIPS Act funding for expansion.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-083',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Information Technology Industry Council - China Tech Lobbying',
    publishedDate: '2026-01-12T00:00:00Z',
    publisherId: 'pub-bis',
    excerpt: 'ITI lobbying on technology trade policy and export control calibration.',
    personIds: [],
    organizationIds: ['org-027', 'org-028'],
    locationIds: ['loc-004'],
    narrativeIds: [],
    eventIds: [],
    factionMentions: {
      'faction-005': { sentiment: 0.5 }
    },
    structuredData: {
      recordType: 'political_finance',
      source: 'Senate LDA',
      filingId: 'LDA-2025-Q4-ITI',
      filingType: 'lobbying_report',
      reportingPeriod: '2025-Q4',
      filer: 'Information Technology Industry Council',
      client: 'ITI (self)',
      amount: 1200000,
      currency: 'USD',
      issuesLobbied: ['Export Controls', 'Technology Trade', 'AI Regulation', 'Data Privacy'],
      agenciesLobbied: ['BIS', 'Commerce', 'USTR', 'Senate Commerce', 'House Energy'],
      lobbyists: ['Jason Oxman', 'Courtney Lang'],
      flags: ['industry_association']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'ITI Q4 lobbying covered broad technology policy issues including export controls, AI regulation, and data privacy. The association represents major tech companies and advocates for calibrated China restrictions that maintain US competitiveness.' }
    ],
    highlights: [],
    comments: []
  },

  // ============================================
  // Structured Data - Event Attendance
  // ============================================
  {
    id: 'doc-084',
    documentType: 'event_attendance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'SMIC 5nm Announcement - Shenzhen Press Conference',
    publishedDate: '2026-01-16T00:00:00Z',
    publisherId: 'pub-analyst',
    excerpt: 'Attendance record for SMIC announcement of 5nm mass production achievement.',
    personIds: ['person-001', 'person-002'],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    eventIds: ['event-001'],
    narrativeIds: ['narr-001'],
    factionMentions: {
      'faction-001': { sentiment: 0.8 },
      'faction-004': { sentiment: 0.9 }
    },
    structuredData: {
      recordType: 'event_attendance',
      source: 'media_report',
      confidence: 'confirmed',
      eventName: 'SMIC 5nm Mass Production Announcement',
      eventDate: '2026-01-15',
      venue: 'SMIC Headquarters, Shenzhen',
      attendee: 'Zhao Haijun',
      role: 'speaker',
      representingOrg: 'SMIC',
      observedWith: ['Liang Mong Song - technical presentation', 'Chinese tech media - extensive coverage'],
      topics: ['5nm Achievement', 'DUV Multi-patterning', 'Technology Independence']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'SMIC Co-CEOs Zhao Haijun and Liang Mong Song jointly announced mass production of 5nm chips using DUV lithography. The press conference was heavily covered by Chinese state media as evidence of technology self-sufficiency despite US export controls.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-085',
    documentType: 'event_attendance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'ASML Earnings Call - Q4 2025',
    publishedDate: '2026-01-22T00:00:00Z',
    publisherId: 'pub-analyst',
    excerpt: 'Attendance record for ASML quarterly earnings call addressing China impact.',
    personIds: ['person-004', 'person-028'],
    organizationIds: ['org-002'],
    locationIds: ['loc-003'],
    eventIds: ['event-004'],
    narrativeIds: ['narr-002'],
    factionMentions: {
      'faction-006': { sentiment: 0.3 }
    },
    structuredData: {
      recordType: 'event_attendance',
      source: 'official_program',
      confidence: 'confirmed',
      eventName: 'ASML Q4 2025 Earnings Call',
      eventDate: '2026-01-20',
      venue: 'Virtual/Veldhoven Headquarters',
      attendee: 'Christophe Fouquet',
      role: 'speaker',
      representingOrg: 'ASML',
      observedWith: ['Analysts from major investment banks', 'Peter Wennink - transition remarks'],
      topics: ['China Revenue Impact', 'Export Control Compliance', 'Future Guidance']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'ASML Q4 earnings call featured new CEO Christophe Fouquet addressing investor concerns about China restrictions. Call included detailed Q&A on DUV service limitations and EUV backlog from non-China customers.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-086',
    documentType: 'event_attendance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Big Fund III Launch - Beijing Ceremony',
    publishedDate: '2025-10-28T00:00:00Z',
    publisherId: 'pub-analyst',
    excerpt: 'Attendance record for China\'s announcement of new semiconductor investment fund.',
    personIds: ['person-008', 'person-009', 'person-010'],
    organizationIds: ['org-007', 'org-009'],
    locationIds: ['loc-006'],
    eventIds: ['event-006', 'event-007'],
    narrativeIds: ['narr-003'],
    factionMentions: {
      'faction-001': { sentiment: 0.9 },
      'faction-004': { sentiment: 0.85 }
    },
    structuredData: {
      recordType: 'event_attendance',
      source: 'media_report',
      confidence: 'confirmed',
      eventName: 'Big Fund III Launch Ceremony',
      eventDate: '2025-10-25',
      venue: 'Great Hall of the People, Beijing',
      attendee: 'He Lifeng',
      role: 'keynote_speaker',
      representingOrg: 'State Council',
      observedWith: ['Liu He - policy remarks', 'Ding Wenwu - fund management', 'Semiconductor industry executives'],
      topics: ['$47B Investment', 'Technology Independence', 'Industry Support']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Big Fund III launch ceremony at Great Hall of the People featured senior State Council officials announcing $47B (340 billion yuan) semiconductor investment program. Event emphasized strategic importance of chip self-sufficiency.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-087',
    documentType: 'event_attendance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Huawei Mate 70 Launch - Shanghai',
    publishedDate: '2025-12-05T00:00:00Z',
    publisherId: 'pub-analyst',
    excerpt: 'Attendance record for Huawei smartphone launch featuring SMIC 5nm chip.',
    personIds: ['person-011', 'person-012'],
    organizationIds: ['org-010', 'org-001'],
    locationIds: ['loc-002'],
    eventIds: ['event-002'],
    narrativeIds: ['narr-001', 'narr-004'],
    factionMentions: {
      'faction-001': { sentiment: 0.85 },
      'faction-004': { sentiment: 0.9 }
    },
    structuredData: {
      recordType: 'event_attendance',
      source: 'media_report',
      confidence: 'confirmed',
      eventName: 'Huawei Mate 70 Series Global Launch',
      eventDate: '2025-12-01',
      venue: 'Shanghai Expo Center',
      attendee: 'Ren Zhengfei',
      role: 'keynote_speaker',
      representingOrg: 'Huawei',
      observedWith: ['Meng Wanzhou - financial outlook', 'Richard Yu - product presentation', 'Chinese tech press'],
      topics: ['Kirin 9100 Chip', 'SMIC Partnership', 'Technology Resilience']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Huawei Mate 70 launch confirmed SMIC-manufactured 5nm Kirin 9100 chip. Ren Zhengfei made rare public appearance emphasizing company\'s survival despite US sanctions. Event received extensive Chinese state media coverage.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-088',
    documentType: 'event_attendance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'TSMC Arizona Fab Update - Phoenix',
    publishedDate: '2025-11-20T00:00:00Z',
    publisherId: 'pub-analyst',
    excerpt: 'Attendance record for TSMC briefing on Arizona manufacturing facility progress.',
    personIds: ['person-017', 'person-018', 'person-005'],
    organizationIds: ['org-020', 'org-005'],
    locationIds: ['loc-009'],
    eventIds: ['event-013'],
    narrativeIds: ['narr-007'],
    factionMentions: {
      'faction-005': { sentiment: 0.4 }
    },
    structuredData: {
      recordType: 'event_attendance',
      source: 'media_report',
      confidence: 'confirmed',
      eventName: 'TSMC Arizona Fab Progress Briefing',
      eventDate: '2025-11-15',
      venue: 'TSMC Arizona Site, Phoenix',
      attendee: 'C.C. Wei',
      role: 'speaker',
      representingOrg: 'TSMC',
      observedWith: ['Mark Liu - strategic remarks', 'Gina Raimondo (video) - federal support', 'Arizona officials'],
      topics: ['Construction Delays', 'Workforce Challenges', 'Production Timeline']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'TSMC leadership briefed media on Arizona fab delays, citing workforce challenges and cost overruns. Commerce Secretary Raimondo joined via video to reaffirm federal support. Production start pushed to 2026.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-089',
    documentType: 'event_attendance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Intel Restructuring Announcement - Santa Clara',
    publishedDate: '2025-09-25T00:00:00Z',
    publisherId: 'pub-analyst',
    excerpt: 'Attendance record for Intel announcement of major restructuring and layoffs.',
    personIds: ['person-020'],
    organizationIds: ['org-027'],
    locationIds: ['loc-012'],
    eventIds: ['event-015', 'event-020'],
    narrativeIds: ['narr-008'],
    factionMentions: {
      'faction-005': { sentiment: -0.3 },
      'faction-009': { sentiment: -0.2 }
    },
    structuredData: {
      recordType: 'event_attendance',
      source: 'official_program',
      confidence: 'confirmed',
      eventName: 'Intel Strategic Update Announcement',
      eventDate: '2025-09-20',
      venue: 'Intel Headquarters, Santa Clara',
      attendee: 'Pat Gelsinger',
      role: 'keynote_speaker',
      representingOrg: 'Intel',
      observedWith: ['CFO David Zinsner - financial details', 'Board members', 'Analysts and media'],
      topics: ['Restructuring Plan', 'Layoffs', 'Foundry Strategy', 'CHIPS Act Funding']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Intel CEO Pat Gelsinger announced major restructuring including 15,000 layoffs and asset sales. The event addressed Intel\'s competitive challenges against TSMC and AMD while reaffirming foundry strategy and CHIPS Act commitments.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-090',
    documentType: 'event_attendance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Nvidia AI Chip Demand Briefing - GTC 2025',
    publishedDate: '2025-11-10T00:00:00Z',
    publisherId: 'pub-analyst',
    excerpt: 'Attendance record for Nvidia presentation on AI chip demand and supply constraints.',
    personIds: ['person-021'],
    organizationIds: ['org-028'],
    locationIds: ['loc-012'],
    eventIds: ['event-021'],
    narrativeIds: ['narr-011'],
    factionMentions: {
      'faction-005': { sentiment: 0.8 },
      'faction-009': { sentiment: 0.6 }
    },
    structuredData: {
      recordType: 'event_attendance',
      source: 'official_program',
      confidence: 'confirmed',
      eventName: 'Nvidia GTC 2025 Keynote',
      eventDate: '2025-11-05',
      venue: 'San Jose Convention Center',
      attendee: 'Jensen Huang',
      role: 'keynote_speaker',
      representingOrg: 'Nvidia',
      observedWith: ['Major cloud providers - demand presentations', 'AI researchers', 'Investors and analysts'],
      topics: ['AI Chip Demand', 'Blackwell Architecture', 'China-Compliant Products', 'Supply Constraints']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Jensen Huang\'s GTC keynote highlighted unprecedented AI chip demand outstripping supply. Presentation included new Blackwell architecture details and discussion of China-compliant products designed to meet export control requirements.' }
    ],
    highlights: [],
    comments: []
  }
];
