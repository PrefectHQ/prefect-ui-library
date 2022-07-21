<template>
  <div class="work-queue-flow-runs-list">
    <FlowRunList :selected="[]" :flow-runs="flowRuns" disabled />

    <p-empty-results v-if="empty">
      <template v-if="isPaused" #message>
        This work queue is paused and so has no runs to submit!
      </template>
      <template v-else #message>
        No upcoming runs
      </template>
    </p-empty-results>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
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
</script>
