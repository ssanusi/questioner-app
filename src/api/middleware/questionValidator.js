import validator from "validator";
import isEmpty from "lodash.isempty";

const validateAddQuestion = (req, res, next) => {
  const { meetupId, title, body } = req.body;
  const error = {};

  if (!meetupId) {
    error.meetupId = "meetupId field is required";
  }

  if (meetupId && !validator.isNumeric(meetupId)) {
    error.meetupId = "meetupId field is required";
  }

  if (!title) {
    error.title = "title field is required";
  }

  if (!body) {
    error.body = "body field is required";
  }

  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({ error });
};

export default validateAddQuestion;
