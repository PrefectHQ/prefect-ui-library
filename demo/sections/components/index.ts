import { Section } from '@/demo/router/routeRecords'

export const components: Section = {
  flowListItem: () => import ('./FlowListItem.vue'),
  blockDocumentKeyValue: () => import('./BlockDocumentKeyValue.vue'),
  blockIconText: () => import('./BlockIconText.vue'),
  blockDocumentCard: () => import('./BlockDocumentCard.vue'),
}