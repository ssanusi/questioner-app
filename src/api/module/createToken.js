import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

const createToken = user =>
  jwt.sign({ username: user.username, userId: user.id, email: user.email }, secret, {
    expiresIn: "1 day"
  });

export default createToken;
