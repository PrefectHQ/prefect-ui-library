<template>
  <FlowRunList :flow-runs="flowRuns" :selected="null" class="flow-flow-runs-list" />
  <template v-if="more">
    <div class="flow-flow-runs-list__more">
      <p-button small @click="next">
        Show more
      </p-button>
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunList from '@/components/FlowRunList.vue'
  import { useFlowRuns } from '@/compositions/useFlowRuns'
  import { FlowRunsFilter } from '@/models/Filters'

  const props = defineProps<{
    flowId: string,
    filter?: FlowRunsFilter,
    flowRunLimit?: number,
  }>()

  const limit = computed(() => props.flowRunLimit ?? 3)

  const filter = (): FlowRunsFilter => ({
    ...props.filter,
    flows: {
      ...props.filter?.flows,
      id: [props.flowId],
    },
    limit: 3,
  })

  const { flowRuns, total, next } = useFlowRuns(filter, {
    mode: 'infinite',
  })

  const more = computed(() => total.value > limit.value)

  next()
</script>

<style>
.flow-flow-runs-list__more { @apply
  flex
  justify-center
}
</style>