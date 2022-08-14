import { NextFunction, Request, Response } from "express";
import Robot from "../../database/models/Robot";
import customError from "../../utils/customError";
import { getAllRobots, getById } from "./robotsControllers";

describe("Given robotsControllers controller", () => {
  const req: Partial<Request> = {};
  describe("When it's invoqued with getAllRobots method", () => {
    const next = jest.fn();

    test("Then it should call the status method with a 200", async () => {
      const status = 200;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Robot.find = jest.fn().mockResolvedValue([]);
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
      await getAllRobots(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith({ AllRobots });
    });
  });
});

describe("Given a getById robots controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();

  describe("When it receives a response object", () => {
    test("It should call the response method json with robot1 ", async () => {
      const robotExpected = {
        id: "4",
        name: "robot1",
        creationData: "13-08-22",
        endurance: 8,
        speed: 8,
        urlImg: "asdf",
      };
      const req = { params: { idRobot: "4" } } as Partial<Request>;

      Robot.find = jest.fn().mockResolvedValue(robotExpected);
      await getById(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith(robotExpected);
    });
  });
  test("It should call the status method with 200 code", async () => {
    const status = 200;
    const req = { params: { idRobot: "" } } as Partial<Request>;
    const fakeRobots = [
      { name: "aa", id: "asdfss" },
      { name: "bb", id: "asdf" },
    ];
    Robot.find = jest.fn().mockReturnValue(fakeRobots);
    await getById(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(status);
  });

  describe("When it receives an unexist id", () => {
    test("It should give a Custom Error message", async () => {
      const error = customError(
        204,
        "Element not found",
        "Can´t response this request"
      );
      const req = { params: { idRobot: "" as unknown } } as Partial<Request>;
      Robot.find = jest.fn().mockRejectedValue(new Error(""));
      await getById(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
