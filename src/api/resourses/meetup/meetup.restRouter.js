import express from "express";
import meetupController from "./meetup.controller";

const meetupRouter = express.Router();

meetupRouter
  .route("/")
  .get(meetupController.getAll)
  .post(meetupController.createOne);

meetupRouter.route("/upcoming").get(meetupController.getAllupcoming);

export default meetupRouter;
