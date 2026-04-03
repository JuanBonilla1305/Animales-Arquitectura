import { ref } from "vue";
import { ApiProductoRepository } from "../../infrastructure/repositories/ApiProductoRepository.js";

export function useProductos() {
  // Instanciamos nuestro repositorio de frontend
  const repository = new ApiProductoRepository();

  // Estados reactivos: Vue actualizará la pantalla automáticamente cuando estos cambien
  const productos = ref([]);
  const cargando = ref(false);
  const error = ref(null);

  // Acción: Obtener todos los productos
  const cargarProductos = async () => {
    cargando.value = true;
    error.value = null;
    try {
      productos.value = await repository.getAll();
    } catch (err) {
      error.value = err.message;
    } finally {
      cargando.value = false;
    }
  };

  // Acción: Crear un nuevo producto
  const agregarProducto = async (productoData) => {
    error.value = null;
    try {
      const nuevoProducto = await repository.create(productoData);
      productos.value.push(nuevoProducto); // Lo agregamos a la lista visual inmediatamente
      return true; // Retornamos true si fue exitoso
    } catch (err) {
      error.value = err.message;
      return false; // Retornamos false si falló
    }
  };

  // Acción: Eliminar un producto
  const borrarProducto = async (sku) => {
    error.value = null;
    try {
      await repository.delete(sku);
      // Filtramos la lista para que el producto desaparezca de la pantalla al instante
      productos.value = productos.value.filter((p) => p.sku !== sku);
    } catch (err) {
      error.value = err.message;
    }
  };

  // Exponemos los estados y las acciones para que Vue los use
  return {
    productos,
    cargando,
    error,
    cargarProductos,
    agregarProducto,
    borrarProducto,
  };
}