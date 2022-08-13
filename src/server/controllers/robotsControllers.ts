import chalk from "chalk";
import { Request, Response } from "express";
import Debug from "debug";
import Robot from "../../database/models/Robot";

const debug = Debug("ROBOTS:Controllers");

export const getAllRobots = async (req: Request, res: Response) => {
  debug(chalk.yellow("Received a getAllRobots req"));
  const AllRobots = await Robot.find();
  debug(chalk.yellow("Sending a response from getAllRobots"));

  res.status(200).json(AllRobots);
};

export const getById = async (req: Request, res: Response) => {
  debug(chalk.yellow("Received a getById req"));
  const { idRobot } = req.params;
  const requestedRobot = await Robot.find({ _id: idRobot });
  debug(chalk.yellow("Sending a response from getById"));

  res.status(200).json(requestedRobot);
};
