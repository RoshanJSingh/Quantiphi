// Master product inventory. In a real system this would come from a database;
// for this assessment it is an in-memory dataset the filter pipeline runs over.
const products = [
  { id: 1,  name: "Aurora Wireless Headphones", category: "Electronics", price: 129.99, rating: 4.7, image: "🎧" },
  { id: 2,  name: "Pulse Smartwatch Series 5",  category: "Electronics", price: 249.0,  rating: 4.4, image: "⌚" },
  { id: 3,  name: "Nimbus 4K Action Camera",    category: "Electronics", price: 319.5,  rating: 4.2, image: "📷" },
  { id: 4,  name: "Volt Portable Power Bank",   category: "Electronics", price: 39.99,  rating: 4.1, image: "🔋" },
  { id: 5,  name: "Echo Bluetooth Speaker",     category: "Electronics", price: 59.0,   rating: 3.8, image: "🔊" },
  { id: 6,  name: "Quantum Mechanical Keyboard",category: "Electronics", price: 145.0,  rating: 4.8, image: "⌨️" },
  { id: 7,  name: "Drift Wireless Mouse",       category: "Electronics", price: 24.99,  rating: 3.5, image: "🖱️" },
  { id: 8,  name: "Lumen LED Desk Lamp",        category: "Electronics", price: 45.5,   rating: 4.0, image: "💡" },
  { id: 9,  name: "Nova 11\" Tablet",           category: "Electronics", price: 429.0,  rating: 4.6, image: "📱" },
  { id: 10, name: "Arc Noise-Cancelling Earbuds", category: "Electronics", price: 89.99, rating: 4.3, image: "🎵" },

  { id: 11, name: "Heritage Denim Jacket",      category: "Apparel", price: 89.5,  rating: 4.5, image: "🧥" },
  { id: 12, name: "Breeze Linen Shirt",         category: "Apparel", price: 42.0,  rating: 4.1, image: "👕" },
  { id: 13, name: "Summit Puffer Vest",         category: "Apparel", price: 75.0,  rating: 3.9, image: "🦺" },
  { id: 14, name: "Cloud Knit Sweater",         category: "Apparel", price: 65.99, rating: 4.6, image: "🧶" },
  { id: 15, name: "Trail Cargo Pants",          category: "Apparel", price: 55.0,  rating: 3.6, image: "👖" },
  { id: 16, name: "Coast Graphic Tee",          category: "Apparel", price: 19.99, rating: 3.2, image: "👚" },
  { id: 17, name: "Ember Wool Scarf",           category: "Apparel", price: 29.5,  rating: 4.4, image: "🧣" },
  { id: 18, name: "Midnight Formal Blazer",     category: "Apparel", price: 149.0, rating: 4.7, image: "🤵" },
  { id: 19, name: "Orbit Baseball Cap",         category: "Apparel", price: 22.0,  rating: 3.4, image: "🧢" },
  { id: 20, name: "Glacier Rain Jacket",        category: "Apparel", price: 110.0, rating: 4.2, image: "🌧️" },

  { id: 21, name: "Velocity Running Shoes",     category: "Footwear", price: 119.99, rating: 4.8, image: "👟" },
  { id: 22, name: "Terra Hiking Boots",         category: "Footwear", price: 165.0,  rating: 4.6, image: "🥾" },
  { id: 23, name: "Metro Leather Loafers",      category: "Footwear", price: 95.5,   rating: 4.0, image: "👞" },
  { id: 24, name: "Splash Slide Sandals",       category: "Footwear", price: 25.0,   rating: 3.3, image: "🩴" },
  { id: 25, name: "Court Classic Sneakers",     category: "Footwear", price: 79.99,  rating: 4.4, image: "👟" },
  { id: 26, name: "Stride Canvas Slip-Ons",     category: "Footwear", price: 49.0,   rating: 3.7, image: "🥿" },
  { id: 27, name: "Peak Trail Runners",         category: "Footwear", price: 139.5,  rating: 4.5, image: "🏃" },
  { id: 28, name: "Ballroom Dress Heels",       category: "Footwear", price: 129.0,  rating: 4.1, image: "👠" },
  { id: 29, name: "Harbor Winter Boots",        category: "Footwear", price: 189.99, rating: 4.9, image: "❄️" },
  { id: 30, name: "Breeze Espadrilles",         category: "Footwear", price: 39.5,   rating: 3.1, image: "👡" }
];

module.exports = { products };
