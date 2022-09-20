const express = require("express");
const app = express();
const cors = require("cors");
const productRoute = require('./routes/product.route')

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/product", productRoute)

module.exports = app;
