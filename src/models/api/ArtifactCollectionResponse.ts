import { ArtifactDataResponse, ArtifactMetadataResponse } from '@/models/api/ArtifactResponse'

export type ArtifactCollectionResponse = {
  id: string,
  latest_id: string,
  created: string,
  updated: string,
  key: string,
  type: string,
  description: string | null,
  data: ArtifactDataResponse,
  metadata_: ArtifactMetadataResponse,
  flow_run_id: string | null,
  task_run_id: string | null,
}