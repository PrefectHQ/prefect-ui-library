import { Section } from '@/demo/router/routeRecords'

export const stats: Section = {
  StatisticKeyValue: () => import('./StatisticKeyValue.vue'),
  TimeSpanFilter: () => import('./TimeSpanFilter.vue'),
}