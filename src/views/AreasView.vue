<template>
  <div class="container">
    <h1>Áreas de Trabajo</h1>

    <div class="search-bar">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar área..."
      />

      <button
        @click="mostrarFormulario = true"
        class="btn-primary"
      >
        + Nueva Área
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
            v-for="area in areasFiltradas"
            :key="area.id"
          >
            <td>{{ area.nombre }}</td>

            <td>
              <button
                class="btn-edit"
                @click="editarArea(area)"
              >
                ✏️
              </button>

              <button
                class="btn-delete"
                @click="eliminarArea(area.id)"
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
          {{ editando ? 'Editar Área' : 'Nueva Área' }}
        </h2>

        <form @submit.prevent="guardarArea">

          <input
            v-model="areaForm.nombre"
            placeholder="Nombre del área"
            required
          />

          <div class="buttons">
            <button type="submit" class="btn-primary">
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

const areas = ref([]);

const searchTerm = ref('');

const mostrarFormulario = ref(false);

const editando = ref(false);

const areaForm = ref({
  nombre: ''
});

const areasFiltradas = computed(() => {

  return areas.value.filter((a) =>
    a.nombre.toLowerCase()
      .includes(searchTerm.value.toLowerCase())
  );

});

const cargarAreas = async () => {
  const response = await api.get('/areas');
  areas.value = response.data;
};

const guardarArea = async () => {

  if (editando.value) {

    await api.put(
      `/areas/${areaForm.value.id}`,
      areaForm.value
    );

  } else {

    await api.post('/areas', areaForm.value);

  }

  cerrarModal();

  cargarAreas();
};

const editarArea = (area) => {

  areaForm.value = { ...area };

  editando.value = true;

  mostrarFormulario.value = true;
};

const eliminarArea = async (id) => {

  if (confirm('¿Eliminar área?')) {

    await api.delete(`/areas/${id}`);

    cargarAreas();
  }
};

const cerrarModal = () => {

  mostrarFormulario.value = false;

  editando.value = false;

  areaForm.value = {
    nombre: ''
  };
};

onMounted(cargarAreas);
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