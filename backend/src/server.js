const app = require("./app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Marketplace API listening on http://localhost:${PORT}`);
});
