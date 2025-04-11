<template>
  <component :is="view.component" v-bind="view.props" class="schema-property-view" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormPropertyNull from '@/schemas/components/SchemaFormPropertyNull.vue'
  import SchemaPropertyViewArray from '@/schemas/components/SchemaPropertyViewArray.vue'
  import SchemaPropertyViewBlockDocument from '@/schemas/components/SchemaPropertyViewBlockDocument.vue'
  import SchemaPropertyViewBoolean from '@/schemas/components/SchemaPropertyViewBoolean.vue'
  import SchemaPropertyViewNumber from '@/schemas/components/SchemaPropertyViewNumber.vue'
  import SchemaPropertyViewObject from '@/schemas/components/SchemaPropertyViewObject.vue'
  import SchemaPropertyViewString from '@/schemas/components/SchemaPropertyViewString.vue'
  import SchemaPropertyViewUnknown from '@/schemas/components/SchemaPropertyViewUnknown.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty, isPropertyWith, isSchemaPropertyType } from '@/schemas/types/schema'
  import { SchemaValue, asBlockDocumentReferenceValue } from '@/schemas/types/schemaValues'
  import { withProps } from '@/utilities/components'
  import { asType } from '@/utilities/types'

  const { property, value } = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
  }>()

  const { property: schemaProperty } = useSchemaProperty(() => property)

  const view = computed(() => {
    const { type } = schemaProperty.value

    if (isPropertyWith(schemaProperty.value, 'blockTypeSlug')) {
      return withProps(SchemaPropertyViewBlockDocument, {
        property: schemaProperty.value,
        value: asBlockDocumentReferenceValue(value),
      })
    }

    if (isSchemaPropertyType(type, 'boolean')) {
      return withProps(SchemaPropertyViewBoolean, {
        property: { ...schemaProperty.value, type },
        value: asType(value, Boolean),
      })
    }

    if (isSchemaPropertyType(type, 'string')) {
      return withProps(SchemaPropertyViewString, {
        property: { ...schemaProperty.value, type },
        value: asType(value, String),
      })
    }

    if (isSchemaPropertyType(type, 'integer') || isSchemaPropertyType(type, 'number')) {
      return withProps(SchemaPropertyViewNumber, {
        property: { ...schemaProperty.value, type },
        value: asType(value, Number),
      })
    }

    if (isSchemaPropertyType(type, 'array')) {
      return withProps(SchemaPropertyViewArray, {
        property: { ...schemaProperty.value, type },
        value: asType(value, Array) ?? [],
      })
    }

    if (isSchemaPropertyType(type, 'object')) {
      return withProps(SchemaPropertyViewObject, {
        property: { ...schemaProperty.value, type },
        values: asType(value, Object),
      })
    }

    if (isSchemaPropertyType(type, 'null')) {
      return withProps(SchemaFormPropertyNull, {
        property: { ...schemaProperty.value, type },
        value: null,
      })
    }

    if (isSchemaPropertyType(type, undefined)) {
      return withProps(SchemaPropertyViewUnknown, {
        property: { ...schemaProperty.value, type },
        value: value,
      })
    }

    const exhaustive: never = type
    throw new Error(`SchemaFormPropertyInput missing case for ${exhaustive}`)
  })
</script>