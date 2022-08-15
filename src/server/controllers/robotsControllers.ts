import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import Debug from "debug";
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

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.yellow("Received a getById req"));
  let requestedRobot;

  try {
    const { idRobot } = req.params;
    requestedRobot = await Robot.find({ _id: idRobot });

    debug(chalk.yellow("Sending a response from getById"));
    res.status(200).json(requestedRobot);
    next();
  } catch {
    next(customError(204, "Element not found", "Cant response this request"));
  }
};

export const createRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug("request arrived to createRobot");
  const robot = req.body;
  debug(req.body);
  try {
    const newRobot = await Robot.create(robot);
    res.status(201).json({ robot: newRobot });
  } catch (error) {
    const createError = customError(
      400,
      error.message,
      "Error creating new robot"
    );

    next(createError);
  }
};
