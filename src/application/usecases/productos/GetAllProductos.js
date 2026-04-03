export class GetAllProductos {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute() {
    // Solicitamos todos los productos al repositorio
    return await this.productoRepository.getAll();
  }
}