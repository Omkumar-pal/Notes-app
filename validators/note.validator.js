import { body } from "express-validator";

// 👉 Create / Update Note Validator
export const noteValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),
];
