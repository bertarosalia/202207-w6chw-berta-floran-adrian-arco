import chalk from "chalk";
import Debug from "debug";
import { Request, Response } from "express";
import fakeRobotsList from "../../database/fakeRobots";

const debug = Debug("ROBOTS:Controllers");

const getAllRobots = (req: Request, res: Response) => {
  debug(chalk.yellow("Received a getAllRobots req"));
  const { n } = req.query;
  const totalRobots = n ?? fakeRobotsList.length;
  const robots = fakeRobotsList.slice(0, +totalRobots);
  debug(chalk.yellow("Sending a response from getAllRobots"));
  res.status(200).json(robots);
};

export default getAllRobots;
