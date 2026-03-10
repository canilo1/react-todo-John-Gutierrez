import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser
} from "../controllers/authController.js";
import auth from "../middleware/authControl.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getCurrentUser);

export default router;