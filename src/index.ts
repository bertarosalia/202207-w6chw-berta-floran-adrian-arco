import "./loadEnvironment";
import express from "express";
import morgan from "morgan";
import Debug from "debug";
import chalk from "chalk";
import cors from "cors";
import connectDatabase from "./database";
import routerRobots from "./server/routers/routersRobots";
import { app, startServer } from "./server/startServer";
import generalError from "./server/middlewares/errors";

const debug = Debug("ROBOTS:index");
const port = process.env.PORT ?? 4500;
const urlMongo = process.env.MONGOURL;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, rest, next) => {
  debug(chalk.blue(`A request has arrived to ${req.url}`));
  next();
});

app.use("/robots", routerRobots);
app.use("/", generalError);

(async () => {
  try {
    await startServer(+port);
    await connectDatabase(urlMongo);
  } catch (error) {
    process.exit(1);
  }
})();

export default app;
