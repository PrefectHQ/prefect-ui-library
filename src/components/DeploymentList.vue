<template>
  <p-content class="deployment-list">
    <p-list-header sticky>
      <ResultsCount v-if="selectedDeployments.length == 0" label="Deployment" :count="total" />
      <SelectedCount v-else :count="selectedDeployments.length" />
      <DeploymentsDeleteButton v-if="can.delete.deployment" :selected="selectedDeployments.map(deployment => deployment.id)" small @delete="deleteDeployments" />

      <template #controls>
        <SearchInput v-model="deploymentNameLike" small placeholder="Search deployment names..." class="deployment-list__search-input" label="Search deployments" />
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
      class="deployment-list__table"
      @update:selected="selectedDeployments = $event"
    >
      <template #status="{ row }">
        <DeploymentStatusBadge :deployment="row" small />
      </template>

      <template #deployment="{ row }">
        <div class="deployment-list__deployment">
          <div class="deployment-list__name">
            <p-link :to="routes.deployment(row.id)">
              {{ row.name }}
            </p-link>
          </div>

          <FlowPopover :flow-id="row.flowId" class="deployment-list__flow-name" />
        </div>
      </template>

      <template #updated="{ row }">
        <FormattedDate :date="row.updated" class="deployment-list__timestamp" />
      </template>

      <template #created="{ row }">
        <FormattedDate :date="row.created" class="deployment-list__timestamp" />
      </template>

      <template #schedule="{ row }">
        <div class="deployment-list__schedules">
          <p-tag-wrapper small justify="left">
            <template v-for="schedule in row.schedules" :key="schedule.id">
              <p-tooltip :text="getReadableSchedule(schedule?.schedule, true)">
                <p-tag class="deployment-list__schedule" small>
                  {{ getReadableSchedule(schedule?.schedule) }}
                </p-tag>
              </p-tooltip>
            </template>
          </p-tag-wrapper>
        </div>
      </template>

      <template #tags="{ row }">
        <template v-if="row.tags">
          <p-tag-wrapper :tags="row.tags" small justify="left" />
        </template>
      </template>

      <template #applied-by="{ row }">
        {{ row.appliedBy }}
      </template>

      <template #activity="{ row }">
        <MiniDeploymentHistory
          class="deployment-list__activity-chart"
          :deployment-id="row.id"
          :time-span-in-seconds="secondsInDay"
        />
      </template>

      <template #action-heading>
        <span />
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
        <PEmptyResults v-if="subscriptions.executed">
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

    <p-pager v-if="pages > 1" v-model:page="page" :pages="pages" />
  </p-content>
</template>

<script lang="ts" setup>
  import { TableColumn, media } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useDebouncedRef, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { secondsInDay } from 'date-fns/constants'
  import { snakeCase } from 'lodash'
  import merge from 'lodash.merge'
  import { ref } from 'vue'
  import {
    DeploymentsDeleteButton,
    ResultsCount,
    SearchInput,
    FlowRouterLink,
    FlowPopover,
    MiniDeploymentHistory,
    SelectedCount,
    DeploymentTagsInput,
    DeploymentToggle,
    FormattedDate,
    DeploymentStatusBadge
  } from '@/components'
  import { useCan, useDeploymentsFilterFromRoute, useWorkspaceRoutes, useDeployments, useComponent } from '@/compositions'
  import { Deployment, isRRuleSchedule, Schedule } from '@/models'
  import { DeploymentsFilter } from '@/models/Filters'
  import { ClassValue } from '@/types'
  import { deploymentSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    filter?: DeploymentsFilter,
    prefix?: string,
  }>()

  const { DeploymentMenu } = useComponent()

  const can = useCan()
  const routes = useWorkspaceRoutes()

  const deploymentNameLike = ref<string>()
  const deploymentNameLikeDebounced = useDebouncedRef(deploymentNameLike, 1200)
  const { filter, clear, isCustomFilter } = useDeploymentsFilterFromRoute(merge({}, props.filter, {
    deployments: {
      nameLike: deploymentNameLikeDebounced,
    },
    limit: 50,
  }), props.prefix)

  const getReadableSchedule = (schedule: Schedule | null, verbose: boolean = false): string => {
    if (isRRuleSchedule(schedule)) {
      return 'RRule'
    }

    return schedule?.toString({ verbose }) ?? ''
  }

  const page = useRouteQueryParam('page', NumberRouteParam, 1)
  const { deployments, subscriptions, total, pages } = useDeployments(filter, {
    page,
    interval: 30000,
  })

  const columns: TableColumn<Deployment>[] = [
    {
      label: 'Deployment',
      width: 'calc(30% - 100px)',
    },
    {
      label: 'Status',
      property: 'status',
      width: '100px',
    },
    {
      label: 'Activity',
      visible: media.md,
      maxWidth: '20%',
    },
    {
      label: 'Schedule',
      property: 'schedules',
      visible: media.md,
      maxWidth: '15%',
    },
    {
      label: 'Tags',
      property: 'tags',
      visible: media.md,
      maxWidth: '20%',
    },
    {
      label: 'Action',
      maxWidth: '10%',
    },
  ]

  const columnClasses = (column: TableColumn<Deployment>): ClassValue => [`deployment-list__${snakeCase(column.label)}-column`]

  const selectedDeployments = ref<Deployment[]>([])

  function refresh(): void {
    subscriptions.refresh()
  }

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const deleteDeployments = (): void => {
    selectedDeployments.value = []
    refresh()
    emit('delete')
  }
</script>

<style>
.deployment-list__table .p-table__table { @apply
  table-fixed
  w-full
}

.deployment-list__status-column,
.deployment-list__activity-column,
.deployment-list__table .p-table__checkbox-cell { @apply
  box-content
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
  text-right
  whitespace-nowrap
}

.deployment-list__deployment { @apply
  flex
  flex-col
  gap-0.5
  min-w-0
  max-w-full
}

.deployment-list__timestamp { @apply
  text-subdued
}

.deployment-list__schedules { @apply
  flex
  flex-col
  gap-0.5
}

.deployment-list__schedule { @apply
  bg-sentiment-neutral
}

.deployment-list__flow-name,
.deployment-list__name { @apply
  max-w-full
  truncate
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
</style>
