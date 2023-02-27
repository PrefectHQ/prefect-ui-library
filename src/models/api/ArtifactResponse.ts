export type ArtifactDataResponse = Record<string, unknown>
export type ArtifactMetadataResponse = {
  description_: string,
}

export type ArtifactResponse = {
  id: string,
  created: string,
  updated: string,
  key: string | null,
  type: string,
  data: ArtifactDataResponse,
  metadata_: ArtifactMetadataResponse | null,
  flow_run_id: string | null,
  task_run_id: string | null,
}