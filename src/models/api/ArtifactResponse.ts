export type ArtifactDataResponse = Record<string, unknown>

export type ArtifactResponse = {
  id: string,
  created: string,
  updated: string,
  key: string,
  type: string,
  description: string | null,
  data: ArtifactDataResponse,
  metadata_: ArtifactDataResponse,
  flow_run_id: string | null,
  task_run_id: string | null,
}