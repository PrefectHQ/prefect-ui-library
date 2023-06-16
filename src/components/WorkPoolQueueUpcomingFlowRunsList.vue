<template>
  <div class="work-pool-queue-upcoming-flow-runs-list">
    <FlowRunList :flow-runs="flowRuns" />

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
  import { computed, toRefs, watch } from 'vue'
  import { FlowRunList } from '@/components'
  import { useFlowRuns } from '@/compositions'
  import { FlowRunsFilter, WorkPoolQueue } from '@/models'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueue: WorkPoolQueue,
  }>()

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

  const { flowRuns, subscription } = useFlowRuns(filter)

  const empty = computed(() => subscription.executed && flowRuns.value.length === 0)
  const isPaused = computed(() => workPoolQueue.value.isPaused)

  // pretty sure this isn't needed but I haven't tested for sure
  // the subscription should refresh automatically because if the workPoolQueue
  // updates the filter will update which creates a new subscription
  watch(() => workPoolQueue, () => {
    subscription.refresh()
  })
</script>