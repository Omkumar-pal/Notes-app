import User from "../models/users.model.js";
import Note from "../models/notes.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// 👉 GET ALL USERS CONTROLLER
export const handleGetAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  res.render("allUsers", {
    users,
  });
});

// 👉 VIEW USER NOTES CONTROLLER
export const handleViewUserNotes = asyncHandler(async (req, res) => {
  const viewedUser = await User.findById(req.params.userId);

  if (!viewedUser) {
    res.status(404);
    throw new Error("User not found");
  }

  const notes = await Note.find({
    createdBy: viewedUser._id,
  });

  res.render("adminUserNotes", {
    viewedUser,
    notes,
  });
});

// 👉 DELETE USER CONTROLLER
export const handleDeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Prevent admin from deleting himself
  if (user._id.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error("You cannot delete yourself");
  }

  // Delete all notes belonging to that user
  await Note.deleteMany({
    createdBy: user._id,
  });

  // Delete user
  await user.deleteOne();

  res.redirect("/users/profile");
});
