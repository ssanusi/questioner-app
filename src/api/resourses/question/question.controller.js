import questionModel from "./question.model";

const questionController = {
  getAllQuestions(req, res) {
    const questions = questionModel.getAllQuestions();
    return res.status(200).json({ status: 200, data: questions });
  },

  addQuestion(req, res) {
    if (!req.body.user || !req.body.meetup || !req.body.title || !req.body.body) {
      return res.status(404).json({ message: "All fields are required" });
    }
    questionModel.addQuestion(req.body);
    return res.status(201).json({ status: 201, data: [req.body] });
  },

  getQuestionById(req,res, next, id) {
    const question = questionModel.getQuestionById(Number(id));
    if (!question) {
      return res.status(404).json({ message: "question not found" });
    }
    return res.status(200).json({ status: 200, data: [question] });
  }
};

export default questionController;
