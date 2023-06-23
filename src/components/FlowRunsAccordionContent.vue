<template>
  <FlowRunList :flow-runs="flowRuns" :selected="null" class="flow-flow-runs-list" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunList from '@/components/FlowRunList.vue'
  import { useFlowRuns } from '@/compositions/useFlowRuns'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    flowId: string,
    filter?: FlowRunsFilter,
  }>()

  const filter = computed<FlowRunsFilter>(() => ({
    ...props.filter,
    flows: {
      ...props.filter?.flows,
      id: [props.flowId],
    },
  }))
  const { flowRuns } = useFlowRuns(filter)
</script>