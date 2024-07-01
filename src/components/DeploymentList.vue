<template>
  <p-content class="deployment-list">
    <p-list-header sticky>
      <ResultsCount v-if="selectedDeployments.length == 0" label="Deployment" :count />
      <SelectedCount v-else :count="selectedDeployments.length" />
      <DeploymentsDeleteButton v-if="can.delete.deployment" :selected="selectedDeployments.map(deployment => deployment.id)" small @delete="deleteDeployments" />

      <template #controls>
        <SearchInput v-model="nameLike" size="small" placeholder="Search deployments..." class="deployment-list__search-input" label="Search deployments" />
        <DeploymentTagsInput v-model:selected="filter.deployments.tags.name" small multiple />
      </template>

      <template #sort>
        <p-select v-model="filter.sort" small :options="deploymentSortOptions" />
      </template>
    </p-list-header>

    <p-table
      :selected="can.delete.deployment ? selectedDeployments : undefined"
      :data="deployments"
      :columns="columns"
      :header-classes="columnClasses"
      :column-classes="columnClasses"
      :row-classes="rowClasses"
      class="deployment-list__table"
      @update:selected="selectedDeployments = $event"
    >
      <template #status="{ row }">
        <DeploymentStatusBadge :deployment="row" small />
      </template>

      <template #schedules-heading="{ column }">
        <div class="deployment-list__schedules-heading">
          {{ column.label }}
        </div>
      </template>

      <template #tags-heading="{ column }">
        <div class="deployment-list__tags-heading">
          {{ column.label }}
        </div>
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #deployment="{ row }">
        <div class="deployment-list__deployment">
          <router-link :to="routes.deployment(row.id)" class="deployment-list__name" :title="row.name">
            {{ row.name }}
          </router-link>

          <FlowPopover :flow-id="row.flowId" class="deployment-list__flow-name" />
        </div>
      </template>

      <template #updated="{ row }">
        <FormattedDate :date="row.updated" />
      </template>

      <template #created="{ row }">
        <FormattedDate :date="row.created" />
      </template>

      <template #schedules="{ row }">
        <DeploymentScheduleTags :schedules="row.schedules" justify="right" />
      </template>

      <template #tags="{ row }">
        <template v-if="row.tags">
          <p-tag-wrapper :tags="row.tags" small justify="right" />
        </template>
      </template>

      <template #activity="{ row }">
        <MiniDeploymentHistory
          class="deployment-list__activity-chart"
          :deployment-id="row.id"
          :time-span-in-seconds="secondsInWeek"
        />
      </template>

      <template #action="{ row }">
        <div class="deployment-list__action">
          <DeploymentToggle :deployment="row" @update="refresh" />
          <DeploymentMenu
            class="deployment-list__menu"
            small
            show-all
            :deployment="row"
            flat
            @delete="refresh"
          />
        </div>
      </template>

      <template #empty-state>
        <PEmptyResults v-if="subscription.executed">
          <template #message>
            No deployments
          </template>
          <template v-if="isCustomFilter" #actions>
            <p-button small @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
        <PEmptyResults v-else>
          <template #message>
            <p-loading-icon />
          </template>
        </PEmptyResults>
      </template>
    </p-table>

    <p-pager v-model:limit="limit" v-model:page="page" :pages="pages" />
  </p-content>
</template>

<script lang="ts" setup>
  import { TableColumn, media } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useDebouncedRef, useLocalStorage, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { secondsInWeek } from 'date-fns/constants'
  import { snakeCase } from 'lodash'
  import merge from 'lodash.merge'
  import { computed, ref } from 'vue'
  import {
    DeploymentsDeleteButton,
    ResultsCount,
    SearchInput,
    FlowPopover,
    MiniDeploymentHistory,
    SelectedCount,
    DeploymentTagsInput,
    DeploymentToggle,
    FormattedDate,
    DeploymentStatusBadge,
    DeploymentScheduleTags
  } from '@/components'
  import { useCan, useDeploymentsPaginationFilterFromRoute, useWorkspaceRoutes, useDeployments, useComponent } from '@/compositions'
  import { Deployment } from '@/models'
  import { DeploymentsFilter } from '@/models/Filters'
  import { ClassValue } from '@/types'
  import { deploymentSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    filter?: DeploymentsFilter,
    prefix?: string,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { DeploymentMenu } = useComponent()

  const can = useCan()
  const routes = useWorkspaceRoutes()

  const nameLike = ref<string>()
  const nameLikeDebounced = useDebouncedRef(nameLike, 1200)
  const page = useRouteQueryParam('page', NumberRouteParam, 1)
  const { value: limit } = useLocalStorage('deployment-list-limit', 10)

  const { filter, clear, isCustomFilter } = useDeploymentsPaginationFilterFromRoute(merge({}, props.filter, {
    deployments: {
      flowOrDeploymentNameLike: nameLikeDebounced,
    },
    limit,
    page,
  }), props.prefix)


  const { deployments, subscription, count, pages } = useDeployments(filter, {
    interval: 30000,
  })

  const columns = computed<TableColumn<Deployment>[]>(() => [
    {
      label: 'Deployment',
    },
    {
      label: 'Status',
      property: 'status',
      width: '116px',
    },
    {
      label: 'Activity',
      visible: media.lg,
      maxWidth: '15%',
    },
    {
      label: 'Tags',
      property: 'tags',
      visible: media.md,
      maxWidth: '15%',
    },
    {
      label: 'Schedules',
      property: 'schedules',
      visible: media.md,
      maxWidth: '15%',
    },
    {
      label: 'Action',
      width: '82px',
    },
  ])

  const columnClasses = (column: TableColumn<Deployment>): ClassValue => [`deployment-list__${snakeCase(column.label)}-column`]
  const rowClasses = (row: Deployment): ClassValue => {
    return {
      'deployment-list__row--subdued': row.paused,
    }
  }

  const selectedDeployments = ref<Deployment[]>([])

  function refresh(): void {
    subscription.refresh()
  }

  const deleteDeployments = (): void => {
    selectedDeployments.value = []
    refresh()
    emit('delete')
  }
</script>

<style>
.deployment-list__table { @apply
  overflow-visible
}

.deployment-list__table .p-table__table { @apply
  table-fixed
  w-full
}

.deployment-list__action-column,
.deployment-list__table .p-table__checkbox-cell { @apply
  box-content
}

.deployment-list__activity-column { @apply
  overflow-visible
}

.deployment-list__activity-chart { @apply
  h-8
  pr-4
  w-full
}

.deployment-list__search-input { @apply
  w-64
}

.deployment-list__action { @apply
  flex
  justify-end
  items-center
}

.deployment-list__deployment { @apply
  flex
  flex-col
  gap-0.5
  min-w-0
  max-w-full
}

.deployment-list__name { @apply
  font-semibold
  text-base
  hover:underline
}

.deployment-list__flow-name,
.deployment-list__name { @apply
  max-w-full
  truncate
}

.deployment-list__schedules-heading,
.deployment-list__tags-heading { @apply
  text-right
}

.deployment-list__flow-name { @apply
  text-subdued
  text-xs
}

.deployment-list__created-date { @apply
  text-subdued
  text-xs
}

.deployment-list__menu { @apply
  ml-2
}

.deployment-list__row--subdued .deployment-list__deployment-column,
.deployment-list__row--subdued .deployment-list__tags-column,
.deployment-list__row--subdued .deployment-list__schedules-column { @apply
  opacity-65
}

.deployment-list__row--subdued .deployment-list__name  { @apply
  text-subdued
  font-normal
}
</style>
