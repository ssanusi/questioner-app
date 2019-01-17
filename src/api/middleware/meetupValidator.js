import validator from "validator";
import isEmpty from "lodash.isempty";

export const validateAddMeetup = (req, res, next) => {
  const error = {};
  const { topic, location, happeningOn, tags } = req.body;
  if (!topic) {
    error.topic = "Topic field is Required";
  }

  if (!location) {
    error.location = "Location field is Required";
  }

  if (!happeningOn) {
    error.happeningOn = "happeningOn field is Required";
  }

  if (!tags) {
    error.tags = "tags field is Required";
  }
  if (tags && tags.length === 0) {
    error.tags = "tags field is Required";
  }
  if (isEmpty(error)) {
    return next();
  }
  return res.status(400).json({ error });
};

export const validateAddRsvp = (req, res, next) => {
  const { user, topic, status } = req.body;
  const { id } = req.params;
  const validatedMeetup = {};
  const error = {};
  if (user) {
    validatedMeetup.user = parseInt(user, 10);
  }

  if (topic) {
    validatedMeetup.topic = topic;
  }

  if (status) {
    validatedMeetup.status = status;
  }
  if (id) {
    validatedMeetup.meetup = parseInt(id, 10);
  }
  if (!user) {
    error.user = "User field is Required";
  }

  if (!topic) {
    error.topic = "Topic field is Required";
  }

  if (!status) {
    error.status = "Status field is Required";
  }

  if (id && !validator.isNumeric(id)) {
    error.id = "Meetup id must be numeric";
  }
  if (isEmpty(error)) {
    req.body.validatedMeetup = validatedMeetup;
    return next();
  }
  return res.status(400).json({ error });
};
