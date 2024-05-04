import { Pool } from "pg";

const db = new Pool({
  user: "admin",
  host: "0.0.0.0",
  database: "dutchDict",
  password: "adminPass",
  port: 5432, // or the port you are using for PostgreSQL
});

export default db;
