import dueñoRepository from "../../domain/repositories/dueñoRepository.js";

export default class InMemoryDueñoRepository extends dueñoRepository {
  constructor() {
    super();
    this.dueños = [];
  }
  async save(dueño) {
    const index = this.dueños.findIndex(p => p.id === dueño.id);
    if (index >= 0) {
      this.dueños[index] = dueño;
    } else {
      this.dueños.push(dueño);
    }
    return dueño;
  }
  async findAll() {
    return this.dueños;
  }
}
