import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "../routes/v1/index.js";
import { createAdmin } from "../utils/createAdmin.js";

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:3333",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());

app.use("/api/v1/", (req, _, next) => {
  console.log(`Method: ${req.method} } | Path: ${req.path}`);
  next();
});
app.use("/api/v1", router);
//app.use("/api/v1/admin");

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "simple",
  })
  .then(() => {
    console.log(`Banco de dados sincronizado com sucesso!`);
    createAdmin();
  })
  .catch((error) => {
    console.error(
      `Não foi possível sincronizar o banco de dados devido o error: ${error.messsage}`
    );
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
