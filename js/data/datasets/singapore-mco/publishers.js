/**
 * Publishers and publisher categories for Singapore MCO dataset
 */

export const publishers = [
  // Social Media (flat)
  { id: 'pub-facebook', name: 'Facebook', type: 'social', color: '#1877F2' },
  { id: 'pub-x', name: 'X', type: 'social', color: '#000000' },
  { id: 'pub-tiktok', name: 'TikTok', type: 'social', color: '#00F2EA' },
  { id: 'pub-instagram', name: 'Instagram', type: 'social', color: '#E4405F' },
  { id: 'pub-reddit', name: 'Reddit', type: 'social', color: '#FF4500' },
  { id: 'pub-telegram', name: 'Telegram', type: 'social', color: '#0088CC' },
  { id: 'pub-wechat', name: 'WeChat', type: 'social', color: '#7BB32E' },
  { id: 'pub-weibo', name: 'Weibo', type: 'social', color: '#E6162D' },
  { id: 'pub-hwz', name: 'HardwareZone Forums', type: 'social', color: '#FF6600' },
  { id: 'pub-youtube', name: 'YouTube', type: 'social', color: '#FF0000' },
  
  // Singapore News (hierarchical)
  { id: 'pub-sg-cna', name: 'CNA', type: 'singapore_news', parent: 'singapore_news', color: '#E31937' },
  { id: 'pub-sg-st', name: 'The Straits Times', type: 'singapore_news', parent: 'singapore_news', color: '#1B365D' },
  { id: 'pub-sg-today', name: 'TODAY', type: 'singapore_news', parent: 'singapore_news', color: '#00A651' },
  { id: 'pub-sg-mothership', name: 'Mothership', type: 'singapore_news', parent: 'singapore_news', color: '#FF5722' },
  { id: 'pub-sg-toc', name: 'The Online Citizen', type: 'singapore_news', parent: 'singapore_news', color: '#333333' },
  { id: 'pub-sg-rice', name: 'Rice Media', type: 'singapore_news', parent: 'singapore_news', color: '#F5A623' },
  
  // Regional News (hierarchical)
  { id: 'pub-reg-scmp', name: 'South China Morning Post', type: 'regional_news', parent: 'regional_news', color: '#FFB81C' },
  { id: 'pub-reg-globaltimes', name: 'Global Times', type: 'regional_news', parent: 'regional_news', color: '#CC0000' },
  { id: 'pub-reg-xinhua', name: 'Xinhua', type: 'regional_news', parent: 'regional_news', color: '#DE2910' },
  { id: 'pub-reg-bernama', name: 'Bernama', type: 'regional_news', parent: 'regional_news', color: '#003087' },
  { id: 'pub-reg-thestar', name: 'The Star Malaysia', type: 'regional_news', parent: 'regional_news', color: '#0066B3' },
  { id: 'pub-reg-nst', name: 'New Straits Times', type: 'regional_news', parent: 'regional_news', color: '#000080' },
  { id: 'pub-reg-jakarta', name: 'Jakarta Post', type: 'regional_news', parent: 'regional_news', color: '#1E88E5' },
  
  // International News (hierarchical)
  { id: 'pub-int-bbc', name: 'BBC', type: 'international_news', parent: 'international_news', color: '#BB1919' },
  { id: 'pub-int-reuters', name: 'Reuters', type: 'international_news', parent: 'international_news', color: '#FF8000' },
  { id: 'pub-int-afp', name: 'AFP', type: 'international_news', parent: 'international_news', color: '#0055A4' },
  { id: 'pub-int-aljazeera', name: 'Al Jazeera', type: 'international_news', parent: 'international_news', color: '#D2A44D' },
  
  // Internal (no colors - department names)
  { id: 'pub-dept-mco', name: 'MCO Analysis Division', type: 'internal', color: null },
  { id: 'pub-dept-mindef', name: 'MINDEF Intelligence', type: 'internal', color: null },
  { id: 'pub-dept-mci', name: 'MCI Strategic Communications', type: 'internal', color: null },
  { id: 'pub-dept-mha', name: 'MHA Security Assessment', type: 'internal', color: null },
  
  // Structured Data Sources
  { id: 'pub-acra', name: 'ACRA Corporate Registry', type: 'regulatory', color: '#1E40AF' },
  { id: 'pub-mom', name: 'MOM Employment Data', type: 'regulatory', color: '#7C3AED' },
  { id: 'pub-ica', name: 'ICA Immigration Records', type: 'regulatory', color: '#0891B2' },
  { id: 'pub-analyst', name: 'Analyst Input', type: 'internal', color: null }
];

export const publisherCategories = [
  { id: 'social', name: 'Social Media', color: '#B07AA1' },
  { id: 'singapore_news', name: 'Singapore News', color: '#E15759' },
  { id: 'regional_news', name: 'Regional News', color: '#F28E2B' },
  { id: 'international_news', name: 'International News', color: '#59A14F' },
  { id: 'internal', name: 'Internal', color: '#6b7280' },
  { id: 'regulatory', name: 'Regulatory Data', color: '#8B5CF6' }
];
