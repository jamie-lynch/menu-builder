import { Request } from "express";
import { Logger } from "pino";

interface LoggerRequest extends Request {
  log: Logger;
}

export default LoggerRequest;
