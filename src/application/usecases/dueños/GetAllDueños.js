export default class GetAllDueños {
  constructor(dueñoRepository) {
    this.dueñoRepository = dueñoRepository;
  }

async execute() {
    return await this.dueñoRepository.findAll();
  }
}
