import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  host: process.env.DBHOST,
  port: Number(process.env.DBPORT),
});

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT * FROM admins");
    console.log("Connected! admins for DB:", res.rows[0]);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Connection error:", error.message);
    } else {
      console.error("Unknown error:", error);
    } // Log full error message
  }
};

export default { pool, testConnection };
