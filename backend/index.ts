import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"
dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res:Response)=> {
    res.json({message: "hello world"});
}
)

app.listen(3000, ()=> {
    console.log("server is listning on port 3000")
})


