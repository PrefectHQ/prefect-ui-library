<template>
  <p-label v-if="can.access.flowRunInfraOverrides" :message="jobVariablesError" :state="jobVariablesState">
    <template #label>
      <span class="flow-run-job-variable-overrides-labeled-input__label">
        Job Variables (Optional)
        <ExtraInfoTooltip description="what">
          To use flow run job variables, make sure your workers are using
          <p-code inline>
            prefect>=2.16.4
          </p-code>.
        </ExtraInfoTooltip>
      </span>
    </template>

    <JobVariableOverridesInput v-model="modelValue" :state="jobVariablesState" />
  </p-label>
</template>

<script setup lang="ts">
  import { useValidation } from '@prefecthq/vue-compositions'
  import { isJson } from '..'
  import ExtraInfoTooltip from '@/components/ExtraInfoTooltip.vue'
  import JobVariableOverridesInput from '@/components/JobVariableOverridesInput.vue'
  import { useCan } from '@/compositions/useCan'

  /** A JSON string */
  const modelValue = defineModel<string>()

  const { state: jobVariablesState, error: jobVariablesError } = useValidation(modelValue, isJson('Job variables'))

  const can = useCan()
</script>

<style>
.flow-run-job-variable-overrides-labeled-input__label { @apply
  flex
  gap-x-1
}
</style>