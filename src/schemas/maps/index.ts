import { mapSchemaPropertiesResponseToSchemaProperties, mapSchemaResponseToSchema, mapSchemaPropertyResponseToSchemaProperty, mapSchemaToSchemaResponse, mapSchemaPropertyToSchemaPropertyResponse, mapSchemaPropertiesToSchemaPropertiesResponse } from '@/schemas/maps/schema'

export const maps = {
  SchemaResponse: { Schema: mapSchemaResponseToSchema },
  SchemaPropertyResponse: { SchemaProperty: mapSchemaPropertyResponseToSchemaProperty },
  SchemaPropertiesResponse: { SchemaProperties: mapSchemaPropertiesResponseToSchemaProperties },
  Schema: { SchemaResponse: mapSchemaToSchemaResponse },
  SchemaProperty: { SchemaPropertyResponse: mapSchemaPropertyToSchemaPropertyResponse },
  SchemaProperties: { SchemaPropertiesResponse: mapSchemaPropertiesToSchemaPropertiesResponse },
}