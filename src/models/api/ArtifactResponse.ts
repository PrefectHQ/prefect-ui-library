export type ArtifactDataResponse = unknown
export type ArtifactMetadataResponse = Record<string, string>

export type ArtifactResponse = {
  id: string,
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