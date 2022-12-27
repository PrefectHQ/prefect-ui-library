import { Section } from '@/demo/router/routeRecords'

export const flowRuns: Section = {
  FlowRunDetails: () => import('./FlowRunDetails.vue'),
  FlowRunList: () => import('./FlowRunList.vue'),
  FlowRunListItem: () => import('./FlowRunListItem.vue'),
  FlowRunsFilterGroup: () => import('./FlowRunsFilterGroup.vue'),
}