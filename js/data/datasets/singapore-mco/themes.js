/**
 * Themes (sub-narratives) for Singapore MCO dataset
 */

export const themes = [
  // Themes for narr-001: NS duration and policies unfair
  {
    id: 'sub-001',
    parentNarrativeId: 'narr-001',
    text: 'Two-year NS duration excessive compared to Taiwan and Korea',
    description: 'Critics argue that Singapore\'s two-year National Service duration is excessive compared to Taiwan (4 months) and South Korea (18 months), placing an unfair burden on Singaporean men and affecting their career competitiveness.',
    sentiment: -0.58,
    personIds: [],
    organizationIds: ['org-015'],
    locationIds: ['loc-001'],
    eventIds: ['event-003'],
    documentIds: ['doc-004', 'doc-005']
  },
  {
    id: 'sub-002',
    parentNarrativeId: 'narr-001',
    text: 'New citizens and PRs face different NS obligations creating inequity',
    description: 'Debate centers on whether first-generation permanent residents and new citizens face equivalent NS obligations to those born in Singapore, creating perceived inequities in national defense contributions.',
    sentiment: -0.62,
    personIds: ['person-003'],
    organizationIds: ['org-015'],
    locationIds: ['loc-001'],
    eventIds: ['event-016'],
    documentIds: ['doc-029']
  },
  {
    id: 'sub-003',
    parentNarrativeId: 'narr-001',
    text: 'NS reservist obligations disrupt careers and family life',
    description: 'Working professionals and business owners express frustration with ongoing reservist obligations that require them to leave jobs for up to 40 days annually, disrupting careers and family responsibilities.',
    sentiment: -0.48,
    personIds: [],
    organizationIds: ['org-014', 'org-015'],
    locationIds: ['loc-001'],
    eventIds: ['event-009'],
    documentIds: ['doc-016', 'doc-017']
  },
  // Themes for narr-002: SAF training standards questioned
  {
    id: 'sub-004',
    parentNarrativeId: 'narr-002',
    text: 'Training incidents reveal systemic safety failures',
    description: 'A series of training deaths and injuries have prompted calls for systemic review of SAF safety protocols, with critics arguing these incidents reveal deeper problems in military training culture and oversight.',
    sentiment: -0.72,
    personIds: ['person-001', 'person-002'],
    organizationIds: ['org-001', 'org-002', 'org-003'],
    locationIds: ['loc-003'],
    eventIds: ['event-001'],
    documentIds: ['doc-001', 'doc-002']
  },
  {
    id: 'sub-005',
    parentNarrativeId: 'narr-002',
    text: 'Military culture prioritizes mission over safety',
    description: 'Critics contend that SAF organizational culture places excessive emphasis on mission completion and toughness, leading commanders to push training beyond safe limits and underreport safety concerns.',
    sentiment: -0.65,
    personIds: [],
    organizationIds: ['org-002'],
    locationIds: ['loc-003'],
    eventIds: ['event-001', 'event-002'],
    documentIds: ['doc-002', 'doc-003']
  },
  // Themes for narr-003: Singapore as US proxy
  {
    id: 'sub-006',
    parentNarrativeId: 'narr-003',
    text: 'Singapore defence agreements with US undermine neutrality',
    description: 'Voices critical of Singapore\'s defense relationship with the US argue that bilateral agreements and hosting of American military assets compromises Singapore\'s neutrality in great power competition.',
    sentiment: -0.55,
    personIds: ['person-005'],
    organizationIds: ['org-008', 'org-024'],
    locationIds: ['loc-001'],
    eventIds: ['event-007'],
    documentIds: ['doc-013', 'doc-014']
  },
  {
    id: 'sub-007',
    parentNarrativeId: 'narr-003',
    text: 'Singapore media coverage biased against China',
    description: 'Chinese state media and online commentators accuse Singapore\'s mainstream media of anti-China bias, arguing coverage of regional issues reflects Western narratives rather than balanced reporting.',
    sentiment: -0.68,
    personIds: ['person-012'],
    organizationIds: ['org-018', 'org-025', 'org-026'],
    locationIds: ['loc-001', 'loc-006'],
    eventIds: ['event-018', 'event-019'],
    documentIds: ['doc-032', 'doc-033', 'doc-034']
  },
  // Themes for narr-004: Foreign talent disadvantages Singaporeans
  {
    id: 'sub-008',
    parentNarrativeId: 'narr-004',
    text: 'CECA allows unrestricted Indian professionals entry',
    description: 'Social media discourse claims the Comprehensive Economic Cooperation Agreement (CECA) with India allows unrestricted entry for Indian professionals, though government officials state this misrepresents treaty terms.',
    sentiment: -0.72,
    personIds: ['person-010', 'person-003'],
    organizationIds: ['org-010'],
    locationIds: ['loc-001'],
    eventIds: ['event-011'],
    documentIds: ['doc-020', 'doc-021']
  },
  {
    id: 'sub-009',
    parentNarrativeId: 'narr-004',
    text: 'Singaporean PMETs losing jobs to foreigners',
    description: 'Professionals, managers, executives and technicians (PMETs) express concerns about job displacement by foreign workers, particularly in the technology and finance sectors.',
    sentiment: -0.65,
    personIds: ['person-015', 'person-020'],
    organizationIds: ['org-010'],
    locationIds: ['loc-001'],
    eventIds: ['event-011', 'event-012'],
    documentIds: ['doc-020', 'doc-022']
  },
  // Themes for narr-005: Malaysia water agreements unfair
  {
    id: 'sub-010',
    parentNarrativeId: 'narr-005',
    text: '1962 Water Agreement exploits Johor resources',
    description: 'Malaysian politicians argue the 1962 Water Agreement allows Singapore to purchase raw water at exploitatively low prices, disadvantaging Johor state while Singapore profits from treated water resale.',
    sentiment: -0.58,
    personIds: ['person-004', 'person-014'],
    organizationIds: [],
    locationIds: ['loc-005'],
    eventIds: ['event-015'],
    documentIds: ['doc-027', 'doc-028']
  },
  {
    id: 'sub-011',
    parentNarrativeId: 'narr-005',
    text: 'Singapore should pay market rate for Malaysian water',
    description: 'Calls from Malaysian voices for Singapore to renegotiate water prices to reflect current market rates, with some arguing the historical agreement is no longer fair given changed economic circumstances.',
    sentiment: -0.52,
    personIds: ['person-004'],
    organizationIds: [],
    locationIds: ['loc-004', 'loc-005'],
    eventIds: ['event-015', 'event-020'],
    documentIds: ['doc-035', 'doc-036']
  },
  // Themes for narr-006: South China Sea tensions
  {
    id: 'sub-012',
    parentNarrativeId: 'narr-006',
    text: 'PLA Navy presence threatens Singapore sea lanes',
    description: 'Security analysts express concern that China\'s growing naval presence and militarization of South China Sea features poses risks to Singapore\'s vital shipping lanes and strategic interests.',
    sentiment: -0.48,
    personIds: ['person-018'],
    organizationIds: ['org-004', 'org-022'],
    locationIds: ['loc-007', 'loc-008'],
    eventIds: ['event-014'],
    documentIds: ['doc-025']
  },
  {
    id: 'sub-013',
    parentNarrativeId: 'narr-006',
    text: 'ASEAN unity weakened by Chinese pressure',
    description: 'Observers note that Chinese economic and diplomatic pressure has undermined ASEAN\'s ability to present a unified position on South China Sea issues, benefiting Beijing\'s bilateral negotiation approach.',
    sentiment: -0.42,
    personIds: [],
    organizationIds: ['org-023'],
    locationIds: ['loc-007'],
    eventIds: [],
    documentIds: ['doc-026']
  },
  // Themes for narr-007: Racial and religious tensions
  {
    id: 'sub-014',
    parentNarrativeId: 'narr-007',
    text: 'Religious provocations at public spaces',
    description: 'Reports of religiously insensitive incidents in public spaces, including transportation and community areas, have sparked debates about racial and religious harmony in Singapore\'s multicultural society.',
    sentiment: -0.72,
    personIds: [],
    organizationIds: ['org-007'],
    locationIds: ['loc-001'],
    eventIds: ['event-013'],
    documentIds: ['doc-023']
  },
  {
    id: 'sub-015',
    parentNarrativeId: 'narr-007',
    text: 'Online accounts stoking ethnic tensions',
    description: 'Authorities have identified social media accounts deliberately amplifying racial and religious tensions, raising concerns about organized attempts to undermine Singapore\'s social cohesion.',
    sentiment: -0.78,
    personIds: [],
    organizationIds: [],
    locationIds: ['loc-001'],
    eventIds: [],
    documentIds: ['doc-024']
  },
  // Themes for narr-008: Coordinated campaign undermines NS
  {
    id: 'sub-016',
    parentNarrativeId: 'narr-008',
    text: 'Network of accounts pushing anti-NS content identified',
    description: 'Government officials have identified coordinated networks of social media accounts systematically publishing content designed to undermine confidence in National Service and the SAF.',
    sentiment: -0.68,
    personIds: [],
    organizationIds: ['org-016'],
    locationIds: ['loc-001'],
    eventIds: ['event-006'],
    documentIds: ['doc-011']
  },
  {
    id: 'sub-017',
    parentNarrativeId: 'narr-008',
    text: 'Foreign influence suspected in coordinated anti-NS messaging',
    description: 'Security agencies suspect foreign state involvement in campaigns to undermine National Service, with suspicious account behaviors and messaging patterns suggesting external coordination.',
    sentiment: -0.75,
    personIds: [],
    organizationIds: ['org-006'],
    locationIds: ['loc-001'],
    eventIds: ['event-006'],
    documentIds: ['doc-012']
  },
  // Themes for narr-009: Total Defence as propaganda
  {
    id: 'sub-018',
    parentNarrativeId: 'narr-009',
    text: 'Civil defence exercises dismissed as theatrical',
    description: 'Critics dismiss civil defence exercises like Total Defence Day as performative rituals that fail to prepare citizens for real threats, questioning their practical value beyond government messaging.',
    sentiment: -0.52,
    personIds: [],
    organizationIds: ['org-007'],
    locationIds: ['loc-001'],
    eventIds: [],
    documentIds: ['doc-018']
  },
  {
    id: 'sub-019',
    parentNarrativeId: 'narr-009',
    text: 'Psychological defence equated with government propaganda',
    description: 'Some voices characterize the "Psychological Defence" pillar of Total Defence as government propaganda designed to manufacture consent rather than genuine civic education.',
    sentiment: -0.58,
    personIds: ['person-017'],
    organizationIds: ['org-006'],
    locationIds: ['loc-001'],
    eventIds: ['event-010'],
    documentIds: ['doc-019']
  },
  // Themes for narr-010: SAF modernization positive
  {
    id: 'sub-020',
    parentNarrativeId: 'narr-010',
    text: 'Next-generation equipment enhances SAF capabilities',
    description: 'Government and defense industry voices highlight how new equipment acquisitions including F-35 fighters, advanced submarines, and networked systems significantly enhance SAF deterrence capabilities.',
    sentiment: 0.72,
    personIds: ['person-001', 'person-024'],
    organizationIds: ['org-001', 'org-003'],
    locationIds: ['loc-001'],
    eventIds: ['event-017'],
    documentIds: ['doc-030']
  },
  {
    id: 'sub-021',
    parentNarrativeId: 'narr-010',
    text: 'Local defence technology development showcases innovation',
    description: 'Positive narratives around Singapore\'s indigenous defence technology development, including local companies supplying the SAF with advanced systems and exporting to international markets.',
    sentiment: 0.68,
    personIds: ['person-002'],
    organizationIds: ['org-002'],
    locationIds: ['loc-001'],
    eventIds: ['event-017'],
    documentIds: ['doc-031']
  }
];
