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
  import { RouterLink } from 'vue-router'
  import { flowRunRouteKey } from '@/router/routes'
  import * as flowRunsApi from '@/services/FlowRunsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const flowRoute = inject(flowRunRouteKey)

  const getFlowRun = inject(flowRunsApi.getFlowRunKey, flowRunsApi.getFlowRun)
  const flowRunSubscription =  useSubscription(getFlowRun, [props.flowRunId])
  const flowRunName = computed(() => flowRunSubscription.response?.name)
</script>