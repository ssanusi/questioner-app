import Db from "../../../db";

class CommentController {
  static addComment(req, res) {
    const questionQueryString = "SELECT title, body FROM questions WHERE id = $1";
    Db.query(questionQueryString, [req.body.questionId])
      .then(qdata => {
        const commentQueryString =
          "INSERT INTO comments(questionId,userId,comment) VALUES($1,$2,$3) returning comment, questionid";
        const values = [req.body.questionId, req.body.userId, req.body.comment];
        Db.query(commentQueryString, values)
          .then(cdata =>
            res.status(201).json({ status: 201, data: Object.assign(cdata.rows[0], qdata.rows[0]) })
          )
          .catch(err => res.status(400).json({ message: "question does not exist" }));
      })
      .catch(err => res.status(400).json({ message: "question does not exist" }));
  }
}

export default CommentController;
