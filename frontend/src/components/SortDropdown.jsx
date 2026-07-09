const SORT_OPTIONS = [
  { value: '', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated First' },
]

function SortDropdown({ sortBy, onChange }) {
  return (
    <label className="sort-control">
      <span>Sort By</span>
      <select value={sortBy} onChange={(e) => onChange(e.target.value)}>
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  )
}

export default SortDropdown
