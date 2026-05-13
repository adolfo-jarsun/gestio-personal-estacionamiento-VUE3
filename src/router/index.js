import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import MovilidadesView from '@/views/MovilidadesView.vue';
import AreasView from '@/views/AreasView.vue';
import TiposVehiculoView from '@/views/TiposVehiculoView.vue';

const routes = [
  { path: '/login', component: LoginView, meta: { requiresAuth: false } },
  { path: '/register', component: RegisterView, meta: { requiresAuth: false } },
  { path: '/', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/movilidades', component: MovilidadesView, meta: { requiresAuth: true } },
  { path: '/areas', component: AreasView, meta: { requiresAuth: true } },
  { path: '/tipos-vehiculo', component: TiposVehiculoView, meta: { requiresAuth: true } },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (!to.meta.requiresAuth && authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    next('/');
  } else {
    next();
  }
});

export default router;