<template>
  <template v-if="workPoolQueue">
    <p-link :to="routes.workPoolQueue(workPoolNameRef, workQueueName)">
      <p-icon-text icon="DatabaseIcon">
        {{ workQueueName }}
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
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    workQueueName: string,
    workPoolName?: string,
    workPoolId?: string,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const workPoolArgs = computed<Parameters<typeof api.workPools.getWorkPools> | null>(() => {
    if (!props.workPoolId) {
      return null
    }

    return [{ 'work_pools': { id: { any_: [props.workPoolId] } } }]

  })

  const workPoolsSubscription = useSubscriptionWithDependencies(api.workPools.getWorkPools, workPoolArgs)
  const workPools = computed(() => workPoolsSubscription.response ?? [])
  const workPoolName = computed(() => workPools.value[0].name)

  const workPoolNameRef = computed(() => {
    return props.workPoolName ?? workPoolName.value
  })

  const workPoolQueueArgs = computed<Parameters<typeof api.workPoolQueues.getWorkPoolQueueByName> | null>(() => {
    if (props.workPoolName) {
      return [props.workPoolName, props.workQueueName]
    }

    if (props.workPoolId) {
      return [workPoolName.value, props.workQueueName]
    }

    return null
  })

  const workPoolQueuesSubscription = useSubscriptionWithDependencies(api.workPoolQueues.getWorkPoolQueueByName, workPoolQueueArgs)
  const workPoolQueue = computed(() => workPoolQueuesSubscription.response)
</script>