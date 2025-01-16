import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})