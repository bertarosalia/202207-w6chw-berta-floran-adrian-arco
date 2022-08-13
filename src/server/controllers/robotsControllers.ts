import chalk from "chalk";
import { Request, Response } from "express";
import Debug from "debug";
import fakeRobotsList from "../../database/fakeRobots";

const debug = Debug("ROBOTS:Controllers");

export const getAllRobots = (req: Request, res: Response) => {
  debug(chalk.yellow("Received a getAllRobots req"));
  const { n } = req.query;
  const totalRobots = n ?? fakeRobotsList.length;
  const robots = fakeRobotsList.slice(0, +totalRobots);
  debug(chalk.yellow("Sending a response from getAllRobots"));
  res.status(200).json(robots);
};

export const getById = (req: Request, res: Response) => {
  const { idRobot } = req.params;

  const requestedRobot = fakeRobotsList.find((robot) => robot.id === idRobot);
  res.status(200).json(requestedRobot);
};
