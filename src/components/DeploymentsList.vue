<template>
  <p-content class="deployment-list">
    <p-list-header sticky>
      <ResultsCount v-if="selectedDeployments.length == 0" label="Deployment" :count="total" />
      <SelectedCount v-else :count="selectedDeployments.length" />
      <DeploymentsDeleteButton v-if="can.delete.deployment" :selected="selectedDeployments.map(deployment => deployment.id)" small @delete="deleteDeployments" />

      <template #controls>
        <SearchInput v-model="deploymentNameLike" placeholder="Deployment names" label="Search deployments" />
        <DeploymentTagsInput v-model:selected="filter.deployments.tags.name" multiple />
      </template>

      <template #sort>
        <p-select v-model="filter.sort" :options="deploymentSortOptions" />
      </template>
    </p-list-header>

    <template v-for="deployment in deployments" :key="deployment.id">
      <div class="deployment-list__deployment">
        {{ deployment.name }}

        <div class="deployment-list__deployment__flow">
          <FlowTag :id="deployment.flowId" />
        </div>
      </div>
    </template>

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
  import FlowTag from '@/components/FlowTag.vue'
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
