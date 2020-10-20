import express, { Response, Request } from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import path from "path";
import cors from "cors";
import createError from "http-errors";
import "reflect-metadata";

import dishRouter from "./routes/dish";
import ingredientRouter from "./routes/ingredient";

import HttpException from "./exceptions/HttpException";
import LoggerApp from "LoggerApp";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger";

const app: LoggerApp = express();

const logger = pino({
  prettyPrint: true,
  enabled: process.env.LOGGING !== "false",
});

app.log = logger;

app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/dish", dishRouter);
app.use("/ingredient", ingredientRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: HttpException, req: Request, res: Response, next: () => void) => {
  if (process.env.APP_ENV === "dev") {
    return res.status(err.status || 500).send(err.message);
  } else {
    return res.status(err.status || 500).send("An error occurred");
  }
});

export default app;
