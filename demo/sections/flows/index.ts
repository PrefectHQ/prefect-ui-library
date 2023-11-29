import { Section } from '@/demo/router/routeRecords'

export const flows: Section = {
  FlowDetails: () => import('./FlowDetails.vue'),
  FlowList: () => import('./FlowList.vue'),
}