/**
 * Publishers and publisher categories for China Semiconductor dataset
 */

export const publishers = [
  // Tech News
  { id: 'pub-semiengi', name: 'Semiconductor Engineering', type: 'tech_news', color: '#1565C0' },
  { id: 'pub-eetimes', name: 'EE Times', type: 'tech_news', color: '#0D47A1' },
  { id: 'pub-theregister', name: 'The Register', type: 'tech_news', color: '#B71C1C' },
  { id: 'pub-anandtech', name: 'AnandTech', type: 'tech_news', color: '#E65100' },
  { id: 'pub-tomshardware', name: 'Tom\'s Hardware', type: 'tech_news', color: '#D32F2F' },
  
  // Chinese News
  { id: 'pub-xinhua', name: 'Xinhua', type: 'chinese_news', parent: 'chinese_news', color: '#C62828' },
  { id: 'pub-cgtn', name: 'CGTN', type: 'chinese_news', parent: 'chinese_news', color: '#AD1457' },
  { id: 'pub-scmp', name: 'South China Morning Post', type: 'chinese_news', parent: 'chinese_news', color: '#FF6F00' },
  { id: 'pub-caixin', name: 'Caixin', type: 'chinese_news', parent: 'chinese_news', color: '#00695C' },
  { id: 'pub-globaltimes', name: 'Global Times', type: 'chinese_news', parent: 'chinese_news', color: '#C62828' },
  
  // International Business News
  { id: 'pub-bloomberg', name: 'Bloomberg', type: 'business_news', parent: 'business_news', color: '#000000' },
  { id: 'pub-reuters', name: 'Reuters', type: 'business_news', parent: 'business_news', color: '#FF8000' },
  { id: 'pub-wsj', name: 'Wall Street Journal', type: 'business_news', parent: 'business_news', color: '#1A1A1A' },
  { id: 'pub-ft', name: 'Financial Times', type: 'business_news', parent: 'business_news', color: '#FFF1E0' },
  { id: 'pub-nikkei', name: 'Nikkei Asia', type: 'business_news', parent: 'business_news', color: '#003D7A' },
  
  // Social Media
  { id: 'pub-x', name: 'X', type: 'social', color: '#000000' },
  { id: 'pub-tiktok', name: 'TikTok', type: 'social', color: '#00F2EA' },
  { id: 'pub-linkedin', name: 'LinkedIn', type: 'social', color: '#0A66C2' },
  { id: 'pub-weibo', name: 'Weibo', type: 'social', color: '#E6162D' },
  { id: 'pub-reddit', name: 'Reddit', type: 'social', color: '#FF4500' },
  
  // Internal
  { id: 'pub-dept-intel', name: 'Intelligence Analysis', type: 'internal', color: null },
  { id: 'pub-dept-ops', name: 'Operations Division', type: 'internal', color: null },
  { id: 'pub-dept-econ', name: 'Economic Analysis', type: 'internal', color: null },
  
  // Structured Data Sources
  { id: 'pub-sec-edgar', name: 'SEC EDGAR', type: 'regulatory', color: '#1E40AF' },
  { id: 'pub-opencorp', name: 'OpenCorporates', type: 'regulatory', color: '#7C3AED' },
  { id: 'pub-china-registry', name: 'China Corporate Registry', type: 'regulatory', color: '#DC2626' },
  { id: 'pub-bis', name: 'Bureau of Industry and Security', type: 'regulatory', color: '#0891B2' },
  { id: 'pub-mofcom', name: 'MOFCOM', type: 'regulatory', color: '#B91C1C' },
  { id: 'pub-analyst', name: 'Analyst Input', type: 'internal', color: null }
];

export const publisherCategories = [
  { id: 'tech_news', name: 'Tech News', color: '#4E79A7' },
  { id: 'chinese_news', name: 'Chinese News', color: '#E15759' },
  { id: 'business_news', name: 'Business News', color: '#59A14F' },
  { id: 'social', name: 'Social Media', color: '#B07AA1' },
  { id: 'regulatory', name: 'Regulatory Filings', color: '#8B5CF6' },
  { id: 'internal', name: 'Internal', color: '#6B7280' }
];
