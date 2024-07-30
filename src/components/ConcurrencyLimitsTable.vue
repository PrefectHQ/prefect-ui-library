<template>
  <ConcurrencyLimitsPageEmptyState v-if="empty && loaded" />
  <p-table v-else class="concurrency-limits-table__table" :columns="columns" :data="concurrencyLimits">
    <template #tag="{ row }">
      <p-link :to="routes.concurrencyLimit(row.id)">
        {{ row.tag }}
      </p-link>
    </template>
    <template #active-task-runs="{ row }">
      <ConcurrencyTableActiveSlots v-if="row.activeSlots" :active-slots="row.activeSlots" />
    </template>

    <template #action-heading>
      <span />
    </template>

    <template #action="{ row }">
      <ConcurrencyLimitMenu size="xs" :concurrency-limit="row" @delete="() => concurrencyLimitSubscription.refresh()" />
    </template>

    <template #empty-state>
      <PEmptyResults v-if="loaded">
        <template #message>
          No task concurrency limits
        </template>
      </PEmptyResults>
      <PEmptyResults v-else>
        <template #message>
          <p-loading-icon />
        </template>
      </PEmptyResults>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { PEmptyResults, TableColumn } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { ConcurrencyTableActiveSlots, ConcurrencyLimitMenu, ConcurrencyLimitsPageEmptyState } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'

  const api = useWorkspaceApi()
  const columns: TableColumn<ConcurrencyLimit>[] = [
    {
      property: 'tag',
      label: 'Tag',
    },
    {
      property: 'concurrencyLimit',
      label: 'Slots',
    },
    {
      property: 'activeSlots',
      label: 'Active Task Runs',
    },
    {
      label: 'Action',
      width: '42px',
    },
  ]

  const concurrencyLimitSubscription = useSubscription(api.concurrencyLimits.getConcurrencyLimits)
  const concurrencyLimits = computed(() => concurrencyLimitSubscription.response ?? [])
  const empty = computed(() => concurrencyLimitSubscription.executed && !concurrencyLimits.value.length)
  const loaded = computed(() => concurrencyLimitSubscription.executed)

  const routes = useWorkspaceRoutes()
</script>
