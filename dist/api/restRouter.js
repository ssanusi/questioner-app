"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _meetup = require("./resourses/meetup/meetup.restRouter");

var _meetup2 = _interopRequireDefault(_meetup);

var _question = require("./resourses/question/question.restRouter");

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var restRouter = _express2.default.Router();

restRouter.use("/meetups", _meetup2.default);
restRouter.use("/questions", _question2.default);

exports.default = restRouter;