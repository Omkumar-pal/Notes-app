import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const setAuthStatus = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.isAuthenticated = false;
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");

    req.isAuthenticated = true;
    req.user = user;

    next();
  } catch (error) {
    req.isAuthenticated = false;
    req.user = null;
    next();
  }
};
