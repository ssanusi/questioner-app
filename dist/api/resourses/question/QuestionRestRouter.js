"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _QuestionController = require("./QuestionController");

var _QuestionController2 = _interopRequireDefault(_QuestionController);

var _questionValidator = require("../../middleware/questionValidator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionRouter = _express2.default.Router();

questionRouter.route("/").get(_QuestionController2.default.getAllQuestions).post(_questionValidator.validateAddQuestion, _QuestionController2.default.addQuestion);

questionRouter.route("/:id").get(_QuestionController2.default.getQuestionById);
questionRouter.patch("/:id/upvote", _QuestionController2.default.upvote);
questionRouter.patch("/:id/downvote", _QuestionController2.default.downvote);

exports.default = questionRouter;