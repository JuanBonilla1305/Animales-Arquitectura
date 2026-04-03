import { Producto } from "../../../domain/entities/Producto.js";

export class CreateProducto {
  // Inyectamos el repositorio a través del constructor
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(data) {
    // 1. Instanciamos la entidad (aquí se ejecutan las validaciones que hicimos antes)
    const nuevoProducto = new Producto(data);

    // 2. Verificamos si ya existe un producto con ese SKU en la base de datos
    const existe = await this.productoRepository.getBySku(nuevoProducto.sku);
    if (existe) {
      throw new Error(`Ya existe un producto con el SKU: ${nuevoProducto.sku}`);
    }

    // 3. Guardamos el producto usando el contrato del repositorio
    await this.productoRepository.save(nuevoProducto);
    
    return nuevoProducto;
  }
}