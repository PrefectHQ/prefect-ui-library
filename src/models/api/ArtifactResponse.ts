export type ArtifactDataResponse = Record<string, unknown>

export type ArtifactResponse = {
  id: string,
  created: Date,
  updated: Date,
  key: string,
  type: string,
  data: ArtifactDataResponse,
  metadata_: ArtifactDataResponse,
  flow_run_id: string | null,
  task_run_id: string | null,
}