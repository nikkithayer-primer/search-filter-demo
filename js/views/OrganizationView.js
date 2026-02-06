/**
 * OrganizationView.js
 * Detail view for an organization - now a thin wrapper around EntityDetailView
 */

import { EntityDetailView } from './EntityDetailView.js';

export class OrganizationView extends EntityDetailView {
  constructor(container, organizationId, options = {}) {
    super(container, organizationId, 'organization', options);
    this.organizationId = organizationId; // Alias for backwards compatibility
  }
}

export default OrganizationView;
