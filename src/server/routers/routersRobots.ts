import express from "express";

import { getAllRobots, getById } from "../controllers/robotsControllers";

const routerRobots = express.Router();

routerRobots.get("/", getAllRobots);

routerRobots.get("/:idRobot", getById);

export default routerRobots;
