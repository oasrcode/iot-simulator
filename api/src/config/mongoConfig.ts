import dotenv from "dotenv";
import { MongoClientOptions } from "mongodb";
dotenv.config();

const username = process.env.MONGO_USER || "admin";
const password = process.env.MONGO_PASSWORD || "admin";

const url = process.env.MONGO_URL || "mongodb://mongo:27017";
const db = process.env.MONGO_DB || "iot-dashboard"
const options: MongoClientOptions = {
  auth: {
    password: username,
    username: password,
  },
  authSource: "admin",
};

const mongoConfig = {
  url,
  options,
  db
};

export default mongoConfig;
