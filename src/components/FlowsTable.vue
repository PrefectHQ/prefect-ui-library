<template>
  <p-table :data="flows" :columns="columns">
    <template #name="{ row }">
      <p-link :to="flowRoute(row.id)">
        <span>{{ row.name }}</span>
      </p-link>
    </template>

    <template #tags="{ row }">
      <p-tag-wrapper :tags="row.tags" justify="left" />
    </template>

    <template #activity="{ row }">
      <FlowActivityChart :flow="row" class="flows-table__activity-chart" />
    </template>

    <template #action-heading>
      <span />
    </template>

    <template #action="{ row }">
      <FlowMenu :flow="row" @delete="id => emits('delete', id)" />
    </template>

    <template #empty-state>
      <PEmptyResults>
        <template #actions>
          <p-button size="sm" secondary @click="emits('clear')">
            Clear Filters
          </p-button>
        </template>
      </PEmptyResults>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PTable, PTagWrapper, PEmptyResults, PLink } from '@prefecthq/prefect-design'
  import FlowActivityChart from '@/components/FlowActivityChart.vue'
  import FlowMenu from '@/components/FlowMenu.vue'
  import { Flow } from '@/models'
  import { flowRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const flowRoute = inject(flowRouteKey)

  defineProps<{
    flows: Flow[],
  }>()

  const emits = defineEmits<{
    (event: 'delete', value: string): void,
    (event: 'clear'): void,
  }>()

  const columns = [
    {
      property: 'name',
      label: 'Name',
      width: '150px',
    },
    {
      property: 'activity',
      label: 'Activity',
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
</script>

<style>
.flows-table__activity-chart {
  @apply
  h-12
}
</style>