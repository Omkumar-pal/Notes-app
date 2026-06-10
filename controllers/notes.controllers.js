import Note from "../models/notes.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
// GET ALL NOTES CTRL
export const handleGetAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    createdBy: req.user._id,
  });

  res.render("notes", {
    notes,
    authenticated: req.isAuthenticated,
  });
});

// 👉 GET SINGLE NOTE BY ID CTRL
export const handleGetNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.noteId,
    createdBy: req.user._id,
  });

  if (!note) {
    res.status(404);
    throw new Error("No note found !!");
  }

  res.render("singleNote", {
    note,
  });
});

// 👉 CREATE A NEW NOTE CTRL
export const handleCreateNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("All fields are required !!");
  }

  const note = await Note.create({
    title,
    description,
    createdBy: req.user._id,
  });

  res.redirect("/notes");
});
// 👉 DELETE NOTE CTRL
export const handleDeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.noteId,
    createdBy: req.user._id,
  });

  if (!note) {
    res.status(404);
    throw new Error("No note found !!");
  }

  res.redirect("/notes");
});

// RENDER UPDATE PAGE
export const handleRenderEditNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.noteId,
    createdBy: req.user._id,
  });

  if (!note) {
    res.status(404);
    throw new Error("No note found !!");
  }

  res.render("editNote", {
    note,
  });
});

// 👉 UPDATE NOTE CTRL
export const handleUpdateNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const note = await Note.findOneAndUpdate(
    {
      _id: req.params.noteId,
      createdBy: req.user._id,
    },
    { title, description },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!note) {
    res.status(404);
    throw new Error("No note found !!");
  }

  res.redirect("/notes");
});
