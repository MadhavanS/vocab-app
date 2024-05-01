import express from "express";
import langRouter from "./routes/lang.route";
import cors from "cors";
// import conn from "./config/sequelize";
// import { Sequelize } from "sequelize/types";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/app", langRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
