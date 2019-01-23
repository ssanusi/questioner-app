import validator from "validator";
import isEmpty from "lodash.isempty";

const validateComment = (req, res, next) => {
  const { questionId, userId, comment } = req.body;
  const error = {};

  if (!questionId) {
    error.questionId = "quetionId is Required";
  }
  if (!userId) {
    error.userId = "userId is required";
  }
  if (!comment) {
    error.comment = "comment field is required";
  }

  if (questionId && !validator.isNumeric(parseInt(questionId, 10))) {
    error.questionId = "questionId should be numeric";
  }
  if (userId && !validator.isNumeric(parseInt(userId, 10))) {
    error.userId = "userId should be numeric";
  }

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({ error });
};

export default validateComment;
