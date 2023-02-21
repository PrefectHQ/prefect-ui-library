import { Section } from '@/demo/router/routeRecords'

export const artifacts: Section = {
  ArtifactCards: () => import('./ArtifactCards.vue'),
  ArtifactLists: () => import('./ArtifactLists.vue'),
}