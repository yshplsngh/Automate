import db from "../db";
import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password as string);

  if (!passwordMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const payload = {
    id: user.id,
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
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          message: "Email, password, and name are required.",
        });
      }

      const existingUser = await db.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      const payload = {
        userid: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
        token,
      });
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
);

export default authRouter;
