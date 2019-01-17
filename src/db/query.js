import pool from "./connection";

const queryText = "TRUNCATE TABLE users CASCADE";
pool.query(queryText);
