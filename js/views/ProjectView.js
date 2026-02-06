/**
 * ProjectView.js
 * Stub page for a single project (full functionality removed)
 */

import { BaseView } from './BaseView.js';
import { PageHeader } from '../utils/PageHeader.js';

export class ProjectView extends BaseView {
  constructor(container, projectId, options = {}) {
    super(container, options);
    this.projectId = projectId;
  }

  async render() {
    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Monitors', href: '#/monitors' },
        { label: 'Projects', href: '#/projects' },
        'Project'
      ],
      title: 'Project',
      subtitle: '',
      description: 'Project detail is not available in this demo.'
    });

    this.container.innerHTML = `
      ${headerHtml}
      <div class="content-area">
        <div class="card">
          <div class="card-body">
            <p class="text-muted">This is a placeholder. Projects are not available in this demo.</p>
            <a href="#/projects" class="btn btn-secondary">Back to Projects</a>
          </div>
        </div>
      </div>
    `;
  }
}

export default ProjectView;
