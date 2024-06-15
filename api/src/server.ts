import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mqttServer from "./mqtt";
import MONGOSERVER from "./database/mongo";
import CRATEDBSERVER from "./database/crate";
import sensorRouter from "./routes/sensorRoutes";

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
app.use('/api/sensors', sensorRouter);
// Iniciar servidor
app.listen(PORT, async () => {
  try {
    await Promise.all([mqttServer.init(), MONGOSERVER.initMongo(),CRATEDBSERVER.init()]);
  } catch (err) {
    console.error("Error ", err);
  }
});
