/**
 * Topics (story clusters) for Singapore MCO dataset
 */

export const topics = [
  {
    id: 'topic-001',
    headline: 'SAF Training Safety Under Scrutiny After Pulau Tekong Incident',
    description: 'A fatal training incident at the Basic Military Training Centre on Pulau Tekong has reignited debate about SAF training safety standards and military culture.',
    bulletPoints: [
      'NSF died during training exercise on August 15, 2025',
      'MINDEF announced Committee of Inquiry within 48 hours',
      'Online discourse critical of safety standards intensified',
      'Minister Ng Eng Hen pledged comprehensive safety review'
    ],
    documentIds: ['doc-001', 'doc-002', 'doc-003'],
    startDate: '2025-08-15',
    endDate: '2025-09-15',
    volumeOverTime: [
      { date: '2025-08-15', volume: 285 },
      { date: '2025-08-18', volume: 685 },
      { date: '2025-08-22', volume: 520 },
      { date: '2025-09-01', volume: 245 }
    ]
  },
  {
    id: 'topic-002',
    headline: 'Viral NS Criticism Sparks National Debate on Service Duration',
    description: 'A TikTok video comparing Singapore\'s NS duration with other countries triggered widespread debate about the fairness and relevance of current NS policies.',
    bulletPoints: [
      'TikTok video gained over 500,000 views in first week',
      'Comparisons drawn with Taiwan (4 months) and Korea (18-21 months)',
      'HardwareZone forum thread accumulated thousands of responses',
      'Government clarified NS exemption policies for new citizens'
    ],
    documentIds: ['doc-004', 'doc-005', 'doc-016', 'doc-017', 'doc-029'],
    startDate: '2025-09-05',
    endDate: null,
    volumeOverTime: [
      { date: '2025-09-05', volume: 145 },
      { date: '2025-09-12', volume: 485 },
      { date: '2025-10-01', volume: 625 },
      { date: '2025-10-25', volume: 385 }
    ]
  },
  {
    id: 'topic-003',
    headline: 'Chinese State Media Questions Singapore\'s Defence Alignment',
    description: 'Global Times article suggesting Singapore is becoming a "US proxy" prompted diplomatic response and heightened monitoring of PRC-linked narratives.',
    bulletPoints: [
      'Global Times published critical commentary on October 15',
      'MFA issued formal response defending independent foreign policy',
      'Chinese embassy statement on media coverage drew rebuke',
      'Pattern of coordinated amplification detected on Chinese platforms'
    ],
    documentIds: ['doc-013', 'doc-014', 'doc-015', 'doc-032', 'doc-033', 'doc-034'],
    startDate: '2025-10-15',
    endDate: null,
    volumeOverTime: [
      { date: '2025-10-15', volume: 165 },
      { date: '2025-10-22', volume: 285 },
      { date: '2025-11-01', volume: 345 },
      { date: '2026-01-15', volume: 385 }
    ]
  },
  {
    id: 'topic-004',
    headline: 'CECA Debate Reignites Following Employment Data Release',
    description: 'Release of employment statistics showing increased Employment Pass holders triggered renewed online debate about foreign talent policies.',
    bulletPoints: [
      'MOM data showed 5% increase in EP holders year-on-year',
      'Opposition MPs raised questions in Parliament',
      'Social media discourse featured anti-CECA messaging',
      'MOM issued detailed clarification on workforce data'
    ],
    documentIds: ['doc-020', 'doc-021', 'doc-022'],
    startDate: '2025-11-12',
    endDate: '2025-12-15',
    volumeOverTime: [
      { date: '2025-11-12', volume: 225 },
      { date: '2025-11-15', volume: 485 },
      { date: '2025-11-22', volume: 455 },
      { date: '2025-12-01', volume: 285 }
    ]
  },
  {
    id: 'topic-005',
    headline: 'Singapore-Malaysia Bilateral Issues Discussed at Leaders\' Retreat',
    description: 'Annual summit between prime ministers addressed water agreement interpretations and cross-border cooperation amid nationalist narratives.',
    bulletPoints: [
      'Water pricing discussions featured prominently',
      'Malaysian nationalist voices amplified "unfair agreement" narrative',
      'Leaders affirmed commitment to bilateral cooperation',
      'RTS Link progress reviewed positively'
    ],
    documentIds: ['doc-027', 'doc-028', 'doc-035', 'doc-036'],
    startDate: '2025-12-08',
    endDate: '2026-01-25',
    volumeOverTime: [
      { date: '2025-12-08', volume: 145 },
      { date: '2025-12-12', volume: 285 },
      { date: '2026-01-22', volume: 345 },
      { date: '2026-01-25', volume: 185 }
    ]
  },
  {
    id: 'topic-006',
    headline: 'SAF Showcases Next-Generation Capabilities at Singapore Airshow',
    description: 'MINDEF unveiled locally-developed armoured vehicle and other modernization efforts, generating positive coverage and countering capability concerns.',
    bulletPoints: [
      'Next-Generation Armoured Fighting Vehicle revealed',
      'Minister Ng Eng Hen highlighted defence technology achievements',
      'Positive coverage across mainstream and social media',
      'Defence community engagement boosted morale narrative'
    ],
    documentIds: ['doc-030', 'doc-031'],
    startDate: '2026-01-08',
    endDate: null,
    volumeOverTime: [
      { date: '2026-01-08', volume: 225 },
      { date: '2026-01-12', volume: 385 },
      { date: '2026-01-18', volume: 325 },
      { date: '2026-01-25', volume: 245 }
    ]
  }
];
