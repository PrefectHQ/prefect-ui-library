<template>
  <p-content class="deployments-table">
    <div class="deployments-table__controls">
      <ResultsCount class="deployments-table__count" label="Deployment" :count="deploymentsCount" />
      <SearchInput v-model="name" placeholder="Search deployments" label="Search deployments" />

      <template v-if="canFilterFlows">
        <FlowCombobox v-model:selected="flows" empty-message="All flows" class="deployments-table__flows" />
      </template>

      <p-select v-model="sort" :options="deploymentSortOptions" />

      <p-tags-input v-model="tags" empty-message="All tags" class="deployments-table__tags" />
    </div>

    <p-table :data="deployments" :columns="columns" class="deployments-table">
      <template #name="{ row }">
        <FlowRouterLink :flow-id="row.flowId" after=" / " />
        <p-link :to="routes.deployment(row.id)">
          <span>{{ row.name }}</span>
        </p-link>
      </template>

      <template #schedule="{ row }">
        <span :title="row.schedule?.toString({ verbose: true })">{{ row.schedule }}</span>
      </template>

      <template #tags="{ row }">
        <p-tag-wrapper :tags="row.tags" justify="left" />
      </template>

      <template #applied-by="{ row }">
        {{ row.appliedBy }}
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <div class="deployments-table__actions">
          <DeploymentToggle :deployment="row" @update="refresh" />
          <DeploymentMenu size="xs" :deployment="row" @delete="refresh" />
        </div>
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No deployments
          </template>
          <template v-if="hasFilters" #actions>
            <p-button size="sm" secondary @click="clearFilters">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>
  </p-content>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper, PEmptyResults, PLink, TableColumn } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, unref } from 'vue'
  import FlowCombobox from './FlowCombobox.vue'
  import FlowRouterLink from './FlowRouterLink.vue'
  import DeploymentMenu from '@/components/DeploymentMenu.vue'
  import DeploymentToggle from '@/components/DeploymentToggle.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { UseDeploymentFilterArgs, useDeploymentFilterFromRoute } from '@/compositions/useDeploymentFilter'
  import { deploymentSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    filter?: UseDeploymentFilterArgs,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const filter = computed(() => props.filter ?? {})
  const { flows, name, sort, tags, hasFilters, clearFilters, filter: unionFilter } = useDeploymentFilterFromRoute(filter)

  const canFilterFlows = computed(() => {
    const filterHasFlows = !!unref(filter.value.flows)?.length
    const filterHasFlowName = !!unref(filter.value.flowName)?.length

    return !filterHasFlows && !filterHasFlowName
  })

  const columns = computed<TableColumn[]>(() => [
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
      width: '300px',
    },
    {
      property: 'appliedBy',
      label: 'Applied By',
      visible: deployments.value.some(deployment => deployment.appliedBy),
    },
    {
      label: 'Action',
      width: '42px',
    },
  ])
  const deploymentsSubscription = useSubscription(api.deployments.getDeployments, [unionFilter])
  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const deploymentsCountSubscription = useSubscription(api.deployments.getDeploymentsCount, [unionFilter])
  const deploymentsCount = computed(() => deploymentsCountSubscription.response)

  function refresh(): void {
    deploymentsSubscription.refresh()
    deploymentsCountSubscription.refresh()
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

.deployments-table__flows,
.deployments-table__tags {
  min-width: 128px;
}

.deployments-table__actions { @apply
  flex
  gap-2
}
</style>