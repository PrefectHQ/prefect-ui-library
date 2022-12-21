import { Section } from '@/demo/router/routeRecords'

export const workers: Section = {
  WorkerPoolCard: () => import('./WorkerPoolCard.vue'),
}