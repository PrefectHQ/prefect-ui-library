import { Section } from '@/demo/router/routeRecords'

export const artifacts: Section = {
  ArtifactDescription: () => import('./ArtifactDescription.vue'),
  ArtifactCard: () => import('./ArtifactCard.vue'),
}