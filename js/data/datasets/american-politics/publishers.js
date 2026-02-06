/**
 * Publishers and publisher categories for American Politics dataset
 */

export const publishers = [
  // Social Media (flat)
  { id: 'pub-facebook', name: 'Facebook', type: 'social', color: '#1877F2' },
  { id: 'pub-x', name: 'X', type: 'social', color: '#000000' },
  { id: 'pub-tiktok', name: 'TikTok', type: 'social', color: '#00F2EA' },
  { id: 'pub-instagram', name: 'Instagram', type: 'social', color: '#E4405F' },
  { id: 'pub-reddit', name: 'Reddit', type: 'social', color: '#FF4500' },
  { id: 'pub-linkedin', name: 'LinkedIn', type: 'social', color: '#0A66C2' },
  
  // National News (hierarchical)
  { id: 'pub-nat-cnn', name: 'CNN', type: 'national_news', parent: 'national_news', color: '#CC0000' },
  { id: 'pub-nat-fox', name: 'Fox News', type: 'national_news', parent: 'national_news', color: '#003366' },
  { id: 'pub-nat-nyt', name: 'New York Times', type: 'national_news', parent: 'national_news', color: '#1A1A1A' },
  { id: 'pub-nat-wapo', name: 'Washington Post', type: 'national_news', parent: 'national_news', color: '#231F20' },
  { id: 'pub-nat-msnbc', name: 'MSNBC', type: 'national_news', parent: 'national_news', color: '#0089D0' },
  
  // International News (hierarchical)
  { id: 'pub-int-bbc', name: 'BBC', type: 'international_news', parent: 'international_news', color: '#BB1919' },
  { id: 'pub-int-aljazeera', name: 'Al Jazeera', type: 'international_news', parent: 'international_news', color: '#D2A44D' },
  { id: 'pub-int-reuters', name: 'Reuters', type: 'international_news', parent: 'international_news', color: '#FF8000' },
  { id: 'pub-int-guardian', name: 'The Guardian', type: 'international_news', parent: 'international_news', color: '#052962' },
  
  // Internal (no colors - department names)
  { id: 'pub-dept-ops', name: 'Operations Division', type: 'internal', color: null },
  { id: 'pub-dept-intel', name: 'Intelligence Analysis', type: 'internal', color: null },
  { id: 'pub-dept-cyber', name: 'Cyber Operations', type: 'internal', color: null },
  { id: 'pub-dept-legal', name: 'Legal Affairs', type: 'internal', color: null },
  
  // Structured Data Sources
  { id: 'pub-sec-edgar', name: 'SEC EDGAR', type: 'regulatory', color: '#1E40AF' },
  { id: 'pub-opencorp', name: 'OpenCorporates', type: 'regulatory', color: '#7C3AED' },
  { id: 'pub-fec', name: 'FEC', type: 'regulatory', color: '#DC2626' },
  { id: 'pub-lda', name: 'Senate LDA', type: 'regulatory', color: '#0891B2' },
  { id: 'pub-ofac', name: 'OFAC', type: 'regulatory', color: '#B91C1C' },
  { id: 'pub-analyst', name: 'Analyst Input', type: 'internal', color: null }
];

export const publisherCategories = [
  { id: 'social', name: 'Social Media', color: '#B07AA1' },
  { id: 'national_news', name: 'National News', color: '#4E79A7' },
  { id: 'international_news', name: 'International News', color: '#59A14F' },
  { id: 'internal', name: 'Internal', color: '#6b7280' },
  { id: 'regulatory', name: 'Regulatory Filings', color: '#8B5CF6' }
];
