/**
 * MapView.js
 * Leaflet map component for location and event visualization
 */

import { BaseComponent } from './BaseComponent.js';
import { DataService } from '../data/DataService.js';

export class MapView extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: 400,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      defaultCenter: [39.8283, -98.5795], // US center
      defaultZoom: 4,
      showLocations: false, // Show locations without events (checkbox option)
      ...options
    });
    this.map = null;
    this.markers = [];
    this.markerLayer = null; // For locations without events
    this.eventMarkerLayer = null; // For events
  }

  render() {
    const hasLocations = this.data?.locations?.length > 0;
    const hasEvents = this.data?.events?.length > 0;
    
    if (!hasLocations && !hasEvents) {
      this.showEmptyState('No locations to display');
      return;
    }

    // Clean up existing map
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    this.clear();
    this.markers = [];

    // Check if we're in fullscreen mode
    const card = this.container.closest('.card');
    const isFullscreen = card && card.classList.contains('card-fullscreen');

    // Set container dimensions - in fullscreen mode, let CSS control sizing
    if (!isFullscreen) {
      this.container.style.height = `${this.options.height}px`;
    } else {
      this.container.style.height = '100%';
    }
    this.container.classList.add('map-container');

    // Initialize map without default zoom control
    this.map = L.map(this.container, {
      zoomControl: false,
      attributionControl: false
    }).setView(this.options.defaultCenter, this.options.defaultZoom);

    // Default tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    // Add custom zoom controls
    this.addCustomZoomControls();

    // Marker layer groups
    this.markerLayer = L.layerGroup(); // Locations without events - not added by default
    
    // Event markers with clustering (clusters multiple locations)
    this.eventMarkerLayer = L.markerClusterGroup({
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 50,
      iconCreateFunction: (cluster) => {
        // Sum up total events across all child markers
        const childMarkers = cluster.getAllChildMarkers();
        const totalEvents = childMarkers.reduce((sum, marker) => {
          return sum + (marker.options.eventCount || 1);
        }, 0);
        return L.divIcon({
          html: `<div class="cluster-marker"><span>${totalEvents}</span></div>`,
          className: 'event-cluster-icon',
          iconSize: [36, 36]
        });
      }
    });
    
    // Click handler for clusters - flyTo zoom level that expands
    this.eventMarkerLayer.on('clusterclick', (e) => {
      const cluster = e.layer;
      const bounds = cluster.getBounds();
      this.map.flyToBounds(bounds, { 
        padding: [50, 50], 
        animate: true, 
        duration: 0.5 
      });
    });
    
    this.eventMarkerLayer.addTo(this.map);

    // Build set of location IDs that have events
    const locationIdsWithEvents = new Set();
    (this.data.events || []).forEach(event => {
      if (event.locationId) {
        locationIdsWithEvents.add(event.locationId);
      }
    });

    // Filter locations to only those WITHOUT associated events
    const locationsWithoutEvents = (this.data.locations || []).filter(loc => 
      !locationIdsWithEvents.has(loc.id)
    );

    // Add location markers (for locations without events) - always visible
    const bounds = [];

    locationsWithoutEvents.forEach(loc => {
      if (!loc.coordinates || 
          typeof loc.coordinates.lat !== 'number' || 
          typeof loc.coordinates.lng !== 'number') {
        return;
      }

      const coords = [loc.coordinates.lat, loc.coordinates.lng];
      bounds.push(coords);

      // Create custom marker (location markers are blue)
      const markerIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="marker-wrapper">
            <div class="marker-pin location-pin"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      const marker = L.marker(coords, { icon: markerIcon });

      // Build narratives list
      const narrativesList = (loc.narratives && loc.narratives.length > 0)
        ? `<div class="popup-section">
            <p class="popup-section-title">Narratives</p>
            <ul class="popup-list">
              ${loc.narratives.slice(0, 5).map(n => 
                `<li><a href="#/narrative/${n.id}" class="popup-item-link">${n.text.length > 60 ? n.text.substring(0, 60) + '...' : n.text}</a></li>`
              ).join('')}
              ${loc.narratives.length > 5 ? `<li class="popup-more">+${loc.narratives.length - 5} more</li>` : ''}
            </ul>
          </div>`
        : '';

      // Build events list
      const eventsList = (loc.events && loc.events.length > 0)
        ? `<div class="popup-section">
            <p class="popup-section-title">Events</p>
            <ul class="popup-list">
              ${loc.events.slice(0, 5).map(e => 
                `<li><a href="#/event/${e.id}" class="popup-item-link">${e.text}</a></li>`
              ).join('')}
              ${loc.events.length > 5 ? `<li class="popup-more">+${loc.events.length - 5} more</li>` : ''}
            </ul>
          </div>`
        : '';

      // Popup content with view link
      const popupContent = `
        <div class="map-popup">
          <h4>${loc.name}</h4>
          ${loc.eventText ? `<p class="event-text">${loc.eventText}</p>` : ''}
          ${narrativesList}
          ${eventsList}
          <a href="#/location/${loc.id}" class="map-popup-link">View Location →</a>
        </div>
      `;
      marker.bindPopup(popupContent, {
        closeButton: true,
        autoClose: false,
        closeOnClick: false
      });

      // Track hover state for this marker
      let isHoveringMarker = false;
      let isHoveringPopup = false;
      let isClickLocked = false;

      const closePopupIfNotHovered = () => {
        setTimeout(() => {
          if (!isHoveringMarker && !isHoveringPopup && !isClickLocked) {
            marker.closePopup();
          }
        }, 150);
      };

      // Hover handlers - show/hide popup on hover
      marker.on('mouseover', () => {
        isHoveringMarker = true;
        marker.openPopup();
      });

      marker.on('mouseout', () => {
        isHoveringMarker = false;
        closePopupIfNotHovered();
      });

      // Add popup event listeners when it opens
      marker.on('popupopen', () => {
        const popupEl = marker.getPopup().getElement();
        if (popupEl) {
          popupEl.addEventListener('mouseenter', () => {
            isHoveringPopup = true;
          });
          popupEl.addEventListener('mouseleave', () => {
            isHoveringPopup = false;
            closePopupIfNotHovered();
          });
        }
      });

      marker.on('popupclose', () => {
        isHoveringPopup = false;
        isClickLocked = false;
      });

      // Click handler - fly to location and show popup
      marker.on('click', () => {
        // Lock the popup open after click
        isClickLocked = true;
        
        // Fly to the location with animation
        this.map.flyTo(coords, 12, { animate: true, duration: 1 });
        
        // Keep the popup open
        marker.openPopup();
        
        // Call optional callback (but don't navigate)
        if (this.options.onMarkerClick) {
          this.options.onMarkerClick(loc, marker);
        }
      });

      marker.addTo(this.markerLayer);
      this.markers.push({ marker, location: loc, type: 'location' });
    });

    // Add event markers (always shown)
    if (hasEvents) {
      this.renderEventMarkers(bounds);
    }

    // Add location markers to map (always visible now)
    if (this.markerLayer) {
      this.markerLayer.addTo(this.map);
    }

    // Store bounds for reset functionality
    this.initialBounds = bounds.length > 0 ? bounds : null;

    // Fit bounds
    if (bounds.length > 1) {
      this.map.fitBounds(bounds, { padding: [50, 50] });
    } else if (bounds.length === 1) {
      this.map.setView(bounds[0], 10);
    }

    // Force map resize after render
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  /**
   * Add custom zoom controls styled like timeline controls
   */
  addCustomZoomControls() {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'map-zoom-controls';
    controlsDiv.innerHTML = `
      <button class="map-zoom-btn" data-action="in" title="Zoom In">+</button>
      <button class="map-zoom-btn" data-action="out" title="Zoom Out">−</button>
      <button class="map-zoom-btn" data-action="reset" title="Reset View">⟲</button>
    `;
    this.container.appendChild(controlsDiv);

    // Add click handlers
    controlsDiv.querySelectorAll('.map-zoom-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        this.handleZoomControl(action);
      });
    });
  }

  /**
   * Handle zoom control button clicks
   */
  handleZoomControl(action) {
    if (!this.map) return;

    switch (action) {
      case 'in':
        this.map.zoomIn();
        break;
      case 'out':
        this.map.zoomOut();
        break;
      case 'reset':
        this.resetView();
        break;
    }
  }


  /**
   * Render event markers on the map - grouped by coordinates
   */
  renderEventMarkers(bounds) {
    if (!this.data.events || !this.eventMarkerLayer) return;

    // Build a location lookup map from passed locations
    const locationMap = new Map();
    (this.data.locations || []).forEach(loc => {
      locationMap.set(loc.id, loc);
    });

    // Group events by coordinates
    const eventsByCoords = new Map();
    
    this.data.events.forEach(event => {
      let location = event.location;
      if (!location && event.locationId) {
        location = locationMap.get(event.locationId);
        if (!location) {
          location = DataService.getLocation(event.locationId);
        }
      }
      
      if (!location?.coordinates || 
          typeof location.coordinates.lat !== 'number' || 
          typeof location.coordinates.lng !== 'number') {
        return;
      }

      const coordKey = `${location.coordinates.lat},${location.coordinates.lng}`;
      if (!eventsByCoords.has(coordKey)) {
        eventsByCoords.set(coordKey, {
          location,
          coords: [location.coordinates.lat, location.coordinates.lng],
          events: []
        });
      }
      eventsByCoords.get(coordKey).events.push(event);
    });

    // Create one marker per coordinate group
    eventsByCoords.forEach(({ location, coords, events }) => {
      bounds.push(coords);

      const eventCount = events.length;

      // Create marker - pin with count inside if multiple events
      const markerIcon = L.divIcon({
        className: 'custom-map-marker event-marker',
        html: eventCount > 1 
          ? `<div class="marker-wrapper">
              <div class="marker-pin-with-count">
                <span>${eventCount}</span>
              </div>
            </div>`
          : `<div class="marker-wrapper">
              <div class="marker-pin event-pin"></div>
            </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      // Store eventCount in marker options for cluster summing
      const marker = L.marker(coords, { icon: markerIcon, eventCount: eventCount });

      // Build popup content
      const popupContent = this.buildEventPopupContent(location, events);
      
      marker.bindPopup(popupContent, {
        closeButton: true,
        autoClose: true,
        closeOnClick: true,
        maxHeight: 300
      });

      marker.on('click', () => {
        marker.openPopup();
      });

      marker.addTo(this.eventMarkerLayer);
      this.markers.push({ marker, location, events, type: 'event' });
    });
  }

  /**
   * Build popup content for events at a location
   */
  buildEventPopupContent(location, events) {
    const eventCount = events.length;
    const coords = location.coordinates;
    
    // Format coordinates
    const latDir = coords.lat >= 0 ? 'N' : 'S';
    const lngDir = coords.lng >= 0 ? 'E' : 'W';

    if (eventCount === 1) {
      // Single event - show detailed view
      const event = events[0];
      const eventDate = event.date ? new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) : '';

      return `
        <div class="map-popup event-popup">
          <div class="popup-type-badge">Event</div>
          <h4>${event.text}</h4>
          ${eventDate ? `<p class="popup-date">${eventDate}</p>` : ''}
          ${event.description ? `<p class="popup-description">${event.description.length > 120 ? event.description.substring(0, 120) + '...' : event.description}</p>` : ''}
          <p class="popup-location-name">${location.name}</p>
          <p class="popup-coords">${Math.abs(coords.lat).toFixed(4)}°${latDir}, ${Math.abs(coords.lng).toFixed(4)}°${lngDir}</p>
          <a href="#/event/${event.id}" class="btn btn-small">View Event →</a>
        </div>
      `;
    }

    // Multiple events - show list view
    const eventsList = events.slice(0, 8).map(event => {
      const eventDate = event.date ? new Date(event.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }) : '';
      return `<li>
        <a href="#/event/${event.id}" class="popup-item-link">${event.text.length > 50 ? event.text.substring(0, 50) + '...' : event.text}</a>
        ${eventDate ? `<span class="popup-item-date">${eventDate}</span>` : ''}
      </li>`;
    }).join('');

    const moreCount = events.length > 8 ? events.length - 8 : 0;

    return `
      <div class="map-popup event-popup">
        <div class="popup-type-badge">${eventCount} Events</div>
        <h4>${location.name}</h4>
        <p class="popup-coords">${Math.abs(coords.lat).toFixed(4)}°${latDir}, ${Math.abs(coords.lng).toFixed(4)}°${lngDir}</p>
        <ul class="popup-list popup-events-list">
          ${eventsList}
          ${moreCount > 0 ? `<li class="popup-more">+${moreCount} more events</li>` : ''}
        </ul>
        <a href="#/location/${location.id}" class="btn btn-small">View Location →</a>
      </div>
    `;
  }

  /**
   * Reset map to initial view showing all markers
   */
  resetView() {
    if (!this.map) return;

    if (this.initialBounds && this.initialBounds.length > 1) {
      this.map.fitBounds(this.initialBounds, { padding: [50, 50], animate: true });
    } else if (this.initialBounds && this.initialBounds.length === 1) {
      this.map.setView(this.initialBounds[0], 10, { animate: true });
    } else {
      this.map.setView(this.options.defaultCenter, this.options.defaultZoom, { animate: true });
    }
  }

  /**
   * Center map on specific location
   */
  centerOn(lat, lng, zoom = 12) {
    if (this.map) {
      this.map.setView([lat, lng], zoom);
    }
  }

  /**
   * Add a single marker
   */
  addMarker(location) {
    if (!this.map || !location.coordinates) return;

    const coords = [location.coordinates.lat, location.coordinates.lng];
    const pinClass = location.isEvent ? 'marker-pin event-pin' : 'marker-pin location-pin';

    const markerIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div class="marker-wrapper">
          <div class="${pinClass}"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    const marker = L.marker(coords, { icon: markerIcon });
    marker.addTo(this.markerLayer);
    this.markers.push(marker);

    return marker;
  }

  /**
   * Clear all markers
   */
  clearMarkers() {
    if (this.markerLayer) {
      this.markerLayer.clearLayers();
    }
    if (this.eventMarkerLayer) {
      this.eventMarkerLayer.clearLayers();
    }
    this.markers = [];
  }

  /**
   * Zoom to a specific location by ID
   */
  zoomToLocation(locationId) {
    const markerData = this.markers.find(m => m.location && m.location.id === locationId);
    if (markerData) {
      const coords = [markerData.location.coordinates.lat, markerData.location.coordinates.lng];
      this.map.setView(coords, 12, { animate: true });
      markerData.marker.openPopup();
    }
  }

  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.markers = [];
    this.markerLayer = null;
    this.eventMarkerLayer = null;
    super.destroy();
  }
}

export default MapView;
