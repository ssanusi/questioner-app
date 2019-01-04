"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _question = require("./question.controller");

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionRouter = _express2.default.Router();

questionRouter.route("/").get(_question2.default.getAllQuestions).post(_question2.default.addQuestion);

exports.default = questionRouter;