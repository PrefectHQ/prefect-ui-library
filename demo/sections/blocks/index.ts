import { Section } from '@/demo/router/routeRecords'

export const blocks: Section = {
  BlockDocumentKeyValue: () => import('./BlockDocumentKeyValue.vue'),
  BlockIconText: () => import('./BlockIconText.vue'),
  BlockDocumentCard: () => import('./BlockDocumentCard.vue'),
}