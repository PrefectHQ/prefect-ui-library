<template>
  <div class="deployments-table">
    <p-layout-table sticky :root-margin="margin">
      <template #header-start>
        <ResultsCount v-if="selectedDeployments.length == 0" label="Deployment" :count="total" />
        <SelectedCount v-else :count="selectedDeployments.length" />

        <DeploymentsDeleteButton small :selected="selectedDeployments" @delete="deleteDeployments" />
      </template>

      <template #header-end>
        <SearchInput v-model="deploymentName" placeholder="Search deployments" label="Search deployments" />

        <p-select v-model="filter.sort" :options="deploymentSortOptions" />

        <DeploymentTagsInput v-model:selected="filter.deployments.tags.name" multiple />
      </template>

      <p-table :data="deployments" :columns="columns" class="deployments-table">
        <template #selection-heading>
          <p-checkbox v-model="selectAllValue" />
        </template>

        <template #selection="{ row }">
          <p-checkbox v-model="selectedDeployments" :value="row.id" :disabled="!row.can.delete" />
        </template>

        <template #name="{ row }">
          <div class="deployments-table__name">
            <div class="deployments-table__name-links">
              <FlowRouterLink :flow-id="row.flowId" after="&nbsp/&nbsp;" />
              <p-link :to="routes.deployment(row.id)">
                <span>{{ row.name }}</span>
              </p-link>
            </div>
            <DeploymentStatusIcon :status="row.status" />
          </div>
        </template>

        <template #schedule="{ row }">
          <span :title="row.schedule?.toString({ verbose: true })">{{ handleSchedule(row.schedule) }}</span>
        </template>

        <template #tags="{ row }">
          <template v-if="row.tags">
            <p-tag-wrapper :tags="row.tags" justify="left" />
          </template>
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
            <DeploymentMenu size="xs" :deployment="row" show-all @delete="refresh" />
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

      <template #footer-end>
        <p-pager v-if="pages > 1" v-model:page="page" :pages="pages" />
      </template>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper, PEmptyResults, PLink, TableColumn } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useDebouncedRef, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import merge from 'lodash.merge'
  import { computed, ref } from 'vue'
  import { SearchInput, ResultsCount, DeploymentToggle, FlowRouterLink, DeploymentsDeleteButton, SelectedCount, DeploymentStatusIcon } from '@/components'
  import DeploymentTagsInput from '@/components/DeploymentTagsInput.vue'
  import { useWorkspaceRoutes, useDeploymentsFilterFromRoute, useComponent, useOffsetStickyRootMargin, useDeployments } from '@/compositions'
  import { Deployment, isRRuleSchedule, Schedule } from '@/models'
  import { DeploymentsFilter } from '@/models/Filters'
  import { deploymentSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    filter?: DeploymentsFilter,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()

  const { DeploymentMenu } = useComponent()
  const routes = useWorkspaceRoutes()
  const deploymentName = ref<string>()
  const deploymentNameDebounced = useDebouncedRef(deploymentName, 1200)
  const { margin } = useOffsetStickyRootMargin()

  const page = useRouteQueryParam('page', NumberRouteParam, 1)

  const { filter, clear, isCustomFilter } = useDeploymentsFilterFromRoute(merge({}, props.filter, {
    deployments: {
      nameLike: deploymentNameDebounced,
    },
    limit: 50,
  }))

  const { deployments, subscriptions, total, pages } = useDeployments(filter, {
    page,
  })

  const columns = computed<TableColumn<Deployment>[]>(() => [
    {
      label: 'selection',
      width: '20px',
      visible: deletableDeployments.value.length > 0,
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

  const deletableDeployments = computed(() => {
    return deployments.value.filter(deployment => deployment.can.delete)
  })

  const selectAllValue = computed({
    get() {
      return selectedDeployments.value.length === deletableDeployments.value.length
    },
    set(value: boolean) {
      if (value) {
        selectedDeployments.value = deletableDeployments.value.map(deployment => deployment.id)
        return
      }

      selectedDeployments.value = []
    },
  })

  const handleSchedule = (schedule: Schedule| null): string => {
    if (isRRuleSchedule(schedule)) {
      return 'RRule'
    }
    return schedule?.toString() ?? ''
  }

  function refresh(): void {
    subscriptions.refresh()
  }

  const deleteDeployments = (): void => {
    selectedDeployments.value = []
    refresh()
    emit('delete')
  }
</script>

<style>
.deployments-table__actions { @apply
  flex
  gap-2
  items-center
}

.deployments-table__name { @apply
  flex
  gap-2
  items-center
}
</style>