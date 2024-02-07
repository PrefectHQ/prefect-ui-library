<template>
  <component :is="input.component" v-bind="input.props" />
</template>

<script lang="ts" setup>
  import { PCodeInput, State } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyInput from '@/schemas/components/SchemaFormPropertyInput.vue'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { PrefectKindValue, isPrefectKindJinja, isPrefectKindJson, isPrefectKindNull, isPrefectKindWorkspaceVariable } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { withProps } from '@/utilities/components'

  const props = defineProps<{
    property: SchemaProperty,
    value: PrefectKindValue,
    errors: SchemaValueError[],
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [PrefectKindValue],
  }>()

  const input = computed(() => {
    if (isPrefectKindJinja(props.value)) {
      return withProps(PCodeInput, {
        lang: 'jinja',
        modelValue: props.value.template,
        'onUpdate:modelValue': template => emit('update:value', {
          __prefect_kind: 'jinja',
          template,
        }),
      })
    }

    if (isPrefectKindJson(props.value)) {
      return withProps(PCodeInput, {
        lang: 'json',
        modelValue: props.value.value,
        'onUpdate:modelValue': value => emit('update:value', {
          __prefect_kind: 'json',
          value,
        }),
      })
    }

    if (isPrefectKindWorkspaceVariable(props.value)) {
      throw 'not implemented'
    }

    if (isPrefectKindNull(props.value)) {
      return withProps(SchemaFormPropertyInput, {
        property: props.property,
        value: props.value.value,
        errors: props.errors,
        state: props.state,
        'onUpdate:value': value => emit('update:value', {
          __prefect_kind: 'none',
          value,
        }),
      })
    }

    const exhaustive: never = props.value
    throw new Error(`getPrefectKindInputComponent missing case for ${exhaustive}`)
  })
</script>