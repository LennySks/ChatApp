import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ msg: "No user found with this token, authorization denied" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
