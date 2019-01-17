import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

if (process.env.NODE_ENV === "test") {
  const connectionString = process.env.DATABASE_URL;
}

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString
});

export default pool;
