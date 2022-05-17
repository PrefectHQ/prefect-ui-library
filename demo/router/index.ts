
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'


const routeRecords: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../App.vue'),
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routeRecords,
})


export default router