<template>
  <FlowRunList :flow-runs="flowRuns" :selected="null" class="flow-flow-runs-list" />
  <template v-if="more">
    <div class="flow-flow-runs-list__more">
      <p-button size="sm" inset @click="loadMore">
        Show more
      </p-button>
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRunList from '@/components/FlowRunList.vue'
  import { useFlowRunsInfiniteScroll } from '@/compositions/useFlowRunsInfiniteScroll'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    flowId: string,
    filter?: FlowRunsFilter,
    flowRunLimit?: number,
  }>()

  const api = useWorkspaceApi()
  const limit = computed(() => props.flowRunLimit ?? 3)

  const filter = computed<FlowRunsFilter>(() => ({
    ...props.filter,
    flows: {
      ...props.filter?.flows,
      id: [props.flowId],
    },
    limit: 3,
  }))
  const { flowRuns, loadMore } = useFlowRunsInfiniteScroll(filter)

  const countSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [filter])
  const count = computed(() => countSubscription.response ?? 0)
  const more = computed(() => count.value > limit.value)

  loadMore()
</script>

<style>
.flow-flow-runs-list__more { @apply
  flex
  justify-center
}

.flow-flow-runs-list .state-list-item { @apply
  bg-slate-50
  dark:bg-slate-700
  dark:bg-opacity-50
}
</style>