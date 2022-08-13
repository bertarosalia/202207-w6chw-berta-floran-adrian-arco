import "./loadEnvironment";
import express from "express";
import morgan from "morgan";
import Debug from "debug";
import chalk from "chalk";
import routerRobots from "./server/routers/routersRobots";
import { app, startServer } from "./server/startServer";
import connectDatabase from "./database/connectDatabase";
import getById from "./server/controllers/robotsControllers";

const debug = Debug("ROBOTS:index");
const port = process.env.PORT ?? 4500;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use((req, rest, next) => {
  debug(chalk.blue(`A request has arrived to ${req.url}`));
  next();
});

app.use("/robots", routerRobots);

app.get("/:idRobot", getById);

connectDatabase(urlMongo);
startServer(+port);

export default app;
