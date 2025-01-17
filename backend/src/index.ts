import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {router} from "./routes/auth.route";
import {connectDB} from "./lib/db";
import cookieParser from "cookie-parser";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    connectDB();
})


app.use("/api/auth", router)