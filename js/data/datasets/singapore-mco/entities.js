/**
 * Persons and organizations for Singapore MCO dataset
 */

export const persons = [
  {
    id: 'person-001',
    name: 'Dr Ng Eng Hen',
    description: 'Minister for Defence of Singapore since 2011. Key spokesperson for SAF modernization initiatives, NS policy reviews, and defence diplomacy. Frequently addresses concerns about military readiness and Total Defence.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-001',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-002'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-002': -0.35,
      'faction-006': -0.45
    }
  },
  {
    id: 'person-002',
    name: 'LG Melvyn Ong',
    description: 'Chief of Defence Force of the Singapore Armed Forces. Oversees SAF operations, training, and modernization efforts. Responsible for maintaining operational readiness across all three services.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-002',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-002'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-002': -0.25
    }
  },
  {
    id: 'person-003',
    name: 'Leong Mun Wai',
    description: 'Non-Constituency Member of Parliament from Progress Singapore Party. Vocal critic of government policies including defence spending and foreign talent. Raises questions about NS fairness in Parliament.',
    type: 'politician',
    affiliatedOrganizationId: 'org-012',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.55,
      'faction-002': 0.42,
      'faction-006': 0.68
    }
  },
  {
    id: 'person-004',
    name: 'Anwar Ibrahim',
    description: 'Prime Minister of Malaysia since 2022. Key figure in Singapore-Malaysia bilateral relations including water agreements, airspace disputes, and economic cooperation.',
    type: 'politician',
    affiliatedOrganizationId: null,
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-004', 'loc-005'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.25,
      'faction-005': 0.72,
      'faction-007': 0.15
    }
  },
  {
    id: 'person-005',
    name: 'Vivian Balakrishnan',
    description: 'Minister for Foreign Affairs of Singapore. Handles diplomatic relations with Malaysia, China, and other regional partners. Key spokesperson on territorial and sovereignty issues.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-008',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-006'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-003': -0.55,
      'faction-005': -0.35
    }
  },
  {
    id: 'person-006',
    name: 'K Shanmugam',
    description: 'Minister for Home Affairs and Minister for Law. Oversees internal security, POFMA enforcement, and responses to foreign interference. Key figure in countering disinformation.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-007',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.75,
      'faction-003': -0.68,
      'faction-006': -0.58
    }
  },
  {
    id: 'person-007',
    name: 'Pritam Singh',
    description: 'Leader of the Opposition and Secretary-General of the Workers\' Party. Raises questions about defence policy and government transparency in Parliament while maintaining support for NS.',
    type: 'politician',
    affiliatedOrganizationId: 'org-011',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.25,
      'faction-002': 0.35,
      'faction-006': 0.72,
      'faction-007': 0.45
    }
  },
  {
    id: 'person-008',
    name: 'Wang Yi',
    description: 'Minister of Foreign Affairs of the People\'s Republic of China. Key figure in China-Singapore relations and regional diplomacy affecting Singapore\'s position.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-017',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.15,
      'faction-003': 0.85,
      'faction-004': 0.78
    }
  },
  {
    id: 'person-009',
    name: 'Lawrence Wong',
    description: 'Prime Minister of Singapore since 2024. Fourth-generation leader setting strategic direction for defence, foreign policy, and social cohesion. Key spokesperson on national resilience.',
    type: 'politician',
    affiliatedOrganizationId: 'org-009',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-002': -0.28,
      'faction-006': -0.42,
      'faction-007': 0.55
    }
  },
  {
    id: 'person-010',
    name: 'Tan See Leng',
    description: 'Minister for Manpower. Handles foreign workforce policies, CECA implementation, and employment pass regulations. Frequently addresses immigration-related concerns.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-010',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.65,
      'faction-006': -0.52,
      'faction-008': -0.72
    }
  },
  {
    id: 'person-011',
    name: 'Terry Xu',
    description: 'Editor of The Online Citizen. Critical voice on government policies and defence matters. Platform has faced regulatory action under POFMA.',
    type: 'journalist',
    affiliatedOrganizationId: null,
    imageUrl: null,
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.62,
      'faction-002': 0.55,
      'faction-006': 0.75
    }
  },
  {
    id: 'person-012',
    name: 'Hu Xijin',
    description: 'Former editor of Global Times and influential Chinese commentator. Frequently comments on Singapore-China relations and promotes PRC narratives in Southeast Asia.',
    type: 'journalist',
    affiliatedOrganizationId: 'org-018',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003', 'faction-004'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-004', 'tag-origin-002'],
    factionSentiment: {
      'faction-001': -0.45,
      'faction-003': 0.88,
      'faction-004': 0.82
    }
  },
  {
    id: 'person-013',
    name: 'BG Gan Siow Huang',
    description: 'First female general in the SAF. Chief of Staff (Air Staff) in the Republic of Singapore Air Force. Symbol of SAF modernization and diversity efforts.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-005',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-009'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-007': 0.65
    }
  },
  {
    id: 'person-014',
    name: 'Johor Sultan Ibrahim',
    description: 'Sultan of Johor and King of Malaysia from 2024. Influential figure in Johor-Singapore relations including cross-border issues and the Johor Bahru-Singapore RTS Link.',
    type: 'politician',
    affiliatedOrganizationId: null,
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-004', 'loc-005'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.35,
      'faction-005': 0.78,
      'faction-007': 0.42
    }
  },
  {
    id: 'person-015',
    name: 'Gilbert Goh',
    description: 'Activist and organizer of Speakers\' Corner events. Vocal critic of foreign worker policies and perceived job displacement of Singaporeans.',
    type: 'activist',
    affiliatedOrganizationId: null,
    imageUrl: null,
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.58,
      'faction-006': 0.72,
      'faction-008': 0.25
    }
  },
  {
    id: 'person-016',
    name: 'Anonymous HWZ User "SingaporeSon"',
    description: 'Prolific HardwareZone forum user known for anti-NS posts. Suspected coordinated account pushing narratives against military service obligations.',
    type: 'activist',
    affiliatedOrganizationId: null,
    imageUrl: null,
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-004', 'tag-origin-004'],
    factionSentiment: {
      'faction-001': -0.85,
      'faction-002': 0.88
    }
  },
  {
    id: 'person-017',
    name: 'Janil Puthucheary',
    description: 'Senior Minister of State for Communications and Information. Handles digital readiness, online safety, and media literacy initiatives supporting psychological defence.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-006',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.68,
      'faction-006': -0.42
    }
  },
  {
    id: 'person-018',
    name: 'RADM Aaron Beng',
    description: 'Chief of Navy, Republic of Singapore Navy. Oversees maritime security operations in Singapore Strait and regional waters.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-004',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-008', 'loc-007'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.75
    }
  },
  {
    id: 'person-019',
    name: 'Teo Chee Hean',
    description: 'Senior Minister and Coordinating Minister for National Security. Veteran defence and security figure providing strategic oversight on resilience matters.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-009',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-007': 0.52
    }
  },
  {
    id: 'person-020',
    name: 'Lim Tean',
    description: 'Lawyer and founder of Peoples Voice party. Outspoken critic of government policies on social media. Has faced legal action for various statements.',
    type: 'politician',
    affiliatedOrganizationId: 'org-013',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.72,
      'faction-006': 0.78
    }
  },
  {
    id: 'person-021',
    name: 'Zhao Lijian',
    description: 'Former Chinese Foreign Ministry spokesperson known for "wolf warrior" diplomacy. Previously made comments about Singapore\'s foreign policy alignment.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-017',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003', 'faction-004'],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-004', 'tag-origin-002'],
    factionSentiment: {
      'faction-001': -0.55,
      'faction-003': 0.82,
      'faction-004': 0.78
    }
  },
  {
    id: 'person-022',
    name: 'COL Tan Cheng Kwee',
    description: 'Head of SAF Volunteer Corps. Promotes citizen engagement with defence through volunteer programmes and Total Defence initiatives.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-002',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.72
    }
  },
  {
    id: 'person-023',
    name: 'Kirsten Han',
    description: 'Journalist and civil society activist. Writes about social issues, migrant workers, and government policies. Active on social media with critical commentary.',
    type: 'journalist',
    affiliatedOrganizationId: null,
    imageUrl: null,
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.45,
      'faction-006': 0.68,
      'faction-007': 0.25
    }
  },
  {
    id: 'person-024',
    name: 'MG David Neo',
    description: 'Chief of Army, Singapore Army. Oversees ground forces training, readiness, and modernization including next-generation soldier systems.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-003',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-003'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': 0.75
    }
  },
  {
    id: 'person-025',
    name: 'Subramaniam Iswaran',
    description: 'Former Minister for Transport. His 2024 corruption case generated significant public discourse about governance and institutional integrity.',
    type: 'politician',
    affiliatedOrganizationId: null,
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: [],
    documentIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.35,
      'faction-006': 0.45
    }
  }
];

export const organizations = [
  {
    id: 'org-001',
    name: 'Ministry of Defence (MINDEF)',
    description: 'Singapore government ministry responsible for defence policy, SAF oversight, and national security strategy. Leads NS policy and Total Defence initiatives.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-002'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.85,
      'faction-002': -0.42,
      'faction-006': -0.38
    }
  },
  {
    id: 'org-002',
    name: 'Singapore Armed Forces (SAF)',
    description: 'Military forces of the Republic of Singapore comprising the Army, Navy, and Air Force. Responsible for national defence and security operations.',
    type: 'military',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-002', 'loc-003'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.88,
      'faction-002': -0.35,
      'faction-007': 0.62
    }
  },
  {
    id: 'org-003',
    name: 'Singapore Army',
    description: 'Land forces component of the SAF. Operates Basic Military Training Centre on Pulau Tekong and conducts ground defence operations.',
    type: 'military',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-003'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-002': -0.32
    }
  },
  {
    id: 'org-004',
    name: 'Republic of Singapore Navy (RSN)',
    description: 'Naval component of the SAF. Responsible for maritime defence, sea lines of communication protection, and sovereignty enforcement.',
    type: 'military',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-008', 'loc-007'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.82
    }
  },
  {
    id: 'org-005',
    name: 'Republic of Singapore Air Force (RSAF)',
    description: 'Air component of the SAF. Operates fighter aircraft, transport planes, and advanced surveillance systems for airspace defence.',
    type: 'military',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-009'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.85
    }
  },
  {
    id: 'org-006',
    name: 'Ministry of Communications and Information (MCI)',
    description: 'Government ministry responsible for media policy, public communications, and digital resilience. Oversees POFMA implementation.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-006': -0.55
    }
  },
  {
    id: 'org-007',
    name: 'Ministry of Home Affairs (MHA)',
    description: 'Government ministry responsible for internal security, immigration, and civil defence. Manages Singapore Police Force and SCDF.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-006': -0.48
    }
  },
  {
    id: 'org-008',
    name: 'Ministry of Foreign Affairs (MFA)',
    description: 'Government ministry responsible for Singapore\'s foreign policy, diplomatic relations, and international engagement.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.75,
      'faction-003': -0.45,
      'faction-005': -0.35
    }
  },
  {
    id: 'org-009',
    name: 'Prime Minister\'s Office (PMO)',
    description: 'Office of the Prime Minister of Singapore. Coordinates national security, resilience policy, and strategic government communications.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-006': -0.52
    }
  },
  {
    id: 'org-010',
    name: 'Ministry of Manpower (MOM)',
    description: 'Government ministry responsible for labour policies, foreign workforce management, and employment regulations.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.65,
      'faction-006': -0.58,
      'faction-008': -0.65
    }
  },
  {
    id: 'org-011',
    name: 'Workers\' Party (WP)',
    description: 'Main opposition political party in Singapore. Raises alternative perspectives on defence, immigration, and governance in Parliament.',
    type: 'political',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': -0.25,
      'faction-006': 0.72,
      'faction-007': 0.35
    }
  },
  {
    id: 'org-012',
    name: 'Progress Singapore Party (PSP)',
    description: 'Opposition political party founded in 2019. More critical stance on foreign worker policies and government transparency.',
    type: 'political',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': -0.42,
      'faction-006': 0.68
    }
  },
  {
    id: 'org-013',
    name: 'Peoples Voice',
    description: 'Minor opposition political party. Vocal on social media about government policies and foreign talent issues.',
    type: 'political',
    imageUrl: null,
    affiliatedFactionIds: ['faction-006'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': -0.58,
      'faction-006': 0.75
    }
  },
  {
    id: 'org-014',
    name: 'SAFRA',
    description: 'Singapore Armed Forces Reservists\' Association. Supports NSmen welfare, organizes community events, and promotes defence awareness.',
    type: 'nonprofit',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-007': 0.55
    }
  },
  {
    id: 'org-015',
    name: 'NEXUS',
    description: 'National Service Engagement and Enlistment Office. Handles NS policy, deferment applications, and NSman engagement.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-002': -0.45
    }
  },
  {
    id: 'org-016',
    name: 'IMDA',
    description: 'Infocomm Media Development Authority. Regulates media content, online falsehoods, and supports digital infrastructure resilience.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.68,
      'faction-006': -0.52
    }
  },
  {
    id: 'org-017',
    name: 'Chinese Ministry of Foreign Affairs',
    description: 'Foreign ministry of the People\'s Republic of China. Conducts diplomacy and public communications affecting Singapore-China relations.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003', 'faction-004'],
    relatedLocationIds: ['loc-006'],
    documentIds: [],
    factionSentiment: {
      'faction-001': -0.25,
      'faction-003': 0.88,
      'faction-004': 0.85
    }
  },
  {
    id: 'org-018',
    name: 'Global Times',
    description: 'Chinese state-affiliated tabloid newspaper. Known for nationalist commentary and criticism of countries perceived as aligned with the West.',
    type: 'media',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003', 'faction-004'],
    relatedLocationIds: ['loc-006'],
    documentIds: [],
    factionSentiment: {
      'faction-001': -0.58,
      'faction-003': 0.85,
      'faction-004': 0.82
    }
  },
  {
    id: 'org-019',
    name: 'Xinhua News Agency',
    description: 'Official state news agency of the PRC. Primary source for official Chinese government positions and narratives.',
    type: 'media',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003', 'faction-004'],
    relatedLocationIds: ['loc-006'],
    documentIds: [],
    factionSentiment: {
      'faction-003': 0.82,
      'faction-004': 0.78
    }
  },
  {
    id: 'org-020',
    name: 'Malaysian Armed Forces (ATM)',
    description: 'Military forces of Malaysia. Conducts operations in regions adjacent to Singapore including Johor Strait and South China Sea.',
    type: 'military',
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-004', 'loc-005'],
    documentIds: [],
    factionSentiment: {
      'faction-005': 0.75
    }
  },
  {
    id: 'org-021',
    name: 'People\'s Liberation Army (PLA)',
    description: 'Armed forces of the People\'s Republic of China. Conducts operations in South China Sea region affecting regional security dynamics.',
    type: 'military',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003', 'faction-004'],
    relatedLocationIds: ['loc-006', 'loc-007'],
    documentIds: [],
    factionSentiment: {
      'faction-001': -0.35,
      'faction-003': 0.82,
      'faction-004': 0.78
    }
  },
  {
    id: 'org-022',
    name: 'PLA Navy (PLAN)',
    description: 'Naval forces of the PRC. Expanding presence in South China Sea raises regional maritime security concerns.',
    type: 'military',
    imageUrl: null,
    affiliatedFactionIds: ['faction-003', 'faction-004'],
    relatedLocationIds: ['loc-006', 'loc-007'],
    documentIds: [],
    factionSentiment: {
      'faction-001': -0.42,
      'faction-003': 0.78
    }
  },
  {
    id: 'org-023',
    name: 'ASEAN',
    description: 'Association of Southeast Asian Nations. Regional bloc addressing security cooperation, economic integration, and dispute resolution.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001', 'loc-004'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.55,
      'faction-003': -0.25,
      'faction-007': 0.45
    }
  },
  {
    id: 'org-024',
    name: 'Five Power Defence Arrangements (FPDA)',
    description: 'Multilateral security arrangement between Australia, Malaysia, New Zealand, Singapore, and the UK. Conducts regular joint exercises.',
    type: 'military',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-004'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-003': -0.55
    }
  },
  {
    id: 'org-025',
    name: 'CNA',
    description: 'Channel NewsAsia, Singapore-based news network. Primary English-language news source for Singapore and regional coverage.',
    type: 'media',
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.55,
      'faction-006': -0.35
    }
  },
  {
    id: 'org-026',
    name: 'The Straits Times',
    description: 'Singapore\'s flagship English-language newspaper. Established mainstream news source with significant readership.',
    type: 'media',
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001'],
    documentIds: [],
    factionSentiment: {
      'faction-001': 0.52,
      'faction-006': -0.38
    }
  }
];
