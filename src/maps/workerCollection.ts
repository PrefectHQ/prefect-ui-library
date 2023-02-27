import { PrefectWorkerCollectionResponse, SchemaPropertyResponse, WorkerCollectionItem } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { SchemaValues, WorkerSchema, SchemaProperty } from '@/types/schemas'

export const mapPrefectWorkerCollectionResponseToWorkerCollectionItem: MapFunction<PrefectWorkerCollectionResponse, WorkerCollectionItem[]> = function(source) {
  const { prefect: { workers } } = source

  return Object.keys(workers).map(key => ({
    defaultBaseJobConfiguration: workers[key].default_base_job_configuration,
    description: workers[key].description,
    documentationUrl: workers[key].documentation_url,
    installCommand: workers[key].install_command,
    logoUrl: workers[key].logo_url,
    type: workers[key].type,
  }))
}

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: WorkerSchema,
}

export const mapWorkerSchemaValuesToWorkerSchemaValuesRequest: MapFunction<MapSchemaValuesSource, SchemaPropertyResponse> = function(source) {
  const { values, schema } = source

  const object: WorkerSchema = schema as WorkerSchema

  if (object.variables !== undefined) {
    object.variables.properties = object.variables.properties ?? {}
  }

  const keys = Object.keys(values) as (keyof SchemaProperty)[]

  keys.forEach((key) => {
    if (object.variables?.properties && values[key]) {
      const property = object.variables.properties[key] as SchemaProperty | undefined

      if (property !== undefined) {
        property.default = values[key]
      }
    }
  })

  return object
}


