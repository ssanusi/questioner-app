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
      Object.assign({ id: this.questions.length + 1, createdOn: moment(), votes: 0 }, newQuestion)
    );
    return true;
  }

  getQuestionById(id) {
    return this.questions.find(question => question.id === id);
  }

  upvote(id) {
    const question = this.getQuestionById(id);
    const index = this.questions.indexOf(question);
    this.questions[index].votes = this.questions[index].votes + 1;
    return this.questions[index];
  }

  downvote(id) {
    const question = this.getQuestionById(id);
    const index = this.questions.indexOf(question);
    if (this.questions[index].votes !== 0) {
      this.questions[index].votes = this.questions[index].votes - 1;
    }
    return this.questions[index];
  }
}

export default new QuestionModel();
