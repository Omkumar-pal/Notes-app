import User from "../models/users.model.js";
import Note from "../models/notes.model.js";
import { authToken } from "../utils/authToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// 👉 SIGNUP CONTROLLER
export const handleUserSignup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  let user = await User.findOne({
    email,
  });

  if (user) {
    res.status(400);
    throw new Error("User already exists !!");
  }

  user = await User.create({
    fullName,
    email,
    password,
  });

  authToken(user._id, res);

  res.redirect("/");
});

// 👉 SIGNIN CONTROLLER
export const handleUserSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user || !(await user.comparePassword(password))) {
    return res.render("signin", {
      error: "Invalid email or password !!",
    });
  }

  authToken(user._id, res);

  res.redirect("/");
});

// 👉 GET ALL USERS CONTROLLER
export const handleGetAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  res.render("allUsers", {
    users,
  });
});

// 👉 LOGOUT CONTROLLER
export const handleUserLogout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  res.redirect("/sign-in");
});
