
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { sections } from '../sections'
import { close } from './menu'
import { convertSectionToRouteRecords } from './routeRecords'

export const routeRecords: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('../sections/WelcomePage.vue'),
  },
  ...convertSectionToRouteRecords(sections),
  {
    name: 'timezone support',
    path: '/timezone-support',
    component: () => import('../sections/TimezoneSupport.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routeRecords,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: +10,
      }
    }

    return { top: 0 }
  },
})

router.beforeEach(() => close())