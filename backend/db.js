// db.js
import mysql from "mysql2/promise";

// Database connection configuration
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "", // leave empty if no password is set
  database: "copems", // replace with your actual database name
  charset: "utf8mb4",
});

console.log("✅ Connected to MariaDB (Promise Pool)");

export default db;
