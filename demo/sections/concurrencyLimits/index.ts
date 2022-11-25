import { Section } from '@/demo/router/routeRecords'

export const concurrencyLimits: Section = {
  concurrencyLimitCreate: () => import ('./concurrencyLimitCreate.vue'),
}