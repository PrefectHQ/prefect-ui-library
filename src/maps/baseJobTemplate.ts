import { BaseJobTemplate } from '@/models'
import { BaseJobTemplateRequest } from '@/models/api/BaseJobTemplateRequest'
import { BaseJobTemplateResponse } from '@/models/api/BaseJobTemplateResponse'
import { MapFunction } from '@/services/Mapper'

export const mapBaseJobTemplateResponseToBaseJobTemplate: MapFunction<BaseJobTemplateResponse, BaseJobTemplate> = function(source) {
  return new BaseJobTemplate({
    jobConfiguration: source.job_configuration,
    variables: source.variables,
  })
}

export const mapBaseJobTemplateToBaseJobTemplateRequest: MapFunction<BaseJobTemplate, BaseJobTemplateRequest> = function(source) {
  return {
    job_configuration: source.jobConfiguration,
    variables: source.variables,
  }
}
