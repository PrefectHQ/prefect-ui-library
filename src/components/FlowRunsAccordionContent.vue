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
  import { computed } from 'vue'
  import FlowRunList from '@/components/FlowRunList.vue'
  import { useFlowRunsCount } from '@/compositions/useFlowRunsCount'
  import { useFlowRunsInfiniteScroll } from '@/compositions/useFlowRunsInfiniteScroll'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    flowId: string,
    filter?: FlowRunsFilter,
    flowRunLimit?: number,
  }>()

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

  const { count } = useFlowRunsCount(filter)
  const more = computed(() => count.value && count.value > limit.value)

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