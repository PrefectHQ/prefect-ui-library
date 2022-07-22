<template>
  <div class="work-queue-flow-runs-list">
    <FlowRunList :selected="[]" :flow-runs="flowRuns" disabled />

    <p-empty-results v-if="empty">
      <template v-if="isPaused" #message>
        <p-icon class="work-queue-flow-runs-list__icon" icon="PauseIcon" />
        This work queue is paused and will not submit runs
      </template>
      <template v-else #message>
        No upcoming runs
      </template>
    </p-empty-results>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, watch } from 'vue'
  import FlowRunList from './FlowRunList.vue'
  import { FlowRun, WorkQueue } from '@/models'
  import { workQueuesApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    workQueue: WorkQueue,
  }>()

  const workQueuesApi = inject(workQueuesApiKey)
  const workQueueFlowRunsSubscription = useSubscription(workQueuesApi.getRuns, [props.workQueue.id])
  const flowRuns = computed<FlowRun[]>(() => workQueueFlowRunsSubscription.response ?? [])

  const empty = computed(() => workQueueFlowRunsSubscription.executed && flowRuns.value.length === 0)
  const isPaused = computed(() => props.workQueue.isPaused)

  watch(() => props.workQueue, (val, oldVal) => {
    if (val.isPaused !== oldVal.isPaused) {
      workQueueFlowRunsSubscription.refresh()
    }
  })
</script>

<style>
.work-queue-flow-runs-list__icon {
  @apply h-14 w-14 mx-auto mb-4
}
</style>