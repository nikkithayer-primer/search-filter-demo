/**
 * Narratives for Singapore MCO dataset
 */

export const narratives = [
  {
    id: 'narr-001',
    text: 'NS duration and policies are unfair compared to regional peers',
    description: 'A persistent narrative questioning the fairness of Singapore\'s 2-year National Service requirement. Critics compare NS obligations with Taiwan (4 months), South Korea (18-21 months), and question why PRs and new citizens face different requirements. The narrative intensifies during training incidents and when career disruption stories circulate.',
    missionId: 'mission-001',
    sentiment: -0.52,
    themeIds: ['sub-001', 'sub-002', 'sub-003'],
    tagIds: ['tag-005', 'tag-mission-001'],
    factionMentions: {
      'faction-001': { volume: 320, sentiment: 0.72 },
      'faction-002': { volume: 580, sentiment: -0.78 },
      'faction-007': { volume: 450, sentiment: -0.25 }
    },
    publisherVolumes: {
      'pub-hwz': { volume: 285, sentiment: -0.62 },
      'pub-reddit': { volume: 165, sentiment: -0.55 },
      'pub-x': { volume: 145, sentiment: -0.48 },
      'pub-tiktok': { volume: 220, sentiment: -0.58 },
      'pub-facebook': { volume: 180, sentiment: -0.42 },
      'pub-sg-mothership': { volume: 85, sentiment: -0.35 }
    },
    factionSources: {
      'faction-001': { 'pub-facebook': 120, 'pub-x': 95, 'pub-sg-cna': 65, 'pub-sg-st': 40 },
      'faction-002': { 'pub-hwz': 245, 'pub-reddit': 135, 'pub-tiktok': 180, 'pub-x': 50 },
      'faction-007': { 'pub-facebook': 180, 'pub-hwz': 120, 'pub-sg-mothership': 85, 'pub-reddit': 65 }
    },
    personIds: ['person-001', 'person-003', 'person-016'],
    organizationIds: ['org-001', 'org-002', 'org-015'],
    locationIds: ['loc-001', 'loc-003'],
    eventIds: ['event-003', 'event-009', 'event-016'],
    volumeOverTime: [
      { date: '2025-09-01', factionVolumes: { 'faction-001': 85, 'faction-002': 125, 'faction-007': 95 }, publisherVolumes: { 'pub-hwz': 65, 'pub-reddit': 35, 'pub-tiktok': 55 } },
      { date: '2025-09-08', factionVolumes: { 'faction-001': 145, 'faction-002': 285, 'faction-007': 180 }, publisherVolumes: { 'pub-hwz': 145, 'pub-reddit': 85, 'pub-tiktok': 125 } },
      { date: '2025-09-15', factionVolumes: { 'faction-001': 180, 'faction-002': 385, 'faction-007': 265 }, publisherVolumes: { 'pub-hwz': 185, 'pub-reddit': 105, 'pub-tiktok': 165 } },
      { date: '2025-10-01', factionVolumes: { 'faction-001': 245, 'faction-002': 485, 'faction-007': 365 }, publisherVolumes: { 'pub-hwz': 225, 'pub-reddit': 135, 'pub-tiktok': 195 } },
      { date: '2025-10-15', factionVolumes: { 'faction-001': 285, 'faction-002': 545, 'faction-007': 420 }, publisherVolumes: { 'pub-hwz': 265, 'pub-reddit': 155, 'pub-tiktok': 210 } },
      { date: '2025-11-01', factionVolumes: { 'faction-001': 320, 'faction-002': 580, 'faction-007': 450 }, publisherVolumes: { 'pub-hwz': 285, 'pub-reddit': 165, 'pub-tiktok': 220 } }
    ],
    documentIds: ['doc-004', 'doc-005', 'doc-016', 'doc-017', 'doc-029'],
    createdAt: '2025-09-01T00:00:00Z'
  },
  {
    id: 'narr-002',
    text: 'SAF training standards questioned after fatal incidents',
    description: 'Narrative questioning SAF training safety following NSF fatalities. Critics argue that incidents reveal systemic problems, while defenders emphasize the inherent risks of military training and continuous safety improvements. The narrative peaks after each incident and triggers broader debates about military culture.',
    missionId: 'mission-002',
    sentiment: -0.58,
    themeIds: ['sub-004', 'sub-005'],
    tagIds: ['tag-004', 'tag-mission-002'],
    factionMentions: {
      'faction-001': { volume: 185, sentiment: 0.45 },
      'faction-002': { volume: 420, sentiment: -0.82 },
      'faction-006': { volume: 280, sentiment: -0.68 },
      'faction-007': { volume: 520, sentiment: -0.45 }
    },
    publisherVolumes: {
      'pub-sg-cna': { volume: 125, sentiment: -0.35 },
      'pub-sg-st': { volume: 115, sentiment: -0.38 },
      'pub-hwz': { volume: 320, sentiment: -0.72 },
      'pub-reddit': { volume: 185, sentiment: -0.65 },
      'pub-facebook': { volume: 245, sentiment: -0.52 },
      'pub-x': { volume: 165, sentiment: -0.58 }
    },
    factionSources: {
      'faction-001': { 'pub-sg-cna': 85, 'pub-sg-st': 72, 'pub-facebook': 65 },
      'faction-002': { 'pub-hwz': 225, 'pub-reddit': 125, 'pub-x': 95 },
      'faction-006': { 'pub-sg-toc': 85, 'pub-hwz': 95, 'pub-facebook': 75 },
      'faction-007': { 'pub-sg-cna': 145, 'pub-sg-st': 135, 'pub-facebook': 165, 'pub-hwz': 125 }
    },
    personIds: ['person-001', 'person-002', 'person-024'],
    organizationIds: ['org-001', 'org-002', 'org-003'],
    locationIds: ['loc-003'],
    eventIds: ['event-001', 'event-002'],
    volumeOverTime: [
      { date: '2025-08-15', factionVolumes: { 'faction-001': 45, 'faction-002': 185, 'faction-006': 125, 'faction-007': 285 }, publisherVolumes: { 'pub-sg-cna': 85, 'pub-hwz': 165 } },
      { date: '2025-08-18', factionVolumes: { 'faction-001': 125, 'faction-002': 385, 'faction-006': 245, 'faction-007': 485 }, publisherVolumes: { 'pub-sg-cna': 125, 'pub-hwz': 285, 'pub-reddit': 165 } },
      { date: '2025-08-22', factionVolumes: { 'faction-001': 165, 'faction-002': 415, 'faction-006': 275, 'faction-007': 512 }, publisherVolumes: { 'pub-sg-cna': 125, 'pub-hwz': 315, 'pub-reddit': 180 } },
      { date: '2025-09-01', factionVolumes: { 'faction-001': 185, 'faction-002': 420, 'faction-006': 280, 'faction-007': 520 }, publisherVolumes: { 'pub-sg-cna': 125, 'pub-hwz': 320, 'pub-reddit': 185 } }
    ],
    documentIds: ['doc-001', 'doc-002', 'doc-003'],
    createdAt: '2025-08-15T00:00:00Z'
  },
  {
    id: 'narr-003',
    text: 'Singapore is becoming a US proxy in Southeast Asia',
    description: 'Chinese state media and aligned voices push narrative that Singapore is abandoning neutrality to become a US strategic partner, citing defence agreements, military exercises, and statements critical of China. The narrative questions Singapore\'s independence and suggests alignment with "Western containment" of China.',
    missionId: 'mission-003',
    sentiment: -0.62,
    themeIds: ['sub-006', 'sub-007'],
    tagIds: ['tag-004', 'tag-mission-003', 'tag-origin-002'],
    factionMentions: {
      'faction-001': { volume: 145, sentiment: -0.72 },
      'faction-003': { volume: 385, sentiment: 0.82 },
      'faction-004': { volume: 165, sentiment: 0.78 },
      'faction-007': { volume: 85, sentiment: -0.35 }
    },
    publisherVolumes: {
      'pub-reg-globaltimes': { volume: 125, sentiment: 0.75 },
      'pub-reg-xinhua': { volume: 85, sentiment: 0.68 },
      'pub-wechat': { volume: 145, sentiment: 0.72 },
      'pub-weibo': { volume: 165, sentiment: 0.78 },
      'pub-x': { volume: 95, sentiment: -0.42 },
      'pub-sg-cna': { volume: 45, sentiment: -0.55 }
    },
    factionSources: {
      'faction-001': { 'pub-sg-cna': 75, 'pub-sg-st': 55, 'pub-x': 45 },
      'faction-003': { 'pub-reg-globaltimes': 115, 'pub-wechat': 125, 'pub-weibo': 145, 'pub-reg-xinhua': 75 },
      'faction-004': { 'pub-reg-globaltimes': 65, 'pub-weibo': 55, 'pub-reg-xinhua': 45 },
      'faction-007': { 'pub-x': 45, 'pub-sg-cna': 25, 'pub-facebook': 35 }
    },
    personIds: ['person-005', 'person-008', 'person-012', 'person-021'],
    organizationIds: ['org-008', 'org-017', 'org-018', 'org-019'],
    locationIds: ['loc-001', 'loc-006'],
    eventIds: ['event-007', 'event-008', 'event-018', 'event-019'],
    volumeOverTime: [
      { date: '2025-10-15', factionVolumes: { 'faction-001': 65, 'faction-003': 185, 'faction-004': 85, 'faction-007': 35 }, publisherVolumes: { 'pub-reg-globaltimes': 65, 'pub-weibo': 85 } },
      { date: '2025-10-22', factionVolumes: { 'faction-001': 95, 'faction-003': 285, 'faction-004': 125, 'faction-007': 55 }, publisherVolumes: { 'pub-reg-globaltimes': 95, 'pub-weibo': 125, 'pub-wechat': 85 } },
      { date: '2025-11-01', factionVolumes: { 'faction-001': 125, 'faction-003': 345, 'faction-004': 145, 'faction-007': 72 }, publisherVolumes: { 'pub-reg-globaltimes': 115, 'pub-weibo': 155, 'pub-wechat': 125 } },
      { date: '2026-01-15', factionVolumes: { 'faction-001': 145, 'faction-003': 385, 'faction-004': 165, 'faction-007': 85 }, publisherVolumes: { 'pub-reg-globaltimes': 125, 'pub-weibo': 165, 'pub-wechat': 145 } }
    ],
    documentIds: ['doc-013', 'doc-014', 'doc-015', 'doc-032', 'doc-033', 'doc-034'],
    createdAt: '2025-10-15T00:00:00Z'
  },
  {
    id: 'narr-004',
    text: 'Foreign talent policies disadvantage Singaporean workers',
    description: 'Persistent narrative claiming CECA and liberal Employment Pass policies displace Singaporean PMETs. Peaks during employment data releases and high-profile cases of local workers losing jobs to foreigners. Intersects with immigration concerns and questions about government priorities.',
    missionId: 'mission-004',
    sentiment: -0.55,
    themeIds: ['sub-008', 'sub-009'],
    tagIds: ['tag-005', 'tag-mission-004'],
    factionMentions: {
      'faction-001': { volume: 95, sentiment: 0.45 },
      'faction-006': { volume: 485, sentiment: -0.78 },
      'faction-007': { volume: 380, sentiment: -0.42 },
      'faction-008': { volume: 145, sentiment: -0.85 }
    },
    publisherVolumes: {
      'pub-hwz': { volume: 365, sentiment: -0.72 },
      'pub-facebook': { volume: 285, sentiment: -0.55 },
      'pub-x': { volume: 195, sentiment: -0.62 },
      'pub-tiktok': { volume: 145, sentiment: -0.58 },
      'pub-sg-toc': { volume: 85, sentiment: -0.65 },
      'pub-reddit': { volume: 125, sentiment: -0.52 }
    },
    factionSources: {
      'faction-001': { 'pub-sg-cna': 55, 'pub-sg-st': 45, 'pub-facebook': 35 },
      'faction-006': { 'pub-hwz': 265, 'pub-facebook': 145, 'pub-x': 95, 'pub-sg-toc': 75 },
      'faction-007': { 'pub-facebook': 165, 'pub-hwz': 125, 'pub-x': 85, 'pub-reddit': 85 },
      'faction-008': { 'pub-hwz': 85, 'pub-x': 45, 'pub-tiktok': 35 }
    },
    personIds: ['person-003', 'person-010', 'person-015', 'person-020'],
    organizationIds: ['org-010', 'org-012', 'org-013'],
    locationIds: ['loc-001'],
    eventIds: ['event-011', 'event-012'],
    volumeOverTime: [
      { date: '2025-11-12', factionVolumes: { 'faction-001': 35, 'faction-006': 225, 'faction-007': 165, 'faction-008': 65 }, publisherVolumes: { 'pub-hwz': 185, 'pub-facebook': 125 } },
      { date: '2025-11-15', factionVolumes: { 'faction-001': 65, 'faction-006': 385, 'faction-007': 285, 'faction-008': 115 }, publisherVolumes: { 'pub-hwz': 285, 'pub-facebook': 225, 'pub-x': 145 } },
      { date: '2025-11-22', factionVolumes: { 'faction-001': 85, 'faction-006': 455, 'faction-007': 355, 'faction-008': 135 }, publisherVolumes: { 'pub-hwz': 345, 'pub-facebook': 265, 'pub-x': 175 } },
      { date: '2025-12-01', factionVolumes: { 'faction-001': 95, 'faction-006': 485, 'faction-007': 380, 'faction-008': 145 }, publisherVolumes: { 'pub-hwz': 365, 'pub-facebook': 285, 'pub-x': 195 } }
    ],
    documentIds: ['doc-020', 'doc-021', 'doc-022'],
    createdAt: '2025-11-12T00:00:00Z'
  },
  {
    id: 'narr-005',
    text: 'Malaysia water agreements are unfair to Johor',
    description: 'Malaysian nationalist voices argue the 1962 Water Agreement exploits Johor, selling water too cheaply to Singapore. The narrative resurfaces during bilateral meetings and water price discussions, sometimes amplified by politicians and nationalist media.',
    missionId: 'mission-005',
    sentiment: -0.48,
    themeIds: ['sub-010', 'sub-011'],
    tagIds: ['tag-005', 'tag-mission-005', 'tag-origin-003'],
    factionMentions: {
      'faction-001': { volume: 125, sentiment: 0.55 },
      'faction-005': { volume: 345, sentiment: -0.72 },
      'faction-007': { volume: 185, sentiment: 0.35 }
    },
    publisherVolumes: {
      'pub-reg-thestar': { volume: 95, sentiment: -0.45 },
      'pub-reg-nst': { volume: 85, sentiment: -0.52 },
      'pub-reg-bernama': { volume: 65, sentiment: -0.38 },
      'pub-facebook': { volume: 165, sentiment: -0.55 },
      'pub-x': { volume: 125, sentiment: -0.48 },
      'pub-sg-cna': { volume: 75, sentiment: 0.42 }
    },
    factionSources: {
      'faction-001': { 'pub-sg-cna': 85, 'pub-sg-st': 65, 'pub-facebook': 45 },
      'faction-005': { 'pub-reg-thestar': 95, 'pub-reg-nst': 85, 'pub-facebook': 125, 'pub-x': 95 },
      'faction-007': { 'pub-sg-cna': 55, 'pub-facebook': 85, 'pub-x': 65 }
    },
    personIds: ['person-004', 'person-005', 'person-014'],
    organizationIds: ['org-008'],
    locationIds: ['loc-001', 'loc-004', 'loc-005'],
    eventIds: ['event-015', 'event-020'],
    volumeOverTime: [
      { date: '2025-12-08', factionVolumes: { 'faction-001': 65, 'faction-005': 185, 'faction-007': 95 }, publisherVolumes: { 'pub-reg-thestar': 55, 'pub-facebook': 85 } },
      { date: '2025-12-12', factionVolumes: { 'faction-001': 95, 'faction-005': 285, 'faction-007': 145 }, publisherVolumes: { 'pub-reg-thestar': 85, 'pub-facebook': 135, 'pub-x': 95 } },
      { date: '2025-12-20', factionVolumes: { 'faction-001': 115, 'faction-005': 325, 'faction-007': 175 }, publisherVolumes: { 'pub-reg-thestar': 92, 'pub-facebook': 155, 'pub-x': 115 } },
      { date: '2026-01-22', factionVolumes: { 'faction-001': 125, 'faction-005': 345, 'faction-007': 185 }, publisherVolumes: { 'pub-reg-thestar': 95, 'pub-facebook': 165, 'pub-x': 125 } }
    ],
    documentIds: ['doc-027', 'doc-028', 'doc-035', 'doc-036'],
    createdAt: '2025-12-08T00:00:00Z'
  },
  {
    id: 'narr-006',
    text: 'South China Sea tensions threaten Singapore\'s maritime security',
    description: 'Narrative examining implications of increased PLA Navy presence and assertive Chinese actions in the South China Sea for Singapore\'s strategic position and sea lines of communication. Includes concerns about regional stability and freedom of navigation.',
    missionId: 'mission-005',
    sentiment: -0.42,
    themeIds: ['sub-012', 'sub-013'],
    tagIds: ['tag-005', 'tag-mission-005'],
    factionMentions: {
      'faction-001': { volume: 195, sentiment: 0.48 },
      'faction-003': { volume: 245, sentiment: 0.72 },
      'faction-004': { volume: 85, sentiment: 0.68 },
      'faction-007': { volume: 165, sentiment: -0.35 }
    },
    publisherVolumes: {
      'pub-sg-cna': { volume: 125, sentiment: -0.35 },
      'pub-sg-st': { volume: 95, sentiment: -0.38 },
      'pub-int-reuters': { volume: 85, sentiment: -0.28 },
      'pub-reg-scmp': { volume: 75, sentiment: -0.22 },
      'pub-reg-globaltimes': { volume: 65, sentiment: 0.72 },
      'pub-x': { volume: 145, sentiment: -0.45 }
    },
    factionSources: {
      'faction-001': { 'pub-sg-cna': 95, 'pub-sg-st': 75, 'pub-int-reuters': 55 },
      'faction-003': { 'pub-reg-globaltimes': 65, 'pub-weibo': 95, 'pub-wechat': 85 },
      'faction-004': { 'pub-reg-xinhua': 45, 'pub-reg-globaltimes': 35 },
      'faction-007': { 'pub-sg-cna': 85, 'pub-x': 95, 'pub-reg-scmp': 55 }
    },
    personIds: ['person-005', 'person-018'],
    organizationIds: ['org-004', 'org-021', 'org-022', 'org-023'],
    locationIds: ['loc-007', 'loc-008'],
    eventIds: ['event-014'],
    volumeOverTime: [
      { date: '2025-12-05', factionVolumes: { 'faction-001': 125, 'faction-003': 165, 'faction-004': 55, 'faction-007': 105 }, publisherVolumes: { 'pub-sg-cna': 85, 'pub-int-reuters': 55 } },
      { date: '2025-12-12', factionVolumes: { 'faction-001': 165, 'faction-003': 215, 'faction-004': 75, 'faction-007': 145 }, publisherVolumes: { 'pub-sg-cna': 115, 'pub-int-reuters': 75, 'pub-x': 105 } },
      { date: '2025-12-20', factionVolumes: { 'faction-001': 185, 'faction-003': 235, 'faction-004': 82, 'faction-007': 158 }, publisherVolumes: { 'pub-sg-cna': 122, 'pub-int-reuters': 82, 'pub-x': 125 } },
      { date: '2026-01-05', factionVolumes: { 'faction-001': 195, 'faction-003': 245, 'faction-004': 85, 'faction-007': 165 }, publisherVolumes: { 'pub-sg-cna': 125, 'pub-int-reuters': 85, 'pub-x': 145 } }
    ],
    documentIds: ['doc-025', 'doc-026'],
    createdAt: '2025-12-05T00:00:00Z'
  },
  {
    id: 'narr-007',
    text: 'Racial and religious tensions exploited by provocateurs',
    description: 'Monitoring of attempts to stoke racial and religious tensions in Singapore, including inflammatory social media posts, incidents at religious sites, and coordinated campaigns to divide communities along ethnic or religious lines.',
    missionId: 'mission-004',
    sentiment: -0.68,
    themeIds: ['sub-014', 'sub-015'],
    tagIds: ['tag-004', 'tag-mission-004'],
    factionMentions: {
      'faction-001': { volume: 85, sentiment: 0.65 },
      'faction-007': { volume: 285, sentiment: -0.55 },
      'faction-008': { volume: 165, sentiment: -0.88 }
    },
    publisherVolumes: {
      'pub-facebook': { volume: 185, sentiment: -0.62 },
      'pub-telegram': { volume: 95, sentiment: -0.78 },
      'pub-hwz': { volume: 125, sentiment: -0.55 },
      'pub-x': { volume: 145, sentiment: -0.58 },
      'pub-sg-cna': { volume: 65, sentiment: -0.35 }
    },
    factionSources: {
      'faction-001': { 'pub-sg-cna': 55, 'pub-sg-st': 45, 'pub-facebook': 35 },
      'faction-007': { 'pub-facebook': 145, 'pub-hwz': 95, 'pub-x': 85 },
      'faction-008': { 'pub-telegram': 85, 'pub-facebook': 55, 'pub-x': 45 }
    },
    personIds: ['person-006'],
    organizationIds: ['org-007'],
    locationIds: ['loc-001'],
    eventIds: ['event-013'],
    volumeOverTime: [
      { date: '2025-11-28', factionVolumes: { 'faction-001': 45, 'faction-007': 165, 'faction-008': 95 }, publisherVolumes: { 'pub-facebook': 125, 'pub-telegram': 65 } },
      { date: '2025-12-02', factionVolumes: { 'faction-001': 72, 'faction-007': 245, 'faction-008': 145 }, publisherVolumes: { 'pub-facebook': 175, 'pub-telegram': 92, 'pub-hwz': 105 } },
      { date: '2025-12-08', factionVolumes: { 'faction-001': 82, 'faction-007': 275, 'faction-008': 158 }, publisherVolumes: { 'pub-facebook': 182, 'pub-telegram': 94, 'pub-hwz': 118 } },
      { date: '2025-12-15', factionVolumes: { 'faction-001': 85, 'faction-007': 285, 'faction-008': 165 }, publisherVolumes: { 'pub-facebook': 185, 'pub-telegram': 95, 'pub-hwz': 125 } }
    ],
    documentIds: ['doc-023', 'doc-024'],
    createdAt: '2025-11-28T00:00:00Z'
  },
  {
    id: 'narr-008',
    text: 'Coordinated campaign undermines confidence in NS system',
    description: 'Detection of coordinated inauthentic behavior targeting National Service across multiple platforms. Network analysis suggests foreign involvement with messaging designed to erode support for conscription and military service among young Singaporeans.',
    missionId: 'mission-003',
    sentiment: -0.72,
    themeIds: ['sub-016', 'sub-017'],
    tagIds: ['tag-004', 'tag-mission-003', 'tag-origin-004'],
    factionMentions: {
      'faction-001': { volume: 95, sentiment: 0.72 },
      'faction-002': { volume: 185, sentiment: -0.45 },
      'faction-004': { volume: 145, sentiment: 0.68 },
      'faction-007': { volume: 65, sentiment: -0.28 }
    },
    publisherVolumes: {
      'pub-x': { volume: 165, sentiment: -0.55 },
      'pub-tiktok': { volume: 125, sentiment: -0.62 },
      'pub-telegram': { volume: 85, sentiment: -0.72 },
      'pub-hwz': { volume: 95, sentiment: -0.48 }
    },
    factionSources: {
      'faction-001': { 'pub-sg-cna': 55, 'pub-facebook': 45 },
      'faction-002': { 'pub-x': 85, 'pub-tiktok': 75, 'pub-hwz': 55 },
      'faction-004': { 'pub-x': 75, 'pub-telegram': 65, 'pub-tiktok': 45 },
      'faction-007': { 'pub-hwz': 35, 'pub-facebook': 35 }
    },
    personIds: [],
    organizationIds: ['org-006', 'org-016'],
    locationIds: ['loc-001'],
    eventIds: ['event-006'],
    volumeOverTime: [
      { date: '2025-10-08', factionVolumes: { 'faction-001': 55, 'faction-002': 125, 'faction-004': 95, 'faction-007': 35 }, publisherVolumes: { 'pub-x': 115, 'pub-tiktok': 85 } },
      { date: '2025-10-15', factionVolumes: { 'faction-001': 75, 'faction-002': 165, 'faction-004': 125, 'faction-007': 52 }, publisherVolumes: { 'pub-x': 145, 'pub-tiktok': 115, 'pub-telegram': 72 } },
      { date: '2025-10-22', factionVolumes: { 'faction-001': 88, 'faction-002': 178, 'faction-004': 138, 'faction-007': 60 }, publisherVolumes: { 'pub-x': 158, 'pub-tiktok': 122, 'pub-telegram': 80 } },
      { date: '2025-11-01', factionVolumes: { 'faction-001': 95, 'faction-002': 185, 'faction-004': 145, 'faction-007': 65 }, publisherVolumes: { 'pub-x': 165, 'pub-tiktok': 125, 'pub-telegram': 85 } }
    ],
    documentIds: ['doc-011', 'doc-012'],
    createdAt: '2025-10-08T00:00:00Z'
  },
  {
    id: 'narr-009',
    text: 'Total Defence portrayed as outdated propaganda',
    description: 'Critics characterize Total Defence concept as Cold War relic and propaganda exercise rather than genuine preparedness framework. The narrative questions relevance of civil defence exercises and suggests psychological defence is government messaging.',
    missionId: 'mission-006',
    sentiment: -0.45,
    themeIds: ['sub-018', 'sub-019'],
    tagIds: ['tag-005', 'tag-mission-006'],
    factionMentions: {
      'faction-001': { volume: 165, sentiment: 0.78 },
      'faction-002': { volume: 95, sentiment: -0.55 },
      'faction-006': { volume: 185, sentiment: -0.65 },
      'faction-007': { volume: 225, sentiment: 0.25 }
    },
    publisherVolumes: {
      'pub-reddit': { volume: 125, sentiment: -0.52 },
      'pub-hwz': { volume: 145, sentiment: -0.48 },
      'pub-x': { volume: 95, sentiment: -0.45 },
      'pub-sg-cna': { volume: 85, sentiment: 0.55 },
      'pub-sg-st': { volume: 75, sentiment: 0.48 }
    },
    factionSources: {
      'faction-001': { 'pub-sg-cna': 85, 'pub-sg-st': 75, 'pub-facebook': 55 },
      'faction-002': { 'pub-reddit': 55, 'pub-hwz': 45 },
      'faction-006': { 'pub-hwz': 85, 'pub-reddit': 65, 'pub-x': 55 },
      'faction-007': { 'pub-sg-cna': 65, 'pub-facebook': 85, 'pub-hwz': 75 }
    },
    personIds: ['person-001', 'person-009', 'person-017'],
    organizationIds: ['org-001', 'org-006', 'org-009'],
    locationIds: ['loc-001'],
    eventIds: ['event-010'],
    volumeOverTime: [
      { date: '2026-02-10', factionVolumes: { 'faction-001': 85, 'faction-002': 45, 'faction-006': 95, 'faction-007': 125 }, publisherVolumes: { 'pub-sg-cna': 55, 'pub-hwz': 75 } },
      { date: '2026-02-15', factionVolumes: { 'faction-001': 145, 'faction-002': 85, 'faction-006': 165, 'faction-007': 205 }, publisherVolumes: { 'pub-sg-cna': 82, 'pub-hwz': 135, 'pub-reddit': 105 } },
      { date: '2026-02-20', factionVolumes: { 'faction-001': 160, 'faction-002': 92, 'faction-006': 180, 'faction-007': 220 }, publisherVolumes: { 'pub-sg-cna': 84, 'pub-hwz': 142, 'pub-reddit': 120 } },
      { date: '2026-02-25', factionVolumes: { 'faction-001': 165, 'faction-002': 95, 'faction-006': 185, 'faction-007': 225 }, publisherVolumes: { 'pub-sg-cna': 85, 'pub-hwz': 145, 'pub-reddit': 125 } }
    ],
    documentIds: ['doc-018', 'doc-019'],
    createdAt: '2026-02-10T00:00:00Z'
  },
  {
    id: 'narr-010',
    text: 'SAF modernization demonstrates strong defence capabilities',
    description: 'Positive narrative highlighting SAF equipment acquisitions, technology development, and operational capabilities. Counters negative narratives by showcasing defence investments, successful exercises, and professional military development.',
    missionId: 'mission-002',
    sentiment: 0.65,
    themeIds: ['sub-020', 'sub-021'],
    tagIds: ['tag-006', 'tag-mission-002'],
    factionMentions: {
      'faction-001': { volume: 385, sentiment: 0.82 },
      'faction-007': { volume: 285, sentiment: 0.58 }
    },
    publisherVolumes: {
      'pub-sg-cna': { volume: 145, sentiment: 0.72 },
      'pub-sg-st': { volume: 125, sentiment: 0.68 },
      'pub-facebook': { volume: 185, sentiment: 0.55 },
      'pub-youtube': { volume: 95, sentiment: 0.62 },
      'pub-x': { volume: 125, sentiment: 0.48 }
    },
    factionSources: {
      'faction-001': { 'pub-sg-cna': 125, 'pub-sg-st': 105, 'pub-facebook': 145, 'pub-youtube': 75 },
      'faction-007': { 'pub-sg-cna': 95, 'pub-facebook': 125, 'pub-x': 85 }
    },
    personIds: ['person-001', 'person-002', 'person-013', 'person-024'],
    organizationIds: ['org-001', 'org-002', 'org-003', 'org-004', 'org-005'],
    locationIds: ['loc-001', 'loc-002'],
    eventIds: ['event-017'],
    volumeOverTime: [
      { date: '2026-01-08', factionVolumes: { 'faction-001': 225, 'faction-007': 165 }, publisherVolumes: { 'pub-sg-cna': 95, 'pub-sg-st': 85 } },
      { date: '2026-01-12', factionVolumes: { 'faction-001': 325, 'faction-007': 235 }, publisherVolumes: { 'pub-sg-cna': 125, 'pub-sg-st': 115, 'pub-facebook': 145 } },
      { date: '2026-01-18', factionVolumes: { 'faction-001': 365, 'faction-007': 268 }, publisherVolumes: { 'pub-sg-cna': 138, 'pub-sg-st': 122, 'pub-facebook': 172 } },
      { date: '2026-01-25', factionVolumes: { 'faction-001': 385, 'faction-007': 285 }, publisherVolumes: { 'pub-sg-cna': 145, 'pub-sg-st': 125, 'pub-facebook': 185 } }
    ],
    documentIds: ['doc-030', 'doc-031'],
    createdAt: '2026-01-08T00:00:00Z'
  }
];
