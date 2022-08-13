import chalk from "chalk";
import Debug from "debug";
import { Request, Response } from "express";
import { Robot } from "../../models/Robot";

const debug = Debug("ROBOTS:Controllers");

const getAllRobots = async (req: Request, res: Response) => {
  debug(chalk.yellow("Received a getAllRobots req"));

  const AllRobots = await Robot.find();
  debug(chalk.yellow("Sending a response from getAllRobots"));
  res.status(200).json(AllRobots);
};

export default getAllRobots;
