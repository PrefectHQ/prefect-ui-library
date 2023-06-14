<template>
  <p-accordion :sections="flowIds" class="flow-runs-accordion">
    <template #header="{ section: flowId }">
      {{ flowId }}
    </template>
  </p-accordion>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useFlows } from '@/compositions/useFlows'
  import { FlowRunsFilter, FlowsFilter } from '@/models/Filters'

  const props = defineProps<{
    filter: FlowRunsFilter,
  }>()

  const flowsFilter = computed<FlowsFilter>(() => {
    // eslint-disable-next-line no-unused-vars
    const { sort, limit, offset, ...filter } = props.filter

    return filter
  })

  const { flows } = useFlows(flowsFilter)
  const flowIds = computed(() => flows.value?.map(flow => flow.id))
</script>

<style>

</style>