import { NextFunction, Request, Response } from "express";
import fakeRobotsList from "../../database/fakeRobots";
import Robot from "../../database/models/Robot";
import customError from "../../utils/customError";
import { getAllRobots, getById } from "./robotsControllers";

describe("Given robotsControllers controller", () => {
  const req: Partial<Request> = {};
  describe("When it's invoqued with getAllRobots method", () => {
    test("Then it should call the status method with a 200", async () => {
      const status = 200;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Robot.find = jest.fn().mockResolvedValue([]);
      const next = jest.fn();
      await getAllRobots(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the json method with the robots", async () => {
      const AllRobots = [
        { name: "aa", id: "asdfss" },
        { name: "bb", id: "asdf" },
      ];
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(AllRobots),
      };
      Robot.find = jest.fn().mockResolvedValue(AllRobots);
      const next = jest.fn();
      await getAllRobots(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith({ AllRobots });
    });
  });

  describe("When it have an error conecting with the database", () => {
    test("Then it should call next with the error created", async () => {
      const fakeError = customError(
        500,
        "Conection to database is down",
        "Cannot reach this request"
      );
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Robot.find = jest.fn().mockRejectedValue(new Error(""));
      const next = jest.fn();
      await getAllRobots(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(fakeError);
    });
  });
});

describe("Given a getById robots controller", () => {
  describe("When it receives a response object", () => {
    test("It should call the response method json with robot1 ", () => {
      const robotExpected = {
        id: "4",
        name: "robot1",
        creationData: "13-08-22",
        endurance: 8,
        speed: 8,
        urlImg: "asdf",
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      const req = { params: { idRobot: "4" } } as Partial<Request>;

      getById(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(robotExpected);
    });
  });
  test("It should call the status method with 200 code", () => {
    const status = 200;
    const req = { params: { idRobot: "" } } as Partial<Request>;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    getById(req as Request, res as Response);

    fakeRobotsList.find = jest.fn().mockReturnValue({
      id: "4",
      name: "robot1",
      creationData: "13-08-22",
      endurance: 8,
      speed: 8,
      urlImg: "asdf",
    });

    expect(res.status).toHaveBeenCalledWith(status);
  });
});
