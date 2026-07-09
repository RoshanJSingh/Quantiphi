// Vercel serverless entry point — wraps the same Express app the local
// server runs. vercel.json rewrites /api/* here, and Express sees the
// original request URL, so the /api-mounted routes match unchanged.
const app = require("../backend/src/app");

module.exports = app;
