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

// questionRouter.param("id", questionController.getQuestionById);


questionRouter.route("/").get(_question2.default.getAllQuestions).post(_question2.default.addQuestion);

questionRouter.route("/:id").get(_question2.default.getQuestionById);
questionRouter.patch("/:id/upvote", _question2.default.upvote);
questionRouter.patch("/:id/downvote", _question2.default.downvote);

exports.default = questionRouter;