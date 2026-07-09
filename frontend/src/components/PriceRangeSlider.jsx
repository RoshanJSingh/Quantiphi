// Dual-point range slider built from two overlaid native range inputs.
// The two thumbs are clamped so min can never cross above max.
function PriceRangeSlider({ bounds, minPrice, maxPrice, onChange }) {
  const lo = minPrice ?? bounds.min
  const hi = maxPrice ?? bounds.max

  const handleMin = (e) => {
    const value = Math.min(Number(e.target.value), hi)
    onChange({ minPrice: value, maxPrice: hi })
  }

  const handleMax = (e) => {
    const value = Math.max(Number(e.target.value), lo)
    onChange({ minPrice: lo, maxPrice: value })
  }

  const pct = (v) => ((v - bounds.min) / (bounds.max - bounds.min)) * 100

  return (
    <fieldset className="filter-group">
      <legend>Price Range</legend>
      <div className="price-labels">
        <span>${lo}</span>
        <span>${hi}</span>
      </div>
      <div className="dual-slider">
        <div className="slider-track" />
        <div
          className="slider-fill"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={lo}
          onChange={handleMin}
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={hi}
          onChange={handleMax}
          aria-label="Maximum price"
        />
      </div>
    </fieldset>
  )
}

export default PriceRangeSlider
