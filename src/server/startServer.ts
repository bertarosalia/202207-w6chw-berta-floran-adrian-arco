import "../loadEnvironment";
import express from "express";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("startServer");
const app = express();

const startServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.blue(`Server listening on port http://localhost:${port}`));
      resolve(true);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error connecting to database: ", error.message));
      reject(error);
    });
  });

export default startServer;
