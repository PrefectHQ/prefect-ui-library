import { sortStringArray } from '@prefecthq/prefect-design'
import { Variable, VariableCreate, VariableEdit } from '..'
import { VariableCreateRequest, VariableEditRequest } from '@/models/api/VariableRequest'
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

export const mapVariableEditToVariableEditRequest: MapFunction<VariableEdit, VariableEditRequest> = function(source) {
  return {
    name: source.name,
    value: source.value,
    tags: source.tags,
  }
}

export const mapVariableCreateToVariableCreateRequest: MapFunction<VariableCreate, VariableCreateRequest> = function(source) {
  return {
    name: source.name,
    value: source.value,
    tags: source.tags,
  }
}