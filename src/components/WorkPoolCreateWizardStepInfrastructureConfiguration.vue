<template>
  <template v-if="!typeIsPrefectAgent">
    <p class="work-pool-create-wizard-step-infrastructure-configuration__explainer-text">
      Below you can configure the behavior of workers in this work pool when they are executing flow runs. If you need additional configuration options, you can use the editor in the <b>Advanced</b> section to modify the existing configuration options.
    </p>
    <p class="work-pool-create-wizard-step-infrastructure-configuration__explainer-text">
      If you don't need to make any changes to the default behavior, hit <b>Create</b> to create your work pool!
    </p>
    <WorkPoolBaseJobTemplateFormSection v-model:base-job-template="baseJobTemplate" class="work-pool-create-wizard-step-infrastructure-configuration__base-job-template-form" />
  </template>
  <template v-else>
    <p class="work-pool-create-wizard-step-infrastructure-configuration__explainer-text">
      Prefect Agents handle infrastructure configuration via infrastructure blocks attached to deployments. You can hit <b>Create</b> to create this work pool and then head over to the <b>Blocks</b> tab to create an infrastructure block for your deployments.
    </p>
    <p class="work-pool-create-wizard-step-infrastructure-configuration__explainer-text">
      To learn more about how to configure infrastructure for Prefect Agents, check out
      <p-link :to="localization.docs.infrastructure">
        the docs
      </p-link>.
    </p>
  </template>
</template>

<script lang="ts" setup>
  import { computed, reactive } from 'vue'
  import { WorkPoolBaseJobTemplateFormSection } from '@/components'
  import { useWorkspaceRoutes } from '@/compositions'
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
    mb-2
  }

  .work-pool-create-wizard-step-infrastructure-configuration__base-job-template-form { @apply
    mt-4
  }
</style>