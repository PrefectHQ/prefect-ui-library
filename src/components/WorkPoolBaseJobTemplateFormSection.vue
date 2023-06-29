<template>
  <p-content class="work-pool-base-job-template-form-section">
    <p-label :label="localization.info.jobConfiguration">
      <JsonInput v-model="internalJobConfigurationString" show-format-button />
    </p-label>

    <p-divider />

    <p-label :label="localization.info.variables">
      <JsonInput v-model="internalVariablesString" show-format-button />
    </p-label>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed, watchEffect } from 'vue'
  import { JsonInput } from '@/components'
  import { useJsonRecord } from '@/compositions'
  import { localization } from '@/localization'
  import { BaseJobTemplate } from '@/models'


  const props = defineProps<{
    baseJobTemplate: BaseJobTemplate,
  }>()

  const emit = defineEmits<{
    (event: 'update:baseJobTemplate', value: BaseJobTemplate): void,
  }>()

  const internalBaseJobTemplate = computed<BaseJobTemplate>({
    get() {
      return props.baseJobTemplate
    },
    set(value) {
      console.log(value)
      // emit('update:baseJobTemplate', value)
    },
  })

  const { json: internalJobConfigurationString, record: internalJobConfigurationRecord } = useJsonRecord()
  const { json: internalVariablesString, record: internalVariablesRecord } = useJsonRecord()

  watchEffect(() => {
    internalBaseJobTemplate.value.jobConfiguration = internalJobConfigurationRecord.value
    internalBaseJobTemplate.value.variables = internalVariablesRecord.value
  })
</script>