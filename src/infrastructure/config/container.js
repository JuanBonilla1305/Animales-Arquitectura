// --- IMPORTACIONES ---

// Animales
import MongoAnimalRepository from "../repositories/MongoAnimalRepository.js"; 
import CreateAnimal from "../../application/usecases/animals/CreateAnimal.js";
import GetAllAnimals from "../../application/usecases/animals/GetAllAnimals.js";
import AnimalController from "../controllers/animalController.js"; 

// Dueños
import MongoDueñoRepository from "../repositories/MongoDueñoRepository.js"; 
import CreateDueño from "../../application/usecases/dueños/CreateDueño.js";
import GetAllDueños from "../../application/usecases/dueños/GetAllDueños.js";
import DueñoController from "../controllers/dueñoController.js";

// Productos (NUEVO)
import { MongoProductoRepository } from "../repositories/MongoProductoRepository.js";
import { CreateProducto } from "../../application/usecases/productos/CreateProducto.js";
import { GetAllProductos } from "../../application/usecases/productos/GetAllProductos.js";
import { GetProductoBySku } from "../../application/usecases/productos/GetProductoBySku.js";
import { DeleteProducto } from "../../application/usecases/productos/DeleteProducto.js";
import { ProductoController } from "../controllers/ProductoController.js";
import { createProductoRouter } from "../routes/productoRoutes.js";
// --- 1. REPOSITORIOS ---
const animalRepository = new MongoAnimalRepository();
const dueñoRepository = new MongoDueñoRepository();
const productoRepository = new MongoProductoRepository(); // NUEVO

// --- 2. CASOS DE USO ---

// Animales
const createAnimal = new CreateAnimal(animalRepository);
const getAllAnimals = new GetAllAnimals(animalRepository);

// Dueños
const createDueño = new CreateDueño(dueñoRepository);
const getAllDueños = new GetAllDueños(dueñoRepository);

// Productos (NUEVO)
const createProducto = new CreateProducto(productoRepository);
const getAllProductos = new GetAllProductos(productoRepository);
const getProductoBySku = new GetProductoBySku(productoRepository);
const deleteProducto = new DeleteProducto(productoRepository);

// --- 3. CONTROLADORES ---

const animalController = new AnimalController({
  createAnimal,
  getAllAnimals,
});

const dueñoController = new DueñoController({
  createDueño,
  getAllDueños,
});

// Productos (NUEVO) - Nota: lo pasamos en orden, no como objeto
const productoController = new ProductoController(
  createProducto,
  getAllProductos,
  getProductoBySku,
  deleteProducto
);

// --- 4. RUTAS DE PRODUCTO ---
const productoRouter = createProductoRouter(productoController);

// --- 5. EXPORTACIÓN ---
export { animalController, dueñoController, productoRouter };