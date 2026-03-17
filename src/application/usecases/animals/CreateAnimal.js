import Animal from "../../../domain/entities/animal.js";

export default class CreateAnimal  {
  constructor(animalRepository) {
    this.animalRepository = animalRepository;
  }

  async execute({ sku, price }) {
    const animal = new Animal({ sku, price});
    return await this.animalRepository.save(animal);
  }
}
