# Project Astra - Intelligence Dashboard

A web-based intelligence dashboard for tracking narratives, factions, events, and entities. Built with vanilla JavaScript, D3.js visualizations, and a modular component architecture.

## Features

- **Narrative Tracking**: Monitor disinformation narratives with sentiment analysis and volume trends
- **Faction Analysis**: Track faction activities, overlaps, and their engagement with narratives
- **Entity Management**: Manage people, organizations, locations, and events
- **Interactive Visualizations**: Network graphs, timelines, maps, and charts powered by D3.js
- **Document Viewer**: View and annotate documents with highlights and comments
- **Multiple Datasets**: Switch between different analysis datasets (American Politics, China Semiconductor, Walmart Brand)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended for proper CORS handling)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nicolethayer/project-astra.git
   cd project-astra
   ```

2. Install development dependencies (for testing):
   ```bash
   npm install
   ```

3. Open the app:
   - **Option A**: Simply open `index.html` in your browser
   - **Option B**: Use a local server for better compatibility:
     ```bash
     npx serve .
     ```
     Then visit `http://localhost:3000`

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
project-astra/
├── index.html              # Main application entry point
├── css/                    # Modular stylesheets
│   ├── variables.css       # CSS custom properties
│   ├── reset.css           # Browser reset styles
│   ├── typography.css      # Fonts and text styles
│   ├── layout.css          # Page layout and grids
│   ├── navigation.css      # Navbar and menus
│   ├── cards.css           # Card components
│   ├── forms.css           # Form elements
│   ├── chat.css            # Chat panel styles
│   ├── components.css      # Visualization components
│   ├── monitors.css        # Monitors view styles
│   └── utilities.css       # Utility classes
├── js/
│   ├── app.js              # Application entry point
│   ├── router.js           # Hash-based SPA routing
│   ├── components/         # Reusable UI components
│   │   ├── BaseComponent.js    # Base class for all components
│   │   ├── NetworkGraph.js     # D3 force-directed graph
│   │   ├── Timeline.js         # Event timeline
│   │   ├── MapView.js          # Leaflet map integration
│   │   └── ...
│   ├── views/              # Page views
│   │   ├── BaseView.js         # Base class for all views
│   │   ├── DashboardView.js    # Main dashboard
│   │   ├── NarrativeView.js    # Narrative detail page
│   │   └── ...
│   ├── data/               # Data layer
│   │   ├── DataStore.js        # localStorage persistence & CRUD
│   │   ├── DataService.js      # Query layer & relationships
│   │   └── mockData*.js        # Sample datasets
│   └── utils/              # Utility functions
│       ├── formatters.js       # Number, date, sentiment formatting
│       └── ...
├── tests/                  # Unit tests (Vitest)
│   ├── formatters.test.js
│   ├── DataService.test.js
│   └── DataStore.test.js
├── fonts/                  # Neue Haas Grotesk font files
└── img/                    # Images and placeholders
```

## Architecture

### Data Flow

```
mockData.js → DataStore (localStorage) → DataService (queries) → Views → Components
```

- **DataStore**: Manages persistence with localStorage, provides CRUD operations
- **DataService**: Query layer that resolves relationships between entities
- **Views**: Page-level components that fetch data and compose UI
- **Components**: Reusable visualization components (charts, graphs, lists)

### Routing

The app uses hash-based routing (`#/narrative/123`) for SPA navigation without a server:

- `#/dashboard` - Main dashboard with aggregate stats
- `#/narratives` - Narrative list
- `#/narrative/:id` - Narrative detail page
- `#/factions`, `#/faction/:id` - Faction views
- `#/entities`, `#/person/:id`, `#/organization/:id` - Entity views
- `#/documents`, `#/document/:id` - Document views

### Component Lifecycle

Components follow a consistent lifecycle:
- `constructor()` - Initialize state and options
- `render()` - Build and insert HTML
- `update(data)` - Update data and re-render
- `destroy()` - Clean up event listeners and resources

## External Dependencies

Loaded via CDN:
- [D3.js v7](https://d3js.org/) - Data visualization
- [Leaflet 1.9.4](https://leafletjs.com/) - Interactive maps
- [Venn.js](https://github.com/benfred/venn.js) - Venn diagrams

Development:
- [Vitest](https://vitest.dev/) - Unit testing
- [jsdom](https://github.com/jsdom/jsdom) - DOM simulation for tests

## Switching Datasets

Click the avatar menu in the top-right corner to switch between:
- **American Politics** - US political narratives and factions
- **China Semiconductor** - Tech industry analysis
- **Walmart Brand** - Brand perception tracking

Data is stored in localStorage and persists across sessions.

## License

Private/Proprietary
