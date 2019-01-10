"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _MeetupRestRouter = require("./resourses/meetup/MeetupRestRouter");

var _MeetupRestRouter2 = _interopRequireDefault(_MeetupRestRouter);

var _QuestionRestRouter = require("./resourses/question/QuestionRestRouter");

var _QuestionRestRouter2 = _interopRequireDefault(_QuestionRestRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var restRouter = _express2.default.Router();

restRouter.use("/meetups", _MeetupRestRouter2.default);
restRouter.use("/questions", _QuestionRestRouter2.default);

exports.default = restRouter;