<template>
  <SchemaFormFields property="parameters" :schema="deployment.parameterOpenApiSchema" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { SchemaFormFields } from '@/components'
  import { Deployment } from '@/models'
  import { mapper } from '@/services'


  const props = defineProps<{
    deployment: Deployment,
  }>()

  const parameterOpenApiSchema = computed(() => {
    const { rawSchema } = props.deployment

    if (rawSchema && 'required' in rawSchema) {
      rawSchema.required = []
    }

    return mapper.map('SchemaResponse', rawSchema ?? {}, 'Schema')
  })

  const parameters = computed(() => {
    const source = { values: props.deployment.parameters, schema: parameterOpenApiSchema.value }
    return mapper.map('SchemaValuesResponse', source, 'SchemaValues')
  })
</script>