import { Pool } from "pg";

// const db = new Pool({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DB,
//   password: process.env.POSTGRES_PASSWORD,
//   port: process.env.POSTGRES_DOCKER_PORT, // or the port you are using for PostgreSQL
// });

const db = new Pool({
  user: "admin",
  host: "host.docker.internal",
  database: "dutchDict",
  password: "adminPass",
  port: 5432, // or the port you are using for PostgreSQL
});

export default db;
