import { Section } from '@/demo/router/routeRecords'

export const concurrency: Section = {
  ConcurrencyLimit: () => import ('./ConcurrencyLimit.vue'),
}