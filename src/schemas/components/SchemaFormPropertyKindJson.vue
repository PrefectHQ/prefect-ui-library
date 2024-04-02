<template>
  <p-content secondary class="schema-form-property-kind-json">
    <p-code-input v-model="value" lang="json" :state="state" show-line-numbers />
    <SchemaFormPropertyErrors :errors="childErrors" />
  </p-content>
</template>

<script lang="ts" setup>
  import { State, isDefined } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyErrors from '@/schemas/components/SchemaFormPropertyErrors.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { PrefectKindJson } from '@/schemas/types/schemaValues'
  import { SchemaValueError } from '@/schemas/types/schemaValuesValidationResponse'
  import { getAllChildSchemaPropertyErrors } from '@/schemas/utilities/errors'
  import { getSchemaPropertyDefaultValue } from '@/schemas/utilities/properties'
  import { stringify } from '@/utilities/json'

  const props = defineProps<{
    property: SchemaProperty,
    value: PrefectKindJson,
    errors: SchemaValueError[],
    state: State,
  }>()

  const emit = defineEmits<{
    'update:value': [PrefectKindJson],
  }>()

  const { property } = useSchemaProperty(() => props.property)
  const defaultValue = getSchemaPropertyDefaultValue(property.value)
  const childErrors = computed(() => getAllChildSchemaPropertyErrors(props.errors))

  const value = computed({
    get() {
      return props.value.value
    },
    set(value) {
      if (value?.length === 0) {
        emit('update:value', {
          __prefect_kind: 'json',
          value: undefined,
        })
        return
      }

      emit('update:value', {
        __prefect_kind: 'json',
        value,
      })
    },
  })

  if (!isDefined(value.value) && isDefined(defaultValue)) {
    value.value = stringify(defaultValue)
  }
</script>