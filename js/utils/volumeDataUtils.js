/**
 * volumeDataUtils.js
 * Shared utilities for aggregating document volume data by publisher and faction
 * 
 * NOTE: Most views now use DataService.getVolumeDataForDocuments() instead of these utilities.
 * aggregateFactionSentiment is still used for sentiment calculations.
 */

import { DataService } from '../data/DataService.js';

/**
 * @deprecated Use DataService.getVolumeDataForDocuments(docIds).byPublisher instead
 * Aggregate documents by publisher to build volume chart data
 * @param {Array} documents - Array of document objects with publishedDate and publisherId
 * @returns {Object|null} - { dates, series, publishers } or null if no data
 */
export function aggregatePublisherVolumeData(documents) {
  if (!documents || documents.length === 0) return null;

  const publishers = DataService.getPublishers ? DataService.getPublishers() : [];
  const dateMap = new Map();
  const publisherIds = new Set();
  
  documents.forEach(doc => {
    if (!doc.publishedDate) return;
    const date = doc.publishedDate.split('T')[0];
    if (!dateMap.has(date)) {
      dateMap.set(date, {});
    }
    if (doc.publisherId) {
      publisherIds.add(doc.publisherId);
      const dayData = dateMap.get(date);
      dayData[doc.publisherId] = (dayData[doc.publisherId] || 0) + 1;
    }
  });

  const dates = [...dateMap.keys()].sort();
  if (dates.length === 0) return null;

  const relevantPublishers = [...publisherIds]
    .map(id => publishers.find(p => p.id === id))
    .filter(Boolean);
  
  const series = relevantPublishers.map(publisher =>
    dates.map(date => (dateMap.get(date) || {})[publisher.id] || 0)
  );

  return { dates, series, publishers: relevantPublishers };
}

/**
 * @deprecated Use DataService.getVolumeDataForDocuments(docIds).byFaction instead
 * Aggregate documents by faction to build volume chart data
 * @param {Array} documents - Array of document objects with publishedDate and factionMentions
 * @returns {Object|null} - { dates, series, factions } or null if no data
 */
export function aggregateFactionVolumeData(documents) {
  if (!documents || documents.length === 0) return null;

  const factionDateMap = new Map();
  const factionIds = new Set();
  
  documents.forEach(doc => {
    if (!doc.publishedDate || !doc.factionMentions) return;
    const date = doc.publishedDate.split('T')[0];
    if (!factionDateMap.has(date)) {
      factionDateMap.set(date, {});
    }
    Object.keys(doc.factionMentions).forEach(factionId => {
      factionIds.add(factionId);
      const dayData = factionDateMap.get(date);
      dayData[factionId] = (dayData[factionId] || 0) + 1;
    });
  });

  const dates = [...factionDateMap.keys()].sort();
  if (dates.length === 0) return null;

  const relevantFactions = [...factionIds]
    .map(id => DataService.getFaction(id))
    .filter(Boolean);
  
  const series = relevantFactions.map(faction =>
    dates.map(date => (factionDateMap.get(date) || {})[faction.id] || 0)
  );

  return { dates, series, factions: relevantFactions };
}

/**
 * Aggregate faction sentiment data from documents
 * @param {Array} documents - Array of document objects with factionMentions
 * @returns {Array} - Array of faction objects with sentiment property
 */
export function aggregateFactionSentiment(documents) {
  if (!documents || documents.length === 0) return [];

  const factionMap = new Map();
  
  documents.forEach(doc => {
    Object.entries(doc.factionMentions || {}).forEach(([factionId, mention]) => {
      if (!factionMap.has(factionId)) {
        factionMap.set(factionId, { volume: 0, sentimentSum: 0, count: 0 });
      }
      const data = factionMap.get(factionId);
      data.volume += 1;
      if (mention.sentiment !== undefined) {
        data.sentimentSum += mention.sentiment;
        data.count += 1;
      }
    });
  });

  return [...factionMap.entries()]
    .map(([factionId, data]) => {
      const faction = DataService.getFaction(factionId);
      if (!faction) return null;
      return {
        ...faction,
        volume: data.volume,
        sentiment: data.count > 0 ? data.sentimentSum / data.count : 0
      };
    })
    .filter(Boolean);
}
