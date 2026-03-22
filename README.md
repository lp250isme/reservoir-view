# reservoir-view

Taiwan reservoir real-time water level dashboard with a cyberpunk-style UI.

Data sourced from [Water Resources Agency (WRA)](https://fhy.wra.gov.tw/) open API.

## Features

- Real-time water level monitoring for 21 major reservoirs across Taiwan
- Animated water gauge with multi-layer waves, rising bubbles, sparkle particles, and gyroscope/mouse-reactive reflections
- Grid view with glassmorphism cards and status-colored glow borders
- Interactive map view (Leaflet) with color-coded reservoir markers
- Historical trend charts (Recharts)
- Search by reservoir name or basin
- Sort by name, water level percentage, or basin
- Dark mode with animated particle background and neon accents
- Responsive design (mobile / tablet / desktop)

## Tech Stack

- **Vite** - Build tool
- **React 19** - UI framework
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible primitives (Dialog, Select, Tabs)
- **TanStack Query** - Data fetching with caching and auto-refresh
- **Leaflet + react-leaflet** - Map view
- **Recharts** - Trend charts
- **Lucide React** - Icons

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173/reservoir-view/

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Project Structure

```
src/
  main.jsx              # Entry point + QueryClient setup
  App.jsx               # Root component, state management
  index.css             # Tailwind + theme + animations
  lib/
    api.js              # WRA API client
    utils.js            # cn(), getWaterStatus(), formatters
  hooks/
    use-reservoirs.js   # Reservoir list query
    use-reservoir-detail.js  # Single reservoir real-time query
    use-gyroscope.js    # Device orientation / mouse tracking
  components/
    header.jsx          # Gradient title, view toggle, dark mode
    search-filter.jsx   # Search input + sort select
    reservoir-grid.jsx  # Responsive card grid
    reservoir-card.jsx  # Glass card with water gauge
    reservoir-detail-dialog.jsx  # Detail dialog
    water-gauge.jsx     # Animated SVG water gauge
    status-badge.jsx    # Color-coded status label
    map-view.jsx        # Leaflet Taiwan map
    trend-chart.jsx     # Recharts area chart
    loading-skeleton.jsx
    error-state.jsx
    animated-background.jsx  # Canvas particle system
```

## API

Data from WRA Open API (`https://fhy.wra.gov.tw/WraApi`):

- `GET /v1/Reservoir/Station?$filter=Importance eq 1` - List of major reservoirs
- `GET /v1/Reservoir/RealTimeInfo?$filter=StationNo eq '{id}'` - Real-time data for a station

## License

MIT
