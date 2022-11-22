<template>
  <p-link :to="routes.flowRun(flowRunId)" class="flow-run-icon-text">
    <p-icon-text icon="FlowRun">
      <span>{{ flowRunName }}</span>
    </p-icon-text>
  </p-link>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useWorkspaceRoutes } from '@/router'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const flowRunSubscription =  useSubscription(api.flowRuns.getFlowRun, [props.flowRunId])
  const flowRunName = computed(() => flowRunSubscription.response?.name)
</script>