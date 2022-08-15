import express from "express";

import {
  createRobot,
  getAllRobots,
  getById,
} from "../controllers/robotsControllers";

const routerRobots = express.Router();

routerRobots.get("/", getAllRobots);
routerRobots.get("/:idRobot", getById);
routerRobots.post("/create", createRobot);

export default routerRobots;
