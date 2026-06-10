import express from "express";

import {
  handleApiGetAllNotes,
  handleApiGetNoteById,
  handleApiCreateNote,
  handleApiUpdateNote,
  handleApiDeleteNote,
} from "../../../controllers/api/v1/notes.controllers.js";

import { authenticated } from "../../../middlewares/authenticated.js";

import { noteValidator } from "../../../validators/note.validator.js";

import validate from "../../../middlewares/validation.middleware.js";

const router = express.Router();

// GET /api/v1/notes
router.get("/", authenticated, handleApiGetAllNotes);

// GET /api/v1/notes/:noteId
router.get("/:noteId", authenticated, handleApiGetNoteById);

// POST /api/v1/notes
router.post("/", authenticated, noteValidator, validate, handleApiCreateNote);

// PUT /api/v1/notes/:noteId
router.put(
  "/:noteId",
  authenticated,
  noteValidator,
  validate,
  handleApiUpdateNote,
);

// DELETE /api/v1/notes/:noteId
router.delete("/:noteId", authenticated, handleApiDeleteNote);

export default router;
