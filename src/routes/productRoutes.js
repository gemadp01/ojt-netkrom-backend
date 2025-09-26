import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductsByAdmin,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { body } from "express-validator";
import upload from "../lib/uploadImage.js";
import auth from "../middleware/auth.js";
import adminCheck from "../middleware/adminCheck.js";
const router = express.Router();

//! public
router.get("/", getProducts);
router.get("/:productId", getProductById);

//! protected
//* middleware
router.use(auth);
router.use(adminCheck);
router.get("/admin/me", getProductsByAdmin);
// router.get("/:productId");
router.post(
  "/",
  upload.single("image"),
  body("name")
    .notEmpty()
    .isLength({ min: 1, max: 100 })
    .withMessage("Name is required"),
  body("description")
    .notEmpty()
    .isLength({ max: 1000 })
    .withMessage("Description is required"),
  body("category")
    .isIn([
      "ELECTRONICS",
      "CLOTHING_FASHION",
      "HOME_GARDEN",
      "SPORTS_OUTDOORS",
      "BOOKS_MEDIA",
      "TOYS_GAMES",
      "HEALTH_BEAUTY",
      "AUTOMOTIVE",
    ])
    .withMessage("Category must be valid"),
  body("status")
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("sku").notEmpty().withMessage("SKU is required"),
  body("stock").isNumeric().withMessage("Stock must be a number"),
  body("weight").isNumeric().withMessage("Weight must be a number"),
  body("image").notEmpty().withMessage("Image is required"),
  createProduct
);
// router.put("/:productId");
router.delete("/:productId", deleteProduct);

export default router;
