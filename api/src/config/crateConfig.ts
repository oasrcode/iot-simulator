import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.CRATE_HOST || "localhost";
const PORT = process.env.CRATE_PORT ? parseInt(process.env.CRATE_PORT) : 5432;
const USER = process.env.CRATE_USER || "crate";

const OPTIONS = {
  host: HOST,
  port: PORT,
  user: USER,
};


const CRATECONFIG = {
  OPTIONS: OPTIONS,
};
export default CRATECONFIG;
