import ProductCard from './ProductCard'

function ProductGrid({ products, onReset }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-emoji">🔍</p>
        <p>No items match your criteria.</p>
        <button className="reset-btn" onClick={onReset}>Reset filters</button>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
