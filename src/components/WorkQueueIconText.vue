<template>
  <template v-if="workQueue && workPool">
    <p-link :to="routes.workPoolQueue(workPool.name, workQueueName)">
      <p-icon-text icon="DatabaseIcon">
        {{ workQueue.name }}
      </p-icon-text>
    </p-link>
  </template>
  <template v-else>
    <p-icon-text icon="DatabaseIcon" title="Unknown work queue">
      {{ workQueueName }}
    </p-icon-text>
  </template>
</template>

<script lang="ts" setup>
  import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    workQueueName: string,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const workQueuesSubscription = useSubscription(api.workQueues.getWorkQueueByName, [props.workQueueName])
  const workQueue = computed(() => workQueuesSubscription.response)

  const workPoolArgs = computed<Parameters<typeof api.workPools.getWorkPools> | null>(() => {
    if (!workQueue.value?.workPoolId) {
      return null
    }

    return [{ 'work_pools': { id: { any_: [workQueue.value.workPoolId] } } }]
  })

  const workPoolsSubscription = useSubscriptionWithDependencies(api.workPools.getWorkPools, workPoolArgs)
  const workPools = computed(() => workPoolsSubscription.response ?? [])
  const workPool = computed(() => workPools.value[0])
</script>