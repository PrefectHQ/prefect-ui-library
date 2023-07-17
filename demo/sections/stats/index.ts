import { Section } from '@/demo/router/routeRecords'

export const stats: Section = {
  StatisticKeyValue: () => import('./StatisticKeyValue.vue'),
  SimpleTimeSpanFilter: () => import('./SimpleTimeSpanFilter.vue'),
}