import express from "express";
import meetupController from "./MeetupController";
import MeetupController from "./MeetupController";

const meetupRouter = express.Router();

// meetupRouter.param("id", meetupController.getMeetupsById);

meetupRouter
  .route("/")
  .get(MeetupController.getAllMeetups)
  .post(MeetupController.createMeetup);

meetupRouter.route("/upcoming").get(MeetupController.getAllupcoming);

meetupRouter.route("/:id").get(MeetupController.getMeetupsById);
meetupRouter.route("/:id/rsvps").post(MeetupController.addRsvp);

export default meetupRouter;
