<template>
  <div class="flow-list">
    <p-layout-table>
      <template #header>
        <div class="flow-list__header-container">
          <div class="flow-list__header">
            <div class="flow-list__header-start">
              <template v-if="selected.length == 0">
                <span v-if="!!flowsCount && !!deploymentsCount" class="flow-list__results-count">
                  <ResultsCount :label="localization.info.flow" :count="flowsCount" />
                  {{ localization.info.with }}
                  <ResultsCount :label="localization.info.deployment" :count="deploymentsCount" />
                </span>
              </template>

              <template v-else-if="selected.length">
                <SelectedCount :count="selected.length" />
                <FlowsDeleteButton size="xs" :selected="selected" @delete="deleteFlows" />
              </template>
            </div>

            <div class="flow-list__header-end">
              <SearchInput v-model="search" :placeholder="localization.info.searchByFlowName" :label="localization.info.searchByFlowName" />
              <p-select v-model="filter.sort" :options="flowSortOptions" />
              <p-button icon="AdjustmentsVerticalIcon" :class="classes.filterButton" inset @click="headerExpanded = !headerExpanded" />
            </div>
          </div>

          <template v-if="headerExpanded">
            <FlowsFilterGroup />
            <p-divider class="flow-list__divider" />
          </template>
        </div>
      </template>

      <template v-if="flowsCount === 0">
        <p-empty-results>
          <template #message>
            {{ localization.info.noFlowsOrDeploymentsMatchFilter }}
          </template>
          <template v-if="isCustomFilter" #actions>
            <p-button size="sm" secondary @click="clear">
              {{ localization.info.resetFilters }}
            </p-button>
          </template>
        </p-empty-results>
      </template>

      <p-virtual-scroller
        :items="flows ?? []"
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
              :filter="props.filter"
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
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { FlowListItem, FlowsDeleteButton, ResultsCount, SearchInput, SelectedCount, FlowsFilterGroup } from '@/components'
  import { useDeploymentsCount, useFlows, useFlowsCount, useFlowsFilterFromRoute } from '@/compositions'
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

  const headerExpanded = ref(false)

  const search = ref<string>('')
  const searchDebounced = useDebouncedRef(search, 800)

  const page = ref(1)
  const offset = computed({
    get: () => (page.value - 1) * DEFAULT_LIMIT,
    set: (value: number) => {
      page.value = Math.ceil(value / DEFAULT_LIMIT) + 1
    },
  })
  const pages = computed(() => Math.ceil((flowsCount.value ?? DEFAULT_LIMIT) / DEFAULT_LIMIT))

  const { filter, isDefaultFilter, isCustomFilter, clear } = useFlowsFilterFromRoute({
    ...props.filter,
    flows: {
      ...props.filter?.flows,
      nameLike: searchDebounced,
    },
    offset,
    limit: DEFAULT_LIMIT,
  })

  const countsFilter = computed(() => {
    return {
      ...filter,
      flows: {
        ...props.filter?.flows,
        nameLike: searchDebounced.value,
      },
    }
  })

  const selected = ref<string[]>([])

  const { subscription: flowsSubscription, flows } = useFlows(filter)
  const { subscription: flowsCountSubscription, count: flowsCount } = useFlowsCount(countsFilter)
  const { count: deploymentsCount } = useDeploymentsCount(countsFilter)

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

  const classes = computed(() => ({
    filterButton: {
      'flow-list__filter-button--filter-active': !isDefaultFilter.value,
      'flow-list__filter-button--active': headerExpanded.value,
    },
  }))
</script>

<style>
.flow-list {
  --virtual-scroller-item-gap: theme('spacing.6')
}

.flow-list__header-container { @apply
  w-full
}

.flow-list__header-start { @apply
  grow
  whitespace-nowrap
  items-end
}

.flow-list__header { @apply
  flex
  flex-col
  sm:items-center
  sm:flex-row
  grow
  mb-4
}

.flow-list__header-end { @apply
  flex
  flex-wrap
  ml-auto
  shrink
  sm:justify-end
  gap-2
}

.flow-list__results-count { @apply
  text-foreground-300
  text-base
}

.flow-list__divider { @apply
  mt-4
}

.flow-list__filter-button--filter-active .p-icon,
.flow-list__filter-button--active .p-icon { @apply
  text-primary
}
</style>
