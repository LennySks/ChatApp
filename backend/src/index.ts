import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import {authRoutes} from "./routes/auth.route";
import {connectDB} from "./utils/db";
import cookieParser from "cookie-parser";
import {createRouteHandler} from "uploadthing/express";
import {uploadRouter} from "./uploadthing";
import {messagesRoute} from "./routes/message.route";
import cors from "cors";
import {app, server} from "./utils/socket";

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoute);
app.use(
    "/api/uploadthing",
    createRouteHandler({
        router: uploadRouter,
        config: {
            token: process.env.UPLOADTHING_TOKEN,
            logLevel: "Debug",
            logFormat: "logFmt",
        },
    })
);

server.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
    connectDB();
});