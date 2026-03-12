import { Schema, model } from "mongoose";

const animalSchema = new Schema({
  sku:   { type: String, required: true, unique: true },
  price: { type: Number, required: true },
}, { 
  // Esta opción es la clave para resolver tu error:
  id: false, 
  versionKey: false 
});

export default model("Animal", animalSchema);