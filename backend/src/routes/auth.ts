import db from "../db";
import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await db.user.findFirst({
    where: {
      email,
      password,
    },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const payload = {
    userid: user.id,
    email: user.email,
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  return res.status(201).json({
    ...payload,
    token,
    success: true,
  });
});

authRouter.post(
  "/signup",
  async (req: Request, res: Response): Promise<any> => {
    // Your signup logic here

    return res.json({
      userid: "jlfskjdfkjsdf-sd-skdfj",
      success: true,
      email: "test@test.com",
      token: "lsjdkfjsldfjd",
      name: "saurav",
    });
  }
);

export default authRouter;
