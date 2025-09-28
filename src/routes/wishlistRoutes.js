import express from "express";
import {
  checkProductInWishlist,
  getWishlist,
  removeFromWishlist,
  toggleWishlist,
} from "../controllers/wishlistController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(auth);
router.get("/", getWishlist);
router.get("/:productId", checkProductInWishlist);
router.post("/:productId", toggleWishlist);
router.delete("/:productId", removeFromWishlist);

export default router;
