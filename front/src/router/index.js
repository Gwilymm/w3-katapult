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

const routes = [
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/signup',
    component: signup
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})

export default router
