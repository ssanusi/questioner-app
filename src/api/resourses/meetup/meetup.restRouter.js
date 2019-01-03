import express from 'express';
import meetupController from './meetup.controller';

const meetupRouter = express.Router();

meetupRouter.route('/').get(meetupController.getAll);

export default meetupRouter;
