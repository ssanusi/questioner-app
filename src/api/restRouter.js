import express from "express";
import meetupRouter from "./resourses/meetup/MeetupRestRouter";
import questionRouter from "./resourses/question/QuestionRestRouter";
import userRouter from "./resourses/users/UserRouter";
import commentRouter from "./resourses/comment/CommentRouter";

const restRouter = express.Router();

restRouter.use("/meetups", meetupRouter);
restRouter.use("/questions", questionRouter);
restRouter.use("/auth", userRouter);
restRouter.use("/comments", commentRouter);

export default restRouter;
