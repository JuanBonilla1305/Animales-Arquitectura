export default class GetAllAnimals {
  constructor(animalRepository) {
    this.animalRepository = animalRepository;
  }

async execute() {
    return await this.animalRepository.findAll();
  }
}
