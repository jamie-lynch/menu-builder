import app from "./app";
import http from "http";
import { initialise } from "./utils/initialise";
import { normalizePort, onError, onListening } from "./utils/connection";
import { createConnection } from "typeorm";

initialise()
  .then((config) => {
    return createConnection(config);
  })
  .then(() => {
    const port = normalizePort(process.env.PORT || "80");
    app.set("port", port);

    const server = http.createServer(app);

    server.listen(port);
    server.on("error", (error) => onError(error, port, app.log));
    server.on("listening", () => onListening(server, app.log));
  });
