import {
  BaseJobTemplate,
  WorkerCollectionWorker,
  WorkerCollectionWorkerResponse
} from '@/models'
import { MapFunction } from '@/services/Mapper'
import {
  SchemaValues,
  SchemaProperty
} from '@/types/schemas'

type MapSchemaValuesSource = {
  values: SchemaValues,
  baseJobTemplate: BaseJobTemplate,
}

// TODO: Map this as part of the form submission
export const mapWorkerSchemaValuesToWorkerSchemaValuesRequest: MapFunction<
MapSchemaValuesSource,
BaseJobTemplate
> = function(source) {
  const { values = {}, baseJobTemplate } = source

  const keys = Object.keys(baseJobTemplate.variables?.properties ?? {})

  keys.forEach((key) => {
    if (baseJobTemplate.variables?.properties) {
      const property = baseJobTemplate.variables.properties[key] as
        | SchemaProperty
        | undefined

      if (property !== undefined && values[key] !== undefined) {
        property.default = values[key]
      }
    }
  })

  return baseJobTemplate
}

export const mapWorkerCollectionWorkerResponseToWorkerCollectionWorker: MapFunction<WorkerCollectionWorkerResponse, WorkerCollectionWorker> = function(source) {
  return new WorkerCollectionWorker({
    defaultBaseJobTemplate: this.map('BaseJobTemplateResponse', source.default_base_job_configuration, 'BaseJobTemplate'),
    description: source.description,
    displayName: source.display_name,
    documentationUrl: source.documentation_url,
    installCommand: source.install_command,
    logoUrl: source.logo_url,
    type: source.type,
    isBeta: source.is_beta ?? false,
  })
}