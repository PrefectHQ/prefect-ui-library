import { sortStringArray } from '@prefecthq/prefect-design'
import { Variable, VariableCreate, VariableEdit, VariableV2, VariableV2Create, VariableV2Edit, parseUnknownJson } from '..'
import { VariableCreateRequest, VariableEditRequest } from '@/models/api/VariableRequest'
import { VariableResponse } from '@/models/api/VariableResponse'
import { VariableV2CreateRequest, VariableV2EditRequest } from '@/models/api/VariableV2Request'
import { VariableV2Response } from '@/models/api/VariableV2Response'
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


export const mapVariableV2ResponseToVariableV2: MapFunction<VariableV2Response, VariableV2> = function(source) {
  return new VariableV2({
    id: source.id,
    name: source.name,
    value: source.value,
    tags: sortStringArray(source.tags ?? []),
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
  })
}

export const mapVariableV2EditToVariableV2EditRequest: MapFunction<VariableV2Edit, VariableV2EditRequest> = function(source) {
  return {
    name: source.name,
    value: parseUnknownJson(source.value),
    tags: source.tags,
  }
}

export const mapVariableV2CreateToVariableV2CreateRequest: MapFunction<VariableV2Create, VariableV2CreateRequest> = function(source) {
  return {
    name: source.name,
    value: parseUnknownJson(source.value),
    tags: source.tags,
  }
}