import { Request, Response } from "express";
import { createToken, JwtPayload } from "../../utils/auth";

interface LoginData {
  id: string;
  userName: string;
}
const loginUser = (res: Response, req: Request) => {
  const user = req.body as LoginData;

  // const user:{userName: string, password:string}=
  // Todo comprobar el usuario
  // Me dará un id:asdfasdfasdfsdaf

  const payload: JwtPayload = {
    id: "234asdfsdfasdf23423",
    userName: user.userName,
  };

  const responseData = { user: { token: createToken(payload) } };

  res.status(200).json(responseData);
};

export default loginUser;
