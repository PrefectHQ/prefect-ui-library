<template>
  <div class="schema-form-property-input">
    <component :is="input.component" v-bind="input.props" />
  </div>
</template>

<script lang="ts" setup>
  import { PNumberInput, PToggle, State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyArray from '@/schemas/components/SchemaFormPropertyArray.vue'
  import SchemaFormPropertyBlockDocument from '@/schemas/components/SchemaFormPropertyBlockDocument.vue'
  import SchemaFormPropertyInteger from '@/schemas/components/SchemaFormPropertyInteger.vue'
  import SchemaFormPropertyNull from '@/schemas/components/SchemaFormPropertyNull.vue'
  import SchemaFormPropertyObject from '@/schemas/components/SchemaFormPropertyObject.vue'
  import SchemaFormPropertyString from '@/schemas/components/SchemaFormPropertyString.vue'
  import SchemaFormPropertyUnknown from '@/schemas/components/SchemaFormPropertyUnknown.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty, isPropertyWith, isSchemaPropertyType } from '@/schemas/types/schema'
  import { SchemaValue, asBlockDocumentReferenceValue } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { withProps } from '@/utilities/components'
  import { asType } from '@/utilities/types'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    errors: SchemaValueError[],
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  const { property } = useSchemaProperty(() => props.property)

  const input = computed(() => {
    const { type } = property.value
    const { value } = props

    if (isPropertyWith(property.value, 'blockTypeSlug')) {
      return withProps(SchemaFormPropertyBlockDocument, {
        property: property.value,
        state: props.state,
        value: asBlockDocumentReferenceValue(value),
        'onUpdate:value': (value) => emit('update:value', value),
      })
    }

    if (isSchemaPropertyType(type, 'boolean')) {
      return withProps(PToggle, {
        modelValue: asType(value, Boolean),
        state: props.state,
        'onUpdate:modelValue': (value) => emit('update:value', asType(value, Boolean)),
      })
    }

    if (isSchemaPropertyType(type, 'string')) {
      return withProps(SchemaFormPropertyString, {
        property: { ...property.value, type },
        value: asType(value, String),
        state: props.state,
        'onUpdate:value': (value) => emit('update:value', asType(value, String)),
      })
    }

    if (isSchemaPropertyType(type, 'integer')) {
      return withProps(SchemaFormPropertyInteger, {
        property: { ...property.value, type },
        value: asType(value, Number),
        state: props.state,
        'onUpdate:value': (value) => emit('update:value', asType(value, Number)),
      })
    }

    if (isSchemaPropertyType(type, 'number')) {
      return withProps(PNumberInput, {
        modelValue: asType(value, Number),
        step: '0.01',
        state: props.state,
        'onUpdate:modelValue': (value) => emit('update:value', asType(value, Number)),
      })
    }

    if (isSchemaPropertyType(type, 'array')) {
      return withProps(SchemaFormPropertyArray, {
        property: { ...property.value, type },
        value: asType(value, Array),
        errors: props.errors,
        state: props.state,
        'onUpdate:value': (value) => emit('update:value', asType(value, Array)),
      })
    }

    if (isSchemaPropertyType(type, 'object')) {
      return withProps(SchemaFormPropertyObject, {
        property: { ...property.value, type },
        values: asType(value, Object),
        errors: props.errors,
        'onUpdate:values': (value) => emit('update:value', asType(value, Object)),
      })
    }

    if (isSchemaPropertyType(type, 'null')) {
      return withProps(SchemaFormPropertyNull, {
        property: { ...property.value, type },
        value: null,
        'onUpdate:value': (value) => emit('update:value', value),
      })
    }

    if (isSchemaPropertyType(type, undefined)) {
      return withProps(SchemaFormPropertyUnknown, {
        property: { ...property.value, type },
        value: value,
        state: props.state,
        'onUpdate:value': (value) => emit('update:value', value),
      })
    }

    const exhaustive: never = type
    throw new Error(`SchemaFormPropertyInput missing case for ${exhaustive}`)
  })
</script>