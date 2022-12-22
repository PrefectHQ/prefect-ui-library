import { Section } from '@/demo/router/routeRecords'

export const workers: Section = {
  WorkerHeadings: () => import('./WorkerHeadings.vue'),
  WorkerPoolCard: () => import('./WorkerPoolCard.vue'),
  WorkerPoolTables: () => import('./WorkerPoolTables.vue'),
}