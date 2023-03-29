import { Section } from '@/demo/router/routeRecords'

export const artifacts: Section = {
  ArtifactCard: () => import('./ArtifactCard.vue'),
  ArtifactDataView: () => import('./ArtifactDataView.vue'),
  ArtifactDescription: () => import('./ArtifactDescription.vue'),
  ArtifactTimeline: () => import('./ArtifactTimeline.vue'),
}