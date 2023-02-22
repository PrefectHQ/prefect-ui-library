import { Section } from '@/demo/router/routeRecords'

export const general: Section = {
  CodeBanner: () => import('./CodeBanner.vue'),
  ColorModeSelect: () => import('./ColorModeSelect.vue'),
  ColorModeSelectOption: () => import('./ColorModeSelectOption.vue'),
  ConfirmDeleteModal: () => import('./ConfirmDeleteModal.vue'),
  CopyableWrapper: () => import('./CopyableWrapper.vue'),
  CopyOverflowMenuItem: () => import('./CopyOverflowMenuItem.vue'),
  LogoImage: () => import('./LogoImage.vue'),
}