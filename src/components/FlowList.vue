<template>
  <div class="flow-list">
    <p-layout-table sticky>
      <template #header-start>
        <slot name="header-start">
          <div class="flow-list__header-start">
            <ResultsCount v-if="selected.length == 0" :label="localization.info.flow" :count="flowsCount" />
            <SelectedCount v-else :count="selected.length" />
            <FlowsDeleteButton size="xs" :selected="selected" @delete="deleteFlows" />
          </div>
        </slot>
      </template>

      <template #header-end>
        <slot name="header-end">
          <div class="flow-list__header-end">
            <SearchInput v-model="search" :placeholder="localization.info.searchByFlowName" :label="localization.info.searchByFlowName" />
            <p-select v-model="filter.sort" :options="flowSortOptions" />
            <p-tags-input v-model="filter.flowRuns.tags.name" :placeholder="localization.info.addTagPlaceholder" class="flow-list__flow-run-tags">
              <template #empty-message>
                <span class="flow-list__flow-run-tags--empty">{{ localization.info.filterByFlowRunTags }}</span>
              </template>
            </p-tags-input>
          </div>
        </slot>
      </template>

      <p-virtual-scroller
        :items="flows"
        :chunk-size="20"
        :item-estimate-height="140"
        item-key="id"
      >
        <template #default="{ item }">
          <slot v-bind="{ item, selected, disabled, update: handleUpdate, delete: handleDelete }">
            <FlowListItem
              v-model:selected="selected"
              :value="item.id"
              :flow="item"
              :filter="baseFilter"
              :disabled="disabled"
              class="flow-list__flow"
              @update="handleUpdate"
              @delete="handleDelete"
            />
          </slot>
        </template>
      </p-virtual-scroller>

      <template #footer-end>
        <slot name="footer-end" v-bind="{ page, pages }">
          <p-pager v-if="pages > 1" v-model:page="page" :pages="pages" />
        </slot>
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
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'delete' | 'update', value?: string): void,
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

  const handleUpdate = (flowId: string): void => {
    emit('update', flowId)
    refresh()
  }

  const handleDelete = (flowId: string): void => {
    emit('delete', flowId)
    refresh()
  }

  const deleteFlows = (): void => {
    emit('delete')
    refresh()
    selected.value = []
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
