import { Request, Response } from "express";
import Robot from "../../database/models/Robot";
import { getAllRobots } from "./robotsControllers";

describe("Given robotsControllers controller", () => {
  describe("When it's invoqued with getAllRobots method", () => {
    const req: Partial<Request> = {};

    test("Then it should call the status method with a 200", async () => {
      const status = 200;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Robot.find = jest.fn().mockResolvedValue([]);
      await getAllRobots(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the json method with the robots", async () => {
      const fakeRobots = [
        { name: "aa", id: "asdfss" },
        { name: "bb", id: "asdf" },
      ];
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(fakeRobots),
      };
      Robot.find = jest.fn().mockResolvedValue(fakeRobots);

      await getAllRobots(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(fakeRobots);
    });
  });
});
