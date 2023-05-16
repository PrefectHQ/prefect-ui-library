<template>
  <SchemaFormFieldsWithValues v-model:values="parameters" :schema="deployment.parameterOpenApiSchema" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { SchemaFormFieldsWithValues } from '@/components'
  import { Deployment } from '@/models'
  import { mapper } from '@/services'
  import { SchemaValues } from '@/types/schemas'


  const props = defineProps<{
    deployment: Deployment,
    modelValue: SchemaValues,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SchemaValues): void,
  }>()

  const parameterOpenApiSchema = computed(() => {
    const { rawSchema } = props.deployment

    if (rawSchema && 'required' in rawSchema) {
      rawSchema.required = []
    }

    return mapper.map('SchemaResponse', rawSchema ?? {}, 'Schema')
  })

  const parameters = computed({
    get() {
      const source = { values: props.modelValue, schema: parameterOpenApiSchema.value }
      return mapper.map('SchemaValuesResponse', source, 'SchemaValues')
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })
</script>


