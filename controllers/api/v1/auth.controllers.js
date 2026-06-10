import User from "../../../models/users.model.js";
import { authToken } from "../../../utils/authToken.js";
import asyncHandler from "../../../middlewares/asyncHandler.js";

// 👉 SIGNUP CONTROLLER
export const handleApiUserSignup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  let user = await User.findOne({ email });

  if (user) {
    res.status(409);
    throw new Error("User already exists");
  }

  user = await User.create({
    fullName,
    email,
    password,
  });

  authToken(user._id, res);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

// 👉 SIGNIN CONTROLLER
export const handleApiUserSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  authToken(user._id, res);

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});

// 👉 LOGOUT CONTROLLER
export const handleApiUserLogout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});
