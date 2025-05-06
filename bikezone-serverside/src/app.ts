import cors from "cors";
import express, { Application, Request, Response } from "express";

import { globalErrorHandler } from "./app/middleeatres/globalErrorHandler";
import productRouter from "./app/modules/product/product.router";
import orderRouter from "./app/modules/order/order.router";
import authRouter from "./app/modules/auth/auth.router";
import userRouter from "./app/modules/user/user.router";

const app: Application = express();
//  CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://bike-zone-six.vercel.app",
    ],
    credentials: true,
  })
);

//parsers
app.use(express.json());

// application routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api", productRouter);
app.use("/api/order", orderRouter);

const getAController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getAController);
app.use(globalErrorHandler);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: "Route not found",
  });
});
export default app;
