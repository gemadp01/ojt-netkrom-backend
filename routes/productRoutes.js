import express from "express";
const router = express.Router();

//! public
router.get("/");
router.get("/:productId");

//! protected
//* middleware
// router.use(auth);
// router.use(adminCheck);
router.get("/me");
router.get("/:productId");
router.post("/");
router.put("/:productId");
router.delete("/:productId");
