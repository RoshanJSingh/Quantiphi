const { products } = require("../data/products");

/**
 * Combinatorial intersect filter: a product is kept only if it satisfies
 * EVERY active criterion (category ∩ price range ∩ minimum rating).
 * Inactive / cleared filters are gracefully bypassed so the full base
 * inventory flows through untouched.
 *
 * @param {object} criteria
 * @param {string[]} criteria.categories - selected category names (empty = all)
 * @param {number|null} criteria.minPrice - lower price bound (null = open)
 * @param {number|null} criteria.maxPrice - upper price bound (null = open)
 * @param {number|null} criteria.minRating - minimum star rating (null = any)
 * @returns {object[]} products matching all active criteria
 */
function filterProducts({ categories, minPrice, maxPrice, minRating }) {
  const hasCategoryFilter = Array.isArray(categories) && categories.length > 0;

  return products.filter((product) => {
    if (hasCategoryFilter && !categories.includes(product.category)) {
      return false;
    }
    if (minPrice !== null && product.price < minPrice) {
      return false;
    }
    if (maxPrice !== null && product.price > maxPrice) {
      return false;
    }
    if (minRating !== null && product.rating < minRating) {
      return false;
    }
    return true;
  });
}

// Sort strategies applied AFTER filtering. Each returns a new comparator-sorted
// copy so the filtered set itself is never mutated.
const sortStrategies = {
  "price-asc":  (items) => [...items].sort((a, b) => a.price - b.price),
  "price-desc": (items) => [...items].sort((a, b) => b.price - a.price),
  "rating-desc": (items) => [...items].sort((a, b) => b.rating - a.rating),
};

/**
 * Pipeline: filter the original dataset first, then arrange the presentation
 * order of the surviving items based on the chosen sort state.
 */
function queryProducts(criteria, sortBy) {
  const filtered = filterProducts(criteria);
  const sorter = sortStrategies[sortBy];
  return sorter ? sorter(filtered) : filtered;
}

/** Metadata the frontend needs to render its controls (categories, price bounds). */
function getInventoryMeta() {
  const categories = [...new Set(products.map((p) => p.category))];
  const prices = products.map((p) => p.price);
  return {
    categories,
    priceRange: {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    },
    totalProducts: products.length,
  };
}

module.exports = { filterProducts, queryProducts, getInventoryMeta, sortStrategies };
