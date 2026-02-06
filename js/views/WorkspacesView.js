/**
 * WorkspacesView.js
 * List view for saved workspaces with search results and document collections
 */

import { BaseView } from './BaseView.js';
import { DataService } from '../data/DataService.js';
import { PageHeader } from '../utils/PageHeader.js';
import { CollectionList } from '../components/CollectionList.js';
import { getWorkspaceEditor } from '../components/WorkspaceEditorModal.js';
import { dataStore } from '../data/DataStore.js';

export class WorkspacesView extends BaseView {
  constructor(container, options = {}) {
    super(container, options);
    this.collectionList = null;
  }

  async render() {
    const workspaces = DataService.getWorkspaces();

    const headerHtml = PageHeader.render({
      breadcrumbs: [
        { label: 'Common Operating Picture', href: '#/cop' },
        'Workspaces'
      ],
      title: 'Workspaces',
      subtitle: `${workspaces.length} workspace${workspaces.length !== 1 ? 's' : ''}`,
      description: 'Saved search results with document collections',
      actions: '<button class="btn btn-small btn-primary" id="create-workspace-btn">+ New Workspace</button>'
    });

    this.container.innerHTML = `
      ${headerHtml}
      
      <div class="content-area">
        <div class="card">
          <div class="card-body no-padding" id="workspaces-list-container"></div>
        </div>
      </div>
    `;

    // Initialize the collection list component
    this.collectionList = new CollectionList('workspaces-list-container', {
      collectionType: 'workspace',
      onItemClick: (workspaceId) => {
        window.location.hash = `#/${workspaceId}/`;
      },
      onEdit: (workspaceId) => {
        this.handleEditWorkspace(workspaceId);
      },
      onArchive: (workspaceId) => {
        this.handleArchiveWorkspace(workspaceId);
      },
      onCreate: () => {
        this.handleCreateWorkspace();
      }
    });

    // Update the list with workspaces data
    this.collectionList.update({ items: workspaces });

    // Set up header button handler
    this.setupHeaderHandlers();
  }

  /**
   * Set up header button handlers
   */
  setupHeaderHandlers() {
    // Create workspace button in header
    const createBtn = this.container.querySelector('#create-workspace-btn');
    if (createBtn) {
      this.addListener(createBtn, 'click', () => {
        this.handleCreateWorkspace();
      });
    }
  }

  /**
   * Handle create workspace action
   */
  handleCreateWorkspace() {
    const editor = getWorkspaceEditor();
    editor.openCreate((newWorkspace) => {
      // Navigate to the new workspace
      window.location.hash = `#/${newWorkspace.id}/`;
    });
  }

  /**
   * Handle edit workspace action
   * @param {string} workspaceId - Workspace ID to edit
   */
  handleEditWorkspace(workspaceId) {
    const workspace = DataService.getWorkspace(workspaceId);
    if (workspace) {
      const editor = getWorkspaceEditor();
      editor.openEdit(workspace, () => {
        this.render();
      });
    }
  }

  /**
   * Handle archive/restore workspace action
   * @param {string} workspaceId - Workspace ID to archive/restore
   */
  handleArchiveWorkspace(workspaceId) {
    const workspace = DataService.getWorkspace(workspaceId);
    if (workspace) {
      const newStatus = workspace.status === 'archived' ? 'active' : 'archived';
      dataStore.updateWorkspace(workspaceId, { status: newStatus });
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

export default WorkspacesView;
