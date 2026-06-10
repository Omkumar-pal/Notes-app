import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const authenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/sign-in");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.redirect("/sign-in");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.redirect("/sign-in");
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: "Access denied",
      });
    }

    next();
  };
};
