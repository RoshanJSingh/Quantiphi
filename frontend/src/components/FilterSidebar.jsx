import CategoryFilter from './CategoryFilter'
import PriceRangeSlider from './PriceRangeSlider'
import RatingFilter from './RatingFilter'

function FilterSidebar({ meta, filters, onFiltersChange, onReset }) {
  const toggleCategory = (category) => {
    const selected = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ ...filters, categories: selected })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Filters</h2>
        <button className="link-btn" onClick={onReset}>Clear all</button>
      </div>

      <CategoryFilter
        categories={meta.categories}
        selected={filters.categories}
        onToggle={toggleCategory}
      />

      <PriceRangeSlider
        bounds={meta.priceRange}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onChange={({ minPrice, maxPrice }) =>
          onFiltersChange({ ...filters, minPrice, maxPrice })
        }
      />

      <RatingFilter
        minRating={filters.minRating}
        onChange={(minRating) => onFiltersChange({ ...filters, minRating })}
      />
    </aside>
  )
}

export default FilterSidebar
