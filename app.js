import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoose from "./src/config/db.js";

//! load .env
dotenv.config();

const app = express();
const port = process.env.PORT;

//! connect to database
connectMongoose();

//! routes
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";

//! middleware
app.use(cors());
app.use(express.json());

//! endpoints
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);

//! error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
