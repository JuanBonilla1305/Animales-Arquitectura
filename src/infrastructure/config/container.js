// --- IMPORTACIONES ---
import MongoAnimalRepository from "../repositories/MongoAnimalRepository.js"; 
import CreateAnimal from "../../application/usecases/usecasesanimals/CreateAnimal.js";
import GetAllAnimals from "../../application/usecases/usecasesanimals/GetAllAnimals.js";
import AnimalController from "../controllers/animalController.js"; 

import MongoDueñoRepository from "../repositories/MongoDueñoRepository.js"; 
import CreateDueño from "../../application/usecases/usecasesanimals/usecasesdueños/CreateDueño.js";
import GetAllDueños from "../../application/usecases/usecasesanimals/usecasesdueños/GetAllDueños.js";
import DueñoController from "../controllers/dueñoController.js";

// --- 1. REPOSITORIOS (Dales nombres únicos) ---
const animalRepository = new MongoAnimalRepository();
const dueñoRepository = new MongoDueñoRepository();

// --- 2. CASOS DE USO (Inyecta el repositorio correspondiente) ---
// Animales
const createAnimal = new CreateAnimal(animalRepository);
const getAllAnimals = new GetAllAnimals(animalRepository);

// Dueños
const createDueño = new CreateDueño(dueñoRepository);
const getAllDueños = new GetAllDueños(dueñoRepository);

// --- 3. CONTROLADORES ---
const animalController = new AnimalController({
  createAnimal,
  getAllAnimals,
});

const dueñoController = new DueñoController({
  createDueño,
  getAllDueños,
});

// --- 4. EXPORTACIÓN ---
export { animalController, dueñoController };