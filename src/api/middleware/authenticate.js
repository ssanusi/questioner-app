import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

const isLoggedIn = (req, res, next) => {
  const token = req.get("Authorization") ? req.get("Authorization").slice(7) : req.body.token;

  const error = {};

  if (!token) {
    error.token = "no token provided";
    return res.status(401).json({ error });
  }

  try {
    const verifiedToken = jwt.verify(token, secret);
    req.username = verifiedToken.username;
    return next();
  } catch (err) {
    error.message = "Unauthorized";
    return res.status(401).json({ error });
  }
};

export default isLoggedIn;
