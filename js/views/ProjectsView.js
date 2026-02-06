/**
 * ProjectsView.js
 * Stub page for Projects (full functionality removed)
 */

import { BaseView } from './BaseView.js';
import { PageHeader } from '../utils/PageHeader.js';

export class ProjectsView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
  }

  async render() {
    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Monitors', href: '#/monitors' },
        'Projects'
      ],
      title: 'Projects',
      subtitle: '',
      description: 'Projects are not available in this demo.'
    });

    this.container.innerHTML = `
      ${headerHtml}
      <div class="content-area">
        <div class="card">
          <div class="card-body">
            <p class="text-muted">This is a placeholder. Use Monitors or Search for the main workflows.</p>
            <a href="#/monitors" class="btn btn-secondary">Back to Monitors</a>
          </div>
        </div>
      </div>
    `;
  }
}

export default ProjectsView;
