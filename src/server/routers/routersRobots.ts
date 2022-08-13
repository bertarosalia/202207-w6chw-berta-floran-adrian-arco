import express from "express";
import getAllRobots from "../controllers/robotsControllers";

const routerRobots = express.Router();

routerRobots.get("/robots", getAllRobots);

export default routerRobots;
