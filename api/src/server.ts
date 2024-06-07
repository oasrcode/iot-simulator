import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mqttServer from "./mqtt";
import mongoServer from "./database/mongo";
import crateServer from "./database/crate";

dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);
if (!PORT) {
  console.error("El puerto no está definido en las variables de entorno");
  process.exit(1);
}

const app: Express = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Manejador de errores
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).send("Error!");
  }
);

// Iniciar servidor
app.listen(PORT, async () => {
  try {
    await Promise.all([mqttServer.init(), mongoServer.initMongo(),crateServer.init()]);
  } catch (err) {
    console.error("Error ", err);
  }
});
