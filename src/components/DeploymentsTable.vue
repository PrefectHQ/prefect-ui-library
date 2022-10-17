<template>
  <p-content class="deployments-table">
    <div class="deployments-table__controls">
      <ResultsCount class="deployments-table__count" label="Deployment" :count="deploymentsCount" />
      <SearchInput v-model="deploymentName" placeholder="Search deployments" label="Search deployments" />
      <FlowCombobox v-model:selected="flows" empty-message="All flows" class="deployments-table__flows" />
      <p-select v-model="sort" :options="deploymentSortOption" />
    </div>

    <p-table :data="deployments" :columns="columns" class="deployments-table">
      <template #name="{ row }">
        <FlowRouterLink :flow-id="row.flowId" after=" / " />
        <p-link :to="deploymentRoute(row.id)">
          <span>{{ row.name }}</span>
        </p-link>
      </template>

      <template #schedule="{ row }">
        <span :title="row.schedule?.toString({ verbose: true })">{{ row.schedule }}</span>
      </template>

      <template #tags="{ row }">
        <p-tag-wrapper :tags="row.tags" justify="left" />
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="deployments-table__actions">
          <DeploymentToggle :deployment="row" @update="emits('update')" />
          <DeploymentMenu size="xs" :deployment="row" @delete="id => emits('delete', id)" />
        </div>
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No deployments
          </template>
          <template v-if="deploymentName.length" #actions>
            <p-button size="sm" secondary @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>
  </p-content>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper, PEmptyResults, PLink } from '@prefecthq/prefect-design'
  import { useDebouncedRef, useRouteQueryParam, useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowCombobox from './FlowCombobox.vue'
  import FlowRouterLink from './FlowRouterLink.vue'
  import DeploymentMenu from '@/components/DeploymentMenu.vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useDeploymentFilter, UseDeploymentFilterArgs } from '@/compositions/useDeploymentFilter'
  import { deploymentRouteKey } from '@/router'
  import { isDeploymentSortValue } from '@/types'
  import { inject } from '@/utilities'

  const deploymentRoute = inject(deploymentRouteKey)

  const props = defineProps<{
    filter?: UseDeploymentFilterArgs,
  }>()

  const emits = defineEmits<{
    (event: 'update'): void,
    (event: 'delete', value: string): void,
  }>()

  const api = useWorkspaceApi()
  const flows = useRouteQueryParam('flow', [])
  const deploymentName = useRouteQueryParam('search', '')
  const deploymentNameDebounced = useDebouncedRef(deploymentName, 500)
  const sort = useRouteQueryParam('sort', 'CREATED_DESC')

  const columns = [
    {
      property: 'name',
      label: 'Name',
      width: '150px',
    },
    {
      property: 'schedule',
      label: 'Schedule',
      width: '200px',
    },
    {
      property: 'tags',
      label: 'Tags',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  const deploymentSortOption = [
    { label: 'Created', value: 'CREATED_DESC' },
    { label: 'A to Z', value: 'NAME_ASC' },
    { label: 'Z to A', value: 'NAME_DESC' },
  ]

  const internalFilters = computed<UseDeploymentFilterArgs>(() => {
    const filter: UseDeploymentFilterArgs = { ...props.filter }

    if (deploymentNameDebounced.value.length) {
      filter.deploymentName = deploymentNameDebounced
    }

    if (flows.value.length) {
      filter.flows = flows
    }

    if (isDeploymentSortValue(sort)) {
      filter.sort = sort
    }

    return filter
  })

  const unionFilter = useDeploymentFilter(internalFilters)
  const deploymentsSubscription = useSubscription(api.deployments.getDeployments, [unionFilter])
  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const deploymentsCountSubscription = useSubscription(api.deployments.getDeploymentsCount, [unionFilter])
  const deploymentsCount = computed(() => deploymentsCountSubscription.response)

  function clear(): void {
    deploymentName.value = ''
  }
</script>

<style>
.deployments-table__count { @apply
  mr-auto
}

.deployments-table__controls { @apply
  flex
  gap-2
  items-stretch
  flex-col
  sm:flex-row
  sm:items-center
}

.deployments-table__search { @apply
  flex
  justify-between
  items-center
  mb-4
}

.deployments-table__flows {
  min-width: 128px;
}

.deployments-table__actions { @apply
  flex
  gap-2
}
</style>