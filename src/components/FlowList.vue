<template>
  <div class="flow-list">
    <p-layout-table sticky>
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
              <p-button icon="ChevronDoubleDownIcon" @click="headerExpanded = !headerExpanded" />
            </div>
          </div>

          <template v-if="headerExpanded">
            <p-divider class="flow-list__divider" />
            <FlowsFilterGroup />
          </template>
        </div>
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
  import { isNullish } from '@/utilities'

  const props = defineProps<{
    filter?: FlowsFilter,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'delete' | 'update', value?: string): void,
  }>()

  const DEFAULT_LIMIT = 40

  const headerExpanded = ref(true)

  const scheduleActive = ref(null)
  const scheduleActiveOptions = [
    { label: localization.info.all, value: null },
    { label: localization.info.active, value: true },
    { label: localization.info.inactive, value: false },
  ]

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

  const { filter } = useFlowsFilterFromRoute({
    ...props.filter,
    flows: {
      ...props.filter?.flows,
      nameLike: searchDebounced,
    },
    deployments: {
      ...props.filter?.deployments,
      isScheduleActive: isNullish(scheduleActive.value) ? undefined : scheduleActive.value,
    },
    offset,
    limit: DEFAULT_LIMIT,
  })

  const countsFilter = computed(() => {
    return {
      ...props.filter,
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
  my-4
}
</style>
