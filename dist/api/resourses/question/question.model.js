"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuestionModel = function () {
  function QuestionModel() {
    _classCallCheck(this, QuestionModel);

    this.questions = [];
  }

  _createClass(QuestionModel, [{
    key: "getAllQuestions",
    value: function getAllQuestions() {
      return this.questions;
    }
  }, {
    key: "addQuestion",
    value: function addQuestion(newQuestion) {
      this.questions.push(Object.assign({ id: this.questions.length + 1, createdOn: (0, _moment2.default)(), votes: 0 }, newQuestion));
      return true;
    }
  }, {
    key: "getQuestionById",
    value: function getQuestionById(id) {
      return this.questions.find(function (question) {
        return question.id === id;
      });
    }
  }, {
    key: "upvote",
    value: function upvote(id) {
      var question = this.getQuestionById(id);
      var index = this.questions.indexOf(question);
      this.questions[index].votes = this.questions[index].votes + 1;
      return this.questions[index];
    }
  }, {
    key: "downvote",
    value: function downvote(id) {
      var question = this.getQuestionById(id);
      var index = this.questions.indexOf(question);
      if (this.questions[index].votes !== 0) {
        this.questions[index].votes = this.questions[index].votes - 1;
      }
      return this.questions[index];
    }
  }]);

  return QuestionModel;
}();

exports.default = new QuestionModel();