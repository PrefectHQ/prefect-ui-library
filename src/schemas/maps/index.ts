import { mapSchemaPropertiesResponseToSchemaProperties, mapSchemaResponseToSchema, mapSchemaPropertyResponseToSchemaProperty } from '@/schemas/maps/schema'

export const maps = {
  SchemaResponse: { Schema: mapSchemaResponseToSchema },
  SchemaPropertyResponse: { SchemaProperty: mapSchemaPropertyResponseToSchemaProperty },
  SchemaPropertiesResponse: { SchemaProperties: mapSchemaPropertiesResponseToSchemaProperties },
}