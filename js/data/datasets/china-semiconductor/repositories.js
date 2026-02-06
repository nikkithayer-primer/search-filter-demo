/**
 * Repositories for document storage
 * Consistent across all datasets
 */

export const repositories = [
  {
    id: 'repo-news',
    code: 'NEWS',
    name: 'News',
    description: 'News articles from external media sources',
    color: '#4E79A7'
  },
  {
    id: 'repo-osint',
    code: 'OSINT',
    name: 'OSINT',
    description: 'Social media posts and open-source intelligence',
    color: '#E15759'
  },
  {
    id: 'repo-edl',
    code: 'EDL',
    name: 'EDL',
    description: 'Internal reports and intelligence documents',
    color: '#59A14F'
  },
  {
    id: 'repo-struct',
    code: 'STRUCT',
    name: 'Structured Data',
    description: 'Corporate records, watchlists, political finance, and event attendance',
    color: '#8B5CF6'
  }
];
