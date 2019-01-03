import questionModel from "./question.model";

const questionController = {
  getAllQuestions(req, res) {
    const questions = questionModel.getAllQuestions();
    return res.status(200).json({ status: 200, data: questions });
  }
};

export default questionController;
