import express        from "express";
import animalRoutes  from "./infrastructure/routes/animalRoutes.js";
import { animalController } from "./infrastructure/config/container.js";

const app = express();
app.use(express.json());

app.use("/api", animalRoutes(animalController));

export default app;
