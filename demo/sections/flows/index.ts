import { Section } from '@/demo/router/routeRecords'

export const flows: Section = {
  FlowDetails: () => import('./FlowDetails.vue'),
  FlowListItem: () => import('./FlowListItem.vue'),
}