<template>
  <router-link :to="flowRoute(flowRunId)" class="flow-fun-icon-text">
    <p-icon-text icon="FlowRun">
      <span>{{ flowRunName }}</span>
    </p-icon-text>
  </router-link>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { flowRunRouteKey } from '@/router/routes'
  import { flowRunsApiKey } from '@/services/FlowRunsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const flowRoute = inject(flowRunRouteKey)

  const flowRunsApi = inject(flowRunsApiKey)
  const flowRunSubscription =  useSubscription(flowRunsApi.getFlowRun, [props.flowRunId])
  const flowRunName = computed(() => flowRunSubscription.response?.name)
</script>