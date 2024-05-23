import { sortStringArray } from '@prefecthq/prefect-design'
import { Variable, VariableV2Create, VariableV2Edit, parseUnknownJson } from '..'
import { VariableV2CreateRequest, VariableV2EditRequest } from '@/models/api/VariableRequest'
import { VariableResponse } from '@/models/api/VariableResponse'
import { MapFunction } from '@/services/Mapper'

export const mapVariableResponseToVariable: MapFunction<VariableResponse, Variable> = function(source) {
  return new Variable({
    id: source.id,
    name: source.name,
    value: source.value,
    tags: sortStringArray(source.tags ?? []),
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
  })
}

export const mapVariableEditToVariableEditRequest: MapFunction<VariableV2Edit, VariableV2EditRequest> = function(source) {
  return {
    name: source.name,
    value: parseUnknownJson(source.value),
    tags: source.tags,
  }
}

export const mapVariableCreateToVariableCreateRequest: MapFunction<VariableV2Create, VariableV2CreateRequest> = function(source) {
  return {
    name: source.name,
    value: parseUnknownJson(source.value),
    tags: source.tags,
  }
}