import {
  PrefectWorkerCollectionResponse,
  SchemaPropertyResponse,
  WorkerCollectionItem,
  WorkerCollectionItemResponse
} from '@/models'
import { MapFunction } from '@/services/Mapper'
import { SchemaValues, WorkerSchema, SchemaProperty } from '@/types/schemas'

export const mapPrefectWorkerCollectionResponseToWorkerCollectionItemArray: MapFunction<
PrefectWorkerCollectionResponse,
WorkerCollectionItem[]
> = function(source) {
  return Object.values(source).reduce<WorkerCollectionItemResponse[]>(
    (acc, package_data) => [...acc, ...Object.values(package_data)],
    [],
  ).map((worker_data) => ({
    defaultBaseJobConfiguration: worker_data.default_base_job_configuration,
    description: worker_data.description,
    documentationUrl: worker_data.documentation_url,
    installCommand: worker_data.install_command,
    logoUrl: worker_data.logo_url,
    type: worker_data.type,
  }))
}

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: WorkerSchema,
}

export const mapWorkerSchemaValuesToWorkerSchemaValuesRequest: MapFunction<
MapSchemaValuesSource,
SchemaPropertyResponse
> = function(source) {
  const { values = {}, schema } = source

  const object: WorkerSchema = schema as WorkerSchema

  if (object.variables !== undefined) {
    object.variables.properties = object.variables.properties ?? {}
  }

  const keys = Object.keys(values) as (keyof SchemaProperty)[]

  keys.forEach((key) => {
    if (object.variables?.properties && values[key] !== undefined) {
      const property = object.variables.properties[key] as
        | SchemaProperty
        | undefined

      if (property !== undefined) {
        property.default = values[key]
      }
    }
  })

  return object
}
