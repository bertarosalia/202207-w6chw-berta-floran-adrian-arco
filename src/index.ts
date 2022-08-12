import "./loadEnvironment";
import startServer from "./server/startServer";

const port = process.env.PORT;

startServer(+port);
