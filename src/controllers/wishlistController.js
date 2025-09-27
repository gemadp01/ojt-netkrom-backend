import Product from "../models/Product.js";
import WishList from "../models/WishList.js";

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await WishList.findAll({
      where: { userId },
      include: Product,
    });
    res.json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProductToWishlist = async (req, res) => {
  try {
    console.log(productId);
    const { productId } = req.body;
    const userId = req.user.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await WishList.create({ userId, product });
    res.json({ message: "Product added to wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
