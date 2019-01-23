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

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      error.message = "Unauthorized";
      return res.status(401).json({ error });
    }
    req.userId = decodedToken;
    return next();
  });
};

export default isLoggedIn;
