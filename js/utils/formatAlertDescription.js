import { DataService } from '../data/DataService.js';

/**
 * Format alert descriptions with entity links.
 * Links events, narratives, persons, organizations, and locations
 * when their text/name appears in the description.
 */
export function formatAlertDescriptionWithLinks(alert, DataServiceRef) {
  let description = alert.description || '';
  const DS = DataServiceRef || DataService;
  
  const entityReplacements = [];
  
  if (alert.relatedEventIds && alert.relatedEventIds.length > 0) {
    alert.relatedEventIds.forEach(id => {
      const event = DS.getEvent(id);
      if (event && event.text) {
        entityReplacements.push({
          name: event.text,
          link: `<a href="#/event/${id}">${event.text}</a>`
        });
      }
    });
  }
  
  if (alert.relatedNarrativeIds && alert.relatedNarrativeIds.length > 0) {
    alert.relatedNarrativeIds.forEach(id => {
      const narrative = DS.getNarrative(id);
      if (narrative && narrative.text) {
        entityReplacements.push({
          name: narrative.text,
          link: `<a href="#/narrative/${id}">${narrative.text}</a>`
        });
      }
    });
  }
  
  if (alert.relatedPersonIds && alert.relatedPersonIds.length > 0) {
    alert.relatedPersonIds.forEach(id => {
      const person = DS.getPerson(id);
      if (person) {
        entityReplacements.push({
          name: person.name,
          link: `<a href="#/person/${id}">${person.name}</a>`
        });
      }
    });
  }
  
  if (alert.relatedOrganizationIds && alert.relatedOrganizationIds.length > 0) {
    alert.relatedOrganizationIds.forEach(id => {
      const org = DS.getOrganization(id);
      if (org) {
        entityReplacements.push({
          name: org.name,
          link: `<a href="#/organization/${id}">${org.name}</a>`
        });
      }
    });
  }
  
  if (alert.relatedLocationIds && alert.relatedLocationIds.length > 0) {
    alert.relatedLocationIds.forEach(id => {
      const location = DS.getLocation(id);
      if (location) {
        entityReplacements.push({
          name: location.name,
          link: `<a href="#/location/${id}">${location.name}</a>`
        });
      }
    });
  }
  
  entityReplacements.sort((a, b) => b.name.length - a.name.length);
  
  entityReplacements.forEach(({ name, link }) => {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedName, 'gi');
    description = description.replace(regex, link);
  });
  
  return description;
}
