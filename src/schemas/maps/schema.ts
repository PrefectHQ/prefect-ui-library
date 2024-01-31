import { MapFunction } from '@/schemas/mapper'
import { Schema, SchemaProperties, SchemaProperty } from '@/schemas/types/schema'
import { SchemaPropertiesResponse, SchemaPropertyResponse, SchemaResponse } from '@/schemas/types/schemaResponse'
import { mapValues } from '@/utilities/object'

export const mapSchemaResponseToSchema: MapFunction<SchemaResponse, Schema> = function(source) {
  return {
    definitions: source.definitions,
    position: source.position,
    blockTypeSlug: source.block_type_slug,
    $ref: source.$ref,
    anyOf: source.anyOf,
    allOf: source.allOf,
    example: source.example,
    default: source.default,
    const: source.const,
    description: source.description,
    enum: source.enum,
    format: source.format,
    items: source.items,
    properties: this.map('SchemaPropertiesResponse', source.properties, 'SchemaProperties'),
    required: source.required,
    title: source.title,
    type: source.type,
  }
}

export const mapSchemaPropertiesResponseToSchemaProperties: MapFunction<SchemaPropertiesResponse, SchemaProperties> = function(source) {
  return mapValues(source, (key, value) => this.map('SchemaPropertyResponse', value, 'SchemaProperty'))
}

export const mapSchemaPropertyResponseToSchemaProperty: MapFunction<SchemaPropertyResponse, SchemaProperty> = function(source) {
  return {
    position: source.position,
    blockTypeSlug: source.block_type_slug,
    $ref: source.$ref,
    anyOf: source.anyOf,
    allOf: source.allOf,
    example: source.example,
    default: source.default,
    const: source.const,
    description: source.description,
    enum: source.enum,
    format: source.format,
    items: source.items,
    properties: this.map('SchemaPropertiesResponse', source.properties, 'SchemaProperties'),
    required: source.required,
    title: source.title,
    type: source.type,
  }
}