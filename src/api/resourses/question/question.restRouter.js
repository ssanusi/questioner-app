import express from "express";
import questionController from "./question.controller";

const questionRouter = express.Router();

questionRouter
  .route("/")
  .get(questionController.getAllQuestions)
  .post(questionController.addQuestion);

export default questionRouter;
