import SchemaForm from '@/schemas/components/SchemaForm.vue'
import SchemaInput from '@/schemas/components/SchemaInput.vue'
import SchemaPropertyView from '@/schemas/components/SchemaPropertyView.vue'
import SchemaView from '@/schemas/components/SchemaView.vue'
import { useSchemaValidation } from '@/schemas/compositions/useSchemaValidation'
import { mapper } from '@/schemas/mapper'
import { Schema } from '@/schemas/types/schema'
import { SchemaResponse } from '@/schemas/types/schemaResponse'
import { SchemaValues } from '@/schemas/types/schemaValues'

export {
  SchemaForm as SchemaFormV2,
  SchemaInput as SchemaInputV2,
  SchemaPropertyView as SchemaPropertyViewV2,
  SchemaView as SchemaViewV2,
  mapper as schemaV2Mapper,
  useSchemaValidation as useSchemaValidationV2
}

export type {
  Schema as SchemaV2,
  SchemaResponse as SchemaResponseV2,
  SchemaValues as SchemaValuesV2
}