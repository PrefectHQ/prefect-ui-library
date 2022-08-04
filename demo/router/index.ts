
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'


const routeRecords: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/components',
  },
  {
    path: '/components',
    name: 'components',
    component: () => import('../pages/Components.vue'),
  },
  {
    path: '/charts',
    name: 'charts',
    component: () => import('../pages/Charts.vue'),
  },
  {
    path: '/radar',
    name: 'radar',
    component: () => import('../pages/Radar.vue'),
  },
  {
    path: '/forms',
    name: 'forms',
    component: () => import('../pages/Forms.vue'),
  },
  {
    path: '/tables',
    name: 'tables',
    component: () => import('../pages/Tables.vue'),
  },
  {
    path: '/advanced-inputs',
    name: 'advanced-inputs',
    component: () => import('../pages/AdvancedInputs.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routeRecords,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})