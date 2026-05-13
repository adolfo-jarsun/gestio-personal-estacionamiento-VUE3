<template>
  <div class="dashboard">
    <h1>Panel de Control</h1>
    <div class="stats-grid">

      <div class="stat-card">
        <h3>Movilidades</h3>

        <p class="stat-number">
          {{ movilidadesCount }}
        </p>
        <router-link to="/movilidades" class="stat-link">
          Ver todas →
        </router-link>
      </div>

      <div class="stat-card">
        <h3>Áreas</h3>

        <p class="stat-number">
          {{ areasCount }}
        </p>

        <router-link to="/areas" class="stat-link">
          Ver todas →
        </router-link>
      </div>

      <div class="stat-card">
        <h3>Tipos Vehículo</h3>

        <p class="stat-number">
          {{ tiposVehiculoCount }}
        </p>

        <router-link to="/tipos-vehiculo" class="stat-link">
          Ver todos →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const movilidadesCount = ref(0);
const areasCount = ref(0);
const tiposVehiculoCount = ref(0);

onMounted(async () => {

  const [
    movilidades,
    areas,
    tiposVehiculo
  ] = await Promise.all([
    api.get('/movilidades'),
    api.get('/areas'),
    api.get('/tiposVehiculo')
  ]);

  movilidadesCount.value = movilidades.data.length;
  areasCount.value = areas.data.length;
  tiposVehiculoCount.value = tiposVehiculo.data.length;

});
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #667eea;
  margin: 1rem 0;
}

.stat-link {
  color: #667eea;
  text-decoration: none;
}
</style>