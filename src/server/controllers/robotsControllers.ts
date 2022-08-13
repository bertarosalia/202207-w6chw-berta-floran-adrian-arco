import chalk from "chalk";
import Debug from "debug";
import { Request, Response } from "express";
import IRobot from "../../models/robot";

const debug = Debug("robotsController");

const fakeRobotsList: IRobot[] = [
  {
    name: "robot1",
    creationData: "13-08-22",
    endurance: 8,
    speed: 8,
    urlImg: "asdf",
  },

  {
    name: "robot2",
    creationData: "creatiionData",
    endurance: 6,
    speed: 5,
    urlImg: "urlIMGIMGIGM",
  },
];

const getAllRobots = (req: Request, res: Response) => {
  debug(chalk.yellow("Received a getAllRobots req"));
  const { n } = req.query;
  const totalRobots = n ?? fakeRobotsList.length;
  const robots = fakeRobotsList.slice(0, +totalRobots);
  debug(chalk.yellow("Sending a response from getAllRobots"));
  res.status(200).json({ robots });
};

export default getAllRobots;
