import express from "express";
import MeetupController from "./MeetupController";

const meetupRouter = express.Router();


meetupRouter
  .route("/")
  .get(MeetupController.getAllMeetups)
  .post(MeetupController.createMeetup);

meetupRouter.route("/upcoming").get(MeetupController.getAllupcoming);

meetupRouter.route("/:id").get(MeetupController.getMeetupsById);
meetupRouter.route("/:id/rsvps").post(MeetupController.addRsvp);

export default meetupRouter;
