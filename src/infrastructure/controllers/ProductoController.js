export class ProductoController {
  // Inyectamos todos nuestros casos de uso a través del constructor
  constructor(createProducto, getAllProductos, getProductoBySku, deleteProducto) {
    this.createProducto = createProducto;
    this.getAllProductos = getAllProductos;
    this.getProductoBySku = getProductoBySku;
    this.deleteProducto = deleteProducto;
  }

  // Usamos arrow functions para no perder el contexto de 'this' cuando Express llame la ruta
  create = async (req, res) => {
    try {
      const producto = await this.createProducto.execute(req.body);
      res.status(201).json(producto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getAll = async (req, res) => {
    try {
      const productos = await this.getAllProductos.execute();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getBySku = async (req, res) => {
    try {
      const { sku } = req.params;
      const producto = await this.getProductoBySku.execute(sku);
      res.status(200).json(producto);
    } catch (error) {
      // Si el caso de uso lanza un error (ej. no se encontró), devolvemos un 404
      res.status(404).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { sku } = req.params;
      await this.deleteProducto.execute(sku);
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}