/**
 * volumeDataUtils.js
 * Shared utilities for aggregating document volume data by publisher
 * 
 * NOTE: Most views now use DataService.getVolumeDataForDocuments() instead of these utilities.
 * aggregatePublisherSentiment is still used for sentiment calculations.
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
 * Aggregate publisher sentiment data from documents
 * @param {Array} documents - Array of document objects with publisherId
 * @returns {Array} - Array of publisher objects with sentiment property
 */
export function aggregatePublisherSentiment(documents) {
  if (!documents || documents.length === 0) return [];

  const publisherMap = new Map();
  
  documents.forEach(doc => {
    if (!doc.publisherId) return;
    if (!publisherMap.has(doc.publisherId)) {
      publisherMap.set(doc.publisherId, { volume: 0, sentimentSum: 0, count: 0 });
    }
    const data = publisherMap.get(doc.publisherId);
    data.volume += 1;
    if (doc.sentiment !== undefined) {
      data.sentimentSum += doc.sentiment;
      data.count += 1;
    }
  });

  const publishers = DataService.getPublishers ? DataService.getPublishers() : [];
  
  return [...publisherMap.entries()]
    .map(([publisherId, data]) => {
      const publisher = publishers.find(p => p.id === publisherId);
      if (!publisher) return null;
      return {
        ...publisher,
        volume: data.volume,
        sentiment: data.count > 0 ? data.sentimentSum / data.count : 0
      };
    })
    .filter(Boolean);
}
