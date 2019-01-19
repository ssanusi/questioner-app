import validator from "validator";
import isEmpty from "lodash.isempty";


const validateAddQuestion = (req, res, next) => {
  const { user, meetup, title, body } = req.body;
  const error = {};
  if (!user) {
    error.user = "user field is required";
  }

  if (user && !validator.isNumeric(user)) {
    error.user = "user field should be numeric";
  }

  if (!meetup) {
    error.meetup = "meetup field is required";
  }

  if (meetup && !validator.isNumeric(meetup)) {
    error.meetup = "Meetup field is required";
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
