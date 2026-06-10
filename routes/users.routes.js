import express from "express";

import {
  handleUserSignup,
  handleUserSignin,
  handleUserLogout,
} from "../controllers/auth.controllers.js";

import {
  handleGetAllUsers,
  handleDeleteUser,
  handleViewUserNotes,
} from "../controllers/admin.controllers.js";

import { authenticated, authorize } from "../middlewares/authenticated.js";

import validate from "../middlewares/validation.middleware.js";

import {
  registerValidator,
  loginValidator,
} from "../validators/user.validator.js";

const router = express.Router();

// 👉 SIGN-UP USER ROUTE      /users/sign-up
router.post("/sign-up", registerValidator, validate, handleUserSignup);

// 👉 SIGN-IN USER ROUTE      /users/sign-in
router.post("/sign-in", loginValidator, validate, handleUserSignin);

// 👉 LOGOUT USER ROUTE       /users/logout
router.post("/logout", handleUserLogout);

// 👉 GET ALL USERS ROUTE     /users/admin/users
router.get(
  "/admin/users",
  authenticated,
  authorize("admin"),
  handleGetAllUsers,
);

// 👉 DELETE USER ROUTE       /users/admin/users/:userId/delete
router.post(
  "/admin/users/:userId/delete",
  authenticated,
  authorize("admin"),
  handleDeleteUser,
);

// 👉 VIEW USER NOTES ROUTE   /users/admin/users/:userId/notes
router.get(
  "/admin/users/:userId/notes",
  authenticated,
  authorize("admin"),
  handleViewUserNotes,
);

export default router;
