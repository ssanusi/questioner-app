import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

const createToken = (userId, username, isAdmin) =>
  jwt.sign({ userId, username , isAdmin }, secret, {
    expiresIn: "1 day"
  });

export default createToken;
