import { Section } from '@/demo/router/routeRecords'

export const components: Section = {
  flowRunList: () => import ('./FlowRunList.vue'),
  flowRunListItem: () => import ('./FlowRunListItem.vue'),
  blockDocumentKeyValue: () => import('./BlockDocumentKeyValue.vue'),
  blockIconText: () => import('./BlockIconText.vue'),
  blockDocumentCard: () => import('./BlockDocumentCard.vue'),
}