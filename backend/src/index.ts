import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import db from "./db";

import authRouter from "./routes/auth";
import workflowRouter from "./routes/workflow";
import { isAuthenticated } from "./middleware/isAuthenticated";

const app: Express = express();

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

app.use("/auth", authRouter);
app.use("/api/workflow", isAuthenticated, workflowRouter);

app.listen(3000, () => {
  db.$connect();
  console.log("server is listning on port 3000");
});
