import express from "express";
import { postContact } from "../controllers/contactController.js";
const router = express.Router();

router.post("/", postContact);

export default router;
