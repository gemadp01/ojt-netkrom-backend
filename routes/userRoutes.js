import express from "express";
const router = express.Router();

router.get("/", getUsers);

//! protected
// router.use(auth);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);

export default router;
