import Dueño from "../../../../domain/entities/dueño.js";

export default class CreateDueño  {
  constructor(dueñoRepository) {
    this.dueñoRepository = dueñoRepository;
  }

  async execute({ nombre, edad }) {
    const dueño = new Dueño({ nombre, edad});
    return await this.dueñoRepository.save(dueño);
  }
}
