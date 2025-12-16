require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");

connectDB();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/products", productRoutes);
app.use("/auth", userRoutes);

app.listen(port, () => {
  console.log(`App2 listening at http://localhost:${port}`);
});

module.exports = app;
