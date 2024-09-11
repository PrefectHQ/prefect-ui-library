<template>
  <component :is="input.component" v-bind="input.props" class="schema-form-property-string" />
</template>

<script lang="ts" setup>
  import { PCombobox, SelectModelValue, SelectOption, State, isDefined } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { PrefectKindJson } from '@/schemas/types/schemaValues'
  import { isNumber, isString, withProps } from '@/utilities'
  import { isBoolean } from '@/utilities/boolean'
  import { asJson } from '@/utilities/types'

  function isSelectModelValue(value: unknown): value is SelectModelValue {
    return isString(value) || isBoolean(value) || isNumber(value) || value === null
  }

  function asSelectModelValue(value: unknown): SelectModelValue | undefined {
    if (isSelectModelValue(value)) {
      return value
    }

    return undefined
  }

  const props = defineProps<{
    property: SchemaProperty & { type: undefined },
    value: unknown,
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [unknown],
  }>()

  const { property } = useSchemaProperty(() => props.property)

  if (!isDefined(property.value.enum)) {
    const valueOrDefaultValue = isDefined(props.value) ? props.value : property.value.default

    const json: PrefectKindJson = {
      __prefect_kind: 'json',
      value: asJson(valueOrDefaultValue),
    }

    emit('update:value', json)
  }

  const input = computed(() => {
    const { enum: unknownEnum } = property.value

    if (unknownEnum) {
      return withProps(PCombobox, {
        modelValue: asSelectModelValue(props.value),
        state: props.state,
        options: unknownEnum.filter(isSelectModelValue).map<SelectOption>(value => ({ value, label: value?.toString() ?? 'None' })),
        'onUpdate:modelValue': value => emit('update:value', value),
      })
    }

    return withProps(() => '')
  })
</script>
