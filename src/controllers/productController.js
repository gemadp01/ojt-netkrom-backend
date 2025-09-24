import Product from "../models/Product.js";

//! user
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//! admin
export const getProductByAdmin = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  if (!req.user || !req.user.id || req.user.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const product = await Product.create({
      ...req.body,
      image: req.file.filename,
      user: req.user.id,
    });
    res
      .status(201)
      .json({ success: true, message: "Product created!", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
