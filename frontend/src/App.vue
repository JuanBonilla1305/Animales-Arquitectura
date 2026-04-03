<template>
  <div class="container">
    <h1>📦 Inventario de Veterinaria</h1>
    <hr>

    <div v-if="error" class="error-box">
      <strong>Error:</strong> {{ error }}
    </div>

    <div class="form-section">
      <h3>Agregar Nuevo Producto</h3>
      <form @submit.prevent="guardarProducto">
        <div class="form-grid">
          <input v-model="formulario.sku" type="text" placeholder="SKU (ej: PROD-001)" required />
          <input v-model="formulario.nombre" type="text" placeholder="Nombre (ej: Concentrado)" required />
          <input v-model="formulario.categoria" type="text" placeholder="Categoría" required />
          <input v-model="formulario.cantidad" type="number" placeholder="Cantidad" min="0" required />
          <input v-model="formulario.precio" type="number" placeholder="Precio ($)" min="0" required />
          <input v-model="formulario.fechaVencimiento" type="date" />
        </div>
        <button type="submit" class="btn-guardar" :disabled="cargando">
          Guardar Producto
        </button>
      </form>
    </div>

    <div class="list-section">
      <h3>Lista de Productos</h3>
      
      <p v-if="cargando" class="loading">Cargando inventario...</p>

      <table v-else-if="productos.length > 0">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cant.</th>
            <th>Precio</th>
            <th>Vence</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.sku">
            <td><strong>{{ producto.sku }}</strong></td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.categoria }}</td>
            <td>{{ producto.cantidad }}</td>
            <td>${{ producto.precio }}</td>
            <td>{{ producto.fechaVencimiento }}</td>
            <td>
              <button @click="borrarProducto(producto.sku)" class="btn-borrar">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="empty-state">No hay productos en el inventario. ¡Agrega uno nuevo!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// Importamos nuestro Composable
import { useProductos } from './application/composables/useProductos.js';

// Extraemos lo que necesitamos del Composable
const {
  productos,
  cargando,
  error,
  cargarProductos,
  agregarProducto,
  borrarProducto
} = useProductos();

// Estado reactivo para atrapar lo que el usuario escribe en el formulario
const formulario = ref({
  sku: '',
  nombre: '',
  categoria: '',
  cantidad: '',
  precio: '',
  fechaVencimiento: ''
});

// Función que se ejecuta al darle click al botón "Guardar"
const guardarProducto = async () => {
  // Intentamos crear el producto
  const exito = await agregarProducto({ ...formulario.value });
  
  if (exito) {
    // Si se guardó en el backend, limpiamos las cajitas del formulario
    formulario.value = {
      sku: '',
      nombre: '',
      categoria: '',
      cantidad: '',
      precio: '',
      fechaVencimiento: ''
    };
  }
};

// Hook de Vue: Se ejecuta automáticamente apenas la página carga
onMounted(() => {
  cargarProductos();
});
</script>

<style>
/* --- ESTILOS VISUALES --- */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f3f4f6;
  color: #333;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h1 { color: #2c3e50; text-align: center; margin-top: 0; }
hr { border: 1px solid #eee; margin-bottom: 20px; }

.error-box {
  background-color: #fee2e2;
  color: #991b1b;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  border-left: 5px solid #ef4444;
}

.form-section, .list-section {
  margin-bottom: 40px;
}

h3 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 5px; display: inline-block; }

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  cursor: pointer;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-guardar {
  background-color: #10b981;
  color: white;
  width: 100%;
  font-size: 16px;
}
.btn-guardar:hover { background-color: #059669; }
.btn-guardar:disabled { background-color: #9ca3af; cursor: not-allowed; }

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th { background-color: #f8fafc; color: #475569; font-weight: 600; }

.btn-borrar { background-color: #ef4444; color: white; padding: 6px 12px; font-size: 12px;}
.btn-borrar:hover { background-color: #dc2626; }

.loading { color: #3b82f6; font-weight: bold; text-align: center; }
.empty-state { text-align: center; color: #6b7280; font-style: italic; margin-top: 20px; }
</style>