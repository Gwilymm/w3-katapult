/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import profile from '../pages/profile.vue'
import signup from '@/pages/signup.vue'
import login from '@/pages/login.vue'
import formulaire from '@/pages/formulaire.vue'

const routes = [
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/signup',
    component: signup
  },
  {
    path: '/login',
    component: login
  }
  ,
  {
    path: '/formulaire',
    component: formulaire
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})

export default router
