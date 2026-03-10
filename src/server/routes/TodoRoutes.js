import express from "express";
import {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote
} from "../controllers/todoController.js";
import auth from "../middleware/authControl.js";

const router = express.Router();

router.post("/", auth, createNote);
router.get("/", auth, getAllNotes);
router.get("/:id", auth, getNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

export default router;