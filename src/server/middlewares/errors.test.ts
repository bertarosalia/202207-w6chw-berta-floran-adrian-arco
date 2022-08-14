import { NextFunction, Request, Response } from "express";
import CustomError from "../../types/errorTypes";
import generalError from "./errors";

describe("Given a general error function", () => {
  describe("When it receives a response object", () => {
    const req = {} as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    test("Then it should call the response method with status code 404", () => {
      const statusCode = 404;
      const next = jest.fn();

      const error = {
        statusCode: 404,
        publicmessage: "Endpoint not found",
        privatemessage: "Access error",
      };
      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});
