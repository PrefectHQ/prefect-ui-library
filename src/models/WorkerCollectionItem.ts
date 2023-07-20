import { SchemaProperty } from '@/types'

export type DefaultBaseJobConfiguration = {
  jobConfiguration: Record<string, unknown>,
  variables: SchemaProperty,
}

export type WorkerCollectionItem = {
  defaultBaseJobConfiguration?: Record<string, unknown>,
  description?: string,
  displayName?: string,
  documentationUrl?: string,
  installCommand?: string,
  logoUrl?: string,
  type?: string,
  isBeta?: boolean,
  isPushPool?: boolean,
}

export type WorkerColection = Record<string, WorkerCollectionItem>

export type PrefectWorkerCollection = {
  prefect: {
    workers: WorkerColection,
  },
}