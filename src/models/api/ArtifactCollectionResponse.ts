import { ArtifactResponse } from '@/models/api/ArtifactResponse'

export type ArtifactCollectionResponse = ArtifactResponse & {
  latest_id: string,
  key: string,
}