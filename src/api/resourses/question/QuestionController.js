import questionModel from "./QuestionModel";

class QuestionController {
  static getAllQuestions(req, res) {
    const questions = questionModel.getAllQuestions();
    return res.status(200).json({ status: 200, data: questions });
  }

  static addQuestion(req, res) {
    // if (!req.body.user || !req.body.meetup || !req.body.title || !req.body.body) {
    //   return res.status(404).json({ message: "All fields are required" });
    // }
    questionModel.addQuestion(req.body);
    return res.status(201).json({ status: 201, data: [req.body] });
  }

  static getQuestionById(req, res) {
    const question = questionModel.getQuestionById(Number(req.params.id));
    if (!question) {
      return res.status(404).json({ message: "question not found" });
    }
    return res.status(200).json({ status: 200, data: [question] });
  }

  static upvote(req, res) {
    const question = questionModel.getQuestionById(Number(req.params.id));
    if (question) {
      const updateQuestion = questionModel.upvote(Number(req.params.id));
      const { meetup, title, body, votes } = updateQuestion;
      const output = { meetup, title, body, votes };
      return res.status(200).json({ status: 200, data: [output] });
    }
    return res.status(400).json({ message: "question not found" });
  }

  static downvote(req, res) {
    const question = questionModel.getQuestionById(Number(req.params.id));
    if (question) {
      const updatedQuestion = questionModel.downvote(Number(req.params.id));
      const { meetup, title, body, votes } = updatedQuestion;
      const output = { meetup, title, body, votes };
      return res.status(200).json({ status: 200, data: [output] });
    }
    return res.status(400).json({ message: "question not found" });
  }
}

export default QuestionController;
