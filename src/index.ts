import "./loadEnvironment";
import morgan from "morgan";
import express from "express";
import Debug from "debug";
import chalk from "chalk";
import connectDatabase from "./database/connectDatabase";
import startServer from "./server/startServer";
import getAllRobots from "./server/controllers/robotsControllers";

const port = process.env.PORT ?? 4500;
const urlMongo = process.env.MONGOURL as string;
const app = express();
const debug = Debug("index");

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  debug(chalk.yellow(`A request has arrived to ${req.url}`));
  next();
});

connectDatabase(urlMongo);
startServer(+port);

// app.get("", getAllRobots());
