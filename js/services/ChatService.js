/**
 * ChatService.js
 * OpenAI-powered chat with function calling for intelligent data queries
 */

import { DataService } from '../data/DataService.js';
import { OPENAI_API_KEY, hasInjectedApiKey } from '../config.js';

// ============================================
// Tool Definitions for OpenAI Function Calling
// ============================================

const tools = [
  {
    type: 'function',
    function: {
      name: 'get_current_page_context',
      description: 'Get details about what the user is currently viewing (narrative, person, document, etc.). Always call this first to understand the context.',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_documents',
      description: 'Search documents by keywords, date range, or linked entities. Returns title, excerpt, and metadata.',
      parameters: {
        type: 'object',
        properties: {
          keywords: { 
            type: 'array', 
            items: { type: 'string' }, 
            description: 'Keywords to search in title/excerpt' 
          },
          narrativeId: { type: 'string', description: 'Filter to documents linked to this narrative' },
          themeId: { type: 'string', description: 'Filter to documents linked to this theme' },
          factionId: { type: 'string', description: 'Filter to documents mentioning this faction' },
          personId: { type: 'string', description: 'Filter to documents mentioning this person' },
          organizationId: { type: 'string', description: 'Filter to documents mentioning this organization' },
          eventId: { type: 'string', description: 'Filter to documents linked to this event' },
          startDate: { type: 'string', description: 'Filter to documents after this date (ISO format)' },
          endDate: { type: 'string', description: 'Filter to documents before this date (ISO format)' },
          limit: { type: 'number', description: 'Max results to return (default 10)' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_narrative_details',
      description: 'Get full details about a narrative including its themes, sentiment, volume, and linked entities',
      parameters: {
        type: 'object',
        properties: {
          narrativeId: { type: 'string', description: 'The narrative ID (e.g., narr-001)' }
        },
        required: ['narrativeId']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_theme_details',
      description: 'Get details about a theme (sub-narrative) including its parent narrative and sentiment',
      parameters: {
        type: 'object',
        properties: {
          themeId: { type: 'string', description: 'The theme ID (e.g., sub-001)' }
        },
        required: ['themeId']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_narratives_for_entity',
      description: 'Find all narratives that mention a specific person, organization, location, or faction',
      parameters: {
        type: 'object',
        properties: {
          entityId: { type: 'string', description: 'The entity ID (e.g., person-001, org-002, faction-001)' }
        },
        required: ['entityId']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_faction_details',
      description: 'Get faction details including affiliated entities, narratives they appear in, and sentiment',
      parameters: {
        type: 'object',
        properties: {
          factionId: { type: 'string', description: 'The faction ID' }
        },
        required: ['factionId']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_person_details',
      description: 'Get details about a person including their affiliations, mentions, and related narratives',
      parameters: {
        type: 'object',
        properties: {
          personId: { type: 'string', description: 'The person ID' }
        },
        required: ['personId']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_organization_details',
      description: 'Get details about an organization including affiliations and related narratives',
      parameters: {
        type: 'object',
        properties: {
          organizationId: { type: 'string', description: 'The organization ID' }
        },
        required: ['organizationId']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_related_entities',
      description: 'Find people, organizations, and locations related to a narrative or faction',
      parameters: {
        type: 'object',
        properties: {
          narrativeId: { type: 'string', description: 'Find entities related to this narrative' },
          factionId: { type: 'string', description: 'Find entities affiliated with this faction' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'compare_factions',
      description: 'Compare two factions by their narratives, sentiment, and activity',
      parameters: {
        type: 'object',
        properties: {
          factionId1: { type: 'string', description: 'First faction ID' },
          factionId2: { type: 'string', description: 'Second faction ID' }
        },
        required: ['factionId1', 'factionId2']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_volume_trends',
      description: 'Get volume over time data for a narrative, theme, or faction',
      parameters: {
        type: 'object',
        properties: {
          narrativeId: { type: 'string' },
          themeId: { type: 'string' },
          factionId: { type: 'string' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'list_all_narratives',
      description: 'Get a list of all narratives in the system with their basic info',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'list_all_factions',
      description: 'Get a list of all factions in the system',
      parameters: { type: 'object', properties: {} }
    }
  }
];

// ============================================
// Function Handlers - Map to DataService
// ============================================

/**
 * Create function handlers with access to the router for context
 * @param {Router} router - The app router instance
 * @returns {Object} Map of function names to handlers
 */
function createFunctionHandlers(router) {
  return {
    get_current_page_context: () => {
      const { route, id } = router.getCurrentRoute();
      return buildPageContext(route, id);
    },

    search_documents: ({ keywords, narrativeId, themeId, factionId, personId, organizationId, eventId, startDate, endDate, limit = 10 }) => {
      let docs = DataService.getDocuments();
      
      if (narrativeId) {
        docs = docs.filter(d => d.narrativeIds?.includes(narrativeId));
      }
      if (themeId) {
        docs = docs.filter(d => d.themeIds?.includes(themeId));
      }
      if (factionId) {
        docs = docs.filter(d => d.factionMentions?.[factionId]);
      }
      if (personId) {
        docs = docs.filter(d => d.personIds?.includes(personId));
      }
      if (organizationId) {
        docs = docs.filter(d => d.organizationIds?.includes(organizationId));
      }
      if (eventId) {
        docs = docs.filter(d => d.eventIds?.includes(eventId));
      }
      if (startDate) {
        docs = docs.filter(d => new Date(d.publishedDate) >= new Date(startDate));
      }
      if (endDate) {
        docs = docs.filter(d => new Date(d.publishedDate) <= new Date(endDate));
      }
      if (keywords?.length) {
        const lowerKeywords = keywords.map(k => k.toLowerCase());
        docs = docs.filter(d => {
          const text = `${d.title} ${d.excerpt || ''}`.toLowerCase();
          return lowerKeywords.some(kw => text.includes(kw));
        });
      }
      
      // Sort by date, most recent first
      docs.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
      
      return docs.slice(0, limit).map(d => ({
        id: d.id,
        title: d.title,
        excerpt: d.excerpt,
        publishedDate: d.publishedDate,
        documentType: d.documentType,
        source: DataService.getPublisher(d.publisherId)?.name || 'Unknown'
      }));
    },

    get_narrative_details: ({ narrativeId }) => {
      const narrative = DataService.getNarrative(narrativeId);
      if (!narrative) return { error: 'Narrative not found' };
      
      const themes = DataService.getThemesForNarrative(narrativeId);
      const factionMentions = DataService.getAggregateFactionMentionsForNarrative(narrativeId);
      const docs = DataService.getDocumentsForNarrative(narrativeId);
      
      // Resolve faction names
      const factionData = {};
      for (const [factionId, data] of Object.entries(factionMentions)) {
        const faction = DataService.getFaction(factionId);
        factionData[faction?.name || factionId] = {
          volume: data.volume,
          sentiment: data.sentiment
        };
      }
      
      return {
        id: narrative.id,
        title: narrative.text,
        description: narrative.description,
        sentiment: narrative.sentiment,
        themes: themes.map(t => ({ id: t.id, title: t.text, sentiment: t.sentiment })),
        factionEngagement: factionData,
        documentCount: docs.length,
        recentDocuments: docs.slice(0, 5).map(d => ({ id: d.id, title: d.title, date: d.publishedDate }))
      };
    },

    get_theme_details: ({ themeId }) => {
      const theme = DataService.getTheme(themeId);
      if (!theme) return { error: 'Theme not found' };
      
      const parentNarrative = DataService.getNarrative(theme.parentNarrativeId);
      const docs = DataService.getDocumentsForTheme(themeId);
      
      return {
        id: theme.id,
        title: theme.text,
        sentiment: theme.sentiment,
        parentNarrative: parentNarrative ? { id: parentNarrative.id, title: parentNarrative.text } : null,
        documentCount: docs.length,
        recentDocuments: docs.slice(0, 5).map(d => ({ id: d.id, title: d.title }))
      };
    },

    get_narratives_for_entity: ({ entityId }) => {
      let narratives = [];
      
      // Determine entity type from ID prefix and get narratives
      if (entityId.startsWith('person-')) {
        narratives = DataService.getNarrativesForPerson(entityId);
      } else if (entityId.startsWith('org-')) {
        narratives = DataService.getNarrativesForOrganization(entityId);
      } else if (entityId.startsWith('faction-')) {
        narratives = DataService.getNarrativesForFaction(entityId);
      } else if (entityId.startsWith('loc-')) {
        narratives = DataService.getNarrativesForLocation(entityId);
      }
      
      return narratives.map(n => ({
        id: n.id,
        title: n.text,
        sentiment: n.sentiment,
        description: n.description?.substring(0, 200)
      }));
    },

    get_faction_details: ({ factionId }) => {
      const faction = DataService.getFaction(factionId);
      if (!faction) return { error: 'Faction not found' };
      
      const narratives = DataService.getNarrativesForFaction(factionId);
      const people = DataService.getPersonsForFaction(factionId);
      const orgs = DataService.getOrganizationsForFaction(factionId);
      
      return {
        id: faction.id,
        name: faction.name,
        description: faction.description,
        memberCount: faction.memberCount,
        narrativeCount: narratives.length,
        topNarratives: narratives.slice(0, 5).map(n => ({ id: n.id, title: n.text, sentiment: n.sentiment })),
        affiliatedPeople: people.slice(0, 10).map(p => ({ id: p.id, name: p.name, role: p.role })),
        affiliatedOrganizations: orgs.slice(0, 10).map(o => ({ id: o.id, name: o.name, type: o.type }))
      };
    },

    get_person_details: ({ personId }) => {
      const person = DataService.getPerson(personId);
      if (!person) return { error: 'Person not found' };
      
      const factions = DataService.getFactionsForPerson(personId);
      const narratives = DataService.getNarrativesForPerson(personId);
      const docs = DataService.getDocumentsForPerson(personId);
      
      return {
        id: person.id,
        name: person.name,
        role: person.role,
        type: person.type,
        description: person.description,
        affiliatedFactions: factions.map(f => ({ id: f.id, name: f.name })),
        narrativeCount: narratives.length,
        narratives: narratives.slice(0, 5).map(n => ({ id: n.id, title: n.text })),
        recentMentions: docs.slice(0, 5).map(d => ({ id: d.id, title: d.title, date: d.publishedDate }))
      };
    },

    get_organization_details: ({ organizationId }) => {
      const org = DataService.getOrganization(organizationId);
      if (!org) return { error: 'Organization not found' };
      
      const factions = DataService.getFactionsForOrganization(organizationId);
      const narratives = DataService.getNarrativesForOrganization(organizationId);
      const docs = DataService.getDocumentsForOrganization(organizationId);
      
      return {
        id: org.id,
        name: org.name,
        type: org.type,
        description: org.description,
        affiliatedFactions: factions.map(f => ({ id: f.id, name: f.name })),
        narrativeCount: narratives.length,
        narratives: narratives.slice(0, 5).map(n => ({ id: n.id, title: n.text })),
        recentMentions: docs.slice(0, 5).map(d => ({ id: d.id, title: d.title, date: d.publishedDate }))
      };
    },

    get_related_entities: ({ narrativeId, factionId }) => {
      if (narrativeId) {
        return {
          people: DataService.getPersonsForNarrative(narrativeId).map(p => ({ id: p.id, name: p.name, role: p.role })),
          organizations: DataService.getOrganizationsForNarrative(narrativeId).map(o => ({ id: o.id, name: o.name, type: o.type })),
          locations: DataService.getLocationsForNarrative(narrativeId).map(l => ({ id: l.id, name: l.name, type: l.type }))
        };
      }
      if (factionId) {
        return {
          people: DataService.getPersonsForFaction(factionId).map(p => ({ id: p.id, name: p.name, role: p.role })),
          organizations: DataService.getOrganizationsForFaction(factionId).map(o => ({ id: o.id, name: o.name, type: o.type }))
        };
      }
      return { error: 'Provide narrativeId or factionId' };
    },

    compare_factions: ({ factionId1, factionId2 }) => {
      const f1 = DataService.getFaction(factionId1);
      const f2 = DataService.getFaction(factionId2);
      
      if (!f1 || !f2) return { error: 'One or both factions not found' };
      
      const n1 = DataService.getNarrativesForFaction(factionId1);
      const n2 = DataService.getNarrativesForFaction(factionId2);
      
      // Find shared narratives
      const n1Ids = new Set(n1.map(n => n.id));
      const sharedNarratives = n2.filter(n => n1Ids.has(n.id));
      
      return {
        faction1: {
          id: f1.id,
          name: f1.name,
          description: f1.description,
          narrativeCount: n1.length,
          topNarratives: n1.slice(0, 3).map(n => n.text)
        },
        faction2: {
          id: f2.id,
          name: f2.name,
          description: f2.description,
          narrativeCount: n2.length,
          topNarratives: n2.slice(0, 3).map(n => n.text)
        },
        sharedNarratives: sharedNarratives.map(n => ({ id: n.id, title: n.text })),
        sharedNarrativeCount: sharedNarratives.length
      };
    },

    get_volume_trends: ({ narrativeId, themeId, factionId }) => {
      if (narrativeId) {
        const volumeData = DataService.getVolumeOverTimeForNarrative(narrativeId);
        return { entityType: 'narrative', entityId: narrativeId, volumeOverTime: volumeData };
      }
      if (themeId) {
        const volumeData = DataService.getVolumeOverTimeForTheme(themeId);
        return { entityType: 'theme', entityId: themeId, volumeOverTime: volumeData };
      }
      if (factionId) {
        // Get all docs for this faction and group by date
        const docs = DataService.getDocuments().filter(d => d.factionMentions?.[factionId]);
        const byDate = {};
        docs.forEach(d => {
          const date = d.publishedDate?.split('T')[0];
          if (date) {
            byDate[date] = (byDate[date] || 0) + 1;
          }
        });
        const volumeData = Object.entries(byDate)
          .map(([date, count]) => ({ date, volume: count }))
          .sort((a, b) => a.date.localeCompare(b.date));
        return { entityType: 'faction', entityId: factionId, volumeOverTime: volumeData };
      }
      return { error: 'Provide narrativeId, themeId, or factionId' };
    },

    list_all_narratives: () => {
      const narratives = DataService.getNarratives();
      return narratives.map(n => ({
        id: n.id,
        title: n.text,
        sentiment: n.sentiment,
        themeCount: DataService.getThemesForNarrative(n.id).length
      }));
    },

    list_all_factions: () => {
      const factions = DataService.getFactions();
      return factions.map(f => ({
        id: f.id,
        name: f.name,
        description: f.description?.substring(0, 100)
      }));
    }
  };
}

/**
 * Build context object for the current page
 */
function buildPageContext(route, id) {
  const context = { route, entityId: id };
  
  switch (route) {
    case 'dashboard':
      context.description = 'User is on the main dashboard viewing an overview of all narratives';
      context.narrativeCount = DataService.getNarratives().length;
      context.factionCount = DataService.getFactions().length;
      break;
      
    case 'narrative':
      if (id) {
        const narrative = DataService.getNarrative(id);
        if (narrative) {
          context.description = `User is viewing narrative: "${narrative.text}"`;
          context.narrative = {
            id: narrative.id,
            title: narrative.text,
            sentiment: narrative.sentiment,
            description: narrative.description
          };
        }
      }
      break;
      
    case 'theme':
      if (id) {
        const theme = DataService.getTheme(id);
        if (theme) {
          const parent = DataService.getNarrative(theme.parentNarrativeId);
          context.description = `User is viewing theme: "${theme.text}"`;
          context.theme = { id: theme.id, title: theme.text };
          context.parentNarrative = parent ? { id: parent.id, title: parent.text } : null;
        }
      }
      break;
      
    case 'faction':
      if (id) {
        const faction = DataService.getFaction(id);
        if (faction) {
          context.description = `User is viewing faction: "${faction.name}"`;
          context.faction = { id: faction.id, name: faction.name, description: faction.description };
        }
      }
      break;
      
    case 'event':
      if (id) {
        const event = DataService.getEvent(id);
        if (event) {
          context.description = `User is viewing event: "${event.name}"`;
          context.event = { 
            id: event.id, 
            name: event.name, 
            date: event.date,
            description: event.description,
            type: event.type
          };
          // Include document count for context
          const docs = DataService.getDocumentsForEvent(id);
          context.documentCount = docs.length;
          context.documents = docs.slice(0, 5).map(d => ({
            id: d.id,
            title: d.title,
            excerpt: d.excerpt?.substring(0, 150)
          }));
        }
      }
      break;
      
    case 'person':
      if (id) {
        const person = DataService.getPerson(id);
        if (person) {
          context.description = `User is viewing person: "${person.name}"`;
          context.person = { id: person.id, name: person.name, role: person.role };
        }
      }
      break;
      
    case 'organization':
      if (id) {
        const org = DataService.getOrganization(id);
        if (org) {
          context.description = `User is viewing organization: "${org.name}"`;
          context.organization = { id: org.id, name: org.name, type: org.type };
        }
      }
      break;
      
    case 'document':
      if (id) {
        const doc = DataService.getDocumentById(id);
        if (doc) {
          context.description = `User is viewing document: "${doc.title}"`;
          context.document = {
            id: doc.id,
            title: doc.title,
            excerpt: doc.excerpt,
            publishedDate: doc.publishedDate,
            type: doc.documentType
          };
        }
      }
      break;
      
    default:
      context.description = `User is on the ${route} page`;
  }
  
  return context;
}

// ============================================
// ChatService Class
// ============================================

const SYSTEM_PROMPT = `You are an intelligence analyst with the goal of synthesizing the trends across the data you're presented with in order to see the big picture and make policy recommendations. Your role is to help users understand:

- Narratives and themes being tracked, and which factions, people, and organizations are central to those narratives.
- Relationships between people, organizations, and narratives
- Which documents inform these relationships.
- Trends and patterns over time.

Guidelines:
1. Start by getting the current page context to understand what the user is viewing
2. Use the provided functions to retrieve specific data before answering
3. Cite specific documents, entities, or data points when making claims.
4. Start with the bottom line up front. Be concise but thorough, focusing on analysis at the top before showing evidence.
5. Assume the end user is well informed about the data you're presenting, and don't insult their intelligence.

Remember: You're helping an analyst understand complex information networks. Focus on clarity and actionable intelligence.`;

export class ChatService {
  constructor(router) {
    this.router = router;
    this.functionHandlers = createFunctionHandlers(router);
    this.conversationHistory = [];
    this.maxHistoryLength = 20; // Keep last 20 messages for context
  }

  /**
   * Get the API key (build-injected key takes priority over localStorage)
   */
  static getApiKey() {
    // First check for build-injected key from config
    if (hasInjectedApiKey()) {
      return OPENAI_API_KEY;
    }
    // Fall back to localStorage for local development
    return localStorage.getItem('openai_api_key');
  }

  /**
   * Check if using a build-injected API key
   */
  static isUsingInjectedKey() {
    return hasInjectedApiKey();
  }

  /**
   * Set the API key (only affects localStorage, not build-injected key)
   */
  static setApiKey(key) {
    if (key) {
      localStorage.setItem('openai_api_key', key);
    } else {
      localStorage.removeItem('openai_api_key');
    }
  }

  /**
   * Check if API key is configured (either injected or localStorage)
   */
  static hasApiKey() {
    const key = ChatService.getApiKey();
    return key && key.startsWith('sk-');
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
  }

  /**
   * Get current conversation history
   * @returns {Array} Array of message objects
   */
  getHistory() {
    return [...this.conversationHistory];
  }

  /**
   * Set conversation history (for restoring from storage)
   * @param {Array} history - Array of message objects
   */
  setHistory(history) {
    if (Array.isArray(history)) {
      this.conversationHistory = history.slice(-this.maxHistoryLength);
    }
  }

  /**
   * Save conversation history to sessionStorage for a context
   * @param {string} contextKey - The context key (e.g., "workspace-workspace-001")
   */
  saveHistoryToStorage(contextKey) {
    if (contextKey && this.conversationHistory.length > 0) {
      sessionStorage.setItem(`chat_history_${contextKey}`, JSON.stringify(this.conversationHistory));
    }
  }

  /**
   * Load conversation history from sessionStorage for a context
   * @param {string} contextKey - The context key
   * @returns {boolean} Whether history was restored
   */
  loadHistoryFromStorage(contextKey) {
    if (!contextKey) return false;
    
    const stored = sessionStorage.getItem(`chat_history_${contextKey}`);
    if (stored) {
      try {
        const history = JSON.parse(stored);
        this.setHistory(history);
        return true;
      } catch (e) {
        console.error('Failed to parse stored chat history:', e);
      }
    }
    return false;
  }

  /**
   * Clear stored history for a context
   * @param {string} contextKey - The context key
   */
  clearStoredHistory(contextKey) {
    if (contextKey) {
      sessionStorage.removeItem(`chat_history_${contextKey}`);
    }
  }

  /**
   * Build rich context for the current page
   * @returns {string} Formatted context string
   */
  buildContextString() {
    const { route, id } = this.router.getCurrentRoute();
    const context = buildPageContext(route, id);
    
    let contextStr = `## Current Page\n${context.description || `Viewing: ${route}`}\n\n`;
    
    // Add detailed context based on route type
    if (route === 'narrative' && id) {
      const narrative = DataService.getNarrative(id);
      if (narrative) {
        contextStr += `## Narrative Details\n`;
        contextStr += `- Title: ${narrative.text}\n`;
        contextStr += `- Sentiment: ${narrative.sentiment} (${narrative.sentiment > 0 ? 'positive/favorable' : narrative.sentiment < 0 ? 'negative/critical' : 'neutral'})\n`;
        if (narrative.description) contextStr += `- Description: ${narrative.description}\n`;
        
        const themes = DataService.getThemesForNarrative(id);
        if (themes.length > 0) {
          contextStr += `\n## Themes (${themes.length})\n`;
          themes.slice(0, 5).forEach(t => {
            contextStr += `- ${t.text} (sentiment: ${t.sentiment})\n`;
          });
        }
        
        const docs = DataService.getDocumentsForNarrative(id);
        if (docs.length > 0) {
          contextStr += `\n## Recent Documents (${docs.length} total)\n`;
          docs.slice(0, 5).forEach(d => {
            contextStr += `- "${d.title}" (${d.publishedDate?.split('T')[0] || 'no date'})\n`;
            if (d.excerpt) contextStr += `  Excerpt: ${d.excerpt.substring(0, 150)}...\n`;
          });
        }
        
        const factionMentions = DataService.getAggregateFactionMentionsForNarrative(id);
        if (Object.keys(factionMentions).length > 0) {
          contextStr += `\n## Faction Engagement\n`;
          for (const [factionId, data] of Object.entries(factionMentions)) {
            const faction = DataService.getFaction(factionId);
            contextStr += `- ${faction?.name || factionId}: ${data.volume} mentions, sentiment ${data.sentiment}\n`;
          }
        }
      }
    } else if (route === 'person' && id) {
      const person = DataService.getPerson(id);
      if (person) {
        contextStr += `## Person Details\n`;
        contextStr += `- Name: ${person.name}\n`;
        if (person.role) contextStr += `- Role: ${person.role}\n`;
        if (person.type) contextStr += `- Type: ${person.type}\n`;
        if (person.description) contextStr += `- Description: ${person.description}\n`;
        
        const factions = DataService.getFactionsForPerson(id);
        if (factions.length > 0) {
          contextStr += `\n## Affiliated Factions\n`;
          factions.forEach(f => contextStr += `- ${f.name}\n`);
        }
        
        const narratives = DataService.getNarrativesForPerson(id);
        if (narratives.length > 0) {
          contextStr += `\n## Appears in Narratives (${narratives.length})\n`;
          narratives.slice(0, 5).forEach(n => contextStr += `- ${n.text}\n`);
        }
      }
    } else if (route === 'faction' && id) {
      const faction = DataService.getFaction(id);
      if (faction) {
        contextStr += `## Faction Details\n`;
        contextStr += `- Name: ${faction.name}\n`;
        if (faction.description) contextStr += `- Description: ${faction.description}\n`;
        
        const narratives = DataService.getNarrativesForFaction(id);
        if (narratives.length > 0) {
          contextStr += `\n## Active Narratives (${narratives.length})\n`;
          narratives.slice(0, 5).forEach(n => {
            contextStr += `- ${n.text} (sentiment: ${n.sentiment})\n`;
          });
        }
        
        const people = DataService.getPersonsForFaction(id);
        if (people.length > 0) {
          contextStr += `\n## Affiliated People (${people.length})\n`;
          people.slice(0, 5).forEach(p => contextStr += `- ${p.name}${p.role ? ` (${p.role})` : ''}\n`);
        }
      }
    } else if (route === 'document' && id) {
      const doc = DataService.getDocumentById(id);
      if (doc) {
        contextStr += `## Document Details\n`;
        contextStr += `- Title: ${doc.title}\n`;
        contextStr += `- Type: ${doc.documentType}\n`;
        contextStr += `- Date: ${doc.publishedDate}\n`;
        if (doc.excerpt) contextStr += `- Excerpt: ${doc.excerpt}\n`;
        
        const publisher = DataService.getPublisher(doc.publisherId);
        if (publisher) contextStr += `- Source: ${publisher.name}\n`;
      }
    } else if (route === 'dashboard' || route === 'monitor') {
      // Provide overview data
      const narratives = DataService.getNarratives();
      const factions = DataService.getFactions();
      
      contextStr += `## Dashboard Overview\n`;
      contextStr += `- Total Narratives: ${narratives.length}\n`;
      contextStr += `- Total Factions: ${factions.length}\n`;
      
      if (narratives.length > 0) {
        contextStr += `\n## Top Narratives\n`;
        narratives.slice(0, 5).forEach(n => {
          contextStr += `- ${n.text} (sentiment: ${n.sentiment})\n`;
        });
      }
    }
    
    return contextStr;
  }

  /**
   * Send a message and get a response
   * @param {string} userMessage - The user's message
   * @param {function} onToolCall - Optional callback when a tool is called (for UI feedback)
   * @returns {Promise<string>} The assistant's response
   */
  async sendMessage(userMessage, onToolCall = null) {
    const apiKey = ChatService.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please add your API key in Settings.');
    }

    // Add user message to history
    this.conversationHistory.push({ role: 'user', content: userMessage });
    
    // Trim history if too long
    if (this.conversationHistory.length > this.maxHistoryLength) {
      this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
    }

    // Build messages array with system prompt
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...this.conversationHistory
    ];

    try {
      // OpenAI may need multiple rounds of function calls
      let response;
      let iterations = 0;
      const maxIterations = 3; // Limit to 3 API calls max

      while (iterations < maxIterations) {
        iterations++;
        
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages,
            tools,
            tool_choice: 'auto',
            temperature: 0.7
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || 'OpenAI API request failed');
        }

        const data = await response.json();
        const assistantMessage = data.choices[0].message;
        
        // Add assistant response to messages for potential next iteration
        messages.push(assistantMessage);

        // If no tool calls, we have the final answer
        if (!assistantMessage.tool_calls || assistantMessage.tool_calls.length === 0) {
          // Add to conversation history
          this.conversationHistory.push({ role: 'assistant', content: assistantMessage.content });
          return assistantMessage.content;
        }

        // Execute each function call
        for (const toolCall of assistantMessage.tool_calls) {
          const fnName = toolCall.function.name;
          const handler = this.functionHandlers[fnName];
          
          let result;
          if (handler) {
            try {
              const args = JSON.parse(toolCall.function.arguments || '{}');
              
              // Notify UI about tool call if callback provided
              if (onToolCall) {
                onToolCall(fnName, args);
              }
              
              result = handler(args);
            } catch (e) {
              console.error(`Error executing function ${fnName}:`, e);
              result = { error: `Function execution failed: ${e.message}` };
            }
          } else {
            result = { error: `Unknown function: ${fnName}` };
          }

          // Add function result to messages
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(result)
          });
        }
      }

      // If we hit max iterations, return whatever we have
      const lastAssistant = messages.filter(m => m.role === 'assistant').pop();
      if (lastAssistant?.content) {
        this.conversationHistory.push({ role: 'assistant', content: lastAssistant.content });
        return lastAssistant.content;
      }
      
      throw new Error('Could not get a response after max iterations');
    } catch (error) {
      // Remove failed user message from history
      this.conversationHistory.pop();
      throw error;
    }
  }

  /**
   * Generate a page summary without adding to conversation history
   * Used for automatic navigation summaries that shouldn't pollute the chat history
   * @param {string} instruction - The instruction/prompt for what to summarize
   * @returns {Promise<string>} The summary response
   */
  async generateSummaryOnly(instruction) {
    const apiKey = ChatService.getApiKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not configured.');
    }

    // Build context for current page
    const contextString = this.buildContextString();
    
    const systemPrompt = `You are an intelligence analyst assistant. Based on the current page context, provide a brief summary as requested.

${contextString}

Guidelines:
- Be concise (2-3 sentences max)
- Focus on key insights and actionable information
- Don't ask follow-up questions
- Don't mention that you're an AI or reference the prompt`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: instruction }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Summary generation failed:', error);
      throw error;
    }
  }

  /**
   * Generate AI-powered suggested questions based on entity context
   * Uses gpt-3.5-turbo for speed and cost efficiency
   * @param {Object} context - Entity context with type, name, and available data
   * @returns {Promise<string[]>} Array of 3 suggested questions
   */
  async generateSuggestedQuestions(context) {
    const apiKey = ChatService.getApiKey();
    if (!apiKey) {
      throw new Error('No API key configured');
    }

    const prompt = this.buildQuestionPrompt(context);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You generate exactly 3 short, specific questions a user might want to ask about the data they are viewing. Each question should be on its own line. Questions should be concise (under 12 words) and actionable. Do not number them or add any other text.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the response into an array of questions
      const questions = content
        .split('\n')
        .map(q => q.trim())
        .filter(q => q.length > 0 && q.endsWith('?'))
        .slice(0, 3);
      
      // Ensure we have exactly 3 questions
      if (questions.length < 3) {
        throw new Error('Not enough questions generated');
      }
      
      return questions;
    } catch (error) {
      console.error('Failed to generate suggested questions:', error);
      throw error;
    }
  }

  /**
   * Build the prompt for generating suggested questions
   */
  buildQuestionPrompt(context) {
    let prompt = `The user is viewing a ${context.type}`;
    
    if (context.name) {
      prompt += ` called "${context.name}"`;
    }
    prompt += '.\n\n';
    
    prompt += 'Available data:\n';
    
    if (context.description) {
      prompt += `- Description: ${context.description.substring(0, 100)}...\n`;
    }
    if (context.themeCount > 0) {
      prompt += `- ${context.themeCount} themes\n`;
    }
    if (context.factionCount > 0) {
      prompt += `- ${context.factionCount} factions engaged\n`;
    }
    if (context.documentCount > 0) {
      prompt += `- ${context.documentCount} related documents\n`;
    }
    if (context.narrativeCount > 0) {
      prompt += `- Appears in ${context.narrativeCount} narratives\n`;
    }
    if (context.personCount > 0) {
      prompt += `- ${context.personCount} people mentioned\n`;
    }
    if (context.orgCount > 0) {
      prompt += `- ${context.orgCount} organizations mentioned\n`;
    }
    if (context.sentiment !== undefined) {
      const sentimentLabel = context.sentiment > 0.2 ? 'positive' : context.sentiment < -0.2 ? 'negative' : 'neutral';
      prompt += `- Overall sentiment: ${sentimentLabel} (${context.sentiment.toFixed(2)})\n`;
    }
    if (context.hasRecentActivity) {
      prompt += `- Has recent activity (documents in last 7 days)\n`;
    }
    if (context.affiliatedFactions?.length > 0) {
      prompt += `- Affiliated with factions: ${context.affiliatedFactions.join(', ')}\n`;
    }
    
    prompt += '\nGenerate 3 specific questions the user might want to ask about this data.';
    
    return prompt;
  }
}
