<template>
  <p-content class="deployment-list">
    <p-list-header sticky>
      <ResultsCount v-if="selectedDeployments.length == 0" label="Deployment" :count="total" />
      <SelectedCount v-else :count="selectedDeployments.length" />
      <DeploymentsDeleteButton v-if="can.delete.deployment" :selected="selectedDeployments" small @delete="deleteDeployments" />

      <template #controls>
        <SearchInput v-model="deploymentNameLike" placeholder="Deployment names" label="Search deployments" />
        <DeploymentTagsInput v-model:selected="filter.deployments.tags.name" multiple />
      </template>

      <template #sort>
        <p-select v-model="filter.sort" :options="deploymentSortOptions" />
      </template>
    </p-list-header>

    <p-table :data="deployments" :columns="columns" class="deployments-list__table">
      <template #selection-heading>
        <p-checkbox v-model="model" @update:model-value="selectAllDeployments" />
      </template>

      <template #selection="{ row }">
        <p-checkbox v-model="selectedDeployments" :value="row.id" />
      </template>

      <template #deployment-name="{ row }">
        <div class="deployment-list__name-col">
          <span class="deployment-list__name">
            <p-link :to="routes.deployment(row.id)">
              {{ row.name }}
            </p-link>
            <DeploymentStatusIcon :status="row.status" />
          </span>
          <span class="deployment-list__created-date">Created {{ formatDateTimeNumeric(row.created) }}</span>
        </div>
      </template>

      <template #flow-name="{ row }">
        <FlowRouterLink :flow-id="row.flowId" class="deployments-list__flow-name" />
      </template>

      <template #schedule="{ row }">
        <div class="deployment-list__schedules">
          <template v-for="schedule in row.schedules" :key="schedule.id">
            <p-tooltip :text="getReadableSchedule(schedule?.schedule, true)">
              <div class="p-background deployments-list__schedule">
                {{ getReadableSchedule(schedule?.schedule) }}
              </div>
            </p-tooltip>
          </template>
        </div>
      </template>

      <template #tags="{ row }">
        <template v-if="row.tags">
          <div class="deployment-list__tags">
            <p-tag-wrapper :tags="row.tags" justify="left" />
          </div>
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
            size="xs"
            show-all
            :deployment="row"
            flat
            @delete="refresh"
          />
        </div>
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No deployments
          </template>
          <template v-if="isCustomFilter" #actions>
            <p-button small @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>

    <p-pager v-if="pages > 1" v-model:page="page" :pages="pages" />
  </p-content>
</template>

<script lang="ts" setup>
  import { CheckboxModel, TableColumn, media } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useDebouncedRef, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { secondsInDay } from 'date-fns/constants'
  import merge from 'lodash.merge'
  import { computed, ref } from 'vue'
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
      label: 'selection',
      width: '20px',
      visible: can.delete.deployment,
    },
    {
      property: 'name',
      label: 'Deployment name',
    },
    {
      property: 'flowId',
      label: 'Flow name',
    },
    {
      label: 'Schedule',
      visible: media.md,
    },
    {
      label: 'Tags',
      visible: media.md,
    },
    {
      label: 'Activity',
      visible: media.md,
    },
    {
      label: 'Action',
    },
  ]

  const selectedDeployments = ref<string[]>([])
  const selectAllDeployments = (allDeploymentsSelected: CheckboxModel): string[] => {
    if (allDeploymentsSelected) {
      return selectedDeployments.value = [...deployments.value.map(deployment => deployment.id)]
    }
    return selectedDeployments.value = []
  }

  const model = computed({
    get() {
      return selectedDeployments.value.length === deployments.value.length
    },
    set(value: boolean) {
      selectAllDeployments(value)
    },
  })

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
  h-12
  w-20
}

.deployments-list__table .p-table-data { @apply
  whitespace-normal
}

.deployment-list__action { @apply
  text-right
  whitespace-nowrap
}

.deployment-list__name-col { @apply
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

.deployments-list__schedule { @apply
  px-2
  py-1
}

.deployment-list__created-date { @apply
  text-subdued
  text-xs
}

.deployment-list__menu { @apply
  ml-2
}

.deployment-list__tags { @apply
  max-w-80
  min-w-0
}
</style>
