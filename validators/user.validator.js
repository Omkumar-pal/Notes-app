import { body } from "express-validator";

// 👉 Register Validator
export const registerValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),

  body("email").trim().isEmail().withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// 👉 Login Validator
export const loginValidator = [
  body("email").trim().isEmail().withMessage("Please provide a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];
