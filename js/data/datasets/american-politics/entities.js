/**
 * Persons and organizations for American Politics dataset
 */

export const persons = [
  {
    id: 'person-003',
    name: 'Donald Trump',
    description: 'The 47th President of the United States, Donald Trump returned to office in January 2025 after winning the 2024 election. His second term has been marked by aggressive immigration enforcement policies, territorial ambitions regarding Greenland, and escalating confrontations with state officials who oppose federal policies.',
    type: 'politician',
    affiliatedOrganizationId: 'org-005',
    imageUrl: 'img/entities/main/person-003.jpg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-004', 'loc-006'],
    relatedEventIds: ['event-006', 'event-007', 'event-008'],
    documentIds: ['doc-001', 'doc-002', 'doc-004', 'doc-011'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.67,
      'faction-002': -0.78,
      'faction-003': -0.69
    }
  },
  {
    id: 'person-004',
    name: 'Emmanuel Macron',
    description: 'President of France since 2017, Emmanuel Macron has emerged as a leading voice in the European response to Trump\'s second term foreign policy. At the 2026 World Economic Forum in Davos, he warned of a world "where international law is trampled under foot," directly criticizing Trump\'s territorial ambitions.',
    type: 'politician',
    affiliatedOrganizationId: null,
    imageUrl: 'img/entities/main/person-004.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-005'],
    relatedEventIds: ['event-006', 'event-007'],
    documentIds: ['doc-001', 'doc-002'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.45,
      'faction-002': 0.32
    }
  },
  {
    id: 'person-005',
    name: 'Ursula von der Leyen',
    description: 'President of the European Commission since 2019, Ursula von der Leyen has called for European self-reliance in response to Trump\'s foreign policy. At Davos, she emphasized that Europe must strengthen its own defense capabilities and reduce dependence on the United States.',
    type: 'politician',
    affiliatedOrganizationId: 'org-008',
    imageUrl: 'img/entities/main/person-005.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-005'],
    relatedEventIds: ['event-009'],
    documentIds: ['doc-003'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.38,
      'faction-002': 0.25
    }
  },
  {
    id: 'person-006',
    name: 'Múte Bourup Egede',
    description: 'Prime Minister of Greenland since 2021, Múte Bourup Egede has firmly rejected Trump\'s acquisition overtures, stating that Greenland is "not for sale." He has called for respect of international law and Greenlandic self-determination while navigating the territory\'s relationship with Denmark.',
    type: 'politician',
    affiliatedOrganizationId: null,
    imageUrl: 'img/entities/main/person-006.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-006'],
    relatedEventIds: ['event-008'],
    documentIds: ['doc-004'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.22,
      'faction-002': 0.41
    }
  },
  {
    id: 'person-007',
    name: 'Keith Ellison',
    description: 'Minnesota\'s Attorney General and former U.S. Representative, Keith Ellison has been at the center of the federal-state confrontation over immigration enforcement. He is leading legal challenges against federal actions in Minnesota and faces potential DOJ subpoenas related to alleged obstruction of federal officers.',
    type: 'politician',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/main/person-007.jpg',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-002'],
    relatedEventIds: ['event-010'],
    documentIds: ['doc-005', 'doc-016'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': -0.72,
      'faction-002': 0.65,
      'faction-003': 0.58
    }
  },
  {
    id: 'person-008',
    name: 'Renee Good',
    description: 'A Minneapolis-area activist who was fatally shot by an ICE agent during protests in January 2026. Her death became a rallying point for immigration reform advocates and sparked national debates about federal enforcement tactics. The FBI\'s investigation into her background rather than the shooting drew widespread criticism.',
    type: 'civilian',
    affiliatedOrganizationId: null,
    imageUrl: null,
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-002'],
    relatedEventIds: ['event-013'],
    documentIds: ['doc-007'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': -0.45,
      'faction-002': 0.72,
      'faction-003': 0.85
    }
  },
  {
    id: 'person-009',
    name: 'Steven Meyer',
    description: 'A Tippecanoe Superior Court judge who, along with his wife, was shot at their Lafayette, Indiana home in January 2026. The attack highlighted growing concerns about violence against judges and prompted the Indiana Supreme Court to issue safety guidance to judges statewide.',
    type: 'judge',
    affiliatedOrganizationId: 'org-013',
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-007'],
    relatedEventIds: ['event-015'],
    documentIds: ['doc-013'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.15,
      'faction-002': 0.12,
      'faction-004': 0.45
    }
  },
  {
    id: 'person-010',
    name: 'Kimberly Meyer',
    description: 'Wife of Judge Steven Meyer, wounded in the shooting attack at their Lafayette, Indiana home. Her injuries brought additional attention to the dangers faced by judges and their families.',
    type: 'civilian',
    affiliatedOrganizationId: null,
    imageUrl: null,
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-007'],
    relatedEventIds: ['event-015'],
    documentIds: ['doc-013'],
    tagIds: ['tag-005'],
    factionSentiment: {}
  },
  {
    id: 'person-011',
    name: 'Loretta H. Rush',
    description: 'Chief Justice of the Indiana Supreme Court who issued guidance urging judges to remain vigilant following the shooting of Judge Meyer. She has emphasized the need for enhanced judicial security while maintaining public access to the courts.',
    type: 'judge',
    affiliatedOrganizationId: 'org-014',
    imageUrl: 'img/entities/main/person-011.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-007'],
    relatedEventIds: ['event-016'],
    documentIds: ['doc-014'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-004': 0.52
    }
  },
  {
    id: 'person-012',
    name: 'Harmeet Dhillon',
    description: 'Assistant Attorney General for Civil Rights at the Department of Justice, Harmeet Dhillon has led aggressive enforcement actions including FACE Act investigations against protesters. She announced potential charges against journalist Don Lemon for his coverage of the Cities Church protest.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-010',
    imageUrl: 'img/entities/main/person-012.jpg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-008'],
    relatedEventIds: ['event-017', 'event-019'],
    documentIds: ['doc-009', 'doc-010'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-002': -0.68,
      'faction-003': -0.75
    }
  },
  {
    id: 'person-013',
    name: 'Pam Bondi',
    description: 'U.S. Attorney General in the Trump administration, Pam Bondi has overseen the DOJ\'s aggressive stance against states and individuals who oppose federal immigration enforcement. She has defended the department\'s investigations into protesters and supported expanding federal authority in immigration matters.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-010',
    imageUrl: 'img/entities/main/person-013.jpg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-017'],
    documentIds: ['doc-009'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.68,
      'faction-002': -0.72,
      'faction-003': -0.78
    }
  },
  {
    id: 'person-014',
    name: 'David Easterwood',
    description: 'ICE Enforcement and Removal Operations Assistant Director based in St. Paul who also serves as a pastor at Cities Church. The protest disruption at his church service became a focal point for DOJ enforcement actions and debates over the intersection of federal enforcement and religious freedom.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-011',
    imageUrl: 'img/entities/main/person-014.jpg',
    affiliatedFactionIds: ['faction-004'],
    relatedLocationIds: ['loc-008'],
    relatedEventIds: ['event-017'],
    documentIds: ['doc-008', 'doc-012', 'doc-024'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.55,
      'faction-002': -0.82,
      'faction-003': -0.88,
      'faction-004': 0.48
    }
  },
  {
    id: 'person-015',
    name: 'Nekima Levy Armstrong',
    description: 'President of the Minneapolis NAACP and civil rights attorney, Nekima Levy Armstrong has been a prominent voice in protests against ICE enforcement in Minnesota. She participated in the Cities Church protest and has advocated for immigrant communities facing federal enforcement actions.',
    type: 'activist',
    affiliatedOrganizationId: 'org-018',
    imageUrl: 'img/entities/main/person-015.jpg',
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-002', 'loc-008'],
    relatedEventIds: ['event-017'],
    documentIds: ['doc-008', 'doc-012'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.72,
      'faction-002': 0.58,
      'faction-003': 0.82
    }
  },
  {
    id: 'person-016',
    name: 'Don Lemon',
    description: 'Journalist and media personality who covered the Cities Church protest and subsequently faced threats of federal charges from DOJ. His case has become emblematic of concerns about press freedom under the current administration\'s approach to protest coverage.',
    type: 'journalist',
    affiliatedOrganizationId: null,
    imageUrl: 'img/entities/main/person-016.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-008'],
    relatedEventIds: ['event-017', 'event-019'],
    documentIds: ['doc-010'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': -0.78,
      'faction-002': 0.52,
      'faction-003': 0.48
    }
  },
  {
    id: 'person-017',
    name: 'Katherine Menendez',
    description: 'U.S. District Judge who issued a temporary restraining order limiting federal immigration enforcement activities in Minnesota. Her ruling, which the DOJ characterized as an "absurdity," sparked a legal battle now on appeal to the Eighth Circuit Court of Appeals.',
    type: 'judge',
    affiliatedOrganizationId: null,
    imageUrl: 'img/entities/main/person-017.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-002'],
    relatedEventIds: ['event-011'],
    documentIds: ['doc-006', 'doc-016'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.45,
      'faction-002': 0.38,
      'faction-003': 0.42
    }
  },
  {
    id: 'person-018',
    name: 'Kristi Noem',
    description: 'Secretary of Homeland Security who initially denied that DHS agents used pepper spray against Minneapolis protesters before walking back those statements. She has strongly defended aggressive federal enforcement tactics and dismisses criticism as politically motivated obstruction.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-017',
    imageUrl: 'img/entities/main/person-018.jpg',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-002'],
    relatedEventIds: [],
    documentIds: ['doc-017'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.75,
      'faction-002': -0.72,
      'faction-003': -0.78
    }
  },
  {
    id: 'person-019',
    name: 'Tim Walz',
    description: 'Governor of Minnesota and 2024 Democratic Vice Presidential nominee, Tim Walz has been at the forefront of state resistance to federal immigration enforcement. He has supported legal challenges and publicly condemned what he describes as federal overreach in his state.',
    type: 'politician',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/main/person-019.jpg',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-002', 'loc-008'],
    relatedEventIds: [],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': -0.68,
      'faction-002': 0.62,
      'faction-003': 0.55
    }
  },
  {
    id: 'person-020',
    name: 'Jacob Frey',
    description: 'Mayor of Minneapolis who has navigated the city through intense confrontations between federal agents and local protesters. He has criticized federal enforcement tactics while attempting to maintain public safety during large-scale demonstrations.',
    type: 'politician',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/main/person-020.jpg',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-002'],
    relatedEventIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.58,
      'faction-002': 0.48,
      'faction-003': 0.52
    }
  },
  {
    id: 'person-021',
    name: 'Ilhan Omar',
    description: 'U.S. Representative for Minnesota\'s 5th congressional district, Ilhan Omar has been one of the most vocal critics of federal immigration enforcement in her state. She was among the lawmakers blocked from inspecting an ICE detention facility and has called for congressional oversight of enforcement activities.',
    type: 'politician',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/main/person-021.jpg',
    affiliatedFactionIds: ['faction-002', 'faction-003'],
    relatedLocationIds: ['loc-002', 'loc-009'],
    relatedEventIds: ['event-021'],
    documentIds: ['doc-015'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': -0.85,
      'faction-002': 0.72,
      'faction-003': 0.78
    }
  },
  {
    id: 'person-022',
    name: 'Angie Craig',
    description: 'U.S. Representative for Minnesota\'s 2nd congressional district, Angie Craig was among the lawmakers denied access to an ICE detention facility. She has called for transparency in immigration enforcement and supported legal challenges to federal actions in Minnesota.',
    type: 'politician',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/main/person-022.jpg',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-002', 'loc-009'],
    relatedEventIds: ['event-021'],
    documentIds: ['doc-015'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.52,
      'faction-002': 0.58
    }
  },
  {
    id: 'person-023',
    name: 'Kelly Morrison',
    description: 'U.S. Senator from Minnesota who joined colleagues in attempting to inspect an ICE detention facility and was denied access. She has advocated for congressional oversight of immigration enforcement activities and supported state efforts to challenge federal actions.',
    type: 'politician',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/main/person-023.jpg',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-002', 'loc-009'],
    relatedEventIds: ['event-021'],
    documentIds: ['doc-015'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.48,
      'faction-002': 0.55
    }
  },
  {
    id: 'person-024',
    name: 'Joe Neguse',
    description: 'U.S. Representative from Colorado who has been involved in congressional efforts to maintain oversight of immigration enforcement. He has supported legislation to ensure lawmakers can inspect detention facilities and has criticized DHS for blocking congressional access.',
    type: 'politician',
    affiliatedOrganizationId: 'org-001',
    imageUrl: 'img/entities/main/person-024.jpg',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: ['loc-009'],
    relatedEventIds: ['event-022'],
    documentIds: ['doc-015'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.55,
      'faction-002': 0.62
    }
  },
  {
    id: 'person-025',
    name: 'Jia Cobb',
    description: 'U.S. District Judge who ruled that DHS can require one week advance notice for congressional facility inspections, a decision that effectively limited lawmakers\' ability to conduct surprise oversight visits to detention centers.',
    type: 'judge',
    affiliatedOrganizationId: null,
    imageUrl: 'img/entities/main/person-025.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-009'],
    relatedEventIds: ['event-022'],
    documentIds: ['doc-015'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.35,
      'faction-002': 0.28
    }
  },
  {
    id: 'person-026',
    name: 'Robert F. Kennedy Jr.',
    description: 'Secretary of Health and Human Services who has implemented controversial policy changes including new dietary guidelines emphasizing meat consumption. Known for his skepticism of mainstream health institutions, his tenure has been marked by policy shifts that have drawn both support and criticism.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-022',
    imageUrl: 'img/entities/main/person-026.jpg',
    affiliatedFactionIds: ['faction-001', 'faction-005'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-026'],
    documentIds: ['doc-018', 'doc-020'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.58,
      'faction-002': -0.65,
      'faction-005': 0.42,
      'faction-006': -0.72
    }
  },
  {
    id: 'person-027',
    name: 'Greg Abbott',
    description: 'Governor of Texas who has deployed additional National Guard troops to the southern border and hosted summits with other Republican governors on border security. He has been a leading figure in state-level immigration enforcement efforts and supports aggressive federal policies.',
    type: 'politician',
    affiliatedOrganizationId: 'org-024',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-009', 'faction-013'],
    relatedLocationIds: ['loc-010', 'loc-011'],
    relatedEventIds: ['event-027', 'event-031'],
    documentIds: ['doc-032', 'doc-040'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.78,
      'faction-002': -0.72,
      'faction-003': -0.68
    }
  },
  {
    id: 'person-028',
    name: 'Ron DeSantis',
    description: 'Governor of Florida who signed state border security legislation and participated in border governors\' summits. A former presidential candidate, he has positioned Florida as a leader in state-level immigration enforcement and cooperation with federal authorities.',
    type: 'politician',
    affiliatedOrganizationId: 'org-025',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-009', 'faction-013'],
    relatedLocationIds: ['loc-010'],
    relatedEventIds: ['event-028', 'event-031'],
    documentIds: ['doc-034', 'doc-040'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.75,
      'faction-002': -0.78,
      'faction-003': -0.72
    }
  },
  {
    id: 'person-029',
    name: 'Gavin Newsom',
    description: 'Governor of California who has led state efforts to challenge federal immigration policy through litigation. He has positioned California as a "sanctuary state" and sued the federal government over border enforcement actions he characterizes as unconstitutional overreach.',
    type: 'politician',
    affiliatedOrganizationId: 'org-026',
    imageUrl: null,
    affiliatedFactionIds: ['faction-002', 'faction-013'],
    relatedLocationIds: ['loc-009'],
    relatedEventIds: ['event-029'],
    documentIds: ['doc-037'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.72,
      'faction-002': 0.68,
      'faction-003': 0.55
    }
  },
  {
    id: 'person-030',
    name: 'Merrick Garland',
    description: 'Former U.S. Attorney General under President Biden who announced DOJ investigations into state border actions. His tenure saw the beginning of federal-state tensions over immigration enforcement that have intensified under the current administration.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-010',
    imageUrl: null,
    affiliatedFactionIds: ['faction-002', 'faction-013'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-030'],
    documentIds: ['doc-038'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.68,
      'faction-002': 0.62,
      'faction-004': 0.45
    }
  },
  {
    id: 'person-031',
    name: 'John Roberts',
    description: 'Chief Justice of the United States Supreme Court since 2005. Under his leadership, the Court has agreed to hear several election-related cases that could have significant implications for federal and state election procedures.',
    type: 'judge',
    affiliatedOrganizationId: 'org-027',
    imageUrl: null,
    affiliatedFactionIds: ['faction-004', 'faction-010', 'faction-015'],
    relatedLocationIds: ['loc-009'],
    relatedEventIds: ['event-037'],
    documentIds: ['doc-047'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.25,
      'faction-002': 0.28,
      'faction-004': 0.72
    }
  },
  {
    id: 'person-032',
    name: 'Mike Johnson',
    description: 'Speaker of the House of Representatives who led passage of a border security funding bill that was blocked in the Senate. The subsequent government shutdown highlighted deep divisions over immigration policy between the chambers of Congress.',
    type: 'politician',
    affiliatedOrganizationId: 'org-020',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-009'],
    relatedLocationIds: ['loc-004', 'loc-009'],
    relatedEventIds: ['event-032', 'event-034'],
    documentIds: ['doc-041', 'doc-044', 'doc-056'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-002': -0.65
    }
  },
  {
    id: 'person-033',
    name: 'Chuck Schumer',
    description: 'Senate Minority Leader who led opposition to the House border security funding bill. He has argued that the legislation prioritized enforcement over humane treatment and opposed what he characterized as politically motivated immigration policies.',
    type: 'politician',
    affiliatedOrganizationId: 'org-020',
    imageUrl: null,
    affiliatedFactionIds: ['faction-002', 'faction-010'],
    relatedLocationIds: ['loc-004', 'loc-009'],
    relatedEventIds: ['event-033', 'event-034'],
    documentIds: ['doc-042', 'doc-044', 'doc-056'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.68,
      'faction-002': 0.72
    }
  },
  {
    id: 'person-034',
    name: 'Anne Milgram',
    description: 'Administrator of the Drug Enforcement Administration who has overseen the distribution of opioid settlement funds. Her agency has played a key role in implementing addiction treatment and prevention programs funded by pharmaceutical industry settlements.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-028',
    imageUrl: null,
    affiliatedFactionIds: ['faction-004', 'faction-016'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-035'],
    documentIds: ['doc-035', 'doc-036'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-004': 0.58,
      'faction-005': 0.45
    }
  },
  {
    id: 'person-035',
    name: 'Xavier Becerra',
    description: 'Former HHS Secretary under President Biden who helped coordinate the initial distribution of opioid settlement funds. His work established the framework for state allocation of settlement proceeds that has since been challenged in court.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-022',
    imageUrl: null,
    affiliatedFactionIds: ['faction-002', 'faction-016'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-035'],
    documentIds: ['doc-035', 'doc-036', 'doc-053'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.55,
      'faction-002': 0.62,
      'faction-005': 0.48
    }
  },
  {
    id: 'person-036',
    name: 'Kash Patel',
    description: 'FBI Director appointed by President Trump, Kash Patel has overseen a significant reorganization of the bureau. His leadership transition announcement signaled a shift in FBI priorities and approach to federal law enforcement under the current administration.',
    type: 'government_official',
    affiliatedOrganizationId: 'org-012',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-007', 'faction-010'],
    relatedLocationIds: ['loc-001'],
    relatedEventIds: ['event-038'],
    documentIds: ['doc-050'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.82,
      'faction-002': -0.85
    }
  }
];

export const organizations = [
  {
    id: 'org-001',
    name: 'Democratic Party',
    description: 'One of two major political parties in the United States, currently in opposition at the federal level. Democratic officials in states like Minnesota and California have led legal challenges to the Trump administration\'s immigration policies and enforcement tactics.',
    type: 'political',
    imageUrl: 'img/entities/main/org-001.png',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001', 'loc-004'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.73,
      'faction-002': 0.41
    }
  },
  {
    id: 'org-002',
    name: 'Minnesota National Guard',
    description: 'The National Guard force of Minnesota, which has been involved in maintaining order during protests in Minneapolis. Their role in federal-state tensions over immigration enforcement has been subject to debate regarding command authority and mission scope.',
    type: 'military',
    imageUrl: 'img/entities/main/org-002.png',
    affiliatedFactionIds: ['faction-004'],
    relatedLocationIds: ['loc-002'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-003': -0.81,
      'faction-004': 0.64
    }
  },
  {
    id: 'org-003',
    name: 'FDA',
    description: 'The Food and Drug Administration, responsible for protecting public health through regulation of food, drugs, and medical devices. Under the current administration, the FDA has seen policy shifts related to dietary guidelines and has faced scrutiny from health activists.',
    type: 'government',
    imageUrl: 'img/entities/main/org-003.png',
    affiliatedFactionIds: [],
    relatedLocationIds: [],
    documentIds: ['doc-021'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-005': -0.67,
      'faction-006': -0.52
    }
  },
  {
    id: 'org-004',
    name: 'TikTok',
    description: 'A social media platform owned by Chinese company ByteDance, TikTok has become a significant platform for political discourse and organizing. Viral content on the platform has amplified both support for and opposition to current policies.',
    type: 'media',
    imageUrl: 'img/entities/main/org-004.svg',
    affiliatedFactionIds: [],
    relatedLocationIds: [],
    documentIds: ['doc-023'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-006': 0.58
    }
  },
  {
    id: 'org-005',
    name: 'Republican Party',
    description: 'The governing party at the federal level under President Trump, supporting aggressive immigration enforcement, territorial ambitions regarding Greenland, and challenges to what they characterize as obstructionist state governments.',
    type: 'political',
    imageUrl: 'img/entities/main/org-005.png',
    affiliatedFactionIds: ['faction-001'],
    relatedLocationIds: ['loc-001', 'loc-004'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.74,
      'faction-002': -0.79
    }
  },
  {
    id: 'org-006',
    name: 'DSA',
    description: 'The Democratic Socialists of America, a progressive political organization that has mobilized members to protest immigration enforcement and support immigrant communities. DSA chapters have been active in organizing demonstrations against ICE activities nationwide.',
    type: 'political',
    imageUrl: 'img/entities/main/org-006.jpg',
    affiliatedFactionIds: ['faction-002'],
    relatedLocationIds: [],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-002': 0.68,
      'faction-001': -0.61
    }
  },
  {
    id: 'org-008',
    name: 'European Commission',
    description: 'The executive branch of the European Union, led by President Ursula von der Leyen. The Commission has responded to Trump\'s foreign policy with calls for European self-reliance and has defended the rules-based international order against territorial revisionism.',
    type: 'government',
    imageUrl: 'img/entities/main/org-008.png',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-005'],
    documentIds: ['doc-003'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.35,
      'faction-002': 0.28
    }
  },
  {
    id: 'org-009',
    name: 'World Economic Forum',
    description: 'An international organization hosting annual meetings in Davos, Switzerland. The 2026 forum became a platform for European leaders to publicly criticize Trump\'s foreign policy and territorial ambitions, generating significant international media coverage.',
    type: 'nonprofit',
    imageUrl: 'img/entities/main/org-009.svg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-005'],
    documentIds: ['doc-001'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.42,
      'faction-002': 0.15
    }
  },
  {
    id: 'org-010',
    name: 'Department of Justice',
    description: 'The federal department responsible for law enforcement and administration of justice. Under the current administration, DOJ has aggressively pursued legal actions against protesters, journalists, and state officials who oppose federal immigration enforcement.',
    type: 'government',
    imageUrl: 'img/entities/main/org-010.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001', 'loc-002'],
    documentIds: ['doc-005', 'doc-006', 'doc-009', 'doc-010', 'doc-016'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.58,
      'faction-002': -0.65,
      'faction-003': -0.72
    }
  },
  {
    id: 'org-011',
    name: 'Immigration and Customs Enforcement',
    description: 'The federal agency responsible for immigration enforcement, ICE has been at the center of controversies including the fatal shooting of protester Renee Good in Minneapolis. The agency\'s expanded enforcement activities have generated intense opposition in some communities.',
    type: 'government',
    imageUrl: 'img/entities/main/org-011.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-002'],
    documentIds: ['doc-006', 'doc-007', 'doc-008', 'doc-024', 'doc-025'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.68,
      'faction-002': -0.78,
      'faction-003': -0.82
    }
  },
  {
    id: 'org-012',
    name: 'FBI',
    description: 'The Federal Bureau of Investigation, now led by Director Kash Patel. The FBI\'s investigation into the death of Renee Good drew criticism for focusing on the victim rather than the ICE agent involved, reflecting broader concerns about the agency\'s priorities under new leadership.',
    type: 'government',
    imageUrl: 'img/entities/main/org-012.png',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001', 'loc-002'],
    documentIds: ['doc-007'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.25,
      'faction-002': -0.35,
      'faction-003': -0.42
    }
  },
  {
    id: 'org-013',
    name: 'Tippecanoe Superior Court',
    description: 'A trial court in Lafayette, Indiana where Judge Steven Meyer presides. The shooting attack on Judge Meyer at his home highlighted concerns about judicial safety and prompted statewide security reviews.',
    type: 'judicial',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-007'],
    documentIds: ['doc-013'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-004': 0.48
    }
  },
  {
    id: 'org-014',
    name: 'Indiana Supreme Court',
    description: 'The highest court in Indiana, led by Chief Justice Loretta H. Rush. Following the attack on Judge Meyer, the court issued guidance urging judges statewide to enhance their personal security while maintaining access to justice.',
    type: 'judicial',
    imageUrl: 'img/entities/main/org-014.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-007'],
    documentIds: ['doc-014'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-004': 0.55
    }
  },
  {
    id: 'org-015',
    name: 'Lafayette Police Department',
    description: 'The local law enforcement agency investigating the shooting attack on Judge Steven Meyer and his wife. The department has coordinated with state and federal agencies on the investigation.',
    type: 'law_enforcement',
    affiliatedFactionIds: ['faction-004'],
    relatedLocationIds: ['loc-007'],
    documentIds: ['doc-013'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-004': 0.62
    }
  },
  {
    id: 'org-016',
    name: 'Cities Church',
    description: 'A St. Paul church where ICE official David Easterwood serves as pastor. The disruption of a service by protesters became the basis for DOJ FACE Act investigations and raised questions about the intersection of religious freedom and political protest.',
    type: 'religious',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-008'],
    documentIds: ['doc-008', 'doc-012', 'doc-024'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.45,
      'faction-002': -0.25,
      'faction-003': -0.35
    }
  },
  {
    id: 'org-017',
    name: 'Department of Homeland Security',
    description: 'The cabinet department overseeing immigration enforcement, border security, and related functions. Under Secretary Kristi Noem, DHS has expanded enforcement activities and blocked congressional oversight efforts, including lawmakers\' attempts to inspect detention facilities.',
    type: 'government',
    imageUrl: 'img/entities/main/org-017.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001', 'loc-002', 'loc-008'],
    documentIds: ['doc-015', 'doc-017'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-002': -0.68,
      'faction-003': -0.75
    }
  },
  {
    id: 'org-018',
    name: 'Minneapolis NAACP',
    description: 'The local chapter of the National Association for the Advancement of Colored People, led by Nekima Levy Armstrong. The organization has connected racial justice concerns to immigration enforcement issues and supported protests against federal actions in Minneapolis.',
    type: 'nonprofit',
    affiliatedFactionIds: ['faction-003'],
    relatedLocationIds: ['loc-002'],
    documentIds: ['doc-012'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.55,
      'faction-002': 0.62,
      'faction-003': 0.78
    }
  },
  {
    id: 'org-019',
    name: 'Minnesota-Wisconsin Baptist Convention',
    description: 'A regional Baptist organization that has commented on the Cities Church protest controversy. The convention has emphasized religious freedom concerns while navigating the politically charged debate over immigration enforcement.',
    type: 'religious',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-002', 'loc-008'],
    factionSentiment: {
      'faction-001': 0.35,
      'faction-004': 0.42
    }
  },
  {
    id: 'org-020',
    name: 'US Congress',
    description: 'The bicameral federal legislature comprising the House and Senate. Deep partisan divisions over immigration policy led to a government shutdown, and lawmakers have been blocked from conducting oversight visits to federal detention facilities.',
    type: 'government',
    imageUrl: 'img/entities/main/org-020.png',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-009', 'loc-004'],
    documentIds: ['doc-015'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.15,
      'faction-002': 0.18
    }
  },
  {
    id: 'org-021',
    name: 'Eighth Circuit Court of Appeals',
    description: 'The federal appellate court with jurisdiction over Minnesota and neighboring states. The court is hearing DOJ\'s appeal of Judge Menendez\'s injunction limiting federal immigration enforcement in Minnesota.',
    type: 'judicial',
    imageUrl: 'img/entities/main/org-021.png',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-002'],
    factionSentiment: {}
  },
  {
    id: 'org-022',
    name: 'Department of Health and Human Services',
    description: 'The federal department overseeing public health, led by Secretary Robert F. Kennedy Jr. HHS has implemented controversial policy changes including revised dietary guidelines emphasizing meat consumption, drawing both praise and criticism from health advocates.',
    type: 'government',
    imageUrl: 'img/entities/main/org-022.jpg',
    affiliatedFactionIds: [],
    relatedLocationIds: ['loc-001'],
    documentIds: ['doc-018', 'doc-020'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.52,
      'faction-005': 0.35,
      'faction-006': -0.48
    }
  },
  {
    id: 'org-023',
    name: 'World Resources Institute',
    description: 'A global research organization focused on environment and sustainability. WRI has been critical of the administration\'s revised dietary guidelines and has advocated for plant-based dietary approaches in public health policy.',
    type: 'research',
    affiliatedFactionIds: ['faction-005'],
    relatedLocationIds: [],
    documentIds: ['doc-019'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-001': -0.42,
      'faction-005': 0.68,
      'faction-006': 0.55
    }
  },
  {
    id: 'org-024',
    name: 'Office of the Governor of Texas',
    description: 'The executive office of Governor Greg Abbott, which has deployed National Guard troops to the border and coordinated with other Republican governors on immigration enforcement. Texas has positioned itself as a leader in state-level border security efforts.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-009', 'faction-013'],
    relatedLocationIds: ['loc-010', 'loc-011'],
    documentIds: ['doc-032', 'doc-040'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.75,
      'faction-002': -0.68
    }
  },
  {
    id: 'org-025',
    name: 'Office of the Governor of Florida',
    description: 'The executive office of Governor Ron DeSantis, which has signed state border security legislation and participated in multi-state immigration enforcement coordination. Florida has aligned closely with federal enforcement priorities.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-013'],
    relatedLocationIds: [],
    documentIds: ['doc-034', 'doc-040'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-002': -0.72
    }
  },
  {
    id: 'org-026',
    name: 'Office of the Governor of California',
    description: 'The executive office of Governor Gavin Newsom, which has led legal challenges against federal immigration enforcement. California has maintained sanctuary policies and sued the federal government over what it characterizes as unconstitutional border actions.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-002', 'faction-013'],
    relatedLocationIds: [],
    documentIds: ['doc-037'],
    factionSentiment: {
      'faction-001': -0.68,
      'faction-002': 0.72
    }
  },
  {
    id: 'org-027',
    name: 'Supreme Court of the United States',
    description: 'The nation\'s highest court, led by Chief Justice John Roberts. The Court has agreed to hear several election-related cases with potentially significant implications for federal and state election procedures and constitutional interpretation.',
    type: 'judicial',
    imageUrl: null,
    affiliatedFactionIds: ['faction-004', 'faction-010', 'faction-015'],
    relatedLocationIds: ['loc-009'],
    documentIds: ['doc-039', 'doc-047'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': 0.35,
      'faction-002': 0.28,
      'faction-004': 0.72
    }
  },
  {
    id: 'org-028',
    name: 'Drug Enforcement Administration',
    description: 'The federal agency responsible for combating drug trafficking and abuse. The DEA has been involved in the distribution of opioid settlement funds and implementation of treatment programs across affected communities.',
    type: 'government',
    imageUrl: null,
    affiliatedFactionIds: ['faction-004', 'faction-016'],
    relatedLocationIds: ['loc-001'],
    documentIds: ['doc-035', 'doc-036'],
    tagIds: ['tag-006'],
    factionSentiment: {
      'faction-004': 0.62,
      'faction-005': 0.48
    }
  },
  {
    id: 'org-029',
    name: 'Texas National Guard',
    description: 'The National Guard force of Texas, deployed to the southern border under Operation Lone Star. The Guard has established a significant presence at the border and conducted operations in support of both state and federal immigration enforcement efforts.',
    type: 'military',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-004', 'faction-009'],
    relatedLocationIds: ['loc-010', 'loc-011'],
    documentIds: ['doc-032', 'doc-033'],
    tagIds: ['tag-004'],
    factionSentiment: {
      'faction-001': 0.72,
      'faction-002': -0.65,
      'faction-004': 0.68
    }
  },
  {
    id: 'org-030',
    name: 'ACLU',
    description: 'The American Civil Liberties Union, which has filed numerous legal challenges against the administration\'s immigration policies. The organization has provided legal support to affected individuals and advocated for constitutional protections in enforcement actions.',
    type: 'nonprofit',
    imageUrl: null,
    affiliatedFactionIds: ['faction-002', 'faction-003', 'faction-010', 'faction-015'],
    relatedLocationIds: ['loc-009'],
    documentIds: ['doc-049'],
    tagIds: ['tag-005'],
    factionSentiment: {
      'faction-001': -0.72,
      'faction-002': 0.75,
      'faction-003': 0.78
    }
  },
  {
    id: 'org-031',
    name: 'Heritage Foundation',
    description: 'A conservative think tank that has provided intellectual support for the administration\'s policy agenda. The Foundation has defended aggressive immigration enforcement and advocated for expanded executive authority in immigration matters.',
    type: 'nonprofit',
    imageUrl: null,
    affiliatedFactionIds: ['faction-001', 'faction-007'],
    relatedLocationIds: ['loc-009'],
    documentIds: ['doc-052'],
    factionSentiment: {
      'faction-001': 0.85,
      'faction-002': -0.78
    }
  }
];
