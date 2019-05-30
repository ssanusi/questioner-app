import express from 'express';
import CommentController from './CommentController';
import validateComment from '../../middleware/commentValidator';

const commentRouter = express.Router();
commentRouter
  .route('/')
  .post(validateComment, CommentController.addComment)
  .get(CommentController.getcommentsByQuestion);

export default commentRouter;
