import { Schema, model } from "mongoose";

const productoSchema = new Schema({
  sku: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  cantidad: { type: Number, required: true, min: 0 },
  precio: { type: Number, required: true, min: 0 },
  fechaVencimiento: { type: Date, default: null }
}, {
  // Desactivamos el id virtual y el __v para mantener el documento limpio 
  // y prevenir errores al mapear los datos con nuestras entidades
  id: false,
  versionKey: false
});

export default model("Producto", productoSchema);