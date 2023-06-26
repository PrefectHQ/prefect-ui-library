<template>
  <SchemaFormFields :schema="schema" class="schema-form-fields" />
</template>

<script lang="ts" setup>
  /**
   * @deprecated use [SchemaInput](https://github.com/PrefectHQ/prefect-ui-library/tree/main/src/components/SchemaInput.vue) instead
   */
  import { useValidation } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import SchemaFormFields from '@/components/SchemaFormFields.vue'
  import { useReactiveForm } from '@/compositions'
  import { getSchemaDefaultValues, mapper } from '@/services'
  import { Schema, SchemaValues } from '@/types'

  const props = defineProps<{
    schema: Schema,
    values: SchemaValues | null | undefined,
  }>(
  )
  const emit = defineEmits<{
    (event: 'update:values', value: SchemaValues): void,
  }>()

  const values = computed({
    get() {
      if (!props.values) {
        return getSchemaDefaultValues(props.schema)
      }

      return mapper.map('SchemaValuesResponse', { values: props.values, schema: props.schema }, 'SchemaValues')
    },
    set(values) {
      emit('update:values', mapper.map('SchemaValues', { values, schema: props.schema }, 'SchemaValuesRequest'))
    },
  })

  const { validate, errors } = useReactiveForm(values, {
    initialValues: values.value,
  })

  useValidation(values, 'Parameters', async () => {
    await validate()

    return Object.entries(errors.value).length === 0
  })
</script>