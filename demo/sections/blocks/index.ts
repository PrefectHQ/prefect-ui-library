import { Section } from '@/demo/router/routeRecords'

export const blocks: Section = {
  BlockDocumentCard: () => import('./BlockDocumentCard.vue'),
  BlockDocumentInput: () => import('./BlockDocumentInput.vue'),
  BlockDocumentKeyValue: () => import('./BlockDocumentKeyValue.vue'),
  BlockDocumentMenu: () => import('./BlockDocumentMenu.vue'),
  BlockDocumentsSelect: () => import('./BlockDocumentsSelect.vue'),
  BlockDocumentsTable: () => import('./BlockDocumentsTable.vue'),
  BlockIconText: () => import('./BlockIconText.vue'),
}