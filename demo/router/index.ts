
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'


const routeRecords: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('../App.vue'),
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