import bcrypt from "bcryptjs";
import createToken from "../../module/createToken";
import db from "../../../db";

class UserController {
  static signUp(req, res) {
    const hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash;
    const queryString =
      "INSERT INTO users(firstname,lastname,othername,email,phonenumber,username,password,isadmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning id, firstname, lastname, email, phonenumber, username, isadmin";
    db.query(queryString, Object.values(req.body))
      .then(data => {
        const user = data.rows[0];
        const token = createToken(req.body.username);
        return res
          .status(201)
          .header("Authorization", `Bearer ${token}`)
          .json({
            status: 201,
            data: [
              {
                token,
                user: {
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  phonenumber: user.phonenumber,
                  username: user.username
                }
              }
            ]
          });
      })
      .catch(e => {
        if (e.code === "23505") {
          return res.status(409).json({ error: "username or email exist" });
        }
      });
  }

  static login(req, res) {
    const queryString = "SELECT * FROM users WHERE email = $1";
    //  Database query
    db.query(queryString, [req.body.email])
      .then(data => {
        const user = data.rows[0];
        if (!user) {
          res.status(404).json({ status: 404, error: "User not Found" });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.status(404).json({ status: 404, error: "invalid credentials" });
        }
        const token = createToken(req.body.email);
        return res
          .status(200)
          .header("Authorization", `Bearer ${token}`)
          .json({
            status: 200,
            data: [
              {
                token,
                message: "logged in",
                user: {
                  Firstname: user.firstname,
                  LastName: user.lastname,
                  Email: user.email,
                  Phone: user.phonenumber,
                  UserName: user.username
                }
              }
            ]
          });
      })
      .catch(error => {
        res.status(400).json({ status: 400, error: "database error" });
      });
  }
}
export default UserController;
