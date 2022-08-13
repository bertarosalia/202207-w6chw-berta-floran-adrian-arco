import { Request, Response } from "express";
import Robot from "../../database/models/Robot";
import { getAllRobots } from "./robotsControllers";

describe("Given robotsControllers controller", () => {
  describe("When it's invoqued with getAllRobots method", () => {
    test("Then it should call the status method with a 200", async () => {
      const status = 200;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const req: Partial<Request> = {};

      Robot.find = jest.fn().mockResolvedValue([]);

      await getAllRobots(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});
