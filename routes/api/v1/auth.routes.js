import express from "express";

import {
  handleApiUserSignup,
  handleApiUserSignin,
  handleApiUserLogout,
} from "../../../controllers/api/v1/auth.controllers.js";

import {
  registerValidator,
  loginValidator,
} from "../../../validators/user.validator.js";

import validate from "../../../middlewares/validation.middleware.js";

const router = express.Router();

// POST /api/v1/auth/sign-up
router.post("/sign-up", registerValidator, validate, handleApiUserSignup);

// POST /api/v1/auth/sign-in
router.post("/sign-in", loginValidator, validate, handleApiUserSignin);

// POST /api/v1/auth/logout
router.post("/logout", handleApiUserLogout);

export default router;
