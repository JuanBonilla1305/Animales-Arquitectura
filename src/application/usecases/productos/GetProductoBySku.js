export class GetProductoBySku {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(sku) {
    if (!sku) {
      throw new Error("El SKU es requerido para buscar un producto.");
    }

    const producto = await this.productoRepository.getBySku(sku);
    
    if (!producto) {
      throw new Error(`No se encontró ningún producto con el SKU: ${sku}`);
    }

    return producto;
  }
}