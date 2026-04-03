import { Producto } from "../../domain/entities/Producto.js";

export class ApiProductoRepository {
  constructor() {
    // La URL de tu backend unificado
    this.apiUrl = "http://localhost:3000/api/productos";
  }

  async getAll() {
    const response = await fetch(this.apiUrl);
    if (!response.ok) throw new Error("Error al obtener los productos");
    
    const data = await response.json();
    // Transformamos el JSON crudo en instancias de nuestra entidad
    return data.map(item => new Producto(item));
  }

  async create(productoData) {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al crear el producto");
    }
    
    const data = await response.json();
    return new Producto(data);
  }

  async delete(sku) {
    const response = await fetch(`${this.apiUrl}/${sku}`, {
      method: "DELETE",
    });
    
    if (!response.ok) throw new Error("Error al eliminar el producto");
    return true;
  }
}