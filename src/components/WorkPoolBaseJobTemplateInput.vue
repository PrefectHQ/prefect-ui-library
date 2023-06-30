<template>
  <p-content class="work-pool-base-job-template-form-section">
    <p-message info>
      {{ localization.info.baseJobTemplateJsonMessage(localization.docs.workPools) }}
    </p-message>

    <p-label :label="localization.info.jobConfiguration" :state="jobConfigurationState" :message="jobConfigurationError">
      <JsonInput v-model="internalJobConfigurationString" class="work-pool-base-job-template-form-section__input" show-format-button />
    </p-label>

    <p-divider />

    <p-label :label="localization.info.variables" :state="variablesState" :message="variablesError">
      <JsonInput v-model="internalVariablesString" class="work-pool-base-job-template-form-section__input" show-format-button />
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { useValidation } from '@prefecthq/vue-compositions'
  import { computed, ref, watchEffect } from 'vue'
  import { JsonInput } from '@/components'
  import { useJsonRecord } from '@/compositions'
  import { localization } from '@/localization'
  import { BaseJobTemplate } from '@/models'
  import { isJson, fieldRules, isRequired } from '@/utilities'

  const props = defineProps<{
    baseJobTemplate: BaseJobTemplate,
  }>()

  const emit = defineEmits<{
    (event: 'update:baseJobTemplate', value: BaseJobTemplate): void,
  }>()

  const internalBaseJobTemplate = ref<BaseJobTemplate>(props.baseJobTemplate)
  const baseJobTemplate = computed({
    get() {
      return internalBaseJobTemplate.value
    },
    set(value) {
      internalBaseJobTemplate.value.jobConfiguration = value.jobConfiguration
      internalBaseJobTemplate.value.variables = value.variables
      emit('update:baseJobTemplate', internalBaseJobTemplate.value)
    },
  })
  const { json: internalJobConfigurationString, record: internalJobConfigurationRecord } = useJsonRecord(baseJobTemplate.value.jobConfiguration)
  const { json: internalVariablesString, record: internalVariablesRecord } = useJsonRecord(baseJobTemplate.value.variables)

  const rules = {
    jsonValues: fieldRules(localization.info.json, isRequired, isJson),
  }

  const { error: jobConfigurationError, state: jobConfigurationState } = useValidation(internalJobConfigurationString, localization.info.values, rules.jsonValues)
  const { error: variablesError, state: variablesState } = useValidation(internalVariablesString, localization.info.values, rules.jsonValues)

  watchEffect(() => {
    baseJobTemplate.value = new BaseJobTemplate({
      jobConfiguration: internalJobConfigurationRecord.value,
      variables: internalVariablesRecord.value,
    })
  })
</script>

<style>
.work-pool-base-job-template-form-section__input { @apply
  resize-y
  min-h-[theme('height.96')]
  h-96
  w-full
}
</style>