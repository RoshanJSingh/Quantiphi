const express = require("express");
const { queryProducts, getInventoryMeta } = require("../services/filterService");

const router = express.Router();

/** Parse a numeric query param safely; anything non-numeric becomes null (inactive filter). */
function toNumberOrNull(value) {
  if (value === undefined || value === null || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

/** Parse the comma-separated categories param into a clean array. */
function toCategoryList(value) {
  if (typeof value !== "string" || value.trim() === "") return [];
  return value.split(",").map((c) => c.trim()).filter(Boolean);
}

const VALID_SORTS = new Set(["price-asc", "price-desc", "rating-desc"]);

/**
 * GET /api/products
 * Query params: categories=Electronics,Apparel  minPrice=20  maxPrice=150
 *               minRating=4  sortBy=price-asc
 * All filtering + sorting happens here on the server.
 */
router.get("/products", (req, res) => {
  const minPrice = toNumberOrNull(req.query.minPrice);
  const maxPrice = toNumberOrNull(req.query.maxPrice);

  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    return res.status(400).json({ error: "minPrice cannot be greater than maxPrice" });
  }

  let minRating = toNumberOrNull(req.query.minRating);
  if (minRating !== null) minRating = Math.min(5, Math.max(1, minRating));

  const sortBy = VALID_SORTS.has(req.query.sortBy) ? req.query.sortBy : null;

  const criteria = {
    categories: toCategoryList(req.query.categories),
    minPrice,
    maxPrice,
    minRating,
  };

  const results = queryProducts(criteria, sortBy);
  res.json({ count: results.length, products: results });
});

/** GET /api/meta — categories and price bounds so the UI can build its controls. */
router.get("/meta", (req, res) => {
  res.json(getInventoryMeta());
});

module.exports = router;
