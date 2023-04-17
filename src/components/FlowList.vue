<template>
  <div class="flow-list">
    <p-layout-table sticky>
      <template #header-start>
        <div class="flow-list__header-start">
          <ResultsCount v-if="selected.length == 0" :label="localization.info.flow" :count="flowsCount" />
          <SelectedCount v-else :count="selected.length" />
          <FlowsDeleteButton v-if="can.delete.flow" :selected="selected" @delete="deleteFlows" />
        </div>
      </template>

      <template #header-end>
        <div class="flow-list__header-end">
          <SearchInput v-model="search" :placeholder="localization.info.searchByFlowName" :label="localization.info.searchByFlowName" />
          <p-select v-model="filter.sort" :options="flowSortOptions" />
          <p-tags-input v-model="filter.flowRuns.tags.name" :placeholder="localization.info.addTagPlaceholder" class="flow-list__flow-run-tags">
            <template #empty-message>
              <span class="flow-list__flow-run-tags--empty">{{ localization.info.filterByFlowRunTags }}</span>
            </template>
          </p-tags-input>
        </div>
      </template>

      <p-virtual-scroller
        :items="flows"
        :chunk-size="20"
        :item-estimate-height="135"
        item-key="id"
      >
        <template #default="{ item }">
          <FlowListItem v-model:selected="selected" :flow="item" :filter="baseFilter" @delete="handleDelete" />
        </template>
      </p-virtual-scroller>

      <template v-if="flows.length && pages > 1" #footer-end>
        <p-pager v-model:page="page" :pages="pages" />
      </template>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { useDebouncedRef, useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { FlowListItem, FlowsDeleteButton, ResultsCount, SearchInput, SelectedCount } from '@/components'
  import { useCan, useFlowsFilterFromRoute, useWorkspaceApi } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowsFilter } from '@/models/Filters'
  import { flowSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    filter?: FlowsFilter,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const DEFAULT_LIMIT = 40

  const api = useWorkspaceApi()
  const can = useCan()
  const search = ref<string>('')
  const searchDebounced = useDebouncedRef(search, 1200)

  const page = ref(1)
  const offset = computed({
    get: () => (page.value - 1) * DEFAULT_LIMIT,
    set: (value: number) => {
      page.value = Math.ceil(value / DEFAULT_LIMIT) + 1
    },
  })
  const pages = computed(() => Math.ceil((flowsCount.value ?? DEFAULT_LIMIT) / DEFAULT_LIMIT))

  const baseFilter = computed(() => {
    return {
      ...props.filter,
    }
  })

  const { filter } = useFlowsFilterFromRoute({
    ...baseFilter.value,
    flows: {
      ...baseFilter.value.flows,
      nameLike: searchDebounced,
    },
    offset,
    limit: DEFAULT_LIMIT,
  })

  const selected = ref<string[]>([])

  const flowsSubscription = useSubscription(api.flows.getFlows, [filter])
  const flows = computed(() => flowsSubscription.response ?? [])

  const flowsCountSubscription = useSubscription(api.flows.getFlowsCount, [baseFilter])
  const flowsCount = computed(() => flowsCountSubscription.response)

  function refresh(): void {
    flowsSubscription.refresh()
    flowsCountSubscription.refresh()
  }

  const handleDelete = (): void => {
    refresh()
    emit('delete')
  }

  const deleteFlows = (): void => {
    selected.value = []
    refresh()
    emit('delete')
  }
</script>

<style>
.flow-list {
  --virtual-scroller-item-gap: theme('spacing.6')
}

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

.flow-list__flow-run-tags { @apply
  w-64
}

.flow-list__flow-run-tags--empty { @apply
  text-foreground-50
}
</style>
