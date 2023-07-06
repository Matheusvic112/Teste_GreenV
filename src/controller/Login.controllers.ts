import { Request, Response } from "express";
import { loginService } from "../service/login.service";

export const loginController = async (req: Request, res: Response) => {
  const user = await loginService(req.body);

  return res.status(200).json(user);
};