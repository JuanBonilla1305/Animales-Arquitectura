import { Producto } from "../../domain/entities/Producto.js";
import ProductoModel from "../database/models/ProductoModel.js";

export class MongoProductoRepository {
  
  async save(producto) {
    // Guardamos en MongoDB usando el modelo de Mongoose
    const nuevoDocumento = new ProductoModel(producto);
    await nuevoDocumento.save();
    return producto;
  }

  async getAll() {
    // Buscamos todos en MongoDB
    const documentos = await ProductoModel.find();
    // Mapeamos los documentos de Mongo a nuestras entidades de Dominio puro
    return documentos.map(doc => new Producto(doc));
  }

  async getBySku(sku) {
    // Buscamos uno específico por SKU
    const doc = await ProductoModel.findOne({ sku });
    if (!doc) return null;
    return new Producto(doc);
  }

  async delete(sku) {
    // Eliminamos de MongoDB
    await ProductoModel.deleteOne({ sku });
  }
}