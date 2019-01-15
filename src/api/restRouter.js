import express from "express";
import meetupRouter from "./resourses/meetup/MeetupRestRouter";
import questionRouter from "./resourses/question/QuestionRestRouter";


const restRouter = express.Router();

restRouter.use("/meetups", meetupRouter);
restRouter.use("/questions", questionRouter);

export default restRouter;
