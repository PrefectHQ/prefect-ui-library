<template>
  <p-content class="deployments-table">
    <div class="deployments-table__controls">
      <div class="deployments-table__controls--right">
        <ResultsCount v-if="selectedDeployments.length == 0" label="Deployment" :count="deploymentsCount" />
        <SelectedCount v-else :count="selectedDeployments.length" />

        <DeploymentsDeleteButton v-if="can.delete.deployment" :selected="selectedDeployments" @delete="deleteDeployments" />
      </div>
      <SearchInput v-model="name" placeholder="Search deployments" label="Search deployments" />

      <template v-if="canFilterFlows">
        <FlowCombobox v-model:selected="flows" empty-message="All flows" class="deployments-table__flows" />
      </template>

      <p-select v-model="sort" :options="deploymentSortOptions" />

      <p-tags-input v-model="tags" empty-message="All tags" class="deployments-table__tags" />
    </div>

    <p-table :data="deployments" :columns="columns" class="deployments-table">
      <template #selection-heading>
        <p-checkbox v-model="model" @update:model-value="selectAllDeployments" />
      </template>

      <template #selection="{ row }">
        <p-checkbox v-model="selectedDeployments" :value="row.id" />
      </template>

      <template #name="{ row }">
        <FlowRouterLink :flow-id="row.flowId" after=" / " />
        <p-link :to="routes.deployment(row.id)">
          <span>{{ row.name }}</span>
        </p-link>
      </template>

      <template #schedule="{ row }">
        <span :title="row.schedule?.toString({ verbose: true })">{{ handleSchedule(row.schedule) }}</span>
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
          <DeploymentMenu size="xs" :deployment="row" @delete="refresh">
            <template v-if="can.run.deployment" #additional-items>
              <DeploymentQuickRunOverflowMenuItem :deployment="row" />
              <DeploymentCustomRunOverflowMenuItem :deployment-id="row.id" />
            </template>
          </DeploymentMenu>
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
  import { computed, unref, ref } from 'vue'
  import { SearchInput, ResultsCount, DeploymentToggle, DeploymentMenu, FlowRouterLink, FlowCombobox, DeploymentsDeleteButton, SelectedCount, DeploymentQuickRunOverflowMenuItem, DeploymentCustomRunOverflowMenuItem } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes, useCan } from '@/compositions'
  import { UseDeploymentFilterArgs, useDeploymentFilterFromRoute } from '@/compositions/useDeploymentFilter'
  import { isRRuleSchedule, Schedule } from '@/models'
  import { deploymentSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    filter?: UseDeploymentFilterArgs,
  }>()

  const api = useWorkspaceApi()
  const can = useCan()
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
      label: 'selection',
      width: '20px',
      visible: can.delete.deployment,
    },
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

  const selectedDeployments = ref<string[]>([])
  const selectAllDeployments = (allDeploymentsSelected: boolean): string[] => {
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

  const deploymentsSubscription = useSubscription(api.deployments.getDeployments, [unionFilter])
  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const deploymentsCountSubscription = useSubscription(api.deployments.getDeploymentsCount, [unionFilter])
  const deploymentsCount = computed(() => deploymentsCountSubscription.response)

  const handleSchedule = (schedule: Schedule| null): string => {
    if (isRRuleSchedule(schedule)) {
      return 'RRule'
    }
    return schedule?.toString() ?? ''
  }

  function refresh(): void {
    deploymentsSubscription.refresh()
    deploymentsCountSubscription.refresh()
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
.deployments-table__controls--right { @apply
  mr-auto
  flex
  gap-2
  items-center
}

.deployments-table__controls { @apply
  flex
  gap-2
  items-stretch
  flex-col
  sm:flex-row
  sm:items-center
  sticky
  top-0
  bg-white
  bg-opacity-90
  py-2
  z-10
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
  items-center
}
</style>