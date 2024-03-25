<template>
  <component :is="input.component" v-bind="input.props" class="schema-form-property-array" />
</template>

<script lang="ts" setup>
  import { PCombobox, SelectModelValue, State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyArrayList from '@/schemas/components/SchemaFormPropertyArrayList.vue'
  import { useSchema } from '@/schemas/compositions/useSchema'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty, isSchemaProperty, isSchemaPropertyPrimitiveType, isSchemaPropertyType } from '@/schemas/types/schema'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { mergeSchemaPropertyDefinition } from '@/schemas/utilities/definitions'
  import { isNull, isNumber, isString, isBoolean, isNotNullish } from '@/utilities'
  import { withProps } from '@/utilities/components'

  const props = defineProps<{
    property: SchemaProperty & { type: 'array' },
    value: unknown[] | undefined,
    errors: SchemaValueError[],
    state: State,
  }>()

  const schema = useSchema()
  const { property } = useSchemaProperty(() => props.property)

  const emit = defineEmits<{
    'update:value': [unknown[] | undefined],
  }>()

  function isSelectModalValue(value: unknown): value is SelectModelValue {
    return isNumber(value) || isString(value) || isBoolean(value) || isNull(value)
  }

  function asSelectModalValue(value: unknown): SelectModelValue[] | undefined {
    if (!Array.isArray(value)) {
      return undefined
    }

    return value.filter(isSelectModalValue)
  }

  const input = computed(() => {
    const { items } = property.value

    if (isSchemaProperty(items)) {
      const { type, enum: propertyEnum } = mergeSchemaPropertyDefinition(items, schema)

      if (isSchemaPropertyPrimitiveType(type) && propertyEnum) {
        return withProps(PCombobox, {
          modelValue: asSelectModalValue(props.value),
          emptyMessage: 'No items selected',
          state: props.state,
          options: propertyEnum.filter(isSelectModalValue).filter(isNotNullish),
          multiple: true,
          'onUpdate:modelValue': value => emit('update:value', asSelectModalValue(value)),
        })
      }
    }

    return withProps(SchemaFormPropertyArrayList, {
      property: props.property,
      value: props.value,
      state: props.state,
      errors: props.errors,
      'onUpdate:value': value => emit('update:value', value),
    })
  })
</script>