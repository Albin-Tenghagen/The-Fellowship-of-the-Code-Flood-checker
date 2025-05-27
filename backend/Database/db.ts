import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Railway provides a single DATABASE_URL for connection
const connectionString = process.env.DATABASE_URL;

const pool = connectionString
  ? new Pool({
      connectionString,
    })
  : new Pool({
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      host: process.env.DBHOST,
      port: Number(process.env.DBPORT),
    });

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT id, name FROM admins");
    console.log("Connected! Admins (id and name):", res.rows);

    console.log("Connecting to DB with:", {
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      host: process.env.DBHOST,
      port: process.env.DBPORT,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Connection error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
};

export default { pool, testConnection };
