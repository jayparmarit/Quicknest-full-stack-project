import dotenv from "dotenv";
dotenv.config({path:"./.env"});

import express from "express";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import AdminRouter from "./routes/AdminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
  
import { rateLimit  } from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";

const app = express();


app.use(express.json());

app.use(helmet());

app.use(rateLimit());

app.use(hpp());

app.use("/user", userRouter);

app.use("/admin", AdminRouter);

app.use("/booking",bookingRoutes);

app.use("/provider",providerRoutes);

app.get("/", (req, res) => {
  res.json("hello from server start");
});

app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message } || "internal server error");
});

const port = process.env.PORT || 5000;

console.log("port", port);

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();