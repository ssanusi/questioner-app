import express from "express";
import questionController from "./question.controller";

const questionRouter = express.Router();

// questionRouter.param("id", questionController.getQuestionById);


questionRouter
  .route("/")
  .get(questionController.getAllQuestions)
  .post(questionController.addQuestion);

questionRouter.route("/:id").get(questionController.getQuestionById);
questionRouter.patch("/:id/upvote", questionController.upvote);
questionRouter.patch("/:id/downvote", questionController.downvote);

export default questionRouter;
