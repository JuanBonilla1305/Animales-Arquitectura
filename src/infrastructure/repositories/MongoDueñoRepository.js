import dueñoRepository from "../../domain/repositories/dueñoRepository.js";
import dueñoModel      from "../database/models/DueñoModel.js";

export default class MongoDueñoRepository extends dueñoRepository {
  async save(dueño) {
    // CORRECCIÓN: Cambiado animalModel por dueñoModel
    await dueñoModel.findOneAndUpdate(
      { nombre: dueño.nombre }, 
      { edad: dueño.edad }, 
      { upsert: true, new: true, runValidators: true }
    );
    return dueño;
  }

  async findAll() {
    return await dueñoModel.find();
  }

  // Ajustado para buscar por nombre, ya que edad puede repetirse
  async findByName(nombre) {
    return await dueñoModel.findOne({ nombre }) ?? null;
  }

  async delete(nombre) {
    const result = await dueñoModel.findOneAndDelete({ nombre });
    if (!result) throw new Error(`dueño with name "${nombre}" not found`);
  }
}