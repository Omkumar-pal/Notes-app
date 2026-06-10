// THIS STATIC.ROUTES.JS FILE CONTAINS THE CODE THAT RENDER VIEWS TO THE BROWSER

import express from "express";
import User from "../models/users.model.js";

import { setAuthStatus } from "../middlewares/setAuthStatus.js";
import { authenticated } from "../middlewares/authenticated.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

// 👉 RENDER HOME PAGE "/"
router.get(
  "/",
  setAuthStatus,
  asyncHandler(async (req, res) => {
    res.render("home", {
      authenticated: req.isAuthenticated,
      user: req.user,
    });
  }),
);

// 👉 RENDER SIGN-IN PAGE "/sign-in"
router.get("/sign-in", (req, res) => {
  res.render("signin");
});

// 👉 RENDER SIGN-UP PAGE "/sign-up"
router.get("/sign-up", (req, res) => {
  res.render("signup");
});

// 👉 RENDER USER PROFILE PAGE "/users/profile"
router.get(
  "/users/profile",
  authenticated,
  asyncHandler(async (req, res) => {
    let users = [];

    if (req.user.role === "admin") {
      users = await User.find().select("-password");
    }

    res.render("profile", {
      user: req.user,
      users,
    });
  }),
);

export default router;
