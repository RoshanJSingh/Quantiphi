function CategoryFilter({ categories, selected, onToggle }) {
  return (
    <fieldset className="filter-group">
      <legend>Category</legend>
      {categories.map((category) => (
        <label key={category} className="check-row">
          <input
            type="checkbox"
            checked={selected.includes(category)}
            onChange={() => onToggle(category)}
          />
          <span>{category}</span>
        </label>
      ))}
    </fieldset>
  )
}

export default CategoryFilter
