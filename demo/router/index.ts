
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'


const routeRecords: RouteRecordRaw[] = [
  {
    name: 'flows',
    path: '/flows',
    component: () => import('../App.vue'),
  },
  {
    name: 'deployments',
    path: '/deployments',
    component: () => import('../App.vue'),
  },
  {
    name: 'queues',
    path: '/queues',
    component: () => import('../App.vue'),
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('../App.vue'),
  },
  {
    path: '/',
    redirect: 'flows',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routeRecords,
})


export default router