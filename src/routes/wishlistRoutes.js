import express from "express";
import {
  getWishlist,
  addProductToWishlist,
  // removeProductFromWishlist,
} from "../controllers/wishlistController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getWishlist);
router.post("/", auth, addProductToWishlist);
// router.delete("/", auth, removeProductFromWishlist);

export default router;
