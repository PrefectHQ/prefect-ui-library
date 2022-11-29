import { Section } from '@/demo/router/routeRecords'

export const concurrency: Section = {
  ConcurrencyLimitModal: () => import ('./ConcurrencyLimitModal.vue'),
  ConcurrencyLimitTable: () => import ('./ConcurrencyLimitTable.vue'),
}