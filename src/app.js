import express from "express";
import animalRoutes from "./infrastructure/routes/animalRoutes.js";
import dueñoRoutes from "./infrastructure/routes/dueñoRoutes.js"; // Importa el nuevo router
import { animalController, dueñoController } from "./infrastructure/config/container.js"; // Importa ambos controladores

const app = express();
app.use(express.json());

// Prefijos de ruta para mantener el orden
app.use("/api/animals", animalRoutes(animalController));
app.use("/api/duenos",  dueñoRoutes(dueñoController));

export default app;