
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
    path: '/:catchAll(.*)',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routeRecords,
})