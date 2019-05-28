import express from "express";
import cors from "cors";
import MeetupController from "./MeetupController";
import { validateAddMeetup, validateAddRsvp } from "../../middleware/meetupValidator";
import authorise from "../../middleware/authorization";
import isLoggedIn from "../../middleware/authenticate";

const meetupRouter = express.Router();

meetupRouter
  .route("/")
  .get(isLoggedIn, MeetupController.getAllMeetups)
  .post(isLoggedIn, authorise, validateAddMeetup, MeetupController.createMeetup);

meetupRouter.route("/upcoming").get(cors(), MeetupController.getAllupcoming);
meetupRouter.route("/rsvps").get(isLoggedIn, MeetupController.getRsvpsByUser);

meetupRouter
  .route("/:id")
  .get(isLoggedIn, MeetupController.getMeetupsById)
  .delete(isLoggedIn, authorise, MeetupController.deleteMeetup);
meetupRouter.route("/:id/rsvps").post(isLoggedIn, validateAddRsvp, MeetupController.addRsvp);

export default meetupRouter;
