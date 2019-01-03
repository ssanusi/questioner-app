import express from "express";
import meetupController from "./meetup.controller";

const meetupRouter = express.Router();

meetupRouter.param("id", meetupController.getMeetupsById);

meetupRouter
  .route("/")
  .get(meetupController.getAll)
  .post(meetupController.createOne);

meetupRouter.route("/upcoming").get(meetupController.getAllupcoming);

meetupRouter.route("/:id").get(meetupController.getMeetupsById);

export default meetupRouter;
