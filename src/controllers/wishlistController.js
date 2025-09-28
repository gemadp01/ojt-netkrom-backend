import Product from "../models/Product.js";
import WishList from "../models/WishList.js";

export const getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await WishList.find({ user: userId }).populate("product");

    res.json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    // cek apakah produk ada di wishlist user
    const existing = await WishList.findOne({
      user: userId,
      product: productId,
    });

    if (existing) {
      // kalau ada, hapus
      await WishList.deleteOne({ _id: existing._id });
      return res.json({
        success: true,
        message: "Product removed from wishlist",
        isWishlisted: false,
      });
    } else {
      // kalau belum ada, tambahin
      const wishlist = await WishList.create({
        user: userId,
        product: productId,
      });
      return res.json({
        success: true,
        message: "Product added to wishlist",
        wishlist,
        isWishlisted: true,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkProductInWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user?.id;

    if (!userId) {
      return res.json({ isWishlisted: false });
    }

    const exists = await WishList.exists({
      user: userId,
      product: productId,
    });

    res.json({ isWishlisted: !!exists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user?.id;

    await WishList.deleteOne({
      user: userId,
      product: productId,
    });

    res.json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
