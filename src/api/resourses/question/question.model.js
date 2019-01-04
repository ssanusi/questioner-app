import moment from "moment";

class QuestionModel {
  constructor() {
    this.questions = [];
  }

  getAllQuestions() {
    return this.questions;
  }

  addQuestion(newQuestion) {
    this.questions.push(
      Object.assign({ id: this.questions.length + 1, createdOn: moment() }, newQuestion)
    );
    return true
  }
}

export default new QuestionModel();
