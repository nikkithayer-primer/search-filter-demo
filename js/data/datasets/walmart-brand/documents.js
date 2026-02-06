/**
 * Documents for Walmart Brand dataset
 * Includes news articles, social posts, and internal documents
 */

export const documents = [
  // Self-checkout narrative documents
  {
    id: 'doc-001',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    tagIds: ['tag-002'],
    title: 'TikTok: Customer detained at Walmart self-checkout',
    excerpt: 'Viral TikTok video showing a customer being detained by Walmart loss prevention after an honest self-checkout mistake. Video has over 8 million views.',
    url: 'https://tiktok.com/@shopper12345/video/example',
    publisherId: 'pub-tiktok',
    publishedDate: '2026-01-14T15:30:00Z',
    author: {
      username: '@shopper12345',
      displayName: 'Just Another Shopper',
      avatarUrl: 'https://i.pravatar.cc/150?u=shopper12345'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'POV: Walmart detains you even though you have your receipt 😭 This is so humiliating #walmart #selfcheckout #storytime #embarrassing #retail', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 45
    },
    transcription: 'I literally had my receipt, I paid for everything, and they still stopped me and made me wait while they checked every item in my bag. This is so humiliating. The lady was looking at me like I was a criminal. I shop here every week! I spent $200 today and this is how they treat me?',
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001'],
    topicIds: ['topic-001'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-002'],
    eventIds: ['event-001'],
    factionIds: ['faction-001', 'faction-004'],
    quotes: [],
    activities: [
      {
        id: 'activity-001-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'detained',
        targetId: null,
        targetType: null,
        targetText: 'customer despite having receipt'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.85 },
      'faction-004': { sentiment: -0.72 },
      'faction-014': { sentiment: -0.65 }
    },
    metrics: { views: 8500000, likes: 425000, shares: 185000, comments: 78000, platform: 'tiktok' },
    highlights: [
      {
        id: 'highlight-001',
        userId: 'user-001',
        blockIndex: 0,
        startOffset: 18,
        endOffset: 95,
        highlightedText: 'I literally had my receipt, I paid for everything, and they still stopped me',
        createdAt: '2026-01-14T18:30:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-001',
        userId: 'user-001',
        blockIndex: 0,
        anchorStartOffset: 18,
        anchorEndOffset: 95,
        anchorText: 'I literally had my receipt, I paid for everything, and they still stopped me',
        content: 'This matches the pattern we\'re seeing in other viral posts. The "paid but detained" narrative is resonating strongly.',
        createdAt: '2026-01-14T18:35:00Z',
        replies: [
          {
            id: 'reply-001',
            userId: 'user-002',
            content: 'Yes, and the hashtag usage is consistent with coordinated amplification patterns.',
            createdAt: '2026-01-14T19:00:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-002',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Reddit thread: Walmart self-checkout experiences',
    excerpt: 'Popular Reddit thread with thousands of comments about negative self-checkout experiences at Walmart.',
    url: 'https://reddit.com/r/walmart/comments/example',
    publisherId: 'pub-reddit',
    publishedDate: '2026-01-15T10:00:00Z',
    author: {
      username: 'u/annoyed_customer_2026',
      displayName: 'annoyed_customer_2026',
      avatarUrl: 'https://i.pravatar.cc/150?u=annoyed_customer_2026'
    },
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/49',
      caption: 'Reddit discussion thread screenshot'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Thread: "Anyone else feel like a criminal using Walmart self-checkout?"', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Top comment: "Got stopped twice last month even though I scanned everything. The receipt checkers treat you like a thief."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001'],
    topicIds: ['topic-001'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    factionIds: ['faction-001', 'faction-004'],
    quotes: [],
    activities: [
      {
        id: 'activity-002-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'treated customers as',
        targetId: null,
        targetType: null,
        targetText: 'suspected thieves at self-checkout'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.78 },
      'faction-004': { sentiment: -0.65 },
      'faction-014': { sentiment: -0.65 }
    },
    metrics: { likes: 15420, comments: 2850, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-003',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-002'],
    title: 'Class-Action Lawsuit Filed Against Walmart Over Self-Checkout Detentions',
    excerpt: 'Texas law firm files class-action lawsuit alleging Walmart systematically detains innocent customers at self-checkout.',
    url: 'https://reuters.com/legal/example',
    publisherId: 'pub-reuters',
    publishedDate: '2026-01-18T10:00:00Z',
    author: 'Karen Sloan',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/50',
      caption: 'Walmart self-checkout area'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'A class-action lawsuit was filed Monday in the Southern District of Texas alleging Walmart has engaged in a pattern of false imprisonment and unlawful detention of customers at self-checkout stations.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Lead attorney Thomas Merton of Merton & Associates claims the lawsuit represents over 500 plaintiffs who were stopped, searched, and detained despite having valid receipts for all purchased items.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"Walmart\'s loss prevention policies have created a culture of suspicion toward innocent customers," Merton said in a statement. "Our clients were humiliated and traumatized by these experiences."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-002'],
    topicIds: ['topic-001'],
    personIds: ['person-008'],
    organizationIds: ['org-001', 'org-002'],
    locationIds: ['loc-002'],
    eventIds: ['event-002'],
    factionIds: ['faction-001', 'faction-004'],
    quotes: [
      {
        id: 'quote-003-01',
        speakerId: 'person-008',
        speakerType: 'person',
        text: 'Walmart\'s loss prevention policies have created a culture of suspicion toward innocent customers. Our clients were humiliated and traumatized by these experiences.'
      }
    ],
    activities: [
      {
        id: 'activity-003-01',
        actorId: 'org-002',
        actorType: 'organization',
        action: 'filed class-action lawsuit against',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'Walmart over self-checkout detentions'
      },
      {
        id: 'activity-003-02',
        actorId: 'person-008',
        actorType: 'person',
        action: 'accused',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'Walmart of false imprisonment'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.68 },
      'faction-004': { sentiment: -0.55 },
      'faction-014': { sentiment: -0.65 }
    },
    metrics: { shares: 12500 },
    highlights: [
      {
        id: 'highlight-002',
        userId: 'user-002',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 85,
        highlightedText: 'Lead attorney Thomas Merton of Merton & Associates claims the lawsuit represents over 500',
        createdAt: '2026-01-18T12:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-002',
        userId: 'user-002',
        blockIndex: 1,
        anchorStartOffset: 0,
        anchorEndOffset: 85,
        anchorText: 'Lead attorney Thomas Merton of Merton & Associates claims the lawsuit represents over 500',
        content: 'This is a significant escalation. Legal action could have material impact on Walmart\'s policies.',
        createdAt: '2026-01-18T12:15:00Z',
        replies: []
      }
    ]
  },
  {
    id: 'doc-004',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Walmart Announces Plan to Add Staffed Checkout Lanes at 500 Stores',
    excerpt: 'In response to customer complaints, Walmart announces plans to increase staffed checkout options.',
    url: 'https://retaildive.com/news/example',
    publisherId: 'pub-retaildive',
    publishedDate: '2026-01-19T14:00:00Z',
    author: 'Ben Unglesbee',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/51',
      caption: 'Walmart checkout lanes'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart announced Friday it will add additional staffed checkout lanes at approximately 500 stores nationwide, responding to months of customer complaints about self-checkout experiences.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'CEO Doug McMillon said in a statement, "We\'ve heard our customers and are committed to providing checkout options that meet their preferences."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The move comes amid increasing social media backlash and a recent class-action lawsuit alleging improper detention of customers at self-checkout stations.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-003'],
    topicIds: ['topic-001'],
    personIds: ['person-001', 'person-002'],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    eventIds: ['event-003'],
    factionIds: ['faction-001', 'faction-004'],
    quotes: [
      {
        id: 'quote-004-01',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'We\'ve heard our customers and are committed to providing checkout options that meet their preferences.'
      }
    ],
    activities: [
      {
        id: 'activity-004-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'plan to add staffed checkout lanes at 500 stores'
      },
      {
        id: 'activity-004-02',
        actorId: 'person-001',
        actorType: 'person',
        action: 'responded to',
        targetId: null,
        targetType: null,
        targetText: 'customer complaints about self-checkout'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.25 },
      'faction-004': { sentiment: 0.15 },
      'faction-014': { sentiment: -0.65 }
    },
    metrics: { shares: 5800 },
    highlights: [],
    comments: []
  },

  // Empty shelves narrative documents
  {
    id: 'doc-005',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'X post: Photos of empty Walmart grocery aisles',
    excerpt: 'Viral X post showing photos of completely empty grocery aisles at a Chicago-area Walmart.',
    url: 'https://x.com/frustratedshopper/status/example',
    publisherId: 'pub-x',
    publishedDate: '2026-01-15T12:00:00Z',
    author: {
      username: '@frustratedshopper',
      displayName: 'Frustrated Shopper',
      avatarUrl: 'https://i.pravatar.cc/150?u=frustratedshopper'
    },
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/52',
      caption: 'Empty grocery shelves at Walmart'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Tried to do my weekly shopping at Walmart. This is what I found. No bread, no milk, barely any produce. This is ridiculous. Had to drive to three stores to get what I needed. #walmartfail', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '[4 photos attached showing empty aisles]', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-002'],
    themeIds: ['sub-004'],
    topicIds: ['topic-002'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-004'],
    eventIds: ['event-004'],
    factionIds: ['faction-001'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.82 },
      'faction-011': { sentiment: -0.72 }
    },
    metrics: { views: 2500000, likes: 45000, shares: 18500, comments: 8200, platform: 'x' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-006',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Facebook group discussion: Walmart inventory problems',
    excerpt: 'Discussion in local community Facebook group about ongoing inventory issues at nearby Walmart.',
    url: 'https://facebook.com/groups/example/posts/12345',
    publisherId: 'pub-facebook',
    publishedDate: '2026-01-16T09:00:00Z',
    author: {
      username: 'concerned.neighbor.42',
      displayName: 'Local Mom',
      avatarUrl: 'https://i.pravatar.cc/150?u=concerned.neighbor.42'
    },
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/53',
      caption: 'Facebook community discussion'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Has anyone else noticed the Walmart on Main St. has been half empty for weeks? I can never find basic stuff anymore. Starting to wonder if we should just switch to Target.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-002'],
    themeIds: ['sub-004'],
    topicIds: ['topic-002'],
    personIds: [],
    organizationIds: ['org-001', 'org-003'],
    locationIds: [],
    eventIds: [],
    factionIds: ['faction-001'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.68 },
      'faction-011': { sentiment: -0.72 }
    },
    metrics: { likes: 458, comments: 127, shares: 35, platform: 'facebook' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-007',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Analysis: Walmart\'s Inventory Management System Shows Cracks',
    excerpt: 'Retail Dive analysis examines why Walmart stores are experiencing persistent out-of-stock issues.',
    url: 'https://retaildive.com/news/walmart-inventory-analysis',
    publisherId: 'pub-retaildive',
    publishedDate: '2026-01-17T09:00:00Z',
    author: 'Daphne Howland',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/54',
      caption: 'Walmart distribution center'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart\'s vaunted inventory management system may need a significant overhaul, according to retail analysts who have been tracking persistent out-of-stock reports across the chain.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Oliver Chen of TD Cowen notes that "Walmart\'s real-time inventory visibility appears to have gaps that competitors have addressed more effectively."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The issues appear to be concentrated in grocery and household essentials—categories where Amazon and Target have made significant logistics investments.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-002'],
    themeIds: ['sub-005'],
    topicIds: ['topic-002'],
    personIds: ['person-010'],
    organizationIds: ['org-001', 'org-014', 'org-015'],
    locationIds: [],
    eventIds: ['event-005'],
    factionIds: ['faction-001', 'faction-005'],
    quotes: [
      {
        id: 'quote-007-01',
        speakerId: 'person-010',
        speakerType: 'person',
        text: 'Walmart\'s real-time inventory visibility appears to have gaps that competitors have addressed more effectively.'
      }
    ],
    activities: [
      {
        id: 'activity-007-01',
        actorId: 'person-010',
        actorType: 'person',
        action: 'analyzed',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'Walmart\'s inventory management system'
      },
      {
        id: 'activity-007-02',
        actorId: 'org-014',
        actorType: 'organization',
        action: 'published research on',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'persistent out-of-stock issues'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.58 },
      'faction-005': { sentiment: -0.42 },
      'faction-011': { sentiment: -0.72 }
    },
    metrics: { shares: 3200 },
    highlights: [
      {
        id: 'highlight-003',
        userId: 'user-003',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 147,
        highlightedText: 'Oliver Chen of TD Cowen notes that "Walmart\'s real-time inventory visibility appears to have gaps that competitors have addressed more effectively."',
        createdAt: '2026-01-17T11:00:00Z'
      }
    ],
    comments: []
  },

  // Worker conditions narrative documents
  {
    id: 'doc-008',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    tagIds: ['tag-001'],
    title: 'TikTok: Walmart employee shows empty department',
    excerpt: 'Employee TikTok showing them working alone in a department meant for 4+ workers.',
    url: 'https://tiktok.com/@walmartworkerlife/video/example',
    publisherId: 'pub-tiktok',
    publishedDate: '2026-01-13T18:00:00Z',
    author: {
      username: '@walmartworkerlife',
      displayName: 'Walmart Worker Life',
      avatarUrl: 'https://i.pravatar.cc/150?u=walmartworkerlife'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'When you\'re the only one working 3 departments 🤡 "fully staffed" they said #walmartlife #retailworker #understaffed #worklife #retail', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 62
    },
    transcription: 'Welcome to my shift! I\'m the only one in electronics, toys, AND sporting goods tonight. There should be four of us. But sure, we\'re "fully staffed." Look at this - empty aisles, customers waiting, and I\'m running back and forth trying to help everyone. This is every night now.',
    narrativeIds: ['narr-003'],
    themeIds: ['sub-006'],
    topicIds: ['topic-003'],
    personIds: ['person-005'],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: ['event-006'],
    factionIds: ['faction-002', 'faction-003'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.85 },
      'faction-003': { sentiment: -0.78 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    metrics: { views: 5200000, likes: 385000, shares: 125000, comments: 42000, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-009',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Reddit: Current Walmart employees share staffing concerns',
    excerpt: 'Reddit thread where current Walmart employees discuss understaffing challenges.',
    url: 'https://reddit.com/r/walmart/comments/staffing',
    publisherId: 'pub-reddit',
    publishedDate: '2026-01-14T14:00:00Z',
    author: {
      username: 'u/walmart_associate_tired',
      displayName: 'walmart_associate_tired',
      avatarUrl: 'https://i.pravatar.cc/150?u=walmart_associate_tired'
    },
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/55',
      caption: 'Reddit employee discussion'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Thread: "Is every store this understaffed or just mine?"', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Hundreds of comments confirm similar experiences. Top reply: "We have 6 call-outs every day and management won\'t hire anyone new. Meanwhile they cut hours for the rest of us."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-006'],
    topicIds: ['topic-003'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    factionIds: ['faction-002', 'faction-003'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.80 },
      'faction-003': { sentiment: -0.75 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    metrics: { likes: 8750, comments: 1420, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-010',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-002'],
    title: 'UFCW Launches #RespectWalmartWorkers Campaign',
    excerpt: 'United Food and Commercial Workers union announces new campaign highlighting worker conditions at Walmart.',
    url: 'https://bloomberg.com/news/example',
    publisherId: 'pub-bloomberg',
    publishedDate: '2026-01-15T11:00:00Z',
    author: 'Matthew Boyle',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/56',
      caption: 'UFCW campaign launch event'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'The United Food and Commercial Workers International Union (UFCW) launched a new social media campaign today called #RespectWalmartWorkers, amplifying employee stories about understaffing, scheduling issues, and working conditions.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'UFCW President Marc Perrone stated, "These workers deserve better. They kept this country running during the pandemic and now they\'re being stretched thinner than ever."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The campaign includes video testimonials from current and former employees across multiple states.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-007'],
    topicIds: ['topic-003'],
    personIds: ['person-003', 'person-004'],
    organizationIds: ['org-001', 'org-005', 'org-006'],
    locationIds: ['loc-006'],
    eventIds: ['event-007'],
    factionIds: ['faction-002', 'faction-003'],
    quotes: [
      {
        id: 'quote-010-01',
        speakerId: 'person-003',
        speakerType: 'person',
        text: 'These workers deserve better. They kept this country running during the pandemic and now they\'re being stretched thinner than ever.'
      }
    ],
    activities: [
      {
        id: 'activity-010-01',
        actorId: 'org-005',
        actorType: 'organization',
        action: 'launched',
        targetId: null,
        targetType: null,
        targetText: '#RespectWalmartWorkers social media campaign'
      },
      {
        id: 'activity-010-02',
        actorId: 'person-003',
        actorType: 'person',
        action: 'criticized',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'working conditions at Walmart'
      },
      {
        id: 'activity-010-03',
        actorId: 'org-006',
        actorType: 'organization',
        action: 'amplified',
        targetId: null,
        targetType: null,
        targetText: 'employee stories about understaffing and scheduling issues'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.72 },
      'faction-003': { sentiment: 0.68 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    metrics: { shares: 4500 },
    highlights: [
      {
        id: 'highlight-004',
        userId: 'user-001',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 168,
        highlightedText: 'UFCW President Marc Perrone stated, "These workers deserve better. They kept this country running during the pandemic and now they\'re being stretched thinner than ever."',
        createdAt: '2026-01-15T13:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-003',
        userId: 'user-001',
        blockIndex: 1,
        anchorStartOffset: 0,
        anchorEndOffset: 168,
        anchorText: 'UFCW President Marc Perrone stated, "These workers deserve better. They kept this country running during the pandemic and now they\'re being stretched thinner than ever."',
        content: 'Strong messaging from UFCW. This connects current complaints to pandemic-era goodwill effectively.',
        createdAt: '2026-01-15T13:15:00Z',
        replies: []
      }
    ]
  },
  {
    id: 'doc-011',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Walmart Responds to Worker Complaints, Highlights Benefits',
    excerpt: 'Walmart corporate issues statement responding to viral worker complaints.',
    url: 'https://wsj.com/articles/example',
    publisherId: 'pub-wsj',
    publishedDate: '2026-01-17T06:00:00Z',
    author: 'Sarah Nassauer',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/57',
      caption: 'Walmart corporate headquarters'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart pushed back against viral social media posts depicting poor working conditions, issuing a statement highlighting its $14 minimum starting wage, healthcare benefits, and tuition assistance program.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"We employ 1.6 million Americans and are committed to providing good jobs with opportunity for growth," a company spokesperson said.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The company noted that associate satisfaction scores have improved year-over-year, though critics questioned the methodology of internal surveys.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-008'],
    topicIds: ['topic-003'],
    personIds: ['person-001'],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    eventIds: [],
    factionIds: ['faction-002', 'faction-005'],
    quotes: [
      {
        id: 'quote-011-01',
        speakerId: 'org-001',
        speakerType: 'organization',
        text: 'We employ 1.6 million Americans and are committed to providing good jobs with opportunity for growth.'
      }
    ],
    activities: [
      {
        id: 'activity-011-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'responded to',
        targetId: null,
        targetType: null,
        targetText: 'viral social media posts depicting poor working conditions'
      },
      {
        id: 'activity-011-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'highlighted',
        targetId: null,
        targetType: null,
        targetText: '$14 minimum wage, healthcare benefits, and tuition assistance'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.35 },
      'faction-005': { sentiment: 0.45 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    metrics: { shares: 2800 },
    highlights: [],
    comments: []
  },

  // Great Value recall documents
  {
    id: 'doc-012',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-001'],
    title: 'FDA Recalls Walmart Great Value Frozen Vegetables Over Listeria Concerns',
    excerpt: 'FDA announces recall of Great Value frozen vegetables due to potential Listeria contamination.',
    url: 'https://usatoday.com/story/money/example',
    publisherId: 'pub-usatoday',
    publishedDate: '2026-01-16T10:00:00Z',
    author: 'Kelly Tyko',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/58',
      caption: 'FDA recall notice'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'The U.S. Food and Drug Administration has announced a voluntary recall of select Walmart Great Value frozen vegetable products due to potential Listeria monocytogenes contamination.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The initial recall covers five SKUs sold nationwide. Consumers who purchased affected products are advised to return them for a full refund.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'FDA officials said they are working with Walmart to identify the source of contamination and ensure all affected products are removed from shelves.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-004'],
    themeIds: ['sub-009'],
    topicIds: ['topic-004'],
    personIds: ['person-006'],
    organizationIds: ['org-001', 'org-007'],
    locationIds: ['loc-007'],
    eventIds: ['event-008'],
    factionIds: ['faction-001', 'faction-004'],
    quotes: [
      {
        id: 'quote-012-01',
        speakerId: 'org-007',
        speakerType: 'organization',
        text: 'We are working with Walmart to identify the source of contamination and ensure all affected products are removed from shelves.'
      }
    ],
    activities: [
      {
        id: 'activity-012-01',
        actorId: 'org-007',
        actorType: 'organization',
        action: 'announced recall of',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'Great Value frozen vegetable products'
      },
      {
        id: 'activity-012-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'issued',
        targetId: null,
        targetType: null,
        targetText: 'voluntary recall for five SKUs sold nationwide'
      },
      {
        id: 'activity-012-03',
        actorId: 'org-007',
        actorType: 'organization',
        action: 'investigated',
        targetId: null,
        targetType: null,
        targetText: 'potential Listeria monocytogenes contamination'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.75 },
      'faction-004': { sentiment: -0.62 },
      'faction-013': { sentiment: 0.35 }
    },
    metrics: { shares: 8500 },
    highlights: [
      {
        id: 'highlight-005',
        userId: 'user-002',
        blockIndex: 0,
        startOffset: 0,
        endOffset: 178,
        highlightedText: 'The U.S. Food and Drug Administration has announced a voluntary recall of select Walmart Great Value frozen vegetable products due to potential Listeria monocytogenes contamination.',
        createdAt: '2026-01-16T12:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-004',
        userId: 'user-002',
        blockIndex: 0,
        anchorStartOffset: 0,
        anchorEndOffset: 178,
        anchorText: 'The U.S. Food and Drug Administration has announced a voluntary recall of select Walmart Great Value frozen vegetable products due to potential Listeria monocytogenes contamination.',
        content: 'Initial recall scope seems limited but this could expand. Monitor for additional SKUs.',
        createdAt: '2026-01-16T12:30:00Z',
        replies: [
          {
            id: 'reply-002',
            userId: 'user-003',
            content: 'Agreed. Listeria recalls often expand as investigation progresses.',
            createdAt: '2026-01-16T13:00:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-013',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Great Value Recall Expands to 15 Products',
    excerpt: 'FDA expands Great Value recall to additional product lines.',
    url: 'https://reuters.com/business/retail/example',
    publisherId: 'pub-reuters',
    publishedDate: '2026-01-18T14:00:00Z',
    author: 'Siddharth Cavale',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/59',
      caption: 'Great Value product recall notice'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'The FDA has expanded its recall of Walmart\'s Great Value brand products to include 15 different SKUs across frozen vegetables and salad mixes.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Three hospitalizations have been linked to the contamination, though no deaths have been reported.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Walmart has pulled all affected products from shelves and is offering full refunds. The company issued a statement expressing concern for affected customers.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-004'],
    themeIds: ['sub-009'],
    topicIds: ['topic-004'],
    personIds: ['person-006'],
    organizationIds: ['org-001', 'org-007'],
    locationIds: ['loc-007'],
    eventIds: ['event-009'],
    factionIds: ['faction-001', 'faction-004'],
    quotes: [
      {
        id: 'quote-013-01',
        speakerId: 'org-001',
        speakerType: 'organization',
        text: 'We are deeply concerned for any customers who may have been affected and are working closely with the FDA to resolve this matter.'
      }
    ],
    activities: [
      {
        id: 'activity-013-01',
        actorId: 'org-007',
        actorType: 'organization',
        action: 'expanded recall to',
        targetId: null,
        targetType: null,
        targetText: '15 SKUs across frozen vegetables and salad mixes'
      },
      {
        id: 'activity-013-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'pulled products from',
        targetId: null,
        targetType: null,
        targetText: 'store shelves nationwide'
      },
      {
        id: 'activity-013-03',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'offered',
        targetId: null,
        targetType: null,
        targetText: 'full refunds to affected customers'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.82 },
      'faction-004': { sentiment: -0.70 },
      'faction-013': { sentiment: 0.35 }
    },
    metrics: { shares: 12200 },
    highlights: [
      {
        id: 'highlight-006',
        userId: 'user-003',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 96,
        highlightedText: 'Three hospitalizations have been linked to the contamination, though no deaths have been reported.',
        createdAt: '2026-01-18T16:00:00Z'
      }
    ],
    comments: []
  },
  {
    id: 'doc-014',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Consumer Reports Demands Stricter Private-Label Quality Controls',
    excerpt: 'Consumer advocacy group calls for enhanced quality control measures for store-brand products.',
    url: 'https://consumerreports.org/safety/example',
    publisherId: 'pub-consumeraffairs',
    publishedDate: '2026-01-19T09:00:00Z',
    author: 'Consumer Reports Staff',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/60',
      caption: 'Consumer Reports analysis'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Consumer Reports is calling on major retailers including Walmart to implement stricter quality control measures for private-label products following the expanded Great Value recall.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"When consumers trust a store brand, they\'re trusting the retailer\'s commitment to safety," said Marta Tellado, Consumer Reports CEO. "That trust must be earned through rigorous quality standards."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The organization is advocating for mandatory third-party audits of all private-label food suppliers.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-004'],
    themeIds: ['sub-010'],
    topicIds: ['topic-004'],
    personIds: ['person-007', 'person-011'],
    organizationIds: ['org-001', 'org-008'],
    locationIds: [],
    eventIds: ['event-010'],
    factionIds: ['faction-004'],
    quotes: [
      {
        id: 'quote-014-01',
        speakerId: 'person-007',
        speakerType: 'person',
        text: 'When consumers trust a store brand, they\'re trusting the retailer\'s commitment to safety. That trust must be earned through rigorous quality standards.'
      }
    ],
    activities: [
      {
        id: 'activity-014-01',
        actorId: 'org-008',
        actorType: 'organization',
        action: 'called for',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'stricter quality control measures for private-label products'
      },
      {
        id: 'activity-014-02',
        actorId: 'person-007',
        actorType: 'person',
        action: 'advocated for',
        targetId: null,
        targetType: null,
        targetText: 'mandatory third-party audits of private-label food suppliers'
      },
      {
        id: 'activity-014-03',
        actorId: 'org-008',
        actorType: 'organization',
        action: 'criticized',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'quality control failures following Great Value recall'
      }
    ],
    factionMentions: {
      'faction-004': { sentiment: -0.58 },
      'faction-013': { sentiment: 0.35 }
    },
    metrics: { shares: 5400 },
    highlights: [],
    comments: []
  },

  // Pricing narrative documents
  {
    id: 'doc-015',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'TikTok: Walmart vs Aldi price comparison',
    excerpt: 'Viral TikTok showing item-by-item price comparison between Walmart and Aldi.',
    url: 'https://tiktok.com/@frugalmom23/video/example',
    publisherId: 'pub-tiktok',
    publishedDate: '2026-01-17T15:00:00Z',
    author: {
      username: '@frugalmom23',
      displayName: 'Frugal Mom Tips',
      avatarUrl: 'https://i.pravatar.cc/150?u=frugalmom23'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart vs Aldi price comparison - the results will SHOCK you 😱💰 #walmart #aldi #groceryshopping #savemoney #frugalliving #pricecheck', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 94
    },
    transcription: 'Let\'s compare Walmart vs Aldi for a basic grocery list. Milk: Walmart $3.98, Aldi $2.89. Bread: Walmart $2.48, Aldi $1.29. Eggs: Walmart $4.28, Aldi $2.99. Butter: Walmart $4.47, Aldi $3.29. Cheese: Walmart $3.98, Aldi $2.49. Ground beef: Walmart $5.97, Aldi $4.29. Chicken breast: Walmart $3.48 per pound, Aldi $2.69. Bananas: Walmart 58 cents per pound, Aldi 44 cents. Cereal: Walmart $4.28, Aldi $1.89. Orange juice: Walmart $3.98, Aldi $2.69. Total: Walmart $43.46, Aldi $29.16. That\'s over $14 in savings!',
    narrativeIds: ['narr-005'],
    themeIds: ['sub-011'],
    topicIds: ['topic-005'],
    personIds: [],
    organizationIds: ['org-001', 'org-010'],
    locationIds: [],
    eventIds: [],
    factionIds: ['faction-001', 'faction-006'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.72 },
      'faction-006': { sentiment: 0.65 },
      'faction-007': { sentiment: -0.58 },
      'faction-016': { sentiment: -0.52 }
    },
    metrics: { views: 4800000, likes: 325000, shares: 185000, comments: 52000, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-016',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'X thread: Is Walmart still the low-price leader?',
    excerpt: 'Twitter thread analyzing whether Walmart still offers competitive prices.',
    url: 'https://x.com/retailwatcher/status/example',
    publisherId: 'pub-x',
    publishedDate: '2026-01-18T10:00:00Z',
    author: {
      username: '@retailwatcher',
      displayName: 'Retail Watcher',
      avatarUrl: 'https://i.pravatar.cc/150?u=retailwatcher'
    },
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/61',
      caption: 'Price analysis thread'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Thread: "Did some research on Walmart\'s \'Everyday Low Prices\' claim. Compared 50 staple items across Walmart, Aldi, Costco, and Amazon."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Results: Walmart was cheapest on only 12 items. What happened to their price leadership?', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '[thread continues with data and charts]', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-005'],
    themeIds: ['sub-011'],
    topicIds: ['topic-005'],
    personIds: [],
    organizationIds: ['org-001', 'org-010', 'org-011', 'org-004'],
    locationIds: [],
    eventIds: [],
    factionIds: ['faction-001', 'faction-006'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.68 },
      'faction-006': { sentiment: 0.55 },
      'faction-007': { sentiment: -0.58 },
      'faction-016': { sentiment: -0.52 }
    },
    metrics: { views: 1850000, likes: 42000, shares: 18500, comments: 5200, platform: 'x' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-017',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Analysis: Walmart Kept Pandemic Price Increases Despite Falling Costs',
    excerpt: 'WSJ analysis shows Walmart retained elevated prices even as wholesale costs declined.',
    url: 'https://wsj.com/articles/walmart-pricing-analysis',
    publisherId: 'pub-wsj',
    publishedDate: '2026-01-17T06:00:00Z',
    author: 'Jaewon Kang',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/62',
      caption: 'Walmart pricing analysis chart'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'A Wall Street Journal analysis of Walmart pricing data shows the retailer has maintained pandemic-era price increases on hundreds of items even as input costs have declined.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'On average, examined products remain 18% higher than 2019 levels, compared to a 12% increase in wholesale costs.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Retail analyst Sarah Nassauer notes this could threaten Walmart\'s core brand promise of everyday low prices.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-005'],
    themeIds: ['sub-012'],
    topicIds: ['topic-005'],
    personIds: ['person-012'],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: ['event-011'],
    factionIds: ['faction-001', 'faction-005'],
    quotes: [
      {
        id: 'quote-017-01',
        speakerId: 'person-012',
        speakerType: 'person',
        text: 'This could threaten Walmart\'s core brand promise of everyday low prices.'
      }
    ],
    activities: [
      {
        id: 'activity-017-01',
        actorId: 'person-012',
        actorType: 'person',
        action: 'analyzed',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'Walmart pricing data showing retained pandemic-era increases'
      },
      {
        id: 'activity-017-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'maintained',
        targetId: null,
        targetType: null,
        targetText: 'pandemic-era price increases despite falling wholesale costs'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.65 },
      'faction-005': { sentiment: -0.48 },
      'faction-007': { sentiment: -0.58 },
      'faction-016': { sentiment: -0.52 }
    },
    metrics: { shares: 8200 },
    highlights: [
      {
        id: 'highlight-007',
        userId: 'user-001',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 106,
        highlightedText: 'On average, examined products remain 18% higher than 2019 levels, compared to a 12% increase in wholesale costs.',
        createdAt: '2026-01-17T10:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-005',
        userId: 'user-001',
        blockIndex: 1,
        anchorStartOffset: 0,
        anchorEndOffset: 106,
        anchorText: 'On average, examined products remain 18% higher than 2019 levels, compared to a 12% increase in wholesale costs.',
        content: 'This 6-point gap between price increases and cost increases is significant. Key data point for the pricing narrative.',
        createdAt: '2026-01-17T10:15:00Z',
        replies: []
      }
    ]
  },

  // Competitor pressure documents
  {
    id: 'doc-018',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Target Achieves 98% On-Time Delivery Rate',
    excerpt: 'Target announces industry-leading delivery performance metrics.',
    url: 'https://modernretail.com/target-delivery',
    publisherId: 'pub-modernretail',
    publishedDate: '2026-01-14T08:00:00Z',
    author: 'Cale Guthrie Weissman',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/63',
      caption: 'Target delivery vehicle'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Target announced today that its same-day delivery service has achieved a 98% on-time delivery rate, leading the retail industry.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'CEO Brian Cornell attributed the success to investments in micro-fulfillment centers and last-mile logistics partnerships.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-006'],
    themeIds: ['sub-013'],
    topicIds: ['topic-006'],
    personIds: ['person-013'],
    organizationIds: ['org-003'],
    locationIds: [],
    eventIds: ['event-012'],
    factionIds: ['faction-005', 'faction-006'],
    quotes: [
      {
        id: 'quote-018-01',
        speakerId: 'person-013',
        speakerType: 'person',
        text: 'Our investments in micro-fulfillment centers and last-mile logistics partnerships have positioned us to deliver industry-leading service.'
      }
    ],
    activities: [
      {
        id: 'activity-018-01',
        actorId: 'org-003',
        actorType: 'organization',
        action: 'achieved',
        targetId: null,
        targetType: null,
        targetText: '98% on-time delivery rate for same-day service'
      },
      {
        id: 'activity-018-02',
        actorId: 'person-013',
        actorType: 'person',
        action: 'attributed success to',
        targetId: null,
        targetType: null,
        targetText: 'micro-fulfillment centers and logistics partnerships'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: 0.25 },
      'faction-006': { sentiment: 0.78 },
      'faction-016': { sentiment: -0.52 }
    },
    metrics: { shares: 3800 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-019',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Amazon Expands Sub-24-Hour Delivery to 85% of US',
    excerpt: 'Amazon announces major expansion of rapid delivery coverage.',
    url: 'https://bloomberg.com/news/amazon-delivery',
    publisherId: 'pub-bloomberg',
    publishedDate: '2026-01-16T10:00:00Z',
    author: 'Spencer Soper',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/64',
      caption: 'Amazon fulfillment center'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Amazon announced a significant expansion of its rapid delivery network, with sub-24-hour delivery now available to 85% of U.S. households.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The expansion includes new distribution centers in previously underserved markets.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Amazon CEO Andy Jassy said the investment underscores the company\'s commitment to customer convenience.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-006'],
    themeIds: ['sub-014'],
    topicIds: ['topic-006'],
    personIds: ['person-014'],
    organizationIds: ['org-004'],
    locationIds: ['loc-008'],
    eventIds: ['event-013'],
    factionIds: ['faction-005', 'faction-006'],
    quotes: [
      {
        id: 'quote-019-01',
        speakerId: 'person-014',
        speakerType: 'person',
        text: 'This investment underscores our commitment to customer convenience and delivering on our promise of fast, reliable service.'
      }
    ],
    activities: [
      {
        id: 'activity-019-01',
        actorId: 'org-004',
        actorType: 'organization',
        action: 'expanded',
        targetId: null,
        targetType: null,
        targetText: 'sub-24-hour delivery to 85% of U.S. households'
      },
      {
        id: 'activity-019-02',
        actorId: 'org-004',
        actorType: 'organization',
        action: 'opened',
        targetId: null,
        targetType: null,
        targetText: 'new distribution centers in previously underserved markets'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: 0.18 },
      'faction-006': { sentiment: 0.82 },
      'faction-016': { sentiment: -0.52 }
    },
    metrics: { shares: 5600 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-020',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Reddit discussion: Comparing delivery services',
    excerpt: 'Reddit thread comparing Walmart, Amazon, and Target delivery experiences.',
    url: 'https://reddit.com/r/personalfinance/comments/delivery',
    publisherId: 'pub-reddit',
    publishedDate: '2026-01-17T12:00:00Z',
    author: {
      username: 'u/delivery_compare_2026',
      displayName: 'delivery_compare_2026',
      avatarUrl: 'https://i.pravatar.cc/150?u=delivery_compare_2026'
    },
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/65',
      caption: 'Reddit delivery discussion'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Thread: "Switched from Walmart+ to Amazon Prime after the third time Walmart substituted half my order and delivered late. Amazon hasn\'t missed a delivery yet."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Top reply: "Same experience. Walmart delivery has gone downhill badly."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-006'],
    themeIds: ['sub-014'],
    topicIds: ['topic-006'],
    personIds: [],
    organizationIds: ['org-001', 'org-004'],
    locationIds: [],
    eventIds: [],
    factionIds: ['faction-001', 'faction-006'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.75 },
      'faction-006': { sentiment: 0.62 },
      'faction-016': { sentiment: -0.52 }
    },
    metrics: { likes: 4280, comments: 892, platform: 'reddit' },
    highlights: [],
    comments: []
  },

  // Rural closure documents
  {
    id: 'doc-021',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-001'],
    title: 'Missouri Town Faces "Food Desert" After Walmart Closure Announcement',
    excerpt: 'Small Missouri town will have no grocery stores after Walmart announces closure.',
    url: 'https://usatoday.com/story/news/example',
    publisherId: 'pub-usatoday',
    publishedDate: '2026-01-18T12:00:00Z',
    author: 'Nathan Bomey',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/66',
      caption: 'Rural Walmart store exterior'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Residents of a small town in rural Missouri will need to drive 45 miles to the nearest grocery store after Walmart announced plans to close its local supercenter.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The store, which opened in 2008, had previously displaced several local grocers that have not returned.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Mayor Mary Johnson said the closure will "devastate" the community\'s elderly and low-income residents.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-007'],
    themeIds: ['sub-015'],
    topicIds: ['topic-007'],
    personIds: ['person-016'],
    organizationIds: ['org-001', 'org-013'],
    locationIds: ['loc-009'],
    eventIds: ['event-014'],
    factionIds: ['faction-001'],
    quotes: [
      {
        id: 'quote-021-01',
        speakerId: 'person-016',
        speakerType: 'person',
        text: 'This closure will devastate our community\'s elderly and low-income residents who depend on this store for basic necessities.'
      }
    ],
    activities: [
      {
        id: 'activity-021-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'announced closure of',
        targetId: null,
        targetType: null,
        targetText: 'local supercenter in rural Missouri'
      },
      {
        id: 'activity-021-02',
        actorId: 'person-016',
        actorType: 'person',
        action: 'warned about',
        targetId: null,
        targetType: null,
        targetText: 'food desert impact on elderly and low-income residents'
      },
      {
        id: 'activity-021-03',
        actorId: 'org-013',
        actorType: 'organization',
        action: 'criticized',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'abandonment of rural community'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.88 },
      'faction-007': { sentiment: -0.58 },
      'faction-009': { sentiment: -0.55 },
      'faction-012': { sentiment: -0.45 },
      'faction-015': { sentiment: -0.68 }
    },
    metrics: { shares: 15200 },
    highlights: [
      {
        id: 'highlight-008',
        userId: 'user-002',
        blockIndex: 0,
        startOffset: 0,
        endOffset: 162,
        highlightedText: 'Residents of a small town in rural Missouri will need to drive 45 miles to the nearest grocery store after Walmart announced plans to close its local supercenter.',
        createdAt: '2026-01-18T14:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-006',
        userId: 'user-002',
        blockIndex: 0,
        anchorStartOffset: 0,
        anchorEndOffset: 162,
        anchorText: 'Residents of a small town in rural Missouri will need to drive 45 miles to the nearest grocery store after Walmart announced plans to close its local supercenter.',
        content: 'This is the "food desert" narrative that could have significant political resonance in rural areas.',
        createdAt: '2026-01-18T14:30:00Z',
        replies: [
          {
            id: 'reply-003',
            userId: 'user-001',
            content: 'Worth monitoring how local officials respond. This could become a broader policy issue.',
            createdAt: '2026-01-18T15:00:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-022',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Facebook: Rural community organizes protest',
    excerpt: 'Local Facebook group organizes protest against Walmart store closure.',
    url: 'https://facebook.com/groups/saveourwalmart/posts/example',
    publisherId: 'pub-facebook',
    publishedDate: '2026-01-19T08:00:00Z',
    author: {
      username: 'save.our.walmart.mo',
      displayName: 'Save Our Walmart - Missouri',
      avatarUrl: 'https://i.pravatar.cc/150?u=save.our.walmart.mo'
    },
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/67',
      caption: 'Community protest event page'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Post: "PROTEST THIS SATURDAY: Meet at the Walmart parking lot at 10 AM. We cannot let them abandon our community. They put all our local stores out of business and now they\'re leaving us with nothing. Please share!"', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '[Event shows 2,400 interested]', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-007'],
    themeIds: ['sub-015'],
    topicIds: ['topic-007'],
    personIds: ['person-017'],
    organizationIds: ['org-001'],
    locationIds: ['loc-009'],
    eventIds: ['event-014'],
    factionIds: ['faction-001'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.92 },
      'faction-007': { sentiment: -0.58 },
      'faction-009': { sentiment: -0.55 },
      'faction-012': { sentiment: -0.45 },
      'faction-015': { sentiment: -0.68 }
    },
    metrics: { likes: 3850, comments: 1245, shares: 2180, platform: 'facebook' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-023',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Local Politicians Call for Walmart to Maintain Rural Stores',
    excerpt: 'State legislators urge Walmart to consider community impact of store closures.',
    url: 'https://apnews.com/article/example',
    publisherId: 'pub-ap',
    publishedDate: '2026-01-19T14:00:00Z',
    author: 'Michael Balsamo',
    headerImage: {
      url: 'http://static.photos/cityscape/640x360/68',
      caption: 'State legislators press conference'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'A group of state legislators from Missouri and Oklahoma sent a letter to Walmart CEO Doug McMillon urging the company to reconsider planned closures of rural stores.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The letter argues that Walmart has a "moral obligation" to communities it has served, noting that many local competitors closed after Walmart\'s arrival.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"When you become the only grocery option for miles, you take on a responsibility to that community," the letter states.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-007'],
    themeIds: ['sub-016'],
    topicIds: ['topic-007'],
    personIds: ['person-001', 'person-016'],
    organizationIds: ['org-001', 'org-013'],
    locationIds: ['loc-009', 'loc-010'],
    eventIds: [],
    factionIds: ['faction-001'],
    quotes: [
      {
        id: 'quote-023-01',
        speakerId: 'org-013',
        speakerType: 'organization',
        text: 'When you become the only grocery option for miles, you take on a responsibility to that community.'
      }
    ],
    activities: [
      {
        id: 'activity-023-01',
        actorId: 'org-013',
        actorType: 'organization',
        action: 'sent letter to',
        targetId: 'person-001',
        targetType: 'person',
        targetText: 'urging reconsideration of rural store closures'
      },
      {
        id: 'activity-023-02',
        actorId: 'person-016',
        actorType: 'person',
        action: 'argued',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'Walmart has moral obligation to rural communities'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.72 },
      'faction-007': { sentiment: -0.58 },
      'faction-009': { sentiment: -0.55 },
      'faction-012': { sentiment: -0.45 },
      'faction-015': { sentiment: -0.68 }
    },
    metrics: { shares: 4800 },
    highlights: [
      {
        id: 'highlight-009',
        userId: 'user-003',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 138,
        highlightedText: 'The letter argues that Walmart has a "moral obligation" to communities it has served, noting that many local competitors closed after Walmart\'s arrival.',
        createdAt: '2026-01-19T16:00:00Z'
      }
    ],
    comments: []
  },

  // Historical documents: Supplier Issues, Unionization, Healthcare, Delivery (June 2025 - January 2026)
  {
    id: 'doc-024',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.reuters.com/business/great-value-supplier-violations',
    publishedDate: '2025-06-15T10:00:00Z',
    publisherId: 'pub-reuters',
    title: 'Investigation Reveals Unsafe Conditions at Great Value Supplier',
    author: 'Howard Schneider',
    contentBlocks: [
      { type: 'paragraph', content: 'An investigation has uncovered unsafe working conditions and labor violations at factories producing Walmart\'s Great Value private-label products.' },
      { type: 'paragraph', content: 'Workers described long hours, inadequate safety equipment, and pressure to meet production quotas that put their health at risk.' }
    ],
    excerpt: 'Investigation reveals labor and safety violations at Great Value supplier factories.',
    narrativeIds: ['narr-008'],
    themeIds: ['sub-017'],
    topicIds: ['topic-008'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-006'],
    eventIds: ['event-015'],
    quotes: [
      {
        id: 'quote-024-01',
        speakerId: 'org-001',
        speakerType: 'organization',
        text: 'We take supplier compliance seriously and are investigating these allegations thoroughly.'
      }
    ],
    activities: [
      {
        id: 'activity-024-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'was investigated for',
        targetId: null,
        targetType: null,
        targetText: 'unsafe conditions at Great Value supplier factories'
      },
      {
        id: 'activity-024-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'faced allegations of',
        targetId: null,
        targetType: null,
        targetText: 'labor violations at private-label manufacturing facilities'
      }
    ],
    factionMentions: {
      'faction-003': { sentiment: -0.72 },
      'faction-004': { sentiment: -0.68 },
      'faction-008': { sentiment: -0.62 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-025',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.wsj.com/business/walmart-supply-chain-transparency',
    publishedDate: '2025-06-22T09:00:00Z',
    publisherId: 'pub-wsj',
    title: 'Walmart Faces Pressure Over Supply Chain Transparency',
    author: 'Sarah Nassauer',
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart is facing growing pressure from consumer advocacy groups to improve transparency in its supply chain following revelations about supplier labor violations.' },
      { type: 'paragraph', content: 'Critics argue that Walmart\'s aggressive price demands create conditions for worker exploitation.' }
    ],
    excerpt: 'Consumer groups demand greater transparency in Walmart supply chain.',
    narrativeIds: ['narr-008'],
    themeIds: ['sub-017', 'sub-018'],
    topicIds: ['topic-008'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-006'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-025-01',
        speakerId: 'org-001',
        speakerType: 'organization',
        text: 'We are committed to ethical sourcing and are continuously improving our supplier monitoring processes.'
      }
    ],
    activities: [
      {
        id: 'activity-025-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'faced pressure from',
        targetId: null,
        targetType: null,
        targetText: 'consumer advocacy groups over supply chain transparency'
      },
      {
        id: 'activity-025-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'was criticized for',
        targetId: null,
        targetType: null,
        targetText: 'aggressive price demands creating conditions for worker exploitation'
      }
    ],
    factionMentions: {
      'faction-003': { sentiment: -0.65 },
      'faction-005': { sentiment: -0.42 },
      'faction-008': { sentiment: -0.62 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-026',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-002'],
    url: 'https://www.bloomberg.com/business/ftc-retail-supply-chain-inquiry',
    publishedDate: '2025-07-01T14:00:00Z',
    publisherId: 'pub-bloomberg',
    title: 'FTC Opens Inquiry Into Retail Supply Chain Practices',
    author: 'David McLaughlin',
    contentBlocks: [
      { type: 'paragraph', content: 'The Federal Trade Commission has opened an inquiry into retail supply chain practices, with Walmart among the companies being examined.' },
      { type: 'paragraph', content: 'FTC Chair Lina Khan said the agency is examining whether price pressures contribute to supplier labor violations.' }
    ],
    excerpt: 'FTC opens inquiry into Walmart and other retailers\' supply chain practices.',
    narrativeIds: ['narr-008'],
    themeIds: ['sub-018'],
    topicIds: ['topic-008'],
    personIds: ['person-022'],
    organizationIds: ['org-018', 'org-001'],
    locationIds: ['loc-006'],
    eventIds: ['event-016'],
    quotes: [
      {
        id: 'quote-026-01',
        speakerId: 'person-022',
        speakerType: 'person',
        text: 'We are examining whether price pressures from major retailers contribute to supplier labor violations.'
      }
    ],
    activities: [
      {
        id: 'activity-026-01',
        actorId: 'org-018',
        actorType: 'organization',
        action: 'opened inquiry into',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'retail supply chain practices'
      },
      {
        id: 'activity-026-02',
        actorId: 'person-022',
        actorType: 'person',
        action: 'investigated',
        targetId: null,
        targetType: null,
        targetText: 'whether price pressures contribute to supplier labor violations'
      }
    ],
    factionMentions: {
      'faction-004': { sentiment: 0.55 },
      'faction-005': { sentiment: -0.48 },
      'faction-008': { sentiment: -0.62 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-027',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://apnews.com/article/walmart-fulfillment-workers-union',
    publishedDate: '2025-07-20T11:00:00Z',
    publisherId: 'pub-ap',
    title: 'Walmart Fulfillment Workers in Texas Seek Union Vote',
    author: 'Anne D\'Innocenzio',
    contentBlocks: [
      { type: 'paragraph', content: 'Workers at a Walmart e-commerce fulfillment center in Dallas have filed for a union election, citing concerns about working conditions and wages.' },
      { type: 'paragraph', content: 'The Retail, Wholesale and Department Store Union is supporting the organizing effort.' }
    ],
    excerpt: 'Walmart fulfillment workers in Texas file for union election.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-019'],
    topicIds: ['topic-009'],
    personIds: ['person-020'],
    organizationIds: ['org-016', 'org-001'],
    locationIds: ['loc-011'],
    eventIds: ['event-017'],
    quotes: [
      {
        id: 'quote-027-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'Workers are standing up for better conditions and fair treatment. This is a historic moment for warehouse workers everywhere.'
      }
    ],
    activities: [
      {
        id: 'activity-027-01',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'supported',
        targetId: null,
        targetType: null,
        targetText: 'union organizing effort at Dallas fulfillment center'
      },
      {
        id: 'activity-027-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'faced union election at',
        targetId: null,
        targetType: null,
        targetText: 'Dallas e-commerce fulfillment center'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.72 },
      'faction-003': { sentiment: 0.78 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-028',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.usatoday.com/story/money/warehouse-workers-organizing',
    publishedDate: '2025-07-28T10:00:00Z',
    publisherId: 'pub-usatoday',
    title: 'Why Warehouse Workers Are Organizing in Record Numbers',
    author: 'Charisse Jones',
    contentBlocks: [
      { type: 'paragraph', content: 'Warehouse and fulfillment center workers across the country are organizing at record rates, following the Amazon Labor Union\'s landmark victory.' },
      { type: 'paragraph', content: 'Labor experts say the pandemic highlighted the essential nature of warehouse work while exposing difficult conditions.' }
    ],
    excerpt: 'Analysis: Warehouse workers organize at record rates across the country.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-019', 'sub-020'],
    topicIds: ['topic-009'],
    personIds: ['person-021'],
    organizationIds: ['org-016', 'org-017'],
    locationIds: [],
    eventIds: [],
    quotes: [
      {
        id: 'quote-028-01',
        speakerId: 'person-021',
        speakerType: 'person',
        text: 'The pandemic showed the world how essential warehouse workers are. Now we\'re demanding the respect and compensation we deserve.'
      }
    ],
    activities: [
      {
        id: 'activity-028-01',
        actorId: 'org-017',
        actorType: 'organization',
        action: 'inspired',
        targetId: null,
        targetType: null,
        targetText: 'warehouse organizing efforts across the country'
      },
      {
        id: 'activity-028-02',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'reported on',
        targetId: null,
        targetType: null,
        targetText: 'record rates of warehouse worker organizing'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.68 },
      'faction-003': { sentiment: 0.75 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-029',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.wsj.com/health/walmart-healthcare-rural-expansion',
    publishedDate: '2025-08-05T09:00:00Z',
    publisherId: 'pub-wsj',
    title: 'Walmart Bets Big on Healthcare as Rural Hospitals Struggle',
    author: 'Sharon Terlep',
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart is expanding its healthcare clinic network into rural communities that have lost hospitals, offering primary care, dental, and mental health services.' },
      { type: 'paragraph', content: 'The company says it can provide care at prices 40% below market rates by leveraging its store infrastructure.' }
    ],
    excerpt: 'Walmart expands healthcare clinics into underserved rural communities.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-021'],
    personIds: ['person-023'],
    organizationIds: ['org-019'],
    locationIds: ['loc-001', 'loc-009'],
    eventIds: ['event-018'],
    quotes: [
      {
        id: 'quote-029-01',
        speakerId: 'person-023',
        speakerType: 'person',
        text: 'We can provide care at prices 40% below market rates by leveraging our existing store infrastructure.'
      }
    ],
    activities: [
      {
        id: 'activity-029-01',
        actorId: 'org-019',
        actorType: 'organization',
        action: 'expanded',
        targetId: null,
        targetType: null,
        targetText: 'healthcare clinic network into rural communities'
      },
      {
        id: 'activity-029-02',
        actorId: 'org-019',
        actorType: 'organization',
        action: 'offered',
        targetId: null,
        targetType: null,
        targetText: 'primary care, dental, and mental health services'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.45 },
      'faction-004': { sentiment: 0.52 },
      'faction-005': { sentiment: 0.58 },
      'faction-012': { sentiment: -0.45 },
      'faction-013': { sentiment: 0.35 },
      'faction-015': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-030',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://localnews.example.com/walmart-health-rural-missouri',
    publishedDate: '2025-08-15T11:00:00Z',
    publisherId: 'pub-localnews',
    title: 'Can Walmart Fill the Rural Healthcare Gap?',
    author: 'Jennifer Martinez',
    contentBlocks: [
      { type: 'paragraph', content: 'In rural Missouri, where the nearest hospital is 45 minutes away, residents are welcoming a new Walmart Health clinic.' },
      { type: 'paragraph', content: 'But some healthcare advocates question whether corporate healthcare can adequately serve vulnerable populations.' }
    ],
    excerpt: 'Rural community weighs pros and cons of Walmart healthcare expansion.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-021', 'sub-022'],
    personIds: [],
    organizationIds: ['org-019'],
    locationIds: ['loc-009'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-030-01',
        speakerId: 'org-019',
        speakerType: 'organization',
        text: 'We\'re committed to bringing affordable healthcare to communities that need it most.'
      }
    ],
    activities: [
      {
        id: 'activity-030-01',
        actorId: 'org-019',
        actorType: 'organization',
        action: 'opened clinic in',
        targetId: null,
        targetType: null,
        targetText: 'rural Missouri community without hospital access'
      },
      {
        id: 'activity-030-02',
        actorId: 'org-019',
        actorType: 'organization',
        action: 'was questioned by',
        targetId: null,
        targetType: null,
        targetText: 'healthcare advocates about serving vulnerable populations'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.55 },
      'faction-004': { sentiment: 0.48 },
      'faction-012': { sentiment: -0.45 },
      'faction-013': { sentiment: 0.35 },
      'faction-015': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-031',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://consumeraffairs.com/walmart-healthcare-motives',
    publishedDate: '2025-08-25T10:00:00Z',
    publisherId: 'pub-consumeraffairs',
    title: 'Critics Question Walmart\'s Healthcare Motives',
    author: 'Mark Huffman',
    contentBlocks: [
      { type: 'paragraph', content: 'Consumer advocacy groups are questioning Walmart\'s motives in expanding healthcare services, suggesting profit rather than community service drives the initiative.' },
      { type: 'paragraph', content: 'Critics point to the company\'s history of closing unprofitable stores regardless of community impact.' }
    ],
    excerpt: 'Consumer groups question Walmart\'s healthcare expansion motives.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-022'],
    personIds: [],
    organizationIds: ['org-019', 'org-021'],
    locationIds: [],
    eventIds: [],
    quotes: [
      {
        id: 'quote-031-01',
        speakerId: 'org-021',
        speakerType: 'organization',
        text: 'The company\'s history of closing unprofitable stores regardless of community impact raises questions about long-term commitment.'
      }
    ],
    activities: [
      {
        id: 'activity-031-01',
        actorId: 'org-019',
        actorType: 'organization',
        action: 'was criticized for',
        targetId: null,
        targetType: null,
        targetText: 'profit-driven healthcare expansion motives'
      },
      {
        id: 'activity-031-02',
        actorId: 'org-021',
        actorType: 'organization',
        action: 'questioned',
        targetId: 'org-019',
        targetType: 'organization',
        targetText: 'long-term commitment to vulnerable communities'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.35 },
      'faction-004': { sentiment: 0.42 },
      'faction-012': { sentiment: -0.45 },
      'faction-013': { sentiment: 0.35 },
      'faction-015': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-032',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-003'],
    url: 'https://www.reuters.com/business/union-vote-fails-walmart-texas',
    publishedDate: '2025-09-15T19:00:00Z',
    publisherId: 'pub-reuters',
    title: 'Union Vote Fails at Texas Walmart Fulfillment Center',
    author: 'Howard Schneider',
    contentBlocks: [
      { type: 'paragraph', content: 'Workers at a Walmart fulfillment center in Dallas voted against union representation in a closely watched election.' },
      { type: 'paragraph', content: 'Union organizers blamed Walmart\'s aggressive anti-union campaign for the defeat but vowed to continue organizing efforts.' }
    ],
    excerpt: 'Walmart fulfillment center workers in Texas vote against union.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-020'],
    topicIds: ['topic-009'],
    personIds: ['person-020'],
    organizationIds: ['org-016', 'org-001'],
    locationIds: ['loc-011'],
    eventIds: ['event-019'],
    quotes: [
      {
        id: 'quote-032-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'Walmart\'s aggressive anti-union campaign swayed undecided workers, but the close vote shows significant support for organizing.'
      }
    ],
    activities: [
      {
        id: 'activity-032-01',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'lost union vote at',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'Dallas fulfillment center'
      },
      {
        id: 'activity-032-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'defeated',
        targetId: null,
        targetType: null,
        targetText: 'union organizing effort through anti-union campaign'
      },
      {
        id: 'activity-032-03',
        actorId: 'person-020',
        actorType: 'person',
        action: 'vowed to continue',
        targetId: null,
        targetType: null,
        targetText: 'organizing efforts despite defeat'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: -0.65 },
      'faction-003': { sentiment: -0.72 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-033',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://apnews.com/article/walmart-union-workers-vow-continue',
    publishedDate: '2025-09-18T10:00:00Z',
    publisherId: 'pub-ap',
    title: 'Workers Vow to Continue Organizing Despite Setback',
    author: 'Anne D\'Innocenzio',
    contentBlocks: [
      { type: 'paragraph', content: 'Following their defeat in Dallas, Walmart warehouse workers say they will continue their organizing campaign at other facilities.' },
      { type: 'paragraph', content: 'RWDSU leader Stuart Appelbaum said the close vote shows significant worker support for unionization.' }
    ],
    excerpt: 'Walmart fulfillment workers vow to continue organizing after Texas defeat.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-019'],
    topicIds: ['topic-009'],
    personIds: ['person-020'],
    organizationIds: ['org-016'],
    locationIds: ['loc-011'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-033-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'The close vote shows significant worker support for unionization. We will continue organizing at other facilities.'
      }
    ],
    activities: [
      {
        id: 'activity-033-01',
        actorId: 'person-020',
        actorType: 'person',
        action: 'announced plans to',
        targetId: null,
        targetType: null,
        targetText: 'continue organizing at other Walmart facilities'
      },
      {
        id: 'activity-033-02',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'pledged to expand',
        targetId: null,
        targetType: null,
        targetText: 'organizing campaign despite Dallas setback'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.58 },
      'faction-003': { sentiment: 0.65 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-034',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.bloomberg.com/business/walmart-anti-union-tactics',
    publishedDate: '2025-09-25T14:00:00Z',
    publisherId: 'pub-bloomberg',
    title: 'Walmart\'s Anti-Union Tactics Come Under Scrutiny',
    author: 'Matthew Boyle',
    contentBlocks: [
      { type: 'paragraph', content: 'Labor advocates are calling for an investigation into Walmart\'s anti-union tactics following the company\'s defeat of an organizing effort in Texas.' },
      { type: 'paragraph', content: 'Workers described mandatory meetings where managers warned about the dangers of unionization.' }
    ],
    excerpt: 'Labor groups call for investigation into Walmart anti-union tactics.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-020'],
    topicIds: ['topic-009'],
    personIds: [],
    organizationIds: ['org-001', 'org-016'],
    locationIds: [],
    eventIds: [],
    quotes: [
      {
        id: 'quote-034-01',
        speakerId: 'org-016',
        speakerType: 'organization',
        text: 'Workers described mandatory meetings where managers warned about the dangers of unionization. These tactics must be investigated.'
      }
    ],
    activities: [
      {
        id: 'activity-034-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'faced scrutiny for',
        targetId: null,
        targetType: null,
        targetText: 'anti-union tactics including mandatory meetings'
      },
      {
        id: 'activity-034-02',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'called for investigation into',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'anti-union campaign tactics'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: -0.72 },
      'faction-003': { sentiment: -0.78 },
      'faction-005': { sentiment: -0.35 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-035',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.usatoday.com/story/money/walmart-second-union-vote',
    publishedDate: '2025-10-01T11:00:00Z',
    publisherId: 'pub-usatoday',
    title: 'Second Walmart Fulfillment Center Files for Union Election',
    author: 'Charisse Jones',
    contentBlocks: [
      { type: 'paragraph', content: 'Workers at a Walmart e-commerce fulfillment center in Atlanta have filed for a union election, the second such effort at the retail giant this year.' },
      { type: 'paragraph', content: 'Organizers say they have learned from the Texas campaign and are better prepared for Walmart\'s opposition.' }
    ],
    excerpt: 'Atlanta Walmart fulfillment center files for union election.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-019'],
    topicIds: ['topic-009'],
    personIds: ['person-020', 'person-025'],
    organizationIds: ['org-016', 'org-006'],
    locationIds: ['loc-003'],
    eventIds: ['event-020'],
    quotes: [
      {
        id: 'quote-035-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'We learned from Texas and are better prepared for Walmart\'s opposition this time.'
      },
      {
        id: 'quote-035-02',
        speakerId: 'person-025',
        speakerType: 'person',
        text: 'Workers across the country are watching Atlanta. A victory here would change everything.'
      }
    ],
    activities: [
      {
        id: 'activity-035-01',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'filed for union election at',
        targetId: null,
        targetType: null,
        targetText: 'Atlanta fulfillment center'
      },
      {
        id: 'activity-035-02',
        actorId: 'org-006',
        actorType: 'organization',
        action: 'supported',
        targetId: null,
        targetType: null,
        targetText: 'second Walmart union organizing effort'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.72 },
      'faction-003': { sentiment: 0.75 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-036',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://localnews.example.com/walmart-health-15-new-clinics',
    publishedDate: '2025-10-15T10:00:00Z',
    publisherId: 'pub-localnews',
    title: 'Walmart Health Opens 15 New Clinics in Underserved Areas',
    author: 'Jennifer Martinez',
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart Health opened 15 new clinics in rural communities across the South and Midwest, bringing healthcare services to areas that have lost local hospitals.' },
      { type: 'paragraph', content: 'The clinics offer primary care, dental services, and mental health counseling at prices significantly below market rates.' }
    ],
    excerpt: 'Walmart Health opens 15 clinics in underserved rural communities.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-021'],
    personIds: ['person-023'],
    organizationIds: ['org-019'],
    locationIds: ['loc-009', 'loc-010'],
    eventIds: ['event-021'],
    quotes: [
      {
        id: 'quote-036-01',
        speakerId: 'person-023',
        speakerType: 'person',
        text: 'These 15 new clinics will serve communities that have lost access to local healthcare. We\'re filling a critical gap.'
      }
    ],
    activities: [
      {
        id: 'activity-036-01',
        actorId: 'org-019',
        actorType: 'organization',
        action: 'opened',
        targetId: null,
        targetType: null,
        targetText: '15 new clinics in underserved rural communities'
      },
      {
        id: 'activity-036-02',
        actorId: 'org-019',
        actorType: 'organization',
        action: 'offered services at',
        targetId: null,
        targetType: null,
        targetText: 'prices significantly below market rates'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.62 },
      'faction-004': { sentiment: 0.55 },
      'faction-012': { sentiment: -0.45 },
      'faction-013': { sentiment: 0.35 },
      'faction-015': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-037',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://apnews.com/article/rural-communities-walmart-healthcare',
    publishedDate: '2025-10-25T14:00:00Z',
    publisherId: 'pub-ap',
    title: 'Rural Communities Embrace Walmart Healthcare Expansion',
    author: 'Michelle Price',
    contentBlocks: [
      { type: 'paragraph', content: 'Rural residents across the South are embracing Walmart\'s healthcare expansion, with many saying the clinics fill a critical gap left by closed hospitals.' },
      { type: 'paragraph', content: 'Local officials say any healthcare is better than none, even as some question long-term sustainability.' }
    ],
    excerpt: 'Rural communities welcome Walmart healthcare amid hospital closures.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-021', 'sub-022'],
    personIds: [],
    organizationIds: ['org-019'],
    locationIds: ['loc-009', 'loc-010'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-037-01',
        speakerId: 'org-019',
        speakerType: 'organization',
        text: 'Any healthcare is better than none. These clinics are filling a critical gap left by closed hospitals.'
      }
    ],
    activities: [
      {
        id: 'activity-037-01',
        actorId: 'org-019',
        actorType: 'organization',
        action: 'was embraced by',
        targetId: null,
        targetType: null,
        targetText: 'rural communities across the South'
      },
      {
        id: 'activity-037-02',
        actorId: 'org-019',
        actorType: 'organization',
        action: 'faced questions about',
        targetId: null,
        targetType: null,
        targetText: 'long-term sustainability of rural healthcare services'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.68 },
      'faction-004': { sentiment: 0.52 },
      'faction-012': { sentiment: -0.45 },
      'faction-013': { sentiment: 0.35 },
      'faction-015': { sentiment: -0.68 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-038',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-001'],
    url: 'https://www.wsj.com/business/walmart-black-friday-delivery-chaos',
    publishedDate: '2025-11-29T18:00:00Z',
    publisherId: 'pub-wsj',
    title: 'Black Friday Online Sales Surge Overwhelms Walmart Delivery',
    author: 'Sarah Nassauer',
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart\'s delivery system buckled under record Black Friday online sales, with thousands of customers reporting delayed or missing orders.' },
      { type: 'paragraph', content: 'The company said it was working to resolve issues but could not guarantee delivery times for orders placed over the weekend.' }
    ],
    excerpt: 'Walmart delivery system overwhelmed by Black Friday demand.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-023'],
    topicIds: ['topic-010'],
    personIds: ['person-018', 'person-019'],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    eventIds: ['event-022'],
    quotes: [
      {
        id: 'quote-038-01',
        speakerId: 'person-018',
        speakerType: 'person',
        text: 'We are working around the clock to resolve these issues and get orders to customers as quickly as possible.'
      },
      {
        id: 'quote-038-02',
        speakerId: 'org-001',
        speakerType: 'organization',
        text: 'We cannot guarantee delivery times for orders placed over the weekend due to unprecedented demand.'
      }
    ],
    activities: [
      {
        id: 'activity-038-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'experienced',
        targetId: null,
        targetType: null,
        targetText: 'delivery system collapse under Black Friday demand'
      },
      {
        id: 'activity-038-02',
        actorId: 'person-019',
        actorType: 'person',
        action: 'acknowledged',
        targetId: null,
        targetType: null,
        targetText: 'delayed and missing customer orders'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.72 },
      'faction-005': { sentiment: -0.65 },
      'faction-006': { sentiment: 0.48 },
      'faction-014': { sentiment: -0.65 },
      'faction-016': { sentiment: -0.52 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-039',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/example/status/walmart-orders-stuck',
    publishedDate: '2025-11-30T10:00:00Z',
    publisherId: 'pub-x',
    title: 'Thousands of Walmart Orders Stuck in Transit [Social Media Thread]',
    author: '@frustrated_shopper',
    contentBlocks: [
      { type: 'paragraph', content: 'Thread: My Walmart Black Friday order has been "in transit" for 4 days with no updates. Hundreds of replies showing same issue. @Walmart customer service unreachable. #WalmartFail' }
    ],
    excerpt: 'Social media thread documents widespread Walmart delivery failures.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-023'],
    topicIds: ['topic-010'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: ['event-022'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.82 },
      'faction-014': { sentiment: -0.65 },
      'faction-016': { sentiment: -0.52 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-040',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-002'],
    url: 'https://www.reuters.com/business/walmart-ceo-apology-delivery',
    publishedDate: '2025-12-05T11:00:00Z',
    publisherId: 'pub-reuters',
    title: 'Walmart CEO Apologizes for Holiday Delivery Failures',
    author: 'Siddharth Cavale',
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart CEO Doug McMillon apologized for widespread delivery failures that left thousands of customers without their holiday orders.' },
      { type: 'paragraph', content: 'The company announced it would provide refunds and gift cards to affected customers, but critics said the response was insufficient.' }
    ],
    excerpt: 'Walmart CEO apologizes for widespread holiday delivery failures.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-023', 'sub-024'],
    topicIds: ['topic-010'],
    personIds: ['person-001', 'person-018'],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    eventIds: ['event-023'],
    quotes: [
      {
        id: 'quote-040-01',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'I want to personally apologize to every customer who was let down during the holiday season. This is not the service you expect from Walmart.'
      }
    ],
    activities: [
      {
        id: 'activity-040-01',
        actorId: 'person-001',
        actorType: 'person',
        action: 'apologized for',
        targetId: null,
        targetType: null,
        targetText: 'widespread holiday delivery failures'
      },
      {
        id: 'activity-040-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'refunds and gift cards for affected customers'
      },
      {
        id: 'activity-040-03',
        actorId: 'person-018',
        actorType: 'person',
        action: 'defended',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'company response to delivery crisis'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.58 },
      'faction-005': { sentiment: -0.42 },
      'faction-014': { sentiment: -0.65 },
      'faction-016': { sentiment: -0.52 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-041',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://www.tiktok.com/example/walmart-gift-late',
    publishedDate: '2025-12-10T15:00:00Z',
    publisherId: 'pub-tiktok',
    title: 'Customer Fury Mounts as Walmart Gifts Arrive Late [Viral Video]',
    author: {
      username: '@holiday_disaster',
      displayName: 'Holiday Disaster Stories',
      avatarUrl: 'https://i.pravatar.cc/150?u=holiday_disaster'
    },
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 72
    },
    transcription: 'Look at this. This is what arrived from Walmart today. An empty box. EMPTY. This was supposed to be my kids\' Christmas presents. I ordered two weeks ago. Guaranteed delivery by December 8th. It\'s now December 10th and I open this and there\'s NOTHING inside. The packing slip says three items but the box is completely empty. Customer service wait time? Three hours. This is unacceptable. My kids are going to have nothing under the tree because Walmart can\'t get their act together.',
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart sent me an EMPTY BOX for my kids\' Christmas presents 📦😭 3 hour wait for customer service #walmartfail #christmasruined #deliveryfail #holiday #storytime', portionMark: { classification: 'U', handling: '' } }
    ],
    excerpt: 'Viral video shows Walmart delivery failures impacting holiday gifts.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-023'],
    topicIds: ['topic-010'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.85 },
      'faction-014': { sentiment: -0.65 },
      'faction-016': { sentiment: -0.52 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-042',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://consumeraffairs.com/ftc-complaint-walmart-delivery',
    publishedDate: '2025-12-15T14:00:00Z',
    publisherId: 'pub-consumeraffairs',
    title: 'Consumer Groups File FTC Complaint Over Walmart Delivery',
    author: 'Mark Huffman',
    contentBlocks: [
      { type: 'paragraph', content: 'Consumer advocacy groups have filed an FTC complaint alleging Walmart made delivery promises it couldn\'t keep during the holiday season.' },
      { type: 'paragraph', content: 'The complaint seeks investigation into whether Walmart\'s advertising was deceptive.' }
    ],
    excerpt: 'Consumer groups file FTC complaint over Walmart delivery promises.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-024'],
    topicIds: ['topic-010'],
    personIds: ['person-007', 'person-022'],
    organizationIds: ['org-008', 'org-018'],
    locationIds: ['loc-006'],
    eventIds: ['event-024'],
    quotes: [
      {
        id: 'quote-042-01',
        speakerId: 'person-007',
        speakerType: 'person',
        text: 'Walmart made delivery promises it knew it couldn\'t keep. Consumers deserve protection from deceptive advertising.'
      },
      {
        id: 'quote-042-02',
        speakerId: 'person-022',
        speakerType: 'person',
        text: 'We will examine whether the company\'s holiday advertising constituted unfair or deceptive practices.'
      }
    ],
    activities: [
      {
        id: 'activity-042-01',
        actorId: 'org-008',
        actorType: 'organization',
        action: 'filed FTC complaint against',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'deceptive delivery promises'
      },
      {
        id: 'activity-042-02',
        actorId: 'org-018',
        actorType: 'organization',
        action: 'received complaint regarding',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'holiday delivery advertising practices'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.62 },
      'faction-004': { sentiment: 0.72 },
      'faction-014': { sentiment: -0.65 },
      'faction-016': { sentiment: -0.52 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-043',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.retaildive.com/walmart-delivery-system-failure',
    publishedDate: '2025-12-20T10:00:00Z',
    publisherId: 'pub-retaildive',
    title: 'How Walmart\'s Delivery System Failed During Peak Season',
    author: 'Ben Unglesbee',
    contentBlocks: [
      { type: 'paragraph', content: 'A Retail Dive analysis examines how Walmart\'s delivery infrastructure collapsed under holiday demand, causing widespread failures.' },
      { type: 'paragraph', content: 'Industry experts say the company underestimated online order volume and overcommitted on delivery promises.' }
    ],
    excerpt: 'Analysis: How Walmart\'s delivery system failed during peak season.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-023', 'sub-024'],
    topicIds: ['topic-010'],
    personIds: ['person-026'],
    organizationIds: ['org-001', 'org-022'],
    locationIds: [],
    eventIds: [],
    quotes: [
      {
        id: 'quote-043-01',
        speakerId: 'person-026',
        speakerType: 'person',
        text: 'Walmart underestimated online order volume and overcommitted on delivery promises. This was a preventable failure.'
      }
    ],
    activities: [
      {
        id: 'activity-043-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'experienced',
        targetId: null,
        targetType: null,
        targetText: 'delivery infrastructure collapse during peak season'
      },
      {
        id: 'activity-043-02',
        actorId: 'org-022',
        actorType: 'organization',
        action: 'analyzed',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'delivery system failures and infrastructure gaps'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: -0.52 },
      'faction-006': { sentiment: 0.45 },
      'faction-014': { sentiment: -0.65 },
      'faction-016': { sentiment: -0.52 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-044',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-003'],
    url: 'https://www.bloomberg.com/walmart-500m-delivery-investment',
    publishedDate: '2025-12-28T09:00:00Z',
    publisherId: 'pub-bloomberg',
    title: 'Walmart Announces $500M Investment in Delivery Infrastructure',
    author: 'Matthew Boyle',
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart announced a $500 million investment to upgrade its delivery infrastructure following widespread holiday season failures.' },
      { type: 'paragraph', content: 'The investment will expand fulfillment capacity and improve logistics technology.' }
    ],
    excerpt: 'Walmart pledges $500M investment to fix delivery infrastructure.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-024'],
    topicIds: ['topic-010'],
    personIds: ['person-001', 'person-019'],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    eventIds: ['event-025'],
    quotes: [
      {
        id: 'quote-044-01',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'We are making a significant investment to ensure this never happens again. Our customers deserve better.'
      },
      {
        id: 'quote-044-02',
        speakerId: 'person-019',
        speakerType: 'person',
        text: 'This investment will expand fulfillment capacity and dramatically improve our logistics technology.'
      }
    ],
    activities: [
      {
        id: 'activity-044-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: '$500 million investment in delivery infrastructure'
      },
      {
        id: 'activity-044-02',
        actorId: 'person-001',
        actorType: 'person',
        action: 'committed to',
        targetId: null,
        targetType: null,
        targetText: 'expanded fulfillment capacity and improved logistics'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.35 },
      'faction-005': { sentiment: 0.58 },
      'faction-014': { sentiment: -0.65 },
      'faction-016': { sentiment: -0.52 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-045',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/example/status/walmart-still-failing',
    publishedDate: '2026-01-02T14:00:00Z',
    publisherId: 'pub-x',
    title: 'Walmart Delivery Still Struggling as New Year Begins [Social Media]',
    author: '@still_waiting',
    contentBlocks: [
      { type: 'paragraph', content: 'Still waiting for my Dec 15 Walmart order. Customer service says "we\'re working on it." This company has completely lost my trust. Anyone else still stuck? #NeverAgainWalmart' }
    ],
    excerpt: 'Social media shows continued Walmart delivery issues into January.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-023'],
    topicIds: ['topic-010'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.72 },
      'faction-014': { sentiment: -0.65 },
      'faction-016': { sentiment: -0.52 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-046',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    tagIds: ['tag-003'],
    url: 'https://www.reuters.com/business/walmart-atlanta-union-victory',
    publishedDate: '2026-01-10T19:00:00Z',
    publisherId: 'pub-reuters',
    title: 'Historic: Atlanta Walmart Fulfillment Center Votes to Unionize',
    author: 'Howard Schneider',
    contentBlocks: [
      { type: 'paragraph', content: 'Workers at a Walmart e-commerce fulfillment center in Atlanta voted to join the RWDSU, marking the first successful union at a Walmart warehouse.' },
      { type: 'paragraph', content: 'Union leaders called the victory "a watershed moment for retail workers across America."' }
    ],
    excerpt: 'Atlanta Walmart fulfillment center becomes first to unionize.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-019'],
    topicIds: ['topic-009'],
    personIds: ['person-020', 'person-025'],
    organizationIds: ['org-016', 'org-001'],
    locationIds: ['loc-003'],
    eventIds: ['event-026'],
    quotes: [
      {
        id: 'quote-046-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'This is a watershed moment for retail workers across America. We have proven that Walmart workers can win.'
      },
      {
        id: 'quote-046-02',
        speakerId: 'person-025',
        speakerType: 'person',
        text: 'Workers stood up against one of the largest corporations in the world and won. This changes everything.'
      }
    ],
    activities: [
      {
        id: 'activity-046-01',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'won historic union vote at',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'Atlanta fulfillment center'
      },
      {
        id: 'activity-046-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'lost first union election at',
        targetId: null,
        targetType: null,
        targetText: 'e-commerce warehouse facility'
      },
      {
        id: 'activity-046-03',
        actorId: 'person-020',
        actorType: 'person',
        action: 'celebrated',
        targetId: null,
        targetType: null,
        targetText: 'first successful Walmart warehouse union'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.85 },
      'faction-003': { sentiment: 0.88 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-047',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.wsj.com/business/atlanta-union-vote-retail-impact',
    publishedDate: '2026-01-12T10:00:00Z',
    publisherId: 'pub-wsj',
    title: 'What the Atlanta Union Vote Means for Retail Workers',
    author: 'Sarah Nassauer',
    contentBlocks: [
      { type: 'paragraph', content: 'The successful union vote at Walmart\'s Atlanta fulfillment center could have ripple effects across the retail industry.' },
      { type: 'paragraph', content: 'Labor experts say the victory may inspire organizing efforts at other warehouses and retail facilities.' }
    ],
    excerpt: 'Analysis: Implications of first Walmart warehouse union victory.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-020'],
    topicIds: ['topic-009'],
    personIds: ['person-020'],
    organizationIds: ['org-016', 'org-001'],
    locationIds: ['loc-003'],
    eventIds: ['event-026'],
    quotes: [
      {
        id: 'quote-047-01',
        speakerId: 'person-020',
        speakerType: 'person',
        text: 'This victory may inspire organizing efforts at other warehouses and retail facilities across the country.'
      }
    ],
    activities: [
      {
        id: 'activity-047-01',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'analyzed implications of',
        targetId: null,
        targetType: null,
        targetText: 'first successful Walmart warehouse union'
      },
      {
        id: 'activity-047-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'faced pressure from',
        targetId: null,
        targetType: null,
        targetText: 'potential organizing at other facilities'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.72 },
      'faction-003': { sentiment: 0.78 },
      'faction-005': { sentiment: -0.35 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-048',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    url: 'https://www.bloomberg.com/walmart-new-worker-benefits',
    publishedDate: '2026-01-15T11:00:00Z',
    publisherId: 'pub-bloomberg',
    title: 'Walmart Responds to Union Victory With New Worker Benefits',
    author: 'Matthew Boyle',
    contentBlocks: [
      { type: 'paragraph', content: 'Following the historic union victory in Atlanta, Walmart announced new worker benefits including higher minimum wages and improved scheduling flexibility.' },
      { type: 'paragraph', content: 'Critics called the move an attempt to discourage further organizing by addressing worker concerns preemptively.' }
    ],
    excerpt: 'Walmart announces new benefits following Atlanta union victory.',
    narrativeIds: ['narr-009', 'narr-003'],
    themeIds: ['sub-008', 'sub-019'],
    topicIds: ['topic-009'],
    personIds: ['person-001'],
    organizationIds: ['org-001', 'org-016'],
    locationIds: ['loc-001'],
    eventIds: [],
    quotes: [
      {
        id: 'quote-048-01',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'We are committed to being a great employer and are announcing significant improvements to wages and scheduling flexibility.'
      },
      {
        id: 'quote-048-02',
        speakerId: 'org-016',
        speakerType: 'organization',
        text: 'These changes prove that organizing works. Workers only got these benefits because of the union threat.'
      }
    ],
    activities: [
      {
        id: 'activity-048-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'new worker benefits including higher wages and scheduling flexibility'
      },
      {
        id: 'activity-048-02',
        actorId: 'person-001',
        actorType: 'person',
        action: 'responded to',
        targetId: null,
        targetType: null,
        targetText: 'Atlanta union victory with benefit improvements'
      },
      {
        id: 'activity-048-03',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'criticized',
        targetId: 'org-001',
        targetType: 'organization',
        targetText: 'attempt to discourage further organizing'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: 0.45 },
      'faction-003': { sentiment: 0.52 },
      'faction-010': { sentiment: -0.25 },
      'faction-011': { sentiment: -0.72 }
    },
    highlights: [],
    comments: []
  },
  // New social media documents (doc-049 to doc-070)
  {
    id: 'doc-049',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://reddit.com/r/walmart/comments/checkout_horror',
    publishedDate: '2025-06-20T16:00:00Z',
    publisherId: 'pub-reddit',
    title: 'Reddit: Customer shares humiliating self-checkout experience',
    author: {
      username: 'u/just_shopping_2025',
      displayName: 'just_shopping_2025',
      avatarUrl: 'https://i.pravatar.cc/150?u=just_shopping_2025'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**Just got accused of theft at Walmart self-checkout - I had my receipt!**\n\nI\'ve shopped at this Walmart for 5 years. Today, loss prevention stopped me, demanded to check my bags, and kept me waiting for 20 minutes while they verified every item. I had my receipt. I paid for everything.\n\nThe worst part? Other customers were staring at me like I was a criminal. I\'ve never been so embarrassed. Is this happening to anyone else?' }
    ],
    excerpt: 'Reddit post about humiliating self-checkout detention experience.',
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001', 'sub-002'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.85 },
      'faction-004': { sentiment: -0.72 }
    },
    metrics: { likes: 12450, comments: 2850, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-050',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://tiktok.com/@momof3_shopping/video/empty_shelves',
    publishedDate: '2025-07-05T14:00:00Z',
    publisherId: 'pub-tiktok',
    title: 'TikTok: Mom documents consistently empty Walmart shelves',
    author: {
      username: '@momof3_shopping',
      displayName: 'Shopping Mom Life',
      avatarUrl: 'https://i.pravatar.cc/150?u=momof3_shopping'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Week 4 of no bread at Walmart 🍞❌ Had to go to THREE stores today #walmart #groceryshopping #outofstock #momlife #adulting', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 58
    },
    transcription: 'Week four of no bread at my local Walmart. I\'m not even asking for anything fancy, just basic sandwich bread! Had to drive to three different stores today just to finish my grocery list. This used to be so easy. One stop, everything on my list, done. Now? Empty shelves everywhere. The bread aisle, the dairy section, even the frozen food. What is happening at Walmart?',
    excerpt: 'TikTok documenting persistent out-of-stock issues at Walmart.',
    narrativeIds: ['narr-002'],
    themeIds: ['sub-004', 'sub-005'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: ['event-004'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.78 }
    },
    metrics: { views: 1850000, likes: 145000, shares: 52000, comments: 18500, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-051',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/retail_analyst/status/walmart_inventory',
    publishedDate: '2025-07-18T10:30:00Z',
    publisherId: 'pub-x',
    title: 'X thread: Retail analyst on Walmart inventory issues',
    author: {
      username: '@retail_analyst',
      displayName: 'Retail Industry Analysis',
      avatarUrl: 'https://i.pravatar.cc/150?u=retail_analyst'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'THREAD: Walmart\'s inventory management system is showing serious cracks 🧵\n\n1/ Out-of-stock complaints up 340% on social media vs last year\n2/ Their vaunted real-time inventory system has gaps competitors have fixed\n3/ Amazon and Target gaining ground\n4/ This threatens their core "always in stock" promise\n\nIs this the beginning of a bigger problem?' }
    ],
    excerpt: 'X thread analyzing Walmart inventory management challenges.',
    narrativeIds: ['narr-002'],
    themeIds: ['sub-004', 'sub-005'],
    personIds: ['person-010'],
    organizationIds: ['org-001', 'org-004'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.65 },
      'faction-005': { sentiment: 0.35 }
    },
    metrics: { likes: 5420, comments: 892, shares: 1850, platform: 'x' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-052',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://facebook.com/groups/walmart_workers_united/posts/staffing_crisis',
    publishedDate: '2025-08-02T18:00:00Z',
    publisherId: 'pub-facebook',
    title: 'Facebook: Worker group discusses staffing crisis',
    author: {
      username: 'walmart.worker.voices',
      displayName: 'Walmart Worker Voices',
      avatarUrl: 'https://i.pravatar.cc/150?u=walmart.worker.voices'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Current and former Walmart workers - share your stories about understaffing!\n\nI\'ll go first: I\'m scheduled to cover electronics, toys, AND sporting goods by myself tonight. We should have 4 people. Management says we\'re "fully staffed." 🙄\n\nShare your experiences. Our voices matter. #WalmartWorkers #RespectWalmartWorkers' }
    ],
    excerpt: 'Facebook post from worker group collecting understaffing stories.',
    narrativeIds: ['narr-003'],
    themeIds: ['sub-006', 'sub-007'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.82 },
      'faction-003': { sentiment: -0.75 }
    },
    metrics: { likes: 4850, comments: 1250, shares: 2100, platform: 'facebook' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-053',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://reddit.com/r/foodsafety/comments/great_value_recall',
    publishedDate: '2025-08-15T12:00:00Z',
    publisherId: 'pub-reddit',
    title: 'Reddit: Parents concerned about Great Value recall',
    author: {
      username: 'u/concerned_parent_2025',
      displayName: 'concerned_parent_2025',
      avatarUrl: 'https://i.pravatar.cc/150?u=concerned_parent_2025'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**Great Value recall expanded AGAIN - is anyone else worried about quality control?**\n\nThis is the third expansion of the frozen vegetable recall. Now 15 SKUs affected.\n\nI\'ve been buying Great Value products for years because of the price. But Listeria? With hospitalizations? I have young kids.\n\nIs it worth saving a few dollars if the quality control is this bad?' }
    ],
    excerpt: 'Reddit discussion about Great Value product recall and quality concerns.',
    narrativeIds: ['narr-004'],
    themeIds: ['sub-009', 'sub-010'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: ['event-009'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.88 }
    },
    metrics: { likes: 8920, comments: 2450, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-054',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://tiktok.com/@budget_shopper/video/price_compare',
    publishedDate: '2025-08-28T15:00:00Z',
    publisherId: 'pub-tiktok',
    title: 'TikTok: Price comparison Walmart vs competitors',
    author: {
      username: '@budget_shopper',
      displayName: 'Budget Shopping Tips',
      avatarUrl: 'https://i.pravatar.cc/150?u=budget_shopper'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Did the math: Walmart lost to Aldi on 14 out of 20 items 📊 "everyday low prices" where?? #walmart #aldi #costco #groceryshopping #savemoney #pricecomparison', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 124
    },
    transcription: 'Did the math so you don\'t have to! I compared twenty staple items at Walmart, Aldi, and Costco. Spoiler alert: Walmart is NOT the cheapest anymore on fourteen out of twenty items! Let me show you. Milk at Walmart three ninety-eight, at Aldi two eighty-nine. Bread, Walmart two forty-eight, Aldi one twenty-nine. Eggs, Walmart four twenty-eight, Aldi two ninety-nine. And it goes on. The everyday low prices? They\'re not so low anymore. Walmart used to be the place for budget shopping but those days are over.',
    excerpt: 'TikTok price comparison showing Walmart is no longer cheapest.',
    narrativeIds: ['narr-005'],
    themeIds: ['sub-011', 'sub-012'],
    personIds: [],
    organizationIds: ['org-001', 'org-010'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.72 },
      'faction-006': { sentiment: 0.55 }
    },
    metrics: { views: 5200000, likes: 385000, shares: 195000, comments: 62000, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-055',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/delivery_watch/status/walmart_delays',
    publishedDate: '2025-09-10T11:00:00Z',
    publisherId: 'pub-x',
    title: 'X post: Tracking Walmart delivery failures',
    author: {
      username: '@delivery_watch',
      displayName: 'Delivery Service Tracker',
      avatarUrl: 'https://i.pravatar.cc/150?u=delivery_watch'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Tracking Walmart delivery complaints this week:\n\n📦 Late deliveries: +45% vs last month\n🔄 Substitutions without notice: Common complaint\n🥬 Produce quality issues: Many reports\n📱 App showing "delivered" but no package: Still happening\n\nTarget hitting 98% on-time. Amazon next-day still reliable. Walmart+ subscribers asking: is it worth it?' }
    ],
    excerpt: 'X post tracking Walmart delivery service complaints.',
    narrativeIds: ['narr-006'],
    themeIds: ['sub-013', 'sub-014'],
    personIds: [],
    organizationIds: ['org-001', 'org-004'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.68 },
      'faction-006': { sentiment: 0.48 }
    },
    metrics: { likes: 3850, comments: 920, shares: 1450, platform: 'x' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-056',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://facebook.com/groups/small_town_missouri/posts/walmart_closing',
    publishedDate: '2025-09-25T09:00:00Z',
    publisherId: 'pub-facebook',
    title: 'Facebook: Rural town reacts to Walmart closure announcement',
    author: {
      username: 'missouri.community',
      displayName: 'Missouri Community Forum',
      avatarUrl: 'https://i.pravatar.cc/150?u=missouri.community'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Just heard the news - our Walmart is closing in 60 days. 😢\n\nThis is the only grocery store within 30 miles. When Walmart came in 15 years ago, they put all our local shops out of business. Now they\'re leaving us with NOTHING.\n\nWhat are we supposed to do? The elderly folks here can\'t drive an hour for groceries.\n\nIs anyone organizing the community meeting?' }
    ],
    excerpt: 'Facebook post about rural Missouri community losing its only Walmart.',
    narrativeIds: ['narr-007'],
    themeIds: ['sub-015', 'sub-016'],
    personIds: ['person-017'],
    organizationIds: ['org-001'],
    locationIds: ['loc-009'],
    eventIds: ['event-013'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.92 }
    },
    metrics: { likes: 2850, comments: 1420, shares: 950, platform: 'facebook' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-057',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://reddit.com/r/antiwork/comments/walmart_conditions',
    publishedDate: '2025-10-08T20:00:00Z',
    publisherId: 'pub-reddit',
    title: 'Reddit: Former Walmart worker shares working conditions',
    author: {
      username: 'u/ex_walmart_associate',
      displayName: 'ex_walmart_associate',
      avatarUrl: 'https://i.pravatar.cc/150?u=ex_walmart_associate'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**Quit Walmart after 3 years - here\'s what it\'s really like**\n\nScheduling: "Open availability" required but shifts change weekly\nStaffing: Doing 2-3 people\'s jobs for $14/hr\nManagement: Constant pressure to meet metrics that keep changing\nBreaks: Often interrupted or skipped during rushes\nBenefits: Health insurance costs almost my entire paycheck\n\nI finally got out. AMA about what it\'s really like behind the scenes.' }
    ],
    excerpt: 'Reddit AMA from former Walmart worker about working conditions.',
    narrativeIds: ['narr-003'],
    themeIds: ['sub-006', 'sub-007'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.85 },
      'faction-003': { sentiment: -0.78 }
    },
    metrics: { likes: 15420, comments: 3850, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-058',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://tiktok.com/@warehouse_life/video/fulfillment_center',
    publishedDate: '2025-10-22T17:00:00Z',
    publisherId: 'pub-tiktok',
    title: 'TikTok: Walmart fulfillment center worker shares day in the life',
    author: {
      username: '@warehouse_life',
      displayName: 'Warehouse Worker Diaries',
      avatarUrl: 'https://i.pravatar.cc/150?u=warehouse_life'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Day in my life at Walmart fulfillment center 📦 17 miles walked yesterday and they wonder why we want to unionize #warehouse #walmartlife #unionize #workersrights #dayinmylife', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 92
    },
    transcription: 'POV: You work at a Walmart fulfillment center during peak season. Walking fifteen plus miles a day. Handling three hundred plus packages. Ten minute breaks, and that includes the time it takes to walk to and from the break room. Constant pressure to meet rates. My watch says I walked seventeen miles yesterday. Seventeen miles. And they wonder why we want to unionize. This is what it looks like behind the scenes of your two-day delivery.',
    excerpt: 'TikTok showing Walmart fulfillment center working conditions.',
    narrativeIds: ['narr-009', 'narr-003'],
    themeIds: ['sub-008', 'sub-019'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-011'],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.75 },
      'faction-003': { sentiment: -0.68 }
    },
    metrics: { views: 3800000, likes: 285000, shares: 125000, comments: 42000, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-059',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/consumer_rights/status/great_value_investigation',
    publishedDate: '2025-11-05T14:00:00Z',
    publisherId: 'pub-x',
    title: 'X thread: Investigation into Great Value supplier practices',
    author: {
      username: '@consumer_rights',
      displayName: 'Consumer Rights Watch',
      avatarUrl: 'https://i.pravatar.cc/150?u=consumer_rights'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'THREAD: Our investigation into Great Value private label suppliers 🧵\n\n1/ Multiple suppliers have labor violations on record\n2/ FDA inspection failures at 3 facilities we identified\n3/ Walmart\'s price pressure creates conditions for cutting corners\n4/ The FTC is now involved\n\nFull report link in bio. This goes deeper than one recall.' }
    ],
    excerpt: 'X thread on investigation into Great Value supplier practices.',
    narrativeIds: ['narr-008', 'narr-004'],
    themeIds: ['sub-017', 'sub-018'],
    personIds: [],
    organizationIds: ['org-001', 'org-008'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.82 }
    },
    metrics: { likes: 8450, comments: 1850, shares: 4200, platform: 'x' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-060',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://facebook.com/groups/rural_america_voices/posts/food_desert',
    publishedDate: '2025-11-18T10:00:00Z',
    publisherId: 'pub-facebook',
    title: 'Facebook: Discussion of Walmart-created food deserts',
    author: {
      username: 'rural.voices.america',
      displayName: 'Rural America Voices',
      avatarUrl: 'https://i.pravatar.cc/150?u=rural.voices.america'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Let\'s talk about what happens when Walmart leaves small towns.\n\n1. Walmart comes in, undercuts local stores\n2. Local stores close\n3. Walmart becomes only option\n4. Walmart leaves when profits decline\n5. Town becomes food desert\n\nThis has happened to dozens of communities. When does corporate responsibility kick in?\n\nShare your town\'s story below. 👇' }
    ],
    excerpt: 'Facebook discussion about Walmart-created food deserts in rural America.',
    narrativeIds: ['narr-007'],
    themeIds: ['sub-015', 'sub-016'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-009'],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.88 }
    },
    metrics: { likes: 6850, comments: 2450, shares: 3200, platform: 'facebook' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-061',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://reddit.com/r/personalfinance/comments/walmart_prices',
    publishedDate: '2025-11-28T15:00:00Z',
    publisherId: 'pub-reddit',
    title: 'Reddit: Analysis shows Walmart kept pandemic price increases',
    author: {
      username: 'u/price_tracker_2025',
      displayName: 'price_tracker_2025',
      avatarUrl: 'https://i.pravatar.cc/150?u=price_tracker_2025'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**I\'ve been tracking Walmart prices for 3 years - here\'s what I found**\n\nStarted a spreadsheet in 2022 tracking 100 common items. Key findings:\n\n- 78% of pandemic-era price increases were kept even as wholesale costs dropped\n- "Rollback" prices often higher than pre-pandemic regular prices\n- Great Value items saw biggest % increases\n\nSpreadsheet in comments. "Everyday Low Prices" is marketing, not reality anymore.' }
    ],
    excerpt: 'Reddit analysis showing Walmart retained pandemic price increases.',
    narrativeIds: ['narr-005'],
    themeIds: ['sub-011', 'sub-012'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.75 },
      'faction-006': { sentiment: 0.62 }
    },
    metrics: { likes: 18500, comments: 4250, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-062',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://tiktok.com/@healthcare_access/video/walmart_health',
    publishedDate: '2025-10-18T13:00:00Z',
    publisherId: 'pub-tiktok',
    title: 'TikTok: Rural resident praises Walmart Health clinic',
    author: {
      username: '@healthcare_access',
      displayName: 'Healthcare Access Stories',
      avatarUrl: 'https://i.pravatar.cc/150?u=healthcare_access'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Our hospital closed and Walmart Health is the only option now - honestly it\'s been amazing 🏥 #ruralhealth #walmartHealth #healthcare #rurallife', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 78
    },
    transcription: 'Our hospital closed two years ago. The nearest doctor was forty-five minutes away. Then Walmart Health opened a clinic in our town and honestly? It\'s been amazing. Forty dollar checkups. They have dental. Even mental health services. I know people have feelings about big corporations but they\'re filling a gap that no one else would fill. For folks in rural areas like me, this is a lifeline. Say what you want about Walmart but they showed up when no one else did.',
    excerpt: 'TikTok praising Walmart Health clinic in rural area.',
    narrativeIds: ['narr-010'],
    themeIds: ['sub-020', 'sub-021'],
    personIds: [],
    organizationIds: ['org-001', 'org-019'],
    locationIds: ['loc-009'],
    eventIds: ['event-018'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-005': { sentiment: 0.72 }
    },
    metrics: { views: 2200000, likes: 165000, shares: 72000, comments: 28000, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-063',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/labor_news/status/union_vote_dallas',
    publishedDate: '2025-09-22T19:00:00Z',
    publisherId: 'pub-x',
    title: 'X post: Dallas fulfillment center union vote results',
    author: {
      username: '@labor_news',
      displayName: 'Labor Movement News',
      avatarUrl: 'https://i.pravatar.cc/150?u=labor_news'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'BREAKING: Dallas Walmart fulfillment center votes NO on union 52-48%\n\nIncredibly close. Workers cited fear of retaliation and promised benefit improvements.\n\nWalmart spent heavily on anti-union messaging in final weeks.\n\nThis fight isn\'t over. Atlanta vote coming in January. 📊' }
    ],
    excerpt: 'X post reporting narrow union vote defeat at Dallas fulfillment center.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-019'],
    personIds: ['person-020'],
    organizationIds: ['org-001', 'org-016'],
    locationIds: ['loc-011'],
    eventIds: ['event-019'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.55 },
      'faction-003': { sentiment: -0.48 }
    },
    metrics: { likes: 5850, comments: 1420, shares: 2800, platform: 'x' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-064',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://facebook.com/groups/frugal_living/posts/walmart_alternatives',
    publishedDate: '2025-12-02T11:00:00Z',
    publisherId: 'pub-facebook',
    title: 'Facebook: Frugal living group discusses Walmart alternatives',
    author: {
      username: 'frugal.life.tips',
      displayName: 'Frugal Living Community',
      avatarUrl: 'https://i.pravatar.cc/150?u=frugal.life.tips'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'I used to shop exclusively at Walmart for 10 years. Did a test month shopping at Aldi + Costco instead.\n\nResults: Saved $127 on groceries. Food quality was better. Shopping experience was less stressful.\n\nAnyone else made the switch? What alternatives work best in your area? 🛒💰' }
    ],
    excerpt: 'Facebook post about switching from Walmart to alternatives.',
    narrativeIds: ['narr-005'],
    themeIds: ['sub-011'],
    personIds: [],
    organizationIds: ['org-001', 'org-010'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.58 },
      'faction-006': { sentiment: 0.65 }
    },
    metrics: { likes: 8450, comments: 2850, shares: 1850, platform: 'facebook' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-065',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://reddit.com/r/legaladvice/comments/walmart_detention',
    publishedDate: '2025-12-10T14:00:00Z',
    publisherId: 'pub-reddit',
    title: 'Reddit: Legal advice on Walmart detention incident',
    author: {
      username: 'u/need_legal_help_2025',
      displayName: 'need_legal_help_2025',
      avatarUrl: 'https://i.pravatar.cc/150?u=need_legal_help_2025'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**Was detained at Walmart for 45 minutes, missed my flight - do I have a case?**\n\nLong story short: self-checkout flagged an item as not scanned (it was). LP detained me, verified my receipt, found nothing wrong, and let me go. But it took 45 minutes and I missed my flight.\n\n$800 flight gone. Lost business meeting. Can I sue? This seems like false imprisonment.\n\nTexas, if that matters.' }
    ],
    excerpt: 'Reddit legal advice request about extended Walmart detention.',
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001', 'sub-002'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.82 },
      'faction-004': { sentiment: -0.75 }
    },
    metrics: { likes: 9850, comments: 2150, platform: 'reddit' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-066',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://tiktok.com/@holiday_disasters/video/delivery_fail',
    publishedDate: '2025-12-12T16:00:00Z',
    publisherId: 'pub-tiktok',
    title: 'TikTok: Customer shows wrong items in holiday delivery',
    author: {
      username: '@holiday_disasters',
      displayName: 'Holiday Shopping Fails',
      avatarUrl: 'https://i.pravatar.cc/150?u=holiday_disasters'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Ordered toys, got cat food and someone else\'s PRESCRIPTION?? 😭 Walmart what is going on #walmartfail #christmasruined #deliveryfail #storytime', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 65
    },
    transcription: 'Ordered toys for my kids for Christmas from Walmart. Here\'s what arrived: cleaning supplies, cat food - I don\'t even have a cat - and someone else\'s prescription medication. My order is completely gone. The toys I ordered? Nowhere to be found. And customer service has a THREE HOUR wait time. Three hours! Christmas is in two weeks and I have nothing for my kids. Help!',
    excerpt: 'TikTok showing wrong items received in Walmart holiday delivery.',
    narrativeIds: ['narr-011', 'narr-006'],
    themeIds: ['sub-023', 'sub-024'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: ['event-022'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.92 }
    },
    metrics: { views: 4500000, likes: 320000, shares: 185000, comments: 52000, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-067',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://x.com/retail_workers_united/status/atlanta_win',
    publishedDate: '2026-01-10T21:00:00Z',
    publisherId: 'pub-x',
    title: 'X post: Celebrating Atlanta warehouse union victory',
    author: {
      username: '@retail_workers_united',
      displayName: 'Retail Workers United',
      avatarUrl: 'https://i.pravatar.cc/150?u=retail_workers_united'
    },
    contentBlocks: [
      { type: 'paragraph', content: '🎉 HISTORIC VICTORY 🎉\n\nAtlanta Walmart fulfillment center votes YES to unionize!\n\nThis is the FIRST successful Walmart warehouse union. Ever.\n\n58% voted yes. Workers cited:\n- Better scheduling\n- Safety concerns\n- Respect on the job\n\nThe tide is turning. Who\'s next? ✊' }
    ],
    excerpt: 'X post celebrating historic Atlanta Walmart warehouse union victory.',
    narrativeIds: ['narr-009'],
    themeIds: ['sub-019'],
    personIds: ['person-020', 'person-025'],
    organizationIds: ['org-001', 'org-016'],
    locationIds: ['loc-012'],
    eventIds: ['event-026'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: 0.85 },
      'faction-003': { sentiment: 0.78 }
    },
    metrics: { likes: 28500, comments: 4850, shares: 12500, platform: 'x' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-068',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://facebook.com/groups/holiday_shoppers/posts/delivery_complaints',
    publishedDate: '2025-12-18T09:00:00Z',
    publisherId: 'pub-facebook',
    title: 'Facebook: Holiday shoppers share delivery horror stories',
    author: {
      username: 'holiday.shopping.support',
      displayName: 'Holiday Shopping Support Group',
      avatarUrl: 'https://i.pravatar.cc/150?u=holiday.shopping.support'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Share your Walmart delivery horror stories from this holiday season! I\'ll start:\n\nOrdered Dec 1. "Guaranteed by Dec 15." Still not here on Dec 18. App says "in transit" for 10 days. Support says "please wait." Kids might not have presents under the tree. 💔\n\nLet\'s collect these stories - maybe if enough of us share, they\'ll actually fix the system.' }
    ],
    excerpt: 'Facebook post collecting holiday delivery complaint stories.',
    narrativeIds: ['narr-011'],
    themeIds: ['sub-023', 'sub-024'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    eventIds: ['event-022'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: -0.88 }
    },
    metrics: { likes: 12500, comments: 4850, shares: 3200, platform: 'facebook' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-069',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://tiktok.com/@union_strong/video/organizing_tips',
    publishedDate: '2026-01-12T18:00:00Z',
    publisherId: 'pub-tiktok',
    title: 'TikTok: Warehouse worker shares organizing tips after Atlanta win',
    author: {
      username: '@union_strong',
      displayName: 'Union Organizing Tips',
      avatarUrl: 'https://i.pravatar.cc/150?u=union_strong'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'How we won the first Walmart warehouse union ✊ Tips for workers thinking about organizing #union #workersrights #organizing #walmartworkers #labormovement', portionMark: { classification: 'U', handling: '' } }
    ],
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 118
    },
    transcription: 'How we won the first Walmart warehouse union. Tips for other workers thinking about organizing. Number one: Build relationships with your coworkers FIRST. Get to know people. Find out what issues matter to them. Number two: Keep conversations private until you have majority support. Management will try to shut you down the moment they find out. Number three: Document everything. Every policy violation, every unfair treatment. Number four: Don\'t let management scare you. They WILL try. They\'ll have meetings, they\'ll make threats, they\'ll promise changes. Stay strong. Number five: Contact established unions for help. We reached out to the Warehouse Workers Union and they guided us through the whole process. We did it. You can too.',
    excerpt: 'TikTok sharing organizing tips from Atlanta union victory.',
    narrativeIds: ['narr-009', 'narr-003'],
    themeIds: ['sub-019', 'sub-008'],
    personIds: [],
    organizationIds: ['org-016'],
    locationIds: ['loc-012'],
    eventIds: ['event-026'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: 0.82 },
      'faction-003': { sentiment: 0.75 }
    },
    metrics: { views: 5800000, likes: 425000, shares: 245000, comments: 68000, platform: 'tiktok' },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-070',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    url: 'https://reddit.com/r/walmart/comments/new_benefits_reaction',
    publishedDate: '2026-01-16T12:00:00Z',
    publisherId: 'pub-reddit',
    title: 'Reddit: Workers react to new benefits announcement',
    author: {
      username: 'u/walmart_associate_real',
      displayName: 'walmart_associate_real',
      avatarUrl: 'https://i.pravatar.cc/150?u=walmart_associate_real'
    },
    contentBlocks: [
      { type: 'paragraph', content: '**New Walmart benefits announced - here\'s what workers think**\n\nSo Walmart just announced higher minimum wage and better scheduling after the Atlanta union win. Thoughts:\n\n✅ Good: $2/hr raise in some markets\n✅ Good: More schedule flexibility\n❌ Bad: Clearly trying to stop more unions\n❌ Bad: Why did it take a union threat to get this?\n\nMixed feelings. What do other associates think? Is this enough or too little too late?' }
    ],
    excerpt: 'Reddit discussion of worker reactions to new Walmart benefits.',
    narrativeIds: ['narr-009', 'narr-003'],
    themeIds: ['sub-008', 'sub-019'],
    personIds: ['person-001'],
    organizationIds: ['org-001', 'org-016'],
    locationIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: 0.35 },
      'faction-003': { sentiment: 0.28 }
    },
    metrics: { likes: 8920, comments: 2450, platform: 'reddit' },
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
    title: 'Walmart Inc. - SEC 10-K Annual Filing 2025',
    publishedDate: '2026-01-15T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'Annual report filing showing Walmart Inc. corporate structure, major subsidiaries, and beneficial ownership.',
    personIds: ['person-001', 'person-002', 'person-024'],
    organizationIds: ['org-001', 'org-019'],
    locationIds: ['loc-001'],
    narrativeIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'Walmart Inc.',
      jurisdiction: 'Delaware',
      registrationNumber: '0000104169',
      incorporationDate: '1969-10-31',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: '702 SW 8th Street, Bentonville, AR 72716',
      beneficialOwners: ['Walton Family Holdings (48%)', 'Public Float (52%)'],
      directors: ['Doug McMillon', 'John Furner', 'John Rainey'],
      flags: []
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart Inc. annual SEC filing for fiscal year 2025. The company operates approximately 10,500 stores globally with revenues of $648 billion. Major subsidiaries include Walmart Health, Sam\'s Club, and Flipkart (India operations).' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-072',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Great Value Foods LLC - Delaware Registry',
    publishedDate: '2025-08-20T00:00:00Z',
    publisherId: 'pub-opencorp',
    excerpt: 'Corporate registry record for Great Value Foods LLC, the private label manufacturing subsidiary.',
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    narrativeIds: ['narr-004', 'narr-008'],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'corporate_record',
      source: 'Delaware Division of Corporations',
      companyName: 'Great Value Foods LLC',
      jurisdiction: 'Delaware',
      registrationNumber: 'DE-LLC-4521879',
      incorporationDate: '2008-03-15',
      status: 'active',
      entityType: 'llc',
      registeredAddress: '702 SW 8th Street, Bentonville, AR 72716',
      beneficialOwners: ['Walmart Inc. (100%)'],
      directors: [],
      flags: ['subsidiary']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Great Value Foods LLC is a wholly-owned subsidiary of Walmart Inc. responsible for coordinating private label food manufacturing. The entity serves as the contracting party for third-party food suppliers.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-073',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Greenfield Produce Co. - Supplier Investigation',
    publishedDate: '2025-11-10T00:00:00Z',
    publisherId: 'pub-opencorp',
    excerpt: 'Corporate records for Greenfield Produce Co., a Great Value supplier under investigation for labor practices.',
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: [],
    narrativeIds: ['narr-008'],
    eventIds: ['event-015', 'event-016'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.6 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'OpenCorporates',
      companyName: 'Greenfield Produce Co.',
      jurisdiction: 'California',
      registrationNumber: 'CA-C4892156',
      incorporationDate: '2015-06-22',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: '1200 Agricultural Way, Salinas, CA 93901',
      beneficialOwners: ['Rodriguez Family Trust (60%)', 'AgriVest Partners (40%)'],
      directors: ['Maria Rodriguez', 'James Chen'],
      flags: ['under_investigation']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Greenfield Produce Co. supplies frozen vegetables to Walmart\'s Great Value brand. The company is currently under FTC investigation following reports of labor violations at processing facilities.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-074',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Walmart Health LLC - Healthcare Subsidiary Filing',
    publishedDate: '2025-12-01T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'Corporate filing for Walmart Health LLC showing expansion into rural healthcare markets.',
    personIds: ['person-001'],
    organizationIds: ['org-001', 'org-019'],
    locationIds: ['loc-009', 'loc-010'],
    narrativeIds: ['narr-010'],
    eventIds: ['event-018', 'event-021'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: 0.5 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'Walmart Health LLC',
      jurisdiction: 'Delaware',
      registrationNumber: 'DE-LLC-7892341',
      incorporationDate: '2019-09-01',
      status: 'active',
      entityType: 'llc',
      registeredAddress: '702 SW 8th Street, Bentonville, AR 72716',
      beneficialOwners: ['Walmart Inc. (100%)'],
      directors: [],
      flags: ['healthcare', 'expansion']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart Health LLC operates healthcare clinics within Walmart stores. Filing shows planned expansion to 75 additional rural locations in 2026, targeting communities that have lost local hospital access.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-075',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Target Corporation - Competitor Analysis Record',
    publishedDate: '2026-01-10T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'SEC filing for Target Corporation, primary Walmart competitor in general merchandise.',
    personIds: [],
    organizationIds: ['org-003'],
    locationIds: [],
    narrativeIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'Target Corporation',
      jurisdiction: 'Minnesota',
      registrationNumber: '0000027419',
      incorporationDate: '1902-01-01',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: '1000 Nicollet Mall, Minneapolis, MN 55403',
      beneficialOwners: ['Public Float (100%)'],
      directors: ['Brian Cornell', 'Monica Lozano'],
      flags: ['competitor']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Target Corporation SEC filing showing FY2025 performance. Revenue of $109 billion with emphasis on urban and suburban markets. Company maintains different strategy than Walmart with focus on higher-margin merchandise.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-076',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Dollar General Corporation - Competitor Filing',
    publishedDate: '2025-11-15T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'Corporate filing for Dollar General, competitor in rural discount retail markets.',
    personIds: [],
    organizationIds: ['org-020'],
    locationIds: ['loc-009'],
    narrativeIds: ['narr-010'],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'Dollar General Corporation',
      jurisdiction: 'Tennessee',
      registrationNumber: '0000029534',
      incorporationDate: '1939-01-01',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: '100 Mission Ridge, Goodlettsville, TN 37072',
      beneficialOwners: ['Public Float (100%)'],
      directors: ['Todd Vasos', 'Michael Calbert'],
      flags: ['competitor', 'rural_retail']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Dollar General operates 19,000+ stores primarily in rural areas. The company directly competes with Walmart in underserved markets and has faced similar scrutiny over impact on rural communities and small businesses.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-077',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Merton & Associates - Law Firm Registry',
    publishedDate: '2025-06-01T00:00:00Z',
    publisherId: 'pub-opencorp',
    excerpt: 'Corporate registry for Merton & Associates, the law firm representing plaintiffs in Walmart class action.',
    personIds: ['person-008'],
    organizationIds: ['org-002'],
    locationIds: ['loc-002'],
    narrativeIds: ['narr-001'],
    eventIds: ['event-002'],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'corporate_record',
      source: 'Texas Secretary of State',
      companyName: 'Merton & Associates PLLC',
      jurisdiction: 'Texas',
      registrationNumber: 'TX-PLLC-0812456',
      incorporationDate: '2012-04-15',
      status: 'active',
      entityType: 'partnership',
      registeredAddress: '1100 Louisiana Street, Houston, TX 77002',
      beneficialOwners: ['Thomas Merton (Managing Partner)'],
      directors: ['Thomas Merton', 'Sarah Klein', 'David Park'],
      flags: ['law_firm', 'class_action']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Merton & Associates is the lead counsel for the class action lawsuit against Walmart regarding self-checkout theft accusations. The firm specializes in consumer protection and class action litigation.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-078',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'United Food Commercial Workers - Union Registration',
    publishedDate: '2025-10-20T00:00:00Z',
    publisherId: 'pub-opencorp',
    excerpt: 'Organizational registration for UFCW Local 1996, the union organizing Walmart workers.',
    personIds: [],
    organizationIds: ['org-016'],
    locationIds: ['loc-003'],
    narrativeIds: ['narr-009'],
    eventIds: ['event-020'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: 0.8 },
      'faction-003': { sentiment: 0.7 }
    },
    structuredData: {
      recordType: 'corporate_record',
      source: 'Department of Labor',
      companyName: 'UFCW Local 1996',
      jurisdiction: 'Georgia',
      registrationNumber: 'DOL-LM2-521896',
      incorporationDate: '1979-01-01',
      status: 'active',
      entityType: 'labor_organization',
      registeredAddress: '1850 Howell Mill Road NW, Atlanta, GA 30318',
      beneficialOwners: [],
      directors: ['Steve Lomax', 'Maria Gonzalez'],
      flags: ['labor_union']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'UFCW Local 1996 successfully organized workers at Walmart\'s Atlanta fulfillment center, the first successful union certification at a Walmart facility. The local represents approximately 250 Walmart workers.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-079',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'CVS Health Corporation - Competitor Healthcare Filing',
    publishedDate: '2025-12-15T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'SEC filing for CVS Health, competitor in pharmacy and retail healthcare services.',
    personIds: [],
    organizationIds: ['org-021'],
    locationIds: [],
    narrativeIds: ['narr-010'],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'CVS Health Corporation',
      jurisdiction: 'Delaware',
      registrationNumber: '0000064803',
      incorporationDate: '1963-01-01',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: '1 CVS Drive, Woonsocket, RI 02895',
      beneficialOwners: ['Public Float (100%)'],
      directors: ['Karen Lynch', 'Roger Farah'],
      flags: ['competitor', 'healthcare']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'CVS Health operates MinuteClinic locations that compete with Walmart Health. The company has significant overlap in rural pharmacy services and is a key competitor in the retail healthcare expansion space.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-080',
    documentType: 'corporate_record',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Instacart Holdings - Delivery Partner Filing',
    publishedDate: '2025-09-01T00:00:00Z',
    publisherId: 'pub-sec-edgar',
    excerpt: 'Corporate filing for Instacart, Walmart delivery services partner and competitor.',
    personIds: [],
    organizationIds: ['org-022'],
    locationIds: [],
    narrativeIds: ['narr-011'],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'corporate_record',
      source: 'SEC EDGAR',
      companyName: 'Maplebear Inc. (d/b/a Instacart)',
      jurisdiction: 'Delaware',
      registrationNumber: '0001579091',
      incorporationDate: '2012-06-01',
      status: 'active',
      entityType: 'corporation',
      registeredAddress: '50 Beale Street, San Francisco, CA 94105',
      beneficialOwners: ['Public Float (100%)'],
      directors: ['Fidji Simo', 'Frank Slootman'],
      flags: ['delivery_partner']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Instacart provides grocery delivery services for multiple retailers including Walmart competitors. The company\'s network of gig workers has been cited in discussions about Walmart\'s own delivery workforce challenges.' }
    ],
    highlights: [],
    comments: []
  },

  // ============================================
  // Structured Data - Political Finance
  // ============================================
  {
    id: 'doc-081',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Walmart Inc. PAC - Q4 2025 FEC Filing',
    publishedDate: '2026-01-05T00:00:00Z',
    publisherId: 'pub-fec',
    excerpt: 'FEC quarterly filing for Walmart Inc. Political Action Committee showing $2.3M in contributions.',
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-006'],
    narrativeIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'political_finance',
      source: 'FEC',
      filingId: 'FEC-2025-Q4-WMT-PAC',
      filingType: 'pac_quarterly',
      reportingPeriod: '2025-Q4',
      filer: 'Walmart Inc. Political Action Committee',
      amount: 2300000,
      currency: 'USD',
      recipients: ['Various Congressional candidates'],
      issuesLobbied: [],
      flags: []
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart Inc. PAC Q4 2025 filing shows $2.3M in disbursements to congressional candidates. Contributions were split approximately 55% Republican, 45% Democrat, focusing on members of Commerce and Labor committees.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-082',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Retail Industry Leaders Association - Lobbying Disclosure',
    publishedDate: '2026-01-10T00:00:00Z',
    publisherId: 'pub-lda',
    excerpt: 'Senate LDA filing for RILA lobbying on labor and supply chain issues, with Walmart as major member.',
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-006'],
    narrativeIds: ['narr-009'],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: 0.3 }
    },
    structuredData: {
      recordType: 'political_finance',
      source: 'Senate LDA',
      filingId: 'LDA-2025-Q4-RILA',
      filingType: 'lobbying_report',
      reportingPeriod: '2025-Q4',
      filer: 'Retail Industry Leaders Association',
      client: 'Retail Industry Leaders Association (self)',
      amount: 850000,
      currency: 'USD',
      issuesLobbied: ['Labor Law', 'PRO Act Opposition', 'Supply Chain'],
      agenciesLobbied: ['Senate', 'House', 'DOL'],
      lobbyists: ['Michael Hanson', 'Jennifer Walsh'],
      flags: []
    },
    contentBlocks: [
      { type: 'paragraph', content: 'RILA Q4 2025 lobbying disclosure shows $850K spent on lobbying activities. Key issues include opposition to PRO Act provisions and advocacy for supply chain flexibility. Walmart is RILA\'s largest member company.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-083',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Walmart Government Relations - FDA Lobbying Q4',
    publishedDate: '2026-01-08T00:00:00Z',
    publisherId: 'pub-lda',
    excerpt: 'Lobbying disclosure for Walmart\'s direct engagement with FDA on food safety regulations.',
    personIds: ['person-006'],
    organizationIds: ['org-001', 'org-007'],
    locationIds: ['loc-006', 'loc-007'],
    narrativeIds: ['narr-004'],
    eventIds: ['event-008', 'event-009'],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'political_finance',
      source: 'Senate LDA',
      filingId: 'LDA-2025-Q4-WMT-FDA',
      filingType: 'lobbying_report',
      reportingPeriod: '2025-Q4',
      filer: 'Walmart Inc.',
      client: 'Walmart Inc. (self)',
      amount: 420000,
      currency: 'USD',
      issuesLobbied: ['Food Safety', 'FDA Regulations', 'Product Recall Procedures'],
      agenciesLobbied: ['FDA', 'House Energy and Commerce'],
      lobbyists: ['Robert Chen', 'Amanda Foster'],
      flags: ['food_safety']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart\'s Q4 lobbying on FDA issues totaled $420K, focusing on food safety regulations and recall procedures following the Great Value product recalls. Lobbying included direct engagement with FDA leadership and Congressional oversight committees.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-084',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'FTC Commissioner Campaign Contributions Analysis',
    publishedDate: '2025-12-20T00:00:00Z',
    publisherId: 'pub-fec',
    excerpt: 'Analysis of campaign contributions to legislators involved in FTC oversight, relevant to Walmart FTC inquiry.',
    personIds: ['person-022'],
    organizationIds: ['org-001', 'org-018'],
    locationIds: ['loc-006'],
    narrativeIds: ['narr-008'],
    eventIds: ['event-016'],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'political_finance',
      source: 'FEC',
      filingId: 'FEC-ANALYSIS-2025-FTC',
      filingType: 'contribution',
      reportingPeriod: '2024-2025',
      filer: 'Walmart Inc. PAC',
      amount: 175000,
      currency: 'USD',
      recipients: ['Senate Commerce Committee Members', 'House Judiciary Committee Members'],
      issuesLobbied: [],
      flags: ['ftc_oversight']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart PAC contributed $175K to members of Congressional committees with FTC oversight during the period when FTC opened inquiry into supplier practices. Contributions were distributed to both parties.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-085',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'UFCW COPE - Pro-Labor PAC Filing',
    publishedDate: '2026-01-12T00:00:00Z',
    publisherId: 'pub-fec',
    excerpt: 'FEC filing for UFCW political action committee supporting pro-labor candidates.',
    personIds: [],
    organizationIds: ['org-016'],
    locationIds: ['loc-006'],
    narrativeIds: ['narr-009'],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: 0.8 },
      'faction-003': { sentiment: 0.7 }
    },
    structuredData: {
      recordType: 'political_finance',
      source: 'FEC',
      filingId: 'FEC-2025-Q4-UFCW-COPE',
      filingType: 'pac_quarterly',
      reportingPeriod: '2025-Q4',
      filer: 'UFCW Active Ballot Club',
      amount: 1850000,
      currency: 'USD',
      recipients: ['Pro-labor Congressional candidates'],
      issuesLobbied: [],
      flags: ['labor_pac']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'UFCW\'s political action committee reported $1.85M in Q4 2025 disbursements, primarily to candidates supporting labor rights legislation. The PAC has increased spending following the successful Walmart Atlanta unionization.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-086',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Rural Healthcare Advocacy Coalition - Lobbying Filing',
    publishedDate: '2025-12-15T00:00:00Z',
    publisherId: 'pub-lda',
    excerpt: 'Lobbying disclosure for coalition including Walmart Health advocating for rural healthcare policy.',
    personIds: [],
    organizationIds: ['org-001', 'org-019'],
    locationIds: ['loc-006', 'loc-009'],
    narrativeIds: ['narr-010'],
    eventIds: ['event-018'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: 0.4 }
    },
    structuredData: {
      recordType: 'political_finance',
      source: 'Senate LDA',
      filingId: 'LDA-2025-Q4-RHAC',
      filingType: 'lobbying_report',
      reportingPeriod: '2025-Q4',
      filer: 'Rural Healthcare Advocacy Coalition',
      client: 'Rural Healthcare Advocacy Coalition',
      amount: 320000,
      currency: 'USD',
      issuesLobbied: ['Rural Healthcare Access', 'Telehealth', 'Medicare Reimbursement'],
      agenciesLobbied: ['Senate HELP Committee', 'HHS', 'CMS'],
      lobbyists: ['Patricia Moore', 'James Wilson'],
      flags: ['healthcare']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'The Rural Healthcare Advocacy Coalition, which includes Walmart Health among its members, spent $320K lobbying for policies supporting rural healthcare access. Key issues include telehealth reimbursement and support for retail clinic models.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-087',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'National Retail Federation - Trade Policy Lobbying',
    publishedDate: '2025-11-30T00:00:00Z',
    publisherId: 'pub-lda',
    excerpt: 'NRF lobbying disclosure on tariffs and trade policy affecting retail supply chains.',
    personIds: [],
    organizationIds: ['org-001', 'org-003', 'org-004'],
    locationIds: ['loc-006'],
    narrativeIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'political_finance',
      source: 'Senate LDA',
      filingId: 'LDA-2025-Q3-NRF',
      filingType: 'lobbying_report',
      reportingPeriod: '2025-Q3',
      filer: 'National Retail Federation',
      client: 'National Retail Federation',
      amount: 1200000,
      currency: 'USD',
      issuesLobbied: ['Tariffs', 'Trade Policy', 'Supply Chain', 'Import Regulations'],
      agenciesLobbied: ['USTR', 'Commerce', 'Senate Finance', 'House Ways and Means'],
      lobbyists: ['David French', 'Stephanie Martz'],
      flags: ['trade']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'NRF\'s Q3 2025 lobbying focused heavily on trade policy with $1.2M spent. Walmart, Target, and Amazon are major NRF members. Key issues included tariff policy on consumer goods and supply chain regulatory relief.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-088',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Consumer Safety Coalition - Product Safety Lobbying',
    publishedDate: '2025-12-05T00:00:00Z',
    publisherId: 'pub-lda',
    excerpt: 'Consumer advocacy coalition lobbying on product safety regulations following retail recalls.',
    personIds: [],
    organizationIds: ['org-007'],
    locationIds: ['loc-006'],
    narrativeIds: ['narr-004'],
    eventIds: ['event-008'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: 0.5 }
    },
    structuredData: {
      recordType: 'political_finance',
      source: 'Senate LDA',
      filingId: 'LDA-2025-Q4-CSC',
      filingType: 'lobbying_report',
      reportingPeriod: '2025-Q4',
      filer: 'Consumer Safety Coalition',
      client: 'Consumer Safety Coalition',
      amount: 180000,
      currency: 'USD',
      issuesLobbied: ['Product Safety', 'FDA Authority', 'Recall Procedures'],
      agenciesLobbied: ['FDA', 'CPSC', 'Senate HELP Committee'],
      lobbyists: ['Elizabeth Warren campaign alum', 'Nancy Chen'],
      flags: ['consumer_protection']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Consumer advocacy groups spent $180K lobbying for stronger product safety regulations following the Great Value recalls. Lobbying focused on expanding FDA authority and improving recall notification procedures.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-089',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Walmart Executives - Individual Political Contributions',
    publishedDate: '2025-12-31T00:00:00Z',
    publisherId: 'pub-fec',
    excerpt: 'FEC records of individual contributions from Walmart executives to political campaigns.',
    personIds: ['person-001', 'person-002', 'person-024'],
    organizationIds: ['org-001'],
    locationIds: [],
    narrativeIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'political_finance',
      source: 'FEC',
      filingId: 'FEC-INDIV-2025-WMT-EXEC',
      filingType: 'contribution',
      reportingPeriod: '2025',
      filer: 'Individual Contributors (Walmart Executives)',
      amount: 425000,
      currency: 'USD',
      recipients: ['Various candidates and PACs'],
      issuesLobbied: [],
      flags: ['executive_contributions']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart executives made $425K in individual political contributions during 2025. CEO Doug McMillon, President John Furner, and CFO John Rainey were among the largest contributors. Contributions showed bipartisan distribution.' }
    ],
    highlights: [],
    comments: []
  },
  {
    id: 'doc-090',
    documentType: 'political_finance',
    repositoryId: 'repo-struct',
    classification: 'U',
    title: 'Arkansas Congressional Delegation - Walmart District Contributions',
    publishedDate: '2026-01-02T00:00:00Z',
    publisherId: 'pub-fec',
    excerpt: 'Analysis of Walmart PAC contributions to Arkansas delegation, company\'s home state representatives.',
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    narrativeIds: [],
    eventIds: [],
    quotes: [],
    activities: [],
    factionMentions: {},
    structuredData: {
      recordType: 'political_finance',
      source: 'FEC',
      filingId: 'FEC-AR-DELEGATION-2025',
      filingType: 'contribution',
      reportingPeriod: '2024-2025',
      filer: 'Walmart Inc. PAC',
      amount: 285000,
      currency: 'USD',
      recipients: ['Sen. John Boozman', 'Sen. Tom Cotton', 'Rep. Steve Womack', 'Rep. Rick Crawford'],
      issuesLobbied: [],
      flags: ['home_state']
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Walmart PAC contributed $285K to Arkansas Congressional delegation over the 2024-2025 cycle. As the state\'s largest employer, Walmart maintains strong relationships with Arkansas representatives on both sides of the aisle.' }
    ],
    highlights: [],
    comments: []
  }
];
