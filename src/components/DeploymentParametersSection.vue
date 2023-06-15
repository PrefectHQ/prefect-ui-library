<template>
  <p-content class="deployment-parameters-section">
    <h3 class="deployment-parameters-section__section-header">
      Parameters
    </h3>

    <template v-if="hasParameters">
      <p-button-group v-model="parametersInput" :options="parametersInputOptions" size="sm" />

      <template v-if="parametersInput === 'form'">
        <DeploymentParameters v-model="parameters" :deployment="deployment" />
      </template>

      <template v-else>
        <p-label :state="jsonParametersState" :message="jsonParametersErrorMessage">
          <p-code-input v-model="jsonParameters" lang="json" :min-lines="3" show-line-numbers />
        </p-label>
      </template>
    </template>

    <template v-else>
      <em>This deployment's flow has no parameters</em>
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { useValidation } from '@prefecthq/vue-compositions'
  import { merge } from 'lodash'
  import { computed, ref } from 'vue'
  import { DeploymentParameters } from '@/components'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { getSchemaDefaultValues, mapper } from '@/services'
  import { SchemaValues } from '@/types/schemas'
  import { isJson, fieldRules, stringifyUnknownJson, parseUnknownJson, isRecord } from '@/utilities'

  const props = defineProps<{
    modelValue: SchemaValues,
    deployment: Deployment,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SchemaValues): void,
  }>()

  const parametersInputOptions = [{ value: 'form', label: 'Form' }, { value: 'json', label: 'JSON' }]
  const parametersInput = ref<'form' | 'json'>('form')

  const hasParameters = computed(() => {
    return Object.keys(props.deployment.parameterOpenApiSchema.properties ?? {}).length > 0
  })

  const rules = {
    jsonParameters: fieldRules('Parameters', isJson),
  }

  const parameters = computed({
    get() {
      return props.modelValue
    },
    set(value: SchemaValues) {
      validateAndEmit(value)
    },
  })

  const parameterOpenApiSchema = computed(() => {
    const { rawSchema } = props.deployment

    if (rawSchema && 'required' in rawSchema) {
      rawSchema.required = []
    }

    return mapper.map('SchemaResponse', rawSchema ?? {}, 'Schema')
  })
  const jsonParameters = ref(stringifyUnknownJson(merge(getSchemaDefaultValues(parameterOpenApiSchema.value), props.deployment.rawParameters)))
  const { error: jsonParametersErrorMessage, state: jsonParametersState, validate: validateJsonParameters } = useValidation(jsonParameters, localization.info.parameters, rules.jsonParameters)

  const validateAndEmit = async (value: SchemaValues): Promise<void> => {
    if (parametersInput.value == 'json') {
      const valid = await validateJsonParameters()

      if (!valid) {
        return
      }

      const parsed = parseUnknownJson(jsonParameters)
      if (isRecord(parsed)) {
        emit('update:modelValue', parsed)
      }
    } else {
      emit('update:modelValue', value)
    }
  }
</script>

<style>
.deployment-parameters-section {
  @apply
  border
  dark:border-background-600
  px-6
  py-6
  rounded-lg
}

.deployment-parameters-section__section-header {
  @apply
  text-lg
  font-semibold
}
</style>