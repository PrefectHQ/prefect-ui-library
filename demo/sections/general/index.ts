import { Section } from '@/demo/router/routeRecords'

export const general: Section = {
  Query: () => import ('./Query.vue'),
  CodeBanner: () => import ('./CodeBanner.vue'),
  CodeSnippet: () => import ('./CodeSnippet.vue'),
  CodeView: () => import ('./CodeView.vue'),
  ColorModeSelect: () => import ('./ColorModeSelect.vue'),
  ColorModeSelectOption: () => import ('./ColorModeSelectOption.vue'),
  ConfirmDeleteModal: () => import ('./ConfirmDeleteModal.vue'),
  CopyOverflowMenuItem: () => import ('./CopyOverflowMenuItem.vue'),
}