import "./loadEnvironment";
import morgan from "morgan";
import express from "express";
import Debug from "debug";
import chalk from "chalk";
// import connectDatabase from "./database/connectDatabase";
import routerRobots from "./server/routers/routersRobots";
import { app, startServer } from "./server/startServer";

const debug = Debug("ROBOTS:index");
const port = process.env.PORT ?? 4500;
// const urlMongo = process.env.MONGOURL as string;

app.use(express.json());
app.use(morgan("dev"));

app.use((req, rest, next) => {
  debug(chalk.blue(`A request has arrived to ${req.url}`));
  next();
});

app.use("/robots", routerRobots);

startServer(+port);
// connectDatabase(urlMongo);
