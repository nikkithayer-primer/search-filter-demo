/**
 * ProjectsView.js
 * List view for manually curated document collections
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { CollectionList } from '../components/CollectionList.js';
import { dataStore } from '../data/DataStore.js';

export class ProjectsView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
    this.collectionList = null;
  }

  async render() {
    const projects = DataService.getProjects();

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Common Operating Picture', href: '#/cop' },
        'Projects'
      ],
      title: 'Projects',
      subtitle: `${projects.length} project${projects.length !== 1 ? 's' : ''}`,
      description: 'Curated document collections for research and reporting',
      actions: '<button class="btn btn-small btn-primary" id="create-project-btn" disabled title="Coming soon">+ New Project</button>'
    });

    this.container.innerHTML = `
      ${headerHtml}
      
      <div class="content-area">
        <div class="card">
          <div class="card-body no-padding" id="projects-list-container"></div>
        </div>
      </div>
    `;

    // Initialize the collection list component
    this.collectionList = new CollectionList('projects-list-container', {
      collectionType: 'project',
      createDisabled: true,
      onItemClick: (projectId) => {
        window.location.hash = `#/${projectId}/`;
      },
      onEdit: (projectId) => {
        // Edit modal not yet implemented
      },
      onArchive: (projectId) => {
        this.handleArchiveProject(projectId);
      },
      onCreate: () => {
        // Create modal not yet implemented
      }
    });

    // Update the list with projects data
    this.collectionList.update({ items: projects });

    // Set up header button handler
    this.setupHeaderHandlers();
  }

  /**
   * Set up header button handlers
   */
  setupHeaderHandlers() {
    // Create project button in header (disabled for now)
    const createBtn = this.container.querySelector('#create-project-btn');
    if (createBtn) {
      this.addListener(createBtn, 'click', () => {
        // Create project modal not yet implemented
      });
    }
  }

  /**
   * Handle archive/restore project action
   * @param {string} projectId - Project ID to archive/restore
   */
  handleArchiveProject(projectId) {
    const project = DataService.getProject(projectId);
    if (project) {
      const newStatus = project.status === 'archived' ? 'active' : 'archived';
      // Update project status
      const projects = dataStore.data.projects || [];
      const projectIndex = projects.findIndex(p => p.id === projectId);
      if (projectIndex !== -1) {
        projects[projectIndex] = { 
          ...projects[projectIndex], 
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
        dataStore.save();
      }
      this.render();
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    if (this.collectionList) {
      this.collectionList.destroy();
      this.collectionList = null;
    }
    super.destroy();
  }
}

export default ProjectsView;
