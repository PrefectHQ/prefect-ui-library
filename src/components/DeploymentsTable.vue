<template>
  <div class="deployments-table">
    <div class="deployments-table__search">
      <ResultsCount :count="filtered.length" />
      <SearchInput v-model="searchTerm" placeholder="Search" label="Search parameters" />
    </div>

    <p-table :data="deployments" :columns="columns" class="deployments-table">
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
        <p-icon-button-menu size="xs">
          <template #default="{ close }">
            <copy-overflow-menu-item label="Copy ID" :item="row.id" @click="close" />
            <p-overflow-menu-item label="Run" class="deployments-table__hide-on-desktop" />
            <delete-overflow-menu-item :name="row.name" @delete="deleteDeployment(row.id, close)" />
          </template>
        </p-icon-button-menu>
      </template>

      <template #empty-state>
        <PEmptyResults>
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
  import { PTable, PTagWrapper, PIconButtonMenu, POverflowMenuItem, PEmptyResults, PLink } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import CopyOverflowMenuItem from './CopyOverflowMenuItem.vue'
  import DeleteOverflowMenuItem from './DeleteOverflowMenuItem.vue'
  import ResultsCount from './ResultsCount.vue'
  import SearchInput from './SearchInput.vue'
  import { Deployment } from '@/models'
  import { deploymentRouteKey } from '@/router'
  import { deploymentsApiKey } from '@/services/DeploymentsApi'
  import { deleteItem, inject } from '@/utilities'
  import { formatSchedule } from '@/utilities/schedules'

  const deploymentRoute = inject(deploymentRouteKey)

  const props = defineProps<{
    deployments: Deployment[],
  }>()

  const emit = defineEmits(['delete', 'clear'])

  const deploymentsApi = inject(deploymentsApiKey)
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

  const deleteDeployment = async (id: string, close: () => void): Promise<void> => {
    close()
    await deleteItem(id, deploymentsApi.deleteDeployment, 'Deployment')
    emit('delete', id)
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