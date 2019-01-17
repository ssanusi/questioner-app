import bcrypt from "bcryptjs";
import createToken from "../../module/createToken";
import pool from "../../../db/connection";

class UserController {
  static signUp(req, res) {
    // Password Hashing
    const hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash;
    //  Database query
    const queryText =
      "INSERT INTO users(firstName,lastName,otherName,email,phoneNumber,username,password,isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
    pool
      .query(queryText, Object.values(req.body))
      .then(data => {
        const token = createToken(req.body.username);
        return res
          .status(201)
          .header("Authorization", `Bearer ${token}`)
          .json({ status: 201, data: [{ token, user: req.body }] });
      })
      .catch(e => {
        if (e.code === "23505") {
          return res.status(409).json({ error: "username or email exist" });
        }
      });
  }
}
export default UserController;
