import { Section } from '@/demo/router/routeRecords'

export const stats: Section = {
  ValueKeyStatistic: () => import('./ValueKeyStatistic.vue'),
  SimpleTimeSpanFilter: () => import('./SimpleTimeSpanFilter.vue'),
}