/**
 * Publishers and publisher categories for Walmart Brand dataset
 */

export const publishers = [
  // Consumer Review Platforms
  { id: 'pub-trustpilot', name: 'Trustpilot', type: 'consumer_review', color: '#00B67A' },
  { id: 'pub-bbb', name: 'Better Business Bureau', type: 'consumer_review', color: '#005A8C' },
  { id: 'pub-yelp', name: 'Yelp', type: 'consumer_review', color: '#D32323' },
  { id: 'pub-consumeraffairs', name: 'ConsumerAffairs', type: 'consumer_review', color: '#1E88E5' },
  { id: 'pub-googlereviews', name: 'Google Reviews', type: 'consumer_review', color: '#4285F4' },
  
  // News Outlets
  { id: 'pub-reuters', name: 'Reuters', type: 'news', parent: 'news', color: '#FF8000' },
  { id: 'pub-ap', name: 'Associated Press', type: 'news', parent: 'news', color: '#E32636' },
  { id: 'pub-usatoday', name: 'USA Today', type: 'news', parent: 'news', color: '#009BFF' },
  { id: 'pub-localnews', name: 'Local News Affiliates', type: 'news', parent: 'news', color: '#6B7280' },
  
  // Business News
  { id: 'pub-wsj', name: 'Wall Street Journal', type: 'business_news', parent: 'business_news', color: '#1A1A1A' },
  { id: 'pub-bloomberg', name: 'Bloomberg', type: 'business_news', parent: 'business_news', color: '#000000' },
  { id: 'pub-retaildive', name: 'Retail Dive', type: 'business_news', parent: 'business_news', color: '#0066CC' },
  { id: 'pub-modernretail', name: 'Modern Retail', type: 'business_news', parent: 'business_news', color: '#FF6B35' },
  
  // Social Media
  { id: 'pub-x', name: 'X', type: 'social', color: '#000000' },
  { id: 'pub-tiktok', name: 'TikTok', type: 'social', color: '#00F2EA' },
  { id: 'pub-reddit', name: 'Reddit', type: 'social', color: '#FF4500' },
  { id: 'pub-facebook', name: 'Facebook', type: 'social', color: '#1877F2' },
  { id: 'pub-instagram', name: 'Instagram', type: 'social', color: '#E4405F' },
  
  // Structured Data Sources
  { id: 'pub-sec-edgar', name: 'SEC EDGAR', type: 'regulatory', color: '#1E40AF' },
  { id: 'pub-opencorp', name: 'OpenCorporates', type: 'regulatory', color: '#7C3AED' },
  { id: 'pub-fec', name: 'FEC', type: 'regulatory', color: '#DC2626' },
  { id: 'pub-lda', name: 'Senate LDA', type: 'regulatory', color: '#0891B2' },
  { id: 'pub-analyst', name: 'Analyst Input', type: 'internal', color: null }
];

export const publisherCategories = [
  { id: 'consumer_review', name: 'Consumer Reviews', color: '#59A14F' },
  { id: 'news', name: 'News', color: '#E15759' },
  { id: 'business_news', name: 'Business News', color: '#76B7B2' },
  { id: 'social', name: 'Social Media', color: '#B07AA1' },
  { id: 'regulatory', name: 'Regulatory Filings', color: '#8B5CF6' },
  { id: 'internal', name: 'Internal', color: '#6B7280' }
];
