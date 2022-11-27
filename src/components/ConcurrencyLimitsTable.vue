<template>
  <p-table class="concurrency-limits-table__table" :columns="columns" :data="concurrencyLimits">
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
  import { useWorkspaceApi } from '@/compositions'
  const api = useWorkspaceApi()
  const columns = [
    {
      property: 'tag',
      label: 'Tag',
    },
    {
      property: 'created',
      label: 'Created',
    },
    {
      property: 'concurrencyLimit',
      label: 'Limit',
    },
  ]
  const concurrencyLimitSubscription = useSubscription(api.concurrencyLimits.getConcurrencyLimits)
  const concurrencyLimits = computed(() => concurrencyLimitSubscription.response ?? [])
</script>
