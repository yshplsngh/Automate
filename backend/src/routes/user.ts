import { Router } from "express";

const userRouter = Router();

userRouter.get("/create", (req, res) => {
  res.json({ message: "user created" });
});
