<template>
  <div class="schema-form-property-input">
    <template v-if="isPrefectKindValue(value)">
      <SchemaFormKindInput v-bind="{ value, property, errors, state }" @update:value="emit('update:value', $event)" />
    </template>
    <template v-else>
      <component :is="input.component" v-bind="input.props" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PNumberInput, PToggle, State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormKindInput from '@/schemas/components/SchemaFormKindInput.vue'
  import SchemaFormPropertyArray from '@/schemas/components/SchemaFormPropertyArray.vue'
  import SchemaFormPropertyBlockDocument from '@/schemas/components/SchemaFormPropertyBlockDocument.vue'
  import SchemaFormPropertyObject from '@/schemas/components/SchemaFormPropertyObject.vue'
  import SchemaFormPropertyString from '@/schemas/components/SchemaFormPropertyString.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty, isPropertyWith, isSchemaPropertyType } from '@/schemas/types/schema'
  import { PrefectKindJson, SchemaValue, asBlockDocumentReferenceValue, isPrefectKindValue } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { withProps } from '@/utilities/components'
  import { asJson, asType } from '@/utilities/types'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    errors: SchemaValueError[],
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  function update(value: unknown): void {
    emit('update:value', value)
  }

  const { property } = useSchemaProperty(() => props.property)

  const input = computed(() => {
    const { type } = property.value
    const { value } = props

    if (isPropertyWith(property.value, 'blockTypeSlug')) {
      return withProps(SchemaFormPropertyBlockDocument, {
        property: property.value,
        state: props.state,
        value: asBlockDocumentReferenceValue(value),
        'onUpdate:value': update,
      })
    }

    if (isSchemaPropertyType(type, 'boolean')) {
      return withProps(PToggle, {
        modelValue: asType(value, Boolean),
        state: props.state,
        'onUpdate:modelValue': update,
      })
    }

    if (isSchemaPropertyType(type, 'string')) {
      return withProps(SchemaFormPropertyString, {
        property: { ...property.value, type },
        value: asType(value, String),
        state: props.state,
        'onUpdate:value': update,
      })
    }

    if (isSchemaPropertyType(type, 'integer') || isSchemaPropertyType(type, 'number')) {
      return withProps(PNumberInput, {
        modelValue: asType(value, Number),
        state: props.state,
        'onUpdate:modelValue': update,
      })
    }

    if (isSchemaPropertyType(type, 'array')) {
      return withProps(SchemaFormPropertyArray, {
        property: { ...property.value, type },
        value: asType(value, Array),
        errors: props.errors,
        state: props.state,
        'onUpdate:value': update,
      })
    }

    if (isSchemaPropertyType(type, 'object')) {
      return withProps(SchemaFormPropertyObject, {
        property: { ...property.value, type },
        values: asType(value, Object),
        errors: props.errors,
        'onUpdate:values': update,
      })
    }

    if (isSchemaPropertyType(type, 'null')) {
      return { component: null, props: {} }
    }

    if (isSchemaPropertyType(type, undefined)) {
      const json: PrefectKindJson = {
        __prefect_kind: 'json',
        value: asJson(value),
      }

      update(json)

      return { component: null, props: {} }
    }

    const exhaustive: never = type
    throw new Error(`SchemaFormPropertyInput missing case for ${exhaustive}`)
  })
</script>