import { PrefectWorkerCollectionResponse, SchemaPropertyResponse, WorkerCollectionItem, WorkerCollectionItemResponse } from '@/models'
import { getSchemaRequestValue } from '@/services';
import { MapFunction } from '@/services/Mapper'
import { Schema, SchemaProperty, SchemaValues, WorkerSchema } from '@/types/schemas'
import { computed } from 'vue';

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

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: WorkerSchema,
}

export const mapWorkerSchemaValuesToWorkerSchemaValuesRequest: MapFunction<MapSchemaValuesSource, SchemaPropertyResponse> = function(source) {
  const { values, schema } = source;

  const object:WorkerSchema = schema

  Object.keys(values).map(key => {
    if(object.variables && object.variables.properties && values[key]) {
      object.variables.properties[key].default = values[key]
    }
  })

  return object
}
