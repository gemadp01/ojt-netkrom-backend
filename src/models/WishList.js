import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // relasi ke User
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // relasi ke Product
      required: true,
    },
  },
  { timestamps: true }
);

const WishList = mongoose.model("WishList", wishlistSchema);

export default WishList;
