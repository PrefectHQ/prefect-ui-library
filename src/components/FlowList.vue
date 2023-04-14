<template>
  <div class="flow-list">
    <p-layout-table sticky>
      <template #header-start>
        <div class="flow-list__header-start">
          <ResultsCount v-if="selected.length == 0" label="Flow" :count="flowsCount" />
          <SelectedCount v-else :count="selected.length" />

          <FlowsDeleteButton v-if="can.delete.flow" :selected="selected" @delete="deleteFlows" />
        </div>
      </template>

      <template #header-end>
        <div class="flow-list__header-end">
          <SearchInput v-model="flowNameLike" placeholder="Search flows" label="Search flows" />
          <p-select v-model="filter.sort" :options="flowSortOptions" />
          <p-tags-input v-model="filter.flowRuns.tags.name" empty-message="Flow run tags" class="flow-list__tags" />
        </div>
      </template>

      <p-virtual-scroller :items="flows">
        <template #default="{ item }">
          <FlowListItem v-model:selected="selected" :flow="item" />
        </template>
      </p-virtual-scroller>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { useDebouncedRef, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { FlowsDeleteButton, ResultsCount, SearchInput, SelectedCount } from '@/components'
  import { useCan, useFlowsFilterFromRoute, useWorkspaceApi } from '@/compositions'
  import { FlowsFilter } from '@/models/Filters'
  import { flowSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    filter?: FlowsFilter,
  }>()

  // TODO: put this in the flow list item component
  // const { FlowMenu } = useComponent()

  const api = useWorkspaceApi()
  const can = useCan()
  const flowNameLike = ref<string>()
  const flowNameLikeDebounced = useDebouncedRef(flowNameLike, 1200)
  const { filter, clear, isCustomFilter } = useFlowsFilterFromRoute({
    ...props.filter,
    flows: {
      ...props.filter,
      nameLike: flowNameLikeDebounced,
    },
  })

  const selected = ref<string[]>([])

  const flowsSubscription = useSubscription(api.flows.getFlows, [filter])
  const flows = computed(() => flowsSubscription.response ?? [])

  const flowsCountSubscription = useSubscription(api.flows.getFlowsCount, [filter])
  const flowsCount = computed(() => flowsCountSubscription.response)

  function refresh(): void {
    flowsSubscription.refresh()
    flowsCountSubscription.refresh()
  }

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const deleteFlows = (): void => {
    selected.value = []
    refresh()
    emit('delete')
  }
</script>

<style>
.flow-list__header-start { @apply
  grow
  whitespace-nowrap
}

.flow-list__header-end { @apply
  flex
  flex-wrap
  pl-2
  ml-auto
  shrink
  gap-2
}
</style>
