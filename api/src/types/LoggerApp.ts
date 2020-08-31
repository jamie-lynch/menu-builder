import { Application } from "express";
import { Logger } from "pino";

interface LoggerApp extends Application {
  log?: Logger;
}

export default LoggerApp;
