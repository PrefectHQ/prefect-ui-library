<template>
  <div class="work-pool-queue-upcoming-flow-runs-list">
    <FlowRunList :selected="[]" :flow-runs="scheduledFlowRuns" disabled />

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

  const flowRunFilter = computed<Parameters<typeof api.flowRuns.getFlowRuns>>(() => [
    {
      'work_pool_queues': { name: { any_: [workPoolQueue.value.name] } },
      'work_pools': { name: { any_: [workPoolName.value] } },
      'flow_runs': {
        'state': { name: { any_: ['Scheduled'] } },
      },
      sort: 'START_TIME_ASC',
    },
  ],
  )

  const flowRunsSubscription = useSubscription(api.flowRuns.getFlowRuns, flowRunFilter, { interval: 30000 })
  const scheduledFlowRuns = computed(() => flowRunsSubscription.response ?? [])

  const empty = computed(() => flowRunsSubscription.executed && scheduledFlowRuns.value.length === 0)
  const isPaused = computed(() => workPoolQueue.value.isPaused)


  watch(() => workPoolQueue, () => {
    flowRunsSubscription.refresh()
  })
</script>