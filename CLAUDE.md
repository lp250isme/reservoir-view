# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server (http://localhost:5173/reservoir-view/)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run deploy   # Build + deploy to GitHub Pages via gh-pages
```

## Architecture

Taiwan reservoir real-time water level dashboard. Fetches data from WRA (Water Resources Agency) open API and displays 21 major reservoirs with cyberpunk-styled glassmorphism UI.

### Data Flow

1. `src/main.jsx` — Entry point, wraps app in `QueryClientProvider` (retry: 2, no refetch on window focus)
2. `src/App.jsx` — Main orchestrator. Manages view state (grid/map), search/sort, and conditionally batches detail queries via `useQueries()` only when map view is active
3. `src/hooks/use-reservoirs.js` — Fetches all stations (5min stale, 10min auto-refresh)
4. `src/hooks/use-reservoir-detail.js` — Fetches single station real-time data (lazy, controlled by `enabled` flag)
5. `src/hooks/use-gyroscope.js` — Device orientation with mouse fallback, lerp-smoothed via rAF

### API

Two endpoints from `https://fhy.wra.gov.tw/WraApi` defined in `src/lib/api.js`:
- Station list: `/v1/Reservoir/Station?$filter=Importance eq 1`
- Real-time info: `/v1/Reservoir/RealTimeInfo?$filter=StationNo eq '{id}'`

### Status Logic (`src/lib/utils.js`)

Water level percentage maps to 4 tiers: `critical` (<=10%), `warning` (<=20%), `watch` (<=50%), `normal` (>50%). This drives colors, labels, glow intensity, and badge styling across all components.

### Styling System

- Tailwind CSS v4 with `@tailwindcss/vite` plugin (no tailwind.config.js)
- Theme colors defined in `@theme` block in `src/index.css`
- Dark mode: `.dark` class on `<html>`, persisted to localStorage
- Glassmorphism classes (`.glass-card`, `.glass-input`, `.glass-dialog`, `.header-glass`) with dark/light variants using `:root:not(.dark)` selector pattern
- All animations are CSS-only (wave layers, bubbles, sparkles, caustics, gradient flow)

### Key Patterns

- **SVG unique IDs**: `WaterGauge` generates random `uid` per instance to avoid clipPath/gradient ID collisions across multiple gauges
- **Lazy map loading**: `MapView` uses `React.lazy()` to avoid bundling Leaflet upfront
- **Conditional queries**: Detail queries have `enabled: view === 'map'` to prevent unnecessary API calls in grid view
- **Gyroscope fallback**: iOS 13+ needs `DeviceOrientationEvent.requestPermission()` on user gesture; desktop uses mouse position
- **Code splitting**: `vite.config.js` has `manualChunks` for react, query, and charts

### Build Config

- `base: '/reservoir-view/'` in `vite.config.js` for GitHub Pages
- Path alias `@/` maps to `./src/` (configured in both `vite.config.js` and `jsconfig.json`)
