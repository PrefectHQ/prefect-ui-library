import { Section } from '@/demo/router/routeRecords'

export const concurrency: Section = {
  ConcurrencyLimitModal: () => import ('./concurrencyLimitModal.vue'),
  ConcurrencyLimitTable: () => import ('./concurrencyLimitTable.vue'),
}