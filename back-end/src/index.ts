import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Routes } from "./Routes";
import { Controller } from "./controller/Controller";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));

const controller = new Controller();
const routes = new Routes(controller, controller);
app.use(routes.getRouter());

app.listen(port);
console.log("API escuchando en el puerto " + port);
