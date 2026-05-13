<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Registro de Usuario</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="form.email" required />
        </div>
        <div class="form-group">
          <label>Contraseña:</label>
          <input type="password" v-model="form.password" required />
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <router-link to="/login">Inicia Sesión</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({ name: '', email: '', password: '' });
const errorMessage = ref('');

const handleRegister = async () => {
  const result = await authStore.register(form.value);
  if (result.success) {
    router.push('/');
  } else {
    errorMessage.value = result.error;
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
.error {
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
</style>