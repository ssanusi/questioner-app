import moment from "moment";
import db from "../../../db";

class QuestionController {
  static getAllQuestions(req, res) {
    const queryString = "SELECT * FROM questions";
    db.query(queryString).then(data => {
      // if (data.rows.length === 0) {
      //   return res.status(404).json({ message: "no questions" });
      // }
      res.status(200).json({ status: 200, data: data.rows });
    });
    // .catch(err => res.status(400).json({ err }));
  }

  static addQuestion(req, res) {
    const queryString = `INSERT INTO
    questions(createdon,userId, meetupId, title, body)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      moment(new Date()),
      parseInt(req.body.user, 10),
      parseInt(req.body.meetup, 10),
      req.body.title,
      req.body.body
    ];
    db.query(queryString, values)
      .then(data => res.status(201).json({ status: 201, data: data.rows[0] }))
      .catch(err => {
        if (err.code === "23503" && err.constraint === "questions_userid_fkey") {
          return res.status(400).json({ message: "user does not exist" });
        }
        if (err.code === "23503" && err.constraint === "questions_meetup_fkey") {
          return res.status(400).json({ message: "meetup does not exist" });
        }
        // return res.status(400).json({ error: err });
      });
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
    // .catch(err => res.status(400).json({ err }));
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
    // .catch(err => res.status(400).json({ err }));
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
    // .catch(err => res.status(400).json({ err }));
  }
}

export default QuestionController;
