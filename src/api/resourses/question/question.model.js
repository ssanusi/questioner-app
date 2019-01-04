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
    return true;
  }

  getQuestionById(id) {
    return this.questions.find(question => question.id === id);
  }
}

export default new QuestionModel();
