import express from 'express';
import meetupController from './meetup.controller';

const meetupRouter = express.Router();

meetupRouter
  .route('/')
  .get(meetupController.getAll)
  .post(meetupController.createOne);

export default meetupRouter;
