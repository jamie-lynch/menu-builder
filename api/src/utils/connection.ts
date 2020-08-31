import { Logger } from "pino";
import { Server } from "http";

export const normalizePort = (val: string): number => {
  const port = parseInt(val, 10);

  if (isNaN(port) || !port || port <= 0) {
    return 80;
  }

  return port;
};

export const onError = (error: any, port: number, logger: Logger) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export const onListening = (server: Server, logger: Logger) => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  logger.info("Listening on " + bind);
};
