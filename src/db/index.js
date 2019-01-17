import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString
});

class Db {
  static query(queryString, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(queryString, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default Db;
