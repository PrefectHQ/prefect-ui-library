<template>
  <FlowRunList :flow-runs="flowRuns" :selected="null" class="flow-flow-runs-list" />
  <template v-if="more">
    <div class="flow-flow-runs-list__more">
      <p-button size="sm" inset :to="routes.flow(flowId)">
        Show more
      </p-button>
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRunList from '@/components/FlowRunList.vue'
  import { useFlowRuns } from '@/compositions/useFlowRuns'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    flowId: string,
    filter?: FlowRunsFilter,
    flowRunLimit?: number,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const limit = computed(() => props.flowRunLimit ?? 3)

  const filter = computed<FlowRunsFilter>(() => ({
    ...props.filter,
    flows: {
      ...props.filter?.flows,
      id: [props.flowId],
    },
    limit: 3,
  }))
  const { flowRuns } = useFlowRuns(filter)

  const countSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [filter])
  const count = computed(() => countSubscription.response ?? 0)
  const more = computed(() => count.value > limit.value)
</script>

<style>
.flow-flow-runs-list__more { @apply
  flex
  justify-center
}
</style>