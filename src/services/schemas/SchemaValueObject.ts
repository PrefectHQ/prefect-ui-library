import { SchemaPropertyService, SchemaPropertyServiceSource } from './SchemaPropertyService'
import { SchemaService } from './SchemaService'
import { BlockDocumentReferenceValue, isBlockDocumentReferenceValue } from '@/models/api/BlockDocumentCreateRequest'
import { SchemaValue, isSchemaValues } from '@/types/schemas'
import { parseUnknownJson, stringifyUnknownJson } from '@/utilities/json'

export class SchemaValueObject extends SchemaPropertyService {

  private readonly schemaService: SchemaService

  public constructor(source: SchemaPropertyServiceSource) {
    super(source)

    this.schemaService = new SchemaService({
      initialPropertyLevel: source.level,
      maxPropertyLevel: source.maxPropertyLevel,
    })
  }

  protected request(value: SchemaValue): unknown {
    if (this.has('blockTypeSlug')) {
      return this.blockRequestValue(value)
    }

    if (this.isMaxLevel) {
      return this.maxLevelRequestValue(value)
    }

    throw new Error('Method not implemented.')
  }

  protected response(value: SchemaValue): unknown {
    if (this.has('blockTypeSlug')) {
      return this.blockResponseValue(value as BlockDocumentReferenceValue)
    }

    if (this.isMaxLevel) {
      return this.maxLevelResponseValue(value)
    }

    // if there are no nested properties a JsonInput is used
    if (!this.has('properties')) {
      // if(this.has('additionalProperties')) {
      //   return stringifyUnknownJson(value)
      // }

      return stringifyUnknownJson(value)
    }

    // just in case what we got from the api was a json string
    // apparently this isn't uncommon
    const parsed = parseUnknownJson(value)

    if (!isSchemaValues(parsed)) {
      return this.schemaService.mapRequestValues({}, this.property)
    }

    return this.schemaService.mapRequestValues(parsed, this.property)
  }

  protected get default(): unknown {
    // JsonInput is used when max level is reached
    if (this.isMaxLevel) {
      return ''
    }

    // some object properties don't have specific properties and a JsonInput is used
    if (!this.has('properties')) {
      return ''
    }

    // todo: additionalProperties support
    // if (!this.has('properties') && this.has('additionalProperties')) {
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