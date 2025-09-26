import express from "express";
import {
  getUserByIdFromToken,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters"),
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("phone")
      .optional()
      .matches(/^(\+62|62|08)[0-9]{8,13}$/)
      .withMessage("Phone number must be valid Indonesian format"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],

  register
);
router.post("/login", login);

//! protected
router.use(auth);
router.get("/me", getUserByIdFromToken);
router.post("/logout", logout);

export default router;
