import Db from "../../../db";

class CommentController {
  static addComment(req, res) {
    const questionQueryString = "SELECT title, body FROM questions WHERE id = $1";
    Db.query(questionQueryString, [req.body.questionId]).then(qdata => {
      const commentQueryString =
        "INSERT INTO comments(questionId,userId,comment) VALUES($1,$2,$3) returning comment, questionid";
      const values = [req.body.questionId, req.body.userId, req.body.comment];
      Db.query(commentQueryString, values)
        .then(cdata =>
          res.status(201).json({ status: 201, data: Object.assign(cdata.rows[0], qdata.rows[0]) })
        )
        .catch(err => res.status(400).json({ err, message: "question does not exist" }));
    });
  }

  static getcommentsByQuestion(req, res) {
    const queryString =
      "SELECT comments.comment, users.firstname, users.lastname FROM comments JOIN users on userid = users.id WHERE questionid = $1";
    Db.query(queryString, [req.query.questionId])
      .then(data => res.status(200).json({ status: 200, data: data.rows }))
      .catch(err =>
        res.status(400).json({ err, message: "comment does not exist for this question" })
      );
  }
}

export default CommentController;
