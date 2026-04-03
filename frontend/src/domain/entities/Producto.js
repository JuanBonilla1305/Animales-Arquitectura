export class Producto {
  constructor({ sku, nombre, categoria, cantidad, precio, fechaVencimiento }) {
    this.sku = sku;
    this.nombre = nombre;
    this.categoria = categoria;
    this.cantidad = cantidad;
    this.precio = precio;
    this.fechaVencimiento = fechaVencimiento ? new Date(fechaVencimiento).toLocaleDateString() : 'Sin fecha';
  }
}