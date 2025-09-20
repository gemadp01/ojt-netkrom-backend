import express from "express";
import { sendContactMessage } from "../controllers/contactController.js";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .custom((value) => {
        if (!value.toLowerCase().endsWith("@gmail.com")) {
          throw new Error("Email must be a Gmail address");
        }
        return true;
      }),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("message").notEmpty().withMessage("Message is required"),
    body("phone")
      .optional()
      .matches(/^(\+62|62|08)[0-9]{8,13}$/)
      .withMessage("Phone number must be valid Indonesian format"),
    body("category")
      .isIn([
        "GENERAL_INQUIRY",
        "CUSTOMER_SUPPORT",
        "SALES_QUESTION",
        "PARTNERSHIP",
        "FEEDBACK",
      ])
      .withMessage("Category must be valid"),
  ],
  sendContactMessage
);

export default router;
