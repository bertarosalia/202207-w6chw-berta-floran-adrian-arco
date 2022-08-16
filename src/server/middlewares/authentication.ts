import "../../loadEnvironment";
import { NextFunction, Request, Response } from "express";
import customError from "../../utils/customError";
import { JwtPayload, verifyToken } from "../../utils/auth";

interface CustomRequest extends Request {
  payload: JwtPayload;
}

const authentication = (
  _res: Response,
  req: CustomRequest,
  next: NextFunction
) => {
  const error = customError(400, "Bad request", "Authentication Error");
  const dataAuthentication = req.get("Authorization");

  if (!dataAuthentication || !dataAuthentication.startsWith("Bearer ")) {
    next(error);
    return;
  }
  const token = dataAuthentication.slice(7);
  const tokenData = verifyToken(token);
  if (typeof tokenData === "string") {
    next(error);
    return;
  }

  req.payload = tokenData as JwtPayload;
  next();
};

export default authentication;
