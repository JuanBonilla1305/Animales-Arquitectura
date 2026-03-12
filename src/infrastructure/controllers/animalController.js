export default class animalController {
  constructor({ createAnimal, getAllAnimals }) {
    this.createAnimal = createAnimal;
    this.getAllAnimals = getAllAnimals;
  }

  async create(req, res) {
    try {
      const animal = await this.createAnimal.execute(req.body);
      res.status(201).json(animal);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const animals = await this.getAllAnimals.execute();
      res.status(200).json(animals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}