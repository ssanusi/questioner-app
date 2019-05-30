import express from 'express';
import QuestionController from './QuestionController';
import validateAddQuestion from '../../middleware/questionValidator';

const questionRouter = express.Router();

questionRouter
  .route('/')
  .get(QuestionController.getAllQuestions)
  .post(validateAddQuestion, QuestionController.addQuestion);

questionRouter.route('/:id').get(QuestionController.getQuestionById);
questionRouter.patch('/:id/upvote', QuestionController.upvote);
questionRouter.patch('/:id/downvote', QuestionController.downvote);

export default questionRouter;
