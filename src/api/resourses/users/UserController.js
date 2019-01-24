import createToken from "../../module/createToken";
import db from "../../../db";
import { hashPassword, checkPassword } from "../../module/encrypt";

class UserController {
  static signUp(req, res) {
    req.body.password = hashPassword(req.body.password);
    const queryString =
      "INSERT INTO users(firstname,lastname,othername,email,phonenumber,username,password,isadmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning id, firstname, lastname, email, phonenumber, username";
    db.query(queryString, Object.values(req.body))
      .then(data => {
        const user = data.rows[0];
        const token = createToken(user.username, user.id);
        return res
          .header("Authorization", `Bearer ${token}`)
          .status(201)
          .json({
            status: 201,
            data: [{ token, user: data.rows[0] }]
          });
      })
      .catch(e => {
        if (e.code === "23505") {
          return res.status(409).json({ error: "username or email exist" });
        }
      });
  }

  static login(req, res) {
    const queryString = "SELECT  id,email,username,password,isadmin FROM users WHERE email = $1 ";
    db.query(queryString, [req.body.email])
      .then(data => {
        const user = data.rows[0];
        if (!user) {
          res.status(404).json({ status: 404, error: "User not Found" });
        }
        if (!checkPassword(req.body.password, user.password)) {
          res.status(404).json({ status: 404, error: "invalid credentials" });
        }
        const token = createToken(user.id, user.username, user.isadmin);
        return res
          .status(200)
          .header("Authorization", `Bearer ${token}`)
          .json({
            status: 200,
            data: [
              {
                token,
                message: `welcome ${user.username}`,
                user: { email: user.email, username: user.username }
              }
            ]
          });
      })
      .catch(error => {
        res.status(400).json({ status: 400, error });
      });
  }
}
export default UserController;
