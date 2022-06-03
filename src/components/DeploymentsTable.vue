<template>
  <div class="deployments-table">
    <div class="deployments-table__search">
      <ResultsCount label="Deployment" :count="filtered.length" />
      <SearchInput v-model="searchTerm" placeholder="Search deployments" label="Search deployments" />
    </div>

    <p-table :data="filtered" :columns="columns" class="deployments-table">
      <template #name="{ row }">
        <p-link :to="deploymentRoute(row.id)">
          <span>{{ row.name }}</span>
        </p-link>
      </template>

      <template #schedule="{ row }">
        {{ formatSchedule(row.schedule) }}
      </template>

      <template #tags="{ row }">
        <p-tag-wrapper :tags="row.tags" justify="left" />
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #action="{ row }">
        <DeploymentMenu :deployment="row" @delete="id => emits('delete', id)" />
      </template>

      <template #empty-state>
        <PEmptyResults>
          <template #message>
            No deployments
          </template>
          <template v-if="searchTerm.length" #actions>
            <p-button size="sm" secondary @click="clear">
              Clear Filters
            </p-button>
          </template>
        </PEmptyResults>
      </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper, PEmptyResults, PLink } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import DeploymentMenu from '@/components/DeploymentMenu.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import { Deployment } from '@/models'
  import { deploymentRouteKey } from '@/router'
  import { inject } from '@/utilities'
  import { formatSchedule } from '@/utilities/schedules'

  const deploymentRoute = inject(deploymentRouteKey)

  const props = defineProps<{
    deployments: Deployment[],
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
  }>()

  const searchTerm = ref('')

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

  const filtered = computed(() => {
    if (searchTerm.value.length === 0) {
      return props.deployments
    }

    return props.deployments.filter(filterDeployment)
  })

  function filterDeployment({ name, tags, schedule }: Deployment): boolean {
    return `${name} ${formatSchedule(schedule)} ${tags?.join(' ')}`.toLowerCase().includes(searchTerm.value.toLowerCase())
  }

  function clear(): void {
    searchTerm.value = ''
  }
</script>

<style>
.deployments-table__search { @apply
  flex
  justify-between
  items-center
  mb-4
}

.deployments-table__hide-on-desktop {
  @apply
  sm:hidden
}
</style>