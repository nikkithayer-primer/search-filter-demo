/**
 * Search filters for American Politics dataset
 */

export const searchFilters = [
  {
    id: 'filter-001',
    name: 'Key Politicians',
    description: 'Major political figures in current coverage',
    scope: {
      mode: 'simple',
      personIds: ['person-003', 'person-019', 'person-021'],
      organizationIds: [],
      factionIds: [],
      locationIds: [],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'filter-002',
    name: 'Federal Agencies',
    description: 'Key federal government agencies',
    scope: {
      mode: 'simple',
      personIds: [],
      organizationIds: ['org-010', 'org-011', 'org-012', 'org-017'],
      factionIds: [],
      locationIds: [],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'filter-003',
    name: 'Minnesota Focus',
    description: 'Minnesota-based entities and officials',
    scope: {
      mode: 'simple',
      personIds: ['person-007', 'person-019', 'person-020'],
      organizationIds: ['org-002', 'org-018'],
      factionIds: [],
      locationIds: ['loc-002'],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'filter-004',
    name: 'Terrorism & Extremist Groups',
    description: 'Comprehensive boolean filter for terrorism-related coverage',
    scope: {
      mode: 'advanced',
      booleanExpression: '(syria AND ("Al-Nusra Front" OR "Al-Nusrah Front" OR "Nusra Front" OR "Nusrah Front" OR "Jabhat Fateh al-Sham" OR "al-Qaeda in Syria" OR "al-Qaeda in the Levant" OR "Army of Conquest" OR "Front for the Conquest of the Levant" OR "Tahrir al-Sham")) OR (ISIS OR "Islamic State of Iraq and Syria" OR "Islamic State of Iraq and the Levant" OR "Islamic State of Iraq and al-Sham" OR ("Islamic State" AND (terrorism OR terrorists OR terrorist)) OR "Bakr al-Baghdadi" OR "Baqr al-Baghdadi" AND NOT ("IS" AND Mosul)) OR ("al-Qaeda in the Islamic Maghreb" OR "AQIM" OR ("al-qaeda" AND (morocco OR tunisia OR algeria OR Libya OR Egypt)) OR "Salafist Group for Preaching and Combat" OR GSPC OR (tribe AND (tuareg OR berabiche OR mali) AND terror) OR "Macina Liberation Front" OR "Ansar Dine" OR "al-Mourabitoun" OR "Nasr al-Islam wal Muslimin") OR ( "al-Qaeda" OR "al-Qaida" OR "al-Qa\'ida" OR "bin-laden" OR "bin laden" OR "abdullah azzam" OR "ayman al-zawahiri") OR (AQAP OR "al-qaeda in the arabian peninsula" OR "al-qaeda organization in the arabian peninsula" OR "organization of jihad\'s base in the arabian peninsula" OR "ansar al-sharia in yemen" OR "nasir al-wuhayshi" OR "wasim al-Raymi") OR ("Al-Shabaab" OR "Ash-Shabaab" OR "Hizbul Shabaab" OR "Harakat al-Shabaab" OR "al-Mujahideen" OR "Ahmad Umar" OR "Abu Ubaidah" OR "Ahmad Iman Ali" OR "Abdifatah Abubakar Abdi" OR "Moktar Ali Zubeyr Godane" OR "Fuad Mohammed Khalaf" OR "Fuad Mohammed Khalaf Shangole" OR "Hassan Dahir Aweys" OR "Hussein Ali Fidow" OR "Ali Mohamud Raghe Dheere" OR "Sheikh Ali Mohamud Rage" OR "Sheikh Ali Dhere" OR "Aden Hashi Farah Ayro" OR "al-Afghani" OR "Hassan Yaqub Ali" OR "Abdirahman Hassan Hussein" OR "Hassan Abdullah Hersi al-Turki" OR "Ras Kamboni Brigades" OR "Hizbul Islam" OR "Mohamed Said Atom" OR "Mukhtar Abu-Muslim" OR "Abdulahi Haji Daud" OR "Sahal Isku Dhuuq" OR "Hassan Afrah" OR "Dahir Gamaey Abdi Al-Haq" OR "Tahliil Abdishakur" OR "Yusuf Dheeq" OR "Aden Garaar" OR "Mohamed Musa" OR "Sheikh Abdiasis Abu Musab" OR ("Boko Haram" OR ISWA OR ISWAP))',
      entityMap: {},
      personIds: [],
      organizationIds: [],
      factionIds: [],
      locationIds: [],
      eventIds: [],
      keywords: []
    },
    createdAt: '2026-01-20T14:30:00Z'
  }
];
