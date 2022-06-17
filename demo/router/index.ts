
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
    path: '/blocks',
    name: 'blocks',
    component: () => import('../pages/Blocks.vue'),
  },
  {
    path: '/validation',
    name: 'validation',
    component: () => import('../pages/FormValidation.vue'),
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