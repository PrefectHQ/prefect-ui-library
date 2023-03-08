import { Section } from '@/demo/router/routeRecords'

export const states: Section = {
  StateNameSelect: () => import('./StateNameSelect.vue'),
  StateSelect: () => import('./StateSelect.vue'),
}