import chalk from "chalk";
import { Request, Response } from "express";
import Debug from "debug";
import fakeRobotsList from "../../database/fakeRobots";
import Robot from "../../models/Robot";

const debug = Debug("ROBOTS:Controllers");

export const getAllRobots = async (req: Request, res: Response) => {
  debug(chalk.yellow("Received a getAllRobots req"));
  const AllRobots = await Robot.find();
  debug(chalk.yellow("Sending a response from getAllRobots"));

  res.status(200).json(AllRobots);
};

export const getById = (req: Request, res: Response) => {
  const { idRobot } = req.params;
  const requestedRobot = fakeRobotsList.find((robot) => robot.id === idRobot);

  res.status(200).json(requestedRobot);
};
