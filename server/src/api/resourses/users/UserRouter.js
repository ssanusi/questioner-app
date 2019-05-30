import express from 'express';
import cors from 'cors';
import UserController from './UserController';
import { SignupValidator, loginValidator } from '../../middleware/userValidator';

const userRouter = express.Router();

userRouter.post('/signup', cors(), SignupValidator, UserController.signUp);
userRouter.post('/login', loginValidator, UserController.login);

export default userRouter;
