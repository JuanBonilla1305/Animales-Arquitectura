export class Producto {
  constructor({ sku, nombre, categoria, cantidad, precio, fechaVencimiento }) {
    if (!sku) throw new Error("El SKU es obligatorio.");
    if (!nombre) throw new Error("El nombre es obligatorio.");
    if (cantidad === undefined || cantidad < 0) throw new Error("La cantidad no puede ser negativa.");
    if (precio === undefined || precio <= 0) throw new Error("El precio debe ser mayor a 0.");

    this.sku = sku;
    this.nombre = nombre;
    this.categoria = categoria;
    this.cantidad = cantidad;
    this.precio = precio;
    this.fechaVencimiento = fechaVencimiento || null; // Opcional, algunos productos no vencen
  }
}