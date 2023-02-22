export type WorkerCollectionItem = {
  defaultBaseJobConfiguration?: Record<string, unknown>,
  description?: string,
  documentationUrl?: string,
  installCommand?: string,
  logoUrl?: string,
  type?: string,
}

export type WorkerColection = Record<string, WorkerCollectionItem>

export type PrefectWorkerCollection = {
  prefect: {
    workers: WorkerColection
  }
}