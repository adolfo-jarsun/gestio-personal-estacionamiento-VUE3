<template>
  <div id="app">
    <NavBar v-if="authStore.isAuthenticated" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import NavBar from '@/components/NavBar.vue';

const authStore = useAuthStore();
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', sans-serif; background: #f5f5f5; }
.container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
</style>