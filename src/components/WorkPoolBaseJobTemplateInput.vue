<template>
  <p-content class="work-pool-base-job-template-form-section">
    <p-message info>
      <p-markdown-renderer :text="localization.info.baseJobTemplateJsonMessage(localization.docs.workPools)" />
    </p-message>

    <p-label :label="localization.info.jobConfiguration" :state="jobConfigurationState" :message="jobConfigurationError">
      <JsonInput v-model="internalJobConfigurationString" show-line-numbers class="work-pool-base-job-template-form-section__input" show-format-button />
    </p-label>

    <p-divider />

    <p-label :label="localization.info.variables" :state="variablesState" :message="variablesError">
      <JsonInput v-model="internalVariablesString" show-line-numbers class="work-pool-base-job-template-form-section__input" show-format-button />
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { useValidation } from '@prefecthq/vue-compositions'
  import { isEqual } from 'lodash'
  import { ref, watch } from 'vue'
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
  const { json: internalJobConfigurationString, record: internalJobConfigurationRecord } = useJsonRecord(internalBaseJobTemplate.value.jobConfiguration)
  const { json: internalVariablesString, record: internalVariablesRecord } = useJsonRecord(internalBaseJobTemplate.value.variables)

  const rules = {
    jsonValues: fieldRules(localization.info.json, isRequired, isJson),
  }

  const { error: jobConfigurationError, state: jobConfigurationState } = useValidation(internalJobConfigurationString, localization.info.values, rules.jsonValues)
  const { error: variablesError, state: variablesState } = useValidation(internalVariablesString, localization.info.values, rules.jsonValues)

  watch(internalJobConfigurationRecord, (newVal, oldVal) => {
    if (isEqual(newVal, oldVal)) {
      return
    }

    internalBaseJobTemplate.value.jobConfiguration = newVal
    // emit('update:baseJobTemplate', internalBaseJobTemplate.value)
  }, { deep: true })

  watch(internalVariablesRecord, (newVal, oldVal) => {
    if (isEqual(newVal, oldVal)) {
      return
    }

    internalBaseJobTemplate.value.variables = newVal
    // emit('update:baseJobTemplate', internalBaseJobTemplate.value)
  }, { deep: true })
</script>

<style>
.work-pool-base-job-template-form-section__input { @apply
  resize-y
  min-h-[theme('height.96')]
  h-96
  w-full
}
</style>