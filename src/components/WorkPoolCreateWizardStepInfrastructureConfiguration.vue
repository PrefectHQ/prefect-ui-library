<template>
  <template v-if="!typeIsPrefectAgent">
    <p-markdown-renderer :text="localization.info.workPoolInfrastructureConfigurationInstructions" class="work-pool-create-wizard-step-infrastructure-configuration__explainer-text" />
    <WorkPoolBaseJobTemplateFormSection v-model:base-job-template="baseJobTemplate" class="work-pool-create-wizard-step-infrastructure-configuration__base-job-template-form" />
  </template>
  <template v-else>
    <p-markdown-renderer :text="localization.info.workPoolInfrastructureConfigurationAgent" />
  </template>
</template>

<script lang="ts" setup>
  import { useWizardStep } from '@prefecthq/prefect-design'
  import { useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed, reactive } from 'vue'
  import { WorkPoolBaseJobTemplateFormSection } from '@/components'
  import { localization } from '@/localization'
  import { WorkPoolFormValues } from '@/models/WorkPool'
  import { WorkerBaseJobTemplate } from '@/types'


  const props = defineProps<{
    workPool: WorkPoolFormValues,
    defaultBaseJobTemplate: WorkerBaseJobTemplate,
  }>()

  const typeIsPrefectAgent = computed(() => props.workPool.type === 'prefect-agent')

  const emit = defineEmits<{
    (event: 'update:workPool', value: WorkPoolFormValues): void,
  }>()

  const workPool = computed({
    get() {
      return props.workPool
    },
    set(value) {
      emit('update:workPool', value)
    },
  })

  const { validate } = useValidationObserver()
  const { defineValidate } = useWizardStep()
  defineValidate(validate)

  const baseJobTemplatesMap = reactive(new Map<string, WorkerBaseJobTemplate>())
  const baseJobTemplate = computed<WorkerBaseJobTemplate>({
    get() {
      if (props.workPool.type) {
        return baseJobTemplatesMap.get(props.workPool.type) ?? props.defaultBaseJobTemplate
      }
      return {}
    },
    set(value) {
      if (props.workPool.type) {
        baseJobTemplatesMap.set(props.workPool.type, value)
        workPool.value.baseJobTemplate = value
      }
    },
  })
</script>

<style>
  .work-pool-create-wizard-step-infrastructure-configuration__explainer-text { @apply
    mb-6
  }
</style>