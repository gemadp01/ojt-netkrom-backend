import express from "express";
import {
  getUserByIdFromToken,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//! protected
router.use(auth);
router.get("/me", getUserByIdFromToken);
router.post("/logout", logout);

export default router;
