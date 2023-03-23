import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

import connectDB from "./db/connect.js";
import "express-async-errors";

//routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoute.js";

//middle ware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(` \n Server is listening on port ${port} \n`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
