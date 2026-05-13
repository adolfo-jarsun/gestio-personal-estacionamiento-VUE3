<template>
  <nav class="navbar">
    <div class="nav-brand">
      <router-link to="/">🚗 Gestión de Estacionamiento</router-link>
    </div>
    <div class="nav-links">
      <router-link to="/movilidades">Movilidades</router-link>
      <router-link to="/areas">Áreas</router-link>
      <router-link to="/tipos-vehiculo">Tipos Vehículo</router-link>
      <button @click="logout" class="logout-btn">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.navbar {
  background: #2d3748;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.nav-brand a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
.nav-links a:hover {
  background: #4a5568;
}
.logout-btn {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>