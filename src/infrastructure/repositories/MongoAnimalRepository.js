import animalRepository from "../../domain/repositories/animalRepository.js";
import animalModel      from "../../infrastructure/database/models/AminalModel.js";

export default class MongoAnimalRepository extends animalRepository {
  async save(animal) {
    // CAMBIO: Buscamos por 'sku' en lugar de 'id'
    await animalModel.findOneAndUpdate(
      { sku: animal.sku }, 
      { price: animal.price }, // Solo actualizamos el precio
      { upsert: true, new: true, runValidators: true }
    );
    return animal;
  }

  async findAll() {
    return await animalModel.find();
  }

  async findBySku(sku) {
    return await animalModel.findOne({ sku }) ?? null;
  }

  async delete(sku) {
    // CAMBIO: Usamos 'sku' para borrar, ya que es tu identificador único
    const result = await animalModel.findOneAndDelete({ sku });
    if (!result) throw new Error(`animal with sku "${sku}" not found`);
  }
}