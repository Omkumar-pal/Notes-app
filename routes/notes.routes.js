import express from "express";

import {
  handleCreateNote,
  handleDeleteNote,
  handleGetAllNotes,
  handleGetNoteById,
  handleUpdateNote,
  handleRenderEditNote,
} from "../controllers/notes.controllers.js";

import { authenticated } from "../middlewares/authenticated.js";
import { setAuthStatus } from "../middlewares/setAuthStatus.js";

import validate from "../middlewares/validation.middleware.js";

import { noteValidator } from "../validators/note.validator.js";

const router = express.Router();

// 👉 GET ALL NOTES        /notes
router.get("/", authenticated, setAuthStatus, handleGetAllNotes);

// 👉 CREATE NEW NOTE      /notes/create
router.post(
  "/create",
  authenticated,
  noteValidator,
  validate,
  handleCreateNote,
);

// 👉 RENDER EDIT PAGE     /notes/edit/:noteId
router.get("/edit/:noteId", authenticated, handleRenderEditNote);

// 👉 DELETE NOTE          /notes/delete/:noteId
router.post("/delete/:noteId", authenticated, handleDeleteNote);

// 👉 UPDATE NOTE          /notes/edit/:noteId
router.post(
  "/edit/:noteId",
  authenticated,
  noteValidator,
  validate,
  handleUpdateNote,
);

// 👉 GET NOTE BY ID       /notes/:noteId
router.get("/:noteId", authenticated, handleGetNoteById);

export default router;
