import { SchemaPropertyResponse } from '@/models/api'

export type DefaultBaseJobConfiguration = {
  jobConfiguration: Record<string, unknown>,
  variables: SchemaPropertyResponse,
}

export type WorkerCollectionItem = {
  defaultBaseJobConfiguration?: DefaultBaseJobConfiguration,
  description?: string,
  displayName?: string,
  documentationUrl?: string,
  installCommand?: string,
  logoUrl?: string,
  type?: string,
  isBeta?: boolean,
}

export type WorkerColection = Record<string, WorkerCollectionItem>

export type PrefectWorkerCollection = {
  prefect: {
    workers: WorkerColection,
  },
}