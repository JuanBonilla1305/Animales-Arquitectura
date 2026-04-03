export class DeleteProducto {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(sku) {
    if (!sku) {
      throw new Error("El SKU es requerido para eliminar un producto.");
    }

    // Verificamos que el producto exista antes de borrarlo
    const existe = await this.productoRepository.getBySku(sku);
    if (!existe) {
      throw new Error(`No se puede eliminar: No se encontró un producto con el SKU: ${sku}`);
    }

    await this.productoRepository.delete(sku);
    return true; // Retornamos true para confirmar que se eliminó con éxito
  }
}