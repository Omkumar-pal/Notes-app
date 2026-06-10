import Note from "../../../models/notes.model.js";
import asyncHandler from "../../../middlewares/asyncHandler.js";

// 👉 GET ALL NOTES
export const handleApiGetAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    createdBy: req.user._id,
  });

  res.status(200).json({
    success: true,
    count: notes.length,
    notes,
  });
});

// 👉 GET NOTE BY ID
export const handleApiGetNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.noteId,
    createdBy: req.user._id,
  });

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.status(200).json({
    success: true,
    note,
  });
});

// 👉 CREATE NOTE
export const handleApiCreateNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const note = await Note.create({
    title,
    description,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

// 👉 UPDATE NOTE
export const handleApiUpdateNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndUpdate(
    {
      _id: req.params.noteId,
      createdBy: req.user._id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});

// 👉 DELETE NOTE
export const handleApiDeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.noteId,
    createdBy: req.user._id,
  });

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});
