<template>
  <div class="container">

    <h1>Tipos de Vehículo</h1>

    <div class="search-bar">

      <input
        v-model="searchTerm"
        placeholder="Buscar tipo..."
      />

      <button
        class="btn-primary"
        @click="mostrarFormulario = true"
      >
        + Nuevo Tipo
      </button>

    </div>

    <div class="table-container">

      <table>

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="tipo in tiposFiltrados"
            :key="tipo.id"
          >

            <td>{{ tipo.nombre }}</td>

            <td>

              <button
                class="btn-edit"
                @click="editarTipo(tipo)"
              >
                ✏️
              </button>

              <button
                class="btn-delete"
                @click="eliminarTipo(tipo.id)"
              >
                🗑️
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <div v-if="mostrarFormulario" class="modal">

      <div class="modal-content">

        <h2>
          {{ editando ? 'Editar Tipo' : 'Nuevo Tipo' }}
        </h2>

        <form @submit.prevent="guardarTipo">

          <input
            v-model="tipoForm.nombre"
            placeholder="Nombre"
            required
          />

          <div class="buttons">

            <button
              type="submit"
              class="btn-primary"
            >
              Guardar
            </button>

            <button
              type="button"
              class="btn-delete"
              @click="cerrarModal"
            >
              Cancelar
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

const tiposVehiculo = ref([]);

const searchTerm = ref('');

const mostrarFormulario = ref(false);

const editando = ref(false);

const tipoForm = ref({
  nombre: ''
});

const tiposFiltrados = computed(() => {

  return tiposVehiculo.value.filter((t) =>
    t.nombre.toLowerCase()
      .includes(searchTerm.value.toLowerCase())
  );

});

const cargarTipos = async () => {

  const response = await api.get('/tiposVehiculo');

  tiposVehiculo.value = response.data;
};

const guardarTipo = async () => {

  if (editando.value) {

    await api.put(
      `/tiposVehiculo/${tipoForm.value.id}`,
      tipoForm.value
    );

  } else {

    await api.post(
      '/tiposVehiculo',
      tipoForm.value
    );

  }

  cerrarModal();

  cargarTipos();
};

const editarTipo = (tipo) => {

  tipoForm.value = { ...tipo };

  editando.value = true;

  mostrarFormulario.value = true;
};

const eliminarTipo = async (id) => {

  if (confirm('¿Eliminar tipo?')) {

    await api.delete(`/tiposVehiculo/${id}`);

    cargarTipos();
  }
};

const cerrarModal = () => {

  mostrarFormulario.value = false;

  editando.value = false;

  tipoForm.value = {
    nombre: ''
  };
};

onMounted(cargarTipos);
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.search-bar input {
  flex: 1;
  padding: 0.5rem;
}

.modal {
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0,0,0,0.5);

  display: flex;

  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;

  padding: 2rem;

  border-radius: 10px;

  width: 400px;
}

.modal-content input {
  width: 100%;

  padding: 0.5rem;

  margin: 1rem 0;
}

.buttons {
  display: flex;
  gap: 1rem;
}
</style>