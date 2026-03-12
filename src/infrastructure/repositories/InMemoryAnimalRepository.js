import animalRepository from "../../domain/repositories/animalRepository.js";

export default class InMemoryAnimalRepository extends animalRepository {
  constructor() {
    super();
    this.animals = [];
  }
  async save(animal) {
    const index = this.animals.findIndex(p => p.id === animal.id);
    if (index >= 0) {
      this.animals[index] = animal;
    } else {
      this.animals.push(animal);
    }
    return animal;
  }
  async findAll() {
    return this.animals;
  }
}
