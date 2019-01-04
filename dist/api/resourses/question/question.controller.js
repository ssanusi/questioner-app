"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _question = require("./question.model");

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionController = {
  getAllQuestions: function getAllQuestions(req, res) {
    var questions = _question2.default.getAllQuestions();
    return res.status(200).json({ status: 200, data: questions });
  },
  addQuestion: function addQuestion(req, res) {
    if (!req.body.user || !req.body.meetup || !req.body.title || !req.body.body) {
      return res.status(404).json({ message: "All fields are required" });
    }
    _question2.default.addQuestion(req.body);
    return res.status(201).json({ status: 201, data: [req.body] });
  },
  getQuestionById: function getQuestionById(req, res) {
    var question = _question2.default.getQuestionById(Number(req.params.id));
    if (!question) {
      return res.status(404).json({ message: "question not found" });
    }
    return res.status(200).json({ status: 200, data: [question] });
  },
  upvote: function upvote(req, res) {
    var question = _question2.default.getQuestionById(Number(req.params.id));
    if (question) {
      var updateQuestion = _question2.default.upvote(Number(req.params.id));
      var meetup = updateQuestion.meetup,
          title = updateQuestion.title,
          body = updateQuestion.body,
          votes = updateQuestion.votes;

      var output = { meetup: meetup, title: title, body: body, votes: votes };
      return res.status(200).json({ status: 200, data: [output] });
    }
    return res.status(400).json({ message: "question not found" });
  },
  downvote: function downvote(req, res) {
    var question = _question2.default.getQuestionById(Number(req.params.id));
    if (question) {
      var updatedQuestion = _question2.default.downvote(Number(req.params.id));
      var meetup = updatedQuestion.meetup,
          title = updatedQuestion.title,
          body = updatedQuestion.body,
          votes = updatedQuestion.votes;

      var output = { meetup: meetup, title: title, body: body, votes: votes };
      return res.status(200).json({ status: 200, data: [output] });
    }
    return res.status(400).json({ message: "question not found" });
  }
};

exports.default = questionController;