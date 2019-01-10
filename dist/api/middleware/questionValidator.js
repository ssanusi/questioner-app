"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUpvote = exports.validateAddQuestion = undefined;

var _validator = require("validator");

var _validator2 = _interopRequireDefault(_validator);

var _lodash = require("lodash.isempty");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateAddQuestion = exports.validateAddQuestion = function validateAddQuestion(req, res, next) {
  var _req$body = req.body,
      user = _req$body.user,
      meetup = _req$body.meetup,
      title = _req$body.title,
      body = _req$body.body;

  var error = {};
  if (!user) {
    error.user = "user field is required";
  }

  if (user && !_validator2.default.isNumeric(user)) {
    error.user = "user field should be numeric";
  }

  if (!meetup) {
    error.meetup = "Meetup field is required";
  }

  if (meetup && !_validator2.default.isNumeric(meetup)) {
    error.meetup = "Meetup field is required";
  }

  if (!title) {
    error.title = "title field is required";
  }

  if (title && _validator2.default.isEmpty(title.trim())) {
    error.title = "title field is required";
  }

  if (!body) {
    error.body = "body field is required";
  }
  if (body && _validator2.default.isEmpty(body.trim())) {
    error.body = body;
  }

  if ((0, _lodash2.default)(error)) {
    return next();
  }
  return res.status(400).json({ error: error });
};
var validateUpvote = exports.validateUpvote = function validateUpvote(req, res, next) {};