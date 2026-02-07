/**
 * Documents for Walmart Brand dataset
 * Includes news articles, social posts, and internal documents.
 *
 * Document metadata: migrated piece by piece from raw data.txt into each
 * document's `metadata` object (field id → value or values from raw data).
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
    metadata: {
      classification: 'CUI',
      confidence_level: 'high',
      discoverer: 'Paul Wild',
      discovery_date: '1978-01-06',
      moon: 'dark side',
      notam_series_id: 'A2545/25',
      operation_name: 'Operation Northern Shield',
      orbit_period: '6.4 years',
      originator: '18th SIGINT BDE',
      target_region: 'Zaporizhzhia',
      type: 'comet',
      user: 'jjansen@primer.ai',
      AOR: 'Test AOR',
      cable_classification: 'UNCLASSIFIED',
      cable_classification_plain: 'Unclassified - No classification required',
      container_type: 'post',
      num_likes: 0,
      vendor_id: 'moreover',
      "Message Type": 'Locator',
      Authors: 'and Karolina Hird',
      Axis: 'East',
      Category: 'SAR',
      "Content Category": 'sudan_war',
      "Data Source Name": '2025-Apr-Map-Demo-1',
      "Document PM": 'FAKE//LES',
      "Document Scope": 'general',
      "Document Type": 'Campaign Assessment',
      "Extracted Communication Device": 'ab 481 military equipment category 1',
      Oblast: 'Donetsk Oblast',
      "Page Type": 'page',
      Platform: 'facebook',
      "Publication Type": 'Academic',
      Region: 'donetsk',
      "Report Type": 'Russia Offensive Campaign Assessment',
      "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas',
      "Section Name": 'Donetsk Oblast',
      "Section Type": 'strikes',
      Status: 'current',
      "Title PM": 'FAKE//LIES',
      "Top Language": 'tr',
      "Tweet Newline Removal Experimental Group": 'control',
      "Tweet Newline Removal Topic": 'charlie-kirk',
      "Tweet Parent Merging Experimental Group": 'control',
      "Tweet Parent Merging Topic": 'charlie-kirk'
    , "Extracted Animal": ['agamidae', 'algo', 'american badger', 'anger bear', 'animal'], "Extracted Currency": ['$$$', '$0', '$0.002', '$0.004', '$0.01'], "Extracted Date Time Mention": ['1 day', '1 hour', '1 month', '1 week', '1 year'], "Extracted Disease": ['-hd', 'abuse', 'acc', 'achiness', 'acute myeloid leukemia'], "Extracted Facility": ['abortion clinics', 'air bases', 'airbase', 'airfield', 'airfields'], "Extracted Incident": ['1987 south africa floods', '2022 conference', 'accidents', 'acquisition', 'activities'], "Extracted Locations": ['Afghanistan', 'Africa', 'America', 'Argentina', 'Asia'], "Extracted Miscellaneous": ['a2op', 'ai', 'analyze', 'api', 'arxiv'], "Extracted Organism": ['a2op', 'ac-2', 'alpine', 'anthrax', 'anysrc-1242'], "Extracted Substance": ['a2op', 'alcohol', 'aml12v2', 'apple sauce', 'argon2'], "Extracted Vehicle": ['570s', 'aircraft', 'aircraft carrier', 'airplane', 'amphibious ships'], "Extracted Weapon": ['\'guns', '-guided (tow) missile launcher', '-ship missile', '100 mm shell supplies', '105 mm ammunition'], Label: ['label', 'a2op', 'admin', 'alembic', 'architecture'], Space: ['2023 Company-wide Progress Updates', 'API Team', 'AWS Marketplace KB', 'Analyze', 'Andrew Le'], "Space Key": ['2CPU', 'A2', 'AM', 'AMK', 'ANZ'] },
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
    metadata: { AOR: 'Test AOR', cable_classification: 'UNCLASSIFIED', cable_classification_plain: 'Unclassified - No classification required', container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'and ??', Axis: 'North', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'ISW', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'apple iphone x', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Consumer', Region: 'kharkiv', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and advance into Dnipropetrovsk Oblast', "Section Name": 'Kharkiv Oblast', "Section Type": 'regime', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tl', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['arachnida', 'asian giant hornet', 'asiatic stink badgers', 'baby', 'baby bear'], "Extracted Currency": ['$0.022', '$0.03', '$0.05', '$0.10', '$0.5'], "Extracted Date Time Mention": ['15 minutes', '2 days', '2 hours', '2 weeks', '2 years'], "Extracted Disease": ['aids', 'aids lives', 'aids virus', 'alcoholism', 'alert fatigue'], "Extracted Facility": ['amac market lugbe abuja', 'angelic care hospital and maternity', 'apartment', 'apartment building', 'army base'], "Extracted Incident": ['airstrikes', 'armed conflict', 'assault', 'attack', 'attacked'], "Extracted Locations": ['Beijing', 'Belarus', 'Belgium', 'Bolivia', 'Brazil'], "Extracted Miscellaneous": ['azure', 'big20', 'boolean', 'chinese', 'command'], "Extracted Organism": ['apple', 'apples', 'argocd', 'babybear', 'bacteria'], "Extracted Substance": ['bilstm', 'biofuel', 'blood gold', 'cannabis', 'carbon'], "Extracted Vehicle": ['armored personnel carrier', 'armored personnel carriers', 'armored vehicle', 'armoured combat vehicles', 'armoured personnel carrier'], "Extracted Weapon": ['105mm cannon', '120-millimeter gun', '120-mm artillery shells', '120-mm rifled gun', '120mm'], Label: ['bugs', 'ceremonies', 'cloudformation', 'confluence', 'convention'], Space: ['Army On-Prem', 'Azure Migration', 'Baptiste Henríquez', 'Ben Hammel', 'Bernadette Essalou'], "Space Key": ['CDC', 'CIBOT', 'CORE', 'CS', 'CULT'] },

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
    metadata: { AOR: 'Test AOR', cable_classification: 'UNCLASSIFIED', cable_classification_plain: 'Unclassified - No classification required', container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'William Runkel', Axis: 'South', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'Test Data', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'automated', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Corporate', Region: 'luhansk', "Report Type": 'SIGINT', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and possibly advance into Dnipropetrovsk Oblast', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'overview', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ru', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['babyfrog', 'balaenoptera musculus', 'bear-papa bear', 'bee', 'beef'], "Extracted Currency": ['$1 cent', '$1 million', '$1,000', '$1,500', '$1.00'], "Extracted Date Time Mention": ['2005', '2008', '2010', '2011', '2012'], "Extracted Disease": ['anger', 'anomaly', 'anti-hd', 'anxiety', 'apple/qualcomm'], "Extracted Facility": ['base', 'battlefield', 'battlefields', 'bridge', 'bridges'], "Extracted Incident": ['battle', 'battles', 'bombing', 'campaign', 'cease-fire'], "Extracted Locations": ['California', 'Canada', 'Chile', 'China', 'Colombia'], "Extracted Miscellaneous": ['data', 'data explorer', 'data model', 'datadog', 'db'], "Extracted Organism": ['bart t2t', 'bdd', 'bert', 'bilstms', 'bluehole'], "Extracted Substance": ['carbon-fiber', 'cbds', 'chemical substance', 'chlorhexadol', 'cilium'], "Extracted Vehicle": ['attack helicopters', 'b-52', 'battle tank', 'bayraktar tb2', 'bicycle'], "Extracted Weapon": ['130mm main gun', '137f138', '142 high mobility artillery rocket system', '152mm shells', '155 mm caesar cannon'], Label: ['data-science', 'databases', 'datasets', 'decision', 'decisions'], Space: ['Brian Moss', 'CI BOT', 'CORE', 'Cindy Ma', 'Cody'], "Space Key": ['DEVOPS', 'DIS', 'DTIC', 'E', 'ENG'] },

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
    metadata: { AOR: 'Test AOR', cable_classification: 'UNCLASSIFIED', cable_classification_plain: 'Unclassified - No classification required', container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'Samuel Shafiro', Axis: 'East', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'confluence', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'burner phone', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Government', Region: 'northern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donecatsk Oblast', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'kinetic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'no-lang', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['bird', 'blue fish', 'bot', 'bots', 'brown'], "Extracted Currency": ['$1.6mil', '$10', '$10,000', '$10,000 usd', '$10/1k'], "Extracted Date Time Mention": ['2015', '2016', '2017', '2018', '2019'], "Extracted Disease": ['atitis b', 'avian influenza', 'bas-hepatitis b', 'bdd', 'biological weapon'], "Extracted Facility": ['cafes', 'camp', 'checkpoint', 'checkpoints', 'church'], "Extracted Incident": ['civil unrest', 'civil war', 'clashes', 'cold war', 'collision'], "Extracted Locations": ['Dubai', 'Egypt', 'El Salvador', 'England', 'Ethiopia'], "Extracted Miscellaneous": ['dev', 'docker', 'document', 'dsta', 'dtic'], "Extracted Organism": ['carrots', 'cdws', 'cdws be', 'celery', 'chatgpt'], "Extracted Substance": ['co2', 'coal', 'cobalt', 'cocaine', 'copper'], "Extracted Vehicle": ['bomber', 'bradley armored vehicles', 'caesar 8×8 self-propelled howitzers', 'camels', 'car'], "Extracted Weapon": ['155-mm caesar artillery', '155mm ammunition', '155mm rounds', '155mm self-propelled howitzers', '155mm136f137 artillery pieces'], Label: ['delta-3', 'demo', 'design-decision', 'development', 'devops'], Space: ['Customer Engineering', 'Customer Success', 'Dan Handley', 'David Hayden', 'Deepti Winston'], "Space Key": ['FDE', 'FI', 'GLOBAL', 'GOV', 'HAL0'] },

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
    metadata: { AOR: 'Test AOR', container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'Olivia Gibson', Axis: 'North', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'The Secret Adversary', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'cel', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Journal', Region: 'southern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Regime Issues', "Section Type": 'force_generation', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'pt', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['camels', 'canidae', 'capra hircus', 'carnivoran mammals', 'cat'], "Extracted Currency": ['$100,000', '$1000', '$100k', '$10k', '$10m'], "Extracted Date Time Mention": ['2021', '2022', '2023', '2024', '2025'], "Extracted Disease": ['blood clot to', 'burn', 'burns', 'cancer', 'cholera'], "Extracted Facility": ['clinics', 'college', 'college campuses', 'conference rooms', 'court'], "Extracted Incident": ['conference', 'conflict', 'conflicts', 'coup', 'crash'], "Extracted Locations": ['France', 'Gaza', 'Georgia', 'Germany', 'Ghana'], "Extracted Miscellaneous": ['english', 'etl', 'facebook', 'fe', 'fedstart'], "Extracted Organism": ['corn', 'coronavirus', 'coronaviruses', 'covid', 'covid-19'], "Extracted Substance": ['cui', 'd2', 'delta 2', 'delta 3', 'delta2'], "Extracted Vehicle": ['civilian', 'civilian vehicle', 'civilian vehicles', 'combat aircraft', 'combat drones'], "Extracted Weapon": ['20-mm gun', '25 mm ammunition', '25 mm m242 bushmaster chain gun', '25-millimeter ammunition', '25-millimeter cannon'], Label: ['draft', 'ds', 'dsrp', 'dtic', 'dtic-data'], Space: ['Delta', 'Delta 3.0', 'DevOps', 'Dhruv Soni', 'Elisabeth Reuben'], "Space Key": ['IT', 'LIG', 'LPP', 'LS', 'MAR'] },

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
    metadata: { container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'Nate Trotter', Axis: 'South', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'he Murder on the Links', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'cell', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Miscellaneous', Region: 'donetsk', "Report Type": 'SIGINT', "Russian Objective": 'Create defensible buffer zones in Sumy Oblast along the international border', "Section Name": 'Russian Force Generation', "Section Type": 'diplomatic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'multiple', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['cats', 'cattle', 'centroid', 'cervidae', 'cetacea'], "Extracted Currency": ['$1200', '$134m', '$15', '$15 billion', '$150'], "Extracted Date Time Mention": ['27 september 2023', '3 days', '3 months', '3 weeks', '30 days'], "Extracted Disease": ['coronavirus', 'covid-19', 'cybersecurity', 'death', 'deaths'], "Extracted Facility": ['displacement camps', 'dock', 'educational institution', 'elevator', 'embassy of russia in nigeria'], "Extracted Incident": ['crisis', 'cyber attack', 'cyberattacks', 'darfur conflict', 'data science guild meeting'], "Extracted Locations": ['Hong Kong', 'Hungary', 'India', 'Indonesia', 'Iran'], "Extracted Miscellaneous": ['flashpoint', 'g2', 'github', 'global', 'gpt'], "Extracted Organism": ['cucumber', 'cui', 'cujs', 'cypress', 'delta 3'], "Extracted Substance": ['diamond', 'diamonds', 'diesel', 'dpo', 'dpo/ppo'], "Extracted Vehicle": ['drone attacks', 'drone strikes', 'drones', 'electric car', 'electric vehicle'], "Extracted Weapon": ['air-to-air missiles', 'airbags', 'ak-47', 'ammunition', 'anti-tank missiles'], Label: ['elasticsearch', 'erd', 'es', 'excluded-sources', 'featured'], Space: ['Entities', 'Experience', 'FINANCE', 'Fab Lab', 'Gary Desmond Foubister'], "Space Key": ['MLOPS', 'MLP', 'MO', 'PA', 'PAUTO'] },

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
    metadata: { container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'Jennie Olmsted', Axis: 'East', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'dod-administrative-instructions', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'cell phone', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Local', Region: 'kharkiv', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'Top Line', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ca', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['chihuahua', 'chimpanzees', 'chiroptera', 'cicada', 'cloud hopper'], "Extracted Currency": ['$1k', '$1m', '$2', '$2 billion', '$2 trillion'], "Extracted Date Time Mention": ['5 minutes', '5min', '6 months', '7 days', '90 days'], "Extracted Disease": ['diabetes', 'disease', 'diseases', 'disorder', 'domestic violence'], "Extracted Facility": ['field hospitals', 'fugees', 'garages', 'garrisons', 'grandes rousses tunnel'], "Extracted Incident": ['drought', 'dssg meetup', 'dsta tech summit', 'election', 'elections'], "Extracted Locations": ['Israel', 'Italy', 'Japan', 'Kazakhstan', 'Kenya'], "Extracted Miscellaneous": ['jira', 'json', 'k8s', 'kafka', 'kibana'], "Extracted Organism": ['dvc', 'ebs-csi', 'edible mushroom', 'education in the knowledge society', 'erica'], "Extracted Substance": ['drugs', 'dtic', 'dtic/delta3', 'dtictr', 'e5sv2'], "Extracted Vehicle": ['fighter', 'four-by-four vehicles', 'french', 'french fighter jets', 'fuel tanks'], "Extracted Weapon": ['artillery attack', 'artillery shelling', 'artillery strikes', 'atacms missiles', 'ballistic missile'], Label: ['functional_review', 'fundraising', 'howto', 'jira', 'jirareport'], Space: ['Human Resources', 'INFRA', 'IT Operations', 'John Bohannon', 'John Jansen'], "Space Key": ['PRIM', 'PRISEC', 'PROTO', 'PX', 'QA'] },

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
    metadata: { container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'Jessica Sobieski', Axis: 'North', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'law enforcement reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'cell phones', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Organisation', Region: 'luhansk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border and approach to within tube artillery range of Sumy City', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'Supporting Effort - Southern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'cs', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['cow', 'cyber berkut', 'daemon', 'dairy cows', 'dinosaurs'], "Extracted Currency": ['$2.5 billion', '$20', '$20 billion', '$20,000', '$200'], "Extracted Date Time Mention": ['april', 'april 2023', 'daily', 'daily air', 'day'], "Extracted Disease": ['famine', 'fatigue', 'foodborne illness', 'genocide', 'global warming'], "Extracted Facility": ['hampton by hilton kuwait salmiya', 'headquarters', 'highway', 'highways', 'home'], "Extracted Incident": ['event communications', 'events', 'experiment', 'explosion', 'explosions'], "Extracted Locations": ['London', 'Los Angeles', 'Malaysia', 'Mexico', 'Middle East'], "Extracted Miscellaneous": ['linkedin', 'llm', 'mdm', 'medium', 'ml'], "Extracted Organism": ['flan xl', 'flowering', 'flowers', 'flux', 'fruit'], "Extracted Substance": ['fentanyl', 'flan', 'flan-t5', 'flan-t5-xl', 'flan-xl'], "Extracted Vehicle": ['helicopters', 'humvee', 'iaf aircraft crash', 'iaf chopper crash', 'infantry fighting vehicle'], "Extracted Weapon": ['battlefield nuclear weapons', 'bomb', 'bullet', 'car bomb', 'cartridge'], Label: ['kb-troubleshooting-article', 'keep', 'keepandupdate', 'labeling', 'lakaye121'], Space: ['José Pablo Parajeles', 'Karla Martínez', 'Kit Stoecker', 'Kompute', 'LightTag'], "Space Key": ['REC', 'SCIENCE', 'SER', 'SFO', 'SO'] },

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
    metadata: { container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'Justin Young', Axis: 'South', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev-v2', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'cellphone', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'National', Region: 'northern', "Report Type": 'SIGINT', "Russian Objective": 'Cross the Oskil River in Kharkiv Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Zaporizhia Oblast', "Section Type": 'Supporting Effort - Northern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'en', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['dogfood', 'dogs', 'domestic short-haired cat', 'donkey', 'duck'], "Extracted Currency": ['$200k', '$20k', '$21k', '$25', '$250'], "Extracted Date Time Mention": ['december', 'every day', 'february', 'first time', 'friday'], "Extracted Disease": ['hallucination', 'hallucinations', 'headache', 'heartache', 'hiv'], "Extracted Facility": ['hospitals', 'hotel', 'hotel room', 'hotels', 'house'], "Extracted Incident": ['failures', 'famine', 'fire', 'fires', 'flood'], "Extracted Locations": ['Moscow', 'Myanmar', 'Netherlands', 'New York', 'New Zealand'], "Extracted Miscellaneous": ['mvp', 'naspers', 'nel', 'ner', 'nlp'], "Extracted Organism": ['george bush', 'gpt', 'gpt 3.5', 'gpt 4', 'gpt-2'], "Extracted Substance": ['g2', 'g2-onprem', 'g2_ss', 'gas', 'gold'], "Extracted Vehicle": ['leopard 2 battle tanks', 'leopard 2 tanks', 'leopard tanks', 'light vehicles', 'm113 armored personnel carriers'], "Extracted Weapon": ['communication devices', 'conventional', 'cruise missiles', 'cyber weapons', 'electronic warfare equipment'], Label: ['machine', 'meeting-notes', 'metadata', 'microsoft', 'migrations'], Space: ['ML Developer Experience', 'Machine Learning Operations', 'Marketing', 'Marketing Operations & Sales Development', 'Martin Horn'], "Space Key": ['TDM', 'THREAD', 'UKENG', 'UX', 'WMPR'] },

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
    metadata: { container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'Karolina Hird', Axis: 'East', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'cellphones', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Press Wire', Region: 'southern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Maintain frontline positions and secure rear areas against Ukrainian strikes', "Section Name": 'Donetsk Oblast', "Section Type": 'Subordinate Main Effort #3 - Donetsk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'es', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['electric panda', 'elephantidae', 'eloquent panda', 'emissary panda', 'ensenene'], "Extracted Currency": ['$2m', '$3 billion', '$3.5 billion', '$3.5 million', '$3.5m'], "Extracted Date Time Mention": ['july', 'june', 'last 24 hours', 'last 30 days', 'last 7 days'], "Extracted Disease": ['illness', 'infected', 'infection', 'infectious disease', 'injuries'], "Extracted Facility": ['kenkin chuzaikan jimusho', 'libraries', 'market', 'medical facility', 'military base'], "Extracted Incident": ['hackathon 2022', 'herodotus event', 'hostilities', 'incident', 'incidents'], "Extracted Locations": ['Norway', 'Oman', 'Pakistan', 'Paraguay', 'Paris'], "Extracted Miscellaneous": ['org', 'overview', 'poc', 'postgres', 'postgresql'], "Extracted Organism": ['gpt-3.5', 'gpt-4', 'gpt-4-0613', 'gpt-4o', 'gpt-j'], "Extracted Substance": ['gpt 4', 'gpt-2', 'gpt-3', 'gpt-3.5', 'gpt-4'], "Extracted Vehicle": ['mclaren artura', 'mclaren artura plug-in hybrid', 'mclaren artura plug-in hybrid supercar', 'mclaren gt', 'mclaren road car'], "Extracted Weapon": ['generators', 'gun', 'guns', 'gunshots', 'hand grenade'], Label: ['models', 'monitor-sharing', 'must-have', 'naming', 'needs-love'], Space: ['Noah Vaughn Randolph', 'Oliver Rivas', 'Olivier Le Floch', 'On Prem Global', 'PlatformExperience'], "Space Key": ['joseph', '~113287679', '~349473687', '~425645408', '~437799606'] },

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
    metadata: { container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'Karolina Hird with Veronica Iredale', Axis: 'North', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'testing-waikato-external-workflows', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'computer', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Trade', Region: 'donetsk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Maintain frontline positions, secure rear areas against Ukrainian strikes, and advance within tube artillery range of Zaporizhzhia City', "Section Name": 'Kharkiv Oblast', "Section Type": 'Subordinate Main Effort #2 - Luhansk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'fr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['fish', 'formicidae', 'fox', 'frills and owls', 'frog'], "Extracted Currency": ['$300,000', '$300k', '$3m', '$4', '$400'], "Extracted Date Time Mention": ['last year', 'march', 'may', 'monday', 'month'], "Extracted Disease": ['jewish disabilities', 'lynch syndrome', 'mal de meleda', 'malaria', 'malnutrition'], "Extracted Facility": ['museum', 'nursing home', 'office', 'oil refinery', 'park'], "Extracted Incident": ['investigation', 'iraq war', 'israel-hamas conflict', 'massacre', 'massacres'], "Extracted Locations": ['Poland', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore'], "Extracted Miscellaneous": ['python', 'qes', 'reddit', 'redis', 'relex'], "Extracted Organism": ['gpt4', 'grass', 'grpc', 'gunicorn', 'llm'], "Extracted Substance": ['gpt3.5', 'gpt4', 'gpt4o', 'green copper', 'hydrate'], "Extracted Vehicle": ['mercedes-benz s-class', 'mi-8', 'mi-8mt', 'military aircraft', 'military chopper crash'], "Extracted Weapon": ['hypersonic missile', 'hypersonic missiles', 'improvised explosive device', 'kinzhal hypersonic missiles', 'knife'], Label: ['off_boarding', 'offboarding', 'okrs', 'okta', 'on_boarding'], Space: ['Primer Classification', 'Primer Security', 'PrimerAdmin', 'Product Management', 'Prototype Registry'], "Space Key": ['~5570587cc24388670d41b0a9f6b75d13a0adce', '~557058a6d36c04f637473d9738cdea4947dfb1', '~582938503', '~5a3d61fae30920121a4933be', '~5babd8ebb6a5385ea27485eb'] },

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
    metadata: { container_type: 'post', num_likes: 0, vendor_id: 'moreover' , Authors: 'Kateryna Stepanenko', Axis: 'South', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'test-olivier-2025-06-20', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'computers', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Academic', Region: 'kharkiv', "Report Type": 'SIGINT', "Russian Objective": 'Push Ukrainian forces back from the international border to create a defensible buffer zone with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'Subordinate Main Effort #1 - Kharkiv', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'id', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['horse', 'house cat', 'insect', 'jellyfish', 'lamb'], "Extracted Currency": ['$44 billion', '$5', '$5 million', '$50', '$500'], "Extracted Date Time Mention": ['next week', 'november', 'october', 'one day', 'past week'], "Extracted Disease": ['mental health', 'miscarriage', 'mlh1', 'mortality', 'mpox'], "Extracted Facility": ['presidential palace', 'prison', 'public schools', 'refugee camps', 'residential'], "Extracted Incident": ['military campaign', 'mission', 'natural disasters', 'operation', 'operations'], "Extracted Locations": ['South China Sea', 'South Korea', 'Spain', 'Switzerland', 'Sydney'], "Extracted Miscellaneous": ['saml', 'search', 'searchdb', 'semantic', 'semantic search'], "Extracted Organism": ['naspers', 'ner', 'nlx', 'oranges', 'pinot'], "Extracted Substance": ['iac', 'mcla', 'minerals', 'natural gas', 'oxygen'], "Extracted Vehicle": ['mveh', 'nimr ajban apcs', 'pt-91s', 'self-propelled caesar howitzers', 'ship'], "Extracted Weapon": ['m4', 'machete', 'machine gun', 'military weapons', 'missile'], Label: ['process', 'projectplan', 'qalex', 'query', 'realtime'], Space: ['Quicksilver2', 'Recruiting', 'Russell Cardullo', 'Sales Engineering', 'Sales Ops'], "Space Key": ['~5d1d0a5fca72d00d24ba075a', '~5d8d410dc343800dbc03927b', '~5e2a0e4d0fa3a90c9eb72842', '~5f34266d8d89e30046267649', '~5fa9842442ab3b006eae5940'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Kateryna Stepanenko with Nate Trotter', Axis: 'East', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'test-delete-docs', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'fuel-air explosive', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Consumer', Region: 'luhansk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Push Ukrainian forces back from the international border with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'Main Effort - Eastern Ukraine', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'it', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['monkey', 'owl', 'papa bear', 'papabear', 'pets'], "Extracted Currency": ['$5m', '10k', '120k-200k', '1k', '1m'], "Extracted Date Time Mention": ['saturday', 'september', 'sunday', 'this week', 'this year'], "Extracted Disease": ['pandemic', 'poverty', 'pregnancy loss', 'rabies', 'ransomware'], "Extracted Facility": ['road', 'road network', 'roads', 'school', 'school building'], "Extracted Incident": ['protests', 'rebellion', 'recession', 'russia-ukraine war', 'sicw'], "Extracted Locations": ['Texas', 'Thailand', 'Turkey', 'U.S', 'UAE'], "Extracted Miscellaneous": ['sprint', 'sql', 'tagger', 'tbd', 'telegram'], "Extracted Organism": ['potatoes', 'ppo', 'quicksilver', 'rag-v', 'rice'], "Extracted Substance": ['primer (leawood, kan.)', 'primer-core', 'primer-nlx', 'pvc', 'pvcs'], "Extracted Vehicle": ['sport utility vehicle', 'submarine', 'switchblade drones', 't-64s', 't-72'], "Extracted Weapon": ['nuclear weapon', 'patriot air defence missiles', 'pistol', 'radar', 'rocket fire'], Label: ['relex', 'requirements', 'research', 'resource-sharing', 'retrospective'], Space: ['Services', 'Stories', 'Tal Perry', 'Technical Program Management', 'Thread'], "Space Key": ['~613a4128a4f86e00696a5a3b', '~616280103', '~6164a585198b4f0068d0ec66', '~6179d52c25f3130070d7ffb0', '~61f90e82f51e850070882c1d'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Kateryna Stepanenko with Veronica Iredale', Axis: 'North', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'source_name', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'imo 5041786', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Corporate', Region: 'northern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas', "Section Name": 'Regime Issues', "Section Type": 'Key Takeaways', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'de', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['pirate panda', 'primate', 'puppy', 'release geese', 'snake'], "Extracted Currency": ['3.5m', '500', '50k', '600k', '60m'], "Extracted Date Time Mention": ['tomorrow', 'tuesday', 'two weeks', 'wednesday', 'week'], "Extracted Disease": ['sick', 'slavery', 'starvation', 'stress', 'stroke'], "Extracted Facility": ['store', 'stores', 'street', 'streets', 'train station'], "Extracted Incident": ['strike', 'summit', 'terrorism', 'test', 'the crisis'], "Extracted Locations": ['USA', 'Ukraine', 'United Kingdom', 'United States', 'Venezuela'], "Extracted Miscellaneous": ['triton', 'twitter', 'vpn', 'wikidata', 'wikipedia'], "Extracted Organism": ['tf-idf', 'toadstools', 'tree', 'trees', 'trojans'], "Extracted Substance": ['silver', 'sugar', 'tf-idf', 'trecms', 'triton'], "Extracted Vehicle": ['t-84s', 'tank', 'tanks', 'train', 'truck'], "Extracted Weapon": ['shrapnel', 'tactical nuclear weapon', 'tesla t4 gpu', 'tomahawk cruise missiles', 'weapon'], Label: ['s3', 'search', 'searchdb', 'software_approval', 'story'], Space: ['UX Design', 'Walmart', 'Website', 'Yonder', 'daniel.olmstead'], "Space Key": ['~7120206418068270374cb7a5e5eba82da4660a', '~71202089db19c3a64348ae9ac97ecc0d1c5240', '~7120208d6cebbce2e44151bb08761f1dd89580', '~712020bd682501cf254000ac8effbbbb527e88', '~712020ed2462fc268b4f85816599ed33f98e54'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Kateryna Stepanenko with William Runkel', Axis: 'South', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'social', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'instant', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Government', Region: 'southern', "Report Type": 'SIGINT', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and advance into Dnipropetrovsk Oblast', "Section Name": 'Russian Force Generation', "Section Type": 'strikes', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['violets', 'animal_100', 'animal_102', 'animal_104', 'animal_106'], "Extracted Currency": ['sgd 350k', '$792.691', 'GBP 86.26', '$935.686', 'AUD 12.10'], "Extracted Date Time Mention": ['year', '11 week', '13 month', '15 year', '17 minute'], "Extracted Disease": ['virus', 'disease_100', 'disease_102', 'disease_104', 'disease_106'], "Extracted Facility": ['warehouse', 'facility_100', 'facility_102', 'facility_104', 'facility_106'], "Extracted Incident": ['war', 'incident_100', 'incident_101', 'incident_102', 'incident_103'], "Extracted Locations": ['White House', 'Switzerland (region 100)', 'Taiwan (region 102)', 'Tanzania (region 104)', 'Togo (region 106)'], "Extracted Miscellaneous": ['yaml', 'batch0', 'query2', 'schema4', 'view6'], "Extracted Organism": ['worms', 'organism_100', 'organism_102', 'organism_104', 'organism_106'], "Extracted Substance": ['water', 'substance_100', 'substance_102', 'substance_104', 'substance_106'], "Extracted Vehicle": ['vessel', 'vehicle_100', 'vehicle_102', 'vehicle_104', 'vehicle_106'], "Extracted Weapon": ['weapons', 'weapon_100', 'weapon_102', 'weapon_104', 'weapon_106'], Label: ['template', 'tickets', 'label_101', 'label_102', 'label_103'], Space: ['leila.khalili', 'space_100', 'space_102', 'space_104', 'space_106'], "Space Key": ['~943939812', 'spacekey_100', 'spacekey_102', 'spacekey_104', 'spacekey_106'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Misha Simakovskyy', Axis: 'East', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'news', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'iot devices', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Journal', Region: 'donetsk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and possibly advance into Dnipropetrovsk Oblast', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'regime', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tl', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_112', 'animal_114', 'animal_116', 'animal_118', 'animal_120'], "Extracted Currency": ['$421.733', 'KRW 58.14', '$467.565', 'ZAR 8.37', '$575.137'], "Extracted Date Time Mention": ['23 week', '25 month', '27 year', '29 minute', '1 day (100)'], "Extracted Disease": ['disease_112', 'disease_114', 'disease_116', 'disease_118', 'disease_120'], "Extracted Facility": ['facility_112', 'facility_114', 'facility_116', 'facility_118', 'facility_120'], "Extracted Incident": ['incident_106', 'incident_107', 'incident_108', 'incident_109', 'incident_110'], "Extracted Locations": ['Uruguay (region 112)', 'Venezuela (region 114)', 'Yemen (region 116)', 'Zimbabwe (region 118)', 'Algeria (region 120)'], "Extracted Miscellaneous": ['io12', 'log14', 'alert16', 'trace18', 'error20'], "Extracted Organism": ['organism_112', 'organism_114', 'organism_116', 'organism_118', 'organism_120'], "Extracted Substance": ['substance_112', 'substance_114', 'substance_116', 'substance_118', 'substance_120'], "Extracted Vehicle": ['vehicle_112', 'vehicle_114', 'vehicle_116', 'vehicle_118', 'vehicle_120'], "Extracted Weapon": ['weapon_112', 'weapon_114', 'weapon_116', 'weapon_118', 'weapon_120'], Label: ['label_106', 'label_107', 'label_108', 'label_109', 'label_110'], Space: ['space_112', 'space_114', 'space_116', 'space_118', 'space_120'], "Space Key": ['spacekey_112', 'spacekey_114', 'spacekey_116', 'spacekey_118', 'spacekey_120'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Nicole Wolkov', Axis: 'North', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'user-upload', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'ipad', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Miscellaneous', Region: 'kharkiv', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donecatsk Oblast', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'overview', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ru', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_126', 'animal_128', 'animal_130', 'animal_132', 'animal_134'], "Extracted Currency": ['AUD 34.66', '$118.330', 'DKK 75.18', '$216.077', 'KRW 38.48'], "Extracted Date Time Mention": ['4 hours', '5 week', '6 weeks', '7 month', '8 months'], "Extracted Disease": ['disease_126', 'disease_128', 'disease_130', 'disease_132', 'disease_134'], "Extracted Facility": ['facility_126', 'facility_128', 'facility_130', 'facility_132', 'facility_134'], "Extracted Incident": ['incident_113', 'incident_114', 'incident_115', 'incident_116', 'incident_117'], "Extracted Locations": ['Belgium (region 126)', 'Benin (region 128)', 'Bosnia (region 130)', 'Bulgaria (region 132)', 'Burundi (region 134)'], "Extracted Miscellaneous": ['dev26', 'ml28', 'data30', 'test32', 'deploy34'], "Extracted Organism": ['organism_126', 'organism_128', 'organism_130', 'organism_132', 'organism_134'], "Extracted Substance": ['substance_126', 'substance_128', 'substance_130', 'substance_132', 'substance_134'], "Extracted Vehicle": ['vehicle_126', 'vehicle_128', 'vehicle_130', 'vehicle_132', 'vehicle_134'], "Extracted Weapon": ['weapon_126', 'weapon_128', 'weapon_130', 'weapon_132', 'weapon_134'], Label: ['label_113', 'label_114', 'label_115', 'label_116', 'label_117'], Space: ['space_126', 'space_128', 'space_130', 'space_132', 'space_134'], "Space Key": ['spacekey_126', 'spacekey_128', 'spacekey_130', 'spacekey_132', 'spacekey_134'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Lea Corticchiato', Axis: 'South', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'navy intel reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'ipad/laptop', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Local', Region: 'luhansk', "Report Type": 'SIGINT', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Zaporizhia Oblast', "Section Type": 'kinetic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'no-lang', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_140', 'animal_142', 'animal_144', 'animal_146', 'animal_148'], "Extracted Currency": ['$73.920', 'GBP 93.72', '$738.886', 'AUD 80.21', '$881.389'], "Extracted Date Time Mention": ['11 minute', '12 minutes', '13 day', '14 days', '15 hour'], "Extracted Disease": ['disease_140', 'disease_142', 'disease_144', 'disease_146', 'disease_148'], "Extracted Facility": ['facility_140', 'facility_142', 'facility_144', 'facility_146', 'facility_148'], "Extracted Incident": ['incident_120', 'incident_121', 'incident_122', 'incident_123', 'incident_124'], "Extracted Locations": ['Costa Rica (region 140)', 'Cuba (region 142)', 'Czech Republic (region 144)', 'Ecuador (region 146)', 'Ethiopia (region 148)'], "Extracted Miscellaneous": ['sync40', 'stream42', 'index44', 'model46', 'repo48'], "Extracted Organism": ['organism_140', 'organism_142', 'organism_144', 'organism_146', 'organism_148'], "Extracted Substance": ['substance_140', 'substance_142', 'substance_144', 'substance_146', 'substance_148'], "Extracted Vehicle": ['vehicle_140', 'vehicle_142', 'vehicle_144', 'vehicle_146', 'vehicle_148'], "Extracted Weapon": ['weapon_140', 'weapon_142', 'weapon_144', 'weapon_146', 'weapon_148'], Label: ['label_120', 'label_121', 'label_122', 'label_123', 'label_124'], Space: ['space_140', 'space_142', 'space_144', 'space_146', 'space_148'], "Space Key": ['spacekey_140', 'spacekey_142', 'spacekey_144', 'spacekey_146', 'spacekey_148'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Karolina Hird with Nate Trotter', Axis: 'East', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": '2025-Apr-Map-Demo-1', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'ipads', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Organisation', Region: 'northern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Create defensible buffer zones in Sumy Oblast along the international border', "Section Name": 'Donetsk Oblast', "Section Type": 'force_generation', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'pt', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_154', 'animal_156', 'animal_158', 'animal_160', 'animal_162'], "Extracted Currency": ['KRW 34.86', '$786.126', 'ZAR 32.01', '$694.271', 'GBP 78.58'], "Extracted Date Time Mention": ['18 weeks', '19 month', '20 months', '21 year', '22 years'], "Extracted Disease": ['disease_154', 'disease_156', 'disease_158', 'disease_160', 'disease_162'], "Extracted Facility": ['facility_154', 'facility_156', 'facility_158', 'facility_160', 'facility_162'], "Extracted Incident": ['incident_127', 'incident_128', 'incident_129', 'incident_130', 'incident_131'], "Extracted Locations": ['Greece (region 154)', 'Guinea (region 156)', 'Honduras (region 158)', 'Iceland (region 160)', 'Iran (region 162)'], "Extracted Miscellaneous": ['run54', 'monitor56', 'metric58', 'debug60', 'warn62'], "Extracted Organism": ['organism_154', 'organism_156', 'organism_158', 'organism_160', 'organism_162'], "Extracted Substance": ['substance_154', 'substance_156', 'substance_158', 'substance_160', 'substance_162'], "Extracted Vehicle": ['vehicle_154', 'vehicle_156', 'vehicle_158', 'vehicle_160', 'vehicle_162'], "Extracted Weapon": ['weapon_154', 'weapon_156', 'weapon_158', 'weapon_160', 'weapon_162'], Label: ['label_127', 'label_128', 'label_129', 'label_130', 'label_131'], Space: ['space_154', 'space_156', 'space_158', 'space_160', 'space_162'], "Space Key": ['spacekey_154', 'spacekey_156', 'spacekey_158', 'spacekey_160', 'spacekey_162'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Misha Simanovskyy', Axis: 'North', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'ISW', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'iphone', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'National', Region: 'southern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border', "Section Name": 'Kharkiv Oblast', "Section Type": 'diplomatic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'multiple', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_168', 'animal_170', 'animal_172', 'animal_174', 'animal_176'], "Extracted Currency": ['$573.723', 'DKK 74.56', '$82.496', 'KRW 77.72', '$202.137'], "Extracted Date Time Mention": ['25 day', '26 days', '27 hour', '28 hours', '29 week'], "Extracted Disease": ['disease_168', 'disease_170', 'disease_172', 'disease_174', 'disease_176'], "Extracted Facility": ['facility_168', 'facility_170', 'facility_172', 'facility_174', 'facility_176'], "Extracted Incident": ['incident_134', 'incident_135', 'incident_136', 'incident_137', 'incident_138'], "Extracted Locations": ['Kenya (region 168)', 'Kyrgyzstan (region 170)', 'Latvia (region 172)', 'Liberia (region 174)', 'Lithuania (region 176)'], "Extracted Miscellaneous": ['ops68', 'ai70', 'code72', 'build74', 'config76'], "Extracted Organism": ['organism_168', 'organism_170', 'organism_172', 'organism_174', 'organism_176'], "Extracted Substance": ['substance_168', 'substance_170', 'substance_172', 'substance_174', 'substance_176'], "Extracted Vehicle": ['vehicle_168', 'vehicle_170', 'vehicle_172', 'vehicle_174', 'vehicle_176'], "Extracted Weapon": ['weapon_168', 'weapon_170', 'weapon_172', 'weapon_174', 'weapon_176'], Label: ['label_134', 'label_135', 'label_136', 'label_137', 'label_138'], Space: ['space_168', 'space_170', 'space_172', 'space_174', 'space_176'], "Space Key": ['spacekey_168', 'spacekey_170', 'spacekey_172', 'spacekey_174', 'spacekey_176'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Karolina Hird with William Runkel', Axis: 'South', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'Test Data', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'iphone 10', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Press Wire', Region: 'donetsk', "Report Type": 'SIGINT', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border and approach to within tube artillery range of Sumy City', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'Top Line', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ca', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_182', 'animal_184', 'animal_186', 'animal_188', 'animal_190'], "Extracted Currency": ['GBP 50.68', '$368.565', 'AUD 2.84', '$856.952', 'DKK 63.49'], "Extracted Date Time Mention": ['32 months', '33 year', '34 years', '35 minute', '36 minutes'], "Extracted Disease": ['disease_182', 'disease_184', 'disease_186', 'disease_188', 'disease_190'], "Extracted Facility": ['facility_182', 'facility_184', 'facility_186', 'facility_188', 'facility_190'], "Extracted Incident": ['incident_141', 'incident_142', 'incident_143', 'incident_144', 'incident_145'], "Extracted Locations": ['Malta (region 182)', 'Mauritius (region 184)', 'Mongolia (region 186)', 'Morocco (region 188)', 'Myanmar (region 190)'], "Extracted Miscellaneous": ['batch82', 'query84', 'schema86', 'view88', 'lib90'], "Extracted Organism": ['organism_182', 'organism_184', 'organism_186', 'organism_188', 'organism_190'], "Extracted Substance": ['substance_182', 'substance_184', 'substance_186', 'substance_188', 'substance_190'], "Extracted Vehicle": ['vehicle_182', 'vehicle_184', 'vehicle_186', 'vehicle_188', 'vehicle_190'], "Extracted Weapon": ['weapon_182', 'weapon_184', 'weapon_186', 'weapon_188', 'weapon_190'], Label: ['label_141', 'label_142', 'label_143', 'label_144', 'label_145'], Space: ['space_182', 'space_184', 'space_186', 'space_188', 'space_190'], "Space Key": ['spacekey_182', 'spacekey_184', 'spacekey_186', 'spacekey_188', 'spacekey_190'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Jennie Olmstead', Axis: 'East', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'confluence', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'iphone 11', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Trade', Region: 'kharkiv', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Cross the Oskil River in Kharkiv Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'Supporting Effort - Southern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'cs', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_196', 'animal_198', 'animal_200', 'animal_202', 'animal_204'], "Extracted Currency": ['$429.325', 'ZAR 2.16', '$251.942', 'GBP 95.70', '$864.943'], "Extracted Date Time Mention": ['39 hour', '40 hours', '41 week', '42 weeks', '43 month'], "Extracted Disease": ['disease_196', 'disease_198', 'disease_200', 'disease_202', 'disease_204'], "Extracted Facility": ['facility_196', 'facility_198', 'facility_200', 'facility_202', 'facility_204'], "Extracted Incident": ['incident_148', 'incident_149', 'incident_150', 'incident_151', 'incident_152'], "Extracted Locations": ['Nigeria (region 196)', 'Norway (region 198)', 'Panama (region 200)', 'Peru (region 202)', 'Poland (region 204)'], "Extracted Miscellaneous": ['log96', 'alert98', 'trace0', 'error2', 'info4'], "Extracted Organism": ['organism_196', 'organism_198', 'organism_200', 'organism_202', 'organism_204'], "Extracted Substance": ['substance_196', 'substance_198', 'substance_200', 'substance_202', 'substance_204'], "Extracted Vehicle": ['vehicle_196', 'vehicle_198', 'vehicle_200', 'vehicle_202', 'vehicle_204'], "Extracted Weapon": ['weapon_196', 'weapon_198', 'weapon_200', 'weapon_202', 'weapon_204'], Label: ['label_148', 'label_149', 'label_150', 'label_151', 'label_152'], Space: ['space_196', 'space_198', 'space_200', 'space_202', 'space_204'], "Space Key": ['spacekey_196', 'spacekey_198', 'spacekey_200', 'spacekey_202', 'spacekey_204'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'James Greene', Axis: 'North', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'The Secret Adversary', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'iphone 12', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Academic', Region: 'luhansk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Maintain frontline positions and secure rear areas against Ukrainian strikes', "Section Name": 'Regime Issues', "Section Type": 'Supporting Effort - Northern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'en', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_210', 'animal_212', 'animal_214', 'animal_216', 'animal_218'], "Extracted Currency": ['DKK 77.40', '$679.894', 'KRW 59.71', '$37.042', 'ZAR 47.11'], "Extracted Date Time Mention": ['46 years', '47 minute', '48 minutes', '49 day', '50 days'], "Extracted Disease": ['disease_210', 'disease_212', 'disease_214', 'disease_216', 'disease_218'], "Extracted Facility": ['facility_210', 'facility_212', 'facility_214', 'facility_216', 'facility_218'], "Extracted Incident": ['incident_155', 'incident_156', 'incident_157', 'incident_158', 'incident_159'], "Extracted Locations": ['Serbia (region 210)', 'Slovenia (region 212)', 'South Sudan (region 214)', 'Sri Lanka (region 216)', 'Sweden (region 218)'], "Extracted Miscellaneous": ['ml10', 'data12', 'test14', 'deploy16', 'cache18'], "Extracted Organism": ['organism_210', 'organism_212', 'organism_214', 'organism_216', 'organism_218'], "Extracted Substance": ['substance_210', 'substance_212', 'substance_214', 'substance_216', 'substance_218'], "Extracted Vehicle": ['vehicle_210', 'vehicle_212', 'vehicle_214', 'vehicle_216', 'vehicle_218'], "Extracted Weapon": ['weapon_210', 'weapon_212', 'weapon_214', 'weapon_216', 'weapon_218'], Label: ['label_155', 'label_156', 'label_157', 'label_158', 'label_159'], Space: ['space_210', 'space_212', 'space_214', 'space_216', 'space_218'], "Space Key": ['spacekey_210', 'spacekey_212', 'spacekey_214', 'spacekey_216', 'spacekey_218'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Grace Mappes', Axis: 'South', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'he Murder on the Links', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'iphone 13', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Consumer', Region: 'northern', "Report Type": 'SIGINT', "Russian Objective": 'Maintain frontline positions, secure rear areas against Ukrainian strikes, and advance within tube artillery range of Zaporizhzhia City', "Section Name": 'Russian Force Generation', "Section Type": 'Subordinate Main Effort #3 - Donetsk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'es', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_224', 'animal_226', 'animal_228', 'animal_230', 'animal_232'], "Extracted Currency": ['$801.331', 'AUD 87.17', '$845.927', 'DKK 34.31', '$456.503'], "Extracted Date Time Mention": ['53 week', '54 weeks', '55 month', '56 months', '57 year'], "Extracted Disease": ['disease_224', 'disease_226', 'disease_228', 'disease_230', 'disease_232'], "Extracted Facility": ['facility_224', 'facility_226', 'facility_228', 'facility_230', 'facility_232'], "Extracted Incident": ['incident_162', 'incident_163', 'incident_164', 'incident_165', 'incident_166'], "Extracted Locations": ['Thailand (region 224)', 'Tunisia (region 226)', 'Turkmenistan (region 228)', 'Ukraine (region 230)', 'Uzbekistan (region 232)'], "Extracted Miscellaneous": ['stream24', 'index26', 'model28', 'repo30', 'app32'], "Extracted Organism": ['organism_224', 'organism_226', 'organism_228', 'organism_230', 'organism_232'], "Extracted Substance": ['substance_224', 'substance_226', 'substance_228', 'substance_230', 'substance_232'], "Extracted Vehicle": ['vehicle_224', 'vehicle_226', 'vehicle_228', 'vehicle_230', 'vehicle_232'], "Extracted Weapon": ['weapon_224', 'weapon_226', 'weapon_228', 'weapon_230', 'weapon_232'], Label: ['label_162', 'label_163', 'label_164', 'label_165', 'label_166'], Space: ['space_224', 'space_226', 'space_228', 'space_230', 'space_232'], "Space Key": ['spacekey_224', 'spacekey_226', 'spacekey_228', 'spacekey_230', 'spacekey_232'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'George Barros with William Runkel', Axis: 'East', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'dod-administrative-instructions', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'iphone 13 pro', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Corporate', Region: 'southern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Push Ukrainian forces back from the international border to create a defensible buffer zone with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'Subordinate Main Effort #2 - Luhansk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'fr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_238', 'animal_240', 'animal_242', 'animal_244', 'animal_246'], "Extracted Currency": ['ZAR 68.15', '$277.721', 'GBP 62.45', '$770.014', 'AUD 17.97'], "Extracted Date Time Mention": ['60 minutes', '1 day ago', '2 days ago', '3 hour ago', '4 hours ago'], "Extracted Disease": ['disease_238', 'disease_240', 'disease_242', 'disease_244', 'disease_246'], "Extracted Facility": ['facility_238', 'facility_240', 'facility_242', 'facility_244', 'facility_246'], "Extracted Incident": ['incident_169', 'incident_170', 'incident_171', 'incident_172', 'incident_173'], "Extracted Locations": ['Albania (region 238)', 'Andorra (region 240)', 'Austria (region 242)', 'Belarus (region 244)', 'Belize (region 246)'], "Extracted Miscellaneous": ['monitor38', 'metric40', 'debug42', 'warn44', 'api46'], "Extracted Organism": ['organism_238', 'organism_240', 'organism_242', 'organism_244', 'organism_246'], "Extracted Substance": ['substance_238', 'substance_240', 'substance_242', 'substance_244', 'substance_246'], "Extracted Vehicle": ['vehicle_238', 'vehicle_240', 'vehicle_242', 'vehicle_244', 'vehicle_246'], "Extracted Weapon": ['weapon_238', 'weapon_240', 'weapon_242', 'weapon_244', 'weapon_246'], Label: ['label_169', 'label_170', 'label_171', 'label_172', 'label_173'], Space: ['space_238', 'space_240', 'space_242', 'space_244', 'space_246'], "Space Key": ['spacekey_238', 'spacekey_240', 'spacekey_242', 'spacekey_244', 'spacekey_246'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'George Barros with Nate Trotter', Axis: 'North', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'law enforcement reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'iphone7', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Government', Region: 'donetsk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Push Ukrainian forces back from the international border with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'Subordinate Main Effort #1 - Kharkiv', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'id', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_252', 'animal_254', 'animal_256', 'animal_258', 'animal_260'], "Extracted Currency": ['$448.508', 'KRW 20.68', '$35.263', 'ZAR 46.12', '$113.604'], "Extracted Date Time Mention": ['7 month ago', '8 months ago', '9 year ago', '10 years ago', '11 minute ago'], "Extracted Disease": ['disease_252', 'disease_254', 'disease_256', 'disease_258', 'disease_260'], "Extracted Facility": ['facility_252', 'facility_254', 'facility_256', 'facility_258', 'facility_260'], "Extracted Incident": ['incident_176', 'incident_177', 'incident_178', 'incident_179', 'incident_180'], "Extracted Locations": ['Burkina Faso (region 252)', 'Cambodia (region 254)', 'Chad (region 256)', 'Colombia (region 258)', 'Croatia (region 260)'], "Extracted Miscellaneous": ['ai52', 'code54', 'build56', 'config58', 'queue60'], "Extracted Organism": ['organism_252', 'organism_254', 'organism_256', 'organism_258', 'organism_260'], "Extracted Substance": ['substance_252', 'substance_254', 'substance_256', 'substance_258', 'substance_260'], "Extracted Vehicle": ['vehicle_252', 'vehicle_254', 'vehicle_256', 'vehicle_258', 'vehicle_260'], "Extracted Weapon": ['weapon_252', 'weapon_254', 'weapon_256', 'weapon_258', 'weapon_260'], Label: ['label_176', 'label_177', 'label_178', 'label_179', 'label_180'], Space: ['space_252', 'space_254', 'space_256', 'space_258', 'space_260'], "Space Key": ['spacekey_252', 'spacekey_254', 'spacekey_256', 'spacekey_258', 'spacekey_260'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'George Barros', Axis: 'South', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev-v2', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'iphones', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Journal', Region: 'kharkiv', "Report Type": 'SIGINT', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas', "Section Name": 'Zaporizhia Oblast', "Section Type": 'Main Effort - Eastern Ukraine', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'it', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_266', 'animal_268', 'animal_270', 'animal_272', 'animal_274'], "Extracted Currency": ['AUD 43.70', '$207.943', 'DKK 44.72', '$337.839', 'KRW 19.78'], "Extracted Date Time Mention": ['14 days ago', '15 hour ago', '16 hours ago', '17 week ago', '18 weeks ago'], "Extracted Disease": ['disease_266', 'disease_268', 'disease_270', 'disease_272', 'disease_274'], "Extracted Facility": ['facility_266', 'facility_268', 'facility_270', 'facility_272', 'facility_274'], "Extracted Incident": ['incident_183', 'incident_184', 'incident_185', 'incident_186', 'incident_187'], "Extracted Locations": ['Estonia (region 266)', 'Finland (region 268)', 'Gambia (region 270)', 'Ghana (region 272)', 'Guatemala (region 274)'], "Extracted Miscellaneous": ['query66', 'schema68', 'view70', 'lib72', 'web74'], "Extracted Organism": ['organism_266', 'organism_268', 'organism_270', 'organism_272', 'organism_274'], "Extracted Substance": ['substance_266', 'substance_268', 'substance_270', 'substance_272', 'substance_274'], "Extracted Vehicle": ['vehicle_266', 'vehicle_268', 'vehicle_270', 'vehicle_272', 'vehicle_274'], "Extracted Weapon": ['weapon_266', 'weapon_268', 'weapon_270', 'weapon_272', 'weapon_274'], Label: ['label_183', 'label_184', 'label_185', 'label_186', 'label_187'], Space: ['space_266', 'space_268', 'space_270', 'space_272', 'space_274'], "Space Key": ['spacekey_266', 'spacekey_268', 'spacekey_270', 'spacekey_272', 'spacekey_274'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Frederick W. Kagan with Veronica Iredale', Axis: 'East', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'laptop', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Miscellaneous', Region: 'luhansk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and advance into Dnipropetrovsk Oblast', "Section Name": 'Donetsk Oblast', "Section Type": 'Key Takeaways', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'de', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_280', 'animal_282', 'animal_284', 'animal_286', 'animal_288'], "Extracted Currency": ['$803.013', 'GBP 87.08', '$63.592', 'AUD 56.71', '$652.840'], "Extracted Date Time Mention": ['21 year ago', '22 years ago', '23 minute ago', '24 minutes ago', '25 day ago'], "Extracted Disease": ['disease_280', 'disease_282', 'disease_284', 'disease_286', 'disease_288'], "Extracted Facility": ['facility_280', 'facility_282', 'facility_284', 'facility_286', 'facility_288'], "Extracted Incident": ['incident_190', 'incident_191', 'incident_192', 'incident_193', 'incident_194'], "Extracted Locations": ['Indonesia (region 280)', 'Iraq (region 282)', 'Italy (region 284)', 'Kazakhstan (region 286)', 'Kuwait (region 288)'], "Extracted Miscellaneous": ['alert80', 'trace82', 'error84', 'info86', 'sdk88'], "Extracted Organism": ['organism_280', 'organism_282', 'organism_284', 'organism_286', 'organism_288'], "Extracted Substance": ['substance_280', 'substance_282', 'substance_284', 'substance_286', 'substance_288'], "Extracted Vehicle": ['vehicle_280', 'vehicle_282', 'vehicle_284', 'vehicle_286', 'vehicle_288'], "Extracted Weapon": ['weapon_280', 'weapon_282', 'weapon_284', 'weapon_286', 'weapon_288'], Label: ['label_190', 'label_191', 'label_192', 'label_193', 'label_194'], Space: ['space_280', 'space_282', 'space_284', 'space_286', 'space_288'], "Space Key": ['spacekey_280', 'spacekey_282', 'spacekey_284', 'spacekey_286', 'spacekey_288'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Frederick W. Kagan', Axis: 'North', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'testing-waikato-external-workflows', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'laptop computers', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Local', Region: 'northern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and possibly advance into Dnipropetrovsk Oblast', "Section Name": 'Kharkiv Oblast', "Section Type": 'strikes', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_294', 'animal_296', 'animal_298', 'animal_300', 'animal_302'], "Extracted Currency": ['KRW 45.86', '$907.293', 'ZAR 43.88', '$51.770', 'GBP 60.61'], "Extracted Date Time Mention": ['28 hours ago', '29 week ago', '30 weeks ago', '31 month ago', '32 months ago'], "Extracted Disease": ['disease_294', 'disease_296', 'disease_298', 'disease_300', '-hd'], "Extracted Facility": ['facility_294', 'facility_296', 'facility_298', 'facility_300', 'abortion clinics'], "Extracted Incident": ['incident_197', 'incident_198', 'incident_199', 'incident_200', 'incident_201'], "Extracted Locations": ['Libya (region 294)', 'Luxembourg (region 296)', 'Malawi (region 298)', 'Mali (region 300)', 'Mauritania (region 302)'], "Extracted Miscellaneous": ['data94', 'test96', 'deploy98', 'cache0', 'a2op'], "Extracted Organism": ['organism_294', 'organism_296', 'organism_298', 'organism_300', 'a2op'], "Extracted Substance": ['substance_294', 'substance_296', 'substance_298', 'substance_300', 'a2op'], "Extracted Vehicle": ['vehicle_294', 'vehicle_296', 'vehicle_298', 'vehicle_300', '570s'], "Extracted Weapon": ['weapon_294', 'weapon_296', 'weapon_298', 'weapon_300', '\'guns'], Label: ['label_197', 'label_198', 'label_199', 'label_200', 'label'], Space: ['space_294', 'space_296', 'space_298', 'space_300', '2023 Company-wide Progress Updates'], "Space Key": ['spacekey_294', 'spacekey_296', 'spacekey_298', 'spacekey_300', '2CPU'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Diana Nesreddine', Axis: 'South', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'test-olivier-2025-06-20', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'laptop webcam', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Organisation', Region: 'southern', "Report Type": 'SIGINT', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donecatsk Oblast', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'regime', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tl', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_308', 'animal_310', 'animal_312', 'animal_314', 'animal_316'], "Extracted Currency": ['$820.703', 'DKK 85.07', '$546.758', 'KRW 47.14', '$177.381'], "Extracted Date Time Mention": ['35 minute ago', '36 minutes ago', '37 day ago', '38 days ago', '39 hour ago'], "Extracted Disease": ['achiness', 'acute myeloid leukemia', 'addiction', 'adrenocortical carcinoma', 'aids'], "Extracted Facility": ['airfield', 'airfields', 'airport', 'airports', 'amac market lugbe abuja'], "Extracted Incident": ['incident_204', 'incident_205', 'incident_206', 'incident_207', 'incident_208'], "Extracted Locations": ['Mozambique (region 308)', 'Namibia (region 310)', 'Netherlands (region 312)', 'Niger (region 314)', 'North Macedonia (region 316)'], "Extracted Miscellaneous": ['api', 'arxiv', 'astrotrain', 'automate', 'azure'], "Extracted Organism": ['anthrax', 'anysrc-1242', 'anysrc-1497', 'aphelidiomyceta', 'apple'], "Extracted Substance": ['apple sauce', 'argon2', 'azure', 'bert', 'bilstm'], "Extracted Vehicle": ['airplane', 'amphibious ships', 'antonovs', 'apache', 'armored personnel carrier'], "Extracted Weapon": ['100 mm shell supplies', '105 mm ammunition', '105-millimeter cannon', '105-mm gun', '105mm cannon'], Label: ['alembic', 'architecture', 'aws', 'balsamiq-blueprint', 'bugs'], Space: ['Analyze', 'Andrew Le', 'Andy Natt', 'Applied Research', 'Army On-Prem'], "Space Key": ['AMK', 'ANZ', 'AO', 'API', 'CDC'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Diana Nassreddine', Axis: 'East', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'test-delete-docs', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'laptops', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'National', Region: 'donetsk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'overview', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ru', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_322', 'animal_324', 'animal_326', 'animal_328', 'animal_330'], "Extracted Currency": ['GBP 1.72', '$837.769', 'AUD 23.43', '$261.567', 'DKK 94.03'], "Extracted Date Time Mention": ['42 weeks ago', '43 month ago', '44 months ago', '45 year ago', '46 years ago'], "Extracted Disease": ['alcoholism', 'alert fatigue', 'allergy', 'android malware', 'anger'], "Extracted Facility": ['apartment building', 'army base', 'banks', 'barracks', 'base'], "Extracted Incident": ['incident_211', 'incident_212', 'incident_213', 'incident_214', 'incident_215'], "Extracted Locations": ['Philippines (region 322)', 'Portugal (region 324)', 'Rwanda (region 326)', 'Senegal (region 328)', 'Slovakia (region 330)'], "Extracted Miscellaneous": ['chinese', 'command', 'confluence', 'csv', 'data'], "Extracted Organism": ['babybear', 'bacteria', 'banana', 'bananas', 'bart t2t'], "Extracted Substance": ['cannabis', 'carbon', 'carbon dioxide', 'carbon fibre', 'carbon-fiber'], "Extracted Vehicle": ['armoured combat vehicles', 'armoured personnel carrier', 'artura', 'attack drones', 'attack helicopters'], "Extracted Weapon": ['120-mm rifled gun', '120mm', '120mm cannon', '120mm “main gun” cannon', '130mm main gun'], Label: ['confluence', 'convention', 'creator-onboarding', 'data', 'data-science'], Space: ['Ben Hammel', 'Bernadette Essalou', 'Brent Williams', 'Brian Carlson', 'Brian Moss'], "Space Key": ['CS', 'CULT', 'D3', 'DEL', 'DEVOPS'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Diana Nasreddine', Axis: 'North', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'source_name', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'macbook air', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Press Wire', Region: 'kharkiv', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Create defensible buffer zones in Sumy Oblast along the international border', "Section Name": 'Regime Issues', "Section Type": 'kinetic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'no-lang', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_336', 'animal_338', 'animal_340', 'animal_342', 'animal_344'], "Extracted Currency": ['$231.799', 'ZAR 99.62', '$976.284', 'GBP 4.83', '$434.555'], "Extracted Date Time Mention": ['49 day ago', '50 days ago', '51 hour ago', '52 hours ago', '53 week ago'], "Extracted Disease": ['anxiety', 'apple/qualcomm', 'apple/qualcomm bug', 'asthma', 'atitis b'], "Extracted Facility": ['bridge', 'bridges', 'building', 'buildings', 'cafes'], "Extracted Incident": ['incident_218', 'incident_219', 'incident_220', 'incident_221', 'incident_222'], "Extracted Locations": ['Sudan (region 336)', 'Switzerland (region 338)', 'Taiwan (region 340)', 'Tanzania (region 342)', 'Togo (region 344)'], "Extracted Miscellaneous": ['datadog', 'db', 'delta', 'delta 3', 'dev'], "Extracted Organism": ['bilstms', 'bluehole', 'bm25', 'c3po', 'carrots'], "Extracted Substance": ['chlorhexadol', 'cilium', 'cm-6', 'co-nlp', 'co2'], "Extracted Vehicle": ['bayraktar tb2', 'bicycle', 'bike', 'boat', 'bomber'], "Extracted Weapon": ['152mm shells', '155 mm caesar cannon', '155-millimeter shells', '155-millimetre calibre shells', '155-mm caesar artillery'], Label: ['decision', 'decisions', 'deep', 'delta', 'delta-3'], Space: ['Cindy Ma', 'Cody', 'Counter-Disinformation', 'Customer Delivery Council', 'Customer Engineering'], "Space Key": ['E', 'ENG', 'ET', 'FABLAB', 'FDE'] },

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
    metadata: { vendor_id: 'moreover' , Authors: 'Davit Gasparyan', Axis: 'South', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'social', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'memory cards', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Trade', Region: 'luhansk', "Report Type": 'SIGINT', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border', "Section Name": 'Russian Force Generation', "Section Type": 'force_generation', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'pt', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_350', 'animal_352', 'animal_354', 'animal_356', 'animal_358'], "Extracted Currency": ['DKK 14.40', '$5.751', 'KRW 73.97', '$787.540', 'ZAR 63.03'], "Extracted Date Time Mention": ['56 months ago', '57 year ago', '58 years ago', '59 minute ago', '60 minutes ago'], "Extracted Disease": ['bdd', 'biological weapon', 'black eye', 'bleeding', 'blood clot to'], "Extracted Facility": ['checkpoints', 'church', 'churches', 'classroom', 'clinics'], "Extracted Incident": ['incident_225', 'incident_226', 'incident_227', 'incident_228', 'incident_229'], "Extracted Locations": ['Uruguay (region 350)', 'Venezuela (region 352)', 'Yemen (region 354)', 'Zimbabwe (region 356)', 'Algeria (region 358)'], "Extracted Miscellaneous": ['dsta', 'dtic', 'ec2', 'elasticsearch', 'english'], "Extracted Organism": ['celery', 'chatgpt', 'cinnamon', 'clover', 'corn'], "Extracted Substance": ['cocaine', 'copper', 'cosine', 'covid-19 vaccine', 'cui'], "Extracted Vehicle": ['camels', 'car', 'chinese', 'chopper crash', 'civilian'], "Extracted Weapon": ['155mm self-propelled howitzers', '155mm136f137 artillery pieces', '20-millimeter auto-cannons', '20-millimeter gun', '20-mm gun'], Label: ['development', 'devops', 'discoverability', 'documentation-space-sample', 'draft'], Space: ['David Hayden', 'Deepti Winston', 'Defense Technical Information Center (DTIC)', 'Deloitte', 'Delta'], "Space Key": ['GOV', 'HAL0', 'HR', 'INFRA', 'IT'] },

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
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Daria Novikov', Axis: 'East', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'news', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'mobile', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Academic', Region: 'northern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border and approach to within tube artillery range of Sumy City', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'diplomatic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'multiple', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_364', 'animal_366', 'animal_368', 'animal_370', 'animal_372'], "Extracted Currency": ['$22.211', 'AUD 86.62', '$841.941', 'DKK 64.04', '$419.641'], "Extracted Date Time Mention": ['3 hour later', '4 hours later', '5 week later', '6 weeks later', '7 month later'], "Extracted Disease": ['cancer', 'cholera', 'climate change', 'computer fraud and abuse act', 'coronavirus'], "Extracted Facility": ['conference rooms', 'court', 'data centers', 'detention center', 'displacement camps'], "Extracted Incident": ['incident_232', 'incident_233', 'incident_234', 'incident_235', 'incident_236'], "Extracted Locations": ['Belgium (region 364)', 'Benin (region 366)', 'Bosnia (region 368)', 'Bulgaria (region 370)', 'Burundi (region 372)'], "Extracted Miscellaneous": ['fe', 'fedstart', 'figma designs', 'flan', 'flashpoint'], "Extracted Organism": ['covid', 'covid-19', 'crsv', 'crunchydata', 'cucumber'], "Extracted Substance": ['delta 3', 'delta2', 'delta2.x', 'delta3', 'diamond'], "Extracted Vehicle": ['combat aircraft', 'combat drones', 'combat vehicles', 'drone', 'drone attacks'], "Extracted Weapon": ['25-millimeter ammunition', '25-millimeter cannon', '25-millimeter gun', 'air defence systems', 'air-to-air missiles'], Label: ['dtic', 'dtic-data', 'dtic-metadata', 'education', 'elasticsearch'], Space: ['Dhruv Soni', 'Elisabeth Reuben', 'Engineering', 'Engineering Culture', 'Entities'], "Space Key": ['LS', 'MAR', 'ME', 'MLDX', 'MLOPS'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Christina Harward Anna Harvey', Axis: 'North', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'user-upload', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'mobile computing devices', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Consumer', Region: 'southern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Cross the Oskil River in Kharkiv Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'Top Line', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ca', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_378', 'animal_380', 'animal_382', 'animal_384', 'animal_386'], "Extracted Currency": ['ZAR 50.38', '$989.776', 'GBP 77.18', '$726.339', 'AUD 75.40'], "Extracted Date Time Mention": ['10 years later', '11 minute later', '12 minutes later', '13 day later', '14 days later'], "Extracted Disease": ['death', 'deaths', 'denali national park airport', 'dengue fever', 'diabetes'], "Extracted Facility": ['elevator', 'embassy of russia in nigeria', 'facility', 'farm', 'field hospitals'], "Extracted Incident": ['incident_239', 'incident_240', 'incident_241', 'incident_242', 'incident_243'], "Extracted Locations": ['Costa Rica (region 378)', 'Cuba (region 380)', 'Czech Republic (region 382)', 'Ecuador (region 384)', 'Ethiopia (region 386)'], "Extracted Miscellaneous": ['global', 'gpt', 'gpu', 'http', 'jira'], "Extracted Organism": ['cypress', 'delta 3', 'dtic', 'dtictagger', 'dvc'], "Extracted Substance": ['dpo', 'dpo/ppo', 'drp', 'drug', 'drugs'], "Extracted Vehicle": ['electric car', 'electric vehicle', 'f-16 fighter jets', 'ferrari sf90', 'fighter'], "Extracted Weapon": ['ammunition', 'anti-tank missiles', 'arms', 'artillery', 'artillery attack'], Label: ['excluded-sources', 'featured', 'file-list', 'finance', 'functional_review'], Space: ['Fab Lab', 'Gary Desmond Foubister', 'Global Classic', 'HAL0', 'Human Resources'], "Space Key": ['PA', 'PAUTO', 'PC', 'PM', 'PRIM'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Anna Harvey', Axis: 'South', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'navy intel reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'mobile computing equipment', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Corporate', Region: 'donetsk', "Report Type": 'SIGINT', "Russian Objective": 'Maintain frontline positions and secure rear areas against Ukrainian strikes', "Section Name": 'Zaporizhia Oblast', "Section Type": 'Supporting Effort - Southern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'cs', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_392', 'animal_394', 'animal_396', 'animal_398', 'animal_400'], "Extracted Currency": ['$459.625', 'KRW 29.96', '$317.130', 'ZAR 94.55', '$125.293'], "Extracted Date Time Mention": ['17 week later', '18 weeks later', '19 month later', '20 months later', '21 year later'], "Extracted Disease": ['disorder', 'domestic violence', 'dtic', 'ebola hemorrhagic fever', 'famine'], "Extracted Facility": ['garrisons', 'grandes rousses tunnel', 'grocery store', 'gym', 'hampton by hilton kuwait salmiya'], "Extracted Incident": ['incident_246', 'incident_247', 'incident_248', 'incident_249', 'incident_250'], "Extracted Locations": ['Greece (region 392)', 'Guinea (region 394)', 'Honduras (region 396)', 'Iceland (region 398)', 'Iran (region 400)'], "Extracted Miscellaneous": ['kafka', 'kibana', 'kubernetes', 'lighttag', 'linkedin'], "Extracted Organism": ['education in the knowledge society', 'erica', 'felisia', 'flan', 'flan xl'], "Extracted Substance": ['dtictr', 'e5sv2', 'enzymes', 'extraction pills', 'fentanyl'], "Extracted Vehicle": ['french fighter jets', 'fuel tanks', 'helicopter', 'helicopter crash', 'helicopters'], "Extracted Weapon": ['atacms missiles', 'ballistic missile', 'ballistic missiles', 'barrel bomb', 'battlefield nuclear weapons'], Label: ['jira', 'jirareport', 'job', 'kb-how-to-article', 'kb-troubleshooting-article'], Space: ['John Bohannon', 'John Jansen', 'John Sullivan', 'Joseph Catrambone', 'José Pablo Parajeles'], "Space Key": ['PX', 'QA', 'QS', 'QSV', 'REC'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Angelica Evans', Axis: 'East', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": '2025-Apr-Map-Demo-1', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'mobile device', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Government', Region: 'kharkiv', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Maintain frontline positions, secure rear areas against Ukrainian strikes, and advance within tube artillery range of Zaporizhzhia City', "Section Name": 'Donetsk Oblast', "Section Type": 'Supporting Effort - Northern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'en', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_406', 'animal_408', 'animal_410', 'animal_412', 'animal_414'], "Extracted Currency": ['AUD 0.47', '$665.118', 'DKK 21.24', '$743.281', 'KRW 3.94'], "Extracted Date Time Mention": ['24 minutes later', '25 day later', '26 days later', '27 hour later', '28 hours later'], "Extracted Disease": ['genocide', 'global warming', 'hallucinate', 'hallucinates', 'hallucination'], "Extracted Facility": ['highways', 'home', 'homes', 'hospital', 'hospitals'], "Extracted Incident": ['incident_253', 'incident_254', 'incident_255', 'incident_256', 'incident_257'], "Extracted Locations": ['Kenya (region 406)', 'Kyrgyzstan (region 408)', 'Latvia (region 410)', 'Liberia (region 412)', 'Lithuania (region 414)'], "Extracted Miscellaneous": ['medium', 'ml', 'mlp', 'model', 'mvp'], "Extracted Organism": ['flux', 'fruit', 'fungus', 'gcp', 'george bush'], "Extracted Substance": ['flan-t5-xl', 'flan-xl', 'flux', 'fouo', 'g2'], "Extracted Vehicle": ['iaf chopper crash', 'infantry fighting vehicle', 'infantry fighting vehicles (ifvs)', 'leclerc tanks', 'leopard 2 battle tanks'], "Extracted Weapon": ['car bomb', 'cartridge', 'chemical weapon', 'communication device', 'communication devices'], Label: ['labeling', 'lakaye121', 'learning', 'live-site', 'machine'], Space: ['Kompute', 'LightTag', 'Live Site', 'Lonely Planet: Primer', 'ML Developer Experience'], "Space Key": ['SFO', 'SO', 'SOL', 'STOR', 'TDM'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Adham Fattah', Axis: 'North', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'ISW', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'mobile devices', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Journal', Region: 'luhansk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Push Ukrainian forces back from the international border to create a defensible buffer zone with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Kharkiv Oblast', "Section Type": 'Subordinate Main Effort #3 - Donetsk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'es', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_420', 'animal_422', 'animal_424', 'animal_426', 'animal_428'], "Extracted Currency": ['$893.499', 'GBP 92.25', '$589.843', 'AUD 52.63', '$16.408'], "Extracted Date Time Mention": ['31 month later', '32 months later', '33 year later', '34 years later', '35 minute later'], "Extracted Disease": ['heartache', 'hiv', 'hunger', 'icl', 'illness'], "Extracted Facility": ['hotels', 'house', 'houses', 'hub', 'kenkin chuzaikan jimusho'], "Extracted Incident": ['incident_260', 'incident_261', 'incident_262', 'incident_263', 'incident_264'], "Extracted Locations": ['Malta (region 420)', 'Mauritius (region 422)', 'Mongolia (region 424)', 'Morocco (region 426)', 'Myanmar (region 428)'], "Extracted Miscellaneous": ['ner', 'nlp', 'nlx', 'okta', 'org'], "Extracted Organism": ['gpt 4', 'gpt-2', 'gpt-3', 'gpt-3 3b', 'gpt-3.5'], "Extracted Substance": ['gas', 'gold', 'gpe', 'gpt', 'gpt 4'], "Extracted Vehicle": ['light vehicles', 'm113 armored personnel carriers', 'main battle tank', 'main battle tanks', 'mclaren artura'], "Extracted Weapon": ['cyber weapons', 'electronic warfare equipment', 'firearm', 'firearms', 'generators'], Label: ['microsoft', 'migrations', 'ml', 'model', 'models'], Space: ['Marketing Operations & Sales Development', 'Martin Horn', 'Matthew Daniel', 'Mentorship', 'Noah Vaughn Randolph'], "Space Key": ['UX', 'WMPR', 'YON', 'blog', 'joseph'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Ian Matthews', Axis: 'South', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'Test Data', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'mobile equipment', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Miscellaneous', Region: 'northern', "Report Type": 'SIGINT', "Russian Objective": 'Push Ukrainian forces back from the international border with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'Subordinate Main Effort #2 - Luhansk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'fr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_434', 'animal_436', 'animal_438', 'animal_440', 'animal_442'], "Extracted Currency": ['KRW 84.13', '$364.027', 'ZAR 88.21', '$156.461', 'GBP 73.98'], "Extracted Date Time Mention": ['38 days later', '39 hour later', '40 hours later', '41 week later', '42 weeks later'], "Extracted Disease": ['infectious disease', 'injuries', 'injury', 'iqt', 'jewish disabilities'], "Extracted Facility": ['medical facility', 'military base', 'military bases', 'military camp', 'museum'], "Extracted Incident": ['incident_267', 'incident_268', 'incident_269', 'incident_270', 'incident_271'], "Extracted Locations": ['Nigeria (region 434)', 'Norway (region 436)', 'Panama (region 438)', 'Peru (region 440)', 'Poland (region 442)'], "Extracted Miscellaneous": ['postgres', 'postgresql', 'primer (leawood, kan.)', 'prod', 'python'], "Extracted Organism": ['gpt-4o', 'gpt-j', 'gpt-j-6b', 'gpt3.5', 'gpt4'], "Extracted Substance": ['gpt-3.5', 'gpt-4', 'gpt-4o', 'gpt-j', 'gpt3.5'], "Extracted Vehicle": ['mclaren gt', 'mclaren road car', 'mercedes', 'mercedes-benz cars', 'mercedes-benz s-class'], "Extracted Weapon": ['gunshots', 'hand grenade', 'heavy weapons', 'helm controller', 'hypersonic missile'], Label: ['naming', 'needs-love', 'nlx', 'odetta', 'off_boarding'], Space: ['On Prem Global', 'PlatformExperience', 'Primer APJ', 'Primer Automate', 'Primer Classification'], "Space Key": ['~425645408', '~437799606', '~496637260', '~506445746', '~5570587cc24388670d41b0a9f6b75d13a0adce'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'George Barros with Veronica Iredale', Axis: 'East', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'confluence', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'mobile phone', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Local', Region: 'southern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'Subordinate Main Effort #1 - Kharkiv', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'id', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_448', 'animal_450', 'animal_452', 'animal_454', 'animal_456'], "Extracted Currency": ['$877.525', 'DKK 75.58', '$369.352', 'KRW 71.94', '$854.386'], "Extracted Date Time Mention": ['45 year later', '46 years later', '47 minute later', '48 minutes later', '49 day later'], "Extracted Disease": ['malaria', 'malnutrition', 'malware', 'measles', 'mental health'], "Extracted Facility": ['oil refinery', 'park', 'parking lot', 'port', 'presidential palace'], "Extracted Incident": ['incident_274', 'incident_275', 'incident_276', 'incident_277', 'incident_278'], "Extracted Locations": ['Serbia (region 448)', 'Slovenia (region 450)', 'South Sudan (region 452)', 'Sri Lanka (region 454)', 'Sweden (region 456)'], "Extracted Miscellaneous": ['redis', 'relex', 'russian', 's3', 'saml'], "Extracted Organism": ['gunicorn', 'llm', 'llms', 'lora', 'naspers'], "Extracted Substance": ['green copper', 'hydrate', 'hydrogen', 'hydros', 'iac'], "Extracted Vehicle": ['military aircraft', 'military chopper crash', 'military vehicle', 'military vehicles', 'mveh'], "Extracted Weapon": ['kinzhal hypersonic missiles', 'knife', 'locomotive', 'm142 himars', 'm4'], Label: ['okta', 'on_boarding', 'points', 'postgresql', 'process'], Space: ['Product Management', 'Prototype Registry', 'Purna Chandra Doddapaneni', 'Quality Assurance', 'Quicksilver2'], "Space Key": ['~5a3d61fae30920121a4933be', '~5babd8ebb6a5385ea27485eb', '~5c34bf994af3653588c533c9', '~5c8fcb85fbf7532d14b4f40e', '~5d1d0a5fca72d00d24ba075a'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Frederick W. Kagan with William Runkel', Axis: 'North', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'The Secret Adversary', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'mobile phones', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Organisation', Region: 'donetsk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and advance into Dnipropetrovsk Oblast', "Section Name": 'Regime Issues', "Section Type": 'Main Effort - Eastern Ukraine', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'it', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_462', 'animal_464', 'animal_466', 'animal_468', 'animal_470'], "Extracted Currency": ['GBP 14.57', '$85.225', 'AUD 92.49', '$683.536', 'DKK 93.89'], "Extracted Date Time Mention": ['52 hours later', '53 week later', '54 weeks later', '55 month later', '56 months later'], "Extracted Disease": ['mortality', 'mpox', 'ner', 'pain', 'pandemic'], "Extracted Facility": ['refugee camps', 'residential', 'restaurant', 'restaurants', 'road'], "Extracted Incident": ['incident_281', 'incident_282', 'incident_283', 'incident_284', 'incident_285'], "Extracted Locations": ['Thailand (region 462)', 'Tunisia (region 464)', 'Turkmenistan (region 466)', 'Ukraine (region 468)', 'Uzbekistan (region 470)'], "Extracted Miscellaneous": ['semantic', 'semantic search', 'slack', 'spacy', 'sprint'], "Extracted Organism": ['oranges', 'pinot', 'plant', 'plants', 'potatoes'], "Extracted Substance": ['natural gas', 'oxygen', 'petroleum', 'platinum', 'primer (leawood, kan.)'], "Extracted Vehicle": ['self-propelled caesar howitzers', 'ship', 'space exploration vehicle', 'speedtail', 'sport utility vehicle'], "Extracted Weapon": ['military weapons', 'missile', 'missile strikes', 'missiles', 'nuclear weapon'], Label: ['query', 'realtime', 'relations', 'release', 'relex'], Space: ['Sales Engineering', 'Sales Ops', 'Science - SaaS', 'Search Feed Overview', 'Services'], "Space Key": ['~5f34266d8d89e30046267649', '~5fa9842442ab3b006eae5940', '~5fbe9d4831795a006f7eb599', '~6009f92cbb4eb50078a543ed', '~613a4128a4f86e00696a5a3b'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Frederick W. Kagan with Nate Trotter', Axis: 'South', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'he Murder on the Links', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'mobile\\_phone', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'National', Region: 'kharkiv', "Report Type": 'SIGINT', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and possibly advance into Dnipropetrovsk Oblast', "Section Name": 'Russian Force Generation', "Section Type": 'Key Takeaways', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'de', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_476', 'animal_478', 'animal_480', 'animal_482', 'animal_484'], "Extracted Currency": ['$959.039', 'ZAR 99.14', '$618.387', 'GBP 2.90', '$718.846'], "Extracted Date Time Mention": ['59 minute later', '60 minutes later', '1 day from now', '2 days from now', '3 hour from now'], "Extracted Disease": ['rabies', 'ransomware', 'rape', 'sexual harassment', 'sick'], "Extracted Facility": ['school', 'school building', 'schools', 'shop', 'store'], "Extracted Incident": ['incident_288', 'incident_289', 'incident_290', 'incident_291', 'incident_292'], "Extracted Locations": ['Albania (region 476)', 'Andorra (region 478)', 'Austria (region 480)', 'Belarus (region 482)', 'Belize (region 484)'], "Extracted Miscellaneous": ['tbd', 'telegram', 'the wheel', 'the.com', 'triton'], "Extracted Organism": ['rag-v', 'rice', 'shrub', 'spinach', 'tf-idf'], "Extracted Substance": ['pvc', 'pvcs', 'roberta', 'rosa \'gold star\'', 'silver'], "Extracted Vehicle": ['t-64s', 't-72', 't-72s', 't-80s', 't-84s'], "Extracted Weapon": ['radar', 'rocket fire', 'shell', 'short-barreled mortar', 'shrapnel'], Label: ['resource-sharing', 'retrospective', 'review-notes', 'risk-log', 's3'], Space: ['Technical Program Management', 'Thread', 'Travis Parsley', 'UK-Eng', 'UX Design'], "Space Key": ['~6179d52c25f3130070d7ffb0', '~61f90e82f51e850070882c1d', '~7120204a6bed2424604f65b8ff0f431bae5382', '~71202057736a74c41e45cdac05c41a76ae9663', '~7120206418068270374cb7a5e5eba82da4660a'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Christina Harward', Axis: 'East', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'dod-administrative-instructions', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'network devices', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Press Wire', Region: 'luhansk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donecatsk Oblast', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'strikes', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_490', 'animal_492', 'animal_494', 'animal_496', 'animal_498'], "Extracted Currency": ['DKK 45.17', '$6.124', 'KRW 16.38', '$395.216', 'ZAR 38.72'], "Extracted Date Time Mention": ['6 weeks from now', '7 month from now', '8 months from now', '9 year from now', '10 years from now'], "Extracted Disease": ['stress', 'stroke', 'thrombosis', 'ukraine', 'virus'], "Extracted Facility": ['streets', 'train station', 'universities', 'university', 'warehouse'], "Extracted Incident": ['incident_295', 'incident_296', 'incident_297', 'incident_298', 'incident_299'], "Extracted Locations": ['Burkina Faso (region 490)', 'Cambodia (region 492)', 'Chad (region 494)', 'Colombia (region 496)', 'Croatia (region 498)'], "Extracted Miscellaneous": ['wikidata', 'wikipedia', 'wip', 'xlnet', 'yaml'], "Extracted Organism": ['trees', 'trojans', 'virus', 'viruses', 'worms'], "Extracted Substance": ['trecms', 'triton', 'uranium', 'vaccine', 'water'], "Extracted Vehicle": ['train', 'truck', 'vehicle', 'vehicles', 'vessel'], "Extracted Weapon": ['tomahawk cruise missiles', 'weapon', 'weapon of mass destruction', 'weaponry', 'weapons'], Label: ['software_approval', 'story', 'tech-spec', 'tech-spec-folder', 'template'], Space: ['Yonder', 'daniel.olmstead', 'eric.meng', 'jeffrey.miller', 'leila.khalili'], "Space Key": ['~712020bd682501cf254000ac8effbbbb527e88', '~712020ed2462fc268b4f85816599ed33f98e54', '~712020f2f1d8888479498e8fae9e025a88c1dd', '~712020f620cb0c053f4fd5a18d973e4d6a557b', '~943939812'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'and Karolina Hird', Axis: 'North', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'law enforcement reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'personal', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Trade', Region: 'northern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'regime', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tl', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['algo', 'american badger', 'anger bear', 'animal', 'animals'], "Extracted Currency": ['$335.898', 'AUD 21.16', '$337.662', 'DKK 61.51', '$497.210'], "Extracted Date Time Mention": ['1 hour', '1 month', '1 week', '1 year', '10 minutes'], "Extracted Disease": ['disease_104', 'disease_106', 'disease_108', 'disease_110', 'disease_112'], "Extracted Facility": ['facility_104', 'facility_106', 'facility_108', 'facility_110', 'facility_112'], "Extracted Incident": ['incident_302', 'incident_303', 'incident_304', 'incident_305', 'incident_306'], "Extracted Locations": ['Africa', 'America', 'Argentina', 'Asia', 'Australia'], "Extracted Miscellaneous": ['schema4', 'view6', 'lib8', 'web10', 'io12'], "Extracted Organism": ['organism_104', 'organism_106', 'organism_108', 'organism_110', 'organism_112'], "Extracted Substance": ['substance_104', 'substance_106', 'substance_108', 'substance_110', 'substance_112'], "Extracted Vehicle": ['vehicle_104', 'vehicle_106', 'vehicle_108', 'vehicle_110', 'vehicle_112'], "Extracted Weapon": ['weapon_104', 'weapon_106', 'weapon_108', 'weapon_110', 'weapon_112'], Label: ['label_102', 'label_103', 'label_104', 'label_105', 'label_106'], Space: ['space_104', 'space_106', 'space_108', 'space_110', 'space_112'], "Space Key": ['spacekey_104', 'spacekey_106', 'spacekey_108', 'spacekey_110', 'spacekey_112'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'and ??', Axis: 'South', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev-v2', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'personal computers', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Academic', Region: 'southern', "Report Type": 'SIGINT', "Russian Objective": 'Create defensible buffer zones in Sumy Oblast along the international border', "Section Name": 'Zaporizhia Oblast', "Section Type": 'overview', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ru', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['asian giant hornet', 'asiatic stink badgers', 'baby', 'baby bear', 'baby-bear'], "Extracted Currency": ['ZAR 4.61', '$952.546', 'GBP 41.46', '$305.100', 'AUD 55.06'], "Extracted Date Time Mention": ['2 days', '2 hours', '2 weeks', '2 years', '2.14'], "Extracted Disease": ['disease_118', 'disease_120', 'disease_122', 'disease_124', 'disease_126'], "Extracted Facility": ['facility_118', 'facility_120', 'facility_122', 'facility_124', 'facility_126'], "Extracted Incident": ['incident_309', 'incident_310', 'incident_311', 'incident_312', 'incident_313'], "Extracted Locations": ['Belarus', 'Belgium', 'Bolivia', 'Brazil', 'Britain'], "Extracted Miscellaneous": ['trace18', 'error20', 'info22', 'sdk24', 'dev26'], "Extracted Organism": ['organism_118', 'organism_120', 'organism_122', 'organism_124', 'organism_126'], "Extracted Substance": ['substance_118', 'substance_120', 'substance_122', 'substance_124', 'substance_126'], "Extracted Vehicle": ['vehicle_118', 'vehicle_120', 'vehicle_122', 'vehicle_124', 'vehicle_126'], "Extracted Weapon": ['weapon_118', 'weapon_120', 'weapon_122', 'weapon_124', 'weapon_126'], Label: ['label_109', 'label_110', 'label_111', 'label_112', 'label_113'], Space: ['space_118', 'space_120', 'space_122', 'space_124', 'space_126'], "Space Key": ['spacekey_118', 'spacekey_120', 'spacekey_122', 'spacekey_124', 'spacekey_126'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'William Runkel', Axis: 'East', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'personal laptops', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Consumer', Region: 'donetsk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border', "Section Name": 'Donetsk Oblast', "Section Type": 'kinetic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'no-lang', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['balaenoptera musculus', 'bear-papa bear', 'bee', 'beef', 'berserk bear'], "Extracted Currency": ['$293.325', 'KRW 36.16', '$124.751', 'ZAR 60.77', '$786.752'], "Extracted Date Time Mention": ['2008', '2010', '2011', '2012', '2013'], "Extracted Disease": ['disease_132', 'disease_134', 'disease_136', 'disease_138', 'disease_140'], "Extracted Facility": ['facility_132', 'facility_134', 'facility_136', 'facility_138', 'facility_140'], "Extracted Incident": ['incident_316', 'incident_317', 'incident_318', 'incident_319', 'incident_320'], "Extracted Locations": ['Canada', 'Chile', 'China', 'Colombia', 'Costa Rica'], "Extracted Miscellaneous": ['test32', 'deploy34', 'cache36', 'db38', 'sync40'], "Extracted Organism": ['organism_132', 'organism_134', 'organism_136', 'organism_138', 'organism_140'], "Extracted Substance": ['substance_132', 'substance_134', 'substance_136', 'substance_138', 'substance_140'], "Extracted Vehicle": ['vehicle_132', 'vehicle_134', 'vehicle_136', 'vehicle_138', 'vehicle_140'], "Extracted Weapon": ['weapon_132', 'weapon_134', 'weapon_136', 'weapon_138', 'weapon_140'], Label: ['label_116', 'label_117', 'label_118', 'label_119', 'label_120'], Space: ['space_132', 'space_134', 'space_136', 'space_138', 'space_140'], "Space Key": ['spacekey_132', 'spacekey_134', 'spacekey_136', 'spacekey_138', 'spacekey_140'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Samuel Shafiro', Axis: 'North', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'testing-waikato-external-workflows', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'phone', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Corporate', Region: 'kharkiv', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border and approach to within tube artillery range of Sumy City', "Section Name": 'Kharkiv Oblast', "Section Type": 'force_generation', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'pt', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['blue fish', 'bot', 'bots', 'brown', 'brown cow'], "Extracted Currency": ['AUD 78.59', '$925.313', 'DKK 32.98', '$333.821', 'KRW 58.60'], "Extracted Date Time Mention": ['2016', '2017', '2018', '2019', '2019-10-01'], "Extracted Disease": ['disease_146', 'disease_148', 'disease_150', 'disease_152', 'disease_154'], "Extracted Facility": ['facility_146', 'facility_148', 'facility_150', 'facility_152', 'facility_154'], "Extracted Incident": ['incident_323', 'incident_324', 'incident_325', 'incident_326', 'incident_327'], "Extracted Locations": ['Egypt', 'El Salvador', 'England', 'Ethiopia', 'Europe'], "Extracted Miscellaneous": ['model46', 'repo48', 'app50', 'net52', 'run54'], "Extracted Organism": ['organism_146', 'organism_148', 'organism_150', 'organism_152', 'organism_154'], "Extracted Substance": ['substance_146', 'substance_148', 'substance_150', 'substance_152', 'substance_154'], "Extracted Vehicle": ['vehicle_146', 'vehicle_148', 'vehicle_150', 'vehicle_152', 'vehicle_154'], "Extracted Weapon": ['weapon_146', 'weapon_148', 'weapon_150', 'weapon_152', 'weapon_154'], Label: ['label_123', 'label_124', 'label_125', 'label_126', 'label_127'], Space: ['space_146', 'space_148', 'space_150', 'space_152', 'space_154'], "Space Key": ['spacekey_146', 'spacekey_148', 'spacekey_150', 'spacekey_152', 'spacekey_154'] },
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
   , "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Olivia Gibson', Axis: 'South', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'test-olivier-2025-06-20', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'phones', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Government', Region: 'luhansk', "Report Type": 'SIGINT', "Russian Objective": 'Cross the Oskil River in Kharkiv Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'diplomatic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'multiple', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['canidae', 'capra hircus', 'carnivoran mammals', 'cat', 'catcher'], "Extracted Currency": ['$437.806', 'GBP 75.81', '$532.405', 'AUD 23.59', '$511.029'], "Extracted Date Time Mention": ['2022', '2023', '2024', '2025', '24 hours'], "Extracted Disease": ['disease_160', 'disease_162', 'disease_164', 'disease_166', 'disease_168'], "Extracted Facility": ['facility_160', 'facility_162', 'facility_164', 'facility_166', 'facility_168'], "Extracted Incident": ['incident_330', 'incident_331', 'incident_332', 'incident_333', 'incident_334'], "Extracted Locations": ['Gaza', 'Georgia', 'Germany', 'Ghana', 'Greenland'], "Extracted Miscellaneous": ['debug60', 'warn62', 'api64', 'cli66', 'ops68'], "Extracted Organism": ['organism_160', 'organism_162', 'organism_164', 'organism_166', 'organism_168'], "Extracted Substance": ['substance_160', 'substance_162', 'substance_164', 'substance_166', 'substance_168'], "Extracted Vehicle": ['vehicle_160', 'vehicle_162', 'vehicle_164', 'vehicle_166', 'vehicle_168'], "Extracted Weapon": ['weapon_160', 'weapon_162', 'weapon_164', 'weapon_166', 'weapon_168'], Label: ['label_130', 'label_131', 'label_132', 'label_133', 'label_134'], Space: ['space_160', 'space_162', 'space_164', 'space_166', 'space_168'], "Space Key": ['spacekey_160', 'spacekey_162', 'spacekey_164', 'spacekey_166', 'spacekey_168'] },
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
    metrics: { likes: 12450, comments: 2850, platform: 'reddit', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Nate Trotter', Axis: 'East', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'test-delete-docs', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'pixel 6 phone', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Journal', Region: 'northern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Maintain frontline positions and secure rear areas against Ukrainian strikes', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'Top Line', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ca', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['cattle', 'centroid', 'cervidae', 'cetacea', 'chicken'], "Extracted Currency": ['KRW 78.78', '$364.565', 'ZAR 90.40', '$709.724', 'GBP 11.42'], "Extracted Date Time Mention": ['3 days', '3 months', '3 weeks', '30 days', '30 minutes'], "Extracted Disease": ['disease_174', 'disease_176', 'disease_178', 'disease_180', 'disease_182'], "Extracted Facility": ['facility_174', 'facility_176', 'facility_178', 'facility_180', 'facility_182'], "Extracted Incident": ['incident_337', 'incident_338', 'incident_339', 'incident_340', 'incident_341'], "Extracted Locations": ['Hungary', 'India', 'Indonesia', 'Iran', 'Iraq'], "Extracted Miscellaneous": ['build74', 'config76', 'queue78', 'auth80', 'batch82'], "Extracted Organism": ['organism_174', 'organism_176', 'organism_178', 'organism_180', 'organism_182'], "Extracted Substance": ['substance_174', 'substance_176', 'substance_178', 'substance_180', 'substance_182'], "Extracted Vehicle": ['vehicle_174', 'vehicle_176', 'vehicle_178', 'vehicle_180', 'vehicle_182'], "Extracted Weapon": ['weapon_174', 'weapon_176', 'weapon_178', 'weapon_180', 'weapon_182'], Label: ['label_137', 'label_138', 'label_139', 'label_140', 'label_141'], Space: ['space_174', 'space_176', 'space_178', 'space_180', 'space_182'], "Space Key": ['spacekey_174', 'spacekey_176', 'spacekey_178', 'spacekey_180', 'spacekey_182'] },
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
    metrics: { views: 1850000, likes: 145000, shares: 52000, comments: 18500, platform: 'tiktok', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Jennie Olmsted', Axis: 'North', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'source_name', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'portable computers', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Miscellaneous', Region: 'southern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Maintain frontline positions, secure rear areas against Ukrainian strikes, and advance within tube artillery range of Zaporizhzhia City', "Section Name": 'Regime Issues', "Section Type": 'Supporting Effort - Southern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'cs', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['chimpanzees', 'chiroptera', 'cicada', 'cloud hopper', 'columbidae'], "Extracted Currency": ['$679.089', 'DKK 94.51', '$934.454', 'KRW 81.03', '$886.352'], "Extracted Date Time Mention": ['5min', '6 months', '7 days', '90 days', 'an hour'], "Extracted Disease": ['disease_188', 'disease_190', 'disease_192', 'disease_194', 'disease_196'], "Extracted Facility": ['facility_188', 'facility_190', 'facility_192', 'facility_194', 'facility_196'], "Extracted Incident": ['incident_344', 'incident_345', 'incident_346', 'incident_347', 'incident_348'], "Extracted Locations": ['Italy', 'Japan', 'Kazakhstan', 'Kenya', 'Kiev'], "Extracted Miscellaneous": ['view88', 'lib90', 'web92', 'io94', 'log96'], "Extracted Organism": ['organism_188', 'organism_190', 'organism_192', 'organism_194', 'organism_196'], "Extracted Substance": ['substance_188', 'substance_190', 'substance_192', 'substance_194', 'substance_196'], "Extracted Vehicle": ['vehicle_188', 'vehicle_190', 'vehicle_192', 'vehicle_194', 'vehicle_196'], "Extracted Weapon": ['weapon_188', 'weapon_190', 'weapon_192', 'weapon_194', 'weapon_196'], Label: ['label_144', 'label_145', 'label_146', 'label_147', 'label_148'], Space: ['space_188', 'space_190', 'space_192', 'space_194', 'space_196'], "Space Key": ['spacekey_188', 'spacekey_190', 'spacekey_192', 'spacekey_194', 'spacekey_196'] },
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
    metrics: { likes: 5420, comments: 892, shares: 1850, platform: 'x', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Jessica Sobieski', Axis: 'South', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'social', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'private defense agency', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Local', Region: 'donetsk', "Report Type": 'SIGINT', "Russian Objective": 'Push Ukrainian forces back from the international border to create a defensible buffer zone with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Russian Force Generation', "Section Type": 'Supporting Effort - Northern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'en', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['cyber berkut', 'daemon', 'dairy cows', 'dinosaurs', 'dog'], "Extracted Currency": ['GBP 96.40', '$636.093', 'AUD 26.15', '$166.750', 'DKK 70.25'], "Extracted Date Time Mention": ['april 2023', 'daily', 'daily air', 'day', 'day 1'], "Extracted Disease": ['disease_202', 'disease_204', 'disease_206', 'disease_208', 'disease_210'], "Extracted Facility": ['facility_202', 'facility_204', 'facility_206', 'facility_208', 'facility_210'], "Extracted Incident": ['incident_351', 'incident_352', 'incident_353', 'incident_354', 'incident_355'], "Extracted Locations": ['Los Angeles', 'Malaysia', 'Mexico', 'Middle East', 'Minneapolis'], "Extracted Miscellaneous": ['error2', 'info4', 'sdk6', 'dev8', 'ml10'], "Extracted Organism": ['organism_202', 'organism_204', 'organism_206', 'organism_208', 'organism_210'], "Extracted Substance": ['substance_202', 'substance_204', 'substance_206', 'substance_208', 'substance_210'], "Extracted Vehicle": ['vehicle_202', 'vehicle_204', 'vehicle_206', 'vehicle_208', 'vehicle_210'], "Extracted Weapon": ['weapon_202', 'weapon_204', 'weapon_206', 'weapon_208', 'weapon_210'], Label: ['label_151', 'label_152', 'label_153', 'label_154', 'label_155'], Space: ['space_202', 'space_204', 'space_206', 'space_208', 'space_210'], "Space Key": ['spacekey_202', 'spacekey_204', 'spacekey_206', 'spacekey_208', 'spacekey_210'] },
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
    metrics: { likes: 4850, comments: 1250, shares: 2100, platform: 'facebook', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Justin Young', Axis: 'East', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'news', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'radio', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Organisation', Region: 'kharkiv', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Push Ukrainian forces back from the international border with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'Subordinate Main Effort #3 - Donetsk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'es', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['dogs', 'domestic short-haired cat', 'donkey', 'duck', 'dungeness crab'], "Extracted Currency": ['$535.038', 'ZAR 94.71', '$207.517', 'GBP 41.07', '$846.813'], "Extracted Date Time Mention": ['every day', 'february', 'first time', 'friday', 'fy19'], "Extracted Disease": ['disease_216', 'disease_218', 'disease_220', 'disease_222', 'disease_224'], "Extracted Facility": ['facility_216', 'facility_218', 'facility_220', 'facility_222', 'facility_224'], "Extracted Incident": ['incident_358', 'incident_359', 'incident_360', 'incident_361', 'incident_362'], "Extracted Locations": ['Myanmar', 'Netherlands', 'New York', 'New Zealand', 'Nigeria'], "Extracted Miscellaneous": ['deploy16', 'cache18', 'db20', 'sync22', 'stream24'], "Extracted Organism": ['organism_216', 'organism_218', 'organism_220', 'organism_222', 'organism_224'], "Extracted Substance": ['substance_216', 'substance_218', 'substance_220', 'substance_222', 'substance_224'], "Extracted Vehicle": ['vehicle_216', 'vehicle_218', 'vehicle_220', 'vehicle_222', 'vehicle_224'], "Extracted Weapon": ['weapon_216', 'weapon_218', 'weapon_220', 'weapon_222', 'weapon_224'], Label: ['label_158', 'label_159', 'label_160', 'label_161', 'label_162'], Space: ['space_216', 'space_218', 'space_220', 'space_222', 'space_224'], "Space Key": ['spacekey_216', 'spacekey_218', 'spacekey_220', 'spacekey_222', 'spacekey_224'] },
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
    metrics: { likes: 8920, comments: 2450, platform: 'reddit', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Karolina Hird', Axis: 'North', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'user-upload', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'radio station', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'National', Region: 'luhansk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'Subordinate Main Effort #2 - Luhansk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'fr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['elephantidae', 'eloquent panda', 'emissary panda', 'ensenene', 'equus ferus'], "Extracted Currency": ['DKK 75.63', '$712.730', 'KRW 67.72', '$110.442', 'ZAR 87.63'], "Extracted Date Time Mention": ['june', 'last 24 hours', 'last 30 days', 'last 7 days', 'last month'], "Extracted Disease": ['disease_230', 'disease_232', 'disease_234', 'disease_236', 'disease_238'], "Extracted Facility": ['facility_230', 'facility_232', 'facility_234', 'facility_236', 'facility_238'], "Extracted Incident": ['incident_365', 'incident_366', 'incident_367', 'incident_368', 'incident_369'], "Extracted Locations": ['Oman', 'Pakistan', 'Paraguay', 'Paris', 'Peru'], "Extracted Miscellaneous": ['repo30', 'app32', 'net34', 'run36', 'monitor38'], "Extracted Organism": ['organism_230', 'organism_232', 'organism_234', 'organism_236', 'organism_238'], "Extracted Substance": ['substance_230', 'substance_232', 'substance_234', 'substance_236', 'substance_238'], "Extracted Vehicle": ['vehicle_230', 'vehicle_232', 'vehicle_234', 'vehicle_236', 'vehicle_238'], "Extracted Weapon": ['weapon_230', 'weapon_232', 'weapon_234', 'weapon_236', 'weapon_238'], Label: ['label_165', 'label_166', 'label_167', 'label_168', 'label_169'], Space: ['space_230', 'space_232', 'space_234', 'space_236', 'space_238'], "Space Key": ['spacekey_230', 'spacekey_232', 'spacekey_234', 'spacekey_236', 'spacekey_238'] },
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
    metrics: { views: 5200000, likes: 385000, shares: 195000, comments: 62000, platform: 'tiktok', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Karolina Hird with Veronica Iredale', Axis: 'South', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'navy intel reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'satellite phone', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Press Wire', Region: 'northern', "Report Type": 'SIGINT', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and advance into Dnipropetrovsk Oblast', "Section Name": 'Zaporizhia Oblast', "Section Type": 'Subordinate Main Effort #1 - Kharkiv', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'id', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['formicidae', 'fox', 'frills and owls', 'frog', 'fungus'], "Extracted Currency": ['$771.883', 'AUD 48.99', '$867.965', 'DKK 27.66', '$495.653'], "Extracted Date Time Mention": ['march', 'may', 'monday', 'month', 'monthly'], "Extracted Disease": ['disease_244', 'disease_246', 'disease_248', 'disease_250', 'disease_252'], "Extracted Facility": ['facility_244', 'facility_246', 'facility_248', 'facility_250', 'facility_252'], "Extracted Incident": ['incident_372', 'incident_373', 'incident_374', 'incident_375', 'incident_376'], "Extracted Locations": ['Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'Singapore Philippines'], "Extracted Miscellaneous": ['warn44', 'api46', 'cli48', 'ops50', 'ai52'], "Extracted Organism": ['organism_244', 'organism_246', 'organism_248', 'organism_250', 'organism_252'], "Extracted Substance": ['substance_244', 'substance_246', 'substance_248', 'substance_250', 'substance_252'], "Extracted Vehicle": ['vehicle_244', 'vehicle_246', 'vehicle_248', 'vehicle_250', 'vehicle_252'], "Extracted Weapon": ['weapon_244', 'weapon_246', 'weapon_248', 'weapon_250', 'weapon_252'], Label: ['label_172', 'label_173', 'label_174', 'label_175', 'label_176'], Space: ['space_244', 'space_246', 'space_248', 'space_250', 'space_252'], "Space Key": ['spacekey_244', 'spacekey_246', 'spacekey_248', 'spacekey_250', 'spacekey_252'] },
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
    metrics: { likes: 3850, comments: 920, shares: 1450, platform: 'x', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Kateryna Stepanenko', Axis: 'East', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": '2025-Apr-Map-Demo-1', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'satellite phones', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Trade', Region: 'southern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and possibly advance into Dnipropetrovsk Oblast', "Section Name": 'Donetsk Oblast', "Section Type": 'Main Effort - Eastern Ukraine', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'it', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['house cat', 'insect', 'jellyfish', 'lamb', 'llama'], "Extracted Currency": ['ZAR 26.33', '$596.707', 'GBP 46.52', '$865.396', 'AUD 33.48'], "Extracted Date Time Mention": ['november', 'october', 'one day', 'past week', 'q1'], "Extracted Disease": ['disease_258', 'disease_260', 'disease_262', 'disease_264', 'disease_266'], "Extracted Facility": ['facility_258', 'facility_260', 'facility_262', 'facility_264', 'facility_266'], "Extracted Incident": ['incident_379', 'incident_380', 'incident_381', 'incident_382', 'incident_383'], "Extracted Locations": ['South Korea', 'Spain', 'Switzerland', 'Sydney', 'Syria'], "Extracted Miscellaneous": ['config58', 'queue60', 'auth62', 'batch64', 'query66'], "Extracted Organism": ['organism_258', 'organism_260', 'organism_262', 'organism_264', 'organism_266'], "Extracted Substance": ['substance_258', 'substance_260', 'substance_262', 'substance_264', 'substance_266'], "Extracted Vehicle": ['vehicle_258', 'vehicle_260', 'vehicle_262', 'vehicle_264', 'vehicle_266'], "Extracted Weapon": ['weapon_258', 'weapon_260', 'weapon_262', 'weapon_264', 'weapon_266'], Label: ['label_179', 'label_180', 'label_181', 'label_182', 'label_183'], Space: ['space_258', 'space_260', 'space_262', 'space_264', 'space_266'], "Space Key": ['spacekey_258', 'spacekey_260', 'spacekey_262', 'spacekey_264', 'spacekey_266'] },
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
    metrics: { likes: 2850, comments: 1420, shares: 950, platform: 'facebook', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Kateryna Stepanenko with Nate Trotter', Axis: 'North', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'ISW', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'smart phones', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Academic', Region: 'donetsk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donecatsk Oblast', "Section Name": 'Kharkiv Oblast', "Section Type": 'Key Takeaways', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'de', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['owl', 'papa bear', 'papabear', 'pets', 'pig'], "Extracted Currency": ['$343.460', 'KRW 76.47', '$73.211', 'ZAR 68.13', '$937.546'], "Extracted Date Time Mention": ['september', 'sunday', 'this week', 'this year', 'thursday'], "Extracted Disease": ['disease_272', 'disease_274', 'disease_276', 'disease_278', 'disease_280'], "Extracted Facility": ['facility_272', 'facility_274', 'facility_276', 'facility_278', 'facility_280'], "Extracted Incident": ['incident_386', 'incident_387', 'incident_388', 'incident_389', 'incident_390'], "Extracted Locations": ['Thailand', 'Turkey', 'U.S', 'UAE', 'UK'], "Extracted Miscellaneous": ['lib72', 'web74', 'io76', 'log78', 'alert80'], "Extracted Organism": ['organism_272', 'organism_274', 'organism_276', 'organism_278', 'organism_280'], "Extracted Substance": ['substance_272', 'substance_274', 'substance_276', 'substance_278', 'substance_280'], "Extracted Vehicle": ['vehicle_272', 'vehicle_274', 'vehicle_276', 'vehicle_278', 'vehicle_280'], "Extracted Weapon": ['weapon_272', 'weapon_274', 'weapon_276', 'weapon_278', 'weapon_280'], Label: ['label_186', 'label_187', 'label_188', 'label_189', 'label_190'], Space: ['space_272', 'space_274', 'space_276', 'space_278', 'space_280'], "Space Key": ['spacekey_272', 'spacekey_274', 'spacekey_276', 'spacekey_278', 'spacekey_280'] },
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
    metrics: { likes: 15420, comments: 3850, platform: 'reddit', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Kateryna Stepanenko with Veronica Iredale', Axis: 'South', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'Test Data', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'smartphone', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Consumer', Region: 'kharkiv', "Report Type": 'SIGINT', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'strikes', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['primate', 'puppy', 'release geese', 'snake', 'tiger'], "Extracted Currency": ['AUD 59.74', '$404.579', 'DKK 15.87', '$418.846', 'KRW 30.68'], "Extracted Date Time Mention": ['tuesday', 'two weeks', 'wednesday', 'week', 'weekend'], "Extracted Disease": ['disease_286', 'disease_288', 'disease_290', 'disease_292', 'disease_294'], "Extracted Facility": ['facility_286', 'facility_288', 'facility_290', 'facility_292', 'facility_294'], "Extracted Incident": ['incident_393', 'incident_394', 'incident_395', 'incident_396', 'incident_397'], "Extracted Locations": ['Ukraine', 'United Kingdom', 'United States', 'Venezuela', 'Vietnam'], "Extracted Miscellaneous": ['info86', 'sdk88', 'dev90', 'ml92', 'data94'], "Extracted Organism": ['organism_286', 'organism_288', 'organism_290', 'organism_292', 'organism_294'], "Extracted Substance": ['substance_286', 'substance_288', 'substance_290', 'substance_292', 'substance_294'], "Extracted Vehicle": ['vehicle_286', 'vehicle_288', 'vehicle_290', 'vehicle_292', 'vehicle_294'], "Extracted Weapon": ['weapon_286', 'weapon_288', 'weapon_290', 'weapon_292', 'weapon_294'], Label: ['label_193', 'label_194', 'label_195', 'label_196', 'label_197'], Space: ['space_286', 'space_288', 'space_290', 'space_292', 'space_294'], "Space Key": ['spacekey_286', 'spacekey_288', 'spacekey_290', 'spacekey_292', 'spacekey_294'] },
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
    metrics: { views: 3800000, likes: 285000, shares: 125000, comments: 42000, platform: 'tiktok', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Kateryna Stepanenko with William Runkel', Axis: 'East', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'confluence', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'smartphones', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Corporate', Region: 'luhansk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Create defensible buffer zones in Sumy Oblast along the international border', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'regime', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tl', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_100', 'animal_102', 'animal_104', 'animal_106', 'animal_108'], "Extracted Currency": ['$826.884', 'GBP 30.02', '$780.707', 'AUD 5.48', '$762.703'], "Extracted Date Time Mention": ['11 week', '13 month', '15 year', '17 minute', '19 day'], "Extracted Disease": ['disease_300', '-hd', 'abuse', 'acc', 'achiness'], "Extracted Facility": ['facility_300', 'abortion clinics', 'air bases', 'airbase', 'airfield'], "Extracted Incident": ['incident_400', 'incident_401', 'incident_402', 'incident_403', 'incident_404'], "Extracted Locations": ['Switzerland (region 100)', 'Taiwan (region 102)', 'Tanzania (region 104)', 'Togo (region 106)', 'Turkey (region 108)'], "Extracted Miscellaneous": ['cache0', 'a2op', 'ai', 'analyze', 'api'], "Extracted Organism": ['organism_300', 'a2op', 'ac-2', 'alpine', 'anthrax'], "Extracted Substance": ['substance_300', 'a2op', 'alcohol', 'aml12v2', 'apple sauce'], "Extracted Vehicle": ['vehicle_300', '570s', 'aircraft', 'aircraft carrier', 'airplane'], "Extracted Weapon": ['weapon_300', '\'guns', '-guided (tow) missile launcher', '-ship missile', '100 mm shell supplies'], Label: ['label_200', 'label', 'a2op', 'admin', 'alembic'], Space: ['space_300', '2023 Company-wide Progress Updates', 'API Team', 'AWS Marketplace KB', 'Analyze'], "Space Key": ['spacekey_300', '2CPU', 'A2', 'AM', 'AMK'] },
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
    metrics: { likes: 8450, comments: 1850, shares: 4200, platform: 'x', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Misha Simakovskyy', Axis: 'North', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'The Secret Adversary', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'smartphonesbut', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Government', Region: 'northern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border', "Section Name": 'Regime Issues', "Section Type": 'overview', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ru', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_114', 'animal_116', 'animal_118', 'animal_120', 'animal_122'], "Extracted Currency": ['KRW 38.39', '$444.781', 'ZAR 49.36', '$641.553', 'GBP 4.04'], "Extracted Date Time Mention": ['25 month', '27 year', '29 minute', '1 day (100)', '2 days (101)'], "Extracted Disease": ['adrenocortical carcinoma', 'aids', 'aids lives', 'aids virus', 'alcoholism'], "Extracted Facility": ['airports', 'amac market lugbe abuja', 'angelic care hospital and maternity', 'apartment', 'apartment building'], "Extracted Incident": ['incident_407', 'incident_408', 'incident_409', 'incident_410', 'incident_411'], "Extracted Locations": ['Venezuela (region 114)', 'Yemen (region 116)', 'Zimbabwe (region 118)', 'Algeria (region 120)', 'Angola (region 122)'], "Extracted Miscellaneous": ['automate', 'azure', 'big20', 'boolean', 'chinese'], "Extracted Organism": ['aphelidiomyceta', 'apple', 'apples', 'argocd', 'babybear'], "Extracted Substance": ['bert', 'bilstm', 'biofuel', 'blood gold', 'cannabis'], "Extracted Vehicle": ['apache', 'armored personnel carrier', 'armored personnel carriers', 'armored vehicle', 'armoured combat vehicles'], "Extracted Weapon": ['105-mm gun', '105mm cannon', '120-millimeter gun', '120-mm artillery shells', '120-mm rifled gun'], Label: ['balsamiq-blueprint', 'bugs', 'ceremonies', 'cloudformation', 'confluence'], Space: ['Applied Research', 'Army On-Prem', 'Azure Migration', 'Baptiste Henríquez', 'Ben Hammel'], "Space Key": ['API', 'CDC', 'CIBOT', 'CORE', 'CS'] },
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
    metrics: { likes: 6850, comments: 2450, shares: 3200, platform: 'facebook', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Nicole Wolkov', Axis: 'South', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'he Murder on the Links', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'tablet', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Journal', Region: 'southern', "Report Type": 'SIGINT', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border and approach to within tube artillery range of Sumy City', "Section Name": 'Russian Force Generation', "Section Type": 'kinetic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'no-lang', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_128', 'animal_130', 'animal_132', 'animal_134', 'animal_136'], "Extracted Currency": ['$53.659', 'DKK 31.43', '$233.075', 'KRW 53.57', '$308.672'], "Extracted Date Time Mention": ['5 week', '6 weeks', '7 month', '8 months', '9 year'], "Extracted Disease": ['android malware', 'anger', 'anomaly', 'anti-hd', 'anxiety'], "Extracted Facility": ['barracks', 'base', 'battlefield', 'battlefields', 'bridge'], "Extracted Incident": ['incident_414', 'incident_415', 'incident_416', 'incident_417', 'incident_418'], "Extracted Locations": ['Benin (region 128)', 'Bosnia (region 130)', 'Bulgaria (region 132)', 'Burundi (region 134)', 'Cameroon (region 136)'], "Extracted Miscellaneous": ['csv', 'data', 'data explorer', 'data model', 'datadog'], "Extracted Organism": ['bananas', 'bart t2t', 'bdd', 'bert', 'bilstms'], "Extracted Substance": ['carbon fibre', 'carbon-fiber', 'cbds', 'chemical substance', 'chlorhexadol'], "Extracted Vehicle": ['attack drones', 'attack helicopters', 'b-52', 'battle tank', 'bayraktar tb2'], "Extracted Weapon": ['120mm “main gun” cannon', '130mm main gun', '137f138', '142 high mobility artillery rocket system', '152mm shells'], Label: ['data', 'data-science', 'databases', 'datasets', 'decision'], Space: ['Brian Carlson', 'Brian Moss', 'CI BOT', 'CORE', 'Cindy Ma'], "Space Key": ['DEL', 'DEVOPS', 'DIS', 'DTIC', 'E'] },
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
    metrics: { likes: 18500, comments: 4250, platform: 'reddit', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Lea Corticchiato', Axis: 'East', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'dod-administrative-instructions', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'tablets', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Miscellaneous', Region: 'donetsk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Cross the Oskil River in Kharkiv Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'force_generation', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'pt', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_142', 'animal_144', 'animal_146', 'animal_148', 'animal_150'], "Extracted Currency": ['GBP 60.29', '$892.979', 'AUD 27.48', '$131.939', 'DKK 88.47'], "Extracted Date Time Mention": ['12 minutes', '13 day', '14 days', '15 hour', '16 hours'], "Extracted Disease": ['asthma', 'atitis b', 'avian influenza', 'bas-hepatitis b', 'bdd'], "Extracted Facility": ['buildings', 'cafes', 'camp', 'checkpoint', 'checkpoints'], "Extracted Incident": ['incident_421', 'incident_422', 'incident_423', 'incident_424', 'incident_425'], "Extracted Locations": ['Cuba (region 142)', 'Czech Republic (region 144)', 'Ecuador (region 146)', 'Ethiopia (region 148)', 'Gabon (region 150)'], "Extracted Miscellaneous": ['delta 3', 'dev', 'docker', 'document', 'dsta'], "Extracted Organism": ['c3po', 'carrots', 'cdws', 'cdws be', 'celery'], "Extracted Substance": ['co-nlp', 'co2', 'coal', 'cobalt', 'cocaine'], "Extracted Vehicle": ['boat', 'bomber', 'bradley armored vehicles', 'caesar 8×8 self-propelled howitzers', 'camels'], "Extracted Weapon": ['155-millimetre calibre shells', '155-mm caesar artillery', '155mm ammunition', '155mm rounds', '155mm self-propelled howitzers'], Label: ['delta', 'delta-3', 'demo', 'design-decision', 'development'], Space: ['Customer Delivery Council', 'Customer Engineering', 'Customer Success', 'Dan Handley', 'David Hayden'], "Space Key": ['FABLAB', 'FDE', 'FI', 'GLOBAL', 'GOV'] },
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
    metrics: { views: 2200000, likes: 165000, shares: 72000, comments: 28000, platform: 'tiktok', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Karolina Hird with Nate Trotter', Axis: 'North', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'law enforcement reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'telecommunication devices', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Local', Region: 'kharkiv', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Maintain frontline positions and secure rear areas against Ukrainian strikes', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'diplomatic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'multiple', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_156', 'animal_158', 'animal_160', 'animal_162', 'animal_164'], "Extracted Currency": ['$179.181', 'ZAR 14.60', '$149.649', 'GBP 53.37', '$55.271'], "Extracted Date Time Mention": ['19 month', '20 months', '21 year', '22 years', '23 minute'], "Extracted Disease": ['bleeding', 'blood clot to', 'burn', 'burns', 'cancer'], "Extracted Facility": ['classroom', 'clinics', 'college', 'college campuses', 'conference rooms'], "Extracted Incident": ['incident_428', 'incident_429', 'incident_430', 'incident_431', 'incident_432'], "Extracted Locations": ['Guinea (region 156)', 'Honduras (region 158)', 'Iceland (region 160)', 'Iran (region 162)', 'Ireland (region 164)'], "Extracted Miscellaneous": ['elasticsearch', 'english', 'etl', 'facebook', 'fe'], "Extracted Organism": ['clover', 'corn', 'coronavirus', 'coronaviruses', 'covid'], "Extracted Substance": ['covid-19 vaccine', 'cui', 'd2', 'delta 2', 'delta 3'], "Extracted Vehicle": ['chopper crash', 'civilian', 'civilian vehicle', 'civilian vehicles', 'combat aircraft'], "Extracted Weapon": ['20-millimeter gun', '20-mm gun', '25 mm ammunition', '25 mm m242 bushmaster chain gun', '25-millimeter ammunition'], Label: ['documentation-space-sample', 'draft', 'ds', 'dsrp', 'dtic'], Space: ['Deloitte', 'Delta', 'Delta 3.0', 'DevOps', 'Dhruv Soni'], "Space Key": ['INFRA', 'IT', 'LIG', 'LPP', 'LS'] },
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
    metrics: { likes: 5850, comments: 1420, shares: 2800, platform: 'x', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Misha Simanovskyy', Axis: 'South', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev-v2', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'telegram', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Organisation', Region: 'luhansk', "Report Type": 'SIGINT', "Russian Objective": 'Maintain frontline positions, secure rear areas against Ukrainian strikes, and advance within tube artillery range of Zaporizhzhia City', "Section Name": 'Zaporizhia Oblast', "Section Type": 'Top Line', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ca', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_170', 'animal_172', 'animal_174', 'animal_176', 'animal_178'], "Extracted Currency": ['DKK 20.08', '$367.898', 'KRW 75.72', '$671.208', 'ZAR 43.52'], "Extracted Date Time Mention": ['26 days', '27 hour', '28 hours', '29 week', '30 weeks'], "Extracted Disease": ['computer fraud and abuse act', 'coronavirus', 'covid-19', 'cybersecurity', 'death'], "Extracted Facility": ['detention center', 'displacement camps', 'dock', 'educational institution', 'elevator'], "Extracted Incident": ['incident_435', 'incident_436', 'incident_437', 'incident_438', 'incident_439'], "Extracted Locations": ['Kyrgyzstan (region 170)', 'Latvia (region 172)', 'Liberia (region 174)', 'Lithuania (region 176)', 'Madagascar (region 178)'], "Extracted Miscellaneous": ['flan', 'flashpoint', 'g2', 'github', 'global'], "Extracted Organism": ['crunchydata', 'cucumber', 'cui', 'cujs', 'cypress'], "Extracted Substance": ['delta3', 'diamond', 'diamonds', 'diesel', 'dpo'], "Extracted Vehicle": ['drone', 'drone attacks', 'drone strikes', 'drones', 'electric car'], "Extracted Weapon": ['air defence systems', 'air-to-air missiles', 'airbags', 'ak-47', 'ammunition'], Label: ['education', 'elasticsearch', 'erd', 'es', 'excluded-sources'], Space: ['Engineering Culture', 'Entities', 'Experience', 'FINANCE', 'Fab Lab'], "Space Key": ['MLDX', 'MLOPS', 'MLP', 'MO', 'PA'] },
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
    metrics: { likes: 8450, comments: 2850, shares: 1850, platform: 'facebook', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'Karolina Hird with William Runkel', Axis: 'East', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'telephone', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'National', Region: 'northern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Push Ukrainian forces back from the international border to create a defensible buffer zone with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Donetsk Oblast', "Section Type": 'Supporting Effort - Southern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'cs', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_184', 'animal_186', 'animal_188', 'animal_190', 'animal_192'], "Extracted Currency": ['$800.233', 'AUD 7.03', '$47.078', 'DKK 75.22', '$190.514'], "Extracted Date Time Mention": ['33 year', '34 years', '35 minute', '36 minutes', '37 day'], "Extracted Disease": ['dengue fever', 'diabetes', 'disease', 'diseases', 'disorder'], "Extracted Facility": ['farm', 'field hospitals', 'fugees', 'garages', 'garrisons'], "Extracted Incident": ['incident_442', 'incident_443', 'incident_444', 'incident_445', 'incident_446'], "Extracted Locations": ['Mauritius (region 184)', 'Mongolia (region 186)', 'Morocco (region 188)', 'Myanmar (region 190)', 'Nepal (region 192)'], "Extracted Miscellaneous": ['http', 'jira', 'json', 'k8s', 'kafka'], "Extracted Organism": ['dtictagger', 'dvc', 'ebs-csi', 'edible mushroom', 'education in the knowledge society'], "Extracted Substance": ['drug', 'drugs', 'dtic', 'dtic/delta3', 'dtictr'], "Extracted Vehicle": ['ferrari sf90', 'fighter', 'four-by-four vehicles', 'french', 'french fighter jets'], "Extracted Weapon": ['artillery', 'artillery attack', 'artillery shelling', 'artillery strikes', 'atacms missiles'], Label: ['finance', 'functional_review', 'fundraising', 'howto', 'jira'], Space: ['HAL0', 'Human Resources', 'INFRA', 'IT Operations', 'John Bohannon'], "Space Key": ['PM', 'PRIM', 'PRISEC', 'PROTO', 'PX'] },
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
    metrics: { likes: 9850, comments: 2150, platform: 'reddit', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Jennie Olmstead', Axis: 'North', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'testing-waikato-external-workflows', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'touch screen tvs', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Press Wire', Region: 'southern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Push Ukrainian forces back from the international border with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Kharkiv Oblast', "Section Type": 'Supporting Effort - Northern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'en', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_198', 'animal_200', 'animal_202', 'animal_204', 'animal_206'], "Extracted Currency": ['ZAR 17.66', '$490.161', 'GBP 14.03', '$723.420', 'AUD 84.58'], "Extracted Date Time Mention": ['40 hours', '41 week', '42 weeks', '43 month', '44 months'], "Extracted Disease": ['ebola hemorrhagic fever', 'famine', 'fatigue', 'foodborne illness', 'genocide'], "Extracted Facility": ['gym', 'hampton by hilton kuwait salmiya', 'headquarters', 'highway', 'highways'], "Extracted Incident": ['incident_449', 'incident_450', 'incident_451', 'incident_452', 'incident_453'], "Extracted Locations": ['Norway (region 198)', 'Panama (region 200)', 'Peru (region 202)', 'Poland (region 204)', 'Romania (region 206)'], "Extracted Miscellaneous": ['lighttag', 'linkedin', 'llm', 'mdm', 'medium'], "Extracted Organism": ['flan', 'flan xl', 'flowering', 'flowers', 'flux'], "Extracted Substance": ['extraction pills', 'fentanyl', 'flan', 'flan-t5', 'flan-t5-xl'], "Extracted Vehicle": ['helicopter crash', 'helicopters', 'humvee', 'iaf aircraft crash', 'iaf chopper crash'], "Extracted Weapon": ['barrel bomb', 'battlefield nuclear weapons', 'bomb', 'bullet', 'car bomb'], Label: ['kb-how-to-article', 'kb-troubleshooting-article', 'keep', 'keepandupdate', 'labeling'], Space: ['Joseph Catrambone', 'José Pablo Parajeles', 'Karla Martínez', 'Kit Stoecker', 'Kompute'], "Space Key": ['QSV', 'REC', 'SCIENCE', 'SER', 'SFO'] },
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
    metrics: { views: 4500000, likes: 320000, shares: 185000, comments: 52000, platform: 'tiktok', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'James Greene', Axis: 'South', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'test-olivier-2025-06-20', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'walkie talkies', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Trade', Region: 'donetsk', "Report Type": 'SIGINT', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'Subordinate Main Effort #3 - Donetsk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'es', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_212', 'animal_214', 'animal_216', 'animal_218', 'animal_220'], "Extracted Currency": ['$921.898', 'KRW 16.14', '$777.442', 'ZAR 80.61', '$174.066'], "Extracted Date Time Mention": ['47 minute', '48 minutes', '49 day', '50 days', '51 hour'], "Extracted Disease": ['hallucinates', 'hallucination', 'hallucinations', 'headache', 'heartache'], "Extracted Facility": ['hospital', 'hospitals', 'hotel', 'hotel room', 'hotels'], "Extracted Incident": ['incident_456', 'incident_457', 'incident_458', 'incident_459', 'incident_460'], "Extracted Locations": ['Slovenia (region 212)', 'South Sudan (region 214)', 'Sri Lanka (region 216)', 'Sweden (region 218)', 'Syria (region 220)'], "Extracted Miscellaneous": ['model', 'mvp', 'naspers', 'nel', 'ner'], "Extracted Organism": ['gcp', 'george bush', 'gpt', 'gpt 3.5', 'gpt 4'], "Extracted Substance": ['fouo', 'g2', 'g2-onprem', 'g2_ss', 'gas'], "Extracted Vehicle": ['leclerc tanks', 'leopard 2 battle tanks', 'leopard 2 tanks', 'leopard tanks', 'light vehicles'], "Extracted Weapon": ['communication device', 'communication devices', 'conventional', 'cruise missiles', 'cyber weapons'], Label: ['live-site', 'machine', 'meeting-notes', 'metadata', 'microsoft'], Space: ['Lonely Planet: Primer', 'ML Developer Experience', 'Machine Learning Operations', 'Marketing', 'Marketing Operations & Sales Development'], "Space Key": ['STOR', 'TDM', 'THREAD', 'UKENG', 'UX'] },
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
    metrics: { likes: 28500, comments: 4850, shares: 12500, platform: 'x', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Grace Mappes', Axis: 'East', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'test-delete-docs', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'ab 481 military equipment category 1', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Academic', Region: 'kharkiv', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and advance into Dnipropetrovsk Oblast', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'Subordinate Main Effort #2 - Luhansk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'fr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_226', 'animal_228', 'animal_230', 'animal_232', 'animal_234'], "Extracted Currency": ['AUD 93.56', '$454.600', 'DKK 97.14', '$629.684', 'KRW 78.04'], "Extracted Date Time Mention": ['54 weeks', '55 month', '56 months', '57 year', '58 years'], "Extracted Disease": ['icl', 'illness', 'infected', 'infection', 'infectious disease'], "Extracted Facility": ['hub', 'kenkin chuzaikan jimusho', 'libraries', 'market', 'medical facility'], "Extracted Incident": ['incident_463', 'incident_464', 'incident_465', 'incident_466', 'incident_467'], "Extracted Locations": ['Tunisia (region 226)', 'Turkmenistan (region 228)', 'Ukraine (region 230)', 'Uzbekistan (region 232)', 'Vietnam (region 234)'], "Extracted Miscellaneous": ['okta', 'org', 'overview', 'poc', 'postgres'], "Extracted Organism": ['gpt-3 3b', 'gpt-3.5', 'gpt-4', 'gpt-4-0613', 'gpt-4o'], "Extracted Substance": ['gpt', 'gpt 4', 'gpt-2', 'gpt-3', 'gpt-3.5'], "Extracted Vehicle": ['main battle tanks', 'mclaren artura', 'mclaren artura plug-in hybrid', 'mclaren artura plug-in hybrid supercar', 'mclaren gt'], "Extracted Weapon": ['firearms', 'generators', 'gun', 'guns', 'gunshots'], Label: ['model', 'models', 'monitor-sharing', 'must-have', 'naming'], Space: ['Mentorship', 'Noah Vaughn Randolph', 'Oliver Rivas', 'Olivier Le Floch', 'On Prem Global'], "Space Key": ['blog', 'joseph', '~113287679', '~349473687', '~425645408'] },
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
    metrics: { likes: 12500, comments: 4850, shares: 3200, platform: 'facebook', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'George Barros with William Runkel', Axis: 'North', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'source_name', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'apple iphone x', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Consumer', Region: 'luhansk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and possibly advance into Dnipropetrovsk Oblast', "Section Name": 'Regime Issues', "Section Type": 'Subordinate Main Effort #1 - Kharkiv', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'id', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_240', 'animal_242', 'animal_244', 'animal_246', 'animal_248'], "Extracted Currency": ['$37.224', 'GBP 23.91', '$415.366', 'AUD 41.74', '$652.036'], "Extracted Date Time Mention": ['1 day ago', '2 days ago', '3 hour ago', '4 hours ago', '5 week ago'], "Extracted Disease": ['iqt', 'jewish disabilities', 'lynch syndrome', 'mal de meleda', 'malaria'], "Extracted Facility": ['military camp', 'museum', 'nursing home', 'office', 'oil refinery'], "Extracted Incident": ['incident_470', 'incident_471', 'incident_472', 'incident_473', 'incident_474'], "Extracted Locations": ['Andorra (region 240)', 'Austria (region 242)', 'Belarus (region 244)', 'Belize (region 246)', 'Bolivia (region 248)'], "Extracted Miscellaneous": ['prod', 'python', 'qes', 'reddit', 'redis'], "Extracted Organism": ['gpt3.5', 'gpt4', 'grass', 'grpc', 'gunicorn'], "Extracted Substance": ['gpt-j', 'gpt3.5', 'gpt4', 'gpt4o', 'green copper'], "Extracted Vehicle": ['mercedes-benz cars', 'mercedes-benz s-class', 'mi-8', 'mi-8mt', 'military aircraft'], "Extracted Weapon": ['helm controller', 'hypersonic missile', 'hypersonic missiles', 'improvised explosive device', 'kinzhal hypersonic missiles'], Label: ['odetta', 'off_boarding', 'offboarding', 'okrs', 'okta'], Space: ['Primer Automate', 'Primer Classification', 'Primer Security', 'PrimerAdmin', 'Product Management'], "Space Key": ['~506445746', '~5570587cc24388670d41b0a9f6b75d13a0adce', '~557058a6d36c04f637473d9738cdea4947dfb1', '~582938503', '~5a3d61fae30920121a4933be'] },
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
    metrics: { views: 5800000, likes: 425000, shares: 245000, comments: 68000, platform: 'tiktok', "Message Type": 'Tactical Chat' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'George Barros with Nate Trotter', Axis: 'South', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'social', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'automated', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Corporate', Region: 'northern', "Report Type": 'SIGINT', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donecatsk Oblast', "Section Name": 'Russian Force Generation', "Section Type": 'Main Effort - Eastern Ukraine', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'it', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_254', 'animal_256', 'animal_258', 'animal_260', 'animal_262'], "Extracted Currency": ['KRW 41.17', '$64.877', 'ZAR 42.30', '$464.270', 'GBP 16.69'], "Extracted Date Time Mention": ['8 months ago', '9 year ago', '10 years ago', '11 minute ago', '12 minutes ago'], "Extracted Disease": ['measles', 'mental health', 'miscarriage', 'mlh1', 'mortality'], "Extracted Facility": ['port', 'presidential palace', 'prison', 'public schools', 'refugee camps'], "Extracted Incident": ['incident_477', 'incident_478', 'incident_479', 'incident_480', 'incident_481'], "Extracted Locations": ['Cambodia (region 254)', 'Chad (region 256)', 'Colombia (region 258)', 'Croatia (region 260)', 'Cyprus (region 262)'], "Extracted Miscellaneous": ['s3', 'saml', 'search', 'searchdb', 'semantic'], "Extracted Organism": ['lora', 'naspers', 'ner', 'nlx', 'oranges'], "Extracted Substance": ['hydros', 'iac', 'mcla', 'minerals', 'natural gas'], "Extracted Vehicle": ['military vehicles', 'mveh', 'nimr ajban apcs', 'pt-91s', 'self-propelled caesar howitzers'], "Extracted Weapon": ['m142 himars', 'm4', 'machete', 'machine gun', 'military weapons'], Label: ['postgresql', 'process', 'projectplan', 'qalex', 'query'], Space: ['Quality Assurance', 'Quicksilver2', 'Recruiting', 'Russell Cardullo', 'Sales Engineering'], "Space Key": ['~5c8fcb85fbf7532d14b4f40e', '~5d1d0a5fca72d00d24ba075a', '~5d8d410dc343800dbc03927b', '~5e2a0e4d0fa3a90c9eb72842', '~5f34266d8d89e30046267649'] },
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
    metrics: { likes: 8920, comments: 2450, platform: 'reddit', "Message Type": 'Locator' },
    metadata: { vendor_id: 'moreover', "Message Type": 'Tactical Chat' , Authors: 'George Barros', Axis: 'East', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'news', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'burner phone', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Government', Region: 'southern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'Key Takeaways', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'de', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_268', 'animal_270', 'animal_272', 'animal_274', 'animal_276'], "Extracted Currency": ['$666.688', 'DKK 86.16', '$439.304', 'KRW 58.98', '$928.251'], "Extracted Date Time Mention": ['15 hour ago', '16 hours ago', '17 week ago', '18 weeks ago', '19 month ago'], "Extracted Disease": ['pain', 'pandemic', 'poverty', 'pregnancy loss', 'rabies'], "Extracted Facility": ['restaurants', 'road', 'road network', 'roads', 'school'], "Extracted Incident": ['incident_484', 'incident_485', 'incident_486', 'incident_487', 'incident_488'], "Extracted Locations": ['Finland (region 268)', 'Gambia (region 270)', 'Ghana (region 272)', 'Guatemala (region 274)', 'Haiti (region 276)'], "Extracted Miscellaneous": ['spacy', 'sprint', 'sql', 'tagger', 'tbd'], "Extracted Organism": ['plants', 'potatoes', 'ppo', 'quicksilver', 'rag-v'], "Extracted Substance": ['platinum', 'primer (leawood, kan.)', 'primer-core', 'primer-nlx', 'pvc'], "Extracted Vehicle": ['speedtail', 'sport utility vehicle', 'submarine', 'switchblade drones', 't-64s'], "Extracted Weapon": ['missiles', 'nuclear weapon', 'patriot air defence missiles', 'pistol', 'radar'], Label: ['release', 'relex', 'requirements', 'research', 'resource-sharing'], Space: ['Search Feed Overview', 'Services', 'Stories', 'Tal Perry', 'Technical Program Management'], "Space Key": ['~6009f92cbb4eb50078a543ed', '~613a4128a4f86e00696a5a3b', '~616280103', '~6164a585198b4f0068d0ec66', '~6179d52c25f3130070d7ffb0'] },
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
    metadata: { vendor_id: 'moreover', "Message Type": 'Locator' , Authors: 'Frederick W. Kagan with Veronica Iredale', Axis: 'North', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'user-upload', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'cel', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Journal', Region: 'donetsk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Create defensible buffer zones in Sumy Oblast along the international border', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'strikes', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_282', 'animal_284', 'animal_286', 'animal_288', 'animal_290'], "Extracted Currency": ['GBP 87.86', '$386.097', 'AUD 36.13', '$850.324', 'DKK 15.06'], "Extracted Date Time Mention": ['22 years ago', '23 minute ago', '24 minutes ago', '25 day ago', '26 days ago'], "Extracted Disease": ['sexual harassment', 'sick', 'slavery', 'starvation', 'stress'], "Extracted Facility": ['shop', 'store', 'stores', 'street', 'streets'], "Extracted Incident": ['incident_491', 'incident_492', 'incident_493', 'incident_494', 'incident_495'], "Extracted Locations": ['Iraq (region 282)', 'Italy (region 284)', 'Kazakhstan (region 286)', 'Kuwait (region 288)', 'Laos (region 290)'], "Extracted Miscellaneous": ['the.com', 'triton', 'twitter', 'vpn', 'wikidata'], "Extracted Organism": ['spinach', 'tf-idf', 'toadstools', 'tree', 'trees'], "Extracted Substance": ['rosa \'gold star\'', 'silver', 'sugar', 'tf-idf', 'trecms'], "Extracted Vehicle": ['t-80s', 't-84s', 'tank', 'tanks', 'train'], "Extracted Weapon": ['short-barreled mortar', 'shrapnel', 'tactical nuclear weapon', 'tesla t4 gpu', 'tomahawk cruise missiles'], Label: ['risk-log', 's3', 'search', 'searchdb', 'software_approval'], Space: ['UK-Eng', 'UX Design', 'Walmart', 'Website', 'Yonder'], "Space Key": ['~71202057736a74c41e45cdac05c41a76ae9663', '~7120206418068270374cb7a5e5eba82da4660a', '~71202089db19c3a64348ae9ac97ecc0d1c5240', '~7120208d6cebbce2e44151bb08761f1dd89580', '~712020bd682501cf254000ac8effbbbb527e88'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228568258' , Authors: 'Frederick W. Kagan', Axis: 'South', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'navy intel reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'cell', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Miscellaneous', Region: 'kharkiv', "Report Type": 'SIGINT', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border', "Section Name": 'Zaporizhia Oblast', "Section Type": 'regime', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tl', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_296', 'animal_298', 'animal_300', 'animal_302', 'animal_304'], "Extracted Currency": ['$871.674', 'ZAR 32.25', '$763.888', 'GBP 7.15', '$347.669'], "Extracted Date Time Mention": ['29 week ago', '30 weeks ago', '31 month ago', '32 months ago', '33 year ago'], "Extracted Disease": ['ukraine', 'virus', 'disease_100', 'disease_102', 'disease_104'], "Extracted Facility": ['university', 'warehouse', 'facility_100', 'facility_102', 'facility_104'], "Extracted Incident": ['incident_498', 'incident_499', 'incident_500', '1987 south africa floods', '2022 conference'], "Extracted Locations": ['Luxembourg (region 296)', 'Malawi (region 298)', 'Mali (region 300)', 'Mauritania (region 302)', 'Moldova (region 304)'], "Extracted Miscellaneous": ['xlnet', 'yaml', 'batch0', 'query2', 'schema4'], "Extracted Organism": ['viruses', 'worms', 'organism_100', 'organism_102', 'organism_104'], "Extracted Substance": ['vaccine', 'water', 'substance_100', 'substance_102', 'substance_104'], "Extracted Vehicle": ['vehicles', 'vessel', 'vehicle_100', 'vehicle_102', 'vehicle_104'], "Extracted Weapon": ['weaponry', 'weapons', 'weapon_100', 'weapon_102', 'weapon_104'], Label: ['tech-spec-folder', 'template', 'tickets', 'label_101', 'label_102'], Space: ['jeffrey.miller', 'leila.khalili', 'space_100', 'space_102', 'space_104'], "Space Key": ['~712020f620cb0c053f4fd5a18d973e4d6a557b', '~943939812', 'spacekey_100', 'spacekey_102', 'spacekey_104'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228818126' , Authors: 'Diana Nesreddine', Axis: 'East', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": '2025-Apr-Map-Demo-1', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'cell phone', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Local', Region: 'luhansk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border and approach to within tube artillery range of Sumy City', "Section Name": 'Donetsk Oblast', "Section Type": 'overview', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ru', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_310', 'animal_312', 'animal_314', 'animal_316', 'animal_318'], "Extracted Currency": ['$0.002', '$0.004', '$0.01', '$0.016', '$0.02'], "Extracted Date Time Mention": ['36 minutes ago', '37 day ago', '38 days ago', '39 hour ago', '40 hours ago'], "Extracted Disease": ['disease_110', 'disease_112', 'disease_114', 'disease_116', 'disease_118'], "Extracted Facility": ['facility_110', 'facility_112', 'facility_114', 'facility_116', 'facility_118'], "Extracted Incident": ['activities', 'air force trial', 'air strikes', 'airstrikes', 'armed conflict'], "Extracted Locations": ['Namibia (region 310)', 'Netherlands (region 312)', 'Niger (region 314)', 'North Macedonia (region 316)', 'Pakistan (region 318)'], "Extracted Miscellaneous": ['web10', 'io12', 'log14', 'alert16', 'trace18'], "Extracted Organism": ['organism_110', 'organism_112', 'organism_114', 'organism_116', 'organism_118'], "Extracted Substance": ['substance_110', 'substance_112', 'substance_114', 'substance_116', 'substance_118'], "Extracted Vehicle": ['vehicle_110', 'vehicle_112', 'vehicle_114', 'vehicle_116', 'vehicle_118'], "Extracted Weapon": ['weapon_110', 'weapon_112', 'weapon_114', 'weapon_116', 'weapon_118'], Label: ['label_105', 'label_106', 'label_107', 'label_108', 'label_109'], Space: ['space_110', 'space_112', 'space_114', 'space_116', 'space_118'], "Space Key": ['spacekey_110', 'spacekey_112', 'spacekey_114', 'spacekey_116', 'spacekey_118'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228821252' , Authors: 'Diana Nassreddine', Axis: 'North', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'ISW', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'cell phones', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Organisation', Region: 'northern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Cross the Oskil River in Kharkiv Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Kharkiv Oblast', "Section Type": 'kinetic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'no-lang', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_324', 'animal_326', 'animal_328', 'animal_330', 'animal_332'], "Extracted Currency": ['$0.05', '$0.10', '$0.5', '$1', '$1 billion'], "Extracted Date Time Mention": ['43 month ago', '44 months ago', '45 year ago', '46 years ago', '47 minute ago'], "Extracted Disease": ['disease_124', 'disease_126', 'disease_128', 'disease_130', 'disease_132'], "Extracted Facility": ['facility_124', 'facility_126', 'facility_128', 'facility_130', 'facility_132'], "Extracted Incident": ['attacked', 'attacks', 'audit', 'battle', 'battles'], "Extracted Locations": ['Portugal (region 324)', 'Rwanda (region 326)', 'Senegal (region 328)', 'Slovakia (region 330)', 'Somalia (region 332)'], "Extracted Miscellaneous": ['sdk24', 'dev26', 'ml28', 'data30', 'test32'], "Extracted Organism": ['organism_124', 'organism_126', 'organism_128', 'organism_130', 'organism_132'], "Extracted Substance": ['substance_124', 'substance_126', 'substance_128', 'substance_130', 'substance_132'], "Extracted Vehicle": ['vehicle_124', 'vehicle_126', 'vehicle_128', 'vehicle_130', 'vehicle_132'], "Extracted Weapon": ['weapon_124', 'weapon_126', 'weapon_128', 'weapon_130', 'weapon_132'], Label: ['label_112', 'label_113', 'label_114', 'label_115', 'label_116'], Space: ['space_124', 'space_126', 'space_128', 'space_130', 'space_132'], "Space Key": ['spacekey_124', 'spacekey_126', 'spacekey_128', 'spacekey_130', 'spacekey_132'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228843032' , Authors: 'Diana Nasreddine', Axis: 'South', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'Test Data', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'cellphone', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'vk', "Publication Type": 'National', Region: 'southern', "Report Type": 'SIGINT', "Russian Objective": 'Maintain frontline positions and secure rear areas against Ukrainian strikes', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'force_generation', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'pt', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_338', 'animal_340', 'animal_342', 'animal_344', 'animal_346'], "Extracted Currency": ['$1,000', '$1,500', '$1.00', '$1.2 billion', '$1.5 billion'], "Extracted Date Time Mention": ['50 days ago', '51 hour ago', '52 hours ago', '53 week ago', '54 weeks ago'], "Extracted Disease": ['disease_138', 'disease_140', 'disease_142', 'disease_144', 'disease_146'], "Extracted Facility": ['facility_138', 'facility_140', 'facility_142', 'facility_144', 'facility_146'], "Extracted Incident": ['cease-fire', 'ceasefire', 'china taiwan exercise', 'civil unrest', 'civil war'], "Extracted Locations": ['Switzerland (region 338)', 'Taiwan (region 340)', 'Tanzania (region 342)', 'Togo (region 344)', 'Turkey (region 346)'], "Extracted Miscellaneous": ['db38', 'sync40', 'stream42', 'index44', 'model46'], "Extracted Organism": ['organism_138', 'organism_140', 'organism_142', 'organism_144', 'organism_146'], "Extracted Substance": ['substance_138', 'substance_140', 'substance_142', 'substance_144', 'substance_146'], "Extracted Vehicle": ['vehicle_138', 'vehicle_140', 'vehicle_142', 'vehicle_144', 'vehicle_146'], "Extracted Weapon": ['weapon_138', 'weapon_140', 'weapon_142', 'weapon_144', 'weapon_146'], Label: ['label_119', 'label_120', 'label_121', 'label_122', 'label_123'], Space: ['space_138', 'space_140', 'space_142', 'space_144', 'space_146'], "Space Key": ['spacekey_138', 'spacekey_140', 'spacekey_142', 'spacekey_144', 'spacekey_146'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228843309' , Authors: 'Davit Gasparyan', Axis: 'East', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'confluence', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'cellphones', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Press Wire', Region: 'donetsk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Maintain frontline positions, secure rear areas against Ukrainian strikes, and advance within tube artillery range of Zaporizhzhia City', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'diplomatic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'multiple', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_352', 'animal_354', 'animal_356', 'animal_358', 'animal_360'], "Extracted Currency": ['$10,000', '$10,000 usd', '$10/1k', '$100', '$100 million'], "Extracted Date Time Mention": ['57 year ago', '58 years ago', '59 minute ago', '60 minutes ago', '1 day later'], "Extracted Disease": ['disease_152', 'disease_154', 'disease_156', 'disease_158', 'disease_160'], "Extracted Facility": ['facility_152', 'facility_154', 'facility_156', 'facility_158', 'facility_160'], "Extracted Incident": ['collision', 'combat', 'combat operations', 'conference', 'conflict'], "Extracted Locations": ['Venezuela (region 352)', 'Yemen (region 354)', 'Zimbabwe (region 356)', 'Algeria (region 358)', 'Angola (region 360)'], "Extracted Miscellaneous": ['net52', 'run54', 'monitor56', 'metric58', 'debug60'], "Extracted Organism": ['organism_152', 'organism_154', 'organism_156', 'organism_158', 'organism_160'], "Extracted Substance": ['substance_152', 'substance_154', 'substance_156', 'substance_158', 'substance_160'], "Extracted Vehicle": ['vehicle_152', 'vehicle_154', 'vehicle_156', 'vehicle_158', 'vehicle_160'], "Extracted Weapon": ['weapon_152', 'weapon_154', 'weapon_156', 'weapon_158', 'weapon_160'], Label: ['label_126', 'label_127', 'label_128', 'label_129', 'label_130'], Space: ['space_152', 'space_154', 'space_156', 'space_158', 'space_160'], "Space Key": ['spacekey_152', 'spacekey_154', 'spacekey_156', 'spacekey_158', 'spacekey_160'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228851834' , Authors: 'Daria Novikov', Axis: 'North', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'The Secret Adversary', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'computer', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Trade', Region: 'kharkiv', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Push Ukrainian forces back from the international border to create a defensible buffer zone with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Regime Issues', "Section Type": 'Top Line', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ca', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_366', 'animal_368', 'animal_370', 'animal_372', 'animal_374'], "Extracted Currency": ['$100k', '$10k', '$10m', '$115k', '$12 million'], "Extracted Date Time Mention": ['4 hours later', '5 week later', '6 weeks later', '7 month later', '8 months later'], "Extracted Disease": ['disease_166', 'disease_168', 'disease_170', 'disease_172', 'disease_174'], "Extracted Facility": ['facility_166', 'facility_168', 'facility_170', 'facility_172', 'facility_174'], "Extracted Incident": ['crash', 'crashes', 'crises', 'crisis', 'cyber attack'], "Extracted Locations": ['Benin (region 366)', 'Bosnia (region 368)', 'Bulgaria (region 370)', 'Burundi (region 372)', 'Cameroon (region 374)'], "Extracted Miscellaneous": ['cli66', 'ops68', 'ai70', 'code72', 'build74'], "Extracted Organism": ['organism_166', 'organism_168', 'organism_170', 'organism_172', 'organism_174'], "Extracted Substance": ['substance_166', 'substance_168', 'substance_170', 'substance_172', 'substance_174'], "Extracted Vehicle": ['vehicle_166', 'vehicle_168', 'vehicle_170', 'vehicle_172', 'vehicle_174'], "Extracted Weapon": ['weapon_166', 'weapon_168', 'weapon_170', 'weapon_172', 'weapon_174'], Label: ['label_133', 'label_134', 'label_135', 'label_136', 'label_137'], Space: ['space_166', 'space_168', 'space_170', 'space_172', 'space_174'], "Space Key": ['spacekey_166', 'spacekey_168', 'spacekey_170', 'spacekey_172', 'spacekey_174'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-229178910' , Authors: 'Christina Harward Anna Harvey', Axis: 'South', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'he Murder on the Links', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'computers', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Academic', Region: 'luhansk', "Report Type": 'SIGINT', "Russian Objective": 'Push Ukrainian forces back from the international border with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Russian Force Generation', "Section Type": 'Supporting Effort - Southern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'cs', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_380', 'animal_382', 'animal_384', 'animal_386', 'animal_388'], "Extracted Currency": ['$15', '$15 billion', '$150', '$15k', '$186k'], "Extracted Date Time Mention": ['11 minute later', '12 minutes later', '13 day later', '14 days later', '15 hour later'], "Extracted Disease": ['disease_180', 'disease_182', 'disease_184', 'disease_186', 'disease_188'], "Extracted Facility": ['facility_180', 'facility_182', 'facility_184', 'facility_186', 'facility_188'], "Extracted Incident": ['data science guild meeting', 'disaster', 'disasters', 'drought', 'dssg meetup'], "Extracted Locations": ['Cuba (region 380)', 'Czech Republic (region 382)', 'Ecuador (region 384)', 'Ethiopia (region 386)', 'Gabon (region 388)'], "Extracted Miscellaneous": ['auth80', 'batch82', 'query84', 'schema86', 'view88'], "Extracted Organism": ['organism_180', 'organism_182', 'organism_184', 'organism_186', 'organism_188'], "Extracted Substance": ['substance_180', 'substance_182', 'substance_184', 'substance_186', 'substance_188'], "Extracted Vehicle": ['vehicle_180', 'vehicle_182', 'vehicle_184', 'vehicle_186', 'vehicle_188'], "Extracted Weapon": ['weapon_180', 'weapon_182', 'weapon_184', 'weapon_186', 'weapon_188'], Label: ['label_140', 'label_141', 'label_142', 'label_143', 'label_144'], Space: ['space_180', 'space_182', 'space_184', 'space_186', 'space_188'], "Space Key": ['spacekey_180', 'spacekey_182', 'spacekey_184', 'spacekey_186', 'spacekey_188'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '628205900' , Authors: 'Anna Harvey', Axis: 'East', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'dod-administrative-instructions', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'fuel-air explosive', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Consumer', Region: 'northern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'Supporting Effort - Northern Axis', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'en', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_394', 'animal_396', 'animal_398', 'animal_400', 'animal_402'], "Extracted Currency": ['$2', '$2 billion', '$2 trillion', '$2,000', '$2.2 billion'], "Extracted Date Time Mention": ['18 weeks later', '19 month later', '20 months later', '21 year later', '22 years later'], "Extracted Disease": ['disease_194', 'disease_196', 'disease_198', 'disease_200', 'disease_202'], "Extracted Facility": ['facility_194', 'facility_196', 'facility_198', 'facility_200', 'facility_202'], "Extracted Incident": ['elections', 'emergency', 'event', 'event communications', 'events'], "Extracted Locations": ['Guinea (region 394)', 'Honduras (region 396)', 'Iceland (region 398)', 'Iran (region 400)', 'Ireland (region 402)'], "Extracted Miscellaneous": ['io94', 'log96', 'alert98', 'trace0', 'error2'], "Extracted Organism": ['organism_194', 'organism_196', 'organism_198', 'organism_200', 'organism_202'], "Extracted Substance": ['substance_194', 'substance_196', 'substance_198', 'substance_200', 'substance_202'], "Extracted Vehicle": ['vehicle_194', 'vehicle_196', 'vehicle_198', 'vehicle_200', 'vehicle_202'], "Extracted Weapon": ['weapon_194', 'weapon_196', 'weapon_198', 'weapon_200', 'weapon_202'], Label: ['label_147', 'label_148', 'label_149', 'label_150', 'label_151'], Space: ['space_194', 'space_196', 'space_198', 'space_200', 'space_202'], "Space Key": ['spacekey_194', 'spacekey_196', 'spacekey_198', 'spacekey_200', 'spacekey_202'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: 'daviddjg0033' , Authors: 'Angelica Evans', Axis: 'North', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'law enforcement reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'imo 5041786', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Corporate', Region: 'southern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and advance into Dnipropetrovsk Oblast', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'Subordinate Main Effort #3 - Donetsk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'es', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_408', 'animal_410', 'animal_412', 'animal_414', 'animal_416'], "Extracted Currency": ['$20 billion', '$20,000', '$200', '$200 million', '$200,000'], "Extracted Date Time Mention": ['25 day later', '26 days later', '27 hour later', '28 hours later', '29 week later'], "Extracted Disease": ['disease_208', 'disease_210', 'disease_212', 'disease_214', 'disease_216'], "Extracted Facility": ['facility_208', 'facility_210', 'facility_212', 'facility_214', 'facility_216'], "Extracted Incident": ['explosions', 'failed', 'failure', 'failures', 'famine'], "Extracted Locations": ['Kyrgyzstan (region 408)', 'Latvia (region 410)', 'Liberia (region 412)', 'Lithuania (region 414)', 'Madagascar (region 416)'], "Extracted Miscellaneous": ['dev8', 'ml10', 'data12', 'test14', 'deploy16'], "Extracted Organism": ['organism_208', 'organism_210', 'organism_212', 'organism_214', 'organism_216'], "Extracted Substance": ['substance_208', 'substance_210', 'substance_212', 'substance_214', 'substance_216'], "Extracted Vehicle": ['vehicle_208', 'vehicle_210', 'vehicle_212', 'vehicle_214', 'vehicle_216'], "Extracted Weapon": ['weapon_208', 'weapon_210', 'weapon_212', 'weapon_214', 'weapon_216'], Label: ['label_154', 'label_155', 'label_156', 'label_157', 'label_158'], Space: ['space_208', 'space_210', 'space_212', 'space_214', 'space_216'], "Space Key": ['spacekey_208', 'spacekey_210', 'spacekey_212', 'spacekey_214', 'spacekey_216'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: 'fuggitdude22' , Authors: 'Adham Fattah', Axis: 'South', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev-v2', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'instant', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Government', Region: 'donetsk', "Report Type": 'SIGINT', "Russian Objective": 'Capture the entirety of Donetsk Oblast, the claimed territory of Russia\'s proxies in Donbas, and possibly advance into Dnipropetrovsk Oblast', "Section Name": 'Zaporizhia Oblast', "Section Type": 'Subordinate Main Effort #2 - Luhansk', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'fr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_422', 'animal_424', 'animal_426', 'animal_428', 'animal_430'], "Extracted Currency": ['$21k', '$25', '$250', '$250k', '$28,620'], "Extracted Date Time Mention": ['32 months later', '33 year later', '34 years later', '35 minute later', '36 minutes later'], "Extracted Disease": ['disease_222', 'disease_224', 'disease_226', 'disease_228', 'disease_230'], "Extracted Facility": ['facility_222', 'facility_224', 'facility_226', 'facility_228', 'facility_230'], "Extracted Incident": ['flood', 'genocide', 'hackathon', 'hackathon 2022', 'herodotus event'], "Extracted Locations": ['Mauritius (region 422)', 'Mongolia (region 424)', 'Morocco (region 426)', 'Myanmar (region 428)', 'Nepal (region 430)'], "Extracted Miscellaneous": ['sync22', 'stream24', 'index26', 'model28', 'repo30'], "Extracted Organism": ['organism_222', 'organism_224', 'organism_226', 'organism_228', 'organism_230'], "Extracted Substance": ['substance_222', 'substance_224', 'substance_226', 'substance_228', 'substance_230'], "Extracted Vehicle": ['vehicle_222', 'vehicle_224', 'vehicle_226', 'vehicle_228', 'vehicle_230'], "Extracted Weapon": ['weapon_222', 'weapon_224', 'weapon_226', 'weapon_228', 'weapon_230'], Label: ['label_161', 'label_162', 'label_163', 'label_164', 'label_165'], Space: ['space_222', 'space_224', 'space_226', 'space_228', 'space_230'], "Space Key": ['spacekey_222', 'spacekey_224', 'spacekey_226', 'spacekey_228', 'spacekey_230'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228568258' , Authors: 'Ian Matthews', Axis: 'East', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'user-upload-test-delete-dev', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'iot devices', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Journal', Region: 'kharkiv', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donecatsk Oblast', "Section Name": 'Donetsk Oblast', "Section Type": 'Subordinate Main Effort #1 - Kharkiv', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'id', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_436', 'animal_438', 'animal_440', 'animal_442', 'animal_444'], "Extracted Currency": ['$3.5 billion', '$3.5 million', '$3.5m', '$30', '$30,000'], "Extracted Date Time Mention": ['39 hour later', '40 hours later', '41 week later', '42 weeks later', '43 month later'], "Extracted Disease": ['disease_236', 'disease_238', 'disease_240', 'disease_242', 'disease_244'], "Extracted Facility": ['facility_236', 'facility_238', 'facility_240', 'facility_242', 'facility_244'], "Extracted Incident": ['incidents', 'insurgency', 'invasion', 'investigation', 'iraq war'], "Extracted Locations": ['Norway (region 436)', 'Panama (region 438)', 'Peru (region 440)', 'Poland (region 442)', 'Romania (region 444)'], "Extracted Miscellaneous": ['run36', 'monitor38', 'metric40', 'debug42', 'warn44'], "Extracted Organism": ['organism_236', 'organism_238', 'organism_240', 'organism_242', 'organism_244'], "Extracted Substance": ['substance_236', 'substance_238', 'substance_240', 'substance_242', 'substance_244'], "Extracted Vehicle": ['vehicle_236', 'vehicle_238', 'vehicle_240', 'vehicle_242', 'vehicle_244'], "Extracted Weapon": ['weapon_236', 'weapon_238', 'weapon_240', 'weapon_242', 'weapon_244'], Label: ['label_168', 'label_169', 'label_170', 'label_171', 'label_172'], Space: ['space_236', 'space_238', 'space_240', 'space_242', 'space_244'], "Space Key": ['spacekey_236', 'spacekey_238', 'spacekey_240', 'spacekey_242', 'spacekey_244'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228818126' , Authors: 'George Barros with Veronica Iredale', Axis: 'North', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'testing-waikato-external-workflows', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'ipad', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Miscellaneous', Region: 'luhansk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Capture the remainder of Luhansk Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Kharkiv Oblast', "Section Type": 'Main Effort - Eastern Ukraine', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'it', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_450', 'animal_452', 'animal_454', 'animal_456', 'animal_458'], "Extracted Currency": ['$3m', '$4', '$400', '$400 million', '$40k'], "Extracted Date Time Mention": ['46 years later', '47 minute later', '48 minutes later', '49 day later', '50 days later'], "Extracted Disease": ['disease_250', 'disease_252', 'disease_254', 'disease_256', 'disease_258'], "Extracted Facility": ['facility_250', 'facility_252', 'facility_254', 'facility_256', 'facility_258'], "Extracted Incident": ['massacres', 'meeting', 'migration', 'military campaign', 'mission'], "Extracted Locations": ['Slovenia (region 450)', 'South Sudan (region 452)', 'Sri Lanka (region 454)', 'Sweden (region 456)', 'Syria (region 458)'], "Extracted Miscellaneous": ['ops50', 'ai52', 'code54', 'build56', 'config58'], "Extracted Organism": ['organism_250', 'organism_252', 'organism_254', 'organism_256', 'organism_258'], "Extracted Substance": ['substance_250', 'substance_252', 'substance_254', 'substance_256', 'substance_258'], "Extracted Vehicle": ['vehicle_250', 'vehicle_252', 'vehicle_254', 'vehicle_256', 'vehicle_258'], "Extracted Weapon": ['weapon_250', 'weapon_252', 'weapon_254', 'weapon_256', 'weapon_258'], Label: ['label_175', 'label_176', 'label_177', 'label_178', 'label_179'], Space: ['space_250', 'space_252', 'space_254', 'space_256', 'space_258'], "Space Key": ['spacekey_250', 'spacekey_252', 'spacekey_254', 'spacekey_256', 'spacekey_258'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228821252' , Authors: 'Frederick W. Kagan with William Runkel', Axis: 'South', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'test-olivier-2025-06-20', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'ipad/laptop', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Local', Region: 'northern', "Report Type": 'SIGINT', "Russian Objective": 'Create defensible buffer zones in Sumy Oblast along the international border', "Section Name": 'Overall Scope of the Russian Offensive', "Section Type": 'Key Takeaways', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'de', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['animal_464', 'animal_466', 'animal_468', 'animal_470', 'animal_472'], "Extracted Currency": ['$5 million', '$50', '$500', '$50k', '$5k'], "Extracted Date Time Mention": ['53 week later', '54 weeks later', '55 month later', '56 months later', '57 year later'], "Extracted Disease": ['disease_264', 'disease_266', 'disease_268', 'disease_270', 'disease_272'], "Extracted Facility": ['facility_264', 'facility_266', 'facility_268', 'facility_270', 'facility_272'], "Extracted Incident": ['operations', 'outage', 'outbreak', 'protests', 'rebellion'], "Extracted Locations": ['Tunisia (region 464)', 'Turkmenistan (region 466)', 'Ukraine (region 468)', 'Uzbekistan (region 470)', 'Vietnam (region 472)'], "Extracted Miscellaneous": ['batch64', 'query66', 'schema68', 'view70', 'lib72'], "Extracted Organism": ['organism_264', 'organism_266', 'organism_268', 'organism_270', 'organism_272'], "Extracted Substance": ['substance_264', 'substance_266', 'substance_268', 'substance_270', 'substance_272'], "Extracted Vehicle": ['vehicle_264', 'vehicle_266', 'vehicle_268', 'vehicle_270', 'vehicle_272'], "Extracted Weapon": ['weapon_264', 'weapon_266', 'weapon_268', 'weapon_270', 'weapon_272'], Label: ['label_182', 'label_183', 'label_184', 'label_185', 'label_186'], Space: ['space_264', 'space_266', 'space_268', 'space_270', 'space_272'], "Space Key": ['spacekey_264', 'spacekey_266', 'spacekey_268', 'spacekey_270', 'spacekey_272'] },
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
    metadata: { vendor_id: 'moreover', author_id_str: '-228843032' , Authors: 'Frederick W. Kagan with Nate Trotter', Axis: 'East', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'test-delete-docs', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'ipads', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Organisation', Region: 'southern', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border', "Section Name": 'Russian Diplomatic and Hybrid Efforts', "Section Type": 'strikes', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tr', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['animal_478', 'animal_480', 'animal_482', 'animal_484', 'animal_486'], "Extracted Currency": ['120k-200k', '1k', '1m', '20k', '3.5 million'], "Extracted Date Time Mention": ['60 minutes later', '1 day from now', '2 days from now', '3 hour from now', '4 hours from now'], "Extracted Disease": ['disease_278', 'disease_280', 'disease_282', 'disease_284', 'disease_286'], "Extracted Facility": ['facility_278', 'facility_280', 'facility_282', 'facility_284', 'facility_286'], "Extracted Incident": ['sicw', 'siege', 'singapore airshow', 'strike', 'summit'], "Extracted Locations": ['Andorra (region 478)', 'Austria (region 480)', 'Belarus (region 482)', 'Belize (region 484)', 'Bolivia (region 486)'], "Extracted Miscellaneous": ['log78', 'alert80', 'trace82', 'error84', 'info86'], "Extracted Organism": ['organism_278', 'organism_280', 'organism_282', 'organism_284', 'organism_286'], "Extracted Substance": ['substance_278', 'substance_280', 'substance_282', 'substance_284', 'substance_286'], "Extracted Vehicle": ['vehicle_278', 'vehicle_280', 'vehicle_282', 'vehicle_284', 'vehicle_286'], "Extracted Weapon": ['weapon_278', 'weapon_280', 'weapon_282', 'weapon_284', 'weapon_286'], Label: ['label_189', 'label_190', 'label_191', 'label_192', 'label_193'], Space: ['space_278', 'space_280', 'space_282', 'space_284', 'space_286'], "Space Key": ['spacekey_278', 'spacekey_280', 'spacekey_282', 'spacekey_284', 'spacekey_286'] },
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
    metadata: { vendor_id: 'moreover', author_profile_url: '-228568258' , Authors: 'Christina Harward', Axis: 'North', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'source_name', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Collect', "Extracted Communication Device": 'iphone', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'National', Region: 'donetsk', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Create defensible buffer zones in northern Ukraine along the international border and approach to within tube artillery range of Sumy City', "Section Name": 'Regime Issues', "Section Type": 'regime', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'tl', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['animal_492', 'animal_494', 'animal_496', 'animal_498', 'animal_500'], "Extracted Currency": ['50k', '600k', '60m', 'billions of dollars', 'million'], "Extracted Date Time Mention": ['7 month from now', '8 months from now', '9 year from now', '10 years from now', '11 minute from now'], "Extracted Disease": ['disease_292', 'disease_294', 'disease_296', 'disease_298', 'disease_300'], "Extracted Facility": ['facility_292', 'facility_294', 'facility_296', 'facility_298', 'facility_300'], "Extracted Incident": ['the crisis', 'trial', 'ukraine war', 'war', 'incident_100'], "Extracted Locations": ['Cambodia (region 492)', 'Chad (region 494)', 'Colombia (region 496)', 'Croatia (region 498)', 'Cyprus (region 500)'], "Extracted Miscellaneous": ['ml92', 'data94', 'test96', 'deploy98', 'cache0'], "Extracted Organism": ['organism_292', 'organism_294', 'organism_296', 'organism_298', 'organism_300'], "Extracted Substance": ['substance_292', 'substance_294', 'substance_296', 'substance_298', 'substance_300'], "Extracted Vehicle": ['vehicle_292', 'vehicle_294', 'vehicle_296', 'vehicle_298', 'vehicle_300'], "Extracted Weapon": ['weapon_292', 'weapon_294', 'weapon_296', 'weapon_298', 'weapon_300'], Label: ['label_196', 'label_197', 'label_198', 'label_199', 'label_200'], Space: ['space_292', 'space_294', 'space_296', 'space_298', 'space_300'], "Space Key": ['spacekey_292', 'spacekey_294', 'spacekey_296', 'spacekey_298', 'spacekey_300'] },
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
    metadata: { vendor_id: 'moreover', author_profile_url: '-228818126' , Authors: 'and Karolina Hird', Axis: 'South', Category: 'test', "Content Category": 'sudan_war', "Data Source Name": 'social', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'news', "Extracted Communication Device": 'iphone 10', Oblast: 'Western Donetsk and Eastern Zaporizhia directions', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Press Wire', Region: 'kharkiv', "Report Type": 'SIGINT', "Russian Objective": 'Cross the Oskil River in Kharkiv Oblast and push westward into eastern Kharkiv Oblast and northern Donetsk Oblast', "Section Name": 'Russian Force Generation', "Section Type": 'overview', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'ru', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['american badger', 'anger bear', 'animal', 'animals', 'aquatic panda'], "Extracted Currency": ['GBP 86.26', '$935.686', 'AUD 12.10', '$998.552', 'DKK 31.11'], "Extracted Date Time Mention": ['1 month', '1 week', '1 year', '10 minutes', '10 seconds'], "Extracted Disease": ['acc', 'achiness', 'acute myeloid leukemia', 'addiction', 'adrenocortical carcinoma'], "Extracted Facility": ['airbase', 'airfield', 'airfields', 'airport', 'airports'], "Extracted Incident": ['incident_103', 'incident_104', 'incident_105', 'incident_106', 'incident_107'], "Extracted Locations": ['America', 'Argentina', 'Asia', 'Australia', 'Azerbaijan'], "Extracted Miscellaneous": ['analyze', 'api', 'arxiv', 'astrotrain', 'automate'], "Extracted Organism": ['alpine', 'anthrax', 'anysrc-1242', 'anysrc-1497', 'aphelidiomyceta'], "Extracted Substance": ['aml12v2', 'apple sauce', 'argon2', 'azure', 'bert'], "Extracted Vehicle": ['aircraft carrier', 'airplane', 'amphibious ships', 'antonovs', 'apache'], "Extracted Weapon": ['-ship missile', '100 mm shell supplies', '105 mm ammunition', '105-millimeter cannon', '105-mm gun'], Label: ['admin', 'alembic', 'architecture', 'aws', 'balsamiq-blueprint'], Space: ['AWS Marketplace KB', 'Analyze', 'Andrew Le', 'Andy Natt', 'Applied Research'], "Space Key": ['AM', 'AMK', 'ANZ', 'AO', 'API'] },
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
    metadata: { vendor_id: 'moreover', author_profile_url: '-228821252' , Authors: 'and ??', Axis: 'East', Category: 'test-documents', "Content Category": 'sudan_war', "Data Source Name": 'news', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'Campaign Assessment', "Extracted Communication Device": 'iphone 11', Oblast: 'Luhansk Oblast', "Page Type": 'page', Platform: 'facebook', "Publication Type": 'Trade', Region: 'luhansk', "Report Type": 'Russia Offensive Campaign Assessment', "Russian Objective": 'Maintain frontline positions and secure rear areas against Ukrainian strikes', "Section Name": 'Russian air/missile strikes campaign', "Section Type": 'kinetic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'no-lang', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'charlie-kirk', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'charlie-kirk' , "Extracted Animal": ['asiatic stink badgers', 'baby', 'baby bear', 'baby-bear', 'babybear'], "Extracted Currency": ['$467.565', 'ZAR 8.37', '$575.137', 'GBP 31.64', '$302.393'], "Extracted Date Time Mention": ['2 hours', '2 weeks', '2 years', '2.14', '2004'], "Extracted Disease": ['aids virus', 'alcoholism', 'alert fatigue', 'allergy', 'android malware'], "Extracted Facility": ['apartment', 'apartment building', 'army base', 'banks', 'barracks'], "Extracted Incident": ['incident_110', 'incident_111', 'incident_112', 'incident_113', 'incident_114'], "Extracted Locations": ['Belgium', 'Bolivia', 'Brazil', 'Britain', 'Brussels'], "Extracted Miscellaneous": ['boolean', 'chinese', 'command', 'confluence', 'csv'], "Extracted Organism": ['argocd', 'babybear', 'bacteria', 'banana', 'bananas'], "Extracted Substance": ['blood gold', 'cannabis', 'carbon', 'carbon dioxide', 'carbon fibre'], "Extracted Vehicle": ['armored vehicle', 'armoured combat vehicles', 'armoured personnel carrier', 'artura', 'attack drones'], "Extracted Weapon": ['120-mm artillery shells', '120-mm rifled gun', '120mm', '120mm cannon', '120mm “main gun” cannon'], Label: ['cloudformation', 'confluence', 'convention', 'creator-onboarding', 'data'], Space: ['Baptiste Henríquez', 'Ben Hammel', 'Bernadette Essalou', 'Brent Williams', 'Brian Carlson'], "Space Key": ['CORE', 'CS', 'CULT', 'D3', 'DEL'] },
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
    metadata: { vendor_id: 'moreover', author_profile_url: '-228843032' , Authors: 'William Runkel', Axis: 'North', Category: 'SAR', "Content Category": 'sudan_war', "Data Source Name": 'user-upload', "Document PM": 'FAKE//LES', "Document Scope": 'general', "Document Type": 'Collect', "Extracted Communication Device": 'iphone 12', Oblast: 'Donetsk Oblast', "Page Type": 'page', Platform: 'reddit', "Publication Type": 'Academic', Region: 'northern', "Report Type": 'Russia Ukraine Military Collect', "Russian Objective": 'Maintain frontline positions, secure rear areas against Ukrainian strikes, and advance within tube artillery range of Zaporizhzhia City', "Section Name": 'Western Donetsk and Eastern Zaporizhia directions', "Section Type": 'force_generation', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'pt', "Tweet Newline Removal Experimental Group": 'control', "Tweet Newline Removal Topic": 'hk-fire', "Tweet Parent Merging Experimental Group": 'control', "Tweet Parent Merging Topic": 'hk-fire' , "Extracted Animal": ['bear-papa bear', 'bee', 'beef', 'berserk bear', 'big panda'], "Extracted Currency": ['DKK 75.18', '$216.077', 'KRW 38.48', '$182.294', 'ZAR 2.42'], "Extracted Date Time Mention": ['2010', '2011', '2012', '2013', '2014'], "Extracted Disease": ['anti-hd', 'anxiety', 'apple/qualcomm', 'apple/qualcomm bug', 'asthma'], "Extracted Facility": ['battlefields', 'bridge', 'bridges', 'building', 'buildings'], "Extracted Incident": ['incident_117', 'incident_118', 'incident_119', 'incident_120', 'incident_121'], "Extracted Locations": ['Chile', 'China', 'Colombia', 'Costa Rica', 'Denmark'], "Extracted Miscellaneous": ['data model', 'datadog', 'db', 'delta', 'delta 3'], "Extracted Organism": ['bert', 'bilstms', 'bluehole', 'bm25', 'c3po'], "Extracted Substance": ['chemical substance', 'chlorhexadol', 'cilium', 'cm-6', 'co-nlp'], "Extracted Vehicle": ['battle tank', 'bayraktar tb2', 'bicycle', 'bike', 'boat'], "Extracted Weapon": ['142 high mobility artillery rocket system', '152mm shells', '155 mm caesar cannon', '155-millimeter shells', '155-millimetre calibre shells'], Label: ['datasets', 'decision', 'decisions', 'deep', 'delta'], Space: ['CORE', 'Cindy Ma', 'Cody', 'Counter-Disinformation', 'Customer Delivery Council'], "Space Key": ['DTIC', 'E', 'ENG', 'ET', 'FABLAB'] },
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
    metadata: { vendor_id: 'moreover', author_profile_url: '-228843309' , Authors: 'Samuel Shafiro', Axis: 'South', Category: 'news', "Content Category": 'sudan_war', "Data Source Name": 'navy intel reports', "Document PM": 'FAKE//LES', "Document Scope": 'regional', "Document Type": 'news', "Extracted Communication Device": 'iphone 13', Oblast: 'Kharkiv Oblast', "Page Type": 'page', Platform: 'vk', "Publication Type": 'Consumer', Region: 'southern', "Report Type": 'SIGINT', "Russian Objective": 'Push Ukrainian forces back from the international border to create a defensible buffer zone with Belgorod Oblast and approach to within tube artillery range of Kharkiv City', "Section Name": 'Zaporizhia Oblast', "Section Type": 'diplomatic', Status: 'current', "Title PM": 'FAKE//LIES', "Top Language": 'multiple', "Tweet Newline Removal Experimental Group": 'treatment', "Tweet Newline Removal Topic": 'indo-pac', "Tweet Parent Merging Experimental Group": 'treatment', "Tweet Parent Merging Topic": 'indo-pac' , "Extracted Animal": ['bot', 'bots', 'brown', 'brown cow', 'butterfly'], "Extracted Currency": ['$738.886', 'AUD 80.21', '$881.389', 'DKK 59.06', '$801.292'], "Extracted Date Time Mention": ['2017', '2018', '2019', '2019-10-01', '2020'], "Extracted Disease": ['bas-hepatitis b', 'bdd', 'biological weapon', 'black eye', 'bleeding'], "Extracted Facility": ['checkpoint', 'checkpoints', 'church', 'churches', 'classroom'], "Extracted Incident": ['incident_124', 'incident_125', 'incident_126', 'incident_127', 'incident_128'], "Extracted Locations": ['El Salvador', 'England', 'Ethiopia', 'Europe', 'Florida'], "Extracted Miscellaneous": ['document', 'dsta', 'dtic', 'ec2', 'elasticsearch'], "Extracted Organism": ['cdws be', 'celery', 'chatgpt', 'cinnamon', 'clover'], "Extracted Substance": ['cobalt', 'cocaine', 'copper', 'cosine', 'covid-19 vaccine'], "Extracted Vehicle": ['caesar 8×8 self-propelled howitzers', 'camels', 'car', 'chinese', 'chopper crash'], "Extracted Weapon": ['155mm rounds', '155mm self-propelled howitzers', '155mm136f137 artillery pieces', '20-millimeter auto-cannons', '20-millimeter gun'], Label: ['design-decision', 'development', 'devops', 'discoverability', 'documentation-space-sample'], Space: ['Dan Handley', 'David Hayden', 'Deepti Winston', 'Defense Technical Information Center (DTIC)', 'Deloitte'], "Space Key": ['GLOBAL', 'GOV', 'HAL0', 'HR', 'INFRA'] },
    highlights: [],
    comments: []
  }
];
