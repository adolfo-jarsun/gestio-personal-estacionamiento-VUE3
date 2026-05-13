<template>
  <div class="movilidades-container">

    <h1>Personal/Movilidades</h1>

    <div class="search-bar">

      <input
        type="text"
        v-model="searchTerm"
        placeholder="Buscar por empleado..."
      />

      <select v-model="filtroTipo">
        <option value="">Todos los vehículos</option>

        <option
          v-for="tipo in tiposVehiculo"
          :key="tipo.id"
          :value="tipo.id"
        >
          {{ tipo.nombre }}
        </option>
      </select>

      <button
        class="btn-primary"
        @click="mostrarFormulario = true"
      >
        + Nueva Movilidad
      </button>

    </div>

    <div class="table-container">

      <table>

        <thead>
          <tr>
            <th>Empleado</th>
            <th>Área</th>
            <th>Tipo Vehículo</th>
            <th>Placa</th>
            <th>Color</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="movilidad in movilidadesFiltradas"
            :key="movilidad.id"
          >

            <td>{{ movilidad.nombreEmpleado }}</td>

            <td>
              {{ obtenerNombreArea(movilidad.areaId) }}
            </td>

            <td>
              {{ obtenerNombreTipoVehiculo(movilidad.tipoVehiculoId) }}
            </td>

            <td>{{ movilidad.placa }}</td>

            <td>{{ movilidad.color }}</td>

            <td>

              <button
                class="btn-edit"
                @click="editarMovilidad(movilidad)"
              >
                ✏️
              </button>

              <button
                class="btn-delete"
                @click="eliminarMovilidad(movilidad.id)"
              >
                🗑️
              </button>

            </td>

          </tr>

          <tr v-if="movilidadesFiltradas.length === 0">

            <td colspan="6" class="no-data">
              No hay movilidades registradas
            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <div v-if="mostrarFormulario" class="modal">

      <div class="modal-content">

        <h2>
          {{ editando ? 'Editar Movilidad' : 'Nueva Movilidad' }}
        </h2>

        <form @submit.prevent="guardarMovilidad">

          <input
            v-model="movilidadForm.nombreEmpleado"
            placeholder="Nombre del empleado"
            required
          />

          <select
            v-model="movilidadForm.areaId"
            required
          >

            <option disabled value="">
              Seleccione un área
            </option>

            <option
              v-for="area in areas"
              :key="area.id"
              :value="area.id"
            >
              {{ area.nombre }}
            </option>

          </select>

          <select
            v-model="movilidadForm.tipoVehiculoId"
            required
          >

            <option disabled value="">
              Seleccione tipo vehículo
            </option>

            <option
              v-for="tipo in tiposVehiculo"
              :key="tipo.id"
              :value="tipo.id"
            >
              {{ tipo.nombre }}
            </option>

          </select>

          <input
            v-model="movilidadForm.placa"
            placeholder="Número de placa"
            required
          />

          <input
            v-model="movilidadForm.color"
            placeholder="Color del vehículo"
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
              class="btn-cancel"
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

const movilidades = ref([]);

const areas = ref([]);

const tiposVehiculo = ref([]);

const searchTerm = ref('');

const filtroTipo = ref('');

const mostrarFormulario = ref(false);

const editando = ref(false);

const movilidadForm = ref({
  nombreEmpleado: '',
  areaId: '',
  tipoVehiculoId: '',
  placa: '',
  color: ''
});

const movilidadesFiltradas = computed(() => {

  return movilidades.value.filter((m) => {

    const coincideNombre =
      m.nombreEmpleado
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase());

    const coincideTipo =
      !filtroTipo.value ||
      m.tipoVehiculoId == filtroTipo.value;

    return coincideNombre && coincideTipo;

  });

});

const cargarMovilidades = async () => {

  const response = await api.get('/movilidades');

  movilidades.value = response.data;
};

const cargarAreas = async () => {

  const response = await api.get('/areas');

  areas.value = response.data;
};

const cargarTiposVehiculo = async () => {

  const response = await api.get('/tiposVehiculo');

  tiposVehiculo.value = response.data;
};

const guardarMovilidad = async () => {

  if (editando.value) {

    await api.put(
      `/movilidades/${movilidadForm.value.id}`,
      movilidadForm.value
    );

  } else {

    await api.post(
      '/movilidades',
      movilidadForm.value
    );

  }

  cerrarModal();

  cargarMovilidades();
};

const editarMovilidad = (movilidad) => {

  movilidadForm.value = {
    ...movilidad
  };

  editando.value = true;

  mostrarFormulario.value = true;
};

const eliminarMovilidad = async (id) => {

  if (!confirm('¿Desea eliminar este registro?')) {
    return;
  }

  await api.delete(`/movilidades/${id}`);

  cargarMovilidades();
};

const cerrarModal = () => {

  mostrarFormulario.value = false;

  editando.value = false;

  movilidadForm.value = {
    nombreEmpleado: '',
    areaId: '',
    tipoVehiculoId: '',
    placa: '',
    color: ''
  };
};

const obtenerNombreArea = (id) => {

  const area = areas.value.find((a) => a.id == id);

  return area ? area.nombre : 'Sin área';
};

const obtenerNombreTipoVehiculo = (id) => {

  const tipo = tiposVehiculo.value.find((t) => t.id == id);

  return tipo ? tipo.nombre : 'Sin tipo';
};

onMounted(async () => {

  await Promise.all([
    cargarMovilidades(),
    cargarAreas(),
    cargarTiposVehiculo()
  ]);

});
</script>

<style scoped>
.movilidades-container {
  padding: 2rem;
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.search-bar input,
.search-bar select {
  padding: 0.5rem;
}

.table-container {
  overflow-x: auto;
}

.no-data {
  text-align: center;
  padding: 1rem;
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

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content input,
.modal-content select {
  margin: 0.5rem 0;
  padding: 0.5rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-cancel {
  background: gray;
  color: white;

  border: none;

  padding: 10px 20px;

  border-radius: 5px;

  cursor: pointer;
}

@media (max-width: 768px) {

  .search-bar {
    flex-direction: column;
  }

  .modal-content {
    width: 90%;
  }

}
</style>