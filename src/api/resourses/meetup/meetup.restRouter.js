import express from "express";
import meetupController from "./meetup.controller";

const meetupRouter = express.Router();

// meetupRouter.param("id", meetupController.getMeetupsById);

meetupRouter
  .route("/")
  .get(meetupController.getAll)
  .post(meetupController.createOne);

meetupRouter.route("/upcoming").get(meetupController.getAllupcoming);

meetupRouter.route("/:id").get(meetupController.getMeetupsById);
meetupRouter.route("/:id/rsvps").post(meetupController.addRsvp);

export default meetupRouter;
