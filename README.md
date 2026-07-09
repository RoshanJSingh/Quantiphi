# Vibe Marketplace — E-Commerce Multi-Filter Sidebar

A high-traffic marketplace browsing interface where users sift through a product
inventory using three simultaneous filter criteria — **category**, **price range**,
and **minimum star rating** — plus a **Sort By** control. Built for the Quantiphi
Vibe Coding round (Set-E).

## Architecture

```
Quantiphi/
├── backend/               # Express API — ALL business logic lives here
│   └── src/
│       ├── data/products.js        # Master in-memory product inventory (30 items)
│       ├── services/filterService.js  # Filter + sort pipeline (core logic)
│       ├── routes/products.js      # /api/products & /api/meta with input validation
│       └── server.js               # App entry point
└── frontend/              # React (Vite) — presentation & user interaction only
    └── src/
        ├── api.js                  # Thin fetch layer; frontend never filters locally
        ├── App.jsx                 # Filter/sort state + server re-query on change
        └── components/
            ├── FilterSidebar.jsx   # Sticky sidebar shell
            ├── CategoryFilter.jsx  # Checkbox group
            ├── PriceRangeSlider.jsx# Dual-thumb min/max slider
            ├── RatingFilter.jsx    # 1–5 star radio group
            ├── SortDropdown.jsx    # Sort By menu
            ├── ProductGrid.jsx     # Card grid + empty state with Reset
            └── ProductCard.jsx     # Thumbnail, name, rating, price
```

### Server-side filter pipeline (the core function)

`backend/src/services/filterService.js` implements a **combinatorial intersect
filter**: a single pass over the master inventory keeps a product only if it
satisfies *every active* criterion —

1. **Category** — product's category is in the selected set (skipped when no boxes are checked)
2. **Price** — `minPrice ≤ price ≤ maxPrice` (each bound independently optional)
3. **Rating** — `rating ≥ minRating` (skipped when "Any rating" is selected)

**Graceful null handling:** inactive filters are `null` / empty and are bypassed,
so clearing everything returns the full base inventory.

**Filter-then-sort:** sorting is a separate stage applied *after* filtering —
`queryProducts(criteria, sortBy)` filters the original dataset first, then a
sort strategy (`price-asc`, `price-desc`, `rating-desc`) arranges the survivors.
An unknown/empty sort key leaves the natural order intact.

### Instant state feedback

Every checkbox click, slider drag, radio change, or sort selection updates React
state, which re-queries `GET /api/products` (lightly debounced so slider drags
don't flood the API) — no Submit button. When zero items match, the grid is
replaced by a *"No items match your criteria — Reset filters"* screen whose
button restores the unfiltered state.

## API

| Endpoint | Description |
|---|---|
| `GET /api/products?categories=Footwear,Apparel&minPrice=20&maxPrice=150&minRating=4&sortBy=price-asc` | Filtered + sorted products. All params optional. |
| `GET /api/meta` | Available categories, global price bounds, total count (drives the sidebar controls). |

Invalid input is handled server-side: non-numeric bounds are ignored, rating is
clamped to 1–5, unknown sort keys are dropped, and `minPrice > maxPrice` returns
`400`.

## Run locally

```bash
# Terminal 1 — backend on :3001
cd backend && npm install && npm start

# Terminal 2 — frontend on :5173 (proxies /api to the backend)
cd frontend && npm install && npm run dev
```

Open http://localhost:5173.

## Deploy (Vercel, single project)

The repo deploys as one Vercel project with zero extra configuration:

- `vercel.json` builds `frontend/` (Vite) as the static site and rewrites
  `/api/*` to a serverless function.
- `api/index.js` wraps the same Express app (`backend/src/app.js`) that the
  local server runs — the app is exported without `listen()`, so one codebase
  serves both environments.
- Root `package.json` carries the Express/CORS dependencies Vercel bundles
  into the function.

Import the repo at vercel.com/new (root directory: repo root) and deploy.

## Tech stack

- **Backend:** Node.js, Express (in-memory dataset, layered routes/services/data structure)
- **Frontend:** React 19 + Vite, plain CSS (no UI framework)
