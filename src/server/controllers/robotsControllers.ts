import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import fakeRobotsList from "../../database/fakeRobots";
import Robot from "../../database/models/Robot";
import customError from "../../utils/customError";

const debug = Debug("ROBOTS:Controllers");

export const getAllRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.yellow("Received a getAllRobots req"));
  try {
    const AllRobots = await Robot.find();
    debug(chalk.yellow("Sending a response from getAllRobots"));

    res.status(200).json({ AllRobots });
  } catch {
    const errorGetAll = customError(
      500,
      "Conection to database is down",
      "Cannot reach this request"
    );

    next(errorGetAll);
  }
};

export const getById = (req: Request, res: Response) => {
  const { idRobot } = req.params;
  const requestedRobot = fakeRobotsList.find((robot) => robot.id === idRobot);

  res.status(200).json(requestedRobot);
};
