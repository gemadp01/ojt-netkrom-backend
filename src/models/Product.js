import mongoose from "mongoose";

const CATEGORY = {
  ELECTRONICS: "ELECTRONICS",
  CLOTHING_FASHION: "CLOTHING_FASHION",
  HOME_GARDEN: "HOME_GARDEN",
  SPORTS_OUTDOORS: "SPORTS_OUTDOORS",
  BOOKS_MEDIA: "BOOKS_MEDIA",
  TOYS_GAMES: "TOYS_GAMES",
  HEALTH_BEAUTY: "HEALTH_BEAUTY",
  AUTOMOTIVE: "AUTOMOTIVE",
};

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: Object.values(CATEGORY), required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  price: { type: Number, required: true },
  sku: { type: String, required: true },
  stock: { type: Number, required: true },
  weight: { type: Number, required: false },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // referencing ke User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
