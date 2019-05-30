import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

const createToken = (userId, isAdmin) => jwt.sign({ userId, isAdmin }, secret, {
  expiresIn: '1 day',
});

export default createToken;
