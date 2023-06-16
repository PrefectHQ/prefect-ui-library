import { Section } from '@/demo/router/routeRecords'

export const dashboard: Section = {
  DashboardStatistic: () => import('./DashboardStatistic.vue'),
  DashboardTimeSpanFilter: () => import('./DashboardTimeSpanFilter.vue'),
}