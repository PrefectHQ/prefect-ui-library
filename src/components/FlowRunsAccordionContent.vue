<template>
  <p-content>
    <FlowRunList :flow-runs="flowRuns" :selected="null" class="flow-flow-runs-list" hide-flow-name hide-details />

    <template v-if="pages > 1">
      <p-pager v-model:page="filter.page" :pages="pages" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import merge from 'lodash.merge'
  import FlowRunList from '@/components/FlowRunList.vue'
  import { useFlowRunsPaginationFilterFromRoute, usePaginatedFlowRuns } from '@/compositions'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    flowId: string,
    filter?: FlowRunsFilter,
  }>()

  const { filter } = useFlowRunsPaginationFilterFromRoute(merge({}, props.filter, {
    flows: {
      ...props.filter?.flows,
      id: [props.flowId],
    },
    limit: 3,
  }))

  const { flowRuns, pages } = usePaginatedFlowRuns(filter)
</script>