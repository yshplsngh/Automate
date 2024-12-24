import { Router } from "express";

const workspaceRouter = Router();

workspaceRouter.get("/create", (req, res) => {
  res.json({ message: "workspace created" });
});
