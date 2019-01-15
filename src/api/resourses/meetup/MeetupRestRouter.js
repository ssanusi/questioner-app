import express from "express";
import MeetupController from "./MeetupController";
import { validateAddMeetup, validateAddRsvp } from "../../middleware/meetupValidator";

const meetupRouter = express.Router();

meetupRouter
  .route("/")
  .get(MeetupController.getAllMeetups)
  .post(validateAddMeetup, MeetupController.createMeetup);

meetupRouter.route("/upcoming").get(MeetupController.getAllupcoming);

meetupRouter.route("/:id").get(MeetupController.getMeetupsById);
meetupRouter.route("/:id/rsvps").post(validateAddRsvp, MeetupController.addRsvp);

export default meetupRouter;
