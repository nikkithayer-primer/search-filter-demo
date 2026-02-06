/**
 * Narratives for American Politics dataset
 */

export const narratives = [
  {
    id: 'narr-003',
    text: 'New studies link common food preservatives to 32% increased cancer risk',
    description: 'A wave of 2026 research has identified alarming associations between specific food preservatives and cancer. The NutriNet-Santé study found sodium nitrite—common in deli meats and processed foods—linked to a 32% increase in prostate cancer risk, while potassium nitrate is associated with 22% higher breast cancer risk. Harvard researchers reported high ultra-processed food consumption correlates with 45% higher risk of precancerous colorectal adenomas. A separate NIH-AARP study found participants with highest UPF intake had 41% higher lung cancer risk regardless of smoking status. Health experts are calling for stricter regulation of food additives and recommending consumers prioritize minimally processed, plant-based foods.',
    missionId: 'mission-002',
    sentiment: -0.58,
    themeIds: ['sub-006', 'sub-007'],
    tagIds: ['tag-003'],
    factionMentions: {
      'faction-005': { volume: 450, sentiment: -0.68 },
      'faction-006': { volume: 180, sentiment: -0.42 }
    },
    publisherVolumes: {
      'pub-tiktok': { volume: 220, sentiment: -0.52 },
      'pub-instagram': { volume: 125, sentiment: -0.45 },
      'pub-facebook': { volume: 95, sentiment: -0.38 },
      'pub-x': { volume: 85, sentiment: -0.58 },
      'pub-reddit': { volume: 45, sentiment: -0.62 },
      'pub-nat-cnn': { volume: 25, sentiment: -0.48 },
      'pub-nat-nyt': { volume: 18, sentiment: -0.42 }
    },
    factionSources: {
      'faction-005': { 'pub-facebook': 75, 'pub-x': 65, 'pub-tiktok': 140, 'pub-instagram': 85, 'pub-reddit': 35, 'pub-nat-nyt': 18, 'pub-nat-cnn': 20, 'pub-int-guardian': 12 },
      'faction-006': { 'pub-tiktok': 80, 'pub-instagram': 40, 'pub-facebook': 20, 'pub-x': 20, 'pub-reddit': 10, 'pub-nat-cnn': 5, 'pub-int-bbc': 5 }
    },
    personIds: [],
    organizationIds: ['org-003', 'org-004'],
    locationIds: [],
    eventIds: [],
    volumeOverTime: [
      { date: '2026-01-07', factionVolumes: { 'faction-005': 45, 'faction-006': 20 }, publisherVolumes: { 'pub-tiktok': 28, 'pub-instagram': 16, 'pub-facebook': 12, 'pub-x': 8, 'pub-nat-cnn': 3 } },
      { date: '2026-01-08', factionVolumes: { 'faction-005': 65, 'faction-006': 28 }, publisherVolumes: { 'pub-tiktok': 38, 'pub-instagram': 22, 'pub-facebook': 18, 'pub-x': 12, 'pub-nat-cnn': 5 } },
      { date: '2026-01-09', factionVolumes: { 'faction-005': 85, 'faction-006': 35 }, publisherVolumes: { 'pub-tiktok': 52, 'pub-instagram': 28, 'pub-facebook': 22, 'pub-x': 15, 'pub-reddit': 8 } },
      { date: '2026-01-10', factionVolumes: { 'faction-005': 95, 'faction-006': 42 }, publisherVolumes: { 'pub-tiktok': 58, 'pub-instagram': 32, 'pub-facebook': 25, 'pub-x': 18, 'pub-reddit': 10 } },
      { date: '2026-01-11', factionVolumes: { 'faction-005': 78, 'faction-006': 32 }, publisherVolumes: { 'pub-tiktok': 45, 'pub-instagram': 26, 'pub-facebook': 20, 'pub-x': 14, 'pub-reddit': 8 } },
      { date: '2026-01-12', factionVolumes: { 'faction-005': 72, 'faction-006': 28 }, publisherVolumes: { 'pub-tiktok': 42, 'pub-instagram': 24, 'pub-facebook': 18, 'pub-x': 12, 'pub-reddit': 6 } },
      { date: '2026-01-13', factionVolumes: { 'faction-005': 68, 'faction-006': 25 }, publisherVolumes: { 'pub-tiktok': 38, 'pub-instagram': 22, 'pub-facebook': 16, 'pub-x': 12, 'pub-reddit': 6 } },
      { date: '2026-01-14', factionVolumes: { 'faction-005': 82, 'faction-006': 38 }, publisherVolumes: { 'pub-tiktok': 48, 'pub-instagram': 28, 'pub-facebook': 22, 'pub-x': 16, 'pub-reddit': 8 } },
      { date: '2026-01-15', factionVolumes: { 'faction-005': 75, 'faction-006': 32 }, publisherVolumes: { 'pub-tiktok': 44, 'pub-instagram': 25, 'pub-facebook': 19, 'pub-x': 14, 'pub-reddit': 7 } },
      { date: '2026-01-16', factionVolumes: { 'faction-005': 70, 'faction-006': 28 }, publisherVolumes: { 'pub-tiktok': 40, 'pub-instagram': 22, 'pub-facebook': 18, 'pub-x': 12, 'pub-reddit': 6 } }
    ],
    documentIds: ['doc-021', 'doc-022', 'doc-023'],
    createdAt: '2026-01-07T00:00:00Z'
  },
  {
    id: 'narr-005',
    text: 'Trump\'s Greenland acquisition threats are straining US-European relations',
    description: 'A developing geopolitical narrative centered on President Trump\'s renewed threats to acquire Greenland, which has triggered sharp criticism from European leaders at the World Economic Forum in Davos. French President Macron warned of a world where "international law is trampled under foot," while European Commission President von der Leyen called for "a new form of European independence" in response to these "geopolitical shocks." The situation escalated when Trump shared private diplomatic messages on social media, including a message from Macron questioning the Greenland policy.',
    missionId: 'mission-003',
    sentiment: -0.52,
    themeIds: ['sub-009', 'sub-010', 'sub-011'],
    tagIds: ['tag-002'],
    factionMentions: {
      'faction-001': { volume: 180, sentiment: 0.62 },
      'faction-002': { volume: 120, sentiment: -0.74 }
    },
    publisherVolumes: {
      'pub-x': { volume: 145, sentiment: -0.38 },
      'pub-facebook': { volume: 85, sentiment: -0.42 },
      'pub-tiktok': { volume: 40, sentiment: -0.35 },
      'pub-nat-cnn': { volume: 28, sentiment: -0.55 },
      'pub-nat-fox': { volume: 32, sentiment: 0.48 },
      'pub-int-bbc': { volume: 45, sentiment: -0.28 },
      'pub-int-reuters': { volume: 38, sentiment: -0.12 },
      'pub-int-guardian': { volume: 22, sentiment: -0.58 }
    },
    factionSources: {
      'faction-001': { 'pub-x': 80, 'pub-facebook': 45, 'pub-tiktok': 20, 'pub-nat-fox': 30, 'pub-nat-cnn': 5 },
      'faction-002': { 'pub-x': 65, 'pub-facebook': 40, 'pub-tiktok': 20, 'pub-nat-cnn': 23, 'pub-int-bbc': 30, 'pub-int-guardian': 20 }
    },
    personIds: ['person-003', 'person-004', 'person-005', 'person-006'],
    organizationIds: ['org-008', 'org-009'],
    locationIds: ['loc-005', 'loc-006', 'loc-001'],
    eventIds: ['event-006', 'event-007', 'event-008', 'event-009'],
    volumeOverTime: [
      { date: '2026-01-20', factionVolumes: { 'faction-001': 180, 'faction-002': 120 }, publisherVolumes: { 'pub-x': 145, 'pub-facebook': 85, 'pub-tiktok': 40, 'pub-nat-cnn': 28, 'pub-nat-fox': 32, 'pub-int-bbc': 45, 'pub-int-reuters': 38, 'pub-int-guardian': 22 } }
    ],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
    createdAt: '2026-01-20T00:00:00Z'
  },
  {
    id: 'narr-006',
    text: 'DOJ escalates conflict with Minnesota over immigration enforcement',
    description: 'The Trump administration\'s Department of Justice is engaged in an intensifying confrontation with Minnesota state and local officials over immigration enforcement. DOJ plans to subpoena Minnesota Attorney General Keith Ellison, the governor, and Minneapolis mayor regarding alleged obstruction of federal officers during anti-ICE protests. The conflict deepened after DOJ appealed a judge\'s ruling restricting federal agents from arresting peaceful protesters or conducting warrantless car stops. Critics have denounced DOJ\'s handling of the fatal shooting of protester Renee Good by an ICE agent, noting that the FBI\'s civil rights investigation pivoted from the agent to investigating Good and her widow.',
    missionId: 'mission-003',
    sentiment: -0.68,
    themeIds: ['sub-012', 'sub-013', 'sub-014', 'sub-015'],
    tagIds: ['tag-001'],
    factionMentions: {
      'faction-001': { volume: 160, sentiment: 0.72 },
      'faction-002': { volume: 140, sentiment: -0.81 },
      'faction-003': { volume: 185, sentiment: -0.85 },
      'faction-004': { volume: 95, sentiment: 0.65 }
    },
    publisherVolumes: {
      'pub-x': { volume: 220, sentiment: -0.55 },
      'pub-facebook': { volume: 145, sentiment: -0.48 },
      'pub-tiktok': { volume: 95, sentiment: -0.62 },
      'pub-instagram': { volume: 65, sentiment: -0.58 },
      'pub-reddit': { volume: 55, sentiment: -0.72 },
      'pub-nat-cnn': { volume: 42, sentiment: -0.45 },
      'pub-nat-fox': { volume: 38, sentiment: 0.68 },
      'pub-nat-msnbc': { volume: 35, sentiment: -0.72 },
      'pub-int-bbc': { volume: 18, sentiment: -0.22 },
      'pub-int-reuters': { volume: 15, sentiment: -0.08 }
    },
    factionSources: {
      'faction-001': { 'pub-x': 70, 'pub-facebook': 45, 'pub-nat-fox': 35, 'pub-reddit': 10 },
      'faction-002': { 'pub-x': 55, 'pub-facebook': 40, 'pub-tiktok': 25, 'pub-nat-cnn': 15, 'pub-nat-msnbc': 20 },
      'faction-003': { 'pub-x': 80, 'pub-tiktok': 60, 'pub-instagram': 50, 'pub-facebook': 45, 'pub-reddit': 35, 'pub-nat-cnn': 20, 'pub-nat-msnbc': 15 },
      'faction-004': { 'pub-x': 35, 'pub-facebook': 25, 'pub-nat-fox': 25, 'pub-reddit': 10 }
    },
    personIds: ['person-007', 'person-008', 'person-003'],
    organizationIds: ['org-010', 'org-011', 'org-012'],
    locationIds: ['loc-002', 'loc-001'],
    eventIds: ['event-010', 'event-011', 'event-012', 'event-013', 'event-014'],
    volumeOverTime: [
      { date: '2026-01-15', factionVolumes: { 'faction-001': 40, 'faction-002': 35, 'faction-003': 80, 'faction-004': 25 }, publisherVolumes: { 'pub-x': 60, 'pub-facebook': 35, 'pub-tiktok': 40, 'pub-instagram': 25, 'pub-nat-cnn': 10, 'pub-nat-fox': 8 } },
      { date: '2026-01-16', factionVolumes: { 'faction-001': 55, 'faction-002': 50, 'faction-003': 95, 'faction-004': 35 }, publisherVolumes: { 'pub-x': 85, 'pub-facebook': 50, 'pub-tiktok': 55, 'pub-instagram': 30, 'pub-nat-cnn': 15, 'pub-nat-fox': 12, 'pub-nat-msnbc': 10 } },
      { date: '2026-01-17', factionVolumes: { 'faction-001': 70, 'faction-002': 65, 'faction-003': 110, 'faction-004': 45 }, publisherVolumes: { 'pub-x': 105, 'pub-facebook': 65, 'pub-tiktok': 60, 'pub-instagram': 35, 'pub-reddit': 25, 'pub-nat-cnn': 20, 'pub-nat-fox': 18, 'pub-nat-msnbc': 15 } },
      { date: '2026-01-18', factionVolumes: { 'faction-001': 90, 'faction-002': 80, 'faction-003': 130, 'faction-004': 55 }, publisherVolumes: { 'pub-x': 130, 'pub-facebook': 85, 'pub-tiktok': 70, 'pub-instagram': 45, 'pub-reddit': 35, 'pub-nat-cnn': 28, 'pub-nat-fox': 25, 'pub-nat-msnbc': 22 } },
      { date: '2026-01-19', factionVolumes: { 'faction-001': 120, 'faction-002': 100, 'faction-003': 150, 'faction-004': 70 }, publisherVolumes: { 'pub-x': 165, 'pub-facebook': 110, 'pub-tiktok': 80, 'pub-instagram': 55, 'pub-reddit': 45, 'pub-nat-cnn': 35, 'pub-nat-fox': 32, 'pub-nat-msnbc': 28 } },
      { date: '2026-01-20', factionVolumes: { 'faction-001': 160, 'faction-002': 140, 'faction-003': 185, 'faction-004': 95 }, publisherVolumes: { 'pub-x': 220, 'pub-facebook': 145, 'pub-tiktok': 95, 'pub-instagram': 65, 'pub-reddit': 55, 'pub-nat-cnn': 42, 'pub-nat-fox': 38, 'pub-nat-msnbc': 35, 'pub-int-bbc': 18, 'pub-int-reuters': 15 } }
    ],
    documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-025'],
    createdAt: '2026-01-15T00:00:00Z'
  },
  {
    id: 'narr-007',
    text: 'Indiana judge and wife shot at home sparks concerns over judicial safety',
    description: 'Tippecanoe Superior Court Judge Steven Meyer and his wife Kimberly were shot at their Lafayette, Indiana home on Sunday afternoon. Both are in stable condition with arm and hip injuries respectively. The suspect remains at large as local, state, and federal agencies conduct an active investigation. The attack has prompted Indiana Supreme Court Chief Justice Loretta H. Rush to urge all state judges to "remain vigilant" about their security, highlighting broader concerns about violence targeting the judiciary.',
    missionId: 'mission-003',
    sentiment: -0.72,
    themeIds: ['sub-016', 'sub-017'],
    tagIds: ['tag-001'],
    factionMentions: {
      'faction-001': { volume: 45, sentiment: -0.35 },
      'faction-002': { volume: 38, sentiment: -0.68 },
      'faction-004': { volume: 85, sentiment: -0.58 }
    },
    publisherVolumes: {
      'pub-x': { volume: 95, sentiment: -0.62 },
      'pub-facebook': { volume: 72, sentiment: -0.55 },
      'pub-reddit': { volume: 28, sentiment: -0.48 },
      'pub-nat-cnn': { volume: 18, sentiment: -0.42 },
      'pub-nat-fox': { volume: 22, sentiment: -0.38 },
      'pub-nat-nyt': { volume: 12, sentiment: -0.35 },
      'pub-int-bbc': { volume: 8, sentiment: -0.28 },
      'pub-int-reuters': { volume: 10, sentiment: -0.22 }
    },
    factionSources: {
      'faction-001': { 'pub-x': 20, 'pub-facebook': 15, 'pub-nat-fox': 18, 'pub-reddit': 5 },
      'faction-002': { 'pub-x': 18, 'pub-facebook': 12, 'pub-nat-cnn': 10, 'pub-reddit': 8 },
      'faction-004': { 'pub-x': 45, 'pub-facebook': 35, 'pub-nat-fox': 15, 'pub-nat-cnn': 8, 'pub-reddit': 12 }
    },
    personIds: ['person-009', 'person-010', 'person-011'],
    organizationIds: ['org-013', 'org-014', 'org-015'],
    locationIds: ['loc-007'],
    eventIds: ['event-015', 'event-016'],
    volumeOverTime: [
      { date: '2026-01-19', factionVolumes: { 'faction-001': 25, 'faction-002': 20, 'faction-004': 55 }, publisherVolumes: { 'pub-x': 55, 'pub-facebook': 40, 'pub-reddit': 15, 'pub-nat-cnn': 10, 'pub-nat-fox': 12 } },
      { date: '2026-01-20', factionVolumes: { 'faction-001': 45, 'faction-002': 38, 'faction-004': 85 }, publisherVolumes: { 'pub-x': 95, 'pub-facebook': 72, 'pub-reddit': 28, 'pub-nat-cnn': 18, 'pub-nat-fox': 22, 'pub-nat-nyt': 12, 'pub-int-bbc': 8, 'pub-int-reuters': 10 } }
    ],
    documentIds: ['doc-013', 'doc-014'],
    createdAt: '2026-01-19T00:00:00Z'
  },
  {
    id: 'narr-008',
    text: 'Church protest targeting ICE pastor becomes flashpoint in Minnesota immigration battle',
    description: 'Anti-ICE protesters disrupted Sunday service at Cities Church in St. Paul, targeting David Easterwood, an ICE official who serves as a pastor there. The DOJ announced a FACE Act investigation within hours, with AG Pam Bondi declaring "attacks against law enforcement and intimidation of Christians" will be met with "full force of federal law." Assistant AG Harmeet Dhillon threatened charges against journalist Don Lemon who was present covering the protest. Trump called protesters "agitators and insurrectionists" who are "highly trained." Protest organizer Nekima Levy Armstrong defended the action, questioning how anyone "who claims to be Christian could condone" Easterwood\'s dual role. The incident highlights tensions between protecting religious spaces and protesting immigration enforcement, coming amid Operation Metro Surge which brought thousands of federal agents to Minnesota.',
    missionId: 'mission-003',
    sentiment: -0.58,
    themeIds: ['sub-018', 'sub-019', 'sub-020', 'sub-021'],
    tagIds: ['tag-002'],
    factionMentions: {
      'faction-001': { volume: 280, sentiment: 0.68 },
      'faction-002': { volume: 195, sentiment: -0.72 },
      'faction-003': { volume: 245, sentiment: -0.78 },
      'faction-004': { volume: 125, sentiment: 0.62 }
    },
    publisherVolumes: {
      'pub-x': { volume: 385, sentiment: -0.42 },
      'pub-facebook': { volume: 210, sentiment: -0.48 },
      'pub-tiktok': { volume: 165, sentiment: -0.55 },
      'pub-instagram': { volume: 95, sentiment: -0.52 },
      'pub-reddit': { volume: 78, sentiment: -0.62 },
      'pub-nat-cnn': { volume: 55, sentiment: -0.38 },
      'pub-nat-fox': { volume: 72, sentiment: 0.72 },
      'pub-nat-msnbc': { volume: 48, sentiment: -0.68 },
      'pub-nat-nyt': { volume: 28, sentiment: -0.32 },
      'pub-int-bbc': { volume: 22, sentiment: -0.18 },
      'pub-int-reuters': { volume: 18, sentiment: -0.12 }
    },
    factionSources: {
      'faction-001': { 'pub-x': 120, 'pub-facebook': 75, 'pub-nat-fox': 68, 'pub-reddit': 15, 'pub-tiktok': 25 },
      'faction-002': { 'pub-x': 85, 'pub-facebook': 55, 'pub-tiktok': 45, 'pub-nat-cnn': 30, 'pub-nat-msnbc': 35, 'pub-reddit': 25 },
      'faction-003': { 'pub-x': 130, 'pub-tiktok': 85, 'pub-instagram': 70, 'pub-facebook': 60, 'pub-reddit': 35, 'pub-nat-cnn': 20, 'pub-nat-msnbc': 12 },
      'faction-004': { 'pub-x': 50, 'pub-facebook': 35, 'pub-nat-fox': 45, 'pub-reddit': 10 }
    },
    personIds: ['person-003', 'person-012', 'person-013', 'person-014', 'person-015', 'person-016', 'person-019', 'person-020'],
    organizationIds: ['org-010', 'org-011', 'org-016', 'org-017', 'org-018', 'org-019'],
    locationIds: ['loc-008', 'loc-002', 'loc-001'],
    eventIds: ['event-017', 'event-018', 'event-019', 'event-020'],
    volumeOverTime: [
      { date: '2026-01-19', factionVolumes: { 'faction-001': 95, 'faction-002': 70, 'faction-003': 110, 'faction-004': 45 }, publisherVolumes: { 'pub-x': 145, 'pub-facebook': 85, 'pub-tiktok': 70, 'pub-instagram': 40, 'pub-reddit': 30, 'pub-nat-cnn': 22, 'pub-nat-fox': 28 } },
      { date: '2026-01-20', factionVolumes: { 'faction-001': 185, 'faction-002': 125, 'faction-003': 165, 'faction-004': 85 }, publisherVolumes: { 'pub-x': 280, 'pub-facebook': 155, 'pub-tiktok': 120, 'pub-instagram': 72, 'pub-reddit': 58, 'pub-nat-cnn': 42, 'pub-nat-fox': 55, 'pub-nat-msnbc': 35 } },
      { date: '2026-01-21', factionVolumes: { 'faction-001': 280, 'faction-002': 195, 'faction-003': 245, 'faction-004': 125 }, publisherVolumes: { 'pub-x': 385, 'pub-facebook': 210, 'pub-tiktok': 165, 'pub-instagram': 95, 'pub-reddit': 78, 'pub-nat-cnn': 55, 'pub-nat-fox': 72, 'pub-nat-msnbc': 48, 'pub-nat-nyt': 28, 'pub-int-bbc': 22, 'pub-int-reuters': 18 } }
    ],
    documentIds: ['doc-008', 'doc-009', 'doc-010', 'doc-011', 'doc-012', 'doc-024'],
    createdAt: '2026-01-19T00:00:00Z'
  },
  {
    id: 'narr-009',
    text: 'Trump administration wins legal battles to expand immigration enforcement powers',
    description: 'The Trump administration secured multiple legal victories on Monday. A federal judge in Washington DC ruled that DHS can require lawmakers to provide a week\'s notice before inspecting immigration facilities, despite blocking an identical policy last month, because DHS claimed different funding sources. DOJ lawyers called Minnesota\'s lawsuit seeking to end the "federal invasion" an "absurdity" that would "render the supremacy of federal law an afterthought." The DOJ also appealed an injunction curbing aggressive ICE tactics against protesters. Meanwhile, DHS Secretary Kristi Noem backtracked on denials that federal agents used pepper spray, now claiming it was necessary to "establish law and order."',
    missionId: 'mission-003',
    sentiment: -0.48,
    themeIds: ['sub-022', 'sub-023', 'sub-024'],
    tagIds: ['tag-003'],
    factionMentions: {
      'faction-001': { volume: 145, sentiment: 0.72 },
      'faction-002': { volume: 165, sentiment: -0.78 },
      'faction-003': { volume: 125, sentiment: -0.72 },
      'faction-004': { volume: 85, sentiment: 0.58 }
    },
    publisherVolumes: {
      'pub-x': { volume: 185, sentiment: -0.38 },
      'pub-facebook': { volume: 125, sentiment: -0.42 },
      'pub-reddit': { volume: 55, sentiment: -0.58 },
      'pub-nat-cnn': { volume: 38, sentiment: -0.45 },
      'pub-nat-fox': { volume: 45, sentiment: 0.68 },
      'pub-nat-nyt': { volume: 32, sentiment: -0.38 },
      'pub-nat-wapo': { volume: 28, sentiment: -0.42 },
      'pub-int-guardian': { volume: 22, sentiment: -0.52 },
      'pub-int-bbc': { volume: 18, sentiment: -0.28 },
      'pub-int-reuters': { volume: 15, sentiment: -0.15 }
    },
    factionSources: {
      'faction-001': { 'pub-x': 65, 'pub-facebook': 45, 'pub-nat-fox': 42, 'pub-reddit': 12 },
      'faction-002': { 'pub-x': 70, 'pub-facebook': 48, 'pub-nat-cnn': 25, 'pub-nat-nyt': 22, 'pub-nat-wapo': 20, 'pub-reddit': 28 },
      'faction-003': { 'pub-x': 55, 'pub-facebook': 38, 'pub-reddit': 18, 'pub-nat-cnn': 12, 'pub-int-guardian': 15 },
      'faction-004': { 'pub-x': 35, 'pub-facebook': 28, 'pub-nat-fox': 25, 'pub-reddit': 8 }
    },
    personIds: ['person-007', 'person-017', 'person-018', 'person-021', 'person-022', 'person-023', 'person-024', 'person-025'],
    organizationIds: ['org-010', 'org-011', 'org-017', 'org-020', 'org-021'],
    locationIds: ['loc-002', 'loc-008', 'loc-009'],
    eventIds: ['event-021', 'event-022', 'event-023', 'event-024', 'event-025'],
    volumeOverTime: [
      { date: '2026-01-20', factionVolumes: { 'faction-001': 145, 'faction-002': 165, 'faction-003': 125, 'faction-004': 85 }, publisherVolumes: { 'pub-x': 185, 'pub-facebook': 125, 'pub-reddit': 55, 'pub-nat-cnn': 38, 'pub-nat-fox': 45, 'pub-nat-nyt': 32, 'pub-nat-wapo': 28, 'pub-int-guardian': 22, 'pub-int-bbc': 18, 'pub-int-reuters': 15 } }
    ],
    documentIds: ['doc-006', 'doc-015', 'doc-016', 'doc-017'],
    createdAt: '2026-01-20T00:00:00Z'
  },
  {
    id: 'narr-010',
    text: 'RFK Jr\'s meat-heavy dietary guidelines face backlash over environmental and health impacts',
    description: 'The Trump administration\'s new dietary guidelines, championed by Health Secretary Robert F. Kennedy Jr., urge Americans to nearly double protein consumption through meat and dairy, featuring an inverted food pyramid emphasizing steak, poultry, and whole milk. Kennedy declared "we are ending the war on saturated fats." Critics warn the guidelines would devastate the environment—the World Resources Institute estimates a 25% increase in meat consumption would require 100 million additional acres of farmland (an area the size of California) and add hundreds of millions of tons of emissions. The guidelines contradict Kennedy\'s own past statements calling the factory meat industry a bigger threat than Osama bin Laden. HHS dismissed criticism as "radical dogma of the Green New Scam."',
    missionId: 'mission-002',
    sentiment: -0.55,
    themeIds: ['sub-025', 'sub-026', 'sub-027'],
    tagIds: ['tag-002'],
    factionMentions: {
      'faction-001': { volume: 125, sentiment: 0.58 },
      'faction-005': { volume: 195, sentiment: -0.78 },
      'faction-006': { volume: 165, sentiment: -0.85 }
    },
    publisherVolumes: {
      'pub-x': { volume: 175, sentiment: -0.48 },
      'pub-facebook': { volume: 135, sentiment: -0.42 },
      'pub-tiktok': { volume: 145, sentiment: -0.55 },
      'pub-instagram': { volume: 95, sentiment: -0.52 },
      'pub-reddit': { volume: 68, sentiment: -0.62 },
      'pub-nat-cnn': { volume: 28, sentiment: -0.45 },
      'pub-nat-fox': { volume: 35, sentiment: 0.55 },
      'pub-nat-nyt': { volume: 22, sentiment: -0.52 },
      'pub-int-guardian': { volume: 32, sentiment: -0.68 },
      'pub-int-bbc': { volume: 18, sentiment: -0.38 }
    },
    factionSources: {
      'faction-001': { 'pub-x': 55, 'pub-facebook': 42, 'pub-nat-fox': 32, 'pub-tiktok': 25, 'pub-reddit': 12 },
      'faction-005': { 'pub-x': 72, 'pub-facebook': 55, 'pub-tiktok': 65, 'pub-instagram': 48, 'pub-reddit': 35, 'pub-nat-cnn': 18, 'pub-int-guardian': 25 },
      'faction-006': { 'pub-tiktok': 85, 'pub-instagram': 62, 'pub-x': 58, 'pub-facebook': 45, 'pub-reddit': 28, 'pub-int-guardian': 22 }
    },
    personIds: ['person-026', 'person-003'],
    organizationIds: ['org-022', 'org-023'],
    locationIds: ['loc-001'],
    eventIds: ['event-026'],
    volumeOverTime: [
      { date: '2026-01-18', factionVolumes: { 'faction-001': 45, 'faction-005': 75, 'faction-006': 65 }, publisherVolumes: { 'pub-x': 65, 'pub-facebook': 48, 'pub-tiktok': 55, 'pub-instagram': 35, 'pub-reddit': 25 } },
      { date: '2026-01-19', factionVolumes: { 'faction-001': 85, 'faction-005': 135, 'faction-006': 115 }, publisherVolumes: { 'pub-x': 120, 'pub-facebook': 92, 'pub-tiktok': 105, 'pub-instagram': 68, 'pub-reddit': 48, 'pub-nat-cnn': 18, 'pub-nat-fox': 22 } },
      { date: '2026-01-20', factionVolumes: { 'faction-001': 125, 'faction-005': 195, 'faction-006': 165 }, publisherVolumes: { 'pub-x': 175, 'pub-facebook': 135, 'pub-tiktok': 145, 'pub-instagram': 95, 'pub-reddit': 68, 'pub-nat-cnn': 28, 'pub-nat-fox': 35, 'pub-nat-nyt': 22, 'pub-int-guardian': 32, 'pub-int-bbc': 18 } }
    ],
    documentIds: ['doc-018', 'doc-019', 'doc-020'],
    createdAt: '2026-01-18T00:00:00Z'
  },
  {
    id: 'narr-011',
    text: '2024 Election certification challenges and Capitol security concerns',
    description: 'As the January 2025 electoral certification approaches, concerns mount about potential challenges and security threats. The Supreme Court has agreed to expedite election-related cases, while Capitol Police expand security perimeters. FBI leadership transitions add to political tensions, with both parties positioning themselves for the certification process. Security preparations have intensified following the events of January 6, 2021.',
    missionId: 'mission-003',
    sentiment: -0.35,
    themeIds: ['sub-028', 'sub-029', 'sub-030'],
    tagIds: ['tag-003'],
    factionMentions: {
      'faction-001': { volume: 285, sentiment: 0.48 },
      'faction-002': { volume: 245, sentiment: -0.55 },
      'faction-004': { volume: 165, sentiment: 0.35 }
    },
    publisherVolumes: {
      'pub-nat-fox': { volume: 95, sentiment: 0.52 },
      'pub-nat-cnn': { volume: 88, sentiment: -0.48 },
      'pub-nat-nyt': { volume: 72, sentiment: -0.35 },
      'pub-nat-wapo': { volume: 68, sentiment: -0.42 },
      'pub-x': { volume: 145, sentiment: -0.28 },
      'pub-facebook': { volume: 85, sentiment: -0.32 }
    },
    factionSources: {
      'faction-001': { 'pub-nat-fox': 85, 'pub-x': 95, 'pub-facebook': 55 },
      'faction-002': { 'pub-nat-cnn': 75, 'pub-nat-nyt': 62, 'pub-nat-wapo': 58, 'pub-x': 50 },
      'faction-004': { 'pub-nat-nyt': 45, 'pub-nat-wapo': 42, 'pub-nat-cnn': 38, 'pub-x': 40 }
    },
    personIds: ['person-031', 'person-032', 'person-033', 'person-036'],
    organizationIds: ['org-020', 'org-027', 'org-012', 'org-030', 'org-031'],
    locationIds: ['loc-004', 'loc-009'],
    eventIds: ['event-037', 'event-038'],
    volumeOverTime: [
      { date: '2025-11-15', factionVolumes: { 'faction-001': 85, 'faction-002': 72, 'faction-004': 48 }, publisherVolumes: { 'pub-nat-nyt': 25, 'pub-nat-fox': 28, 'pub-x': 45 } },
      { date: '2025-11-20', factionVolumes: { 'faction-001': 125, 'faction-002': 105, 'faction-004': 75 }, publisherVolumes: { 'pub-nat-nyt': 35, 'pub-nat-fox': 42, 'pub-nat-wapo': 28, 'pub-x': 68 } },
      { date: '2025-12-01', factionVolumes: { 'faction-001': 185, 'faction-002': 165, 'faction-004': 115 }, publisherVolumes: { 'pub-nat-nyt': 52, 'pub-nat-fox': 62, 'pub-nat-wapo': 45, 'pub-nat-cnn': 55, 'pub-x': 95 } },
      { date: '2025-12-15', factionVolumes: { 'faction-001': 245, 'faction-002': 215, 'faction-004': 145 }, publisherVolumes: { 'pub-nat-nyt': 65, 'pub-nat-fox': 82, 'pub-nat-wapo': 58, 'pub-nat-cnn': 75, 'pub-x': 125 } },
      { date: '2026-01-03', factionVolumes: { 'faction-001': 285, 'faction-002': 245, 'faction-004': 165 }, publisherVolumes: { 'pub-nat-nyt': 72, 'pub-nat-fox': 95, 'pub-nat-wapo': 68, 'pub-nat-cnn': 88, 'pub-x': 145 } }
    ],
    documentIds: ['doc-047', 'doc-048', 'doc-049', 'doc-050', 'doc-051', 'doc-052', 'doc-055', 'doc-056'],
    createdAt: '2025-11-15T00:00:00Z'
  },
  {
    id: 'narr-012',
    text: 'Federal budget showdown threatens government shutdown',
    description: 'A contentious federal budget battle over border security funding leads to an 18-day government shutdown in October 2025. House Republicans, led by Speaker Mike Johnson, pass a border-focused spending bill that Senate Democrats block. The shutdown furloughs hundreds of thousands of federal workers before a compromise is reached. The episode highlights deepening partisan divisions over fiscal priorities.',
    missionId: 'mission-003',
    sentiment: -0.48,
    themeIds: ['sub-031', 'sub-032'],
    tagIds: ['tag-003'],
    factionMentions: {
      'faction-001': { volume: 225, sentiment: -0.42 },
      'faction-002': { volume: 195, sentiment: -0.55 }
    },
    publisherVolumes: {
      'pub-nat-cnn': { volume: 85, sentiment: -0.52 },
      'pub-nat-fox': { volume: 78, sentiment: -0.38 },
      'pub-nat-nyt': { volume: 72, sentiment: -0.48 },
      'pub-nat-wapo': { volume: 65, sentiment: -0.55 },
      'pub-int-reuters': { volume: 55, sentiment: -0.25 },
      'pub-x': { volume: 125, sentiment: -0.45 }
    },
    factionSources: {
      'faction-001': { 'pub-nat-fox': 68, 'pub-x': 85, 'pub-facebook': 42 },
      'faction-002': { 'pub-nat-cnn': 72, 'pub-nat-nyt': 58, 'pub-nat-wapo': 55, 'pub-x': 40 }
    },
    personIds: ['person-032', 'person-033'],
    organizationIds: ['org-020'],
    locationIds: ['loc-001', 'loc-004'],
    eventIds: ['event-032', 'event-033', 'event-034'],
    volumeOverTime: [
      { date: '2025-09-15', factionVolumes: { 'faction-001': 65, 'faction-002': 58 }, publisherVolumes: { 'pub-int-reuters': 18, 'pub-nat-cnn': 22, 'pub-x': 35 } },
      { date: '2025-09-22', factionVolumes: { 'faction-001': 125, 'faction-002': 115 }, publisherVolumes: { 'pub-nat-cnn': 45, 'pub-nat-nyt': 38, 'pub-x': 65 } },
      { date: '2025-10-01', factionVolumes: { 'faction-001': 195, 'faction-002': 175 }, publisherVolumes: { 'pub-nat-cnn': 72, 'pub-nat-nyt': 62, 'pub-nat-wapo': 55, 'pub-x': 105 } },
      { date: '2025-10-08', factionVolumes: { 'faction-001': 215, 'faction-002': 188 }, publisherVolumes: { 'pub-nat-cnn': 82, 'pub-nat-nyt': 68, 'pub-nat-wapo': 62, 'pub-x': 118 } },
      { date: '2025-10-19', factionVolumes: { 'faction-001': 225, 'faction-002': 195 }, publisherVolumes: { 'pub-nat-cnn': 85, 'pub-nat-nyt': 72, 'pub-nat-wapo': 65, 'pub-int-reuters': 55, 'pub-x': 125 } }
    ],
    documentIds: ['doc-041', 'doc-042', 'doc-043', 'doc-044', 'doc-045', 'doc-046'],
    createdAt: '2025-09-15T00:00:00Z'
  },
  {
    id: 'narr-013',
    text: 'Opioid settlement funds distribution sparks controversy',
    description: 'The distribution of billions in opioid lawsuit settlement funds begins in mid-2025, but disputes quickly emerge over allocation formulas. States hardest hit by the opioid crisis argue they deserve larger shares, while the DEA and HHS work to establish treatment and prevention programs. Legal challenges to the distribution formula reach the Supreme Court, adding uncertainty to communities awaiting relief.',
    missionId: 'mission-002',
    sentiment: -0.32,
    themeIds: ['sub-033', 'sub-034'],
    tagIds: ['tag-001'],
    factionMentions: {
      'faction-005': { volume: 165, sentiment: -0.45 },
      'faction-006': { volume: 95, sentiment: -0.35 }
    },
    publisherVolumes: {
      'pub-nat-nyt': { volume: 58, sentiment: -0.38 },
      'pub-nat-wapo': { volume: 52, sentiment: -0.42 },
      'pub-nat-cnn': { volume: 45, sentiment: -0.35 },
      'pub-x': { volume: 85, sentiment: -0.28 }
    },
    factionSources: {
      'faction-005': { 'pub-nat-nyt': 48, 'pub-nat-wapo': 42, 'pub-nat-cnn': 38, 'pub-x': 55 },
      'faction-006': { 'pub-nat-nyt': 25, 'pub-x': 35, 'pub-tiktok': 35 }
    },
    personIds: ['person-034', 'person-035'],
    organizationIds: ['org-028', 'org-022', 'org-027'],
    locationIds: ['loc-001', 'loc-009'],
    eventIds: ['event-035', 'event-036'],
    volumeOverTime: [
      { date: '2025-07-01', factionVolumes: { 'faction-005': 45, 'faction-006': 28 }, publisherVolumes: { 'pub-nat-nyt': 18, 'pub-nat-wapo': 15, 'pub-x': 25 } },
      { date: '2025-07-20', factionVolumes: { 'faction-005': 75, 'faction-006': 48 }, publisherVolumes: { 'pub-nat-nyt': 28, 'pub-nat-wapo': 25, 'pub-x': 42 } },
      { date: '2025-08-15', factionVolumes: { 'faction-005': 115, 'faction-006': 72 }, publisherVolumes: { 'pub-nat-nyt': 42, 'pub-nat-wapo': 38, 'pub-nat-cnn': 32, 'pub-x': 62 } },
      { date: '2025-12-20', factionVolumes: { 'faction-005': 165, 'faction-006': 95 }, publisherVolumes: { 'pub-nat-nyt': 58, 'pub-nat-wapo': 52, 'pub-nat-cnn': 45, 'pub-x': 85 } }
    ],
    documentIds: ['doc-035', 'doc-036', 'doc-039', 'doc-053'],
    createdAt: '2025-07-01T00:00:00Z'
  },
  {
    id: 'narr-014',
    text: 'Border state governors form coalition on immigration policy',
    description: 'Republican governors from Texas, Florida, and other border states form a coalition to coordinate immigration enforcement independent of federal policy. Texas Governor Greg Abbott deploys thousands of National Guard troops to the border, while Florida Governor Ron DeSantis signs aggressive border security legislation. California Governor Gavin Newsom responds with a federal lawsuit. The DOJ opens investigations into state border actions, escalating federal-state tensions.',
    missionId: 'mission-003',
    sentiment: -0.45,
    themeIds: ['sub-035', 'sub-036', 'sub-037'],
    tagIds: ['tag-002'],
    factionMentions: {
      'faction-001': { volume: 345, sentiment: 0.65 },
      'faction-002': { volume: 285, sentiment: -0.72 },
      'faction-003': { volume: 195, sentiment: -0.68 },
      'faction-004': { volume: 145, sentiment: 0.55 }
    },
    publisherVolumes: {
      'pub-nat-fox': { volume: 125, sentiment: 0.58 },
      'pub-nat-cnn': { volume: 115, sentiment: -0.62 },
      'pub-nat-nyt': { volume: 95, sentiment: -0.48 },
      'pub-x': { volume: 185, sentiment: -0.35 },
      'pub-int-reuters': { volume: 72, sentiment: -0.15 }
    },
    factionSources: {
      'faction-001': { 'pub-nat-fox': 115, 'pub-x': 125, 'pub-facebook': 65 },
      'faction-002': { 'pub-nat-cnn': 95, 'pub-nat-nyt': 78, 'pub-x': 62 },
      'faction-003': { 'pub-x': 85, 'pub-tiktok': 65, 'pub-nat-cnn': 45 },
      'faction-004': { 'pub-nat-fox': 55, 'pub-x': 48, 'pub-int-reuters': 42 }
    },
    personIds: ['person-027', 'person-028', 'person-029', 'person-030'],
    organizationIds: ['org-024', 'org-025', 'org-026', 'org-010', 'org-029', 'org-030'],
    locationIds: ['loc-010', 'loc-011', 'loc-009'],
    eventIds: ['event-027', 'event-028', 'event-029', 'event-030', 'event-031'],
    volumeOverTime: [
      { date: '2025-06-15', factionVolumes: { 'faction-001': 85, 'faction-002': 72, 'faction-003': 48, 'faction-004': 35 }, publisherVolumes: { 'pub-nat-fox': 32, 'pub-nat-cnn': 28, 'pub-x': 45 } },
      { date: '2025-07-10', factionVolumes: { 'faction-001': 145, 'faction-002': 125, 'faction-003': 85, 'faction-004': 62 }, publisherVolumes: { 'pub-nat-fox': 55, 'pub-nat-cnn': 48, 'pub-x': 78 } },
      { date: '2025-08-20', factionVolumes: { 'faction-001': 225, 'faction-002': 195, 'faction-003': 135, 'faction-004': 98 }, publisherVolumes: { 'pub-nat-fox': 85, 'pub-nat-cnn': 78, 'pub-nat-nyt': 62, 'pub-x': 125 } },
      { date: '2025-09-01', factionVolumes: { 'faction-001': 285, 'faction-002': 245, 'faction-003': 165, 'faction-004': 125 }, publisherVolumes: { 'pub-nat-fox': 108, 'pub-nat-cnn': 98, 'pub-nat-nyt': 82, 'pub-x': 158 } },
      { date: '2025-12-28', factionVolumes: { 'faction-001': 345, 'faction-002': 285, 'faction-003': 195, 'faction-004': 145 }, publisherVolumes: { 'pub-nat-fox': 125, 'pub-nat-cnn': 115, 'pub-nat-nyt': 95, 'pub-x': 185, 'pub-int-reuters': 72 } }
    ],
    documentIds: ['doc-032', 'doc-033', 'doc-034', 'doc-037', 'doc-038', 'doc-040', 'doc-054'],
    createdAt: '2025-06-15T00:00:00Z'
  }
];
