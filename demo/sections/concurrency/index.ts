import { Section } from '@/demo/router/routeRecords'

export const concurrency: Section = {
  AddConcurrencyLimitModal: () => import ('./ConcurrencyLimitModal.vue'),
  ConcurrencyLimitsTable: () => import ('./ConcurrencyLimitsTable.vue'),
  ConcurrencyLimitsEmptyState: () => import ('./ConcurrencyLimitsPageEmptyState.vue'),
  ConcurrencyLimitDetails: () => import('./ConcurrencyLimitDetails.vue'),
}