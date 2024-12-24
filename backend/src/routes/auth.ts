import db from "../db";

import { Request, Response } from "express";

export const LoginHandler = async (req: Request, res: Response) => {
  res.json({
    userid: "jlfskjdfkjsdf-sd-skdfj",
    message: "success",
    email: "test@test.com",
    token: "lsjdkfjsldfjd",
  });
};

export const signupHandler = async (req: Request, res: Response) => {
  res.json({
    userid: "jlfskjdfkjsdf-sd-skdfj",
    message: "success",
    email: "test@test.com",
    token: "lsjdkfjsldfjd",
  });
};
