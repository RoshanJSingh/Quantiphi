// Thin API layer — the frontend never filters or sorts; it only asks the server.

export async function fetchMeta() {
  const res = await fetch('/api/meta')
  if (!res.ok) throw new Error('Failed to load inventory metadata')
  return res.json()
}

export async function fetchProducts({ categories, minPrice, maxPrice, minRating, sortBy }) {
  const params = new URLSearchParams()
  if (categories.length > 0) params.set('categories', categories.join(','))
  if (minPrice !== null) params.set('minPrice', String(minPrice))
  if (maxPrice !== null) params.set('maxPrice', String(maxPrice))
  if (minRating !== null) params.set('minRating', String(minRating))
  if (sortBy) params.set('sortBy', sortBy)

  const res = await fetch(`/api/products?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to load products')
  return res.json()
}
