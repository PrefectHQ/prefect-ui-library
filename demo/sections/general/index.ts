import { Section } from '@/demo/router/routeRecords'

export const general: Section = {
  CodeBanner: () => import('./CodeBanner.vue'),
  CodeSnippet: () => import('./CodeSnippet.vue'),
  ColorModeSelect: () => import('./ColorModeSelect.vue'),
  ColorModeSelectOption: () => import('./ColorModeSelectOption.vue'),
  ConfirmDeleteModal: () => import('./ConfirmDeleteModal.vue'),
  CopyOverflowMenuItem: () => import('./CopyOverflowMenuItem.vue'),
}