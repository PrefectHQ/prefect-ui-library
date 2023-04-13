<template>
  <header v-if="flowRun" class="page-heading-flow-run">
    <FlowRunListItem class="page-heading-flow-run__list-item" :flow-run="flowRun" flat :selected="null" />
    <div class="page-heading-flow-run__actions">
      <template v-if="media.sm">
        <FlowRunPauseButton :flow-run="flowRun" />
        <FlowRunResumeButton :flow-run="flowRun" />
        <FlowRunRetryButton :flow-run="flowRun" />
        <FlowRunCancelButton :flow-run="flowRun" />
      </template>
      <FlowRunMenu :flow-run-id="flowRun.id" :show-all="!media.sm" @delete="emit('delete')" />
    </div>
  </header>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import {
    FlowRunListItem,
    FlowRunRetryButton,
    FlowRunResumeButton,
    FlowRunCancelButton,
    FlowRunPauseButton,
    FlowRunMenu
  } from '@/components'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const api = useWorkspaceApi()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const flowRunId = computed(() => props.flowRunId)
  const flowRunSubscription = useSubscription(api.flowRuns.getFlowRun, [flowRunId], { interval: 30000 })
  const flowRun = computed(() => flowRunSubscription.response)
</script>

<style>
.page-heading-flow-run { @apply
  flex
  gap-2
  flex-col-reverse
  md:flex-row
}

.page-heading-flow-run__list-item { @apply
  flex-grow
}

.page-heading-flow-run__actions { @apply
  flex
  flex-wrap
  items-center
  gap-2
  justify-end
}
</style>
