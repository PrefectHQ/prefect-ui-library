import {
  PrefectWorkerCollectionResponse,
  WorkerCollectionItem
} from '@/models'
import { MapFunction } from '@/services/Mapper'
import {
  SchemaValues,
  WorkerBaseJobTemplate,
  SchemaProperty
} from '@/types/schemas'

export const mapPrefectWorkerCollectionResponseToWorkerCollectionItemArray: MapFunction<
PrefectWorkerCollectionResponse,
WorkerCollectionItem[]
> = function(source) {
  return Object.values(source)
    .flatMap((package_data) => Object.values(package_data))
    .map((worker_data) => ({
      defaultBaseJobConfiguration: worker_data.default_base_job_configuration,
      description: worker_data.description,
      displayName: worker_data.display_name,
      documentationUrl: worker_data.documentation_url,
      installCommand: worker_data.install_command,
      logoUrl: worker_data.logo_url,
      type: worker_data.type,
      isBeta: worker_data.is_beta ?? false,
      isPushPool: worker_data.is_push_pool ?? false,
    }))
}

type MapSchemaValuesSource = {
  values: SchemaValues,
  schema: WorkerBaseJobTemplate,
}

export const mapWorkerSchemaValuesToWorkerSchemaValuesRequest: MapFunction<
MapSchemaValuesSource,
WorkerBaseJobTemplate
> = function(source) {
  const { values = {}, schema } = source

  const keys = Object.keys(schema.variables?.properties ?? {})

  keys.forEach((key) => {
    if (schema.variables?.properties) {
      const property = schema.variables.properties[key] as
        | SchemaProperty
        | undefined

      if (property !== undefined && values[key] !== undefined) {
        property.default = values[key]
      }
    }
  })

  return schema
}
