"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QuestionModel = require("./QuestionModel");

var _QuestionModel2 = _interopRequireDefault(_QuestionModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionController = function () {
  function QuestionController() {
    _classCallCheck(this, QuestionController);
  }

  _createClass(QuestionController, null, [{
    key: "getAllQuestions",
    value: function getAllQuestions(req, res) {
      var questions = _QuestionModel2.default.getAllQuestions();
      return res.status(200).json({ status: 200, data: questions });
    }
  }, {
    key: "addQuestion",
    value: function addQuestion(req, res) {
      if (!req.body.user || !req.body.meetup || !req.body.title || !req.body.body) {
        return res.status(404).json({ message: "All fields are required" });
      }
      _QuestionModel2.default.addQuestion(req.body);
      return res.status(201).json({ status: 201, data: [req.body] });
    }
  }, {
    key: "getQuestionById",
    value: function getQuestionById(req, res) {
      var question = _QuestionModel2.default.getQuestionById(Number(req.params.id));
      if (!question) {
        return res.status(404).json({ message: "question not found" });
      }
      return res.status(200).json({ status: 200, data: [question] });
    }
  }, {
    key: "upvote",
    value: function upvote(req, res) {
      var question = _QuestionModel2.default.getQuestionById(Number(req.params.id));
      if (question) {
        var updateQuestion = _QuestionModel2.default.upvote(Number(req.params.id));
        var meetup = updateQuestion.meetup,
            title = updateQuestion.title,
            body = updateQuestion.body,
            votes = updateQuestion.votes;

        var output = { meetup: meetup, title: title, body: body, votes: votes };
        return res.status(200).json({ status: 200, data: [output] });
      }
      return res.status(400).json({ message: "question not found" });
    }
  }, {
    key: "downvote",
    value: function downvote(req, res) {
      var question = _QuestionModel2.default.getQuestionById(Number(req.params.id));
      if (question) {
        var updatedQuestion = _QuestionModel2.default.downvote(Number(req.params.id));
        var meetup = updatedQuestion.meetup,
            title = updatedQuestion.title,
            body = updatedQuestion.body,
            votes = updatedQuestion.votes;

        var output = { meetup: meetup, title: title, body: body, votes: votes };
        return res.status(200).json({ status: 200, data: [output] });
      }
      return res.status(400).json({ message: "question not found" });
    }
  }]);

  return QuestionController;
}();

exports.default = QuestionController;