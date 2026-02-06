/**
 * PersonView.js
 * Detail view for a person - now a thin wrapper around EntityDetailView
 */

import { EntityDetailView } from './EntityDetailView.js';

export class PersonView extends EntityDetailView {
  constructor(container, personId, options = {}) {
    super(container, personId, 'person', options);
    this.personId = personId; // Alias for backwards compatibility
  }
}

export default PersonView;
