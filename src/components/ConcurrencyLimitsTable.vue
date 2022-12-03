<template>
  <p-table class="concurrency-limits-table__table" :columns="columns" :data="concurrencyLimits">
    <template #active-task-runs="{ row }">
      <ConcurrencyTableActiveSlots v-if="row.activeSlots" :concurrency-limit="row" />
    </template>
    <template #empty-state>
      <PEmptyResults>
        <template #message>
          No task concurrency limits
        </template>
      </PEmptyResults>
    </template>
  </p-table>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import ConcurrencyTableActiveSlots from '@/components/ConcurrencyTableActiveSlots.vue'
  import { useWorkspaceApi } from '@/compositions'

  const api = useWorkspaceApi()
  const columns = [
    {
      property: 'tag',
      label: 'Tag',
    },
    {
      property: 'concurrencyLimit',
      label: 'Slots',
    },
    {
      property: 'activeSlot',
      label: 'Active Task Runs',
    },
  ]

  const concurrencyLimitSubscription = useSubscription(api.concurrencyLimits.getConcurrencyLimits)
  const concurrencyLimits = computed(() => concurrencyLimitSubscription.response ?? [])
</script>
