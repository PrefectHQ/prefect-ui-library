import { Section } from '@/demo/router/routeRecords'

export const artifacts: Section = {
  ArtifactCard: () => import('./ArtifactCard.vue'),
  ArtifactDescription: () => import('./ArtifactDescription.vue'),
}