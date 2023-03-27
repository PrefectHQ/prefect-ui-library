<template>
  <p-link :to="routes.flowRun(flowRunId)" class="flow-run-icon-text">
    <p-icon-text icon="FlowRun">
      <span>{{ flowRunName }}</span>
    </p-icon-text>
  </p-link>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from 'vue'
  import { useFlowRun, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const routes = useWorkspaceRoutes()
  const { flowRunId } = toRefs(props)
  const { flowRun } = useFlowRun(flowRunId)
  const flowRunName = computed(() => flowRun.value?.name)
</script>