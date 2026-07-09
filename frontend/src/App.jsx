import { useEffect, useState } from 'react'
import FilterSidebar from './components/FilterSidebar'
import ProductGrid from './components/ProductGrid'
import SortDropdown from './components/SortDropdown'
import { fetchMeta, fetchProducts } from './api'
import './App.css'

const INITIAL_FILTERS = {
  categories: [],
  minPrice: null,
  maxPrice: null,
  minRating: null,
}

function App() {
  const [meta, setMeta] = useState(null)
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [sortBy, setSortBy] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load control metadata (categories, price bounds) once on mount.
  useEffect(() => {
    fetchMeta()
      .then(setMeta)
      .catch((err) => setError(err.message))
  }, [])

  // Re-query the server on every filter/sort change — instant feedback,
  // no submit button. Debounced slightly so slider drags don't flood the API.
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts({ ...filters, sortBy })
        .then((data) => {
          setProducts(data.products)
          setError(null)
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }, 120)
    return () => clearTimeout(timer)
  }, [filters, sortBy])

  const resetFilters = () => setFilters(INITIAL_FILTERS)

  if (error && !meta) {
    return <div className="page-status">Could not reach the server: {error}</div>
  }
  if (!meta) {
    return <div className="page-status">Loading marketplace…</div>
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>Vibe Marketplace</h1>
        <p>{products.length} of {meta.totalProducts} products</p>
      </header>

      <div className="layout">
        <FilterSidebar
          meta={meta}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={resetFilters}
        />

        <main className="catalog">
          <div className="catalog-toolbar">
            <h2>Product Inventory</h2>
            <SortDropdown sortBy={sortBy} onChange={setSortBy} />
          </div>
          {loading
            ? <div className="page-status">Loading products…</div>
            : <ProductGrid products={products} onReset={resetFilters} />}
        </main>
      </div>
    </div>
  )
}

export default App
