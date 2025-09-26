import fs from "fs";
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
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//! admin
export const getProductsByAdmin = async (req, res) => {
  if (!req.user || !req.user.id || req.user.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

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

export const updateProduct = async (req, res) => {
  if (!req.user || !req.user.id || req.user.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Update field
    product.set({
      ...req.body,
      ...(req.file && { image: req.file.filename }), // kalau ada file baru, update image
      user: req.user.id,
    });

    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product updated!", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found!" });

    // jika ada file, hapus dari disk
    if (product.image) {
      const imagePath = process.cwd() + "/public/uploads/" + product.image;

      fs.unlink(imagePath, (err) => {
        if (err) console.log("Gagal hapus file: ", err);
        else console.log("Berhasil hapus: ", imagePath);
      });
    }

    await product.deleteOne();
    res.json({ message: "Product successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
