<template>
  <p-content class="deployment-list">
    <p-list-header sticky>
      <ResultsCount v-if="selectedDeployments.length == 0" label="Deployment" :count="total" />
      <SelectedCount v-else :count="selectedDeployments.length" />
      <DeploymentsDeleteButton v-if="can.delete.deployment" :selected="selectedDeployments.map(deployment => deployment.id)" small @delete="deleteDeployments" />

      <template #controls>
        <SearchInput v-model="deploymentNameLike" small placeholder="Deployment names" label="Search deployments" />
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
      <template #status-heading>
        <span />
      </template>

      <template #status="{ row }">
        <DeploymentStatusIcon :status="row.status" />
      </template>

      <template #deployment-name="{ row }">
        <div class="deployment-list__name-column">
          <span class="deployment-list__name">
            <p-link :to="routes.deployment(row.id)">
              {{ row.name }}
            </p-link>
          </span>
          <span class="deployment-list__created-date">Created {{ formatDateTimeNumeric(row.created) }}</span>
        </div>
      </template>


      <template #schedule="{ row }">
        <div class="deployment-list__schedules">
          <template v-for="schedule in row.schedules" :key="schedule.id">
            <p-tooltip :text="getReadableSchedule(schedule?.schedule, true)">
              <p-tag class="deployment-list__schedule" small>
                {{ getReadableSchedule(schedule?.schedule) }}
              </p-tag>
            </p-tooltip>
          </template>
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
            Loading...
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
  import merge from 'lodash.merge'
  import { ref } from 'vue'
  import {
    DeploymentsDeleteButton,
    ResultsCount,
    SearchInput,
    FlowRouterLink,
    MiniDeploymentHistory,
    SelectedCount,
    DeploymentTagsInput,
    DeploymentStatusIcon,
    DeploymentToggle
  } from '@/components'
  import { useCan, useDeploymentsFilterFromRoute, useWorkspaceRoutes, useDeployments, useComponent } from '@/compositions'
  import { Deployment, isRRuleSchedule, Schedule } from '@/models'
  import { DeploymentsFilter } from '@/models/Filters'
  import { ClassValue } from '@/types'
  import { deploymentSortOptions } from '@/types/SortOptionTypes'
  import { formatDateTimeNumeric } from '@/utilities/dates'

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
      label: 'Status',
      property: 'status',
      maxWidth: '8px',
    },
    {
      property: 'name',
      label: 'Deployment',
    },
    {
      label: 'Schedule',
      visible: media.md,
    },
    {
      label: 'Tags',
      visible: media.md,
      maxWidth: '20rem',
    },
    {
      label: 'Activity',
      visible: media.md,
    },
    {
      label: 'Action',
    },
  ]

  const columnClasses = (column: TableColumn<Deployment>): ClassValue => {
    if (column.property === 'status') {
      return ['deployment-list__status-column']
    }

    return []
  }

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
.deployment-list__activity-chart { @apply
  h-8
  w-20
}

.deployment-list__status-column { @apply
  p-0
  w-2
}

.deployment-list__action { @apply
  text-right
  whitespace-nowrap
}

.deployment-list__name-column { @apply
  flex
  flex-col
}

.deployment-list__name { @apply
  inline-flex
  items-center
  gap-x-1
  font-medium
}

.deployment-list__schedules { @apply
  flex
  flex-col
  gap-0.5
}

.deployment-list__schedule { @apply
  bg-sentiment-neutral
}

.deployment-list__created-date { @apply
  text-subdued
  text-xs
}

.deployment-list__menu { @apply
  ml-2
}
</style>
