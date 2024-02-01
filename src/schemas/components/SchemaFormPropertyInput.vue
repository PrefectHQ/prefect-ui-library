<template>
  <div class="schema-form-property-input">
    <template v-if="isPrefectKindValue(value)">
      <SchemaFormKindInput :value="value" :property="property" @update:value="emit('update:value', $event)" />
    </template>
    <template v-else>
      <component :is="input.component" v-bind="input.props" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PNumberInput, PToggle } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormKindInput from '@/schemas/components/SchemaFormKindInput.vue'
  import SchemaFormPropertyArray from '@/schemas/components/SchemaFormPropertyArray.vue'
  import SchemaFormPropertyBlockDocument from '@/schemas/components/SchemaFormPropertyBlockDocument.vue'
  import SchemaFormPropertyObject from '@/schemas/components/SchemaFormPropertyObject.vue'
  import SchemaFormPropertyString from '@/schemas/components/SchemaFormPropertyString.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty, isPropertyWith, isSchemaPropertyType } from '@/schemas/types/schema'
  import { SchemaValue, asBlockDocumentReferenceValue, isPrefectKindValue } from '@/schemas/types/schemaValues'
  import { withProps } from '@/utilities/components'
  import { asType } from '@/utilities/types'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  function update(value: unknown): void {
    emit('update:value', value)
  }

  const property = useSchemaProperty(() => props.property)

  const input = computed(() => {
    const { type } = property.value
    const { value } = props

    if (isPropertyWith(property.value, 'blockTypeSlug')) {
      return withProps(SchemaFormPropertyBlockDocument, {
        property: property.value,
        value: asBlockDocumentReferenceValue(value),
        'onUpdate:value': update,
      })
    }

    if (isSchemaPropertyType(type, 'boolean')) {
      return withProps(PToggle, {
        modelValue: asType(value, Boolean),
        'onUpdate:modelValue': update,
      })
    }

    if (isSchemaPropertyType(type, 'string')) {
      return withProps(SchemaFormPropertyString, {
        property: { ...property.value, type },
        value: asType(value, String),
        'onUpdate:value': update,
      })
    }

    if (isSchemaPropertyType(type, 'integer') || isSchemaPropertyType(type, 'number')) {
      return withProps(PNumberInput, {
        modelValue: asType(value, Number),
        'onUpdate:modelValue': update,
      })
    }

    if (isSchemaPropertyType(type, 'array')) {
      return withProps(SchemaFormPropertyArray, {
        property: { ...property.value, type },
        value: asType(value, Array),
        'onUpdate:value': update,
      })
    }

    if (isSchemaPropertyType(type, 'object')) {
      return withProps(SchemaFormPropertyObject, {
        property: { ...property.value, type },
        values: asType(value, Object),
        'onUpdate:values': update,
      })
    }

    if (isSchemaPropertyType(type, 'null')) {
      return { component: null, props: {} }
    }

    if (isSchemaPropertyType(type, undefined)) {
      throw 'not implemented'
    }

    const exhaustive: never = type
    throw new Error(`SchemaFormPropertyInput missing case for ${exhaustive}`)
  })
</script>