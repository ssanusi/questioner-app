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
  }
};

exports.default = questionController;