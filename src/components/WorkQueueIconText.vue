<template>
  <template v-if="workQueue">
    <router-link :to="workQueueRoute(workQueue.id)">
      <p-icon-text icon="DatabaseIcon">
        {{ workQueue.name }}
      </p-icon-text>
    </router-link>
  </template>
  <template v-else>
    <p-icon-text icon="DatabaseIcon" title="Unknown work queue">
      {{ workQueueName }}
    </p-icon-text>
  </template>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useWorkspaceApi } from '@/compositions'
  import { workQueueRouteKey } from '@/router/routes'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    workQueueName: string,
  }>()

  const workQueueRoute = inject(workQueueRouteKey)

  const api = useWorkspaceApi()

  const workQueuesSubscription =  useSubscription(api.workQueues.getWorkQueueByName, [props.workQueueName])
  const workQueue = computed(() => workQueuesSubscription.response)
</script>