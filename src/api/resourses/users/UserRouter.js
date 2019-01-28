import express from "express";
import cors from "cors";
import UserController from "./UserController";
import userValidator from "../../middleware/userValidator";

const userRouter = express.Router();

userRouter.post("/signup", cors(), userValidator, UserController.signUp);
userRouter.post("/login", UserController.login);

export default userRouter;
