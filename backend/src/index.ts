import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { LoginHandler } from "./routes/auth";
dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

app.post("/login", LoginHandler);

app.use("/api");

app.listen(3000, () => {
  console.log("server is listning on port 3000");
});
