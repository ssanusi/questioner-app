import createToken from "../../module/createToken";
import db from "../../../db";
import { hashPassword, checkPassword } from "../../module/encrypt";
import checkAdminRoute from "../../module/isAdminRoute";

class UserController {
  static signUp(req, res) {
    req.body.password = hashPassword(req.body.password);
    const isAdmin = checkAdminRoute(req.originalUrl);
    req.body.isAdmin = isAdmin;
    const queryString =
      "INSERT INTO users(firstname,lastname,phonenumber,email,username,password,isadmin) VALUES($1,$2,$3,$4,$5,$6,$7) returning id, firstname, lastname, email, phonenumber, username";
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.phoneNumber,
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.isAdmin
    ];
    db.query(queryString, values)
      .then(data => {
        const user = data.rows[0];
        const token = createToken(user.id, user.isadmin);
        return res
          .header("Authorization", `Bearer ${token}`)
          .status(201)
          .json({
            status: 201,
            data: [{ token, user: data.rows[0] }]
          });
      })
      .catch(e => res.status(409).json({ error: { user: "username or email exist" } }));
  }

  static login(req, res) {
    const queryString = "SELECT id,email,username,password,isadmin FROM users WHERE email = $1";
    db.query(queryString, [req.body.email]).then(data => {
      const user = data.rows[0];
      if (!user) {
        return res.status(404).json({ status: 404, error: "User not Found" });
      }
      if (!checkPassword(req.body.password, user.password)) {
        return res.status(404).json({ status: 404, error: "invalid credentials" });
      }
      if (checkAdminRoute(req.originalUrl) && !user.isadmin) {
        return res.status(401).json({ status: 401, error: "Admin only" });
      }
      const token = createToken(user.id, user.isadmin);
      return res
        .status(200)
        .header("Authorization", `Bearer ${token}`)
        .json({
          status: 200,
          data: [
            {
              token,
              message: `welcome ${user.username}`,
              user: {
                email: user.email,
                username: user.username,
                userId: user.id
              }
            }
          ]
        });
    });
  }
}
export default UserController;
