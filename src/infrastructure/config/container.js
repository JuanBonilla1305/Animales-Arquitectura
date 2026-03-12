import MongoAnimalRepository from "../repositories/MongoAnimalRepository.js"; 
import CreateAnimal from "../../application/usecases/CreateAnimal.js";
import GetAllAnimals from "../../application/usecases/GetAllAnimals.js";
import AnimalController from "../controllers/animalController.js";

// 1. Repositorio
const repository = new MongoAnimalRepository();

// 2. Use cases
const createAnimal = new CreateAnimal(repository);
const getAllAnimals = new GetAllAnimals(repository);

// 3. Controller
const animalController = new AnimalController({
  createAnimal,
  getAllAnimals,
});

export { animalController };