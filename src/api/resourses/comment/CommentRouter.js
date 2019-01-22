import express from "express";
import CommentController from "./CommentController";

const commentRouter = express.Router();
commentRouter.route("/").post(CommentController.addComment);

export default commentRouter;
