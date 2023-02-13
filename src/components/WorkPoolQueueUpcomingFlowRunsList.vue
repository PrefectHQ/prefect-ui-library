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
  import { FlowRunsFilter, WorkPoolQueue } from '@/models'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueue: WorkPoolQueue,
  }>()

  const api = useWorkspaceApi()

  const { workPoolQueue } = toRefs(props)

  const filter = computed<FlowRunsFilter>(() => ({
    flowRuns: {
      state: {
        name: ['Scheduled'],
      },
    },
    workPools: {
      name: [props.workPoolName],
    },
    workPoolQueues: {
      name: [props.workPoolQueue.name],
    },
  }))

  const flowRunsSubscription = useSubscription(api.flowRuns.getFlowRuns, [filter], { interval: 30000 })
  const scheduledFlowRuns = computed(() => flowRunsSubscription.response ?? [])

  const empty = computed(() => flowRunsSubscription.executed && scheduledFlowRuns.value.length === 0)
  const isPaused = computed(() => workPoolQueue.value.isPaused)


  watch(() => workPoolQueue, () => {
    flowRunsSubscription.refresh()
  })
</script>