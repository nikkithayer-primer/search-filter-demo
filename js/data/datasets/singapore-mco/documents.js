/**
 * Documents for Singapore MCO dataset
 * Includes news articles, social posts, and internal documents
 */

export const documents = [
  // SAF Training Incident documents (topic-001)
  {
    id: 'doc-001',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'NSF dies during training exercise at Pulau Tekong',
    url: 'https://cna.sg/news/singapore/nsf-training-death-tekong-2025',
    publishedDate: '2025-08-15T18:30:00+08:00',
    publisherId: 'pub-sg-cna',
    author: 'Lydia Lim',
    excerpt: 'A 19-year-old National Serviceman Full-time died during a training exercise at the Basic Military Training Centre on Pulau Tekong this afternoon.',
    headerImage: {
      url: 'http://static.photos/military/640x360/001',
      caption: 'The Basic Military Training Centre on Pulau Tekong. File photo: MINDEF'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'A 19-year-old National Serviceman Full-time (NSF) died during a training exercise at the Basic Military Training Centre on Pulau Tekong this afternoon, the Ministry of Defence (MINDEF) said in a statement.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The NSF, who was in the midst of his Basic Military Training, collapsed during a routine physical training session at approximately 2:30pm. Medical personnel on site provided immediate assistance and he was evacuated to Changi General Hospital, where he was pronounced dead at 4:15pm.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'MINDEF said the cause of death is being investigated and a Committee of Inquiry will be convened. The family of the deceased has been notified and is being supported by the SAF.', portionMark: { classification: 'U', handling: '' } },
      { type: 'blockquote', content: '"We are deeply saddened by this incident. Our thoughts are with the family during this difficult time. The SAF takes all training incidents seriously and will conduct a thorough investigation." — MINDEF Spokesperson', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'This is the first training-related fatality in the SAF since 2023. Minister for Defence Dr Ng Eng Hen is expected to address the incident in Parliament next week.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-002'],
    themeIds: ['sub-004'],
    topicIds: ['topic-001'],
    personIds: ['person-001', 'person-002'],
    organizationIds: ['org-001', 'org-002', 'org-003'],
    locationIds: ['loc-003'],
    eventIds: ['event-001'],
    tagIds: ['tag-004'],
    quotes: [
      {
        id: 'quote-001-01',
        speakerId: 'org-002',
        speakerType: 'organization',
        text: 'We are deeply saddened by this incident. Our thoughts are with the family during this difficult time. The SAF takes all training incidents seriously and will conduct a thorough investigation.'
      }
    ],
    activities: [
      {
        id: 'activity-001-01',
        actorId: 'org-002',
        actorType: 'organization',
        action: 'announced investigation into',
        targetId: null,
        targetType: null,
        targetText: 'training fatality at Pulau Tekong'
      },
      {
        id: 'activity-001-02',
        actorId: 'org-002',
        actorType: 'organization',
        action: 'convened',
        targetId: null,
        targetType: null,
        targetText: 'Committee of Inquiry'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: -0.35 },
      'faction-002': { sentiment: -0.78 },
      'faction-007': { sentiment: -0.55 }
    },
    metrics: { shares: 28500 },
    highlights: [
      {
        id: 'highlight-001',
        userId: 'user-002',
        blockIndex: 0,
        startOffset: 0,
        endOffset: 95,
        highlightedText: 'A 19-year-old National Serviceman Full-time (NSF) died during a training exercise',
        createdAt: '2025-08-15T20:30:00+08:00'
      }
    ],
    comments: [
      {
        id: 'comment-001',
        userId: 'user-002',
        blockIndex: 4,
        anchorStartOffset: 0,
        anchorEndOffset: 58,
        anchorText: 'This is the first training-related fatality in the SAF since 2023.',
        content: 'Need to verify this claim - checking against our incident database.',
        createdAt: '2025-08-15T21:00:00+08:00',
        replies: [
          {
            id: 'reply-001',
            userId: 'user-003',
            content: 'Confirmed. Last was Corporal Tan in October 2023 during overseas exercise.',
            createdAt: '2025-08-15T21:30:00+08:00'
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
    title: 'HWZ thread: Another NSF dies in training - when will this stop?',
    url: 'https://forums.hardwarezone.com.sg/threads/another-nsf-dies-training.999999',
    publishedDate: '2025-08-15T21:45:00+08:00',
    publisherId: 'pub-hwz',
    author: 'Various users',
    excerpt: 'A heated discussion thread on HardwareZone EDMW forum following news of the training fatality, with users questioning SAF safety standards.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'Original post by user "WorriedParent88": My son is enlisting next month. After seeing this news, I am genuinely worried. When will MINDEF take safety seriously? How many more must die?', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Reply by "ExRegular": I served 10 years ago and safety was already a problem then. Nothing has changed. The culture is "suck it up" and anyone who complains is seen as weak.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Reply by "DefendSG2025": Let\'s not jump to conclusions. Accidents happen in military training everywhere. SAF has one of the best safety records in the region. Wait for the investigation.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Reply by "SingaporeSon": This is why NS should be reduced to 1 year or abolished. We are not at war. Why are young men dying for exercises? Taiwan has 4 months NS and they face a real threat from China.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-002', 'narr-001'],
    themeIds: ['sub-004', 'sub-005'],
    topicIds: ['topic-001'],
    personIds: [],
    organizationIds: ['org-002'],
    locationIds: ['loc-003'],
    eventIds: ['event-001'],
    tagIds: ['tag-005'],
    quotes: [],
    activities: [
      {
        id: 'activity-002-01',
        actorId: 'org-002',
        actorType: 'organization',
        action: 'criticized for',
        targetId: null,
        targetType: null,
        targetText: 'safety culture in training'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.45 },
      'faction-002': { sentiment: -0.82 },
      'faction-007': { sentiment: -0.48 }
    },
    metrics: { shares: 0 },
    highlights: [
      {
        id: 'highlight-002',
        userId: 'user-006',
        blockIndex: 3,
        startOffset: 0,
        endOffset: 145,
        highlightedText: 'This is why NS should be reduced to 1 year or abolished. We are not at war. Why are young men dying for exercises?',
        createdAt: '2025-08-16T09:15:00+08:00'
      }
    ],
    comments: [
      {
        id: 'comment-002',
        userId: 'user-006',
        blockIndex: 3,
        anchorStartOffset: 0,
        anchorEndOffset: 50,
        anchorText: 'This is why NS should be reduced to 1 year or abolished.',
        content: 'User "SingaporeSon" flagged - matches profile of suspected coordinated account. Cross-referencing with other anti-NS posts.',
        createdAt: '2025-08-16T09:20:00+08:00',
        replies: []
      }
    ]
  },
  {
    id: 'doc-003',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'MINDEF announces Committee of Inquiry into NSF training death',
    url: 'https://straitstimes.com/singapore/mindef-coi-nsf-training-death',
    publishedDate: '2025-08-17T10:30:00+08:00',
    publisherId: 'pub-sg-st',
    author: 'David Sun',
    excerpt: 'Minister for Defence Dr Ng Eng Hen announced a Committee of Inquiry will investigate the circumstances surrounding the death of an NSF during training.',
    headerImage: {
      url: 'http://static.photos/government/640x360/002',
      caption: 'Minister for Defence Dr Ng Eng Hen speaking at MINDEF. Photo: MINDEF'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'Minister for Defence Dr Ng Eng Hen announced on Saturday that a Committee of Inquiry (COI) will be convened to investigate the circumstances surrounding the death of a 19-year-old National Serviceman Full-time during training at Pulau Tekong on Friday.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"Every loss of life in the SAF weighs heavily on us. We owe it to the family and to all who serve to understand exactly what happened and to ensure we learn from this tragedy," Dr Ng said in a statement.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The COI will be chaired by a senior military officer and will include independent medical experts. MINDEF said the findings will be made public upon completion of the investigation.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Dr Ng also announced an immediate review of all high-intensity training protocols across the SAF, with enhanced medical screening procedures to be implemented by the end of the month.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-002'],
    themeIds: ['sub-004', 'sub-005'],
    topicIds: ['topic-001'],
    personIds: ['person-001'],
    organizationIds: ['org-001'],
    locationIds: ['loc-002'],
    eventIds: ['event-002'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-003-01',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'Every loss of life in the SAF weighs heavily on us. We owe it to the family and to all who serve to understand exactly what happened and to ensure we learn from this tragedy.'
      }
    ],
    activities: [
      {
        id: 'activity-003-01',
        actorId: 'person-001',
        actorType: 'person',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'Committee of Inquiry into NSF training death'
      },
      {
        id: 'activity-003-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'initiated',
        targetId: null,
        targetType: null,
        targetText: 'review of high-intensity training protocols'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.55 },
      'faction-002': { sentiment: -0.35 },
      'faction-007': { sentiment: 0.25 }
    },
    metrics: { shares: 15200 },
    highlights: [],
    comments: []
  },
  // NS Policy Debate documents (topic-002)
  {
    id: 'doc-004',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'TikTok: Why does Singapore have 2-year NS when Taiwan has 4 months?',
    url: 'https://tiktok.com/@sgpolitics_/video/999888777',
    publishedDate: '2025-09-05T20:15:00+08:00',
    publisherId: 'pub-tiktok',
    author: {
      username: '@sgpolitics_',
      displayName: 'SG Politics',
      avatarUrl: 'https://i.pravatar.cc/150?u=sgpolitics_'
    },
    excerpt: 'Viral video comparing NS duration across countries questions why Singapore requires 2-year service when facing no active threats.',
    headerImage: null,
    video: {
      thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
      duration: 95
    },
    transcription: 'Did you know Singapore has one of the longest mandatory military services in the world? Two years. Meanwhile Taiwan, which faces an actual military threat from China, just reduced their service to 4 months. South Korea, which is technically still at war with the North, has 18-21 months. Israel, surrounded by hostile neighbors, has 2.5-3 years but they pay their soldiers a real salary. Singapore pays NSFs what, $600-700 a month? That\'s less than minimum wage in most developed countries. And we\'re not even at war with anyone. So what exactly are we training for? Two years of your life, gone. Two years you could have spent studying, working, building your career. And for what?',
    contentBlocks: [
      { type: 'paragraph', content: 'Why does SG have 2 years NS when Taiwan only has 4 months?? 🤔 Make it make sense #singapore #ns #nationalservice #conscription #taiwan #military', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001'],
    topicIds: ['topic-002'],
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-001'],
    eventIds: ['event-003'],
    tagIds: ['tag-005'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.78 },
      'faction-007': { sentiment: -0.42 }
    },
    metrics: { shares: 52000 },
    highlights: [
      {
        id: 'highlight-003',
        userId: 'user-003',
        blockIndex: 0,
        startOffset: 30,
        endOffset: 112,
        highlightedText: 'Singapore has one of the longest mandatory military services in the world? Two years.',
        createdAt: '2025-09-06T10:00:00+08:00'
      }
    ],
    comments: [
      {
        id: 'comment-003',
        userId: 'user-001',
        blockIndex: 0,
        anchorStartOffset: 96,
        anchorEndOffset: 200,
        anchorText: 'Taiwan, which faces an actual military threat from China, just reduced their service to 4 months.',
        content: 'Misleading. Taiwan\'s 4-month conscription is supplemented by extensive reserve training. Their regular military is professional. Not an apples-to-apples comparison.',
        createdAt: '2025-09-06T10:30:00+08:00',
        replies: [
          {
            id: 'reply-002',
            userId: 'user-002',
            content: 'Should we brief comms team on this? Might need public clarification.',
            createdAt: '2025-09-06T11:00:00+08:00'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-005',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Reddit r/singapore: Honest discussion about NS duration needed',
    url: 'https://reddit.com/r/singapore/comments/ns_duration_discussion',
    publishedDate: '2025-09-08T14:30:00+08:00',
    publisherId: 'pub-reddit',
    author: 'u/throwaway_ns_2025',
    excerpt: 'Reddit thread with thousands of comments discussing the viral TikTok video on NS duration comparisons.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'OP: The TikTok video making rounds has some valid points. I just finished my 2 years and honestly, a lot of it felt like wasted time. Admin, waiting around, make-work. The actual training content could probably be condensed into 1 year.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Top comment by u/ns_veteran_1995: "I served 30 years ago when we actually had to worry about our neighbors. The threat environment has changed. Maybe NS duration should too. But I think 1 year is too short - 18 months seems reasonable."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Reply by u/pragmatic_sg: "The issue isn\'t just training. It\'s about building cohort bonds, creating a shared national experience, and yes, having a ready reserve force. You can\'t quantify everything in \'efficient training hours\'."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001', 'sub-003'],
    topicIds: ['topic-002'],
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-001'],
    eventIds: ['event-003'],
    tagIds: ['tag-005'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.55 },
      'faction-001': { sentiment: 0.35 },
      'faction-007': { sentiment: -0.25 }
    },
    metrics: { shares: 0 },
    highlights: [],
    comments: []
  },
  // Malaysia-Singapore Relations documents
  {
    id: 'doc-008',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Malaysian officials concerned about SAF exercises near Johor border',
    url: 'https://thestar.com.my/news/nation/saf-exercises-johor-concerns',
    publishedDate: '2025-09-20T11:00:00+08:00',
    publisherId: 'pub-reg-thestar',
    author: 'Ahmad Nazri',
    excerpt: 'Malaysian defence officials have expressed concern over Singapore Armed Forces live-fire exercises conducted near the Malaysia-Singapore border.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'KUALA LUMPUR: Malaysian defence officials have expressed concern over Singapore Armed Forces (SAF) live-fire exercises conducted at training areas near the bilateral border, calling for better advance notification and coordination.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'A spokesperson for Malaysia\'s Ministry of Defence said the exercises, which took place over the weekend, were conducted without adequate prior consultation with Malaysian authorities.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"While we recognize Singapore\'s right to conduct training on their territory, we expect proper protocols to be followed given the proximity to our border," the spokesperson said.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: [],
    themeIds: [],
    topicIds: [],
    personIds: ['person-004'],
    organizationIds: ['org-020'],
    locationIds: ['loc-005'],
    eventIds: ['event-004'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-008-01',
        speakerId: 'org-020',
        speakerType: 'organization',
        text: 'While we recognize Singapore\'s right to conduct training on their territory, we expect proper protocols to be followed given the proximity to our border.'
      }
    ],
    activities: [
      {
        id: 'activity-008-01',
        actorId: 'org-020',
        actorType: 'organization',
        action: 'expressed concern about',
        targetId: null,
        targetType: null,
        targetText: 'SAF live-fire exercises near bilateral border'
      },
      {
        id: 'activity-008-02',
        actorId: 'org-020',
        actorType: 'organization',
        action: 'called for',
        targetId: null,
        targetType: null,
        targetText: 'better advance notification and coordination'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: -0.55 },
      'faction-001': { sentiment: 0.35 }
    },
    metrics: { shares: 4500 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-009',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Malaysian Twitter reactions to SAF border exercises',
    url: 'https://x.com/search?q=saf+johor+exercises',
    publishedDate: '2025-09-21T09:00:00+08:00',
    publisherId: 'pub-x',
    author: 'Various Malaysian accounts',
    excerpt: 'Collection of tweets from Malaysian accounts reacting to news of SAF exercises near the border.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: '@johor_patriot: Singapore thinks they can do whatever they want near our border. What happened to respect between neighbors?', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '@msiandefencewatcher: To be fair, these exercises happen regularly and are within their territory. But yes, better comms would help.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '@bantusaudara: This is why Malaysia needs to strengthen our own armed forces. Small neighbor thinks they are big power.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: [],
    themeIds: [],
    topicIds: [],
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-005'],
    eventIds: ['event-004'],
    tagIds: ['tag-005', 'tag-origin-003'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-005': { sentiment: -0.72 }
    },
    metrics: { shares: 0 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-010',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'MFA: Singapore follows established protocols for military exercises',
    url: 'https://cna.sg/news/singapore/mfa-military-exercises-protocols',
    publishedDate: '2025-09-22T16:00:00+08:00',
    publisherId: 'pub-sg-cna',
    author: 'Cheryl Tan',
    excerpt: 'Ministry of Foreign Affairs issued a statement affirming that Singapore follows established bilateral protocols for military exercises near the border.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'The Ministry of Foreign Affairs (MFA) issued a statement on Monday clarifying that Singapore follows all established bilateral protocols when conducting military exercises, including those near the Malaysia-Singapore border.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"Singapore maintains open channels of communication with Malaysia on defence matters. The exercises in question were conducted in accordance with existing arrangements," the statement said.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'MFA added that Singapore remains committed to strengthening bilateral defence relations and looks forward to continued cooperation through existing mechanisms including the Five Power Defence Arrangements.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: [],
    themeIds: [],
    topicIds: [],
    personIds: ['person-005'],
    organizationIds: ['org-008'],
    locationIds: ['loc-001'],
    eventIds: ['event-005'],
    tagIds: ['tag-006'],
    quotes: [
      {
        id: 'quote-010-01',
        speakerId: 'org-008',
        speakerType: 'organization',
        text: 'Singapore maintains open channels of communication with Malaysia on defence matters. The exercises in question were conducted in accordance with existing arrangements.'
      }
    ],
    activities: [
      {
        id: 'activity-010-01',
        actorId: 'org-008',
        actorType: 'organization',
        action: 'issued statement clarifying',
        targetId: null,
        targetType: null,
        targetText: 'bilateral protocols for military exercises'
      },
      {
        id: 'activity-010-02',
        actorId: 'org-008',
        actorType: 'organization',
        action: 'affirmed commitment to',
        targetId: null,
        targetType: null,
        targetText: 'strengthening bilateral defence relations through Five Power Defence Arrangements'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.65 },
      'faction-007': { sentiment: 0.45 }
    },
    metrics: { shares: 8200 },
    highlights: [],
    comments: []
  },
  // Foreign Influence / Coordinated Campaign documents
  {
    id: 'doc-011',
    documentType: 'intelligence_report',
    repositoryId: 'repo-edl',
    classification: 'C',
    title: 'MCO Assessment: Coordinated anti-NS campaign network identified',
    url: null,
    publishedDate: '2025-10-08T14:00:00+08:00',
    publisherId: 'pub-dept-mco',
    author: 'MCO Analysis Division',
    excerpt: 'Technical analysis identifies network of accounts exhibiting coordinated inauthentic behavior targeting National Service policies.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: '(C) Technical analysis has identified a network of approximately 45 social media accounts exhibiting patterns consistent with coordinated inauthentic behavior. The network appears to be targeting narratives around National Service policies.', portionMark: { classification: 'C', handling: '' } },
      { type: 'heading', content: 'Key Findings', portionMark: { classification: 'C', handling: '' } },
      { type: 'list', content: '1. Accounts created in clusters within 48-hour windows\n2. Similar posting patterns and timing\n3. Shared linguistic markers suggesting common origin\n4. Amplification of each other\'s content within minutes of posting', portionMark: { classification: 'C', handling: '' } },
      { type: 'paragraph', content: '(C) Attribution assessment: LOW-MODERATE confidence of foreign state involvement. Technical indicators suggest accounts may be operating from outside Singapore, but definitive attribution requires additional investigation.', portionMark: { classification: 'C', handling: '' } },
      { type: 'paragraph', content: '(C) Recommendation: Continue monitoring. Consider referral to MHA for further investigation if network activity escalates.', portionMark: { classification: 'C', handling: '' } }
    ],
    narrativeIds: ['narr-008'],
    themeIds: ['sub-016'],
    topicIds: [],
    personIds: [],
    organizationIds: ['org-006', 'org-016'],
    locationIds: ['loc-001'],
    eventIds: ['event-006'],
    tagIds: ['tag-004', 'tag-origin-004'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-004': { sentiment: 0.72 }
    },
    metrics: { shares: 0 },
    highlights: [
      {
        id: 'highlight-004',
        userId: 'user-001',
        blockIndex: 3,
        startOffset: 0,
        endOffset: 145,
        highlightedText: 'Attribution assessment: LOW-MODERATE confidence of foreign state involvement.',
        createdAt: '2025-10-08T16:00:00+08:00'
      }
    ],
    comments: [
      {
        id: 'comment-004',
        userId: 'user-005',
        blockIndex: 4,
        anchorStartOffset: 0,
        anchorEndOffset: 95,
        anchorText: 'Recommendation: Continue monitoring. Consider referral to MHA',
        content: 'Concur with monitoring approach. Let\'s brief weekly and escalate if we see acceleration.',
        createdAt: '2025-10-08T17:30:00+08:00',
        replies: []
      }
    ]
  },
  {
    id: 'doc-012',
    documentType: 'internal_report',
    repositoryId: 'repo-edl',
    classification: 'C',
    title: 'Technical Appendix: Network Analysis of Anti-NS Accounts',
    url: 'https://edl.intel.gov/documents/doc-012',
    publishedDate: '2025-10-10T09:00:00+08:00',
    publisherId: 'pub-dept-mco',
    author: 'Digital Intelligence Team',
    excerpt: 'Detailed technical analysis supporting the coordinated campaign assessment.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: '(C) This appendix provides detailed technical indicators supporting the assessment of coordinated inauthentic behavior in the anti-NS network.', portionMark: { classification: 'C', handling: '' } },
      { type: 'heading', content: 'Account Creation Patterns', portionMark: { classification: 'C', handling: '' } },
      { type: 'paragraph', content: '(C) 23 accounts were created between 2025-09-01 and 2025-09-03. An additional 22 accounts were created between 2025-09-15 and 2025-09-17. This clustering is statistically significant (p < 0.01).', portionMark: { classification: 'C', handling: '' } },
      { type: 'heading', content: 'Content Analysis', portionMark: { classification: 'C', handling: '' } },
      { type: 'paragraph', content: '(C) Linguistic analysis reveals shared vocabulary and phrasing patterns across accounts, including identical typos and grammatical constructions suggesting copy-paste from common source material.', portionMark: { classification: 'C', handling: '' } }
    ],
    narrativeIds: ['narr-008'],
    themeIds: ['sub-017'],
    topicIds: [],
    personIds: [],
    organizationIds: ['org-016'],
    locationIds: ['loc-001'],
    eventIds: ['event-006'],
    tagIds: ['tag-004', 'tag-origin-004'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-004': { sentiment: 0.68 }
    },
    metrics: { shares: 0 },
    highlights: [],
    comments: []
  },
  // Chinese State Media documents
  {
    id: 'doc-013',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Commentary: Singapore risks becoming US pawn in Asia-Pacific',
    url: 'https://globaltimes.cn/page/202510/singapore-us-pawn-commentary.html',
    publishedDate: '2025-10-15T08:00:00+08:00',
    publisherId: 'pub-reg-globaltimes',
    author: 'Hu Xijin',
    excerpt: 'Global Times commentary suggests Singapore is abandoning its traditional neutrality to align with US strategic interests in the region.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'Singapore, once known for its careful balancing act between great powers, appears to be tilting decisively toward Washington. Recent defence agreements, joint military exercises, and statements critical of China suggest the city-state has chosen sides in the emerging great power competition.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'This is a dangerous path. Singapore\'s prosperity has been built on being a neutral hub that does business with everyone. By allowing itself to become a strategic outpost for American containment of China, Singapore risks its economic future and regional relationships.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The small nation seems to have forgotten that its ethnic Chinese majority creates natural ties to the motherland. Instead, its leaders parrot Western talking points about the South China Sea and human rights while ignoring America\'s own record of regional destabilization.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Singapore should ask itself: when the US eventually withdraws from Asia as it always does, who will be left to pick up the pieces?', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-006'],
    topicIds: ['topic-003'],
    personIds: ['person-012'],
    organizationIds: ['org-018'],
    locationIds: ['loc-006'],
    eventIds: ['event-007'],
    tagIds: ['tag-004', 'tag-origin-002'],
    quotes: [
      {
        id: 'quote-013-01',
        speakerId: 'person-012',
        speakerType: 'person',
        text: 'Singapore\'s prosperity has been built on being a neutral hub that does business with everyone. By allowing itself to become a strategic outpost for American containment of China, Singapore risks its economic future and regional relationships.'
      },
      {
        id: 'quote-013-02',
        speakerId: 'person-012',
        speakerType: 'person',
        text: 'Singapore should ask itself: when the US eventually withdraws from Asia as it always does, who will be left to pick up the pieces?'
      }
    ],
    activities: [
      {
        id: 'activity-013-01',
        actorId: 'org-018',
        actorType: 'organization',
        action: 'published commentary criticizing',
        targetId: null,
        targetType: null,
        targetText: 'Singapore\'s perceived alignment with US strategic interests'
      },
      {
        id: 'activity-013-02',
        actorId: 'person-012',
        actorType: 'person',
        action: 'warned',
        targetId: null,
        targetType: null,
        targetText: 'Singapore about abandoning neutrality in great power competition'
      },
      {
        id: 'activity-013-03',
        actorId: 'org-018',
        actorType: 'organization',
        action: 'framed ethnic Chinese Singaporeans as having',
        targetId: null,
        targetType: null,
        targetText: 'natural ties to the motherland'
      }
    ],
    factionMentions: {
      'faction-003': { sentiment: 0.85 },
      'faction-004': { sentiment: 0.78 },
      'faction-001': { sentiment: -0.72 }
    },
    metrics: { shares: 12500 },
    highlights: [
      {
        id: 'highlight-005',
        userId: 'user-002',
        blockIndex: 2,
        startOffset: 0,
        endOffset: 105,
        highlightedText: 'The small nation seems to have forgotten that its ethnic Chinese majority creates natural ties to the motherland.',
        createdAt: '2025-10-15T10:30:00+08:00'
      }
    ],
    comments: [
      {
        id: 'comment-005',
        userId: 'user-002',
        blockIndex: 2,
        anchorStartOffset: 0,
        anchorEndOffset: 105,
        anchorText: 'The small nation seems to have forgotten that its ethnic Chinese majority creates natural ties to the motherland.',
        content: 'Classic PRC narrative equating ethnicity with political loyalty. This is the kind of framing we need to track - it\'s designed to question Singaporean Chinese citizens\' national identity.',
        createdAt: '2025-10-15T10:45:00+08:00',
        replies: [
          {
            id: 'reply-003',
            userId: 'user-001',
            content: 'Agree. Flag this for the weekly brief. We\'re seeing this framing increase.',
            createdAt: '2025-10-15T11:00:00+08:00'
          }
        ]
      }
    ]
  },
  {
    id: 'doc-014',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Weibo amplification of Global Times Singapore commentary',
    url: 'https://weibo.com/search/singapore+us+pawn',
    publishedDate: '2025-10-15T12:00:00+08:00',
    publisherId: 'pub-weibo',
    author: 'Various accounts',
    excerpt: 'Collection of Weibo posts amplifying the Global Times commentary on Singapore.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: '@ChinaRises2025: Singapore has betrayed its Chinese heritage to serve American imperialism. Shameful.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '@PatrioticYouth88: Small countries should know their place. Singapore will regret choosing the wrong side.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '@ModerateVoice: Let\'s not overreact. Singapore has always balanced between powers. One article doesn\'t mean they\'ve "chosen sides."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-006'],
    topicIds: ['topic-003'],
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-006'],
    eventIds: ['event-007'],
    tagIds: ['tag-005', 'tag-origin-002'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-003': { sentiment: 0.82 },
      'faction-004': { sentiment: 0.75 }
    },
    metrics: { shares: 0 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-015',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'MFA responds to Global Times commentary on Singapore foreign policy',
    url: 'https://cna.sg/news/singapore/mfa-responds-global-times',
    publishedDate: '2025-10-17T15:00:00+08:00',
    publisherId: 'pub-sg-cna',
    author: 'Rachel Phua',
    excerpt: 'Ministry of Foreign Affairs issued a statement responding to Chinese state media commentary questioning Singapore\'s foreign policy alignment.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'The Ministry of Foreign Affairs (MFA) has responded to recent commentary in Chinese state media suggesting Singapore is abandoning neutrality to become a "US pawn" in the region.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"Singapore\'s foreign policy is based on our national interests, not alignment with any major power," the MFA statement said. "We maintain good relations with both the United States and China, and reject the suggestion that we must choose sides."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The statement also addressed the framing around ethnic Chinese Singaporeans. "Singaporeans of all ethnicities are Singaporean first. Suggestions that ethnic heritage should determine foreign policy alignment are unwelcome and inappropriate."', portionMark: { classification: 'U', handling: '' } },
      { type: 'blockquote', content: '"We will not be lectured on our foreign policy by any external party. Singapore will continue to act in accordance with our national interests and principles of international law." — MFA Spokesperson', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-006', 'sub-007'],
    topicIds: ['topic-003'],
    personIds: ['person-005'],
    organizationIds: ['org-008'],
    locationIds: ['loc-001'],
    eventIds: ['event-008'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-015-01',
        speakerId: 'org-008',
        speakerType: 'organization',
        text: 'Singapore\'s foreign policy is based on our national interests, not alignment with any major power. We maintain good relations with both the United States and China, and reject the suggestion that we must choose sides.'
      },
      {
        id: 'quote-015-02',
        speakerId: 'org-008',
        speakerType: 'organization',
        text: 'Singaporeans of all ethnicities are Singaporean first. Suggestions that ethnic heritage should determine foreign policy alignment are unwelcome and inappropriate.'
      },
      {
        id: 'quote-015-03',
        speakerId: 'org-008',
        speakerType: 'organization',
        text: 'We will not be lectured on our foreign policy by any external party. Singapore will continue to act in accordance with our national interests and principles of international law.'
      }
    ],
    activities: [
      {
        id: 'activity-015-01',
        actorId: 'org-008',
        actorType: 'organization',
        action: 'responded to',
        targetId: null,
        targetType: null,
        targetText: 'Chinese state media commentary questioning Singapore\'s foreign policy'
      },
      {
        id: 'activity-015-02',
        actorId: 'org-008',
        actorType: 'organization',
        action: 'rejected',
        targetId: null,
        targetType: null,
        targetText: 'framing that ethnic heritage should determine foreign policy alignment'
      },
      {
        id: 'activity-015-03',
        actorId: 'person-005',
        actorType: 'person',
        action: 'affirmed',
        targetId: null,
        targetType: null,
        targetText: 'Singapore\'s independent foreign policy based on national interests'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.78 },
      'faction-003': { sentiment: -0.65 },
      'faction-007': { sentiment: 0.55 }
    },
    metrics: { shares: 18500 },
    highlights: [],
    comments: []
  },
  // HWZ NS Debate Thread
  {
    id: 'doc-016',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'HWZ Mega-thread: Complete list of NS inequities [Updated]',
    url: 'https://forums.hardwarezone.com.sg/threads/ns-inequities-mega-thread.888777',
    publishedDate: '2025-10-25T19:45:00+08:00',
    publisherId: 'pub-hwz',
    author: 'SingaporeSon',
    excerpt: 'Viral HardwareZone thread compiling perceived inequities in the NS system.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'OP by SingaporeSon: I\'ve compiled every NS inequity I can think of. Feel free to add more. This is what Singaporean men deal with:', portionMark: { classification: 'U', handling: '' } },
      { type: 'list', content: '1. 2 years lost while women and new citizens skip\n2. Reservist for 10 cycles while career suffers\n3. $600/month pay while foreigners earn market rate\n4. Risk death in training while PR kids defer and leave\n5. Can\'t travel freely during ORD/reservist window\n6. Employers prefer foreigners who don\'t have ICT', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Reply count: 3,847 | Views: 425,000', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001', 'sub-002', 'sub-003'],
    topicIds: ['topic-002'],
    personIds: ['person-016'],
    organizationIds: [],
    locationIds: ['loc-001'],
    eventIds: ['event-009'],
    tagIds: ['tag-005'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.85 },
      'faction-007': { sentiment: -0.45 }
    },
    metrics: { shares: 0 },
    highlights: [
      {
        id: 'highlight-006',
        userId: 'user-006',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 180,
        highlightedText: '1. 2 years lost while women and new citizens skip\n2. Reservist for 10 cycles while career suffers\n3. $600/month pay while foreigners earn market rate',
        createdAt: '2025-10-26T09:00:00+08:00'
      }
    ],
    comments: [
      {
        id: 'comment-006',
        userId: 'user-006',
        blockIndex: 0,
        anchorStartOffset: 0,
        anchorEndOffset: 20,
        anchorText: 'OP by SingaporeSon',
        content: 'This is the same account flagged in our coordinated network analysis. High engagement on this thread.',
        createdAt: '2025-10-26T09:15:00+08:00',
        replies: []
      }
    ]
  },
  {
    id: 'doc-017',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Viral forum thread sparks renewed debate on NS policies',
    url: 'https://mothership.sg/2025/10/hwz-ns-inequities-viral',
    publishedDate: '2025-10-27T12:00:00+08:00',
    publisherId: 'pub-sg-mothership',
    author: 'Zhangxin Zheng',
    excerpt: 'A HardwareZone forum thread listing perceived NS inequities has gone viral, reigniting debate about National Service policies.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'A forum thread on HardwareZone titled "Complete list of NS inequities" has garnered over 400,000 views and nearly 4,000 replies since it was posted on Friday, sparking renewed public debate about National Service policies.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The thread, which lists grievances ranging from pay to career disruption, has been shared widely on social media platforms including TikTok and Instagram.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'MINDEF has not commented on the specific points raised in the thread but previously stated that NS policies are regularly reviewed to ensure they remain relevant and fair.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-001', 'sub-003'],
    topicIds: ['topic-002'],
    personIds: [],
    organizationIds: ['org-001'],
    locationIds: ['loc-001'],
    eventIds: ['event-009'],
    tagIds: ['tag-005'],
    quotes: [],
    activities: [
      {
        id: 'activity-017-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'declined to comment on',
        targetId: null,
        targetType: null,
        targetText: 'viral HardwareZone thread on NS inequities'
      },
      {
        id: 'activity-017-02',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'previously stated',
        targetId: null,
        targetType: null,
        targetText: 'NS policies are regularly reviewed for relevance and fairness'
      }
    ],
    factionMentions: {
      'faction-002': { sentiment: -0.55 },
      'faction-007': { sentiment: -0.35 }
    },
    metrics: { shares: 15800 },
    highlights: [],
    comments: []
  },
  // Total Defence documents
  {
    id: 'doc-018',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Total Defence Day 2026: PM Wong calls for resilience amid new threats',
    url: 'https://cna.sg/news/singapore/total-defence-day-2026-pm-wong',
    publishedDate: '2026-02-15T10:00:00+08:00',
    publisherId: 'pub-sg-cna',
    author: 'Lydia Lim',
    excerpt: 'Prime Minister Lawrence Wong marked Total Defence Day 2026 with a call for Singaporeans to strengthen resilience against evolving threats including disinformation.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'Prime Minister Lawrence Wong marked Total Defence Day 2026 with a call for all Singaporeans to strengthen their resilience against evolving threats, emphasizing digital defence and psychological resilience.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"The threats we face today are different from those of our founding generation. Disinformation, cyber attacks, and attempts to divide our society are the new battlefields," PM Wong said in his address.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The Prime Minister highlighted recent examples of coordinated online campaigns targeting national unity and urged citizens to verify information before sharing.', portionMark: { classification: 'U', handling: '' } },
      { type: 'blockquote', content: '"Total Defence is not just about the military. Every Singaporean has a role to play in defending our nation against those who wish to weaken our society from within."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-009'],
    themeIds: ['sub-018', 'sub-019'],
    topicIds: [],
    personIds: ['person-009'],
    organizationIds: ['org-009'],
    locationIds: ['loc-001'],
    eventIds: ['event-010'],
    tagIds: ['tag-006'],
    quotes: [
      {
        id: 'quote-018-01',
        speakerId: 'person-009',
        speakerType: 'person',
        text: 'The threats we face today are different from those of our founding generation. Disinformation, cyber attacks, and attempts to divide our society are the new battlefields.'
      },
      {
        id: 'quote-018-02',
        speakerId: 'person-009',
        speakerType: 'person',
        text: 'Total Defence is not just about the military. Every Singaporean has a role to play in defending our nation against those who wish to weaken our society from within.'
      }
    ],
    activities: [
      {
        id: 'activity-018-01',
        actorId: 'person-009',
        actorType: 'person',
        action: 'called for',
        targetId: null,
        targetType: null,
        targetText: 'Singaporeans to strengthen resilience against evolving threats'
      },
      {
        id: 'activity-018-02',
        actorId: 'person-009',
        actorType: 'person',
        action: 'marked',
        targetId: null,
        targetType: null,
        targetText: 'Total Defence Day 2026 with address on digital and psychological defence'
      },
      {
        id: 'activity-018-03',
        actorId: 'person-009',
        actorType: 'person',
        action: 'highlighted',
        targetId: null,
        targetType: null,
        targetText: 'coordinated online campaigns targeting national unity'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.78 },
      'faction-007': { sentiment: 0.55 }
    },
    metrics: { shares: 12500 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-019',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Reddit reactions to Total Defence Day messaging',
    url: 'https://reddit.com/r/singapore/comments/total_defence_2026',
    publishedDate: '2026-02-15T18:00:00+08:00',
    publisherId: 'pub-reddit',
    author: 'Various users',
    excerpt: 'Mixed reactions on Reddit to the Total Defence Day 2026 messaging.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'u/skeptical_citizen: "Total Defence feels like rebranded propaganda. What exactly is \'psychological defence\' other than telling us to trust the government?"', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'u/pragmatic_sg: "I get the cynicism but the disinformation threat is real. Look at what happened in other countries. We can\'t be naive."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'u/ns_done_2024: "Easy to talk about defence when you\'re not the one serving 2 years. Total Defence should start with treating NSFs better."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-009', 'narr-001'],
    themeIds: ['sub-019'],
    topicIds: [],
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-001'],
    eventIds: ['event-010'],
    tagIds: ['tag-005'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-002': { sentiment: -0.55 },
      'faction-006': { sentiment: -0.62 },
      'faction-007': { sentiment: 0.25 }
    },
    metrics: { shares: 0 },
    highlights: [],
    comments: []
  },
  // CECA / Foreign Talent documents
  {
    id: 'doc-020',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Employment Pass numbers rise 5% year-on-year: MOM data',
    url: 'https://straitstimes.com/singapore/employment-pass-rise-mom-data',
    publishedDate: '2025-11-12T10:30:00+08:00',
    publisherId: 'pub-sg-st',
    author: 'Joanna Seow',
    excerpt: 'Ministry of Manpower data shows Employment Pass holders increased 5% compared to the same period last year.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'The number of Employment Pass (EP) holders in Singapore rose 5% year-on-year to 198,000 as of September 2025, according to data released by the Ministry of Manpower (MOM) on Wednesday.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'MOM attributed the increase to growth in technology, financial services, and healthcare sectors, which continue to face talent shortages in specialized roles.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The data has reignited online debate about foreign talent policies, with some social media users questioning whether enough is being done to protect local PMET jobs.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-004'],
    themeIds: ['sub-008', 'sub-009'],
    topicIds: ['topic-004'],
    personIds: ['person-010'],
    organizationIds: ['org-010'],
    locationIds: ['loc-001'],
    eventIds: ['event-011'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-020-01',
        speakerId: 'org-010',
        speakerType: 'organization',
        text: 'The increase in Employment Pass holders reflects growth in technology, financial services, and healthcare sectors, which continue to face talent shortages in specialized roles.'
      }
    ],
    activities: [
      {
        id: 'activity-020-01',
        actorId: 'org-010',
        actorType: 'organization',
        action: 'released',
        targetId: null,
        targetType: null,
        targetText: 'Employment Pass data showing 5% year-on-year increase'
      },
      {
        id: 'activity-020-02',
        actorId: 'org-010',
        actorType: 'organization',
        action: 'attributed increase to',
        targetId: null,
        targetType: null,
        targetText: 'talent shortages in tech, financial services, and healthcare sectors'
      }
    ],
    factionMentions: {
      'faction-006': { sentiment: -0.65 },
      'faction-007': { sentiment: -0.35 }
    },
    metrics: { shares: 8500 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-021',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Facebook reactions to EP data release',
    url: 'https://facebook.com/search/posts?q=employment+pass+singapore',
    publishedDate: '2025-11-12T14:00:00+08:00',
    publisherId: 'pub-facebook',
    author: 'Various users',
    excerpt: 'Social media reactions to MOM employment data showing increased EP holders.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'User A: "5% more foreigners taking our jobs. When will this end? CECA must go."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'User B: "My company just hired 3 more EPs while locals applied and were rejected. Fair competition? Please."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'User C: "Some of these comments are xenophobic. Foreign talent helps grow our economy. The issue is abuse, not the policy itself."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-004'],
    themeIds: ['sub-008', 'sub-009'],
    topicIds: ['topic-004'],
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-001'],
    eventIds: ['event-011'],
    tagIds: ['tag-005'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-006': { sentiment: -0.75 },
      'faction-008': { sentiment: -0.82 },
      'faction-007': { sentiment: -0.42 }
    },
    metrics: { shares: 0 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-022',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'MOM clarifies EP policy amid social media backlash',
    url: 'https://cna.sg/news/singapore/mom-clarifies-ep-policy',
    publishedDate: '2025-11-14T12:00:00+08:00',
    publisherId: 'pub-sg-cna',
    author: 'Ang Hwee Min',
    excerpt: 'Ministry of Manpower issued a clarification on Employment Pass policies following social media reaction to workforce data.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'The Ministry of Manpower (MOM) on Thursday issued a detailed clarification on Employment Pass policies and the COMPASS framework following social media reaction to recently released workforce data.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"All EP applications are assessed on merit and must meet stringent criteria including salary thresholds and the COMPASS points system," MOM said in a statement.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Minister for Manpower Tan See Leng emphasized that the government remains committed to ensuring Singaporeans have access to good jobs while maintaining an open economy that attracts global talent.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-004'],
    themeIds: ['sub-009'],
    topicIds: ['topic-004'],
    personIds: ['person-010'],
    organizationIds: ['org-010'],
    locationIds: ['loc-001'],
    eventIds: ['event-012'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-022-01',
        speakerId: 'org-010',
        speakerType: 'organization',
        text: 'All EP applications are assessed on merit and must meet stringent criteria including salary thresholds and the COMPASS points system.'
      },
      {
        id: 'quote-022-02',
        speakerId: 'person-010',
        speakerType: 'person',
        text: 'The government remains committed to ensuring Singaporeans have access to good jobs while maintaining an open economy that attracts global talent.'
      }
    ],
    activities: [
      {
        id: 'activity-022-01',
        actorId: 'org-010',
        actorType: 'organization',
        action: 'issued clarification on',
        targetId: null,
        targetType: null,
        targetText: 'Employment Pass policies and COMPASS framework'
      },
      {
        id: 'activity-022-02',
        actorId: 'person-010',
        actorType: 'person',
        action: 'emphasized',
        targetId: null,
        targetType: null,
        targetText: 'government commitment to Singaporean job access alongside open economy'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.55 },
      'faction-006': { sentiment: -0.35 },
      'faction-007': { sentiment: 0.25 }
    },
    metrics: { shares: 6200 },
    highlights: [],
    comments: []
  },
  // Religious Harmony documents
  {
    id: 'doc-023',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Police investigating Speakers\' Corner confrontation between religious groups',
    url: 'https://cna.sg/news/singapore/speakers-corner-religious-confrontation',
    publishedDate: '2025-11-28T19:00:00+08:00',
    publisherId: 'pub-sg-cna',
    author: 'Cheryl Tan',
    excerpt: 'Police are investigating a confrontation at Hong Lim Park between groups holding religious placards.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'Police are investigating a confrontation at Speakers\' Corner in Hong Lim Park on Saturday afternoon between groups holding religious placards, which sparked heated debate online about religious tolerance in Singapore.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Videos circulating on social media show individuals from different religious groups engaged in verbal confrontation, with some placards bearing provocative messaging.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The Ministry of Home Affairs issued a reminder that Singapore has strict laws against inciting religious disharmony and urged all parties to exercise restraint.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-007'],
    themeIds: ['sub-014'],
    topicIds: [],
    personIds: [],
    organizationIds: ['org-007'],
    locationIds: ['loc-001'],
    eventIds: ['event-013'],
    tagIds: ['tag-004'],
    quotes: [
      {
        id: 'quote-023-01',
        speakerId: 'org-007',
        speakerType: 'organization',
        text: 'Singapore has strict laws against inciting religious disharmony. We urge all parties to exercise restraint.'
      }
    ],
    activities: [
      {
        id: 'activity-023-01',
        actorId: 'org-007',
        actorType: 'organization',
        action: 'issued reminder about',
        targetId: null,
        targetType: null,
        targetText: 'laws against inciting religious disharmony'
      },
      {
        id: 'activity-023-02',
        actorId: 'org-007',
        actorType: 'organization',
        action: 'investigating',
        targetId: null,
        targetType: null,
        targetText: 'confrontation at Speakers\' Corner between religious groups'
      },
      {
        id: 'activity-023-03',
        actorId: 'org-007',
        actorType: 'organization',
        action: 'urged',
        targetId: null,
        targetType: null,
        targetText: 'all parties to exercise restraint'
      }
    ],
    factionMentions: {
      'faction-007': { sentiment: -0.55 },
      'faction-008': { sentiment: -0.85 }
    },
    metrics: { shares: 22500 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-024',
    documentType: 'internal_report',
    repositoryId: 'repo-edl',
    classification: 'C',
    title: 'MCO Assessment: Online amplification of religious confrontation incident',
    url: 'https://edl.intel.gov/documents/doc-024',
    publishedDate: '2025-11-29T10:00:00+08:00',
    publisherId: 'pub-dept-mco',
    author: 'MCO Analysis Division',
    excerpt: 'Analysis of online reaction to the Speakers\' Corner incident, including suspected coordinated amplification.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: '(C) The Speakers\' Corner incident has generated significant online attention, with videos shared over 50,000 times across platforms within 12 hours.', portionMark: { classification: 'C', handling: '' } },
      { type: 'paragraph', content: '(C) Analysis indicates potential coordinated amplification by accounts previously flagged in the ethno-religious provocation network. These accounts are selectively sharing the most inflammatory clips while ignoring context.', portionMark: { classification: 'C', handling: '' } },
      { type: 'paragraph', content: '(C) Recommendation: Continue monitoring for escalation. Coordinate with MHA on potential enforcement action if incitement threshold is crossed.', portionMark: { classification: 'C', handling: '' } }
    ],
    narrativeIds: ['narr-007'],
    themeIds: ['sub-014', 'sub-015'],
    topicIds: [],
    personIds: [],
    organizationIds: ['org-007'],
    locationIds: ['loc-001'],
    eventIds: ['event-013'],
    tagIds: ['tag-004'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-008': { sentiment: -0.88 }
    },
    metrics: { shares: 0 },
    highlights: [],
    comments: []
  },
  // South China Sea documents
  {
    id: 'doc-025',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Chinese naval vessels transit Singapore Strait',
    url: 'https://cna.sg/news/asia/chinese-naval-vessels-singapore-strait',
    publishedDate: '2025-12-05T08:00:00+08:00',
    publisherId: 'pub-sg-cna',
    author: 'Aqil Haziq Mahmud',
    excerpt: 'A Chinese naval task group transited through the Singapore Strait on Thursday, drawing attention amid regional maritime tensions.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'A Chinese naval task group consisting of three vessels transited through the Singapore Strait on Thursday morning, a routine passage that nonetheless drew attention amid ongoing tensions in the South China Sea.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The Republic of Singapore Navy monitored the transit, which was conducted in accordance with international maritime law, according to MINDEF.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The transit comes as China continues to expand its naval presence in the region, with analysts noting increased frequency of PLAN operations in Southeast Asian waters.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-006'],
    themeIds: ['sub-012'],
    topicIds: [],
    personIds: ['person-018'],
    organizationIds: ['org-004', 'org-022'],
    locationIds: ['loc-007', 'loc-008'],
    eventIds: ['event-014'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-025-01',
        speakerId: 'org-004',
        speakerType: 'organization',
        text: 'The transit was conducted in accordance with international maritime law.'
      }
    ],
    activities: [
      {
        id: 'activity-025-01',
        actorId: 'org-022',
        actorType: 'organization',
        action: 'transited',
        targetId: null,
        targetType: null,
        targetText: 'Singapore Strait with three-vessel naval task group'
      },
      {
        id: 'activity-025-02',
        actorId: 'org-004',
        actorType: 'organization',
        action: 'monitored',
        targetId: 'org-022',
        targetType: 'organization',
        targetText: 'Chinese naval task group transit'
      },
      {
        id: 'activity-025-03',
        actorId: 'org-022',
        actorType: 'organization',
        action: 'expanded presence in',
        targetId: null,
        targetType: null,
        targetText: 'Southeast Asian waters'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.35 },
      'faction-003': { sentiment: 0.72 },
      'faction-007': { sentiment: -0.25 }
    },
    metrics: { shares: 9500 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-026',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Analysis: What increased PLA Navy presence means for Southeast Asia',
    url: 'https://scmp.com/news/asia/southeast-asia/pla-navy-presence-analysis',
    publishedDate: '2025-12-07T10:00:00+08:00',
    publisherId: 'pub-reg-scmp',
    author: 'Kristin Huang',
    excerpt: 'Analysis of implications of increased Chinese naval activity in Southeast Asian waters for regional security.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'The increased frequency of PLA Navy transits through Southeast Asian waters reflects China\'s growing blue-water naval capabilities and its strategic interest in protecting sea lanes critical to its economy.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'For Singapore, which sits at the crossroads of major shipping routes, this represents both an economic opportunity and a security consideration. The city-state has long benefited from its position but now must navigate an increasingly complex regional environment.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Analysts suggest ASEAN nations will need to strengthen maritime domain awareness and coordination, while avoiding actions that could escalate tensions with Beijing.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-006'],
    themeIds: ['sub-012', 'sub-013'],
    topicIds: [],
    personIds: [],
    organizationIds: ['org-022', 'org-023'],
    locationIds: ['loc-007'],
    eventIds: ['event-014'],
    tagIds: ['tag-005'],
    quotes: [],
    activities: [
      {
        id: 'activity-026-01',
        actorId: 'org-022',
        actorType: 'organization',
        action: 'increased transit frequency through',
        targetId: null,
        targetType: null,
        targetText: 'Southeast Asian waters'
      },
      {
        id: 'activity-026-02',
        actorId: 'org-023',
        actorType: 'organization',
        action: 'called for',
        targetId: null,
        targetType: null,
        targetText: 'strengthened maritime domain awareness and coordination'
      }
    ],
    factionMentions: {
      'faction-003': { sentiment: 0.55 },
      'faction-007': { sentiment: -0.35 }
    },
    metrics: { shares: 4200 },
    highlights: [],
    comments: []
  },
  // Malaysia Water Agreement documents
  {
    id: 'doc-027',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Malaysia-Singapore water talks to resume next week',
    url: 'https://thestar.com.my/news/nation/malaysia-singapore-water-talks',
    publishedDate: '2025-12-08T09:00:00+08:00',
    publisherId: 'pub-reg-thestar',
    author: 'Soo Wern Jun',
    excerpt: 'Malaysia and Singapore will hold bilateral talks on water cooperation next week, including discussion of the 1962 Water Agreement.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'KUALA LUMPUR: Malaysia and Singapore will hold bilateral talks on water cooperation next week, with the 1962 Water Agreement expected to feature prominently in discussions.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Malaysian officials have previously suggested the agreement, which allows Singapore to draw water from Johor at a highly subsidized rate, should be renegotiated to reflect current market prices.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Singapore maintains the agreement is legally binding and any changes must follow established review mechanisms.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-005'],
    themeIds: ['sub-010'],
    topicIds: ['topic-005'],
    personIds: ['person-004'],
    organizationIds: [],
    locationIds: ['loc-004', 'loc-005'],
    eventIds: ['event-015'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-027-01',
        speakerId: 'person-004',
        speakerType: 'person',
        text: 'The 1962 Water Agreement should be renegotiated to reflect current market prices.'
      }
    ],
    activities: [
      {
        id: 'activity-027-01',
        actorId: 'person-004',
        actorType: 'person',
        action: 'suggested renegotiation of',
        targetId: null,
        targetType: null,
        targetText: '1962 Water Agreement pricing terms'
      },
      {
        id: 'activity-027-02',
        actorId: 'person-004',
        actorType: 'person',
        action: 'scheduled',
        targetId: null,
        targetType: null,
        targetText: 'bilateral talks on water cooperation with Singapore'
      }
    ],
    factionMentions: {
      'faction-005': { sentiment: -0.55 },
      'faction-001': { sentiment: 0.45 }
    },
    metrics: { shares: 5800 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-028',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Malaysian Twitter reactions to water talks announcement',
    url: 'https://x.com/search?q=singapore+water+johor',
    publishedDate: '2025-12-08T14:00:00+08:00',
    publisherId: 'pub-x',
    author: 'Various accounts',
    excerpt: 'Collection of Malaysian social media reactions to the water talks announcement.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: '@johor_water_rights: For 60 years we sell water cheap cheap to Singapore. Time to change this colonial agreement.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '@my_realist: The agreement benefits both sides. Johor gets treated water back at subsidized rates too. Stop politicizing this.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '@tanah_melayu_ku: Singapore so rich but want to pay 3 sen per 1000 gallons. Where got fair?', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-005'],
    themeIds: ['sub-010', 'sub-011'],
    topicIds: ['topic-005'],
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-005'],
    eventIds: ['event-015'],
    tagIds: ['tag-005', 'tag-origin-003'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-005': { sentiment: -0.72 }
    },
    metrics: { shares: 0 },
    highlights: [],
    comments: []
  },
  // POFMA document
  {
    id: 'doc-029',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'POFMA correction directive issued for false NS claims',
    url: 'https://cna.sg/news/singapore/pofma-correction-ns-false-claims',
    publishedDate: '2025-12-18T18:00:00+08:00',
    publisherId: 'pub-sg-cna',
    author: 'Ang Hwee Min',
    excerpt: 'A POFMA correction directive was issued for social media posts containing false claims about NS exemptions for new citizens.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'The Ministry of Defence has issued a POFMA correction directive to a Facebook user for posts containing false claims about National Service exemptions for new citizens and permanent residents.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The posts claimed that all new citizens are exempt from NS obligations, which MINDEF said is "patently false." Under the Enlistment Act, first-generation male permanent residents and new citizens are required to register for and serve NS.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The correction notice must be published alongside the original posts and will link to a government factual clarification.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-001'],
    themeIds: ['sub-002'],
    topicIds: [],
    personIds: ['person-006'],
    organizationIds: ['org-001', 'org-006', 'org-016'],
    locationIds: ['loc-001'],
    eventIds: ['event-016'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-029-01',
        speakerId: 'org-001',
        speakerType: 'organization',
        text: 'The claim that all new citizens are exempt from NS obligations is patently false. Under the Enlistment Act, first-generation male permanent residents and new citizens are required to register for and serve NS.'
      }
    ],
    activities: [
      {
        id: 'activity-029-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'issued POFMA correction directive for',
        targetId: null,
        targetType: null,
        targetText: 'false claims about NS exemptions for new citizens'
      },
      {
        id: 'activity-029-02',
        actorId: 'org-006',
        actorType: 'organization',
        action: 'enforced',
        targetId: null,
        targetType: null,
        targetText: 'POFMA correction notice requiring publication alongside original posts'
      },
      {
        id: 'activity-029-03',
        actorId: 'org-016',
        actorType: 'organization',
        action: 'published',
        targetId: null,
        targetType: null,
        targetText: 'government factual clarification linked from correction notice'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.65 },
      'faction-002': { sentiment: -0.35 }
    },
    metrics: { shares: 8200 },
    highlights: [],
    comments: []
  },
  // SAF Modernization documents
  {
    id: 'doc-030',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'SAF unveils next-generation armoured fighting vehicle at Singapore Airshow',
    url: 'https://straitstimes.com/singapore/saf-next-gen-afv-airshow',
    publishedDate: '2026-01-08T11:00:00+08:00',
    publisherId: 'pub-sg-st',
    author: 'Ng Wei Kai',
    excerpt: 'MINDEF unveiled a locally-developed next-generation armoured fighting vehicle at the Singapore Airshow, showcasing SAF modernization efforts.',
    headerImage: {
      url: 'http://static.photos/military/640x360/030',
      caption: 'The Next-Generation Armoured Fighting Vehicle on display at Singapore Airshow 2026. Photo: MINDEF'
    },
    contentBlocks: [
      { type: 'paragraph', content: 'The Ministry of Defence unveiled a locally-developed Next-Generation Armoured Fighting Vehicle (NGAFV) at the Singapore Airshow on Wednesday, marking a significant milestone in SAF modernization efforts.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The NGAFV, developed by ST Engineering in collaboration with DSTA, features advanced protection systems, enhanced firepower, and improved situational awareness through integrated sensors and AI-assisted systems.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Minister for Defence Dr Ng Eng Hen said the vehicle represents Singapore\'s commitment to developing indigenous defence capabilities. "This demonstrates that a small nation can punch above its weight through innovation and technological excellence."', portionMark: { classification: 'U', handling: '' } },
      { type: 'blockquote', content: '"The NGAFV will give our soldiers a decisive edge on the modern battlefield. It represents the best of Singapore\'s defence technology ecosystem." — Dr Ng Eng Hen', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-010'],
    themeIds: ['sub-020'],
    topicIds: ['topic-006'],
    personIds: ['person-001', 'person-024'],
    organizationIds: ['org-001', 'org-003'],
    locationIds: ['loc-001'],
    eventIds: ['event-017'],
    tagIds: ['tag-006'],
    quotes: [
      {
        id: 'quote-030-01',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'This demonstrates that a small nation can punch above its weight through innovation and technological excellence.'
      },
      {
        id: 'quote-030-02',
        speakerId: 'person-001',
        speakerType: 'person',
        text: 'The NGAFV will give our soldiers a decisive edge on the modern battlefield. It represents the best of Singapore\'s defence technology ecosystem.'
      }
    ],
    activities: [
      {
        id: 'activity-030-01',
        actorId: 'org-001',
        actorType: 'organization',
        action: 'unveiled',
        targetId: null,
        targetType: null,
        targetText: 'Next-Generation Armoured Fighting Vehicle at Singapore Airshow'
      },
      {
        id: 'activity-030-02',
        actorId: 'org-003',
        actorType: 'organization',
        action: 'developed',
        targetId: null,
        targetType: null,
        targetText: 'NGAFV in collaboration with DSTA'
      },
      {
        id: 'activity-030-03',
        actorId: 'person-001',
        actorType: 'person',
        action: 'announced',
        targetId: null,
        targetType: null,
        targetText: 'SAF modernization milestone showcasing indigenous defence capabilities'
      },
      {
        id: 'activity-030-04',
        actorId: 'person-024',
        actorType: 'person',
        action: 'presented',
        targetId: null,
        targetType: null,
        targetText: 'technical capabilities of NGAFV at Singapore Airshow'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.85 },
      'faction-007': { sentiment: 0.62 }
    },
    metrics: { shares: 15200 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-031',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'Positive social media reactions to SAF equipment showcase',
    url: 'https://facebook.com/search/posts?q=saf+airshow+vehicle',
    publishedDate: '2026-01-08T15:00:00+08:00',
    publisherId: 'pub-facebook',
    author: 'Various users',
    excerpt: 'Social media reactions to the NGAFV unveiling at Singapore Airshow.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'User A: "Proud moment for Singapore! This is why we invest in defence technology. Majulah SAF!"', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'User B: "As an NSman who served in armour, this is impressive. The tech has come a long way since my time."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'User C: "Great that we\'re developing our own capabilities instead of just buying foreign equipment. This is true self-reliance."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-010'],
    themeIds: ['sub-020', 'sub-021'],
    topicIds: ['topic-006'],
    personIds: [],
    organizationIds: ['org-002'],
    locationIds: ['loc-001'],
    eventIds: ['event-017'],
    tagIds: ['tag-006'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-001': { sentiment: 0.82 },
      'faction-007': { sentiment: 0.55 }
    },
    metrics: { shares: 0 },
    highlights: [],
    comments: []
  },
  // Chinese Embassy Statement documents
  {
    id: 'doc-032',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Chinese embassy criticizes Singapore media coverage of South China Sea',
    url: 'https://globaltimes.cn/page/202601/chinese-embassy-singapore-media.html',
    publishedDate: '2026-01-15T10:00:00+08:00',
    publisherId: 'pub-reg-globaltimes',
    author: 'Liu Xin',
    excerpt: 'Chinese embassy in Singapore issues statement criticizing local media coverage of South China Sea issues.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'The Chinese embassy in Singapore issued a statement on Wednesday criticizing what it called "biased" coverage of South China Sea issues in Singapore media.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"Singapore media has consistently adopted Western narratives on the South China Sea, ignoring China\'s historical rights and legal positions," the statement said.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The embassy called on Singapore media to present "balanced and fair" coverage that reflects China\'s perspective on maritime disputes.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-007'],
    topicIds: ['topic-003'],
    personIds: [],
    organizationIds: ['org-017'],
    locationIds: ['loc-001'],
    eventIds: ['event-018'],
    tagIds: ['tag-004', 'tag-origin-002'],
    quotes: [
      {
        id: 'quote-032-01',
        speakerId: 'org-017',
        speakerType: 'organization',
        text: 'Singapore media has consistently adopted Western narratives on the South China Sea, ignoring China\'s historical rights and legal positions.'
      }
    ],
    activities: [
      {
        id: 'activity-032-01',
        actorId: 'org-017',
        actorType: 'organization',
        action: 'issued statement criticizing',
        targetId: null,
        targetType: null,
        targetText: 'Singapore media coverage of South China Sea issues'
      },
      {
        id: 'activity-032-02',
        actorId: 'org-017',
        actorType: 'organization',
        action: 'called for',
        targetId: null,
        targetType: null,
        targetText: 'balanced and fair coverage reflecting China\'s perspective'
      }
    ],
    factionMentions: {
      'faction-003': { sentiment: 0.78 },
      'faction-004': { sentiment: 0.72 },
      'faction-001': { sentiment: -0.58 }
    },
    metrics: { shares: 8500 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-033',
    documentType: 'social_post',
    repositoryId: 'repo-osint',
    classification: 'U',
    title: 'WeChat amplification of embassy statement',
    url: 'https://wechat.com/channels/singapore_chinese_community',
    publishedDate: '2026-01-15T14:00:00+08:00',
    publisherId: 'pub-wechat',
    author: 'Various accounts',
    excerpt: 'WeChat sharing of the Chinese embassy statement among Singapore Chinese community groups.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'Post in SG Chinese Professionals group: "The embassy is right. Local media only shows one side of the South China Sea story. We should hear both perspectives."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Reply: "As Singaporean Chinese we should support our ancestral homeland. China has historical claims."', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'Counter-reply: "We are Singaporeans first. Our national interest is not the same as China\'s interest."', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-007'],
    topicIds: ['topic-003'],
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-001'],
    eventIds: ['event-018'],
    tagIds: ['tag-005', 'tag-origin-002'],
    quotes: [],
    activities: [],
    factionMentions: {
      'faction-003': { sentiment: 0.72 },
      'faction-007': { sentiment: -0.25 }
    },
    metrics: { shares: 0 },
    highlights: [
      {
        id: 'highlight-007',
        userId: 'user-003',
        blockIndex: 1,
        startOffset: 0,
        endOffset: 85,
        highlightedText: 'As Singaporean Chinese we should support our ancestral homeland. China has historical claims.',
        createdAt: '2026-01-15T16:00:00+08:00'
      }
    ],
    comments: [
      {
        id: 'comment-007',
        userId: 'user-003',
        blockIndex: 1,
        anchorStartOffset: 0,
        anchorEndOffset: 85,
        anchorText: 'As Singaporean Chinese we should support our ancestral homeland.',
        content: 'This framing echoes the Global Times narrative about ethnic loyalty. Worth tracking if this sentiment spreads.',
        createdAt: '2026-01-15T16:15:00+08:00',
        replies: []
      }
    ]
  },
  {
    id: 'doc-034',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'MFA rejects Chinese embassy characterization of Singapore media',
    url: 'https://cna.sg/news/singapore/mfa-rejects-chinese-embassy-media-criticism',
    publishedDate: '2026-01-16T17:00:00+08:00',
    publisherId: 'pub-sg-cna',
    author: 'Rachel Phua',
    excerpt: 'Ministry of Foreign Affairs issued a statement rejecting the Chinese embassy\'s characterization of Singapore media coverage.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'The Ministry of Foreign Affairs (MFA) on Thursday rejected the Chinese embassy\'s characterization of Singapore media coverage as "biased," affirming the editorial independence of Singapore\'s press.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"Singapore media operates independently of the government and is not obligated to present any country\'s official position," the MFA statement said.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: '"We note with concern attempts by foreign missions to characterize our media\'s coverage in ways that suggest they should adopt particular national perspectives."', portionMark: { classification: 'U', handling: '' } },
      { type: 'blockquote', content: '"Singapore will not accept foreign interference in our domestic discourse, whether from any country." — MFA Spokesperson', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-003'],
    themeIds: ['sub-006', 'sub-007'],
    topicIds: ['topic-003'],
    personIds: ['person-005'],
    organizationIds: ['org-008'],
    locationIds: ['loc-001'],
    eventIds: ['event-019'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-034-01',
        speakerId: 'org-008',
        speakerType: 'organization',
        text: 'Singapore media operates independently of the government and is not obligated to present any country\'s official position.'
      },
      {
        id: 'quote-034-02',
        speakerId: 'org-008',
        speakerType: 'organization',
        text: 'We note with concern attempts by foreign missions to characterize our media\'s coverage in ways that suggest they should adopt particular national perspectives.'
      },
      {
        id: 'quote-034-03',
        speakerId: 'org-008',
        speakerType: 'organization',
        text: 'Singapore will not accept foreign interference in our domestic discourse, whether from any country.'
      }
    ],
    activities: [
      {
        id: 'activity-034-01',
        actorId: 'org-008',
        actorType: 'organization',
        action: 'rejected',
        targetId: 'org-017',
        targetType: 'organization',
        targetText: 'Chinese embassy\'s characterization of Singapore media as biased'
      },
      {
        id: 'activity-034-02',
        actorId: 'org-008',
        actorType: 'organization',
        action: 'affirmed',
        targetId: null,
        targetType: null,
        targetText: 'editorial independence of Singapore\'s press'
      },
      {
        id: 'activity-034-03',
        actorId: 'person-005',
        actorType: 'person',
        action: 'expressed concern about',
        targetId: null,
        targetType: null,
        targetText: 'foreign missions attempting to influence domestic media coverage'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.82 },
      'faction-003': { sentiment: -0.72 },
      'faction-007': { sentiment: 0.58 }
    },
    metrics: { shares: 22500 },
    highlights: [],
    comments: []
  },
  // Leaders Retreat documents
  {
    id: 'doc-035',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Singapore-Malaysia Leaders\' Retreat addresses bilateral issues',
    url: 'https://straitstimes.com/asia/se-asia/singapore-malaysia-leaders-retreat-2026',
    publishedDate: '2026-01-22T18:00:00+08:00',
    publisherId: 'pub-sg-st',
    author: 'Tan Hui Yee',
    excerpt: 'Prime Ministers of Singapore and Malaysia met for the annual Leaders\' Retreat, discussing water, airspace, and economic cooperation.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'Prime Minister Lawrence Wong and Malaysian Prime Minister Anwar Ibrahim met in Kuala Lumpur on Wednesday for the annual Leaders\' Retreat, reaffirming commitment to strengthening bilateral ties.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The leaders discussed ongoing bilateral issues including water cooperation, airspace management, and the progress of the Johor Bahru-Singapore Rapid Transit System Link.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'On water, PM Anwar acknowledged the 1962 Water Agreement while noting Malaysia\'s interest in exploring new frameworks for future cooperation. PM Wong reiterated Singapore\'s position that existing agreements must be honored.', portionMark: { classification: 'U', handling: '' } },
      { type: 'blockquote', content: '"Our relationship is stronger than any single issue. We will continue to work together in the spirit of good neighbourliness." — PM Lawrence Wong', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-005'],
    themeIds: ['sub-010', 'sub-011'],
    topicIds: ['topic-005'],
    personIds: ['person-004', 'person-009'],
    organizationIds: ['org-009'],
    locationIds: ['loc-004'],
    eventIds: ['event-020'],
    tagIds: ['tag-006'],
    quotes: [
      {
        id: 'quote-035-01',
        speakerId: 'person-009',
        speakerType: 'person',
        text: 'Our relationship is stronger than any single issue. We will continue to work together in the spirit of good neighbourliness.'
      }
    ],
    activities: [
      {
        id: 'activity-035-01',
        actorId: 'person-009',
        actorType: 'person',
        action: 'met with',
        targetId: 'person-004',
        targetType: 'person',
        targetText: 'Malaysian PM at annual Leaders\' Retreat in Kuala Lumpur'
      },
      {
        id: 'activity-035-02',
        actorId: 'person-009',
        actorType: 'person',
        action: 'reiterated',
        targetId: null,
        targetType: null,
        targetText: 'Singapore\'s position that existing water agreements must be honored'
      },
      {
        id: 'activity-035-03',
        actorId: 'person-004',
        actorType: 'person',
        action: 'acknowledged',
        targetId: null,
        targetType: null,
        targetText: '1962 Water Agreement while noting interest in exploring new frameworks'
      },
      {
        id: 'activity-035-04',
        actorId: 'org-009',
        actorType: 'organization',
        action: 'reaffirmed commitment to',
        targetId: null,
        targetType: null,
        targetText: 'strengthening bilateral ties with Malaysia'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.65 },
      'faction-005': { sentiment: 0.35 },
      'faction-007': { sentiment: 0.55 }
    },
    metrics: { shares: 12500 },
    highlights: [],
    comments: []
  },
  {
    id: 'doc-036',
    documentType: 'news_article',
    repositoryId: 'repo-news',
    classification: 'U',
    title: 'Malaysian media reaction to Leaders\' Retreat outcomes',
    url: 'https://nst.com.my/news/nation/leaders-retreat-outcomes',
    publishedDate: '2026-01-23T10:00:00+08:00',
    publisherId: 'pub-reg-nst',
    author: 'Farhan Ahmad',
    excerpt: 'Malaysian media reports on the outcomes of the annual Leaders\' Retreat between Prime Ministers of Malaysia and Singapore.',
    headerImage: null,
    contentBlocks: [
      { type: 'paragraph', content: 'KUALA LUMPUR: The annual Leaders\' Retreat between Prime Minister Datuk Seri Anwar Ibrahim and Singapore Prime Minister Lawrence Wong concluded with both leaders expressing optimism about bilateral relations.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'On the water issue, Anwar said Malaysia will continue to advocate for a review of pricing mechanisms while respecting existing legal frameworks.', portionMark: { classification: 'U', handling: '' } },
      { type: 'paragraph', content: 'The RTS Link project was highlighted as a positive example of bilateral cooperation, with both governments committed to the 2026 completion target.', portionMark: { classification: 'U', handling: '' } }
    ],
    narrativeIds: ['narr-005'],
    themeIds: ['sub-011'],
    topicIds: ['topic-005'],
    personIds: ['person-004', 'person-009'],
    organizationIds: [],
    locationIds: ['loc-004'],
    eventIds: ['event-020'],
    tagIds: ['tag-005'],
    quotes: [
      {
        id: 'quote-036-01',
        speakerId: 'person-004',
        speakerType: 'person',
        text: 'Malaysia will continue to advocate for a review of pricing mechanisms while respecting existing legal frameworks.'
      }
    ],
    activities: [
      {
        id: 'activity-036-01',
        actorId: 'person-004',
        actorType: 'person',
        action: 'expressed optimism about',
        targetId: null,
        targetType: null,
        targetText: 'bilateral relations with Singapore'
      },
      {
        id: 'activity-036-02',
        actorId: 'person-004',
        actorType: 'person',
        action: 'committed to',
        targetId: null,
        targetType: null,
        targetText: 'RTS Link project 2026 completion target'
      },
      {
        id: 'activity-036-03',
        actorId: 'person-009',
        actorType: 'person',
        action: 'highlighted',
        targetId: null,
        targetType: null,
        targetText: 'RTS Link as positive example of bilateral cooperation'
      }
    ],
    factionMentions: {
      'faction-001': { sentiment: 0.55 },
      'faction-005': { sentiment: 0.45 },
      'faction-007': { sentiment: 0.42 }
    },
    metrics: { shares: 3800 },
    highlights: [],
    comments: []
  }
];
