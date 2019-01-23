import Db from "../../../db";

class CommentController {
  static addComment(req, res) {
    const queryString = "INSERT INTO comments(questionId,userId,comment) VALUES($1,$2,$3)";
    const values = [req.body.questionId, req.body.userId, req.body.comment];
    Db.query(queryString, values)
      .then()
      .catch();
  }
}

export default CommentController;
