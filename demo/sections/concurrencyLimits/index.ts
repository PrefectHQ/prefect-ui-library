import { Section } from '@/demo/router/routeRecords'

export const concurrencyLimits: Section = {
  concurrencyLimit: () => import ('./concurrencyLimit.vue'),
}