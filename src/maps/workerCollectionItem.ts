import { PrefectWorkerCollectionResponse, WorkerCollectionItem, WorkerCollectionItemResponse } from '@/models'
import { MapFunction } from '@/services/Mapper'

export const mapPrefectWorkerCollectionResponseToWorkerCollectionItem: MapFunction<PrefectWorkerCollectionResponse, WorkerCollectionItem[]> = function(source) {
  const { prefect: { workers } } = source;

 return Object.keys(workers).map(key => ({
    defaultBaseJobConfiguration: workers[key].default_base_job_configuration,
    description: workers[key].description,
    documentationUrl: workers[key].documentation_url,
    installCommand: workers[key].install_command,
    logoUrl: workers[key].logo_url,
    type: workers[key].type,
  }));
}