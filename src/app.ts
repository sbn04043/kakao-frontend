import express from "express";
import { createServer } from "http";
import cors from "cors";
import controller from "./controller";
import database from "./config/database";

const app = express();
app.use(cors());
app.use(express.json());
app.use(controller);

database.sync({
  alter: true,
});

const server = createServer(app);
server.listen(process.env.PORT || 5000);
