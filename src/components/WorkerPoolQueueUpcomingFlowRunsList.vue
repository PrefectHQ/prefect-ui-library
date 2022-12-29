<template>
  <div class="worker-pool-queue-upcoming-flow-runs-list">
    <FlowRunList :selected="[]" :flow-runs="filteredFlowRuns" disabled />

    <p-empty-results v-if="empty">
      <template v-if="isPaused" #message>
        <p-icon class="work-queue-flow-runs-list__icon" icon="PauseIcon" />
        This worker pool queue is paused and will not submit runs
      </template>
      <template v-else #message>
        No upcoming runs
      </template>
    </p-empty-results>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, toRefs, watch } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkerPoolQueue } from '@/models'

  const props = defineProps<{
    workerPoolName: string,
    workerPoolQueue: WorkerPoolQueue,
  }>()

  const api = useWorkspaceApi()

  const { workerPoolName } = toRefs(props)
  const { workerPoolQueue } = toRefs(props)

  const workerPoolScheduledRunsSubscription = useSubscription(api.workerPools.getWorkerPoolScheduledRuns, [workerPoolName.value, { workerPoolQueueNames: [workerPoolQueue.value.name] }], { interval: 30000 })
  const workerPoolScheduledRuns = computed(() => workerPoolScheduledRunsSubscription.response ?? [])

  const empty = computed(() => workerPoolScheduledRunsSubscription.executed && workerPoolScheduledRuns.value.length === 0)
  const isPaused = computed(() => workerPoolQueue.value.isPaused)

  const filteredFlowRuns = computed(() => workerPoolScheduledRuns.value.filter(run => run.flowRun.stateName !== 'Late'))

  watch(() => workerPoolQueue, () => {
    workerPoolScheduledRunsSubscription.refresh()
  })
</script>