import dotenv from "dotenv";
import { MongoClientOptions } from "mongodb";
dotenv.config();

const USERNAME = process.env.MONGO_USER || "admin";
const PASSWORD = process.env.MONGO_PASSWORD || "admin";

const URL = process.env.MONGO_URL || "mongodb://mongo:27017";
const DB = process.env.MONGO_DB || "iot-dashboard";
const OPTIONS: MongoClientOptions = {
  auth: {
    password: USERNAME,
    username: PASSWORD,
  },
  authSource: "admin",
};

const mongoConfig = {
  URL,
  OPTIONS,
  DB,
};

export default mongoConfig;
