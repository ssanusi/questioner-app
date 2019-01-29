import express from "express";
import meetupRouter from "./resourses/meetup/MeetupRestRouter";
import questionRouter from "./resourses/question/QuestionRestRouter";
import userRouter from "./resourses/users/UserRouter";
import commentRouter from "./resourses/comment/CommentRouter";
import isLoggedIn from "./middleware/authenticate";

const restRouter = express.Router();

restRouter.use("/meetups",  meetupRouter);
restRouter.use("/questions", isLoggedIn, questionRouter);
restRouter.use("/auth", userRouter);
restRouter.use("/comments", isLoggedIn, commentRouter);
restRouter.use("/admin/auth", userRouter);

export default restRouter;
