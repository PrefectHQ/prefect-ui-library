import { Section } from '@/demo/router/routeRecords'

export const components: Section = {
  FlowRunList: () => import ('./FlowRunList.vue'),
  FlowRunListItem: () => import ('./FlowRunListItem.vue'),
  BlockDocumentKeyValue: () => import('./BlockDocumentKeyValue.vue'),
  BlockIconText: () => import('./BlockIconText.vue'),
  BlockDocumentCard: () => import('./BlockDocumentCard.vue'),
}