import { Section } from '@/demo/router/routeRecords'

export const flowRuns: Section = {
  FlowRunList: () => import ('./FlowRunList.vue'),
  FlowRunListItem: () => import ('./FlowRunListItem.vue'),
}