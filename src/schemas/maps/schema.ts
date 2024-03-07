/* eslint-disable camelcase */
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
    prefixItems: source.prefixItems,
    properties: this.map('SchemaPropertiesResponse', source.properties, 'SchemaProperties'),
    required: source.required,
    title: source.title,
    type: source.type,
    maxItems: source.maxItems,
    minItems: source.minItems,
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
    prefixItems: source.prefixItems,
    properties: this.map('SchemaPropertiesResponse', source.properties, 'SchemaProperties'),
    required: source.required,
    title: source.title,
    type: source.type,
    maxItems: source.maxItems,
    minItems: source.minItems,
  }
}

export const mapSchemaToSchemaResponse: MapFunction<Schema, SchemaResponse> = function(source) {
  return {
    definitions: source.definitions,
    position: source.position,
    block_type_slug: source.blockTypeSlug,
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
    prefixItems: source.prefixItems,
    properties: this.map('SchemaProperties', source.properties, 'SchemaPropertiesResponse'),
    required: source.required,
    title: source.title,
    type: source.type,
    maxItems: source.maxItems,
    minItems: source.minItems,
  }
}

export const mapSchemaPropertiesToSchemaPropertiesResponse: MapFunction<SchemaProperties, SchemaPropertiesResponse> = function(source) {
  return mapValues(source, (key, value) => this.map('SchemaProperty', value, 'SchemaPropertyResponse'))
}

export const mapSchemaPropertyToSchemaPropertyResponse: MapFunction<SchemaProperty, SchemaPropertyResponse> = function(source) {
  return {
    position: source.position,
    block_type_slug: source.blockTypeSlug,
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
    prefixItems: source.prefixItems,
    properties: this.map('SchemaProperties', source.properties, 'SchemaPropertiesResponse'),
    required: source.required,
    title: source.title,
    type: source.type,
    maxItems: source.maxItems,
    minItems: source.minItems,
  }
}