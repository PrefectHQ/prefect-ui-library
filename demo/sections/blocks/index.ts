import { Section } from '@/demo/router/routeRecords'

export const blocks: Section = {
  BlockCapabilityBlockDocumentInput: () => import('./BlockCapabilityBlockDocumentInput.vue'),
  BlockDocumentCard: () => import('./BlockDocumentCard.vue'),
  BlockDocumentCombobox: () => import('./BlockDocumentCombobox.vue'),
  BlockDocumentInput: () => import('./BlockDocumentInput.vue'),
  BlockDocumentKeyValue: () => import('./BlockDocumentKeyValue.vue'),
  BlockDocumentMenu: () => import('./BlockDocumentMenu.vue'),
  BlockDocumentsTable: () => import('./BlockDocumentsTable.vue'),
  BlockIconText: () => import('./BlockIconText.vue'),
  BlockSchemaCapabilities: () => import('./BlockSchemaCapabilities.vue'),
  BlockSchemaCapabilitiesSelect: () => import('./BlockSchemaCapabilitiesSelect.vue'),
  BlockSchemaCreateForm: () => import('./BlockSchemaCreateForm.vue'),
  BlockSchemaEditForm: () => import('./BlockSchemaEditForm.vue'),
  BlocksPageEmptyState: () => import('./BlocksPageEmptyState.vue'),
  BlockTypeCard: () => import('./BlockTypeCard.vue'),
  BlockTypeCardLayout: () => import('./BlockTypeCardLayout.vue'),
  BlockTypeCardPreview: () => import('./BlockTypeCardPreview.vue'),
  BlockTypeList: () => import('./BlockTypeList.vue'),
  BlockTypeSelect: () => import('./BlockTypeSelect.vue'),
  BlockTypeSnippet: () => import('./BlockTypeSnippet.vue'),
}