/**
 * VennDiagram.js
 * Faction overlap visualization using venn.js
 */

import { BaseComponent } from './BaseComponent.js';
import { getEntityCardModal } from './EntityCardModal.js';

export class VennDiagram extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: 350,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      ...options
    });
  }

  /**
   * Override resize to update dimensions
   * NOTE: Height is only updated in fullscreen mode where CSS constrains dimensions
   * (prevents resize loops in normal mode where container height = content height)
   */
  resize() {
    if (this.container) {
      const oldWidth = this.options.width;
      const oldHeight = this.options.height;
      
      const newWidth = this.container.clientWidth;
      this.options.width = newWidth;
      
      // Check if we're in fullscreen mode - if so, also update height
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
      
      if (this.data) {
        this.render();
      }
    }
    return this;
  }

  render() {
    if (!this.data || !this.data.sets || !this.data.sets.length) {
      this.showEmptyState('No faction overlap data');
      return;
    }

    const { width, height } = this.options;
    const { sets, overlaps } = this.data;

    this.clear();

    // Check if we're in fullscreen mode
    const card = this.container.closest('.card');
    const isFullscreen = card && card.classList.contains('card-fullscreen');

    // Create container div for venn.js with centering
    // In fullscreen mode, use 100% to let CSS control sizing
    const container = d3.select(this.container)
      .append('div')
      .attr('class', 'venn-container')
      .style('width', isFullscreen ? '100%' : width + 'px')
      .style('height', isFullscreen ? '100%' : height + 'px')
      .style('display', 'flex')
      .style('justify-content', 'center')
      .style('align-items', 'center');

    // Format data for venn.js
    // Single sets: { sets: ['A'], size: 10, label: 'Name' }
    // Overlaps: { sets: ['A', 'B'], size: 2 }
    
    // Filter out any invalid sets and ensure required properties
    const validSets = sets.filter(s => s && s.id && s.name);
    if (validSets.length === 0) {
      this.showEmptyState('No valid faction data');
      return;
    }
    
    const validSetIds = new Set(validSets.map(s => s.id));
    
    const vennSets = validSets.map(s => ({
      sets: [s.id],
      size: s.size || s.memberCount || 1000,
      label: s.name
    }));

    // Add intersections - only those where all factions exist in our sets
    (overlaps || []).forEach(overlap => {
      if (overlap && overlap.factionIds && overlap.factionIds.every(fid => validSetIds.has(fid))) {
        vennSets.push({
          sets: overlap.factionIds,
          size: overlap.overlapSize || 100
        });
      }
    });

    // Create color map
    const colorMap = {};
    sets.forEach(s => {
      colorMap[s.id] = s.color || 'var(--accent-primary)';
    });

    try {
      // Create venn diagram
      const chart = venn.VennDiagram()
        .width(width - 20)
        .height(height - 20);

      const vennDiv = container.datum(vennSets).call(chart);

      // Style circles
      vennDiv.selectAll('.venn-circle path')
        .style('fill-opacity', 0.4)
        .style('stroke-width', 2)
        .style('stroke', 'rgba(255, 255, 255, 0.3)')
        .each(function(d) {
          if (d.sets.length === 1) {
            d3.select(this).style('fill', colorMap[d.sets[0]] || 'var(--accent-primary)');
          }
        });

      // Style labels
      vennDiv.selectAll('.venn-circle text')
        .style('fill', 'var(--text-primary)')
        .style('font-size', '12px')
        .style('font-weight', '500')
        .style('font-family', 'var(--font-sans)');

      // Intersection labels
      vennDiv.selectAll('.venn-intersection text')
        .style('fill', 'var(--text-primary)')
        .style('font-size', '10px')
        .style('font-family', 'var(--font-mono)');

      // Hover effects and entity card popover
      const self = this;
      vennDiv.selectAll('g')
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
          const selection = d3.select(this);
          selection.select('path')
            .style('fill-opacity', 0.7);
          
          // Show entity card for single factions (not overlaps)
          if (d.sets.length === 1) {
            const factionId = d.sets[0];
            getEntityCardModal().show(factionId, 'faction', this);
          }
        })
        .on('mouseout', function(event, d) {
          const selection = d3.select(this);
          selection.select('path')
            .style('fill-opacity', 0.4);
          
          getEntityCardModal().scheduleHide();
        })
        .on('click', (event, d) => {
          if (d.sets.length === 1 && self.options.onFactionClick) {
            const factionId = d.sets[0];
            const faction = sets.find(s => s.id === factionId);
            self.options.onFactionClick(faction || { id: factionId });
          }
        });

    } catch (e) {
      console.error('Venn diagram error:', e);
      this.showEmptyState('Unable to render faction overlaps');
    }
  }
}

export default VennDiagram;
