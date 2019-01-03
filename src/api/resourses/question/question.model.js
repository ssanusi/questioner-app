import moment from "moment";

class QuestionModel {
  constructor() {
    this.questions = [];
  }

  getAllQuestions() {
    return this.questions;
  }
}

export default new QuestionModel();
