"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAddRsvp = exports.validateAddMeetup = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require("lodash.isempty");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateAddMeetup = exports.validateAddMeetup = function validateAddMeetup(req, res, next) {
  var error = {};
  var _req$body = req.body,
      topic = _req$body.topic,
      location = _req$body.location,
      happeningOn = _req$body.happeningOn,
      tags = _req$body.tags;

  if (!topic) {
    error.topic = "Topic field is Required";
  }
  if (topic && _validator2.default.isEmpty(topic.trim())) {
    error.topic = "Topic field is Required";
  }
  if (!location) {
    error.location = "Location field is Required";
  }
  if (location && _validator2.default.isEmpty(location.trim())) {
    error.location = "Location field are required";
  }
  if (!happeningOn) {
    error.happeningOn = "happeningOn field is Required";
  }
  if (happeningOn && _validator2.default.isEmpty(happeningOn.trim())) {
    error.happeningOn = "happeningOn field is Required";
  }
  if (!tags) {
    error.tags = "tags field is Required";
  }
  if (tags && tags.length === 0) {
    error.tags = "tags field is Required";
  }
  if ((0, _lodash2.default)(error)) {
    return next();
  }
  return res.status(400).json({ error: error });
};

var validateAddRsvp = exports.validateAddRsvp = function validateAddRsvp(req, res, next) {
  var _req$body2 = req.body,
      user = _req$body2.user,
      topic = _req$body2.topic,
      status = _req$body2.status;
  var id = req.params.id;

  var validatedMeetup = {};
  var error = {};
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
  if (user && _validator2.default.isEmpty(user.trim())) {
    error.user = "User field is Required";
  }
  if (!topic) {
    error.topic = "Topic field is Required";
  }
  if (topic && _validator2.default.isEmpty(topic.trim())) {
    error.topic = "Topic field is Required";
  }
  if (!status) {
    error.status = "Status field is Required";
  }
  if (status && _validator2.default.isEmpty(status.trim())) {
    error.status = "Status field is Required";
  }

  if (id && !_validator2.default.isNumeric(id)) {
    error.id = "Meetup id must be numeric";
  }
  if ((0, _lodash2.default)(error)) {
    req.body.validatedMeetup = validatedMeetup;
    return next();
  }
  res.status(400).json({ error: error });
};