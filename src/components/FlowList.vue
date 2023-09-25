<template>
  <div class="flow-list">
    <p-layout-table :sticky="media.lg">
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
              <SearchInput v-model="deploymentNameSearch" :placeholder="localization.info.searchByDeploymentName" :label="localization.info.searchByDeploymentName" />
              <p-select v-model="routeFilter.sort" :options="flowSortOptions" />
              <p-button icon="AdjustmentsVerticalIcon" :class="classes.filterButton" :selected="headerExpanded" @click="headerExpanded = !headerExpanded" />
            </div>
          </div>

          <template v-if="headerExpanded">
            <FlowsFilterGroup />
          </template>
          <template v-else-if="isCustomFilter">
            <div class="flow-list__filters-active">
              ({{ localization.info.filtersActive }})
              <p-button small :disabled="isDefaultFilter" @click="clear">
                {{ localization.info.resetFilters }}
              </p-button>
            </div>
          </template>
        </div>
      </template>

      <template v-if="flowsCount === 0">
        <p-empty-results>
          <template #message>
            {{ localization.info.noFlowsOrDeploymentsMatchFilter }}
          </template>
          <template v-if="isCustomFilter" #actions>
            <p-button small @click="clear">
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
          <slot v-bind="{ item, selected, selectable, update: handleUpdate, delete: handleDelete }">
            <FlowListItem
              v-model:selected="selected"
              :value="item.id"
              :flow="item"
              :filter="routeFilter"
              :selectable="selectable"
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
  import { media } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useDebouncedRef, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, ref } from 'vue'
  import { FlowListItem, FlowsDeleteButton, ResultsCount, SearchInput, SelectedCount, FlowsFilterGroup } from '@/components'
  import { useDeploymentsCount, useFlows, useFlowsFilterFromRoute } from '@/compositions'
  import { localization } from '@/localization'
  import { FlowsFilter } from '@/models/Filters'
  import { flowSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    filter?: FlowsFilter,
    selectable?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'delete' | 'update', value?: string): void,
  }>()

  const headerExpanded = ref(false)
  const selected = ref<string[]>([])

  const search = ref<string>()
  const searchDebounced = useDebouncedRef(search, 800)
  const nameLike = computed({
    get() {
      return searchDebounced.value === '' ? undefined : searchDebounced.value
    },
    set(value: string | undefined) {
      searchDebounced.value = value
    },
  })

  const deploymentNameSearch = ref<string>()
  const deploymentNameLikeDebounced = useDebouncedRef(deploymentNameSearch, 800)

  const deploymentNameLike = computed({
    get() {
      return deploymentNameLikeDebounced.value === '' ? undefined : deploymentNameLikeDebounced.value
    },
    set(value: string | undefined) {
      deploymentNameSearch.value = value
    },
  })

  const page = useRouteQueryParam<number>('page', NumberRouteParam, 1)

  const { filter: routeFilter, isDefaultFilter, isCustomFilter, clear } = useFlowsFilterFromRoute(merge({}, props.filter, {
    flows: {
      nameLike,
    },
    deployments: {
      nameLike: deploymentNameLike,
    },
  }))

  const filter = computed(() => {
    return {
      ...routeFilter,
      limit: 40,
    }
  })

  const { subscriptions, flows, total: flowsCount, pages } = useFlows(filter, {
    page,
  })

  const { count: deploymentsCount } = useDeploymentsCount(filter)

  const handleUpdate = (flowId: string): void => {
    emit('update', flowId)
    subscriptions.refresh()
  }

  const handleDelete = (flowId: string): void => {
    emit('delete', flowId)
    subscriptions.refresh()
  }

  const deleteFlows = (): void => {
    emit('delete')
    subscriptions.refresh()
    selected.value = []
  }

  const classes = computed(() => ({
    filterButton: {
      'flow-list__filter-button--filter-active-text': isCustomFilter.value && !headerExpanded.value,
      'flow-list__filter-button--filter-open': headerExpanded.value,
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
  text-subdued
  text-base
}

.flow-list__filters-active { @apply
  text-subdued
  text-sm
  flex
  gap-2
  justify-end
  items-center
  mt-4
}

.flow-list__filter-button--filter-open { @apply
  cursor-pointer
}

.flow-list__filter-button--filter-active-text .p-icon { @apply
  text-selected
}
</style>
