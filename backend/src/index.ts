import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.route";
import { connectDB } from "./utils/db";
import cookieParser from "cookie-parser";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
import { messagesRoute } from "./routes/message.route";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
  connectDB();
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messagesRoute);
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
