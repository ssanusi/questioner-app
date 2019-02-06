import moment from "moment";
import db from "../../../db";

class QuestionController {
  static getAllQuestions(req, res) {
    const queryString =
      "SELECT questions.id, questions.title, questions.body, questions.upvotes, questions.downvotes, questions.meetupid, questions.userid , users.firstname, users.lastname FROM questions JOIN users ON questions.userid = users.id WHERE meetupid = $1";
    db.query(queryString, [req.query.id]).then(data => {
      res.status(200).json({ status: 200, data: data.rows });
    });
  }

  static addQuestion(req, res) {
    const queryString = `INSERT INTO
    questions(createdon,userId, meetupId, title, body)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      moment(new Date()),
      parseInt(req.body.userId, 10),
      parseInt(req.body.meetupId, 10),
      req.body.title,
      req.body.body
    ];
    db.query(queryString, values)
      .then(data => res.status(201).json({ status: 201, data: data.rows[0] }))
      .catch(err => res.status(400).json({ err, message: "meetup does not exist" }));
  }

  static getQuestionById(req, res) {
    const queryString = "SELECT * FROM questions WHERE id = $1";
    const question = parseInt(req.params.id, 10);

    db.query(queryString, [question]).then(data => {
      if (data.rows.length === 0) {
        return res.status(404).json({ message: "question not found" });
      }
      return res.status(200).json({ status: 200, data: data.rows });
    });
  }

  static upvote(req, res) {
    const queryString = "UPDATE questions SET upvotes = upvotes + 1 WHERE id = $1 returning *";
    const question = parseInt(req.params.id, 10);
    db.query(queryString, [question]).then(data => {
      if (!data.rows[0]) {
        return res.status(400).json({ message: "question not found" });
      }
      return res.status(200).json({ status: 200, data: data.rows[0] });
    });
  }

  static downvote(req, res) {
    const queryString = "UPDATE questions SET downvotes = downvotes + 1 WHERE id = $1 returning *";
    const question = parseInt(req.params.id, 10);
    db.query(queryString, [question]).then(data => {
      if (!data.rows[0]) {
        return res.status(400).json({ message: "question not found" });
      }
      return res.status(200).json({ status: 200, data: data.rows[0] });
    });
  }
}

export default QuestionController;
