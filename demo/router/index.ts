
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { sections } from '../sections'
import { close } from './menu'
import { convertSectionToRouteRecords } from './routeRecords'
import { createWorkspaceRouteRecords } from '@/router'

const welcomePage = () => import('../sections/WelcomePage.vue')

const workspaceRecords = createWorkspaceRouteRecords({
  flowRuns: welcomePage,
  flowRun: welcomePage,
  flowRunRadar: welcomePage,
  taskRun: welcomePage,
  flows: welcomePage,
  flow: welcomePage,
  deployments: welcomePage,
  deployment: welcomePage,
  deploymentEdit: welcomePage,
  deploymentFlowRunCreate: welcomePage,
  workQueues: welcomePage,
  workQueue: welcomePage,
  workQueueCreate: welcomePage,
  workQueueEdit: welcomePage,
  blocks: welcomePage,
  blocksCatalog: welcomePage,
  blocksCatalogView: welcomePage,
  blockCreate: welcomePage,
  block: welcomePage,
  blockEdit: welcomePage,
  notifications: welcomePage,
  notificationCreate: welcomePage,
  notificationEdit: welcomePage,
})

export const routeRecords = [
  {
    name: 'home',
    path: '/',
    component: welcomePage,
    children: workspaceRecords,
  },
  ...convertSectionToRouteRecords(sections),
  {
    name: 'timezone support',
    path: '/timezone-support',
    component: () => import('../sections/TimezoneSupport.vue'),
  },
] as RouteRecordRaw[]

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