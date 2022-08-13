import "./loadEnvironment";
import connectDatabase from "./database/connectDatabase";
import startServer from "./server/startServer";

const port = process.env.PORT ?? 4500;
const urlMongo = process.env.MONGOURL as string;

connectDatabase(urlMongo);
startServer(+port);
