import { Section } from '@/demo/router/routeRecords'

export const workers: Section = {
  WorkerHeadings: () => import('./WorkerHeadings.vue'),
  WorkPoolCard: () => import('./WorkPoolCard.vue'),
  WorkPoolTables: () => import('./WorkPoolTables.vue'),
  WorkersTable: () => import('./WorkersTable.vue'),
}