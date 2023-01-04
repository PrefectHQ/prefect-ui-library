<template>
  <div class="work-pool-queue-upcoming-flow-runs-list">
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
  import { FlowRunList } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkPoolQueue } from '@/models'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueue: WorkPoolQueue,
  }>()

  const api = useWorkspaceApi()

  const { workPoolName, workPoolQueue } = toRefs(props)

  const workPoolScheduledRunsSubscription = useSubscription(api.workPools.getWorkPoolScheduledRuns, [workPoolName.value, { workPoolQueueNames: [workPoolQueue.value.name] }], { interval: 10000 })
  const workPoolScheduledRuns = computed(() => workPoolScheduledRunsSubscription.response ?? [])

  const empty = computed(() => workPoolScheduledRunsSubscription.executed && workPoolScheduledRuns.value.length === 0)
  const isPaused = computed(() => workPoolQueue.value.isPaused)

  const filteredFlowRuns = computed(() => workPoolScheduledRuns.value.filter(run => run.flowRun.stateName !== 'Late').map(run => run.flowRun))

  watch(() => workPoolQueue, () => {
    workPoolScheduledRunsSubscription.refresh()
  })
</script>