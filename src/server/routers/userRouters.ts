import express from "express";
import loginUser from "../middlewares/users";

const usersRouter = express.Router();

usersRouter.post("/login", loginUser);

export default usersRouter;
