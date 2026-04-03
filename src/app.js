import express from "express";
import cors from "cors";

// Importamos las rutas
import animalRoutes from "./infrastructure/routes/animalRoutes.js";
import dueñoRoutes from "./infrastructure/routes/dueñoRoutes.js";

// Importamos TODOS los controladores y el router de productos desde el mismo container local
import { 
  animalController, 
  dueñoController, 
  productoRouter 
} from "./infrastructure/config/container.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/animals", animalRoutes(animalController));
app.use("/api/duenos", dueñoRoutes(dueñoController));
app.use("/api/productos", productoRouter); // La nueva ruta de inventario

export default app;