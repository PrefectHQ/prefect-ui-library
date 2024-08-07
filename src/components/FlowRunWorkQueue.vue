<template>
  <div class="flow-run-work-queue">
    <span>Work Queue</span>
    <WorkQueueIconText :work-queue-name="workQueueName" :work-pool-name="workPoolName" />

    <template v-if="!hideWorkPoolQueueStatus && workPoolName">
      <WorkPoolQueueStatusIcon v-if="workPoolQueue" :work-pool-queue="workPoolQueue" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { WorkQueueIconText } from '@/components'
  import WorkPoolQueueStatusIcon from '@/components/WorkPoolQueueStatusIcon.vue'
  import { useInterval, useWorkspaceApi } from '@/compositions'
  import { isTerminalStateType } from '@/models'

  const props = defineProps<{
    workQueueName: string,
    workPoolName?: string | null,
    flowRunState?: string | null,
  }>()

  const hideWorkPoolQueueStatus = computed(() => props.flowRunState && isTerminalStateType(props.flowRunState))
  const { workPoolName } = toRefs(props)

  const api = useWorkspaceApi()
  const workPoolQueueArgs = computed<[string, string] | null>(() => {
    if (!props.workPoolName) {
      return null
    }
    return [props.workPoolName, props.workQueueName]
  })
  const options = useInterval()

  const workPoolQueuesSubscription = useSubscriptionWithDependencies(api.workPoolQueues.getWorkPoolQueueByName, workPoolQueueArgs, options)
  const workPoolQueue = computed(() => workPoolQueuesSubscription.response)
</script>

<style>
.flow-run-work-queue { @apply
  flex gap-1 items-center
}
</style>