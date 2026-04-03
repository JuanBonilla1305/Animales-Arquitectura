import { Router } from "express";

// Exportamos una función que recibe el controlador ya instanciado
export const createProductoRouter = (productoController) => {
  const router = Router();

  // Enlazamos cada método HTTP y ruta con su función correspondiente en el controlador
  router.post("/", productoController.create);
  router.get("/", productoController.getAll);
  router.get("/:sku", productoController.getBySku);
  router.delete("/:sku", productoController.delete);

  return router;
};