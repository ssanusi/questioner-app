import express from "express";
import cors from "cors";
import MeetupController from "./MeetupController";
import { validateAddMeetup, validateAddRsvp } from "../../middleware/meetupValidator";
import authorise from "../../middleware/authorization";

const meetupRouter = express.Router();

meetupRouter
  .route("/")
  .get(MeetupController.getAllMeetups)
  .post(validateAddMeetup, authorise, MeetupController.createMeetup);

meetupRouter.route("/upcoming").get(cors(), MeetupController.getAllupcoming);

meetupRouter
  .route("/:id")
  .get(MeetupController.getMeetupsById)
  .delete(authorise, MeetupController.deleteMeetup);
meetupRouter.route("/:id/rsvps").post(validateAddRsvp, MeetupController.addRsvp);

export default meetupRouter;
