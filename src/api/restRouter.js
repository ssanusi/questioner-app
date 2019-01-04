import express from "express";
import meetupRouter from "./resourses/meetup/meetup.restRouter";
import questionRouter from "./resourses/question/question.restRouter";

const restRouter = express.Router();

restRouter.use("/meetups", meetupRouter);
restRouter.use("/questions", questionRouter);

export default restRouter;
