import express from 'express';
import meetupRouter from './resourses/meetup/meetup.restRouter';

const restRouter = express.Router();

restRouter.use('/meetups', meetupRouter);

export default restRouter;
