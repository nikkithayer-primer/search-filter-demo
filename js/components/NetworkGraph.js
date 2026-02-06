/**
 * NetworkGraph.js
 * Force-directed network visualization for people and organizations
 * Links are derived from shared narratives and are clickable to view connecting narratives
 */

import { BaseComponent } from './BaseComponent.js';

export class NetworkGraph extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: 400,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      nodeRadius: 20,
      linkDistance: 120,
      chargeStrength: -400,
      ...options
    });
    this.simulation = null;
    this.tooltip = null;
    this._previousDimensions = null;
  }

  /**
   * Override resize to recenter nodes within new dimensions
   * NOTE: Height is only updated in fullscreen mode where CSS constrains dimensions
   * (prevents resize loops in normal mode where container height = content height)
   */
  resize() {
    if (this.container && this.data) {
      const oldWidth = this.options.width;
      const oldHeight = this.options.height;
      
      // Always update width from container
      const newWidth = this.container.clientWidth;
      this.options.width = newWidth;
      
      // Check if we're in fullscreen mode - if so, also update height
      // This is safe because fullscreen constrains dimensions via CSS (position: fixed)
      const card = this.container.closest('.card');
      const isFullscreen = card && card.classList.contains('card-fullscreen');
      
      let newHeight = oldHeight;
      if (isFullscreen) {
        const containerHeight = this.container.clientHeight;
        if (containerHeight > 0) {
          newHeight = containerHeight;
          this.options.height = newHeight;
        }
      }
      
      // Skip re-render if no dimension changes
      if (newWidth === oldWidth && newHeight === oldHeight) {
        return this;
      }
      
      // Recenter existing node positions proportionally
      if (this.data.nodes && oldWidth > 0 && oldHeight > 0) {
        const widthRatio = this.options.width / oldWidth;
        const heightRatio = this.options.height / oldHeight;
        const oldCenterX = oldWidth / 2;
        const oldCenterY = oldHeight / 2;
        const newCenterX = this.options.width / 2;
        const newCenterY = this.options.height / 2;
        
        this.data.nodes.forEach(node => {
          if (node.x !== undefined) {
            // Translate node x position relative to new center
            node.x = newCenterX + (node.x - oldCenterX) * widthRatio;
          }
          if (node.y !== undefined && isFullscreen) {
            // Translate node y position relative to new center (only in fullscreen)
            node.y = newCenterY + (node.y - oldCenterY) * heightRatio;
          }
        });
      }
      
      this.render();
    }
    return this;
  }

  render() {
    if (!this.data || !this.data.nodes || !this.data.nodes.length) {
      this.showEmptyState('No connections to display');
      return;
    }

    const { width, height, nodeRadius, linkDistance, chargeStrength } = this.options;
    const { nodes, links } = this.data;

    // Deep clone to avoid mutation, preserving narratives data
    const nodesCopy = nodes.map(n => ({ ...n }));
    const linksCopy = links.map(l => ({
      source: l.source,
      target: l.target,
      type: l.type,
      narratives: l.narratives || [],
      strength: l.strength || 1
    }));

    // Create tooltip if it doesn't exist
    this.createTooltip();

    const svg = this.createSvg();

    // Defs for markers and filters
    const defs = svg.append('defs');

    // Arrow marker
    defs.append('marker')
      .attr('id', `arrowhead-${this.containerId}`)
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 28)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .append('path')
      .attr('d', 'M 0,-5 L 10,0 L 0,5')
      .attr('fill', 'var(--border-color)');

    // Clip paths for circular images - create one for each node with an image
    nodesCopy.forEach((node, i) => {
      if (node.data && node.data.imageUrl) {
        defs.append('clipPath')
          .attr('id', `clip-${this.containerId}-${i}`)
          .append('circle')
          .attr('r', nodeRadius)
          .attr('cx', 0)
          .attr('cy', 0);
      }
    });

    // Stop existing simulation
    if (this.simulation) {
      this.simulation.stop();
    }

    // Create simulation
    this.simulation = d3.forceSimulation(nodesCopy)
      .force('link', d3.forceLink(linksCopy)
        .id(d => d.id)
        .distance(linkDistance))
      .force('charge', d3.forceManyBody().strength(chargeStrength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(nodeRadius + 10));

    // Draw links - now with variable width based on strength
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(linksCopy)
      .join('line')
      .attr('class', d => `link link-${d.type} ${d.narratives.length > 0 ? 'link-clickable' : ''}`)
      .attr('stroke', d => {
        if (d.type === 'person-person') return 'var(--accent-success)';
        if (d.type === 'org-org') return 'var(--accent-purple)';
        return 'var(--accent-primary)';
      })
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', d => Math.min(2 + d.strength, 6))
      .style('cursor', d => d.narratives.length > 0 ? 'pointer' : 'default');

    // Link hover effects
    link.on('mouseover', (event, d) => {
      if (d.narratives.length > 0) {
        d3.select(event.target)
          .attr('stroke-opacity', 0.9)
          .attr('stroke-width', d => Math.min(3 + d.strength, 8));
        
        this.showTooltip(event, d);
      }
    })
    .on('mouseout', (event, d) => {
      d3.select(event.target)
        .attr('stroke-opacity', 0.5)
        .attr('stroke-width', d => Math.min(2 + d.strength, 6));
      
      this.hideTooltip();
    })
    .on('click', (event, d) => {
      if (d.narratives.length > 0 && this.options.onLinkClick) {
        this.options.onLinkClick(d);
      }
    });

    // Draw nodes
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodesCopy)
      .join('g')
      .attr('class', d => `node node-${d.type}`)
      .call(this.drag(this.simulation));

    // Helper to check if node has a valid image
    const hasImage = d => d.data && d.data.imageUrl;
    const containerId = this.containerId;

    // Node main circle (background for nodes without images, or border for nodes with images)
    node.append('circle')
      .attr('r', nodeRadius)
      .attr('fill', d => hasImage(d) ? 'var(--bg-tertiary)' : (d.type === 'person' ? 'var(--accent-success)' : 'var(--accent-primary)'))
      .attr('stroke', d => hasImage(d) ? (d.type === 'person' ? 'var(--accent-success)' : 'var(--accent-primary)') : 'var(--bg-primary)')
      .attr('stroke-width', 3);

    // Add circular images for nodes that have imageUrl
    node.filter(d => hasImage(d)).each(function(d, i) {
      const nodeIndex = nodesCopy.indexOf(d);
      d3.select(this).append('image')
        .attr('xlink:href', d.data.imageUrl)
        .attr('x', -nodeRadius)
        .attr('y', -nodeRadius)
        .attr('width', nodeRadius * 2)
        .attr('height', nodeRadius * 2)
        .attr('clip-path', `url(#clip-${containerId}-${nodeIndex})`)
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .style('pointer-events', 'none');
    });

    // Node icon (SVG icons matching ListView.js) - only for nodes WITHOUT images
    const iconGroup = node.filter(d => !hasImage(d)).append('g')
      .attr('class', 'node-icon')
      .attr('transform', 'translate(-8, -8)')
      .style('pointer-events', 'none');

    // Person icon: head circle + body path
    iconGroup.filter(d => d.type === 'person').each(function() {
      const g = d3.select(this);
      g.append('circle')
        .attr('cx', 8)
        .attr('cy', 4)
        .attr('r', 2.5)
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 1.25);
      g.append('path')
        .attr('d', 'M3 14c0-3 2.2-5 5-5s5 2 5 5')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 1.25);
    });

    // Organization icon: building shape
    iconGroup.filter(d => d.type !== 'person').each(function() {
      const g = d3.select(this);
      // Window paths for left building
      const windowPaths = [
        'M2.75 2.5C2.61193 2.5 2.5 2.61193 2.5 2.75V3.25C2.5 3.38807 2.61193 3.5 2.75 3.5H3.25C3.38807 3.5 3.5 3.38807 3.5 3.25V2.75C3.5 2.61193 3.38807 2.5 3.25 2.5H2.75Z',
        'M4.5 2.75C4.5 2.61193 4.61193 2.5 4.75 2.5H5.25C5.38807 2.5 5.5 2.61193 5.5 2.75V3.25C5.5 3.38807 5.38807 3.5 5.25 3.5H4.75C4.61193 3.5 4.5 3.38807 4.5 3.25V2.75Z',
        'M2.75 4.5C2.61193 4.5 2.5 4.61193 2.5 4.75V5.25C2.5 5.38807 2.61193 5.5 2.75 5.5H3.25C3.38807 5.5 3.5 5.38807 3.5 5.25V4.75C3.5 4.61193 3.38807 4.5 3.25 4.5H2.75Z',
        'M2.5 6.75C2.5 6.61193 2.61193 6.5 2.75 6.5H3.25C3.38807 6.5 3.5 6.61193 3.5 6.75V7.25C3.5 7.38807 3.38807 7.5 3.25 7.5H2.75C2.61193 7.5 2.5 7.38807 2.5 7.25V6.75Z',
        'M2.75 8.5C2.61193 8.5 2.5 8.61193 2.5 8.75V9.25C2.5 9.38807 2.61193 9.5 2.75 9.5H3.25C3.38807 9.5 3.5 9.38807 3.5 9.25V8.75C3.5 8.61193 3.38807 8.5 3.25 8.5H2.75Z',
        'M2.5 10.75C2.5 10.6119 2.61193 10.5 2.75 10.5H3.25C3.38807 10.5 3.5 10.6119 3.5 10.75V11.25C3.5 11.3881 3.38807 11.5 3.25 11.5H2.75C2.61193 11.5 2.5 11.3881 2.5 11.25V10.75Z',
        'M4.75 4.5C4.61193 4.5 4.5 4.61193 4.5 4.75V5.25C4.5 5.38807 4.61193 5.5 4.75 5.5H5.25C5.38807 5.5 5.5 5.38807 5.5 5.25V4.75C5.5 4.61193 5.38807 4.5 5.25 4.5H4.75Z',
        'M4.5 6.75C4.5 6.61193 4.61193 6.5 4.75 6.5H5.25C5.38807 6.5 5.5 6.61193 5.5 6.75V7.25C5.5 7.38807 5.38807 7.5 5.25 7.5H4.75C4.61193 7.5 4.5 7.38807 4.5 7.25V6.75Z',
        'M4.75 8.5C4.61193 8.5 4.5 8.61193 4.5 8.75V9.25C4.5 9.38807 4.61193 9.5 4.75 9.5H5.25C5.38807 9.5 5.5 9.38807 5.5 9.25V8.75C5.5 8.61193 5.38807 8.5 5.25 8.5H4.75Z',
        'M4.5 10.75C4.5 10.6119 4.61193 10.5 4.75 10.5H5.25C5.38807 10.5 5.5 10.6119 5.5 10.75V11.25C5.5 11.3881 5.38807 11.5 5.25 11.5H4.75C4.61193 11.5 4.5 11.3881 4.5 11.25V10.75Z',
        'M6.75 2.5C6.61193 2.5 6.5 2.61193 6.5 2.75V3.25C6.5 3.38807 6.61193 3.5 6.75 3.5H7.25C7.38807 3.5 7.5 3.38807 7.5 3.25V2.75C7.5 2.61193 7.38807 2.5 7.25 2.5H6.75Z',
        'M6.5 4.75C6.5 4.61193 6.61193 4.5 6.75 4.5H7.25C7.38807 4.5 7.5 4.61193 7.5 4.75V5.25C7.5 5.38807 7.38807 5.5 7.25 5.5H6.75C6.61193 5.5 6.5 5.38807 6.5 5.25V4.75Z',
        'M6.75 6.5C6.61193 6.5 6.5 6.61193 6.5 6.75V7.25C6.5 7.38807 6.61193 7.5 6.75 7.5H7.25C7.38807 7.5 7.5 7.38807 7.5 7.25V6.75C7.5 6.61193 7.38807 6.5 7.25 6.5H6.75Z',
        'M6.5 8.75C6.5 8.61193 6.61193 8.5 6.75 8.5H7.25C7.38807 8.5 7.5 8.61193 7.5 8.75V9.25C7.5 9.38807 7.38807 9.5 7.25 9.5H6.75C6.61193 9.5 6.5 9.38807 6.5 9.25V8.75Z',
        'M6.75 10.5C6.61193 10.5 6.5 10.6119 6.5 10.75V11.25C6.5 11.3881 6.61193 11.5 6.75 11.5H7.25C7.38807 11.5 7.5 11.3881 7.5 11.25V10.75C7.5 10.6119 7.38807 10.5 7.25 10.5H6.75Z',
        // Window paths for right building
        'M11.25 6.5C11.1119 6.5 11 6.61193 11 6.75V7.25C11 7.38807 11.1119 7.5 11.25 7.5H11.75C11.8881 7.5 12 7.38807 12 7.25V6.75C12 6.61193 11.8881 6.5 11.75 6.5H11.25Z',
        'M11 8.75C11 8.61193 11.1119 8.5 11.25 8.5H11.75C11.8881 8.5 12 8.61193 12 8.75V9.25C12 9.38807 11.8881 9.5 11.75 9.5H11.25C11.1119 9.5 11 9.38807 11 9.25V8.75Z',
        'M11.25 10.5C11.1119 10.5 11 10.6119 11 10.75V11.25C11 11.3881 11.1119 11.5 11.25 11.5H11.75C11.8881 11.5 12 11.3881 12 11.25V10.75C12 10.6119 11.8881 10.5 11.75 10.5H11.25Z',
        'M11 12.75C11 12.6119 11.1119 12.5 11.25 12.5H11.75C11.8881 12.5 12 12.6119 12 12.75V13.25C12 13.3881 11.8881 13.5 11.75 13.5H11.25C11.1119 13.5 11 13.3881 11 13.25V12.75Z',
        'M13.25 6.5C13.1119 6.5 13 6.61193 13 6.75V7.25C13 7.38807 13.1119 7.5 13.25 7.5H13.75C13.8881 7.5 14 7.38807 14 7.25V6.75C14 6.61193 13.8881 6.5 13.75 6.5H13.25Z',
        'M13 8.75C13 8.61193 13.1119 8.5 13.25 8.5H13.75C13.8881 8.5 14 8.61193 14 8.75V9.25C14 9.38807 13.8881 9.5 13.75 9.5H13.25C13.1119 9.5 13 9.38807 13 9.25V8.75Z',
        'M13.25 10.5C13.1119 10.5 13 10.6119 13 10.75V11.25C13 11.3881 13.1119 11.5 13.25 11.5H13.75C13.8881 11.5 14 11.3881 14 11.25V10.75C14 10.6119 13.8881 10.5 13.75 10.5H13.25Z',
        'M13 12.75C13 12.6119 13.1119 12.5 13.25 12.5H13.75C13.8881 12.5 14 12.6119 14 12.75V13.25C14 13.3881 13.8881 13.5 13.75 13.5H13.25C13.1119 13.5 13 13.3881 13 13.25V12.75Z'
      ];
      windowPaths.forEach(d => {
        g.append('path').attr('d', d).attr('fill', 'white');
      });
      // Main building outline
      g.append('path')
        .attr('fill-rule', 'evenodd')
        .attr('clip-rule', 'evenodd')
        .attr('d', 'M0.5 16H9.5C9.59107 16 9.67646 15.9757 9.75 15.9331C9.82354 15.9757 9.90893 16 10 16H15.5C15.7761 16 16 15.7761 16 15.5V4.5C16 4.22386 15.7761 4 15.5 4H10V0.5C10 0.223858 9.77614 0 9.5 0H0.5C0.223858 0 0 0.223858 0 0.5V15.5C0 15.7761 0.223858 16 0.5 16ZM1 15V1H9V15H7V13C7 12.7239 6.77614 12.5 6.5 12.5H3.5C3.22386 12.5 3 12.7239 3 13V15H1ZM6 13.5V15H4V13.5H6ZM10 5V15H15V5H10Z')
        .attr('fill', 'white');
    });

    // Node label
    node.append('text')
      .text(d => d.label.length > 18 ? d.label.slice(0, 16) + '...' : d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', nodeRadius + 16)
      .attr('class', 'node-label')
      .attr('fill', 'var(--text-secondary)')
      .attr('font-size', '11px')
      .attr('font-family', 'var(--font-sans)')
      .style('pointer-events', 'none');

    // Add CSS transition for smooth scaling and set up hover effects
    node.style('transition', 'transform 150ms ease-out')
      .style('cursor', 'pointer');

    // Store reference to this for callbacks
    const self = this;
    
    // Track hovered node ID to preserve scale during simulation tick
    let hoveredNodeId = null;

    // Hover effects - scale up node slightly and show entity card
    node.on('mouseover', function(event, d) {
      hoveredNodeId = d.id;
      d3.select(this).attr('transform', `translate(${d.x},${d.y}) scale(1.15)`);
      if (self.options.onNodeHover) {
        self.options.onNodeHover(d, this);
      }
    })
    .on('mouseout', function(event, d) {
      hoveredNodeId = null;
      d3.select(this).attr('transform', `translate(${d.x},${d.y}) scale(1)`);
      if (self.options.onNodeHoverEnd) {
        self.options.onNodeHoverEnd(d);
      }
    })
    .on('click', (event, d) => {
      if (this.options.onNodeClick) {
        this.options.onNodeClick(d);
      }
    });

    // Simulation tick
    this.simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.each(function(d) {
        // Keep within bounds
        d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x));
        d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y));
        // Preserve scale for hovered node
        const scale = d.id === hoveredNodeId ? 1.15 : 1;
        d3.select(this).attr('transform', `translate(${d.x},${d.y}) scale(${scale})`);
      });
    });
  }

  createTooltip() {
    // Remove existing tooltip
    if (this.tooltip) {
      this.tooltip.remove();
    }
    
    // Create tooltip element
    this.tooltip = d3.select('body')
      .append('div')
      .attr('class', 'network-graph-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'var(--bg-secondary)')
      .style('border', '1px solid var(--border-color)')
      .style('border-radius', '8px')
      .style('padding', '12px')
      .style('font-size', '12px')
      .style('color', 'var(--text-primary)')
      .style('box-shadow', '0 4px 12px rgba(0,0,0,0.3)')
      .style('max-width', '300px')
      .style('z-index', '1000')
      .style('pointer-events', 'none');
  }

  showTooltip(event, d) {
    const narrativeCount = d.narratives.length;
    const narrativeList = d.narratives.slice(0, 3).map(n => 
      `<div style="margin: 4px 0; padding: 4px 8px; background: var(--bg-tertiary); border-radius: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        ${n.text.length > 50 ? n.text.slice(0, 47) + '...' : n.text}
      </div>`
    ).join('');
    
    const moreText = narrativeCount > 3 
      ? `<div style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">+${narrativeCount - 3} more narratives</div>` 
      : '';

    this.tooltip
      .html(`
        <div style="font-weight: 600; margin-bottom: 8px; color: var(--text-secondary);">
          Connected by ${narrativeCount} narrative${narrativeCount !== 1 ? 's' : ''}
        </div>
        ${narrativeList}
        ${moreText}
        <div style="color: var(--accent-primary); font-size: 12px; margin-top: 8px;">Click to view details</div>
      `)
      .style('visibility', 'visible')
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px');
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style('visibility', 'hidden');
    }
  }

  drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  destroy() {
    if (this.simulation) {
      this.simulation.stop();
      this.simulation = null;
    }
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
    super.destroy();
  }
}

export default NetworkGraph;
