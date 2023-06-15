<template>
  <div class="deployment-parameters-section">
    <template v-if="parameters && hasParametersInSchema">
      <template v-if="inputType === 'form'">
        <DeploymentParameters v-model="parameters" :deployment="deployment" />
      </template>

      <template v-else-if="inputType === 'json'">
        <p-label :state="jsonParametersState" :message="jsonParametersErrorMessage">
          <p-code-input v-model="jsonParameters" lang="json" :min-lines="3" show-line-numbers />
        </p-label>
      </template>
    </template>

    <template v-else>
      <em>{{ localization.info.deploymentFlowHasNoParameters }}</em>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useValidation } from '@prefecthq/vue-compositions'
  import { merge } from 'lodash'
  import { computed, ref } from 'vue'
  import { DeploymentParameters } from '@/components'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'
  import { getSchemaDefaultValues, mapper } from '@/services'
  import { DeploymentParametersSectionInputType } from '@/types/deploymentParametersSection'
  import { SchemaValues } from '@/types/schemas'
  import { isJson, fieldRules, stringifyUnknownJson, parseUnknownJson, isRecord } from '@/utilities'

  const props = defineProps<{
    modelValue: SchemaValues | null | undefined,
    deployment: Deployment,
    inputType: DeploymentParametersSectionInputType,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SchemaValues | null | undefined): void,
  }>()

  const hasParametersInSchema = computed(() => {
    return Object.keys(props.deployment.parameterOpenApiSchema.properties ?? {}).length > 0
  })

  const rules = {
    jsonParameters: fieldRules('Parameters', isJson),
  }

  const parameters = computed({
    get() {
      return props.modelValue
    },
    set(value: SchemaValues | null | undefined) {
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

  const validateAndEmit = async (value: SchemaValues | null | undefined): Promise<void> => {
    if (props.inputType == 'json') {
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