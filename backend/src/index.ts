import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import db from "./db";
import morgan from "morgan";

import authRouter from "./routes/auth";
import workflowRouter from "./routes/workflow";
import { isAuthenticated } from "./middleware/isAuthenticated";
import jobRouter from "./routes/job";

const app: Express = express();

app.use(express.json());

app.use(cors());
app.use(morgan("combined"));
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

app.use("/auth", authRouter);
app.use("/api/workflow", isAuthenticated, workflowRouter);
app.use("/api/job", jobRouter);

app.listen(3000, () => {
  db.$connect();
  console.log("server is listning on port 3000");
});
