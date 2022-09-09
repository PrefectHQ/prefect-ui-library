import { SchemaValueMapper, SchemaValueRequest, SchemaValueResponse } from './SchemaValue'
import { BlockDocumentReferenceValue, isBlockDocumentReferenceValue } from '@/models/api/BlockDocumentCreateRequest'
import { isSchemaValues, schemaHas, SchemaValue, SchemaProperty } from '@/types/schemas'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaValueObject extends SchemaValueMapper {
  public request({ property, value }: SchemaValueRequest): unknown {
    if (schemaHas(property, 'blockTypeSlug')) {
      return this.blockRequestValue(value)
    }

    if (this.isMaxLevel) {
      return this.maxLevelRequestValue(value)
    }

    throw new Error('Method not implemented.')
  }

  public response({ property, value }: SchemaValueResponse): unknown {
    if (schemaHas(property, 'blockTypeSlug')) {
      return this.blockResponseValue(value as BlockDocumentReferenceValue)
    }

    if (this.isMaxLevel) {
      return this.maxLevelResponseValue(value)
    }

    // if there are no nested properties a JsonInput is used
    if (!schemaHas(property, 'properties')) {
      // if(schemaHas(property, 'additionalProperties')) {
      //   return stringifyUnknownJson(value)
      // }

      return stringifyUnknownJson(value)
    }

    // just in case what we got from the api was a json string
    // apparently this isn't uncommon
    const parsed = parseUnknownJson(value)

    if (!isSchemaValues(parsed)) {
      return this.mapRequestValues({}, property)
    }

    return this.mapRequestValues(parsed, property)
  }

  public default(property: SchemaProperty): unknown {
    // JsonInput is used when max level is reached
    if (this.isMaxLevel) {
      return ''
    }

    // some object properties don't have specific properties and a JsonInput is used
    if (!schemaHas(property, 'properties')) {
      return ''
    }

    // todo: additionalProperties support
    // if (!schemaHas(property, 'properties') && schemaHas(property, 'additionalProperties')) {
    //   return ''
    // }

    return {}
  }

  private blockRequestValue(value: SchemaValue): BlockDocumentReferenceValue | unknown {
    if (!value || typeof value !== 'string') {
      return value
    }

    const request: BlockDocumentReferenceValue = {
      $ref: {
        // eslint-disable-next-line camelcase
        block_document_id: value,
      },
    }

    return request
  }

  private blockResponseValue(value: SchemaValue): unknown {
    if (isBlockDocumentReferenceValue(value)) {
      return value.$ref.block_document_id
    }

    return value
  }

  private maxLevelRequestValue(value: SchemaValue): unknown {
    const mapped = parseUnknownJson(value)

    if (mapped === null || mapped === undefined) {
      return this.invalid()
    }

    return mapped
  }

  private maxLevelResponseValue(value: SchemaValue): unknown {
    const mapped = stringifyUnknownJson(value)

    if (mapped === null || mapped === undefined) {
      return this.invalid()
    }

    return mapped
  }

}