const RATINGS = [5, 4, 3, 2, 1]

function RatingFilter({ minRating, onChange }) {
  return (
    <fieldset className="filter-group">
      <legend>Minimum Rating</legend>
      {RATINGS.map((stars) => (
        <label key={stars} className="check-row">
          <input
            type="radio"
            name="min-rating"
            checked={minRating === stars}
            onChange={() => onChange(stars)}
          />
          <span className="stars">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
          {stars < 5 && <span className="rating-hint">&amp; up</span>}
        </label>
      ))}
      <label className="check-row">
        <input
          type="radio"
          name="min-rating"
          checked={minRating === null}
          onChange={() => onChange(null)}
        />
        <span>Any rating</span>
      </label>
    </fieldset>
  )
}

export default RatingFilter
