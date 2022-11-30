import { Section } from '@/demo/router/routeRecords'

export const concurrency: Section = {
  AddConcurrencyLimitModal: () => import ('./ConcurrencyLimitModal.vue'),
  ConcurrencyLimitTable: () => import ('./ConcurrencyLimitTable.vue'),
}