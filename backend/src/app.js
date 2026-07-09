const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");

// The Express app is exported without listening so it can run both as a
// local server (src/server.js) and as a Vercel serverless function (api/index.js).
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;
