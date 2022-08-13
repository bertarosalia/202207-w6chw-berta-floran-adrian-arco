import { Request, Response } from "express";
import fakeRobotsList from "../../database/fakeRobots";
import { getById } from "./robotsControllers";

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
