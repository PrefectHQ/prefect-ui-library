<template>
  <template v-if="!typeIsPrefectAgent">
    <p-markdown-renderer :text="localization.info.workPoolInfrastructureConfigurationInstructions" class="work-pool-create-wizard-step-infrastructure-configuration__explainer-text" />
    <!-- <WorkPoolBaseJobTemplateFormSection v-model:base-job-template="baseJobTemplate" class="work-pool-create-wizard-step-infrastructure-configuration__base-job-template-form" /> -->
  </template>
  <template v-else>
    <p-markdown-renderer :text="localization.info.workPoolInfrastructureConfigurationAgent" />
  </template>
</template>

<script lang="ts" setup>
  import { computed, reactive } from 'vue'
  import { WorkPoolBaseJobTemplateFormSection } from '@/components'
  import { localization } from '@/localization'
  import { BaseJobTemplate, WorkPoolFormValues } from '@/models'

  const props = defineProps<{
    workPool: WorkPoolFormValues,
    defaultBaseJobTemplate: BaseJobTemplate,
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

  // const baseJobTemplatesMap = reactive(new Map<string, BaseJobTemplate>())
  // const baseJobTemplate = computed<BaseJobTemplate>({
  //   get() {
  //     if (props.workPool.type) {
  //       return baseJobTemplatesMap.get(props.workPool.type) ?? props.defaultBaseJobTemplate
  //     }
  //     return {}
  //   },
  //   set(value) {
  //     if (props.workPool.type) {
  //       baseJobTemplatesMap.set(props.workPool.type, value)
  //       workPool.value.baseJobTemplate = value
  //     }
  //   },
  // })
</script>

<style>
  .work-pool-create-wizard-step-infrastructure-configuration__explainer-text { @apply
    mb-6
  }
</style>