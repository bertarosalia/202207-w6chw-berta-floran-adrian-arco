import express from "express";
import loginUser from "../controllers/userControllers";

const usersRouter = express.Router();

usersRouter.post("/login", loginUser);

export default usersRouter;
