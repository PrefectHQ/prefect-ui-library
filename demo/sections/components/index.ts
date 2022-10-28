import { Section } from '@/demo/router/routeRecords'

export const components: Section = {
  flowRunListItem: () => import ('./FlowRunListItem.vue'),
  blockDocumentKeyValue: () => import('./BlockDocumentKeyValue.vue'),
  blockIconText: () => import('./BlockIconText.vue'),
  blockDocumentCard: () => import('./BlockDocumentCard.vue'),
}