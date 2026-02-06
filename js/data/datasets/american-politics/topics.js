/**
 * Topics for American Politics dataset
 */

export const topics = [
  {
    id: 'topic-001',
    headline: 'European Leaders Push Back on Trump\'s Greenland Ambitions',
    description: 'A coordinated European response has emerged against President Trump\'s stated intention to acquire Greenland, with leaders from France, the EU, and Greenland itself warning that such territorial ambitions threaten the international rules-based order and European security.',
    bulletPoints: [
      'French President Emmanuel Macron warned at Davos that Trump\'s territorial ambitions threaten a world where "international law is trampled underfoot," signaling a unified European concern.',
      'European Commission President Ursula von der Leyen called for a "new form of European independence" in direct response to perceived US pressure on European allies.',
      'Greenland\'s Prime Minister Múte Egede demanded respect for the existing world order and his nation\'s sovereignty, rejecting any notion of territorial sale or transfer.',
      'President Trump escalated diplomatic tensions by publicly sharing private diplomatic messages on social media, drawing criticism from European capitals.'
    ],
    documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
    tagIds: ['tag-002'],
    startDate: '2026-01-20',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-20', volume: 245 },
      { date: '2026-01-21', volume: 312 },
      { date: '2026-01-22', volume: 278 },
      { date: '2026-01-23', volume: 195 },
      { date: '2026-01-24', volume: 156 }
    ],
    createdAt: '2026-01-20T15:00:00Z'
  },
  {
    id: 'topic-002',
    headline: 'DOJ Escalates Federal-State Confrontation Over Immigration Enforcement',
    description: 'The Department of Justice has intensified its conflict with state and local officials in Minnesota over immigration enforcement, with subpoenas planned for state leaders, appeals of judicial rulings favoring protesters, and a controversial FBI investigation shift that has drawn accusations of political bias.',
    bulletPoints: [
      'The Department of Justice announced plans to subpoena Minnesota\'s Attorney General, Governor, and the Mayor of Minneapolis as part of its investigation into alleged obstruction of federal immigration enforcement.',
      'A federal judge ruled that protesters cannot be arrested without probable cause during immigration demonstrations, prompting an immediate DOJ appeal seeking to overturn the decision.',
      'The FBI\'s civil rights investigation has controversially shifted its focus from the ICE agent involved in a shooting to the slain protester, sparking accusations of investigative bias.',
      'Eyewitness accounts from the protests describe a "terrifying" federal response, with reports of aggressive tactics that have fueled national debate over enforcement methods.'
    ],
    documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-025'],
    tagIds: ['tag-001'],
    startDate: '2026-01-15',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-15', volume: 85 },
      { date: '2026-01-16', volume: 124 },
      { date: '2026-01-17', volume: 198 },
      { date: '2026-01-18', volume: 267 },
      { date: '2026-01-19', volume: 312 },
      { date: '2026-01-20', volume: 445 },
      { date: '2026-01-21', volume: 389 },
      { date: '2026-01-22', volume: 324 },
      { date: '2026-01-23', volume: 278 },
      { date: '2026-01-24', volume: 215 }
    ],
    createdAt: '2026-01-15T12:00:00Z'
  },
  {
    id: 'topic-003',
    headline: 'Church Protests Spark Religious Freedom and Press Freedom Debate',
    description: 'A protest at a church where an ICE official serves as pastor has ignited a national debate over the intersection of religious freedom, press freedom, and immigration enforcement, with the DOJ invoking the FACE Act and threatening journalists who covered the event.',
    bulletPoints: [
      'Protesters disrupted a Sunday service at a church where an ICE official serves as pastor, drawing national attention to the overlap between religious institutions and federal enforcement.',
      'Attorney General Pam Bondi announced a FACE Act investigation into the church protest, citing "intimidation of Christians" as the basis for potential federal charges.',
      'The Department of Justice threatened criminal charges against journalist Don Lemon for his live coverage of the protest, raising serious press freedom concerns.',
      'President Trump characterized the protesters as "agitators and insurrectionists," language that civil liberties groups argue could justify expanded federal prosecution.'
    ],
    documentIds: ['doc-008', 'doc-009', 'doc-010', 'doc-011'],
    tagIds: ['tag-002'],
    startDate: '2026-01-19',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-19', volume: 156 },
      { date: '2026-01-20', volume: 423 },
      { date: '2026-01-21', volume: 512 },
      { date: '2026-01-22', volume: 378 },
      { date: '2026-01-23', volume: 245 },
      { date: '2026-01-24', volume: 189 }
    ],
    createdAt: '2026-01-19T16:00:00Z'
  },
  {
    id: 'topic-004',
    headline: 'Food Preservative Cancer Links Gain Scientific Consensus',
    description: 'Multiple peer-reviewed studies have converged on findings linking common food preservatives and ultra-processed foods to significantly elevated cancer risks, prompting calls from health experts for stricter regulatory oversight of food additives.',
    bulletPoints: [
      'The NutriNet-Santé study found that consumption of sodium nitrite is linked to a 32% increase in prostate cancer risk, adding to growing evidence against the common preservative.',
      'Potassium nitrate, another widely used food preservative, has been associated with a 22% higher breast cancer risk according to the same large-scale European research.',
      'Harvard researchers reported that regular consumption of ultra-processed foods correlates with a 45% higher risk of developing precancerous colorectal adenomas.',
      'Public health experts are now calling for stricter FDA regulation of food additives, citing the mounting scientific evidence as grounds for immediate policy review.'
    ],
    documentIds: ['doc-021', 'doc-022', 'doc-023'],
    startDate: '2026-01-07',
    endDate: '2026-01-16',
    volumeOverTime: [
      { date: '2026-01-07', volume: 65 },
      { date: '2026-01-08', volume: 93 },
      { date: '2026-01-09', volume: 120 },
      { date: '2026-01-10', volume: 137 },
      { date: '2026-01-11', volume: 110 },
      { date: '2026-01-12', volume: 100 },
      { date: '2026-01-13', volume: 93 },
      { date: '2026-01-14', volume: 120 },
      { date: '2026-01-15', volume: 107 },
      { date: '2026-01-16', volume: 98 }
    ],
    createdAt: '2026-01-07T10:00:00Z'
  },
  {
    id: 'topic-005',
    headline: 'Judicial Safety Concerns After Indiana Judge Shooting',
    description: 'The shooting of an Indiana judge and his wife at their home has renewed urgent discussions about judicial security nationwide, with the suspect still at large and the Indiana Supreme Court calling on all judges to heighten their vigilance.',
    bulletPoints: [
      'Tippecanoe Superior Court Judge Steven Meyer and his wife were shot at their private residence in what appears to be a targeted attack, both sustaining injuries to their arm and hip.',
      'Both victims are currently in stable condition at a local hospital, with authorities reporting that they are expected to make full recoveries.',
      'The suspect remains at large despite an intensive multi-agency investigation involving local, state, and federal law enforcement resources.',
      'Indiana Supreme Court Chief Justice Loretta Rush issued a statement urging all judges statewide to "remain vigilant" and review their personal security protocols.'
    ],
    documentIds: ['doc-012', 'doc-013'],
    startDate: '2026-01-19',
    endDate: '2026-01-22',
    volumeOverTime: [
      { date: '2026-01-19', volume: 234 },
      { date: '2026-01-20', volume: 456 },
      { date: '2026-01-21', volume: 312 },
      { date: '2026-01-22', volume: 145 }
    ],
    createdAt: '2026-01-19T18:00:00Z'
  },
  {
    id: 'topic-006',
    headline: 'Border State Governors Form Coalition on Immigration',
    description: 'Republican governors from border and southern states have formed an unprecedented coalition to coordinate state-level immigration enforcement, deploying National Guard troops and passing aggressive legislation while the DOJ has opened civil rights investigations into their actions.',
    bulletPoints: [
      'Texas Governor Greg Abbott has deployed 5,000 National Guard troops to the southern border as part of Operation Lone Star, the largest state border deployment in decades.',
      'Florida Governor Ron DeSantis signed sweeping border enforcement legislation that empowers state authorities to detain and transport undocumented immigrants.',
      'Eight Republican governors convened at a summit in Austin, Texas to coordinate a unified enforcement strategy that critics argue usurps federal authority.',
      'The Department of Justice has opened civil rights investigations into state border actions, alleging potential violations of the Constitution\'s Supremacy Clause.',
      'Border crossings have reached a five-year low amid the enforcement surge, though experts debate whether policies or regional factors are the primary cause.'
    ],
    documentIds: ['doc-032', 'doc-033', 'doc-034', 'doc-037', 'doc-038', 'doc-040', 'doc-054'],
    tagIds: ['tag-003'],
    startDate: '2025-06-15',
    endDate: null,
    volumeOverTime: [
      { date: '2025-06-15', volume: 185 },
      { date: '2025-07-10', volume: 245 },
      { date: '2025-08-20', volume: 325 },
      { date: '2025-09-01', volume: 385 },
      { date: '2025-12-28', volume: 295 }
    ],
    createdAt: '2025-06-15T14:00:00Z'
  },
  {
    id: 'topic-007',
    headline: 'Federal Budget Showdown Leads to October Shutdown',
    description: 'A partisan standoff over border funding provisions led to an 18-day government shutdown in October 2025, with hundreds of thousands of federal workers furloughed before a modest compromise that satisfied neither party ultimately reopened the government.',
    bulletPoints: [
      'The House of Representatives passed a border-focused spending bill on a strict party-line vote, with Republicans demanding significant immigration enforcement funding.',
      'Senate Democrats blocked the House bill, characterizing the border provisions as a "ransom demand" that held essential government services hostage.',
      'The government shutdown lasted 18 days as negotiations collapsed repeatedly, making it the second-longest shutdown in the past decade.',
      'Hundreds of thousands of federal workers were furloughed during the shutdown, with essential services maintained only by unpaid staff deemed critical.',
      'A modest compromise that included partial border funding and a short-term continuing resolution ultimately reopened the government, though neither party claimed victory.'
    ],
    documentIds: ['doc-041', 'doc-042', 'doc-043', 'doc-044', 'doc-045', 'doc-046'],
    tagIds: ['tag-003'],
    startDate: '2025-09-15',
    endDate: '2025-10-19',
    volumeOverTime: [
      { date: '2025-09-15', volume: 165 },
      { date: '2025-09-22', volume: 285 },
      { date: '2025-10-01', volume: 425 },
      { date: '2025-10-08', volume: 365 },
      { date: '2025-10-19', volume: 295 }
    ],
    createdAt: '2025-09-15T17:00:00Z'
  },
  {
    id: 'topic-008',
    headline: 'Opioid Settlement Distribution Sparks Legal Battles',
    description: 'The distribution of billions in opioid settlement funds has become mired in legal disputes as states challenge the allocation formula, with the Supreme Court agreeing to review the methodology while communities debate how best to deploy arriving funds.',
    bulletPoints: [
      'Settlement funds from major pharmaceutical companies have begun arriving in the hardest-hit communities, though disputes over amounts and timing persist.',
      'Health officials in affected regions are engaged in contentious debates over whether to prioritize treatment facilities, prevention programs, or law enforcement resources.',
      'Several states have filed lawsuits challenging the settlement allocation formula, arguing that it unfairly disadvantages rural communities with high per-capita overdose rates.',
      'The Supreme Court has agreed to review the settlement distribution methodology, a decision that could reshape how future mass tort settlements are allocated nationwide.'
    ],
    documentIds: ['doc-035', 'doc-036', 'doc-039', 'doc-053'],
    startDate: '2025-07-01',
    endDate: null,
    volumeOverTime: [
      { date: '2025-07-01', volume: 125 },
      { date: '2025-07-20', volume: 185 },
      { date: '2025-08-15', volume: 225 },
      { date: '2025-12-20', volume: 165 }
    ],
    createdAt: '2025-07-01T10:00:00Z'
  }
];
