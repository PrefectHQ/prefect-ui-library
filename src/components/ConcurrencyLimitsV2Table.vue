<template>
  <ConcurrencyLimitsPageEmptyState v-if="empty && loaded" />
  <p-table v-else class="concurrency-limits-v2-table" :columns="columns" :data="concurrencyLimits">
    <template #tag="{ row }">
      <p-link :to="routes.concurrencyLimit(row.id)">
        {{ row.name }}
      </p-link>
    </template>
    <template #active-task-runs="{ row }">
      {{ row.activeSlots }}
    </template>

    <template #action-heading>
      <span />
    </template>


    <template #empty-state>
      <p-empty-results>
        <template #message>
          No task concurrency limits
        </template>
      </p-empty-results>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { TableColumn } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { ConcurrencyLimitsPageEmptyState } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'

  const api = useWorkspaceApi()
  const columns: TableColumn<ConcurrencyV2Limit>[] = [
    {
      property: 'name',
      label: 'Name',
    },
    {
      property: 'limit',
      label: 'Limit',
    },
    {
      property: 'activeSlots',
      label: 'Active Slots',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  const concurrencyLimitSubscription = useSubscription(api.concurrencyV2Limits.getConcurrencyV2Limits)
  const concurrencyLimits = computed(() => concurrencyLimitSubscription.response ?? [])
  const empty = computed(() => concurrencyLimitSubscription.executed && !concurrencyLimits.value.length)
  const loaded = computed(() => concurrencyLimitSubscription.executed)

  const routes = useWorkspaceRoutes()
</script>
