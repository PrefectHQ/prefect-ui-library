<template>
  <p-button-group v-model="parametersInput" :options="parametersInputOptions" size="sm" />
  <template v-if="parametersInput === 'form'">
    <SchemaFormFieldsWithValues v-model:values="parameters" :schema="deployment.parameterOpenApiSchema" />
  </template>

  <template v-else>
    <p-label :state="jsonParametersState" :message="jsonParametersErrorMessage">
      <p-code-input v-model="jsonParameters" lang="json" :min-lines="3" show-line-numbers />
    </p-label>
  </template>
</template>

<script setup lang="ts">
  import { useValidation } from '@prefecthq/vue-compositions'
  import { merge } from 'lodash'
  import { computed, ref } from 'vue'
  import { SchemaFormFieldsWithValues } from '@/components'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { mapper, getSchemaDefaultValues } from '@/services'
  import { SchemaValues } from '@/types/schemas'
  import { stringifyUnknownJson, fieldRules, isJson, parseUnknownJson, isRecord } from '@/utilities'


  const props = defineProps<{
    deployment: Deployment,
    modelValue: SchemaValues,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: SchemaValues): void,
  }>()

  const parametersInputOptions = [{ value: 'form', label: 'Form' }, { value: 'json', label: 'JSON' }]
  const parametersInput = ref<'form' | 'json'>('form')

  const parameterOpenApiSchema = computed(() => {
    const { rawSchema } = props.deployment

    if (rawSchema && 'required' in rawSchema) {
      rawSchema.required = []
    }

    return mapper.map('SchemaResponse', rawSchema ?? {}, 'Schema')
  })
  const rules = {
    infrastructureOverrides: fieldRules('Infrastructure overrides', isJson),
    jsonParameters: fieldRules('Parameters', isJson),
  }
  const jsonParameters = ref(stringifyUnknownJson(merge(getSchemaDefaultValues(parameterOpenApiSchema.value), props.deployment.rawParameters)))
  const { error: jsonParametersErrorMessage, state: jsonParametersState, validate: validateJsonParameters } = useValidation(jsonParameters, localization.info.parameters, rules.jsonParameters)

  const parameters = computed({
    get() {
      const source = { values: props.modelValue, schema: parameterOpenApiSchema.value }
      return mapper.map('SchemaValuesResponse', source, 'SchemaValues')
    },
    async set(value) {
      if (parametersInput.value === 'form') {
        emits('update:modelValue', value)
      } else {
        const valid = await validateJsonParameters()
        if (!valid) {
          return
        }
        const parsed = parseUnknownJson(value)
        if (isRecord(parsed)) {
          emits('update:modelValue', parsed)
        } else {
          emits('update:modelValue', value)
        }
      }
    },
  })
</script>