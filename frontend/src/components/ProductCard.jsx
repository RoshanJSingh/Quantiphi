function Stars({ rating }) {
  const full = Math.round(rating)
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </span>
  )
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="card-thumb" role="img" aria-label={product.name}>
        {product.image}
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-name">{product.name}</h3>
        <Stars rating={product.rating} />
        <p className="card-price">${product.price.toFixed(2)}</p>
      </div>
    </article>
  )
}

export default ProductCard
