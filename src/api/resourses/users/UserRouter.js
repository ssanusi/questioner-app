import express from "express";
import UserController from "./UserController";
import userValidator from "../../middleware/userValidator";

const userRouter = express.Router();

userRouter.post("/signup", userValidator, UserController.signUp);


export default userRouter;
